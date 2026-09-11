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
import InnerHero from "@/components/inner-page/Hero";
import { FinalCta } from "@/components/inner-page/kit";
import { InnerPage, IpEyebrow, IpHead, IpWrap } from "@/components/inner-page/Shell";
import ClientHub from "@/components/coding-billing-rcm/Hub";
import BrandSwitch from "@/components/coding-billing-rcm/BrandSwitch";
import Toolset, { type Tool } from "@/components/coding-billing-rcm/Toolset";
import {
  ModelSplit,
  Note,
  Outcomes,
  ReviewSurface,
  StoryRule,
  Timelines,
} from "@/components/coding-billing-rcm/Sections";

export const metadata: Metadata = pageMetadata("/coding-billing-rcm/", {
  title: "Coding, Billing & RCM Companies - Multi-Client AI",
  description:
    "Home health coding, billing and RCM consulting software: AI compliance and revenue review that works the same way across every client, under your own brand.",
});

const CLIENTS = [
  "Client Agency A",
  "Client Agency B",
  "Client Agency C",
  "Client Agency D",
];

/* The four results the hero names, returned to every client. */
const OUTPUTS = ["Coding", "OASIS", "QA", "RCM"];

const MODELS = [
  {
    eyebrow: "Managed Services",
    title: "You Run Reports for Your Clients",
    body: "Priya logs into Murphi, pulls up each client's data, runs the AI compliance and coding reports, and delivers the results herself. She stays in control of the workflow and the relationship.",
    bestFor:
      "consultants who want hands-on control over deliverables and client communication.",
  },
  {
    eyebrow: "Self-Service Agency",
    title: "Your Clients Work in Their Own Workspace",
    body: "Each of the forty clients gets its own workspace and runs its own reports. Priya provides oversight, training and guidance - and scales her practice without scaling her hours.",
    bestFor:
      "consultants who want to serve more clients without proportionally increasing their time.",
  },
];

const TOOLS: Tool[] = [
  {
    id: "hh",
    label: "Revenue Assurance - Home Health",
    badge: { tone: "live", text: "Live" },
    count: "15",
    text: "AI compliance reports for Home Health clients.",
    reports: [
      "Face-to-Face Documentation",
      "OASIS Accuracy",
      "Coding Review",
      "ADR Preparation",
      "PDGM Optimization",
      "Recertification Validation",
    ],
  },
  {
    id: "hospice",
    label: "Revenue Assurance - Hospice",
    badge: { tone: "live", text: "Live" },
    count: "13",
    text: "AI compliance reports for Hospice clients.",
    reports: [
      "CTI Validator",
      "HOPE Assessment Review",
      "IDG Documentation",
      "End-of-Life Risk Band Analyzer (EOLRBA)",
      "And More",
    ],
  },
  {
    id: "wl",
    label: "White-Label Option",
    badge: { tone: "soon", text: "White Label" },
    text: "Offer Murphi.ai under your own brand. Your clients see your platform, your logo, your practice - powered by Murphi.ai AI in the background.",
  },
];

const FINDINGS = [
  {
    tone: "flag" as const,
    title: "Homebound status not fully documented",
    meta: "Section G · Visit 3",
  },
  {
    tone: "opportunity" as const,
    title: "PDGM grouping opportunity identified",
    meta: "Coding review",
  },
];

const OUTCOMES = [
  {
    title: "Scale Without Adding Headcount",
    sub: "Proportionally to client growth",
    icon: "layers" as const,
  },
  { title: "Standardized Review", sub: "Same process, every client", icon: "tick" as const },
  {
    title: "Improved Turnaround",
    sub: "Repetitive analysis automated",
    icon: "clock" as const,
  },
  {
    title: "Client Separation",
    sub: "Maintained across the platform",
    icon: "shield" as const,
  },
  {
    title: "White-Label Option",
    sub: "Where applicable to your business",
    icon: "info" as const,
  },
  {
    title: "Faster Client Onboarding",
    sub: "Same platform, every new agency",
    icon: "bolt" as const,
  },
];

