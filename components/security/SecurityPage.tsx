import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/cn";

/**
 * /security/ - every string below is the rendered wording recorded in
 * website-research/access/security.md. The research flattens a heading and its
 * body into one line where the source markup ran them together; they are split
 * back apart here exactly where the section list says the elements divide.
 */

const HERO_BADGES = [
  {
    label: "HIPAA Compliant",
    src: "/images/certifications/hipaa-compliant-seal.png",
    width: 108,
    height: 112,
  },
  {
    label: "SOC 2 Type II Certified",
    src: "/images/certifications/aicpa-soc-seal.png",
    width: 120,
    height: 120,
  },
  {
    label: "ISO 27001 Certified",
    src: "/images/certifications/iso-27001-seal.png",
    width: 108,
    height: 108,
  },
];

const PILLARS = [
  {
    title: "SOC 2 Type II",
    body: "Murphi.ai maintains SOC 2 Type II compliance, demonstrating that our security, availability, and confidentiality controls are not only properly designed but consistently operating effectively over time.",
    src: "/images/certifications/aicpa-soc-seal.png",
    width: 120,
    height: 120,
  },
  {
    title: "HIPAA Compliant",
    body: "We implement administrative, physical, and technical safeguards to ensure the confidentiality, integrity, and availability of Protected Health Information (PHI) across every deployment.",
    src: "/images/certifications/hipaa-compliant-seal.png",
    width: 108,
    height: 112,
  },
  {
    title: "ISO 27001",
    body: "Confirming that we operate a formally governed, risk-driven Information Security Management System (ISMS) that protects information assets across the enterprise.",
    src: "/images/certifications/iso-27001-seal.png",
    width: 108,
    height: 108,
  },
];

const ZERO_TRUST = [
  {
    index: "01",
    title: "Verify Explicitly",
    body: "Every request is authenticated, authorized, and encrypted, regardless of network location. No implicit trust - ever.",
  },
  {
    index: "02",
    title: "Least-Privilege Access",
    body: "We enforce minimum necessary permissions (JIT/JEA) to strictly limit data exposure. Users access only what their role requires.",
  },
  {
    index: "03",
    title: "Continuous Validation",
    body: "Trust is constantly re-evaluated based on real-time identity and device health signals. No standing access - every session verified.",
  },
];

const LAYERS: { title: string; body: string; icon: IconName }[] = [
  {
    title: "Network Security",
    icon: "network",
    body: "Firewalls, intrusion detection, and prevention systems continuously monitor and defend against threats across every network boundary.",
  },
  {
    title: "Data & Application Security",
    icon: "shield",
    body: "Secure coding standards, AES-256 encryption, and strict access controls protect applications and data at every layer of the stack.",
  },
  {
    title: "AI-Powered Security",
    icon: "brain",
    body: "Adversarial defenses and input sanitization block prompt injections. No sensitive information is memorized by AI models.",
  },
];

const SURVEILLANCE: { title: string; body: string; icon: IconName }[] = [
  {
    title: "AI Threat Detection",
    icon: "scan",
    body: "Automated threat detection using advanced analytics - identifying anomalies and potential incidents before they escalate.",
  },
  {
    title: "Security Operations",
    icon: "pulse",
    body: "Our dedicated Security Operations team responds to incidents with rapid resolution protocols and documented escalation procedures.",
  },
  {
    title: "Cloud Management",
    icon: "server",
    body: "Cloud-native logs are continuously monitored and analyzed to detect suspicious activity across all Murphi.ai services and integrations.",
  },
];

