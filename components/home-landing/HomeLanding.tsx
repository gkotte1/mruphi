import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LogoMark } from "@/components/Logo";
import { CheckIcon, PulseMic } from "@/components/home-landing/marks";
import HomeFaq from "@/components/home-landing/HomeFaq";
import "./home-landing.css";

const DEMO = "/contact-us/";

const LOGOS = [
  "Healthcare Synergy",
  "iTherapyDocs",
  "Curantis Solutions",
  "SouthSide CHC",
  "Carefluence",
  "Percensys CORE",
  "DocuguardAI",
  "AAIC",
  "Synapse Digital",
  "AWS",
  "Google Cloud",
  "Twilio",
  "Everyware",
  "Sinch",
  "Vonage",
  "Smartsheet",
  "OpenAI",
  "VertexAI",
  "Claude",
  "Fortis",
  "Oasis Technologies Group",
  "WhatsApp",
  "360 Dialogue",
  "Ejabberd",
  "BCHCCPro",
  "Infinity Home Health",
  "Kassy Health",
  "Nursing Rehab",
  "Self Help for the Elderly",
  "St. Claire Medical Center",
  "Advanced Home Health and Hospice",
  "CNS Service Inc",
  "Distinct Homehealth Services",
  "PD Hospice",
  "PrimeCare",
  "AKESO Healthcare",
  "Visiting Nurses of Illinois, Inc.",
];

const QUOTES = [
  {
    quote:
      '"Murphi AI has truly transformed how we approach clinical workflow documentation in hospice and palliative care. Documentation that used to take up valuable clinical time is now streamlined, accurate, and intuitive."',
    name: "Vicki Goodman",
    role: "CRO, Curantis Solutions",
  },
  {
    quote:
      '"Murphi.ai transformed our Healthcare Synergy EHR with AI automation, enhanced clinician engagement, and streamlined workflows without disrupting development. Their team acts as a true extension of our engineering team."',
    name: "Dave Crow",
    role: "President, Healthcare Synergy",
  },
  {
    quote:
      '"We have been working with Murphi.ai for about 6 months. They have been instrumental in helping us set up a patient payment platform, all through text message. They adapt to our needs with consistent communication."',
    name: "Mara Garcia",
    role: "Revenue Cycle Manager, SouthSide CHC",
  },
  {
    quote:
      '"Our patients love to use the app and communicate easily over texting vs. calling and waiting on hold. We have greatly increased our response time and decreased our call volume and hold times."',
    name: "Kristen Anderson",
    role: "Administration, AAIC",
  },
  {
    quote:
      '"Murphi.ai has been an incredible partner in transforming iTherapyDocs with AI-driven automation. Seamless rewrite, voice-to-text notes, progress notes, goals, and pre-authorization automation — saving valuable time across the board."',
    name: "Phillip Brow",
    role: "Co-founder, iTherapyDocs",
  },
  {
    quote:
      '"Murphi offers a high quality product and is absolutely wonderful to work with. Their team is responsive and supportive, and their product is truly unmatched in overall quality and performance. Highly recommend!"',
    name: "Kylie Roy",
    role: "CEO, Percensys CORE Learning",
  },
  {
    quote:
      '"It  is a powerful patient engagement platform that simplifies interactions. It connects with EHR systems through the Carefluence FHIR API for data. Healthcare becomes more connected, efficient, and patient-friendly."',
    name: "Lloyd Williams",
    role: "Co-founder, Carefluence",
  },
];

const EHRS = ["WellSky", "Axxess", "KanTime", "MatrixCare", "HCHB", "Epic"];

const CARD: CSSProperties = {
  border: "1px solid #EFEFEF",
  borderRadius: 10,
  background: "#ffffff",
  boxShadow: "0 1px 2px rgba(0,0,0,0.03), 0 14px 30px rgba(0,0,0,0.05)",
};

const EYE: CSSProperties = {
  fontSize: 12.5,
  fontWeight: 700,
  letterSpacing: "1.6px",
  textTransform: "uppercase",
  color: "#606060",
};

