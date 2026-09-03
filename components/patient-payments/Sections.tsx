import { Icon } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import {
  OutcomeIcon,
  type OutcomeIconName,
} from "@/components/module-page/sections";
import { CONTAINER, Eyebrow, MONO, SECTION, Tick } from "@/components/module-page/ui";
import { MurphiNode, Run, SystemNode } from "@/components/patient-payments/Pay";
import { cn } from "@/lib/cn";

/**
 * The body of the Patient Payments page.
 *
 * The comparison was two bullet cards and the EHR section a row of three
 * circles, so neither showed the sequence it describes. Both now take the
 * composition their content asks for, and they live beside the page rather than
 * in the shared module kit, so the other module pages are untouched.
 *
 * Every string is the one the page already carried.
 */

/* ── The same balance, two ways — aligned so they compare ────── */

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

/* ── EHR Integration: the round trip, drawn vertically ───────── */

export function EhrIntegration({
  heading,
  lede,
  substeps,
}: {
  heading: string;
  lede: string;
  /** The stages Murphi runs, with the last one returning the record. */
  substeps: string[];
}) {
  const pipeline = substeps.slice(0, -1);
  const returnStep = substeps[substeps.length - 1];

  return (
    <section id="ehr" className={SECTION}>
      <Reveal>
        <div className="mx-auto max-w-[1156px] rounded-panel bg-grey-bg px-12 py-14 max-720:mx-5 max-720:px-6 max-720:py-10">
          <div className="grid grid-cols-[0.88fr_1.12fr] items-center gap-14 max-1080:grid-cols-1 max-1080:gap-10">
            <div className="min-w-0">
              <Eyebrow>EHR Integration</Eyebrow>

              <h2 className="mt-4 type-h2 text-ink">{heading}</h2>

              <p className="mt-4 max-w-[52ch] text-[18px] leading-[1.6] text-grey-500">
                {lede}
              </p>
            </div>

            <div className="min-w-0">
              <div className="overflow-hidden rounded-panel border border-grey-mid bg-white shadow-[0_20px_50px_rgba(15,29,84,.08)]">
                <div
                  className={cn(
                    MONO,
                    "flex items-center justify-between gap-3 border-b border-grey-mid px-5 py-3 max-600:px-4",
                  )}
                >
                  <span className="min-w-0 truncate text-[11px] uppercase tracking-[0.06em] text-ink-muted">
                    Your EHR ⇄ Murphi AI ⇄ Your EHR
                  </span>
                  <span className="relative flex size-1.5 shrink-0" aria-hidden>
                    <span
                      className="absolute inline-flex size-full rounded-full bg-brand/60"
                      style={{ animation: "mp-glow 2.4s ease-in-out infinite" }}
                    />
                    <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
                  </span>
                </div>

                <div className="px-5 py-5 max-600:px-4">
                  <SystemNode label="EHR" />
                  <Run />
                  <MurphiNode stages={pipeline} />
                  <Run label={returnStep} />
                  <SystemNode label="EHR" returned />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
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
