import type { ReactNode } from "react";
import { MONO } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * The page's own vocabulary: a conversation, drawn as one.
 *
 * Every section here used to be a bordered rectangle - the hero, the
 * capability list, the mechanics - so a page about messaging looked like a
 * page about anything else. These primitives give it the shapes its subject
 * actually has: a titled staff window, a phone, message bubbles that sit on
 * the side they were sent from, and a wire between the two ends.
 *
 * Nothing here introduces copy. Labels passed in are strings the page already
 * carries, and every state indicator is a dot, a rule or a tick - never a new
 * word.
 */

/** A titled product window: head rule, body, optional foot. */
export function Surface({
  label,
  children,
  tone = "plain",
  live,
  foot,
  className,
}: {
  label: string;
  children: ReactNode;
  /** `brand` for the agency's own software, `plain` for everything else. */
  tone?: "brand" | "plain";
  live?: boolean;
  foot?: ReactNode;
  className?: string;
}) {
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
          tone === "brand"
            ? "bg-[#007EFF]"
            : "border-b border-[#E3E3E3] bg-[#F5F5F5]",
        )}
      >
        <span
          className={cn(
            MONO,
            "truncate text-[11px] uppercase tracking-[0.06em]",
            tone === "brand" ? "text-white/90" : "text-[#878787]",
          )}
        >
          {label}
        </span>

        <span className="flex shrink-0 items-center" aria-hidden>
          {live ? (
            <span className="relative flex size-1.5">
              <span
                className={cn(
                  "absolute inline-flex size-full rounded-full",
                  tone === "brand" ? "bg-white/60" : "bg-[#007EFF]/60",
                )}
                style={{ animation: "mp-glow 2.4s ease-in-out infinite" }}
              />
              <span
                className={cn(
                  "relative inline-flex size-1.5 rounded-full",
                  tone === "brand" ? "bg-white" : "bg-[#007EFF]",
                )}
              />
            </span>
          ) : (
            <span
              className={cn(
                "size-1.5 rounded-full",
                tone === "brand" ? "bg-white/50" : "bg-[#E3E3E3]",
              )}
            />
          )}
        </span>
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
        "max-w-[86%] px-[13px] py-2.5 text-[12.5px] leading-[1.45]",
        side === "out"
          ? "ml-auto rounded-[16px] rounded-br-[4px] bg-[#007EFF] text-white"
          : "rounded-[16px] rounded-bl-[4px] border border-[#E3E3E3] bg-[#F5F5F5] text-ink",
      )}
    >
      {children}
    </div>
  );
}

/** The person a thread belongs to. */
export function Correspondent({
  initials,
  name,
  sub,
}: {
  initials: string;
  name: string;
  sub: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-2.5 border-b border-[#E3E3E3] pb-3.5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#007EFF] text-[12px] font-bold text-white">
        {initials}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[13.5px] font-bold text-ink">
          {name}
        </span>
        <span className={cn(MONO, "block truncate text-[11px] text-[#878787]")}>
          {sub}
        </span>
      </span>
    </div>
  );
}

/** Read, drawn rather than written. */
export function ReadGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 26 16" fill="none" className={className} aria-hidden>
      <path
        d="M2 8.6 6.2 13 14 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6 10.8 12.8 12 20.6 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The run between the two ends, with a message travelling along it. */
export function Wire({ label, delay = "0s" }: { label?: string; delay?: string }) {
  return (
    <div className="flex flex-col items-center gap-2 py-3">
      <span className="relative flex h-7 w-px shrink-0 bg-[#E3E3E3]" aria-hidden>
        <span
          className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[#007EFF]"
          style={{ animation: `mp-flow-pulse-v 2.6s ease-in-out infinite ${delay}` }}
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
          <span className="relative flex h-7 w-px shrink-0 bg-[#E3E3E3]" aria-hidden>
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

/**
 * Ana's phone. A device, not another card - the shape carries the point that
 * the patient side needs nothing installed.
 */
export function PhoneFrame({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  /* Bezel stays brand blue; a thin border keeps the phone readable without
     overpowering the card above it. Width matches the staff Surface above. */
  return (
    <div className="w-full rounded-[34px] border-2 border-[#007EFF] bg-[#007EFF] p-0 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)]">
      <div className="overflow-hidden rounded-[32px] bg-white">
        <div className="flex justify-center pt-2.5" aria-hidden>
          <span className="h-1 w-14 rounded-full bg-[#E3E3E3]" />
        </div>

        <div
          className={cn(
            MONO,
            "mt-2.5 border-b border-[#E3E3E3] px-4 py-2.5 text-center text-[11px] uppercase tracking-[0.06em] text-[#878787]",
          )}
        >
          {label}
        </div>

        <div className="flex flex-col gap-2.5 px-4 py-4">{children}</div>

        <div className="flex justify-center pb-2.5" aria-hidden>
          <span className="h-1 w-20 rounded-full bg-[#E3E3E3]" />
        </div>
      </div>
    </div>
  );
}
