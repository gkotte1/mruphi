import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { LogoMark } from "@/components/Logo";
import { MONO } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * The page's product vocabulary: one operations layer, many workflows hanging
 * off it.
 *
 * The agency argument is additive - keep the EHR, add a module, add another  - 
 * so the page is built from a band with modules attached beneath it, rather
 * than the registers, rails and round trips the other pages use. A module is
 * either running or not yet, and the visual never pretends otherwise.
 *
 * Nothing here introduces copy. Labels passed in are strings the page already
 * carries, plus the brand's own name on the band.
 */

export const MODULE_ICONS: Record<string, IconName> = {
  "Clinical Documentation": "doc",
  "Ambient AI & Dictation": "doc",
  "Revenue Assurance": "chartup",
  "Patient Engagement": "community",
  "Patient Payments": "card",
  "Referral / Intake": "route",
  "AI-Driven RCM": "exchange",
};

/** A titled product window. */
export function Surface({
  label,
  status,
  children,
  className,
}: {
  label: string;
  status?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[10px] border border-[#E3E3E3] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-[#E3E3E3] bg-[#F5F5F5] px-5 py-3 max-720:px-4">
        <span
          className={cn(
            MONO,
            "min-w-0 truncate text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#878787]",
          )}
        >
          {label}
        </span>

        {status ? (
          <span
            className={cn(
              MONO,
              "flex shrink-0 items-center gap-1.5 rounded-full border border-[#E3E3E3] bg-[#F5F5F5] px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.04em] text-[#007EFF]",
            )}
          >
            <span
              className="size-1.5 rounded-full bg-[#007EFF]"
              style={{ animation: "mp-blink 1.6s ease-in-out infinite" }}
              aria-hidden
            />
            {status}
          </span>
        ) : null}
      </div>

      <div className="px-5 py-5 max-720:px-4">{children}</div>
    </div>
  );
}

/** The layer the workflows attach to. */
export function LayerBand({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2.5 rounded-[8px] border border-[#E3E3E3] bg-[#F5F5F5] px-4 py-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-[9px] border border-[#E3E3E3] bg-white p-1.5">
        <LogoMark size={18} />
      </span>
      <span className="type-hl-inbox-title text-ink">{label}</span>
    </div>
  );
}

/**
 * The short run from the layer down to a module. It lights when that module is
 * the one being highlighted.
 */
export function Stem({ lit }: { lit: boolean }) {
  return (
    <span className="flex justify-center" aria-hidden>
      <span
        className={cn(
          "h-5 w-px transition-colors duration-[420ms] ease-out",
          lit ? "bg-[#007EFF]" : "bg-[#E3E3E3]",
        )}
      />
    </span>
  );
}

/** One workflow - running, or not yet. */
export function ModuleTile({
  name,
  soon,
  active,
}: {
  name: string;
  soon?: boolean;
  /** Whether this is the workflow currently being highlighted. */
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-2.5 rounded-[8px] border px-3.5 py-3.5 transition-colors duration-[420ms] ease-out",
        soon
          ? "border-dashed border-[#E3E3E3] bg-[#F5F5F5]"
          : active
            ? "border-[#007EFF] bg-[#F5F5F5]"
            : "border-[#E3E3E3] bg-white",
      )}
    >
      <span className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-[8px] border transition-colors duration-[420ms] ease-out",
            soon
              ? "border-[#E3E3E3] bg-white text-[#B2B2B2]"
              : active
                ? "border-[#007EFF] bg-[#007EFF] text-white"
                : "border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]",
          )}
          aria-hidden
        >
          <Icon name={MODULE_ICONS[name] ?? "layers"} width={13} height={13} />
        </span>

        {soon ? (
          <span
            className={cn(
              MONO,
              "shrink-0 rounded-full border border-[#E3E3E3] bg-white px-2 py-0.5 text-[9px] uppercase tracking-[0.06em] text-[#606060]",
            )}
          >
            Soon
          </span>
        ) : (
          <span className="relative flex size-1.5 shrink-0" aria-hidden>
            {active ? (
              <span
                className="absolute inline-flex size-full rounded-full bg-[#007EFF]/60 motion-reduce:hidden"
                style={{ animation: "mp-glow 2.4s ease-in-out infinite" }}
              />
            ) : null}
            <span
              className={cn(
                "relative inline-flex size-1.5 rounded-full transition-colors duration-[420ms] ease-out",
                active ? "bg-[#007EFF]" : "bg-[#E3E3E3]",
              )}
            />
          </span>
        )}
      </span>

      <span
        className={cn(
          "type-hl-inbox-title transition-colors duration-[420ms] ease-out",
          soon ? "text-[#606060]" : "text-ink",
        )}
      >
        {name}
      </span>
    </div>
  );
}
