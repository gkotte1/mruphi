import { Icon } from "@/components/icons";
import { MONO, Tick } from "@/components/module-page/ui";
import { Finding, Run, ScanBar, Surface } from "@/components/revenue-assurance/Review";
import { cn } from "@/lib/cn";

/**
 * The hero visual: one chart, followed from the EHR to the write-back.
 *
 * It used to be a single bordered card with three bullet rows, which showed
 * the findings but never the thing that produces them. It is now a layered
 * composition — the record arriving, the review running over it, the findings
 * it raised, the day it happened, and the result going back — so the sequence
 * the page argues for is visible in a couple of seconds.
 *
 * Every string is the one the page already carried.
 */
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
    <div className="relative">
      {/* Where the record came from. */}
      <div className="mb-1 flex justify-center">
        <span
          className={cn(
            MONO,
            "inline-flex max-w-full items-center gap-2 rounded-full border border-grey-mid bg-white px-3.5 py-1.5 text-[11px] text-ink-muted shadow-[0_6px_16px_-10px_rgba(15,29,84,.5)]",
          )}
        >
          <span
            className="flex size-4 shrink-0 items-center justify-center rounded-[5px] bg-brand-tint text-brand"
            aria-hidden
          >
            <Icon name="server" width={10} height={10} />
          </span>
          <span className="min-w-0 truncate">{fetched}</span>
        </span>
      </div>

      <Run short />

      {/* The review itself. */}
      <Surface
        label={
          <>
            <Icon name="scan" width={13} height={13} className="shrink-0" />
            <span className="truncate">{title}</span>
          </>
        }
        status={status}
        tone="brand"
        className="relative z-20"
      >
        <ScanBar rows={3} />

        <div className="my-4 flex items-center gap-3" aria-hidden>
          <span className="h-px flex-1 bg-grey-mid" />
          <span className="flex size-1.5 rounded-full bg-brand-pale" />
          <span className="h-px flex-1 bg-grey-mid" />
        </div>

        <ul>
          {findings.map((finding, i) => (
            <Finding
              key={finding.title}
              tone={finding.tone}
              title={finding.title}
              meta={finding.meta}
              index={i}
            />
          ))}
        </ul>
      </Surface>

      <Run />

      {/* When it happened. */}
      <div className="relative z-10 mx-auto w-[94%] rounded-tile border border-grey-mid bg-grey-bg px-4 py-3 max-600:w-full">
        <span className="flex items-center justify-center gap-2">
          <span
            className="flex size-5 shrink-0 items-center justify-center rounded-full border border-brand-pale bg-white text-brand"
            aria-hidden
          >
            <Icon name="pulse" width={11} height={11} />
          </span>
          <span className={cn(MONO, "min-w-0 truncate text-[12px] text-grey-500")}>
            {foot[0]}
          </span>
        </span>
      </div>

      <Run />

      {/* Where it goes back to. */}
      <div className="mx-auto flex w-[76%] items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 shadow-[0_12px_28px_-14px_rgba(0,106,214,.7)] max-600:w-full">
        <Tick className="size-3.5 shrink-0 text-white" />
        <span
          className={cn(
            MONO,
            "min-w-0 truncate text-[12px] font-semibold tracking-[0.02em] text-white",
          )}
        >
          {foot[1]}
        </span>
      </div>
    </div>
  );
}
