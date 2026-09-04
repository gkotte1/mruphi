import Link from "next/link";
import type { ReactNode } from "react";
import { MONO } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * The home page's module-story vocabulary, converted from the reference in
 * "01. HomePAge/Murphi.ai Home LandingPage.html".
 *
 * One React piece per CSS class in that file - `.module-block`, `.module-inner`,
 * `.chip-row`, `.outcome-list`, `.btn-ghost`, `.mock-card` and its head, body,
 * panel and foot, `.waveform`, `.note-box-grid`, `.fetch-line`, `.finding-row`,
 * `.pay-row`, `.fetch-note`, `.two-col-list`, the device stack and the flow
 * diagram - so the four module sections and the EHR band below are assembled
 * from the same parts the reference is, rather than each restating them.
 *
 * Two systematic substitutions, applied throughout and nowhere else:
 *
 *   colour  the reference's palette carries navy #0B1B3D, teal #0FB77A, coral
 *           #E2572B, amber #D68A1F, sky #3FA9F5 and two off-white tints, none
 *           of which are on the Murphi ramp. Each maps to the ramp's nearest
 *           equivalent - ink, brand, brand-dark, brand-deep, brand-light,
 *           grey-bg and grey-soft - so the page stays on the brand colours.
 *   fill    the reference fills three flow discs with a 135° gradient. The
 *           site uses flat surfaces throughout, so those are flat too.
 *
 * Everything else - every measurement, radius, weight, gap and breakpoint  - 
 * is the reference's own.
 */

/* ── Layout ───────────────────────────────────────────────── */

/** .container - max-width 1220px, 32px gutter, 20px under 720. */
export const CONTAINER = "mx-auto w-full max-w-[1220px] px-8 max-720:px-5";

/** .section - padding: var(--space-section) 0; 56px under 720. */
export const SECTION = "py-[clamp(64px,9vw,128px)] max-720:py-14";

/**
 * .module-block - a ruled band holding one story.
 *
 * `.module-inner` is two equal columns with a 72px gutter, centred. The
 * reference flips `.reverse` blocks with `direction:rtl`, which puts the copy
 * in the right column; at 1080 it restores `ltr` and pulls the visual above the
 * copy. Both states place the visual first, so one pair of `order` rules does
 * the same job without inheriting an RTL text direction.
 */
export function ModuleBlock({
  id,
  reverse,
  copy,
  visual,
}: {
  id: string;
  reverse?: boolean;
  copy: ReactNode;
  visual: ReactNode;
}) {
  return (
    <section id={id} className={cn(SECTION, "border-t border-grey-mid")}>
      <div
        className={cn(
          CONTAINER,
          "grid grid-cols-2 items-center gap-[72px]",
          "max-1080:grid-cols-1 max-1080:gap-10",
        )}
      >
        <div className={reverse ? "order-2 min-w-0" : "min-w-0"}>{copy}</div>
        <div className={reverse ? "order-1 min-w-0" : "min-w-0"}>{visual}</div>
      </div>
    </section>
  );
}

/* ── Copy column ──────────────────────────────────────────── */

/** .eyebrow - mono 12.5px, uppercase, brand, with a 16px rule before it. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        MONO,
        "mb-4 inline-flex items-center gap-2 text-[12.5px] uppercase tracking-[0.08em] text-brand",
      )}
    >
      <span className="h-px w-4 shrink-0 bg-current" aria-hidden />
      {children}
    </div>
  );
}

/** .module-copy h2 - the shared h2 scale, 16px above the lede. */
export function ModuleHeading({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <h2 id={id} className="mb-4 type-h2 text-ink">
      {children}
    </h2>
  );
}

/** p.lede - 18px/1.6, 52ch measure, 26px below inside a module. */
export function Lede({ children }: { children: ReactNode }) {
  return (
    <p className="mb-[26px] max-w-[52ch] text-[18px] leading-[1.6] text-grey-500">
      {children}
    </p>
  );
}

