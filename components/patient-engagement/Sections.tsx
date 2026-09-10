import Image from "next/image";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import {
  OutcomeIcon,
  type OutcomeIconName,
} from "@/components/module-page/sections";
import {
  CONTAINER,
  Eyebrow,
  MONO,
  SECTION,
  Tick,
} from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * The body of the Patient Engagement page.
 *
 * Every section on it was previously the same shape - a grid of rounded
 * rectangles, each carrying the same tick - so ten capabilities, five reasons
 * and a five-step journey all read as one undifferentiated wall. Each one now
 * takes the composition its own content asks for: a ruled index, a split
 * argument, an aligned before/after ledger, a delivery log, and a round trip
 * through the EHR.
 *
 * These live beside the page rather than in the shared module kit, so the other
 * module pages are untouched. Every string is the one the page already carried.
 */

/* ── What's Inside: a ruled index, not ten boxes ─────────────── */

/** The icon each capability actually is - not decoration applied evenly. */
const INSIDE_ICONS: Record<string, IconName> = {
  "Two-Way SMS": "exchange",
  "Secure Staff App": "shield",
  "No App for Patients": "phone",
  "Group & Broadcast Messaging": "community",
  "Visit Confirmation Automation": "sealcheck",
  "Rich Media": "scan",
  "Document Signature": "doc",
  "Print · Scan · Fax": "layers",
  "Communication History": "route",
  "Admin Visibility": "chartup",
};

