import Link from "next/link";
import { Icon } from "@/components/icons";
import SineWaves from "@/components/home/SineWaves";
import { cn } from "@/lib/cn";

const THREAD = [
  { side: "in" as const, text: "Reminder: SN visit tomorrow 9:00 AM. Reply C to confirm." },
  { side: "out" as const, text: "C" },
  { side: "in" as const, text: "Thanks - noted for the nurse before she arrives." },
];

export default function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-brand">
      <div className="relative mx-auto grid w-full max-w-[1280px] grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center gap-12 px-10 py-20 text-grey-bg max-1024:grid-cols-1 max-1024:px-8 max-1024:py-16 max-600:px-4 max-600:py-14">
        <SineWaves className="absolute inset-x-0 bottom-0 h-24 w-full text-white/35" />

        <div className="relative max-w-[560px] max-1024:mx-auto max-1024:text-center">
          <h2 className="type-display text-grey-bg">
            Customize Murphi to{" "}
            <span className="text-white">suit your requirements</span>
          </h2>

          <p className="mt-5 max-w-[480px] text-[17px] font-medium leading-relaxed text-white/75 max-1024:mx-auto max-600:text-[15.5px]">
            A live demo tailored to your workflows and your team.
          </p>

          <Link
            href="/contact-us/"
            className="group mt-10 btn-on-blue max-600:mt-8 max-600:w-full max-600:justify-center"
          >
            Request Demo
            <Icon
              name="arrow"
              width={17}
              height={17}
              className="transition-transform duration-200 group-hover:translate-x-[3px]"
            />
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-[320px] max-1024:mt-4">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <div className="rounded-[36px] border-[6px] border-white/15 bg-white p-3 shadow-[0_28px_64px_-28px_rgba(0,0,0,0.45)]">
      <div className="overflow-hidden rounded-[26px] bg-grey-bg">
        <div className="flex items-center justify-between bg-brand px-4 py-3 text-[10.5px] font-bold uppercase tracking-[0.04em] text-white/90">
          <span>Murphi.ai · Office</span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-white" aria-hidden />
            Live
          </span>
        </div>

        <div className="p-4">
          {THREAD.map((message, i) => (
            <p
              key={`${message.side}-${i}`}
              className={cn(
                "mb-2 max-w-[86%] rounded-[15px] px-[13px] py-[9px] text-[12.5px] leading-[1.4] last:mb-0",
                message.side === "out"
                  ? "ml-auto rounded-br-[4px] bg-brand text-white"
                  : "rounded-bl-[4px] bg-white text-ink",
              )}
            >
              {message.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
