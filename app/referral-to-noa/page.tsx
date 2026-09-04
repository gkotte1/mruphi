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
import Reveal from "@/components/module-page/Reveal";
import { FetchNote, SoonCallout } from "@/components/module-page/extras";
import {
  Breadcrumb,
  FinalCta,
  ModuleSection,
  PageHero,
  TrustDot,
} from "@/components/module-page/sections";
import IntakeFlow from "@/components/referral-to-noa/HeroVisual";
import Mechanics from "@/components/referral-to-noa/Mechanics";
import {
  ChecksPanel,
  Outcomes,
  StoryRule,
  Timelines,
} from "@/components/referral-to-noa/Sections";

export const metadata: Metadata = pageMetadata("/referral-to-noa/", {
  title: "Referral → NOA — Intake Automation, Launching Soon",
  description:
    "Home health referral management and intake automation: Murphi classifies, checks and routes referrals from fax, email, portal, API or EHR, so NOA timing is measured in minutes.",
});

const INTAKE_STEPS = [
  { num: "01", title: "Received", body: "Fax, email, portal, API, EHR" },
  { num: "02", title: "Classified", body: "Documents sorted by type" },
  { num: "03", title: "Extracted", body: "Patient & referral data pulled" },
  { num: "04", title: "Summary", body: "Referral summary generated" },
];

const DECISION_STEPS = [
  {
    num: "05",
    title: "Checked",
    body: "Completeness, F2F, order, eligibility",
  },
  {
    num: "06",
    title: "Accept / Pending / Decline",
    body: "Decision routed to intake staff",
  },
  { num: "07", title: "EHR Write-Back", body: "Patient & admission created" },
  {
    num: "08",
    title: "Schedule SOC → NOA",
    body: "Start of care scheduled, NOA filed",
  },
];

const CHECKS = [
  "Completeness Check",
  "Face-to-Face",
  "Order Compliance",
  "Signature Compliance",
  "Insurance Eligibility",
  "Clinical / Operational Check",
];

const OUTCOMES = [
  {
    title: "Faster Referral Processing",
    sub: "No manual re-keying",
    icon: "clock" as const,
  },
  {
    title: "Fewer Handoffs",
    sub: "One intake workflow, every source",
    icon: "tick" as const,
  },
  {
    title: "Cleaner Admissions",
    sub: "Checks completed before intake",
    icon: "shield" as const,
  },
  { title: "Less Manual Work", sub: "For intake staff", icon: "layers" as const },
  {
    title: "Faster SOC Scheduling",
    sub: "Once a referral is accepted",
    icon: "info" as const,
  },
  {
    title: "Stronger Compliance",
    sub: "F2F, order & signature checked upfront",
    icon: "bolt" as const,
  },
];

export default function ReferralToNoaPage() {
  return (
    <div>
      <JsonLd data={moduleSchema("/referral-to-noa/")} />
      <JsonLd data={faqSchema(FAQS.referralToNoa, "/referral-to-noa/")} />
      <JsonLd data={breadcrumbSchema("/referral-to-noa/", "Referral → NOA")} />

      <Navbar />

      {/* The navigation is position:fixed, so it occupies no space in flow.
          Without this offset the breadcrumb renders behind it and only clears
          the bar once the page scrolls. */}
      <main className="bg-white pt-[80px]">
        <Breadcrumb current="Referral → NOA" />

        <PageHero
          eyebrow="Referral → NOA"
          badge="Launching Soon"
          title="Don't Let a Referral Wait for Monday."
          storyTag="Friday, 4:58 PM"
          story="A referral lands in the fax tray two minutes before the office closes. It sits there all weekend. By the time it's keyed in Monday morning, the patient has already waited three days for care that hasn't started."
          lede="Murphi classifies, checks and routes referrals the moment they arrive — from fax, email, portal, API or EHR — so the wait is measured in minutes, not a weekend."
          trust={
            <>
              HIPAA <TrustDot /> SOC 2 <TrustDot /> Home Health terminology (NOA)
            </>
          }
          primaryLabel="Join the Early Access List"
          secondaryLabel="See the Workflow"
          visual={
            <IntakeFlow
              sources={["Fax", "Email", "Portal", "API", "EHR"]}
              outTitle="AI Intake Dashboard"
              states={["Classified", "Extracted", "Checked"]}
              ready="Schedule SOC → NOA"
            />
          }
        />

        <ModuleSection border={false}>
          <Reveal>
            <SoonCallout>
              <strong className="text-brand-dark">Launching Soon.</strong> Referral
              → NOA is in active development. This page reflects the planned
              workflow — capabilities may change before general availability.
            </SoonCallout>
          </Reveal>

          <StoryRule>{"Friday's Referral, Rewritten"}</StoryRule>

          <Timelines
            before={{
              title: "Waits for Monday",
              steps: [
                "Referrals arrive by fax, email and portal, in different formats",
                "Nobody re-keys them until the office reopens",
                "Completeness, F2F and eligibility are checked separately, by hand",
                "SOC scheduling waits on every check finishing first",
              ],
            }}
            after={{
              title: "Starts Friday at 5:00",
              steps: [
                "Every source lands in one AI intake dashboard, instantly",
                "Patient identified and documents classified automatically",
                "Completeness, compliance and eligibility checked together",
                "Accepted referrals write straight into the EHR, ready to schedule",
              ],
            }}
          />
        </ModuleSection>

        <ModuleSection
          id="how"
          kicker="The Mechanics"
          heading="From referral to Notice of Admission."
        >
          <Mechanics
            groups={[
              { lede: "Intake — from arrival to summary.", steps: INTAKE_STEPS },
              { lede: "Decision — from check to admission.", steps: DECISION_STEPS },
            ]}
          />
        </ModuleSection>

        <ModuleSection
          kicker="Checked Together, Not One at a Time"
          heading="Compliance checks that used to take a checklist."
        >
          <ChecksPanel
            checks={CHECKS}
            note={
              <FetchNote>
                <strong className="text-ink">Home Health terminology.</strong>{" "}
                NOA (Notice of Admission) is a Home Health term. Hospice referral
                and intake use separate, Hospice-appropriate terminology and are
                not labeled NOA.
              </FetchNote>
            }
          />
        </ModuleSection>

        <Outcomes heading="What agencies get back." outcomes={OUTCOMES} />

        <FaqSection items={FAQS.referralToNoa} />

        <FinalCta
          heading="Stop Losing Fridays to a Fax Tray."
          body="Referral → NOA is launching soon. Join the early access list to be first to see it on your intake process."
          primaryLabel="Join Early Access"
        />
      </main>

      <Footer />
    </div>
  );
}
