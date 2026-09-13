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
  live,
}: {
  className?: string;
  /** Shorter, and still. Used where the visual should read as product state
      rather than perform - the hero, where it was the loudest thing on the
      page at 74px with twenty-four independently animating bars. */
  quiet?: boolean;
  /** Keep the bars moving at the shorter height. The hero pairs this with
      `quiet` so the waveform stays compact but reads as actively listening. */
  live?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center gap-[3px] overflow-hidden rounded-[8px] border border-[#E3E3E3] bg-[#F5F5F5] px-3.5",
        quiet ? "h-10 max-600:h-9" : "h-[74px] max-600:h-[62px]",
        className,
      )}
      aria-hidden
    >
      <span className="absolute inset-x-3.5 top-1/2 h-px bg-[#E3E3E3]" />

      {WAVE.map((height, i) => (
        <span
          key={i}
          className={cn(
            "relative w-[3px] flex-1 rounded-full",
            i > WAVE.length - 7 ? "bg-[#A3D1FF]" : "bg-[#007EFF]",
          )}
          style={{
            height: `${height * 1.7}%`,
            ...(quiet && !live
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
  cycle,
}: {
  lines: readonly string[];
  /** Tighter, and already settled - no staggered arrival, no blinking caret. */
  quiet?: boolean;
  /**
   * Offset into the hero's shared 12s cycle, in seconds, at which the first
   * row's tick lights; each row follows 0.3s behind the one above it. Given a
   * value, the ticks fill in one by one and stay lit for the rest of the cycle.
   * Left undefined, they are simply always on.
   */
  cycle?: number;
}) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-[#E3E3E3]">
      {lines.map((line, i) => (
        <div
          key={line}
          className={cn(
            "flex items-start gap-2.5 px-3.5",
            quiet ? "py-2" : "py-2.5 opacity-0",
            i === 0 ? "" : "border-t border-[#E3E3E3]",
            i % 2 ? "bg-[#F5F5F5]" : "bg-white",
          )}
          style={
            quiet
              ? undefined
              : { animation: `mp-fade-up .45s ease forwards ${0.2 + i * 0.18}s` }
          }
        >
          <span
            className="mt-[1px] flex size-[15px] shrink-0 items-center justify-center rounded-full bg-[#007EFF] text-white"
            style={
              cycle === undefined
                ? undefined
                : {
                    animation: `mp-scribe-mark 12s ease-in-out ${cycle + i * 0.3}s infinite`,
                  }
            }
          >
            <Icon name="check" width={9} height={9} />
          </span>

          <span className="min-w-0 text-[12.5px] leading-[1.45] text-[#606060]">
            {line}
            {!quiet && i === lines.length - 1 ? (
              <span
                className="ml-0.5 inline-block h-3 w-0.5 bg-[#007EFF] align-middle"
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
  cycle,
}: {
  items: readonly string[];
  columns?: 2 | 3;
  className?: string;
  /** Tighter, and already settled - no staggered arrival. */
  quiet?: boolean;
  /**
   * Offset into the hero's shared 12s cycle, in seconds, at which the first
   * tile ticks; each tile follows 0.25s behind. Given a value, the note types
   * check off one by one and stay checked for the rest of the cycle.
   */
  cycle?: number;
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
            "flex items-center gap-2 rounded-[8px] border border-[#E3E3E3] bg-white px-2.5",
            quiet ? "py-1.5" : "py-2 opacity-0",
          )}
          style={
            quiet
              ? undefined
              : { animation: `mp-fade-up .4s ease forwards ${0.9 + i * 0.07}s` }
          }
        >
          <span className="flex size-[22px] shrink-0 items-center justify-center rounded-[8px] border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]">
            <Icon name="doc" width={12} height={12} />
          </span>

          <span className="type-hl-inbox-title min-w-0 flex-1 truncate text-ink">
            {item}
          </span>

          <Icon
            name="check"
            width={11}
            height={11}
            className="shrink-0 text-[#007EFF]"
            style={
              cycle === undefined
                ? undefined
                : {
                    animation: `mp-scribe-mark 12s ease-in-out ${cycle + i * 0.25}s infinite`,
                  }
            }
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
    <div className="flex items-center gap-2.5 border-b border-[#E3E3E3] bg-[#F5F5F5] px-5 py-2.5 max-600:px-4">
      <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full border border-[#E3E3E3] bg-white text-[#007EFF]">
        <Icon name="server" width={10} height={10} />
      </span>
      <span
        className={cn(MONO, "aa-mono min-w-0 truncate text-[11px] text-[#606060]")}
      >
        {children}
      </span>
    </div>
  );
}
