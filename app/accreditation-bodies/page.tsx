import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqSection from "@/components/module-page/FaqSection";
import { FAQS } from "@/lib/faqs";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
} from "@/lib/schema";
import { pageMetadata } from "@/lib/site";
import InnerHero from "@/components/inner-page/Hero";
import { FinalCta } from "@/components/inner-page/kit";
import { InnerPage, IpHead, IpWrap } from "@/components/inner-page/Shell";
import SurveyReadiness from "@/components/accreditation-bodies/HeroVisual";
import {
  BothSides,
  DualWorkflow,
  Outcomes,
  OversightNote,
  StoryRule,
  ToolSpecs,
  WaysList,
} from "@/components/accreditation-bodies/Sections";

export const metadata: Metadata = pageMetadata("/accreditation-bodies/", {
  title: "Accreditation Bodies - Survey Readiness Software",
  description:
    "Hospice and home health compliance software for accreditation bodies and the agencies they survey - evidence validated into survey-ready reports, faster.",
});

const SIDES = [
  {
    eyebrow: "For the Agency",
    heading: "No More Binders the Night Before.",
    points: [
      "Fetch the records a surveyor will ask for directly from your EHR, in minutes instead of an evening of manual pulls",
      "Auto-fill accreditation portal fields instead of re-typing the same data by hand",
      "Maintain one current record of policies, training logs and clinical evidence, always survey-ready",
      "Run a gap analysis against CHAP, ACHC and Joint Commission standards before the surveyor ever arrives",
      "Walk in with a survey-ready packet, organized by requirement, corrective actions already tracked",
    ],
  },
  {
    eyebrow: "For the Accreditation Body",
    heading: "Turn the Stack of Paper Into a Report by Monday.",
    points: [
      "Retrieve submitted evidence, policies and clinical charts into one reviewer workspace",
      "Evidence is mapped against your accreditation requirements automatically",
      "Potential findings and gaps are surfaced for reviewer evaluation, not buried in a PDF",
      "Structured survey and audit reports are assembled faster, in your format",
      "Less time spent on manual report generation, more time on analysis and follow-up",
    ],
  },
];

const WAYS = [
  {
    title: "Help Providers Prepare",
    body: "Run AI compliance reports aligned to CHAP, ACHC and Joint Commission survey standards, with gap analysis and corrective-action tracking, so provider clients walk in fully prepared.",
  },
  {
    title: "Streamline Survey & Audit Reports",
    body: "Generate structured survey and audit reports using AI, aligned to your accreditation standards - less time on manual assembly, more time on analysis and follow-up.",
  },
  {
    title: "Embed AI in Your Platform",
    body: "If you operate a platform used by accreditation companies or surveyors, embed Murphi.ai features via API, under your own brand.",
  },
];

const TOOLS = [
  {
    title: "Revenue Assurance",
    badge: { tone: "live" as const, text: "Live" },
    body: "35 AI compliance reports aligned to CHAP, ACHC and Joint Commission standards - 20 for Home Health, 15 for Hospice. 90–95% AI accuracy, with a structured human review workflow before anything is finalized.",
  },
  {
    title: "Gap Analysis",
    badge: { tone: "live" as const, text: "Live" },
    body: "AI comparison of current provider documentation against accreditation requirements - surfaces specific gaps, missing elements and corrective-action recommendations.",
  },
  {
    title: "White-Label Platform",
    badge: { tone: "soon" as const, text: "White Label" },
    body: "Offer AI-powered accreditation tools under your own brand. Your clients - providers or surveyors - see your platform. Murphi.ai powers it invisibly.",
  },
];

const FLOWS = [
  {
    lede: "Agency side - from EHR to survey-ready packet.",
    steps: [
      { num: "01", title: "Connect EHR", body: "Records fetched in minutes" },
      {
        num: "02",
        title: "Auto-Fill Portal",
        body: "Accreditation portal fields populated",
      },
      {
        num: "03",
        title: "Gap Analysis",
        body: "Checked against CHAP / ACHC / Joint Commission",
      },
      { num: "04", title: "Corrective Actions", body: "Tracked to resolution" },
      { num: "05", title: "Survey-Ready Packet", body: "Organized by requirement" },
    ],
  },
  {
    lede: "Accreditation body side - from evidence to report.",
    steps: [
      { num: "01", title: "Evidence Received", body: "Policies, charts & interviews" },
      { num: "02", title: "Mapped to Requirements", body: "Organized automatically" },
      { num: "03", title: "Findings Surfaced", body: "Potential gaps flagged" },
      { num: "04", title: "Reviewer Evaluates", body: "Human surveyor judgment" },
      { num: "05", title: "Report Assembled", body: "Structured survey report" },
    ],
  },
];

