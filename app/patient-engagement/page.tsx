import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqSection from "@/components/module-page/FaqSection";
import { FAQS } from "@/lib/faqs";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  moduleSchema,
} from "@/lib/schema";
import { pageMetadata } from "@/lib/site";
import InnerHero from "@/components/inner-page/Hero";
import { FinalCta } from "@/components/inner-page/kit";
import { InnerPage, IpEyebrow, IpHead, IpWrap } from "@/components/inner-page/Shell";
import ConversationStack from "@/components/patient-engagement/HeroVisual";
import {
  BeforeAfter,
  EhrIntegration,
  InsideLedger,
  MessageFlow,
  Outcomes,
  WhySplit,
} from "@/components/patient-engagement/Sections";

export const metadata: Metadata = pageMetadata("/patient-engagement/", {
  title: "Patient Engagement - HIPAA-Compliant SMS Platform",
  description:
    "HIPAA-compliant texting and patient engagement for home health and hospice. Secure staff messaging, visit confirmation automation and document signature - no app for patients.",
});

const INSIDE = [
  {
    title: "Two-Way SMS",
    body: "Patients and caregivers reply from their own phone, the way they already text.",
  },
  {
    title: "Secure Staff App",
    body: "HIPAA-compliant messaging for your team, on the device they already carry.",
  },
  {
    title: "No App for Patients",
    body: "Nobody downloads anything or resets a portal password to reply to a text.",
  },
  {
    title: "Group & Broadcast Messaging",
    body: "Reach a whole caseload, or a whole family thread, in one send.",
  },
  {
    title: "Visit Confirmation Automation",
    body: "Confirmations go out on their own, before a missed visit becomes a phone call.",
  },
  {
    title: "Rich Media",
    body: "Photos, PDFs and documents shared inside the same secure thread.",
  },
  {
    title: "Document Signature",
    body: "Consent forms and paperwork signed in the same conversation, no separate trip.",
  },
  {
    title: "Print · Scan · Fax",
    body: "Legacy channels still supported for the documents that arrive that way.",
  },
  {
    title: "Communication History",
    body: "Every message - sent, delivered, replied - kept in one auditable record.",
  },
  {
    title: "Admin Visibility",
    body: "See what was read, what wasn't, and how fast staff responded.",
  },
];

const WHY = [
  "Staff use the Murphi app; patients and caregivers keep texting the way they already do - nobody falls back to an unsecured personal phone",
  "Broadcast and group messaging reach a whole caseload or a whole family thread in one send, not one call at a time",
  "Every message lives in one auditable thread instead of scattered notes and someone's memory",
  "Visit confirmations go out automatically, before the missed-visit call ever has to happen",
  "Admin visibility turns communication from a guess into something you can see - what was read, and how fast staff responded",
];

const TRANSFORM = [
  {
    label: "Staff Communication",
    from: "Personal Phone Calls",
    to: "Murphi App, Secure",
  },
  {
    label: "Patient & Family Reach",
    from: "Missed Calls, Mailed Letters",
    to: "Text Message, No App",
  },
  {
    label: "Communication Record",
    from: "Scattered Notes",
    to: "One Auditable Thread",
  },
  {
    label: "Proof It's Working",
    from: "Guesswork",
    to: "Read Receipts & History",
  },
];

const STEPS = [
  { num: "01", title: "Agency Sends", body: "Message sent from the Murphi app" },
  {
    num: "02",
    title: "Patient Receives SMS",
    body: "Arrives as a normal text message",
  },
  { num: "03", title: "Patient Replies", body: "Reply sent from their own phone" },
  { num: "04", title: "Appears in Murphi", body: "Reply routes back to staff" },
  {
    num: "05",
    title: "Recorded",
    body: "Timestamped in the communication history",
  },
];

const OUTCOMES = [
  { title: "Fewer Phone Calls", sub: "Reminders sent automatically", icon: "clock" as const },
  {
    title: "Faster Responses",
    sub: "Patients reply from their own phone",
    icon: "tick" as const,
  },
  {
    title: "Communication Visibility",
    sub: "Read receipts & response tracking",
    icon: "shield" as const,
  },
  { title: "Complete History", sub: "Every exchange kept together", icon: "layers" as const },
  { title: "One Place", sub: "For all agency communications", icon: "info" as const },
  {
    title: "Fewer Missed Visits",
    sub: "Automated reminders, confirmed replies",
    icon: "bolt" as const,
  },
];