export default function HomeLanding() {
  return (
    <div
      className="home-landing"
    >
      <UtilityBar />
      <Navbar />
      <Hero />
      <LogoStrip />
      <Stats />
      <WhoWeServe />
      <Modules />
      <Integration />
      <HomeFaq />
      <Testimonials />
      <FinalCta />
      <Footer />
    </div>
  );
}

function UtilityBar() {
  return (
    <div
      style={{
        background: "#006AD6",
        padding: "9px 32px",
        textAlign: "center",
        fontSize: 12.5,
        color: "#CCE5FF",
      }}
    >
      Mental & Behavioral Health, Public Health & Corrections, Primary Care,
      Specialties, and Health Systems {"\u2014"} Visit{" "}
      <a
        href="https://murphiconnect.ai"
        style={{ color: "#ffffff", fontWeight: 700 }}
      >
        MurphiConnect.ai
      </a>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="top"
      style={{
        maxWidth: 1220,
        margin: "0 auto",
        padding: "96px 32px 40px",
        textAlign: "center",
      }}
    >
      <div
        className="rise1"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontSize: 12.5,
          fontWeight: 700,
          letterSpacing: "1.6px",
          textTransform: "uppercase",
          color: "#007EFF",
          border: "1px solid #007EFF",
          padding: "7px 16px",
          borderRadius: 20,
          marginBottom: 28,
        }}
      >
        Stevie® Award Winner 2026
        <br />
        American Business Awards®
      </div>
      <h1
        className="hero-h1 rise2 hl-serif"
        style={{
          fontWeight: 500,
          fontSize: 50,
          lineHeight: 1.15,
          letterSpacing: -0.5,
          maxWidth: 900,
          margin: "0 auto 26px",
        }}
      >
        The most advanced AI{"\u2011"}native platform
        <br />
        for{" "}
        <em style={{ fontStyle: "italic", color: "#007EFF" }}>
          home health & hospice.
        </em>
      </h1>
      <p
        className="rise2"
        style={{
          fontSize: 18,
          color: "#606060",
          maxWidth: 660,
          margin: "0 auto 14px",
          lineHeight: 1.6,
        }}
      >
        Ambient AI, Revenue Assurance & QAPI, Engage Clinicians & Patients,
        Patient Payments {"\u2014"} integrated with your EHR to fetch and post
        data automatically.
      </p>
      <p
        className="rise2"
        style={{
          fontSize: 14.5,
          fontWeight: 700,
          letterSpacing: 0.3,
          color: "#606060",
          marginBottom: 40,
        }}
      >
        {"\u2248"} 200 agencies leverage the Murphi platform
      </p>
      <div
        className="rise3"
        style={{
          display: "flex",
          gap: 14,
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: 56,
        }}
      >
        <Link
          href={DEMO}
          style={{
            background: "#007EFF",
            color: "#F5F5F5",
            padding: "15px 30px",
            borderRadius: 3,
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          Request Demo
        </Link>
      </div>

      <div
        className="rise3 hl-hero-chart"
        style={{
          borderRadius: 8,
          overflow: "hidden",
          border: "1px solid #E3E3E3",
          background: "#F5F5F5",
        }}
      >
        <p
          style={{
            textAlign: "center",
            paddingTop: 22,
            fontSize: 12.5,
            fontWeight: 700,
            letterSpacing: "1.6px",
            textTransform: "uppercase",
            color: "#B2B2B2",
          }}
        >
          Accurate Charting. Simplified.
        </p>
        <div
          className="hl-hero-chart-stage"
          style={{
            aspectRatio: "16 / 7.6",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 64,
            padding: "0 48px",
          }}
        >
          <div
            className="hl-hero-chart-mic"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 112,
            }}
          >
            <PulseMic size={56} icon={30} />
          </div>
          <div className="hl-hero-chart-arrow" style={{ fontSize: 22, color: "#B2B2B2" }}>
            →
          </div>
          <div
            className="hl-hero-chart-note"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 10,
              background: "#ffffff",
              border: "1px solid #E3E3E3",
              borderRadius: 8,
              padding: "20px 24px",
              minWidth: 220,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.6,
                textTransform: "uppercase",
                color: "#878787",
              }}
            >
              OASIS Note
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <CheckIcon size={16} />
              <span style={{ fontSize: 15, fontWeight: 600 }}>
                OASIS note — complete in {"<"} 3 mins
              </span>
            </div>
            <span style={{ fontSize: 13, color: "#878787" }}>Synced to EHR</span>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 28,
          marginTop: 40,
          fontSize: 12.5,
          fontWeight: 700,
          letterSpacing: 1,
          textTransform: "uppercase",
          color: "#606060",
        }}
      >
        <span>HIPAA Compliant</span>
        <span style={{ color: "#B2B2B2" }}>·</span>
        <span>SOC 2 Certified</span>
        <span style={{ color: "#B2B2B2" }}>·</span>
        <span>ISO 27001</span>
        <span style={{ color: "#B2B2B2" }}>·</span>
        <span>BAA Signed</span>
        <span style={{ color: "#B2B2B2" }}>·</span>
        <span>Any EHR Integration</span>
      </div>
    </section>
  );
}

