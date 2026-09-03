"use client";

import Reveal from "@/components/module-page/Reveal";
import { Tick } from "@/components/module-page/ui";
import { useAutoAdvance } from "@/lib/useAutoAdvance";
import { cn } from "@/lib/cn";

/**
 * What Murphi supports, walked through rather than listed.
 *
 * The items were a flat strip of pills, which gave a payment lifecycle no
 * order and no emphasis. They now sit in the sequence they actually happen in,
 * with one highlighted at a time on the same two-second clock as the mechanics
 * above, so the two sections read as one continuous demonstration.
 *
 * Pointing at the section holds it; picking an item restarts that item's
 * interval before the rotation carries on. Every string comes from the page.
 */
export default function Included({
  items,
  note,
}: {
  items: string[];
  note: string;
}) {
  const { index, select, hold, release } = useAutoAdvance(items.length);

  return (
    <Reveal>
      <div
        onMouseEnter={hold}
        onMouseLeave={release}
        onFocusCapture={hold}
        onBlurCapture={release}
      >
        <ul className="grid grid-cols-4 gap-3 max-1080:grid-cols-3 max-720:grid-cols-2 max-600:grid-cols-1">
          {items.map((item, i) => {
            const isActive = i === index;

            return (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => select(i)}
                  aria-current={isActive}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-tile border px-4 py-3.5 text-left transition-all duration-[420ms] ease-out motion-reduce:transition-none",
                    isActive
                      ? "border-brand bg-brand shadow-[0_12px_28px_-14px_rgba(0,106,214,.7)]"
                      : "border-grey-mid bg-white hover:border-brand-pale",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-[7px] border transition-colors duration-[420ms] ease-out",
                      isActive
                        ? "border-white/30 bg-white/15 text-white"
                        : "border-brand-pale bg-brand-tint text-brand",
                    )}
                    aria-hidden
                  >
                    <Tick className="size-3" />
                  </span>

                  <span
                    className={cn(
                      "min-w-0 text-[13.5px] font-semibold tracking-[-0.01em] transition-colors duration-[420ms] ease-out",
                      isActive ? "text-white" : "text-ink",
                    )}
                  >
                    {item}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Where the sequence has reached. */}
        <div className="mt-6 flex items-center gap-1.5" aria-hidden>
          {items.map((item, i) => (
            <span
              key={item}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors duration-[420ms] ease-out",
                i === index ? "bg-brand" : "bg-grey-mid",
              )}
            />
          ))}
        </div>

        <p className="mt-[18px] max-w-[64ch] text-[13px] leading-[1.6] text-ink-muted">
          {note}
        </p>
      </div>
    </Reveal>
  );
}
