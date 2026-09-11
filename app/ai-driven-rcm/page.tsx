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
import InnerHero from "@/components/inner-page/Hero";
import { FetchNote, FinalCta, SoonCallout } from "@/components/inner-page/kit";
import { InnerPage, IpEyebrow, IpHead, IpWrap } from "@/components/inner-page/Shell";
import ClaimReadiness from "@/components/ai-driven-rcm/HeroVisual";
import Mechanics from "@/components/ai-driven-rcm/Mechanics";
import {
  AutomatedPanel,
  Outcomes,
  StoryRule,
  Timelines,
} from "@/components/ai-driven-rcm/Sections";

export const metadata: Metadata = pageMetadata("/ai-driven-rcm/", {
  title: "AI-Driven RCM for Home Health - Launching Soon",
  description:
    "AI-driven revenue cycle management for home health and hospice: claim readiness, denial prevention and ERA/EOB reconciliation tracked across the full claim lifecycle.",
});

const STAGES = [
  { num: "01", label: "Eligibility" },
  { num: "02", label: "Authorization" },
  { num: "03", label: "Documentation" },
  { num: "04", label: "Coding" },
  { num: "05", label: "Claim Readiness" },
  { num: "06", label: "Claim" },
  { num: "07", label: "ERA / EOB" },
  { num: "08", label: "Payment" },
  { num: "09", label: "Reconciliation" },
];

const AUTOMATED = [
  "Eligibility",
  "Prior Authorization",
  "Claim Readiness",
  "Denial Identification",
  "Denial Analysis",
  "Appeal Generation",
  "EOB / ERA Analysis",
  "837 vs 835 Reconciliation",
  "Payment Reconciliation",
];

const OUTCOMES = [
  {
    title: "Fewer Denials",
    sub: "Issues caught before submission",
    icon: "shield" as const,
  },
  {
    title: "Protected Reimbursement",
    sub: "Claims ready before they go out",
    icon: "tick" as const,
  },
  { title: "Faster Appeals", sub: "AI-assisted appeal assembly", icon: "clock" as const },
  {
    title: "Cleaner Reconciliation",
    sub: "837 vs 835 matched automatically",
    icon: "layers" as const,
  },
  { title: "Full Visibility", sub: "Across the claim lifecycle", icon: "info" as const },
  {
    title: "Less Manual Rework",
    sub: "Fewer claims kicked back for correction",
    icon: "bolt" as const,
  },
];

export default function AiDrivenRcmPage() {
  return (
    <InnerPage>
      <JsonLd data={moduleSchema("/ai-driven-rcm/")} />
      <JsonLd data={faqSchema(FAQS.aiDrivenRcm, "/ai-driven-rcm/")} />
      <JsonLd data={breadcrumbSchema("/ai-driven-rcm/", "AI-Driven RCM")} />

      <Navbar />

      <main>
        <InnerHero
          current="AI-Driven RCM"
          eyebrow="AI-Driven RCM"
          badge="Launching Soon"
          title="Meet the Problem Before the Payer Does."
          storyTag="Ninety Days Later"
          story={
            'A denial letter arrives: "insufficient documentation." Ninety days too late to fix what actually happened - a coding step that never made it into the claim in the first place.'
          }
          lede="Murphi tracks each claim across eligibility, authorization, documentation and coding - and intercepts the same kind of issue while it's still a fixable step, not a finished denial."
          trust={["HIPAA", "SOC 2", "Human review before submission"]}
          primaryLabel="Join the Early Access List"
          visual={
            <ClaimReadiness
              title="Claim Readiness"
              status="1 Issue Intercepted"
              nodes={[
                { label: "Eligibility", state: "pass" },
                { label: "Authorization", state: "pass" },
                { label: "Documentation", state: "flag" },
                { label: "Claim", state: "pending" },
              ]}
              finding={{
                title: "Documentation gap detected",
                meta: "Resolve before claim submission",
              }}
              foot={["Resolved → Ready to Submit", "Reviewer approval required"]}
            />
          }
        />

        <section className="ip-section ip-band">
          <IpWrap>
            <Reveal>
              <SoonCallout>
                <strong style={{ color: "#007EFF" }}>Launching Soon.</strong> AI-Driven
                RCM is in active development. This page reflects the planned workflow
                - capabilities may change before general availability.
              </SoonCallout>
            </Reveal>

            <StoryRule>The Same Gap, Two Moments</StoryRule>

            <Timelines
              before={{
                title: "Found in the Denial Letter",
                steps: [
                  "Claim submitted, then denials are analyzed afterward",
                  "EOB/ERA reconciliation is manual and time-consuming",
                  "An appeal package is assembled from scratch, ninety days late",
                  "The same root cause repeats on the next claim",
                ],
              }}
              after={{
                title: "Found Before the Claim Ships",
                steps: [
                  "Claim readiness is checked at each stage, before submission",
                  "Issues are intercepted and routed for resolution",
                  "Denial analysis and appeal assembly are AI-assisted, when needed",
                  "Payment reconciliation happens against 837/835 data",
                ],
              }}
            />
          </IpWrap>
        </section>

        <section id="how" className="ip-section">
          <IpWrap>
            <IpHead>
              <IpEyebrow>The Mechanics</IpEyebrow>
              <h2 className="ip-h2 ip-serif" style={{ marginTop: 16, marginBottom: 18 }}>
                A claim{"'"}s path, end to end.
              </h2>
            </IpHead>
            <Mechanics stages={STAGES} />
          </IpWrap>
        </section>

        <section className="ip-section">
          <IpWrap>
            <IpHead>
              <IpEyebrow>What{"'"}s Automated</IpEyebrow>
              <h2 className="ip-h2 ip-serif" style={{ marginTop: 16, marginBottom: 18 }}>
                What Murphi automates.
              </h2>
            </IpHead>
            <AutomatedPanel
              items={AUTOMATED}
              note={
                <FetchNote>
                  Murphi surfaces issues and assists resolution - claim submission
                  decisions remain with your team.
                </FetchNote>
              }
            />
          </IpWrap>
        </section>

        <Outcomes heading="What agencies get back." outcomes={OUTCOMES} />

        <div className="ip-faq">
          <FaqSection items={FAQS.aiDrivenRcm} divider="none" />
        </div>

        <FinalCta
          heading={"Read the Denial Letter Before It's Written."}
          body="AI-Driven RCM is launching soon. Join the early access list to be first to see it on your claims."
          primaryLabel="Join Early Access"
        />
      </main>

      <Footer />
    </InnerPage>
  );
}
