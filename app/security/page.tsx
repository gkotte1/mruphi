import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SecurityPage from "@/components/security/SecurityPage";
import { InnerPage } from "@/components/inner-page/Shell";

export const metadata: Metadata = pageMetadata("/security/", {
  title: "HIPAA-Compliant AI Security & Compliance",
  description:
    "Murphi.ai maintains enterprise-grade security with HIPAA compliance, SOC 2 certification, end-to-end encryption, and role-based access control to protect patient data.",
});

export default function Page() {
  return (
    <InnerPage>
      <Navbar />
      <SecurityPage />
      <Footer />
    </InnerPage>
  );
}
