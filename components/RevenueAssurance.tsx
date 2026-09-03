import Reveal from "@/components/module-page/Reveal";
import {
  ChipRow,
  Eyebrow,
  FetchNote,
  FindingRow,
  GhostLink,
  Lede,
  MockCard,
  MockFoot,
  MockHead,
  MockPanel,
  ModuleBlock,
  ModuleHeading,
  OutcomeList,
} from "@/components/home/kit";

/**
 * Module 2 — Revenue Assurance, converted from `#revenue-assurance` in
 * "01. HomePAge/Murphi.ai Home LandingPage.html".
 *
 * A `.reverse` block: the copy sits in the right column, the visual in the
 * left. The visual is the chart-review card with three `.finding-row`s, and a
 * `.fetch-note` beneath it. Every string is the reference's own.
 */

const SCOPE = ["Coding", "OASIS", "POC", "PDGM", "ADRs"];

const OUTCOMES = [
  "Fewer denials",
  "Protected reimbursement",
  "Faster ADR turnaround",
];

const FINDINGS = [
  {
    tone: "flag" as const,
    title: "Homebound status not fully documented",
    meta: "Section G · Visit 3",
  },
  {
    tone: "flag" as const,
    title: "Face-to-Face encounter date missing",
    meta: "Referral documentation",
  },
  {
    tone: "opportunity" as const,
    title: "PDGM grouping opportunity identified",
    meta: "Coding review",
  },
];

export default function RevenueAssurance() {
  return (
    <ModuleBlock
      id="revenue-assurance"
      reverse
      copy={
        <Reveal>
          <Eyebrow>Revenue Assurance</Eyebrow>

          <ModuleHeading id="revenue-heading">
            Review every chart before it becomes a revenue problem.
          </ModuleHeading>

          <Lede>
            Murphi can fetch the relevant record straight from your EHR — no
            manual upload required — analyze it, and write findings back where
            your team already works.
          </Lede>

          <ChipRow items={SCOPE} />

          <OutcomeList items={OUTCOMES} />

          <GhostLink href="/revenue-assurance/">
            Explore Revenue Assurance Use Cases
          </GhostLink>
        </Reveal>
      }
      visual={
        <Reveal>
          <MockCard>
            <MockHead label="Chart Review · OASIS-E" status="3 Findings" />

            <MockPanel>
              {FINDINGS.map((finding) => (
                <FindingRow
                  key={finding.title}
                  tone={finding.tone}
                  title={finding.title}
                  meta={finding.meta}
                />
              ))}
            </MockPanel>

            <MockFoot left="Fetched from EHR" right="Write-back ready" />
          </MockCard>

          <FetchNote>
            Murphi can pull referral, F2F, OASIS, POC and visit notes directly
            from your EHR. Manual PDF upload is also supported.
          </FetchNote>
        </Reveal>
      }
    />
  );
}
