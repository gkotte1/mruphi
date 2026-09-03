import Link from "next/link";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";

const BENEFITS = [
  "Faster collections",
  "Less staff follow-up",
  "Automated reconciliation",
];

/**
 * Visual left, message right — the mirror of the Patient Engagement section.
 * The heading still leads in the DOM; `order` does the swap on wide screens.
 */
export default function PatientPayments() {
  return (
    <section
      aria-labelledby="payments-heading"
      className="relative isolate overflow-hidden py-28 max-1024:py-20 max-600:py-16"
    >
      <SectionGround />

      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[minmax(0,54fr)_minmax(0,46fr)] items-start gap-x-16 px-10 max-1200:gap-x-12 max-1200:px-8 max-1024:grid-cols-1 max-1024:gap-y-14 max-600:gap-y-10 max-600:px-4">
        {/* ── Right on desktop, first on mobile: the message ── */}
        <div className="order-2 min-w-0 pt-2 max-1024:order-1 max-1024:mx-auto max-1024:max-w-[620px] max-1024:pt-0">
          <p className="type-label inline-flex items-center gap-2 rounded-full border border-brand-ghost bg-brand-tint px-3.5 py-1.5 text-brand-dark">
            <Icon name="card" width={13} height={13} />
            Patient Payments &amp; Reconciliation
          </p>

          <h2
            id="payments-heading"
            className="mt-7 max-w-[470px] type-h2 text-ink"
          >
            Make patient balances easier to collect — and reconcile.
          </h2>

          <p className="type-lead mt-5 max-w-[520px] text-grey-dk">
            Murphi identifies patient-responsibility balances and opens a simple
            digital path to pay — then reconciles the result back to your EHR
            automatically.
          </p>

          <ul className="mt-9 grid max-w-[520px] gap-3.5 border-t border-grey-mid pt-7">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="flex items-center gap-2.5 text-[13.5px] font-semibold text-grey-dk"
              >
                <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand-dark">
                  <Icon name="check" width={11} height={11} />
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          <Link
            href="/patient-payments/"
            className="group mt-10 btn-primary max-600:w-full max-600:justify-center"
          >
            Explore Patient Payments
            <Icon
              name="arrow"
              width={17}
              height={17}
              className="transition-transform duration-200 group-hover:translate-x-[3px]"
            />
          </Link>
        </div>

        {/* ── Left on desktop, last on mobile: the balance ── */}
        <div className="order-1 min-w-0 max-1024:order-2 max-1024:mx-auto max-1024:w-full max-1024:max-w-[560px]">
          <PaymentPanel />
        </div>
      </div>
    </section>
  );
}

/** A quiet band with one wash under the panel. */
function SectionGround() {
  return null;
}

/* ═══════════════════ the payment panel ════════════════════ */

const DETAILS = [
  { label: "Sent via", value: "SMS Link" },
  { label: "Method", value: "ACH" },
  { label: "Status", value: "Paid", paid: true },
];

const STEPS = ["Balance", "SMS link", "ACH", "Paid"];

/**
 * One record, read top to bottom: what is owed, the path offered to pay it,
 * how it was settled, and where the result went. Success carries a restrained
 * green — the surface stays blue and neutral.
 */
function PaymentPanel() {
  return (
    <div className="@container relative">

      <div className="overflow-hidden rounded-hero border border-brand-border/60 bg-white shadow-[0_44px_100px_-56px_rgba(0,86,173,0.55)] max-600:rounded-panel">
        <PanelHeader />
        <BalanceZone />
        <DetailRow />
        <ProgressZone />
        <ReconciledFooter />
      </div>
    </div>
  );
}

/** Whose balance this is, and how it ended. */
function PanelHeader() {
  return (
    <div className="flex items-center gap-3 border-b border-grey-mid px-5 py-4 max-600:px-4 max-600:py-3.5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-card bg-brand text-grey-bg shadow-[0_10px_22px_-12px_rgba(0,106,214,0.9)]">
        <Icon name="card" width={17} height={17} />
      </span>

      <p className="flex min-w-0 flex-1 items-center gap-2 truncate text-[13.5px] font-extrabold leading-none tracking-[-0.02em] text-ink">
        Balance
        <span className="text-grey-bdr" aria-hidden>
          ·
        </span>
        <span className="text-grey-dk/70">Patient #4471</span>
      </p>

      <span className="flex shrink-0 items-center gap-1 rounded-full border border-brand-pale bg-grey-bg px-2.5 py-[5px] text-[10px] font-bold leading-none text-brand-deep">
        <Icon name="check" width={11} height={11} />
        Paid
      </span>
    </div>
  );
}

