import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OurTeam from "@/components/OurTeam";
import GetStartedCta from "@/components/GetStartedCta";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/site";

/**
 * /about-us/ — the company page.
 *
 * Three sections, in order: About Murphi.ai, Why Murphi.ai, Headquartered in
 * North Carolina. Every string is the supplied copy, verbatim; the page adds
 * no claim, market or office of its own.
 *
 * The hero sits inside a thin #007EFF outline — the page's one use of the
 * brand colour at that scale. The two prose sections are set editorially, the
 * heading holding the left column while the copy runs at a comfortable measure
 * on the right, so the company story reads as a story rather than as boxes.
 */

export const metadata: Metadata = pageMetadata("/about-us/", {
  title: "About Murphi.ai — Home Health & Hospice AI",
  description:
    "Murphi.ai is a AI Native automation platform purpose built for U.S. healthcare, with AI modules purpose-built for Home Health and Hospice.",
});

const SHELL = "mx-auto w-full max-w-[1280px] px-10 max-1200:px-8 max-600:px-4";
const BAND = "py-24 max-1024:py-20 max-600:py-16";
const H2 = "type-h2 text-ink";

/** Heading left, copy right — the page's editorial rhythm. */
const EDITORIAL =
  "grid grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)] items-start gap-16 max-1024:grid-cols-1 max-1024:gap-6";

export default function AboutUsPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── 1 · About Murphi.ai ── */}
        <section aria-labelledby="about-heading" className="bg-white pt-[80px]">
          <div className={cn(SHELL, "py-16 max-600:py-10")}>
            {/* The page's one deliberate #007EFF outline. */}
            <div className="mx-auto max-w-[1000px] rounded-[32px] border border-brand bg-white px-14 py-16 text-center shadow-[0_30px_80px_-50px_rgba(0,126,255,0.45)] max-1024:px-10 max-600:rounded-[24px] max-600:px-6 max-600:py-10">
              <p className="type-label inline-flex items-center gap-2 rounded-full border border-brand-ghost bg-brand-tint px-3.5 py-1.5 text-brand-dark">
                <Icon name="home" width={13} height={13} />
                Company
              </p>

              <h1
                id="about-heading"
                className="mx-auto mt-7 max-w-[16ch] type-h1 text-ink"
              >
                About Murphi.ai
              </h1>

              <p className="type-lead mx-auto mt-7 max-w-[68ch] text-grey-dk">
                Murphi.ai is a AI Native automation platform purpose built for U.S.
                healthcare. It enables EHRs, RCM companies, coding and billing
                firms, and provider organizations to become full native AI powered
                platforms without redesigning their systems or depending on
                fragmented third party tools. Additionally, Murphi also offers SaaS
                modules such as Ambient AI, Revenue Assurance, Contract Analyzer,
                Patient Financials.
              </p>
            </div>
          </div>
        </section>

        {/* ── 2 · Why Murphi.ai ── */}
        <section
          aria-labelledby="why-heading"
          className={cn("border-t border-grey-mid bg-white", BAND)}
        >
          <div className={cn(SHELL, EDITORIAL)}>
            <div className="min-w-0">
              <span className="mb-5 block h-px w-12 bg-brand" aria-hidden />
              <h2 id="why-heading" className={H2}>
                Why Murphi.ai
              </h2>
            </div>

            <div className="grid min-w-0 max-w-[70ch] gap-6">
              <p className="type-lead text-grey-dk">
                Murphi.ai is purpose-built to automate critical workflows across
                Home Health and Hospice, including clinical documentation, coding,
                compliance reviews, intake workflows, eligibility checks,
                insurance extraction, patient responsible payments, and
                interoperability tasks.
              </p>

              <p className="type-lead text-grey-dk">
                Our white-label architecture lets partners launch AI features
                directly inside their own platforms, fully aligned with their UX,
                workflows, and data models. Each module is customizable for
                desktop, web, and mobile.
              </p>
            </div>
          </div>
        </section>

        {/* ── 3 · Headquartered in North Carolina ── */}
        <section
          aria-labelledby="hq-heading"
          className={cn("border-t border-grey-mid bg-white", BAND)}
        >
          <div className={cn(SHELL, EDITORIAL)}>
            <div className="min-w-0">
              <span className="mb-5 block h-px w-12 bg-brand" aria-hidden />
              <h2 id="hq-heading" className={H2}>
                Headquartered in North Carolina
              </h2>
            </div>

            <div className="grid min-w-0 max-w-[70ch] gap-6">
              <p className="type-lead text-grey-dk">
                Murphi.ai delivers enterprise-grade AI modules purpose-built for
                Home Health and Hospice, helping organizations automate
                documentation, revenue assurance, patient engagement, payments,
                referrals, compliance, and other critical workflows.
              </p>

              <p className="type-lead text-grey-dk">
                The platform is also expanding into Payers, MCOs, ACOs, and
                physician groups. Development center in Bangalore, India. Operated
                by Deskfactors Inc.
              </p>
            </div>
          </div>
        </section>

        {/* ── 4 · Our Team ── */}
        <OurTeam />

        {/* ── 5 · Get Started ── */}
        <GetStartedCta />
      </main>

      <Footer />
    </>
  );
}
