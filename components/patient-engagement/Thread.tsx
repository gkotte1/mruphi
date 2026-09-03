import type { ReactNode } from "react";
import { MONO } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * The page's own vocabulary: a conversation, drawn as one.
 *
 * Every section here used to be a bordered rectangle — the hero, the
 * capability list, the mechanics — so a page about messaging looked like a
 * page about anything else. These primitives give it the shapes its subject
 * actually has: a titled staff window, a phone, message bubbles that sit on
 * the side they were sent from, and a wire between the two ends.
 *
 * Nothing here introduces copy. Labels passed in are strings the page already
 * carries, and every state indicator is a dot, a rule or a tick — never a new
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
        "overflow-hidden rounded-panel border border-grey-mid bg-white shadow-[0_20px_50px_rgba(15,29,84,.08)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-3 px-5 py-3 max-720:px-4",
          tone === "brand"
            ? "bg-brand"
            : "border-b border-grey-mid bg-grey-soft",
        )}
      >
        <span
          className={cn(
            MONO,
            "truncate text-[11px] uppercase tracking-[0.06em]",
            tone === "brand" ? "text-white/90" : "text-ink-muted",
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
                  tone === "brand" ? "bg-white/60" : "bg-brand/60",
                )}
                style={{ animation: "mp-glow 2.4s ease-in-out infinite" }}
              />
              <span
                className={cn(
                  "relative inline-flex size-1.5 rounded-full",
                  tone === "brand" ? "bg-white" : "bg-brand",
                )}
              />
            </span>
          ) : (
            <span
              className={cn(
                "size-1.5 rounded-full",
                tone === "brand" ? "bg-white/50" : "bg-brand-pale",
              )}
            />
          )}
        </span>
      </div>

      <div className="px-5 py-[18px] max-720:px-4">{children}</div>

      {foot ? (
        <div className="border-t border-grey-mid bg-grey-bg px-5 py-2.5 max-720:px-4">
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
          ? "ml-auto rounded-[16px] rounded-br-[4px] bg-brand text-white"
          : "rounded-[16px] rounded-bl-[4px] border border-grey-mid bg-grey-soft text-ink",
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
    <div className="mb-4 flex items-center gap-2.5 border-b border-grey-mid pb-3.5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-[12px] font-bold text-white">
        {initials}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[13.5px] font-bold text-ink">
          {name}
        </span>
        <span className={cn(MONO, "block truncate text-[11px] text-ink-muted")}>
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
      <span className="relative flex h-7 w-px shrink-0 bg-brand-pale" aria-hidden>
        <span
          className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-brand"
          style={{ animation: `mp-flow-pulse-v 2.6s ease-in-out infinite ${delay}` }}
        />
      </span>

      {label ? (
        <>
          <span
            className={cn(
              MONO,
              "rounded-full border border-brand-pale bg-brand-tint px-3 py-1 text-center text-[11px] uppercase tracking-[0.05em] text-brand-dark",
            )}
          >
            {label}
          </span>
          <span className="relative flex h-7 w-px shrink-0 bg-brand-pale" aria-hidden>
            <span
              className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-brand"
              style={{ animation: "mp-flow-pulse-v 2.6s ease-in-out infinite .6s" }}
            />
          </span>
        </>
      ) : null}
    </div>
  );
}

/**
 * Ana's phone. A device, not another card — the shape carries the point that
 * the patient side needs nothing installed.
 */
export function PhoneFrame({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[300px] rounded-[34px] border-[7px] border-ink bg-ink p-0 shadow-[0_24px_54px_-18px_rgba(15,29,84,.45)]">
      <div className="overflow-hidden rounded-[27px] bg-white">
        <div className="flex justify-center pt-2.5" aria-hidden>
          <span className="h-1 w-14 rounded-full bg-grey-mid" />
        </div>

        <div
          className={cn(
            MONO,
            "mt-2.5 border-b border-grey-mid px-4 py-2.5 text-center text-[11px] uppercase tracking-[0.06em] text-ink-muted",
          )}
        >
          {label}
        </div>

        <div className="flex flex-col gap-2.5 px-4 py-4">{children}</div>

        <div className="flex justify-center pb-2.5" aria-hidden>
          <span className="h-1 w-20 rounded-full bg-grey-mid" />
        </div>
      </div>
    </div>
  );
}
