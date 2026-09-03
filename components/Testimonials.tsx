"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";

type Testimonial = {
  id: string;
  quote: string;
  initials: string;
  name: string;
  role: string;
  placeholder?: boolean;
};

/* Three cards, no duplicates. Only the first is a validated testimonial; the
   other two are labelled placeholders and carry no invented details. */
const TESTIMONIALS: Testimonial[] = [
  {
    id: "vicki-goodman",
    quote:
      "Murphi AI has truly transformed how we approach clinical workflow documentation in hospice and palliative care. Documentation that used to take up valuable clinical time is now streamlined, accurate, and intuitive.",
    initials: "VG",
    name: "Vicki Goodman",
    role: "Chief Revenue Officer, Curantis Solutions",
  },
  {
    id: "placeholder-2",
    quote:
      "Another Home Health or Hospice customer quote goes here — placeholder pending a validated testimonial.",
    initials: "—",
    name: "Customer name",
    role: "Role, Agency",
    placeholder: true,
  },
  {
    id: "placeholder-3",
    quote:
      "A third Home Health or Hospice customer quote goes here — placeholder pending a validated testimonial.",
    initials: "—",
    name: "Customer name",
    role: "Role, Agency",
    placeholder: true,
  },
];

const COUNT = TESTIMONIALS.length;
const AUTOPLAY_MS = 4500;
const SLIDE_MS = 700;

/* The track carries the three cards twice. Advancing one position at a time,
   the window at index N always has real content to its right, and index COUNT
   renders exactly what index 0 does — so the loop resets there invisibly. */
const SLIDES = [...TESTIMONIALS, ...TESTIMONIALS];

export default function Testimonials() {
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
    setIndex((current) => Math.min(current + 1, COUNT));
  }, []);

  const previous = useCallback(() => {
    if (index > 0) {
      setAnimate(true);
      setIndex(index - 1);
      return;
    }

    /* Jump to the cloned end without animating, then step back into it. */
    pendingRef.current = COUNT - 1;
    setAnimate(false);
    setIndex(COUNT);
  }, [index]);

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
      if (
        event.propertyName !== "transform" ||
        event.target !== event.currentTarget ||
        index < COUNT
      ) {
        return;
      }

      /* The clone at index COUNT renders what index 0 renders — swap without
         animating and the loop is invisible. */
      setAnimate(false);
      setIndex(0);
    },
    [index],
  );

  const active = index % COUNT;

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative isolate overflow-hidden py-28 max-1024:py-20 max-600:py-16"
    >
      <SectionGround />

      <div className="mx-auto w-full max-w-[1280px] px-10 max-1200:px-8 max-600:px-4">
        <div className="text-center">
          <p className="type-label text-brand-dark">Customer stories</p>
          <h2
            id="testimonials-heading"
            className="mx-auto mt-4 max-w-[620px] type-h2 text-ink"
          >
            What customers are saying
          </h2>
        </div>

        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
          className="mt-14 max-600:mt-10"
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
              {SLIDES.map((testimonial, i) => {
                const clone = i >= COUNT;

                return (
                  <li
                    key={`${testimonial.id}-${i}`}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${(i % COUNT) + 1} of ${COUNT}`}
                    aria-hidden={clone || undefined}
                    className="flex w-[33.3333%] shrink-0 grow-0 px-3.5 max-1024:w-1/2 max-600:w-full max-600:px-0"
                  >
                    <TestimonialCard testimonial={testimonial} />
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
              {TESTIMONIALS.map((testimonial, i) => (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === active ? "true" : undefined}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === active
                      ? "w-6 bg-brand"
                      : "w-1.5 bg-grey-bdr/70 hover:bg-brand-pale",
                  )}
                />
              ))}
            </div>

            <ArrowButton label="Next testimonial" onClick={next}>
              <Icon
                name="chevron"
                width={16}
                height={16}
                className="-rotate-90"
              />
            </ArrowButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A quiet ground — two large, low washes well behind the cards. */
function SectionGround() {
  return null;
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
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { placeholder } = testimonial;

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
            "block text-[52px] font-extrabold leading-[0.55]",
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
          "mt-5 text-[18px] font-medium leading-[1.6] tracking-[-0.012em] max-1200:text-[17px] max-600:text-[16.5px]",
          placeholder ? "text-grey-dk/70" : "text-ink",
        )}
      >
        {testimonial.quote}
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
          {testimonial.initials}
        </span>

        <div className="min-w-0">
          <p
            className={cn(
              "text-[13.5px] font-bold leading-none tracking-[-0.015em]",
              placeholder ? "text-grey-dk/70" : "text-ink",
            )}
          >
            {testimonial.name}
          </p>
          <p className="mt-2 text-[12px] font-medium leading-snug text-grey-dk/65">
            {testimonial.role}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
