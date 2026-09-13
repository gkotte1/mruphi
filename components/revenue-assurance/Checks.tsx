"use client";

import { useCallback, useRef } from "react";
import Reveal from "@/components/module-page/Reveal";
import { MONO, Tick } from "@/components/module-page/ui";
import { useAutoAdvance } from "@/lib/useAutoAdvance";
import { cn } from "@/lib/cn";

/**
 * The five kinds of review, demonstrating themselves.
 *
 * The rail and the panel run off one index on the same two-second clock as the
 * mechanics above, so the two sections read as one continuous demonstration
 * rather than two separate widgets. Pointing at the left rail or the right
 * panel holds it; picking a check restarts that check's interval before the
 * rotation carries on.
 *
 * The panels are stacked in one grid cell rather than toggled with `hidden`, so
 * the height never jumps between checks and every panel's copy stays in the
 * HTML. Only the active panel is exposed to assistive technology.
 *
 * Every string comes from the page.
 */

export type Check = {
  id: string;
  label: string;
  groups?: { label: string; chips: string[]; alt?: boolean }[];
  chips?: string[];
  note?: string;
};

export default function Checks({ checks }: { checks: Check[] }) {
  const { index, select, hold, release, paused } = useAutoAdvance(checks.length);

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
    <Reveal>
      <div
        ref={columnsRef}
        className={cn(
          "ra-split grid grid-cols-[minmax(0,0.36fr)_minmax(0,1fr)] items-start gap-10 max-900:grid-cols-1 max-900:gap-7",
          paused && "[&_*]:![animation-play-state:paused]",
        )}
      >
        {/* The rail. */}
        <div
          role="tablist"
          className="min-w-0 border-l border-[#E3E3E3]"
          onPointerEnter={pause}
          onPointerLeave={(e) => resumeIfOutside(e.relatedTarget)}
          onFocusCapture={() => {
            focusHeld.current = true;
            hold();
          }}
          onBlurCapture={(e) => {
            if (e.currentTarget.contains(e.relatedTarget as Node | null)) {
              return;
            }
            focusHeld.current = false;
            if (columnsRef.current?.matches(":hover")) return;
            release();
          }}
        >
          {checks.map((check, i) => {
            const isActive = i === index;

            return (
              <button
                key={check.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => select(i)}
                className={cn(
                  "-ml-px flex w-full items-center justify-between gap-3 border-l-2 py-3.5 pr-3 pl-5 transition-colors duration-[420ms] ease-out text-left max-600:pl-4",
                  isActive
                    ? "border-l-[#007EFF]"
                    : "border-l-transparent hover:border-l-[#B2B2B2]",
                )}
              >
                <span
                  className={cn(
                    "type-hl-card-title block transition-colors duration-[420ms] ease-out",
                    isActive ? "text-ink" : "text-[#606060]",
                  )}
                >
                  {check.label}
                </span>

                <span
                  className={cn(
                    "size-1.5 shrink-0 rounded-full transition-colors duration-[420ms] ease-out",
                    isActive ? "bg-[#007EFF]" : "bg-transparent",
                  )}
                  aria-hidden
                />
              </button>
            );
          })}
        </div>

        {/* The panel. */}
        <div
          className="ra-card min-w-0 p-7 max-900:p-6 max-600:p-4"
          onPointerEnter={pause}
          onPointerLeave={(e) => resumeIfOutside(e.relatedTarget)}
        >
          <div className="grid">
            {checks.map((check, i) => (
              <div
                key={check.id}
                role="tabpanel"
                aria-hidden={i !== index}
                className={cn(
                  "col-start-1 row-start-1 rounded-[8px] border border-[#E3E3E3] bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)] transition-all duration-[420ms] ease-out motion-reduce:transition-none max-600:p-5",
                  i === index
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-1 opacity-0",
                )}
              >
                {check.groups ? (
                  <div className="grid grid-cols-2 gap-x-8 gap-y-7 max-720:grid-cols-1">
                    {check.groups.map((group) => (
                      <div key={group.label} className="min-w-0">
                        <ColumnLabel>{group.label}</ColumnLabel>
                        <CheckTiles chips={group.chips} alt={group.alt} />
                      </div>
                    ))}
                  </div>
                ) : null}

                {check.chips ? <CheckTiles chips={check.chips} /> : null}

                {check.note ? (
                  <p className="type-hl-card-body mt-5 max-w-[62ch]">
                    {check.note}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function ColumnLabel({ children }: { children: string }) {
  return (
    <h4
      className={cn(
        MONO,
        "ra-mono mb-3.5 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#878787]",
      )}
    >
      {children}
    </h4>
  );
}

/** Each check as a row the product runs, not a tag. */
function CheckTiles({ chips, alt }: { chips: string[]; alt?: boolean }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {chips.map((chip) => (
        <li
          key={chip}
          className={cn(
            "flex items-center gap-3 rounded-[8px] border px-3.5 py-3",
            alt ? "border-[#E3E3E3] bg-[#F5F5F5]" : "border-[#E3E3E3] bg-white",
          )}
        >
          <span
            className="flex size-6 shrink-0 items-center justify-center rounded-[7px] border border-[#E3E3E3] bg-white text-[#007EFF]"
            aria-hidden
          >
            <Tick className="size-3" />
          </span>
          <span className="type-hl-inbox-title min-w-0 text-ink">
            {chip}
          </span>
        </li>
      ))}
    </ul>
  );
}
