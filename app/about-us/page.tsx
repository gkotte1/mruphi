import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OurTeam from "@/components/OurTeam";
import GetStartedCta from "@/components/GetStartedCta";
import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/site";

/**
 * /about-us/ - the company page.
 *
 * Hero, About, Why, Modules, Coming Soon, Differentiators, Values, then the
 * existing Our Team section. Every string below is the supplied copy,
 * verbatim.
 */

export const metadata: Metadata = pageMetadata("/about-us/", {
  title: "About Murphi.ai - Home Health & Hospice AI",
  description:
    "Murphi.ai is an advanced AI platform purpose-built for home health and hospice - documentation, revenue integrity, compliance, patient engagement, and collections in one connected platform.",
});

const SHELL = "mx-auto w-full max-w-[1280px] px-10 max-1200:px-8 max-600:px-4";
const BAND = "py-24 max-1024:py-20 max-600:py-16";
const H2 = "type-h2 text-ink";

/** Heading left, copy right - the page's editorial rhythm. */
const EDITORIAL =
  "grid grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)] items-start gap-16 max-1024:grid-cols-1 max-1024:gap-6";

const MODULES: { title: string; body: string; icon: IconName }[] = [
  {
    title: "Ambient AI",
    icon: "mic",
    body: "Transform clinician–patient conversations into structured, review-ready clinical documentation. Murphi.ai helps generate OASIS assessments, hospice documentation, skilled nursing and therapy notes, SOAP notes, visit summaries, and other required documentation—reducing after-hours charting and allowing clinicians to spend more time with patients.",
  },
  {
    title: "Revenue Assurance, Compliance & QAPI",
    icon: "sealcheck",
    body: "Review documentation for coding accuracy, clinical consistency, completeness, regulatory compliance, and revenue opportunities. Murphi.ai helps agencies identify missing or conflicting information, reduce avoidable denials, improve documentation quality, support QAPI initiatives, and remain prepared for payer audits and accreditation surveys.",
  },
  {
    title: "Patient Engagement",
    icon: "community",
    body: "Communicate securely with patients, families, caregivers, clinicians, and agency teams through HIPAA-compliant messaging, texting, faxing, electronic signatures, document sharing, and scanning. Murphi.ai brings essential communication workflows together, helping agencies improve responsiveness while reducing dependence on disconnected systems and unsecured communication channels.",
  },
  {
    title: "Patient Payment Collections",
    icon: "card",
    body: "Identify patient-responsible balances and send secure payment links directly by text message. Patients can conveniently pay using supported digital payment methods, with funds deposited into the provider’s account. Murphi.ai also tracks payment activity and reconciles collections with the EHR, helping agencies accelerate cash flow, reduce outstanding balances, and simplify financial follow-up.",
  },
];

const COMING_SOON: { title: string; body: string; icon: IconName }[] = [
  {
    title: "Referral to NOA",
    icon: "route",
    body: "An AI-powered referral and intake workflow that receives or retrieves referral documents, identifies and classifies information, extracts patient data, checks completeness and eligibility, supports acceptance decisions, writes information into the EHR, schedules the Start of Care, and helps agencies move efficiently from referral to Notice of Admission.",
  },
  {
    title: "AI-Driven Revenue Cycle Management",
    icon: "exchange",
    body: "An integrated RCM platform designed to automate and strengthen eligibility verification, prior authorization, coding, claim readiness, claims processing, denial management, appeals, payment posting, and reconciliation—helping agencies improve collections while reducing administrative effort.",
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
      <span className="mb-5 block h-px w-12 bg-brand" aria-hidden />
      <h2 id={id} className={H2}>
        {children}
      </h2>
    </div>
  );
}

