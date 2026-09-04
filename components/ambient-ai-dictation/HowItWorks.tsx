"use client";

import { useState, type ReactNode } from "react";
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
import { cn } from "@/lib/cn";

/**
 * The three moments of a visit, as one interface.
 *
 * The section used to be three stacked rows, each with its copy on one side and
 * a panel on the other - which meant the reader met three separate layouts for
 * what is one continuous workflow. It is now a single composition: the phases
 * on the left as an accordion, one open at a time, and the matching product
 * surface on the right.
 *
 * Motion uses what the site already has - the accordion's max-height slide and
 * the mp-view fade - rather than pulling in an animation library.
 *
 * Every string below is the one the page already carried.
 */

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
  const [open, setOpen] = useState(0);

  return (
    <section id="how" className={cn("border-t border-grey-mid", SECTION)}>
      <div className={CONTAINER}>
        <Kicker>Intelligent Documentation Assistance</Kicker>
        <SectionHead>How Murphi Completes Documentation For You</SectionHead>

        <Reveal>
          <div className="grid grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] items-start gap-14 max-1080:grid-cols-1 max-1080:gap-10">
            {/* ── The three phases ── */}
            <div className="min-w-0">
              {PHASES.map((phase, i) => {
                const isOpen = i === open;

                return (
                  <div
                    key={phase.number}
                    className={cn(
                      "border-l-2 pl-6 transition-colors duration-200 max-600:pl-4",
                      isOpen ? "border-l-brand" : "border-l-transparent",
                      i === PHASES.length - 1 ? "" : "border-b border-b-grey-mid",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start gap-5 py-6 text-left max-600:gap-3.5"
                    >
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            MONO,
                            "block text-[12px] font-semibold tracking-[0.05em] transition-colors duration-200",
                            isOpen ? "text-brand" : "text-ink-muted",
                          )}
                        >
                          {phase.number}
                        </span>

                        <span
                          className={cn(
                            "mt-2.5 block type-h4 transition-colors duration-200",
                            isOpen ? "text-ink" : "text-grey-500",
                          )}
                        >
                          {phase.heading}
                        </span>
                      </span>

                      <span
                        className={cn(
                          "mt-1 flex size-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200",
                          isOpen
                            ? "rotate-180 border-brand bg-brand text-grey-bg"
                            : "border-grey-mid bg-white text-grey-500",
                        )}
                        aria-hidden
                      >
                        <Icon name="chevron" width={13} height={13} />
                      </span>
                    </button>

                    {/* max-height rather than display, so it slides. */}
                    <div
                      className="overflow-hidden transition-[max-height] duration-[280ms] ease-[ease]"
                      style={{ maxHeight: isOpen ? 320 : 0 }}
                    >
                      <p className="max-w-[52ch] pb-7 text-[15px] leading-[1.65] text-grey-500">
                        {phase.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── The surface for whichever phase is open ── */}
            <div className="min-w-0 rounded-[28px] border border-brand-pale bg-brand-tint/40 p-7 max-1080:p-6 max-600:rounded-panel max-600:p-4">
              <div key={open} className="mp-view">
                {PHASES.map((phase, i) => (
                  <div key={phase.panel} hidden={i !== open}>
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