function LogoStrip() {
  return (
    <section
      style={{
        padding: "44px 0",
        borderTop: "1px solid #E3E3E3",
        borderBottom: "1px solid #E3E3E3",
        background: "#F5F5F5",
      }}
    >
      <p
        style={{
          ...EYE,
          textAlign: "center",
          marginBottom: 24,
        }}
      >
        Trusted by agencies, partners and platforms
      </p>
      <div className="marquee-wrap">
        <div
          className="marquee-track hl-serif"
          style={{
            gap: 56,
            fontSize: 19,
            color: "#1A1A1A",
            fontWeight: 500,
            paddingRight: 56,
            animationDuration: "79s",
          }}
        >
          {[...LOGOS, ...LOGOS].map((name, i) => (
            <span key={`${name}-${i}`} style={{ whiteSpace: "nowrap" }}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { n: "4–6 hrs", d: "Clinician time saved\nevery day with Ambient AI" },
    { n: "10–20%", d: "Revenue increase\nwith accurate charting" },
    { n: "95%", d: "Instant responses from patients\nfor care messages" },
    { n: "75%", d: "Patients pay within the first\n30 days of receiving texts" },
  ];

  return (
    <section style={{ maxWidth: 1220, margin: "0 auto", padding: "88px 32px" }}>
      <div
        className="stat-4"
        style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}
      >
        {items.map((item) => (
          <div key={item.n} style={{ textAlign: "center" }}>
            <div className="hl-serif" style={{ fontSize: 46, fontWeight: 500 }}>
              {item.n}
            </div>
            <p
              style={{
                marginTop: 10,
                fontSize: 14,
                color: "#606060",
                lineHeight: 1.5,
              }}
            >
              {item.d.split("\n").map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhoWeServe() {
  const cards = [
    {
      k: "01 \u2014 PaaS",
      t: "For Healthcare Platforms",
      tSize: 16,
      p: "Embed AI into your EHR via encrypted API, SSO, or iFrame. Your customers get AI-powered workflows under your brand \u2014 zero token cost to you.",
    },
    {
      k: "02 \u2014 SaaS",
      t: "For Providers & Agencies",
      tSize: 16,
      p: "Log in and use Ambient AI, Revenue Assurance (coding, OASIS, POC, ADRs, PDGM, CTI Validator, wound care, and more), Engage Clinicians & Patients, and Patient Payments.",
    },
    {
      k: "03 \u2014 Channel",
      t: "For Consultants & Accreditation Firms",
      tSize: 15.5,
      p: "Compliance, QAPI, Accreditation and billing firms use Murphi to enhance internal operations and deliver AI services to clients \u2014 managed, self-service, or fully white-labeled.",
    },
  ];

  return (
    <section
      id="platform"
      style={{
        padding: "100px 32px",
        background: "#F5F5F5",
        borderTop: "1px solid #E3E3E3",
        borderBottom: "1px solid #E3E3E3",
      }}
    >
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        <div style={{ maxWidth: 640, marginBottom: 64 }}>
          <p style={{ ...EYE, marginBottom: 16 }}>Who We Serve</p>
          <h2
            className="hl-serif"
            style={{
              fontWeight: 500,
              fontSize: 42,
              lineHeight: 1.15,
              marginBottom: 18,
            }}
          >
            One AI Native Platform. Built for the entire ecosystem.
          </h2>
          <p style={{ fontSize: 17, color: "#606060", lineHeight: 1.6 }}>
            Whether you{"\u2019"}re a platform embedding AI, an agency using
            Murphi directly, or a consultant or accreditation firm looking to
            leverage AI for your clients {"\u2014"} Murphi meets you where you
            are.
          </p>
        </div>
        <div
          className="grid-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            background: "#E3E3E3",
            border: "1px solid #E3E3E3",
          }}
        >
          {cards.map((c) => (
            <div key={c.k} style={{ background: "#ffffff", padding: "36px 24px" }}>
              <span className="hl-mono" style={{ fontSize: 12.5, color: "#878787" }}>
                {c.k}
              </span>
              <h3
                className="hl-serif"
                style={{
                  fontSize: c.tSize,
                  fontWeight: 500,
                  margin: "16px 0 12px",
                  whiteSpace: "nowrap",
                }}
              >
                {c.t}
              </h3>
              <p style={{ fontSize: 15, color: "#606060", lineHeight: 1.65 }}>
                {c.p}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li style={{ display: "flex", gap: 10 }}>
      <span>—</span>
      {children}
    </li>
  );
}

function ModuleCopy({
  kicker,
  title,
  body,
  bullets,
}: {
  kicker: string;
  title: string;
  body: string;
  bullets: string[];
}) {
  return (
    <div className="hl-module-copy" style={{ minWidth: 0 }}>
      <span className="hl-mono" style={{ fontSize: 12.5, color: "#878787" }}>
        {kicker}
      </span>
      <h3
        className="hl-serif"
        style={{ fontSize: 30, fontWeight: 500, margin: "14px 0 16px" }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 16,
          color: "#606060",
          lineHeight: 1.65,
          marginBottom: 20,
          overflowWrap: "break-word",
        }}
      >
        {body}
      </p>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          fontSize: 15,
          color: "#1A1A1A",
        }}
      >
        {bullets.map((b) => (
          <Bullet key={b}>{b}</Bullet>
        ))}
      </ul>
    </div>
  );
}

function Modules() {
  return (
    <section
      id="modules"
      style={{ maxWidth: 1220, margin: "0 auto", padding: "110px 32px" }}
    >
      <div style={{ maxWidth: 640, marginBottom: 84 }}>
        <p style={{ ...EYE, marginBottom: 16 }}>AI Offerings</p>
        <h2
          className="hl-serif"
          style={{
            fontWeight: 500,
            fontSize: 42,
            lineHeight: 1.15,
            marginBottom: 18,
          }}
        >
          Configure & Customize workflows to suit agency needs.
        </h2>
        <p style={{ fontSize: 17, color: "#606060", lineHeight: 1.6 }}>
          Deploy one module or all four {"\u2014"} each governed by HIPAA-grade
          security, role-based access, and a full audit trail.
        </p>
      </div>

      <div
        className="module-row"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
          marginBottom: 96,
        }}
      >
        <ModuleCopy
          kicker="Module 01"
          title="Ambient AI & Dictation"
          body="OASIS, SN, PT, OT, ST, HOPE, Aide, Chaplain, and Social Worker notes — generated from the visit and synced to the EHR automatically. Accurate charting, in minutes."
          bullets={[
            "99% charting accuracy",
            "Every discipline, every note type",
            "Syncs directly to your EHR",
          ]}
        />
        <div
          className="hl-module-visual hl-module-01-visual"
          style={{
            ...CARD,
            padding: "34px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 22,
          }}
        >
          <div
            className="hl-module-01-mic"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
            }}
          >
            <PulseMic size={48} icon={26} />
          </div>
          <span className="hl-module-01-arrow" style={{ fontSize: 18, color: "#B2B2B2" }}>
            →
          </span>
          <div
            className="hl-module-01-note"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 6,
              background: "#F5F5F5",
              border: "1px solid #E3E3E3",
              borderRadius: 8,
              padding: "16px 18px",
              minWidth: 190,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <CheckIcon size={14} />
              <span style={{ fontSize: 13.5, fontWeight: 600 }}>OASIS note</span>
            </div>
            <span style={{ fontSize: 12.5, color: "#878787" }}>
              Complete in {"<"} 3 mins
            </span>
          </div>
        </div>
      </div>

      <div
        className="module-row module-row-flip"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
          marginBottom: 96,
        }}
      >
        <div className="hl-module-visual hl-module-02-visual" style={{ ...CARD, padding: "40px 30px" }}>
          <div
            className="hl-module-02-flow"
            style={{
              display: "flex",
              alignItems: "stretch",
              justifyContent: "center",
              gap: 0,
            }}
          >
            <div
              className="hl-module-02-step"
              style={{
                border: "1px solid #EFEFEF",
                borderRadius: 8,
                padding: "18px 18px",
                textAlign: "left",
                width: 168,
                background: "#F5F5F5",
              }}
            >
              <span
                className="hl-mono"
                style={{
                  fontSize: 10.5,
                  fontWeight: 600,
                  letterSpacing: 0.6,
                  textTransform: "uppercase",
                  color: "#B2B2B2",
                }}
              >
                Step 1
              </span>
              <p
                style={{
                  fontSize: 13.5,
                  fontWeight: 600,
                  marginTop: 8,
                  lineHeight: 1.4,
                }}
              >
                Referral & H&P fetched from EHR
              </p>
            </div>
            <div
              className="hl-module-02-arrow"
              style={{ display: "flex", alignItems: "center", padding: "0 16px" }}
            >
              <span style={{ fontSize: 20, color: "#B2B2B2" }}>→</span>
            </div>
            <div
              className="hl-module-02-step"
              style={{
                border: "1px solid #007EFF",
                borderRadius: 8,
                padding: "18px 18px",
                textAlign: "left",
                width: 168,
                background: "#ffffff",
              }}
            >
              <span
                className="hl-mono"
                style={{
                  fontSize: 10.5,
                  fontWeight: 600,
                  letterSpacing: 0.6,
                  textTransform: "uppercase",
                  color: "#B2B2B2",
                }}
              >
                Step 2
              </span>
              <p
                style={{
                  fontSize: 13.5,
                  fontWeight: 600,
                  marginTop: 8,
                  lineHeight: 1.4,
                }}
              >
                Coding report — OASIS + POC done
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 10,
                }}
              >
                <CheckIcon size={14} />
                <span
                  style={{
                    fontSize: 11.5,
                    color: "#007EFF",
                    fontWeight: 700,
                    letterSpacing: 0.3,
                  }}
                >
                  Ready
                </span>
              </div>
            </div>
          </div>
        </div>
        <ModuleCopy
          kicker="Module 02"
          title="Revenue Assurance & QAPI"
          body="Coding, OASIS, POC, ADRs, PDGM, Visit Note Analyzer, CTI Validator, wound care, and 34 more reports — reviewed by AI, then a human, every time."
          bullets={[
            "98% accuracy, always human reviewed",
            "Fewer denials, cleaner audits",
            "Full compliance documentation trail",
          ]}
        />
      </div>

      <div
        className="module-row"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
          marginBottom: 96,
        }}
      >
        <ModuleCopy
          kicker="Module 03"
          title="Engage Clinicians & Patients"
          body="Text, reminders, group messaging, broadcast, scan, fax, print, and e-signature — with instant notifications to caregivers and patients."
          bullets={[
            "100% instant notification delivery",
            "One thread for the whole care team",
            "PHI-secure, HIPAA-compliant",
          ]}
        />
        <ThreadVisual />
      </div>

      <div
        className="module-row module-row-flip"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        <PaymentsVisual />
        <ModuleCopy
          kicker="Module 04"
          title="Patient Payments"
          body="Bulk texts with payment links, ACH, debit, credit, and EHR reconciliation. No app, no portal, no hold music."
          bullets={[
            "75% collected within the first 30 days",
            "AR cycle drops from 100+ to 15 days",
            "Funds in your account within 48 hours",
          ]}
        />
      </div>
    </section>
  );
}

