import Reveal from "@/components/module-page/Reveal";
import {
  Accent,
  Eyebrow,
  GhostLink,
  Lede,
  ModuleHeading,
  OutcomeTiles,
  SectionWrap,
} from "@/components/home/kit";
import { cn } from "@/lib/cn";

const OUTCOMES = [
  "Faster collections",
  "Less staff follow-up",
  "Automated reconciliation",
];

const STEPS = [
  { n: "01", label: "Balance due", value: "$148.00" },
  { n: "02", label: "Sent via", value: "SMS Link" },
  { n: "03", label: "Method", value: "ACH" },
  { n: "04", label: "Status", value: "Paid", settled: true },
];

export default function PatientPayments() {
  return (
    <SectionWrap id="payments" tone="grey">
      <Reveal>
        <div className="mx-auto max-w-[680px] text-center">
          <Eyebrow>Patient Payments &amp; Reconciliation</Eyebrow>
          <ModuleHeading id="payments-heading">
            Make patient balances easier to{" "}
            <Accent>collect - and reconcile</Accent>.
          </ModuleHeading>
          <Lede className="mx-auto">
            Murphi identifies patient-responsibility balances and opens a simple
            digital path to pay - then reconciles the result back to your EHR
            automatically.
          </Lede>
        </div>
      </Reveal>

      <ol className="mt-14 grid grid-cols-4 gap-4 max-1024:grid-cols-2 max-600:grid-cols-1">
        {STEPS.map((step, i) => (
          <li
            key={step.label}
            className="relative rounded-hero border border-grey-mid bg-white px-6 py-8 text-center"
          >
            <span className="type-label text-brand-dark">{step.n}</span>
            <p className="mt-4 text-[13px] font-medium text-ink-muted">
              {step.label}
            </p>
            <p
              className={cn(
                "mt-2 text-[22px] font-extrabold tracking-[-0.03em]",
                step.settled ? "text-brand" : "text-ink",
              )}
            >
              {step.value}
            </p>
            {i < STEPS.length - 1 ? (
              <span
                className="absolute top-1/2 -right-3 hidden h-px w-3 bg-grey-mid max-1024:hidden"
                aria-hidden
              />
            ) : null}
          </li>
        ))}
      </ol>

      <p className="mt-6 text-center text-[13px] text-ink-muted">
        Collected in 1 day · Reconciled → EHR
      </p>

      <div className="mt-10">
        <OutcomeTiles items={OUTCOMES} />
      </div>

      <div className="mt-8 text-center">
        <GhostLink href="/patient-payments/">Explore Patient Payments</GhostLink>
      </div>
    </SectionWrap>
  );
}
