import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "@/components/module-page/Reveal";
import {
  ArrowGlyph,
  CONTAINER,
  Eyebrow,
  Kicker,
  Layers,
  MONO,
  PrimaryButton,
  SECTION,
  SectionHead,
  SecondaryButton,
  Tick,
} from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * The section types shared by the AI Module pages. Every one is traced from
 * the source pages' own CSS — the six HTML files ship a byte-identical
 * stylesheet, so a single set of components covers them all.
 */

/* ── Breadcrumb ─────────────────────────────────────────── */

/** The two trails the reference uses, with its own anchors. */
const SECTIONS = {
  "ai-modules": { label: "AI Modules", href: "/#ambient-ai" },
  "who-we-serve": { label: "Who We Serve", href: "/#serve" },
} as const;

export function Breadcrumb({
  current,
  section = "ai-modules",
}: {
  current: string;
  section?: keyof typeof SECTIONS;
}) {
  const parent = SECTIONS[section];

  return (
    <div
      className={cn(
        CONTAINER,
        MONO,
        "flex flex-wrap items-center gap-2 pt-5 text-[12px] text-ink-muted",
      )}
    >
      <Link href="/" className="transition-colors hover:text-brand">
        Home
      </Link>
      <span className="text-grey-mid">/</span>
      <Link href={parent.href} className="transition-colors hover:text-brand">
        {parent.label}
      </Link>
      <span className="text-grey-mid">/</span>
      <span className="font-medium text-ink">{current}</span>
    </div>
  );
}

/* ── Page hero ──────────────────────────────────────────── */

export function PageHero({
  eyebrow,
  badge,
  title,
  storyTag,
  story,
  lede,
  trust,
  primaryLabel = "Request Demo",
  secondaryHref = "#how",
  secondaryLabel = "See How It Works",
  hideSecondary,
  visual,
}: {
  eyebrow: string;
  badge?: string;
  title: ReactNode;
  storyTag: string;
  story: string;
  lede: ReactNode;
  trust: ReactNode;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  /** The consultants hero carries a single call to action. */
  hideSecondary?: boolean;
  visual: ReactNode;
}) {
  return (
    <section className="bg-grey-bg pt-7 pb-16 max-720:pt-6 max-720:pb-10">
      <div
        className={cn(
          CONTAINER,
          "grid grid-cols-2 items-center gap-16 max-1080:grid-cols-1 max-1080:gap-12",
        )}
      >
        <Reveal>
          {badge ? <SoonBadge className="mb-4">{badge}</SoonBadge> : null}
          <Eyebrow>{eyebrow}</Eyebrow>

          <h1 className="mt-4 max-w-[16ch] type-h1 text-ink">
            {title}
          </h1>

          <div className="mt-[18px] rounded-r-tile border-l-[3px] border-brand bg-grey-bg px-7 py-6 max-720:px-5">
            <span
              className={cn(
                MONO,
                "mb-2.5 block text-[11px] uppercase tracking-[0.07em] text-brand",
              )}
            >
              {storyTag}
            </span>
            <p className="max-w-[62ch] text-[17px] italic leading-[1.62] text-ink">
              {story}
            </p>
          </div>

          <p className="mt-2 max-w-[56ch] text-[18px] leading-[1.6] text-grey-500">
            {lede}
          </p>

          <div className="mt-[30px] flex flex-wrap items-center gap-3.5 max-720:flex-col max-720:items-stretch">
            <PrimaryButton href="/contact-us/">
              {primaryLabel}
              {primaryLabel === "Request Demo" ? <ArrowGlyph /> : null}
            </PrimaryButton>
            {hideSecondary ? null : (
              <SecondaryButton href={secondaryHref}>{secondaryLabel}</SecondaryButton>
            )}
          </div>

          <div
            className={cn(
              MONO,
              "mt-[30px] flex flex-wrap items-center gap-[9px] text-[12px] tracking-[0.02em] text-ink-muted",
            )}
          >
            {trust}
          </div>
        </Reveal>

        <Reveal>{visual}</Reveal>
      </div>
    </section>
  );
}

export function TrustDot() {
  return <span className="text-grey-mid">·</span>;
}

