import Link from "next/link";
import { Logo } from "@/components/Logo";
import { AI_MODULES } from "@/lib/nav-data";
import { Icon, type IconName } from "@/components/icons";

type FooterLink = { label: string; href: string; soon?: boolean };

/* Modules come from the nav data so the two never drift — the labels and the
   "Soon" flags are already the source strings. */
const MODULES: FooterLink[] = AI_MODULES.items.map((item) => ({
  label: item.label,
  href: item.href,
  soon: item.soon,
}));

const COLUMNS: { heading: string; links: FooterLink[] }[] = [
  { heading: "Modules", links: MODULES },
  {
    heading: "Company & Resources",
    links: [
      { label: "Who We Serve", href: "/agencies/" },
      { label: "About Us", href: "/about-us/" },
      { label: "Blog", href: "/blogs/" },
      { label: "Announcements", href: "/announcements/" },
      { label: "FAQs", href: "/faqs/" },
      { label: "Contact Us", href: "/contact-us/" },
    ],
  },
  {
    heading: "Platform & Support",
    links: [
      { label: "Integrations", href: "/integrations/" },
      { label: "Security", href: "/security/" },
      { label: "Download App", href: "/download-app/" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy/" },
      { label: "Terms of Service", href: "/terms-of-service/" },
      { label: "AI Terms of Use", href: "/ai-terms/" },
    ],
  },
];

/* Category marks, not certification seals — the real seals need 64px to stay
   legible, which is far larger than this row should be. */
const COMPLIANCE: { label: string; icon: IconName }[] = [
  { label: "HIPAA", icon: "shield" },
  { label: "SOC 2", icon: "sealcheck" },
  { label: "ISO 27001", icon: "check" },
  { label: "BAA", icon: "doc" },
];

/* No account URLs are recorded anywhere in the project — replace these four
   values and nothing else needs to change. */
/* The live accounts. These replace the placeholder hrefs the footer carried
   until the real profiles were confirmed. */
const SOCIAL: { label: string; href: string; icon: IconName }[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/murphi-ai",
    icon: "linkedin",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/murphi.ai/",
    icon: "instagram",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Murphi-AI/61573179414309/",
    icon: "facebook",
  },
  { label: "X", href: "https://x.com/MurphiAI", icon: "x" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-grey-mid bg-grey-bg">
      <div className="mx-auto w-full max-w-[1280px] px-10 pt-20 pb-8 max-1200:px-8 max-1024:pt-16 max-600:px-4 max-600:pt-12">
        <div className="grid grid-cols-[1.5fr_repeat(4,minmax(0,1fr))] gap-x-10 max-1200:gap-x-8 max-1024:grid-cols-3 max-1024:gap-y-11 max-600:grid-cols-1 max-600:gap-y-9">
          {/* ── Brand ── */}
          <div className="min-w-0">
            <Link href="/" className="inline-block" aria-label="Murphi.ai home">
              <Logo height={30} />
            </Link>

            <p className="mt-5 max-w-[280px] text-[13.5px] leading-relaxed text-grey-dk/80">
              AI for Home Health &amp; Hospice.
              <br />
              Operated by Deskfactors Inc.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {COMPLIANCE.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-1.5 rounded-[8px] border border-brand-border/50 bg-white px-2 py-[5px] text-[9.5px] font-bold uppercase leading-none tracking-[0.06em] text-grey-dk/75"
                >
                  <Icon
                    name={item.icon}
                    width={11}
                    height={11}
                    className="shrink-0 text-brand-dark/70"
                  />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Navigation ── */}
          {COLUMNS.map((column) => (
            <nav key={column.heading} className="min-w-0" aria-label={column.heading}>
              <p className="text-[10.5px] font-bold uppercase leading-none tracking-[0.1em] text-brand-deep/55">
                {column.heading}
              </p>

              <ul className="mt-6 grid gap-[13px]">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-baseline gap-2 text-[13.5px] font-medium leading-snug text-grey-dk/85 transition-colors duration-200 hover:text-brand-dark"
                    >
                      {link.label}
                      {link.soon ? (
                        <span className="shrink-0 text-[9px] font-bold uppercase leading-none tracking-[0.08em] text-brand-deep">
                          Soon
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 h-px bg-grey-mid max-1024:mt-12 max-600:mt-10" />

        {/* ── Bottom row ── */}
        <div className="flex items-center justify-between gap-6 pt-7 max-600:flex-col-reverse max-600:items-start max-600:gap-5">
          <p className="text-[12.5px] font-medium text-grey-dk/60">
            © 2026 Deskfactors Inc. / Murphi.ai. All rights reserved.
          </p>

          <ul className="flex shrink-0 items-center gap-2.5">
            {SOCIAL.map((item) => (
              <li key={item.label}>
                {/* These leave the site, so a plain anchor with target and the
                    matching rel — not next/link, which routes internally. */}
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Murphi.ai on ${item.label}`}
                  className="flex size-9 items-center justify-center rounded-[10px] border border-brand-border/50 bg-white text-grey-dk/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-border hover:bg-brand-tint hover:text-brand-dark"
                >
                  <Icon name={item.icon} width={16} height={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
