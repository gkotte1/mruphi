"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The white-label switch.
 *
 * The two options previously rendered as filled pills, which read as a pair of
 * actions rather than a choice of view. They are now one segmented control: a
 * single recessed track holding two equal halves, with the selected half raised
 * on #007EFF and the other left quiet. Nothing here carries a call-to-action's
 * weight - no arrow, no lift, no shadow.
 *
 * The head, the control and the panel share one centre line, so the section
 * reads down the middle. Both panels stay in the DOM and cross-fade, so the
 * height never jumps and neither panel's copy leaves the HTML.
 */

export default function BrandSwitch({
  kicker,
  heading,
  lede,
  options,
  panels,
}: {
  kicker: string;
  heading: string;
  lede: ReactNode;
  options: { id: string; label: string }[];
  panels: { id: string; body: ReactNode }[];
}) {
  const [active, setActive] = useState(options[0]?.id);

  return (
    <div className="flex flex-col items-center text-center">
      <p className="ip-eyebrow" style={{ marginBottom: 16 }}>
        {kicker}
      </p>

      <h2 className="ip-h2 ip-serif max-w-[640px]">{heading}</h2>

      <p className="type-hl-lead mt-5 max-w-[58ch]">
        {lede}
      </p>

      {/* One track, two equal halves - a control, not two buttons. */}
      <div
        role="tablist"
        className="mt-9 inline-grid grid-cols-2 gap-1 rounded-full border border-[#E3E3E3] bg-[#F5F5F5] p-1"
      >
        {options.map((option) => {
          const selected = option.id === active;

          return (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(option.id)}
              /* The selected half is distinguished by its ground, not by a
                 colour change on the label - this control keeps the black
                 treatment it has always had, and never turns blue. */
              className={cn(
                "rounded-full px-7 py-2.5 text-center text-[13.5px] font-semibold whitespace-nowrap transition-colors duration-[280ms] ease-out max-600:px-5",
                selected
                  ? "bg-ink text-white"
                  : "text-[#606060] hover:text-ink",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid w-full max-w-[520px] text-left">
        {panels.map((panel) => (
          <div
            key={panel.id}
            role="tabpanel"
            aria-hidden={panel.id !== active}
            className={cn(
              "col-start-1 row-start-1 transition-all duration-[280ms] ease-out motion-reduce:transition-none",
              panel.id === active
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-1 opacity-0",
            )}
          >
            {panel.body}
          </div>
        ))}
      </div>
    </div>
  );
}
