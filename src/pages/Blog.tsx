import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createClient } from "@/lib/prismic";
import { PRISMIC_BLOG_TYPE } from "@/lib/prismic";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import type { PrismicDocument } from "@prismicio/client";
import noBlogFound from "@/assets/noBlogDetails.png";

// ── constants ──────────────────────────────────────────────────────────────

const PAGE_SIZE = 3;

// ── helpers ────────────────────────────────────────────────────────────────

function formatDate(dateStr: string | undefined) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getImageUrl(doc: PrismicDocument): string {
  // Prefer the exact field name the user listed, with fallbacks for older content.
  const img = doc.data?.cover_photo || doc.data?.featured_image || doc.data?.cover_image;
  return img?.url ?? "";
}

function getText(doc: PrismicDocument, field: string): string {
  const val = doc.data?.[field];
  if (typeof val === "string") return val;
  if (Array.isArray(val) && val.length > 0) return val[0].text ?? "";
  return "";
}

type RichTextBlock = {
  type?: string;
  text?: string;
};

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

function getImageAlt(doc: PrismicDocument): string {
  // Prefer explicit text image alt tag, then direct image alt, then title
  const explicitAlt = getText(doc, "image_alt_tag");
  if (explicitAlt) return explicitAlt;
  const img = doc.data?.cover_photo || doc.data?.featured_image || doc.data?.cover_image;
  return img?.alt || getText(doc, "blog_title") || getText(doc, "title") || "Blog post cover";
}

function getExcerpt(doc: PrismicDocument): string {
  const explicitExcerpt = getText(doc, "excerpt");
  if (explicitExcerpt) return explicitExcerpt;

  // Extract plain text from any rich text blocks if no excerpt exists.
  const body = richTextToPlainText(doc.data?.Content || doc.data?.content || doc.data?.blog_content_editor || doc.data?.body);
  if (body) {
    return body.length > 50 ? body.slice(0, 47) + "..." : body;
  }
  return "";
}

// ── fetchPage ──────────────────────────────────────────────────────────────
// Fetches exactly PAGE_SIZE posts from Prismic for a given page number.
// Returns { docs, totalPages }.

async function fetchAllPosts(): Promise<PrismicDocument[]> {
  const client = createClient();
  const blogType = PRISMIC_BLOG_TYPE;


  const orderings: { field: string; direction: "desc" }[] = [
    { field: `my.${blogType}.publish_date`, direction: "desc" },
    { field: "document.first_publication_date", direction: "desc" },
  ];

  // Try each ordering until one succeeds
  for (const ordering of orderings) {
    try {
      const result = await client.getAllByType(PRISMIC_BLOG_TYPE, {
        orderings: [ordering],
      });
      return result;
    } catch (error) {
      console.warn(`[Blog] Fetch failed for ordering ${ordering.field}`, error);
      // try next ordering
    }
  }

  // Last-resort: no ordering
  try {
    const result = await client.getAllByType(PRISMIC_BLOG_TYPE);
    return result;
  } catch (error) {
    console.error("[Blog] Fallback fetch failed", error);
    return [];
  }
}

// ── BlogCard ───────────────────────────────────────────────────────────────

function BlogCard({ doc }: { doc: PrismicDocument }) {
  const title = getText(doc, "title") || "";
  const blogTitle = getText(doc, "blog_title") || title;
  const excerpt = getExcerpt(doc);
  const coverUrl = getImageUrl(doc);
  const coverAlt = getImageAlt(doc);
  const date = formatDate(doc.data?.publish_date ?? doc.first_publication_date);
  const author = getText(doc, "author_name") || "DocGenius Team";
  const category = getText(doc, "catogary") || getText(doc, "category");
  const readingTime = getText(doc, "reading_time");
  const uid = doc.uid || doc.id;

  return (
    <Link to={`/blog/${doc.uid || doc.id}`} className="blog-card">
      <div className="blog-card-img-wrap">
        <img src={coverUrl || "/blog_placeholder.png"} alt={coverAlt} className="blog-card-img" />
      </div>
      <div className="blog-card-body">
        {category && <span className="blog-card-category">{category}</span>}
        <h2 className="blog-card-title">{blogTitle}</h2>
        {excerpt && <p className="blog-card-excerpt">{excerpt}</p>}
        <div className="blog-card-meta">
          <span className="blog-card-author">By {author}</span>
          {date && <span className="blog-card-date">{date}</span>}
        </div>
        <div className="blog-card-meta blog-card-meta-secondary">
          <span className="blog-card-cta">Read article →</span>
          {readingTime && <span className="blog-card-reading-time">{readingTime} min read</span>}
        </div>
      </div>
    </Link>
  );
}

// ── Skeleton ───────────────────────────────────────────────────────────────

function BlogSkeleton() {
  return (
    <div className="blog-skeleton">
      {[...Array(PAGE_SIZE)].map((_, i) => (
        <div key={i} className="blog-skeleton-card">
          <div className="blog-skeleton-img animate-pulse" />
          <div className="blog-skeleton-body">
            <div className="blog-skeleton-tag animate-pulse" />
            <div className="blog-skeleton-title animate-pulse" />
            <div className="blog-skeleton-text animate-pulse" />
            <div
              className="blog-skeleton-text animate-pulse"
              style={{ width: "60%" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

function Blog() {
  const [posts, setPosts] = useState<PrismicDocument[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  // Initial load — all posts
  useEffect(() => {
    let active = true;
    setInitialLoading(true);

    fetchAllPosts()
      .then((docs) => {
        if (!active) return;
        setPosts(docs);
        setInitialLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch blog posts:", err);
        if (active) {
          setInitialLoading(false);
        }
      });

    return () => { active = false; };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Blog | DocGenius"
        description="Insights, guides, and tips on document generation, Salesforce integrations, and automating your document workflows with DocGenius."
        path="/blog"
      />
      <Header />
      <main className="blog-page">
        {/* Hero */}
        <section className="blog-hero">
          <div className="blog-hero-inner">
            <span className="blog-hero-badge">Our Blog</span>
            <h1 className="blog-hero-title">
              Insights, Guides &amp; <br />
              <span className="blog-hero-title-accent">DocGenius Tips</span>
            </h1>
            <p className="blog-hero-subtitle">
              Practical advice on document automation, Salesforce integrations,
              and streamlining your document workflows.
            </p>
          </div>
          <div className="blog-hero-glow" />
        </section>

        {/* Posts */}
        <section className="blog-content">
          <div className="blog-content-inner">
            {initialLoading && <BlogSkeleton />}

            {!initialLoading && posts.length === 0 && (
              <div className="blog-empty-state">
                <div className="blog-empty-media">
                  <img
                    src={noBlogFound}
                    className="mx-auto w-2/3 max-w-[16rem] h-auto rounded-2xl"
                    alt="No published posts yet"
                  />
                </div>
                <h3>No published blog posts yet</h3>
                <p>
                  We are currently writing and configuring our blog posts.
                </p>
              </div>
            )}

            {!initialLoading && posts.length > 0 && (
              <>
                <div className="blog-grid">
                  {posts.map((doc) => (
                    <BlogCard key={doc.id} doc={doc} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Blog;
