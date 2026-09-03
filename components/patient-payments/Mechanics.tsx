"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import { MONO, Tick } from "@/components/module-page/ui";
import {
  Amount,
  Bubble,
  MethodTile,
  Pips,
  Row,
  Surface,
  SystemNode,
} from "@/components/patient-payments/Pay";
import { useAutoAdvance } from "@/lib/useAutoAdvance";
import { cn } from "@/lib/cn";

/**
 * The five stages, demonstrating themselves.
 *
 * The composition follows the Revenue Assurance mechanics — a selectable rail
 * beside a product surface, both driven by one index so they cannot fall out of
 * step — but every word here is this page's own: the same $84 balance the hero
 * opens with, carried from the EHR to the reconciled ledger.
 *
 * It advances every two seconds and loops. Pointing at the section holds it,
 * and picking a stage restarts that stage's full interval before the sequence
 * carries on. The views are stacked in one grid cell rather than toggled with
 * `hidden`, so the panel's height never jumps and every view's copy stays in
 * the HTML; only the active view is exposed to assistive technology.
 */

type Step = { num: string; title: string; body: string };

function Label({ children }: { children: string }) {
  return (
    <div
      className={cn(
        MONO,
        "mb-2 text-[10px] uppercase tracking-[0.08em] text-grey-bdr",
      )}
    >
      {children}
    </div>
  );
}

/** The balance moving from one state to the other. */
function StatusShift({ from, to }: { from: string; to: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-1">
      <span
        className={cn(
          MONO,
          "rounded-full border border-grey-mid bg-grey-soft px-3 py-1.5 text-[11.5px] text-ink-muted line-through decoration-grey-bdr",
        )}
      >
        {from}
      </span>

      <span
        className="flex size-6 shrink-0 items-center justify-center rounded-full border border-brand-pale bg-brand-tint text-brand"
        aria-hidden
      >
        <Icon name="arrow" width={12} height={12} />
      </span>

      <span
        className={cn(
          MONO,
          "rounded-full bg-brand px-3 py-1.5 text-[11.5px] font-semibold text-white",
        )}
      >
        {to}
      </span>
    </div>
  );
}

/** A step of the reconciliation that has completed. */
function DoneLine({ name }: { name: string }) {
  return (
    <li className="flex items-center gap-2.5 py-1.5">
      <span
        className="flex size-[18px] shrink-0 items-center justify-center rounded-full border border-brand bg-brand text-white"
        aria-hidden
      >
        <Tick className="size-2.5" />
      </span>
      <span className="min-w-0 text-[12.5px] font-semibold text-ink">{name}</span>
    </li>
  );
}

type View = { label: string; status: string; body: ReactNode };

const VIEWS: View[] = [
  {
    label: "Balance Identified",
    status: "Outstanding",
    body: (
      <>
        <SystemNode label="EHR" compact />

        <div className="mt-4">
          <Row label="Amount" value="$84.00" />
          <Row label="Balance Status" value="Outstanding" />
        </div>
      </>
    ),
  },
  {
    label: "Automated Outreach",
    status: "Sent",
    body: (
      <>
        <Bubble side="in">
          Your balance is $84.00. Tap here to securely pay: murphi.pay/x82f
        </Bubble>

        <div className="mt-4">
          <Row label="SMS Payment Link" value="murphi.pay/x82f" />
          <Row label="Balance Status" value="Outstanding" />
        </div>
      </>
    ),
  },
  {
    label: "Secure Payment",
    status: "Paid",
    body: (
      <>
        <Amount value="$84.00" caption="Amount" />

        <div className="mt-4">
          <Label>Method</Label>
          <div className="grid grid-cols-3 gap-2 max-600:grid-cols-1">
            <MethodTile name="ACH" />
            <MethodTile name="Debit Card" selected />
            <MethodTile name="Credit Card" />
          </div>
        </div>
      </>
    ),
  },
  {
    label: "Payment Status",
    status: "Updated",
    body: (
      <>
        <StatusShift from="Outstanding" to="Paid" />

        <div className="mt-4">
          <Row label="Balance Status" value="Outstanding → Paid" />
          <Row label="Method" value="Debit Card" />
        </div>

        <div className="mt-4 flex justify-center">
          <Pips total={5} done={4} />
        </div>
      </>
    ),
  },
  {
    label: "EHR · Patient Ledger",
    status: "Reconciled",
    body: (
      <>
        <ul>
          <DoneLine name="Payment Status" />
          <DoneLine name="Reconciliation" />
        </ul>

        <div className="mt-3 border-t border-grey-soft pt-3">
          <Row label="Balance Status" value="Outstanding → Paid" />
          <Row label="Amount" value="$84.00" />
        </div>

        <div className="mt-4">
          <SystemNode label="EHR" compact returned />
        </div>
      </>
    ),
  },
];

