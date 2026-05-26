import * as prismic from "@prismicio/client";

export const PRISMIC_BLOG_TYPE = "docgenius";

/**
 * Creates a Prismic API client configured from environment variables.
 *
 * Environment variables used:
 *   VITE_PRISMIC_REPO        – Prismic repository name (required)
 *   VITE_PRISMIC_ACCESS_TOKEN – Access token (optional but recommended)
 */
export function createClient() {
  const repositoryName = "docgenius-web";

  const client = prismic.createClient(repositoryName, {
    accessToken: "MC5haFZlUkJFQUFDQUFnb29f.CRl0Thjvv73vv73vv73vv71J77-9VXDvv71d77-977-977-977-9AO-_ve-_ve-_vXjvv71ZNEjvv73vv73vv73vv70",
  });

  return client;
}
