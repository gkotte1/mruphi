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
import Reveal from "@/components/module-page/Reveal";
import { StatusBadge } from "@/components/module-page/interactive";
import { FetchNote, Lede } from "@/components/module-page/extras";
import {
  Breadcrumb,
  FinalCta,
  ModuleSection,
  TrustDot,
} from "@/components/module-page/sections";
import {
  ArrowGlyph,
  CONTAINER,
  Eyebrow,
  MONO,
  PrimaryButton,
  SECTION,
  SectionHead,
  SecondaryButton,
} from "@/components/module-page/ui";
import EmbeddedLayer from "@/components/ehr-companies/HeroVisual";
import {
  Explorer,
  IntegrationOptions,
  LayerStack,
} from "@/components/ehr-companies/Interactive";
import {
  FeatureTiles,
  Pillars,
  Roadmap,
  SecuritySpecs,
} from "@/components/ehr-companies/Sections";
import { cn } from "@/lib/cn";

export const metadata: Metadata = pageMetadata("/ehr-companies/", {
  title: "Home Health & Hospice EHR Companies - Embed AI",
  description:
    "Embed AI into your home health, hospice or palliative care EHR: ambient documentation, intelligent assessments, clinical quality checks and compliance workflows.",
});

const PILLARS = [
  {
    title: "Embedded and White-Labeled",
    body: "Deploy under your brand, inside your existing user experience.",
  },
  {
    title: "API-Driven Integration",
    body: "Connect to EHR data, documents, and actions through clean APIs.",
  },
  {
    title: "Human-in-the-Loop",
    body: "Clinician review and approval before any EHR write-back.",
  },
  {
    title: "Enterprise AI Infrastructure",
    body: "Production-grade orchestration, governance, and observability.",
  },
];

const MODULES = [
  "Ambient AI",
  "Voice-to-Text",
  "Doc. Intelligence",
  "Clinical Validation",
  "Compliance Review",
  "Workflow Automation",
];

const LAYERS = [
  {
    title: "Experience Layer",
    sub: "What Clinicians See",
    chips: [
      "Embedded EHR Components",
      "White-Labeled Workflows",
      "Mobile & Web Experiences",
      "Clinician Review Interface",
    ],
  },
  {
    title: "AI Orchestration Layer",
    sub: "Intelligence Engine",
    chips: [
      "Multi-Model Orchestration",
      "Prompt & Version Management",
      "RAG & Clinical Context",
      "Structured Output Validation",
      "Confidence Scoring",
      "Cost & Token Optimization",
    ],
  },
  {
    title: "Integration Layer",
    sub: "Data In, Data Out",
    chips: [
      "REST APIs",
      "Webhooks",
      "JSON / HL7 / FHIR",
      "PDF Processing",
      "RPA When Required",
      "Field-Level EHR Mapping",
    ],
  },
  {
    title: "Operations & Governance Layer",
    sub: "Security & Compliance",
    chips: [
      "Audit Logs",
      "Usage Telemetry",
      "Performance Monitoring",
      "Security Controls",
      "Human-in-the-Loop",
      "Continuous Production Support",
    ],
  },
];

const ROADMAP = [
  {
    num: "01",
    title: "Discover & Map",
    body: "Identify the highest-impact clinical workflows and EHR integration points",
  },
  {
    num: "02",
    title: "Pilot Selected Workflows",
    body: "Deploy one or two AI features in a limited environment with clinician feedback loops",
  },
  {
    num: "03",
    title: "Validate & Launch",
    body: "Harden quality, compliance controls, and human-review workflows before production rollout",
  },
  {
    num: "04",
    title: "Expand Across the Platform",
    body: "Activate additional AI modules using the same integration layer already in place",
  },
];

const SECURITY = [
  {
    title: "HIPAA-Aligned Workflows",
    body: "Designed around PHI handling, access controls, and disclosure requirements.",
  },
  {
    title: "Role-Based Access",
    body: "Permissions scoped to clinical role, organization, and data type.",
  },
  { title: "Encryption", body: "Data encrypted in transit and at rest across all layers." },
  {
    title: "Audit Trails",
    body: "Every AI action, review decision, and edit is logged and queryable.",
  },
  {
    title: "Human Review",
    body: "Clinician approval required before any AI output enters the EHR record.",
  },
  {
    title: "Data Retention Controls",
    body: "Configurable retention policies aligned with organizational requirements.",
  },
  {
    title: "Model Monitoring",
    body: "Continuous tracking of output quality, drift, and confidence thresholds.",
  },
  {
    title: "Output Validation",
    body: "Structured validation rules applied before any clinical output is surfaced.",
  },
];

