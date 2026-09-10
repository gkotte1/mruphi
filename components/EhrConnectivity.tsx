import Reveal from "@/components/module-page/Reveal";
import {
  Accent,
  Eyebrow,
  FlowConnector,
  FlowStep,
  SectionWrap,
  SubSteps,
} from "@/components/home/kit";
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

const SUB_STEPS = ["Fetch", "Analyze", "Automate", "Generate", "Write Back"];

export default function EhrConnectivity() {
  return (
<<<<<<< Updated upstream
    <SectionWrap id="ehr">
=======
    <section
      id="ehr"
      aria-labelledby="ehr-heading"
      className={cn("border-t border-grey-mid", SECTION)}
    >
>>>>>>> Stashed changes
      <Reveal>
        <div className="mx-auto max-w-[680px] text-center">
          <Eyebrow>EHR Connectivity</Eyebrow>
          <h2 id="ehr-heading" className="type-h2 text-ink">
            Works with the EHR <Accent>you already use</Accent>.
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-[18px] leading-[1.6] text-grey-500">
            Keep your EHR. Add Murphi AI. Integration happens through FHIR,
            HL7, direct APIs and agentic AI - chosen to fit how your EHR already
            works.
          </p>
        </div>
      </Reveal>

      <div className="mx-auto mt-14 max-w-[820px] rounded-hero border border-grey-mid bg-grey-bg px-10 py-10 max-720:px-5 max-720:py-7">
        <p className="mb-10 text-center text-[16px] leading-[1.5] text-ink">
          Your EHR &rarr; Murphi AI &rarr; Your EHR
        </p>
        <div className={cn("flex w-full items-center justify-center")}>
          <FlowStep label="Your EHR" />
          <FlowConnector />
          <FlowStep label="Murphi AI" accent />
          <FlowConnector delay="0.35s" />
          <FlowStep label="Your EHR" />
        </div>
        <div className="flex justify-center">
          <SubSteps items={SUB_STEPS} />
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {EHRS.map((name) => (
          <span
            key={name}
            className="rounded-full border border-grey-mid bg-white px-4 py-2 text-[13px] font-semibold text-grey-500"
          >
            {name}
          </span>
        ))}
      </div>

      <p className="mx-auto mt-4 max-w-[62ch] text-center text-[12px] leading-[1.5] text-ink-muted">
        Connectivity varies by EHR - live integration, supported connectivity,
        and custom integration in development. No official partnership is
        implied unless stated. Logos not displayed without authorization.
      </p>
    </SectionWrap>
  );
}
