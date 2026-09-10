import { Icon } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import {
  OutcomeIcon,
  type OutcomeIconName,
} from "@/components/module-page/sections";
/* Matches Revenue Assurance "The Same Chart, Two Timelines" visual + hover pause. */
export { Timelines } from "@/components/module-page/Timelines";
import { CONTAINER, Eyebrow, MONO, SECTION } from "@/components/module-page/ui";
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
        <div className="mx-auto max-w-[1156px] rounded-panel bg-tint px-12 py-14 max-720:mx-5 max-720:px-6 max-720:py-10">
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
