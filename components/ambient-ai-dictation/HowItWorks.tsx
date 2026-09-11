"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { Icon } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import { Divide, Panel } from "@/components/ambient-ai-dictation/Surface";
import {
  CaptureWave,
  DocTiles,
  FieldRows,
} from "@/components/ambient-ai-dictation/Capture";
import { AaEyebrow, AaHead, AaWrap } from "@/components/ambient-ai-dictation/Shell";
import { useAutoAdvance } from "@/lib/useAutoAdvance";
import { cn } from "@/lib/cn";

const TAB_MS = 2000;

const PAUSE_MOTION = "[&_*]:![animation-play-state:paused]";

type Phase = {
  number: string;
  heading: string;
  body: string;
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

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            border: "1px solid #E3E3E3",
            borderRadius: 8,
            background: "#F5F5F5",
            padding: "12px 14px",
          }}
        >
          <span
            style={{
              marginTop: 1,
              display: "flex",
              width: 18,
              height: 18,
              flexShrink: 0,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              background: "#007EFF",
              color: "#ffffff",
            }}
          >
            <Icon name="pulse" width={10} height={10} />
          </span>
          <div style={{ minWidth: 0, fontSize: 12.5, lineHeight: 1.4, color: "#1A1A1A" }}>
            Wound assessment not yet addressed
            <small
              style={{
                display: "block",
                marginTop: 2,
                fontSize: 11,
                color: "#878787",
              }}
            >
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
    <section id="how" className="aa-section aa-band">
      <AaWrap>
        <AaHead>
          <AaEyebrow>Intelligent Documentation Assistance</AaEyebrow>
          <h2 className="aa-h2 aa-serif" style={{ marginTop: 16, marginBottom: 18 }}>
            How Murphi Completes Documentation For You
          </h2>
        </AaHead>

        <Reveal>
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
              className="grid grid-cols-3"
              style={{ gap: 8 }}
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
                    className="aa-mono"
                    style={{
                      minWidth: 0,
                      borderRadius: 4,
                      border: on ? "1px solid #007EFF" : "1px solid #E3E3E3",
                      background: on ? "#007EFF" : "#ffffff",
                      color: on ? "#F5F5F5" : "#606060",
                      padding: "12px 16px",
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      cursor: "pointer",
                    }}
                  >
                    {phase.number}
                  </button>
                );
              })}
            </div>

            <div
              className="relative mt-3 h-px w-full"
              style={{ background: "#E3E3E3" }}
              aria-hidden
            >
              <span
                className="absolute inset-y-0 left-0 block w-1/3 transition-transform duration-[400ms] ease-out"
                style={{
                  background: "#007EFF",
                  transform: `translateX(${index * 100}%)`,
                }}
              />
            </div>
          </div>

          <div
            ref={columnsRef}
            className={cn("aa-split mt-10 grid items-start", paused && PAUSE_MOTION)}
            style={{
              gridTemplateColumns: "minmax(0,0.92fr) minmax(0,1.08fr)",
              gap: 64,
            }}
          >
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
                    "col-start-1 row-start-1 min-w-0 transition-[opacity,transform] duration-[380ms] ease-out",
                    i === index
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-1 opacity-0",
                  )}
                >
                  <h3 className="aa-serif" style={{ fontSize: 30, fontWeight: 500 }}>
                    {phase.heading}
                  </h3>

                  <p className="aa-body" style={{ marginTop: 16, maxWidth: "52ch" }}>
                    {phase.body}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="aa-card grid min-w-0"
              style={{ padding: 28 }}
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
      </AaWrap>
    </section>
  );
}
