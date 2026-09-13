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
 * card - a diagram of the idea rather than a picture of the product. These
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
  full,
}: {
  name: string;
  /** Sources are always open; the pulse just shows the line is alive. */
  live?: boolean;
  delay?: string;
  /** Show the full source name instead of a truncated first letter. */
  full?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[8px] border border-[#E3E3E3] bg-white shadow-[0_6px_16px_-12px_rgba(15,29,84,.6)]",
        full
          ? "flex min-w-0 flex-col items-center gap-1 px-1 py-2"
          : "flex items-center gap-2 px-2.5 py-2",
      )}
    >
      <span
        className="flex size-6 shrink-0 items-center justify-center rounded-[7px] border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]"
        aria-hidden
      >
        <Icon name={SOURCE_ICONS[name] ?? "doc"} width={12} height={12} />
      </span>

      <span
        className={cn(
          MONO,
          "font-semibold text-ink",
          full
            ? "whitespace-nowrap text-center text-[11.5px] leading-none"
            : "min-w-0 flex-1 truncate text-[11.5px]",
        )}
      >
        {name}
      </span>

      {live ? (
        <span
          className={cn(
            "size-1.5 rounded-full bg-[#007EFF]",
            full ? "absolute top-1.5 right-1.5" : "shrink-0",
          )}
          style={{ animation: `mp-blink 2.4s ease-in-out infinite ${delay}` }}
          aria-hidden
        />
      ) : null}
    </div>
  );
}

/**
 * The mark that reads them all - the project's own logo component, never a
 * redrawn or generated one.
 */
export function MurphiNode({ status }: { status?: string }) {
  return (
    <div className="relative mx-auto flex w-full flex-col items-center gap-2.5 rounded-[22px] border border-[#E3E3E3] bg-white px-5 py-5 shadow-[0_18px_44px_-20px_rgba(15,29,84,.55)]">
      {/* A quiet ring, so the node reads as working rather than static. */}
      <span
        className="absolute -inset-1 rounded-[26px] border border-[#E3E3E3] motion-reduce:hidden"
        style={{ animation: "mp-glow 3.2s ease-in-out infinite" }}
        aria-hidden
      />

      <span className="relative flex size-12 items-center justify-center rounded-[14px] border border-[#E3E3E3] bg-white">
        <LogoMark size={30} />
      </span>

      <span className="relative type-hl-inbox-title text-ink">
        Murphi AI
      </span>

      {status ? (
        <span
          className={cn(
            MONO,
            "relative flex items-center gap-1.5 rounded-full border border-[#E3E3E3] bg-[#F5F5F5] px-2.5 py-1 text-[10.5px] uppercase tracking-[0.06em] text-[#007EFF]",
          )}
        >
          <span
            className="size-1.5 rounded-full bg-[#007EFF]"
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
            ? "border-[#007EFF] bg-[#007EFF] text-white"
            : "border-[#E3E3E3] bg-white text-[#B2B2B2]",
        )}
        aria-hidden
      >
        {done ? <Tick className="size-2.5" /> : <span className="size-1 rounded-full bg-current" />}
      </span>
      <span
        className={cn(
          "type-hl-inbox-title min-w-0 transition-colors duration-[420ms] ease-out",
          done ? "text-ink" : "text-[#606060]",
        )}
      >
        {name}
      </span>
    </li>
  );
}

/** A field that has been read off the referral - structure, never invented data. */
export function FieldRow({ label, width }: { label: string; width: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-[#E3E3E3] py-2.5 last:border-b-0">
      <span className={cn(MONO, "w-20 shrink-0 text-[11px] text-[#878787]")}>{label}</span>
      <span className={cn("h-2 rounded-full bg-[#E3E3E3]", width)} aria-hidden />
      <Tick className="ml-auto size-3.5 shrink-0 text-[#007EFF]" />
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
          ? "border-[#007EFF] bg-[#007EFF] font-semibold text-white"
          : "border-[#E3E3E3] bg-[#F5F5F5] text-[#606060]",
      )}
    >
      {name}
    </span>
  );
}

/** One end of the round trip - the customer's own system, on #007EFF. */
export function SystemNode({
  label,
  returned,
  compact,
  muted,
}: {
  label: string;
  returned?: boolean;
  compact?: boolean;
  /** Light-grey compact card. Used by Mechanics write-back. */
  muted?: boolean;
}) {
  if (muted) {
    return (
      <div className="mx-auto flex w-full max-w-[240px] items-center justify-center gap-2 rounded-[8px] border border-[#E3E3E3] bg-[#F5F5F5] px-3 py-2">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-[6px] border border-[#E3E3E3] bg-white text-[#007EFF]">
          <Icon name="server" width={12} height={12} />
        </span>
        <span className="type-hl-inbox-title text-ink">{label}</span>
        {returned ? (
          <Tick className="size-3 shrink-0 text-[#007EFF]" />
        ) : (
          <span
            className="size-1.5 rounded-full bg-[#007EFF]"
            style={{ animation: "mp-blink 2s ease-in-out infinite" }}
            aria-hidden
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-col items-center gap-2 rounded-[8px] bg-[#007EFF] ",
        compact ? "px-4 py-3" : "px-5 py-4",
      )}
    >
      <span className="flex items-center gap-2.5">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-[8px] bg-white/15 text-white">
          <Icon name="server" width={14} height={14} />
        </span>

        <span className="type-hl-inbox-title text-white">{label}</span>
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
            i < done ? "w-5 bg-[#007EFF]" : "w-2.5 bg-[#E3E3E3]",
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
