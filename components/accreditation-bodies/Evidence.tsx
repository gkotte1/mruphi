import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { LogoMark } from "@/components/Logo";
import { MONO, Tick } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * The page's product vocabulary: evidence, and the requirement it answers.
 *
 * Accreditation work is a register - every requirement either has its evidence
 * or it does not - so this page is built from that shape rather than the
 * stacks, rails and round trips the module pages use. A requirement carries its
 * number, the evidence mapped to it, and its state.
 *
 * Nothing here introduces copy. Labels passed in are strings the page already
 * carries; every state is a chip, a rule or a tick.
 */

/** A titled product window: head rule, optional context strip, body, foot. */
export function Panel({
  label,
  status,
  context,
  foot,
  children,
  className,
}: {
  label: ReactNode;
  status?: string;
  /** Where the evidence came from, stated once under the head. */
  context?: string;
  foot?: ReactNode;
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

      {context ? (
        <div className="flex items-center gap-2.5 border-b border-[#E3E3E3] bg-[#F5F5F5] px-5 py-2.5 max-720:px-4">
          <span
            className="flex size-5 shrink-0 items-center justify-center rounded-[6px] border border-[#E3E3E3] bg-white text-[#007EFF]"
            aria-hidden
          >
            <Icon name="server" width={10} height={10} />
          </span>
          <span className={cn(MONO, "min-w-0 truncate text-[11px] text-[#878787]")}>
            {context}
          </span>
        </div>
      ) : null}

      <div className="px-5 py-[18px] max-720:px-4">{children}</div>

      {foot ? (
        <div className="border-t border-[#E3E3E3] bg-[#F5F5F5] px-5 py-3 max-720:px-4">
          {foot}
        </div>
      ) : null}
    </div>
  );
}

/** The small uppercase label that heads a zone inside a panel. */
export function ZoneLabel({ children }: { children: string }) {
  return (
    <div className={cn(MONO, "mb-2.5 text-[10px] uppercase tracking-[0.08em] text-[#B2B2B2]")}>
      {children}
    </div>
  );
}

/** One accreditation evidence record in the readiness packet. */
export type EvidenceDoc = {
  title: string;
  meta: string;
  ref: string;
  state: "mapped" | "review";
};

/** One piece of evidence arriving from the record - a compact document card. */
export function EvidenceTile({
  doc,
  index = 0,
}: {
  doc: EvidenceDoc;
  index?: number;
}) {
  const review = doc.state === "review";

  return (
    <span
      className="flex min-w-0 flex-col gap-2 rounded-[10px] border border-[#E3E3E3] bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)]"
      style={{ animation: `mp-fade-up .45s ease backwards ${0.08 + index * 0.08}s` }}
    >
      <span className="flex items-start gap-2">
        <span
          className="mt-px flex size-6 shrink-0 items-center justify-center rounded-[7px] border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]"
          aria-hidden
        >
          <Icon name="doc" width={12} height={12} />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-[11.5px] font-semibold leading-snug tracking-[-0.01em] text-ink">
            {doc.title}
          </span>
          <span className={cn(MONO, "mt-0.5 block truncate text-[9.5px] text-[#878787]")}>
            {doc.meta}
          </span>
        </span>

        <span
          className={cn(
            "flex size-5 shrink-0 items-center justify-center rounded-full border",
            review
              ? "border-[#E3E3E3] bg-white text-[#007EFF]"
              : "border-[#007EFF] bg-[#007EFF] text-white",
          )}
          aria-hidden
        >
          {review ? (
            <span className="size-1.5 rounded-full bg-[#007EFF]" />
          ) : (
            <Tick className="size-2.5" />
          )}
        </span>
      </span>

      <span className="flex items-center justify-between gap-2">
        <span className={cn(MONO, "truncate text-[9px] tracking-[0.04em] text-[#B2B2B2]")}>
          {doc.ref}
        </span>
        <span
          className={cn(
            MONO,
            "shrink-0 rounded-full px-1.5 py-0.5 text-[8.5px] font-semibold uppercase tracking-[0.05em]",
            review
              ? "bg-[#F5F5F5] text-[#007EFF]"
              : "bg-[#F5F5F5] text-[#878787]",
          )}
        >
          {review ? "In review" : "Mapped"}
        </span>
      </span>

      {/* Quiet document lines - structure, not body copy. */}
      <span className="flex flex-col gap-1" aria-hidden>
        <span className="h-1 w-full rounded-full bg-[#F5F5F5]" />
        <span className="h-1 w-4/5 rounded-full bg-[#F5F5F5]" />
        <span className="h-1 w-2/5 rounded-full bg-[#E3E3E3]" />
      </span>
    </span>
  );
}

