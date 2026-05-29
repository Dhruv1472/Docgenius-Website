import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  robots?: string;
  schema?: Record<string, any>;
};

const SITE_NAME = "DocGenius";
const DEFAULT_IMAGE = "/case-hero.png";
const DEFAULT_ORIGIN =
  typeof window !== "undefined" ? window.location.origin : "https://docgenius.ai";

const getBaseUrl = () =>
  (import.meta.env.VITE_SITE_URL || DEFAULT_ORIGIN).replace(/\/$/, "");

const upsertMeta = (identifier: { name?: string; property?: string }, content: string) => {
  if (!content) return;
  const { name, property } = identifier;
  const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
  let tag = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!tag) {
    tag = document.createElement("meta");
    if (name) tag.setAttribute("name", name);
    if (property) tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const upsertLink = (rel: string, href: string) => {
  if (!href) return;
  let link = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
};

export const Seo = ({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  robots = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  schema,
}: SeoProps) => {
  useEffect(() => {
    const baseUrl = getBaseUrl();
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const url = `${baseUrl}${normalizedPath}`;
    const resolvedImage = image?.startsWith("http") ? image : `${baseUrl}${image}`;

    document.title = title;
    upsertMeta({ name: "description" }, description);
    upsertMeta({ name: "robots" }, robots);
    upsertLink("canonical", url);

    upsertMeta({ property: "og:type" }, type);
    upsertMeta({ property: "og:title" }, title);
    upsertMeta({ property: "og:description" }, description);
    upsertMeta({ property: "og:url" }, url);
    upsertMeta({ property: "og:image" }, resolvedImage);
    upsertMeta({ property: "og:site_name" }, SITE_NAME);

    upsertMeta({ name: "twitter:card" }, "summary_large_image");
    upsertMeta({ name: "twitter:title" }, title);
    upsertMeta({ name: "twitter:description" }, description);
    upsertMeta({ name: "twitter:site" }, "@DocGenius");
    upsertMeta({ name: "twitter:image" }, resolvedImage);

    // Handle Schema.org JSON-LD
    if (schema) {
      let script = document.head.querySelector('script#seo-schema') as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        script.setAttribute("id", "seo-schema");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    } else {
      const script = document.head.querySelector('script#seo-schema');
      if (script) script.remove();
    }
  }, [title, description, path, image, type, robots, schema]);

  return null;
};

export default Seo;
