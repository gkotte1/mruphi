import { Icon, type IconName } from "@/components/icons";
import { Eyebrow } from "@/components/home/kit";
import SineWaves from "@/components/home/SineWaves";

const STATS: {
  value: string;
  suffix: string;
  label: string;
  icon: IconName;
}[] = [
  {
    value: "70",
    suffix: "%",
    label: "Reduction in documentation time",
    icon: "mic",
  },
  {
    value: "98.7",
    suffix: "%",
    label: "Report accuracy with human review",
    icon: "sealcheck",
  },
  {
    value: "15",
    suffix: "days",
    label: "Collect from patients",
    icon: "card",
  },
  {
    value: "4",
    suffix: "",
    label: "Live modules on one platform",
    icon: "layers",
  },
];

export default function StatsBand() {
  return (
    <section className="bg-grey-bg px-10 py-5 max-1200:px-8 max-600:px-4 max-600:py-3">
      <div className="relative mx-auto overflow-hidden rounded-canvas bg-brand px-14 py-20 text-grey-bg shadow-[0_36px_80px_-44px_rgba(0,126,255,0.45)] max-720:rounded-hero max-720:px-6 max-720:py-14">
        <SineWaves className="absolute inset-x-0 bottom-0 h-24 w-full text-white/40" />

        <div className="relative mx-auto max-w-[760px] text-center">
          <Eyebrow onDark>Outcomes</Eyebrow>
          <h2 className="type-h2 text-grey-bg">
            Built to give clinicians <span className="text-white">their time back</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-[17px] leading-[1.6] text-white/80">
            Murphi integrates with the EHRs your agency uses and automates the
            work around patient care.
          </p>
        </div>

        <dl className="relative mt-14 grid grid-cols-4 gap-8 max-1024:grid-cols-2 max-600:grid-cols-1 max-600:gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="min-w-0 text-center max-600:text-left">
              <span className="mx-auto mb-5 flex size-10 items-center justify-center rounded-full border border-white/30 text-white max-600:mx-0">
                <Icon name={stat.icon} width={18} height={18} />
              </span>
              <dt className="type-stat text-grey-bg">
                {stat.value}
                {stat.suffix ? (
                  <span className="ml-0.5 align-baseline text-[0.38em] font-bold tracking-[-0.02em] text-white">
                    {stat.suffix}
                  </span>
                ) : null}
              </dt>
              <dd className="mx-auto mt-3 max-w-[18ch] text-[13.5px] leading-snug text-white/80 max-600:mx-0">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
