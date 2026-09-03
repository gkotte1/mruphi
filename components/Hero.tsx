import Link from "next/link";
import HeroShowcase from "@/components/HeroShowcase";
import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/cn";

type Feature = {
  label: string;
  detail?: string;
  icon: IconName;
  soon?: boolean;
  href: string;
};

/* Content is fixed — labels and details are the source strings, split only at
   the em dash so the hierarchy can be typographic rather than punctuation. */
const FEATURES: Feature[] = [
  {
    label: "Ambient AI & Dictation",
    detail: "Documentation accuracy",
    icon: "mic",
    href: "/ambient-ai-dictation/",
  },
  {
    label: "Revenue Assurance & QAPI",
    detail: "Coding, OASIS, POC, PDGM, ADRs..",
    icon: "chartup",
    href: "/revenue-assurance/",
  },
  {
    label: "Patient Engagement",
    detail: "HIPAA-compliant messaging",
    icon: "community",
    href: "/patient-engagement/",
  },
  {
    label: "Patient Payment Collections",
    icon: "card",
    href: "/patient-payments/",
  },
  {
    label: "Referral to NOA automation",
    icon: "route",
    soon: true,
    href: "/referral-to-noa/",
  },
  {
    label: "AI-led claims processing & denial appeals",
    icon: "exchange",
    soon: true,
    href: "/ai-driven-rcm/",
  },
];

/* The three performance figures, shown as one ruled row under the CTA. */
const STATS = [
  { value: "70%", label: "Reduction in documentation time" },
  { value: "98.7%", label: "Report accuracy with human review" },
  { value: "<15 days", label: "Collect from patients" },
];

/**
 * One centred composition, two rounded shapes.
 *
 *   the stage    a wide, light, very large-radius container holding all of the
 *                hero copy, centred with comfortable margins
 *   the showcase a smaller blue product card, centred, in front, overlapping
 *                the stage's lower edge and hanging below it
 *
 * The overlap is the only one in the section: the stage reserves the space with
 * padding, the showcase claims it back with a negative top margin, so nothing is
 * absolutely positioned and nothing can be clipped or overflow.
 */
export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-[80px] pb-28 max-1024:pb-20 max-600:pb-14">
      <HeroBackdrop />

      <div className="mx-auto w-full max-w-[1280px] px-10 max-1200:px-8 max-600:px-4">
        {/* ── The stage: everything the reader has to read ── */}
        <div className="relative overflow-hidden rounded-canvas border border-brand/30 px-10 pt-24 pb-[300px] shadow-[0_50px_130px_-70px_rgba(0,86,173,0.55)] max-1024:rounded-cta max-1024:px-8 max-1024:pt-16 max-1024:pb-[240px] max-768:pb-[210px] max-600:rounded-hero max-600:px-5 max-600:pt-12 max-600:pb-[150px]">
          <StageLight />

          <div className="mp-enter relative mx-auto flex max-w-[900px] flex-col items-center text-center">
            <p className="type-label inline-flex items-center gap-2 rounded-full border border-brand-ghost bg-brand-tint px-3.5 py-1.5 text-brand-dark">
              <span className="size-1.5 rounded-full bg-brand" aria-hidden />
              Home Health &amp; Hospice
            </p>

            <h1 className="type-display mt-7 max-w-[820px] text-ink">
              AI for Every Home Health &amp; Hospice Workflow
            </h1>

            <p className="type-lead mt-5 max-w-[560px] text-grey-dk">
              Murphi integrates with the EHRs your agency uses and automates the
              work around patient care.
            </p>

            {/* A ruled ledger, not a card grid — hairlines and whitespace do
                the separating. Two columns, centred as a block. */}
            <ul className="mt-11 grid w-full max-w-[860px] grid-cols-2 gap-x-12 border-t border-grey-mid/80 text-left max-1024:gap-x-8 max-768:max-w-[460px] max-768:grid-cols-1">
              {FEATURES.map((feature) => (
                <li
                  key={feature.label}
                  className="border-b border-grey-mid/80"
                >
                  <Link
                    href={feature.href}
                    className="group flex items-center gap-3.5 py-[11px] max-600:items-start"
                  >
                  <span className="flex size-[30px] shrink-0 items-center justify-center rounded-[10px] border border-brand-border/80 bg-brand-tint text-brand-dark transition-colors duration-200 group-hover:border-transparent group-hover:bg-brand group-hover:text-grey-bg">
                    <Icon name={feature.icon} width={16} height={16} />
                  </span>

                  <span className="flex min-w-0 flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                    <span className="text-[14.5px] font-bold leading-snug tracking-[-0.012em] text-ink">
                      {feature.label}
                    </span>
                    {feature.detail ? (
                      <span className="text-[13px] leading-snug text-grey-dk/85">
                        {feature.detail}
                      </span>
                    ) : null}
                    {feature.soon ? (
                      <span className="translate-y-px rounded-full border border-brand-border bg-white px-2 py-[2px] text-[9.5px] font-bold uppercase leading-none tracking-[0.08em] text-brand-dark">
                        Soon
                      </span>
                    ) : null}
                  </span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/contact-us/"
              className="mt-11 btn-primary max-600:w-full max-600:justify-center"
            >
              Request Demo
              <Icon name="arrow" width={17} height={17} />
            </Link>

            {/* Three equal columns, ruled not stacked — one row at every width
                above 600px, where they become a single centred column. */}
            <dl className="mx-auto mt-11 grid w-full max-w-[780px] grid-cols-3 max-600:grid-cols-1 max-600:gap-y-6">
              {STATS.map((stat, i) => (
                <div
                  key={stat.value}
                  className={cn(
                    "min-w-0 px-6 text-center max-1024:px-4 max-600:px-0",
                    i > 0
                      ? "border-l border-grey-mid/90 max-600:border-l-0 max-600:border-t max-600:pt-6"
                      : "",
                  )}
                >
                  <dt className="text-[clamp(30px,2.7vw,40px)] font-extrabold leading-none tracking-[-0.035em] text-ink">
                    {stat.value}
                  </dt>
                  <dd className="mx-auto mt-3 max-w-[190px] text-[14.5px] font-medium leading-snug text-grey-dk/80 max-1200:text-[14px]">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* ── The showcase: in front, centred, overlapping the stage floor ── */}
        <div className="relative z-10 mx-auto -mt-[224px] w-full max-w-[900px] max-1024:-mt-[184px] max-768:-mt-[160px] max-768:px-2 max-600:-mt-[112px]">
          <HeroShowcase />
        </div>
      </div>
    </section>
  );
}

/**
 * The page ground behind the stage: a white field with two soft blue washes and
 * a tinted floor that hands the eye to the next section. Every layer uses
 * inset: 0 — a negative inset lays out past the viewport and causes horizontal
 * overflow on narrow screens.
 */
function HeroBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      {/* The tinted floor that hands the eye to the next section — a flat
          light neutral grey, one of the book's three preferred backgrounds. */}
      <div className="absolute inset-x-0 bottom-0 h-[38%] bg-grey-bg" />
    </div>
  );
}

/** The stage surface — a flat light neutral grey panel. */
function StageLight() {
  return (
    <div className="pointer-events-none absolute inset-0 bg-grey-bg" aria-hidden />
  );
}
