import Image from "next/image";
import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { MONO, Tick } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * The page's product vocabulary: one balance, followed until it is reconciled.
 *
 * Patient Payments was drawn with the same generic parts as every other module
 * page - one message card over one row of values, a strip of pills, five
 * circles - so a page about a payment never showed the payment being made.
 * These primitives give it the shapes its subject has: the sheet a balance is
 * paid on, and the ledger the result lands in.
 *
 * A PhoneFrame with a black bezel used to live here too, for the hero. The
 * hero is one plain card now, and nothing else drew a phone, so it is gone.
 *
 * Nothing here introduces copy. Labels passed in are strings the page already
 * carries; every state is a dot, a rule or a tick.
 */

/** A titled product window: head rule, body, optional foot. */
export function Surface({
  label,
  status,
  tone = "plain",
  live,
  compact,
  still,
  foot,
  children,
  className,
}: {
  label: ReactNode;
  status?: string;
  /** `brand` for Murphi's own surfaces, `plain` for everything else. */
  tone?: "brand" | "plain";
  live?: boolean;
  /** Hold the status dot steady - for a state that has finished, not one
      that is still running. */
  still?: boolean;
  /** Tighter head and body rules. Used by the hero, where the surfaces are
      stacked and the column has to stay the height of the copy beside it. */
  compact?: boolean;
  foot?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const onBrand = tone === "brand";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[10px] border border-[#E3E3E3] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-3 px-5 max-720:px-4",
          compact ? "py-2.5" : "py-3",
          onBrand ? "bg-[#007EFF]" : "border-b border-[#E3E3E3] bg-[#F5F5F5]",
        )}
      >
        <span
          className={cn(
            MONO,
            "flex min-w-0 items-center gap-2 truncate text-[11px] uppercase tracking-[0.06em]",
            onBrand ? "text-white/90" : "text-[#878787]",
          )}
        >
          {label}
        </span>

        {status ? (
          <span
            className={cn(
              MONO,
              "flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-semibold tracking-[0.04em] uppercase",
              onBrand
                ? "bg-white/15 text-white"
                : "border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]",
            )}
          >
            <span
              className={cn("size-1.5 rounded-full", onBrand ? "bg-white" : "bg-[#007EFF]")}
              /* A settled state should not pulse. */
              style={still ? undefined : { animation: "mp-blink 1.6s ease-in-out infinite" }}
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
                  style={{ animation: "mp-glow 2.4s ease-in-out infinite" }}
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

      <div className={cn("px-5 max-720:px-4", compact ? "py-3.5" : "py-[18px]")}>
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

/** A labelled value, the way a ledger lists one. */
export function Row({
  label,
  value,
  compact,
}: {
  label: string;
  value: ReactNode;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-4 border-b border-[#E3E3E3] last:border-b-0",
        compact ? "py-[7px]" : "py-2.5",
      )}
    >
      <span className={cn(MONO, "shrink-0 text-[11px] text-[#878787]")}>{label}</span>
      <span className="min-w-0 truncate text-right text-[12.5px] font-semibold text-ink">
        {value}
      </span>
    </div>
  );
}

/** The amount, given the weight an amount has in a payment interface. */
export function Amount({
  value,
  caption,
  compact,
}: {
  value: string;
  caption?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-1", compact ? "py-0" : "py-1")}>
      {/* Size first: tailwind-merge reads an arbitrary text-[..] as a
          font-size, which would drop a later leading-* from the string. */}
      <span
        className={
          compact
            ? "text-[26px] font-bold leading-none tracking-[-0.03em] text-ink"
            : "text-[30px] font-bold leading-none tracking-[-0.03em] text-ink"
        }
      >
        {value}
      </span>
      {caption ? (
        <span className={cn(MONO, "text-[10.5px] uppercase tracking-[0.07em] text-[#878787]")}>
          {caption}
        </span>
      ) : null}
    </div>
  );
}

/** One message, on the side it was sent from. */
export function Bubble({
  side,
  children,
}: {
  side: "in" | "out";
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "max-w-[88%] px-[13px] py-2.5 text-[12.5px] leading-[1.45]",
        side === "out"
          ? "ml-auto rounded-[16px] rounded-br-[4px] bg-[#007EFF] text-white"
          : "rounded-[16px] rounded-bl-[4px] border border-[#E3E3E3] bg-[#F5F5F5] text-ink",
      )}
    >
      {children}
    </div>
  );
}

