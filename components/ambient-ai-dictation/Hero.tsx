import Link from "next/link";
import type { CSSProperties } from "react";
import { Icon } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import {
  DocTiles,
  FieldRows,
} from "@/components/ambient-ai-dictation/Capture";
import { PulseMic } from "@/components/home-landing/marks";
import { AaWrap } from "@/components/ambient-ai-dictation/Shell";

const GENERATED = [
  "Patient ambulates independently with front-wheeled walker.",
  "Wound site clean and dry, no signs of infection.",
  "Medication list reconciled - no changes since last visit.",
  "Homebound status confirmed and documented.",
];

const NOTE_TYPES = ["OASIS", "HOPE", "SN", "PT", "OT", "ST"];

export default function Hero() {
  return (
    <>
      <AaWrap>
        <nav
          className="aa-mono"
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
          <span style={{ color: "#1A1A1A", fontWeight: 600 }}>
            Ambient AI & Dictation
          </span>
        </nav>
      </AaWrap>

      <section style={{ padding: "40px 0 72px" }}>
        <AaWrap className="aa-hero-grid">
          <Reveal>
            <p className="aa-eyebrow" style={{ color: "#007EFF" }}>
              Ambient AI &amp; Dictation
            </p>

            <h1 className="aa-h1 aa-serif" style={{ marginTop: 16 }}>
              Complete OASIS, HOPE, and All Other Notes Within Minutes.
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
                className="aa-mono"
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
                9:40 PM
              </span>
              <p
                className="aa-serif"
                style={{
                  maxWidth: "62ch",
                  fontSize: 17,
                  fontStyle: "italic",
                  lineHeight: 1.5,
                  color: "#1A1A1A",
                }}
              >
                {
                  "Maria finished her last visit at 4. It's now almost ten, and she's still finishing the OASIS from patient two. Tomorrow starts at 8."
                }
              </p>
            </div>

            <p className="aa-lead" style={{ marginTop: 18, maxWidth: "56ch", fontSize: 18 }}>
              Murphi listens while she works, or takes a short dictation
              afterward, and syncs the finished note to her EHR within minutes  - 
              OASIS, HOPE, SN, PT, OT, ST, together, the same day.
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
              <a href="/contact-us/" className="aa-btn">
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
              <span>Human review before write-back</span>
            </div>
          </Reveal>

          <Reveal>
            <MockCard />
          </Reveal>
        </AaWrap>
      </section>
    </>
  );
}

const CYCLE = "12s";
const PHASE = { capture: 0, fields: -9, notes: -6, sync: -3 } as const;

const step = (at: number) => ({
  animation: `mp-scribe-step ${CYCLE} ease-in-out ${at}s infinite`,
});

const TILE: CSSProperties = {
  border: "1px solid #E3E3E3",
  borderRadius: 8,
  background: "#ffffff",
  boxShadow: "0 1px 2px rgba(0,0,0,0.03), 0 14px 30px rgba(0,0,0,0.05)",
};

function MockCard() {
  return (
    <div className="relative mx-auto max-w-[460px]">
      <span
        className="aa-mono"
        style={{
          marginBottom: 16,
          display: "flex",
          width: "100%",
          alignItems: "center",
          gap: 8,
          borderRadius: 20,
          border: "1px solid #E3E3E3",
          background: "#ffffff",
          padding: "6px 16px",
          fontSize: 10.5,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "#606060",
        }}
      >
        <Icon name="server" width={11} height={11} className="shrink-0" style={{ color: "#007EFF" }} />
        <span className="min-w-0 truncate">Patient record fetched from EHR</span>
      </span>

      <div className="relative z-20 w-full overflow-hidden" style={{ ...TILE, ...step(PHASE.capture) }}>
        <div
          className="aa-mono"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            background: "#F5F5F5",
            borderBottom: "1px solid #E3E3E3",
            padding: "10px 20px",
            fontSize: 10.5,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 0.6,
            color: "#878787",
          }}
        >
          <span className="flex min-w-0 items-center gap-2">
            <Icon name="mic" width={15} height={15} className="shrink-0" style={{ color: "#007EFF" }} />
            <span className="truncate">Ambient AI + Voice Dictation</span>
          </span>
          <span className="flex shrink-0 items-center gap-2" style={{ color: "#007EFF" }}>
            <span
              className="size-1.5 rounded-full bg-current"
              style={{ animation: "mp-blink 2.4s ease-in-out infinite" }}
              aria-hidden
            />
            Listening
          </span>
        </div>

        <div
          style={{
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 96,
          }}
        >
          <PulseMic size={56} icon={30} />
        </div>
      </div>

      <Thread at={PHASE.fields} />

      <div className="relative z-10 w-full overflow-hidden" style={{ ...TILE, ...step(PHASE.fields) }}>
        <div
          className="aa-mono"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            borderBottom: "1px solid #E3E3E3",
            padding: "10px 20px",
            fontSize: 10.5,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "#878787",
          }}
        >
          <Icon name="doc" width={11} height={11} className="shrink-0" style={{ color: "#007EFF" }} />
          <span className="min-w-0 truncate">Visit understood → fields populating</span>
        </div>

        <div style={{ padding: "12px 20px" }}>
          <FieldRows lines={GENERATED} quiet cycle={PHASE.fields} />
        </div>
      </div>

      <Thread at={PHASE.notes} />

      <div
        className="relative z-10 w-full"
        style={{
          ...TILE,
          background: "#F5F5F5",
          padding: 14,
          ...step(PHASE.notes),
        }}
      >
        <DocTiles items={NOTE_TYPES} quiet cycle={PHASE.notes} />
        <p
          className="aa-mono"
          style={{
            marginTop: 10,
            textAlign: "center",
            fontSize: 10.5,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "#878787",
          }}
        >
          6 note types, one encounter
        </p>
      </div>

      <Thread at={PHASE.sync} />

      <div
        className="aa-mono"
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          borderRadius: 20,
          border: "1px solid #E3E3E3",
          background: "#F5F5F5",
          padding: "8px 16px",
          fontSize: 10.5,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "#878787",
          ...{
            animation: `mp-scribe-seal ${CYCLE} ease-in-out ${PHASE.sync}s infinite`,
          },
        }}
      >
        <Icon
          name="check"
          width={12}
          height={12}
          className="shrink-0"
          style={{
            color: "#007EFF",
            animation: `mp-scribe-mark ${CYCLE} ease-in-out ${PHASE.sync}s infinite`,
          }}
        />
        <span className="min-w-0 truncate">Clinician review → synced to EHR</span>
      </div>
    </div>
  );
}

function Thread({ at }: { at: number }) {
  return (
    <div className="relative mx-auto h-4 w-px" style={{ background: "#E3E3E3" }} aria-hidden>
      <span
        className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full"
        style={{
          background: "#007EFF",
          animation: `mp-scribe-flow ${CYCLE} ease-in-out ${at}s infinite`,
        }}
      />
    </div>
  );
}
