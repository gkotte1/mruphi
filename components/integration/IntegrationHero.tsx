import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { Icon, type IconName } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import { IpWrap } from "@/components/inner-page/Shell";

/**
 * The page opener: message left, a plain three-node diagram right.
 * The diagram carries only the three node names - no added claims.
 */
export default function IntegrationHero() {
  return (
    <>
      <IpWrap>
        <nav
          className="ip-mono"
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
          <span style={{ color: "#1A1A1A", fontWeight: 600 }}>Integrations</span>
        </nav>
      </IpWrap>

      <section style={{ padding: "40px 0 0" }}>
        <IpWrap className="ip-hero-grid">
          <Reveal>
            <span
              className="ip-mono"
              style={{
                marginBottom: 16,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                borderRadius: 20,
                border: "1px solid #E3E3E3",
                background: "#F5F5F5",
                padding: "6px 12px",
                fontSize: 10.5,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#878787",
              }}
            >
              <Icon name="network" width={13} height={13} />
              Integrations
            </span>

            <h1 className="ip-h1 ip-serif" style={{ marginTop: 16 }}>
              Connect Murphi.ai to Any EHR or Healthcare Platform
            </h1>

            <p className="ip-lead" style={{ marginTop: 18, maxWidth: "56ch", fontSize: 18 }}>
              Five integration methods - Agentic AI, RPA, FHIR R4, HL7 v2, and
              Direct API. No EHR replacement required. Live in days.
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
              <Link href="/contact-us/" className="ip-btn">
                Request Demo
              </Link>
              <Link href="/" className="ip-btn-ghost">
                Back to Home
              </Link>
            </div>
          </Reveal>

          <Reveal>
            <FlowDiagram />
          </Reveal>
        </IpWrap>
      </section>
    </>
  );
}

type Node = { label: string; icon: IconName; core?: boolean };

const NODES: Node[] = [
  { label: "EHR / Healthcare Platform", icon: "server" },
  { label: "Murphi.ai", icon: "brain", core: true },
  { label: "Healthcare Workflows", icon: "network" },
];

/**
 * The three systems, as a product surface rather than a diagram: a thin
 * #007EFF outline frames the whole thing, the mark sits at the centre with the
 * two systems it joins above and below, and work travels the runs between them.
 */
function FlowDiagram() {
  return (
    <div className="ip-card p-8 max-600:p-5">
      {NODES.map((node, i) => (
        <div key={node.label}>
          {i > 0 ? <Connector delay={i === 1 ? "0s" : ".7s"} /> : null}

          <div
            className={
              node.core
                ? "flex items-center gap-3.5 rounded-[8px] border border-[#007EFF] bg-[#F5F5F5] px-4 py-4"
                : "flex items-center gap-3.5 rounded-[8px] border border-[#E3E3E3] bg-[#F5F5F5] px-4 py-3.5"
            }
          >
            <span
              className={
                node.core
                  ? "flex size-11 shrink-0 items-center justify-center rounded-full border border-[#E3E3E3] bg-white"
                  : "flex size-10 shrink-0 items-center justify-center rounded-full border border-[#E3E3E3] bg-white text-[#007EFF]"
              }
            >
              {node.core ? (
                <LogoMark size={26} />
              ) : (
                <Icon name={node.icon} width={17} height={17} />
              )}
            </span>

            <p
              className={
                node.core
                  ? "min-w-0 flex-1 text-[15px] font-bold leading-snug tracking-[-0.02em] text-ink"
                  : "min-w-0 flex-1 text-[13.5px] font-bold leading-snug tracking-[-0.015em] text-[#606060]"
              }
            >
              {node.label}
            </p>

            <span className="relative flex size-1.5 shrink-0" aria-hidden>
              {node.core ? (
                <span
                  className="absolute inline-flex size-full rounded-full bg-[#007EFF]/60 motion-reduce:hidden"
                  style={{ animation: "mp-glow 2.4s ease-in-out infinite" }}
                />
              ) : null}
              <span
                className={
                  node.core
                    ? "relative inline-flex size-1.5 rounded-full bg-[#007EFF]"
                    : "relative inline-flex size-1.5 rounded-full bg-[#E3E3E3]"
                }
              />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/** The run between two systems, with work travelling along it. */
function Connector({ delay = "0s" }: { delay?: string }) {
  return (
    <div className="flex justify-center py-3" aria-hidden>
      <span className="relative flex h-8 w-px shrink-0 bg-[#E3E3E3]">
        <span
          className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[#007EFF] motion-reduce:hidden"
          style={{ animation: `mp-flow-pulse-v 2.8s ease-in-out infinite ${delay}` }}
        />
      </span>
    </div>
  );
}
