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
import { AmbientPage } from "@/components/ambient-ai-dictation/Shell";
import Hero from "@/components/ambient-ai-dictation/Hero";
import HowItWorks from "@/components/ambient-ai-dictation/HowItWorks";
import {
  BuiltFor,
  Capabilities,
} from "@/components/ambient-ai-dictation/CardGrids";
import {
  EhrIntegration,
  FinalCta,
  Outcomes,
  WhereItApplies,
} from "@/components/ambient-ai-dictation/Sections";

export const metadata: Metadata = pageMetadata("/ambient-ai-dictation/", {
  title: "Ambient AI & Dictation - AI Scribe for Home Health",
  description:
    "Ambient AI clinical documentation and voice dictation for home health and hospice nurses. OASIS, HOPE, SN, PT, OT and ST notes drafted in minutes and synced to your EHR.",
});

export default function AmbientAiDictationPage() {
  return (
    <AmbientPage>
      <JsonLd data={moduleSchema("/ambient-ai-dictation/")} />
      <JsonLd data={faqSchema(FAQS.ambientAi, "/ambient-ai-dictation/")} />
      <JsonLd
        data={breadcrumbSchema(
          "/ambient-ai-dictation/",
          "Ambient AI & Dictation",
        )}
      />

      <Navbar />

      <main>
        <Hero />
        <HowItWorks />
        <Capabilities />
        <BuiltFor />
        <WhereItApplies />
        <Outcomes />
        <EhrIntegration />
        <div className="aa-faq aa-band">
          <FaqSection items={FAQS.ambientAi} divider="none" />
        </div>
        <FinalCta />
      </main>

      <Footer />
    </AmbientPage>
  );
}
