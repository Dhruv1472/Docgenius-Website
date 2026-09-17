import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import * as prismic from "@prismicio/client";

const s3 = new S3Client({ region: "us-east-1" });

const BUCKET_NAME = 'docgenius';     
const CLOUDFRONT_ID = 'EXVE7H3EGGI79'; 
const SITE_URL = 'https://docgenius.ai';               
const PRISMIC_REPO = 'docgenius-web';    
const GTAG_ID = 'G-3TKYT3SM1D';
// Lambda@Edge Viewer Request hard body size limit is 40 KB
const MAX_BODY_SIZE = 40000;

// Default asset paths based on the current production build
const DEFAULT_ASSET_PATHS = {
  jsPath: "/assets/index-BrIlA950.js",
  cssPath: "/assets/index-Coe08bbm.css",
};

// In-memory cache to prevent redundant fetches on warm Lambda containers
let cachedAssetPaths = null;

// ── HTML ESCAPING HELPERS ──────────────────────────────────────────────────────
// Prevents broken HTML from CMS data containing quotes, angle brackets, etc.

function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escape for use inside JSON-LD <script> blocks (prevents </script> injection) */
function escapeJsonLd(str) {
  if (typeof str !== "string") return "";
  return str.replace(/<\//g, "<\\/");
}

/**
 * Build a minimal SPA fallback shell that loads the React app.
 * Used when Lambda@Edge fails or times out so CloudFront NEVER returns a 503.
 * The React app will then mount and handle routing client-side.
 */
function buildFallbackShell(assetPaths) {
  const { jsPath, cssPath } = assetPaths || cachedAssetPaths || DEFAULT_ASSET_PATHS;
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>DocGenius Blog</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <script type="module" crossorigin src="${escapeHtml(jsPath)}"></script>
    <link rel="stylesheet" crossorigin href="${escapeHtml(cssPath)}">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;
}

const STATIC_PAGES = [
  { url: "/", priority: "1.0", changefreq: "monthly" },
  { url: "/contact-us", priority: "0.8", changefreq: "monthly" },
  { url: "/faqs", priority: "0.8", changefreq: "monthly" },
  { url: "/userguide", priority: "0.6", changefreq: "monthly" },
];

// ── SITEMAP GENERATION (Original Logic with lastmod preservation) ──────────────

async function handleSitemapUpdate(event) {
    // Extract updated document IDs from the Prismic webhook payload
    let updatedDocIds = [];
    if (event?.body) {
      try {
        const payload = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
        if (payload && Array.isArray(payload.documents)) {
          updatedDocIds = payload.documents;
        }
      } catch (e) {
        console.log("Failed to parse webhook body:", e.message);
      }
    }

    //Fetch existing sitemap to preserve old lastmod values
    const existingLastmods = {};
    try {
      const getObjCmd = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: "DG-Web/sitemap.xml",
      });
      const response = await s3.send(getObjCmd);
      const existingSitemap = await response.Body.transformToString();
      
      const urlRegex = /<url>([\s\S]*?)<\/url>/g;
      let match;
      while ((match = urlRegex.exec(existingSitemap)) !== null) {
        const content = match[1];
        const locMatch = content.match(/<loc>(.*?)<\/loc>/);
        const lastmodMatch = content.match(/<lastmod>(.*?)<\/lastmod>/);
        if (locMatch) {
          const urlPath = locMatch[1].replace(SITE_URL, "");
          if (lastmodMatch) {
            existingLastmods[urlPath] = lastmodMatch[1].trim();
          }
        }
      }
    } catch (e) {
      console.log("No existing sitemap found or error reading it:", e.message);
    }

    const today = new Date().toISOString().split("T")[0];

    const client = prismic.createClient(PRISMIC_REPO, { fetch });
    const posts = await client.getAllByType("docgenius"); 

    const blogEntries = posts.map((post) => {
      const url = `/blog/${post.uid}`;
      const prismicLastmod = post.last_publication_date?.split("T")[0];
      const existingLastmod = existingLastmods[url];
      
      let lastmod = prismicLastmod || existingLastmod || today;
      
      if (updatedDocIds.includes(post.id)) {
        lastmod = today;
      } else if (existingLastmod && prismicLastmod) {
        lastmod = prismicLastmod;
      }

      return {
        url,
        lastmod,
        priority: "0.7",
        changefreq: "monthly",
      };
    });

    const staticEntries = STATIC_PAGES.map((page) => ({
      ...page,
      lastmod: existingLastmods[page.url] || today,
    }));

    const allEntries = [...staticEntries, ...blogEntries];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${allEntries
        .map(
          (entry) => `  <url>
          <loc>${SITE_URL}${entry.url}</loc>
          ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ""}
          <changefreq>${entry.changefreq}</changefreq>
          <priority>${entry.priority}</priority>
        </url>`
        )
        .join("\n")}
      </urlset>`;

    //Upload to S3
    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: "DG-Web/sitemap.xml",
        Body: sitemap,
        ContentType: "application/xml",
        CacheControl: "max-age=3600",
      })
    );

    // Invalidate CloudFront cache (dynamically imported to avoid overhead in Lambda@Edge)
    const { CloudFrontClient, CreateInvalidationCommand } = await import("@aws-sdk/client-cloudfront");
    const cf = new CloudFrontClient({ region: "us-east-1" });
    await cf.send(
      new CreateInvalidationCommand({
        DistributionId: CLOUDFRONT_ID,
        InvalidationBatch: {
          Paths: { Quantity: 2, Items: ["/sitemap.xml", "/blog/*"] },
          CallerReference: `sitemap-${Date.now()}`,
        },
      })
    );

    return { statusCode: 200, body: "Sitemap updated successfully" };
}

// ── BLOG SEO HTML HELPERS (Lambda@Edge Viewer Request) ─────────────────────────

function getFieldValue(doc, field) {
  const value = doc.data?.[field];
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value) && value.length > 0) {
    return value
      .map((block) => (block && typeof block === "object" && typeof block.text === "string" ? block.text.trim() : ""))
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  }
  return "";
}

function getImageUrl(doc) {
  const img = doc.data?.cover_photo || doc.data?.featured_image || doc.data?.cover_image;
  return img?.url || `${SITE_URL}/case-hero.png`;
}

function getBodyHtml(doc) {
  const body = doc.data?.body;
  if (!Array.isArray(body)) return "";

  return body
    .map((slice) => {
      if (slice.slice_type === "text" || slice.slice_type === "rich_text" || slice.slice_type === "content") {
        const primary = slice.primary || {};
        const richText = primary.text || primary.content || primary.rich_text || primary.body_text;
        if (Array.isArray(richText)) {
          return richText
            .map((block) => {
              if (!block || !block.text) return "";
              const text = block.text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
              switch (block.type) {
                case "heading1": return `<h1>${text}</h1>`;
                case "heading2": return `<h2>${text}</h2>`;
                case "heading3": return `<h3>${text}</h3>`;
                case "heading4": return `<h4>${text}</h4>`;
                case "heading5": return `<h5>${text}</h5>`;
                case "heading6": return `<h6>${text}</h6>`;
                case "list-item": return `<li>${text}</li>`;
                case "o-list-item": return `<li>${text}</li>`;
                default: return text ? `<p>${text}</p>` : "";
              }
            })
            .filter(Boolean)
            .join("\n");
        }
      }
      return "";
    })
    .filter(Boolean)
    .join("\n");
}

function generateSchemaJson(doc, canonicalUrl, title, metaTitle, metaDesc, coverUrl, author, publishDate) {
  const articleSchemaField = doc.data?.article_schema;
  const shouldInjectArticle =
    articleSchemaField === undefined ||
    articleSchemaField === null ||
    articleSchemaField === "" ||
    articleSchemaField === true ||
    articleSchemaField === "true" ||
    articleSchemaField === 1 ||
    articleSchemaField === "1";

  const schemas = [];

  if (shouldInjectArticle) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl,
      },
      "headline": metaTitle,
      "name": title,
      "description": metaDesc,
      "image": coverUrl ? [coverUrl] : undefined,
      "datePublished": publishDate,
      "dateModified": doc.last_publication_date || publishDate,
      "author": {
        "@type": "Organization",
        "name": author,
        "url": SITE_URL,
      },
      "publisher": {
        "@type": "Organization",
        "name": "DocGenius",
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/assets/docGeniusLogoSvg.svg`,
        },
      },
      "inLanguage": "en-US",
    });
  }

  const customSchemaRaw = getFieldValue(doc, "custom_json_schema") || getFieldValue(doc, "json_schema") || getFieldValue(doc, "custom_schema");
  if (customSchemaRaw) {
    try {
      const parsed = typeof customSchemaRaw === "string" ? JSON.parse(customSchemaRaw) : customSchemaRaw;
      schemas.push(parsed);
    } catch {
      // Ignore malformed schema
    }
  }

  return schemas;
}

