import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseDocument, type Block } from "@/lib/document";

/**
 * The single source of truth for announcements - the listing page and every
 * article page read from here.
 *
 * Card fields come from website-research/company/announcements.md ("Announcement
 * cards (14)"). The article pages themselves come from the later pass in
 * website-research-1/company/announcements/announcement-details/, extracted by
 * scripts/extract-announcements.mjs into content/announcements/. The two passes
 * agree on slug, title, listing date and image for all fourteen.
 */

export type Announcement = {
  /** Root-level article route, exactly as the research records it. */
  slug: string;
  title: string;
  /** The printed date. */
  date: string;
  /** The machine date recorded alongside it. */
  datetime: string;
  category: string;
  categoryHref: string;
  image: string;
  alt: string;
};

const CATEGORY_NEWS = {
  category: "News & Announcements",
  categoryHref: "/category/news-announcements/",
};

const CATEGORY_IN_THE_NEWS = {
  category: "In the News",
  categoryHref: "/category/news-announcements/",
};

export const ANNOUNCEMENTS: Announcement[] = [
  {
    slug: "murphi-ai-wins-bronze-stevie-award-at-the-2026-american-business-awards",
    title:
      "Murphi.ai is awarded the BRONZE STEVIE WINNER Award for AI in Healthcare Achievement.",
    date: "June 14, 2026",
    datetime: "2026-06-14",
    ...CATEGORY_NEWS,
    image: "/images/announcements/ChatGPT-Image-Jun-16-2026-10_41_35-AM.png",
    alt: "Murphi.ai wins the Bronze Stevie Award for AI in Healthcare Achievement",
  },
  {
    slug: "revenue-assurance-compliance-reports-for-home-health-hospice",
    title:
      "Murphi.ai launched Revenue Assurance & Compliance Reports for Home Health & Hospice. Generate Coding, QA, and compliance reports with Evidence Preview Optimizer - turn Spanish clinical inputs into English reports in minutes.",
    date: "June 9, 2026",
    datetime: "2026-06-09",
    ...CATEGORY_NEWS,
    image:
      "/images/announcements/Revenue-Assurance-for-Home-Health-Hospice-2-1536x1024.png",
    alt: "Murphi.ai Revenue Assurance and compliance reports for home health and hospice, turning Spanish clinical documentation into English reports",
  },
  {
    slug: "stuart-smith-joins-murphi-board-advisor",
    title:
      "Stuart Smith, Sr Leader from Duke Health System joins Murphi as Board Advisor",
    date: "June 2, 2026",
    datetime: "2026-06-02",
    ...CATEGORY_NEWS,
    image: "/images/announcements/Frame-1618871889-5-1536x717.png",
    alt: "Stuart Smith Of Duke Health Joins Murphi As Board Advisor",
  },
  {
    slug: "docuguard-connects-with-murphi",
    title: "DocuGuard Connects with Murphi to Transform the Healthcare Industry",
    date: "June 1, 2026",
    datetime: "2026-06-01",
    ...CATEGORY_NEWS,
    image: "/images/announcements/Frame-1618871891-1536x879.png",
    alt: "DocuGuard Integrates with Murphi to Transform Healthcare Workflows",
  },
  {
    slug: "murphi-ai-business-insider-healthcare-ai-growth",
    title:
      "Murphi.ai Featured in Business Insider for Driving Healthcare AI Automation Across EHR and RCM",
    date: "May 29, 2026",
    datetime: "2026-05-29",
    ...CATEGORY_NEWS,
    image:
      "/images/announcements/woman-physician-offering-drugs-painkillers-prescription-medicine-1-1536x864.jpg",
    alt: "Build vs buy AI healthcare",
  },
  {
    slug: "murphi-ai-apple-news",
    title:
      "Guru Tadiparti and Murphi.ai Featured in Apple News for Advancing Healthcare AI Platforms",
    date: "May 21, 2026",
    datetime: "2026-05-21",
    ...CATEGORY_NEWS,
    image:
      "/images/announcements/team-young-nurses-learning-practice-from-doctor-expert-cabinet-1536x1024.jpg",
    alt: "Murphi.ai Apple News",
  },
  {
    slug: "murphi-ai-meditech-today",
    title:
      "Murphi.ai Featured in Meditech Today for Modernising Revenue Cycle and Patient Payments with AI",
    date: "May 14, 2026",
    datetime: "2026-05-14",
    ...CATEGORY_NEWS,
    image:
      "/images/announcements/old-woman-asking-general-practitioner-about-disease-prevention-new-treatment-1536x1024.jpg",
    alt: "SNF billing automation",
  },
  {
    slug: "murphi-ai-tech-times",
    title:
      "Murphi.ai Featured in Tech Times for Its Horizontal Healthcare AI Platform",
    date: "May 7, 2026",
    datetime: "2026-05-07",
    ...CATEGORY_NEWS,
    image: "/images/announcements/medic-team-discussing-germs-clinic-2-1536x1024.jpg",
    alt: "Murphi.ai featured in Tech Times for its horizontal healthcare AI platform",
  },
  {
    slug: "murphi-ais-playbook-for-making-healthcare-platforms-ai-native-without-the-rebuild",
    title:
      "Murphi.ai’s Playbook for Making Healthcare Platforms AI-Native Without the Rebuild",
    date: "February 19, 2026",
    datetime: "2026-02-19",
    ...CATEGORY_IN_THE_NEWS,
    image: "/images/announcements/Frame-1618872139-1536x1024.png",
    alt: "Murphi.ai playbook for making healthcare platforms AI-native without a rebuild",
  },
  {
    slug: "murphi-ais-horizontal-native-ai-platform-one-integration-multiple-healthcare-workflows",
    title:
      "Murphi.ai’s Horizontal Native AI Platform: One Integration, Multiple Healthcare Workflows",
    date: "February 13, 2026",
    datetime: "2026-02-13",
    ...CATEGORY_IN_THE_NEWS,
    image: "/images/announcements/Frame-1618872141-1-1536x1024.png",
    alt: "Murphi.ai horizontal native AI platform - one EHR integration, multiple healthcare workflows",
  },
  {
    slug: "inside-murphi-ais-ai-blueprint-for-modernizing-rcm-patient-payments-and-contract-optimization",
    title:
      "Inside Murphi.ai’s AI Blueprint for Modernizing RCM, Patient Payments, and Contract Optimization",
    date: "February 13, 2026",
    datetime: "2026-02-13",
    ...CATEGORY_IN_THE_NEWS,
    image: "/images/announcements/3-3-1536x1025.png",
    alt: "Murphi.ai AI blueprint for modernizing RCM, patient payments and contract optimization",
  },
  {
    slug: "how-guru-tadiparti-steered-murphi-ai-by-embedding-ai-into-healthcare-platforms",
    title:
      "How Guru Tadiparti Steered Murphi.ai by Embedding AI into Healthcare Platforms",
    date: "January 31, 2026",
    datetime: "2026-01-31",
    ...CATEGORY_IN_THE_NEWS,
    image: "/images/announcements/Frame-1618872142-1536x931.png",
    alt: "Guru Tadiparti on embedding AI into healthcare platforms at Murphi.ai",
  },
  {
    slug: "murphi-ai-posts-strong-arr-growth-by-embedding-ai-automation-across-ehr-rcm-and-healthcare-platforms",
    title:
      "Murphi.ai Posts Strong ARR Growth by Embedding AI Automation Across EHR, RCM, and Healthcare Platforms",
    date: "January 31, 2026",
    datetime: "2026-01-31",
    ...CATEGORY_IN_THE_NEWS,
    image: "/images/announcements/Frame-1618872137-1-1536x1081.png",
    alt: "Murphi.ai ARR growth from embedding AI automation across EHR, RCM and healthcare platforms",
  },
  {
    slug: "why-mental-health-and-post-acute-platforms-are-turning-to-murphi-ais-ai-inside-white-label-model",
    title:
      "Why Mental Health and Post-Acute Platforms Are Turning to Murphi.ai’s “AI-Inside” White-Label Model",
    date: "January 31, 2026",
    datetime: "2026-01-31",
    ...CATEGORY_IN_THE_NEWS,
    image: "/images/announcements/Frame-1618872138-1536x1024.png",
    alt: "Mental health and post-acute platforms adopting the Murphi.ai AI-Inside white-label model",
  },
];

