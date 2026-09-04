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
import ChartReviewStack from "@/components/revenue-assurance/HeroVisual";
import Mechanics from "@/components/revenue-assurance/Mechanics";
import Checks, { type Check } from "@/components/revenue-assurance/Checks";
import {
  EhrIntegration,
  Outcomes,
  StoryRule,
  Timelines,
} from "@/components/revenue-assurance/Sections";

export const metadata: Metadata = pageMetadata("/revenue-assurance/", {
  title: "Revenue Assurance — OASIS & PDGM Review Software",
  description:
    "AI chart review for home health and hospice: OASIS, coding, POC, PDGM and ADR gaps surfaced the day the chart is written, fetched straight from your EHR.",
});

const FINDINGS = [
  {
    tone: "flag" as const,
    title: "Homebound status not fully documented",
    meta: "Section G · Visit 3",
  },
  {
    tone: "flag" as const,
    title: "Face-to-Face encounter date missing",
    meta: "Referral documentation",
  },
  {
    tone: "opportunity" as const,
    title: "PDGM grouping opportunity identified",
    meta: "Coding review",
  },
];

const STEPS = [
  { num: "01", title: "Fetch Chart", body: "Retrieved directly from your EHR" },
  { num: "02", title: "AI Review", body: "Coding, OASIS, POC, compliance checked" },
  { num: "03", title: "Findings Appear", body: "Risks and opportunities surfaced" },
  { num: "04", title: "Reviewer Resolves", body: "Team member reviews each finding" },
  {
    num: "05",
    title: "Approved / Write-Back",
    body: "Result returned to the EHR",
  },
];

const CHECKS: Check[] = [
  {
    id: "coding",
    label: "Coding",
    groups: [
      {
        label: "Levels",
        chips: ["L1 Coding", "L2 Coding + OASIS", "L3 Coding + OASIS + POC"],
      },
      { label: "Applies To", chips: ["Home Health", "Hospice"], alt: true },
    ],
  },
  {
    id: "oasis",
    label: "OASIS",
    chips: ["OASIS Scrubber"],
    note: "Checks OASIS responses for internal consistency before the assessment is locked.",
  },
  {
    id: "compliance",
    label: "Compliance",
    chips: ["Face-to-Face", "POC Checker", "Visit Note Scrubber"],
    note: "Confirms the documentation a surveyor or auditor would ask for is actually present — the piece that was missing for Mr. Delgado.",
  },
  {
    id: "revenue",
    label: "Revenue",
    chips: ["PDGM / HHRG"],
    note: "Flags grouping and case-mix opportunities based on the documentation on file.",
  },
  {
    id: "audit",
    label: "Audit / Review",
    chips: ["Additional Documentation Review", "ADR"],
    note: "Organizes the record set an ADR response needs, ready for your team to submit.",
  },
];

const OUTCOMES = [
  { title: "Catch Issues Early", sub: "Before submission, not after", icon: "shield" as const },
  { title: "Protect Reimbursement", sub: "Fewer preventable denials", icon: "tick" as const },
  { title: "Accelerate Reviews", sub: "Standardized, faster QA", icon: "clock" as const },
  { title: "Reduce Manual Review", sub: "Every chart, same rigor", icon: "layers" as const },
  { title: "Faster ADR Turnaround", sub: "Documentation organized upfront", icon: "info" as const },
  {
    title: "Fewer Denials",
    sub: "Findings resolved before the claim goes out",
    icon: "bolt" as const,
  },
];

export default function RevenueAssurancePage() {
  return (
    <div>
      <JsonLd data={moduleSchema("/revenue-assurance/")} />
      <JsonLd data={faqSchema(FAQS.revenueAssurance, "/revenue-assurance/")} />
      <JsonLd data={breadcrumbSchema("/revenue-assurance/", "Revenue Assurance")} />

      <Navbar />

      {/* The navigation is position:fixed, so it occupies no space in flow.
          Without this offset the breadcrumb renders behind it and only clears
          the bar once the page scrolls. */}
      <main className="bg-white pt-[80px]">
        <Breadcrumb current="Revenue Assurance" />

        <PageHero
          eyebrow="Revenue Assurance"
          title="Catch It on Day One, Not on Appeal."
          storyTag="Six Weeks Later"
          story="An ADR letter arrives for Mr. Delgado's episode. The homebound documentation was thin. The Face-to-Face date is missing. Nobody remembers visit three — it happened six weeks ago."
          lede="Murphi reviews every chart the day it's written — fetched straight from your EHR — and surfaces exactly this kind of gap while there's still time to fix it."
          trust={
            <>
              HIPAA <TrustDot /> SOC 2 <TrustDot /> No unsupported ROI claims
            </>
          }
          visual={
            <ChartReviewStack
              title="Chart Review · Mr. Delgado, Episode 2"
              status="3 Findings"
              fetched="Referral, F2F, OASIS & POC fetched from EHR"
              findings={FINDINGS}
              foot={["Found the day it was written", "Write-back ready"]}
            />
          }
        />

        <ModuleSection border={false}>
          <StoryRule>The Same Chart, Two Timelines</StoryRule>
          <Timelines
            before={{
              title: "Found on Appeal",
              steps: [
                "Chart submitted, no second look before the claim goes out",
                "ADR letter arrives weeks later, deadline attached",
                "Team re-reads the whole episode from scratch, under pressure",
                "Outcome depends on documentation nobody can improve now",
              ],
            }}
            after={{
              title: "Found on Day One",
              steps: [
                "Every chart gets the same structured review, automatically",
                "Findings surface before the claim is ever submitted",
                "Reviewer resolves the finding while the visit is still fresh",
                "Approved chart writes back to the EHR, ready to bill",
              ],
            }}
          />
        </ModuleSection>

        <ModuleSection
          id="how"
          kicker="The Mechanics"
          heading="From chart to resolved finding."
        >
          <Mechanics steps={STEPS} />
        </ModuleSection>

        <ModuleSection
          kicker="What Murphi Checks"
          heading="Five kinds of review, run on every chart."
        >
          <Checks checks={CHECKS} />
        </ModuleSection>

        <Outcomes
          heading="What agencies get back."
          intro="Practical outcomes from catching issues earlier in the workflow."
          outcomes={OUTCOMES}
        />

        <EhrIntegration
          heading="Works with the EHR you already use."
          lede="Referral, F2F, OASIS, POC and visit notes pulled directly — findings written back where your team already works."
          substeps={["Fetch", "Analyze", "Findings", "Human Review", "Write Back"]}
          disclaimer="Manual PDF upload is also supported where direct integration isn't available."
        />

        <FaqSection items={FAQS.revenueAssurance} />

        <FinalCta
          heading={"Never Meet Mr. Delgado's Chart Again — On Appeal."}
          body="See how Murphi surfaces the gap while there's still time to close it."
        />
      </main>

      <Footer />
    </div>
  );
}
