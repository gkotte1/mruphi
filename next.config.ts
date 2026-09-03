import type { NextConfig } from "next";
import announcements from "./content/announcements/index.json" with { type: "json" };

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,

  async redirects() {
    return [
      /* The Integration page briefly lived at the singular slug — keep any link
         already pointing there working rather than serving a 404. */
      { source: "/integration", destination: "/integrations/", permanent: true },

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
