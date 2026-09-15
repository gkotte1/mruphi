"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { FAQS as SITE_FAQS } from "@/lib/faqs";
import "./agencies-page.css";

const FAQS = SITE_FAQS.agencies;

const MODULE_DEFS = [
  {
    label: "Ambient AI & Dictation",
    Icon: IconMic,
  },
  {
    label: "Patient Engagement",
    Icon: IconPeople,
  },
  {
    label: "Revenue Assurance",
    Icon: IconTrend,
  },
  {
    label: "Patient Payments",
    Icon: IconCard,
  },
] as const;

const ROLES = [
  {
    label: "Owner / Administrator",
    quote:
      "The census check, the payroll approval, and the denial call don't go away - but pajama-time charting isn't waiting for her anymore. Ambient AI already turned the day's visits into structured notes overnight.",
    modules: [
      "Ambient AI & Dictation",
      "Revenue Assurance",
      "Patient Engagement",
      "Patient Payments",
    ],
  },
  {
    label: "Clinician",
    quote:
      "Hannah finishes the visit, says goodbye, and drives home. Murphi already turned the encounter into a structured OASIS, nursing, or therapy note - ready to review, not write from scratch.",
    modules: ["Ambient AI & Dictation", "Revenue Assurance"],
  },
  {
    label: "Clinical / QA",
    quote:
      "OASIS and HOPE accuracy gets checked the same day it's documented, not weeks later at survey time. Gaps surface before they ever reach the chart.",
    modules: ["Revenue Assurance", "Ambient AI & Dictation"],
  },
  {
    label: "Coder / Biller / RCM",
    quote:
      "Coding and documentation are validated against payer rules before the claim goes out - fewer ADRs, fewer denials, faster cash.",
    modules: ["Revenue Assurance", "Patient Payments"],
  },
  {
    label: "Intake",
    quote:
      "Referral details and eligibility get captured once, cleanly, and flow straight into the record - no re-keying, no missed authorizations.",
    modules: ["Patient Engagement", "Revenue Assurance"],
  },
] as const;

function IconMic({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="9" y="2" width="6" height="12" rx="3" fill={color} />
      <path
        d="M5 11a7 7 0 0014 0"
        stroke={color}
        strokeWidth="1.6"
        fill="none"
      />
      <line x1="12" y1="18" x2="12" y2="21" stroke={color} strokeWidth="1.6" />
    </svg>
  );
}

function IconPeople({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="3.2" stroke={color} strokeWidth="1.5" />
      <circle cx="17" cy="9" r="2.6" stroke={color} strokeWidth="1.5" />
      <path
        d="M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6M13 20c0-2.6 2-4.7 4.5-4.7s4.5 2.1 4.5 4.7"
        stroke={color}
        strokeWidth="1.4"
        fill="none"
      />
    </svg>
  );
}