/** The amount, and the path that was opened to pay it. */
function BalanceZone() {
  return (
    <div className="flex items-end gap-5 px-5 py-5 max-600:px-4 @max-[440px]:flex-col @max-[440px]:items-stretch @max-[440px]:gap-4">
      <div className="min-w-0 flex-1">
        <p className="type-micro text-grey-dk/50">Balance due</p>
        <p className="mt-2.5 text-[32px] font-extrabold leading-none tracking-[-0.04em] text-ink max-600:text-[28px]">
          $148.00
        </p>
      </div>

      {/* Supporting: the link the patient received. Not a checkout. */}
      <div className="w-[186px] shrink-0 rounded-tile border border-brand-border/70 bg-grey-bg px-3.5 py-3 @max-[440px]:w-full">
        <p className="type-micro text-brand-deep/60">SMS Payment Link</p>
        <p className="mt-2 text-[12px] font-bold leading-none text-ink">
          $148.00 balance
        </p>
        <span
          className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-brand px-3 py-[7px] text-[11px] font-bold leading-none text-grey-bg"
          aria-hidden
        >
          <Icon name="shield" width={11} height={11} />
          Pay securely
        </span>
      </div>
    </div>
  );
}

/** How it was sent, how it was paid, where it stands. */
function DetailRow() {
  return (
    <dl className="grid grid-cols-3 gap-4 border-t border-grey-mid px-5 py-4 max-600:px-4 @max-[380px]:grid-cols-1 @max-[380px]:gap-3">
      {DETAILS.map((detail) => (
        <div key={detail.label} className="min-w-0">
          <dt className="type-micro text-grey-dk/50">{detail.label}</dt>
          <dd
            className={cn(
              "mt-2 flex items-center gap-1.5 truncate text-[12.5px] font-bold leading-none tracking-[-0.01em]",
              detail.paid ? "text-brand-deep" : "text-ink",
            )}
          >
            {detail.paid ? <Icon name="check" width={11} height={11} /> : null}
            {detail.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** The progression, as a settled tracker rather than a flowchart. */
function ProgressZone() {
  return (
    <div className="border-t border-grey-mid px-5 py-4 max-600:px-4">
      <div className="flex items-center justify-between gap-3">
        <p className="type-micro text-grey-dk/50">Payment progress</p>
        <span className="flex shrink-0 items-center gap-1 rounded-full border border-brand-pale bg-grey-bg px-2.5 py-[5px] text-[9.5px] font-bold uppercase leading-none tracking-[0.06em] text-brand-deep">
          <Icon name="check" width={10} height={10} />
          Collected in 1 day
        </span>
      </div>

      <ol className="mt-4 flex items-start">
        {STEPS.map((step, i) => (
          <li
            key={step}
            className={cn(
              "mp-enter flex min-w-0 flex-col items-center",
              i === 0 ? "shrink-0" : "flex-1",
            )}
            style={{ animationDelay: `${0.14 * i}s` }}
          >
            <span className="flex w-full items-center gap-1.5">
              {i > 0 ? (
                <span
                  className="h-px min-w-[10px] flex-1 bg-brand-dark/50"
                  aria-hidden
                />
              ) : null}
              <span
                className={cn(
                  "flex size-[18px] shrink-0 items-center justify-center rounded-full",
                  i === STEPS.length - 1
                    ? "bg-brand-deep text-white"
                    : "bg-brand text-grey-bg",
                )}
              >
                <Icon name="check" width={10} height={10} />
              </span>
            </span>

            <span className="mt-2 max-w-full truncate text-[10px] font-bold leading-none text-grey-dk/65">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** The differentiator: the result goes back on its own. */
function ReconciledFooter() {
  return (
    <div className="flex items-center gap-3 border-t border-brand-border/70 bg-brand-ghost px-5 py-4 max-600:px-4">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] border border-white/70 bg-white text-brand-dark shadow-brand">
        <Icon
          name="sync"
          width={15}
          height={15}
          className="animate-[spin_7s_linear_infinite]"
        />
      </span>

      <div className="min-w-0">
        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase leading-none tracking-[0.08em] text-brand-deep">
          <Icon name="check" width={11} height={11} />
          Payment received
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-[13.5px] font-extrabold leading-none tracking-[-0.02em] text-ink">
          Reconciled
          <span className="text-brand" aria-hidden>
            →
          </span>
          EHR
        </p>
      </div>

      <span
        className="ml-auto flex size-8 shrink-0 items-center justify-center rounded-[10px] border border-white/70 bg-white/85 text-brand-dark"
        aria-hidden
      >
        <Icon name="server" width={15} height={15} />
      </span>
    </div>
  );
}
