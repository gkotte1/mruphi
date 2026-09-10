"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const TESTIMONIALS = [
  {
    id: "vicki-goodman",
    name: "Vicki Goodman",
    role: "Chief Revenue Officer",
    company: "Curantis Solutions",
    content:
      "Murphi AI has truly transformed how we approach clinical workflow documentation in hospice and palliative care. Documentation that used to take up valuable clinical time is now streamlined, accurate, and intuitive.",
    initials: "VG",
  },
];

export default function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
<<<<<<< Updated upstream
      className="bg-grey-bg px-10 py-8 max-1200:px-8 max-600:px-4 max-600:py-5"
=======
      className="relative isolate overflow-hidden border-t border-grey-mid py-28 max-1024:py-20 max-600:py-16"
>>>>>>> Stashed changes
    >
      <div className="mx-auto w-full max-w-[1280px] overflow-hidden rounded-canvas bg-white px-12 py-16 shadow-[0_24px_64px_-40px_rgba(15,29,84,0.22)] max-720:rounded-hero max-720:px-6 max-720:py-12">
        <AnimatedTestimonials
          badgeText="Customer stories"
          title="What customers are saying"
          subtitle="Home Health and Hospice teams using Murphi on the workflows they already run."
          testimonials={TESTIMONIALS}
        />
      </div>
    </section>
  );
}