export function SoonBadge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        MONO,
        "inline-flex items-center gap-1.5 rounded-full border border-grey-mid bg-grey-soft px-2.5 py-1.5 text-[10.5px] uppercase tracking-[0.06em] text-grey-500",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-grey-bdr" aria-hidden />
      {children}
    </span>
  );
}

/* ── Mock card ──────────────────────────────────────────── */

export function MockCard({
  title,
  status,
  statusTone = "muted",
  headTone = "light",
  foot,
  children,
}: {
  title: ReactNode;
  status: string;
  statusTone?: "muted" | "brand";
  headTone?: "light" | "blue";
  foot?: [ReactNode, ReactNode];
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-tile border border-grey-mid bg-white shadow-[0_24px_56px_rgba(15,29,84,.09)]">
      <div
        className={cn(
          MONO,
          "flex items-center justify-between gap-3 px-5 py-[13px] text-[11px] uppercase tracking-[0.03em]",
          headTone === "blue"
            ? "bg-brand text-white/85"
            : "border-b border-grey-mid text-ink-muted",
        )}
      >
        <span className="flex min-w-0 items-center gap-2">{title}</span>
        <span
          className={cn(
            "flex shrink-0 items-center gap-1.5 font-medium",
            headTone === "blue"
              ? "text-white/85"
              : statusTone === "brand"
                ? "text-brand"
                : "text-ink-muted",
          )}
        >
          <span
            className="size-1.5 rounded-full bg-current"
            style={{ animation: "mp-blink 1.6s ease-in-out infinite" }}
            aria-hidden
          />
          {status}
        </span>
      </div>

      <div className="px-5 py-[22px]">{children}</div>

      {foot ? (
        <div
          className={cn(
            MONO,
            "flex flex-wrap items-center justify-between gap-2 border-t border-grey-mid bg-grey-soft px-5 py-[11px] text-[10.5px] text-ink-muted",
          )}
        >
          <span>{foot[0]}</span>
          <span>{foot[1]}</span>
        </div>
      ) : null}
    </div>
  );
}

/** One flagged item inside a mock panel. */
export function FindingRow({
  tone,
  title,
  meta,
}: {
  tone: "flag" | "opportunity";
  title: string;
  meta: string;
}) {
  return (
    <div className="flex items-start gap-2.5 border-b border-grey-soft py-[9px] last:border-b-0">
      <span
        className={cn(
          "mt-[5px] size-[7px] shrink-0 rounded-full",
          tone === "flag" ? "bg-brand-deep" : "bg-brand",
        )}
        aria-hidden
      />
      <div className="text-[12.5px] leading-[1.4] text-ink">
        {title}
        <small className="mt-0.5 block text-[11px] text-ink-muted">{meta}</small>
      </div>
    </div>
  );
}

/** A label/value row — the source's `.pay-row`. */
export function PayRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-grey-soft py-[11px] text-[12.5px] last:border-b-0">
      <span className="text-ink-muted">{label}</span>
      <span className={cn(MONO, "font-bold text-ink")}>{value}</span>
    </div>
  );
}

/* ── Story divider ──────────────────────────────────────── */

export function StoryThen({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        MONO,
        "my-6 flex items-center gap-2.5 text-[11.5px] uppercase tracking-[0.06em] text-ink-muted",
      )}
    >
      <span className="h-px flex-1 bg-grey-mid" aria-hidden />
      {children}
      <span className="h-px flex-1 bg-grey-mid" aria-hidden />
    </div>
  );
}

/* ── Before / after ─────────────────────────────────────── */

export function BeforeAfter({
  before,
  after,
}: {
  before: { title: string; steps: string[] };
  after: { title: string; steps: string[] };
}) {
  return (
    <Reveal>
      <div className="grid grid-cols-2 gap-5 max-720:grid-cols-1">
        <BaCard {...before} tone="before" />
        <BaCard {...after} tone="after" />
      </div>
    </Reveal>
  );
}

