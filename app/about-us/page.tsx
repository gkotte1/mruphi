import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OurTeam from "@/components/OurTeam";
import { Icon, type IconName } from "@/components/icons";
import { SimpleHero } from "@/components/inner-page/Hero";
import { FinalCta } from "@/components/inner-page/kit";
import { InnerPage, IpWrap } from "@/components/inner-page/Shell";
import { pageMetadata } from "@/lib/site";

/**
 * /about-us/ - the company page.
 *
 * Hero, Why, Four Modules, Differentiators, Values, then Our Team.
 * Module copy stays aligned with Home and the live module pages.
 */

export const metadata: Metadata = pageMetadata("/about-us/", {
  title: "About Murphi.ai - Home Health & Hospice AI",
  description:
    "Murphi.ai is an AI platform for home health and hospice that reduces administrative work so clinicians and staff can spend more time on patient care.",
});

const MODULES: {
  title: string;
  body: string;
  icon: IconName;
  soon?: boolean;
}[] = [
  {
    title: "Ambient AI & Dictation",
    icon: "mic",
    body: "Captures clinical conversations during the visit and drafts structured notes for review — so charting takes minutes, not hours after the visit.",
  },
  {
    title: "Referral → NOA",
    icon: "route",
    soon: true,
    body: "Streamlines referral intake through classification, checks, and routing — helping agencies move from referral toward Notice of Admission with less manual work and fewer delays.",
  },
  {
    title: "AI-Driven RCM",
    icon: "exchange",
    soon: true,
    body: "Tracks claims across eligibility, authorization, documentation, and coding — surfacing issues early so teams can fix them before submission, not after a denial.",
  },
  {
    title: "Patient Payments",
    icon: "card",
    body: "Sends secure payment links by text, collects balances digitally, and reconciles payments back to the EHR — reducing manual billing follow-up and mailed statements.",
  },
];

const DIFFERENT: { title: string; body: string; icon: IconName }[] = [
  {
    title: "Purpose-built for home health and hospice",
    icon: "home",
    body: "Designed around the documentation, compliance, revenue, and operational realities of post-acute care.",
  },
  {
    title: "Agency-wide value",
    icon: "community",
    body: "Supports clinicians, owners, administrators, coders, billers, compliance teams, QAPI professionals, and RCM specialists.",
  },
  {
    title: "Connected workflows",
    icon: "layers",
    body: "Brings clinical documentation, revenue assurance, compliance, communication, and patient payments together in one platform.",
  },
  {
    title: "Embedded into existing systems",
    icon: "code",
    body: "Integrates with EHR platforms through secure APIs, SSO, iFrames, and configurable workflows.",
  },
  {
    title: "White-label ready",
    icon: "sealcheck",
    body: "Enables EHR and technology partners to offer Murphi.ai capabilities under their own brand and within their existing user experience.",
  },
  {
    title: "Rapid deployment",
    icon: "sync",
    body: "Helps agencies and EHR partners introduce new AI capabilities without lengthy development cycles or disruptive system replacements.",
  },
  {
    title: "Human-guided AI",
    icon: "brain",
    body: "AI-generated findings and documentation remain subject to review and approval by authorized clinicians and agency professionals.",
  },
  {
    title: "Security and compliance at the core",
    icon: "shield",
    body: "Built for healthcare environments with HIPAA-aligned safeguards, role-based access, encryption, auditability, and enterprise-grade security controls.",
  },
  {
    title: "A growing platform",
    icon: "chartup",
    body: "Agencies can begin with the modules they need today and expand as their clinical, compliance, engagement, and financial requirements evolve.",
  },
];

const VALUES: { title: string; body: string; icon: IconName }[] = [
  {
    title: "Trust",
    icon: "shield",
    body: "Healthcare technology must earn the confidence of the people who use it. We protect sensitive information, communicate transparently, and design every workflow with security, accountability, and human oversight at its core. We strive to be a dependable long-term partner to every agency, clinician, EHR company, and healthcare organization we serve.",
  },
  {
    title: "Innovation",
    icon: "brain",
    body: "We apply AI to meaningful healthcare problems—not simply to add technology, but to reduce work, improve accuracy, protect revenue, and enable better care. We continually learn from our customers and transform their most complex workflows into practical, scalable solutions.",
  },
  {
    title: "Customer Delight",
    icon: "heart",
    body: "Our success is measured by the value our customers experience every day. We listen closely, respond quickly, and work as an extension of our customers’ teams. From implementation through ongoing support, we aim to deliver technology and service that consistently exceed expectations.",
  },
];

function SectionRule({
  id,
  children,
}: {
  id?: string;
  children: string;
}) {
  return (
    <div className="min-w-0">
      <span className="mb-5 block h-px w-12 bg-[#007EFF]" aria-hidden />
      <h2 id={id} className="ip-h2 ip-serif">
        {children}
      </h2>
    </div>
  );
}

