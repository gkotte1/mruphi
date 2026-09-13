import type { ReactNode } from "react";
import { MONO, Tick } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * Section types that appear on only one or two of the module pages, kept out
 * of the shared set so the common file stays readable. All traced from the
 * source stylesheet.
 */

/* ── Device stack (Patient Engagement hero) ─────────────── */

export function DeviceStack({
  app,
  connectorLabel,
  sms,
}: {
  app: {
    head: string;
    initials: string;
    name: string;
    sub: string;
    message: string;
  };
  connectorLabel: string;
  sms: { head: string; incoming: string; outgoing: string };
}) {
  return (
    <div className="flex flex-col gap-3.5">
      <div className="overflow-hidden rounded-2xl border border-grey-mid bg-white shadow-[0_20px_48px_rgba(15,29,84,.08)]">
        <div
          className={cn(
            MONO,
            "flex items-center gap-2 bg-brand px-4 py-3 text-[10.5px] uppercase tracking-[0.05em] text-white/90",
          )}
        >
          <Tick className="size-3.5" />
          {app.head}
        </div>

        <div className="px-[18px] pt-[18px] pb-5">
          <div className="mb-3.5 flex items-center gap-2.5">
            <div className="flex size-[34px] shrink-0 items-center justify-center rounded-full bg-brand-mid text-[12px] font-bold text-white">
              {app.initials}
            </div>
            <div className="min-w-0">
              <div className="type-hl-inbox-title text-ink">
                {app.name}
              </div>
              <div className="text-[11.5px] text-ink-muted">{app.sub}</div>
            </div>
          </div>

          <div className="rounded-card rounded-bl-[3px] border border-grey-mid bg-grey-bg px-[13px] py-2.5 text-[12.5px] leading-[1.45] text-ink">
            {app.message}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2.5 py-0.5">
        <span className="relative h-5 w-0.5 overflow-hidden bg-grey-mid" aria-hidden>
          <span
            className="absolute -left-0.5 size-1.5 rounded-full bg-brand"
            style={{ animation: "mp-flow-pulse-v 2.2s ease-in-out infinite" }}
          />
        </span>
        <span className={cn(MONO, "text-[10.5px] text-ink-muted")}>
          {connectorLabel}
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-grey-mid bg-white shadow-[0_20px_48px_rgba(15,29,84,.08)]">
        <div
          className={cn(
            MONO,
            "border-b border-grey-mid bg-grey-soft px-4 py-3 text-[10.5px] uppercase tracking-[0.05em] text-grey-500",
          )}
        >
          {sms.head}
        </div>

        <div className="p-[18px]">
          <div className="mb-[9px] max-w-[78%] rounded-[15px] rounded-bl-[4px] bg-grey-mid px-[13px] py-[9px] text-[12.5px] leading-[1.4] text-ink">
            {sms.incoming}
          </div>
          <div className="ml-auto max-w-[78%] rounded-[15px] rounded-br-[4px] bg-brand px-[13px] py-[9px] text-[12.5px] leading-[1.4] text-white">
            {sms.outgoing}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Marquee ticker ─────────────────────────────────────── */

export function TechTicker({ items }: { items: string[] }) {
  /* The source repeats the list twice and translates the track -50%. */
  const doubled = [...items, ...items];

  return (
    /* The hairline sits at the hero boundary, as it does on every other page;
       the ticker band itself keeps its own spacing below it. */
    <section className="border-t border-grey-mid pt-0 pb-0">
      <div
        className="mt-9 overflow-hidden bg-brand-ghost py-[22px]"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div
          className="flex w-max items-center motion-reduce:animate-none"
          style={{ animation: "mp-ticker 26s linear infinite" }}
        >
          {doubled.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="px-[26px] text-[15px] font-semibold whitespace-nowrap text-grey-500"
            >
              {item} <span className="font-normal text-grey-mid">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Ticked list ────────────────────────────────────────── */

export function AudienceList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex max-w-[68ch] flex-col gap-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 text-[14.5px] leading-[1.5] text-grey-500"
        >
          <Tick className="mt-0.5 size-4 shrink-0 text-brand" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── Transform strip ────────────────────────────────────── */

export function TransformStrip({
  rows,
}: {
  rows: { label: string; from: string; to: string }[];
}) {
  return (
    <div className="overflow-hidden rounded-panel border border-grey-mid bg-white">
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={cn(
            "grid grid-cols-[200px_1fr] items-center gap-5 border-b border-grey-mid px-6 py-[18px] last:border-b-0 max-640:grid-cols-1 max-640:gap-1.5",
            i % 2 === 0 ? "bg-grey-soft" : "",
          )}
        >
          <div
            className={cn(
              MONO,
              "text-[11px] uppercase tracking-[0.05em] text-ink-muted",
            )}
          >
            {row.label}
          </div>
          <div className="flex flex-wrap items-center gap-2.5 text-[14.5px] font-semibold text-ink">
            <span className="font-medium text-ink-muted line-through decoration-ink-muted">
              {row.from}
            </span>
            <span className="shrink-0 text-brand" aria-hidden>
              →
            </span>
            <span>{row.to}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Lede paragraph — Home type-hl-lead ─────────────────── */

export function Lede({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("type-hl-lead max-w-[68ch]", className)}>
      {children}
    </p>
  );
}

/* ── Notes and callouts ─────────────────────────────────── */

export function SoonCallout({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3.5 rounded-tile border border-brand-dark/[0.28] bg-brand-dark/[0.08] px-[18px] py-4">
      <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 size-5 shrink-0 text-brand-dark" aria-hidden>
        <path
          d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
      <p className="text-[13.5px] leading-[1.55] text-ink">{children}</p>
    </div>
  );
}

export function FetchNote({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 flex items-start gap-3 rounded-lg border border-grey-mid bg-white px-[18px] py-4">
      <svg viewBox="0 0 24 24" fill="none" className="mt-px size-[18px] shrink-0 text-brand" aria-hidden>
        <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <p className="text-[13.5px] leading-[1.5] text-grey-500">{children}</p>
    </div>
  );
}

/* ── Converge diagram (Referral → NOA hero) ─────────────── */

export function Converge({
  sources,
  outTitle,
  outBody,
}: {
  sources: string[];
  outTitle: string;
  outBody: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-panel border border-grey-mid bg-white px-7 py-8 shadow-[0_24px_56px_rgba(15,29,84,.09)] max-720:flex-col max-720:gap-4">
      <div className="flex flex-col gap-[9px]">
        {sources.map((source) => (
          <div
            key={source}
            className="rounded-lg border border-grey-mid bg-white px-3.5 py-2.5 text-[12.5px] font-semibold text-ink"
          >
            {source}
          </div>
        ))}
      </div>

      {[0, 1].map((column) => (
        <div
          key={column}
          className="flex w-[26px] shrink-0 flex-col justify-center text-grey-mid max-720:w-full max-720:flex-row max-720:justify-center"
          aria-hidden
        >
          {[0, 1, 2].map((arrow) => (
            <svg key={arrow} viewBox="0 0 24 24" fill="none" className="size-6 max-720:rotate-0">
              <path
                d="M12 4v14M6 12l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ))}
        </div>
      ))}

      <div className="rounded-card border border-grey-mid bg-grey-soft px-[18px] py-4 text-[12.5px] text-grey-500">
        <strong className="mb-1.5 block text-ink">{outTitle}</strong>
        {outBody}
      </div>
    </div>
  );
}

/* ── Claim track (AI-Driven RCM) ────────────────────────── */

export type ClaimNode = { label: string; state?: "pass" | "flag" };

export function ClaimTrack({
  nodes,
  minWidth,
}: {
  nodes: ClaimNode[];
  minWidth?: number;
}) {
  return (
    <div className="overflow-x-auto">
      <div
        className="flex items-center py-2 pb-1"
        style={minWidth ? { minWidth } : undefined}
      >
        {nodes.map((node, i) => (
          <div key={node.label} className="contents">
            {i > 0 ? (
              <span
                className="h-0.5 min-w-4 flex-1 bg-grey-mid"
                aria-hidden
              />
            ) : null}

            <div className="flex w-[118px] shrink-0 flex-col items-center gap-2 text-center">
              <span
                className={cn(
                  "size-3 rounded-full border-2 border-white",
                  node.state === "pass"
                    ? "bg-brand shadow-[0_0_0_2px_rgba(0,126,255,.3)]"
                    : node.state === "flag"
                      ? "bg-brand-dark shadow-[0_0_0_2px_rgba(0,106,214,.3)]"
                      : "bg-grey-mid shadow-[0_0_0_2px_#E3E3E3]",
                )}
                aria-hidden
              />
              <span className="text-[11.5px] font-semibold text-ink">
                {node.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Hero modules card (Agencies) ───────────────────────── */

export function HeroModulesCard({
  label,
  items,
}: {
  label: string;
  items: { name: string; soon?: boolean }[];
}) {
  return (
    <div className="rounded-panel border border-grey-mid bg-white p-7 shadow-[0_24px_56px_rgba(15,29,84,.09)]">
      <div
        className={cn(MONO, "mb-5 text-[10.5px] uppercase tracking-[0.06em] text-ink-muted")}
      >
        {label}
      </div>

      <div className="grid grid-cols-3 gap-3.5 max-720:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.name}
            className={cn(
              "flex flex-col items-center gap-[11px] rounded-card px-2 py-[18px] text-center transition-all duration-200 hover:-translate-y-[3px] hover:bg-white hover:shadow-[0_12px_24px_rgba(15,29,84,.1)]",
              item.soon
                ? "border border-dashed border-grey-mid bg-transparent hover:border-solid hover:border-brand"
                : "bg-grey-soft",
            )}
          >
            <span
              className={cn(
                "flex size-[42px] items-center justify-center rounded-full",
                item.soon
                  ? "border border-grey-mid bg-white text-ink-muted"
                  : "bg-brand shadow-[0_6px_16px_rgba(0,126,255,.25)]",
              )}
            >
              {item.soon ? (
                <svg viewBox="0 0 24 24" fill="none" className="size-[19px]" aria-hidden>
                  <path
                    d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <Tick className="size-[19px] text-white" />
              )}
            </span>

            <span className="text-[12px] font-semibold leading-[1.3] text-ink">
              {item.name}
              {item.soon ? (
                <em
                  className={cn(
                    MONO,
                    "mt-1 block text-[9px] uppercase not-italic tracking-[0.06em] text-brand-dark",
                  )}
                >
                  Soon
                </em>
              ) : null}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
