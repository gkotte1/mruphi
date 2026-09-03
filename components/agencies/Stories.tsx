"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";

/**
 * What agencies say, presented in the home page's Customer Stories language:
 * editorial cards carried by the quote, a dashed treatment for the ones still
 * pending, and a three-up carousel with arrows and dots.
 *
 * The design is borrowed; the content is this page's own and is passed in.
 *
 * The track carries the cards twice. Advancing one position at a time, the
 * window at index N always has real content to its right, and index COUNT
 * renders exactly what index 0 does — so the loop resets there invisibly.
 */

export type Story = {
  quote: string;
  initials: string;
  name: string;
  role: string;
  placeholder?: boolean;
};

const AUTOPLAY_MS = 4500;
const SLIDE_MS = 700;

export default function Stories({ cards }: { cards: Story[] }) {
  const count = cards.length;
  const slides = [...cards, ...cards];

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  /* Where to land after an instant, un-animated reposition. */
  const pendingRef = useRef<number | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const next = useCallback(() => {
    setAnimate(true);
    setIndex((current) => Math.min(current + 1, count));
  }, [count]);

  const previous = useCallback(() => {
    if (index > 0) {
      setAnimate(true);
      setIndex(index - 1);
      return;
    }

    /* Jump to the cloned end without animating, then step back into it. */
    pendingRef.current = count - 1;
    setAnimate(false);
    setIndex(count);
  }, [index, count]);

  const goTo = useCallback((target: number) => {
    setAnimate(true);
    setIndex(target);
  }, []);

  /* One timer, restarted whenever the position settles. Nothing runs while the
     carousel is hovered, focused, mid-reset, or when motion is reduced. */
  useEffect(() => {
    if (paused || reduced || !animate) return;

    const timer = window.setTimeout(next, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, reduced, animate, next]);

  /* Re-enable the transition only after the un-animated frame has painted. */
  useEffect(() => {
    if (animate) return;

    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        const pending = pendingRef.current;
        pendingRef.current = null;

        setAnimate(true);
        if (pending !== null) setIndex(pending);
      });
    });

    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [animate]);

  const settle = useCallback(
    (event: React.TransitionEvent<HTMLUListElement>) => {
      if (event.propertyName !== "transform" || event.currentTarget !== event.target) {
        return;
      }

      if (index >= count) {
        pendingRef.current = null;
        setAnimate(false);
        setIndex(0);
      }
    },
    [index, count],
  );

  const active = index % count;

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Agency testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* overflow-x-clip, not hidden: the y axis stays visible so the hover
          lift and its shadow are never cut off. */}
      <div className="overflow-x-clip py-3">
        <ul
          onTransitionEnd={settle}
          className="flex [--step:33.3333%] max-1024:[--step:50%] max-600:[--step:100%]"
          style={{
            transform: "translateX(calc(var(--i) * var(--step) * -1))",
            transition: animate
              ? `transform ${SLIDE_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1)`
              : "none",
            ...({ "--i": index } as React.CSSProperties),
          }}
        >
          {slides.map((story, i) => {
            const clone = i >= count;

            return (
              <li
                key={`${story.name}-${i}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${(i % count) + 1} of ${count}`}
                aria-hidden={clone || undefined}
                className="flex w-[33.3333%] shrink-0 grow-0 px-3.5 max-1024:w-1/2 max-600:w-full max-600:px-0"
              >
                <StoryCard story={story} />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-10 flex items-center justify-center gap-5 max-600:mt-8">
        <ArrowButton label="Previous testimonial" onClick={previous}>
          <Icon name="chevron" width={16} height={16} className="rotate-90" />
        </ArrowButton>

        <div className="flex items-center gap-2.5">
          {cards.map((story, i) => (
            <button
              key={`${story.name}-dot-${i}`}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active ? "w-6 bg-brand" : "w-1.5 bg-grey-bdr/70 hover:bg-brand-pale",
              )}
            />
          ))}
        </div>

        <ArrowButton label="Next testimonial" onClick={next}>
          <Icon name="chevron" width={16} height={16} className="-rotate-90" />
        </ArrowButton>
      </div>
    </div>
  );
}

function ArrowButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-grey-mid bg-white text-grey-dk transition-all duration-200 hover:border-brand-border hover:bg-brand-tint hover:text-brand-dark"
    >
      {children}
    </button>
  );
}

/** Editorial card: the quote carries the card, the person signs it. */
function StoryCard({ story }: { story: Story }) {
  const { placeholder } = story;

  return (
    <figure
      className={cn(
        "group flex w-full flex-col rounded-[24px] border bg-white p-7 transition-all duration-300 hover:-translate-y-1 max-600:p-5",
        placeholder
          ? "border-dashed border-grey-mid bg-grey-bg shadow-[0_18px_44px_-34px_rgba(15,29,84,0.4)] hover:border-grey-bdr/70"
          : "border-grey-mid shadow-[0_22px_50px_-34px_rgba(15,29,84,0.5)] hover:border-brand-border hover:shadow-[0_30px_64px_-34px_rgba(0,86,173,0.5)]",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={cn(
            "block text-[52px] leading-[0.55] font-extrabold",
            placeholder ? "text-grey-mid" : "text-brand-ghost",
          )}
          aria-hidden
        >
          &ldquo;
        </span>

        {placeholder ? (
          <span className="type-micro shrink-0 rounded-full border border-dashed border-grey-bdr/60 px-2.5 py-[5px] text-grey-dk/45">
            Testimonial pending
          </span>
        ) : null}
      </div>

      <blockquote
        className={cn(
          "mt-5 text-[18px] leading-[1.6] font-medium tracking-[-0.012em] max-1200:text-[17px] max-600:text-[16.5px]",
          placeholder ? "text-grey-dk/70" : "text-ink",
        )}
      >
        {story.quote}
      </blockquote>

      <figcaption className="mt-auto flex items-center gap-3.5 border-t border-grey-mid pt-6 max-600:pt-5">
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-full text-[13px] font-extrabold tracking-[0.02em]",
            placeholder
              ? "border border-dashed border-grey-bdr/60 text-grey-bdr"
              : "bg-brand text-grey-bg shadow-[0_10px_22px_-12px_rgba(0,106,214,0.9)]",
          )}
          aria-hidden
        >
          {story.initials}
        </span>

        <div className="min-w-0">
          <p
            className={cn(
              "text-[13.5px] leading-none font-bold tracking-[-0.015em]",
              placeholder ? "text-grey-dk/70" : "text-ink",
            )}
          >
            {story.name}
          </p>
          <p className="mt-2 text-[12px] leading-snug font-medium text-grey-dk/65">
            {story.role}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
