import Link from "next/link";
import { Icon } from "@/components/icons";

/**
 * The "Get Started" closing panel, built to the spec in
 * murphi-project-assets/graphics/patterns.md §3: 40px radius, the documented
 * blue, the wide blue-tinted shadow, and the 64px mesh masked inward.
 *
 * Shared by the pages that close on this call to action, so the heading, body
 * and button stay identical between them.
 */
export default function GetStartedCta() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-24 max-1024:py-20 max-600:py-14">
      <div className="mx-auto w-full max-w-[1280px] px-10 max-1200:px-8 max-600:px-4">
        <div
          className="relative overflow-hidden rounded-cta px-16 py-[84px] text-center shadow-[0_44px_90px_-42px_rgba(0,86,173,0.62)] max-1024:px-10 max-1024:py-16 max-600:rounded-[24px] max-600:px-6 max-600:py-14"
          style={{
            background: "#007EFF",
          }}
        >

          <div className="relative mx-auto max-w-[680px]">
            <h2 className="type-display text-grey-bg">
              Experience AI Automation
              <br />
              at Scale
            </h2>

            <p className="mx-auto mt-6 max-w-[560px] text-[16.5px] font-medium leading-relaxed text-white/80 max-600:text-[15.5px]">
              {"Tell us your care setting and we'll show you exactly what"}{" "}
              Murphi.ai delivers for your organization - a live demo tailored to
              your workflows and your team.
            </p>

            <Link
              href="/contact-us/"
              className="group mt-10 btn-on-blue max-600:mt-8 max-600:w-full max-600:justify-center"
            >
              Request Demo
              <Icon
                name="arrow"
                width={17}
                height={17}
                className="transition-transform duration-200 group-hover:translate-x-[3px]"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

