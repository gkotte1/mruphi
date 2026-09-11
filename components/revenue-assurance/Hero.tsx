import Link from "next/link";
import Reveal from "@/components/module-page/Reveal";
import ChartReviewStack from "@/components/revenue-assurance/HeroVisual";
import { RaWrap } from "@/components/revenue-assurance/Shell";

const FINDINGS = [
  {
    tone: "flag" as const,
    title: "Homebound status not fully documented",
    meta: "Section G · Visit 3",
  },
  {
    tone: "flag" as const,
    title: "Face-to-Face encounter date missing",
    meta: "Referral documentation",
  },
  {
    tone: "opportunity" as const,
    title: "PDGM grouping opportunity identified",
    meta: "Coding review",
  },
];

export default function Hero() {
  return (
    <>
      <RaWrap>
        <nav
          className="ra-mono"
          aria-label="Breadcrumb"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 8,
            paddingTop: 28,
            fontSize: 12.5,
            color: "#878787",
          }}
        >
          <Link href="/">Home</Link>
          <span style={{ color: "#B2B2B2" }}>/</span>
          <Link href="/#ambient-ai">AI Modules</Link>
          <span style={{ color: "#B2B2B2" }}>/</span>
          <span style={{ color: "#1A1A1A", fontWeight: 600 }}>Revenue Assurance</span>
        </nav>
      </RaWrap>

      <section style={{ padding: "40px 0 72px" }}>
        <RaWrap className="ra-hero-grid">
          <Reveal>
            <p className="ra-eyebrow" style={{ color: "#007EFF" }}>
              Revenue Assurance
            </p>

            <h1 className="ra-h1 ra-serif" style={{ marginTop: 16 }}>
              Catch It on Day One, Not on Appeal.
            </h1>

            <div
              style={{
                marginTop: 18,
                background: "#F5F5F5",
                border: "1px solid #E3E3E3",
                borderRadius: 8,
                padding: "20px 24px",
              }}
            >
              <span
                className="ra-mono"
                style={{
                  display: "block",
                  marginBottom: 10,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 0.6,
                  textTransform: "uppercase",
                  color: "#878787",
                }}
              >
                Six Weeks Later
              </span>
              <p
                className="ra-serif"
                style={{
                  maxWidth: "62ch",
                  fontSize: 17,
                  fontStyle: "italic",
                  lineHeight: 1.5,
                  color: "#1A1A1A",
                }}
              >
                An ADR letter arrives for Mr. Delgado&apos;s episode. The
                homebound documentation was thin. The Face-to-Face date is
                missing. Nobody remembers visit three - it happened six weeks
                ago.
              </p>
            </div>

            <p className="ra-lead" style={{ marginTop: 18, maxWidth: "56ch", fontSize: 18 }}>
              Murphi reviews every chart the day it&apos;s written - fetched
              straight from your EHR - and surfaces exactly this kind of gap
              while there&apos;s still time to fix it.
            </p>

            <div
              style={{
                marginTop: 40,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 14,
              }}
            >
              <a href="/contact-us/" className="ra-btn">
                Request Demo
              </a>
            </div>

            <div
              style={{
                marginTop: 40,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                gap: 28,
                fontSize: 12.5,
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "#606060",
              }}
            >
              <span>HIPAA</span>
              <span style={{ color: "#B2B2B2" }}>·</span>
              <span>SOC 2</span>
              <span style={{ color: "#B2B2B2" }}>·</span>
              <span>No unsupported ROI claims</span>
            </div>
          </Reveal>

          <Reveal>
            <ChartReviewStack
              title="Chart Review · Mr. Delgado, Episode 2"
              status="3 Findings"
              fetched="Referral, F2F, OASIS & POC fetched from EHR"
              findings={FINDINGS}
              foot={["Found the day it was written", "Write-back ready"]}
            />
          </Reveal>
        </RaWrap>
      </section>
    </>
  );
}
