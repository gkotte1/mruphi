import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqSection from "@/components/module-page/FaqSection";
import { FAQS } from "@/lib/faqs";
import { pageMetadata } from "@/lib/site";
import Hero from "@/components/ambient-ai-dictation/Hero";
import HowItWorks from "@/components/ambient-ai-dictation/HowItWorks";
import {
  BuiltFor,
  Capabilities,
  MoreFromMurphi,
} from "@/components/ambient-ai-dictation/CardGrids";
import {
  EhrIntegration,
  FinalCta,
  Outcomes,
  QuoteSpotlight,
  WhereItApplies,
} from "@/components/ambient-ai-dictation/Sections";

/* Every eyebrow, kicker, chip and panel label is set in Plus Jakarta Sans —
   the brand book's primary typeface (page 12), and the site's only family. */
export const metadata: Metadata = pageMetadata("/ambient-ai-dictation/", {
  title: "Ambient AI & Dictation",
  description:
    "Murphi's Ambient AI listens during assessments or converts clinician dictation into structured Home Health and Hospice documentation — with multi-language, medications, wound care and M1800/GG capture, synced to your EHR the same day.",
});

export default function AmbientAiDictationPage() {
  return (
    <div>
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
        <QuoteSpotlight />
        <Outcomes />
        <EhrIntegration />
        <MoreFromMurphi />
        <FaqSection items={FAQS.ambientAi} />

        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
