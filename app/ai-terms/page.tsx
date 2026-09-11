import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import BrandLegalPage from "@/components/legal/BrandLegalPage";
import { getLegalPage } from "@/lib/legal";

const page = getLegalPage("ai-terms");

export const metadata: Metadata = {
  ...pageMetadata("/ai-terms/", {
    title: page.title,
    description: page.description,
  }),
  title: { absolute: page.title },
};

export default function AiTermsPage() {
  return <BrandLegalPage slug="ai-terms" />;
}
