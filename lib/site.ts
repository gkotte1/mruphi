import type { Metadata } from "next";

/**
 * The canonical production origin, and the register of indexable routes.
 *
 * One list feeds app/sitemap.ts, app/robots.ts and app/llms.txt, so a page can
 * never appear in one and be missing from another. Adding a public page means
 * adding one entry here.
 *
 * The origin defaults to the production domain. Next's own fallback for an
 * unset metadataBase is the local dev origin, which would ship development URLs
 * in a production build's canonical, Open Graph and Twitter tags.
 * NEXT_PUBLIC_SITE_URL overrides it for any other deployment.
 */

/* A blank value counts as unset, so it can never yield an invalid origin. */
const CONFIGURED_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const SITE_URL = (CONFIGURED_ORIGIN || "https://murphi.ai").replace(
  /\/+$/,
  "",
);

/** A site-relative path, resolved against the canonical origin. */
export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

/** Which part of the site a route belongs to — the grouping llms.txt prints. */
export type RouteGroup =
  | "core"
  | "modules"
  | "audiences"
  | "platform"
  | "company"
  | "legal";

export type SiteRoute = {
  /** Route path, with the trailing slash next.config.ts enforces. */
  path: string;
  /** The page's own title, as its metadata already states it. */
  title: string;
  /** The page's own description, as its metadata already states it. */
  description: string;
  group: RouteGroup;
  priority: number;
  changeFrequency: ChangeFrequency;
};

/**
 * Every publicly reachable, indexable page.
 *
 * Deliberately absent: /api/* (not a page), /integration and the root-level
 * article slugs (308 redirects declared in next.config.ts, so indexing them
 * would duplicate their destinations), and the individual announcement
 * articles, which are appended from lib/announcements.ts so the fourteen can
 * never drift from their real publication dates.
 */
