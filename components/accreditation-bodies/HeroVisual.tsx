import { Icon } from "@/components/icons";
import {
  EvidenceTile,
  FootPair,
  IntelligenceBar,
  Panel,
  RequirementRow,
  ZoneLabel,
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
          <Icon name="sealcheck" width={13} height={13} className="shrink-0" />
          <span className="truncate">{title}</span>
        </>
      }
      status={status}
      context={context}
      foot={<FootPair ready={foot[0]} gate={foot[1]} />}
    >
      {/* What came out of the record. */}
      <ZoneLabel>Evidence</ZoneLabel>
      <div className="grid grid-cols-4 gap-2 max-600:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <EvidenceTile key={i} index={i} />
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
