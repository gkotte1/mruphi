import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The shared primitives of the AI Module and Who We Serve pages, on the
 * palette and typeface the brand book defines:
 *
 *   headings #1A1A1A · body #606060 · greyed-out #878787 · hairline #E3E3E3
 *   surfaces #F5F5F5 / #EFEFEF · blue #007EFF · header bars #006AD6
 *   container 1220px · radii 8/14/20
 *
 * Eyebrows, kickers and chips used to be set in IBM Plex Mono, carried over
 * from the old site. The brand book names Plus Jakarta Sans as the primary
 * typeface (page 12) and lists no second family, so LABEL now applies the
 * site's label treatment in Plus Jakarta Sans instead: same size, tracking and
 * uppercase, one family.
 */

export const CONTAINER =
  "mx-auto w-full max-w-[1220px] px-8 max-720:px-5";

/** var(--space-section) — clamp(64px, 9vw, 128px), 56px under 720. */
export const SECTION = "py-[clamp(64px,9vw,128px)] max-720:py-14";

/** The label treatment: the site typeface at label weight.
 *  Exported as MONO as well so the pages that import it keep working. */
export const LABEL = "font-medium";
export const MONO = LABEL;

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        MONO,
        "inline-flex flex-wrap items-center gap-2 text-[12.5px] uppercase tracking-[0.08em] text-brand",
      )}
    >
      <span className="h-px w-4 shrink-0 bg-current" aria-hidden />
      {children}
    </div>
  );
}

/** The small label line that opens most sections. */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        MONO,
        "mb-2.5 text-[12px] uppercase tracking-[0.06em] text-ink-muted",
      )}
    >
      {children}
    </div>
  );
}

export function SectionHead({ children }: { children: ReactNode }) {
  return (
    <div className="mb-14 flex flex-wrap items-end justify-between gap-10 max-720:mb-9 max-720:flex-col max-720:items-start max-720:gap-4">
      <h2 className="max-w-[640px] type-h2 text-ink">
        {children}
      </h2>
    </div>
  );
}

export function MonoLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        MONO,
        "mb-4 text-[10px] uppercase tracking-[0.05em] text-ink-muted",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** A blue tick followed by a label line — the source's `.fetch-line`. */
export function FetchLine({ children }: { children: ReactNode }) {
  return (
    <div className={cn(MONO, "mb-4 flex items-center gap-2 text-[12px] text-grey-500")}>
      <Tick className="size-3.5 shrink-0 text-brand" />
      {children}
    </div>
  );
}

export function Tick({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Layers({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="m12 3 9 5-9 5-9-5 9-5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="m3 13 9 5 9-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

const BAR_HEIGHTS = [8, 18, 12, 24, 15, 20, 10, 16, 22, 13, 9, 19];

/** The listening waveform — 3px bars on the source's 1.1s stagger. */
export function Waveform({
  bars = BAR_HEIGHTS,
  className,
}: {
  bars?: number[];
  className?: string;
}) {
  return (
    <div className={cn("flex h-[34px] items-center gap-[3px]", className)} aria-hidden>
      {bars.map((height, i) => (
        <span
          key={`${height}-${i}`}
          className="w-[3px] rounded-[2px] bg-brand opacity-85"
          style={{
            height: `${height}px`,
            transformOrigin: "center",
            animation: `mp-wave 1.1s ease-in-out infinite ${-1 + i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}

/** Lines that type themselves in, the last one carrying a caret. */
export function GeneratedLines({ lines }: { lines: string[] }) {
  return (
    <div className="mb-3.5 flex flex-col gap-[7px]">
      {lines.map((line, i) => (
        <div
          key={line}
          className="text-[12.5px] leading-[1.4] text-grey-500 opacity-0"
          style={{
            animation: `mp-fade-up .45s ease forwards ${0.15 + i * 0.1}s`,
          }}
        >
          {line}
          {i === lines.length - 1 ? (
            <span
              className="ml-0.5 inline-block h-3 w-0.5 bg-brand align-middle"
              style={{ animation: "mp-caret 1s step-end infinite" }}
              aria-hidden
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

/** The tinted tiles that list note types. */
export function NoteBoxes({
  items,
  columns,
  ticks = true,
  className,
}: {
  items: string[];
  columns: number;
  ticks?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("grid gap-2.5", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {items.map((item) => (
        <div
          key={item}
          className="flex flex-col items-center justify-center gap-[7px] rounded-[10px] border border-grey-mid bg-grey-soft px-2 py-3.5"
        >
          {ticks ? <Tick className="size-4 text-brand" /> : null}
          <span
            className={cn(
              MONO,
              "text-center text-[12px] font-semibold tracking-[0.02em] text-ink",
            )}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

export function PrimaryButton({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand px-[26px] py-[13px] text-[15px] font-semibold text-grey-bg shadow-[0_1px_2px_rgba(15,29,84,.08)] transition-all duration-200 hover:-translate-y-px hover:bg-brand-dark hover:shadow-[0_8px_20px_rgba(0,86,173,.28)]",
        className,
      )}
    >
      {children}
    </a>
  );
}

export function SecondaryButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border-[1.5px] border-grey-mid px-[26px] py-[13px] text-[15px] font-semibold text-ink transition-colors duration-200 hover:border-ink hover:bg-grey-bg"
    >
      {children}
    </a>
  );
}

export function ArrowGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
