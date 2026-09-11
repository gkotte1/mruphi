import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IntegrationHero from "@/components/integration/IntegrationHero";
import IntegrationMethods from "@/components/integration/IntegrationMethods";
import EhrCapability from "@/components/integration/EhrCapability";
import PaymentIntegration from "@/components/integration/PaymentIntegration";
import SecuritySection from "@/components/integration/SecuritySection";
import { FinalCta } from "@/components/inner-page/kit";
import { InnerPage } from "@/components/inner-page/Shell";

export const metadata: Metadata = pageMetadata("/integrations/", {
  title: "EHR Integrations - FHIR, HL7, API & Agentic AI",
  description:
    "Five home health EHR AI integration methods - Agentic AI, RPA, FHIR R4, HL7 v2 and Direct API. No EHR replacement required. Live in days.",
});

export default function IntegrationPage() {
  return (
    <InnerPage>
      <Navbar />
      <main>
        <IntegrationHero />
        <IntegrationMethods />
        <EhrCapability />
        <PaymentIntegration />
        <SecuritySection />
        <FinalCta
          heading={
            <>
              Experience AI Automation
              <br />
              at Scale
            </>
          }
          body="Tell us your care setting and we'll show you exactly what Murphi.ai delivers for your organization - a live demo tailored to your workflows and your team."
        />
      </main>
      <Footer />
    </InnerPage>
  );
}
