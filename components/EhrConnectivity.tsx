import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/cn";

const EHRS = [
  "Axxess",
  "MatrixCare",
  "HCHB",
  "WellSky",
  "KanTime",
  "Kinnser",
  "HospiceMD",
  "Curantis",
  "+ Others",
];

export default function EhrConnectivity() {
  return (
    <section
      aria-labelledby="ehr-heading"
      className="relative isolate overflow-hidden py-28 max-1024:py-20 max-600:py-16"
    >
      <SectionGround />

      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[minmax(0,46fr)_minmax(0,54fr)] items-start gap-x-16 px-10 max-1200:gap-x-12 max-1200:px-8 max-1024:grid-cols-1 max-1024:gap-y-14 max-600:gap-y-10 max-600:px-4">
        {/* ── Left: the message ── */}
        <div className="min-w-0 pt-2 max-1024:mx-auto max-1024:max-w-[620px] max-1024:pt-0">
          <p className="type-label inline-flex items-center gap-2 rounded-full border border-brand-ghost bg-brand-tint px-3.5 py-1.5 text-brand-dark">
            <Icon name="network" width={13} height={13} />
            EHR Connectivity
          </p>

          <h2
            id="ehr-heading"
            className="mt-7 max-w-[420px] type-h2 text-ink"
          >
            Works with the EHR you already use.
          </h2>

          {/* The proposition carries the weight; the mechanics stay body copy. */}
          <p className="type-lead mt-5 max-w-[520px] text-grey-dk">
            <strong className="font-bold text-ink">
              Keep your EHR. Add Murphi AI.
            </strong>{" "}
            Integration happens through FHIR, HL7, direct APIs and agentic AI —
            chosen to fit how your EHR already works.
          </p>

          <ul className="mt-9 flex max-w-[520px] flex-wrap gap-2 border-t border-grey-mid pt-7">
            {EHRS.map((ehr) => {
              const others = ehr === "+ Others";

              return (
                <li
                  key={ehr}
                  className={cn(
                    "rounded-full px-3 py-[7px] text-[12px] font-bold leading-none tracking-[-0.01em]",
                    others
                      ? "border border-dashed border-grey-bdr/70 bg-transparent text-grey-dk/70"
                      : "border border-grey-mid bg-white text-ink shadow-[0_6px_16px_-14px_rgba(15,29,84,0.5)]",
                  )}
                >
                  {ehr}
                </li>
              );
            })}
          </ul>

          <p className="mt-6 max-w-[520px] text-[11.5px] font-medium leading-relaxed text-grey-dk/60">
            Connectivity varies by EHR — live integration, supported
            connectivity, and custom integration in development. No official
            partnership is implied unless stated. Logos not displayed without
            authorization.
          </p>

          <Link
            href="/ehr-companies/"
            className="group mt-9 btn-primary max-600:w-full max-600:justify-center"
          >
            Explore EHR Connectivity
            <Icon
              name="arrow"
              width={17}
              height={17}
              className="transition-transform duration-200 group-hover:translate-x-[3px]"
            />
          </Link>
        </div>

        {/* ── Right: the architecture ── */}
        <div className="min-w-0 max-1024:mx-auto max-1024:w-full max-1024:max-w-[560px]">
          <ConnectivityPanel />
        </div>
      </div>
    </section>
  );
}

function SectionGround() {
  return null;
}

/* ═════════════════ the connectivity panel ═════════════════ */

const STAGES: { label: string; icon: IconName }[] = [
  { label: "Analyze", icon: "scan" },
  { label: "Automate", icon: "pulse" },
  { label: "Generate", icon: "doc" },
];

const METHODS = ["FHIR", "HL7", "Direct APIs", "Agentic AI"];

/**
 * The page's one deep surface — the anchor band the brand kit allows once or
 * twice per page. The customer's EHR appears twice as the same light node,
 * top and bottom, with Murphi as the bright layer between them: the record
 * leaves and comes back to the system they already run.
 */
function ConnectivityPanel() {
  return (
    <div className="@container relative">
      <div className="relative overflow-hidden rounded-[32px] bg-brand p-7 shadow-[0_54px_120px_-56px_rgba(15,29,84,0.8)] ring-1 ring-white/15 max-1024:rounded-[26px] max-600:p-4">
        <PanelLight />

        <div className="relative">
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10px] font-bold uppercase leading-none tracking-[0.1em] text-white/55">
            Your EHR
            <span className="text-brand-pale">→</span>
            <span className="text-white">Murphi AI</span>
            <span className="text-brand-pale">→</span>
            Your EHR
          </p>

          <div className="mt-6 max-600:mt-5">
            <EhrNode meta="Existing system" state="Connected" />
          </div>

          <FlowLink label="Fetch" icon="server" />

          <MurphiCore />

          <FlowLink label="Write Back" icon="sync" />

          <EhrNode meta="Same system, updated" state="Updated" returned />

          <Methods />
        </div>
      </div>
    </div>
  );
}

/** Depth on the deep surface: two washes and a masked dot field. */
function PanelLight() {
  return null;
}

