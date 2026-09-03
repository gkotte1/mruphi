"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import { MONO, Tick } from "@/components/module-page/ui";
import { Pips, ScanBar, Surface, SystemNode } from "@/components/revenue-assurance/Review";
import { useAutoAdvance } from "@/lib/useAutoAdvance";
import { cn } from "@/lib/cn";

/**
 * The five stages, demonstrating themselves.
 *
 * The rail on the left and the product view on the right run off one index, so
 * they can never fall out of step. It advances every two seconds and loops;
 * pointing at the section holds it, and picking a stage restarts that stage's
 * full interval before the sequence carries on.
 *
 * The views are stacked in one grid cell rather than toggled with `hidden`, so
 * the panel's height never jumps between states and every view's copy stays in
 * the HTML. Only the active view is exposed to assistive technology.
 *
 * The chart followed here is the one the page already opens with — Mr.
 * Delgado's episode, its four fetched documents and its three findings.
 */

type Step = { num: string; title: string; body: string };

/* ── The small parts each view is written with ─────────────── */

function Label({ children }: { children: string }) {
  return (
    <div
      className={cn(
        MONO,
        "mb-2 text-[10px] uppercase tracking-[0.08em] text-grey-bdr",
      )}
    >
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-grey-soft py-2 last:border-b-0">
      <span className={cn(MONO, "shrink-0 text-[11px] text-ink-muted")}>
        {label}
      </span>
      <span className="min-w-0 truncate text-right text-[12.5px] font-semibold text-ink">
        {value}
      </span>
    </div>
  );
}

/** A document pulled from the record. */
function DocTile({ name }: { name: string }) {
  return (
    <span className="flex items-center gap-2 rounded-[10px] border border-grey-mid bg-grey-soft px-2.5 py-2">
      <Icon name="doc" width={13} height={13} className="shrink-0 text-brand" />
      <span className={cn(MONO, "min-w-0 truncate text-[11.5px] text-ink")}>
        {name}
      </span>
    </span>
  );
}

/** A check that has run. */
function CheckLine({ name, done = true }: { name: string; done?: boolean }) {
  return (
    <li className="flex items-center gap-2.5 py-1.5">
      <span
        className={cn(
          "flex size-[18px] shrink-0 items-center justify-center rounded-full border",
          done
            ? "border-brand bg-brand text-white"
            : "border-grey-mid bg-white text-grey-bdr",
        )}
        aria-hidden
      >
        {done ? <Tick className="size-2.5" /> : <span className="size-1 rounded-full bg-current" />}
      </span>
      <span className="min-w-0 text-[12.5px] font-semibold text-ink">{name}</span>
    </li>
  );
}

/** One finding, as the review lists it. */
function FindingLine({
  title,
  meta,
  tone,
}: {
  title: string;
  meta: string;
  tone: "flag" | "opportunity";
}) {
  const flag = tone === "flag";

  return (
    <li className="flex items-start gap-2.5 border-b border-grey-soft py-2.5 last:border-b-0">
      <span
        className={cn(
          "mt-px flex size-5 shrink-0 items-center justify-center rounded-[6px] border",
          flag
            ? "border-brand-deep/20 bg-brand-deep/10 text-brand-deep"
            : "border-brand-pale bg-brand-tint text-brand",
        )}
        aria-hidden
      >
        <Icon name={flag ? "shield" : "chartup"} width={10} height={10} />
      </span>
      <span className="min-w-0">
        <span className="block text-[12.5px] leading-[1.35] font-semibold text-ink">
          {title}
        </span>
        <span className={cn(MONO, "mt-0.5 block text-[10.5px] text-ink-muted")}>
          {meta}
        </span>
      </span>
    </li>
  );
}

/* ── The five states ───────────────────────────────────────── */

type View = { label: string; status: string; body: ReactNode };

