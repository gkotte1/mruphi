import { Icon } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import {
  OutcomeIcon,
  type OutcomeIconName,
} from "@/components/module-page/sections";
import { CONTAINER, Eyebrow, MONO, SECTION, Tick } from "@/components/module-page/ui";
import {
  MurphiNode,
  Run,
  SystemNode,
} from "@/components/revenue-assurance/Review";
import { cn } from "@/lib/cn";

/**
 * The body of the Revenue Assurance page.
 *
 * Each section previously reached for the same shape - two bullet cards, a row
 * of circles, a strip of pills - so the page read as one repeated pattern
 * rather than a product story. Each now takes the composition its own content
 * asks for, and they all live beside the page rather than in the shared module
 * kit, so the other module pages are untouched.
 *
 * Every string is the one the page already carried.
 */

/* ── Two timelines of the same chart, aligned so they compare ── */

/**
 * The two tracks used to be one split panel, which read as a comparison table:
 * the same chart, tabulated. They are now two cards either side of a single
 * hand-off node, each running its four steps down its own rail, so the section
 * reads as two workflows for one chart rather than two lists.
 *
 * Alignment is structural rather than eyeballed. The cards are the two `1fr`
 * columns of one grid and stretch to a shared height; inside each, the four
 * steps are equal `1fr` rows under an identically built head. So both cards are
 * exactly the same width and height, the heads line up, and step 3 on the left
 * sits on the same line as step 3 on the right whatever the copy does.
 *
 * Every string is the one the page already carried.
 */

/**
 * One turn of both tracks.
 *
 * A step holds for a second and a half, then the rail advances a node and the
 * next step takes over: four steps, six seconds, then round again. The
 * keyframes are in globals.css and the global prefers-reduced-motion rule
 * stops all of it, leaving the resting composition on screen.
 */
const TL_CYCLE = "6s";

/** A step's turn starts at its index times the beat. */
const TL_BEAT = 1.5;

const stepOn = (index: number) => ({
  animation: `mp-tl-on ${TL_CYCLE} ease-in-out ${index * TL_BEAT}s infinite`,
});

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
      {/* Two stretched columns with the hand-off between them. The cards are
          the grid's own tracks, so neither can end up wider or taller than
          the other. */}
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch max-900:grid-cols-1">
        <Track title={before.title} steps={before.steps} rows={rows} tone="before" />

        <SameChart />

        <Track title={after.title} steps={after.steps} rows={rows} tone="after" />
      </div>
    </Reveal>
  );
}

/**
 * The hand-off: one chart, arriving at both tracks.
 *
 * A hairline into each card with a single node on the centre line. It carries
 * no words of its own, and turns to run down the page once the cards stack.
 */
function SameChart() {
  return (
    <div
      className="flex items-center self-center px-4 max-900:w-full max-900:flex-col max-900:px-0 max-900:py-3"
      aria-hidden
    >
      <span className="h-px w-4 bg-grey-mid max-900:h-4 max-900:w-px" />
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-brand-pale bg-white text-brand">
        <Icon name="exchange" width={12} height={12} />
      </span>
      <span className="h-px w-4 bg-grey-mid max-900:h-4 max-900:w-px" />
    </div>
  );
}

/**
 * One track: a head, then four steps down a rail.
 *
 * The steps are equal `1fr` rows of a full-height grid, so the four rows split
 * the card evenly and each node lands at a known fraction of the run: 12.5%,
 * 37.5%, 62.5%, 87.5%. The rail is drawn between the first and last of those,
 * which is why its thirds fall exactly on the nodes between.
 */
