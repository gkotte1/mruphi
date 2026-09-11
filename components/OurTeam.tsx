import Image from "next/image";
import { Icon } from "@/components/icons";
import { IpWrap } from "@/components/inner-page/Shell";
import { cn } from "@/lib/cn";

/**
 * The Our Team section.
 *
 * Portraits are the project's own, from murphi-project-assets/images/team/.
 * The kit records how the original About page shows them - 168px circles with
 * a 3px white border and a soft brand halo on hover - so that treatment is
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

export default function OurTeam() {
  return (
    <section aria-labelledby="team-heading" className="ip-section">
      <IpWrap>
        <span className="mb-5 block h-px w-12 bg-[#007EFF]" aria-hidden />

        <h2 id="team-heading" className="ip-h2 ip-serif">
          Our Team
        </h2>

        <ul className="ip-ruled mt-12 grid-cols-3 max-900:grid-cols-1 max-600:mt-9">
          {TEAM.map((member) => (
            <li
              key={member.name}
              className="group flex flex-col items-center px-8 py-10 text-center transition-colors duration-200 hover:bg-[#F5F5F5] max-600:px-6 max-600:py-8"
            >
              <span className="relative block size-[168px] shrink-0 overflow-hidden rounded-full border-[3px] border-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)] transition-shadow duration-300 group-hover:shadow-[0_0_0_4px_rgba(0,126,255,0.12),0_14px_30px_rgba(0,0,0,0.06)] max-600:size-[144px]">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={member.width}
                  height={member.height}
                  className="size-full object-cover"
                />
              </span>

              <p className="mt-7 text-[18px] font-bold leading-none tracking-[-0.02em] text-ink">
                {member.name}
              </p>

              <p className="mt-3 text-[13.5px] font-semibold leading-snug tracking-[-0.01em] text-[#007EFF]">
                {member.role}
              </p>

              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className={cn(
                  "mt-6 flex size-9 items-center justify-center rounded-[8px] border border-[#E3E3E3] bg-white text-[#878787] transition-colors duration-200",
                  "hover:border-[#007EFF] hover:bg-[#F5F5F5] hover:text-[#007EFF]",
                )}
              >
                <Icon name="linkedin" width={16} height={16} />
              </a>
            </li>
          ))}
        </ul>
      </IpWrap>
    </section>
  );
}