function BaCard({
  title,
  steps,
  tone,
}: {
  title: string;
  steps: string[];
  tone: "before" | "after";
}) {
  return (
    <div
      className={cn(
        "rounded-tile border px-[22px] py-6",
        tone === "before"
          ? "border-grey-mid bg-grey-bg"
          : "border-brand-pale bg-brand-ghost",
      )}
    >
      <h4
        className={cn(
          MONO,
          "mb-4 text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-muted",
        )}
      >
        {title}
      </h4>

      {steps.map((step) => (
        <div
          key={step}
          className="flex items-start gap-2.5 border-b border-dashed border-ink/10 py-[9px] text-[13.5px] leading-[1.5] text-ink last:border-b-0"
        >
          <span
            className={cn(
              "shrink-0",
              tone === "before" ? "text-ink-muted" : "text-brand",
            )}
            aria-hidden
          >
            {tone === "before" ? "○" : "●"}
          </span>
          {step}
        </div>
      ))}
    </div>
  );
}

/* ── Step flow ──────────────────────────────────────────── */

export type Step = { num: string; title: string; body: string };

export function StepFlow({ steps }: { steps: Step[] }) {
  return (
    <Reveal>
      <div className="mt-12 flex items-start max-1080:flex-wrap max-1080:justify-center max-1080:gap-8">
        {steps.map((step, i) => (
          <div key={step.num} className="contents">
            {i > 0 ? <StepConnector index={i} /> : null}

            <div className="flex w-[150px] shrink-0 flex-col items-center text-center max-720:w-[130px]">
              <div className={cn(MONO, "mb-2.5 text-[11px] text-ink-muted")}>
                {step.num}
              </div>
              <div className="mb-3.5 flex size-14 items-center justify-center rounded-full bg-brand shadow-[0_8px_20px_rgba(0,126,255,.25)]">
                <Tick className="size-6 text-white" />
              </div>
              <h4 className="mb-1.5 text-[14px] font-bold leading-[1.3] text-ink">
                {step.title}
              </h4>
              <p className="text-[12.5px] leading-[1.45] text-grey-500">
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function StepConnector({ index }: { index: number }) {
  return (
    <div
      className="relative mt-7 h-0.5 min-w-[20px] flex-1 bg-grey-mid max-1080:hidden"
      aria-hidden
    >
      <span
        className="absolute top-1/2 -mt-[3px] size-1.5 rounded-full bg-brand shadow-[0_0_0_4px_rgba(0,126,255,.14)]"
        style={{
          animation: `mp-flow-pulse 2.4s ease-in-out infinite ${(index % 3) * 0.4}s`,
        }}
      />
    </div>
  );
}

/* ── Chips ──────────────────────────────────────────────── */

export function ChipRow({
  chips,
  alt,
  className,
}: {
  chips: string[];
  alt?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {chips.map((chip) => (
        <span
          key={chip}
          className={cn(
            "rounded-full border border-grey-mid px-[13px] py-1.5 text-[13px] font-semibold text-ink",
            alt ? "bg-white" : "bg-grey-bg",
          )}
        >
          {chip}
        </span>
      ))}
    </div>
  );
}

export function ColumnLabel({ children }: { children: ReactNode }) {
  return (
    <h4
      className={cn(
        MONO,
        "mb-3.5 text-[13px] font-semibold uppercase tracking-[0.05em] text-ink-muted",
      )}
    >
      {children}
    </h4>
  );
}

/* ── Related cards ──────────────────────────────────────── */

export const RELATED_CARD =
  "block rounded-tile border border-grey-mid px-[22px] py-6 transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_16px_32px_rgba(15,29,84,.08)]";

export const RELATED_ICON =
  "mb-3.5 flex size-[38px] items-center justify-center rounded-[10px] border border-grey-mid bg-grey-bg text-brand";

export function RelatedGrid({
  cards,
  columns = 3,
}: {
  cards: { title: string; body: string; href?: string; icon?: "tick" | "layers" }[];
  /** The EHR-companies page uses the source page's four-up variant. */
  columns?: 3 | 4;
}) {
  return (
    <Reveal>
      <div
        className={cn(
          "grid gap-5 max-1080:grid-cols-2 max-720:grid-cols-1",
          columns === 4 ? "grid-cols-4" : "grid-cols-3",
        )}
      >
        {cards.map((card) => {
          const inner = (
            <>
              <div className={RELATED_ICON}>
                {card.icon === "layers" ? (
                  <Layers className="size-[18px]" />
                ) : (
                  <Tick className="size-[18px]" />
                )}
              </div>
              <h4 className="mb-1.5 text-[15px] font-bold text-ink">
                {card.title}
              </h4>
              <p className="text-[13px] leading-[1.5] text-grey-500">{card.body}</p>
            </>
          );

          return card.href ? (
            <Link key={card.title} href={card.href} className={RELATED_CARD}>
              {inner}
            </Link>
          ) : (
            <div key={card.title} className={RELATED_CARD}>
              {inner}
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}

/* ── Outcomes strip ─────────────────────────────────────── */

export type OutcomeIconName =
  | "clock"
  | "tick"
  | "layers"
  | "shield"
  | "info"
  | "bolt";

export function OutcomeIcon({ icon }: { icon: OutcomeIconName }) {
  const shared = { viewBox: "0 0 24 24", fill: "none", className: "size-7 text-white" };

  if (icon === "clock") {
    return (
      <svg {...shared} aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="1.6" />
        <path d="M12 7v5l3.5 2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "layers") return <Layers className="size-7 text-white" />;

  if (icon === "shield") {
    return (
      <svg {...shared} aria-hidden>
        <path
          d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z"
          stroke="#fff"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="m9 12 2 2 4-4"
          stroke="#fff"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (icon === "info") {
    return (
      <svg {...shared} aria-hidden>
        <path d="M12 8v5M12 16h.01" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="1.6" />
      </svg>
    );
  }

  if (icon === "bolt") {
    return (
      <svg {...shared} aria-hidden>
        <path
          d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
          stroke="#fff"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return <Tick className="size-7 text-white" />;
}

export function OutcomesStrip({
  heading,
  intro,
  outcomes,
}: {
  heading: string;
  intro: string;
  outcomes: { title: string; sub: string; icon: OutcomeIconName }[];
}) {
  return (
    <section className="bg-brand py-14">
      <div className={CONTAINER}>
        <div className="mx-auto mb-10 max-w-[640px] text-center text-grey-bg">
          <h2 className="mb-2.5 type-h2">
            {heading}
          </h2>
          <p className="text-[16px] text-white/[0.68]">{intro}</p>
        </div>

        <div className="grid grid-cols-6 gap-px overflow-hidden rounded-tile bg-white/[0.16] max-1080:grid-cols-3 max-720:grid-cols-2">
          {outcomes.map((outcome) => (
            <div key={outcome.title} className="bg-brand px-5 py-7 text-center">
              <div className="mx-auto mb-3 flex size-7 items-center justify-center">
                <OutcomeIcon icon={outcome.icon} />
              </div>
              <div className="mb-1.5 text-[15px] font-bold text-grey-bg">
                {outcome.title}
              </div>
              <div className="text-[12.5px] leading-[1.4] text-white/[0.62]">
                {outcome.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── EHR integration ────────────────────────────────────── */

export function EhrSection({
  heading = "Works with the EHR you already use.",
  lede,
  substeps,
  disclaimer,
}: {
  heading?: string;
  lede: string;
  substeps: string[];
  disclaimer: string;
}) {
  return (
    <section id="ehr" className={SECTION}>
      <Reveal>
        <div className="mx-auto max-w-[1156px] rounded-panel bg-grey-bg px-12 py-14 max-720:mx-5 max-720:px-6 max-720:py-10">
          <div className="grid grid-cols-[0.95fr_1.05fr] items-center gap-14 max-1080:grid-cols-1 max-1080:gap-10">
            <div className="min-w-0">
              <Eyebrow>EHR Integration</Eyebrow>

              <h2 className="mt-4 type-h2 text-ink">
                {heading}
              </h2>

              <p className="mt-4 max-w-[52ch] text-[18px] leading-[1.6] text-grey-500">
                {lede}
              </p>

              <div className="mt-[22px] flex flex-wrap gap-2.5">
                {substeps.map((step) => (
                  <span
                    key={step}
                    className={cn(
                      MONO,
                      "rounded-md border border-grey-mid bg-white px-[11px] py-1.5 text-[12px] text-grey-500",
                    )}
                  >
                    {step}
                  </span>
                ))}
              </div>

              <p className="mt-5 text-[13px] leading-[1.6] text-ink-muted">
                {disclaimer}
              </p>
            </div>

            <div className="min-w-0">
              <div
                className={cn(
                  MONO,
                  "mb-5 text-[11px] uppercase tracking-[0.06em] text-ink-muted",
                )}
              >
                Your EHR ⇄ Murphi AI ⇄ Your EHR
              </div>

              <div className="flex w-full items-center">
                <FlowStep label="EHR" tone="system" />
                <FlowConnector />
                <FlowStep label="Murphi AI" tone="mark" />
                <FlowConnector delay="0.35s" />
                <FlowStep label="EHR" tone="system" />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function FlowStep({
  label,
  tone,
}: {
  label: string;
  tone: "system" | "mark";
}) {
  return (
    <div className="flex w-[100px] shrink-0 flex-col items-center gap-2.5 text-center max-720:w-[76px]">
      <div
        className={cn(
          "flex size-[58px] items-center justify-center rounded-full max-720:size-11",
          tone === "system" &&
            "bg-brand shadow-[0_8px_20px_rgba(0,86,173,.28)]",
          tone === "mark" && "border-[1.5px] border-grey-mid bg-white p-2",
        )}
      >
        {tone === "mark" ? (
          <Image
            src="/brand/app-icons/murphi-icon-192.png"
            alt="Murphi.ai"
            width={192}
            height={192}
            className="size-full rounded-full object-contain"
          />
        ) : (
          <Tick className="size-6 text-white" />
        )}
      </div>
      <div className="text-[12.5px] font-semibold leading-[1.25] text-ink max-720:text-[11px]">
        {label}
      </div>
    </div>
  );
}

export function FlowConnector({ delay = "0s" }: { delay?: string }) {
  return (
    <div className="relative mb-[30px] h-0.5 min-w-[22px] flex-1 bg-grey-mid" aria-hidden>
      <span
        className="absolute top-1/2 -mt-[3px] size-1.5 rounded-full bg-brand shadow-[0_0_0_4px_rgba(0,86,173,.14)]"
        style={{ animation: `mp-flow-pulse 2.6s ease-in-out infinite ${delay}` }}
      />
      <span className="absolute top-1/2 -right-px size-0 -translate-y-1/2 border-y-[3.5px] border-l-[5px] border-y-transparent border-l-grey-mid" />
    </div>
  );
}

/* ── Final CTA ──────────────────────────────────────────── */

export function FinalCta({
  heading,
  body,
  primaryLabel = "Request Demo",
}: {
  heading: ReactNode;
  body: string;
  primaryLabel?: string;
}) {
  return (
    <section className={SECTION}>
      <Reveal>
        <div className="relative mx-auto max-w-[1156px] overflow-hidden rounded-panel bg-brand px-[60px] py-[72px] text-center max-720:mx-5 max-720:px-6 max-720:py-10">
          <h2 className="mb-3.5 type-h2 text-grey-bg">
            {heading}
          </h2>
          <p className="mb-[34px] text-[17px] leading-[1.6] text-white/[0.65]">
            {body}
          </p>
          <div className="flex justify-center">
            <PrimaryButton
              href="/contact-us/"
              className="bg-white text-ink hover:bg-white hover:text-ink hover:shadow-[0_8px_20px_rgba(15,29,84,.24)]"
            >
              {primaryLabel}
              <ArrowGlyph />
            </PrimaryButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ── Plain section wrapper ──────────────────────────────── */

export function ModuleSection({
  id,
  kicker,
  heading,
  border = true,
  children,
}: {
  id?: string;
  kicker?: string;
  heading?: string;
  border?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(border ? "border-t border-grey-mid" : "", SECTION)}
    >
      <div className={CONTAINER}>
        {kicker ? <Kicker>{kicker}</Kicker> : null}
        {heading ? <SectionHead>{heading}</SectionHead> : null}
        {children}
      </div>
    </section>
  );
}
