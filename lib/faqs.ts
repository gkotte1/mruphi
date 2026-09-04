export type FaqItem = { q: string; a: string };

/**
 * Every FAQ on the site, lifted verbatim from the source pages in
 * "Murphi.ai Website with FAQs". Each page shows its list under the kicker
 * "FAQs" and the heading "Frequently Asked Questions", in a 820px column,
 * with the first question open - exactly as the source renders it.
 *
 * Questions, answers and their order are the source strings. Nothing here is
 * written, reworded or reordered.
 */
export const FAQS = {
  /* index.html - 6 questions */
  home: [
    {
      q: "What is Murphi.ai?",
      a: "Murphi.ai is an AI platform built for Home Health and Hospice agencies - covering documentation, revenue assurance, patient engagement, patient payments, and, launching soon, referral intake and RCM - connected to the EHR you already use.",
    },
    {
      q: "Do I need to replace my EHR to use Murphi?",
      a: "No. Murphi connects to your existing EHR: it fetches data, automates the workflow, and writes results back - you don't have to rip and replace anything.",
    },
    {
      q: "Which modules are available today?",
      a: "Ambient AI & Dictation, Revenue Assurance, Patient Engagement and Patient Payments are live. Referral → NOA and AI-Driven RCM are launching soon.",
    },
    {
      q: "Is Murphi secure and compliant?",
      a: "Yes. Murphi is built around HIPAA, SOC 2, ISO 27001 and BAA requirements, with human review required before any AI output enters the EHR record.",
    },
    {
      q: "Who is Murphi built for?",
      a: "Home Health and Hospice agencies, the EHR platforms they run on, coding/billing/RCM consulting companies, and accreditation bodies.",
    },
    {
      q: "How do I get started?",
      a: "Request a demo. Most organizations start with a single module and expand from there, on the same platform.",
    },
  ] satisfies FaqItem[],

  /* ambient-ai.html - 6 questions */
  ambientAi: [
    {
      q: "Does Murphi listen automatically, or do I have to dictate?",
      a: "Both. Murphi can listen ambiently during the visit, or a clinician can dictate afterward - whichever fits the encounter.",
    },
    {
      q: "Which note types can Murphi complete?",
      a: "OASIS, HOPE, SN, PT, OT and ST notes, along with other Home Health and Hospice discipline-specific documentation.",
    },
    {
      q: "Does a clinician have to review the note before it's saved?",
      a: "Yes. Every note requires clinician review and sign-off before it's written back to the EHR - nothing auto-signs.",
    },
    {
      q: "Can Murphi follow a visit with more than one person talking?",
      a: "Yes. It's built to follow a conversation with multiple voices in the room - patient, caregiver and clinician - and keep track of what was said.",
    },
    {
      q: "Can I add medications or wound documentation by voice?",
      a: "Yes. Medications can be added or updated by voice or by photographing the label, and wounds can be photographed and described by voice.",
    },
    {
      q: "Does this work with the EHR I already use?",
      a: "Yes. Murphi fetches the patient record and writes the completed, reviewed note back to your existing EHR.",
    },
  ] satisfies FaqItem[],

  /* revenue-assurance.html - 5 questions */
  revenueAssurance: [
    {
      q: "What does Revenue Assurance actually check?",
      a: "Coding (L1–L3), OASIS consistency, Face-to-Face and POC compliance, PDGM/HHRG opportunities, and Additional Documentation Review readiness.",
    },
    {
      q: "When does the review happen?",
      a: "The same day the chart is written - not weeks later, after the claim has already been submitted.",
    },
    {
      q: "Does Murphi make coding decisions or submit claims on its own?",
      a: "No. Murphi surfaces findings; a reviewer on your team resolves each one before anything moves forward or gets submitted.",
    },
    {
      q: "Does this work for both Home Health and Hospice charts?",
      a: "Yes - the review checks are tailored to each program's documentation and compliance requirements.",
    },
    {
      q: "Can it help if my agency receives an ADR request?",
      a: "Yes. Murphi organizes the relevant record set for the ADR response ahead of time, so your team isn't starting from scratch.",
    },
  ] satisfies FaqItem[],

  /* patient-engagement.html - 5 questions */
  patientEngagement: [
    {
      q: "Do patients need to download an app to text with my agency?",
      a: "No. Staff use the secure Murphi app; patients and caregivers reply from their phone's normal texting app - nothing to install.",
    },
    {
      q: "Is texting with patients actually HIPAA-compliant this way?",
      a: "Yes. Messaging runs through Murphi's secure layer, with a full communication history kept for every exchange.",
    },
    {
      q: "Can I message a whole caseload or a family group at once?",
      a: "Yes - group and broadcast messaging are supported, so a reminder can go out to many recipients in one send.",
    },
    {
      q: "Can documents be signed inside the same conversation?",
      a: "Yes. Document signature is supported directly in the thread, without a separate trip or a mailed form.",
    },
    {
      q: "Does this sync back to my EHR?",
      a: "Yes. Communication history and signed documents can sync back to the patient record.",
    },
  ] satisfies FaqItem[],

  /* patient-payments.html - 5 questions */
  patientPayments: [
    {
      q: "How does a patient actually pay their balance?",
      a: "They receive a text with a secure payment link and can pay by ACH, debit or credit card, right from their phone.",
    },
    {
      q: "Does Murphi hold the funds?",
      a: "No. Murphi facilitates the payment experience and reconciliation - it does not hold provider funds.",
    },
    {
      q: "Does the ledger update on its own once a patient pays?",
      a: "Yes. Payment status updates from Outstanding to Paid and reconciles against the ledger automatically.",
    },
    {
      q: "What if a patient doesn't respond to the text?",
      a: "The balance and outreach history stay visible in the system, so staff can follow up as needed.",
    },
    {
      q: "Is this connected to the EHR?",
      a: "Yes. Balances are identified from the EHR, and reconciled payment status is written back to the ledger.",
    },
  ] satisfies FaqItem[],

  /* referral-noa.html - 5 questions */
  referralToNoa: [
    {
      q: "Is Referral → NOA available now?",
      a: "Not yet - it's in active development. This page reflects the planned workflow, and capabilities may change before general availability.",
    },
    {
      q: "What referral sources will it accept?",
      a: "Fax, email, portal, API and EHR referrals - all landing in one AI intake dashboard once launched.",
    },
    {
      q: "Will it replace my intake staff?",
      a: "No. It's designed to reduce manual re-keying and run the compliance checks together; intake staff still make the accept, pending or decline decision.",
    },
    {
      q: "Why is it called NOA if my agency also does Hospice?",
      a: "NOA (Notice of Admission) is Home Health terminology. Hospice referral and intake will use separate, appropriate terminology - the two are never combined.",
    },
    {
      q: "How do I get early access?",
      a: "Join the early access list from this page to be notified as it becomes available.",
    },
  ] satisfies FaqItem[],

  /* ai-rcm.html - 5 questions */
  aiDrivenRcm: [
    {
      q: "Is AI-Driven RCM available now?",
      a: "Not yet - it's in active development. This page reflects the planned workflow, and capabilities may change before general availability.",
    },
    {
      q: "What does it actually track?",
      a: "Eligibility, authorization, documentation, coding, claim readiness, the claim itself, ERA/EOB, payment and reconciliation - end to end.",
    },
    {
      q: "Does it submit claims automatically?",
      a: "No. It surfaces issues and assists with resolution; claim submission decisions stay with your team.",
    },
    {
      q: "Will it write appeals for me?",
      a: "It's designed to assist with appeal generation, with your team reviewing before anything is submitted.",
    },
    {
      q: "How do I get early access?",
      a: "Join the early access list on this page to be notified as it becomes available.",
    },
  ] satisfies FaqItem[],

  /* agencies.html - 5 questions */
  agencies: [
    {
      q: "Do I need to replace my EHR to use Murphi?",
      a: "No. Murphi connects to the EHR you already use - it fetches data, automates the workflow, and writes results back.",
    },
    {
      q: "Can I start with just one module?",
      a: "Yes. Most agencies start with one module - often Ambient AI or Revenue Assurance - and add more once it's working.",
    },
    {
      q: "Does Murphi work for both Home Health and Hospice?",
      a: "Yes, with terminology and workflows specific to each program - OASIS and PDGM for Home Health, HOPE and IDG documentation for Hospice.",
    },
    {
      q: "Who at my agency would actually use this?",
      a: "Owners and administrators, clinicians, clinical/QA staff, coders and billers, and intake staff each get relevant capabilities.",
    },
    {
      q: "Is Murphi secure enough for a Home Health or Hospice agency?",
      a: "Yes - Murphi is built around HIPAA, SOC 2, ISO 27001 and BAA requirements, with human review before any AI output enters the EHR record.",
    },
  ] satisfies FaqItem[],

  /* consultants.html - 5 questions */
  codingBillingRcm: [
    {
      q: "Can I use Murphi across multiple client agencies?",
      a: "Yes - that's the core use case. One platform, many clients, with each client's data kept separated on the platform.",
    },
    {
      q: "What's the difference between Managed Services and Self-Service?",
      a: "In Managed Services, you run the reports for your clients yourself. In Self-Service, each client works in their own Murphi workspace, with you providing oversight.",
    },
    {
      q: "Can I white-label this for my own practice?",
      a: "Yes - a white-label option is available, so your clients see your brand while Murphi's AI powers it in the background.",
    },
    {
      q: "What reports are actually included?",
      a: "15 Home Health reports (Face-to-Face documentation, OASIS accuracy, coding review, ADR preparation, PDGM optimization, recertification validation) and 13 Hospice reports (CTI Validator, HOPE assessment review, IDG documentation, End-of-Life Risk Band Analyzer and more).",
    },
    {
      q: "How accurate is the AI?",
      a: "90–95% AI accuracy across reports, with a structured human review workflow before anything reaches a client.",
    },
  ] satisfies FaqItem[],

  /* ehr-companies.html - 5 questions */
  ehrCompanies: [
    {
      q: "Do we need to build our own AI infrastructure?",
      a: "No - that's the point of the platform. Murphi provides the orchestration, validation, security and observability layer so you don't have to build it in-house.",
    },
    {
      q: "Can this be white-labeled under our own brand?",
      a: "Yes. The platform can be deployed under your brand, inside your existing user experience - clinicians never see the Murphi name.",
    },
    {
      q: "How do we integrate - API, embedded components, or white-label?",
      a: "All three are supported. You can choose the approach that fits how your platform is built, or combine them.",
    },
    {
      q: "Is there human review before anything writes back to the EHR?",
      a: "Yes - human-in-the-loop review is required before any AI output enters the clinical record.",
    },
    {
      q: "Do we have to launch everything at once?",
      a: "No. The recommended approach is to start with one high-value workflow, validate it, and expand across the platform from there.",
    },
  ] satisfies FaqItem[],

  /* accreditation.html - 5 questions */
  accreditationBodies: [
    {
      q: "Does this work for both agencies and accreditation bodies?",
      a: "Yes - agencies use it to prepare for survey, and accreditation bodies use it to review evidence and assemble reports. It's the same platform, built for both sides.",
    },
    {
      q: "Which standards is it aligned to?",
      a: "AI compliance reports aligned to CHAP, ACHC and Joint Commission standards.",
    },
    {
      q: "Does the AI make the accreditation decision?",
      a: "No. Murphi surfaces evidence and potential findings; survey conclusions and accreditation decisions remain the responsibility of human surveyors.",
    },
    {
      q: "Can agencies pull their EHR data automatically for survey prep?",
      a: "Yes - records can be fetched directly from the EHR in minutes instead of pulled manually, evening before a survey.",
    },
    {
      q: "Is a white-label option available?",
      a: "Yes, for accreditation bodies or platforms that want to offer these tools under their own brand.",
    },
  ] satisfies FaqItem[],

} as const;