/** The customer's system — the same node, before and after. */
function EhrNode({
  meta,
  state,
  returned,
}: {
  meta: string;
  state: string;
  returned?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-[16px] border border-white/60 bg-white/95 px-4 py-3 shadow-[0_18px_40px_-26px_rgba(15,29,84,0.7)] max-600:px-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-[11px] border border-brand-border bg-brand-tint text-brand-dark">
        <Icon name="server" width={16} height={16} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-extrabold leading-none tracking-[-0.02em] text-ink">
          Your EHR
        </p>
        <p className="mt-1.5 truncate text-[10.5px] font-semibold leading-none text-grey-dk/55">
          {meta}
        </p>
      </div>

      <span
        className={cn(
          "flex shrink-0 items-center gap-1.5 text-[9.5px] font-bold uppercase leading-none tracking-[0.06em]",
          returned ? "text-brand-deep" : "text-brand-dark",
        )}
      >
        {returned ? (
          <Icon name="check" width={11} height={11} />
        ) : (
          <span className="relative flex size-1.5">
            <span
              className="absolute inline-flex size-full rounded-full bg-brand/60"
              style={{ animation: "mp-glow 2.8s ease-in-out infinite" }}
            />
            <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
          </span>
        )}
        {state}
      </span>
    </div>
  );
}

/** A run of connector with the step riding on it. */
function FlowLink({ label, icon }: { label: string; icon: IconName }) {
  return (
    <div className="relative h-[74px] max-600:h-[62px]">
      <svg
        viewBox="0 0 2 74"
        preserveAspectRatio="none"
        className="absolute inset-0 mx-auto h-full w-px"
        fill="none"
        aria-hidden
      >
        <path
          d="M1 0 V74"
          stroke="#A3D1FF"
          strokeOpacity="0.55"
          strokeWidth="2"
          strokeDasharray="5 7"
          style={{ animation: "mp-flow 4.5s linear infinite" }}
        />
      </svg>

      <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-white/25 bg-brand-deep px-3 py-[6px] text-[10px] font-bold uppercase leading-none tracking-[0.08em] text-white">
        <Icon name={icon} width={11} height={11} className="text-brand-pale" />
        {label}
      </span>
    </div>
  );
}

/** The centre of the composition: the only bright, lifted surface. */
function MurphiCore() {
  return (
    <div className="relative">

      <div className="rounded-[22px] border border-white/70 bg-white p-4 shadow-[0_34px_74px_-30px_rgba(15,29,84,0.85)] max-600:p-3.5">
        <div className="flex items-center gap-3">
          <LogoMark size={30} className="shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-extrabold leading-none tracking-[-0.025em] text-ink">
              Murphi AI
            </p>
            <p className="type-micro mt-1.5 text-grey-dk/55">
              Intelligent layer
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-brand-border bg-brand-tint px-2.5 py-[5px] text-[9.5px] font-bold uppercase leading-none tracking-[0.06em] text-brand-dark">
            <span className="relative flex size-1.5">
              <span
                className="absolute inline-flex size-full rounded-full bg-brand/60"
                style={{ animation: "mp-glow 2.4s ease-in-out infinite" }}
              />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
            </span>
            Processing
          </span>
        </div>

        <div className="my-3.5 h-px bg-grey-mid" />

        <ol className="grid gap-2">
          {STAGES.map((stage, i) => (
            <li
              key={stage.label}
              className="mp-enter flex items-center gap-2.5 rounded-[11px] border border-brand-border/60 bg-grey-bg px-2.5 py-2"
              style={{ animationDelay: `${0.14 * i}s` }}
            >
              <span className="flex size-[22px] shrink-0 items-center justify-center rounded-[7px] bg-brand-tint text-brand-dark">
                <Icon name={stage.icon} width={12} height={12} />
              </span>

              <span className="text-[11.5px] font-bold leading-none tracking-[-0.01em] text-ink">
                {stage.label}
              </span>

              <span className="relative ml-auto block h-[4px] w-[76px] shrink-0 overflow-hidden rounded-full bg-grey-soft @max-[380px]:w-[44px]">
                <span
                  className="absolute inset-y-0 left-0 w-[45%] rounded-full"
                  style={{
                    background: "#007EFF",
                    animation: `mp-sweep 3s ease-in-out infinite ${i * 0.4}s`,
                  }}
                />
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/** How the connection is actually made — supporting, never competing. */
function Methods() {
  return (
    <div className="mt-6 border-t border-white/15 pt-5">
      <p className="text-center text-[9.5px] font-bold uppercase leading-none tracking-[0.1em] text-white/45">
        Connectivity
      </p>

      <ul className="mt-3 flex flex-wrap justify-center gap-2">
        {METHODS.map((method) => (
          <li
            key={method}
            className="rounded-full border border-white/25 bg-white/12 px-3 py-[6px] text-[11px] font-bold leading-none tracking-[-0.01em] text-white/90"
          >
            {method}
          </li>
        ))}
      </ul>
    </div>
  );
}
