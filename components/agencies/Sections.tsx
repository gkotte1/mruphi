import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import { EhrSplit } from "@/components/inner-page/kit";
import Reveal from "@/components/module-page/Reveal";
import { MONO, Tick } from "@/components/module-page/ui";
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
      <div className="grid grid-cols-2 overflow-hidden rounded-[10px] border border-[#E3E3E3] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)] max-720:grid-cols-1">
        {groups.map((group, g) => (
          <div
            key={group.label}
            className={cn(
              "px-7 py-6 max-600:px-5",
              g === 0 ? "border-r border-[#E3E3E3] max-720:border-r-0 max-720:border-b" : "",
            )}
          >
            <span
              className={cn(
                MONO,
                "block text-[13px] font-semibold uppercase tracking-[0.05em] text-[#878787]",
              )}
            >
              {group.label}
            </span>

            <div className="mt-4">
              {group.label === "Hospice" ? (
                <div className="flex flex-col gap-2.5">
                  {/* HOPE stays on its own row; Chaplain + IDG share one equal row. */}
                  {group.items[0] ? <SettingChip item={group.items[0]} /> : null}
                  <div className="grid grid-cols-2 items-stretch gap-2.5 max-600:grid-cols-1">
                    {group.items.slice(1).map((item) => (
                      <SettingChip key={item} item={item} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <SettingChip key={item} item={item} />
                  ))}

                  {group.soon ? (
                    <span className="flex items-center gap-2.5 rounded-[8px] border border-dashed border-[#E3E3E3] bg-[#F5F5F5] px-3.5 py-2.5">
                      <span className="type-hl-inbox-title text-[#606060]">
                        {group.soon}
                      </span>
                      <span
                        className={cn(
                          MONO,
                          "rounded-full border border-[#E3E3E3] bg-white px-2 py-0.5 text-[9.5px] uppercase tracking-[0.06em] text-[#606060]",
                        )}
                      >
                        Soon
                      </span>
                    </span>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function SettingChip({ item }: { item: string }) {
  return (
    <span className="flex h-full min-w-0 items-center gap-2.5 rounded-[8px] border border-[#E3E3E3] bg-white px-3.5 py-2.5">
      <span
        className="flex size-5 shrink-0 items-center justify-center rounded-[6px] border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]"
        aria-hidden
      >
        <Tick className="size-2.5" />
      </span>
      <span className="type-hl-inbox-title min-w-0 text-ink">
        {item}
      </span>
    </span>
  );
}

/* ── The modules you can add, as tiles that lead somewhere ───── */

const RELATED_ICONS: Record<string, IconName> = {
  "Ambient AI & Dictation": "mic",
  "Revenue Assurance": "chartup",
  "Patient Payments": "card",
  "Patient Engagement": "community",
};

export function ModuleLinks({
  cards,
}: {
  cards: { title: string; href: string; body: string }[];
}) {
  return (
    <Reveal>
      <div className="grid grid-cols-4 gap-4 max-1080:grid-cols-2 max-720:grid-cols-1">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="ip-link-card group flex h-full flex-col rounded-[10px] border border-[#E3E3E3] bg-white px-6 py-6 transition-colors duration-200 hover:border-[#007EFF]"
          >
            <span className="flex items-center justify-between gap-3">
              <span
                className="flex size-9 shrink-0 items-center justify-center rounded-[10px] border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF] transition-colors duration-200 group-hover:border-transparent group-hover:bg-[#007EFF] group-hover:text-white"
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
                className="shrink-0 text-[#B2B2B2] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#007EFF]"
              />
            </span>

            <span className="type-hl-card-title mt-5 block text-ink">
              {card.title}
            </span>
            <span className="type-hl-card-body mt-2 block">
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
    <EhrSplit heading={heading} lede={lede}>
      <div className="overflow-hidden rounded-[10px] border border-[#E3E3E3] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)]">
        <div
          className={cn(
            MONO,
            "flex items-center justify-between gap-3 border-b border-[#E3E3E3] bg-[#F5F5F5] px-5 py-3 max-600:px-4",
          )}
        >
          <span className="min-w-0 truncate text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink">
            {panelLabel}
          </span>
          <span className="relative flex size-1.5 shrink-0" aria-hidden>
            <span
              className="absolute inline-flex size-full rounded-full bg-[#007EFF]/60 motion-reduce:hidden"
              style={{ animation: "mp-glow 2.4s ease-in-out infinite" }}
            />
            <span className="relative inline-flex size-1.5 rounded-full bg-[#007EFF]" />
          </span>
        </div>

        <div className="px-5 py-5 max-600:px-4">
          {/* The system the agency keeps. */}
          <LayerBand label={bandLabel} />

          <div className="grid grid-cols-3 max-600:grid-cols-2">
            {steps.map((step) => (
              <span key={step} className="flex justify-center" aria-hidden>
                <span className="h-5 w-px bg-[#E3E3E3]" />
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
                    "flex items-center gap-2 rounded-[8px] border px-3 py-2.5",
                    returns
                      ? "border-[#007EFF] bg-[#F5F5F5]"
                      : "border-[#E3E3E3] bg-white",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-[6px]",
                      returns
                        ? "bg-white/20 text-[#007EFF]"
                        : "border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]",
                    )}
                    aria-hidden
                  >
                    <Tick className="size-2.5" />
                  </span>
                  <span
                    className={cn(
                      MONO,
                      "min-w-0 truncate text-[11.5px] font-semibold",
                      returns ? "text-ink" : "text-ink",
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
    </EhrSplit>
  );
}

