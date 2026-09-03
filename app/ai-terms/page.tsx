import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = pageMetadata("/ai-terms/", {
  title: "AI Terms Of Use | Artificial Intelligence Policy",
  description:
    "Review Murphi.ai's AI-specific terms of use governing the use of artificial intelligence features, data processing, and automated outputs within the platform.",
});

export default function AiTermsPage() {
  return <LegalPage file="ai-terms.md" />;
}