/**
 * The mark, sitting between the evidence and the requirements it answers  - 
 * the project's own LogoMark, never a redrawn or generated one.
 */
export function IntelligenceBar({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1" aria-hidden={false}>
      <span className="h-px flex-1 bg-[#E3E3E3]" aria-hidden />

      <span className="flex shrink-0 items-center gap-2 rounded-full border border-[#E3E3E3] bg-white px-3 py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_8px_18px_rgba(0,0,0,0.05)]">
        <LogoMark size={16} />
        <span
          className={cn(
            MONO,
            "text-[10px] font-semibold uppercase tracking-[0.06em] text-ink",
          )}
        >
          {label}
        </span>
      </span>

      <span className="h-px flex-1 bg-[#E3E3E3]" aria-hidden />
    </div>
  );
}

/**
 * One line of the register: the requirement it answers, what was found, and
 * whether that requirement is satisfied or still open.
 */
export function RequirementRow({
  requirement,
  title,
  state,
  index = 0,
}: {
  /** The requirement number, e.g. "Requirement 4.2". */
  requirement: string;
  title: string;
  state: "gap" | "mapped";
  index?: number;
}) {
  const gap = state === "gap";

  return (
    <li
      className="grid grid-cols-[auto_1fr_auto] items-center gap-3.5 border-b border-[#E3E3E3] py-3 last:border-b-0 max-600:gap-2.5"
      style={{ animation: `mp-fade-up .45s ease backwards ${0.16 + index * 0.09}s` }}
    >
      {/* The requirement is the anchor, so it leads the row. */}
      <span
        className={cn(
          MONO,
          "flex shrink-0 items-center rounded-[7px] border px-2 py-1 text-[10.5px] font-semibold tracking-[0.02em]",
          gap
            ? "border-[#007EFF]/25 bg-[#F5F5F5] text-[#007EFF]"
            : "border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]",
        )}
      >
        {requirement}
      </span>

      <span className="min-w-0 text-[12.5px] leading-[1.4] font-semibold text-ink">
        {title}
      </span>

      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-full border",
          gap
            ? "border-[#007EFF]/25 bg-[#F5F5F5] text-[#007EFF]"
            : "border-[#007EFF] bg-[#007EFF] text-white",
        )}
        aria-hidden
      >
        {gap ? <Icon name="shield" width={11} height={11} /> : <Tick className="size-3" />}
      </span>
    </li>
  );
}

/** The two closing states of the packet, side by side under the register. */
export function FootPair({ ready, gate }: { ready: string; gate: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <span className="flex items-center gap-2">
        <span
          className="flex size-5 shrink-0 items-center justify-center rounded-full border border-[#007EFF] bg-[#007EFF] text-white"
          aria-hidden
        >
          <Tick className="size-2.5" />
        </span>
        <span className={cn(MONO, "text-[11px] font-semibold text-ink")}>{ready}</span>
      </span>

      <span className="flex items-center gap-2">
        <span
          className="flex size-5 shrink-0 items-center justify-center rounded-full border border-[#B2B2B2] bg-white text-[#B2B2B2]"
          aria-hidden
        >
          <Icon name="community" width={11} height={11} />
        </span>
        <span className={cn(MONO, "text-[11px] text-[#878787]")}>{gate}</span>
      </span>
    </div>
  );
}
