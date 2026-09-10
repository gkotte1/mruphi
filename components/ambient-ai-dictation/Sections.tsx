import Image from "next/image";
import { Icon } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import {
  ArrowGlyph,
  CONTAINER,
  Eyebrow,
  Kicker,
  Layers,
  MONO,
  PrimaryButton,
  SECTION,
  SectionHead,
  Tick,
} from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/* ── Where It Applies ── */

const HOME_HEALTH = [
  "OASIS SOC",
  "Skilled Nursing",
  "PT",
  "OT",
  "ST",
  "Plan of Care",
  "Visit Documentation",
];

const HOSPICE = [
  "HOPE",
  "RN / SN Documentation",
  "Chaplain Notes",
  "Social Worker Notes",
  "Hospice Aide Notes",
  "IDG Documentation",
];

export function WhereItApplies() {
  return (
    <section className={cn("border-t border-grey-mid", SECTION)}>
      <div className={CONTAINER}>
        <Kicker>Where It Applies</Kicker>
        <SectionHead>{"Maria's caseload has both. So does the software."}</SectionHead>

        <Reveal>
          <div className="grid grid-cols-2 divide-x divide-grey-mid overflow-hidden rounded-panel border border-grey-mid bg-white shadow-[0_16px_40px_rgba(15,29,84,.06)] max-720:grid-cols-1 max-720:divide-x-0 max-720:divide-y">
            <ChipColumn title="Home Health" chips={HOME_HEALTH} />
            <ChipColumn title="Hospice" chips={HOSPICE} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ChipColumn({ title, chips }: { title: string; chips: string[] }) {
  return (
    <div className="min-w-0 p-7 max-600:p-5">
      <h4
        className={cn(
          MONO,
          "mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.07em] text-ink-muted",
        )}
      >
        <span className="size-1.5 rounded-full bg-brand" aria-hidden />
        {title}
      </h4>

      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-grey-mid bg-grey-bg px-[13px] py-1.5 text-[13px] font-semibold text-ink transition-colors duration-200 hover:border-brand-pale hover:bg-brand-tint hover:text-brand-dark"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Outcomes strip ── */

type Outcome = { title: string; sub: string; icon: "clock" | "tick" | "layers" | "shield" | "info" | "bolt" };

const OUTCOMES: Outcome[] = [
  { title: "Less Time Documenting", sub: "One encounter, every note type", icon: "clock" },
  { title: "Faster Chart Completion", sub: "Same-day review and sign-off", icon: "tick" },
  { title: "More Clinician Capacity", sub: "Less after-hours charting", icon: "layers" },
  { title: "Consistent Documentation", sub: "Structured, standardized output", icon: "shield" },
  { title: "Ready For Review", sub: "Nothing auto-signs without a clinician", icon: "info" },
  {
    title: "Nothing Falls Through the Cracks",
    sub: "Wounds, meds & GG items captured in the moment",
    icon: "bolt",
  },
];

function OutcomeIcon({ icon }: { icon: Outcome["icon"] }) {
  const shared = { viewBox: "0 0 24 24", fill: "none", className: "size-7 text-white" };

  if (icon === "clock") {
    return (
      <svg {...shared} aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="1.6" />
        <path d="M12 7v5l3.5 2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "layers") return <Layers className="size-7 text-white" />;

  if (icon === "shield") {
    return (
      <svg {...shared} aria-hidden>
        <path
          d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z"
          stroke="#fff"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="m9 12 2 2 4-4"
          stroke="#fff"
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
        <path d="M12 8v5M12 16h.01" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="1.6" />
      </svg>
    );
  }

  if (icon === "bolt") {
    return (
      <svg {...shared} aria-hidden>
        <path
          d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
          stroke="#fff"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return <Tick className="size-7 text-white" />;
}

export function Outcomes() {
  return (
    <section className="bg-brand py-14">
      <div className={CONTAINER}>
        <div className="mx-auto mb-10 max-w-[640px] text-center text-grey-bg">
          <h2 className="mb-2.5 type-h2 text-white">
            What agencies get back.
          </h2>
          <p className="text-[16px] text-white/[0.68]">
            Qualitative outcomes, based on how the workflow changes - not
            projected statistics.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-tile bg-white/[0.16] max-720:grid-cols-2">
          {OUTCOMES.map((outcome) => (
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

/* ── EHR integration ── */

export function EhrIntegration() {
  return (
    <section id="ehr" className={SECTION}>
      <Reveal>
        <div className="mx-auto max-w-[1156px] rounded-panel bg-tint px-12 py-14 max-720:mx-5 max-720:px-6 max-720:py-10">
          <div className="grid grid-cols-[0.88fr_1.12fr] items-center gap-14 max-1080:grid-cols-1 max-1080:gap-10">
            <div className="min-w-0">
              <Eyebrow>EHR Integration</Eyebrow>

              <h2 className="mt-4 type-h2 text-ink">
                Works with the EHR you already use.
              </h2>

              <p className="mt-4 max-w-[52ch] text-[18px] leading-[1.6] text-grey-500">
                Murphi fetches, structures and writes back - your team keeps
                working inside the EHR they already know.
              </p>

              <p className="mt-5 text-[13px] leading-[1.6] text-ink-muted">
                No manual PDF export required where integration is available.
                Manual upload is also supported.
              </p>
            </div>

            <div className="min-w-0">
              <IntegrationPanel />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* The five stages Murphi runs, then the step that returns the chart. */
const PIPELINE = ["Fetch", "Analyze", "Automate", "Generate", "Human Review"];
const RETURN_STEP = "Write Back";

/**
 * The integration surface: the chart leaves the EHR, moves through Murphi's
 * pipeline, and is written back into the same system. Vertical so the
 * direction of travel is unmistakable, and so it stacks without redrawing.
 */
function IntegrationPanel() {
  return (
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

        <Link direction="down" />

        {/* Murphi's processing area. */}
        <div className="mx-auto w-full max-w-[300px] rounded-tile border border-brand-pale bg-white px-4 py-4 shadow-[0_10px_26px_-16px_rgba(15,29,84,.5)] max-600:px-3.5">
          <div className="flex items-center justify-center gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-[9px] border border-grey-mid bg-white p-1.5">
              <Image
                src="/brand/app-icons/murphi-icon-192.png"
                alt="Murphi.ai"
                width={192}
                height={192}
                className="size-full object-contain"
              />
            </span>
            <span className="text-[13px] font-bold leading-none tracking-[-0.015em] text-ink">
              Murphi AI
            </span>
          </div>

          <ol className="mx-auto mt-4 grid w-fit gap-0">
            {PIPELINE.map((step, i) => (
              <li key={step} className="flex items-stretch gap-3">
                <div className="relative flex w-[9px] shrink-0 justify-center" aria-hidden>
                  <span className="relative z-10 mt-[7px] size-[7px] shrink-0 rounded-full border-2 border-brand bg-white" />
                  {i === PIPELINE.length - 1 ? null : (
                    <span className="absolute left-1/2 top-[13px] h-[calc(100%-6px)] w-px -translate-x-1/2 bg-brand-pale" />
                  )}
                </div>

                <span
                  className={cn(
                    MONO,
                    "min-w-0 truncate pb-2.5 text-[12px] text-grey-500",
                    i === PIPELINE.length - 1 ? "pb-0" : "",
                  )}
                >
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <Link direction="down" label={RETURN_STEP} />

        <SystemNode label="EHR" returned />
      </div>
    </div>
  );
}

/** One end of the round trip - the customer's own system. */
function SystemNode({ label, returned }: { label: string; returned?: boolean }) {
  return (
    <div className="mx-auto flex w-full max-w-[300px] flex-col items-center gap-2 rounded-tile bg-brand px-5 py-4 shadow-[0_12px_28px_-14px_rgba(0,106,214,.7)]">
      <span className="flex items-center gap-2.5">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-[8px] bg-white/15 text-white">
          <Icon name="server" width={14} height={14} />
        </span>

        <span className="text-[15px] font-bold leading-none tracking-[-0.015em] text-white">
          {label}
        </span>
      </span>

      <span
        className={cn(
          MONO,
          "flex items-center gap-1.5 text-[10px] uppercase tracking-[0.07em] text-white/70",
        )}
      >
        {returned ? (
          <Tick className="size-3 shrink-0 text-white" />
        ) : (
          <span
            className="size-1.5 rounded-full bg-white/80"
            style={{ animation: "mp-blink 2s ease-in-out infinite" }}
            aria-hidden
          />
        )}
      </span>
    </div>
  );
}

/** The run between two surfaces, with the chart moving along it. */
function Link({ direction, label }: { direction: "down"; label?: string }) {
  void direction;

  return (
    <div className="flex flex-col items-center gap-2 py-3" aria-hidden>
      <span className="relative flex h-7 w-px shrink-0 bg-brand-pale">
        <span
          className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-brand"
          style={{ animation: "mp-flow-pulse-v 2.6s ease-in-out infinite" }}
        />
      </span>

      {label ? (
        <>
          <span
            className={cn(
              MONO,
              "rounded-full border border-brand-pale bg-brand-tint px-3 py-1 text-[11px] uppercase tracking-[0.05em] text-brand-dark",
            )}
          >
            {label}
          </span>
          <span className="relative flex h-7 w-px shrink-0 bg-brand-pale">
            <span
              className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-brand"
              style={{ animation: "mp-flow-pulse-v 2.6s ease-in-out infinite .6s" }}
            />
          </span>
        </>
      ) : null}
    </div>
  );
}

/* ── Final CTA ── */

export function FinalCta() {
  return (
    <section className={SECTION}>
      <Reveal>
        <div className="relative mx-auto max-w-[1156px] overflow-hidden rounded-panel bg-brand px-[60px] py-[72px] text-center max-720:mx-5 max-720:px-6 max-720:py-10">
          <h2 className="mb-3.5 type-h2 text-grey-bg">
            {"Give Your Team's Evenings Back."}
          </h2>
          <p className="mb-[34px] text-[17px] leading-[1.6] text-white/[0.65]">
            See how Murphi turns a visit - or a short dictation - into a
            finished, signed note.
          </p>
          <div className="flex justify-center">
            <PrimaryButton
              href="/contact-us/"
              className="bg-white text-ink hover:bg-white hover:text-ink hover:shadow-[0_8px_20px_rgba(15,29,84,.24)]"
            >
              Request Demo
              <ArrowGlyph />
            </PrimaryButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