export default function PatientEngagementPage() {
  return (
    <InnerPage>
      <JsonLd data={moduleSchema("/patient-engagement/")} />
      <JsonLd data={faqSchema(FAQS.patientEngagement, "/patient-engagement/")} />
      <JsonLd data={breadcrumbSchema("/patient-engagement/", "Patient Engagement")} />

      <Navbar />

      <main>
        <InnerHero
          current="Patient Engagement"
          eyebrow="Patient Engagement"
          title="One Platform for Every Conversation."
          storyTag="Wednesday, 2:15 PM"
          story="The front desk phone rings. It's Ana, calling to confirm her mother's PT visit - same as she did Monday, and again. Nobody wrote down that she already asked."
          lede="Staff message from a secure Murphi app. Patients and caregivers keep texting the way they already do - no download, no portal password. Every exchange, translated, logged and visible in one place."
          trust={["HIPAA Compliant", "SOC 2", "No App Required for Patients"]}
          visual={
            <ConversationStack
              app={{
                head: "Murphi Staff App",
                initials: "AA",
                name: "Ana A. - Caregiver for Rosa",
                sub: "Care Coordinator thread",
                message:
                  "\"Reminder: Rosa's PT visit is tomorrow at 10 AM. Reply YES to confirm.\"",
              }}
              connectorLabel="Ordinary SMS, both directions"
              sms={{
                head: "Ana's Phone · Messages",
                incoming:
                  "Reminder: Rosa's PT visit is tomorrow at 10 AM. Reply YES to confirm.",
                outgoing: "YES, thank you!",
              }}
            />
          }
        />

        <section id="inside" className="ip-section">
          <IpWrap>
            <IpHead>
              <IpEyebrow>What{"'"}s Inside</IpEyebrow>
              <h2 className="ip-h2 ip-serif" style={{ marginTop: 16, marginBottom: 18 }}>
                One communication layer for staff, patients and families.
              </h2>
            </IpHead>
            <InsideLedger items={INSIDE} />
          </IpWrap>
        </section>

        <section className="ip-section ip-band">
          <IpWrap>
            <IpHead>
              <IpEyebrow>Why This Matters</IpEyebrow>
              <h2 className="ip-h2 ip-serif" style={{ marginTop: 16, marginBottom: 18 }}>
                Communication is the layer everything else runs on.
              </h2>
            </IpHead>
            <WhySplit
              lede="In home-based care, the team is never in one building. A missed message is a missed visit, a missed signature, or a caregiver left guessing."
              items={WHY}
            />
          </IpWrap>
        </section>

        <section className="ip-section">
          <IpWrap>
            <IpHead>
              <IpEyebrow>Before & After</IpEyebrow>
              <h2 className="ip-h2 ip-serif" style={{ marginTop: 16, marginBottom: 18 }}>
                The same conversations, rebuilt.
              </h2>
            </IpHead>
            <BeforeAfter rows={TRANSFORM} />
          </IpWrap>
        </section>

        <section id="how" className="ip-section">
          <IpWrap>
            <IpHead>
              <IpEyebrow>The Mechanics</IpEyebrow>
              <h2 className="ip-h2 ip-serif" style={{ marginTop: 16, marginBottom: 18 }}>
                From message sent to conversation recorded.
              </h2>
            </IpHead>
            <MessageFlow steps={STEPS} />
          </IpWrap>
        </section>

        <Outcomes heading="What agencies get back." outcomes={OUTCOMES} />

        <EhrIntegration />

        <div className="ip-faq ip-band">
          <FaqSection items={FAQS.patientEngagement} divider="none" />
        </div>

        <FinalCta
          heading="Let Ana Text Instead of Call."
          body="See staff, patient and family messaging working as one layer, on your workflows."
        />
      </main>

      <Footer />
    </InnerPage>
  );
}
