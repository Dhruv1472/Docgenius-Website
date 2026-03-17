import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  robots?: string;
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
  robots = "index, follow",
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

    upsertMeta({ property: "og:site_name" }, SITE_NAME);
    upsertMeta({ property: "og:title" }, title);
    upsertMeta({ property: "og:description" }, description);
    upsertMeta({ property: "og:type" }, type);
    upsertMeta({ property: "og:url" }, url);
    upsertMeta({ property: "og:image" }, resolvedImage);
    upsertMeta({ property: "og:image:alt" }, `${SITE_NAME} preview`);

    upsertMeta({ name: "twitter:card" }, "summary_large_image");
    upsertMeta({ name: "twitter:title" }, title);
    upsertMeta({ name: "twitter:description" }, description);
    upsertMeta({ name: "twitter:image" }, resolvedImage);
  }, [title, description, path, image, type, robots]);

  return null;
};

export default Seo;