export const SITE_ROUTES: readonly SiteRoute[] = [
  {
    path: "/",
    title: "Murphi.ai — AI for Every Home Health & Hospice Workflow",
    description:
      "Murphi integrates with the EHRs your agency uses and automates the work around patient care.",
    group: "core",
    priority: 1,
    changeFrequency: "monthly",
  },

  /* ── AI Modules ── */
  {
    path: "/ambient-ai-dictation/",
    title: "Ambient AI & Dictation",
    description:
      "Murphi's Ambient AI listens during assessments or converts clinician dictation into structured Home Health and Hospice documentation — with multi-language, medications, wound care and M1800/GG capture, synced to your EHR the same day.",
    group: "modules",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/revenue-assurance/",
    title: "Revenue Assurance",
    description:
      "Murphi reviews every chart the day it's written — fetched straight from your EHR — and surfaces coding, OASIS, POC, PDGM and ADR gaps while there's still time to fix them.",
    group: "modules",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/patient-engagement/",
    title: "Patient Engagement",
    description:
      "Murphi.ai's Patient Engagement layer: secure staff messaging, browser/SMS messaging for patients and families with no app required, broadcast messaging, visit confirmation automation, document signature, and full communication history — synced to your EHR.",
    group: "modules",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/patient-payments/",
    title: "Patient Payments",
    description:
      "Murphi turns a patient balance into a text with a secure link — ACH, debit or credit — with payment status and reconciliation written back to your EHR ledger.",
    group: "modules",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/referral-to-noa/",
    title: "Referral → NOA — Launching Soon",
    description:
      "Murphi classifies, checks and routes referrals the moment they arrive — from fax, email, portal, API or EHR — so the wait is measured in minutes, not a weekend.",
    group: "modules",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/ai-driven-rcm/",
    title: "AI-Driven RCM — Launching Soon",
    description:
      "Murphi tracks each claim across eligibility, authorization, documentation and coding — and intercepts issues while they're still a fixable step, not a finished denial.",
    group: "modules",
    priority: 0.7,
    changeFrequency: "monthly",
  },

  /* ── Who We Serve ── */
  {
    path: "/agencies/",
    title: "Home Health & Hospice Agencies",
    description:
      "Murphi doesn't ask you to replace the EHR you already run the agency on. It sits alongside it — one module, or six.",
    group: "audiences",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/coding-billing-rcm/",
    title: "Coding, Billing, RCM & Consulting Companies",
    description:
      "Murphi gives coding and billing consultants AI-powered compliance and revenue tools that work the same way across every client.",
    group: "audiences",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/ehr-companies/",
    title: "Home Health & Hospice EHR Companies",
    description:
      "Murphi.ai enables Home Health, Hospice and Palliative Care platforms to introduce ambient documentation, intelligent assessments, clinical quality checks, and compliance workflows.",
    group: "audiences",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/accreditation-bodies/",
    title: "Accreditation Bodies",
    description:
      "Murphi.ai helps the agency walk in prepared, and helps the accreditation body turn evidence into a finished report faster.",
    group: "audiences",
    priority: 0.8,
    changeFrequency: "monthly",
  },

  /* ── Platform & Support ── */
  {
    path: "/integrations/",
    title: "Integrations",
    description:
      "Five integration methods — Agentic AI, RPA, FHIR R4, HL7 v2, and Direct API. No EHR replacement required. Live in days.",
    group: "platform",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/security/",
    title: "HIPAA-Compliant AI Security & Compliance",
    description:
      "Murphi.ai maintains enterprise-grade security with HIPAA compliance, SOC 2 certification, end-to-end encryption, and role-based access control to protect patient data.",
    group: "platform",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/download-app/",
    title: "Download Murphi.ai App | AI Healthcare For IOS & Android",
    description:
      "Download the Murphi.ai app on iOS or Android to access AI-powered clinical documentation, ambient AI, and medical billing tools on the go.",
    group: "platform",
    priority: 0.6,
    changeFrequency: "monthly",
  },

  /* ── Company & Resources ── */
  {
    path: "/about-us/",
    title: "About Murphi.ai",
    description:
      "Murphi.ai is a AI Native automation platform purpose built for U.S. healthcare, with AI modules purpose-built for Home Health and Hospice.",
    group: "company",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/contact-us/",
    title: "Contact Murphi.ai | Talk To A Healthcare AI Expert",
    description:
      "Contact Murphi.ai for healthcare AI automation. Talk to our enterprise AI specialists about EHR integrations, custom modules, and pricing.",
    group: "company",
    priority: 0.7,
    changeFrequency: "yearly",
  },
  {
    path: "/announcements/",
    title: "Announcements | Latest Healthcare AI News",
    description:
      "Stay updated with the latest Murphi.ai product announcements, AI healthcare milestones, partnerships, and platform updates.",
    group: "company",
    priority: 0.7,
    changeFrequency: "weekly",
  },
  {
    path: "/faqs/",
    title: "Frequently Asked Questions",
    description:
      "Every Murphi.ai FAQ in one place — general questions plus the questions asked on each module and audience page.",
    group: "company",
    priority: 0.6,
    changeFrequency: "monthly",
  },

  /* ── Legal ── */
  {
    path: "/privacy-policy/",
    title: "Privacy Policy | HIPAA-Compliant Data Protection",
    description:
      "Murphi.ai's privacy policy explains how we collect, store, and protect your data in compliance with HIPAA, GDPR, and other applicable data protection regulations.",
    group: "legal",
    priority: 0.3,
    changeFrequency: "yearly",
  },
  {
    path: "/terms-of-service/",
    title: "Terms Of Service | Platform Usage Agreement",
    description:
      "Read Murphi.ai's Terms of Service outlining the usage rights, restrictions, and legal agreements for accessing our AI healthcare platform and services.",
    group: "legal",
    priority: 0.3,
    changeFrequency: "yearly",
  },
  {
    path: "/ai-terms/",
    title: "AI Terms Of Use | Artificial Intelligence Policy",
    description:
      "Review Murphi.ai's AI-specific terms of use governing the use of artificial intelligence features, data processing, and automated outputs within the platform.",
    group: "legal",
    priority: 0.3,
    changeFrequency: "yearly",
  },
];

/** The routes in one section of the site, in register order. */
export function routesIn(group: RouteGroup) {
  return SITE_ROUTES.filter((route) => route.group === group);
}

/** The shared social card. One image serves the whole site. */
const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Murphi.ai — AI-powered workforce intelligence",
};

/**
 * A page's metadata, with its canonical and Open Graph URL filled in from its
 * own route.
 *
 * Next replaces — rather than merges — a parent's `openGraph` as soon as a page
 * declares one, so setting og:url page by page would otherwise drop the site
 * name, type and card image inherited from the root layout. This restates them
 * once, here, instead of in twenty page files.
 *
 * `path` must be a route the register above lists, so a canonical URL can never
 * point at a page the sitemap omits.
 */
export function pageMetadata(
  path: string,
  meta: Metadata & { title: string; description: string },
): Metadata {
  if (process.env.NODE_ENV !== "production") {
    if (!SITE_ROUTES.some((route) => route.path === path)) {
      throw new Error(`pageMetadata: ${path} is not in SITE_ROUTES (lib/site.ts)`);
    }
  }

  return {
    ...meta,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Murphi.ai",
      url: absoluteUrl(path),
      title: meta.title,
      description: meta.description,
      images: [OG_IMAGE],
      ...meta.openGraph,
    },
  };
}