/** The route the card links to, and the route the article page answers on. */
export function announcementHref(announcement: Announcement) {
  return `/announcements/${announcement.slug}/`;
}

export function findAnnouncement(slug: string) {
  const index = ANNOUNCEMENTS.findIndex((item) => item.slug === slug);
  if (index === -1) return null;

  return {
    announcement: ANNOUNCEMENTS[index],
    /** Listing order is newest first, so "previous" is the newer neighbour. */
    previous: index > 0 ? ANNOUNCEMENTS[index - 1] : null,
    next: index < ANNOUNCEMENTS.length - 1 ? ANNOUNCEMENTS[index + 1] : null,
  };
}

/**
 * One article, as collected from the detail-page research: the identity fields
 * the source page carried, the recorded in-body links, and the body itself.
 */
export type Article = {
  slug: string;
  title: string;
  pageTitle: string;
  description: string;
  published: string;
  listingDate: string;
  category: string;
  categoryHref: string;
  image: string;
  alt: string;
  links: { text: string; href: string }[];
};

const ARTICLES: Article[] = JSON.parse(
  readFileSync(join(process.cwd(), "content", "announcements", "index.json"), "utf8"),
);

export function findArticle(slug: string): Article | null {
  return ARTICLES.find((article) => article.slug === slug) ?? null;
}

/** The article body, parsed from the document the extraction wrote. */
export function readArticleBody(slug: string): Block[] {
  const file = join(process.cwd(), "content", "announcements", `${slug}.md`);
  return parseDocument(readFileSync(file, "utf8"));
}
