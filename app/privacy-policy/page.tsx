import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import BrandLegalPage from "@/components/legal/BrandLegalPage";
import { getLegalPage } from "@/lib/legal";

const page = getLegalPage("privacy-policy");

export const metadata: Metadata = {
  ...pageMetadata("/privacy-policy/", {
    title: page.title,
    description: page.description,
  }),
  title: { absolute: page.title },
};

export default function PrivacyPolicyPage() {
  return <BrandLegalPage slug="privacy-policy" />;
}
