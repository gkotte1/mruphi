"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/module-page/Reveal";
import { MONO, Tick } from "@/components/module-page/ui";
import {
  CheckRow,
  FindingCard,
  Pips,
  Row,
  Surface,
} from "@/components/ai-driven-rcm/Claim";
import { useAutoAdvance } from "@/lib/useAutoAdvance";
import { cn } from "@/lib/cn";

/**
 * The claim's path.
 *
 * The rail is the numbered-circle treatment this section already used: a
 * horizontal run of stages with a thin connecting line, the active one filled
 * and ringed, cleared ones ticked, and one product surface below showing what
 * the product is doing at the active stage.
 *
 * All nine stages sit on one line, numbered 01–09, and never move: only the
 * active state travels along them. Payment and reconciliation stay two
 * separate stages. Narrower viewports scroll the line sideways rather than
 * wrapping or splitting it, so the run always reads as one workflow.
 *
 * One clock runs the whole thing: it advances every two seconds through all
 * nine stages and loops back to the first. Pointing at the section holds it;
 * picking a stage restarts that stage's interval. Views are stacked in one
 * grid cell rather than toggled with `hidden`, so the panel height never jumps
 * and every view's copy stays in the HTML; only the active view is exposed to
 * assistive technology.
 */

type Stage = { num: string; label: string };

type View = { label: string; status: string; body: ReactNode };

/** One product view per stage, in the same order as the stages. */
const VIEWS: View[] = [
  {
    label: "Eligibility",
    status: "Passed",
    body: (
      <>
        <ul>
          <CheckRow name="Eligibility" index={0} />
        </ul>
        <div className="mt-3">
          <Row label="Result" value="Passed" />
        </div>
      </>
    ),
  },
  {
    label: "Authorization",
    status: "Passed",
    body: (
      <>
        <ul>
          <CheckRow name="Prior Authorization" index={0} />
        </ul>
        <div className="mt-3">
          <Row label="Result" value="Passed" />
        </div>
      </>
    ),
  },
  {
    label: "Documentation",
    status: "Intercepted",
    body: (
      <>
        <FindingCard
          title="Documentation gap detected"
          meta="Resolve before claim submission"
        />
        <div className="mt-3">
          <Row label="Result" value="Intercepted" />
        </div>
      </>
    ),
  },
  {
    label: "Coding",
    status: "Resolved",
    body: (
      <>
        <Row label="Status" value="Resolved → Ready to Submit" />
        <div className="mt-4 flex justify-center">
          <Pips total={2} done={2} />
        </div>
      </>
    ),
  },
  {
    label: "Claim Readiness",
    status: "Ready",
    body: (
      <>
        <ul>
          <CheckRow name="Claim Readiness" index={0} />
        </ul>
        <div className="mt-3">
          <Row label="Review" value="Reviewer approval required" />
        </div>
      </>
    ),
  },
  {
    label: "Claim",
    status: "Submitted",
    body: (
      <>
        <Row label="Status" value="Submitted" />
        <Row label="Review" value="Reviewer approval required" />
      </>
    ),
  },
  {
    label: "ERA / EOB",
    status: "Received",
    body: (
      <ul>
        {["EOB / ERA Analysis", "Denial Identification", "Denial Analysis", "Appeal Generation"].map(
          (name, i) => (
            <CheckRow key={name} name={name} index={i} />
          ),
        )}
      </ul>
    ),
  },
  {
    label: "Payment",
    status: "Posted",
    body: (
      <>
        <ul>
          <CheckRow name="Payment Reconciliation" index={0} />
        </ul>
        <div className="mt-3">
          <Row label="Result" value="Posted" />
        </div>
      </>
    ),
  },
  {
    label: "Reconciliation",
    status: "Reconciled",
    body: (
      <>
        <ul>
          <CheckRow name="837 vs 835 Reconciliation" index={0} />
        </ul>
        <div className="mt-3">
          <Row label="Result" value="Reconciled" />
        </div>
        <div className="mt-4 flex justify-center">
          <Pips total={2} done={2} />
        </div>
      </>
    ),
  },
];

