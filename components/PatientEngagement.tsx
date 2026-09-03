import Reveal from "@/components/module-page/Reveal";
import {
  AppBody,
  ChipRow,
  DeviceCard,
  DeviceConnector,
  DeviceStack,
  Eyebrow,
  FetchNote,
  GhostLink,
  Lede,
  ModuleBlock,
  ModuleHeading,
  OutcomeList,
  SmsBody,
} from "@/components/home/kit";

/**
 * Module 3 — Patient Engagement, converted from `#engage` in
 * "01. HomePAge/Murphi.ai Home LandingPage.html".
 *
 * Copy left, the device stack right: the agency's app over the ordinary phone,
 * joined by the SMS hop, with a `.fetch-note` beneath. Every string is the
 * reference's own.
 */

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
  { side: "in" as const, text: "Great — any symptoms to flag before the visit?" },
  { side: "out" as const, text: "Slight swelling in left leg today." },
  {
    side: "in" as const,
    text: "Thanks — noted for the nurse before she arrives.",
  },
];

export default function PatientEngagement() {
  return (
    <ModuleBlock
      id="engage"
      copy={
        <Reveal>
          <Eyebrow>Patient Engagement</Eyebrow>

          <ModuleHeading id="engagement-heading">
            Connect your office, clinicians, patients and caregivers.
          </ModuleHeading>

          <Lede>
            HIPAA-compliant messaging and AI-driven patient engagement. Your
            staff use the Murphi app — patients and caregivers keep using
            ordinary text messages.
          </Lede>

          <ChipRow items={CHANNELS} />

          <OutcomeList items={OUTCOMES} />

          <GhostLink href="/patient-engagement/">
            Explore Patient Engagement
          </GhostLink>
        </Reveal>
      }
      visual={
        <Reveal>
          <DeviceStack>
            <DeviceCard head="Murphi.ai · Office" app>
              <AppBody
                initials="EJ"
                name="Eleanor James"
                sub="Hospice · Caregiver: Daughter"
                message="Reminder: SN visit tomorrow 9:00 AM. Reply C to confirm."
              />
            </DeviceCard>

            <DeviceConnector label="Murphi → SMS → Murphi" />

            <DeviceCard head="Patient's Phone · Messages">
              <SmsBody thread={THREAD} />
            </DeviceCard>
          </DeviceStack>

          <FetchNote>
            Conversation → patient chart → EHR. Where appropriate, the exchange
            is stored directly in the patient record.
          </FetchNote>
        </Reveal>
      }
    />
  );
}