/** .chip-row / .chip */
export function ChipRow({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <div className={cn("mb-7 flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-grey-mid bg-grey-bg px-[13px] py-1.5 text-[13px] font-semibold text-ink"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

/** The tick the reference draws beside every outcome. */
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

/** .outcome-list - a wrapping row of ticked outcomes. */
export function OutcomeList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mb-[30px] flex flex-wrap gap-x-6 gap-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-2 text-[14.5px] font-medium text-grey-500"
        >
          <Tick className="size-[15px] shrink-0 text-brand" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** .btn-ghost - a text link, brand, 15px/600. */
export function GhostLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand transition-colors duration-200 hover:text-brand-dark"
    >
      {children}
      <span aria-hidden>&rarr;</span>
    </Link>
  );
}

/** .two-col-list - two labelled groups side by side, one column under 720. */
export function TwoColList({ children }: { children: ReactNode }) {
  return (
    <div className="mb-2 grid grid-cols-2 gap-x-8 max-720:grid-cols-1 max-720:gap-4">
      {children}
    </div>
  );
}

/** .two-col-list h4 */
export function ColumnLabel({ children }: { children: ReactNode }) {
  return (
    <h3
      className={cn(
        MONO,
        "mb-3 text-[13px] uppercase tracking-[0.05em] text-ink-muted",
      )}
    >
      {children}
    </h3>
  );
}

/* ── Product mockup card ──────────────────────────────────── */

/** .mock-card */
export function MockCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-tile border border-grey-mid bg-white shadow-[0_24px_56px_rgba(15,29,84,0.09)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** .mock-head, and .mock-head.on-blue */
export function MockHead({
  label,
  status,
  onBlue,
  live,
  icon,
}: {
  label: ReactNode;
  status?: string;
  /** The brand-filled variant, used where the surface is Murphi's own. */
  onBlue?: boolean;
  /** `.mock-status.live` - the settled state rather than the working one. */
  live?: boolean;
  icon?: boolean;
}) {
  return (
    <div
      className={cn(
        MONO,
        "flex items-center justify-between gap-3 px-5 py-[13px] text-[11px] uppercase tracking-[0.03em]",
        onBlue
          ? "bg-brand text-white/85"
          : "border-b border-grey-mid text-ink-muted",
      )}
    >
      <span className="flex min-w-0 items-center">
        {icon ? <MockHeadIcon /> : null}
        <span className="min-w-0 truncate">{label}</span>
      </span>

      {status ? (
        <span
          className={cn(
            "flex shrink-0 items-center gap-1.5",
            onBlue ? "text-white" : live ? "text-brand-deep" : "text-brand-dark",
          )}
        >
          <span
            className="size-1.5 rounded-full bg-current"
            style={{ animation: "mp-blink 1.6s ease-in-out infinite" }}
            aria-hidden
          />
          {status}
        </span>
      ) : null}
    </div>
  );
}

/** .mh-icon - the 18px translucent tile before an on-blue head label. */
function MockHeadIcon() {
  return (
    <span
      className="mr-2 flex size-[18px] shrink-0 items-center justify-center rounded-[5px] bg-white/20"
      aria-hidden
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-3">
        <circle cx="12" cy="12" r="8" stroke="#fff" strokeWidth="1.6" />
      </svg>
    </span>
  );
}

/** .mock-body.single > .mock-panel */
export function MockPanel({ children }: { children: ReactNode }) {
  return <div className="px-5 py-[22px]">{children}</div>;
}

/** .mock-panel-label */
export function PanelLabel({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        MONO,
        "mb-4 text-[10px] uppercase tracking-[0.05em] text-ink-muted",
      )}
    >
      {children}
    </div>
  );
}

/** .mock-foot - two mono notes on the tinted rule under a card. */
export function MockFoot({ left, right }: { left: string; right: string }) {
  return (
    <div
      className={cn(
        MONO,
        "flex items-center justify-between gap-3 border-t border-grey-mid bg-grey-soft px-5 py-[11px] text-[10.5px] text-ink-muted",
      )}
    >
      <span className="min-w-0 truncate">{left}</span>
      <span className="min-w-0 shrink-0 truncate">{right}</span>
    </div>
  );
}

/** .fetch-line - a ticked mono line above a panel's content. */
export function FetchLine({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        MONO,
        "mb-4 flex items-center gap-2 text-[12px] text-grey-500",
      )}
    >
      <Tick className="size-3.5 shrink-0 text-brand" />
      {children}
    </div>
  );
}

/** .waveform - twelve bars, each on the reference's own scaleY loop. */
const WAVE = [8, 18, 12, 24, 15, 20, 10, 16, 22, 13, 9, 19];
const WAVE_DELAY = [
  "-1s", "-0.9s", "-0.8s", "-0.7s", "-0.6s", "-0.5s",
  "-0.4s", "-0.3s", "-0.2s", "-0.1s", "0s", "-0.55s",
];

