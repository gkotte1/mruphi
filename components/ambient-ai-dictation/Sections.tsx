import Image from "next/image";
import { Icon } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import { Layers, Tick } from "@/components/module-page/ui";
import { AaEyebrow, AaHead, AaWrap } from "@/components/ambient-ai-dictation/Shell";

const HOME_HEALTH = [
  "OASIS SOC",
  "Skilled Nursing",
  "PT",
  "OT",
  "ST",
  "Plan of Care",
  "Visit Documentation",
];

const HOSPICE = [
  "HOPE",
  "RN / SN Documentation",
  "Chaplain Notes",
  "Social Worker Notes",
  "Hospice Aide Notes",
  "IDG Documentation",
];

export function WhereItApplies() {
  return (
    <section className="aa-section">
      <AaWrap>
        <AaHead>
          <AaEyebrow>Where It Applies</AaEyebrow>
          <h2 className="aa-h2 aa-serif" style={{ marginTop: 16, marginBottom: 18 }}>
            {"Maria's caseload has both. So does the software."}
          </h2>
        </AaHead>

        <Reveal>
          <div
            className="aa-ruled aa-grid-2"
            style={{ gridTemplateColumns: "1fr 1fr" }}
          >
            <ChipColumn title="Home Health" chips={HOME_HEALTH} />
            <ChipColumn title="Hospice" chips={HOSPICE} />
          </div>
        </Reveal>
      </AaWrap>
    </section>
  );
}

