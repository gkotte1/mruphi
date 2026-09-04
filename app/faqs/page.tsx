import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/module-page/Reveal";
import { Breadcrumb, FinalCta } from "@/components/module-page/sections";
import { CONTAINER, Eyebrow, SECTION } from "@/components/module-page/ui";
import FaqExplorer from "@/components/faqs/FaqExplorer";
import { FAQ_CATEGORIES } from "@/lib/faqs";
import { JsonLd } from "@/components/JsonLd";
import { allFaqsSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata: Metadata = pageMetadata("/faqs/", {
  title: "Home Health & Hospice AI FAQs",
  description:
    "Answers to the questions home health and hospice teams ask about AI documentation, OASIS review, EHR integration, HIPAA compliance and Murphi.ai pricing.",
});

/**
 * /faqs/ — the site's whole FAQ set on one page.
 *
 * The questions and answers are the same records the individual pages render,
 * read straight from lib/faqs.ts; nothing here restates or edits them. The
 * presentation follows the source pages' FAQ band: kicker, "Frequently Asked
 * Questions", and the same accordion in a 820px column.
 *
 * Grouping is the one thing this page adds — the source pages carry a flat
 * list because each is already scoped to its own topic. Each category here is
 * exactly one of those lists, under the name the site already gives it.
 */
export default function FaqsPage() {
  return (
    <div>
      <JsonLd data={allFaqsSchema("/faqs/")} />

      <Navbar />

      {/* The navigation is position:fixed, so it occupies no space in flow.
          Without this offset the breadcrumb renders behind it and only clears
          the bar once the page scrolls. */}
      <main className="bg-white pt-[80px]">
        <Breadcrumb current="FAQs" />

        <section className="bg-grey-bg pt-7 pb-16 max-720:pt-6 max-720:pb-10">
          <div className={CONTAINER}>
            <Reveal>
              <Eyebrow>FAQs</Eyebrow>

              <h1 className="mt-4 max-w-[16ch] type-h1 text-ink">
                Frequently Asked Questions
              </h1>
            </Reveal>
          </div>
        </section>

        <section className={cn("border-t border-grey-mid", SECTION)}>
          <div className={CONTAINER}>
            <FaqExplorer categories={FAQ_CATEGORIES} />
          </div>
        </section>

        <FinalCta
          heading="Experience AI Automation at Scale"
          body="Tell us your care setting and we'll show you exactly what Murphi.ai delivers for your organization — a live demo tailored to your workflows and your team."
        />
      </main>

      <Footer />
    </div>
  );
}
