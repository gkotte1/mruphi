import type { MetadataRoute } from "next";
import { ANNOUNCEMENTS, announcementHref } from "@/lib/announcements";
import { POSTS, blogHref } from "@/lib/blog";
import { SITE_ROUTES, absoluteUrl } from "@/lib/site";

/**
 * /sitemap.xml
 *
 * The static pages come from the register in lib/site.ts; the fourteen articles
 * come from lib/announcements.ts, the same source the listing and the article
 * pages read, so their URLs and dates cannot drift from what the site serves.
 *
 * Every URL is absolute against the canonical production origin. Nothing here
 * is hardcoded to a host: absoluteUrl() resolves against SITE_URL, which
 * defaults to https://murphi.ai and never to localhost.
 *
 * Not listed, by intent: /api/* (not a page), /integration and the root-level
 * article slugs (both are 308 redirects), and any route the site does not serve.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = SITE_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  /* Articles carry a real publication date, so they can state lastModified. */
  const articles = ANNOUNCEMENTS.map((announcement) => ({
    url: absoluteUrl(announcementHref(announcement)),
    lastModified: announcement.datetime,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  /* Posts carry a publication date too. */
  const posts = POSTS.map((post) => ({
    url: absoluteUrl(blogHref(post)),
    lastModified: post.datetime,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...articles, ...posts];
}