/** One way to pay, selected or offered. */
export function MethodTile({
  name,
  selected,
}: {
  name: string;
  selected?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 rounded-[10px] border px-2.5 py-2 transition-colors duration-200",
        selected
          ? "border-[#007EFF] bg-[#F5F5F5]"
          : "border-[#E3E3E3] bg-[#F5F5F5]",
      )}
    >
      <span
        className={cn(
          "flex size-4 shrink-0 items-center justify-center rounded-full border",
          selected ? "border-[#007EFF] bg-[#007EFF] text-white" : "border-[#B2B2B2] bg-white",
        )}
        aria-hidden
      >
        {selected ? <Tick className="size-2.5" /> : null}
      </span>
      <span
        className={cn(
          MONO,
          "min-w-0 truncate text-[11.5px]",
          selected ? "font-semibold text-ink" : "text-[#606060]",
        )}
      >
        {name}
      </span>
    </span>
  );
}

/** A short row of state pips - how far through the sequence the product is. */
export function Pips({ total, done }: { total: number; done: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 rounded-full transition-all duration-[420ms] ease-out",
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
        "mx-auto flex w-full flex-col items-center gap-2 rounded-[8px] bg-[#007EFF] ",
        compact ? "max-w-[220px] px-4 py-3" : "max-w-[300px] px-5 py-4",
      )}
    >
      <span className="flex items-center gap-2.5">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-[8px] bg-white/15 text-white">
          <Icon name="server" width={14} height={14} />
        </span>

        {/* Size first: tailwind-merge reads an arbitrary text-[..] as a
            font-size, which would drop a later leading-* from the string. */}
        <span
          className={
            compact
              ? "text-[13px] font-bold leading-none tracking-[-0.015em] text-white"
              : "text-[15px] font-bold leading-none tracking-[-0.015em] text-white"
          }
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

/** Murphi's own surface, with whatever stages it is running. */
export function MurphiNode({ stages }: { stages: string[] }) {
  return (
    <div className="mx-auto w-full max-w-[300px] rounded-[8px] border border-[#E3E3E3] bg-white px-4 py-4 max-600:px-3.5">
      <div className="flex items-center justify-center gap-2.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-[9px] border border-[#E3E3E3] bg-white p-1.5">
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
                "min-w-0 truncate text-[12px] text-[#606060]",
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

/** The run between two surfaces, with the payment moving along it. */
export function Run({
  label,
  short,
  tight,
}: {
  label?: string;
  short?: boolean;
  /** The shortest stem. Used by the hero, where two runs otherwise account for
      more vertical space than either surface they join. */
  tight?: boolean;
}) {
  const stem = tight ? "h-3" : short ? "h-5" : "h-7";
  const gap = tight ? "gap-1.5" : "gap-2";
  const pad = tight ? "py-1.5" : short ? "py-2" : "py-3";

  return (
    <div className={cn("flex flex-col items-center", gap, pad)} aria-hidden>
      <span className={cn("relative flex w-px shrink-0 bg-[#E3E3E3]", stem)}>
        <span
          className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[#007EFF]"
          style={{ animation: "mp-flow-pulse-v 2.6s ease-in-out infinite" }}
        />
      </span>

      {label ? (
        <>
          <span
            className={cn(
              MONO,
              "rounded-full border border-[#E3E3E3] bg-[#F5F5F5] px-3 py-1 text-center text-[11px] uppercase tracking-[0.05em] text-[#007EFF]",
            )}
          >
            {label}
          </span>
          <span className={cn("relative flex w-px shrink-0 bg-[#E3E3E3]", stem)}>
            <span
              className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[#007EFF]"
              style={{ animation: "mp-flow-pulse-v 2.6s ease-in-out infinite .6s" }}
            />
          </span>
        </>
      ) : null}
    </div>
  );
}
