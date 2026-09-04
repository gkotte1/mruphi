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
import {
  Breadcrumb,
  FinalCta,
  ModuleSection,
  PageHero,
  TrustDot,
} from "@/components/module-page/sections";
import WorkflowLayer from "@/components/agencies/HeroVisual";
import Roles, { type Role } from "@/components/agencies/Roles";
import Stories, { type Story } from "@/components/agencies/Stories";
import {
  EhrLayer,
  ModuleLinks,
  StartSmall,
  StoriesHead,
} from "@/components/agencies/Sections";

export const metadata: Metadata = pageMetadata("/agencies/", {
  title: "Home Health & Hospice Agencies - AI Platform",
  description:
    "A home health and hospice AI platform that sits alongside the EHR your agency already runs on - one module, or six. No replacement, no rip-and-replace project.",
});

const MODULES = [
  { name: "Clinical Documentation" },
  { name: "Revenue Assurance" },
  { name: "Patient Engagement" },
  { name: "Patient Payments" },
  { name: "Referral / Intake", soon: true },
  { name: "AI-Driven RCM", soon: true },
];

const ROLES: Role[] = [
  {
    id: "owner",
    label: "Owner / Administrator",
    what: "The census check, the payroll approval and the denial call don't go away - but the OASIS review she was supposed to get to by 9 already happened overnight.",
    modules: ["Ambient AI", "Revenue Assurance", "Patient Payments"],
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
    items: ["HOPE", "IDG Documentation", "Chaplain / Social Worker Notes"],
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
    title: "Patient Payments",
    href: "/patient-payments/",
    body: "Text. Tap. Paid. - collections with automatic reconciliation.",
  },
];

const VICKI = {
  quote:
    '"Murphi AI has truly transformed how we approach clinical workflow documentation in hospice and palliative care. Documentation that used to take up valuable clinical time is now streamlined, accurate, and intuitive."',
  initials: "VG",
  name: "Vicki Goodman",
  role: "Chief Revenue Officer, Curantis Solutions",
};

const TESTIMONIALS: Story[] = [
  VICKI,
  {
    quote:
      "Another Home Health or Hospice customer quote goes here - placeholder pending a validated testimonial.",
    initials: " - ",
    name: "Customer name",
    role: "Role, Agency",
    placeholder: true,
  },
  {
    quote:
      "A third Home Health or Hospice customer quote goes here - placeholder pending a validated testimonial.",
    initials: " - ",
    name: "Customer name",
    role: "Role, Agency",
    placeholder: true,
  },
  VICKI,
  {
    quote:
      "Another Home Health or Hospice customer quote goes here - placeholder pending a validated testimonial.",
    initials: " - ",
    name: "Customer name",
    role: "Role, Agency",
    placeholder: true,
  },
];

export default function AgenciesPage() {
  return (
    <div>
      <JsonLd data={faqSchema(FAQS.agencies, "/agencies/")} />
      <JsonLd data={breadcrumbSchema("/agencies/", "Home Health & Hospice Agencies")} />

      <Navbar />

      {/* The navigation is position:fixed, so it occupies no space in flow.
          Without this offset the breadcrumb renders behind it and only clears
          the bar once the page scrolls. */}
      <main className="bg-white pt-[80px]">
        <Breadcrumb current="Home Health & Hospice Agencies" section="who-we-serve" />

        <PageHero
          eyebrow="Who We Serve · Agencies"
          title="Run the Whole Agency Without Replacing What Already Works."
          storyTag="Monday, 7:00 AM"
          story="Before the first visit of the day, the owner has already checked the census, approved payroll, and fielded a call about a claim that came back denied. By 9, she's supposed to be reviewing OASIS accuracy too."
          lede="Murphi doesn't ask her to replace the EHR she already runs the agency on. It sits alongside it - one module, or six - each one taking a piece of that morning off her plate."
          trust={
            <>
              HIPAA <TrustDot /> SOC 2 <TrustDot /> ISO 27001 <TrustDot /> BAA
            </>
          }
          secondaryHref="#roles"
          secondaryLabel="Find Your Role"
          visual={
            <WorkflowLayer label="Six Workflows, One Agency" modules={MODULES} />
          }
        />

        <ModuleSection
          id="roles"
          border={false}
          kicker="Everybody's Monday Looks Different"
          heading="Find what changes for your role."
        >
          <Roles roles={ROLES} />
        </ModuleSection>

        <ModuleSection
          kicker="Start Small"
          heading="Start with one module. Add more when you're ready."
        >
          <StartSmall groups={SETTINGS} />

          <div className="mt-10">
            <ModuleLinks cards={RELATED} />
          </div>
        </ModuleSection>

        <div className="border-t border-grey-mid">
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
        </div>

        <ModuleSection border={false}>
          <StoriesHead heading="What Home Health and Hospice agencies say." />
          <Stories cards={TESTIMONIALS} />
        </ModuleSection>

        <FaqSection items={FAQS.agencies} />

        <FinalCta
          heading="Give Monday Morning Back."
          body="A live demo tailored to your workflows and your team."
        />
      </main>

      <Footer />
    </div>
  );
}