function ChipColumn({ title, chips }: { title: string; chips: string[] }) {
  return (
    <div style={{ minWidth: 0, padding: "36px 24px" }}>
      <h4
        className="aa-mono"
        style={{
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          color: "#878787",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#007EFF",
          }}
          aria-hidden
        />
        {title}
      </h4>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {chips.map((chip) => (
          <span
            key={chip}
            style={{
              borderRadius: 20,
              border: "1px solid #B2B2B2",
              padding: "8px 14px",
              fontSize: 13,
              fontWeight: 600,
              color: "#1A1A1A",
            }}
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

type Outcome = {
  title: string;
  sub: string;
  icon: "clock" | "tick" | "layers" | "shield" | "info" | "bolt";
};

const OUTCOMES: Outcome[] = [
  { title: "Less Time Documenting", sub: "One encounter, every note type", icon: "clock" },
  { title: "Faster Chart Completion", sub: "Same-day review and sign-off", icon: "tick" },
  { title: "More Clinician Capacity", sub: "Less after-hours charting", icon: "layers" },
  { title: "Consistent Documentation", sub: "Structured, standardized output", icon: "shield" },
  { title: "Ready For Review", sub: "Nothing auto-signs without a clinician", icon: "info" },
  {
    title: "Nothing Falls Through the Cracks",
    sub: "Wounds, meds & GG items captured in the moment",
    icon: "bolt",
  },
];

function OutcomeIcon({ icon }: { icon: Outcome["icon"] }) {
  const shared = { viewBox: "0 0 24 24", fill: "none", className: "size-7" };

  if (icon === "clock") {
    return (
      <svg {...shared} aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M12 7v5l3.5 2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (icon === "layers") return <Layers className="size-7" />;

  if (icon === "shield") {
    return (
      <svg {...shared} aria-hidden>
        <path
          d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="m9 12 2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (icon === "info") {
    return (
      <svg {...shared} aria-hidden>
        <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (icon === "bolt") {
    return (
      <svg {...shared} aria-hidden>
        <path
          d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return <Tick className="size-7" />;
}

export function Outcomes() {
  return (
    <section className="aa-section aa-band">
      <AaWrap>
        <div style={{ maxWidth: 640, margin: "0 auto 64px", textAlign: "center" }}>
          <h2 className="aa-h2 aa-serif" style={{ marginBottom: 18 }}>
            What agencies get back.
          </h2>
          <p className="aa-lead">
            Qualitative outcomes, based on how the workflow changes - not
            projected statistics.
          </p>
        </div>

        <div
          className="aa-ruled aa-stats"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          {OUTCOMES.map((outcome) => (
            <div
              key={outcome.title}
              style={{ padding: "36px 24px", textAlign: "center" }}
            >
              <div
                style={{
                  margin: "0 auto 16px",
                  display: "flex",
                  width: 40,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  border: "1.5px solid #007EFF",
                  color: "#007EFF",
                }}
              >
                <OutcomeIcon icon={outcome.icon} />
              </div>
              <div
                className="aa-serif"
                style={{ marginBottom: 8, fontSize: 16, fontWeight: 500 }}
              >
                {outcome.title}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.5, color: "#606060" }}>
                {outcome.sub}
              </div>
            </div>
          ))}
        </div>
      </AaWrap>
    </section>
  );
}

export function EhrIntegration() {
  return (
    <section id="ehr" className="aa-section">
      <AaWrap>
        <Reveal>
          <div
            className="aa-split"
            style={{
              display: "grid",
              gridTemplateColumns: "0.88fr 1.12fr",
              alignItems: "center",
              gap: 64,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <AaEyebrow>EHR Integration</AaEyebrow>

              <h2 className="aa-h2 aa-serif" style={{ marginTop: 16, marginBottom: 18 }}>
                Works with the EHR you already use.
              </h2>

              <p className="aa-lead" style={{ maxWidth: "52ch", fontSize: 18 }}>
                Murphi fetches, structures and writes back - your team keeps
                working inside the EHR they already know.
              </p>

              <p style={{ marginTop: 20, fontSize: 13, lineHeight: 1.6, color: "#878787" }}>
                No manual PDF export required where integration is available.
                Manual upload is also supported.
              </p>
            </div>

            <div style={{ minWidth: 0 }}>
              <IntegrationPanel />
            </div>
          </div>
        </Reveal>
      </AaWrap>
    </section>
  );
}

const PIPELINE = ["Fetch", "Analyze", "Automate", "Generate", "Human Review"];
const RETURN_STEP = "Write Back";

function IntegrationPanel() {
  return (
    <div className="aa-card" style={{ overflow: "hidden" }}>
      <div
        className="aa-mono"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          borderBottom: "1px solid #E3E3E3",
          padding: "12px 20px",
        }}
      >
        <span
          style={{
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "#1A1A1A",
          }}
        >
          Your EHR ⇄ Murphi AI ⇄ Your EHR
        </span>
        <span className="relative flex size-1.5 shrink-0" aria-hidden>
          <span
            className="absolute inline-flex size-full rounded-full"
            style={{
              background: "rgba(0,126,255,0.6)",
              animation: "mp-glow 2.4s ease-in-out infinite",
            }}
          />
          <span
            className="relative inline-flex size-1.5 rounded-full"
            style={{ background: "#007EFF" }}
          />
        </span>
      </div>

      <div style={{ padding: 16 }}>
        <SystemNode label="EHR" />
        <FlowLink />
        <div
          style={{
            margin: "0 auto",
            width: "100%",
            maxWidth: 240,
            borderRadius: 8,
            border: "1px solid #E3E3E3",
            background: "#F5F5F5",
            padding: "10px 12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <span
              style={{
                display: "flex",
                width: 24,
                height: 24,
                flexShrink: 0,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                border: "1px solid #E3E3E3",
                background: "#ffffff",
                padding: 4,
              }}
            >
              <Image
                src="/brand/app-icons/murphi-icon-192.png"
                alt="Murphi.ai"
                width={192}
                height={192}
                className="size-full object-contain"
              />
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, lineHeight: 1, color: "#1A1A1A" }}>
              Murphi AI
            </span>
          </div>

          <ol style={{ margin: "10px auto 0", display: "grid", width: "fit-content", gap: 0 }}>
            {PIPELINE.map((step, i) => (
              <li key={step} style={{ display: "flex", alignItems: "stretch", gap: 8 }}>
                <div
                  className="relative flex w-[9px] shrink-0 justify-center"
                  aria-hidden
                >
                  <span
                    className="relative z-10 mt-[7px] size-[7px] shrink-0 rounded-full"
                    style={{ border: "2px solid #007EFF", background: "#ffffff" }}
                  />
                  {i === PIPELINE.length - 1 ? null : (
                    <span
                      className="absolute left-1/2 top-[13px] h-[calc(100%-6px)] w-px -translate-x-1/2"
                      style={{ background: "#E3E3E3" }}
                    />
                  )}
                </div>
                <span
                  className="aa-mono"
                  style={{
                    minWidth: 0,
                    paddingBottom: i === PIPELINE.length - 1 ? 0 : 6,
                    fontSize: 11,
                    color: "#606060",
                  }}
                >
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <FlowLink label={RETURN_STEP} />
        <SystemNode label="EHR" returned />
      </div>
    </div>
  );
}

function SystemNode({ label, returned }: { label: string; returned?: boolean }) {
  return (
    <div
      style={{
        margin: "0 auto",
        display: "flex",
        width: "100%",
        maxWidth: 240,
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        borderRadius: 8,
        border: "1px solid #E3E3E3",
        background: "#F5F5F5",
        padding: "8px 12px",
      }}
    >
      <span
        style={{
          display: "flex",
          width: 24,
          height: 24,
          flexShrink: 0,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
          border: "1px solid #E3E3E3",
          background: "#ffffff",
          color: "#007EFF",
        }}
      >
        <Icon name="server" width={12} height={12} />
      </span>
      <span style={{ fontSize: 13, fontWeight: 700, lineHeight: 1, color: "#1A1A1A" }}>
        {label}
      </span>
      {returned ? (
        <Tick className="size-3 shrink-0 text-[#007EFF]" />
      ) : (
        <span
          className="size-1.5 rounded-full"
          style={{
            background: "#007EFF",
            animation: "mp-blink 2s ease-in-out infinite",
          }}
          aria-hidden
        />
      )}
    </div>
  );
}

function FlowLink({ label }: { label?: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        padding: "6px 0",
      }}
      aria-hidden
    >
      <span className="relative flex h-4 w-px shrink-0" style={{ background: "#E3E3E3" }}>
        <span
          className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full"
          style={{
            background: "#007EFF",
            animation: "mp-flow-pulse-v 2.6s ease-in-out infinite",
          }}
        />
      </span>
      {label ? (
        <>
          <span
            className="aa-mono"
            style={{
              borderRadius: 20,
              border: "1px solid #E3E3E3",
              background: "#F5F5F5",
              padding: "4px 12px",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#007EFF",
            }}
          >
            {label}
          </span>
          <span className="relative flex h-4 w-px shrink-0" style={{ background: "#E3E3E3" }}>
            <span
              className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full"
              style={{
                background: "#007EFF",
                animation: "mp-flow-pulse-v 2.6s ease-in-out infinite .6s",
              }}
            />
          </span>
        </>
      ) : null}
    </div>
  );
}

export function FinalCta() {
  return (
    <section
      style={{
        background: "#006AD6",
        padding: "120px 32px",
        textAlign: "center",
      }}
    >
      <h2
        className="aa-serif"
        style={{
          fontWeight: 500,
          fontSize: 44,
          lineHeight: 1.15,
          maxWidth: 720,
          margin: "0 auto 20px",
          color: "#ffffff",
        }}
      >
        {"Give Your Team's Evenings Back."}
      </h2>
      <p
        style={{
          fontSize: 17,
          color: "#CCE5FF",
          maxWidth: 520,
          margin: "0 auto 40px",
          lineHeight: 1.6,
        }}
      >
        See how Murphi turns a visit - or a short dictation - into a
        finished, signed note.
      </p>
      <a href="/contact-us/" className="aa-btn-on-blue">
        Request Demo
      </a>
    </section>
  );
}
