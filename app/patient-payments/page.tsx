import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqSection from "@/components/module-page/FaqSection";
import { FAQS } from "@/lib/faqs";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  moduleSchema,
} from "@/lib/schema";
import { pageMetadata } from "@/lib/site";
import {
  Breadcrumb,
  FinalCta,
  ModuleSection,
  PageHero,
  TrustDot,
} from "@/components/module-page/sections";
import PaymentJourney from "@/components/patient-payments/HeroVisual";
import Mechanics from "@/components/patient-payments/Mechanics";
import Included from "@/components/patient-payments/Included";
import {
  EhrIntegration,
  Outcomes,
  StoryRule,
  Timelines,
} from "@/components/patient-payments/Sections";

export const metadata: Metadata = pageMetadata("/patient-payments/", {
  title: "Patient Payments - Text to Pay & Reconciliation",
  description:
    "Text-to-pay patient balances for home health and hospice - ACH, debit or credit - with payment status and reconciliation written back to your EHR ledger automatically.",
});

const STEPS = [
  { num: "01", title: "Identify Balance", body: "Pulled from the EHR" },
  { num: "02", title: "Automated Outreach", body: "SMS sent with a payment link" },
  { num: "03", title: "Patient Pays", body: "ACH, debit or credit card" },
  { num: "04", title: "Status Updates", body: "Outstanding → Paid" },
  { num: "05", title: "Reconciled", body: "Ledger updated automatically" },
];

const INCLUDED = [
  "Balance Identification",
  "Automated Outreach",
  "SMS Payment Link",
  "ACH",
  "Debit Card",
  "Credit Card",
  "Payment Status",
  "Reconciliation",
];

const OUTCOMES = [
  {
    title: "Faster Collections",
    sub: "Text-to-pay, not mailed statements",
    icon: "clock" as const,
  },
  {
    title: "Less Manual Follow-Up",
    sub: "Outreach sent automatically",
    icon: "tick" as const,
  },
  {
    title: "Simple Patient Experience",
    sub: "Pay from a text, in a few taps",
    icon: "shield" as const,
  },
  {
    title: "Easier Reconciliation",
    sub: "Ledger updates automatically",
    icon: "layers" as const,
  },
  { title: "Better Visibility", sub: "Into outstanding balances", icon: "info" as const },
  {
    title: "Less Administrative Work",
    sub: "For billing staff",
    icon: "bolt" as const,
  },
];

export default function PatientPaymentsPage() {
  return (
    <div>
      <JsonLd data={moduleSchema("/patient-payments/")} />
      <JsonLd data={faqSchema(FAQS.patientPayments, "/patient-payments/")} />
      <JsonLd data={breadcrumbSchema("/patient-payments/", "Patient Payments")} />

      <Navbar />

      {/* The navigation is position:fixed, so it occupies no space in flow.
          Without this offset the breadcrumb renders behind it and only clears
          the bar once the page scrolls. */}
      <main className="bg-white pt-[80px]">
        <Breadcrumb current="Patient Payments" />

        <PageHero
          eyebrow="Patient Payments"
          title="Text. Tap. Paid."
          storyTag="The $84 Balance"
          story="A statement for $84 sits printed, folded, and stamped - somewhere between the office and a mailbox. It will take two weeks to arrive, and a check to come back, if it comes back at all."
          lede="Murphi turns that same balance into a text with a secure link. Most patients pay before the mail truck would have even left the lot."
          trust={
            <>
              HIPAA <TrustDot /> SOC 2 <TrustDot /> PCI-aware payment flow
            </>
          }
          visual={<PaymentJourney />}
        />

        <ModuleSection>
          <StoryRule>The Same $84, Two Ways</StoryRule>
          <Timelines
            before={{
              title: "By Mail",
              steps: [
                "Balance identified, then printed and mailed as a paper statement",
                "Patient calls the office to pay, or mails a check back",
                "Staff manually match the payment back to the ledger",
                "Two to three weeks pass before anyone knows it's resolved",
              ],
            }}
            after={{
              title: "By Text",
              steps: [
                "Balance identified from the EHR, outreach sent automatically",
                "Patient pays from a text message, in a few taps",
                "Payment status updates and reconciles automatically",
                "Resolved before the paper statement would have even shipped",
              ],
            }}
          />
        </ModuleSection>

        <ModuleSection
          id="how"
          kicker="The Mechanics"
          heading="From balance to reconciled payment."
        >
          <Mechanics steps={STEPS} />
        </ModuleSection>

        <ModuleSection kicker="What's Included" heading="What Murphi supports.">
          <Included
            items={INCLUDED}
            note="Murphi facilitates the payment experience and reconciliation - it does not hold provider funds."
          />
        </ModuleSection>

        <Outcomes heading="What agencies get back." outcomes={OUTCOMES} />

        <EhrIntegration
          heading="Works with the EHR you already use."
          lede="Balances are identified from your EHR and reconciled payment status is written back to the ledger."
          substeps={["Fetch Balance", "Outreach", "Payment", "Reconcile", "Write Back"]}
        />

        <FaqSection items={FAQS.patientPayments} />

        <FinalCta
          heading="Stop Waiting on the Mail Truck."
          body="See how a $84 balance turns into a paid balance in under a minute."
        />
      </main>

      <Footer />
    </div>
  );
}
