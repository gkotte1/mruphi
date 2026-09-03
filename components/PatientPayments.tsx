import Reveal from "@/components/module-page/Reveal";
import {
  Eyebrow,
  GhostLink,
  Lede,
  MockCard,
  MockFoot,
  MockHead,
  MockPanel,
  ModuleBlock,
  ModuleHeading,
  OutcomeList,
  PayRow,
} from "@/components/home/kit";

/**
 * Module 4 — Patient Payments & Reconciliation, converted from `#payments` in
 * "01. HomePAge/Murphi.ai Home LandingPage.html".
 *
 * A `.reverse` block: copy right, visual left. The visual is the balance card,
 * four `.pay-row`s inside one panel. Every string is the reference's own.
 */

const OUTCOMES = [
  "Faster collections",
  "Less staff follow-up",
  "Automated reconciliation",
];

const ROWS = [
  { label: "Balance due", value: "$148.00" },
  { label: "Sent via", value: "SMS Link" },
  { label: "Method", value: "ACH" },
  { label: "Status", value: "Paid", settled: true },
];

export default function PatientPayments() {
  return (
    <ModuleBlock
      id="payments"
      reverse
      copy={
        <Reveal>
          <Eyebrow>Patient Payments &amp; Reconciliation</Eyebrow>

          <ModuleHeading id="payments-heading">
            Make patient balances easier to collect — and reconcile.
          </ModuleHeading>

          <Lede>
            Murphi identifies patient-responsibility balances and opens a simple
            digital path to pay — then reconciles the result back to your EHR
            automatically.
          </Lede>

          <OutcomeList items={OUTCOMES} />

          <GhostLink href="/patient-payments/">
            Explore Patient Payments
          </GhostLink>
        </Reveal>
      }
      visual={
        <Reveal>
          <MockCard>
            <MockHead label="Balance · Patient #4471" status="Paid" live />

            <MockPanel>
              {ROWS.map((row) => (
                <PayRow
                  key={row.label}
                  label={row.label}
                  value={row.value}
                  settled={row.settled}
                />
              ))}
            </MockPanel>

            <MockFoot left="Collected in 1 day" right="Reconciled → EHR" />
          </MockCard>
        </Reveal>
      }
    />
  );
}
