import Link from "next/link";
import type { ReactNode } from "react";
import { Eyebrow, MONO } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * The home hero, built to the reference in
 * "01. HomePAge/Murphi.ai Home LandingPage.html" - its `.hero` section and the
 * `.hero`, `.hero-grid`, `.hero-bullets`, `.hero-ctas`, `.trust-line`,
 * `.stats-row` and `.hero-modules-card` rules, measurement for measurement.
 *
 *   left    eyebrow · h1 · lede · six bulleted modules · CTA · trust line
 *   right   "The Murphi Platform" - the same six modules as a 3×2 card, each
 *           one linking to its page
 *   under    the three figures, ruled, across the full width
 *
 * Two equal columns with a 64px gutter, centred on each other; one column below
 * 1080. The reference marks both halves `reveal in`, i.e. already settled, so
 * the hero carries no entrance animation - only the hover lift on the cards.
 *
 * The figures are the one departure from the reference's own layout, which
 * closes the left column with them. That made the column roughly twice the
 * height of the card beside it, leaving the card adrift in the middle of the
 * gap. Run full width, they give the hero a base line and the two columns a
 * ratio that reads as deliberate. Their type, sizes and rule are unchanged.
 *
 * Colour follows the project's tokens rather than the reference's raw hex,
 * which carries navy, teal, coral and amber values that are not in the brand
 * ramp; the ramp's nearest equivalents are used throughout, and the reference's
 * one gradient (the icon discs) is flat #007EFF, as everywhere else on the site.
 */

/* ── Left column ───────────────────────────────────────── */

type Bullet = { label: string; detail?: string; soon?: boolean };

const BULLETS: Bullet[] = [
  { label: "Ambient AI & Dictation", detail: "Documentation accuracy" },
  {
    label: "Revenue Assurance & QAPI",
    detail: "Coding, OASIS, POC, PDGM, ADRs..",
  },
  { label: "Patient Engagement", detail: "HIPAA-compliant messaging" },
  { label: "Patient Payment Collections" },
  { label: "Referral to NOA automation", soon: true },
  { label: "AI-led claims processing & denial appeals", soon: true },
];

const TRUST = ["HIPAA", "SOC 2", "ISO 27001", "BAA signed"];

const STATS = [
  { value: "70%", label: "Reduction in documentation time" },
  { value: "98.7%", label: "Report accuracy with human review" },
  { value: "<15 days", label: "Collect from patients" },
];

/* ── Right column ──────────────────────────────────────── */

type Module = { name: string; href: string; glyph: ReactNode; soon?: boolean };

/* The reference's own glyphs, traced path for path at its 24 viewBox and 1.6
   stroke. The live ones inherit currentColor so the disc sets the colour. */
