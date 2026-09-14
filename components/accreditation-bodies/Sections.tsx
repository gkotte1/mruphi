import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import { StatusBadge } from "@/components/module-page/interactive";
import { MONO } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

export { Outcomes, StoryRule } from "@/components/inner-page/kit";

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
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] overflow-hidden rounded-[10px] border border-[#E3E3E3] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)] max-720:grid-cols-1">
        {sides.map((side, s) => {
          const second = s === 1;

          return (
            <div
              key={side.eyebrow}
              className={cn(
                "flex min-w-0 flex-col",
                second ? "" : "border-r border-[#E3E3E3] max-720:border-r-0 max-720:border-b",
              )}
            >
              <div
                className={cn(
                  "flex min-h-[148px] flex-col justify-end border-b border-[#E3E3E3] px-7 pt-7 pb-6 max-900:min-h-[168px] max-720:min-h-0 max-600:px-5",
                  "bg-[#F5F5F5]",
                )}
              >
                <p className="ip-eyebrow">{side.eyebrow}</p>
                <h3
                  className={cn(
                    "acc-both-sides-heading type-hl-section-title mt-3 min-w-0 break-words text-ink max-600:text-[24px]",
                  )}
                >
                  {side.heading}
                </h3>
              </div>

              <ul className="flex-1">
                {side.points.map((point, i) => (
                  <li
                    key={point}
                    className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 border-b border-[#E3E3E3] px-7 py-[18px] last:border-b-0 max-600:gap-3.5 max-600:px-5"
                  >
                    <span
                      className={cn(
                        MONO,
                        "mt-px flex size-6 shrink-0 items-center justify-center rounded-[7px] border border-[#E3E3E3] bg-[#F5F5F5] text-[10px] font-bold text-[#007EFF]",
                      )}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="type-hl-card-body min-w-0 break-words">
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
      <ol className="border-t border-[#E3E3E3]">
        {ways.map((way, i) => (
          <li
            key={way.title}
            className="grid grid-cols-[auto_minmax(0,0.42fr)_minmax(0,1fr)] items-start gap-8 border-b border-[#E3E3E3] py-8 max-900:grid-cols-[auto_1fr] max-900:gap-x-6 max-900:gap-y-3 max-600:gap-x-4"
          >
            <span
              className={cn(
                MONO,
                "text-[13px] font-bold tracking-[0.04em] text-[#007EFF] max-900:row-span-2",
              )}
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <h4 className="type-hl-card-title text-ink">
              {way.title}
            </h4>

            <p className="type-hl-card-body max-w-[62ch] max-900:col-start-2">
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
      <div className="overflow-hidden rounded-[10px] border border-[#E3E3E3] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)]">
        {tools.map((tool, i) => (
          <div
            key={tool.title}
            className={cn(
              "grid grid-cols-[minmax(0,0.44fr)_minmax(0,1fr)] items-start gap-8 px-7 py-7 max-900:grid-cols-1 max-900:gap-3 max-600:px-5",
              i === tools.length - 1 ? "" : "border-b border-[#E3E3E3]",
            )}
          >
            <div className="min-w-0">
              <div className="mb-3">
                <StatusBadge tone={tool.badge.tone}>{tool.badge.text}</StatusBadge>
              </div>
              <h4 className="type-hl-card-title text-ink">
                {tool.title}
              </h4>
            </div>

            <p className="type-hl-card-body max-w-[64ch]">
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
      <div className="grid grid-cols-2 overflow-hidden rounded-[10px] border border-[#E3E3E3] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)] max-900:grid-cols-1">
        {flows.map((flow, f) => (
          <div
            key={flow.lede}
            className={cn(
              "flex flex-col",
              f === 0 ? "border-r border-[#E3E3E3] max-900:border-r-0 max-900:border-b" : "",
            )}
          >
            <div className="border-b border-[#E3E3E3] bg-[#F5F5F5] px-7 py-5 max-600:px-5">
              <p className="type-hl-card-title text-ink">
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
                          "relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border border-[#E3E3E3] bg-[#F5F5F5] text-[10.5px] font-bold text-[#007EFF]",
                        )}
                      >
                        {step.num}
                      </span>
                      {last ? null : (
                        <span
                          className="absolute top-7 -bottom-4 left-1/2 w-px -translate-x-1/2 bg-[#E3E3E3]"
                          aria-hidden
                        />
                      )}
                    </span>

                    <span className="min-w-0">
                      <span className="type-hl-card-title block text-ink">
                        {step.title}
                      </span>
                      <span className="type-hl-card-body mt-1 block">
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
      <div className="flex items-start gap-4 rounded-[10px] border border-[#E3E3E3] bg-[#F5F5F5] px-7 py-6 max-600:px-5">
        <span
          className="mt-px flex size-8 shrink-0 items-center justify-center rounded-full border border-[#E3E3E3] bg-white text-[#007EFF]"
          aria-hidden
        >
          <Icon name="community" width={15} height={15} />
        </span>
        <p className="type-hl-card-body max-w-[76ch] text-ink">{children}</p>
      </div>
    </Reveal>
  );
}

/* ── Outcomes and story rule live in the shared inner-page kit ─ */
