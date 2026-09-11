import { Icon } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import { Layers, MONO, Tick } from "@/components/module-page/ui";
import {
  MurphiNode,
  Run,
  SystemNode,
} from "@/components/revenue-assurance/Review";
import { RaEyebrow, RaWrap } from "@/components/revenue-assurance/Shell";
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
      <span className="h-px w-4 bg-[#E3E3E3] max-900:h-4 max-900:w-px" />
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-[#E3E3E3] bg-white text-[#007EFF]">
        <Icon name="exchange" width={12} height={12} />
      </span>
      <span className="h-px w-4 bg-[#E3E3E3] max-900:h-4 max-900:w-px" />
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
        "flex h-full flex-col overflow-hidden rounded-[10px] border bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)]",
        after ? "border-[#E3E3E3]" : "border-[#E3E3E3]",
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
                after ? "bg-[#CCE5FF]" : "bg-[#E3E3E3]",
              )}
            />
            <span
              className={cn(
                "absolute inset-y-0 left-1/2 w-px origin-top -translate-x-1/2 opacity-0",
                after ? "bg-[#007EFF]" : "bg-[#B2B2B2]",
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
        after ? "border-[#E3E3E3] bg-white" : "border-[#E3E3E3] bg-[#F5F5F5]",
      )}
    >
      <span
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full border",
          after
            ? "border-[#007EFF] bg-[#007EFF] text-[#F5F5F5]"
            : "border-[#B2B2B2] bg-white text-[#B2B2B2]",
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
          "ra-mono text-[12px] font-semibold uppercase tracking-[0.06em]",
          after ? "text-[#007EFF]" : "text-[#878787]",
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
          "absolute -inset-x-3 inset-y-1.5 z-0 rounded-[8px] opacity-0",
          after ? "bg-[#F5F5F5]" : "bg-[#EFEFEF]",
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
            after ? "border-[#CCE5FF]" : "border-[#E3E3E3]",
          )}
        />
        <span
          className={cn(
            "absolute inset-0 rounded-full border opacity-0",
            after ? "border-[#007EFF] bg-[#CCE5FF]" : "border-[#B2B2B2] bg-[#F5F5F5]",
          )}
          style={on}
        />
        <span
          className={cn(
            MONO,
            "ra-mono relative text-[10px] font-bold",
            after ? "text-[#007EFF]" : "text-[#878787]",
          )}
        >
          {index + 1}
        </span>
      </span>

      <span
        className={cn(
          "relative z-[2] min-w-0 text-[14px] leading-[1.55]",
          after ? "text-ink" : "text-[#606060]",
        )}
      >
        {step}
      </span>
    </div>
  );
}

/* ── Outcomes ────────────────────────────────────────────────── */

type OutcomeIconName = "clock" | "tick" | "layers" | "shield" | "info" | "bolt";

