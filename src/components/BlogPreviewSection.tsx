import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient, PRISMIC_BLOG_TYPE } from "@/lib/prismic";
import type { PrismicDocument } from "@prismicio/client";

const PAGE_SIZE = 3;

type RichTextBlock = {
  text?: string;
};

function getText(doc: PrismicDocument, field: string): string {
  const value = doc.data?.[field];
  if (typeof value === "string") return value;
  if (Array.isArray(value) && value.length > 0) {
    return value[0]?.text ?? "";
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

function getImageUrl(doc: PrismicDocument): string {
  const img = doc.data?.cover_photo || doc.data?.featured_image || doc.data?.cover_image;
  return img?.url ?? "";
}

function getImageAlt(doc: PrismicDocument): string {
  const explicitAlt = getText(doc, "image_alt_tag");
  if (explicitAlt) return explicitAlt;
  const img = doc.data?.cover_photo || doc.data?.featured_image || doc.data?.cover_image;
  return img?.alt || getText(doc, "blog_title") || getText(doc, "title") || "Blog post cover";
}

function formatDate(dateStr: string | undefined) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getExcerpt(doc: PrismicDocument): string {
  const explicitExcerpt = getText(doc, "excerpt");
  if (explicitExcerpt) return explicitExcerpt;

  const body = richTextToPlainText(doc.data?.Content || doc.data?.content || doc.data?.blog_content_editor || doc.data?.body);
  if (body) {
    return body.length > 120 ? `${body.slice(0, 117)}...` : body;
  }
  return "";
}

function BlogPreviewCard({ doc }: { doc: PrismicDocument }) {
  const title = getText(doc, "blog_title") || getText(doc, "title");
  const excerpt = getExcerpt(doc);
  const coverUrl = getImageUrl(doc);
  const coverAlt = getImageAlt(doc);
  const date = formatDate(doc.data?.publish_date ?? doc.first_publication_date);
  const author = getText(doc, "author_name") || "DocGenius Team";
  const category = getText(doc, "catogary") || getText(doc, "category");
  const readingTime = getText(doc, "reading_time");
  const uid = doc.uid || doc.id;

  return (
    <Link to={`/blog/${uid}`} className="blog-preview-card">
      <div className="blog-preview-image-wrap">
        <img src={coverUrl || "/blog_placeholder.png"} alt={coverAlt} className="blog-preview-image" />
      </div>
      <div className="blog-preview-content">
        <div className="blog-preview-meta-row">
          {category && <span className="blog-preview-chip">{category}</span>}
          {readingTime && <span className="blog-preview-time">{readingTime} min read</span>}
        </div>
        <h3 className="blog-preview-title">{title}</h3>
        {excerpt && <p className="blog-preview-excerpt">{excerpt}</p>}
        <div className="blog-preview-footer">
          <span>By {author}</span>
          {date && <span>{date}</span>}
        </div>
      </div>
    </Link>
  );
}

export function BlogPreviewSection() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PrismicDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadPosts = async () => {
      setLoading(true);
      try {
        const client = createClient();
        const response = await client.getByType(PRISMIC_BLOG_TYPE, {
          pageSize: PAGE_SIZE,
          page: 1,
          orderings: [
            { field: `my.${PRISMIC_BLOG_TYPE}.publish_date`, direction: "desc" },
            { field: "document.first_publication_date", direction: "desc" },
          ],
        });

        if (active) {
          setPosts(response.results.slice(0, PAGE_SIZE));
        }
      } catch (error) {
        console.error("[BlogPreview] Failed to load posts", error);
        if (active) setPosts([]);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadPosts();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="blog" className="section-padding bg-surface">
      <div className="container-narrow">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <span className="inline-flex items-center rounded-full border border-border bg-background px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Latest Articles
          </span>
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold text-foreground">
            Learn from the DocGenius blog
          </h2>
          <p className="mt-3 text-muted-foreground text-base md:text-lg">
            Read the latest updates, workflows, and document automation ideas from the team.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="blog-preview-skeleton animate-pulse">
                <div className="blog-preview-skeleton-image" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-24 rounded-full bg-muted" />
                  <div className="h-6 w-4/5 rounded-full bg-muted" />
                  <div className="h-4 w-full rounded-full bg-muted" />
                  <div className="h-4 w-4/5 rounded-full bg-muted" />
                  <div className="flex justify-between pt-3">
                    <div className="h-4 w-20 rounded-full bg-muted" />
                    <div className="h-4 w-16 rounded-full bg-muted" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-3">
              {posts.map((doc) => (
                <BlogPreviewCard key={doc.id} doc={doc} />
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => navigate("/blog")}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-md transition-transform hover:-translate-y-0.5"
              >
                View More
              </button>
            </div>
          </>
        ) : (
          <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-background p-8 text-center text-muted-foreground shadow-sm">
            No blog posts found yet.
          </div>
        )}
      </div>
    </section>
  );
}

export default BlogPreviewSection;
