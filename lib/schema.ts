import { ANNOUNCEMENTS, type Article } from "@/lib/announcements";
import { type BlogPost } from "@/lib/blog";
import { FAQS, type FaqItem } from "@/lib/faqs";
import { SITE_URL, SITE_ROUTES, absoluteUrl } from "@/lib/site";

/**
 * schema.org descriptions of what the site already says.
 *
 * These render as JSON-LD in a <script> tag — nothing is drawn, nothing moves,
 * and no visible copy changes. Every value is read from a register the pages
 * themselves render (lib/site.ts, lib/faqs.ts, lib/announcements.ts), so the
 * markup cannot describe a page, question or article the site does not serve.
 *
 * Nothing is asserted that the site does not already state: no ratings, no
 * review counts, no prices, no awards beyond the announcements, and no
 * certifications beyond the ones the Security page lists.
 */

/* The organisation identity, referenced by @id from every other node so the
   graph resolves to one entity rather than several near-duplicates. */
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

/** The social profiles the footer links, as sameAs entries. */
const PROFILES = [
  "https://www.linkedin.com/company/murphi-ai",
  "https://www.instagram.com/murphi.ai/",
  "https://www.facebook.com/people/Murphi-AI/61573179414309/",
  "https://x.com/MurphiAI",
];

/** Organization + WebSite. Rendered once, in the root layout. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "Murphi.ai",
        legalName: "Deskfactors Inc.",
        url: `${SITE_URL}/`,
        logo: absoluteUrl("/brand/app-icons/murphi-icon-192.png"),
        image: absoluteUrl("/og-image.png"),
        description:
          "Murphi.ai is an AI platform for Home Health and Hospice agencies, covering ambient documentation, revenue assurance, patient engagement and patient payments, connected to the EHR an agency already uses.",
        email: "info@murphi.ai",
        address: {
          "@type": "PostalAddress",
          streetAddress: "4804 Page Creek Lane",
          addressLocality: "Durham",
          addressRegion: "NC",
          postalCode: "27703",
          addressCountry: "US",
        },
        sameAs: PROFILES,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "info@murphi.ai",
          url: absoluteUrl("/contact-us/"),
          areaServed: "US",
          availableLanguage: "English",
        },
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: `${SITE_URL}/`,
        name: "Murphi.ai",
        publisher: { "@id": ORG_ID },
        inLanguage: "en-US",
      },
    ],
  };
}

/**
 * SoftwareApplication for one module page.
 *
 * No `offers` node: the site publishes no pricing, and inventing one would be
 * a claim it does not make.
 */
export function moduleSchema(path: string) {
  const route = SITE_ROUTES.find((entry) => entry.path === path);
  if (!route) return null;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${absoluteUrl(path)}#software`,
    name: `Murphi.ai — ${route.title.split(" — ")[0]}`,
    url: absoluteUrl(path),
    description: route.description,
    applicationCategory: "HealthApplication",
    applicationSubCategory: "Home Health and Hospice software",
    operatingSystem: "Web-based, iOS, Android",
    publisher: { "@id": ORG_ID },
    provider: { "@id": ORG_ID },
    audience: {
      "@type": "BusinessAudience",
      name: "Home Health and Hospice agencies",
    },
  };
}

/** FAQPage for a page that renders an FAQ accordion. */
export function faqSchema(items: readonly FaqItem[], path: string) {
  if (items.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** Every FAQ on the site, for /faqs/, in the order that page lists them. */
export function allFaqsSchema(path: string) {
  const items = Object.values(FAQS).flat();
  return faqSchema(items, path);
}

/** Article for one announcement. */
export function articleSchema(article: Article) {
  const card = ANNOUNCEMENTS.find((item) => item.slug === article.slug);
  const path = `/announcements/${article.slug}/`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(path)}#article`,
    headline: article.pageTitle,
    description: article.description,
    url: absoluteUrl(path),
    image: absoluteUrl(article.image),
    datePublished: article.published,
    dateModified: article.published,
    articleSection: article.category,
    inLanguage: "en-US",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": SITE_ID },
    ...(card ? { alternativeHeadline: card.title } : {}),
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
  };
}

/**
 * BreadcrumbList, matching the visible Breadcrumb component on the module and
 * audience pages — the trail it draws is Home › <page>.
 */
export function breadcrumbSchema(path: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      { "@type": "ListItem", position: 2, name, item: absoluteUrl(path) },
    ],
  };
}

/* ── Blog ─────────────────────────────────────────────────── */

/** Article for one blog post. */
export function blogArticleSchema(post: BlogPost) {
  const path = `/blog/${post.slug}/`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(path)}#article`,
    headline: post.seo.seoTitle || post.title,
    alternativeHeadline: post.title,
    description: post.seo.metaDescription,
    url: absoluteUrl(path),
    image: absoluteUrl(post.image),
    datePublished: post.datetime,
    dateModified: post.datetime,
    articleSection: post.category,
    keywords: [post.seo.primaryKeyword, ...post.seo.supportingKeywords].join(", "),
    inLanguage: "en-US",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": SITE_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
  };
}

/**
 * FAQPage for a post's own FAQ section.
 *
 * Only emitted when the article actually carries question-and-answer pairs —
 * an empty node would describe content the page does not have.
 */
export function blogFaqSchema(
  faqs: readonly { q: string; a: string }[],
  path: string,
) {
  return faqSchema(faqs, path);
}