export default function Mechanics({ stages }: { stages: Stage[] }) {
  const { index, select, hold, release } = useAutoAdvance(stages.length);

  return (
    <Reveal>
      <div onMouseEnter={hold} onMouseLeave={release} onFocusCapture={hold} onBlurCapture={release}>
        {/* All nine stages on one line. Below the breakpoint the line is
            swiped rather than broken, so the run never wraps or splits. */}
        <div className="-mx-8 overflow-x-auto px-8 pb-1 max-720:-mx-5 max-720:px-5">
          <Rail
            stages={stages}
            which={stages.map((_stage, i) => i)}
            index={index}
            select={select}
          />
        </div>

        {/* What the product is doing at the active stage. */}
        <div className="mt-12 ip-card p-7 max-1080:mt-9 max-1080:p-6 max-600:p-4">
          <div className="mx-auto grid max-w-[540px]">
            {VIEWS.map((view, i) => (
              <div
                key={view.label}
                aria-hidden={i !== index}
                className={cn(
                  "col-start-1 row-start-1 transition-all duration-[520ms] ease-out motion-reduce:transition-none",
                  i === index
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-1 opacity-0",
                )}
              >
                <Surface label={view.label} status={view.status}>
                  {view.body}
                </Surface>
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-center">
            <Pips total={stages.length} done={index + 1} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/**
 * The run of stages, in the section's existing numbered-circle treatment.
 * One line, always: the min-width keeps it from wrapping or collapsing, and
 * the parent scrolls it horizontally when the viewport is narrower.
 */
function Rail({
  stages,
  which,
  index,
  select,
}: {
  stages: Stage[];
  which: number[];
  index: number;
  select: (i: number) => void;
}) {
  return (
    <ol className="flex min-w-[900px] items-start">
      {which.map((i, n) => {
        const stage = stages[i];
        const isActive = i === index;
        const passed = index > i;

        return (
          <li key={stage.label} className="contents">
            {n === 0 ? null : (
              <span
                className={cn(
                  "mt-[18px] h-0.5 w-5 shrink-0 rounded-full transition-colors duration-[520ms] ease-out",
                  passed || isActive ? "bg-[#007EFF]" : "bg-[#E3E3E3]",
                )}
                aria-hidden
              />
            )}

            <div className="min-w-0 flex-1">
              <button
                type="button"
                onClick={() => select(i)}
                aria-current={isActive}
                className="group flex w-full flex-col items-center px-1 text-center"
              >
                <span
                  className={cn(
                    MONO,
                    "relative flex size-9 shrink-0 items-center justify-center rounded-full border text-[12px] font-bold transition-colors duration-[520ms] ease-out",
                    isActive
                      ? "border-[#007EFF] bg-[#007EFF] text-white"
                      : passed
                        ? "border-[#007EFF] bg-white text-[#007EFF]"
                        : "border-[#E3E3E3] bg-white text-[#606060] group-hover:border-[#007EFF] group-hover:text-[#007EFF]",
                  )}
                >
                  {passed ? <Tick className="size-3.5" /> : stage.num}
                  {isActive ? (
                    <span
                      className="absolute inset-0 rounded-full border border-[#007EFF] motion-reduce:hidden"
                      style={{ animation: "mp-pulse-ring 2s ease-out infinite" }}
                      aria-hidden
                    />
                  ) : null}
                </span>

                <span
                  className={cn(
                    "type-hl-card-title mt-3 block min-w-0 transition-colors duration-[520ms] ease-out",
                    isActive ? "text-ink" : passed ? "text-[#878787]" : "text-[#606060]",
                  )}
                >
                  {stage.label}
                </span>
              </button>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
