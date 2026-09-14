import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/**
 * /robots.txt
 *
 * Every public page is crawlable. The only exclusion is /api/, which holds the
 * contact-form handler and serves no indexable content - nothing under /_next/
 * is blocked, so crawlers keep fetching the CSS, JavaScript, fonts and images
 * they need to render the pages they index.
 *
 * llms.txt is linked for answer-engine crawlers that look for a plain-text map.
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/").replace(/\/$/, ""),
  };
}