export default function AboutUsPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── 1 · About Murphi.ai ── */}
        <section aria-labelledby="about-heading" className="bg-hero-bg pt-[80px]">
          <div className={cn(SHELL, "py-16 text-center max-600:py-10")}>
            <p className="type-label inline-flex items-center gap-2 rounded-full border border-brand-ghost bg-brand-tint px-3.5 py-1.5 text-brand-dark">
              <Icon name="home" width={13} height={13} />
              Company
            </p>

            <h1
              id="about-heading"
              className="mx-auto mt-7 max-w-[16ch] type-h1 text-ink"
            >
              About Murphi.ai
            </h1>

            <p className="mx-auto mt-7 max-w-[68ch] text-left type-lead text-grey-dk">
              Murphi.ai is an advanced AI platform purpose-built for home
              health and hospice, helping agencies reduce documentation time,
              strengthen revenue integrity, improve compliance, engage
              patients, and accelerate patient payment collections through one
              connected platform. It supports clinicians, administrators,
              coders, billers, compliance and QAPI teams, RCM companies,
              accreditation organizations, and healthcare partners across the
              agency ecosystem. Murphi.ai also partners with home health and
              hospice EHR companies to embed AI directly into existing
              workflows through secure APIs, configurable integrations, and
              white-label deployment options. By working alongside existing
              systems, Murphi.ai helps agencies and EHR partners make everyday
              workflows faster, more accurate, secure, and easier to manage.
            </p>
          </div>
        </section>

        {/* ── 2 · Why Murphi.ai ── */}
        <section
          aria-labelledby="why-heading"
          className={cn("border-t border-grey-mid bg-white", BAND)}
        >
          <div className={cn(SHELL, EDITORIAL)}>
            <div className="min-w-0">
              <span className="mb-5 block h-px w-12 bg-brand" aria-hidden />
              <h2 id="why-heading" className={H2}>
                Why Murphi.ai
              </h2>
            </div>

            <div className="grid min-w-0 max-w-[70ch] gap-6">
              <p className="type-lead text-grey-dk">
                Home health and hospice require specialized workflows across
                OASIS, clinical documentation, coding, QAPI, compliance, revenue
                assurance, patient communication, and EHR operations. Generic AI
                tools are not built for these complexities. Murphi.ai is
                purpose-built for post-acute care, bringing clinical,
                operational, compliance, and financial automation together in
                one connected platform.
              </p>

              <p className="type-lead text-grey-dk">
                For agencies, Murphi.ai helps reduce charting time, close
                documentation gaps, strengthen compliance, protect revenue,
                improve collections, and prepare for audits and surveys. By
                connecting workflows from the patient visit through payment,
                Murphi.ai gives teams greater visibility and efficiency—so
                clinicians and staff can spend more time focused on delivering
                exceptional care.
              </p>
            </div>
          </div>
        </section>

        {/* ── 3 · One Platform. Four Powerful Modules. ── */}
        <section
          aria-labelledby="modules-heading"
          className={cn("border-t border-grey-mid bg-white", BAND)}
        >
          <div className={SHELL}>
            <SectionRule id="modules-heading">
              One Platform. Four Powerful Modules.
            </SectionRule>

            <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-grey-mid bg-grey-mid shadow-[0_24px_60px_-46px_rgba(15,29,84,0.4)] max-900:grid-cols-1 max-600:mt-9">
              {MODULES.map((module) => (
                <li
                  key={module.title}
                  className="flex flex-col bg-white px-8 py-9 max-600:px-6 max-600:py-8"
                >
                  <span className="flex size-11 items-center justify-center rounded-[12px] border border-brand-border/80 bg-brand-tint text-brand-dark">
                    <Icon name={module.icon} width={20} height={20} />
                  </span>

                  <h3 className="mt-6 text-[18px] font-extrabold leading-snug tracking-[-0.02em] text-ink">
                    {module.title}
                  </h3>

                  <p className="mt-3.5 text-[14.5px] leading-relaxed text-grey-dk/90">
                    {module.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 4 · Coming Soon ── */}
        <section
          aria-labelledby="soon-heading"
          className={cn("border-t border-grey-mid bg-white", BAND)}
        >
          <div className={SHELL}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionRule id="soon-heading">Coming Soon</SectionRule>
              <span className="type-label rounded-full border border-grey-mid bg-grey-soft px-3 py-1 text-grey-dk">
                Launching soon
              </span>
            </div>

            <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-grey-mid bg-grey-mid shadow-[0_24px_60px_-46px_rgba(15,29,84,0.4)] max-900:grid-cols-1 max-600:mt-9">
              {COMING_SOON.map((item) => (
                <li
                  key={item.title}
                  className="flex flex-col bg-white px-8 py-9 max-600:px-6 max-600:py-8"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="flex size-11 items-center justify-center rounded-[12px] border border-dashed border-grey-bdr bg-grey-soft text-grey-dk">
                      <Icon name={item.icon} width={20} height={20} />
                    </span>
                    <span className="type-label rounded-full border border-grey-mid bg-grey-soft px-2.5 py-1 text-grey-dk">
                      Soon
                    </span>
                  </span>

                  <h3 className="mt-6 text-[18px] font-extrabold leading-snug tracking-[-0.02em] text-ink">
                    {item.title}
                  </h3>

                  <p className="mt-3.5 text-[14.5px] leading-relaxed text-grey-dk/90">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 5 · What Makes Murphi.ai Different ── */}
        <section
          aria-labelledby="different-heading"
          className={cn("border-t border-grey-mid bg-white", BAND)}
        >
          <div className={SHELL}>
            <SectionRule id="different-heading">
              What Makes Murphi.ai Different
            </SectionRule>

            <ul className="mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-[24px] border border-grey-mid bg-grey-mid shadow-[0_24px_60px_-46px_rgba(15,29,84,0.4)] max-1080:grid-cols-2 max-600:grid-cols-1 max-600:mt-9">
              {DIFFERENT.map((item) => (
                <li
                  key={item.title}
                  className="flex flex-col bg-white px-7 py-8 max-600:px-6 max-600:py-7"
                >
                  <span className="flex size-10 items-center justify-center rounded-[11px] border border-brand-border/80 bg-brand-tint text-brand-dark">
                    <Icon name={item.icon} width={18} height={18} />
                  </span>

                  <h3 className="mt-5 text-[15.5px] font-extrabold leading-snug tracking-[-0.015em] text-ink">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-grey-dk/90">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 6 · Our Values ── */}
        <section
          aria-labelledby="values-heading"
          className={cn("border-t border-grey-mid bg-white", BAND)}
        >
          <div className={SHELL}>
            <SectionRule id="values-heading">Our Values</SectionRule>

            <ul className="mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-[24px] border border-grey-mid bg-grey-mid shadow-[0_24px_60px_-46px_rgba(15,29,84,0.4)] max-900:grid-cols-1 max-600:mt-9">
              {VALUES.map((value) => (
                <li
                  key={value.title}
                  className="flex flex-col bg-white px-8 py-9 max-600:px-6 max-600:py-8"
                >
                  <span className="flex size-11 items-center justify-center rounded-[12px] border border-brand-border/80 bg-brand-tint text-brand-dark">
                    <Icon name={value.icon} width={20} height={20} />
                  </span>

                  <h3 className="mt-6 text-[18px] font-extrabold leading-none tracking-[-0.02em] text-ink">
                    {value.title}
                  </h3>

                  <p className="mt-4 text-[14.5px] leading-relaxed text-grey-dk/90">
                    {value.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 7 · Our Team (existing implementation) ── */}
        <OurTeam />

        {/* ── 8 · Get Started ── */}
        <GetStartedCta />
      </main>

      <Footer />
    </>
  );
}