function OutcomeIcon({ icon }: { icon: OutcomeIconName }) {
  const shared = { viewBox: "0 0 24 24", fill: "none", className: "size-7" };

  if (icon === "clock") {
    return (
      <svg {...shared} aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M12 7v5l3.5 2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (icon === "layers") return <Layers className="size-7" />;

  if (icon === "shield") {
    return (
      <svg {...shared} aria-hidden>
        <path
          d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="m9 12 2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (icon === "info") {
    return (
      <svg {...shared} aria-hidden>
        <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (icon === "bolt") {
    return (
      <svg {...shared} aria-hidden>
        <path
          d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return <Tick className="size-7" />;
}

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
    <section className="ra-section ra-band">
      <RaWrap>
        <div style={{ maxWidth: 640, margin: "0 auto 64px", textAlign: "center" }}>
          <h2 className="ra-h2 ra-serif" style={{ marginBottom: 18 }}>
            {heading}
          </h2>
          <p className="ra-lead">{intro}</p>
        </div>

        <div
          className="ra-ruled ra-stats"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          {outcomes.map((outcome) => (
            <div
              key={outcome.title}
              style={{ padding: "36px 24px", textAlign: "center" }}
            >
              <div
                style={{
                  margin: "0 auto 16px",
                  display: "flex",
                  width: 40,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  border: "1.5px solid #007EFF",
                  color: "#007EFF",
                }}
              >
                <OutcomeIcon icon={outcome.icon} />
              </div>
              <div
                className="ra-serif"
                style={{ marginBottom: 8, fontSize: 16, fontWeight: 500 }}
              >
                {outcome.title}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.5, color: "#606060" }}>
                {outcome.sub}
              </div>
            </div>
          ))}
        </div>
      </RaWrap>
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
    <section id="ehr" className="ra-section">
      <RaWrap>
        <Reveal>
          <div
            className="ra-split"
            style={{
              display: "grid",
              gridTemplateColumns: "0.88fr 1.12fr",
              alignItems: "center",
              gap: 64,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <RaEyebrow>EHR Integration</RaEyebrow>

              <h2 className="ra-h2 ra-serif" style={{ marginTop: 16, marginBottom: 18 }}>
                {heading}
              </h2>

              <p className="ra-lead" style={{ maxWidth: "52ch", fontSize: 18 }}>
                {lede}
              </p>

              <p style={{ marginTop: 20, fontSize: 13, lineHeight: 1.6, color: "#878787" }}>
                {disclaimer}
              </p>
            </div>

            <div style={{ minWidth: 0 }}>
              <div className="ra-card" style={{ overflow: "hidden" }}>
                <div
                  className={cn(
                    MONO,
                    "ra-mono flex items-center justify-between gap-3 border-b border-[#E3E3E3] px-5 py-3 max-600:px-4",
                  )}
                >
                  <span className="min-w-0 truncate text-[11px] font-semibold uppercase tracking-[0.06em] text-ink">
                    Your EHR ⇄ Murphi AI ⇄ Your EHR
                  </span>
                  <span className="relative flex size-1.5 shrink-0" aria-hidden>
                    <span
                      className="absolute inline-flex size-full rounded-full bg-[#007EFF]/60"
                      style={{ animation: "mp-glow 2.4s ease-in-out infinite" }}
                    />
                    <span className="relative inline-flex size-1.5 rounded-full bg-[#007EFF]" />
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
        </Reveal>
      </RaWrap>
    </section>
  );
}

/* ── The closing panel, kept as the page's own words ─────────── */

export function StoryRule({ children }: { children: string }) {
  return (
    <div
      className={cn(
        MONO,
        "ra-mono my-6 flex items-center gap-4 text-[11.5px] uppercase tracking-[0.06em] text-[#878787]",
      )}
    >
      <span className="h-px flex-1 bg-[#E3E3E3]" aria-hidden />
      <span className="flex items-center gap-2.5">
        <span
          className="flex size-5 items-center justify-center rounded-full border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]"
          aria-hidden
        >
          <Icon name="exchange" width={11} height={11} />
        </span>
        {children}
      </span>
      <span className="h-px flex-1 bg-[#E3E3E3]" aria-hidden />
    </div>
  );
}

export function FinalCta({
  heading,
  body,
}: {
  heading: string;
  body: string;
}) {
  return (
    <section
      style={{
        background: "#006AD6",
        padding: "120px 32px",
        textAlign: "center",
      }}
    >
      <h2
        className="ra-serif ra-cta-h"
        style={{
          fontWeight: 500,
          fontSize: 44,
          lineHeight: 1.15,
          maxWidth: 720,
          margin: "0 auto 20px",
          color: "#ffffff",
        }}
      >
        {heading}
      </h2>
      <p
        style={{
          fontSize: 17,
          color: "#CCE5FF",
          maxWidth: 520,
          margin: "0 auto 40px",
          lineHeight: 1.6,
        }}
      >
        {body}
      </p>
      <a href="/contact-us/" className="ra-btn-on-blue">
        Request Demo
      </a>
    </section>
  );
}
