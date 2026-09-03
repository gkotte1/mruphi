import { LogoMark } from "@/components/Logo";
import { Icon, type IconName } from "@/components/icons";

const FLOW: { label: string; icon: IconName; core?: boolean }[] = [
  { label: "Patient", icon: "community" },
  { label: "SMS Text-to-Pay", icon: "phone" },
  { label: "Everyware", icon: "card" },
  { label: "Murphi.ai", icon: "brain", core: true },
  { label: "EHR", icon: "server" },
];

const METRICS: { value: string; label: string; icon: IconName }[] = [
  { value: "48 hrs", label: "Funds in provider bank account", icon: "sync" },
  { value: "PCI", label: "Compliant payment processing", icon: "shield" },
  { value: "ACH", label: "Credit & Debit accepted", icon: "card" },
  { value: "Auto", label: "EHR post-back on every payment", icon: "check" },
];

export default function PaymentIntegration() {
  return (
    <section
      aria-labelledby="payment-heading"
      className="relative isolate bg-white py-28 max-1024:py-20 max-600:py-16"
    >
      <div className="mx-auto w-full max-w-[1280px] px-10 max-1200:px-8 max-600:px-4">
        <div className="max-w-[760px]">
          <p className="type-label text-brand-dark">Payment Integration</p>

          <h2
            id="payment-heading"
            className="mt-4 type-h2 text-ink"
          >
            Everyware Payment Gateway
          </h2>

          <p className="mt-5 text-[16px] font-bold tracking-[-0.015em] text-brand-dark">
            Everyware — Integrated Payment Gateway
          </p>

          <p className="type-lead mt-3.5 text-grey-dk">
            Murphi.ai AI Patient Financials uses the Everyware payment gateway —
            enabling ACH, credit card, and debit card collection via SMS
            text-to-pay. Provider funds settled within 48 hours. Payments post
            back to the EHR automatically. PCI-compliant, HIPAA-compatible
            processing built specifically for healthcare providers.
          </p>
        </div>

        {/* ── The path a payment takes ── */}
        <ol className="mt-14 flex items-stretch rounded-[24px] border border-grey-mid bg-grey-bg p-6 max-1024:flex-col max-600:mt-10 max-600:p-4">
          {FLOW.map((step, i) => (
            <li
              key={step.label}
              className="flex flex-1 items-center gap-3 max-1024:flex-none max-1024:flex-col max-1024:items-stretch max-1024:gap-0"
            >
              {i > 0 ? <Connector /> : null}

              <div
                className={
                  step.core
                    ? "flex min-w-0 flex-1 items-center gap-2.5 rounded-tile border border-brand-border bg-white px-3.5 py-3 shadow-brand"
                    : "flex min-w-0 flex-1 items-center gap-2.5 rounded-tile border border-grey-mid bg-white px-3.5 py-3"
                }
              >
                <span
                  className={
                    step.core
                      ? "flex size-9 shrink-0 items-center justify-center rounded-full border border-brand-border/70 bg-white"
                      : "flex size-9 shrink-0 items-center justify-center rounded-full border border-grey-mid bg-grey-bg text-brand-dark"
                  }
                >
                  {step.core ? (
                    <LogoMark size={24} />
                  ) : (
                    <Icon name={step.icon} width={15} height={15} />
                  )}
                </span>

                <span
                  className={
                    step.core
                      ? "truncate text-[12.5px] font-extrabold tracking-[-0.015em] text-ink"
                      : "truncate text-[12.5px] font-bold tracking-[-0.015em] text-grey-dk"
                  }
                >
                  {step.label}
                </span>
              </div>
            </li>
          ))}
        </ol>

        {/* ── Four compact figures ── */}
        <dl className="mt-6 grid grid-cols-4 gap-4 max-1024:grid-cols-2 max-600:gap-3">
          {METRICS.map((metric) => (
            <div
              key={metric.value}
              className="rounded-[18px] border border-grey-mid bg-white p-5 transition-colors duration-200 hover:border-brand-border max-600:p-4"
            >
              <span className="flex size-8 items-center justify-center rounded-[10px] border border-brand-border/70 bg-brand-tint text-brand-dark">
                <Icon name={metric.icon} width={15} height={15} />
              </span>

              <dt className="mt-4 text-[26px] font-extrabold leading-none tracking-[-0.035em] text-ink max-600:text-[22px]">
                {metric.value}
              </dt>
              <dd className="mt-2.5 text-[12.5px] font-medium leading-snug text-grey-dk/75">
                {metric.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** A short dashed hop between two steps — horizontal, vertical when stacked. */
function Connector() {
  return (
    <>
      <svg
        viewBox="0 0 34 2"
        preserveAspectRatio="none"
        className="h-px w-[34px] shrink-0 max-1024:hidden"
        fill="none"
        aria-hidden
      >
        <path
          d="M0 1 H34"
          stroke="#A3D1FF"
          strokeWidth="2"
          strokeDasharray="4 5"
          style={{ animation: "mp-flow 5s linear infinite" }}
        />
      </svg>

      <svg
        viewBox="0 0 2 26"
        preserveAspectRatio="none"
        className="mx-auto hidden h-[26px] w-px shrink-0 max-1024:block"
        fill="none"
        aria-hidden
      >
        <path
          d="M1 0 V26"
          stroke="#A3D1FF"
          strokeWidth="2"
          strokeDasharray="4 5"
          style={{ animation: "mp-flow 5s linear infinite" }}
        />
      </svg>
    </>
  );
}
