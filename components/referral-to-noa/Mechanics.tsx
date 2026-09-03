"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import { MONO, Tick } from "@/components/module-page/ui";
import {
  CheckRow,
  DecisionChip,
  FieldRow,
  GroupLabel,
  Pips,
  Row,
  SourceCard,
  Surface,
  SystemNode,
} from "@/components/referral-to-noa/Intake";
import { useAutoAdvance } from "@/lib/useAutoAdvance";
import { cn } from "@/lib/cn";

/**
 * The workflow, as the two workflows it actually is.
 *
 * Intake and decision were previously one rail of eight, which read as a single
 * long timeline and hid the handoff between them. Each is now its own panel:
 * the sentence that introduces it, its four steps flowing left to right on
 * their own connecting line, and its own product surface beneath.
 *
 * One clock runs both. It advances every two seconds through 01–08 and loops
 * back to 01, so the intake panel completes and hands over to the decision
 * panel, which completes and hands back. Each panel shows the view for its own
 * current step, holding its last state once its part is done.
 *
 * Pointing at a panel holds the clock; picking a step restarts that step's full
 * interval. Views are stacked in one grid cell rather than toggled with
 * `hidden`, so panel heights never jump and every view's copy stays in the
 * HTML; only the active view is exposed to assistive technology.
 *
 * Every string is the page's own.
 */

type Step = { num: string; title: string; body: string };

/** A document the intake has sorted, as structure rather than invented text. */
function DocRow({ index }: { index: number }) {
  return (
    <div
      className="flex items-center gap-3 border-b border-grey-soft py-2.5 last:border-b-0"
      style={{ animation: `mp-fade-up .45s ease backwards ${0.08 + index * 0.07}s` }}
    >
      <span
        className="flex size-6 shrink-0 items-center justify-center rounded-[7px] border border-grey-mid bg-grey-soft text-brand"
        aria-hidden
      >
        <Icon name="doc" width={12} height={12} />
      </span>
      <span
        className={cn("h-2 rounded-full bg-grey-mid", ["w-28", "w-20", "w-24"][index] ?? "w-24")}
        aria-hidden
      />
      <Tick className="ml-auto size-3.5 shrink-0 text-brand" />
    </div>
  );
}

type View = { label: string; status: string; body: ReactNode };

/** One product view per step, in the same order as that workflow's steps. */
const INTAKE_VIEWS: View[] = [
  {
    label: "Referral Received",
    status: "Received",
    body: (
      <div className="grid grid-cols-2 gap-2 max-600:grid-cols-1">
        {["Fax", "Email", "Portal", "API", "EHR"].map((source, i) => (
          <SourceCard key={source} name={source} live delay={`${i * 0.4}s`} />
        ))}
      </div>
    ),
  },
  {
    label: "Classification",
    status: "Classified",
    body: (
      <>
        <GroupLabel>Documents</GroupLabel>
        <div>
          {[0, 1, 2].map((i) => (
            <DocRow key={i} index={i} />
          ))}
        </div>
      </>
    ),
  },
  {
    label: "Extraction",
    status: "Extracted",
    body: (
      <>
        <FieldRow label="Patient" width="w-32" />
        <FieldRow label="Referral" width="w-24" />
        <div className="mt-3 flex justify-center">
          <Pips total={2} done={2} />
        </div>
      </>
    ),
  },
  {
    label: "Referral Summary",
    status: "Generated",
    body: (
      <div className="rounded-tile border border-grey-mid bg-grey-soft px-4 py-3.5">
        <div className="flex flex-col gap-2" aria-hidden>
          {["w-full", "w-11/12", "w-10/12", "w-7/12"].map((width, i) => (
            <span
              key={width}
              className={cn("h-2 rounded-full bg-grey-mid", width)}
              style={{ animation: `mp-fade-up .45s ease backwards ${0.08 + i * 0.07}s` }}
            />
          ))}
        </div>
      </div>
    ),
  },
];

const DECISION_VIEWS: View[] = [
  {
    label: "Checks",
    status: "Checked",
    body: (
      <ul>
        {["Completeness", "F2F", "Order", "Eligibility"].map((check, i) => (
          <CheckRow key={check} name={check} index={i} />
        ))}
      </ul>
    ),
  },
  {
    label: "Decision",
    status: "Routed",
    body: (
      <>
        <div className="flex flex-wrap justify-center gap-2">
          <DecisionChip name="Accept" chosen />
          <DecisionChip name="Pending" />
          <DecisionChip name="Decline" />
        </div>

        <div className="mt-4">
          <Row label="Routed to" value="Intake staff" />
        </div>
      </>
    ),
  },
  {
    label: "EHR Write-Back",
    status: "Created",
    body: (
      <>
        <SystemNode label="EHR" compact returned />

        <ul className="mt-4">
          <CheckRow name="Patient" index={0} />
          <CheckRow name="Admission" index={1} />
        </ul>
      </>
    ),
  },
  {
    label: "Schedule",
    status: "Filed",
    body: (
      <>
        <Row label="Start of care" value="Scheduled" />
        <Row label="NOA" value="Filed" />

        <div className="mt-4 flex justify-center">
          <Pips total={2} done={2} />
        </div>
      </>
    ),
  },
];

const VIEW_GROUPS = [INTAKE_VIEWS, DECISION_VIEWS];

