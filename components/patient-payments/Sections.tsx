import { EhrSplit } from "@/components/inner-page/kit";
import { MONO } from "@/components/module-page/ui";
import { MurphiNode, Run, SystemNode } from "@/components/patient-payments/Pay";
import { cn } from "@/lib/cn";

export { Outcomes, StoryRule } from "@/components/inner-page/kit";
export { Timelines } from "@/components/inner-page/Timelines";

export function EhrIntegration({
  heading,
  lede,
  substeps,
}: {
  heading: string;
  lede: string;
  substeps: string[];
}) {
  const pipeline = substeps.slice(0, -1);
  const returnStep = substeps[substeps.length - 1];

  return (
    <EhrSplit heading={heading} lede={lede}>
      <div className="ip-card overflow-hidden">
        <div
          className={cn(
            MONO,
            "ip-mono flex items-center justify-between gap-3 border-b border-[#E3E3E3] px-5 py-3 max-600:px-4",
          )}
        >
          <span className="min-w-0 truncate text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink">
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

        <div className="px-4 py-4 max-600:px-3.5">
          <SystemNode label="EHR" muted />
          <Run tight />
          <MurphiNode stages={pipeline} compact />
          <Run label={returnStep} tight />
          <SystemNode label="EHR" returned muted />
        </div>
      </div>
    </EhrSplit>
  );
}