export default function Mechanics({ steps }: { steps: Step[] }) {
  const { index, select, hold, release } = useAutoAdvance(steps.length);

  return (
    <Reveal>
      <div
        className="grid grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-start gap-14 max-1080:grid-cols-1 max-1080:gap-10"
        onMouseEnter={hold}
        onMouseLeave={release}
        onFocusCapture={hold}
        onBlurCapture={release}
      >
        {/* The rail of stages. */}
        <ol className="min-w-0">
          {steps.map((step, i) => {
            const isActive = i === index;
            const done = i < index;
            const last = i === steps.length - 1;

            return (
              <li key={step.num}>
                <button
                  type="button"
                  onClick={() => select(i)}
                  aria-current={isActive}
                  className="group grid w-full grid-cols-[auto_1fr] items-start gap-5 py-5 text-left max-600:gap-4"
                >
                  <span className="relative flex w-9 shrink-0 justify-center self-stretch">
                    <span
                      className={cn(
                        MONO,
                        "relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border text-[12px] font-bold transition-colors duration-[420ms] ease-out",
                        isActive
                          ? "border-brand bg-brand text-white"
                          : done
                            ? "border-brand bg-white text-brand"
                            : "border-grey-mid bg-white text-grey-500 group-hover:border-brand group-hover:text-brand",
                      )}
                    >
                      {done ? <Tick className="size-3.5" /> : step.num}
                      {isActive ? (
                        <span
                          className="absolute inset-0 rounded-full border border-brand motion-reduce:hidden"
                          style={{ animation: "mp-pulse-ring 2s ease-out infinite" }}
                          aria-hidden
                        />
                      ) : null}
                    </span>
                    {last ? null : (
                      <span
                        className={cn(
                          "absolute top-9 -bottom-10 left-1/2 w-px -translate-x-1/2 transition-colors duration-[420ms] ease-out",
                          done ? "bg-brand" : "bg-grey-mid",
                        )}
                        aria-hidden
                      />
                    )}
                  </span>

                  <span
                    className={cn(
                      "min-w-0 border-l-2 pl-5 transition-colors duration-[420ms] ease-out max-600:pl-4",
                      isActive ? "border-l-brand" : "border-l-transparent",
                    )}
                  >
                    <span
                      className={cn(
                        "block text-[16.5px] font-bold leading-snug tracking-[-0.015em] transition-colors duration-[420ms] ease-out",
                        isActive ? "text-ink" : "text-grey-500",
                      )}
                    >
                      {step.title}
                    </span>
                    <span className="mt-1.5 block text-[13.5px] leading-[1.55] text-grey-500">
                      {step.body}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* The product view for whichever stage is running. */}
        <div className="min-w-0 rounded-[28px] border border-brand-pale bg-brand-tint/40 p-7 max-1080:p-6 max-600:rounded-panel max-600:p-4">
          <div className="grid">
            {VIEWS.map((view, i) => (
              <div
                key={view.label}
                aria-hidden={i !== index}
                className={cn(
                  "col-start-1 row-start-1 transition-all duration-[420ms] ease-out motion-reduce:transition-none",
                  i === index
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-1 opacity-0",
                )}
              >
                <Surface label={view.label} status={view.status}>
                  {view.body}
                </Surface>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center">
            <Pips total={steps.length} done={index + 1} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