export default function CodingBillingRcmPage() {
  return (
    <InnerPage>
      <JsonLd data={faqSchema(FAQS.codingBillingRcm, "/coding-billing-rcm/")} />
      <JsonLd data={breadcrumbSchema("/coding-billing-rcm/", "Coding, Billing, RCM & Consulting Companies")} />

      <Navbar />

      <main>
        <InnerHero
          current="Coding, Billing, RCM & Consulting Companies"
          parent={{ label: "Who We Serve", href: "/#serve" }}
          eyebrow="Who We Serve · Consultants"
          title="One Tuesday. Forty Clients."
          storyTag="Tuesday, 8:00 AM"
          story="Priya has forty agency clients on her roster and one Tuesday to get through OASIS review for all of them. Every client has its own EHR, its own quirks, its own deadline."
          lede="Murphi gives coding and billing consultants AI-powered compliance and revenue tools that work the same way across every client - so Priya's Tuesday scales without adding a person to do it."
          trust={["HIPAA", "SOC 2", "Client-level data separation"]}
          visual={
            <ClientHub
              clients={CLIENTS}
              outputs={OUTPUTS}
              foot="Results returned to each agency"
            />
          }
        />

        <section className="ip-section">
          <IpWrap>
            <IpHead>
              <IpEyebrow>Work the Way You Want</IpEyebrow>
              <h2 className="ip-h2 ip-serif" style={{ marginTop: 16, marginBottom: 18 }}>
                Two ways to run Priya{"'"}s Tuesday.
              </h2>
            </IpHead>
            <ModelSplit models={MODELS} />
          </IpWrap>
        </section>

        <section className="ip-section ip-band">
          <IpWrap>
            <IpHead>
              <IpEyebrow>What Runs on Every Client{"'"}s Charts</IpEyebrow>
              <h2 className="ip-h2 ip-serif" style={{ marginTop: 16, marginBottom: 18 }}>
                AI tools for coding & billing consultants.
              </h2>
            </IpHead>
            <Toolset tools={TOOLS} />
            <Reveal>
              <Note>
                <strong className="text-ink">AI accuracy.</strong> 90–95% AI
                accuracy on all reports, with a structured human review workflow so
                Priya keeps quality control before anything reaches a client.
              </Note>
            </Reveal>
          </IpWrap>
        </section>

        <section className="ip-section">
          <IpWrap>
            <StoryRule>Forty Clients, Two Timelines</StoryRule>
            <Timelines
              before={{
                title: "Without Murphi",
                steps: [
                  "Client forty-one means hiring reviewer forty-one",
                  "Review quality drifts depending on who's covering what that week",
                  "Turnaround slows every time the roster grows",
                  "Every client's reporting is assembled from scratch",
                ],
              }}
              after={{
                title: "With Murphi",
                steps: [
                  "Client forty-one runs on the same platform as client one",
                  "Every client gets the identical, standardized review process",
                  "Repetitive chart analysis is automated - turnaround holds steady",
                  "Client data stays separated, even inside one platform",
                ],
              }}
            />
          </IpWrap>
        </section>

        {/* The head is rendered inside the switch so the kicker, heading,
            control and panel all share one centre line. */}
        <section className="ip-section">
          <IpWrap>
            <Reveal>
              <BrandSwitch
                kicker="Your Name on the Door"
                heading="White-label where it fits your business."
                lede={"Toggle to see the same review presented under Murphi's brand - or under Priya's."}
                options={[
                  { id: "murphi", label: "Murphi Brand" },
                  { id: "yours", label: "Your Brand" },
                ]}
                panels={[
                  {
                    id: "murphi",
                    body: (
                      <ReviewSurface
                        brand="Murphi.ai"
                        status="Live"
                        findings={FINDINGS}
                        client="Client: Agency A"
                      />
                    ),
                  },
                  {
                    id: "yours",
                    body: (
                      <ReviewSurface
                        brand="Your Brand"
                        status="Live"
                        findings={FINDINGS}
                        client="Client: Agency A"
                      />
                    ),
                  },
                ]}
              />
            </Reveal>
          </IpWrap>
        </section>

        <Outcomes heading="What consulting firms get back." outcomes={OUTCOMES} />

        <div className="ip-faq">
          <FaqSection items={FAQS.codingBillingRcm} divider="none" />
        </div>

        <FinalCta
          heading="Make Every Tuesday Feel Like Client One."
          body="A live demo showing how Murphi.ai scales across multiple Home Health and Hospice clients."
        />
      </main>

      <Footer />
    </InnerPage>
  );
}
