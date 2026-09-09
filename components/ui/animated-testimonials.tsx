"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Quote } from "lucide-react";
import { motion, useAnimation, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface Testimonial {
  id: number | string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating?: number;
  avatar?: string;
  initials?: string;
}

export interface AnimatedTestimonialsProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  testimonials?: Testimonial[];
  autoRotateInterval?: number;
  trustedCompanies?: string[];
  trustedCompaniesTitle?: string;
  className?: string;
}

export function AnimatedTestimonials({
  title = "What customers are saying",
  subtitle,
  badgeText = "Customer stories",
  testimonials = [],
  autoRotateInterval = 6000,
  trustedCompanies = [],
  trustedCompaniesTitle = "Infrastructure & partners",
  className,
}: AnimatedTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 0.61, 0.36, 1] as const,
      },
    },
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    if (
      paused ||
      autoRotateInterval <= 0 ||
      testimonials.length <= 1
    ) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [autoRotateInterval, testimonials.length, paused]);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={cn("overflow-hidden py-4", className)}
    >
      <div>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 md:gap-16"
        >
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <div className="space-y-6">
              {badgeText ? (
                <div className="inline-flex items-center gap-2 type-label text-brand-dark">
                  <span className="size-1.5 rounded-full bg-brand" aria-hidden />
                  <span>{badgeText}</span>
                </div>
              ) : null}

              <h2 id="testimonials-heading" className="type-h2 text-ink">
                {title}
              </h2>

              {subtitle ? (
                <p className="max-w-[52ch] text-[17px] leading-[1.6] text-grey-500">
                  {subtitle}
                </p>
              ) : null}

              {testimonials.length > 1 ? (
                <div className="flex items-center gap-3 pt-4">
                  {testimonials.map((testimonial, index) => (
                    <button
                      key={testimonial.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={cn(
                        "h-2.5 rounded-full transition-all duration-300",
                        activeIndex === index
                          ? "w-10 bg-brand"
                          : "w-2.5 bg-grey-bdr hover:bg-brand-pale",
                      )}
                      aria-label={`View testimonial ${index + 1}`}
                      aria-current={activeIndex === index ? "true" : undefined}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-hero bg-brand-tint/70" />
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-hero bg-brand-ghost/80" />

            {testimonials.length === 1 ? (
              <div className="relative z-10">
                <TestimonialCard testimonial={testimonials[0]} />
              </div>
            ) : (
              <div className="relative min-h-[320px] md:min-h-[380px]">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{
                      opacity: activeIndex === index ? 1 : 0,
                      x: activeIndex === index ? 0 : 100,
                      scale: activeIndex === index ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
                    style={{ zIndex: activeIndex === index ? 10 : 0 }}
                    aria-hidden={activeIndex !== index}
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>

        {trustedCompanies.length > 0 ? (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={controls}
            className="mt-24 text-center"
          >
            <h3 className="mb-8 text-sm font-medium text-ink-muted">
              {trustedCompaniesTitle}
            </h3>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
              {trustedCompanies.map((company) => (
                <div
                  key={company}
                  className="text-2xl font-semibold text-ink-muted/50"
                >
                  {company}
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="relative z-10 flex h-full flex-col rounded-hero bg-brand-tint p-8">
      <div className="relative mb-6 flex-1">
        <Quote className="absolute -top-1 -left-1 h-8 w-8 rotate-180 text-brand/25" />
        <p className="relative z-10 text-[17px] font-medium leading-relaxed text-ink">
          {testimonial.content}
        </p>
      </div>

      <Separator className="my-4 bg-brand-border/60" />

      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          {testimonial.avatar ? (
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
          ) : null}
          <AvatarFallback>
            {testimonial.initials || testimonial.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-ink">{testimonial.name}</h3>
          <p className="text-sm text-grey-500">
            {testimonial.role}
            {testimonial.company ? `, ${testimonial.company}` : null}
          </p>
        </div>
      </div>
    </div>
  );
}
