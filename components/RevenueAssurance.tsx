import Reveal from "@/components/module-page/Reveal";
import {
  Accent,
  ChipRow,
  Eyebrow,
  FetchNote,
  GhostLink,
  Lede,
  ModuleHeading,
  OutcomeTiles,
  ProductShot,
  SectionWrap,
} from "@/components/home/kit";
import { cn } from "@/lib/cn";

const SCOPE = ["Coding", "OASIS", "POC", "PDGM", "ADRs"];

const OUTCOMES = [
  "Fewer denials",
  "Protected reimbursement",
  "Faster ADR turnaround",
];

const FINDINGS = [
  {
    tone: "flag" as const,
    index: "01",
    title: "Homebound status not fully documented",
    meta: "Section G · Visit 3",
  },
  {
    tone: "flag" as const,
    index: "02",
    title: "Face-to-Face encounter date missing",
    meta: "Referral documentation",
  },
  {
    tone: "opportunity" as const,
    index: "03",
    title: "PDGM grouping opportunity identified",
    meta: "Coding review",
  },
];

export default function RevenueAssurance() {
  return (
    <SectionWrap id="revenue-assurance" tone="grey">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <Reveal>
          <Eyebrow>Revenue Assurance</Eyebrow>
          <ModuleHeading id="revenue-heading">
            Review every chart before it becomes a{" "}
            <Accent>revenue problem</Accent>.
          </ModuleHeading>
          <Lede>
            Murphi can fetch the relevant record straight from your EHR - no
            manual upload required - analyze it, and write findings back where
            your team already works.
          </Lede>
          <ChipRow items={SCOPE} />
        </Reveal>
        <GhostLink href="/revenue-assurance/">
          Explore Revenue Assurance Use Cases
        </GhostLink>
      </div>

      <Reveal>
        <div className="mt-12 max-1024:mt-10">
          <ProductShot
            src="/22.jpeg"
            alt="Murphi's coding report workspace: the source referral and physician orders on the left, and the AI-generated OASIS review on the right showing factual accuracy and confidence scores, patient and payer details, and ICD-10 codes with the rationale and cited evidence for each."
            width={1600}
            height={766}
            label="Coding Report & OASIS Review - Home Health"
            caption="Every code carries its sequencing rationale and a link back to the page it came from."
          />
        </div>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-3 max-1024:mt-10">
        {FINDINGS.map((finding) => (
          <article
            key={finding.title}
            className="rounded-hero border border-grey-mid bg-white p-7"
          >
            <p className="type-label text-ink-muted">{finding.index}</p>
            <span
              className={cn(
                "mt-5 inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.06em]",
                finding.tone === "flag"
                  ? "bg-brand-tint text-brand-deep"
                  : "bg-brand text-grey-bg",
              )}
            >
              {finding.tone === "flag" ? "Needs attention" : "Opportunity"}
            </span>
            <h3 className="type-hl-card-title mt-4 text-ink">
              {finding.title}
            </h3>
            <p className="type-hl-card-body mt-2">{finding.meta}</p>
          </article>
        ))}
      </div>

      <div className="mt-10">
        <OutcomeTiles items={OUTCOMES} />
      </div>

      <FetchNote>
        Murphi can pull referral, F2F, OASIS, POC and visit notes directly from
        your EHR. Manual PDF upload is also supported.
      </FetchNote>
    </SectionWrap>
  );
}