function IconTrend({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 17l5-5 4 4 8-9"
        stroke={color}
        strokeWidth="1.7"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCard({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="2"
        y="6"
        width="20"
        height="13"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
      />
      <line x1="2" y1="10" x2="22" y2="10" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function MurphiMark({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 15c0-4 3-7 7-7h5m-4-3l4 3-4 3"
        stroke="#ffffff"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AgenciesPageView() {
  const [activeModule, setActiveModule] = useState(0);
  const [activeRole, setActiveRole] = useState(1);
  const [faqOpen, setFaqOpen] = useState<boolean[]>(() =>
    FAQS.map((_, i) => i === 0),
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveModule((prev) => (prev + 1) % MODULE_DEFS.length);
    }, 1800);
    return () => window.clearInterval(timer);
  }, []);

  const role = ROLES[activeRole];

  function toggleFaq(i: number) {
    setFaqOpen((prev) => prev.map((open, idx) => (idx === i ? !open : open)));
  }

  return (
    <div className="agencies-page">
      {/* BREADCRUMB */}
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "18px 32px 0" }}>
        <p style={{ fontSize: 13, color: "#878787", margin: 0 }}>
          Home / Who We Serve /{" "}
          <strong style={{ color: "#1A1A1A" }}>
            Home Health &amp; Hospice Agencies
          </strong>
        </p>
      </div>

      {/* HERO */}
      <section
        id="top"
        style={{ maxWidth: 1240, margin: "0 auto", padding: "28px 32px 90px" }}
      >
        <div
          className="hh-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: 56,
            alignItems: "start",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 12.5,
                fontWeight: 700,
                letterSpacing: 1.6,
                textTransform: "uppercase",
                color: "#007EFF",
                marginBottom: 16,
              }}
            >
              Who We Serve · Agencies
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-hl-serif), "Spectral", serif',
                fontWeight: 500,
                fontSize: 46,
                lineHeight: 1.14,
                letterSpacing: -0.3,
                marginBottom: 22,
                marginTop: 0,
              }}
            >
              4 Less Hours Charting.{" "}
              <em style={{ fontStyle: "italic", color: "#007EFF" }}>
                4 More Hours for Patients - and Life.
              </em>
            </h1>

            <div
              style={{
                background: "#F5F5F5",
                borderRadius: 8,
                padding: "22px 24px",
                marginBottom: 24,
              }}
            >
              <p
                style={{
                  fontSize: 12,
                  color: "#878787",
                  marginBottom: 8,
                  marginTop: 0,
                }}
              >
                7:42 PM · visit ended an hour ago
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-hl-serif), "Spectral", serif',
                  fontStyle: "italic",
                  fontSize: 17,
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Hannah is not charting - she&apos;s already home. Murphi turned
                the encounter into a structured OASIS, nursing, or therapy note
                while she was still with the patient.
              </p>
            </div>

            <p
              style={{
                fontSize: 16,
                color: "#606060",
                lineHeight: 1.65,
                marginBottom: 28,
                marginTop: 0,
              }}
            >
              Ambient AI listens during the visit so clinicians can stay with
              the patient, not the screen. What&apos;s captured flows into
              documentation - then into Revenue Assurance, where coding,
              OASIS/HOPE, and POC gaps get caught before they become denials,
              and into Patient Engagement, keeping patients and families
              supported through the episode.
            </p>

            <p
              style={{
                fontFamily: 'var(--font-hl-serif), "Spectral", serif',
                fontSize: 20,
                fontStyle: "italic",
                color: "#1A1A1A",
                marginBottom: 30,
                marginTop: 0,
              }}
            >
              More patient time. Less pajama time.
            </p>

            <Link
              href="/contact-us/"
              style={{
                display: "inline-block",
                background: "#007EFF",
                color: "#ffffff",
                padding: "15px 30px",
                borderRadius: 3,
                fontSize: 15,
                fontWeight: 700,
                marginBottom: 32,
                textDecoration: "none",
              }}
            >
              Request Demo
            </Link>

            <p
              style={{
                fontSize: 13,
                color: "#878787",
                letterSpacing: 0.3,
                margin: 0,
              }}
            >
              HIPAA &nbsp;·&nbsp; SOC 2 &nbsp;·&nbsp; ISO 27001 &nbsp;·&nbsp;
              BAA
            </p>
          </div>

          <div
            style={{
              border: "1px solid #E3E3E3",
              borderRadius: 10,
              padding: 24,
              background: "#ffffff",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-hl-mono), "JetBrains Mono", monospace',
                  fontSize: 11.5,
                  letterSpacing: 0.5,
                  color: "#878787",
                }}
              >
                SIX WORKFLOWS, ONE AGENCY
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#007EFF",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#007EFF",
                    display: "inline-block",
                  }}
                />
                LIVE
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  border: "1px solid #E3E3E3",
                  borderRadius: 8,
                  padding: "14px 22px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#F5F5F5",
                }}
              >
                <span
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "#007EFF",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MurphiMark size={13} />
                </span>
                <span style={{ fontSize: 14.5, fontWeight: 600 }}>
                  Murphi.ai
                </span>
              </div>
            </div>
            <svg
              width="100%"
              height="20"
              viewBox="0 0 260 20"
              preserveAspectRatio="none"
              style={{ display: "block", margin: "0 auto" }}
              aria-hidden
            >
              <path
                d="M130 0 V8 M65 8 H195 M65 8 V20 M195 8 V20"
                stroke="#D8D8D8"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
            <div
              className="hh-modgrid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              {MODULE_DEFS.map((mod, i) => {
                const isActive = i === activeModule;
                const color = isActive ? "#ffffff" : "#606060";
                const Icon = mod.Icon;
                return (
                  <div
                    key={mod.label}
                    style={{
                      border: isActive
                        ? "1.5px solid #007EFF"
                        : "1px solid #E3E3E3",
                      borderRadius: 8,
                      padding: 14,
                      position: "relative",
                      transition: "border-color 0.3s",
                    }}
                  >
                    <span
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 6,
                        background: isActive ? "#007EFF" : "#F5F5F5",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 10,
                        transition: "background 0.3s",
                      }}
                    >
                      <Icon color={color} />
                    </span>
                    <p
                      style={{
                        fontSize: 13.5,
                        fontWeight: 600,
                        margin: 0,
                      }}
                    >
                      {mod.label}
                    </p>
                    {isActive ? (
                      <span
                        style={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#007EFF",
                        }}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ROLE TABS */}
      <section
        style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px 90px" }}
      >
        <p
          style={{
            fontSize: 12.5,
            fontWeight: 700,
            letterSpacing: 1.6,
            textTransform: "uppercase",
            color: "#878787",
            marginBottom: 14,
            marginTop: 0,
          }}
        >
          Everybody&apos;s Monday looks different
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-hl-serif), "Spectral", serif',
            fontWeight: 500,
            fontSize: 32,
            marginBottom: 28,
            marginTop: 0,
          }}
        >
          Find what changes for your role.
        </h2>

        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 28,
          }}
        >
          {ROLES.map((r, i) => (
            <button
              key={r.label}
              type="button"
              className={`role-tab${i === activeRole ? " active" : ""}`}
              onClick={() => setActiveRole(i)}
              style={{
                padding: "10px 20px",
                borderRadius: 20,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div
          className="hh-ehrgrid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 24,
          }}
        >
          <div
            style={{
              border: "1px solid #E3E3E3",
              borderRadius: 10,
              padding: 28,
            }}
          >
            <p
              style={{
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                color: "#878787",
                marginBottom: 14,
                marginTop: 0,
              }}
            >
              What Changes
            </p>
            <p
              style={{
                borderLeft: "3px solid #007EFF",
                paddingLeft: 16,
                fontSize: 17,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {role.quote}
            </p>
          </div>
          <div
            style={{
              background: "#F5F5F5",
              borderRadius: 10,
              padding: 28,
            }}
          >
            <p
              style={{
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                color: "#878787",
                marginBottom: 14,
                marginTop: 0,
              }}
            >
              Relevant Modules
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              {role.modules.map((mod) => (
                <div
                  key={mod}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #E3E3E3",
                    borderRadius: 8,
                    padding: "12px 16px",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {mod}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* START SMALL / MODULES */}
      <section style={{ background: "#F5F5F5", padding: "90px 32px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 12.5,
              fontWeight: 700,
              letterSpacing: 1.6,
              textTransform: "uppercase",
              color: "#878787",
              marginBottom: 14,
              marginTop: 0,
            }}
          >
            Start Small
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-hl-serif), "Spectral", serif',
              fontWeight: 500,
              fontSize: 32,
              marginBottom: 32,
              marginTop: 0,
              maxWidth: 620,
            }}
          >
            Leverage all four Modules with EHR
            <br />
            integration
          </h2>

          <div
            className="hh-startgrid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              background: "#ffffff",
              borderRadius: 10,
              padding: 28,
              marginBottom: 24,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "#B2B2B2",
                  marginBottom: 14,
                  marginTop: 0,
                }}
              >
                Home Health
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <Chip check>OASIS</Chip>
                <Chip check>SN / PT / OT / ST</Chip>
                <Chip check>PDGM</Chip>
                <span
                  style={{
                    border: "1px solid #E3E3E3",
                    background: "#F5F5F5",
                    color: "#B2B2B2",
                    borderRadius: 8,
                    padding: "10px 16px",
                    fontSize: 13.5,
                    fontWeight: 600,
                  }}
                >
                  NOA{" "}
                  <em style={{ fontStyle: "normal", fontSize: 10.5 }}>SOON</em>
                </span>
              </div>
            </div>
            <div>
              <p
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "#B2B2B2",
                  marginBottom: 14,
                  marginTop: 0,
                }}
              >
                Hospice
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <Chip check>HOPE</Chip>
                <Chip check>Chaplain / Social Worker Notes</Chip>
                <Chip check>IDG Documentation</Chip>
              </div>
            </div>
          </div>

          <div
            className="hh-cards4"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
            }}
          >
            <ModuleCard
              title="Ambient AI & Dictation"
              body="Give the evening back - structured documentation from a visit or a 3-minute dictation."
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="9" y="2" width="6" height="12" rx="3" fill="#007EFF" />
                  <path
                    d="M5 11a7 7 0 0014 0"
                    stroke="#007EFF"
                    strokeWidth="1.6"
                    fill="none"
                  />
                </svg>
              }
            />
            <ModuleCard
              title="Revenue Assurance"
              body="Catch it on day one - chart review before submission, fetched directly from your EHR."
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M3 17l5-5 4 4 8-9"
                    stroke="#007EFF"
                    strokeWidth="1.7"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
            <ModuleCard
              title="Patient Engagement"
              body="Meet patients and families where they are - secure SMS outreach without an app install."
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="8" cy="8" r="3.2" stroke="#007EFF" strokeWidth="1.5" />
                  <circle cx="17" cy="9" r="2.6" stroke="#007EFF" strokeWidth="1.5" />
                </svg>
              }
            />
            <ModuleCard
              title="Patient Payments"
              body="Text. Tap. Paid. - collections with automatic reconciliation."
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect
                    x="2"
                    y="6"
                    width="20"
                    height="13"
                    rx="2"
                    stroke="#007EFF"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="2"
                    y1="10"
                    x2="22"
                    y2="10"
                    stroke="#007EFF"
                    strokeWidth="1.5"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* EHR INTEGRATION */}
      <section style={{ padding: "100px 32px" }}>
        <div
          className="hh-ehrgrid"
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 56,
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 12.5,
                fontWeight: 700,
                letterSpacing: 1.6,
                textTransform: "uppercase",
                color: "#878787",
                marginBottom: 16,
                marginTop: 0,
              }}
            >
              EHR Integration
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-hl-serif), "Spectral", serif',
                fontWeight: 500,
                fontSize: 32,
                marginBottom: 18,
                marginTop: 0,
              }}
            >
              You do not need to replace your
              <br />
              EHR to add AI.
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "#606060",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Murphi connects to the EHR you already use. Fetch, analyze,
              automate, generate, human review, write back.
            </p>
          </div>
          <div
            style={{
              border: "1px solid #E3E3E3",
              borderRadius: 10,
              padding: 20,
              background: "#ffffff",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-hl-mono), "JetBrains Mono", monospace',
                  fontSize: 11.5,
                  color: "#878787",
                }}
              >
                YOUR EHR ⇆ MURPHI AI ⇆ YOUR EHR
              </span>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#007EFF",
                  display: "inline-block",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  border: "1px solid #E3E3E3",
                  borderRadius: 8,
                  padding: "14px 22px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#F5F5F5",
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "#007EFF",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MurphiMark size={11} />
                </span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>Your EHR</span>
              </div>
            </div>
            <svg
              width="100%"
              height="20"
              viewBox="0 0 300 20"
              preserveAspectRatio="none"
              style={{ display: "block", margin: "0 auto" }}
              aria-hidden
            >
              <path
                d="M150 0 V8 M50 8 H250 M50 8 V20 M150 8 V20 M250 8 V20"
                stroke="#D8D8D8"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
            <div
              className="hh-cards4"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
              }}
            >
              <EhrStep>Fetch</EhrStep>
              <EhrStep>Analyze</EhrStep>
              <EhrStep>Automate</EhrStep>
              <EhrStep>Generate</EhrStep>
              <EhrStep>Human Review</EhrStep>
              <EhrStep highlight>Write Back</EhrStep>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#F5F5F5", padding: "90px 32px" }}>
        <div
          className="hh-ehrgrid"
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "0.9fr 1.5fr",
            gap: 48,
          }}
        >
          <div>
            <p
              className="type-label text-brand-dark"
              style={{ marginBottom: 14, marginTop: 0 }}
            >
              FAQs
            </p>
            <h2
              className="type-hl-section-title text-ink"
              style={{ marginBottom: 16, marginTop: 0 }}
            >
              Frequently Asked{" "}
              <span className="text-brand">Questions</span>
            </h2>
            <p
              className="type-hl-lead"
              style={{ marginBottom: 20, marginTop: 0, maxWidth: "36ch" }}
            >
              Quick answers about the platform, how it connects to your EHR, and
              how to get started.
            </p>
            <p className="type-hl-card-body" style={{ margin: 0 }}>
              Can&apos;t find what you&apos;re looking for?{" "}
              <Link
                href="/contact-us/"
                className="font-semibold text-brand-dark hover:underline"
              >
                Contact us
              </Link>
            </p>
          </div>
          <div>
            {FAQS.map((faq, i) => {
              const isOpen = faqOpen[i];
              return (
                <div
                  key={faq.q}
                  style={{
                    borderBottom: "1px solid #E3E3E3",
                    padding: "22px 0",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(i)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      width: "100%",
                      background: "none",
                      border: "none",
                      padding: 0,
                      fontFamily: "inherit",
                      textAlign: "left",
                      color: "inherit",
                    }}
                  >
                    <p
                      className="type-hl-card-title text-ink"
                      style={{
                        margin: 0,
                        paddingRight: 16,
                      }}
                    >
                      {faq.q}
                    </p>
                    <span style={{ fontSize: 16, color: "#878787", flexShrink: 0 }}>
                      {isOpen ? "\u2212" : "+"}
                    </span>
                  </button>
                  {isOpen ? (
                    <p
                      className="type-hl-card-body"
                      style={{
                        marginTop: 14,
                        marginBottom: 0,
                        maxWidth: 600,
                      }}
                    >
                      {faq.a}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        id="demo"
        style={{
          background: "#006AD6",
          padding: "110px 32px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-hl-serif), "Spectral", serif',
            fontWeight: 500,
            fontSize: 40,
            color: "#ffffff",
            marginBottom: 18,
            marginTop: 0,
          }}
        >
          Get Coding, OASIS &amp; POC Right. Prevent Denials.
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "#CCE5FF",
            marginBottom: 36,
            marginTop: 0,
          }}
        >
          A live demo tailored to your workflows and your team.
        </p>
        <Link
          href="/contact-us/"
          style={{
            display: "inline-block",
            background: "#ffffff",
            color: "#006AD6",
            padding: "16px 34px",
            borderRadius: 3,
            fontSize: 15.5,
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Request Demo
        </Link>
      </section>
    </div>
  );
}

function Chip({
  children,
  check,
}: {
  children: ReactNode;
  check?: boolean;
}) {
  return (
    <span
      style={{
        border: "1px solid #E3E3E3",
        borderRadius: 8,
        padding: "10px 16px",
        fontSize: 13.5,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      {check ? <span style={{ color: "#007EFF" }}>✓</span> : null}
      {children}
    </span>
  );
}

function ModuleCard({
  title,
  body,
  icon,
}: {
  title: string;
  body: string;
  icon: ReactNode;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 10,
        padding: 22,
      }}
    >
      <span
        style={{
          width: 34,
          height: 34,
          borderRadius: 8,
          background: "#E9F3FF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 14,
        }}
      >
        {icon}
      </span>
      <p style={{ fontWeight: 700, marginBottom: 8, marginTop: 0 }}>{title}</p>
      <p
        style={{
          fontSize: 13.5,
          color: "#606060",
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}

function EhrStep({
  children,
  highlight,
}: {
  children: ReactNode;
  highlight?: boolean;
}) {
  return (
    <span
      style={{
        border: highlight ? "1.5px solid #007EFF" : "1px solid #E3E3E3",
        borderRadius: 8,
        padding: 10,
        fontSize: 12.5,
        fontWeight: 400,
        fontFamily: 'var(--font-hl-mono), "JetBrains Mono", monospace',
        textAlign: "center",
      }}
    >
      <span style={{ color: "#007EFF" }}>✓</span> {children}
    </span>
  );
}
