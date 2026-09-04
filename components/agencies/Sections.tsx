import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import {
  CONTAINER,
  Eyebrow,
  MONO,
  SECTION,
  Tick,
} from "@/components/module-page/ui";
import { LayerBand, MODULE_ICONS } from "@/components/agencies/Workflows";
import { cn } from "@/lib/cn";

/**
 * The static sections of the Agencies page.
 *
 * The page reached for the same chip rows and card grid three times. Each
 * section now uses the band-and-tiles language the hero establishes: settings
 * as labelled tile groups, the EHR as the system everything attaches to, and
 * the related modules as tiles that lead somewhere.
 *
 * Every string is the one the page already carried.
 */

/* ── Where you can start ─────────────────────────────────────── */

export function StartSmall({
  groups,
}: {
  groups: { label: string; items: string[]; soon?: string }[];
}) {
  return (
    <Reveal>
      <div className="grid grid-cols-2 overflow-hidden rounded-panel border border-grey-mid bg-white shadow-[0_16px_40px_rgba(15,29,84,.06)] max-720:grid-cols-1">
        {groups.map((group, g) => (
          <div
            key={group.label}
            className={cn(
              "px-7 py-6 max-600:px-5",
              g === 0 ? "border-r border-grey-mid max-720:border-r-0 max-720:border-b" : "",
            )}
          >
            <span
              className={cn(
                MONO,
                "block text-[13px] font-semibold uppercase tracking-[0.05em] text-ink-muted",
              )}
            >
              {group.label}
            </span>

            <div className="mt-4 flex flex-wrap gap-2.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2.5 rounded-tile border border-grey-mid bg-white px-3.5 py-2.5"
                >
                  <span
                    className="flex size-5 shrink-0 items-center justify-center rounded-[6px] border border-brand-pale bg-brand-tint text-brand"
                    aria-hidden
                  >
                    <Tick className="size-2.5" />
                  </span>
                  <span className="text-[13.5px] font-semibold tracking-[-0.01em] text-ink">
                    {item}
                  </span>
                </span>
              ))}

              {group.soon ? (
                <span className="flex items-center gap-2.5 rounded-tile border border-dashed border-grey-mid bg-grey-soft/60 px-3.5 py-2.5">
                  <span className="text-[13.5px] font-semibold tracking-[-0.01em] text-grey-500">
                    {group.soon}
                  </span>
                  <span
                    className={cn(
                      MONO,
                      "rounded-full border border-grey-mid bg-white px-2 py-0.5 text-[9.5px] uppercase tracking-[0.06em] text-grey-500",
                    )}
                  >
                    Soon
                  </span>
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/* ── The modules you can add, as tiles that lead somewhere ───── */

const RELATED_ICONS: Record<string, IconName> = {
  "Ambient AI & Dictation": "mic",
  "Revenue Assurance": "chartup",
  "Patient Payments": "card",
};

export function ModuleLinks({
  cards,
}: {
  cards: { title: string; href: string; body: string }[];
}) {
  return (
    <Reveal>
      <div className="grid grid-cols-3 gap-4 max-900:grid-cols-1">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group flex flex-col rounded-panel border border-grey-mid bg-white px-6 py-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-pale hover:shadow-[0_18px_40px_-24px_rgba(15,29,84,.55)]"
          >
            <span className="flex items-center justify-between gap-3">
              <span
                className="flex size-9 shrink-0 items-center justify-center rounded-[10px] border border-brand-pale bg-brand-tint text-brand transition-colors duration-200 group-hover:border-transparent group-hover:bg-brand group-hover:text-white"
                aria-hidden
              >
                <Icon
                  name={RELATED_ICONS[card.title] ?? MODULE_ICONS[card.title] ?? "layers"}
                  width={17}
                  height={17}
                />
              </span>

              <Icon
                name="arrow"
                width={17}
                height={17}
                className="shrink-0 text-grey-bdr transition-all duration-200 group-hover:translate-x-1 group-hover:text-brand"
              />
            </span>

            <span className="mt-5 block text-[16px] font-bold leading-snug tracking-[-0.015em] text-ink">
              {card.title}
            </span>
            <span className="mt-2 block text-[13px] leading-[1.6] text-grey-500">
              {card.body}
            </span>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}

/* ── The EHR you keep, and what attaches to it ───────────────── */

export function EhrLayer({
  heading,
  lede,
  panelLabel,
  bandLabel,
  steps,
}: {
  heading: string;
  lede: string;
  /** The mono label the section already carries over its diagram. */
  panelLabel: string;
  bandLabel: string;
  steps: string[];
}) {
  return (
    <section id="ehr" className={SECTION}>
      <Reveal>
        <div className="mx-auto max-w-[1156px] rounded-panel bg-grey-bg px-12 py-14 max-720:mx-5 max-720:px-6 max-720:py-10">
          <div className="grid grid-cols-[0.9fr_1.1fr] items-center gap-14 max-1080:grid-cols-1 max-1080:gap-10">
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
                    "flex items-center justify-between gap-3 border-b border-grey-mid bg-grey-soft px-5 py-3 max-600:px-4",
                  )}
                >
                  <span className="min-w-0 truncate text-[11px] uppercase tracking-[0.06em] text-ink-muted">
                    {panelLabel}
                  </span>
                  <span className="relative flex size-1.5 shrink-0" aria-hidden>
                    <span
                      className="absolute inline-flex size-full rounded-full bg-brand/60 motion-reduce:hidden"
                      style={{ animation: "mp-glow 2.4s ease-in-out infinite" }}
                    />
                    <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
                  </span>
                </div>

                <div className="px-5 py-5 max-600:px-4">
                  {/* The system the agency keeps. */}
                  <LayerBand label={bandLabel} />

                  <div className="grid grid-cols-3 max-600:grid-cols-2">
                    {steps.map((step) => (
                      <span key={step} className="flex justify-center" aria-hidden>
                        <span className="h-5 w-px bg-brand-pale" />
                      </span>
                    ))}
                  </div>

                  {/* What Murphi runs against it - the last step returns. */}
                  <ol className="grid grid-cols-3 gap-2.5 max-600:grid-cols-2">
                    {steps.map((step, i) => {
                      const returns = i === steps.length - 1;

                      return (
                        <li
                          key={step}
                          className={cn(
                            "flex items-center gap-2 rounded-tile border px-3 py-2.5",
                            returns
                              ? "border-brand bg-brand text-white"
                              : "border-grey-mid bg-white",
                          )}
                        >
                          <span
                            className={cn(
                              "flex size-5 shrink-0 items-center justify-center rounded-[6px]",
                              returns
                                ? "bg-white/20 text-white"
                                : "border border-brand-pale bg-brand-tint text-brand",
                            )}
                            aria-hidden
                          >
                            <Tick className="size-2.5" />
                          </span>
                          <span
                            className={cn(
                              MONO,
                              "min-w-0 truncate text-[11.5px] font-semibold",
                              returns ? "text-white" : "text-ink",
                            )}
                          >
                            {step}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ── A centred head, for the stories section ─────────────────── */

export function StoriesHead({ heading }: { heading: string }) {
  return (
    <div className={cn(CONTAINER, "mb-14 text-center max-720:mb-10")}>
      <h2 className="mx-auto max-w-[640px] type-h2 text-ink">{heading}</h2>
    </div>
  );
}
