import FAQs from "@/components/ui/faqs-component";
import type { FaqItem } from "@/lib/faqs";
import { cn } from "@/lib/cn";
import { CONTAINER, SECTION } from "@/components/module-page/ui";

/**
 * The FAQ band. The questions themselves are rendered by the shared FAQs
 * component; this wraps them in the page's section rhythm.
 *
 * `divider` picks how the band is separated from the section above it:
 * "full" is the full-bleed hairline and stays the default; "container" carries
 * the same hairline with the band on white and its own wider column; "none"
 * leaves the band unruled, which is what the section rhythm calls for wherever
 * the FAQ follows a coloured band - the band's own edge already separates it,
 * so a hairline directly under it would be a second, redundant seam.
 */
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
