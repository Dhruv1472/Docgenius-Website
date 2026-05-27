import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
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

    const client = prismic.createClient(PRISMIC_REPO, { fetch });
    const posts = await client.getAllByType("docgenius"); 

    const blogEntries = posts.map((post) => ({
      url: `/blog/${post.uid}`,
      lastmod: post.last_publication_date?.split("T")[0],
      priority: "0.7",
      changefreq: "monthly",
    }));

    const allEntries = [...STATIC_PAGES, ...blogEntries];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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