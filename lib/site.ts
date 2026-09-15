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

/** Which part of the site a route belongs to - the grouping llms.txt prints. */
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
    title: "Murphi.ai - AI for Every Home Health & Hospice Workflow",
    description:
      "Home health and hospice AI software that connects to the EHR you already use - ambient AI documentation, revenue assurance, patient engagement and patient payments.",
    group: "core",
    priority: 1,
    changeFrequency: "monthly",
  },

  /* ── AI Modules ── */
  {
    path: "/ambient-ai-dictation/",
    title: "Ambient AI & Dictation - AI Scribe for Home Health",
    description:
      "Ambient AI clinical documentation and voice dictation for home health and hospice nurses. OASIS, HOPE, SN, PT, OT and ST notes drafted in minutes and synced to your EHR.",
    group: "modules",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/revenue-assurance/",
    title: "Revenue Assurance - OASIS & PDGM Review Software",
    description:
      "AI chart review for home health and hospice: OASIS, coding, POC, PDGM and ADR gaps surfaced the day the chart is written, fetched straight from your EHR.",
    group: "modules",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/patient-engagement/",
    title: "Patient Engagement - HIPAA-Compliant SMS Platform",
    description:
      "HIPAA-compliant texting and patient engagement for home health and hospice. Secure staff messaging, visit confirmation automation and document signature - no app for patients.",
    group: "modules",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/patient-payments/",
    title: "Patient Payments - Text to Pay & Reconciliation",
    description:
      "Text-to-pay patient balances for home health and hospice - ACH, debit or credit - with payment status and reconciliation written back to your EHR ledger automatically.",
    group: "modules",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/referral-to-noa/",
    title: "Referral → NOA - Intake Automation, Launching Soon",
    description:
      "Home health referral management and intake automation: Murphi classifies, checks and routes referrals from fax, email, portal, API or EHR, so NOA timing is measured in minutes.",
    group: "modules",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/ai-driven-rcm/",
    title: "AI-Driven RCM for Home Health - Launching Soon",
    description:
      "AI-driven revenue cycle management for home health and hospice: claim readiness, denial prevention and ERA/EOB reconciliation tracked across the full claim lifecycle.",
    group: "modules",
    priority: 0.7,
    changeFrequency: "monthly",
  },

  /* ── Who We Serve ── */
  {
    path: "/agencies/",
    title: "Home Health & Hospice Agencies - AI Platform",
    description:
      "A home health and hospice AI platform that sits alongside the EHR your agency already runs on - one module, or six. No replacement, no rip-and-replace project.",
    group: "audiences",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/coding-billing-rcm/",
    title: "Coding, Billing & RCM Companies - Multi-Client AI",
    description:
      "Home health coding, billing and RCM consulting software: AI compliance and revenue review that works the same way across every client, under your own brand.",
    group: "audiences",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/ehr-companies/",
    title: "Home Health & Hospice EHR Companies - Embed AI",
    description:
      "Embed AI into your home health, hospice or palliative care EHR: ambient documentation, intelligent assessments, clinical quality checks and compliance workflows.",
    group: "audiences",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/accreditation-bodies/",
    title: "Accreditation Bodies - Survey Readiness Software",
    description:
      "Hospice and home health compliance software for accreditation bodies and the agencies they survey - evidence validated into survey-ready reports, faster.",
    group: "audiences",
    priority: 0.8,
    changeFrequency: "monthly",
  },

  /* ── Platform & Support ── */
  {
    path: "/integrations/",
    title: "EHR Integrations - FHIR, HL7, API & Agentic AI",
    description:
      "Five home health EHR AI integration methods - Agentic AI, RPA, FHIR R4, HL7 v2 and Direct API. No EHR replacement required. Live in days.",
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
    title: "Download the Murphi.ai App - iOS & Android",
    description:
      "Download the Murphi.ai app on iOS or Android to access AI-powered clinical documentation, ambient AI, and medical billing tools on the go.",
    group: "platform",
    priority: 0.6,
    changeFrequency: "monthly",
  },

  /* ── Company & Resources ── */
  {
    path: "/about-us/",
    title: "About Murphi.ai - Home Health & Hospice AI",
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
    path: "/events/",
    title: "Events",
    description:
      "Upcoming conferences and industry events where you can meet Murphi.ai.",
    group: "company",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/blogs/",
    title: "Blog - Home Health & Hospice AI",
    description:
      "Practical guides for home health and hospice teams on ambient AI documentation, OASIS and PDGM review, patient engagement, payments and EHR integration.",
    group: "company",
    priority: 0.7,
    changeFrequency: "weekly",
  },
  {
    path: "/faqs/",
    title: "Home Health & Hospice AI FAQs",
    description:
      "Answers to the questions home health and hospice teams ask about AI documentation, OASIS review, EHR integration, HIPAA compliance and Murphi.ai pricing.",
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
  alt: "Murphi.ai - AI for Every Home Health & Hospice Workflow",
};

/**
 * A page's metadata, with its canonical and Open Graph URL filled in from its
 * own route.
 *
 * Next replaces - rather than merges - a parent's `openGraph` as soon as a page
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
      locale: "en_US",
      url: absoluteUrl(path),
      title: meta.title,
      description: meta.description,
      images: [OG_IMAGE],
      ...meta.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [OG_IMAGE.url],
      ...meta.twitter,
    },
  };
}