// Fetch asset paths with in-memory caching and fast edge fetch
async function getAssetPaths() {
  if (cachedAssetPaths) return cachedAssetPaths;

  // 1. Fast path: Fetch index.html directly from CloudFront edge cache (10-30ms)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);
    const response = await fetch(`${SITE_URL}/index.html`, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const html = await response.text();
      const jsMatch = html.match(/src="(\/assets\/index[^"]*\.js)"/);
      const cssMatch = html.match(/href="(\/assets\/index[^"]*\.css)"/);
      if (jsMatch && cssMatch) {
        cachedAssetPaths = { jsPath: jsMatch[1], cssPath: cssMatch[1] };
        return cachedAssetPaths;
      }
    }
  } catch (e) {
    console.warn("[Lambda@Edge] Edge fetch for index.html failed, trying S3:", e.message);
  }

  // 2. Fallback: Fetch index.html from S3 via SDK
  try {
    const getObjCmd = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: "DG-Web/index.html",
    });
    const response = await s3.send(getObjCmd);
    const html = await response.Body.transformToString();

    const jsMatch = html.match(/src="(\/assets\/index[^"]*\.js)"/);
    const cssMatch = html.match(/href="(\/assets\/index[^"]*\.css)"/);

    cachedAssetPaths = {
      jsPath: jsMatch ? jsMatch[1] : DEFAULT_ASSET_PATHS.jsPath,
      cssPath: cssMatch ? cssMatch[1] : DEFAULT_ASSET_PATHS.cssPath,
    };
    return cachedAssetPaths;
  } catch (e) {
    console.error("Failed to fetch asset paths from S3 index.html:", e.message);
    return DEFAULT_ASSET_PATHS;
  }
}

