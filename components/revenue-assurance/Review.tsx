import Image from "next/image";
import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { MONO, Tick } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * The page's product vocabulary: a chart under review.
 *
 * Revenue Assurance was drawn with the same generic parts as every other
 * module page - one bordered card in the hero, two bullet cards for the
 * comparison, five circles for the workflow - so the page never showed the
 * thing it sells: a chart being read, findings surfacing, a reviewer clearing
 * them, the result going back. These primitives give it that language.
 *
 * Nothing here introduces copy. Labels passed in are strings the page already
 * carries; every state is a dot, a rule, a tick or a bar, never a new word.
 */

/** A titled product window: head rule, body, optional foot. */
export function Surface({
  label,
  status,
  tone = "plain",
  live,
  quiet,
  foot,
  children,
  className,
}: {
  label: ReactNode;
  status?: string;
  /** `brand` for the review itself, `plain` for supporting surfaces. */
  tone?: "brand" | "plain";
  live?: boolean;
  /** Tighter, and still: the status dot stops blinking and the live ring
      stops pulsing. Used by the hero, where the surface should read as
      product state rather than perform. */
  quiet?: boolean;
  foot?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const onBrand = tone === "brand";

  return (
    <div
        className={cn(
          "overflow-hidden rounded-[8px] border border-[#E3E3E3] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)]",
          className,
        )}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-3 px-5 max-720:px-4",
          quiet ? "py-2.5" : "py-3",
          onBrand ? "bg-[#007EFF]" : "border-b border-[#E3E3E3] bg-[#F5F5F5]",
        )}
      >
        <span
          className={cn(
            MONO,
            "flex min-w-0 items-center gap-2 truncate ra-mono text-[11px] uppercase tracking-[0.06em]",
            onBrand ? "text-[#F5F5F5]" : "text-[#878787]",
          )}
        >
          {label}
        </span>

        {status ? (
          <span
            className={cn(
              MONO,
              "flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 ra-mono text-[10.5px] font-semibold tracking-[0.04em] uppercase",
              onBrand
                ? "bg-white/15 text-white"
                : "border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]",
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                onBrand ? "bg-white" : "bg-[#007EFF]",
              )}
              style={quiet ? undefined : { animation: "mp-blink 1.6s ease-in-out infinite" }}
              aria-hidden
            />
            {status}
          </span>
        ) : (
          <span className="flex shrink-0 items-center" aria-hidden>
            {live ? (
              <span className="relative flex size-1.5">
                <span
                  className={cn(
                    "absolute inline-flex size-full rounded-full",
                    onBrand ? "bg-white/60" : "bg-[#007EFF]/60",
                  )}
                  style={quiet ? undefined : { animation: "mp-glow 2.4s ease-in-out infinite" }}
                />
                <span
                  className={cn(
                    "relative inline-flex size-1.5 rounded-full",
                    onBrand ? "bg-white" : "bg-[#007EFF]",
                  )}
                />
              </span>
            ) : (
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  onBrand ? "bg-white/50" : "bg-[#E3E3E3]",
                )}
              />
            )}
          </span>
        )}
      </div>

      <div className={cn("px-5 max-720:px-4", quiet ? "py-3.5" : "py-[18px]")}>
        {children}
      </div>

      {foot ? (
        <div className="border-t border-[#E3E3E3] bg-[#F5F5F5] px-5 py-2.5 max-720:px-4">
          {foot}
        </div>
      ) : null}
    </div>
  );
}

/**
 * One finding, as the product would list it: severity on the left, the finding
 * and where it came from in the middle, its state on the right.
 */
export function Finding({
  tone,
  title,
  meta,
}: {
  tone: "flag" | "opportunity";
  title: string;
  meta: string;
}) {
  const flag = tone === "flag";

  return (
    <li
      className="flex items-start gap-3 border-b border-[#E3E3E3] py-2.5 last:border-b-0 max-600:gap-2.5">
      <span
        className={cn(
          "mt-px flex size-7 shrink-0 items-center justify-center rounded-[8px] border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]",
        )}
        aria-hidden
      >
        <Icon name={flag ? "shield" : "chartup"} width={13} height={13} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[13px] leading-[1.4] font-semibold text-ink">
          {title}
        </span>
        <span className={cn(MONO, "ra-mono mt-0.5 block text-[11px] text-[#878787]")}>
          {meta}
        </span>
      </span>

      <span
        className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border border-[#E3E3E3] text-[#B2B2B2]"
        aria-hidden
      >
        <Icon name="chevron" width={11} height={11} className="-rotate-90" />
      </span>
    </li>
  );
}

/** The review running: a solid marker travelling a recessed track. */
export function ScanBar({
  rows = 3,
  quiet,
}: {
  rows?: number;
  /** Settled rather than sweeping: each row shows how far it got and stays
      there, so the surface states progress instead of animating it. */
  quiet?: boolean;
}) {
  /* Where each row rests when still - filled, most of the way, nearly done. */
  const REST = ["82%", "64%", "45%"];

  return (
    <div className={cn("flex flex-col", quiet ? "gap-1.5" : "gap-2")} aria-hidden>
      {Array.from({ length: rows }, (_, i) => (
        <span
          key={i}
          className="relative h-1.5 w-full overflow-hidden rounded-full bg-[#F5F5F5]"
        >
          <span
            className={cn(
              "absolute inset-y-0 left-0 rounded-full bg-[#007EFF]/70",
              quiet ? "" : "w-1/3",
            )}
            style={
              quiet
                ? { width: REST[i % REST.length] }
                : { animation: `mp-sweep 2.4s ease-in-out infinite ${i * 0.28}s` }
            }
          />
        </span>
      ))}
    </div>
  );
}

/** A short row of state pips - how far through a stage the product is. */
export function Pips({ total, done }: { total: number; done: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 rounded-full transition-colors duration-300",
            i < done ? "w-6 bg-[#007EFF]" : "w-3 bg-[#E3E3E3]",
          )}
        />
      ))}
    </div>
  );
}

