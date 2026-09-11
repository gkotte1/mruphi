import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import BrandLegalPage from "@/components/legal/BrandLegalPage";
import { getLegalPage } from "@/lib/legal";

const page = getLegalPage("terms-of-service");

export const metadata: Metadata = {
  ...pageMetadata("/terms-of-service/", {
    title: page.title,
    description: page.description,
  }),
  title: { absolute: page.title },
};

export default function TermsOfServicePage() {
  return <BrandLegalPage slug="terms-of-service" />;
}
