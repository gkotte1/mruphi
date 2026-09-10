import FAQs from "@/components/ui/faqs-component";
import type { FaqItem } from "@/lib/faqs";
import { cn } from "@/lib/cn";
import { CONTAINER, SECTION } from "@/components/module-page/ui";

<<<<<<< Updated upstream
=======
/**
 * The FAQ band, recreated from "Murphi.ai Website with FAQs".
 *
 * Every page carries the identical structure: a `.section` with a 1px top
 * border, the kicker "FAQs", the heading "Frequently Asked Questions", and the
 * accordion in a 820px column with the first question open. The accordion
 * itself is the site's existing one, which matches the source's `.accordion-*`
 * rules - 14px radius, 1px #E3E3E3 border, 12px gap, 18px/22px head padding,
 * 15px/700 #1A1A1A question, 13.5px/1.6 #606060 answer, chevron rotating 180° on
 * open, body sliding on max-height over 280ms, one open at a time.
 *
 * `divider` picks how the band is separated from the section above it:
 * "full" is the reference pages' full-bleed hairline and stays the default;
 * "container" draws the same hairline inset to the site container; "none"
 * leaves the band unruled, which is what the reference does wherever the FAQ
 * follows a coloured band - the band's own edge already separates it, so a
 * hairline directly under it would be a second, redundant seam.
 */
>>>>>>> Stashed changes
export default function FaqSection({
  items,
  divider = "full",
}: {
  items: readonly FaqItem[];
  divider?: "full" | "container" | "none";
}) {
  return (
    <section
      className={cn(
        divider === "full" && "border-t border-grey-mid",
        divider === "container"
          ? cn(SECTION, "border-t border-grey-mid bg-white")
          : SECTION,
      )}
    >
      <div
        className={cn(
          divider === "container"
            ? "mx-auto w-full max-w-[1280px] px-10 max-1200:px-8 max-600:px-4"
            : CONTAINER,
        )}
      >
        <FAQs items={items} />
      </div>
    </section>
  );
}