export function InsideLedger({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  return (
    <Reveal>
      <ul className="grid grid-cols-2 gap-x-14 border-t border-grey-mid max-1080:gap-x-10 max-720:grid-cols-1">
        {items.map((item) => (
          <li
            key={item.title}
            className="group flex items-start gap-4 border-b border-grey-mid py-[22px] max-600:gap-3.5"
          >
            <span className="mt-px flex size-9 shrink-0 items-center justify-center rounded-[10px] border border-brand-pale bg-brand-tint text-brand-dark transition-colors duration-200 group-hover:border-transparent group-hover:bg-brand group-hover:text-grey-bg">
              <Icon
                name={INSIDE_ICONS[item.title] ?? "exchange"}
                width={17}
                height={17}
              />
            </span>

            <div className="min-w-0">
              <h4 className="text-[15.5px] font-bold leading-snug tracking-[-0.012em] text-ink">
                {item.title}
              </h4>
              <p className="mt-1.5 text-[13px] leading-[1.55] text-grey-500">
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

/* ── Why This Matters: the claim, then the evidence ──────────── */

export function WhySplit({
  lede,
  items,
}: {
  lede: ReactNode;
  items: string[];
}) {
  return (
    <Reveal>
      <div className="grid grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] items-start gap-14 max-1080:grid-cols-1 max-1080:gap-9">
        <p className="max-w-[42ch] border-l-[3px] border-brand pl-6 text-[19px] leading-[1.6] text-ink max-600:pl-4">
          {lede}
        </p>

        <ol className="min-w-0 border-t border-grey-mid">
          {items.map((item, i) => (
            <li
              key={item}
              className="grid grid-cols-[auto_1fr] items-start gap-5 border-b border-grey-mid py-[18px] max-600:gap-3.5"
            >
              <span
                className={cn(
                  MONO,
                  "mt-px w-6 shrink-0 text-[12px] font-semibold tracking-[0.04em] text-brand",
                )}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 text-[14.5px] leading-[1.6] text-grey-500">
                {item}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}

/* ── Before & After: two aligned columns, scannable down ─────── */

export function BeforeAfter({
  rows,
}: {
  rows: { label: string; from: string; to: string }[];
}) {
  return (
    <Reveal>
      <div className="overflow-hidden rounded-panel border border-grey-mid bg-white shadow-[0_16px_40px_rgba(15,29,84,.06)]">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[190px_1fr] items-center gap-6 border-b border-grey-mid px-7 py-[22px] last:border-b-0 max-900:grid-cols-1 max-900:gap-2.5 max-600:px-5"
          >
            <div
              className={cn(
                MONO,
                "text-[11px] uppercase tracking-[0.06em] text-ink-muted",
              )}
            >
              {row.label}
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 max-600:grid-cols-1 max-600:justify-items-start max-600:gap-2">
              <span className="text-[14.5px] leading-[1.4] text-ink-muted line-through decoration-grey-bdr">
                {row.from}
              </span>

              <span
                className="flex size-7 shrink-0 items-center justify-center rounded-full border border-brand-pale bg-brand-tint text-brand max-600:rotate-90"
                aria-hidden
              >
                <Icon name="arrow" width={14} height={14} />
              </span>

              <span className="text-[15px] font-bold leading-[1.35] tracking-[-0.012em] text-ink">
                {row.to}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/* ── The Mechanics: a delivery log, with direction of travel ─── */

/** Which way each step of the round trip moves. */
const DIRECTIONS = ["out", "out", "in", "in", "kept"] as const;

export function MessageFlow({
  steps,
}: {
  steps: { num: string; title: string; body: string }[];
}) {
  return (
    <Reveal>
      <ol className="overflow-hidden rounded-panel border border-grey-mid bg-white shadow-[0_16px_40px_rgba(15,29,84,.06)]">
        {steps.map((step, i) => {
          const direction = DIRECTIONS[i] ?? "out";
          const last = i === steps.length - 1;

          return (
            <li
              key={step.num}
              className={cn(
                "grid grid-cols-[auto_1fr_auto] items-start gap-6 px-7 py-6 max-600:gap-4 max-600:px-5 max-600:py-5",
                last ? "" : "border-b border-grey-mid",
              )}
            >
              {/* The rail, with this step's number on it. */}
              <span className="relative flex w-9 shrink-0 justify-center self-stretch">
                <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-[12px] font-bold text-white">
                  {step.num}
                </span>
                {/* Runs through the row padding as well, so the rail is
                    continuous from one step to the next. */}
                {last ? null : (
                  <span
                    className="absolute top-9 -bottom-12 left-1/2 w-px -translate-x-1/2 bg-brand-pale max-600:-bottom-10"
                    aria-hidden
                  />
                )}
              </span>

              <span className="min-w-0">
                <span className="block text-[15.5px] font-bold leading-snug tracking-[-0.012em] text-ink">
                  {step.title}
                </span>
                <span className="mt-1.5 block text-[13px] leading-[1.55] text-grey-500">
                  {step.body}
                </span>
              </span>

              {/* Which way it travelled - drawn, never spelled out. */}
              <span
                className={cn(
                  "mt-1 flex size-7 shrink-0 items-center justify-center rounded-full border max-600:hidden",
                  direction === "kept"
                    ? "border-brand bg-brand text-white"
                    : "border-brand-pale bg-brand-tint text-brand",
                )}
                aria-hidden
              >
                {direction === "kept" ? (
                  <Tick className="size-3.5" />
                ) : (
                  <Icon
                    name="arrow"
                    width={13}
                    height={13}
                    className={direction === "in" ? "rotate-180" : ""}
                  />
                )}
              </span>
            </li>
          );
        })}
      </ol>
    </Reveal>
  );
}

/* ── Outcomes ────────────────────────────────────────────────── */

export function Outcomes({
  heading,
  outcomes,
}: {
  heading: string;
  outcomes: { title: string; sub: string; icon: OutcomeIconName }[];
}) {
  return (
    <section className="bg-brand py-14">
      <div className={CONTAINER}>
        <div className="mx-auto mb-10 max-w-[640px] text-center text-grey-bg">
          <h2 className="type-h2 text-white">{heading}</h2>
        </div>

        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-tile bg-white/[0.16] max-720:grid-cols-2">
          {outcomes.map((outcome) => (
            <div
              key={outcome.title}
              className="bg-brand px-6 py-8 text-center max-600:px-4 max-600:py-6"
            >
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full border border-white/25 bg-white/10">
                <OutcomeIcon icon={outcome.icon} />
              </div>
              <div className="mb-1.5 text-[15px] font-bold text-grey-bg">
                {outcome.title}
              </div>
              <div className="text-[12.5px] leading-[1.4] text-white/[0.62]">
                {outcome.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── EHR Integration: the round trip, drawn vertically ───────── */

/** The message lifecycle Murphi runs, then the step that returns the record. */
const PIPELINE = ["Send", "Deliver", "Reply", "Log"];
const RETURN_STEP = "Write Back";

export function EhrIntegration() {
  return (
    <section id="ehr" className={SECTION}>
      <Reveal>
        <div className="mx-auto max-w-[1156px] rounded-panel bg-white px-12 py-14 max-720:mx-5 max-720:px-6 max-720:py-10">
          <div className="grid grid-cols-[0.88fr_1.12fr] items-center gap-14 max-1080:grid-cols-1 max-1080:gap-10">
            <div className="min-w-0">
              <Eyebrow>EHR Integration</Eyebrow>

              <h2 className="mt-4 type-h2 text-ink">
                Works with the EHR you already use.
              </h2>

              <p className="mt-4 max-w-[52ch] text-[18px] leading-[1.6] text-grey-500">
                Communication history and signed documents can sync back to the
                patient record.
              </p>
            </div>

            <div className="min-w-0">
              <IntegrationPanel />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function IntegrationPanel() {
  return (
    <div className="overflow-hidden rounded-panel border border-grey-mid bg-white shadow-[0_20px_50px_rgba(15,29,84,.08)]">
      <div
        className={cn(
          MONO,
          "flex items-center justify-between gap-3 border-b border-grey-mid px-5 py-3 max-600:px-4",
        )}
      >
        <span className="min-w-0 truncate text-[11px] uppercase tracking-[0.06em] text-ink-muted">
          Your EHR ⇄ Murphi AI ⇄ Your EHR
        </span>
        <span className="relative flex size-1.5 shrink-0" aria-hidden>
          <span
            className="absolute inline-flex size-full rounded-full bg-brand/60"
            style={{ animation: "mp-glow 2.4s ease-in-out infinite" }}
          />
          <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
        </span>
      </div>

      <div className="px-5 py-5 max-600:px-4">
        <SystemNode label="EHR" />

        <Run />

        <div className="mx-auto w-full max-w-[300px] rounded-tile border border-brand-pale bg-white px-4 py-4 shadow-[0_10px_26px_-16px_rgba(15,29,84,.5)] max-600:px-3.5">
          <div className="flex items-center justify-center gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-[9px] border border-grey-mid bg-white p-1.5">
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
            {PIPELINE.map((step, i) => (
              <li key={step} className="flex items-stretch gap-3">
                <div className="relative flex w-[9px] shrink-0 justify-center" aria-hidden>
                  <span className="relative z-10 mt-[7px] size-[7px] shrink-0 rounded-full border-2 border-brand bg-white" />
                  {i === PIPELINE.length - 1 ? null : (
                    <span className="absolute top-[13px] left-1/2 h-[calc(100%-6px)] w-px -translate-x-1/2 bg-brand-pale" />
                  )}
                </div>

                <span
                  className={cn(
                    MONO,
                    "min-w-0 truncate pb-2.5 text-[12px] text-grey-500",
                    i === PIPELINE.length - 1 ? "pb-0" : "",
                  )}
                >
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <Run label={RETURN_STEP} />

        <SystemNode label="EHR" returned />
      </div>
    </div>
  );
}

/** One end of the round trip - the customer's own system, on #007EFF. */
function SystemNode({ label, returned }: { label: string; returned?: boolean }) {
  return (
    <div className="mx-auto flex w-full max-w-[300px] flex-col items-center gap-2 rounded-tile bg-brand px-5 py-4 shadow-[0_12px_28px_-14px_rgba(0,106,214,.7)]">
      <span className="flex items-center gap-2.5">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-[8px] bg-white/15 text-white">
          <Icon name="server" width={14} height={14} />
        </span>

        <span className="text-[15px] font-bold leading-none tracking-[-0.015em] text-white">
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

/** The run between two surfaces, with the record moving along it. */
function Run({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-2 py-3" aria-hidden>
      <span className="relative flex h-7 w-px shrink-0 bg-brand-pale">
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
              "rounded-full border border-brand-pale bg-brand-tint px-3 py-1 text-[11px] uppercase tracking-[0.05em] text-brand-dark",
            )}
          >
            {label}
          </span>
          <span className="relative flex h-7 w-px shrink-0 bg-brand-pale">
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