const OUTCOMES = [
  { title: "EHR Data in Minutes", sub: "Not an evening of binders", icon: "clock" as const },
  { title: "Faster Survey Prep", sub: "Portal fields auto-filled", icon: "tick" as const },
  {
    title: "Less Repetitive Review",
    sub: "Evidence organized automatically",
    icon: "layers" as const,
  },
  {
    title: "Standardized Workflows",
    sub: "Consistent across every survey",
    icon: "shield" as const,
  },
  {
    title: "More Time For Judgment",
    sub: "Less time on assembly",
    icon: "info" as const,
  },
  {
    title: "Human Oversight Maintained",
    sub: "At every step, both sides",
    icon: "bolt" as const,
  },
];

export default function AccreditationBodiesPage() {
  return (
    <InnerPage>
      <JsonLd data={faqSchema(FAQS.accreditationBodies, "/accreditation-bodies/")} />
      <JsonLd data={breadcrumbSchema("/accreditation-bodies/", "Accreditation Bodies")} />

      <Navbar />

      <main>
        <InnerHero
          current="Accreditation Bodies"
          parent={{ label: "Who We Serve", href: "/#serve" }}
          eyebrow="Who We Serve · Accreditation & Audit"
          title="The Night Before the Surveyor Arrives."
          storyTag="Two Desks, Same Night"
          story="At the agency, the DON is pulling training records and F2F documentation into binders by hand. Across town, the surveyor is looking at a stack of paper she'll need to turn into a structured report by Monday."
          lede="Murphi.ai works for both of them - helping the agency walk in prepared, and helping the accreditation body turn evidence into a finished report faster."
          trust={["CHAP", "ACHC", "Joint Commission-Aligned"]}
          visual={
            <SurveyReadiness
              title="Survey Readiness · Agency View"
              status="2 Gaps Found"
              context="EHR record fetched in minutes, not an evening of binders"
              requirements={[
                {
                  requirement: "Requirement 4.2",
                  title: "Staff training record incomplete",
                  state: "gap",
                },
                {
                  requirement: "Requirement 3.1",
                  title: "Evidence mapped & portal fields auto-filled",
                  state: "mapped",
                },
              ]}
              foot={["Survey-ready packet", "Reviewer sign-off required"]}
            />
          }
        />

        <section id="both-sides" className="ip-section">
          <IpWrap>
            <StoryRule>The Same Night, Rewritten - For Both</StoryRule>
            <IpHead>
              <h2 className="ip-h2 ip-serif">
                Built for both sides of the survey.
              </h2>
            </IpHead>
            <BothSides sides={SIDES} />
          </IpWrap>
        </section>

        <section className="ip-section ip-band">
          <IpWrap>
            <IpHead>
              <h2 className="ip-h2 ip-serif">Three ways to work with Murphi.ai.</h2>
            </IpHead>
            <WaysList ways={WAYS} />
          </IpWrap>
        </section>

        <section className="ip-section">
          <IpWrap>
            <IpHead>
              <h2 className="ip-h2 ip-serif">AI tools for accreditation & audit.</h2>
            </IpHead>
            <ToolSpecs tools={TOOLS} />
          </IpWrap>
        </section>

        <section className="ip-section ip-band">
          <IpWrap>
            <IpHead>
              <h2 className="ip-h2 ip-serif">Two workflows, one platform.</h2>
            </IpHead>
            <DualWorkflow flows={FLOWS} />
          </IpWrap>
        </section>

        <section className="ip-section">
          <IpWrap>
            <OversightNote>
              <strong className="text-[#007EFF]">
                Human oversight, on both sides.
              </strong>{" "}
              Murphi.ai organizes evidence, auto-fills portal data and surfaces
              potential findings for agencies and accreditation bodies alike. Survey
              conclusions and accreditation decisions remain the responsibility of
              human surveyors.
            </OversightNote>
          </IpWrap>
        </section>

        <Outcomes heading="What both sides get back." outcomes={OUTCOMES} />

        <div className="ip-faq">
          <FaqSection items={FAQS.accreditationBodies} divider="none" />
        </div>

        <FinalCta
          heading="Skip the Night of Binders. Skip the Stack of Paper."
          body="A live demo showing the agency side, the accreditation-body side, or both - tailored to your workflows and your team."
        />
      </main>

      <Footer />
    </InnerPage>
  );
}
