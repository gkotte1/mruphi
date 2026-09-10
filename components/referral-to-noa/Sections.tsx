import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import {
  OutcomeIcon,
  type OutcomeIconName,
} from "@/components/module-page/sections";
/* Matches Revenue Assurance "The Same Chart, Two Timelines" visual + hover pause. */
export { Timelines } from "@/components/module-page/Timelines";
import { CONTAINER, MONO, Tick } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * The body of the Referral → NOA page.
 *
 * The comparison was two bullet cards and the checks a strip of pills, so
 * neither showed the sequence it describes. Both now take the composition their
 * content asks for, and they live beside the page rather than in the shared
 * module kit, so the other module pages are untouched.
 *
 * Every string is the one the page already carried.
 */

/* ── The checks, run together rather than down a checklist ───── */

export function ChecksPanel({
  checks,
  note,
}: {
  checks: string[];
  note: ReactNode;
}) {
  return (
    <>
      <Reveal>
        <div className="overflow-hidden rounded-panel border border-grey-mid bg-white shadow-[0_16px_40px_rgba(15,29,84,.06)]">
          {/* One pass, all of them at once - the point of the section. */}
          <div
            className={cn(
              MONO,
              "flex items-center justify-between gap-3 border-b border-grey-mid bg-grey-soft px-6 py-3 max-600:px-5",
            )}
          >
            <span className="text-[11px] uppercase tracking-[0.06em] text-ink-muted">
              {`${checks.length} checks`}
            </span>
            <span className="relative flex size-1.5 shrink-0" aria-hidden>
              <span
                className="absolute inline-flex size-full rounded-full bg-brand/60"
                style={{ animation: "mp-glow 2.4s ease-in-out infinite" }}
              />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
            </span>
          </div>

          {/* gap-px over a grey ground draws the hairlines, so the grid needs
              no nth-child maths as the column count changes. */}
          <ul className="grid grid-cols-3 gap-px bg-grey-mid max-900:grid-cols-2 max-600:grid-cols-1">
            {checks.map((check, i) => (
              <li
                key={check}
                className="flex items-center gap-3 bg-white px-6 py-[18px] max-600:px-5"
              >
                <span
                  className="flex size-7 shrink-0 items-center justify-center rounded-[8px] border border-brand-pale bg-brand-tint text-brand"
                  style={{
                    animation: `mp-fade-up .45s ease backwards ${0.06 + i * 0.06}s`,
                  }}
                  aria-hidden
                >
                  <Tick className="size-3.5" />
                </span>
                <span className="min-w-0 text-[14px] font-semibold tracking-[-0.01em] text-ink">
                  {check}
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

/* ── Outcomes ────────────────────────────────────────────────── */

export function Outcomes({
  heading,
  outcomes,
}: {
  heading: string;
  outcomes: { title: string; sub: string; icon: OutcomeIconName }[];
}) {
  return (
    <section className="bg-brand py-14">
      <div className={CONTAINER}>
        <div className="mx-auto mb-10 max-w-[640px] text-center text-grey-bg">
          <h2 className="type-h2 text-white">{heading}</h2>
        </div>

        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-tile bg-white/[0.16] max-720:grid-cols-2">
          {outcomes.map((outcome) => (
            <div
              key={outcome.title}
              className="bg-brand px-6 py-8 text-center max-600:px-4 max-600:py-6"
            >
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full border border-white/25 bg-white/10">
                <OutcomeIcon icon={outcome.icon} />
              </div>
              <div className="mb-1.5 text-[15px] font-bold text-grey-bg">
                {outcome.title}
              </div>
              <div className="text-[12.5px] leading-[1.4] text-white/[0.62]">
                {outcome.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── The rule that opens the comparison ──────────────────────── */

export function StoryRule({ children }: { children: string }) {
  return (
    <div
      className={cn(
        MONO,
        "my-6 flex items-center gap-4 text-[11.5px] uppercase tracking-[0.06em] text-ink-muted",
      )}
    >
      <span className="h-px flex-1 bg-grey-mid" aria-hidden />
      <span className="flex items-center gap-2.5">
        <span
          className="flex size-5 items-center justify-center rounded-full border border-brand-pale bg-brand-tint text-brand"
          aria-hidden
        >
          <Icon name="exchange" width={11} height={11} />
        </span>
        {children}
      </span>
      <span className="h-px flex-1 bg-grey-mid" aria-hidden />
    </div>
  );
}
