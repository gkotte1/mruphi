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
import InnerHero from "@/components/inner-page/Hero";
import { FetchNote, FinalCta } from "@/components/inner-page/kit";
import { InnerPage, IpEyebrow, IpHead, IpWrap } from "@/components/inner-page/Shell";
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
    <InnerPage>
      <JsonLd data={faqSchema(FAQS.ehrCompanies, "/ehr-companies/")} />
      <JsonLd data={breadcrumbSchema("/ehr-companies/", "Home Health & Hospice EHR Companies")} />

      <Navbar />

      <main>
        <InnerHero
          current="Home Health & Hospice EHR Companies"
          parent={{ label: "Who We Serve", href: "/#serve" }}
          eyebrow="Who We Serve · EHR Companies"
          title="Embed Healthcare AI Into Every Clinical Workflow."
          lede="Murphi.ai enables Home Health, Hospice and Palliative Care platforms to introduce ambient documentation, intelligent assessments, clinical quality checks, and compliance workflows  - without building or maintaining the complete enterprise AI infrastructure internally."
          trust={[
            "Embedded & White-Labeled",
            "API-Driven",
            "Human-in-the-Loop",
            "Enterprise AI Infrastructure",
          ]}
          primaryHref="#layers"
          primaryLabel="Explore Features"
          visual={
            <EmbeddedLayer
              title="Clinician Interaction"
              status="Live"
              input="Voice, text, EHR data"
              layerLabel="↓ Murphi.ai - Intelligence Layer ↓"
              modules={MODULES}
              output="Structured EHR documentation - validated, compliant, approved"
              foot={["Launch workflows in phases", "One scalable platform"]}
            />
          }
        />

        <section className="ip-section">
          <IpWrap>
            <Pillars pillars={PILLARS} />
          </IpWrap>
        </section>

        <section className="ip-section ip-band">
          <IpWrap>
            <IpHead>
              <IpEyebrow>Interactive Feature Explorer</IpEyebrow>
              <h2 className="ip-h2 ip-serif" style={{ marginTop: 16, marginBottom: 18 }}>
                AI Features Across the Care Continuum
              </h2>
              <p className="ip-lead">
                Explore by care setting or filter by workflow type. Each feature is
                available as an embedded component, an API, or a white-labeled
                experience.
              </p>
            </IpHead>

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
                        <span className="flex items-center gap-2.5 rounded-[8px] border border-[#E3E3E3] bg-white px-3.5 py-2.5">
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
          </IpWrap>
        </section>

        <section id="layers" className="ip-section">
          <IpWrap>
            <IpHead>
              <IpEyebrow>Platform Infrastructure</IpEyebrow>
              <h2 className="ip-h2 ip-serif" style={{ marginTop: 16, marginBottom: 18 }}>
                The Enterprise AI Platform Behind Every Feature
              </h2>
              <p className="ip-lead">
                Each visible AI feature is powered by a production-grade
                infrastructure that handles orchestration, validation, security,
                and observability automatically. Click a layer to expand it.
              </p>
            </IpHead>

            <LayerStack
              layers={LAYERS.map((layer) => ({
                title: layer.title,
                sub: layer.sub,
                body: <FeatureTiles features={layer.chips} />,
              }))}
            />

            <Reveal>
              <p className="mt-[18px] max-w-[70ch] text-[13px] leading-[1.6] text-[#878787]">
                The AI feature may be visible to the user. The infrastructure that
                makes it scalable, reliable, secure, and maintainable operates
                entirely behind the scenes.
              </p>
            </Reveal>
          </IpWrap>
        </section>

        <section className="ip-section ip-band">
          <IpWrap>
            <IpHead>
              <IpEyebrow>Integration Options</IpEyebrow>
              <h2 className="ip-h2 ip-serif" style={{ marginTop: 16, marginBottom: 18 }}>
                Three Ways to Integrate Murphi.ai
              </h2>
              <p className="ip-lead">
                Choose the approach that matches how your platform is built - or
                combine all three.
              </p>
            </IpHead>

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
          </IpWrap>
        </section>

        <section className="ip-section">
          <IpWrap>
            <IpHead>
              <IpEyebrow>Implementation Roadmap</IpEyebrow>
              <h2 className="ip-h2 ip-serif" style={{ marginTop: 16, marginBottom: 18 }}>
                From First Feature to Full Platform
              </h2>
              <p className="ip-lead">
                Start with one high-value workflow. Expand from there without
                requiring a large-bang implementation.
              </p>
            </IpHead>
            <Roadmap phases={ROADMAP} />
          </IpWrap>
        </section>

        <section className="ip-section ip-band">
          <IpWrap>
            <IpHead>
              <IpEyebrow>Security &amp; Governance</IpEyebrow>
              <h2 className="ip-h2 ip-serif" style={{ marginTop: 16, marginBottom: 18 }}>
                Built for Healthcare-Grade Trust
              </h2>
              <p className="ip-lead">
                Every Murphi.ai workflow is designed with clinical accountability
                and data stewardship in mind.
              </p>
            </IpHead>
            <SecuritySpecs items={SECURITY} />
          </IpWrap>
        </section>

        <div className="ip-faq">
          <FaqSection items={FAQS.ehrCompanies} divider="none" />
        </div>

        <FinalCta
          heading="Experience AI Automation at Scale"
          body="Tell us your care setting and we'll show you exactly what Murphi.ai delivers for your organization - a live demo tailored to your workflows and your team."
        />
      </main>

      <Footer />
    </InnerPage>
  );
}
