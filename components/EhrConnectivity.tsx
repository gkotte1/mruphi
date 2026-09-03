import Reveal from "@/components/module-page/Reveal";
import {
  Eyebrow,
  FlowConnector,
  FlowStep,
  SECTION,
  SubSteps,
} from "@/components/home/kit";
import { cn } from "@/lib/cn";

/**
 * EHR Connectivity, converted from `#ehr` in
 * "01. HomePAge/Murphi.ai Home LandingPage.html".
 *
 * A plain `.section` holding one tinted, rounded `.ehr-section` panel: the copy
 * and EHR pills on the left, the round-trip flow diagram on the right. Every
 * string is the reference's own.
 */

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
    <section id="ehr" aria-labelledby="ehr-heading" className={SECTION}>
      <Reveal>
        {/* .ehr-section — 1156px wide, tinted, 56px/48px inside. */}
        <div className="mx-auto max-w-[1156px] rounded-panel bg-grey-bg px-12 py-14 max-720:mx-5 max-720:px-6 max-720:py-10">
          {/* .ehr-inner */}
          <div className="grid grid-cols-[0.95fr_1.05fr] items-center gap-14 max-1080:grid-cols-1 max-1080:gap-10">
            <div className="min-w-0">
              <Eyebrow>EHR Connectivity</Eyebrow>

              <h2 id="ehr-heading" className="type-h2 text-ink">
                Works with the EHR you already use.
              </h2>

              <p className="mt-4 max-w-[52ch] text-[18px] leading-[1.6] text-grey-500">
                Keep your EHR. Add Murphi AI. Integration happens through FHIR,
                HL7, direct APIs and agentic AI — chosen to fit how your EHR
                already works.
              </p>

              {/* .ehr-logos — names set as pills, never borrowed marks. */}
              <div className="mt-7 flex flex-wrap gap-3">
                {EHRS.map((name) => (
                  <span
                    key={name}
                    className="rounded-[8px] border border-grey-mid bg-white px-4 py-2 text-[13px] font-semibold text-grey-500"
                  >
                    {name}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-[12px] leading-[1.5] text-ink-muted">
                Connectivity varies by EHR — live integration, supported
                connectivity, and custom integration in development. No official
                partnership is implied unless stated. Logos not displayed without
                authorization.
              </p>
            </div>

            {/* .sor-visual */}
            <div className="min-w-0 rounded-tile border border-grey-mid bg-white px-7 py-8 max-720:px-[18px] max-720:py-6">
              <p className="mb-[34px] text-[16px] leading-[1.5] text-ink">
                Your EHR &rarr; Murphi AI &rarr; Your EHR
              </p>

              {/* .flow — two nodes either side of Murphi, joined both ways. */}
              <div className={cn("flex w-full items-center")}>
                <FlowStep label="Your EHR" />
                <FlowConnector />
                <FlowStep label="Murphi AI" accent />
                <FlowConnector delay="0.35s" />
                <FlowStep label="Your EHR" />
              </div>

              <SubSteps items={SUB_STEPS} />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