function buildBlogHtml(post, uid, assetPaths) {
  const data = post.data || {};
  const blogTitle = getFieldValue(post, "blog_title") || getFieldValue(post, "title") || "DocGenius Blog";
  const metaTitle = getFieldValue(post, "meta_title") || `${blogTitle} | DocGenius`;
  const excerpt = getFieldValue(post, "excerpt");
  const metaDesc = getFieldValue(post, "meta_description") || excerpt || `Read ${blogTitle} on DocGenius.`;
  const keywords = getFieldValue(post, "meta_keywords") || "document generation, salesforce, document automation, blog";

  const rawCanonical = getFieldValue(post, "canonical_url");
  const canonicalUrl = rawCanonical
    ? (rawCanonical.startsWith("http") ? rawCanonical : `${SITE_URL}${rawCanonical.startsWith("/") ? rawCanonical : `/${rawCanonical}`}`)
    : `${SITE_URL}/blog/${uid}`;

  const coverUrl = getImageUrl(post);
  const coverAlt = getFieldValue(post, "image_alt_tag") || data.cover_photo?.alt || blogTitle;
  const author = getFieldValue(post, "author_name") || "DocGenius Team";
  const publishDate = data.publish_date || post.first_publication_date || new Date().toISOString();

  const schemas = generateSchemaJson(post, canonicalUrl, blogTitle, metaTitle, metaDesc, coverUrl, author, publishDate);

  const { jsPath, cssPath } = assetPaths;

  // Escape all CMS values before interpolation to prevent broken HTML
  const safeMetaTitle = escapeHtml(metaTitle);
  const safeMetaDesc = escapeHtml(metaDesc);
  const safeKeywords = escapeHtml(keywords);
  const safeAuthor = escapeHtml(author);
  const safeCanonical = escapeHtml(canonicalUrl);
  const safeCoverUrl = escapeHtml(coverUrl);
  const safeCoverAlt = escapeHtml(coverAlt);
  const safePublishDate = escapeHtml(publishDate);
  const safeBlogTitle = escapeHtml(blogTitle);
  const safeJsPath = escapeHtml(jsPath);
  const safeCssPath = escapeHtml(cssPath);

  // Build noscript body content and truncate to stay under Lambda@Edge size limit
  let noscriptBody = "";
  try {
    const rawBody = getBodyHtml(post);
    // Reserve ~8KB for the head + meta tags; cap noscript content at remaining space
    const maxNoscriptLen = MAX_BODY_SIZE - 8000;
    noscriptBody = rawBody.length > maxNoscriptLen
      ? rawBody.slice(0, maxNoscriptLen) + "\n<p><em>[Content truncated — please enable JavaScript for the full article.]</em></p>"
      : rawBody;
  } catch (e) {
    console.warn("[Lambda@Edge] Failed to generate noscript body:", e.message);
    noscriptBody = `<p>${safeMetaDesc}</p>`;
  }

  // Safely serialize JSON-LD schemas (prevent </script> injection)
  const schemaScripts = schemas
    .map((s) => {
      try {
        return `<script type="application/ld+json">\n${escapeJsonLd(JSON.stringify(s, null, 2))}\n</script>`;
      } catch {
        return "";
      }
    })
    .filter(Boolean)
    .join("\n    ");

  return `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>${safeMetaTitle}</title>
        <meta name="description" content="${safeMetaDesc}" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="keywords" content="${safeKeywords}" />
        <meta name="author" content="${safeAuthor}" />
        <meta name="language" content="English" />
        <link rel="canonical" href="${safeCanonical}" />

        <!-- Favicons -->
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        <!-- OpenGraph Meta Tags -->
        <meta property="og:type" content="article" />
        <meta property="og:title" content="${safeMetaTitle}" />
        <meta property="og:description" content="${safeMetaDesc}" />
        <meta property="og:url" content="${safeCanonical}" />
        <meta property="og:image" content="${safeCoverUrl}" />
        <meta property="og:image:alt" content="${safeCoverAlt}" />
        <meta property="og:site_name" content="DocGenius" />
        <meta property="og:locale" content="en_US" />
        <meta property="article:published_time" content="${safePublishDate}" />
        <meta property="article:author" content="${safeAuthor}" />

        <!-- Twitter Card Meta Tags -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${safeMetaTitle}" />
        <meta name="twitter:description" content="${safeMetaDesc}" />
        <meta name="twitter:image" content="${safeCoverUrl}" />
        <meta name="twitter:site" content="@DocGenius" />
        <meta name="twitter:creator" content="@DocGenius" />

        <!-- Google Site Verification & Analytics -->
        <meta name="google-site-verification" content="Z1aYbRurrONhtroxgM9ARpWDlhFZf9LMEATJv0wQ6jo" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GTAG_ID}');
        </script>

        <!-- Structured Data (Schema.org JSON-LD) -->
        ${schemaScripts}

        <!-- Application Bundle -->
        <script type="module" crossorigin src="${safeJsPath}"></script>
        <link rel="stylesheet" crossorigin href="${safeCssPath}">
      </head>
      <body>
        <div id="root"></div>
        <noscript>
          <article style="max-width:800px;margin:0 auto;padding:20px;font-family:sans-serif;">
            <h1>${safeBlogTitle}</h1>
            <p><strong>By ${safeAuthor}</strong> | Published: ${escapeHtml(publishDate.split("T")[0])}</p>
            ${safeCoverUrl ? `<img src="${safeCoverUrl}" alt="${safeCoverAlt}" style="max-width:100%;height:auto;" />` : ""}
            ${safeMetaDesc ? `<p>${safeMetaDesc}</p>` : ""}
            ${noscriptBody}
            <footer><a href="/blog">← Back to Blog</a> | <a href="/">DocGenius Home</a></footer>
          </article>
        </noscript>
      </body>
    </html>`;
}

