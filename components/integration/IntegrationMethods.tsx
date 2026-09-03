import { Icon, type IconName } from "@/components/icons";

type Method = { index: string; title: string; body: string; icon: IconName };

const METHODS: Method[] = [
  {
    index: "01",
    title: "Agentic AI",
    icon: "brain",
    body: "AI agents navigate EHR interfaces autonomously — reading data, entering notes, and triggering workflows without API access. Works with any EHR that has a web or desktop interface. No vendor cooperation required.",
  },
  {
    index: "02",
    title: "RPA",
    icon: "sync",
    body: "Robotic Process Automation automates repetitive EHR tasks — data entry, form completion, document upload, and report generation. Ideal for EHRs without modern APIs.",
  },
  {
    index: "03",
    title: "FHIR R4",
    icon: "network",
    body: "Standards-based FHIR R4 integration for EHRs with modern APIs. Bidirectional data exchange — read patient data, write clinical notes, and trigger workflows via FHIR resources.",
  },
  {
    index: "04",
    title: "HL7 v2",
    icon: "exchange",
    body: "Legacy HL7 v2 message integration for EHRs using ADT, ORM, ORU, and MDM message types. Connect EHRs using HL7 v2 without replacing existing infrastructure.",
  },
  {
    index: "05",
    title: "Direct REST API",
    icon: "code",
    body: "Direct API integration for EHR platforms and health IT vendors. REST endpoints for all Murphi.ai modules — read, write, and trigger workflows programmatically.",
  },
  {
    index: "06",
    title: "Adapter Platforms",
    icon: "layers",
    body: "Integration via Carefluence FHIR API adapter (current integration partner) and Rhapsody integration engine (available). Connect to any EHR via third-party adapters when direct integration is not available.",
  },
];

export default function IntegrationMethods() {
  return (
    <section
      aria-labelledby="methods-heading"
      className="relative isolate bg-white py-28 max-1024:py-20 max-600:py-16"
    >
      <div className="mx-auto w-full max-w-[1280px] px-10 max-1200:px-8 max-600:px-4">
        <div className="max-w-[720px]">
          <p className="type-label text-brand-dark">Integration Methods</p>

          <h2
            id="methods-heading"
            className="mt-4 type-h2 text-ink"
          >
            Five Ways to Connect Murphi.ai to Any EHR
          </h2>

          <p className="type-lead mt-5 text-grey-dk">
            No single integration method works for every EHR. Murphi.ai supports
            five distinct integration pathways — so the right method is always
            {"available regardless of your EHR's technical architecture."}
          </p>
        </div>

        {/* One catalogue, hairline divided — the methods read as a set. */}
        <ul className="mt-14 grid grid-cols-3 gap-px overflow-hidden rounded-panel border border-grey-mid bg-grey-mid shadow-[0_22px_54px_-40px_rgba(15,29,84,0.5)] max-1024:grid-cols-2 max-768:grid-cols-1 max-600:mt-10">
          {METHODS.map((method) => (
            <li
              key={method.index}
              className="group flex flex-col bg-white p-6 transition-colors duration-200 hover:bg-grey-bg max-600:p-5"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-card border border-brand-border/80 bg-brand-tint text-brand-dark transition-colors duration-200 group-hover:border-transparent group-hover:bg-brand group-hover:text-grey-bg">
                  <Icon name={method.icon} width={18} height={18} />
                </span>

                <span className="type-micro ml-auto text-grey-dk/35">
                  {method.index}
                </span>
              </div>

              <h3 className="mt-5 text-[16px] font-bold leading-snug tracking-[-0.02em] text-ink">
                {method.title}
              </h3>

              <p className="mt-3.5 text-[13.5px] font-normal leading-relaxed text-grey-dk/85">
                {method.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
