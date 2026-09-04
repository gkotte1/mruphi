import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { MONO } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * The capture interface this page's visuals are built from.
 *
 * The workflow the page describes is capture → understand → structure. These
 * pieces render that as one continuous surface: a spine runs down the left of
 * the body linking the three moments, so the transformation is legible without
 * reading a word of the copy.
 *
 * Nothing here carries text of its own. Every string is passed in by the
 * section that already displayed it.
 */

/* ── Stage spine ──────────────────────────────────────────── */



/* ── Capture ──────────────────────────────────────────────── */

const WAVE = [
  9, 17, 11, 24, 14, 30, 18, 26, 12, 21, 33, 16, 23, 10, 28, 15, 22, 13, 31,
  19, 25, 11, 20, 14,
];

/**
 * Audio being captured: bars mirrored around a baseline, the way a recorder
 * draws them, on its own recessed surface.
 */
export function CaptureWave({
  className,
  quiet,
}: {
  className?: string;
  /** Shorter, and still. Used where the visual should read as product state
      rather than perform - the hero, where it was the loudest thing on the
      page at 74px with twenty-four independently animating bars. */
  quiet?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center gap-[3px] overflow-hidden rounded-tile border border-grey-mid bg-grey-bg px-3.5",
        quiet ? "h-10 max-600:h-9" : "h-[74px] max-600:h-[62px]",
        className,
      )}
      aria-hidden
    >
      <span className="absolute inset-x-3.5 top-1/2 h-px bg-grey-mid" />

      {WAVE.map((height, i) => (
        <span
          key={i}
          className={cn(
            "relative w-[3px] flex-1 rounded-full",
            i > WAVE.length - 7 ? "bg-brand-pale" : "bg-brand",
          )}
          style={{
            height: `${height * 1.7}%`,
            ...(quiet
              ? {}
              : {
                  animation: `mp-wave ${1 + (i % 5) * 0.18}s ease-in-out ${i * 0.05}s infinite`,
                }),
          }}
        />
      ))}
    </div>
  );
}

/* ── Extracted fields ─────────────────────────────────────── */

/**
 * What the model heard, written out as chart lines. Each arrives in turn and
 * settles with a tick, so the panel reads as fields being filled rather than a
 * paragraph of grey text.
 */
export function FieldRows({
  lines,
  quiet,
}: {
  lines: readonly string[];
  /** Tighter, and already settled - no staggered arrival, no blinking caret. */
  quiet?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-tile border border-grey-mid">
      {lines.map((line, i) => (
        <div
          key={line}
          className={cn(
            "flex items-start gap-2.5 px-3.5",
            quiet ? "py-2" : "py-2.5 opacity-0",
            i === 0 ? "" : "border-t border-grey-mid",
            i % 2 ? "bg-grey-bg" : "bg-white",
          )}
          style={
            quiet
              ? undefined
              : { animation: `mp-fade-up .45s ease forwards ${0.2 + i * 0.18}s` }
          }
        >
          <span className="mt-[1px] flex size-[15px] shrink-0 items-center justify-center rounded-full bg-brand text-white">
            <Icon name="check" width={9} height={9} />
          </span>

          <span className="min-w-0 text-[12.5px] leading-[1.45] text-grey-500">
            {line}
            {!quiet && i === lines.length - 1 ? (
              <span
                className="ml-0.5 inline-block h-3 w-0.5 bg-brand align-middle"
                style={{ animation: "mp-caret 1s step-end infinite" }}
                aria-hidden
              />
            ) : null}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Document outputs ─────────────────────────────────────── */

/**
 * The note types one encounter produces, as document tiles rather than plain
 * boxes - a page glyph, the name, and a completion tick.
 */
export function DocTiles({
  items,
  columns = 3,
  className,
  quiet,
}: {
  items: readonly string[];
  columns?: 2 | 3;
  className?: string;
  /** Tighter, and already settled - no staggered arrival. */
  quiet?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid gap-2",
        columns === 2 ? "grid-cols-2" : "grid-cols-3",
        className,
      )}
    >
      {items.map((item, i) => (
        <div
          key={item}
          className={cn(
            "flex items-center gap-2 rounded-[10px] border border-grey-mid bg-white px-2.5",
            quiet ? "py-1.5" : "py-2 opacity-0",
          )}
          style={
            quiet
              ? undefined
              : { animation: `mp-fade-up .4s ease forwards ${0.9 + i * 0.07}s` }
          }
        >
          <span className="flex size-[22px] shrink-0 items-center justify-center rounded-[7px] border border-brand-pale bg-brand-tint text-brand-dark">
            <Icon name="doc" width={12} height={12} />
          </span>

          <span className="min-w-0 flex-1 truncate text-[11.5px] font-bold leading-none text-ink">
            {item}
          </span>

          <Icon
            name="check"
            width={11}
            height={11}
            className="shrink-0 text-brand"
          />
        </div>
      ))}
    </div>
  );
}

/* ── Context strip ────────────────────────────────────────── */

/** A single line of context above the stages - where the record came from. */
export function ContextRow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-grey-mid bg-grey-bg px-5 py-2.5 max-600:px-4">
      <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full border border-brand-pale bg-white text-brand">
        <Icon name="server" width={10} height={10} />
      </span>
      <span
        className={cn(MONO, "min-w-0 truncate text-[11px] text-grey-500")}
      >
        {children}
      </span>
    </div>
  );
}
