import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";
import * as prismic from "@prismicio/client";

const s3 = new S3Client({ region: "us-east-1" });
const cf = new CloudFrontClient({ region: "us-east-1" });

const BUCKET_NAME = 'docgenius';     
const CLOUDFRONT_ID = 'EXVE7H3EGGI79'; 
const SITE_URL = 'https://docgenius.ai';               
const PRISMIC_REPO = 'docgenius-web';    
const GTAG_ID = 'G-3TKYT3SM1D';

const STATIC_PAGES = [
  { url: "/", priority: "1.0", changefreq: "monthly" },
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

    //Invalidate CloudFront cache
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

function buildBlogHtml(post, uid) {
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

  return `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>${metaTitle}</title>
        <meta name="description" content="${metaDesc}" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="keywords" content="${keywords}" />
        <meta name="author" content="${author}" />
        <meta name="language" content="English" />
        <link rel="canonical" href="${canonicalUrl}" />

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
        <meta property="og:title" content="${metaTitle}" />
        <meta property="og:description" content="${metaDesc}" />
        <meta property="og:url" content="${canonicalUrl}" />
        <meta property="og:image" content="${coverUrl}" />
        <meta property="og:image:alt" content="${coverAlt}" />
        <meta property="og:site_name" content="DocGenius" />
        <meta property="og:locale" content="en_US" />
        <meta property="article:published_time" content="${publishDate}" />
        <meta property="article:author" content="${author}" />

        <!-- Twitter Card Meta Tags -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${metaTitle}" />
        <meta name="twitter:description" content="${metaDesc}" />
        <meta name="twitter:image" content="${coverUrl}" />
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
        ${schemas.map((s) => `<script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n</script>`).join("\n    ")}

        <!-- Application Bundle -->
        <script type="module" crossorigin src="/assets/index.js"></script>
        <link rel="stylesheet" crossorigin href="/assets/index.css">
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>`;
}

// ── MAIN HANDLER (Handles Webhooks AND CloudFront Edge Requests) ───────────────

export const handler = async (event) => {
  try {
    // 1. Check if invoked by CloudFront Lambda@Edge (Viewer Request for /blog/:uid)
    if (event?.Records?.[0]?.cf?.request) {
      const request = event.Records[0].cf.request;
      const uri = request.uri; // e.g. /blog/salesforce-document-generation

      const match = uri.match(/^\/blog\/([^/]+)/);
      const uid = match ? match[1] : null;

      // If not a specific blog post (e.g. static asset or /blog listing), pass to S3
      if (!uid || uri.includes(".")) {
        return request;
      }

      console.log(`[Lambda@Edge] Dynamic SEO rendering for blog UID: ${uid}`);

      const client = prismic.createClient(PRISMIC_REPO, { fetch });
      let post = null;

      try {
        post = await client.getByUID("docgenius", uid);
      } catch {
        try {
          post = await client.getByID(uid);
        } catch {
          post = null;
        }
      }

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

      const html = buildBlogHtml(post, uid);

      return {
        status: "200",
        statusDescription: "OK",
        headers: {
          "content-type": [{ key: "Content-Type", value: "text/html; charset=UTF-8" }],
          "cache-control": [{ key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400" }],
        },
        body: html,
      };
    }

    // 2. Otherwise, invoked as a Prismic Webhook -> Run full Sitemap Update
    return await handleSitemapUpdate(event);

  } catch (err) {
    console.error("Error in Lambda execution:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to process request", details: err.message }),
    };
  }
};