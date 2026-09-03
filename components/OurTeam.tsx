import Image from "next/image";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";

/**
 * The Our Team section.
 *
 * Portraits are the project's own, from murphi-project-assets/images/team/.
 * The kit records how the original About page shows them — 168px circles with
 * a 3px white border and a soft brand halo on hover — so that treatment is
 * kept here.
 */

const TEAM = [
  {
    name: "Guru Tadiparti",
    role: "Founder & CEO",
    linkedin: "https://www.linkedin.com/in/gurutadiparti/",
    image: "/images/team/guru-tadiparti.png",
    width: 712,
    height: 712,
  },
  {
    name: "Venkata M Rao",
    role: "Enterprise Architecture",
    linkedin: "https://www.linkedin.com/in/venkatamadhu/",
    image: "/images/team/venkata-m-rao.png",
    width: 714,
    height: 708,
  },
  {
    name: "Stuart Smith",
    role: "Board Advisor, Duke Health System",
    linkedin: "https://www.linkedin.com/in/stuart-smith-b40b8814/",
    image: "/images/team/stuart-smith.png",
    width: 672,
    height: 714,
  },
];

const SHELL = "mx-auto w-full max-w-[1280px] px-10 max-1200:px-8 max-600:px-4";

export default function OurTeam() {
  return (
    <section
      aria-labelledby="team-heading"
      className="border-t border-grey-mid bg-white py-24 max-1024:py-20 max-600:py-16"
    >
      <div className={SHELL}>
        <span className="mb-5 block h-px w-12 bg-brand" aria-hidden />

        <h2 id="team-heading" className="type-h2 text-ink">
          Our Team
        </h2>

        {/* One leadership surface, hairline divided — three profiles, not
            three floating cards. */}
        <ul className="mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-[24px] border border-grey-mid bg-grey-mid shadow-[0_24px_60px_-46px_rgba(15,29,84,0.4)] max-900:grid-cols-1 max-600:mt-9">
          {TEAM.map((member) => (
            <li
              key={member.name}
              className="group flex flex-col items-center bg-white px-8 py-10 text-center transition-colors duration-200 hover:bg-grey-bg max-600:px-6 max-600:py-8"
            >
              <span className="relative block size-[168px] shrink-0 overflow-hidden rounded-full border-[3px] border-white shadow-[0_10px_30px_-14px_rgba(15,29,84,0.35)] transition-shadow duration-300 group-hover:shadow-[0_0_0_6px_rgba(0,126,255,0.12),0_16px_38px_-16px_rgba(0,86,173,0.45)] max-600:size-[144px]">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={member.width}
                  height={member.height}
                  className="size-full object-cover"
                />
              </span>

              <p className="mt-7 text-[18px] font-extrabold leading-none tracking-[-0.02em] text-ink">
                {member.name}
              </p>

              {/* The role line carries the brand colour, as specified. */}
              <p className="mt-3 text-[13.5px] font-semibold leading-snug tracking-[-0.01em] text-brand">
                {member.role}
              </p>

              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className={cn(
                  "mt-6 flex size-9 items-center justify-center rounded-[10px] border border-brand-border/60 bg-white text-grey-dk/60 transition-all duration-200",
                  "hover:-translate-y-0.5 hover:border-brand-border hover:bg-brand-tint hover:text-brand-dark",
                )}
              >
                <Icon name="linkedin" width={16} height={16} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