/** One end of the round trip - the customer's own system, on #007EFF. */
export function SystemNode({
  label,
  returned,
  compact,
}: {
  label: string;
  returned?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-col items-center gap-2 rounded-[8px] bg-[#007EFF]",
        compact ? "max-w-[220px] px-4 py-3" : "max-w-[300px] px-5 py-4",
      )}
    >
      <span className="flex items-center gap-2.5">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-[8px] bg-white/15 text-white">
          <Icon name="server" width={14} height={14} />
        </span>

        {/* Size first: tailwind-merge treats an arbitrary text-[..] as a
            font-size, which drops a later leading-* from the same string. */}
        <span
          className={cn(
            compact
              ? "text-[13px] font-bold leading-none tracking-[-0.015em] text-[#F5F5F5]"
              : "text-[15px] font-bold leading-none tracking-[-0.015em] text-[#F5F5F5]",
          )}
        >
          {label}
        </span>
      </span>

      <span className={cn(MONO, "flex items-center gap-1.5")}>
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

/** Murphi's own processing surface, with whatever stages it is running. */
export function MurphiNode({
  stages,
  compact,
}: {
  stages: string[];
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full rounded-[8px] border border-[#E3E3E3] bg-white",
        compact ? "max-w-[220px] px-3.5 py-3" : "max-w-[300px] px-4 py-4 max-600:px-3.5",
      )}
    >
      <div className="flex items-center justify-center gap-2.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-[8px] border border-[#E3E3E3] bg-white p-1.5">
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
        {stages.map((stage, i) => (
          <li key={stage} className="flex items-stretch gap-3">
            <div className="relative flex w-[9px] shrink-0 justify-center" aria-hidden>
              <span className="relative z-10 mt-[7px] size-[7px] shrink-0 rounded-full border-2 border-[#007EFF] bg-white" />
              {i === stages.length - 1 ? null : (
                <span className="absolute top-[13px] left-1/2 h-[calc(100%-6px)] w-px -translate-x-1/2 bg-[#E3E3E3]" />
              )}
            </div>

            <span
              className={cn(
                MONO,
                "min-w-0 truncate ra-mono text-[12px] text-[#606060]",
                i === stages.length - 1 ? "pb-0" : "pb-2.5",
              )}
            >
              {stage}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** The run between two surfaces, with the chart moving along it. */
export function Run({
  label,
  short,
  quiet,
}: {
  label?: string;
  short?: boolean;
  /** The shortest stem, with no travelling marker. */
  quiet?: boolean;
}) {
  const stem = quiet ? "h-3.5" : short ? "h-5" : "h-7";
  const pad = quiet ? "py-1.5" : short ? "py-2" : "py-3";

  return (
    <div
      className={cn("flex flex-col items-center", quiet ? "gap-1.5" : "gap-2", pad)}
      aria-hidden
    >
      <span className={cn("relative flex w-px shrink-0 bg-[#E3E3E3]", stem)}>
        {quiet ? null : (
          <span
            className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[#007EFF]"
            style={{ animation: "mp-flow-pulse-v 2.6s ease-in-out infinite" }}
          />
        )}
      </span>

      {label ? (
        <>
          <span
            className={cn(
              "ra-mono rounded-full border border-[#E3E3E3] bg-[#F5F5F5] px-3 py-1 text-center text-[11px] uppercase tracking-[0.05em] text-[#007EFF]",
            )}
          >
            {label}
          </span>
          <span className={cn("relative flex w-px shrink-0 bg-[#E3E3E3]", stem)}>
            {quiet ? null : (
              <span
                className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[#007EFF]"
                style={{ animation: "mp-flow-pulse-v 2.6s ease-in-out infinite .6s" }}
              />
            )}
          </span>
        </>
      ) : null}
    </div>
  );
}