export default function Mechanics({
  groups,
}: {
  /** The page's two workflows, each with the sentence that introduces it. */
  groups: { lede: string; steps: Step[] }[];
}) {
  const total = groups.reduce((n, group) => n + group.steps.length, 0);
  const { index, select, hold, release } = useAutoAdvance(total);

  /* Where each workflow starts in the combined sequence. */
  const offsets = groups.reduce<number[]>(
    (acc, _group, g) => [...acc, (acc[g - 1] ?? 0) + (groups[g - 1]?.steps.length ?? 0)],
    [],
  );

  return (
    <Reveal>
      <div onMouseEnter={hold} onMouseLeave={release} onFocusCapture={hold} onBlurCapture={release}>
        {groups.map((group, g) => {
          const offset = offsets[g];
          const count = group.steps.length;
          const views = VIEW_GROUPS[g] ?? [];

          /* This workflow's own position: pending before its turn, holding its
             last state once its turn has passed. */
          const local = Math.min(Math.max(index - offset, 0), count - 1);
          const running = index >= offset && index < offset + count;
          const finished = index >= offset + count;

          return (
            <div key={group.lede}>
              {/* The handoff between the two workflows. */}
              {g === 0 ? null : (
                <div className="flex items-center gap-4 py-9 max-720:py-7" aria-hidden>
                  <span className="h-px flex-1 bg-grey-mid" />
                  <span
                    className={cn(
                      "flex size-8 items-center justify-center rounded-full border transition-colors duration-[420ms] ease-out",
                      running || finished
                        ? "border-brand bg-brand text-white"
                        : "border-grey-mid bg-white text-grey-bdr",
                    )}
                  >
                    <Icon name="chevron" width={14} height={14} />
                  </span>
                  <span className="h-px flex-1 bg-grey-mid" />
                </div>
              )}

              <section
                className={cn(
                  "overflow-hidden rounded-[28px] border transition-colors duration-[420ms] ease-out",
                  running
                    ? "border-brand-pale bg-brand-tint/40"
                    : "border-grey-mid bg-grey-bg",
                )}
              >
                {/* The workflow's own heading and progress. */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-grey-mid px-7 py-4 max-600:px-5">
                  <h3 className="text-[16px] font-bold tracking-[-0.015em] text-ink">
                    {group.lede}
                  </h3>

                  <span className="flex items-center gap-3">
                    <Pips total={count} done={finished ? count : running ? local + 1 : 0} />
                    <span className="relative flex size-1.5 shrink-0" aria-hidden>
                      {running ? (
                        <>
                          <span
                            className="absolute inline-flex size-full rounded-full bg-brand/60 motion-reduce:hidden"
                            style={{ animation: "mp-glow 2.4s ease-in-out infinite" }}
                          />
                          <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
                        </>
                      ) : (
                        <span
                          className={cn(
                            "size-1.5 rounded-full",
                            finished ? "bg-brand" : "bg-grey-mid",
                          )}
                        />
                      )}
                    </span>
                  </span>
                </div>

                <div className="px-7 py-7 max-600:px-5 max-600:py-6">
                  {/* The four steps, on their own connecting line. */}
                  <ol className="flex items-start max-900:flex-col max-900:items-stretch">
                    {group.steps.map((step, s) => {
                      const i = offset + s;
                      const isActive = i === index;
                      const passed = index > i;

                      return (
                        <li key={step.num} className="contents">
                          {s === 0 ? null : (
                            <span
                              className={cn(
                                "mt-[18px] h-px w-7 shrink-0 transition-colors duration-[420ms] ease-out",
                                "max-900:mt-0 max-900:ml-[18px] max-900:h-7 max-900:w-px",
                                passed || isActive ? "bg-brand" : "bg-grey-mid",
                              )}
                              aria-hidden
                            />
                          )}

                          <div className="flex-1 min-w-0 max-900:flex-none">
                            <button
                              type="button"
                              onClick={() => select(i)}
                              aria-current={isActive}
                              className="group flex w-full flex-col items-center px-2 text-center max-900:flex-row max-900:items-start max-900:gap-4 max-900:px-0 max-900:text-left"
                            >
                              <span
                                className={cn(
                                  MONO,
                                  "relative flex size-9 shrink-0 items-center justify-center rounded-full border text-[12px] font-bold transition-colors duration-[420ms] ease-out",
                                  isActive
                                    ? "border-brand bg-brand text-white"
                                    : passed
                                      ? "border-brand bg-white text-brand"
                                      : "border-grey-mid bg-white text-grey-500 group-hover:border-brand group-hover:text-brand",
                                )}
                              >
                                {passed ? <Tick className="size-3.5" /> : step.num}
                                {isActive ? (
                                  <span
                                    className="absolute inset-0 rounded-full border border-brand motion-reduce:hidden"
                                    style={{ animation: "mp-pulse-ring 2s ease-out infinite" }}
                                    aria-hidden
                                  />
                                ) : null}
                              </span>

                              <span className="mt-3 block min-w-0 max-900:mt-0">
                                <span
                                  className={cn(
                                    "block text-[14.5px] font-bold leading-snug tracking-[-0.012em] transition-colors duration-[420ms] ease-out",
                                    isActive ? "text-ink" : "text-grey-500",
                                  )}
                                >
                                  {step.title}
                                </span>
                                <span className="mt-1 block text-[12.5px] leading-[1.45] text-grey-500">
                                  {step.body}
                                </span>
                              </span>
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ol>

                  {/* This workflow's own product surface. */}
                  <div
                    className={cn(
                      "mt-7 transition-opacity duration-[420ms] ease-out motion-reduce:transition-none",
                      running || finished ? "opacity-100" : "opacity-60",
                    )}
                  >
                    <div className="mx-auto grid max-w-[520px]">
                      {views.map((view, v) => (
                        <div
                          key={view.label}
                          aria-hidden={v !== local}
                          className={cn(
                            "col-start-1 row-start-1 transition-all duration-[420ms] ease-out motion-reduce:transition-none",
                            v === local
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
                  </div>
                </div>
              </section>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}