// ── MAIN HANDLER (Handles Webhooks AND CloudFront Edge Requests) ───────────────

export const handler = async (event) => {
  // Determine early whether this is a CloudFront Lambda@Edge invocation
  const isEdgeRequest = !!event?.Records?.[0]?.cf?.request;

  try {
    // 1. Check if invoked by CloudFront Lambda@Edge (Viewer Request for /blog/:uid)
    if (isEdgeRequest) {
      const request = event.Records[0].cf.request;
      const uri = request.uri; // e.g. /blog/salesforce-document-generation

      const match = uri.match(/^\/blog\/([^/]+)/);
      const uid = match ? match[1] : null;

      // If not a specific blog post (e.g. static asset or /blog listing), pass to S3
      if (!uid || uri.includes(".")) {
        return request;
      }

      console.log(`[Lambda@Edge] Dynamic SEO rendering for blog UID: ${uid}`);

      // Inner try/catch with timeout guard:
      // Viewer Request Lambda@Edge has a 5-second hard limit (or 3-second default).
      // If rendering takes longer than 2500ms, we abort and return the SPA fallback shell
      // so the user gets HTTP 200 and the React app handles it client-side, preventing CloudFront 503!
      let assetPaths = DEFAULT_ASSET_PATHS;
      try {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("TimeoutGuard: Execution exceeded 2500ms")), 2500)
        );

        const renderPromise = (async () => {
          // Fetch asset paths and blog post in parallel to minimize latency
          const [fetchedAssetPaths, post] = await Promise.all([
            getAssetPaths(),
            (async () => {
              const client = prismic.createClient(PRISMIC_REPO, {
                fetch: (url, options) => {
                  const controller = new AbortController();
                  const timer = setTimeout(() => controller.abort(), 2000);
                  return fetch(url, { ...options, signal: controller.signal }).finally(() =>
                    clearTimeout(timer)
                  );
                },
              });
              try {
                return await client.getByUID("docgenius", uid);
              } catch {
                try {
                  return await client.getByID(uid);
                } catch {
                  return null;
                }
              }
            })(),
          ]);

          assetPaths = fetchedAssetPaths;

          // Return 404 if post not found
          if (!post) {
            return {
              status: "404",
              statusDescription: "Not Found",
              headers: {
                "content-type": [{ key: "Content-Type", value: "text/html; charset=UTF-8" }],
                "cache-control": [{ key: "Cache-Control", value: "no-cache, no-store, must-revalidate" }],
              },
              body: `<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <title>Article Not Found | DocGenius</title>
                  <meta name="robots" content="noindex, nofollow" />
                </head>
                <body style="font-family: sans-serif; text-align: center; padding: 50px;">
                  <h1>404 - Article Not Found</h1>
                  <p>The requested article could not be found.</p>
                  <a href="/blog">Back to Blog</a>
                </body>
                </html>`,
            };
          }

          const html = buildBlogHtml(post, uid, assetPaths);

          return {
            status: "200",
            statusDescription: "OK",
            headers: {
              "content-type": [{ key: "Content-Type", value: "text/html; charset=UTF-8" }],
              "cache-control": [{ key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400" }],
            },
            body: html,
          };
        })();

        return await Promise.race([renderPromise, timeoutPromise]);
      } catch (edgeErr) {
        // CRITICAL FIX: Return a valid SPA fallback instead of crashing
        console.warn("[Lambda@Edge] Dynamic SEO rendering failed or timed out, returning SPA fallback:", edgeErr.message);
        return {
          status: "200",
          statusDescription: "OK",
          headers: {
            "content-type": [{ key: "Content-Type", value: "text/html; charset=UTF-8" }],
            "cache-control": [{ key: "Cache-Control", value: "no-cache, no-store, must-revalidate" }],
          },
          body: buildFallbackShell(assetPaths),
        };
      }
    }

    // 2. Otherwise, invoked as a Prismic Webhook -> Run full Sitemap Update
    return await handleSitemapUpdate(event);

  } catch (err) {
    console.error("Error in Lambda execution:", err);
    // Return the correct response format depending on invocation type.
    if (isEdgeRequest) {
      return {
        status: "200",
        statusDescription: "OK",
        headers: {
          "content-type": [{ key: "Content-Type", value: "text/html; charset=UTF-8" }],
          "cache-control": [{ key: "Cache-Control", value: "no-cache, no-store, must-revalidate" }],
        },
        body: buildFallbackShell(),
      };
    }

    // Standard Lambda (webhook) error response
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to process request", details: err.message }),
    };
  }
};