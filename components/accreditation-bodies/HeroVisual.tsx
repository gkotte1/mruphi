import { Icon } from "@/components/icons";
import {
  EvidenceTile,
  FootPair,
  IntelligenceBar,
  Panel,
  RequirementRow,
  ZoneLabel,
  type EvidenceDoc,
} from "@/components/accreditation-bodies/Evidence";

/**
 * The hero visual: the record, read against the standard.
 *
 * It used to be a generic card with two bullet rows. It is now the readiness
 * view itself, in the shape accreditation work actually takes - evidence
 * arriving from the record at the top, the mark reading it in the middle, and
 * the requirements it answers below, each carrying its number and whether it is
 * satisfied or still open. The packet is ready; the sign-off is not the
 * software's to give.
 *
 * The mark is the project's own LogoMark - no new or generated image. Every
 * string is the one the page already carried.
 */

const EVIDENCE: EvidenceDoc[] = [
  {
    title: "Policy & Procedure",
    meta: "P&P packet · Rev 2024.3",
    ref: "Std 2.1 · Mar 12",
    state: "mapped",
  },
  {
    title: "Training Record",
    meta: "Staff competencies · Q3",
    ref: "HR-TR-184 · Gap",
    state: "review",
  },
  {
    title: "Audit Documentation",
    meta: "Chart sample · 12 files",
    ref: "QA-AUD-09 · Ready",
    state: "mapped",
  },
  {
    title: "Quality Report",
    meta: "QAPI summary · Approved",
    ref: "QAPI-07 · Live",
    state: "mapped",
  },
];

export default function SurveyReadiness({
  title,
  status,
  context,
  requirements,
  foot,
}: {
  title: string;
  status: string;
  context: string;
  requirements: { requirement: string; title: string; state: "gap" | "mapped" }[];
  foot: [string, string];
}) {
  return (
    <Panel
      label={
        <>
          <Icon name="sealcheck" width={13} height={13} className="shrink-0 text-[#007EFF]" />
          <span className="min-w-0 break-words">{title}</span>
        </>
      }
      status={status}
      context={context}
      className="min-w-0 max-w-full"
      foot={<FootPair ready={foot[0]} gate={foot[1]} />}
    >
      {/* What came out of the record. */}
      <ZoneLabel>Evidence</ZoneLabel>
      <div className="grid grid-cols-2 gap-2 max-600:grid-cols-1">
        {EVIDENCE.map((doc, i) => (
          <EvidenceTile key={doc.title} doc={doc} index={i} />
        ))}
      </div>

      {/* What reads it. */}
      <div className="my-4">
        <IntelligenceBar label="Murphi.ai" />
      </div>

      {/* What it answers. */}
      <ZoneLabel>Requirements</ZoneLabel>
      <ul>
        {requirements.map((row, i) => (
          <RequirementRow
            key={row.requirement}
            requirement={row.requirement}
            title={row.title}
            state={row.state}
            index={i}
          />
        ))}
      </ul>
    </Panel>
  );
}