const MODULES: Module[] = [
  {
    name: "Ambient AI & Dictation",
    href: "/ambient-ai-dictation/",
    glyph: (
      <>
        <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Z" />
        <path d="M6 11v1a6 6 0 0 0 12 0v-1M12 18v3" strokeLinecap="round" />
      </>
    ),
  },
  {
    name: "Revenue Assurance",
    href: "/revenue-assurance/",
    glyph: (
      <path
        d="M12 3l7 3v6c0 4.4-3 7.8-7 9-4-1.2-7-4.6-7-9V6l7-3Z"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: "Patient Engagement",
    href: "/patient-engagement/",
    glyph: <path d="M4 4h16v12H8l-4 4V4Z" strokeLinejoin="round" />,
  },
  {
    name: "Patient Payments",
    href: "/patient-payments/",
    glyph: (
      <path
        d="M12 3v18M17 7.5c0-1.9-2.2-3-5-3s-5 1.3-5 3 2 2.6 5 3 5 1.1 5 3-2.2 3-5 3-5-1.1-5-3"
        strokeLinecap="round"
      />
    ),
  },
  {
    name: "Referral → NOA",
    href: "/referral-to-noa/",
    soon: true,
    glyph: (
      <path
        d="M5 12h14M13 6l6 6-6 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: "AI-Driven RCM",
    href: "/ai-driven-rcm/",
    soon: true,
    glyph: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M9 12h6M9 15h6M9 9h3" strokeLinecap="round" />
      </>
    ),
  },
];

export default function Hero() {
  return (
    /* .hero - padding:88px 0 0, on the tint; 44px 0 24px under 720. The extra
       80px clears the fixed navbar, which the reference's sticky header did
       not need. */
    <section className="relative isolate overflow-hidden bg-grey-bg pt-[80px]">
      <div
        className={cn(
          /* The reference's own container is 1220/32px, but every section on
             this page runs on the site's 1280/40px one, so the shell follows
             the page and only the hero's interior follows the reference. */
          "mx-auto w-full max-w-[1280px] px-10 max-1200:px-8 max-720:px-5",
          "pt-[88px] pb-16 max-720:pt-11 max-720:pb-12",
        )}
      >
        {/* .hero-grid - two equal columns, 64px gutter, centred on each
            other; one column with a 48px gutter below 1080. */}
        <div className="grid grid-cols-2 items-center gap-16 max-1080:grid-cols-1 max-1080:gap-12">
          <div>
            <div className="mb-4">
              <Eyebrow>Home Health &amp; Hospice</Eyebrow>
            </div>

            <h1 className="type-display mb-5 text-ink">
              The Most Advanced AI Platform for Home Health &amp; Hospice
              Agencies
            </h1>

            {/* .hero p.lede - 17.5px, and the inline 20px bottom margin the
                reference sets on this one paragraph. */}
            <p className="mb-5 max-w-[52ch] text-[17.5px] leading-[1.6] text-grey-500">
              Murphi integrates with the EHRs your agency uses and automates the
              work around patient care.
            </p>

            {/* .hero-bullets - a 5px blue dot, then the module and its detail. */}
            <ul className="mb-8 flex flex-col gap-2.5">
              {BULLETS.map((bullet) => (
                <li
                  key={bullet.label}
                  className="flex items-baseline gap-[9px] text-[14.5px] leading-[1.45] text-grey-500 before:mt-1.5 before:size-[5px] before:shrink-0 before:rounded-full before:bg-brand before:content-['']"
                >
                  <span className="min-w-0">
                    <strong className="font-semibold text-ink">
                      {bullet.label}
                    </strong>
                    {bullet.detail ? <> - {bullet.detail}</> : null}
                    {bullet.soon ? <SoonBadge /> : null}
                  </span>
                </li>
              ))}
            </ul>

            {/* .hero-ctas - one primary action; full width below 720. */}
            <div className="mb-[30px] flex flex-wrap items-center gap-3.5 max-720:flex-col max-720:items-stretch">
              <Link
                href="/contact-us/"
                className="btn-primary max-720:w-full max-720:justify-center"
              >
                Request Demo
              </Link>
            </div>

            {/* .trust-line */}
            <p
              className={cn(
                MONO,
                "flex flex-wrap items-center gap-[9px] text-[12px] tracking-[0.02em] text-ink-muted",
              )}
            >
              {TRUST.map((mark, i) => (
                <span key={mark} className="flex items-center gap-[9px]">
                  {i > 0 ? (
                    <span className="text-grey-mid" aria-hidden>
                      ·
                    </span>
                  ) : null}
                  {mark}
                </span>
              ))}
            </p>
          </div>

          <HeroModulesCard />
        </div>

        {/* The three figures. They used to close the left column, which left
            that column roughly twice the height of the card beside it and the
            card floating in the middle of the gap. Run full width under both,
            they give the hero a base line and the two columns a workable
            ratio. The figures, their sizes and their rule are unchanged. */}
        <dl className="mt-16 grid grid-cols-3 border-t border-grey-mid pt-9 max-1080:mt-12 max-600:grid-cols-1 max-600:gap-y-7">
          {STATS.map((stat, i) => (
            <div
              key={stat.value}
              className={cn(
                "min-w-0",
                i > 0
                  ? "border-l border-grey-mid pl-10 max-1200:pl-8 max-600:border-l-0 max-600:pl-0"
                  : "",
              )}
            >
              <dt className="text-[26px] leading-none font-extrabold tracking-[-0.02em] text-ink">
                {stat.value}
              </dt>
              <dd className="mt-1.5 max-w-[16ch] text-[12.5px] leading-[1.35] text-grey-500">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** .status-badge.soon, on the brand ramp - the reference's amber is not in it. */
function SoonBadge() {
  return (
    <span
      className={cn(
        MONO,
        "ml-0.5 inline-flex -translate-y-px items-center gap-1.5 rounded-full bg-brand-tint px-2.5 py-1 text-[10.5px] tracking-[0.06em] text-brand-dark uppercase",
      )}
    >
      <span className="size-1.5 rounded-full bg-brand-dark" aria-hidden />
      Soon
    </span>
  );
}

/** .hero-modules-card - the six modules as a 3×2 grid, each one a link. */
function HeroModulesCard() {
  return (
    <div className="rounded-panel border border-grey-mid bg-white p-8 shadow-[0_18px_44px_-16px_rgba(15,29,84,0.16)] max-1200:p-7 max-600:p-5">
      <p
        className={cn(
          MONO,
          "mb-5 text-[11px] tracking-[0.06em] text-ink-muted uppercase",
        )}
      >
        The Murphi Platform
      </p>

      <div className="grid grid-cols-3 gap-4 max-1200:gap-3.5 max-600:grid-cols-2">
        {MODULES.map((module) => (
          <Link
            key={module.name}
            href={module.href}
            className={cn(
              "flex min-w-0 flex-col items-center gap-[11px] rounded-card px-2 py-5 text-center",
              "transition-all duration-200 hover:-translate-y-[3px] hover:border-grey-mid hover:bg-white hover:shadow-[0_10px_22px_-8px_rgba(15,29,84,0.18)]",
              module.soon
                ? "border border-dashed border-grey-mid bg-transparent hover:border-solid hover:border-brand"
                : "border border-transparent bg-grey-soft",
            )}
          >
            <span
              className={cn(
                "flex size-[42px] shrink-0 items-center justify-center rounded-full",
                module.soon
                  ? "border border-grey-mid bg-white text-ink-muted"
                  /* The reference glows this disc at 25%; softened, so the
                     card reads flat and calm rather than lit. */
                  : "bg-brand text-white shadow-[0_4px_12px_rgba(0,126,255,0.18)]",
              )}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                className="size-[19px]"
                aria-hidden
              >
                {module.glyph}
              </svg>
            </span>

            <span className="text-[12px] leading-[1.3] font-semibold text-ink">
              {module.name}
              {module.soon ? (
                <em
                  className={cn(
                    MONO,
                    "mt-1 block text-[9px] tracking-[0.04em] text-brand-dark uppercase not-italic",
                  )}
                >
                  Soon
                </em>
              ) : null}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
