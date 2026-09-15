import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgenciesPageView from "@/components/agencies/AgenciesPageView";
import { JsonLd } from "@/components/JsonLd";
import { FAQS } from "@/lib/faqs";
import {
  breadcrumbSchema,
  faqSchema,
  webPageSchema,
} from "@/lib/schema";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/agencies/", {
  title: "Home Health & Hospice Agencies - AI Platform",
  description:
    "A home health and hospice AI platform that sits alongside the EHR your agency already runs on - one module, or six. No replacement, no rip-and-replace project.",
});

export default function AgenciesPage() {
  return (
    <>
      <JsonLd data={webPageSchema("/agencies/")} />
      <JsonLd data={faqSchema(FAQS.agencies, "/agencies/")} />
      <JsonLd
        data={breadcrumbSchema(
          "/agencies/",
          "Home Health & Hospice Agencies",
        )}
      />

      <Navbar />
      <main>
        <AgenciesPageView />
      </main>
      <Footer />
    </>
  );
}