export default function AboutUsPage() {
  return (
    <InnerPage>
      <Navbar />

      <main>
        <SimpleHero
          current="About Us"
          badge="Company"
          badgeIcon={<Icon name="home" width={13} height={13} />}
          title="About Murphi.ai"
          align="center"
          ledeAlign="left"
          ledeMax="none"
          ledeClassName="type-hl-card-body"
          paddingBottom={64}
          lede="Murphi.ai is an advanced AI platform purpose-built for home health and hospice, helping agencies reduce documentation time, strengthen revenue integrity, improve compliance, engage patients, and accelerate patient payment collections through one connected platform. It supports clinicians, administrators, coders, billers, compliance and QAPI teams, RCM companies, accreditation organizations, and healthcare partners across the agency ecosystem. Murphi.ai also partners with home health and hospice EHR companies to embed AI directly into existing workflows through secure APIs, configurable integrations, and white-label deployment options. By working alongside existing systems, Murphi.ai helps agencies and EHR partners make everyday workflows faster, more accurate, secure, and easier to manage."
        />

        <section
          aria-labelledby="why-heading"
          className="ip-section ip-band"
        >
          <IpWrap
            className="ip-split"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,0.4fr) minmax(0,1fr)",
              alignItems: "start",
              gap: 64,
            }}
          >
            <div className="min-w-0">
              <span className="mb-5 block h-px w-12 bg-[#007EFF]" aria-hidden />
              <h2 id="why-heading" className="ip-h2 ip-serif">
                Why Murphi.ai
              </h2>
            </div>

            <div className="grid min-w-0 max-w-[70ch] gap-6">
              <p className="type-hl-card-body">
                Home health and hospice require specialized workflows across
                OASIS, clinical documentation, coding, QAPI, compliance, revenue
                assurance, patient communication, and EHR operations. Generic AI
                tools are not built for these complexities. Murphi.ai is
                purpose-built for post-acute care, bringing clinical,
                operational, compliance, and financial automation together in
                one connected platform.
              </p>

              <p className="type-hl-card-body">
                For agencies, Murphi.ai helps reduce charting time, close
                documentation gaps, strengthen compliance, protect revenue,
                improve collections, and prepare for audits and surveys. By
                connecting workflows from the patient visit through payment,
                Murphi.ai gives teams greater visibility and efficiency—so
                clinicians and staff can spend more time focused on delivering
                exceptional care.
              </p>
            </div>
          </IpWrap>
        </section>

        <section aria-labelledby="modules-heading" className="ip-section">
          <IpWrap>
            <SectionRule id="modules-heading">
              One Platform. Four Powerful Modules.
            </SectionRule>

            <ul className="ip-ruled mt-12 grid-cols-2 max-900:grid-cols-1 max-600:mt-9">
              {MODULES.map((module) => (
                <li
                  key={module.title}
                  className="flex flex-col px-8 py-9 max-600:px-6 max-600:py-8"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="flex size-11 items-center justify-center rounded-[8px] border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]">
                      <Icon name={module.icon} width={20} height={20} />
                    </span>
                    {module.soon ? (
                      <span className="ip-mono rounded-full border border-[#E3E3E3] bg-[#F5F5F5] px-2.5 py-1 text-[10.5px] font-semibold tracking-[0.06em] uppercase text-[#878787]">
                        Soon
                      </span>
                    ) : null}
                  </span>

                  <h3 className="type-hl-card-title mt-6 text-ink">
                    {module.title}
                  </h3>

                  <p className="type-hl-card-body mt-3.5">
                    {module.body}
                  </p>
                </li>
              ))}
            </ul>
          </IpWrap>
        </section>

        <section aria-labelledby="different-heading" className="ip-section">
          <IpWrap>
            <SectionRule id="different-heading">
              What Makes Murphi.ai Different
            </SectionRule>

            <ul className="ip-ruled mt-12 grid-cols-3 max-1080:grid-cols-2 max-600:grid-cols-1 max-600:mt-9">
              {DIFFERENT.map((item) => (
                <li
                  key={item.title}
                  className="flex flex-col px-7 py-8 max-600:px-6 max-600:py-7"
                >
                  <span className="flex size-10 items-center justify-center rounded-[8px] border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]">
                    <Icon name={item.icon} width={18} height={18} />
                  </span>

                  <h3 className="type-hl-card-title mt-5 text-ink">
                    {item.title}
                  </h3>

                  <p className="type-hl-card-body mt-2.5">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </IpWrap>
        </section>

        <section aria-labelledby="values-heading" className="ip-section ip-band">
          <IpWrap>
            <SectionRule id="values-heading">Our Values</SectionRule>

            <ul className="ip-ruled mt-12 grid-cols-3 max-900:grid-cols-1 max-600:mt-9">
              {VALUES.map((value) => (
                <li
                  key={value.title}
                  className="flex flex-col px-8 py-9 max-600:px-6 max-600:py-8"
                >
                  <span className="flex size-11 items-center justify-center rounded-[8px] border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]">
                    <Icon name={value.icon} width={20} height={20} />
                  </span>

                  <h3 className="type-hl-card-title mt-6 text-ink">
                    {value.title}
                  </h3>

                  <p className="type-hl-card-body mt-4">
                    {value.body}
                  </p>
                </li>
              ))}
            </ul>
          </IpWrap>
        </section>

        <OurTeam />

        <FinalCta
          heading={
            <>
              Experience AI Automation
              <br />
              at Scale
            </>
          }
          body="Tell us your care setting and we'll show you exactly what Murphi.ai delivers for your organization - a live demo tailored to your workflows and your team."
        />
      </main>

      <Footer />
    </InnerPage>
  );
}
