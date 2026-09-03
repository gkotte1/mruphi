import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { LogoMark } from "@/components/Logo";
import { MONO } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * The page's product vocabulary: one operations layer, many workflows hanging
 * off it.
 *
 * The agency argument is additive — keep the EHR, add a module, add another —
 * so the page is built from a band with modules attached beneath it, rather
 * than the registers, rails and round trips the other pages use. A module is
 * either running or not yet, and the visual never pretends otherwise.
 *
 * Nothing here introduces copy. Labels passed in are strings the page already
 * carries, plus the brand's own name on the band.
 */

export const MODULE_ICONS: Record<string, IconName> = {
  "Clinical Documentation": "doc",
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
        "overflow-hidden rounded-panel border border-grey-mid bg-white shadow-[0_20px_50px_rgba(15,29,84,.08)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-grey-mid bg-grey-soft px-5 py-3 max-720:px-4">
        <span
          className={cn(
            MONO,
            "min-w-0 truncate text-[11px] uppercase tracking-[0.06em] text-ink-muted",
          )}
        >
          {label}
        </span>

        {status ? (
          <span
            className={cn(
              MONO,
              "flex shrink-0 items-center gap-1.5 rounded-full border border-brand-pale bg-brand-tint px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.04em] text-brand-dark",
            )}
          >
            <span
              className="size-1.5 rounded-full bg-brand"
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
    <div className="flex items-center justify-center gap-2.5 rounded-tile border border-brand-pale bg-brand-tint/50 px-4 py-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-[9px] border border-grey-mid bg-white p-1.5">
        <LogoMark size={18} />
      </span>
      <span className="text-[14px] font-bold leading-none tracking-[-0.015em] text-ink">
        {label}
      </span>
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
          lit ? "bg-brand" : "bg-brand-pale",
        )}
      />
    </span>
  );
}

/** One workflow — running, or not yet. */
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
        "flex h-full flex-col gap-2.5 rounded-tile border px-3.5 py-3.5 transition-colors duration-[420ms] ease-out",
        soon
          ? "border-dashed border-grey-mid bg-grey-soft/60"
          : active
            ? "border-brand bg-brand-tint/50"
            : "border-grey-mid bg-white",
      )}
    >
      <span className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-[8px] border transition-colors duration-[420ms] ease-out",
            soon
              ? "border-grey-mid bg-white text-grey-bdr"
              : active
                ? "border-brand bg-brand text-white"
                : "border-brand-pale bg-brand-tint text-brand",
          )}
          aria-hidden
        >
          <Icon name={MODULE_ICONS[name] ?? "layers"} width={13} height={13} />
        </span>

        {soon ? (
          <span
            className={cn(
              MONO,
              "shrink-0 rounded-full border border-grey-mid bg-white px-2 py-0.5 text-[9px] uppercase tracking-[0.06em] text-grey-500",
            )}
          >
            Soon
          </span>
        ) : (
          <span className="relative flex size-1.5 shrink-0" aria-hidden>
            {active ? (
              <span
                className="absolute inline-flex size-full rounded-full bg-brand/60 motion-reduce:hidden"
                style={{ animation: "mp-glow 2.4s ease-in-out infinite" }}
              />
            ) : null}
            <span
              className={cn(
                "relative inline-flex size-1.5 rounded-full transition-colors duration-[420ms] ease-out",
                active ? "bg-brand" : "bg-brand-pale",
              )}
            />
          </span>
        )}
      </span>

      <span
        className={cn(
          "text-[12.5px] leading-[1.3] font-bold tracking-[-0.01em] transition-colors duration-[420ms] ease-out",
          soon ? "text-grey-500" : "text-ink",
        )}
      >
        {name}
      </span>
    </div>
  );
}
