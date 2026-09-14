"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const HIDDEN = ["translate-y-[18px]"];

/**
 * The source page's `.reveal` behaviour: elements start 18px low and
 * transparent, then settle once they cross 12% into view, observed once and
 * then released.
 *
 * The class is dropped straight off the node rather than held in state - the
 * reveal is purely visual, so there is nothing for React to re-render, and it
 * matches how the original page does it. Reduced motion is handled in CSS, so
 * the content is visible even before this runs.
 */
export default function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const show = () => element.classList.remove(...HIDDEN);

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-transform duration-[600ms] ease-out",
        "motion-reduce:translate-y-0",
        ...HIDDEN,
        className,
      )}
    >
      {children}
    </div>
  );
}