const CONTROLS: { title: string; body: string; icon: IconName }[] = [
  {
    title: "Secure Cloud Hosting - AWS & GCP",
    icon: "server",
    body: "Hosted on Amazon Web Services and Google Cloud Platform - the most secure and compliant cloud infrastructure available. Geo-redundancy with regional failover ensures continuous service availability. Advanced DDoS protection blocks large-scale attacks.",
  },
  {
    title: "Identity & Access Management",
    icon: "community",
    body: "Granular Role-Based Access Control (RBAC) limits users to role-relevant data only. Least privilege principles applied across every system. Strong multi-factor authentication and SSO support prevent unauthorized entry.",
  },
  {
    title: "Vulnerability Management",
    icon: "scan",
    body: "OWASP-aligned secure coding practices. Frequent automated assessments and annual third-party penetration testing. Responsible vulnerability disclosure program - ethical hackers help identify and report potential vulnerabilities.",
  },
  {
    title: "Disaster Recovery",
    icon: "sync",
    body: "Comprehensive recovery and business continuity plans minimize downtime. Recovery plans regularly tested and reviewed. Critical data automatically backed up and stored redundantly across geographic regions.",
  },
  {
    title: "Data Encryption & Protection",
    icon: "shield",
    body: "TLS 1.2+ encryption for all data in transit. AES-256 encryption for all data at rest. Cryptographic controls enforced with strict access controls and secure key management. PHI never transmitted unencrypted.",
  },
  {
    title: "Business Associate Agreement (BAA)",
    icon: "doc",
    body: "A fully executed BAA is available for every Murphi.ai customer - required by HIPAA for any business handling PHI. Covers all Murphi.ai services, integrations, and data processing activities.",
  },
];

const RESPONSIBLE_AI: { title: string; body: string; icon: IconName }[] = [
  {
    title: "Responsible AI Practices",
    icon: "brain",
    body: "AI systems developed in accordance with ethical principles - emphasizing fairness, transparency, and accountability. Regular bias assessments and compliance reviews.",
  },
  {
    title: "No Training on Customer Data",
    icon: "shield",
    body: "Customer data is never used to train foundational AI models. Your data remains completely isolated from model development - contractually guaranteed.",
  },
  {
    title: "Human Oversight & Risk Management",
    icon: "community",
    body: "AI outputs are monitored by qualified personnel. Regular assessments identify risks, bias, and compliance gaps. Human review workflows built into every AI-generated output.",
  },
];

const SUB_PROCESSORS = [
  ["Amazon Web Services", "Cloud Infrastructure", "USA"],
  ["Google Cloud Platform", "Cloud Infrastructure", "USA"],
  ["Everyware", "Payment Processing", "USA"],
  ["Fortis", "Payment Processing", "USA"],
  ["Twilio", "Communication & Messaging", "USA"],
  ["360 Dialog", "Communication & Messaging", "USA"],
  ["Firebase", "Crash Logs & Analytics", "USA"],
];

const SHELL = "mx-auto w-full max-w-[1280px] px-10 max-1200:px-8 max-600:px-4";
const BAND = "border-t border-grey-mid py-24 max-1024:py-20 max-600:py-16";
const H2 = "type-h2 text-ink";

export default function SecurityPage() {
  return (
    <main>
      <Hero />
      <Pillars />
      <ZeroTrust />
      <Layered />
      <Surveillance />
      <Controls />
      <ResponsibleAi />
      <SubProcessors />
    </main>
  );
}

