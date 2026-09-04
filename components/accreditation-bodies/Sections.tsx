import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import { StatusBadge } from "@/components/module-page/interactive";
import {
  OutcomeIcon,
  type OutcomeIconName,
} from "@/components/module-page/sections";
import { CONTAINER, Eyebrow, MONO, Tick } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * The body of the Accreditation & Audit page.
 *
 * The page's subject is a register - requirements, the evidence that answers
 * them, and who signs off - and its structure is two sides of the same survey.
 * Its sections are built from those two ideas rather than the workflows and
 * comparisons the module pages use: paired lanes, numbered registers, and a
 * specification list.
 *
 * Every string is the one the page already carried.
 */

/* ── Both sides of the survey, as two lanes ──────────────────── */

export function BothSides({
  sides,
}: {
  sides: { eyebrow: string; heading: string; points: string[] }[];
}) {
  return (
    <Reveal>
      <div className="grid grid-cols-2 overflow-hidden rounded-panel border border-grey-mid bg-white shadow-[0_16px_40px_rgba(15,29,84,.06)] max-720:grid-cols-1">
        {sides.map((side, s) => {
          const second = s === 1;

          return (
            <div
              key={side.eyebrow}
              className={cn(
                "flex flex-col",
                second ? "" : "border-r border-grey-mid max-720:border-r-0 max-720:border-b",
              )}
            >
              <div
                className={cn(
                  "border-b border-grey-mid px-7 pt-7 pb-6 max-600:px-5",
                  second ? "bg-brand-tint/40" : "bg-grey-soft",
                )}
              >
                <Eyebrow>{side.eyebrow}</Eyebrow>
                <h3 className="mt-3 text-[21px] font-bold leading-[1.3] tracking-[-0.015em] text-ink">
                  {side.heading}
                </h3>
              </div>

              <ul className="flex-1">
                {side.points.map((point, i) => (
                  <li
                    key={point}
                    className="grid grid-cols-[auto_1fr] items-start gap-4 border-b border-grey-mid px-7 py-[18px] last:border-b-0 max-600:gap-3.5 max-600:px-5"
                  >
                    <span
                      className={cn(
                        MONO,
                        "mt-px flex size-6 shrink-0 items-center justify-center rounded-[7px] border border-brand-pale bg-brand-tint text-[10px] font-bold text-brand-dark",
                      )}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 text-[13.5px] leading-[1.55] text-grey-500">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}

/* ── Three ways to work, as an editorial register ────────────── */

export function WaysList({
  ways,
}: {
  ways: { title: string; body: string }[];
}) {
  return (
    <Reveal>
      <ol className="border-t border-grey-mid">
        {ways.map((way, i) => (
          <li
            key={way.title}
            className="grid grid-cols-[auto_minmax(0,0.42fr)_minmax(0,1fr)] items-start gap-8 border-b border-grey-mid py-8 max-900:grid-cols-[auto_1fr] max-900:gap-x-6 max-900:gap-y-3 max-600:gap-x-4"
          >
            <span
              className={cn(
                MONO,
                "text-[13px] font-bold tracking-[0.04em] text-brand max-900:row-span-2",
              )}
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <h4 className="text-[19px] font-bold leading-snug tracking-[-0.015em] text-ink">
              {way.title}
            </h4>

            <p className="max-w-[62ch] text-[14.5px] leading-[1.65] text-grey-500 max-900:col-start-2">
              {way.body}
            </p>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

/* ── The tools, as a specification list ──────────────────────── */

export function ToolSpecs({
  tools,
}: {
  tools: { title: string; badge: { tone: "live" | "soon"; text: string }; body: string }[];
}) {
  return (
    <Reveal>
      <div className="overflow-hidden rounded-panel border border-grey-mid bg-white shadow-[0_16px_40px_rgba(15,29,84,.06)]">
        {tools.map((tool, i) => (
          <div
            key={tool.title}
            className={cn(
              "grid grid-cols-[minmax(0,0.44fr)_minmax(0,1fr)] items-start gap-8 px-7 py-7 max-900:grid-cols-1 max-900:gap-3 max-600:px-5",
              i === tools.length - 1 ? "" : "border-b border-grey-mid",
            )}
          >
            <div className="min-w-0">
              <div className="mb-3">
                <StatusBadge tone={tool.badge.tone}>{tool.badge.text}</StatusBadge>
              </div>
              <h4 className="text-[17px] font-bold leading-snug tracking-[-0.015em] text-ink">
                {tool.title}
              </h4>
            </div>

            <p className="max-w-[64ch] text-[14px] leading-[1.65] text-grey-500">
              {tool.body}
            </p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/* ── Two workflows, side by side under one roof ──────────────── */

export function DualWorkflow({
  flows,
}: {
  flows: { lede: string; steps: { num: string; title: string; body: string }[] }[];
}) {
  return (
    <Reveal>
      <div className="grid grid-cols-2 overflow-hidden rounded-panel border border-grey-mid bg-white shadow-[0_16px_40px_rgba(15,29,84,.06)] max-900:grid-cols-1">
        {flows.map((flow, f) => (
          <div
            key={flow.lede}
            className={cn(
              "flex flex-col",
              f === 0 ? "border-r border-grey-mid max-900:border-r-0 max-900:border-b" : "",
            )}
          >
            <div className="border-b border-grey-mid bg-grey-soft px-7 py-5 max-600:px-5">
              <p className="text-[15px] font-semibold leading-snug text-ink">
                {flow.lede}
              </p>
            </div>

            <ol className="flex-1 px-7 py-2 max-600:px-5">
              {flow.steps.map((step, i) => {
                const last = i === flow.steps.length - 1;

                return (
                  <li
                    key={step.num}
                    className="grid grid-cols-[auto_1fr] items-start gap-4 py-4 max-600:gap-3.5"
                  >
                    {/* A continuous rail, so the five read as one sequence. */}
                    <span className="relative flex w-7 shrink-0 justify-center self-stretch">
                      <span
                        className={cn(
                          MONO,
                          "relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border border-brand-pale bg-brand-tint text-[10.5px] font-bold text-brand-dark",
                        )}
                      >
                        {step.num}
                      </span>
                      {last ? null : (
                        <span
                          className="absolute top-7 -bottom-4 left-1/2 w-px -translate-x-1/2 bg-brand-pale"
                          aria-hidden
                        />
                      )}
                    </span>

                    <span className="min-w-0">
                      <span className="block text-[14.5px] font-bold leading-snug tracking-[-0.012em] text-ink">
                        {step.title}
                      </span>
                      <span className="mt-1 block text-[13px] leading-[1.5] text-grey-500">
                        {step.body}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/* ── The oversight note, kept in the page's own words ────────── */

export function OversightNote({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <div className="flex items-start gap-4 rounded-panel border border-brand-pale bg-brand-tint/50 px-7 py-6 max-600:px-5">
        <span
          className="mt-px flex size-8 shrink-0 items-center justify-center rounded-full border border-brand-pale bg-white text-brand"
          aria-hidden
        >
          <Icon name="community" width={15} height={15} />
        </span>
        <p className="max-w-[76ch] text-[14px] leading-[1.65] text-ink">{children}</p>
      </div>
    </Reveal>
  );
}

/* ── Outcomes, set as a register ─────────────────────────────── */

export function Outcomes({
  heading,
  outcomes,
}: {
  heading: string;
  outcomes: { title: string; sub: string; icon: OutcomeIconName }[];
}) {
  return (
    <section className="bg-brand py-14">
      <div className={CONTAINER}>
        <h2 className="mb-10 max-w-[640px] type-h2 text-grey-bg">{heading}</h2>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-tile bg-white/[0.16] max-720:grid-cols-1">
          {outcomes.map((outcome) => (
            <div
              key={outcome.title}
              className="flex items-start gap-4 bg-brand px-7 py-6 max-600:px-5"
            >
              <span
                className="mt-px flex size-9 shrink-0 items-center justify-center rounded-[10px] border border-white/25 bg-white/10 text-white"
                aria-hidden
              >
                <OutcomeIcon icon={outcome.icon} />
              </span>

              <span className="min-w-0">
                <span className="block text-[15px] font-bold text-grey-bg">
                  {outcome.title}
                </span>
                <span className="mt-1 block text-[12.5px] leading-[1.45] text-white/[0.62]">
                  {outcome.sub}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── The rule that opens the section ─────────────────────────── */

export function StoryRule({ children }: { children: string }) {
  return (
    <div
      className={cn(
        MONO,
        "my-6 flex items-center gap-4 text-[11.5px] uppercase tracking-[0.06em] text-ink-muted",
      )}
    >
      <span className="h-px flex-1 bg-grey-mid" aria-hidden />
      <span className="flex items-center gap-2.5">
        <span
          className="flex size-5 items-center justify-center rounded-full border border-brand-pale bg-brand-tint text-brand"
          aria-hidden
        >
          <Tick className="size-2.5" />
        </span>
        {children}
      </span>
      <span className="h-px flex-1 bg-grey-mid" aria-hidden />
    </div>
  );
}
