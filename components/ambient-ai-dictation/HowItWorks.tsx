"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { Icon } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import {
  CONTAINER,
  Kicker,
  MONO,
  SECTION,
  SectionHead,
} from "@/components/module-page/ui";
import { Divide, Panel } from "@/components/ambient-ai-dictation/Surface";
import {
  CaptureWave,
  DocTiles,
  FieldRows,
} from "@/components/ambient-ai-dictation/Capture";
import { useAutoAdvance } from "@/lib/useAutoAdvance";
import { cn } from "@/lib/cn";

/**
 * The three moments of a visit, as one interface.
 *
 * The phases used to be an accordion down the left, which meant the reader had
 * to open each one and the panel beside it jumped height as they did. They are
 * now three tabs across the top, and the tab drives both columns: the copy on
 * the left and the product surface on the right change together, so the
 * section reads as tab -> workflow -> product rather than three separate rows.
 *
 * All three views stay mounted in one grid cell and cross-fade, so the section
 * holds the height of the tallest and nothing shifts as the tabs rotate.
 *
 * Every string below is the one the page already carried.
 */

/**
 * How long each tab holds.
 *
 * Two seconds per phase - long enough to read the body copy. The rotation
 * pauses while the pointer is over the left copy or the right surface, or a
 * tab has keyboard focus, and stops altogether under prefers-reduced-motion.
 * Change this one constant to retune the pace.
 */
const TAB_MS = 2000;

/** Freeze every CSS animation under a hovered column without touching layout. */
const PAUSE_MOTION = "[&_*]:![animation-play-state:paused]";

type Phase = {
  number: string;
  heading: string;
  body: string;
  /** The label on the product surface for this phase. */
  panel: string;
  context?: string;
  live?: boolean;
  visual: ReactNode;
};

const PHASES: Phase[] = [
  {
    number: "01 · Before the Visit",
    heading: "Walk in already prepared.",
    body: "Murphi pulls the referral and existing EHR record ahead of time, pre-filling what's already known - history, diagnoses, prior medications - and gives the clinician a short summary of the packet. No evening spent sifting through discharge paperwork before tomorrow's first visit.",
    panel: "Referral Summary",
    context: "Discharge packet condensed to one page",
    visual: (
      <>
        <FieldRows
          lines={[
            "Primary diagnosis: CHF, NYHA Class II.",
            "Recent hospitalization: 4 days, discharged stable.",
            "Homebound status: mobility-limited, documented.",
          ]}
        />
        <DocTiles
          items={["History Pre-Filled", "Medications Loaded"]}
          columns={2}
          className="mt-3"
        />
      </>
    ),
  },
  {
    number: "02 · During the Visit",
    heading: "Hit record. Murphi listens.",
    body: "Murphi quietly listens to the conversation with the patient, filtering out anything that isn't clinically relevant. If something required gets missed - a wound assessment, a medication reconciliation - Murphi flags it in the moment, while the clinician is still in the room, not after they've left.",
    panel: "Live Encounter",
    live: true,
    visual: (
      <>
        <CaptureWave />

        <Divide label="Flagged in real time" />

        <div className="flex items-start gap-3 rounded-tile border-y border-r border-l-[3px] border-y-grey-mid border-r-grey-mid border-l-brand bg-brand-tint px-3.5 py-3">
          <span className="mt-[1px] flex size-[18px] shrink-0 items-center justify-center rounded-full bg-brand-dark text-white">
            <Icon name="pulse" width={10} height={10} />
          </span>
          <div className="min-w-0 text-[12.5px] leading-[1.4] text-ink">
            Wound assessment not yet addressed
            <small className="mt-0.5 block text-[11px] text-ink-muted">
              Flagged in real time
            </small>
          </div>
        </div>
      </>
    ),
  },
  {
    number: "03 · After the Visit",
    heading: "Finish it from the car, or the couch.",
    body: "Anything sensitive or left out can be added afterward with a short dictation, at the clinician's convenience. Murphi combines the visit recording, the dictation and the referral information into the completed OASIS, HOPE or discipline note - ready for review the same day.",
    panel: "Dictation → Completed Note",
    context: "Recording + dictation + referral combined",
    visual: <DocTiles items={["OASIS", "HOPE", "Visit Note"]} />,
  },
];

