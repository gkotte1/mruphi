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

/* Every eyebrow, kicker, chip and panel label is set in Plus Jakarta Sans  - 
   the brand book's primary typeface (page 12), and the site's only family. */
export const metadata: Metadata = pageMetadata("/ambient-ai-dictation/", {
  title: "Ambient AI & Dictation - AI Scribe for Home Health",
  description:
    "Ambient AI clinical documentation and voice dictation for home health and hospice nurses. OASIS, HOPE, SN, PT, OT and ST notes drafted in minutes and synced to your EHR.",
});

export default function AmbientAiDictationPage() {
  return (
    <div>
      <JsonLd data={moduleSchema("/ambient-ai-dictation/")} />
      <JsonLd data={faqSchema(FAQS.ambientAi, "/ambient-ai-dictation/")} />
      <JsonLd data={breadcrumbSchema("/ambient-ai-dictation/", "Ambient AI & Dictation")} />

      <Navbar />

      {/* The navigation is position:fixed, so it occupies no space in flow.
          Without this offset the breadcrumb renders behind it and only clears
          the bar once the page scrolls. */}
      <main className="bg-white pt-[80px]">
        <Hero />
        <HowItWorks />
        <Capabilities />
        <BuiltFor />
        <WhereItApplies />
        <Outcomes />
        <EhrIntegration />
        <FaqSection items={FAQS.ambientAi} />

        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
