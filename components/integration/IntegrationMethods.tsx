import { Icon, type IconName } from "@/components/icons";
import { IpWrap } from "@/components/inner-page/Shell";

type Method = { index: string; title: string; body: string; icon: IconName };

const METHODS: Method[] = [
  {
    index: "01",
    title: "Agentic AI",
    icon: "brain",
    body: "AI agents navigate EHR interfaces autonomously - reading data, entering notes, and triggering workflows without API access. Works with any EHR that has a web or desktop interface. No vendor cooperation required.",
  },
  {
    index: "02",
    title: "RPA",
    icon: "sync",
    body: "Robotic Process Automation automates repetitive EHR tasks - data entry, form completion, document upload, and report generation. Ideal for EHRs without modern APIs.",
  },
  {
    index: "03",
    title: "FHIR R4",
    icon: "network",
    body: "Standards-based FHIR R4 integration for EHRs with modern APIs. Bidirectional data exchange - read patient data, write clinical notes, and trigger workflows via FHIR resources.",
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
    body: "Direct API integration for EHR platforms and health IT vendors. REST endpoints for all Murphi.ai modules - read, write, and trigger workflows programmatically.",
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
      style={{ padding: "64px 0 96px" }}
    >
      <IpWrap>
        <div className="max-w-[720px]">
          <p className="ip-eyebrow">Integration Methods</p>

          <h2 id="methods-heading" className="ip-h2 ip-serif" style={{ marginTop: 16 }}>
            Five Ways to Connect Murphi.ai to Any EHR
          </h2>

          <p className="ip-lead" style={{ marginTop: 18 }}>
            No single integration method works for every EHR. Murphi.ai supports
            five distinct integration pathways - so the right method is always
            available regardless of your EHR&apos;s technical architecture.
          </p>
        </div>

        <ul className="ip-ruled mt-14 grid-cols-3 max-1024:grid-cols-2 max-768:grid-cols-1 max-600:mt-10">
          {METHODS.map((method) => (
            <li
              key={method.index}
              className="group flex flex-col p-6 transition-colors duration-200 hover:bg-[#F5F5F5] max-600:p-5"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[8px] border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF] transition-colors duration-200 group-hover:border-transparent group-hover:bg-[#007EFF] group-hover:text-white">
                  <Icon name={method.icon} width={18} height={18} />
                </span>

                <span className="ip-mono ml-auto text-[10.5px] font-semibold tracking-[0.06em] text-[#B2B2B2]">
                  {method.index}
                </span>
              </div>

              <h3 className="type-hl-card-title mt-5 text-ink">
                {method.title}
              </h3>

              <p className="type-hl-card-body mt-3.5">
                {method.body}
              </p>
            </li>
          ))}
        </ul>
      </IpWrap>
    </section>
  );
}