const INTEGRATIONS = [
  {
    id: "embedded",
    title: "Embedded Components",
    body: "Add AI directly into existing screens and clinical workflows without redirecting users to a separate tool.",
  },
  {
    id: "api",
    title: "APIs & Workflow Services",
    body: "Connect Murphi.ai capabilities to EHR data, documents, and actions through a clean, documented API layer.",
  },
  {
    id: "whitelabel",
    title: "White-Labeled AI Platform",
    body: "Launch AI capabilities under your existing brand and user experience. Clinicians never see the Murphi name.",
  },
];

export default function EhrCompaniesPage() {
  return (
    <div>
      <JsonLd data={faqSchema(FAQS.ehrCompanies, "/ehr-companies/")} />
      <JsonLd data={breadcrumbSchema("/ehr-companies/", "Home Health & Hospice EHR Companies")} />

      <Navbar />

      {/* The navigation is position:fixed, so it occupies no space in flow.
          Without this offset the breadcrumb renders behind it and only clears
          the bar once the page scrolls. */}
      <main className="bg-white pt-[80px]">
        <Breadcrumb current="Home Health & Hospice EHR Companies" section="who-we-serve" />

        {/* This hero carries no story block, so it is laid out here rather than
            through the shared PageHero. */}
        <section className="bg-hero-bg pt-7 pb-16 max-720:pt-6 max-720:pb-10">
          <div
            className={cn(
              CONTAINER,
              "grid grid-cols-2 items-center gap-16 max-1080:grid-cols-1 max-1080:gap-12",
            )}
          >
            <Reveal>
              <Eyebrow>Who We Serve · EHR Companies</Eyebrow>

              <h1 className="mt-4 max-w-[16ch] type-h1 text-ink">
                Embed Healthcare AI Into Every Clinical Workflow.
              </h1>

              <p className="mt-[18px] max-w-[56ch] text-[18px] leading-[1.6] text-grey-500">
                Murphi.ai enables Home Health, Hospice and Palliative Care
                platforms to introduce ambient documentation, intelligent
                assessments, clinical quality checks, and compliance workflows  - 
                without building or maintaining the complete enterprise AI
                infrastructure internally.
              </p>

              <div className="mt-[30px] flex flex-wrap items-center gap-3.5 max-720:flex-col max-720:items-stretch">
                <PrimaryButton href="#layers">
                  Explore Features
                  <ArrowGlyph />
                </PrimaryButton>
                <SecondaryButton href="/contact-us/">
                  Discuss an Integration
                </SecondaryButton>
              </div>

              <div
                className={cn(
                  MONO,
                  "mt-8 flex flex-wrap items-center gap-[9px] text-[12px] tracking-[0.02em] text-ink-muted",
                )}
              >
                Embedded &amp; White-Labeled <TrustDot /> API-Driven <TrustDot />{" "}
                Human-in-the-Loop <TrustDot /> Enterprise AI Infrastructure
              </div>
            </Reveal>

            <Reveal>
              <EmbeddedLayer
                title="Clinician Interaction"
                status="Live"
                input="Voice, text, EHR data"
                layerLabel="↓ Murphi.ai - Intelligence Layer ↓"
                modules={MODULES}
                output="Structured EHR documentation - validated, compliant, approved"
                foot={["Launch workflows in phases", "One scalable platform"]}
              />
            </Reveal>
          </div>
        </section>

        <ModuleSection>
          <Pillars pillars={PILLARS} />
        </ModuleSection>

        <section className={cn("border-t border-grey-mid", SECTION)}>
          <div className={CONTAINER}>
            <Eyebrow>Interactive Feature Explorer</Eyebrow>
            <div className="mt-3">
              <SectionHead>AI Features Across the Care Continuum</SectionHead>
            </div>

            <Reveal>
              <Lede className="mb-[22px]">
                Explore by care setting or filter by workflow type. Each feature is
                available as an embedded component, an API, or a white-labeled
                experience.
              </Lede>
            </Reveal>

            <Explorer
              tabs={[
                {
                  id: "all",
                  label: "All Features",
                  panel: (
                    <FeatureTiles
                      features={[
                        "Documentation",
                        "Assessments",
                        "Intake & Referrals",
                        "Medications",
                        "Quality & Compliance",
                        "Coding & Revenue",
                        "Care Coordination",
                        "Platform Infrastructure",
                      ]}
                    />
                  ),
                },
                {
                  id: "shared",
                  label: "Shared AI Capabilities",
                  panel: (
                    <FeatureTiles
                      features={[
                        "Ambient AI & Dictation",
                        "Patient Engagement",
                        "Patient Payments",
                        "Revenue Assurance",
                      ]}
                    />
                  ),
                },
                {
                  id: "hh",
                  label: "Home Health",
                  panel: (
                    <FeatureTiles
                      features={["OASIS", "SN / PT / OT / ST", "PDGM"]}
                      extra={
                        <span className="flex items-center gap-2.5 rounded-tile border border-grey-mid bg-white px-3.5 py-2.5">
                          <span className="text-[13.5px] font-semibold tracking-[-0.01em] text-ink">
                            Referral → NOA
                          </span>
                          <StatusBadge tone="soon">Soon</StatusBadge>
                        </span>
                      }
                    />
                  ),
                },
                {
                  id: "hospice",
                  label: "Hospice & Palliative Care",
                  panel: (
                    <FeatureTiles
                      features={[
                        "HOPE",
                        "IDG Documentation",
                        "Chaplain / Social Worker Notes",
                      ]}
                    />
                  ),
                },
              ]}
            />
          </div>
        </section>

        <section id="layers" className={cn("border-t border-grey-mid", SECTION)}>
          <div className={CONTAINER}>
            <Eyebrow>Platform Infrastructure</Eyebrow>
            <div className="mt-3">
              <SectionHead>
                The Enterprise AI Platform Behind Every Feature
              </SectionHead>
            </div>

            <Reveal>
              <Lede className="mb-[22px]">
                Each visible AI feature is powered by a production-grade
                infrastructure that handles orchestration, validation, security,
                and observability automatically. Click a layer to expand it.
              </Lede>
            </Reveal>

            <LayerStack
              layers={LAYERS.map((layer) => ({
                title: layer.title,
                sub: layer.sub,
                body: <FeatureTiles features={layer.chips} />,
              }))}
            />

            <Reveal>
              <p className="mt-[18px] max-w-[70ch] text-[13px] leading-[1.6] text-ink-muted">
                The AI feature may be visible to the user. The infrastructure that
                makes it scalable, reliable, secure, and maintainable operates
                entirely behind the scenes.
              </p>
            </Reveal>
          </div>
        </section>

        <section className={cn("border-t border-grey-mid", SECTION)}>
          <div className={CONTAINER}>
            <Eyebrow>Integration Options</Eyebrow>
            <div className="mt-3">
              <SectionHead>Three Ways to Integrate Murphi.ai</SectionHead>
            </div>

            <Reveal>
              <Lede className="mb-[22px]">
                Choose the approach that matches how your platform is built - or
                combine all three.
              </Lede>
            </Reveal>

            <IntegrationOptions
              options={INTEGRATIONS}
              details={[
                {
                  id: "embedded",
                  body: (
                    <FetchNote>
                      <strong className="text-ink">Embedded Components.</strong>{" "}
                      Ambient AI, revenue-assurance findings and
                      patient-engagement surfaces render natively inside the
                      screens your users already use.
                    </FetchNote>
                  ),
                },
                {
                  id: "api",
                  body: (
                    <FetchNote>
                      <strong className="text-ink">
                        APIs &amp; Workflow Services.
                      </strong>{" "}
                      Your EHR calls Murphi.ai&rsquo;s structured API, webhook and
                      field-level mapping layer to invoke a capability and receive
                      results back.
                    </FetchNote>
                  ),
                },
                {
                  id: "whitelabel",
                  body: (
                    <FetchNote>
                      <strong className="text-ink">
                        White-Labeled Platform.
                      </strong>{" "}
                      The full Murphi.ai experience, deployed under your brand  - 
                      Murphi.ai powers it invisibly.
                    </FetchNote>
                  ),
                },
              ]}
            />
          </div>
        </section>

        <section className={cn("border-t border-grey-mid", SECTION)}>
          <div className={CONTAINER}>
            <Eyebrow>Implementation Roadmap</Eyebrow>
            <div className="mt-3">
              <SectionHead>From First Feature to Full Platform</SectionHead>
            </div>

            <Reveal>
              <Lede className="mb-2">
                Start with one high-value workflow. Expand from there without
                requiring a large-bang implementation.
              </Lede>
            </Reveal>

            <Roadmap phases={ROADMAP} />
          </div>
        </section>

        <section className={cn("border-t border-grey-mid", SECTION)}>
          <div className={CONTAINER}>
            <Eyebrow>Security &amp; Governance</Eyebrow>
            <div className="mt-3">
              <SectionHead>Built for Healthcare-Grade Trust</SectionHead>
            </div>

            <Reveal>
              <Lede className="mb-[22px]">
                Every Murphi.ai workflow is designed with clinical accountability
                and data stewardship in mind.
              </Lede>
            </Reveal>

            <SecuritySpecs items={SECURITY} />
          </div>
        </section>

        <FaqSection items={FAQS.ehrCompanies} />

        <FinalCta
          heading="Experience AI Automation at Scale"
          body="Tell us your care setting and we'll show you exactly what Murphi.ai delivers for your organization - a live demo tailored to your workflows and your team."
        />
      </main>

      <Footer />
    </div>
  );
}
