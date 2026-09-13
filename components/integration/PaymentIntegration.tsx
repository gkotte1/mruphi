import { LogoMark } from "@/components/Logo";
import { Icon, type IconName } from "@/components/icons";
import { IpWrap } from "@/components/inner-page/Shell";

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
    <section aria-labelledby="payment-heading" className="ip-section">
      <IpWrap>
        <div className="max-w-[760px]">
          <p className="ip-eyebrow">Payment Integration</p>

          <h2 id="payment-heading" className="ip-h2 ip-serif" style={{ marginTop: 16 }}>
            Everyware Payment Gateway
          </h2>

          <p className="type-hl-card-title mt-5 text-[#007EFF]">
            Everyware - Integrated Payment Gateway
          </p>

          <p className="ip-lead" style={{ marginTop: 14 }}>
            Murphi.ai AI Patient Financials uses the Everyware payment gateway  - 
            enabling ACH, credit card, and debit card collection via SMS
            text-to-pay. Provider funds settled within 48 hours. Payments post
            back to the EHR automatically. PCI-compliant, HIPAA-compatible
            processing built specifically for healthcare providers.
          </p>
        </div>

        <ol className="mt-14 flex items-stretch rounded-[10px] border border-[#E3E3E3] bg-[#F5F5F5] p-6 max-1024:flex-col max-600:mt-10 max-600:p-4">
          {FLOW.map((step, i) => (
            <li
              key={step.label}
              className="flex flex-1 items-center gap-3 max-1024:flex-none max-1024:flex-col max-1024:items-stretch max-1024:gap-0"
            >
              {i > 0 ? <Connector /> : null}

              <div
                className={
                  step.core
                    ? "flex min-w-0 flex-1 items-center gap-2.5 rounded-[8px] border border-[#007EFF] bg-white px-3.5 py-3"
                    : "flex min-w-0 flex-1 items-center gap-2.5 rounded-[8px] border border-[#E3E3E3] bg-white px-3.5 py-3"
                }
              >
                <span
                  className={
                    step.core
                      ? "flex size-9 shrink-0 items-center justify-center rounded-full border border-[#E3E3E3] bg-white"
                      : "flex size-9 shrink-0 items-center justify-center rounded-full border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]"
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
                      ? "type-hl-inbox-title truncate text-ink"
                      : "type-hl-inbox-title truncate text-[#606060]"
                  }
                >
                  {step.label}
                </span>
              </div>
            </li>
          ))}
        </ol>

        <dl className="mt-6 grid grid-cols-4 gap-4 max-1024:grid-cols-2 max-600:gap-3">
          {METRICS.map((metric) => (
            <div
              key={metric.value}
              className="ip-card p-5 transition-colors duration-200 hover:border-[#007EFF] max-600:p-4"
            >
              <span className="flex size-8 items-center justify-center rounded-[8px] border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]">
                <Icon name={metric.icon} width={15} height={15} />
              </span>

              <dt className="ip-serif mt-4 text-[26px] font-medium leading-none tracking-[-0.035em] text-ink max-600:text-[22px]">
                {metric.value}
              </dt>
              <dd className="mt-2.5 text-[12.5px] font-medium leading-snug text-[#606060]">
                {metric.label}
              </dd>
            </div>
          ))}
        </dl>
      </IpWrap>
    </section>
  );
}

/** A short dashed hop between two steps - horizontal, vertical when stacked. */
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
