import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { MONO, Tick } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * The page's product vocabulary: a claim moving through its lifecycle.
 *
 * The page previously drew that lifecycle as one row of dots and a strip of
 * pills, so it showed the stages but never what happens at any of them. These
 * primitives give it the parts a revenue-cycle interface actually has - 
 * stage state, the capability running at that stage, an intercepted issue, and
 * the review that clears it.
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
  foot,
  children,
  className,
}: {
  label: ReactNode;
  status?: string;
  tone?: "brand" | "plain";
  live?: boolean;
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
          "flex items-center justify-between gap-3 px-5 py-3 max-720:px-4",
          onBrand ? "border-b border-[#E3E3E3] bg-[#F5F5F5]" : "border-b border-[#E3E3E3] bg-[#F5F5F5]",
        )}
      >
        <span
          className={cn(
            MONO,
            "flex min-w-0 items-center gap-2 truncate text-[10.5px] font-semibold uppercase tracking-[0.06em]",
            onBrand ? "text-[#878787]" : "text-[#878787]",
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
                ? "border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]"
                : "border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]",
            )}
          >
            <span
              className={cn("size-1.5 rounded-full", onBrand ? "bg-[#007EFF]" : "bg-[#007EFF]")}
              style={{ animation: "mp-blink 1.6s ease-in-out infinite" }}
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
                    onBrand ? "bg-[#007EFF]/60" : "bg-[#007EFF]/60",
                  )}
                  style={{ animation: "mp-glow 2.4s ease-in-out infinite" }}
                />
                <span
                  className={cn(
                    "relative inline-flex size-1.5 rounded-full",
                    onBrand ? "bg-[#007EFF]" : "bg-[#007EFF]",
                  )}
                />
              </span>
            ) : (
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  onBrand ? "bg-[#E3E3E3]" : "bg-[#E3E3E3]",
                )}
              />
            )}
          </span>
        )}
      </div>

      <div className="px-5 py-[18px] max-720:px-4">{children}</div>

      {foot ? (
        <div className="border-t border-[#E3E3E3] bg-[#F5F5F5] px-5 py-2.5 max-720:px-4">
          {foot}
        </div>
      ) : null}
    </div>
  );
}

/** A labelled value. */
export function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[#E3E3E3] py-2.5 last:border-b-0">
      <span className={cn(MONO, "shrink-0 text-[11px] text-[#878787]")}>{label}</span>
      <span className="type-hl-inbox-title min-w-0 truncate text-right text-ink">
        {value}
      </span>
    </div>
  );
}

/** The small uppercase label above a group. */
export function GroupLabel({ children }: { children: string }) {
  return (
    <div className={cn(MONO, "mb-2 text-[10px] uppercase tracking-[0.08em] text-[#B2B2B2]")}>
      {children}
    </div>
  );
}

/** A capability the product runs, and whether it has cleared. */
export function CheckRow({
  name,
  done = true,
  index = 0,
}: {
  name: string;
  done?: boolean;
  index?: number;
}) {
  return (
    <li
      className="flex items-center gap-2.5 py-1.5"
      style={{ animation: `mp-fade-up .45s ease backwards ${0.08 + index * 0.07}s` }}
    >
      <span
        className={cn(
          "flex size-[18px] shrink-0 items-center justify-center rounded-full border transition-colors duration-[520ms] ease-out",
          done
            ? "border-[#007EFF] bg-[#007EFF] text-white"
            : "border-[#E3E3E3] bg-white text-[#B2B2B2]",
        )}
        aria-hidden
      >
        {done ? <Tick className="size-2.5" /> : <span className="size-1 rounded-full bg-current" />}
      </span>
      <span
        className={cn(
          "type-hl-inbox-title min-w-0 transition-colors duration-[520ms] ease-out",
          done ? "text-ink" : "text-[#606060]",
        )}
      >
        {name}
      </span>
    </li>
  );
}

/**
 * An issue the product caught before the claim went out. The deeper blue is the
 * page's existing flag tone, kept distinct from a cleared stage.
 */
export function FindingCard({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="flex items-start gap-3 rounded-[8px] border border-[#E3E3E3] bg-[#F5F5F5] px-3.5 py-3">
      <span
        className="mt-px flex size-6 shrink-0 items-center justify-center rounded-[7px] border border-[#E3E3E3] bg-white text-[#007EFF]"
        aria-hidden
      >
        <Icon name="shield" width={12} height={12} />
      </span>

      <span className="min-w-0">
        <span className="type-hl-inbox-title block text-ink">{title}</span>
        <span className={cn(MONO, "mt-0.5 block text-[10.5px] text-[#878787]")}>
          {meta}
        </span>
      </span>
    </div>
  );
}

export type StageState = "pass" | "flag" | "pending";

/**
 * The claim's position in its lifecycle, as a rail rather than a row of dots.
 * Horizontal while there is room; vertical below the breakpoint, so the
 * sequence stays one continuous run at every width.
 */
export function TrackRail({
  nodes,
  compact,
}: {
  nodes: { label: string; state: StageState }[];
  /** The hero's shorter rail, which never needs to go vertical. */
  compact?: boolean;
}) {
  return (
    <ol
      className={cn(
        "flex items-start",
        compact ? "" : "max-1080:flex-col max-1080:items-stretch",
      )}
    >
      {nodes.map((node, i) => {
        const reached = node.state !== "pending";

        return (
          <li key={node.label} className="contents">
            {i === 0 ? null : (
              <span
                className={cn(
                  "mt-[13px] h-0.5 w-6 shrink-0 rounded-full transition-colors duration-[520ms] ease-out",
                  compact
                    ? "flex-1"
                    : "max-1080:mt-0 max-1080:ml-[13px] max-1080:h-6 max-1080:w-0.5",
                  reached ? "bg-[#007EFF]" : "bg-[#E3E3E3]",
                )}
                aria-hidden
              />
            )}

            <div
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center gap-2 text-center",
                compact ? "" : "max-1080:flex-none max-1080:flex-row max-1080:gap-4 max-1080:text-left",
              )}
            >
              <StageDot state={node.state} />
              <span
                className={cn(
                  "type-hl-inbox-title transition-colors duration-[520ms] ease-out",
                  node.state === "pending" ? "text-[#606060]" : "text-ink",
                )}
              >
                {node.label}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** One stage marker: cleared, intercepted, or still ahead. */
export function StageDot({ state }: { state: StageState }) {
  return (
    <span
      className={cn(
        "flex size-[26px] shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-[520ms] ease-out",
        state === "pass"
          ? "border-[#007EFF] bg-[#007EFF] text-white"
          : state === "flag"
            ? "border-[#007EFF] bg-[#007EFF] text-white"
            : "border-[#E3E3E3] bg-white text-[#B2B2B2]",
      )}
      aria-hidden
    >
      {state === "pass" ? (
        <Tick className="size-3" />
      ) : state === "flag" ? (
        <Icon name="shield" width={11} height={11} />
      ) : (
        <span className="size-1.5 rounded-full bg-current" />
      )}
    </span>
  );
}

/** A short row of state pips - how far through the lifecycle the claim is. */
export function Pips({ total, done }: { total: number; done: number }) {
  return (
    <div className="flex items-center gap-1" aria-hidden>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 rounded-full transition-all duration-[520ms] ease-out",
            i < done ? "w-5 bg-[#007EFF]" : "w-2.5 bg-[#E3E3E3]",
          )}
        />
      ))}
    </div>
  );
}
