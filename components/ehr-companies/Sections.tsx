import { Icon, type IconName } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import { MONO, Tick } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * The static sections of the EHR Companies page.
 *
 * The page previously reached for the same four-across card grid three times.
 * Each section now takes the shape its own content asks for: the pillars as one
 * divided band, the roadmap as phases that visibly widen as the platform is
 * adopted, and the governance list as a specification rather than a wall of
 * cards.
 *
 * Every string is the one the page already carried.
 */

/* ── The four pillars, as one divided band ───────────────────── */

const PILLAR_ICONS: Record<string, IconName> = {
  "Embedded and White-Labeled": "layers",
  "API-Driven Integration": "code",
  "Human-in-the-Loop": "community",
  "Enterprise AI Infrastructure": "server",
};

export function Pillars({
  pillars,
}: {
  pillars: { title: string; body: string }[];
}) {
  return (
    <Reveal>
      <div className="grid grid-cols-4 gap-px overflow-hidden rounded-[10px] border border-[#E3E3E3] bg-[#E3E3E3] shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)] max-1080:grid-cols-2 max-600:grid-cols-1">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="bg-white px-6 py-7 max-600:px-5">
            <span
              className="mb-4 flex size-9 items-center justify-center rounded-[10px] border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]"
              aria-hidden
            >
              <Icon name={PILLAR_ICONS[pillar.title] ?? "layers"} width={17} height={17} />
            </span>

            <h4 className="text-[15.5px] font-bold leading-snug tracking-[-0.015em] text-ink">
              {pillar.title}
            </h4>
            <p className="mt-2 text-[13px] leading-[1.6] text-[#606060]">
              {pillar.body}
            </p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/* ── The roadmap, as phases that widen as adoption grows ─────── */

/* Static so Tailwind emits them: the bar is a reading cue for "start with one
   workflow, expand from there", not a measurement of anything. */
const SPREAD = ["w-1/4", "w-2/4", "w-3/4", "w-full"];

export function Roadmap({
  phases,
}: {
  phases: { num: string; title: string; body: string }[];
}) {
  return (
    <Reveal>
      <ol className="overflow-hidden rounded-[10px] border border-[#E3E3E3] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)]">
        {phases.map((phase, i) => {
          const last = i === phases.length - 1;

          return (
            <li
              key={phase.num}
              className={cn(
                "grid grid-cols-[auto_minmax(0,0.5fr)_minmax(0,1fr)] items-center gap-7 px-7 py-6 max-900:grid-cols-[auto_1fr] max-900:gap-x-5 max-900:gap-y-2.5 max-600:px-5",
                last ? "" : "border-b border-[#E3E3E3]",
              )}
            >
              <span className="relative flex w-9 shrink-0 justify-center self-stretch">
                <span
                  className={cn(
                    MONO,
                    "relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border border-[#E3E3E3] bg-[#F5F5F5] text-[11px] font-bold text-[#007EFF]",
                  )}
                >
                  {phase.num}
                </span>
                {last ? null : (
                  <span
                    className="absolute top-9 -bottom-6 left-1/2 w-px -translate-x-1/2 bg-[#007EFF]"
                    aria-hidden
                  />
                )}
              </span>

              <span className="min-w-0">
                <span className="block text-[16px] font-bold leading-snug tracking-[-0.015em] text-ink">
                  {phase.title}
                </span>

                {/* How much of the platform is live by this phase. */}
                <span
                  className="mt-3 flex h-1.5 w-full overflow-hidden rounded-full bg-[#E3E3E3] max-900:hidden"
                  aria-hidden
                >
                  <span className={cn("h-full rounded-full bg-[#007EFF]", SPREAD[i] ?? "w-full")} />
                </span>
              </span>

              <span className="min-w-0 text-[14px] leading-[1.65] text-[#606060] max-900:col-start-2">
                {phase.body}
              </span>
            </li>
          );
        })}
      </ol>
    </Reveal>
  );
}

/* ── Security and governance, as a specification ─────────────── */

export function SecuritySpecs({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  return (
    <Reveal>
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[10px] border border-[#E3E3E3] bg-[#E3E3E3] shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)] max-720:grid-cols-1">
        {items.map((item) => (
          <li
            key={item.title}
            className="flex items-start gap-3.5 bg-white px-7 py-[22px] max-600:gap-3 max-600:px-5"
          >
            <span
              className="mt-px flex size-6 shrink-0 items-center justify-center rounded-full border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]"
              aria-hidden
            >
              <Tick className="size-3" />
            </span>

            <span className="min-w-0">
              <span className="block text-[14.5px] font-bold leading-snug tracking-[-0.012em] text-ink">
                {item.title}
              </span>
              <span className="mt-1.5 block text-[13px] leading-[1.6] text-[#606060]">
                {item.body}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

/* ── Feature tokens, for the explorer panels ─────────────────── */

export function FeatureTiles({
  features,
  extra,
}: {
  features: string[];
  /** The one entry that carries its own badge. */
  extra?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {features.map((feature) => (
        <span
          key={feature}
          className="flex items-center gap-2.5 rounded-[8px] border border-[#E3E3E3] bg-white px-3.5 py-2.5"
        >
          <span
            className="flex size-5 shrink-0 items-center justify-center rounded-[6px] border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]"
            aria-hidden
          >
            <Tick className="size-2.5" />
          </span>
          <span className="text-[13.5px] font-semibold tracking-[-0.01em] text-ink">
            {feature}
          </span>
        </span>
      ))}

      {extra}
    </div>
  );
}
