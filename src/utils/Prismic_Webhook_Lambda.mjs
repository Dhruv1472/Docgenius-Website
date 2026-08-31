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
const PRISMIC_REPO = process.env.PRISMIC_REPO_NAME;    

const STATIC_PAGES = [
  { url: "/", priority: "1.0", changefreq: "monthly" },
  { url: "/faqs", priority: "0.8", changefreq: "monthly" },
  { url: "/userguide", priority: "0.6", changefreq: "monthly" },
];

export const handler = async (event) => {
  try {

    // Extract updated document IDs from the Prismic webhook payload
    let updatedDocIds = [];
    if (event.body) {
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
          Paths: { Quantity: 1, Items: ["/sitemap.xml"] },
          CallerReference: `sitemap-${Date.now()}`,
        },
      })
    );

    return { statusCode: 200, body: "Sitemap updated successfully" };

  } catch (err) {
    console.error("Error:", JSON.stringify(err));
    return { statusCode: 500, body: "Failed to update sitemap" };
  }
};