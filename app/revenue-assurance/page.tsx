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
import { RaEyebrow, RaHead, RaWrap, RevenuePage } from "@/components/revenue-assurance/Shell";
import Hero from "@/components/revenue-assurance/Hero";
import Mechanics from "@/components/revenue-assurance/Mechanics";
import Checks, { type Check } from "@/components/revenue-assurance/Checks";
import {
  EhrIntegration,
  FinalCta,
  Outcomes,
  Timelines,
} from "@/components/revenue-assurance/Sections";

export const metadata: Metadata = pageMetadata("/revenue-assurance/", {
  title: "Revenue Assurance - OASIS & PDGM Review Software",
  description:
    "AI chart review for home health and hospice: OASIS, coding, POC, PDGM and ADR gaps surfaced the day the chart is written, fetched straight from your EHR.",
});

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
    note: "Confirms the documentation a surveyor or auditor would ask for is actually present - the piece that was missing for Mr. Delgado.",
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
    <RevenuePage>
      <JsonLd data={moduleSchema("/revenue-assurance/")} />
      <JsonLd data={faqSchema(FAQS.revenueAssurance, "/revenue-assurance/")} />
      <JsonLd data={breadcrumbSchema("/revenue-assurance/", "Revenue Assurance")} />

      <Navbar />

      <main>
        <Hero />

        <section className="ra-section ra-band">
          <RaWrap>
            <RaHead>
              <h2 className="ra-h2 ra-serif" style={{ marginBottom: 18 }}>
                The Same Chart, Two Timelines
              </h2>
            </RaHead>
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
          </RaWrap>
        </section>

        <section id="how" className="ra-section">
          <RaWrap>
            <RaHead>
              <RaEyebrow>The Mechanics</RaEyebrow>
              <h2 className="ra-h2 ra-serif" style={{ marginTop: 16, marginBottom: 18 }}>
                From chart to resolved finding.
              </h2>
            </RaHead>
            <Mechanics steps={STEPS} />
          </RaWrap>
        </section>

        <section className="ra-section">
          <RaWrap>
            <RaHead>
              <RaEyebrow>What Murphi Checks</RaEyebrow>
              <h2 className="ra-h2 ra-serif" style={{ marginTop: 16, marginBottom: 18 }}>
                Five kinds of review, run on every chart.
              </h2>
            </RaHead>
            <Checks checks={CHECKS} />
          </RaWrap>
        </section>

        <Outcomes
          heading="What agencies get back."
          intro="Practical outcomes from catching issues earlier in the workflow."
          outcomes={OUTCOMES}
        />

        <EhrIntegration
          heading="Works with the EHR you already use."
          lede="Referral, F2F, OASIS, POC and visit notes pulled directly - findings written back where your team already works."
          substeps={["Fetch", "Analyze", "Findings", "Human Review", "Write Back"]}
          disclaimer="Manual PDF upload is also supported where direct integration isn't available."
        />

        <div className="ra-faq ra-band">
          <FaqSection items={FAQS.revenueAssurance} divider="none" />
        </div>

        <FinalCta
          heading={"Never Meet Mr. Delgado's Chart Again - On Appeal."}
          body="See how Murphi surfaces the gap while there's still time to close it."
        />
      </main>

      <Footer />
    </RevenuePage>
  );
}