export default function HowItWorks() {
  const { index, select, hold, release, paused } = useAutoAdvance(
    PHASES.length,
    TAB_MS,
  );

  /* The two columns share one hover zone for leave detection so moving between
     left and right does not briefly release the hold and advance a step. */
  const columnsRef = useRef<HTMLDivElement>(null);
  const focusHeld = useRef(false);

  const pause = useCallback(() => {
    hold();
  }, [hold]);

  const resumeIfOutside = useCallback(
    (related: EventTarget | null) => {
      if (related instanceof Node && columnsRef.current?.contains(related)) {
        return;
      }
      if (focusHeld.current) return;
      release();
    },
    [release],
  );

  return (
    <section id="how" className={cn("border-t border-grey-mid", SECTION)}>
      <div className={CONTAINER}>
        <Kicker>Intelligent Documentation Assistance</Kicker>
        <SectionHead>How Murphi Completes Documentation For You</SectionHead>

        <Reveal>
          {/* ── The three phases, as tabs ──
              Keyboard focus on a tab holds the rotation so the copy can be
              read; the pointer holds it over the left copy or right surface. */}
          <div
            onFocus={() => {
              focusHeld.current = true;
              hold();
            }}
            onBlur={(e) => {
              if (e.currentTarget.contains(e.relatedTarget as Node | null)) {
                return;
              }
              focusHeld.current = false;
              if (columnsRef.current?.matches(":hover")) return;
              release();
            }}
          >
            <div
              role="tablist"
              aria-label="The three moments of a visit"
              className="grid grid-cols-3 gap-2 max-600:gap-1.5"
            >
              {PHASES.map((phase, i) => {
                const on = i === index;

                return (
                  <button
                    key={phase.number}
                    type="button"
                    role="tab"
                    id={`how-tab-${i}`}
                    aria-selected={on}
                    aria-controls={`how-panel-${i}`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => select(i)}
                    className={cn(
                      MONO,
                      "min-w-0 rounded-card border px-4 py-3 text-[12px] font-semibold tracking-[0.05em] transition-colors duration-300 max-600:px-2.5 max-600:py-2.5 max-600:text-[11px]",
                      on
                        ? "border-brand bg-brand text-white"
                        : "border-grey-mid bg-white text-grey-500 hover:border-brand-border hover:text-brand-dark",
                    )}
                  >
                    {phase.number}
                  </button>
                );
              })}
            </div>

            {/* The one line that connects the active tab to the content: a
                third of the rail, sliding under whichever tab is live. */}
            <div className="relative mt-3 h-px w-full bg-grey-mid" aria-hidden>
              <span
                className="absolute inset-y-0 left-0 block w-1/3 bg-brand transition-transform duration-[400ms] ease-out"
                style={{ transform: `translateX(${index * 100}%)` }}
              />
            </div>
          </div>

          <div
            ref={columnsRef}
            className={cn(
              "mt-10 grid grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] items-start gap-14 max-1080:grid-cols-1 max-1080:gap-10 max-600:mt-8",
              paused && PAUSE_MOTION,
            )}
          >
            {/* ── The copy for the active phase ── */}
            <div
              className="grid min-w-0"
              onPointerEnter={pause}
              onPointerLeave={(e) => resumeIfOutside(e.relatedTarget)}
            >
              {PHASES.map((phase, i) => (
                <div
                  key={phase.number}
                  role="tabpanel"
                  id={`how-panel-${i}`}
                  aria-labelledby={`how-tab-${i}`}
                  aria-hidden={i !== index}
                  className={cn(
                    /* One cell, so the column keeps the height of the longest
                       body and nothing shifts as the tabs rotate. */
                    "col-start-1 row-start-1 min-w-0 transition-[opacity,transform] duration-[380ms] ease-out",
                    i === index
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-1 opacity-0",
                  )}
                >
                  <h3 className="type-h4 text-ink">{phase.heading}</h3>

                  <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.65] text-grey-500">
                    {phase.body}
                  </p>
                </div>
              ))}
            </div>

            {/* ── The surface for the active phase ── */}
            <div
              className="grid min-w-0 rounded-[28px] border border-brand-pale bg-brand-tint/40 p-7 max-1080:p-6 max-600:rounded-panel max-600:p-4"
              onPointerEnter={pause}
              onPointerLeave={(e) => resumeIfOutside(e.relatedTarget)}
            >
              {PHASES.map((phase, i) => (
                <div
                  key={phase.panel}
                  aria-hidden={i !== index}
                  className={cn(
                    "col-start-1 row-start-1 min-w-0 transition-[opacity,transform] duration-[380ms] ease-out",
                    i === index
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-1 opacity-0",
                  )}
                >
                  <Panel
                    label={phase.panel}
                    context={phase.context}
                    live={phase.live}
                  >
                    {phase.visual}
                  </Panel>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