/**
 * The same 57 entries, grouped for the combined /faqs/ page.
 *
 * The categories are the modules and audiences the site already names - each
 * group is exactly the list that page carries, so nothing is re-sorted,
 * re-worded or repeated within a category. Two question texts appear under two
 * different categories ("Do I need to replace my EHR to use Murphi?" and "How
 * do I get early access?"); each carries its own distinct answer, so both are
 * kept rather than one being dropped.
 */
export const FAQ_CATEGORIES = [
  { label: "General", items: FAQS.home },
  { label: "Ambient AI & Dictation", items: FAQS.ambientAi },
  { label: "Revenue Assurance", items: FAQS.revenueAssurance },
  { label: "Patient Engagement", items: FAQS.patientEngagement },
  { label: "Patient Payments", items: FAQS.patientPayments },
  { label: "Referral → NOA", items: FAQS.referralToNoa },
  { label: "AI-Driven RCM", items: FAQS.aiDrivenRcm },
  { label: "Home Health & Hospice Agencies", items: FAQS.agencies },
  {
    label: "Coding, Billing, RCM & Consulting Companies",
    items: FAQS.codingBillingRcm,
  },
  { label: "Home Health & Hospice EHR Companies", items: FAQS.ehrCompanies },
  { label: "Accreditation Bodies", items: FAQS.accreditationBodies },
] as const;

export const FAQ_TOTAL = FAQ_CATEGORIES.reduce(
  (total, category) => total + category.items.length,
  0,
);