export function Waveform({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-[34px] items-center gap-[3px]", className)} aria-hidden>
      {WAVE.map((height, i) => (
        <span
          key={i}
          className="w-[3px] rounded-[2px] bg-brand opacity-85"
          style={{
            height: `${height}px`,
            transformOrigin: "center",
            animation: `mp-wave-bounce 1.1s ease-in-out ${WAVE_DELAY[i]} infinite`,
          }}
        />
      ))}
    </div>
  );
}

/** .note-box-grid / .note-box */
export function NoteBoxGrid({ items }: { items: readonly string[] }) {
  return (
    <div className="mt-3 grid grid-cols-3 gap-2.5">
      {items.map((item) => (
        <div
          key={item}
          className="flex flex-col items-center justify-center gap-[7px] rounded-[10px] border border-grey-mid bg-grey-soft px-2 py-3.5"
        >
          <Tick className="size-[15px] text-brand" />
          <span
            className={cn(
              MONO,
              "text-[12px] font-semibold tracking-[0.02em] text-ink",
            )}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

/** .finding-row - a dot, the finding, and where it came from. */
export function FindingRow({
  tone,
  title,
  meta,
}: {
  /** The reference's amber flags and teal opportunity, on the brand ramp. */
  tone: "flag" | "opportunity";
  title: string;
  meta: string;
}) {
  return (
    <div className="flex items-start gap-2.5 border-b border-grey-soft py-[9px] last:border-b-0">
      <span
        className={cn(
          "mt-[5px] size-[7px] shrink-0 rounded-full",
          tone === "flag" ? "bg-brand-deep" : "bg-brand",
        )}
        aria-hidden
      />
      <div className="min-w-0 text-[12.5px] leading-[1.4] text-ink">
        {title}
        <small className="mt-0.5 block text-[11px] text-ink-muted">{meta}</small>
      </div>
    </div>
  );
}

/** .pay-row - a label and its value, ruled. */
export function PayRow({
  label,
  value,
  settled,
}: {
  label: string;
  value: string;
  /** The reference sets the paid status in teal; on the ramp, brand-deep. */
  settled?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-grey-soft py-[11px] text-[12.5px] last:border-b-0">
      <span className="text-ink-muted">{label}</span>
      <span
        className={cn(
          MONO,
          "font-bold",
          settled ? "text-brand-deep" : "text-ink",
        )}
      >
        {value}
      </span>
    </div>
  );
}

/** .fetch-note - the aside under a visual. */
export function FetchNote({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 flex items-start gap-3 rounded-[8px] border border-grey-mid bg-white px-[18px] py-4">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="mt-px size-[18px] shrink-0 text-brand"
        aria-hidden
      >
        <path
          d="M12 8v5M12 16h.01"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <p className="min-w-0 text-[13.5px] leading-[1.5] text-grey-500">
        {children}
      </p>
    </div>
  );
}

/* ── Flow diagram ─────────────────────────────────────────── */

/** .flow-step - a disc over its label. */
export function FlowStep({
  label,
  accent,
}: {
  label: string;
  /** `.icon-box.accent-navy`, flat rather than gradient-filled. */
  accent?: boolean;
}) {
  return (
    <div className="flex w-[108px] shrink-0 flex-col items-center gap-2.5 text-center max-720:w-[76px]">
      <span
        className={cn(
          "flex size-[58px] items-center justify-center rounded-full max-720:size-11",
          accent
            ? "bg-deep"
            : "border-[1.5px] border-grey-mid bg-white shadow-[0_3px_10px_rgba(15,29,84,0.06)]",
        )}
      >
        <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden>
          {accent ? (
            <circle cx="12" cy="12" r="8" stroke="#fff" strokeWidth="1.6" />
          ) : (
            <rect
              x="4"
              y="4"
              width="16"
              height="16"
              rx="3"
              stroke="currentColor"
              strokeWidth="1.6"
              className="text-grey-500"
            />
          )}
        </svg>
      </span>

      <span className="text-[12.5px] leading-[1.25] font-semibold text-ink max-720:text-[11px]">
        {label}
      </span>
    </div>
  );
}

/** .flow-connector - a ruled run with a marker travelling along it. */
export function FlowConnector({ delay = "0s" }: { delay?: string }) {
  return (
    <span
      className="relative mx-[-2px] mb-[30px] h-0.5 min-w-[22px] flex-1 bg-grey-mid"
      aria-hidden
    >
      <span
        className="absolute top-1/2 -mt-[3px] size-1.5 rounded-full bg-brand shadow-[0_0_0_4px_rgba(0,126,255,0.14)]"
        style={{ animation: `mp-flow-pulse 2.6s ease-in-out ${delay} infinite` }}
      />
      <span
        className="absolute top-1/2 -right-px size-0 -translate-y-1/2 border-y-[3.5px] border-l-[5px] border-y-transparent border-l-grey-mid"
        aria-hidden
      />
    </span>
  );
}

/** .ehr-substeps */
export function SubSteps({ items }: { items: readonly string[] }) {
  return (
    <div className="mt-[22px] flex flex-wrap gap-2.5">
      {items.map((item) => (
        <span
          key={item}
          className={cn(
            MONO,
            "rounded-[6px] border border-grey-mid bg-white px-[11px] py-1.5 text-[12px] text-grey-500",
          )}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

/* ── Device stack (Patient Engagement) ────────────────────── */

/** .device-stack */
export function DeviceStack({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-3.5">{children}</div>;
}

/** .device-card, in its `.app` and `.sms` variants. */
export function DeviceCard({
  head,
  app,
  children,
}: {
  head: string;
  /** `.device-card.app` - Murphi's own software, head on brand. */
  app?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[16px] border border-grey-mid bg-white shadow-[0_20px_48px_rgba(15,29,84,0.08)]">
      <div
        className={cn(
          MONO,
          "flex items-center gap-2 px-4 py-3 text-[10.5px] uppercase tracking-[0.04em]",
          app
            ? "bg-brand text-white/90"
            : "border-b border-grey-mid bg-grey-soft text-grey-500",
        )}
      >
        {app ? <MockHeadIcon /> : null}
        <span className="min-w-0 truncate">{head}</span>
      </div>

      {children}
    </div>
  );
}

/** .app-body - the contact, then the message being sent. */
export function AppBody({
  initials,
  name,
  sub,
  message,
}: {
  initials: string;
  name: string;
  sub: string;
  message: string;
}) {
  return (
    <div className="px-[18px] pt-[18px] pb-5">
      <div className="mb-3.5 flex items-center gap-2.5">
        <span
          className="flex size-[34px] shrink-0 items-center justify-center rounded-full bg-brand-light text-[12.5px] font-bold text-white"
          aria-hidden
        >
          {initials}
        </span>

        <div className="min-w-0">
          <div className="truncate text-[13.5px] font-bold text-ink">{name}</div>
          <div className="truncate text-[11.5px] text-ink-muted">{sub}</div>
        </div>
      </div>

      <p className="rounded-[12px] rounded-bl-[3px] border border-grey-mid bg-grey-bg px-[13px] py-2.5 text-[12.5px] leading-[1.4] text-ink">
        {message}
      </p>
    </div>
  );
}

/** .sms-body / .sms-bubble */
export function SmsBody({
  thread,
}: {
  thread: readonly { side: "in" | "out"; text: string }[];
}) {
  return (
    <div className="p-[18px]">
      {thread.map((message, i) => (
        <p
          key={`${message.side}-${i}`}
          className={cn(
            "mb-[9px] max-w-[78%] rounded-[15px] px-[13px] py-[9px] text-[12.5px] leading-[1.4] last:mb-0",
            message.side === "out"
              ? "ml-auto rounded-br-[4px] bg-brand text-white"
              : "rounded-bl-[4px] bg-grey-soft text-ink",
          )}
        >
          {message.text}
        </p>
      ))}
    </div>
  );
}

/** .device-connector - the hop between the two devices. */
export function DeviceConnector({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2.5 py-0.5" aria-hidden>
      <span className="relative h-5 w-0.5 overflow-hidden bg-grey-mid">
        <span
          className="absolute -left-0.5 size-1.5 rounded-full bg-brand"
          style={{ animation: "mp-flow-pulse-v 2.2s ease-in-out infinite" }}
        />
      </span>

      <span className={cn(MONO, "text-[10.5px] text-ink-muted")}>{label}</span>
    </div>
  );
}
