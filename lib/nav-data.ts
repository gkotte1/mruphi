import type { IconName } from "@/components/icons";

export type NavItem = {
  /** Ordinal shown in the AI Modules menu, e.g. "01". */
  index?: string;
  label: string;
  description: string;
  href: string;
  icon: IconName;
  soon?: boolean;
};

export type NavGroup = {
  label: string;
  /** Menu width in px — the two menus carry different amounts of copy. */
  width: number;
  columns: 1 | 2;
  items: NavItem[];
};

export const AI_MODULES: NavGroup = {
  label: "AI Modules",
  width: 720,
  columns: 2,
  items: [
    {
      index: "01",
      label: "Ambient AI & Dictation",
      description: "Documentation accuracy",
      href: "/ambient-ai-dictation/",
      icon: "mic",
    },
    {
      index: "02",
      label: "Revenue Assurance",
      description: "Coding, OASIS, POC, PDGM, ADRs",
      href: "/revenue-assurance/",
      icon: "chartup",
    },
    {
      index: "03",
      label: "Patient Engagement",
      description: "HIPAA-compliant messaging",
      href: "/patient-engagement/",
      icon: "community",
    },
    {
      index: "04",
      label: "Patient Payments",
      description: "Patient payment collections",
      href: "/patient-payments/",
      icon: "card",
    },
    {
      index: "05",
      label: "Referral \u2192 NOA",
      description: "Referral to NOA automation",
      href: "/referral-to-noa/",
      icon: "route",
      soon: true,
    },
    {
      index: "06",
      label: "AI-Driven RCM",
      description: "Claims processing & denial appeals",
      href: "/ai-driven-rcm/",
      icon: "exchange",
      soon: true,
    },
  ],
};

export const WHO_WE_SERVE: NavGroup = {
  label: "Who We Serve",
  width: 420,
  columns: 1,
  items: [
    {
      label: "Home Health & Hospice Agencies",
      description: "Agencies delivering care in the home",
      href: "/agencies/",
      icon: "home",
    },
    {
      label: "Coding, Billing, RCM & Consulting Companies",
      description: "Service partners working across agencies",
      href: "/coding-billing-rcm/",
      icon: "code",
    },
    {
      label: "Home Health & Hospice EHR Companies",
      description: "Platforms embedding Murphi",
      href: "/ehr-companies/",
      icon: "server",
    },
    {
      label: "Accreditation Bodies",
      description: "Standards and survey readiness",
      href: "/accreditation-bodies/",
      icon: "sealcheck",
    },
  ],
};

export const NAV_GROUPS: NavGroup[] = [AI_MODULES, WHO_WE_SERVE];
