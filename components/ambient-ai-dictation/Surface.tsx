import type { ReactNode } from "react";
import { MONO } from "@/components/module-page/ui";
import { ContextRow } from "@/components/ambient-ai-dictation/Capture";
import { cn } from "@/lib/cn";

/**
 * The page's product-surface vocabulary.
 *
 * The hero's card already reads as a real interface — a titled window with a
 * head, a body and a foot strip. Everything else on the page was a bordered
 * rectangle, so the sections looked like separate designs rather than views of
 * one product. These primitives lift that same window language out of the hero
 * so every panel on the page speaks it.
 *
 * Nothing here introduces copy: labels passed in are strings the page already
 * shows, and the only state indicators are dots and rules, never new words.
 */

/** A titled product window: head rule, body, optional foot. */
export function Panel({
  label,
  children,
  context,
  foot,
  live,
  className,
}: {
  label: string;
  children: ReactNode;
  /** Where this surface's input came from — rendered as the hero's strip. */
  context?: string;
  foot?: ReactNode;
  /** A quietly pulsing dot, for a surface that is actively working. */
  live?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-panel border border-grey-mid bg-white shadow-[0_16px_40px_rgba(15,29,84,.06)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-grey-mid px-5 py-3 max-720:px-4">
        <span
          className={cn(
            MONO,
            "truncate text-[11px] uppercase tracking-[0.06em] text-ink-muted",
          )}
        >
          {label}
        </span>

        <span className="flex shrink-0 items-center gap-1.5" aria-hidden>
          {live ? (
            <span className="relative flex size-1.5">
              <span
                className="absolute inline-flex size-full rounded-full bg-brand/60"
                style={{ animation: "mp-glow 2.4s ease-in-out infinite" }}
              />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
            </span>
          ) : (
            <span className="size-1.5 rounded-full bg-brand-pale" />
          )}
        </span>
      </div>

      {context ? <ContextRow>{context}</ContextRow> : null}

      <div className="px-5 py-[18px] max-720:px-4">{children}</div>

      {foot ? (
        <div className="border-t border-grey-mid bg-grey-bg px-5 py-2.5 max-720:px-4">
          {foot}
        </div>
      ) : null}
    </div>
  );
}

/**
 * A rule that separates what went in from what came out, inside a panel.
 * The label is a string the section already uses.
 */
export function Divide({ label }: { label: string }) {
  return (
    <div className="my-4 flex items-center gap-3" aria-hidden>
      <span className="h-px flex-1 bg-grey-mid" />
      <span
        className={cn(
          MONO,
          "shrink-0 text-[10px] uppercase tracking-[0.08em] text-grey-bdr",
        )}
      >
        {label}
      </span>
      <span className="h-px flex-1 bg-grey-mid" />
    </div>
  );
}

