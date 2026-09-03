import Reveal from "@/components/module-page/Reveal";
import {
  ChipRow,
  ColumnLabel,
  Eyebrow,
  FetchLine,
  GhostLink,
  Lede,
  MockCard,
  MockFoot,
  MockHead,
  MockPanel,
  ModuleBlock,
  ModuleHeading,
  NoteBoxGrid,
  OutcomeList,
  PanelLabel,
  TwoColList,
  Waveform,
} from "@/components/home/kit";

/**
 * Module 1 — Ambient AI & Dictation, converted from `#ambient-ai` in
 * "01. HomePAge/Murphi.ai Home LandingPage.html".
 *
 * Copy left, the capture card right; the card is one `.mock-body.single` panel
 * holding the fetch line, the waveform, the dictation label and the six note
 * boxes, closed by the two-note foot. Every string is the reference's own.
 */

const HOME_HEALTH = ["OASIS", "SN", "PT", "OT", "ST"];
const HOSPICE = ["HOPE", "RN/SN", "Aide", "Chaplain", "Social Worker"];

const OUTCOMES = [
  "Less documentation time",
  "Faster chart completion",
  "Greater clinician capacity",
];

const NOTE_TYPES = ["OASIS", "HOPE", "SN", "PT", "OT", "ST"];

export default function AmbientDictation() {
  return (
    <ModuleBlock
      id="ambient-ai"
      copy={
        <Reveal>
          <Eyebrow>Ambient AI &amp; Dictation</Eyebrow>

          <ModuleHeading id="ambient-heading">
            Give clinicians their time back.
          </ModuleHeading>

          <Lede>
            Murphi fetches the patient record from your EHR, listens to the
            encounter, and generates OASIS or HOPE notes within minutes. Or a
            clinician dictates for three minutes and SN, PT, OT and ST notes are
            populated automatically.
          </Lede>

          <TwoColList>
            <div>
              <ColumnLabel>Home Health</ColumnLabel>
              <ChipRow items={HOME_HEALTH} />
            </div>
            <div>
              <ColumnLabel>Hospice</ColumnLabel>
              <ChipRow items={HOSPICE} />
            </div>
          </TwoColList>

          <OutcomeList items={OUTCOMES} />

          <GhostLink href="/ambient-ai-dictation/">
            Explore Ambient AI &amp; Dictation
          </GhostLink>
        </Reveal>
      }
      visual={
        <Reveal>
          <MockCard>
            <MockHead
              label="Ambient AI + Voice Dictation"
              status="Listening"
              onBlue
              icon
            />

            <MockPanel>
              <FetchLine>Patient record fetched from EHR</FetchLine>

              <Waveform className="mb-[18px]" />

              <PanelLabel>
                3-minute dictation &rarr; 6 note types populated
              </PanelLabel>

              <NoteBoxGrid items={NOTE_TYPES} />
            </MockPanel>

            <MockFoot
              left="6 note types across Home Health & Hospice"
              right="Synced → EHR in minutes"
            />
          </MockCard>
        </Reveal>
      }
    />
  );
}
