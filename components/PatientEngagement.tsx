import Reveal from "@/components/module-page/Reveal";
import {
  Accent,
  AppBody,
  ChipRow,
  DeviceCard,
  DeviceConnector,
  Eyebrow,
  FetchNote,
  GhostLink,
  Lede,
  ModuleHeading,
  OutcomeTiles,
  SectionWrap,
  SmsBody,
} from "@/components/home/kit";

const CHANNELS = [
  "Two-way SMS",
  "Reminders",
  "Print · Scan · Fax",
  "Document Signature",
];

const OUTCOMES = [
  "Fewer phone calls",
  "Faster responses",
  "Complete communication history",
];

const THREAD = [
  {
    side: "in" as const,
    text: "Reminder: SN visit tomorrow 9:00 AM. Reply C to confirm.",
  },
  { side: "out" as const, text: "C" },
  { side: "in" as const, text: "Great - any symptoms to flag before the visit?" },
  { side: "out" as const, text: "Slight swelling in left leg today." },
  {
    side: "in" as const,
    text: "Thanks - noted for the nurse before she arrives.",
  },
];

export default function PatientEngagement() {
  return (
    <SectionWrap id="engage">
      <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-start gap-16 max-1080:grid-cols-1 max-1080:gap-10">
        <Reveal>
          <Eyebrow>Patient Engagement</Eyebrow>
          <ModuleHeading id="engagement-heading">
            Connect your office, clinicians,{" "}
            <Accent>patients and caregivers</Accent>.
          </ModuleHeading>
          <Lede>
            HIPAA-compliant messaging and AI-driven patient engagement. Your
            staff use the Murphi app - patients and caregivers keep using
            ordinary text messages.
          </Lede>
          <ChipRow items={CHANNELS} />
          <GhostLink href="/patient-engagement/">
            Explore Patient Engagement
          </GhostLink>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-2 items-start gap-5 max-720:grid-cols-1">
            <DeviceCard head="Murphi.ai · Office" app>
              <AppBody
                initials="EJ"
                name="Eleanor James"
                sub="Hospice · Caregiver: Daughter"
                message="Reminder: SN visit tomorrow 9:00 AM. Reply C to confirm."
              />
            </DeviceCard>
            <div className="max-720:hidden">
              <DeviceCard head="Patient's Phone · Messages">
                <SmsBody thread={THREAD} />
              </DeviceCard>
            </div>
          </div>
          <div className="hidden max-720:mt-4 max-720:block">
            <DeviceConnector label="Murphi → SMS → Murphi" />
            <DeviceCard head="Patient's Phone · Messages">
              <SmsBody thread={THREAD} />
            </DeviceCard>
          </div>
        </Reveal>
      </div>

      <div className="mt-12">
        <OutcomeTiles items={OUTCOMES} />
        <FetchNote>
          Conversation → patient chart → EHR. Where appropriate, the exchange is
          stored directly in the patient record.
        </FetchNote>
      </div>
    </SectionWrap>
  );
}
