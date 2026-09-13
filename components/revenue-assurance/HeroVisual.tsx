import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { MONO, Tick } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * The hero visual: one chart, followed from the EHR to the write-back.
 *
 * Four cards on one vertical spine, connected by thin brand connectors with a
 * node at each join, so the page's argument reads as a product workflow rather
 * than an illustration:
 *
 *   the record arriving from the EHR
 *        -> the review itself, with the findings it raised inside it
 *        -> the day it happened
 *        -> the result going back
 *
 * The chart review is the primary card: a full product window with a brand
 * head, the scan of the chart and the finding rows. The other three are single
 * supporting rows on the same grid, so the hierarchy is obvious before a word
 * is read.
 *
 * Every string is the one the page already carried. Nothing here introduces
 * copy: each stage is an icon, a rule, a node or a tick, never a new word.
 */

/**
 * One turn of the workflow.
 *
 * Four stages of four seconds. Every animated part below runs on this clock
 * and picks its moment with a delay, so the stages cannot drift apart; the
 * keyframes live in globals.css and all of them are stopped by the global
 * prefers-reduced-motion rule, which leaves the resting composition on screen.
 */
const CYCLE = "16s";

/** When each card takes its turn, in seconds into the cycle. */
const STAGE = { source: 0, review: 4, found: 8, written: 12 } as const;

/** A hand-off runs at the tail of the stage it leaves. */
const HANDOFF = { toReview: 3.2, toFound: 7.2, toWritten: 11.2 } as const;

/** The findings land one after another, once the review card is live. */
const FINDING_AT = [4.5, 4.95, 5.4];

const card = (at: number) => ({
  animation: `mp-ra-card ${CYCLE} ease-in-out ${at}s infinite`,
});
const node = (at: number) => ({
  animation: `mp-ra-node ${CYCLE} ease-in-out ${at}s infinite`,
});

export default function ChartReviewStack({
  title,
  status,
  fetched,
  findings,
  foot,
}: {
  title: string;
  status: string;
  fetched: string;
  findings: { tone: "flag" | "opportunity"; title: string; meta: string }[];
  foot: [string, string];
}) {
  return (
    <div className="mx-auto flex max-w-[460px] flex-col">
      {/* ── Where the record came from ── */}
      <SupportCard icon="server" at={STAGE.source}>
        {fetched}
      </SupportCard>

      <Connector at={HANDOFF.toReview} />

      {/* ── The review itself, and what it raised ── */}
      <div
        className="overflow-hidden rounded-[8px] border border-[#E3E3E3] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)]"
        style={card(STAGE.review)}
      >
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-[#E3E3E3] bg-[#F5F5F5] px-5 py-2.5 max-720:px-4">
          <span
            className={cn(
              MONO,
              "flex min-w-0 items-center gap-2 ra-mono text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#878787]",
            )}
          >
            <Icon name="scan" width={13} height={13} className="shrink-0 text-[#007EFF]" />
            {/* Truncated where it fits on one line, wrapped where it does not,
                so the label is never cut off on a narrow screen. */}
            <span className="truncate max-600:overflow-visible max-600:text-clip max-600:whitespace-normal">
              {title}
            </span>
          </span>

          <span
            className={cn(
              MONO,
              "flex shrink-0 items-center gap-1.5 rounded-full border border-[#E3E3E3] bg-[#F5F5F5] px-2.5 py-1 ra-mono text-[10.5px] font-semibold uppercase tracking-[0.04em] text-[#007EFF]",
            )}
          >
            <span className="size-1.5 rounded-full bg-[#007EFF]" aria-hidden />
            {status}
          </span>
        </div>

        {/* The chart being read: scan bars keep moving on the shared mp-sweep
            animation used elsewhere on this page. */}
        <div className="flex flex-col gap-1.5 px-5 py-4 max-720:px-4" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="relative h-1.5 w-full overflow-hidden rounded-full bg-[#F5F5F5]"
            >
              <span
                className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-[#007EFF]/70"
                style={{
                  animation: `mp-sweep 2.4s ease-in-out infinite ${i * 0.28}s`,
                }}
              />
            </span>
          ))}
        </div>

        {/* The findings, full bleed so a row highlight runs edge to edge. */}
        <ul className="border-t border-[#E3E3E3]">
          {findings.map((finding, i) => (
            <FindingRow
              key={finding.title}
              tone={finding.tone}
              title={finding.title}
              meta={finding.meta}
              at={FINDING_AT[i % FINDING_AT.length]}
            />
          ))}
        </ul>
      </div>

      <Connector at={HANDOFF.toFound} />

      {/* ── When it happened ── */}
      <SupportCard icon="pulse" at={STAGE.found}>
        {foot[0]}
      </SupportCard>

      <Connector at={HANDOFF.toWritten} />

      {/* ── Where it goes back to ── */}
      <SupportCard
        at={STAGE.written}
        badge={
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-[#007EFF] text-white"
            aria-hidden
          >
            <Tick className="size-3.5" />
          </span>
        }
      >
        {foot[1]}
      </SupportCard>
    </div>
  );
}