const VIEWS: View[] = [
  {
    label: "EHR Connection",
    status: "Connected",
    body: (
      <>
        <Row label="Patient chart" value="Mr. Delgado, Episode 2" />
        <Row
          label="Status"
          value={
            <span className="inline-flex items-center gap-1.5">
              <span
                className="size-1.5 rounded-full bg-brand"
                style={{ animation: "mp-blink 1.6s ease-in-out infinite" }}
                aria-hidden
              />
              Connected to EHR
            </span>
          }
        />

        <div className="mt-4">
          <Label>Documents</Label>
          <div className="grid grid-cols-2 gap-2">
            <DocTile name="Referral" />
            <DocTile name="F2F" />
            <DocTile name="OASIS" />
            <DocTile name="POC" />
          </div>
        </div>
      </>
    ),
  },
  {
    label: "AI Review",
    status: "Analyzing",
    body: (
      <>
        <ScanBar rows={2} />

        <div className="mt-4">
          <Label>Checks running</Label>
          <ul>
            <CheckLine name="Coding" />
            <CheckLine name="OASIS" />
            <CheckLine name="POC" />
            <CheckLine name="Compliance" done={false} />
          </ul>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 border-t border-grey-soft pt-3">
          <Pips total={4} done={3} />
          <span className={cn(MONO, "text-[11px] text-ink-muted")}>Analyzing</span>
        </div>
      </>
    ),
  },
  {
    label: "Findings Detected",
    status: "3 Findings",
    body: (
      <>
        <ul>
          <FindingLine
            tone="flag"
            title="Homebound status not fully documented"
            meta="Section G · Visit 3"
          />
          <FindingLine
            tone="flag"
            title="Face-to-Face encounter date missing"
            meta="Referral documentation"
          />
          <FindingLine
            tone="opportunity"
            title="PDGM grouping opportunity identified"
            meta="Coding review"
          />
        </ul>

        <div className="mt-3 border-t border-grey-soft pt-3">
          <Row label="Review status" value="Needs attention" />
        </div>
      </>
    ),
  },
  {
    label: "Clinical Review",
    status: "Under review",
    body: (
      <>
        <Row label="Finding" value="02" />

        <div className="mt-3 rounded-tile border-y border-r border-l-[3px] border-y-grey-mid border-r-grey-mid border-l-brand bg-brand-tint px-3.5 py-3">
          <div className="text-[13px] leading-[1.35] font-semibold text-ink">
            Face-to-Face encounter date missing
          </div>
          <div className={cn(MONO, "mt-0.5 text-[10.5px] text-ink-muted")}>
            Referral documentation
          </div>
        </div>

        <div className="mt-3">
          <Row label="Reviewer" value="Team member" />
          <Row label="Status" value="Under review" />
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <Pips total={3} done={2} />
          {/* A state in the mock, not a control — nothing to operate here. */}
          <span
            className="rounded-full bg-brand px-3.5 py-1.5 text-[11.5px] font-semibold text-white"
            aria-hidden
          >
            Resolve Finding
          </span>
        </div>
      </>
    ),
  },
  {
    label: "Write-Back",
    status: "Synced",
    body: (
      <>
        <ul>
          <CheckLine name="Finding resolved" />
          <CheckLine name="Documentation updated" />
          <CheckLine name="Result approved" />
        </ul>

        <div className="mt-3 border-t border-grey-soft pt-3">
          <Row label="Write-back" value="Complete" />
        </div>

        <div className="mt-4">
          <SystemNode label="EHR" compact returned />
        </div>
      </>
    ),
  },
];

export default function Mechanics({ steps }: { steps: Step[] }) {
  const { index, select, hold, release } = useAutoAdvance(steps.length);

  return (
    <Reveal>
      <div
        className="grid grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-start gap-14 max-1080:grid-cols-1 max-1080:gap-10"
        onMouseEnter={hold}
        onMouseLeave={release}
        onFocusCapture={hold}
        onBlurCapture={release}
      >
        {/* The rail of stages. */}
        <ol className="min-w-0">
          {steps.map((step, i) => {
            const isActive = i === index;
            const done = i < index;
            const last = i === steps.length - 1;

            return (
              <li key={step.num}>
                <button
                  type="button"
                  onClick={() => select(i)}
                  aria-current={isActive}
                  className="group grid w-full grid-cols-[auto_1fr] items-start gap-5 py-5 text-left max-600:gap-4"
                >
                  {/* Number on a continuous rail. */}
                  <span className="relative flex w-9 shrink-0 justify-center self-stretch">
                    <span
                      className={cn(
                        MONO,
                        "relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border text-[12px] font-bold transition-colors duration-[420ms] ease-out",
                        isActive
                          ? "border-brand bg-brand text-white"
                          : done
                            ? "border-brand bg-white text-brand"
                            : "border-grey-mid bg-white text-grey-500 group-hover:border-brand group-hover:text-brand",
                      )}
                    >
                      {done ? <Tick className="size-3.5" /> : step.num}
                      {isActive ? (
                        <span
                          className="absolute inset-0 rounded-full border border-brand motion-reduce:hidden"
                          style={{ animation: "mp-pulse-ring 2s ease-out infinite" }}
                          aria-hidden
                        />
                      ) : null}
                    </span>
                    {last ? null : (
                      <span
                        className={cn(
                          "absolute top-9 -bottom-10 left-1/2 w-px -translate-x-1/2 transition-colors duration-[420ms] ease-out",
                          done ? "bg-brand" : "bg-grey-mid",
                        )}
                        aria-hidden
                      />
                    )}
                  </span>

                  <span
                    className={cn(
                      "min-w-0 border-l-2 pl-5 transition-colors duration-[420ms] ease-out max-600:pl-4",
                      isActive ? "border-l-brand" : "border-l-transparent",
                    )}
                  >
                    <span
                      className={cn(
                        "block text-[16.5px] font-bold leading-snug tracking-[-0.015em] transition-colors duration-[420ms] ease-out",
                        isActive ? "text-ink" : "text-grey-500",
                      )}
                    >
                      {step.title}
                    </span>
                    <span className="mt-1.5 block text-[13.5px] leading-[1.55] text-grey-500">
                      {step.body}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* The product view for whichever stage is running. */}
        <div className="min-w-0 rounded-[28px] border border-brand-pale bg-brand-tint/40 p-7 max-1080:p-6 max-600:rounded-panel max-600:p-4">
          {/* One grid cell for every view, so the height never jumps. */}
          <div className="grid">
            {VIEWS.map((view, i) => (
              <div
                key={view.label}
                aria-hidden={i !== index}
                className={cn(
                  "col-start-1 row-start-1 transition-all duration-[420ms] ease-out motion-reduce:transition-none",
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

          <div className="mt-4 flex justify-center">
            <Pips total={steps.length} done={index + 1} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
