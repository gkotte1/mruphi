import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/cn";

type Category = {
  title: string;
  description: string;
  icon: IconName;
  systems: string[];
};

/* Text tiles only — no logo asset exists for any of these platforms, and none
   is recreated here. */
const CATEGORIES: Category[] = [
  {
    title: "Post-Acute EHRs",
    description: "Home health, hospice, palliative care, and SNF platforms",
    icon: "home",
    systems: [
      "WellSky",
      "Axxess",
      "Kantime",
      "MatrixCare",
      "HCHB",
      "Netsmart",
      "Careficient",
      "+ Any FHIR/HL7",
    ],
  },
  {
    title: "Health System & Specialty EHRs",
    description:
      "Hospitals, health systems, primary care, and specialty clinics",
    icon: "server",
    systems: [
      "Epic",
      "Cerner (Oracle Health)",
      "Athena",
      "ECW",
      "Allscripts",
      "NextGen",
      "+ Any FHIR/HL7",
    ],
  },
];

export default function EhrCapability() {
  return (
    <section
      aria-labelledby="capability-heading"
      className="relative isolate py-28 max-1024:py-20 max-600:py-16"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "#FFFFFF",
        }}
        aria-hidden
      />

      <div className="mx-auto w-full max-w-[1280px] px-10 max-1200:px-8 max-600:px-4">
        <div className="max-w-[720px]">
          <p className="type-label text-brand-dark">EHR Capability</p>

          <h2
            id="capability-heading"
            className="mt-4 type-h2 text-ink"
          >
            Can Connect with most EHRs
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 max-1024:grid-cols-1 max-600:mt-10 max-600:gap-5">
          {CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="rounded-[24px] border border-grey-mid bg-white p-8 shadow-[0_24px_60px_-46px_rgba(15,29,84,0.4)] max-600:p-5"
            >
              <div className="flex items-start gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-card border border-brand-border/80 bg-brand-tint text-brand-dark">
                  <Icon name={category.icon} width={18} height={18} />
                </span>

                <div className="min-w-0">
                  <h3 className="text-[16px] font-bold leading-snug tracking-[-0.02em] text-ink">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] font-medium leading-relaxed text-grey-dk/80">
                    {category.description}
                  </p>
                </div>
              </div>

              <ul className="mt-7 grid grid-cols-2 gap-2.5 border-t border-grey-mid pt-6 max-1200:gap-2 max-600:grid-cols-1">
                {category.systems.map((system) => {
                  const open = system.startsWith("+");

                  return (
                    <li
                      key={system}
                      className={cn(
                        "flex items-center justify-center rounded-card px-3 py-3 text-center text-[13px] font-bold leading-snug tracking-[-0.012em] transition-colors duration-200",
                        open
                          ? "border border-dashed border-brand-border bg-brand-tint/50 text-brand-dark"
                          : "border border-grey-mid bg-grey-bg text-ink hover:border-brand-border hover:bg-brand-tint/60",
                      )}
                    >
                      {system}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
