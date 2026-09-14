import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqExplorer from "@/components/faqs/FaqExplorer";
import { FAQ_CATEGORIES } from "@/lib/faqs";
import { JsonLd } from "@/components/JsonLd";
import { allFaqsSchema, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";
import { SimpleHero } from "@/components/inner-page/Hero";
import { FinalCta } from "@/components/inner-page/kit";
import { InnerPage, IpWrap } from "@/components/inner-page/Shell";

export const metadata: Metadata = pageMetadata("/faqs/", {
  title: "Home Health & Hospice AI FAQs",
  description:
    "Answers to the questions home health and hospice teams ask about AI documentation, OASIS review, EHR integration, HIPAA compliance and Murphi.ai pricing.",
});

/**
 * /faqs/ - the site's whole FAQ set on one page.
 *
 * The questions and answers are the same records the individual pages render,
 * read straight from lib/faqs.ts; nothing here restates or edits them. The
 * presentation follows the source pages' FAQ band: kicker, "Frequently Asked
 * Questions", and the same accordion in a 820px column.
 *
 * Grouping is the one thing this page adds - the source pages carry a flat
 * list because each is already scoped to its own topic. Each category here is
 * exactly one of those lists, under the name the site already gives it.
 */
export default function FaqsPage() {
  return (
    <InnerPage>
      <JsonLd data={webPageSchema("/faqs/")} />
      <JsonLd data={breadcrumbSchema("/faqs/", "FAQs")} />
      <JsonLd data={allFaqsSchema("/faqs/")} />

      <Navbar />

      <main>
        <SimpleHero
          current="FAQs"
          eyebrow="FAQs"
          title="Frequently Asked Questions"
        />

        <section style={{ padding: "64px 0 96px" }}>
          <IpWrap>
            <FaqExplorer categories={FAQ_CATEGORIES} />
          </IpWrap>
        </section>

        <FinalCta
          heading="Experience AI Automation at Scale"
          body="Tell us your care setting and we'll show you exactly what Murphi.ai delivers for your organization - a live demo tailored to your workflows and your team."
        />
      </main>

      <Footer />
    </InnerPage>
  );
}
