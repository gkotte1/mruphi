"use client";

import { useState, type ReactNode } from "react";
import Reveal from "@/components/module-page/Reveal";
import { MONO } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * The page's three controls.
 *
 * Each keeps the interaction the section already had - pick a care setting,
 * open a layer, choose an integration route - but presented in this page's own
 * idiom: an underlined tab bar, a platform cross-section, and an option row
 * that visibly connects to the detail it explains.
 *
 * Every panel stays in the DOM. Every string comes from the page.
 */

/* ── Feature explorer: an underlined tab bar ─────────────────── */

export function Explorer({
  tabs,
}: {
  tabs: { id: string; label: string; panel: ReactNode }[];
}) {
  const [active, setActive] = useState(tabs[0]?.id);

  return (
    <Reveal>
      <div>
        <div
          role="tablist"
          className="flex flex-wrap gap-x-8 gap-y-1 border-b border-[#E3E3E3] max-720:gap-x-5"
        >
          {tabs.map((tab) => {
            const selected = tab.id === active;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "-mb-px border-b-2 pt-1 pb-3.5 text-[14px] font-semibold whitespace-nowrap transition-colors duration-200",
                  selected
                    ? "border-b-[#007EFF] text-ink"
                    : "border-b-transparent text-[#606060] hover:text-ink",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              role="tabpanel"
              aria-hidden={tab.id !== active}
              className={cn(
                "col-start-1 row-start-1 transition-all duration-[320ms] ease-out motion-reduce:transition-none",
                tab.id === active
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-1 opacity-0",
              )}
            >
              {tab.panel}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ── Platform infrastructure: a cross-section of layers ──────── */

export function LayerStack({
  layers,
}: {
  layers: { title: string; sub: string; body: ReactNode }[];
}) {
  const [open, setOpen] = useState(0);

  return (
    <Reveal>
      <div className="overflow-hidden rounded-[10px] border border-[#E3E3E3] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)]">
        {layers.map((layer, i) => {
          const isOpen = open === i;
          const last = i === layers.length - 1;

          return (
            <div
              key={layer.title}
              className={cn(last ? "" : "border-b border-[#E3E3E3]")}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className={cn(
                  "grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 px-7 py-5 text-left transition-colors duration-200 max-600:gap-4 max-600:px-5",
                  isOpen ? "bg-[#F5F5F5]" : "hover:bg-[#F5F5F5]",
                )}
              >
                {/* Number column stretches with the row; the badge is grid-centered
                    so 01–04 sit in the vertical middle instead of hugging the top. */}
                <span className="relative grid w-8 shrink-0 place-items-center self-stretch">
                  <span
                    className={cn(
                      MONO,
                      "relative z-10 col-start-1 row-start-1 flex size-8 items-center justify-center rounded-[9px] border text-[10.5px] font-bold transition-colors duration-200",
                      isOpen
                        ? "border-[#007EFF] bg-[#007EFF] text-white"
                        : "border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {last ? null : (
                    <span
                      className="pointer-events-none absolute top-[calc(50%+1rem)] -bottom-5 left-1/2 z-0 w-px -translate-x-1/2 bg-[#E3E3E3]"
                      aria-hidden
                    />
                  )}
                </span>

                <span className="min-w-0">
                  <span className="block text-[16.5px] font-bold leading-snug tracking-[-0.015em] text-ink">
                    {layer.title}
                  </span>
                  <span
                    className={cn(MONO, "mt-1 block text-[11.5px] text-[#878787]")}
                  >
                    {layer.sub}
                  </span>
                </span>

                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200",
                    isOpen
                      ? "rotate-180 border-[#007EFF] bg-[#007EFF] text-white"
                      : "border-[#E3E3E3] bg-white text-[#606060]",
                  )}
                  aria-hidden
                >
                  <svg viewBox="0 0 24 24" fill="none" className="size-3">
                    <path
                      d="M12 4v14M6 12l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              {/* max-height rather than display, so the layer slides open. */}
              <div
                className="overflow-hidden transition-[max-height] duration-[280ms] ease-[ease]"
                style={{ maxHeight: isOpen ? 520 : 0 }}
              >
                <div className="px-7 py-8 pl-[76px] max-600:px-5 max-600:py-7 max-600:pl-5">
                  {layer.body}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}

/* ── Integration options, connected to what they explain ─────── */

export function IntegrationOptions({
  options,
  details,
}: {
  options: { id: string; title: string; body: string }[];
  details: { id: string; body: ReactNode }[];
}) {
  const [active, setActive] = useState(options[0]?.id);

  return (
    <Reveal>
      <div>
        <div className="grid grid-cols-3 gap-4 max-900:grid-cols-1">
          {options.map((option) => {
            const selected = option.id === active;

            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(option.id)}
                className={cn(
                  "relative rounded-[8px] border px-6 py-6 text-left transition-colors duration-200",
                  selected
                    ? "border-[#007EFF] bg-[#F5F5F5]"
                    : "border-[#E3E3E3] bg-white hover:border-[#007EFF]",
                )}
              >
                <span
                  className={cn(
                    "mb-4 flex size-7 items-center justify-center rounded-full border text-[10.5px] font-bold transition-colors duration-200",
                    selected
                      ? "border-[#007EFF] bg-[#007EFF] text-white"
                      : "border-[#E3E3E3] bg-white text-[#606060]",
                  )}
                  aria-hidden
                >
                  <span className={MONO}>{selected ? "●" : "○"}</span>
                </span>

                <span className="block text-[16px] font-bold leading-snug tracking-[-0.015em] text-ink">
                  {option.title}
                </span>
                <span className="mt-2 block text-[13.5px] leading-[1.6] text-[#606060]">
                  {option.body}
                </span>

                {/* The notch that ties the choice to the detail below it. */}
                {selected ? (
                  <span
                    className="absolute -bottom-[9px] left-1/2 size-4 -translate-x-1/2 rotate-45 border-r border-b border-[#007EFF] bg-[#F5F5F5] max-900:hidden"
                    aria-hidden
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="mt-7 grid">
          {details.map((detail) => (
            <div
              key={detail.id}
              aria-hidden={detail.id !== active}
              className={cn(
                "col-start-1 row-start-1 transition-all duration-[320ms] ease-out motion-reduce:transition-none",
                detail.id === active
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-1 opacity-0",
              )}
            >
              {detail.body}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
