"use client";

import { useCallback, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import { MONO, Tick } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * The comparison used by "The Same Chart, Two Timelines" on Revenue Assurance:
 * two equal cards around a hand-off node, each running four numbered steps
 * down its own rail via the shared mp-tl-* keyframes.
 *
 * Hovering the full left track or the full right track pauses every CSS
 * animation in place (no restart, no scroll lock). Moving between the two
 * tracks through the hand-off stays paused.
 */

const TL_CYCLE = "6s";
const TL_BEAT = 1.5;

const PAUSE_MOTION = "[&_*]:![animation-play-state:paused]";

const stepOn = (index: number) => ({
  animation: `mp-tl-on ${TL_CYCLE} ease-in-out ${index * TL_BEAT}s infinite`,
});

export function Timelines({
  before,
  after,
}: {
  before: { title: string; steps: string[] };
  after: { title: string; steps: string[] };
}) {
  const rows = Math.max(before.steps.length, after.steps.length);
  const columnsRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const pause = useCallback(() => setPaused(true), []);

  const resumeIfOutside = useCallback((related: EventTarget | null) => {
    if (related instanceof Node && columnsRef.current?.contains(related)) {
      return;
    }
    setPaused(false);
  }, []);

  return (
    <Reveal>
      <div
        ref={columnsRef}
        className={cn(
          "grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch max-900:grid-cols-1",
          paused && PAUSE_MOTION,
        )}
        onPointerLeave={(e) => resumeIfOutside(e.relatedTarget)}
      >
        {/* Full left track is the hover zone — not the heading alone. */}
        <div className="min-h-0 min-w-0" onPointerEnter={pause}>
          <Track
            title={before.title}
            steps={before.steps}
            rows={rows}
            tone="before"
          />
        </div>

        <SameChart />

        {/* Full right track is the hover zone — not a single step. */}
        <div className="min-h-0 min-w-0" onPointerEnter={pause}>
          <Track
            title={after.title}
            steps={after.steps}
            rows={rows}
            tone="after"
          />
        </div>
      </div>
    </Reveal>
  );
}

function SameChart() {
  return (
    <div
      className="flex items-center self-center px-4 max-900:w-full max-900:flex-col max-900:px-0 max-900:py-3"
      aria-hidden
    >
      <span className="h-px w-4 bg-grey-mid max-900:h-4 max-900:w-px" />
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-brand-pale bg-white text-brand">
        <Icon name="exchange" width={12} height={12} />
      </span>
      <span className="h-px w-4 bg-grey-mid max-900:h-4 max-900:w-px" />
    </div>
  );
}

function Track({
  title,
  steps,
  rows,
  tone,
}: {
  title: string;
  steps: string[];
  rows: number;
  tone: "before" | "after";
}) {
  const after = tone === "after";

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-panel border bg-white",
        after
          ? "border-brand-pale shadow-[0_16px_40px_rgba(15,29,84,.06)]"
          : "border-grey-mid shadow-[0_10px_26px_-18px_rgba(15,29,84,.35)]",
      )}
    >
      <TrackHead title={title} tone={tone} />

      <div className="grow px-7 py-6 max-600:px-5">
        <div
          className="relative grid h-full gap-y-3"
          style={{ gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}
        >
          <span
            className="pointer-events-none absolute top-[12.5%] bottom-[12.5%] left-0 z-[1] w-7"
            aria-hidden
          >
            <span
              className={cn(
                "absolute inset-y-0 left-1/2 w-px -translate-x-1/2",
                after ? "bg-brand-pale" : "bg-grey-mid",
              )}
            />
            <span
              className={cn(
                "absolute inset-y-0 left-1/2 w-px origin-top -translate-x-1/2 opacity-0",
                after ? "bg-brand" : "bg-grey-bdr",
              )}
              style={{
                animation: `mp-tl-rail ${TL_CYCLE} ease-in-out infinite`,
              }}
            />
          </span>

          {Array.from({ length: rows }, (_, i) => (
            <TrackCell key={i} step={steps[i]} index={i} tone={tone} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TrackHead({
  title,
  tone,
}: {
  title: string;
  tone: "before" | "after";
}) {
  const after = tone === "after";

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 border-b px-7 py-4 max-600:px-5",
        after
          ? "border-brand-pale bg-brand-tint/50"
          : "border-grey-mid bg-grey-soft",
      )}
    >
      <span
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full border",
          after
            ? "border-brand bg-brand text-white"
            : "border-grey-bdr bg-white text-grey-bdr",
        )}
        aria-hidden
      >
        {after ? (
          <Tick className="size-2.5" />
        ) : (
          <span className="size-1.5 rounded-full bg-current" />
        )}
      </span>

      <h4
        className={cn(
          MONO,
          "text-[12px] font-semibold uppercase tracking-[0.06em]",
          after ? "text-brand-dark" : "text-ink-muted",
        )}
      >
        {title}
      </h4>
    </div>
  );
}

function TrackCell({
  step,
  index,
  tone,
}: {
  step?: string;
  index: number;
  tone: "before" | "after";
}) {
  const after = tone === "after";
  const on = stepOn(index);

  return (
    <div className="relative flex items-center gap-4 max-600:gap-3.5">
      <span
        className={cn(
          "absolute -inset-x-3 inset-y-1.5 z-0 rounded-tile opacity-0",
          after ? "bg-brand-tint/40" : "bg-grey-bg",
        )}
        style={on}
        aria-hidden
      />

      <span
        className="relative z-[2] flex size-7 shrink-0 items-center justify-center"
        aria-hidden
      >
        <span
          className={cn(
            "absolute inset-0 rounded-full border bg-white",
            after ? "border-brand-pale" : "border-grey-mid",
          )}
        />
        <span
          className={cn(
            "absolute inset-0 rounded-full border opacity-0",
            after ? "border-brand bg-brand-tint" : "border-grey-bdr bg-grey-soft",
          )}
          style={on}
        />
        <span
          className={cn(
            MONO,
            "relative text-[10px] font-bold",
            after ? "text-brand-dark" : "text-grey-500",
          )}
        >
          {index + 1}
        </span>
      </span>

      <span
        className={cn(
          "relative z-[2] min-w-0 type-hl-card-body",
          after ? "!text-ink" : null,
        )}
      >
        {step}
      </span>
    </div>
  );
}
