"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "@/components/Logo";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";
import {
  VIEWS,
  VIEW_MS,
  type QueueRow,
  type Tile,
  type View,
} from "@/components/hero-showcase-views";

/**
 * The bottom-centre product showcase — the card that sits in front of the hero
 * stage and overlaps its lower edge.
 *
 * Two surfaces only: a solid blue frame carrying one white product window.
 * Inside the window a quiet rail, three tiles, a minimal chart and a short
 * queue. Everything shows state; nothing quantifies a claim.
 *
 * The window cycles through the four views in hero-showcase-views.ts every two
 * seconds — Workflows, Patients, Documentation, Revenue, and round again. The
 * markup is identical in every view, so only the values change and the card's
 * height never moves.
 */
export default function HeroShowcase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    /* Motion is a preference. With it reduced the card holds the first view. */
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % VIEWS.length),
      VIEW_MS,
    );
    return () => window.clearInterval(timer);
  }, []);

  const view = VIEWS[index];

  return (
    <div className="@container relative w-full">
      <div className="relative overflow-hidden rounded-[34px] bg-brand p-[26px] shadow-[0_54px_120px_-56px_rgba(15,29,84,0.72)] max-1024:rounded-hero max-1024:p-5 max-600:rounded-[22px] max-600:p-3">
        <div className="relative overflow-hidden rounded-[22px] bg-white shadow-[0_20px_44px_-26px_rgba(15,29,84,0.55)] max-600:rounded-tile">
          <Chrome view={view} />
          <div className="flex">
            <Rail activeId={view.id} />
            <Board view={view} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═════════════════════ product window ═════════════════════ */

/** The window header: the mark, where you are, and live state. */
function Chrome({ view }: { view: View }) {
  return (
    <div className="flex items-center gap-3 border-b border-grey-mid px-4 py-3 max-600:px-3 max-600:py-2.5">
      <LogoMark size={24} className="shrink-0" />

      <p className="text-[12.5px] font-extrabold leading-none tracking-[-0.015em] text-ink">
        Murphi AI
      </p>

      <span
        className="hidden h-3.5 w-px bg-grey-mid @min-[520px]:block"
        aria-hidden
      />

      <p
        key={view.id}
        className="mp-view type-micro hidden text-grey-dk/55 @min-[520px]:block"
      >
        {view.id}
      </p>

      <span className="ml-auto flex items-center gap-1.5 rounded-full border border-brand-border bg-brand-tint px-2.5 py-[5px] text-[9.5px] font-bold uppercase leading-none tracking-[0.08em] text-brand-dark">
        <span className="relative flex size-1.5">
          <span
            className="absolute inline-flex size-full rounded-full bg-brand/60"
            style={{ animation: "mp-glow 2.4s ease-in-out infinite" }}
          />
          <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
        </span>
        <span key={view.status} className="mp-view">
          {view.status}
        </span>
      </span>
    </div>
  );
}

/** A quiet tinted rail — orientation, not navigation. */
function Rail({ activeId }: { activeId: string }) {
  return (
    <div className="hidden w-[156px] shrink-0 border-r border-grey-mid bg-grey-bg p-3 @min-[600px]:block">
      <p className="type-micro px-2 pb-2 text-grey-dk/45">Agency</p>

      <div className="grid gap-1">
        {VIEWS.map((item) => {
          const active = item.id === activeId;

          return (
            <span
              key={item.id}
              className={cn(
                "flex items-center gap-2 rounded-[10px] px-2 py-[7px] text-[11px] font-bold leading-none transition-colors duration-300",
                active
                  ? "bg-white text-brand-dark shadow-[0_6px_16px_-10px_rgba(0,86,173,0.5)] ring-1 ring-brand-border"
                  : "text-grey-dk/70",
              )}
            >
              <Icon
                name={item.icon}
                width={13}
                height={13}
                className={cn(
                  "shrink-0 transition-colors duration-300",
                  active ? "text-brand" : "text-grey-bdr",
                )}
              />
              <span className="truncate">{item.id}</span>
            </span>
          );
        })}
      </div>

      <div className="mt-4 rounded-card border border-brand-border/70 bg-brand-tint px-2.5 py-2.5">
        <span className="flex items-center gap-1.5 text-[10px] font-bold leading-none text-brand-dark">
          <Icon name="server" width={12} height={12} />
          EHR connected
        </span>
        <ProgressBar className="mt-2" />
      </div>
    </div>
  );
}

/** The working surface. */
function Board({ view }: { view: View }) {
  return (
    <div className="min-w-0 flex-1 p-5 max-600:p-3">
      <div className="flex items-end justify-between gap-3">
        <div key={view.id} className="mp-view min-w-0">
          <p className="truncate text-[13px] font-extrabold leading-none tracking-[-0.015em] text-ink">
            {view.title}
          </p>
          <p className="type-micro mt-2 truncate text-grey-dk/50">
            {view.subtitle}
          </p>
        </div>

        <span className="shrink-0 rounded-full border border-grey-mid bg-grey-bg px-2.5 py-[5px] text-[9.5px] font-bold uppercase leading-none tracking-[0.06em] text-grey-dk/65">
          This week
        </span>
      </div>

      <Tiles key={`tiles-${view.id}`} tiles={view.tiles} />

      <div className="mt-3 grid grid-cols-[1.4fr_minmax(0,1fr)] gap-3 @max-[640px]:grid-cols-1">
        <ActivityChart key={`chart-${view.id}`} chart={view.chart} />
        <Queue key={`queue-${view.id}`} queue={view.queue} />
      </div>
    </div>
  );
}

/** The three stages, as state — never as figures. */
function Tiles({ tiles }: { tiles: readonly Tile[] }) {
  return (
    <div className="mp-view mt-4 grid grid-cols-3 gap-3 max-600:gap-2">
      {tiles.map((tile) => (
        <div
          key={tile.title}
          className={cn(
            "rounded-tile border p-3 max-600:p-2.5",
            tile.active
              ? "border-brand-border bg-brand-tint/70"
              : "border-grey-mid bg-white",
          )}
        >
          <span
            className={cn(
              "flex size-[26px] items-center justify-center rounded-[9px] border",
              tile.active
                ? "border-transparent bg-brand text-grey-bg"
                : "border-brand-border/70 bg-brand-tint text-brand-dark",
            )}
          >
            <Icon name={tile.icon} width={13} height={13} />
          </span>

          <p className="mt-2.5 truncate text-[11.5px] font-extrabold leading-none tracking-[-0.01em] text-ink">
            {tile.title}
          </p>
          <p className="mt-1.5 truncate text-[10px] font-semibold leading-none text-grey-dk/60">
            {tile.detail}
          </p>

          <ProgressBar className="mt-2.5" />
        </div>
      ))}
    </div>
  );
}

/** Shape only — no axis, no numbers, no claim. */
function ActivityChart({ chart }: { chart: View["chart"] }) {
  return (
    <div className="mp-view rounded-tile border border-grey-mid bg-grey-bg p-3.5 max-600:p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="truncate text-[11.5px] font-bold leading-none text-ink">
          {chart.title}
        </p>
        <span className="flex shrink-0 items-center gap-1.5 text-[9.5px] font-bold uppercase leading-none tracking-[0.06em] text-grey-dk/55">
          <span className="size-1.5 rounded-full bg-brand" aria-hidden />
          {chart.legend}
        </span>
      </div>

      <div className="relative mt-3.5 h-[86px] max-600:h-[68px]" aria-hidden>
        <div className="absolute inset-0 grid grid-rows-3">
          {[0, 1, 2].map((line) => (
            <span key={line} className="border-t border-brand-border/40" />
          ))}
        </div>

        <div className="relative flex h-full items-end gap-[6px]">
          {chart.heights.map((height, i) => (
            <span
              key={`bar-${i}`}
              className={cn(
                "flex-1 rounded-t-[4px] transition-[height] duration-500 ease-out",
                i === chart.heights.length - 2 ? "bg-brand" : "bg-brand/20",
              )}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      <div className="mt-2 flex gap-[6px]" aria-hidden>
        {chart.days.map((day, i) => (
          <span
            key={`label-${i}`}
            className="flex-1 text-center text-[9px] font-bold leading-none text-grey-dk/40"
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
}

/** What the platform is doing right now. */
function Queue({ queue }: { queue: View["queue"] }) {
  return (
    <div className="mp-view rounded-tile border border-grey-mid bg-white p-3.5 max-600:p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="truncate text-[11.5px] font-bold leading-none text-ink">
          {queue.title}
        </p>
        <span className="type-micro shrink-0 text-brand-dark">Live</span>
      </div>

      <div className="mt-3 grid gap-1.5">
        {queue.rows.map((row: QueueRow) => (
          <span
            key={row.label}
            className="flex items-center gap-2 rounded-[10px] border border-grey-mid bg-grey-bg px-2.5 py-[7px]"
          >
            <Icon
              name={row.icon}
              width={12}
              height={12}
              className={cn(
                "shrink-0 text-brand-dark",
                row.done ? "" : "animate-[spin_6s_linear_infinite]",
              )}
            />
            <span className="truncate text-[10.5px] font-semibold leading-none text-grey-dk">
              {row.label}
            </span>
            <span
              className={cn(
                "ml-auto flex shrink-0 items-center gap-1 text-[9.5px] font-bold uppercase leading-none tracking-[0.06em]",
                row.done ? "text-brand-deep" : "text-brand-dark",
              )}
            >
              {row.done ? <Icon name="check" width={10} height={10} /> : null}
              {row.state}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════ primitives ════════════════════════ */

/** An indeterminate bar — progress as motion, never as a figure. */
function ProgressBar({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative block h-[4px] w-full overflow-hidden rounded-full bg-grey-soft",
        className,
      )}
      aria-hidden
    >
      <span
        className="absolute inset-y-0 left-0 w-[45%] rounded-full bg-brand"
        style={{ animation: "mp-sweep 2.8s ease-in-out infinite" }}
      />
    </span>
  );
}
