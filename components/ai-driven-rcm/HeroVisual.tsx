import { Icon } from "@/components/icons";
import { MONO, Tick } from "@/components/module-page/ui";
import {
  FindingCard,
  Surface,
  TrackRail,
  type StageState,
} from "@/components/ai-driven-rcm/Claim";
import { cn } from "@/lib/cn";

/**
 * The hero visual: one claim, caught mid-flight.
 *
 * It used to be a single card holding a row of four dots and one bullet line.
 * It is now the readiness view itself - the stages the claim has cleared, the
 * one that was intercepted, and the two things that have to happen before it
 * ships - layered so the sequence reads at a glance.
 *
 * Motion is a staggered entrance and a pulsing flag; nothing loops, so the
 * hero stays quiet next to the mechanics further down the page.
 *
 * Every string is the one the page already carried.
 */
export default function ClaimReadiness({
  title,
  status,
  nodes,
  finding,
  foot,
}: {
  title: string;
  status: string;
  nodes: { label: string; state: StageState }[];
  finding: { title: string; meta: string };
  foot: [string, string];
}) {
  return (
    <div className="relative">
      <Surface
        label={
          <>
            <Icon name="pulse" width={13} height={13} className="shrink-0 text-[#007EFF]" />
            <span className="truncate">{title}</span>
          </>
        }
        status={status}
        tone="brand"
        className="relative z-20"
      >
        {/* Where the claim has got to. */}
        <div className="rounded-[8px] border border-[#E3E3E3] bg-[#F5F5F5] px-4 py-4 max-600:px-3">
          <TrackRail nodes={nodes} compact />
        </div>

        <div className="my-4 flex items-center gap-3" aria-hidden>
          <span className="h-px flex-1 bg-[#E3E3E3]" />
          <span className="flex size-1.5 rounded-full bg-[#E3E3E3]" />
          <span className="h-px flex-1 bg-[#E3E3E3]" />
        </div>

        {/* What stopped it. */}
        <div style={{ animation: "mp-fade-up .5s ease backwards .18s" }}>
          <FindingCard title={finding.title} meta={finding.meta} />
        </div>
      </Surface>

      <Connector />

      {/* What clears it. */}
      <div
        className="relative z-10 mx-auto w-[92%] rounded-[8px] border border-[#E3E3E3] bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)] max-600:w-full"
        style={{ animation: "mp-fade-up .5s ease backwards .3s" }}
      >
        <span className="flex items-center justify-center gap-2">
          <span
            className="flex size-5 shrink-0 items-center justify-center rounded-full border border-[#007EFF] bg-[#007EFF] text-white"
            aria-hidden
          >
            <Tick className="size-2.5" />
          </span>
          <span className={cn(MONO, "min-w-0 truncate text-[12px] font-semibold text-ink")}>
            {foot[0]}
          </span>
        </span>
      </div>

      <Connector delay=".6s" />

      {/* Who clears it. */}
      <div
        className="mx-auto flex w-[80%] items-center justify-center gap-2 rounded-full border border-[#E3E3E3] bg-[#F5F5F5] px-4 py-2.5 max-600:w-full"
        style={{ animation: "mp-fade-up .5s ease backwards .42s" }}
      >
        <Icon name="community" width={14} height={14} className="shrink-0 text-[#007EFF]" />
        <span
          className={cn(
            MONO,
            "min-w-0 truncate text-[12px] font-semibold tracking-[0.02em] text-ink",
          )}
        >
          {foot[1]}
        </span>
      </div>
    </div>
  );
}

/** The run between two surfaces, with the claim moving down it. */
function Connector({ delay = "0s" }: { delay?: string }) {
  return (
    <div className="flex justify-center py-3" aria-hidden>
      <span className="relative flex h-7 w-px shrink-0 bg-[#E3E3E3]">
        <span
          className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[#007EFF]"
          style={{ animation: `mp-flow-pulse-v 2.6s ease-in-out infinite ${delay}` }}
        />
      </span>
    </div>
  );
}