function ThreadVisual() {
  const msgs = [
    { initials: "RN", label: "RN", text: "Margaret's shortness of breath has increased." },
    {
      initials: "MD",
      label: "Physician",
      text: "Increase nursing visits; continue comfort oxygen.",
    },
    {
      initials: "SW",
      label: "Social Worker",
      text: "Daughter needs additional caregiver support.",
    },
    {
      initials: "CH",
      label: "Chaplain",
      text: "Patient anxious; increasing spiritual support visits.",
    },
  ];

  return (
    <div
      style={{
        ...CARD,
        padding: "26px 26px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        maxWidth: 340,
        margin: "0 auto",
      }}
    >
      {msgs.map((m) => (
        <div
          key={m.initials}
          style={{ display: "flex", alignItems: "flex-start", gap: 8 }}
        >
          <span
            style={{
              flexShrink: 0,
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "#007EFF",
              color: "#ffffff",
              fontSize: 9.5,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {m.initials}
          </span>
          <div
            style={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <span style={{ fontSize: 10, fontWeight: 700, color: "#B2B2B2" }}>
              {m.label}
            </span>
            <div
              style={{
                background: "#F5F5F5",
                color: "#1A1A1A",
                borderRadius: "3px 14px 14px 14px",
                padding: "9px 13px",
                fontSize: 13,
              }}
            >
              {m.text}
            </div>
          </div>
        </div>
      ))}
      <span
        style={{
          fontSize: 10.5,
          color: "#B2B2B2",
          textAlign: "center",
          letterSpacing: 0.4,
          textTransform: "uppercase",
          marginTop: 2,
        }}
      >
        IDG Team Thread · Murphi App
      </span>
    </div>
  );
}

function PaymentsVisual() {
  const steps = [
    { n: "1", t: "Balance fetched from EHR", done: false },
    { n: "2", t: "SMS link sent to patient", done: false },
    { n: "3", t: "Paid via ACH, credit, or debit", done: false },
    { n: "4", t: "$90 collected & EHR reconciled", done: true },
  ];

  return (
    <div
      style={{
        ...CARD,
        padding: "40px 30px 30px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 57,
          left: "13%",
          right: "13%",
          height: 1.5,
          background: "#E3E3E3",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10,
        }}
      >
        {steps.map((s) => (
          <div key={s.n} style={{ textAlign: "center" }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                border: s.done ? undefined : "1.5px solid #007EFF",
                background: s.done ? "#007EFF" : "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
                fontSize: 13,
                fontWeight: 700,
                color: s.done ? "#ffffff" : "#007EFF",
              }}
            >
              {s.n}
            </div>
            <p style={{ fontSize: 11.5, color: "#606060", lineHeight: 1.3 }}>
              {s.t}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Integration() {
  return (
    <section
      style={{
        background: "#F5F5F5",
        borderTop: "1px solid #E3E3E3",
        borderBottom: "1px solid #E3E3E3",
        padding: "96px 32px",
      }}
    >
      <div
        className="module-row"
        style={{
          maxWidth: 1220,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        <div>
          <p style={{ ...EYE, marginBottom: 16 }}>Built for Ease</p>
          <h2
            className="hl-serif"
            style={{
              fontWeight: 500,
              fontSize: 38,
              lineHeight: 1.18,
              marginBottom: 18,
            }}
          >
            All modules integrate with your EHR.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#606060",
              lineHeight: 1.65,
              marginBottom: 24,
            }}
          >
            Connect via encrypted REST API, SSO, or iFrame {"\u2014"} FHIR R4 and
            HL7 v2 supported. Your data and IP remain entirely yours, always.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {EHRS.map((name) => (
              <span
                key={name}
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "8px 14px",
                  border: "1px solid #B2B2B2",
                  borderRadius: 20,
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
        <div style={{ ...CARD, padding: "36px 16px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 32px 1fr 32px 1fr",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                border: "1.5px solid #007EFF",
                justifySelf: "center",
              }}
            />
            <span style={{ textAlign: "center", fontSize: 16, color: "#B2B2B2" }}>
              →
            </span>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "#007EFF",
                justifySelf: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <LogoMark variant="white" size={20} />
            </div>
            <span style={{ textAlign: "center", fontSize: 16, color: "#B2B2B2" }}>
              →
            </span>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                border: "1.5px solid #007EFF",
                justifySelf: "center",
              }}
            />
            <p
              style={{
                gridColumn: 1,
                textAlign: "center",
                fontSize: 12.5,
                fontWeight: 600,
                marginTop: 12,
              }}
            >
              Fetch from EHR
            </p>
            <span />
            <p
              style={{
                gridColumn: 3,
                textAlign: "center",
                fontSize: 12.5,
                fontWeight: 600,
                marginTop: 12,
              }}
            >
              Murphi AI processes
            </p>
            <span />
            <p
              style={{
                gridColumn: 5,
                textAlign: "center",
                fontSize: 12.5,
                fontWeight: 600,
                marginTop: 12,
              }}
            >
              Writes back to EHR
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const cards = [...QUOTES, ...QUOTES];

  return (
    <section style={{ padding: "110px 0" }}>
      <div
        style={{
          maxWidth: 1220,
          margin: "0 auto 64px",
          padding: "0 32px",
        }}
      >
        <p style={{ ...EYE, marginBottom: 16 }}>In Their Words</p>
        <h2
          className="hl-serif"
          style={{ fontWeight: 500, fontSize: 42, lineHeight: 1.15 }}
        >
          Real outcomes, from real customers.
        </h2>
      </div>
      <div className="marquee-wrap">
        <div
          className="marquee-track marquee-track2"
          style={{
            gap: 20,
            paddingLeft: 32,
            paddingRight: 20,
            animationDuration: "62s",
          }}
        >
          {cards.map((c, i) => (
            <figure
              key={`${c.name}-${i}`}
              style={{
                background: "#ffffff",
                border: "1px solid #E3E3E3",
                borderRadius: 8,
                padding: "32px 28px",
                width: 380,
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <blockquote
                className="hl-serif"
                style={{
                  fontSize: 17,
                  fontStyle: "italic",
                  lineHeight: 1.5,
                  overflowWrap: "break-word",
                }}
              >
                {c.quote}
              </blockquote>
              <figcaption
                style={{ marginTop: 24, fontSize: 13, color: "#606060" }}
              >
                <strong style={{ color: "#1A1A1A" }}>{c.name}</strong> — {c.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section
      id="demo"
      style={{
        background: "#006AD6",
        padding: "120px 32px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: 12.5,
          fontWeight: 700,
          letterSpacing: "1.6px",
          textTransform: "uppercase",
          color: "#A3D1FF",
          marginBottom: 20,
        }}
      >
        Get Started
      </p>
      <h2
        className="hl-serif"
        style={{
          fontWeight: 500,
          fontSize: 44,
          lineHeight: 1.15,
          maxWidth: 720,
          margin: "0 auto 20px",
          color: "#ffffff",
        }}
      >
        We make AI work for you, so you can better care for your patients.
      </h2>
      <p
        style={{
          fontSize: 17,
          color: "#CCE5FF",
          maxWidth: 520,
          margin: "0 auto 40px",
        }}
      >
        We{"\u2019"}re not one-size-fits-all. We customize to your needs.
      </p>
      <Link
        href={DEMO}
        style={{
          display: "inline-block",
          background: "#ffffff",
          color: "#006AD6",
          padding: "16px 34px",
          borderRadius: 3,
          fontSize: 15.5,
          fontWeight: 700,
        }}
      >
        Request Demo
      </Link>
    </section>
  );
}
