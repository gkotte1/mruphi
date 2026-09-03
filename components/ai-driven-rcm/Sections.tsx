import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import {
  OutcomeIcon,
  type OutcomeIconName,
} from "@/components/module-page/sections";
import { CONTAINER, MONO, Tick } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

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

/* ── The same gap, two moments — aligned so they compare ─────── */

/* Static so Tailwind sees them: on mobile the grid stops being two columns,
   so the cells reorder into one complete track followed by the other. */
const BEFORE_ORDER = [
  "max-720:order-2",
  "max-720:order-3",
  "max-720:order-4",
  "max-720:order-5",
];
const AFTER_ORDER = [
  "max-720:order-7",
  "max-720:order-8",
  "max-720:order-9",
  "max-720:order-10",
];

export function Timelines({
  before,
  after,
}: {
  before: { title: string; steps: string[] };
  after: { title: string; steps: string[] };
}) {
  const rows = Math.max(before.steps.length, after.steps.length);

  return (
    <Reveal>
      <div className="grid grid-cols-2 overflow-hidden rounded-panel border border-grey-mid bg-white shadow-[0_16px_40px_rgba(15,29,84,.06)] max-720:grid-cols-1">
        <TrackHead title={before.title} tone="before" className="max-720:order-1" />
        <TrackHead title={after.title} tone="after" className="max-720:order-6" />

        {Array.from({ length: rows }, (_, i) => (
          <TrackCell
            key={`before-${i}`}
            step={before.steps[i]}
            index={i}
            tone="before"
            last={i === rows - 1}
            className={BEFORE_ORDER[i] ?? ""}
          />
        ))}
        {Array.from({ length: rows }, (_, i) => (
          <TrackCell
            key={`after-${i}`}
            step={after.steps[i]}
            index={i}
            tone="after"
            last={i === rows - 1}
            className={AFTER_ORDER[i] ?? ""}
          />
        ))}
      </div>
    </Reveal>
  );
}

function TrackHead({
  title,
  tone,
  className,
}: {
  title: string;
  tone: "before" | "after";
  className?: string;
}) {
  const after = tone === "after";

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 border-b border-grey-mid px-7 py-4 max-600:px-5",
        after ? "bg-brand-tint" : "bg-grey-soft",
        after ? "" : "border-r border-grey-mid max-720:border-r-0",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full border",
          after
            ? "border-brand bg-brand text-white"
            : "border-grey-bdr bg-white text-grey-bdr",
        )}
        aria-hidden
      >
        {after ? (
          <Tick className="size-2.5" />
        ) : (
          <span className="size-1.5 rounded-full bg-current" />
        )}
      </span>

      <h4
        className={cn(
          MONO,
          "text-[12px] font-semibold uppercase tracking-[0.06em]",
          after ? "text-brand-dark" : "text-ink-muted",
        )}
      >
        {title}
      </h4>
    </div>
  );
}

function TrackCell({
  step,
  index,
  tone,
  last,
  className,
}: {
  step?: string;
  index: number;
  tone: "before" | "after";
  last: boolean;
  className?: string;
}) {
  const after = tone === "after";

  return (
    <div
      className={cn(
        "flex items-start gap-4 px-7 py-5 max-600:gap-3.5 max-600:px-5",
        after ? "bg-brand-tint/25" : "",
        last ? "" : "border-b border-grey-mid",
        after ? "" : "border-r border-grey-mid max-720:border-r-0",
        className,
      )}
    >
      <span className="relative flex w-6 shrink-0 justify-center self-stretch">
        <span
          className={cn(
            "relative z-10 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border",
            after
              ? "border-brand bg-white text-brand"
              : "border-grey-bdr bg-white text-grey-bdr",
          )}
          aria-hidden
        >
          <span className={cn(MONO, "text-[10px] font-bold")}>{index + 1}</span>
        </span>
        {last ? null : (
          <span
            className={cn(
              "absolute top-7 -bottom-10 left-1/2 w-px -translate-x-1/2",
              after ? "bg-brand-pale" : "bg-grey-mid",
            )}
            aria-hidden
          />
        )}
      </span>

      <span
        className={cn(
          "min-w-0 text-[14px] leading-[1.55]",
          after ? "text-ink" : "text-grey-500",
        )}
      >
        {step}
      </span>
    </div>
  );
}

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
        <div className="overflow-hidden rounded-panel border border-grey-mid bg-white shadow-[0_16px_40px_rgba(15,29,84,.06)]">
          <div
            className={cn(
              MONO,
              "flex items-center justify-between gap-3 border-b border-grey-mid bg-grey-soft px-6 py-3 max-600:px-5",
            )}
          >
            <span className="text-[11px] uppercase tracking-[0.06em] text-ink-muted">
              {`${items.length} automated`}
            </span>
            <span className="relative flex size-1.5 shrink-0" aria-hidden>
              <span
                className="absolute inline-flex size-full rounded-full bg-brand/60 motion-reduce:hidden"
                style={{ animation: "mp-glow 2.4s ease-in-out infinite" }}
              />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
            </span>
          </div>

          {/* gap-px over a grey ground draws the hairlines, so the grid needs
              no nth-child maths as the column count changes. */}
          <ul className="grid grid-cols-3 gap-px bg-grey-mid max-900:grid-cols-2 max-600:grid-cols-1">
            {items.map((item, i) => (
              <li
                key={item}
                className="group flex items-center gap-3 bg-white px-6 py-[18px] transition-colors duration-300 hover:bg-grey-bg max-600:px-5"
              >
                <span
                  className="flex size-7 shrink-0 items-center justify-center rounded-[8px] border border-brand-pale bg-brand-tint text-brand transition-colors duration-300 group-hover:border-transparent group-hover:bg-brand group-hover:text-white"
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
          <h2 className="type-h2">{heading}</h2>
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
