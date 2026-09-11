import type { ReactNode } from "react";
import Reveal from "@/components/module-page/Reveal";
import { MONO, Tick } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

export { Outcomes, StoryRule } from "@/components/inner-page/kit";
export { Timelines } from "@/components/inner-page/Timelines";

/**
 * The body of the AI-Driven RCM page.
 *
 * The comparison was two bullet cards and the automation list a strip of pills,
 * so neither showed the sequence or the scope it describes. Both now take the
 * composition their content asks for, and they live beside the page rather than
 * in the shared module kit, so the other module pages are untouched.
 *
 * Every string is the one the page already carried.
 */

/* ── What Murphi automates, as a capability sheet ────────────── */

export function AutomatedPanel({
  items,
  note,
}: {
  items: string[];
  note: ReactNode;
}) {
  return (
    <>
      <Reveal>
        <div className="overflow-hidden rounded-[10px] border border-[#E3E3E3] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)]">
          <div
            className={cn(
              MONO,
              "flex items-center justify-between gap-3 border-b border-[#E3E3E3] bg-[#F5F5F5] px-6 py-3 max-600:px-5",
            )}
          >
            <span className="text-[11px] uppercase tracking-[0.06em] text-[#878787]">
              {`${items.length} automated`}
            </span>
            <span className="relative flex size-1.5 shrink-0" aria-hidden>
              <span
                className="absolute inline-flex size-full rounded-full bg-[#007EFF]/60 motion-reduce:hidden"
                style={{ animation: "mp-glow 2.4s ease-in-out infinite" }}
              />
              <span className="relative inline-flex size-1.5 rounded-full bg-[#007EFF]" />
            </span>
          </div>

          {/* gap-px over a grey ground draws the hairlines, so the grid needs
              no nth-child maths as the column count changes. */}
          <ul className="grid grid-cols-3 gap-px bg-[#E3E3E3] max-900:grid-cols-2 max-600:grid-cols-1">
            {items.map((item, i) => (
              <li
                key={item}
                className="group flex items-center gap-3 bg-white px-6 py-[18px] transition-colors duration-300 hover:bg-[#F5F5F5] max-600:px-5"
              >
                <span
                  className="flex size-7 shrink-0 items-center justify-center rounded-[8px] border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF] transition-colors duration-300 group-hover:border-transparent group-hover:bg-[#007EFF] group-hover:text-[#F5F5F5]"
                  style={{
                    animation: `mp-fade-up .45s ease backwards ${0.05 + i * 0.05}s`,
                  }}
                  aria-hidden
                >
                  <Tick className="size-3.5" />
                </span>
                <span className="min-w-0 text-[14px] font-semibold tracking-[-0.01em] text-ink">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal>{note}</Reveal>
    </>
  );
}

