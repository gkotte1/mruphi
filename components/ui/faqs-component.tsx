"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/lib/faqs";
import { Eyebrow } from "@/components/home/kit";

export default function FAQs({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-5 md:gap-12">
      <div className="md:col-span-2">
        <Eyebrow>FAQs</Eyebrow>
        <h2 className="type-hl-section-title text-ink">
          Frequently Asked <span className="text-brand">Questions</span>
        </h2>
        <p className="type-hl-lead mt-4 max-w-[36ch]">
          Quick answers about the platform, how it connects to your EHR, and
          how to get started.
        </p>
        <p className="type-hl-card-body mt-6 hidden md:block">
          Can&apos;t find what you&apos;re looking for?{" "}
          <Link
            href="/contact-us/"
            className="font-semibold text-brand-dark hover:underline"
          >
            Contact us
          </Link>
        </p>
      </div>

      <div className="md:col-span-3">
        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="w-full"
        >
          {items.map((item, index) => (
            <AccordionItem key={item.q} value={`item-${index + 1}`}>
              <AccordionTrigger className="type-hl-card-title cursor-pointer text-ink hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent>
                <p className="type-hl-card-body">
                  {item.a}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <p className="type-hl-card-body md:hidden">
        Can&apos;t find what you&apos;re looking for?{" "}
        <Link
          href="/contact-us/"
          className="font-semibold text-brand-dark hover:underline"
        >
          Contact us
        </Link>
      </p>
    </div>
  );
}
