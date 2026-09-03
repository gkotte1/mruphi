import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = pageMetadata("/terms-of-service/", {
  title: "Terms Of Service | Platform Usage Agreement",
  description:
    "Read Murphi.ai's Terms of Service outlining the usage rights, restrictions, and legal agreements for accessing our AI healthcare platform and services.",
});

export default function TermsOfServicePage() {
  return <LegalPage file="terms-of-service.md" />;
}