/* ── Section 1 ── */
function Hero() {
  return (
    <section className="bg-hero-bg pt-[80px]">
      <div
        className={cn(
          SHELL,
          "py-16 text-center max-600:py-10",
        )}
      >
        <p className="type-label inline-flex items-center gap-2 rounded-full border border-brand-ghost bg-brand-tint px-3.5 py-1.5 text-brand-dark">
          <Icon name="shield" width={13} height={13} />
          Security &amp; Compliance
        </p>

        <h1 className="mx-auto mt-7 max-w-[820px] type-h1 text-ink">
          Enterprise-Grade Security
          <br />
          Built for Healthcare AI
        </h1>

        <p className="type-lead mx-auto mt-6 max-w-[680px] text-grey-dk">
          Murphi.ai protects patient data with enterprise-grade encryption,
          rigorous compliance standards, and continuous monitoring. We treat your
          data security as our primary feature.
        </p>

        <Link
          href="/contact-us/"
          className="group mt-9 btn-primary max-600:w-full max-600:justify-center"
        >
          Request Demo
          <Icon
            name="arrow"
            width={17}
            height={17}
            className="transition-transform duration-200 group-hover:translate-x-[3px]"
          />
        </Link>

        <ul className="mx-auto mt-12 flex max-w-[820px] flex-wrap items-center justify-center gap-3 max-600:mt-9">
          {HERO_BADGES.map((badge) => (
            <li
              key={badge.label}
              className="flex items-center gap-2.5 rounded-full border border-grey-mid bg-white px-4 py-2.5"
            >
              <Image
                src={badge.src}
                alt=""
                width={badge.width}
                height={badge.height}
                className="h-6 w-auto"
              />
              <span className="text-[12.5px] font-bold tracking-[-0.01em] text-grey-dk">
                {badge.label}
              </span>
            </li>
          ))}

          <li className="flex items-center gap-2.5 rounded-full border border-grey-mid bg-white px-4 py-2.5">
            <span className="flex size-6 items-center justify-center rounded-full border border-brand-border bg-brand-tint text-brand-dark">
              <Icon name="doc" width={12} height={12} />
            </span>
            <span className="text-[12.5px] font-bold tracking-[-0.01em] text-grey-dk">
              BAA Available
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* ── Section 2 ── */
function Pillars() {
  return (
    <section aria-labelledby="pillars" className={cn("bg-white", BAND)}>
      <div className={SHELL}>
        <p className="type-label text-brand-dark text-center">Certifications</p>

        <h2 id="pillars" className={cn(H2, "mt-4 text-center")}>
          Three Pillars of Compliance
        </h2>

        {/* A certification wall: one surface, three seals, hairline divided. */}
        <ul className="mx-auto mt-12 grid max-w-[1080px] grid-cols-3 gap-px overflow-hidden rounded-[24px] border border-grey-mid bg-grey-mid shadow-[0_24px_60px_-46px_rgba(15,29,84,0.4)] max-1024:grid-cols-1 max-600:mt-9">
          {PILLARS.map((pillar) => (
            <li
              key={pillar.title}
              className="bg-white p-8 text-center transition-colors duration-200 hover:bg-grey-bg max-600:p-6"
            >
              <span className="mx-auto flex size-[76px] items-center justify-center rounded-full border border-brand-border/50 bg-grey-bg">
                <Image
                  src={pillar.src}
                  alt=""
                  width={pillar.width}
                  height={pillar.height}
                  className="h-[52px] w-auto"
                />
              </span>

              <h3 className="mt-6 text-[16px] font-bold leading-snug tracking-[-0.02em] text-ink">
                {pillar.title}
              </h3>
              <p className="mt-3.5 text-[13.5px] leading-relaxed text-grey-dk/85">
                {pillar.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Section 3 ── */
function ZeroTrust() {
  return (
    <section aria-labelledby="zero-trust" className={cn("relative isolate bg-tint", BAND)}>
      <div className={SHELL}>
        <div className="mx-auto max-w-[680px] text-center">
          <p className="type-label text-brand-dark">Zero Trust Architecture</p>

          <h2 id="zero-trust" className={cn(H2, "mt-4")}>
            We Never Assume Trust
          </h2>
          <p className="type-lead mt-5 text-grey-dk">
            Every access request is verified, authorized, and encrypted  - 
            regardless of network location or user identity.
          </p>
        </div>

        {/* Three principles applied in order, joined on one rule. */}
        <ol className="mx-auto mt-12 grid max-w-[1080px] grid-cols-3 gap-px overflow-hidden rounded-panel border border-grey-mid bg-grey-mid max-1024:grid-cols-1 max-600:mt-9">
          {ZERO_TRUST.map((step) => (
            <li key={step.index} className="bg-white p-7 max-600:p-5">
              <span className="text-[26px] font-extrabold leading-none tracking-[-0.04em] text-brand/35">
                {step.index}
              </span>
              <h3 className="mt-4 text-[16px] font-bold leading-snug tracking-[-0.02em] text-ink">
                {step.title}
              </h3>
              <p className="mt-3.5 text-[13.5px] leading-relaxed text-grey-dk/85">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** The shared three-card treatment for the two monitoring sections. */
function CardBand({
  id,
  label,
  heading,
  intro,
  cards,
  tinted,
  variant = "monitor",
}: {
  id: string;
  label: string;
  heading: string;
  intro: string;
  cards: { title: string; body: string; icon: IconName }[];
  tinted?: boolean;
  /** How the three read: stacked layers, or a live monitoring strip. */
  variant?: "layers" | "monitor";
}) {
  return (
    <section
      aria-labelledby={id}
      className={cn("relative isolate", BAND, tinted ? "bg-tint" : "bg-white")}
    >
      <div className={SHELL}>
        <div className="mx-auto max-w-[700px] text-center">
          <p className="type-label text-brand-dark">{label}</p>

          <h2 id={id} className={cn(H2, "mt-4")}>
            {heading}
          </h2>
          <p className="type-lead mt-5 text-grey-dk">{intro}</p>
        </div>

        {variant === "layers" ? (
          /* Defence in depth reads as depth: full-width bands, each stepped in
             a little further than the one above it. */
          <ol className="mx-auto mt-12 max-w-[1080px] overflow-hidden rounded-panel border border-grey-mid bg-white max-600:mt-9">
            {cards.map((card, i) => (
              <li
                key={card.title}
                className={cn(
                  "grid grid-cols-[auto_minmax(0,0.42fr)_minmax(0,1fr)] items-center gap-7 px-8 py-7 max-900:grid-cols-[auto_1fr] max-900:gap-x-5 max-900:gap-y-2.5 max-600:px-5",
                  i === cards.length - 1 ? "" : "border-b border-grey-mid",
                )}
                style={{ paddingLeft: undefined }}
              >
                <span className="flex items-center gap-4">
                  <span className="type-micro w-6 shrink-0 text-grey-dk/35">
                    {`0${i + 1}`}
                  </span>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-card border border-brand-border/80 bg-brand-tint text-brand-dark">
                    <Icon name={card.icon} width={18} height={18} />
                  </span>
                </span>

                <h3 className="text-[16px] font-bold leading-snug tracking-[-0.02em] text-ink">
                  {card.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-grey-dk/85 max-900:col-start-2">
                  {card.body}
                </p>
              </li>
            ))}
          </ol>
        ) : (
          /* Monitoring reads as an operations strip: three watches, each live. */
          <ul className="mx-auto mt-12 grid max-w-[1080px] grid-cols-3 gap-px overflow-hidden rounded-panel border border-grey-mid bg-grey-mid max-1024:grid-cols-1 max-600:mt-9">
            {cards.map((card) => (
              <li key={card.title} className="bg-white p-7 max-600:p-5">
                <span className="flex items-center justify-between gap-3">
                  <span className="flex size-10 items-center justify-center rounded-card border border-brand-border/80 bg-brand-tint text-brand-dark">
                    <Icon name={card.icon} width={18} height={18} />
                  </span>

                  <span className="relative flex size-1.5 shrink-0" aria-hidden>
                    <span
                      className="absolute inline-flex size-full rounded-full bg-brand/60 motion-reduce:hidden"
                      style={{ animation: "mp-glow 2.4s ease-in-out infinite" }}
                    />
                    <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
                  </span>
                </span>

                <h3 className="mt-5 text-[16px] font-bold leading-snug tracking-[-0.02em] text-ink">
                  {card.title}
                </h3>
                <p className="mt-3.5 text-[13.5px] leading-relaxed text-grey-dk/85">
                  {card.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ── Section 4 ── */
function Layered() {
  return (
    <CardBand
      id="layered"
      label="Defence-in-Depth"
      heading="Layered Protection at Every Level"
      intro="Multiple layers of security controls - so a failure at one layer never results in a breach."
      cards={LAYERS}
      variant="layers"
    />
  );
}

/* ── Section 5 ── */
function Surveillance() {
  return (
    <CardBand
      id="surveillance"
      label="Continuous Monitoring"
      heading="24/7 Security Surveillance"
      intro="Around-the-clock security monitoring powered by advanced AI and expert security analysts."
      cards={SURVEILLANCE}
      tinted
    />
  );
}

/* ── Section 6 ── */
function Controls() {
  return (
    <section aria-labelledby="controls" className={cn("bg-white", BAND)}>
      <div className={SHELL}>
        <p className="type-label text-brand-dark text-center">Technical Safeguards</p>

        <h2 id="controls" className={cn(H2, "mx-auto mt-4 max-w-[720px] text-center")}>
          Industry-Leading Controls at Every Layer
        </h2>

        <ul className="mx-auto mt-12 grid max-w-[1080px] grid-cols-2 gap-x-12 border-t border-grey-mid max-1024:grid-cols-1 max-1024:gap-x-0 max-600:mt-9">
          {CONTROLS.map((control) => (
            <li
              key={control.title}
              className="flex gap-4 border-b border-grey-mid py-7 max-600:py-6"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-card border border-brand-border/80 bg-brand-tint text-brand-dark">
                <Icon name={control.icon} width={18} height={18} />
              </span>

              <div className="min-w-0">
                <h3 className="text-[16px] font-bold leading-snug tracking-[-0.02em] text-ink">
                  {control.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-grey-dk/85">
                  {control.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Section 7 ── */
function ResponsibleAi() {
  return (
    <section aria-labelledby="responsible-ai" className={cn("relative isolate bg-tint", BAND)}>
      <div className={SHELL}>
        <p className="type-label text-brand-dark text-center">AI Governance</p>

        <h2
          id="responsible-ai"
          className={cn(H2, "mx-auto mt-4 max-w-[720px] text-center")}
        >
          Responsible AI with Comprehensive Oversight
        </h2>

        {/* Governance reads as commitments, one per line. */}
        <ul className="mx-auto mt-12 max-w-[900px] border-t border-grey-mid max-600:mt-9">
          {RESPONSIBLE_AI.map((item) => (
            <li
              key={item.title}
              className="grid grid-cols-[auto_minmax(0,0.5fr)_minmax(0,1fr)] items-start gap-7 border-b border-grey-mid py-7 max-900:grid-cols-[auto_1fr] max-900:gap-x-5 max-900:gap-y-2.5 max-600:py-6"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-card border border-brand-border/80 bg-brand-tint text-brand-dark">
                <Icon name={item.icon} width={18} height={18} />
              </span>

              <h3 className="text-[16px] font-bold leading-snug tracking-[-0.02em] text-ink">
                {item.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-grey-dk/85 max-900:col-start-2">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Section 8 ── */
function SubProcessors() {
  return (
    <section aria-labelledby="sub-processors" className={cn("bg-white", BAND)}>
      <div className={SHELL}>
        <div className="mx-auto max-w-[760px] text-center">
          <p className="type-label text-brand-dark">Sub-Processors</p>

          <h2 id="sub-processors" className={cn(H2, "mt-4")}>
            Third-Party Sub-Processors
          </h2>
          <p className="type-lead mt-5 text-grey-dk">
            We partner with carefully selected third-party sub-processors to
            enhance platform functionality while maintaining strict security and
            compliance standards. All sub-processors are contractually obligated
            to adhere to our security policies and regulatory requirements.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-[900px] overflow-hidden rounded-panel border border-grey-mid max-600:mt-9">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-grey-bg">
                {["Vendor", "Purpose", "Location"].map((head) => (
                  <th
                    key={head}
                    scope="col"
                    className="border-b border-grey-mid px-6 py-4 text-[10.5px] font-bold uppercase tracking-[0.1em] text-brand-deep/55 max-600:px-4"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SUB_PROCESSORS.map(([vendor, purpose, location]) => (
                <tr key={vendor} className="border-b border-grey-mid last:border-b-0">
                  <td className="px-6 py-4 text-[13.5px] font-bold tracking-[-0.012em] text-ink max-600:px-4">
                    {vendor}
                  </td>
                  <td className="px-6 py-4 text-[13.5px] text-grey-dk/85 max-600:px-4">
                    {purpose}
                  </td>
                  <td className="px-6 py-4 text-[13.5px] text-grey-dk/85 max-600:px-4">
                    {location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
