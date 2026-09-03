import { Accordion } from "@/components/module-page/interactive";
import Reveal from "@/components/module-page/Reveal";
import { CONTAINER, Kicker, SECTION, SectionHead } from "@/components/module-page/ui";
import type { FaqItem } from "@/lib/faqs";
import { cn } from "@/lib/cn";

/**
 * The FAQ band, recreated from "Murphi.ai Website with FAQs".
 *
 * Every page carries the identical structure: a `.section` with a 1px top
 * border, the kicker "FAQs", the heading "Frequently Asked Questions", and the
 * accordion in a 820px column with the first question open. The accordion
 * itself is the site's existing one, which matches the source's `.accordion-*`
 * rules — 14px radius, 1px #E3E3E3 border, 12px gap, 18px/22px head padding,
 * 15px/700 #1A1A1A question, 13.5px/1.6 #606060 answer, chevron rotating 180° on
 * open, body sliding on max-height over 280ms, one open at a time.
 *
 * `divider` picks how the band is separated from the section above it:
 * "full" is the reference pages' full-bleed hairline and stays the default;
 * "container" draws the same hairline inset to the site container, which is
 * what the homepage uses between Customer stories and FAQs.
 */
export default function FaqSection({
  items,
  divider = "full",
}: {
  items: readonly FaqItem[];
  divider?: "full" | "container";
}) {
  return (
    <>
      {divider === "container" ? (
        <div className="mx-auto w-full max-w-[1280px] px-10 max-1200:px-8 max-600:px-4">
          <div className="h-px bg-grey-mid" />
        </div>
      ) : null}

      <section
        className={cn(divider === "full" && "border-t border-grey-mid", SECTION)}
      >
      <div className={CONTAINER}>
        <Kicker>FAQs</Kicker>
        <SectionHead>Frequently Asked Questions</SectionHead>

        <Reveal>
          <div className="ml-[10%] max-w-[820px] max-1080:ml-0">
            <Accordion
              items={items.map((item) => ({
                title: item.q,
                body: (
                  <p className="text-[13.5px] leading-[1.6] text-grey-500">
                    {item.a}
                  </p>
                ),
              }))}
            />
          </div>
        </Reveal>
      </div>
      </section>
    </>
  );
}
