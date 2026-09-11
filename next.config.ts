import type { NextConfig } from "next";
import announcements from "./content/announcements/index.json" with { type: "json" };

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,

  async redirects() {
    return [
      /* The Integration page briefly lived at the singular slug - keep any link
         already pointing there working rather than serving a 404. */
      { source: "/integration", destination: "/integrations/", permanent: true },
      { source: "/ambient-ai", destination: "/ambient-ai-dictation/", permanent: true },

      /* The listing answers on /blogs/; the bare /blog/ points at it rather
         than 404ing, since each post still lives under /blog/<slug>/. */
      { source: "/blog", destination: "/blogs/", permanent: true },

      /* The articles moved under /announcements/. The old site served them at
         the root, and so did this build for a while, so those keep resolving. */
      ...announcements.map((article) => ({
        source: `/${article.slug}`,
        destination: `/announcements/${article.slug}/`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
