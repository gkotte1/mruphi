import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { LogoMark } from "@/components/Logo";
import { MONO, Tick } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * The page's product vocabulary: a referral arriving, being understood, and
 * being routed.
 *
 * Intake was drawn as five labelled boxes, two columns of arrows and one grey
 * card — a diagram of the idea rather than a picture of the product. These
 * primitives give the page the parts it actually describes: the sources it
 * accepts, the mark that reads them, the checks it runs, and the record it
 * writes back.
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
        "overflow-hidden rounded-panel border border-grey-mid bg-white shadow-[0_20px_50px_rgba(15,29,84,.08)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-3 px-5 py-3 max-720:px-4",
          onBrand ? "bg-brand" : "border-b border-grey-mid bg-grey-soft",
        )}
      >
        <span
          className={cn(
            MONO,
            "flex min-w-0 items-center gap-2 truncate text-[11px] uppercase tracking-[0.06em]",
            onBrand ? "text-white/90" : "text-ink-muted",
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
                : "border border-brand-pale bg-brand-tint text-brand-dark",
            )}
          >
            <span
              className={cn("size-1.5 rounded-full", onBrand ? "bg-white" : "bg-brand")}
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
                    onBrand ? "bg-white/60" : "bg-brand/60",
                  )}
                  style={{ animation: "mp-glow 2.4s ease-in-out infinite" }}
                />
                <span
                  className={cn(
                    "relative inline-flex size-1.5 rounded-full",
                    onBrand ? "bg-white" : "bg-brand",
                  )}
                />
              </span>
            ) : (
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  onBrand ? "bg-white/50" : "bg-brand-pale",
                )}
              />
            )}
          </span>
        )}
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

/** A labelled value. */
export function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-grey-soft py-2.5 last:border-b-0">
      <span className={cn(MONO, "shrink-0 text-[11px] text-ink-muted")}>{label}</span>
      <span className="min-w-0 truncate text-right text-[12.5px] font-semibold text-ink">
        {value}
      </span>
    </div>
  );
}

/** The small uppercase label above a group. */
export function GroupLabel({ children }: { children: string }) {
  return (
    <div className={cn(MONO, "mb-2 text-[10px] uppercase tracking-[0.08em] text-grey-bdr")}>
      {children}
    </div>
  );
}

/** Where a referral can arrive from. */
export const SOURCE_ICONS: Record<string, IconName> = {
  Fax: "doc",
  Email: "exchange",
  Portal: "network",
  API: "code",
  EHR: "server",
};

export function SourceCard({
  name,
  live,
  delay = "0s",
}: {
  name: string;
  /** Sources are always open; the pulse just shows the line is alive. */
  live?: boolean;
  delay?: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-tile border border-grey-mid bg-white px-2.5 py-2 shadow-[0_6px_16px_-12px_rgba(15,29,84,.6)]">
      <span
        className="flex size-6 shrink-0 items-center justify-center rounded-[7px] border border-brand-pale bg-brand-tint text-brand"
        aria-hidden
      >
        <Icon name={SOURCE_ICONS[name] ?? "doc"} width={12} height={12} />
      </span>

      <span className={cn(MONO, "min-w-0 flex-1 truncate text-[11.5px] font-semibold text-ink")}>
        {name}
      </span>

      {live ? (
        <span
          className="size-1.5 shrink-0 rounded-full bg-brand"
          style={{ animation: `mp-blink 2.4s ease-in-out infinite ${delay}` }}
          aria-hidden
        />
      ) : null}
    </div>
  );
}

/**
 * The mark that reads them all — the project's own logo component, never a
 * redrawn or generated one.
 */
export function MurphiNode({ status }: { status?: string }) {
  return (
    <div className="relative mx-auto flex w-full max-w-[260px] flex-col items-center gap-2.5 rounded-[22px] border border-brand-pale bg-white px-5 py-5 shadow-[0_18px_44px_-20px_rgba(15,29,84,.55)]">
      {/* A quiet ring, so the node reads as working rather than static. */}
      <span
        className="absolute -inset-1 rounded-[26px] border border-brand-pale motion-reduce:hidden"
        style={{ animation: "mp-glow 3.2s ease-in-out infinite" }}
        aria-hidden
      />

      <span className="relative flex size-12 items-center justify-center rounded-[14px] border border-grey-mid bg-white">
        <LogoMark size={30} />
      </span>

      <span className="relative text-[15px] font-bold leading-none tracking-[-0.015em] text-ink">
        Murphi AI
      </span>

      {status ? (
        <span
          className={cn(
            MONO,
            "relative flex items-center gap-1.5 rounded-full border border-brand-pale bg-brand-tint px-2.5 py-1 text-[10.5px] uppercase tracking-[0.06em] text-brand-dark",
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
  );
}

/** One check the product runs, and whether it has cleared. */
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
          "flex size-[18px] shrink-0 items-center justify-center rounded-full border transition-colors duration-[420ms] ease-out",
          done
            ? "border-brand bg-brand text-white"
            : "border-grey-mid bg-white text-grey-bdr",
        )}
        aria-hidden
      >
        {done ? <Tick className="size-2.5" /> : <span className="size-1 rounded-full bg-current" />}
      </span>
      <span
        className={cn(
          "min-w-0 text-[12.5px] font-semibold transition-colors duration-[420ms] ease-out",
          done ? "text-ink" : "text-grey-500",
        )}
      >
        {name}
      </span>
    </li>
  );
}

/** A field that has been read off the referral — structure, never invented data. */
export function FieldRow({ label, width }: { label: string; width: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-grey-soft py-2.5 last:border-b-0">
      <span className={cn(MONO, "w-20 shrink-0 text-[11px] text-ink-muted")}>{label}</span>
      <span className={cn("h-2 rounded-full bg-brand-pale", width)} aria-hidden />
      <Tick className="ml-auto size-3.5 shrink-0 text-brand" />
    </div>
  );
}

/** One of the three ways a referral can be routed. */
export function DecisionChip({ name, chosen }: { name: string; chosen?: boolean }) {
  return (
    <span
      className={cn(
        MONO,
        "rounded-full border px-3 py-1.5 text-[11.5px] transition-colors duration-[420ms] ease-out",
        chosen
          ? "border-brand bg-brand font-semibold text-white"
          : "border-grey-mid bg-grey-soft text-grey-500",
      )}
    >
      {name}
    </span>
  );
}

/** One end of the round trip — the customer's own system, on #007EFF. */
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
        "mx-auto flex w-full flex-col items-center gap-2 rounded-tile bg-brand shadow-[0_12px_28px_-14px_rgba(0,106,214,.7)]",
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

/** A short row of state pips. */
export function Pips({ total, done }: { total: number; done: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 rounded-full transition-all duration-[420ms] ease-out",
            i < done ? "w-5 bg-brand" : "w-2.5 bg-grey-mid",
          )}
        />
      ))}
    </div>
  );
}

/** The run between two surfaces, with the referral moving along it. */
export function Run({ label, short }: { label?: string; short?: boolean }) {
  const stem = short ? "h-5" : "h-7";

  return (
    <div
      className={cn("flex flex-col items-center gap-2", short ? "py-2" : "py-3")}
      aria-hidden
    >
      <span className={cn("relative flex w-px shrink-0 bg-brand-pale", stem)}>
        <span
          className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-brand"
          style={{ animation: "mp-flow-pulse-v 2.6s ease-in-out infinite" }}
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
          <span className={cn("relative flex w-px shrink-0 bg-brand-pale", stem)}>
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
