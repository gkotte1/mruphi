"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { MONO } from "@/components/module-page/ui";

/**
 * The three interactive controls the Who We Serve pages use, each traced from
 * the source pages' own script and CSS: a pill role selector, a two-way brand
 * toggle, and an accordion. Inactive panels stay in the DOM and are hidden,
 * exactly as the source does with `display:none` / `max-height:0`.
 */

/* ── Pill selector (role panels) ────────────────────────── */

export function PillSelect({
  options,
}: {
  options: { id: string; label: string; panel: ReactNode }[];
}) {
  const [active, setActive] = useState(options[0]?.id);

  return (
    <div>
      <div className="inline-flex flex-wrap gap-2" role="tablist">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={option.id === active}
            onClick={() => setActive(option.id)}
            className={cn(
              "rounded-full border px-4 py-[9px] text-[13px] font-semibold transition-colors duration-200",
              option.id === active
                ? "border-brand bg-brand text-white"
                : "border-grey-mid bg-white text-grey-500 hover:border-brand hover:text-brand",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {options.map((option) => (
          <div key={option.id} role="tabpanel" hidden={option.id !== active}>
            {option.panel}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Brand toggle (white-label demo) ────────────────────── */

export function BrandToggle({
  brands,
  panels,
}: {
  brands: { id: string; label: string }[];
  /** One pre-rendered panel per brand - keyed by id. */
  panels: { id: string; body: ReactNode }[];
}) {
  const [brand, setBrand] = useState(brands[0]?.id);

  return (
    <div>
      <div className="inline-flex gap-1 rounded-full border border-grey-mid bg-grey-soft p-1">
        {brands.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={option.id === brand}
            onClick={() => setBrand(option.id)}
            className={cn(
              "rounded-full px-5 py-[9px] text-[13px] font-semibold transition-colors duration-150",
              option.id === brand ? "bg-ink text-white" : "text-grey-500",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="mt-[22px] max-w-[520px]">
        {panels.map((panel) => (
          <div key={panel.id} hidden={panel.id !== brand}>
            {panel.body}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Accordion ──────────────────────────────────────────── */

export function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: { title: string; sub?: string; body: ReactNode }[];
  /** Which item starts open; -1 opens none. The source opens the first. */
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      {items.map((item, i) => (
        <div
          key={item.title}
          className="mb-3 overflow-hidden rounded-tile border border-grey-mid bg-white"
        >
          <button
            type="button"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? -1 : i)}
            className="flex w-full items-center justify-between gap-4 px-[22px] py-[18px] text-left"
          >
            <span>
              <span className="block text-[15px] font-bold text-ink">
                {item.title}
              </span>
              {item.sub ? (
                <span className="mt-[3px] block text-[12.5px] font-normal text-ink-muted">
                  {item.sub}
                </span>
              ) : null}
            </span>

            <svg
              viewBox="0 0 24 24"
              fill="none"
              className={cn(
                "size-[11px] shrink-0 text-ink-muted transition-transform duration-200",
                open === i ? "rotate-180" : "",
              )}
              aria-hidden
            >
              <path
                d="M12 4v14M6 12l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* max-height rather than display, so it slides like the source. */}
          <div
            className="overflow-hidden transition-[max-height] duration-[280ms] ease-[ease]"
            style={{ maxHeight: open === i ? 600 : 0 }}
          >
            <div className="px-[22px] pb-[22px]">{item.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Card selector (integration options) ────────────────── */

export function CardSelect({
  cards,
  details,
}: {
  cards: { id: string; title: string; body: string }[];
  details: { id: string; body: ReactNode }[];
}) {
  const [active, setActive] = useState(cards[0]?.id);

  return (
    <div>
      <div className="grid grid-cols-3 gap-5 max-1080:grid-cols-2 max-720:grid-cols-1">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            aria-pressed={card.id === active}
            onClick={() => setActive(card.id)}
            className={cn(
              "cursor-pointer rounded-tile border px-[22px] py-6 text-left transition-all duration-200",
              card.id === active
                ? "border-brand bg-grey-bg shadow-[0_14px_30px_rgba(0,126,255,.14)]"
                : "border-grey-mid hover:-translate-y-[3px] hover:shadow-[0_16px_32px_rgba(15,29,84,.08)]",
            )}
          >
            <span
              className={cn(
                "mb-3.5 flex size-[38px] items-center justify-center rounded-[10px] border border-grey-mid",
                card.id === active ? "bg-brand text-white" : "bg-grey-bg text-brand",
              )}
            >
              <svg viewBox="0 0 24 24" fill="none" className="size-[18px]" aria-hidden>
                <path
                  d="m12 3 9 5-9 5-9-5 9-5Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="m3 13 9 5 9-5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="mb-1.5 block text-[15px] font-bold text-ink">
              {card.title}
            </span>
            <span className="block text-[13px] leading-[1.5] text-grey-500">
              {card.body}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-7">
        {details.map((detail) => (
          <div key={detail.id} hidden={detail.id !== active}>
            {detail.body}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Status badge ───────────────────────────────────────── */

export function StatusBadge({
  tone,
  children,
}: {
  tone: "live" | "soon";
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        MONO,
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10.5px] uppercase tracking-[0.06em]",
        tone === "live"
          ? "border border-brand-pale bg-brand-ghost text-brand-deep"
          : "border border-grey-mid bg-grey-soft text-grey-500",
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          tone === "live" ? "bg-brand" : "bg-grey-bdr",
        )}
        aria-hidden
      />
      {children}
    </span>
  );
}
