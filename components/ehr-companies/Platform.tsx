import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { MONO, Tick } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * The page's product vocabulary: a platform, seen in cross-section.
 *
 * Everything this page argues is about layers - what the clinician sees, what
 * orchestrates it, what moves the data, what governs it - so its parts are
 * surfaces that sit inside other surfaces rather than the stacks and rails the
 * module pages use. The hero's Murphi panel is literally inset within the EHR
 * environment, because that is the product's whole proposition.
 *
 * Nothing here introduces copy. Labels passed in are strings the page already
 * carries; every state is a chip, a rule or a tick.
 */

/** The host environment: a titled product window with a head, body and foot. */
export function Environment({
  label,
  status,
  foot,
  children,
}: {
  label: ReactNode;
  status?: string;
  foot?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#E3E3E3] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between gap-3 bg-[#007EFF] px-5 py-3 max-720:px-4">
        <span
          className={cn(
            MONO,
            "flex min-w-0 items-center gap-2 truncate text-[11px] uppercase tracking-[0.06em] text-white/90",
          )}
        >
          {label}
        </span>

        {status ? (
          <span
            className={cn(
              MONO,
              "flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.04em] text-white",
            )}
          >
            <span
              className="size-1.5 rounded-full bg-white"
              style={{ animation: "mp-blink 1.6s ease-in-out infinite" }}
              aria-hidden
            />
            {status}
          </span>
        ) : null}
      </div>

      <div className="px-5 py-5 max-720:px-4">{children}</div>

      {foot ? (
        <div
          className={cn(
            MONO,
            "flex flex-wrap items-center justify-between gap-2 border-t border-[#E3E3E3] bg-[#F5F5F5] px-5 py-3 text-[11px] text-black max-720:px-4",
          )}
        >
          {foot}
        </div>
      ) : null}
    </div>
  );
}

/** What goes in, or what comes back out - a single labelled strip. */
export function FlowStrip({
  children,
  tone = "in",
}: {
  children: ReactNode;
  tone?: "in" | "out";
}) {
  const out = tone === "out";

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-[8px] border px-3.5 py-2.5",
        out ? "border-[#E3E3E3] bg-[#F5F5F5]" : "border-[#E3E3E3] bg-[#F5F5F5]",
      )}
    >
      <span
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-[6px]",
          out ? "bg-[#007EFF] text-white" : "border border-[#E3E3E3] bg-white text-[#007EFF]",
        )}
        aria-hidden
      >
        {out ? <Tick className="size-3" /> : <Icon name="server" width={10} height={10} />}
      </span>
      <span className={cn(MONO, "min-w-0 text-[11px] leading-[1.4] text-ink")}>
        {children}
      </span>
    </div>
  );
}

/**
 * Murphi, inset inside the host. The tabs on either edge are the point: this is
 * a component seated in the environment, not a second card beside it.
 */
export function InsetLayer({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="relative mx-3 rounded-[8px] border border-[#E3E3E3] bg-[#F5F5F5] px-4 py-4 max-600:mx-0 max-600:px-3">
      {/* The seating tabs, left and right. */}
      <span
        className="absolute top-1/2 -left-1 size-2 -translate-y-1/2 rounded-[3px] bg-[#007EFF] max-600:hidden"
        aria-hidden
      />
      <span
        className="absolute top-1/2 -right-1 size-2 -translate-y-1/2 rounded-[3px] bg-[#007EFF] max-600:hidden"
        aria-hidden
      />

      <div
        className={cn(
          MONO,
          "mb-3.5 text-center text-[11px] uppercase tracking-[0.05em] text-[#878787]",
        )}
      >
        {label}
      </div>

      {children}
    </div>
  );
}

/** One capability the layer provides. */
export const MODULE_ICONS: Record<string, IconName> = {
  "Ambient AI": "pulse",
  "Voice-to-Text": "mic",
  "Doc. Intelligence": "doc",
  "Clinical Validation": "sealcheck",
  "Compliance Review": "shield",
  "Workflow Automation": "route",
};

export function ModuleTile({ name, index = 0 }: { name: string; index?: number }) {
  return (
    <span
      className="flex flex-col items-center gap-2 rounded-[10px] border border-[#E3E3E3] bg-white px-2 py-3 text-center"
      style={{ animation: `mp-fade-up .45s ease backwards ${0.12 + index * 0.06}s` }}
    >
      <span
        className="flex size-6 shrink-0 items-center justify-center rounded-[7px] border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]"
        aria-hidden
      >
        <Icon name={MODULE_ICONS[name] ?? "layers"} width={12} height={12} />
      </span>
      <span
        className={cn(MONO, "text-[10.5px] leading-[1.25] font-semibold text-ink")}
      >
        {name}
      </span>
    </span>
  );
}

/** The run between two surfaces, with data moving down it. */
export function Connector({ delay = "0s" }: { delay?: string }) {
  return (
    <div className="flex justify-center py-3" aria-hidden>
      <span className="relative flex h-6 w-px shrink-0 bg-[#E3E3E3]">
        <span
          className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[#007EFF] motion-reduce:hidden"
          style={{ animation: `mp-flow-pulse-v 2.8s ease-in-out infinite ${delay}` }}
        />
      </span>
    </div>
  );
}
