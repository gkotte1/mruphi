import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import { MONO, Tick } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

export { Outcomes, StoryRule } from "@/components/inner-page/kit";

/**
 * The body of the Coding, Billing & RCM page.
 *
 * This page argues about scale rather than sequence, so its sections are laid
 * out as comparisons and specifications rather than the workflows the module
 * pages use: the two operating models sit as one divided panel, the before and
 * after run as two stacked bands so the same point can be read straight down,
 * and the outcomes are set left-aligned rather than centred.
 *
 * Every string is the one the page already carried.
 */

/* ── Two ways to run the practice ────────────────────────────── */

export function ModelSplit({
  models,
}: {
  models: { eyebrow: string; title: string; body: string; bestFor: string }[];
}) {
  return (
    <Reveal>
      <div className="grid grid-cols-2 overflow-hidden rounded-[10px] border border-[#E3E3E3] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)] max-720:grid-cols-1">
        {models.map((model, i) => (
          <div
            key={model.title}
            className={cn(
              "flex flex-col",
              i === 0 ? "border-r border-[#E3E3E3] max-720:border-r-0 max-720:border-b" : "",
            )}
          >
            <div className="flex-1 px-8 pt-8 pb-7 max-600:px-6 max-600:pt-6">
              <p className="ip-eyebrow">{model.eyebrow}</p>

              <h4 className="mt-4 text-[19px] font-bold leading-snug tracking-[-0.015em] text-ink">
                {model.title}
              </h4>

              <p className="mt-3 text-[14.5px] leading-[1.65] text-[#606060]">
                {model.body}
              </p>
            </div>

            {/* The footer band runs across both halves at the same height. */}
            <div className="border-t border-[#E3E3E3] bg-[#F5F5F5] px-8 py-5 max-600:px-6">
              <p className="text-[13px] leading-[1.55] text-[#878787]">
                <strong className="text-ink">Best for:</strong> {model.bestFor}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/* ── Two timelines, stacked so the same point reads straight down ── */

export function Timelines({
  before,
  after,
}: {
  before: { title: string; steps: string[] };
  after: { title: string; steps: string[] };
}) {
  return (
    <Reveal>
      <div className="overflow-hidden rounded-[10px] border border-[#E3E3E3] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)]">
        <Band {...before} tone="before" />
        <Band {...after} tone="after" />
      </div>
    </Reveal>
  );
}

function Band({
  title,
  steps,
  tone,
}: {
  title: string;
  steps: string[];
  tone: "before" | "after";
}) {
  const after = tone === "after";

  return (
    <div className={cn(after ? "bg-[#F5F5F5]" : "bg-white", after ? "" : "border-b border-[#E3E3E3]")}>
      <div className="flex items-center justify-center gap-3 px-8 pt-7 pb-5 max-600:px-6">
        <span
          className={cn(
            "flex size-6 shrink-0 items-center justify-center rounded-full border",
            after
              ? "border-[#007EFF] bg-[#007EFF] text-white"
              : "border-[#B2B2B2] bg-white text-[#B2B2B2]",
          )}
          aria-hidden
        >
          {after ? (
            <Tick className="size-3" />
          ) : (
            <span className="size-1.5 rounded-full bg-current" />
          )}
        </span>

        <h4
          className={cn(
            "text-[17px] font-bold leading-none tracking-[-0.015em]",
            after ? "text-ink" : "text-[#606060]",
          )}
        >
          {title}
        </h4>
      </div>

      {/* Four columns, so each point sits directly above or below its pair. */}
      <ul className="grid grid-cols-4 gap-px bg-[#E3E3E3] max-900:grid-cols-2 max-600:grid-cols-1">
        {steps.map((step, i) => (
          <li
            key={step}
            className={cn(
              "flex flex-col gap-2.5 px-8 py-6 max-600:px-6 max-600:py-5",
              after ? "bg-[#F5F5F5]" : "bg-white",
            )}
          >
            <span
              className={cn(
                MONO,
                "text-[10.5px] font-semibold tracking-[0.06em]",
                after ? "text-[#007EFF]" : "text-[#B2B2B2]",
              )}
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "text-[13.5px] leading-[1.55]",
                after ? "text-ink" : "text-[#606060]",
              )}
            >
              {step}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── The same review, under either brand ─────────────────────── */

export function ReviewSurface({
  brand,
  status,
  findings,
  client,
}: {
  brand: string;
  status: string;
  findings: { tone: "flag" | "opportunity"; title: string; meta: string }[];
  client: string;
}) {
  /* Murphi Brand → #007EFF; Your Brand → medium gray. Only one panel is
     visible at a time, so these never show as active together. */
  const murphi = brand === "Murphi.ai";

  return (
    <div className="overflow-hidden rounded-[10px] border border-[#E3E3E3] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)]">
      <div
        className={cn(
          "flex items-center justify-between gap-3 px-5 py-4 max-720:px-4",
          murphi ? "bg-[#007EFF]" : "bg-[#6B7280]",
        )}
      >
        <span
          className={cn(
            MONO,
            "flex min-w-0 items-center gap-2 truncate text-[11px] uppercase tracking-[0.06em] text-white/90",
          )}
        >
          <Tick className="size-3.5 shrink-0" />
          {brand} · Chart Review
        </span>

        <span
          className={cn(
            MONO,
            "flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.04em] text-white",
          )}
        >
          <span
            className="size-1.5 rounded-full bg-white"
            style={{ animation: "mp-blink 1.6s ease-in-out infinite" }}
            aria-hidden
          />
          {status}
        </span>
      </div>

      <ul className="px-5 py-[18px] max-720:px-4">
        {findings.map((finding, i) => {
          const flag = finding.tone === "flag";

          return (
            <li
              key={finding.title}
              className="flex items-start gap-3 border-b border-[#E3E3E3] py-3 last:border-b-0"
              style={{ animation: `mp-fade-up .45s ease backwards ${0.1 + i * 0.08}s` }}
            >
              <span
                className={cn(
                  "mt-px flex size-6 shrink-0 items-center justify-center rounded-[7px] border",
                  flag
                    ? "border-[#007EFF]/20 bg-[#F5F5F5] text-[#007EFF]"
                    : "border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]",
                )}
                aria-hidden
              >
                <Icon name={flag ? "shield" : "chartup"} width={11} height={11} />
              </span>

              <span className="min-w-0">
                <span className="block text-[13px] leading-[1.35] font-semibold text-ink">
                  {finding.title}
                </span>
                <span className={cn(MONO, "mt-0.5 block text-[10.5px] text-[#878787]")}>
                  {finding.meta}
                </span>
              </span>
            </li>
          );
        })}
      </ul>

      <div
        className={cn(
          MONO,
          "flex flex-wrap items-center justify-between gap-2 border-t border-[#E3E3E3] bg-[#F5F5F5] px-5 py-2.5 text-[10.5px] text-[#878787] max-720:px-4",
        )}
      >
        <span>Powered by {brand}</span>
        <span>{client}</span>
      </div>
    </div>
  );
}

/* ── Outcomes and story rule live in the shared inner-page kit ─ */

/** A short note the page carries under its tool list. */
export function Note({ children }: { children: ReactNode }) {
  return (
    <div className="mt-7 flex items-start gap-3 rounded-[8px] border border-[#E3E3E3] bg-[#F5F5F5] px-5 py-4">
      {/* The page's own note glyph - `info` is an outcome icon, not an IconName. */}
      <span
        className="mt-px flex size-6 shrink-0 items-center justify-center rounded-full border border-[#E3E3E3] bg-white text-[#007EFF]"
        aria-hidden
      >
        <svg viewBox="0 0 24 24" fill="none" className="size-3">
          <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </span>
      <p className="text-[13.5px] leading-[1.6] text-[#606060]">{children}</p>
    </div>
  );
}