function Track({
  title,
  steps,
  rows,
  tone,
}: {
  title: string;
  steps: string[];
  rows: number;
  tone: "before" | "after";
}) {
  const after = tone === "after";

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-panel border bg-white",
        after
          ? "border-brand-pale shadow-[0_16px_40px_rgba(15,29,84,.06)]"
          : "border-grey-mid shadow-[0_10px_26px_-18px_rgba(15,29,84,.35)]",
      )}
    >
      <TrackHead title={title} tone={tone} />

      <div className="grow px-7 py-6 max-600:px-5">
        <div
          className="relative grid h-full gap-y-3"
          style={{ gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}
        >
          {/* The rail, drawn between the first and last node centres. Each row
              is an equal fraction of the run and its node sits on the row's
              centre line, so those land at 12.5% and 87.5% however tall the
              copy makes the card. */}
          <span
            className="pointer-events-none absolute top-[12.5%] bottom-[12.5%] left-0 z-[1] w-7"
            aria-hidden
          >
            <span
              className={cn(
                "absolute inset-y-0 left-1/2 w-px -translate-x-1/2",
                after ? "bg-brand-pale" : "bg-grey-mid",
              )}
            />
            <span
              className={cn(
                "absolute inset-y-0 left-1/2 w-px origin-top -translate-x-1/2 opacity-0",
                after ? "bg-brand" : "bg-grey-bdr",
              )}
              style={{ animation: `mp-tl-rail ${TL_CYCLE} ease-in-out infinite` }}
            />
          </span>

          {Array.from({ length: rows }, (_, i) => (
            <TrackCell key={i} step={steps[i]} index={i} tone={tone} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * A track's head. Both are built the same way from the same sizes, so the two
 * cards' heads are the same height and the steps below them stay in line.
 */
function TrackHead({
  title,
  tone,
}: {
  title: string;
  tone: "before" | "after";
}) {
  const after = tone === "after";

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 border-b px-7 py-4 max-600:px-5",
        after
          ? "border-brand-pale bg-brand-tint/50"
          : "border-grey-mid bg-grey-soft",
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

/**
 * One step on a track: its node on the rail, and the line the page already
 * carried beside it.
 *
 * Its turn is played by two overlays fading in over the resting styles - the
 * wash behind the row and the ring on the node - so the copy itself never
 * changes colour and nothing moves. With motion off, both simply stay hidden
 * and the step reads exactly as it does at rest.
 */
function TrackCell({
  step,
  index,
  tone,
}: {
  step?: string;
  index: number;
  tone: "before" | "after";
}) {
  const after = tone === "after";
  const on = stepOn(index);

  return (
    <div className="relative flex items-center gap-4 max-600:gap-3.5">
      {/* The row's turn, inset so it never reaches the card edge. */}
      <span
        className={cn(
          "absolute -inset-x-3 inset-y-1.5 z-0 rounded-tile opacity-0",
          after ? "bg-brand-tint/40" : "bg-grey-bg",
        )}
        style={on}
        aria-hidden
      />

      <span
        className="relative z-[2] flex size-7 shrink-0 items-center justify-center"
        aria-hidden
      >
        <span
          className={cn(
            "absolute inset-0 rounded-full border bg-white",
            after ? "border-brand-pale" : "border-grey-mid",
          )}
        />
        <span
          className={cn(
            "absolute inset-0 rounded-full border opacity-0",
            after ? "border-brand bg-brand-tint" : "border-grey-bdr bg-grey-soft",
          )}
          style={on}
        />
        <span
          className={cn(
            MONO,
            "relative text-[10px] font-bold",
            after ? "text-brand-dark" : "text-grey-500",
          )}
        >
          {index + 1}
        </span>
      </span>

      <span
        className={cn(
          "relative z-[2] min-w-0 text-[14px] leading-[1.55]",
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
  intro,
  outcomes,
}: {
  heading: string;
  intro: string;
  outcomes: { title: string; sub: string; icon: OutcomeIconName }[];
}) {
  return (
    <section className="bg-brand py-14">
      <div className={CONTAINER}>
        <div className="mx-auto mb-10 max-w-[640px] text-center text-grey-bg">
          <h2 className="mb-2.5 type-h2 text-white">{heading}</h2>
          <p className="text-[16px] text-white/[0.68]">{intro}</p>
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
  disclaimer,
}: {
  heading: string;
  lede: string;
  /** The stages Murphi runs, with the last one returning the chart. */
  substeps: string[];
  disclaimer: string;
}) {
  const pipeline = substeps.slice(0, -1);
  const returnStep = substeps[substeps.length - 1];

  return (
    <section id="ehr" className={SECTION}>
      <Reveal>
        <div className="mx-auto max-w-[1156px] rounded-panel bg-tint px-12 py-14 max-720:mx-5 max-720:px-6 max-720:py-10">
          <div className="grid grid-cols-[0.88fr_1.12fr] items-center gap-14 max-1080:grid-cols-1 max-1080:gap-10">
            <div className="min-w-0">
              <Eyebrow>EHR Integration</Eyebrow>

              <h2 className="mt-4 type-h2 text-ink">{heading}</h2>

              <p className="mt-4 max-w-[52ch] text-[18px] leading-[1.6] text-grey-500">
                {lede}
              </p>

              <p className="mt-5 max-w-[52ch] text-[13px] leading-[1.6] text-ink-muted">
                {disclaimer}
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
                  <span className="min-w-0 truncate text-[11px] font-semibold uppercase tracking-[0.06em] text-ink">
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

/* ── The closing panel, kept as the page's own words ─────────── */

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
