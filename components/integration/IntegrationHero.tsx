import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { Icon, type IconName } from "@/components/icons";

/**
 * The page opener: message left, a plain three-node diagram right.
 * The diagram carries only the three node names — no added claims.
 */
export default function IntegrationHero() {
  return (
    <section className="relative isolate overflow-hidden pt-[80px]">
      <HeroGround />

      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[minmax(0,52fr)_minmax(0,48fr)] items-center gap-x-16 px-10 py-24 max-1200:gap-x-12 max-1200:px-8 max-1024:grid-cols-1 max-1024:gap-y-14 max-1024:py-20 max-600:px-4 max-600:py-14">
        <div className="min-w-0 max-1024:mx-auto max-1024:max-w-[620px]">
          <p className="type-label inline-flex items-center gap-2 rounded-full border border-brand-ghost bg-brand-tint px-3.5 py-1.5 text-brand-dark">
            <Icon name="network" width={13} height={13} />
            Integrations
          </p>

          <h1 className="mt-7 max-w-[580px] type-h1 text-ink">
            Connect Murphi.ai to Any EHR or Healthcare Platform
          </h1>

          <p className="type-lead mt-5 max-w-[540px] text-grey-dk">
            Five integration methods — Agentic AI, RPA, FHIR R4, HL7 v2, and
            Direct API. No EHR replacement required. Live in days.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3.5 max-600:flex-col max-600:items-stretch">
            <Link
              href="/contact-us/"
              className="group btn-primary"
            >
              Request Demo
              <Icon
                name="arrow"
                width={17}
                height={17}
                className="transition-transform duration-200 group-hover:translate-x-[3px]"
              />
            </Link>

            <Link
              href="/"
              className="btn-secondary"
            >
              Back to Home
            </Link>
          </div>
        </div>

        <div className="min-w-0 max-1024:mx-auto max-1024:w-full max-1024:max-w-[520px]">
          <FlowDiagram />
        </div>
      </div>
    </section>
  );
}

function HeroGround() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background: "#FFFFFF",
        }}
      />
    </div>
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
    <div className="rounded-[24px] border border-brand bg-white p-8 shadow-[0_30px_80px_-50px_rgba(0,126,255,0.45)] max-600:p-5">
      {NODES.map((node, i) => (
        <div key={node.label}>
          {i > 0 ? <Connector delay={i === 1 ? "0s" : ".7s"} /> : null}

          <div
            className={
              node.core
                ? "flex items-center gap-3.5 rounded-[16px] border border-brand-border bg-brand-ghost px-4 py-4 shadow-[0_14px_34px_-24px_rgba(0,86,173,0.6)]"
                : "flex items-center gap-3.5 rounded-[16px] border border-grey-mid bg-grey-bg px-4 py-3.5"
            }
          >
            <span
              className={
                node.core
                  ? "flex size-11 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white shadow-brand"
                  : "flex size-10 shrink-0 items-center justify-center rounded-full border border-brand-border/70 bg-white text-brand-dark"
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
                  ? "min-w-0 flex-1 text-[15px] font-extrabold leading-snug tracking-[-0.02em] text-ink"
                  : "min-w-0 flex-1 text-[13.5px] font-bold leading-snug tracking-[-0.015em] text-grey-dk"
              }
            >
              {node.label}
            </p>

            {/* Connected, and working — state drawn, never spelled out. */}
            <span className="relative flex size-1.5 shrink-0" aria-hidden>
              {node.core ? (
                <span
                  className="absolute inline-flex size-full rounded-full bg-brand/60 motion-reduce:hidden"
                  style={{ animation: "mp-glow 2.4s ease-in-out infinite" }}
                />
              ) : null}
              <span
                className={
                  node.core
                    ? "relative inline-flex size-1.5 rounded-full bg-brand"
                    : "relative inline-flex size-1.5 rounded-full bg-brand-pale"
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
      <span className="relative flex h-8 w-px shrink-0 bg-brand-pale">
        <span
          className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-brand motion-reduce:hidden"
          style={{ animation: `mp-flow-pulse-v 2.8s ease-in-out infinite ${delay}` }}
        />
      </span>
    </div>
  );
}
