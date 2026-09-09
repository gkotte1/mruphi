import Reveal from "@/components/module-page/Reveal";
import {
  Accent,
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
  ModuleHeading,
  NoteBoxGrid,
  OutcomeTiles,
  PanelLabel,
  SectionWrap,
  TwoColList,
  Waveform,
} from "@/components/home/kit";

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
    <SectionWrap id="ambient-ai">
      <Reveal>
        <div className="mx-auto max-w-[720px] text-center">
          <Eyebrow>Ambient AI &amp; Dictation</Eyebrow>
          <ModuleHeading id="ambient-heading">
            Give clinicians their <Accent>time back</Accent>.
          </ModuleHeading>
          <Lede className="mx-auto">
            Murphi fetches the patient record from your EHR, listens to the
            encounter, and generates OASIS or HOPE notes within minutes. Or a
            clinician dictates for three minutes and SN, PT, OT and ST notes are
            populated automatically.
          </Lede>
        </div>
      </Reveal>

      <Reveal>
        <div className="mx-auto mt-12 max-w-[760px]">
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
        </div>
      </Reveal>

      <div className="mt-12">
        <TwoColList>
          <div>
            <ColumnLabel>Home Health</ColumnLabel>
            <ChipRow items={HOME_HEALTH} className="mb-0" />
          </div>
          <div>
            <ColumnLabel>Hospice</ColumnLabel>
            <ChipRow items={HOSPICE} className="mb-0" />
          </div>
        </TwoColList>
        <OutcomeTiles items={OUTCOMES} />
        <div className="mt-8">
          <GhostLink href="/ambient-ai-dictation/">
            Explore Ambient AI &amp; Dictation
          </GhostLink>
        </div>
      </div>
    </SectionWrap>
  );
}
