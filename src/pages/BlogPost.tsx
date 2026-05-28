import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createClient, PRISMIC_BLOG_TYPE } from "@/lib/prismic";
import { PrismicRichText } from "@prismicio/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { PrismicDocument } from "@prismicio/client";
import noBlogFound from "@/assets/noBlogFound.png";

// ── helpers ────────────────────────────────────────────────────────────────

function formatDate(dateStr: string | undefined) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getText(doc: PrismicDocument, field: string): string {
  const val = doc.data?.[field];
  if (typeof val === "string") return val;
  if (Array.isArray(val) && val.length > 0) return val[0].text ?? "";
  return "";
}

function getRichText(doc: PrismicDocument, field: string) {
  const val = doc.data?.[field];
  return Array.isArray(val) ? val : [];
}

function getRichTextFallback(doc: PrismicDocument, fields: string[]) {
  for (const field of fields) {
    const val = getRichText(doc, field);
    if (val.length > 0) return val;
  }
  return [];
}

type RichTextBlock = {
  type?: string;
  text?: string;
};

function getFieldValue(doc: PrismicDocument, field: string): string {
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

function richTextToPlainText(value: unknown): string {
  if (!Array.isArray(value)) return "";

  return value
    .map((block) => {
      if (!block || typeof block !== "object") return "";
      const text = (block as RichTextBlock).text;
      return typeof text === "string" ? text.trim() : "";
    })
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

type PrismicRichTextField = React.ComponentProps<typeof PrismicRichText>["field"];

/** Estimate read time from all text in a Prismic rich text field */
function estimateReadTime(richText: RichTextBlock[]): number {
  const words = richText
    .map((block) => block.text ?? "")
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// ── Skeleton ────────────────────────────────────────────────────────────────

function PostSkeleton() {
  return (
    <div className="post2-skeleton">
      <div className="post2-skeleton-topbar animate-pulse" />
      <div className="post2-skeleton-cover animate-pulse" />
      <div className="post2-skeleton-body">
        <div className="post2-skeleton-lead animate-pulse" />
        <div className="post2-skeleton-lead animate-pulse" style={{ width: "85%" }} />
        <div className="post2-skeleton-lead animate-pulse" style={{ width: "70%" }} />
        <hr className="post2-divider" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="post2-skeleton-line animate-pulse" style={{ width: `${75 + Math.random() * 25}%` }} />
        ))}
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

function BlogPost() {
  const { uid } = useParams<{ uid: string }>();
  const navigate = useNavigate();
  const [doc, setDoc] = useState<PrismicDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [redirectChecked, setRedirectChecked] = useState(false);
  const checkStarted = useRef(false);

  useEffect(() => {
    if (!uid) return;

    // Reset all states when UID changes to prevent state leakage
    setDoc(null);
    setLoading(true);
    setNotFound(false);
    setRedirectChecked(false);
    checkStarted.current = false;

    let active = true;

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog?uid=${uid}`);
        if (!res.ok) throw new Error("fallback");
        const data = await res.json();
        if (active) {
          setDoc(data);
          setLoading(false);
        }
      } catch {
        // Direct CMS fetch (used when no edge proxy is available)
        const client = createClient();
        client
          .getByUID(PRISMIC_BLOG_TYPE, uid)
          .then((d) => {
            if (active) {
              setDoc(d);
              setLoading(false);
            }
          })
          .catch(() => {
            console.warn(`[BlogPost] getByUID failed for UID: ${uid}, trying getByID`);
            client
              .getByID(uid)
              .then((d) => {
                if (active) {
                  setDoc(d);
                  setLoading(false);
                }
              })
              .catch(() => {
                console.warn(`[BlogPost] No document found for UID: ${uid}`);
                if (active) { setNotFound(true); setLoading(false); }
              });
          });
      }
    };

    fetchPost();

    return () => {
      active = false;
    };
  }, [uid]);

  // ── Redirect lookup (runs only after a 404) ─────────────────────────────
  useEffect(() => {
    if (!notFound || redirectChecked || checkStarted.current || !uid) return;

    let active = true;

    const checkRedirect = async () => {
      checkStarted.current = true;

      try {
        const res = await fetch(`/api/redirects?from=${encodeURIComponent(uid)}`);
        if (res.ok) {
          const data = await res.json();
          if (active && data?.to) {
            navigate(`/blog/${data.to}`, { replace: true });
            return;
          }
        }
      } catch {
        // Expected in local dev — no edge redirects API
      }

      try {
        const client = createClient();
        const results = await client.getAllByType("url_redirect");
        if (!active) return;

        const match = results.find((doc) => {
          const raw = doc.data?.from_uid;
          let slug = "";
          if (typeof raw === "string") {
            slug = raw.trim();
          } else if (Array.isArray(raw) && raw.length > 0) {
            slug = (raw[0].text ?? "").trim();
          }
          const cleanSlug = slug.replace(/^\/?(blog\/)?/, "").replace(/\/$/, "").trim();
          const cleanUid = uid.replace(/^\/?(blog\/)?/, "").replace(/\/$/, "").trim();
          return cleanSlug === cleanUid;
        });

        if (match) {
          const rawTo = match.data?.to_uid;
          let toUid = "";
          if (typeof rawTo === "string") {
            toUid = rawTo.trim();
          } else if (Array.isArray(rawTo) && rawTo.length > 0) {
            toUid = (rawTo[0].text ?? "").trim();
          } else if (rawTo?.uid) {
            toUid = rawTo.uid;
          }

          if (toUid) {
            toUid = toUid.replace(/^\/?(blog\/)?/, "").replace(/\/$/, "").trim();
            if (toUid.includes("/")) {
              const segments = toUid.split("/").filter(Boolean);
              toUid = segments[segments.length - 1] || "";
            }
          }

          if (toUid && active) {
            navigate(`/blog/${toUid}`, { replace: true });
            return;
          }
        }
      } catch (err) {
        console.error("[Redirect] Direct Prismic query failed:", err);
      } finally {
        if (active) {
          setRedirectChecked(true);
        }
      }
    };

    checkRedirect();

    return () => {
      active = false;
    };
  }, [notFound, redirectChecked, uid, navigate]);

  const title = doc ? getText(doc, "title") || "" : "";
  const blogTitle = doc ? getText(doc, "blog_title") || title : "";
  const author = doc ? getText(doc, "author_name") || "DocGenius Team" : "";
  const category = doc ? getText(doc, "catogary") || getText(doc, "category") : "";
  const uidValue = doc ? doc.uid || doc.id : "";

  // Custom robust excerpt builder
  const getExcerptLocal = (d: PrismicDocument) => {
    const explicit = getText(d, "excerpt");
    if (explicit) return explicit;
    const bodyText = richTextToPlainText(d.data?.Content || d.data?.content || d.data?.blog_content_editor || d.data?.body);
    if (bodyText) {
      return bodyText.length > 160 ? bodyText.slice(0, 157) + "..." : bodyText;
    }
    return "";
  };
  const excerpt = doc ? getExcerptLocal(doc) : "";

  // Support both "cover_photo" (current) and "cover_image" (fallback)
  const coverUrl = doc ? (doc.data?.cover_photo?.url ?? doc.data?.featured_image?.url ?? doc.data?.cover_image?.url ?? "") : "";

  // Support image_alt_tag
  const coverAlt = doc ? (getText(doc, "image_alt_tag") || doc.data?.cover_photo?.alt || doc.data?.featured_image?.alt || doc.data?.cover_image?.alt || blogTitle || title) : title;

  // Support publish_date
  const date = doc ? formatDate(doc.data?.publish_date ?? doc.first_publication_date) : "";

  // Support the exact Content field with fallbacks for older content.
  const body = doc ? getRichTextFallback(doc, ["Content", "content", "blog_content_editor", "body"]) : [];

  // Support explicit reading_time, otherwise fall back to estimate!
  const getReadTimeLocal = (d: PrismicDocument, bodyRichText: RichTextBlock[]) => {
    const explicit = d.data?.reading_time;
    if (explicit !== undefined && explicit !== null) {
      const stringVal = String(explicit).trim();
      if (stringVal.length > 0) {
        if (/^\d+$/.test(stringVal)) {
          return `${stringVal} min read`;
        }
        return stringVal.toLowerCase().includes("read") ? stringVal : `${stringVal} min read`;
      }
    }
    return `${estimateReadTime(bodyRichText)} min read`;
  };
  const readTime = doc ? getReadTimeLocal(doc, body) : "";

  // ── SEO Head & Schema Injection ──────────────────────────────────────────
  useEffect(() => {
    if (!doc) return;

    // 1. Resolve SEO fields from Prismic content with intelligent defaults
    const metaTitle = getFieldValue(doc, "meta_title") || `${blogTitle || title} | DocGenius`;
    const metaDesc = getFieldValue(doc, "meta_description") || excerpt || `Read ${blogTitle || title} on the DocGenius blog.`;
    const keywords = getFieldValue(doc, "meta_keywords") || `${author ? author + ", " : ""}document generation, blog, salesforce`;

    // Canonical link handling
    let canonical = "";
    const rawCanonical = getFieldValue(doc, "canonical_url");
    if (rawCanonical) {
      canonical = rawCanonical.startsWith("http") ? rawCanonical : `${window.location.origin}${rawCanonical.startsWith("/") ? rawCanonical : `/${rawCanonical}`}`;
    }
    if (!canonical) {
      canonical = window.location.href;
    }

    const customSchema = getFieldValue(doc, "custom_json_schema") || getFieldValue(doc, "json_schema") || getFieldValue(doc, "custom_schema");
    const articleSchemaField = doc.data?.article_schema;
    const shouldInjectArticle =
      articleSchemaField === undefined ||
      articleSchemaField === null ||
      articleSchemaField === "" ||
      articleSchemaField === true ||
      articleSchemaField === "true" ||
      articleSchemaField === 1 ||
      articleSchemaField === "1";

    // 2. Dynamically set title
    document.title = metaTitle;

    // Helper: update/insert meta elements safely
    const setMetaTag = (name: string, content: string, keyAttr: "name" | "property" = "name") => {
      let meta = document.querySelector(`meta[${keyAttr}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(keyAttr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Helper: update/insert link element safely
    const setLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", rel);
        document.head.appendChild(link);
      }
      link.setAttribute("href", href);
    };

    // Helper: manage schema script insertion
    const setSchemaScript = (id: string, schemaObj: object | null) => {
      if (!schemaObj) return;
      let script = document.getElementById(id) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.id = id;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(schemaObj);
    };

    // 3. Inject standard SEO head tags
    setMetaTag("description", metaDesc);
    setMetaTag("keywords", keywords);
    setMetaTag("robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    setLinkTag("canonical", canonical);

    // 4. Inject OpenGraph rich card tags
    setMetaTag("og:title", metaTitle, "property");
    setMetaTag("og:description", metaDesc, "property");
    setMetaTag("og:type", "article", "property");
    setMetaTag("og:url", canonical, "property");
    if (coverUrl) {
      setMetaTag("og:image", coverUrl, "property");
    }

    // 5. Inject Twitter share tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", metaTitle);
    setMetaTag("twitter:description", metaDesc);
    if (coverUrl) {
      setMetaTag("twitter:image", coverUrl);
    }

    // 6. Generate & Inject Article Schema (JSON-LD)
    if (shouldInjectArticle) {
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "id" : canonical,
        "headline": metaTitle,
        "name": blogTitle || title,
        "description": excerpt || metaDesc,
        "image": coverUrl || undefined,
        // "url": canonical,
        // "datePublished": doc.data?.publish_date || doc.data?.published_date || doc.first_publication_date,
        // "dateModified": doc.last_publication_date,
        // "keywords": keywords,
        // "articleSection": category || undefined,
        "author": {
          "@type": "Organization",
          "name": author,
          "url": "https://www.docgenius.ai/" 
        },
        "publisher": {
          "@type": "Organization",
          "name": "DocGenius",
          "logo": {
            "@type": "ImageObject",
            "url": `${window.location.origin}/assets/docGeniusLogoSvg.svg`
          }
        },
        // "mainEntityOfPage": {
        //   "@type": "WebPage",
        //   "@id": canonical
        // }
        "datePublished": doc.data?.publish_date || doc.data?.published_date || doc.first_publication_date,
        "dateModified": doc.last_publication_date || doc.data?.publish_date || doc.data?.published_date || doc.first_publication_date,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonical
        },
        inLanguage: "en-US"
      };
      setSchemaScript("seo-article-schema", articleSchema);
    } else {
      const artScript = document.getElementById("seo-article-schema");
      if (artScript) artScript.remove();
    }

    // 7. Inject Custom JSON Schema if provided in Prismic
    if (customSchema) {
      try {
        const parsed = typeof customSchema === "string" ? JSON.parse(customSchema) : customSchema;
        setSchemaScript("seo-custom-schema", parsed);
      } catch {
        // Silently ignore malformed custom schema
      }
    }

    // Cleanup scripts on unmount / route exit
    return () => {
      const artScript = document.getElementById("seo-article-schema");
      if (artScript) artScript.remove();
      const custScript = document.getElementById("seo-custom-schema");
      if (custScript) custScript.remove();
    };
  }, [doc, blogTitle, title, excerpt, coverUrl, author, date, category]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="post2-page">

        {loading && (
          <div className="post2-container">
            <PostSkeleton />
          </div>
        )}

        {!loading && notFound && redirectChecked && (
          <div className="post2-container post2-not-found">
            <div className="blog-empty-image-wrap mb-8">
              <img src={noBlogFound} alt="Post not found" className="blog-empty-img mx-auto w-2/3 max-w-[16rem] h-auto rounded-2xl" />
            </div>
            <p>This article may have been moved or unpublished.</p>
            <Link to="/blog" className="post2-back-link">
              ← Back to Blog
            </Link>
          </div>
        )}

        {!loading && !notFound && doc && (
          <div className="post2-container">

            {/* ── Top meta bar ─────────────────────────────────────────── */}
            <div className="post2-topbar">
              {/* Left: back button */}
              <Link to="/blog" className="post2-back-link">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to Blog
              </Link>

              {/* Right: article meta */}
              <div className="post2-topbar-meta">
                {author && (
                  <span className="post2-topbar-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    {author}
                  </span>
                )}
                {category && <span className="post2-topbar-item post2-topbar-category">{category}</span>}
                {readTime && (
                  <span className="post2-topbar-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {readTime}
                  </span>
                )}
                {date && <span className="post2-topbar-item post2-topbar-date">{date}</span>}
              </div>
            </div>

            {/* ── Cover card ───────────────────────────────────────────── */}
            {coverUrl && (
              <div className="w-full max-w-4xl mx-auto mb-6 lg:mb-7">
                <div className="post2-cover-card aspect-video flex items-center justify-center">
                  <img src={coverUrl} alt={coverAlt} className="post2-cover-img" />
                </div>
              </div>
            )}

            {/* ── Article body ─────────────────────────────────────────── */}
            <article className="post2-article">

              {/* Title + author */}
              <header className="post2-header">
                <h1 className="post2-title">{blogTitle || title}</h1>

                <div className="post2-author-row">
                  <div className="post2-author-avatar">
                    {author.charAt(0).toUpperCase()}
                  </div>
                  <div className="post2-author-meta">
                    <span className="post2-author-name">{author}</span>
                    <span className="post2-meta-divider">•</span>
                    <span className="post2-author-date">{date}</span>
                    {category && (
                      <>
                        <span className="post2-meta-divider">•</span>
                        <span className="post2-author-category">{category}</span>
                      </>
                    )}
                    {readTime && (
                      <>
                        <span className="post2-meta-divider">•</span>
                        <span className="post2-author-readtime">{readTime}</span>
                      </>
                    )}
                  </div>
                </div>
              </header>


              {/* Rich text body */}
              <div className="post2-body">
                {body.length > 0 ? (
                  <PrismicRichText field={body as PrismicRichTextField} />
                ) : (
                  <p className="post2-no-content">
                    This article's content is coming soon. Check back later.
                  </p>
                )}
              </div>


            </article>

          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default BlogPost;
