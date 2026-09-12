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
import { InnerPage, IpEyebrow, IpHead, IpWrap } from "@/components/inner-page/Shell";
import WorkflowLayer from "@/components/agencies/HeroVisual";
import Roles, { type Role } from "@/components/agencies/Roles";
import {
  EhrLayer,
  ModuleLinks,
  StartSmall,
} from "@/components/agencies/Sections";

export const metadata: Metadata = pageMetadata("/agencies/", {
  title: "Home Health & Hospice Agencies - AI Platform",
  description:
    "A home health and hospice AI platform that sits alongside the EHR your agency already runs on - one module, or six. No replacement, no rip-and-replace project.",
});

const MODULES = [
  { name: "Ambient AI & Dictation" },
  { name: "Patient Engagement" },
  { name: "Revenue Assurance" },
  { name: "Patient Payments" },
];

const ROLES: Role[] = [
  {
    id: "owner",
    label: "Owner / Administrator",
    what: "The census check, the payroll approval and the denial call don't go away - but the OASIS review she was supposed to get to by 9 already happened overnight.",
    modules: [
      "Ambient AI & Dictation",
      "Revenue Assurance",
      "Patient Engagement",
      "Patient Payments",
    ],
  },
  {
    id: "clinician",
    label: "Clinician",
    what: "The evening that used to disappear into charting comes back - notes are drafted the same day, from the visit itself.",
    modules: ["Ambient AI & Dictation"],
  },
  {
    id: "qa",
    label: "Clinical / QA",
    what: "Every chart gets the same review, the same day it's written - not a sample, and not six weeks later on appeal.",
    modules: ["Revenue Assurance"],
  },
  {
    id: "rcm",
    label: "Coder / Biller / RCM",
    what: "Coding and PDGM opportunities surface before the claim goes out, not after the denial comes back.",
    modules: ["Revenue Assurance"],
    soonModule: "AI-Driven RCM",
  },
  {
    id: "intake",
    label: "Intake",
    what: "A referral that used to wait for Monday starts moving the moment it arrives - nights and weekends included.",
    modules: [],
    soonModule: "Referral → NOA",
  },
];

const SETTINGS = [
  {
    label: "Home Health",
    items: ["OASIS", "SN / PT / OT / ST", "PDGM"],
    soon: "NOA",
  },
  {
    label: "Hospice",
    items: ["HOPE", "Chaplain / Social Worker Notes", "IDG Documentation"],
  },
];

const RELATED = [
  {
    title: "Ambient AI & Dictation",
    href: "/ambient-ai-dictation/",
    body: "Give the evening back - structured documentation from a visit or a 3-minute dictation.",
  },
  {
    title: "Revenue Assurance",
    href: "/revenue-assurance/",
    body: "Catch it on day one - chart review before submission, fetched directly from your EHR.",
  },
  {
    title: "Patient Engagement",
    href: "/patient-engagement/",
    body: "Meet patients where they are - secure SMS outreach without an app install.",
  },
  {
    title: "Patient Payments",
    href: "/patient-payments/",
    body: "Text. Tap. Paid. - collections with automatic reconciliation.",
  },
];

export default function AgenciesPage() {
  return (
    <InnerPage>
      <JsonLd data={faqSchema(FAQS.agencies, "/agencies/")} />
      <JsonLd data={breadcrumbSchema("/agencies/", "Home Health & Hospice Agencies")} />

      <Navbar />

      <main>
        <InnerHero
          current="Home Health & Hospice Agencies"
          parent={{ label: "Who We Serve", href: "/#serve" }}
          eyebrow="Who We Serve · Agencies"
          title="AI enable agency workflows"
          storyTag="Monday, 7:00 AM"
          story="Before the first visit of the day, the owner has already checked the census, approved payroll, and fielded a call about a claim that came back denied. By 9, she's supposed to be reviewing OASIS accuracy too."
          lede="Murphi doesn't ask her to replace the EHR she already runs the agency on. It sits alongside it - one module, or six - each one taking a piece of that morning off her plate."
          trust={["HIPAA", "SOC 2", "ISO 27001", "BAA"]}
          visual={
            <WorkflowLayer label="Six Workflows, One Agency" modules={MODULES} />
          }
        />

        <section id="roles" className="ip-section">
          <IpWrap>
            <IpHead>
              <IpEyebrow>Everybody{"'"}s Monday Looks Different</IpEyebrow>
              <h2 className="ip-h2 ip-serif" style={{ marginTop: 16, marginBottom: 18 }}>
                Find what changes for your role.
              </h2>
            </IpHead>
            <Roles roles={ROLES} />
          </IpWrap>
        </section>

        <section className="ip-section ip-band">
          <IpWrap>
            <IpHead>
              <IpEyebrow>Start Small</IpEyebrow>
              <h2 className="ip-h2 ip-serif" style={{ marginTop: 16, marginBottom: 18 }}>
                Leverage all four Modules with EHR integration
              </h2>
            </IpHead>
            <StartSmall groups={SETTINGS} />
            <div className="mt-10">
              <ModuleLinks cards={RELATED} />
            </div>
          </IpWrap>
        </section>

        <EhrLayer
          heading="You do not need to replace your EHR to add AI."
          lede="Murphi connects to the EHR you already use. Fetch, analyze, automate, generate, human review, write back."
          panelLabel="Your EHR ⇄ Murphi AI ⇄ Your EHR"
          bandLabel="Your EHR"
          steps={[
            "Fetch",
            "Analyze",
            "Automate",
            "Generate",
            "Human Review",
            "Write Back",
          ]}
        />

        <div className="ip-faq ip-band">
          <FaqSection items={FAQS.agencies} divider="none" />
        </div>

        <FinalCta
          heading="Give Monday Morning Back."
          body="A live demo tailored to your workflows and your team."
        />
      </main>

      <Footer />
    </InnerPage>
  );
}
