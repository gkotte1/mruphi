"use client";

import { Icon } from "@/components/icons";
import { MONO, Tick } from "@/components/module-page/ui";
import {
  CheckRow,
  MurphiNode,
  Run,
  SourceCard,
  Surface,
} from "@/components/referral-to-noa/Intake";
import { useAutoAdvance } from "@/lib/useAutoAdvance";
import { cn } from "@/lib/cn";

/**
 * The hero visual: every source, one intake.
 *
 * It used to be five labelled boxes, two columns of chevrons and a grey card - 
 * a diagram of the idea. It is now the intake itself: the five sources the page
 * names, feeding one bus into the Murphi mark, with the three states the page
 * already lists clearing in sequence and the referral ending ready to route.
 *
 * The mark is the project's own LogoMark component - no new or generated image.
 *
 * The sequence advances every two seconds and loops; under reduced motion it
 * holds the first state and nothing moves. Every string is the page's own.
 */

const SOURCES = ["Fax", "Email", "Portal", "API", "EHR"];

/** The three states the page already lists, in the order it lists them. */
const STATES = ["Classified", "Extracted", "Checked"];

export default function IntakeFlow({
  sources = SOURCES,
  outTitle,
  states = STATES,
  ready,
}: {
  sources?: string[];
  outTitle: string;
  states?: string[];
  /** The step this intake unlocks, once the checks have cleared. */
  ready: string;
}) {
  /* Phase 0 is the referral arriving; 1–3 clear the three states. */
  const { index, hold, release } = useAutoAdvance(states.length + 1);
  const cleared = index;

  return (
    <div className="relative" onMouseEnter={hold} onMouseLeave={release}>
      {/* Where referrals come from. */}
      <div className="grid grid-cols-5 gap-2 max-900:grid-cols-3 max-900:gap-2.5 max-600:grid-cols-2">
        {sources.map((source, i) => (
          <SourceCard key={source} name={source} live delay={`${i * 0.4}s`} full />
        ))}
      </div>

      {/* The fan: a stem under each source, joined into one bus. */}
      <div aria-hidden className="max-900:hidden">
        <div className="grid grid-cols-5">
          {sources.map((source, i) => (
            <span key={source} className="flex justify-center">
              <span className="relative flex h-6 w-px bg-[#E3E3E3]">
                <span
                  className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[#007EFF]"
                  style={{
                    animation: `mp-flow-pulse-v 2.6s ease-in-out infinite ${i * 0.34}s`,
                  }}
                />
              </span>
            </span>
          ))}
        </div>

        <span className="mx-[10%] block h-px bg-[#E3E3E3]" />

        <span className="mx-auto flex h-6 w-px bg-[#E3E3E3]" />
      </div>

      {/* Below 900 the sources wrap, so the fan becomes one run. */}
      <div className="hidden max-900:block">
        <Run short />
      </div>

      {/* The mark that reads them all. */}
      <MurphiNode status="Processing" />

      <Run />

      {/* What it produced. */}
      <Surface
        label={
          <>
            <Icon name="brain" width={13} height={13} className="shrink-0" />
            <span className="truncate">{outTitle}</span>
          </>
        }
        status={cleared === 0 ? "Processing" : states[cleared - 1]}
        tone="brand"
        className="relative z-20"
        foot={
          <span
            className={cn(
              "flex items-center justify-center gap-2 transition-opacity duration-[420ms] ease-out motion-reduce:transition-none",
              cleared === states.length ? "opacity-100" : "opacity-45",
            )}
          >
            <Tick
              className={cn(
                "size-3.5 shrink-0 transition-colors duration-[420ms] ease-out",
                cleared === states.length ? "text-[#007EFF]" : "text-[#B2B2B2]",
              )}
            />
            <span className={cn(MONO, "text-[11.5px] font-semibold text-ink")}>
              {ready}
            </span>
          </span>
        }
      >
        <ul>
          {states.map((state, i) => (
            <CheckRow key={state} name={state} done={i < cleared} index={i} />
          ))}
        </ul>
      </Surface>
    </div>
  );
}
