import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = pageMetadata("/privacy-policy/", {
  title: "Privacy Policy | HIPAA-Compliant Data Protection",
  description:
    "Murphi.ai's privacy policy explains how we collect, store, and protect your data in compliance with HIPAA, GDPR, and other applicable data protection regulations.",
});

export default function PrivacyPolicyPage() {
  return <LegalPage file="privacy-policy.md" />;
}
