import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IntegrationHero from "@/components/integration/IntegrationHero";
import IntegrationMethods from "@/components/integration/IntegrationMethods";
import EhrCapability from "@/components/integration/EhrCapability";
import PaymentIntegration from "@/components/integration/PaymentIntegration";
import SecuritySection from "@/components/integration/SecuritySection";
import GetStartedCta from "@/components/GetStartedCta";

export const metadata: Metadata = pageMetadata("/integrations/", {
  title: "EHR Integrations — FHIR, HL7, API & Agentic AI",
  description:
    "Five home health EHR AI integration methods — Agentic AI, RPA, FHIR R4, HL7 v2 and Direct API. No EHR replacement required. Live in days.",
});

export default function IntegrationPage() {
  return (
    <>
      <Navbar />
      <main>
        <IntegrationHero />
        <IntegrationMethods />
        <EhrCapability />
        <PaymentIntegration />
        <SecuritySection />
        <GetStartedCta />
      </main>
      <Footer />
    </>
  );
}
