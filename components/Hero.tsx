import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { Accent, Waveform } from "@/components/home/kit";

const NOW_HREF =
  "/announcements/murphi-ai-wins-bronze-stevie-award-at-the-2026-american-business-awards/";

const PHOTO = "/images/1.jpg";

export default function Hero() {
  return (
    <section className="relative isolate bg-grey-bg pt-[122px]">
      <div className="mx-auto w-full max-w-[1280px] px-10 pt-16 pb-6 max-1200:px-8 max-720:px-5 max-720:pt-10">
        <div className="grid grid-cols-2 items-center gap-16 max-1080:grid-cols-1 max-1080:gap-12">
          <div>
            <Link
              href={NOW_HREF}
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium text-grey-500 transition-colors duration-200 hover:text-brand-dark"
            >
              Now · Bronze Stevie Award Winner
              <Icon name="arrow" width={13} height={13} />
            </Link>

            <h1 className="type-hero-display mb-6 text-ink">
              The Most Advanced AI Platform for{" "}
              <Accent>Home Health &amp; Hospice Agencies</Accent>
            </h1>

            <p className="mb-10 max-w-[42ch] text-[17.5px] leading-[1.6] text-grey-500">
              Murphi integrates with the EHRs your agency uses and automates the
              work around patient care.
            </p>

            <div className="flex flex-wrap items-center gap-5 max-720:flex-col max-720:items-stretch">
              <Link
                href="/contact-us/"
                className="btn-primary max-720:w-full max-720:justify-center"
              >
                Request Demo
              </Link>
              <div className="flex items-center gap-2.5">
                <Image
                  src="/images/certifications/hipaa-compliant-seal.png"
                  alt="HIPAA Compliant"
                  width={36}
                  height={36}
                  className="size-9"
                />
                <span className="text-[12px] font-bold tracking-[0.06em] text-ink uppercase">
                  HIPAA Compliant
                </span>
              </div>
            </div>
          </div>

          <HeroVisual />
        </div>

        <p className="mt-16 flex items-center justify-center gap-2 type-label text-brand-dark max-720:mt-10">
          <span className="size-1.5 rounded-full bg-brand" aria-hidden />
          Serving 200+
        </p>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative isolate">
      <div
        className="pointer-events-none absolute right-[-6%] bottom-[-8%] -z-10 h-[42%] w-[58%] rounded-full bg-brand/20 blur-[48px] max-720:h-[36%] max-720:w-[50%]"
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-hero">
        <Image
          src={PHOTO}
          alt="A home health clinician reviewing a tablet with a patient"
          width={1600}
          height={1067}
          priority
          className="aspect-[4/5] h-auto w-full object-cover object-[center_30%] max-1080:aspect-[5/4]"
        />
      </div>

      <div className="absolute top-[46%] right-[-18px] z-10 flex w-[200px] flex-col gap-2.5 max-720:right-3 max-720:top-[42%] max-720:w-[168px]">
        <div className="rounded-full bg-white px-3.5 py-2.5 text-[13px] font-semibold text-ink shadow-[0_12px_28px_-16px_rgba(15,29,84,0.45)]">
          OASIS note ready
        </div>
        <div className="rounded-full bg-white px-3.5 py-2.5 text-[13px] font-semibold text-ink shadow-[0_12px_28px_-16px_rgba(15,29,84,0.45)]">
          70% less documentation
        </div>
        <div className="rounded-full bg-brand px-3.5 py-2.5 text-[13px] font-semibold text-grey-bg shadow-[0_12px_28px_-16px_rgba(0,106,214,0.55)]">
          EHR Updated
        </div>
      </div>

      <div className="absolute bottom-6 left-[-18px] z-10 flex items-center gap-3 rounded-[22px] bg-white px-3.5 py-3 shadow-[0_18px_44px_-26px_rgba(15,29,84,0.4)] max-720:bottom-4 max-720:left-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand text-grey-bg">
          <Icon name="mic" width={18} height={18} />
        </span>
        <Waveform />
      </div>
    </div>
  );
}
