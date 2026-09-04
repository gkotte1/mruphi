"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MONO } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * The FAQ explorer: categories on the left, questions on the right.
 *
 * Every question, answer, category and order comes from lib/faqs.ts - the same
 * records the individual pages render. Nothing here restates or edits them; the
 * page only changes how they are presented.
 *
 * The counts are derived from the data, so they can never drift. The left rail
 * tracks the section in view and scrolls to one when picked; below 900 it
 * becomes a horizontal strip above the content.
 */

export type FaqCategory = {
  readonly label: string;
  readonly items: readonly { readonly q: string; readonly a: string }[];
};

const slug = (label: string) =>
  `faq-${label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;

export default function FaqExplorer({
  categories,
}: {
  categories: readonly FaqCategory[];
}) {
  const sections = useMemo(
    () =>
      categories.map((category, i) => ({
        ...category,
        id: slug(category.label),
        number: String(i + 1).padStart(2, "0"),
      })),
    [categories],
  );

  const [active, setActive] = useState(sections[0]?.id ?? "");
  const railRef = useRef<HTMLDivElement>(null);

  /* Scrollspy: whichever section sits in the band just under the header. */
  useEffect(() => {
    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => node !== null);

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-112px 0px -68% 0px", threshold: 0 },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [sections]);

  /* Keep the active chip in view on the mobile strip. */
  useEffect(() => {
    const rail = railRef.current;
    if (!rail || window.innerWidth > 900) return;

    const chip = rail.querySelector<HTMLElement>(`[data-for="${active}"]`);
    chip?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [active]);

  const go = (id: string) => {
    const node = document.getElementById(id);
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = node.getBoundingClientRect().top + window.scrollY - 112;

    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    setActive(id);
  };

  return (
    <div className="grid grid-cols-[minmax(0,0.3fr)_minmax(0,1fr)] items-start gap-16 max-1080:gap-10 max-900:grid-cols-1 max-900:gap-8">
      {/* ── Categories ── */}
      <nav
        aria-label="FAQ categories"
        className="sticky top-[112px] min-w-0 max-900:static"
      >
        <p
          className={cn(
            MONO,
            "mb-4 text-[11px] uppercase tracking-[0.08em] text-grey-bdr max-900:mb-3",
          )}
        >
          Categories
        </p>

        {/* A ruled list on desktop; a scrollable strip once it stacks. */}
        <div
          ref={railRef}
          className="border-t border-grey-mid max-900:-mx-8 max-900:flex max-900:gap-2 max-900:overflow-x-auto max-900:border-t-0 max-900:px-8 max-900:pb-1 max-720:-mx-5 max-720:px-5"
        >
          {sections.map((section) => {
            const on = section.id === active;

            return (
              <button
                key={section.id}
                type="button"
                data-for={section.id}
                onClick={() => go(section.id)}
                aria-current={on}
                className={cn(
                  "flex w-full items-center justify-between gap-4 border-b border-grey-mid py-3 text-left transition-colors duration-200",
                  "max-900:w-auto max-900:shrink-0 max-900:gap-2 max-900:rounded-full max-900:border max-900:px-3.5 max-900:py-2",
                  on
                    ? "max-900:border-brand max-900:bg-brand-tint"
                    : "max-900:border-grey-mid max-900:bg-white",
                )}
              >
                <span
                  className={cn(
                    "min-w-0 text-[13.5px] leading-snug font-semibold tracking-[-0.01em] transition-colors duration-200 max-900:whitespace-nowrap",
                    on ? "text-brand" : "text-grey-500",
                  )}
                >
                  {section.label}
                </span>

                <span
                  className={cn(
                    MONO,
                    "shrink-0 text-[11.5px] font-semibold transition-colors duration-200",
                    on ? "text-brand" : "text-grey-bdr",
                  )}
                >
                  {section.items.length}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── Questions ── */}
      <div className="min-w-0">
        {sections.map((section, i) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-heading`}
            className={cn("scroll-mt-[112px]", i > 0 ? "mt-16 max-720:mt-12" : "")}
          >
            <div className="flex items-baseline justify-between gap-6 border-b border-ink pb-4">
              <h2
                id={`${section.id}-heading`}
                className="min-w-0 text-[19px] leading-snug font-bold tracking-[-0.02em] text-ink max-600:text-[17px]"
              >
                {section.label}
              </h2>

              <span
                className={cn(MONO, "shrink-0 text-[12px] font-bold text-brand")}
                aria-hidden
              >
                {section.number}
              </span>
            </div>

            <div>
              {section.items.map((item, q) => (
                <Row
                  key={item.q}
                  question={item.q}
                  answer={item.a}
                  /* One question opens the page, as the source lists do. */
                  initiallyOpen={i === 0 && q === 0}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

/** One question, and the answer underneath it. */
function Row({
  question,
  answer,
  initiallyOpen,
}: {
  question: string;
  answer: string;
  initiallyOpen?: boolean;
}) {
  const [open, setOpen] = useState(Boolean(initiallyOpen));

  return (
    <div className="border-b border-grey-mid">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="group flex w-full items-start justify-between gap-6 py-5 text-left max-600:gap-4 max-600:py-4"
      >
        <span
          className={cn(
            "min-w-0 text-[15px] leading-[1.5] font-semibold tracking-[-0.012em] transition-colors duration-200",
            open ? "text-brand" : "text-ink group-hover:text-brand-dark",
          )}
        >
          {question}
        </span>

        <PlusMinus open={open} />
      </button>

      {/* max-height rather than display, so the answer slides. */}
      <div
        className="overflow-hidden transition-[max-height] duration-[280ms] ease-[ease] motion-reduce:transition-none"
        style={{ maxHeight: open ? 420 : 0 }}
      >
        <p className="max-w-[68ch] pr-10 pb-6 text-[14px] leading-[1.7] text-grey-500 max-600:pr-0 max-600:pb-5">
          {answer}
        </p>
      </div>
    </div>
  );
}

/** A plus that becomes a minus - the bar rotates away. */
function PlusMinus({ open }: { open: boolean }) {
  return (
    <span
      className={cn(
        "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
        open
          ? "border-brand bg-brand text-white"
          : "border-grey-mid bg-white text-grey-500 group-hover:border-brand group-hover:text-brand",
      )}
      aria-hidden
    >
      <svg viewBox="0 0 12 12" fill="none" className="size-3">
        <path d="M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d="M6 1v10"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          className={cn(
            "origin-center transition-transform duration-[280ms] ease-out motion-reduce:transition-none",
            open ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
          )}
        />
      </svg>
    </span>
  );
}
