import FAQs from "@/components/ui/faqs-component";
import type { FaqItem } from "@/lib/faqs";
import { cn } from "@/lib/cn";
import { CONTAINER, SECTION } from "@/components/module-page/ui";

export default function FaqSection({
  items,
  divider = "full",
}: {
  items: readonly FaqItem[];
  divider?: "full" | "container";
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