/**
 * One of the three supporting rows: a badge, the line the page already
 * carried, and the hairline that warms when this stage is live.
 */
function SupportCard({
  icon,
  badge,
  at,
  children,
}: {
  icon?: IconName;
  /** The closing card seals rather than lights, so it supplies its own. */
  badge?: ReactNode;
  at: number;
  children: ReactNode;
}) {
  return (
    <div
      className="flex min-h-[56px] items-center gap-3 rounded-[8px] border border-[#E3E3E3] bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)]"
      style={card(at)}
    >
      {badge ?? (
        <span
          className="flex size-8 shrink-0 items-center justify-center rounded-[8px] border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]"
          style={node(at)}
          aria-hidden
        >
          {icon ? <Icon name={icon} width={14} height={14} /> : null}
        </span>
      )}

      <span
        className={cn(
          MONO,
          "min-w-0 flex-1 ra-mono text-[12px] leading-[1.45] text-[#606060]",
        )}
      >
        {children}
      </span>
    </div>
  );
}

/**
 * The run between two cards: a node on the edge each card presents, and the
 * pale connector between them that brand fills as the chart moves along it.
 *
 * Fixed height, so all three runs are identical and the cards sit on an even
 * grid. It lives in the gutter between cards and never crosses one.
 */
function Connector({ at }: { at: number }) {
  return (
    <div className="flex h-10 flex-col items-center" aria-hidden>
      <Dot at={at} />

      <span className="relative my-1 w-px flex-1 bg-[#E3E3E3]">
        <span
          className="absolute inset-0 origin-top bg-[#007EFF] opacity-0"
          style={{ animation: `mp-ra-line ${CYCLE} ease-in-out ${at}s infinite` }}
        />
      </span>

      <Dot at={at} />
    </div>
  );
}

/** A connection point, where a connector meets a card. */
function Dot({ at }: { at: number }) {
  return (
    <span
      className="size-2 shrink-0 rounded-full border-2 border-[#E3E3E3] bg-white"
      style={node(at)}
    />
  );
}

/**
 * One finding, as the product would list it: severity on the left, the finding
 * and where it came from in the middle, its state on the right. Equal height
 * whichever tone it carries, so the three read as one list.
 */
function FindingRow({
  tone,
  title,
  meta,
  at,
}: {
  tone: "flag" | "opportunity";
  title: string;
  meta: string;
  at: number;
}) {
  const flag = tone === "flag";

  return (
    <li
      className="relative flex min-h-[58px] items-center gap-3 border-b border-[#E3E3E3] bg-transparent py-2.5 pr-5 pl-5 last:border-b-0 max-720:pr-4 max-720:pl-4"
      style={{ animation: `mp-ra-row ${CYCLE} ease-in-out ${at}s infinite` }}
    >
      {/* The leading marker, on the row's own edge. It takes no width, so the
          three rows stay aligned whether or not it is lit. */}
      <span
        className="absolute inset-y-0 left-0 w-[2px] bg-transparent"
        style={{ animation: `mp-ra-rail ${CYCLE} ease-in-out ${at}s infinite` }}
        aria-hidden
      />

      <span
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-[8px] border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]",
        )}
        aria-hidden
      >
        <Icon name={flag ? "shield" : "chartup"} width={13} height={13} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="type-hl-inbox-title block text-ink">{title}</span>
        <span className={cn(MONO, "ra-mono mt-0.5 block text-[11px] text-[#878787]")}>
          {meta}
        </span>
      </span>

      <span
        className={cn(
          "size-1.5 shrink-0 rounded-full",
          flag ? "bg-[#007EFF]" : "bg-[#007EFF]",
        )}
        aria-hidden
      />
    </li>
  );
}
