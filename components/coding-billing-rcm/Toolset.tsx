"use client";

import { useState } from "react";
import Reveal from "@/components/module-page/Reveal";
import { StatusBadge } from "@/components/module-page/interactive";
import { MONO, Tick } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * What runs on every client's charts.
 *
 * The three offerings were a pill strip over an anonymous block, which gave the
 * report counts no weight and the report names no order. The count is now the
 * figure it is, set beside the sentence it came from, and the reports read as a
 * ruled index rather than a bag of tags.
 *
 * Selection is manual — this is a specification to read, not a demonstration to
 * watch, so nothing here rotates on its own. Every panel stays in the DOM.
 */

export type Tool = {
  id: string;
  label: string;
  badge: { tone: "live" | "soon"; text: string };
  /** The figure that opens the sentence, set apart from the rest of it. */
  count?: string;
  text: string;
  reports?: string[];
};

export default function Toolset({ tools }: { tools: Tool[] }) {
  const [active, setActive] = useState(tools[0]?.id);

  return (
    <Reveal>
      <div>
        {/* One segmented control, centred, so the three offerings read as one
            set. Colours are the ones this control already had — the selected
            tab on ink, the others grey; nothing here is a call to action. */}
        <div className="flex justify-center">
          <div
            role="tablist"
            className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-grey-mid bg-grey-soft p-1 max-720:w-full"
          >
            {tools.map((tool) => (
              <button
                key={tool.id}
                type="button"
                role="tab"
                aria-selected={tool.id === active}
                onClick={() => setActive(tool.id)}
                className={cn(
                  "rounded-full px-[18px] py-2.5 text-[13.5px] font-semibold whitespace-nowrap transition-colors duration-200 max-720:flex-1",
                  tool.id === active
                    ? "bg-ink text-white"
                    : "text-grey-500 hover:text-ink",
                )}
              >
                {tool.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid">
          {tools.map((tool) => (
            <div
              key={tool.id}
              role="tabpanel"
              aria-hidden={tool.id !== active}
              className={cn(
                "col-start-1 row-start-1 transition-all duration-[420ms] ease-out motion-reduce:transition-none",
                tool.id === active
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-1 opacity-0",
              )}
            >
              <div className="overflow-hidden rounded-panel border border-grey-mid bg-white shadow-[0_16px_40px_rgba(15,29,84,.06)]">
                <div className="flex items-start gap-6 border-b border-grey-mid px-8 py-7 max-600:flex-col max-600:gap-4 max-600:px-6">
                  {tool.count ? (
                    <span className="text-[44px] font-bold leading-none tracking-[-0.03em] text-brand">
                      {tool.count}
                    </span>
                  ) : null}

                  <span className="min-w-0 flex-1">
                    <StatusBadge tone={tool.badge.tone}>{tool.badge.text}</StatusBadge>
                    <span className="mt-3 block max-w-[52ch] text-[15px] leading-[1.6] text-grey-500">
                      {tool.text}
                    </span>
                  </span>
                </div>

                {tool.reports ? (
                  <ul className="grid grid-cols-3 gap-px bg-grey-mid max-900:grid-cols-2 max-600:grid-cols-1">
                    {tool.reports.map((report, i) => (
                      <li
                        key={report}
                        className="flex items-center gap-3 bg-white px-6 py-[18px] max-600:px-5"
                      >
                        <span
                          className={cn(
                            MONO,
                            "w-5 shrink-0 text-[10.5px] font-semibold text-grey-bdr",
                          )}
                          aria-hidden
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <Tick className="size-3.5 shrink-0 text-brand" />
                        <span className="min-w-0 text-[13.5px] font-semibold tracking-[-0.01em] text-ink">
                          {report}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
