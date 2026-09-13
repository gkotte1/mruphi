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
                    "flex w-full items-center gap-3 rounded-[8px] border px-4 py-3.5 text-left transition-all duration-[420ms] ease-out motion-reduce:transition-none",
                    isActive
                      ? "border-[#007EFF] bg-[#F5F5F5] "
                      : "border-[#E3E3E3] bg-white hover:border-[#007EFF]",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-[7px] border transition-colors duration-[420ms] ease-out",
                      isActive
                        ? "border-[#E3E3E3] bg-white text-[#007EFF]"
                        : "border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]",
                    )}
                    aria-hidden
                  >
                    <Tick className="size-3" />
                  </span>

                  <span className="type-hl-card-title min-w-0 text-ink transition-colors duration-[420ms] ease-out">
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
                i === index ? "bg-[#007EFF]" : "bg-[#E3E3E3]",
              )}
            />
          ))}
        </div>

        <p className="mt-[18px] max-w-[64ch] text-[13px] leading-[1.6] text-[#878787]">
          {note}
        </p>
      </div>
    </Reveal>
  );
}
