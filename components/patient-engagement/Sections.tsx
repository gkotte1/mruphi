import Image from "next/image";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import { EhrSplit } from "@/components/inner-page/kit";
import { MONO, Tick } from "@/components/module-page/ui";
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
      <ul className="grid grid-cols-2 gap-x-14 border-t border-[#E3E3E3] max-1080:gap-x-10 max-720:grid-cols-1">
        {items.map((item) => (
          <li
            key={item.title}
            className="group flex items-start gap-4 border-b border-[#E3E3E3] py-[22px] max-600:gap-3.5"
          >
            <span className="mt-px flex size-9 shrink-0 items-center justify-center rounded-[10px] border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF] transition-colors duration-200 group-hover:border-transparent group-hover:bg-[#007EFF] group-hover:text-[#F5F5F5]">
              <Icon
                name={INSIDE_ICONS[item.title] ?? "exchange"}
                width={17}
                height={17}
              />
            </span>

            <div className="min-w-0">
              <h4 className="type-hl-card-title text-ink">
                {item.title}
              </h4>
              <p className="type-hl-card-body mt-1.5">
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
      <div className="ip-split grid grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] items-start gap-14 max-1080:grid-cols-1 max-1080:gap-9">
        <p className="max-w-[42ch] border-l-[3px] border-[#007EFF] pl-6 text-[19px] leading-[1.6] text-ink max-600:pl-4">
          {lede}
        </p>

        <ol className="min-w-0 border-t border-[#E3E3E3]">
          {items.map((item, i) => (
            <li
              key={item}
              className="grid grid-cols-[auto_1fr] items-start gap-5 border-b border-[#E3E3E3] py-[18px] max-600:gap-3.5"
            >
              <span
                className={cn(
                  MONO,
                  "mt-px w-6 shrink-0 text-[12px] font-semibold tracking-[0.04em] text-[#007EFF]",
                )}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 text-[14.5px] leading-[1.6] text-[#606060]">
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
      <div className="overflow-hidden rounded-[10px] border border-[#E3E3E3] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)]">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[190px_1fr] items-center gap-6 border-b border-[#E3E3E3] px-7 py-[22px] last:border-b-0 max-900:grid-cols-1 max-900:gap-2.5 max-600:px-5"
          >
            <div
              className={cn(
                MONO,
                "text-[10.5px] uppercase tracking-[0.06em] text-[#878787]",
              )}
            >
              {row.label}
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 max-600:grid-cols-1 max-600:justify-items-start max-600:gap-2">
              <span className="text-[14.5px] leading-[1.4] text-[#878787] line-through decoration-[#B2B2B2]">
                {row.from}
              </span>

              <span
                className="flex size-7 shrink-0 items-center justify-center rounded-full border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF] max-600:rotate-90"
                aria-hidden
              >
                <Icon name="arrow" width={14} height={14} />
              </span>

              <span className="type-hl-card-title text-ink">
                {row.to}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/* ── The Mechanics: delivery log + live SMS thread ───────────── */

/** Which way each step of the round trip moves. */
const DIRECTIONS = ["out", "out", "in", "in", "kept"] as const;

/** Sample thread shown beside the mechanics steps. */
const MECHANICS_THREAD: {
  from: "rn" | "patient";
  text: string;
  time: string;
}[] = [
  {
    from: "rn",
    text: "Hi Mary, how is your breathing today?",
    time: "9:12 AM",
  },
  {
    from: "patient",
    text: "Better, but I get short of breath when walking.",
    time: "9:14 AM",
  },
  {
    from: "rn",
    text: "Thanks for letting me know. Please rest and I'll follow up shortly.",
    time: "9:15 AM",
  },
  {
    from: "patient",
    text: "Thank you.",
    time: "9:16 AM",
  },
];

export function MessageFlow({
  steps,
}: {
  steps: { num: string; title: string; body: string }[];
}) {
  return (
    <Reveal>
      <div className="grid grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)] items-center gap-10 max-900:grid-cols-1 max-900:gap-8">
        {/* Left — existing 01–05 steps, ~55–60% width */}
        <ol className="overflow-hidden rounded-[10px] border border-[#E3E3E3] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)]">
          {steps.map((step, i) => {
            const direction = DIRECTIONS[i] ?? "out";
            const last = i === steps.length - 1;

            return (
              <li
                key={step.num}
                className={cn(
                  "grid grid-cols-[auto_1fr_auto] items-start gap-6 px-7 py-6 max-600:gap-4 max-600:px-5 max-600:py-5",
                  last ? "" : "border-b border-[#E3E3E3]",
                )}
              >
                <span className="relative flex w-9 shrink-0 justify-center self-stretch">
                  <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#007EFF] text-[12px] font-bold text-white">
                    {step.num}
                  </span>
                  {last ? null : (
                    <span
                      className="absolute top-9 -bottom-12 left-1/2 w-px -translate-x-1/2 bg-[#E3E3E3] max-600:-bottom-10"
                      aria-hidden
                    />
                  )}
                </span>

                <span className="min-w-0">
                  <span className="type-hl-card-title block text-ink">
                    {step.title}
                  </span>
                  <span className="type-hl-card-body mt-1.5 block">
                    {step.body}
                  </span>
                </span>

                <span
                  className={cn(
                    "mt-1 flex size-7 shrink-0 items-center justify-center rounded-full border max-600:hidden",
                    direction === "kept"
                      ? "border-[#007EFF] bg-[#007EFF] text-white"
                      : "border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]",
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

        {/* Right — SMS conversation, aligned to the middle of the steps */}
        <MechanicsSmsThread />
      </div>
    </Reveal>
  );
}

function MechanicsSmsThread() {
  return (
    <aside
      aria-label="Sample SMS conversation"
      className="overflow-hidden rounded-[10px] border border-[#E3E3E3] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)] max-900:mx-auto max-900:w-full max-900:max-w-[420px]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-[#E3E3E3] bg-[#F5F5F5] px-5 py-3">
        <span
          className={cn(
            MONO,
            "truncate text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#878787]",
          )}
        >
          SMS · Mary
        </span>
        <span className="flex shrink-0 items-center gap-1.5" aria-hidden>
          <span className="relative flex size-1.5">
            <span
              className="absolute inline-flex size-full rounded-full bg-[#007EFF]/60"
              style={{ animation: "mp-glow 2.4s ease-in-out infinite" }}
            />
            <span className="relative inline-flex size-1.5 rounded-full bg-[#007EFF]" />
          </span>
          <span
            className={cn(
              MONO,
              "text-[10px] font-semibold uppercase tracking-[0.06em] text-[#007EFF]",
            )}
          >
            Secure
          </span>
        </span>
      </div>

      <div className="border-b border-[#E3E3E3] px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#007EFF] text-[12px] font-bold text-white">
            M
          </span>
          <span className="min-w-0">
            <span className="type-hl-inbox-title block truncate text-ink">
              Mary
            </span>
            <span
              className={cn(MONO, "block truncate text-[11px] text-[#878787]")}
            >
              Patient · SMS
            </span>
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3.5 bg-white px-5 py-5">
        {MECHANICS_THREAD.map((msg) => {
          const fromRn = msg.from === "rn";

          return (
            <div
              key={`${msg.from}-${msg.time}-${msg.text.slice(0, 12)}`}
              className={cn(
                "flex max-w-[88%] flex-col gap-1",
                fromRn ? "items-start self-start" : "items-end self-end",
              )}
            >
              <span
                className={cn(
                  MONO,
                  "px-1 text-[10px] font-semibold uppercase tracking-[0.05em] text-[#878787]",
                )}
              >
                {fromRn ? "RN" : "Patient"} · {msg.time}
              </span>
              <div
                className={cn(
                  "px-3.5 py-2.5 text-[13.5px] leading-[1.45]",
                  fromRn
                    ? "rounded-[16px] rounded-bl-[4px] border border-[#E3E3E3] bg-[#F5F5F5] text-ink"
                    : "rounded-[16px] rounded-br-[4px] bg-[#007EFF] text-[#F5F5F5]",
                )}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-[#E3E3E3] bg-[#F5F5F5] px-5 py-2.5">
        <span
          className={cn(
            MONO,
            "text-[10.5px] font-semibold uppercase tracking-[0.05em] text-[#878787]",
          )}
        >
          Delivered · Logged to history
        </span>
      </div>
    </aside>
  );
}

/* ── Outcomes ────────────────────────────────────────────────── */

export { Outcomes } from "@/components/inner-page/kit";

/* ── EHR Integration: the round trip, drawn vertically ───────── */

/** The message lifecycle Murphi runs, then the step that returns the record. */
const PIPELINE = ["Send", "Deliver", "Reply", "Log"];
const RETURN_STEP = "Write Back";

export function EhrIntegration() {
  return (
    <EhrSplit
      heading="Works with the EHR you already use."
      lede="Communication history and signed documents can sync back to the patient record."
    >
      <IntegrationPanel />
    </EhrSplit>
  );
}

function IntegrationPanel() {
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#E3E3E3] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)]">
      <div
        className={cn(
          MONO,
          "flex items-center justify-between gap-3 border-b border-[#E3E3E3] px-5 py-3 max-600:px-4",
        )}
      >
        <span className="min-w-0 truncate text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink">
          Your EHR ⇄ Murphi AI ⇄ Your EHR
        </span>
        <span className="relative flex size-1.5 shrink-0" aria-hidden>
          <span
            className="absolute inline-flex size-full rounded-full bg-[#007EFF]/60"
            style={{ animation: "mp-glow 2.4s ease-in-out infinite" }}
          />
          <span className="relative inline-flex size-1.5 rounded-full bg-[#007EFF]" />
        </span>
      </div>

      <div className="px-4 py-4 max-600:px-3.5">
        <SystemNode label="EHR" />

        <Run />

        <div className="mx-auto w-full max-w-[240px] rounded-[8px] border border-[#E3E3E3] bg-[#F5F5F5] px-3 py-2.5">
          <div className="flex items-center justify-center gap-2">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-[8px] border border-[#E3E3E3] bg-white p-1">
              <Image
                src="/brand/app-icons/murphi-icon-192.png"
                alt="Murphi.ai"
                width={192}
                height={192}
                className="size-full object-contain"
              />
            </span>
            <span className="type-hl-inbox-title text-ink">Murphi AI</span>
          </div>

          <ol className="mx-auto mt-2.5 grid w-fit gap-0">
            {PIPELINE.map((step, i) => (
              <li key={step} className="flex items-stretch gap-2">
                <div className="relative flex w-[9px] shrink-0 justify-center" aria-hidden>
                  <span className="relative z-10 mt-[7px] size-[7px] shrink-0 rounded-full border-2 border-[#007EFF] bg-white" />
                  {i === PIPELINE.length - 1 ? null : (
                    <span className="absolute top-[13px] left-1/2 h-[calc(100%-6px)] w-px -translate-x-1/2 bg-[#E3E3E3]" />
                  )}
                </div>

                <span
                  className={cn(
                    MONO,
                    "min-w-0 truncate pb-1.5 text-[11px] text-[#606060]",
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

/** One end of the round trip - the customer's own system. */
function SystemNode({ label, returned }: { label: string; returned?: boolean }) {
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

/** The run between two surfaces, with the record moving along it. */
function Run({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 py-1.5" aria-hidden>
      <span className="relative flex h-4 w-px shrink-0 bg-[#E3E3E3]">
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
              "rounded-full border border-[#E3E3E3] bg-[#F5F5F5] px-3 py-1 text-[11px] uppercase tracking-[0.05em] text-[#007EFF]",
            )}
          >
            {label}
          </span>
          <span className="relative flex h-4 w-px shrink-0 bg-[#E3E3E3]">
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
