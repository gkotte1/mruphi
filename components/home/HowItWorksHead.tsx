import Link from "next/link";
import { Eyebrow } from "@/components/home/kit";
import SineWaves from "@/components/home/SineWaves";

export default function HowItWorksHead() {
  return (
    <section className="relative isolate overflow-hidden bg-brand px-10 py-24 max-1200:px-8 max-600:px-4 max-600:py-16">
      <SineWaves className="absolute inset-x-0 bottom-0 h-24 w-full text-white/35" />

      <div className="relative mx-auto max-w-[720px] text-center">
        <Eyebrow onDark>How it works</Eyebrow>
        <h2 className="type-h2 text-grey-bg">
          The Murphi <span className="text-white">Platform</span>
        </h2>
        <p className="mx-auto mt-5 max-w-[52ch] text-[17px] leading-[1.6] text-white/80">
          Murphi integrates with the EHRs your agency uses and automates the
          work around patient care.
        </p>
        <Link
          href="/contact-us/"
          className="btn-on-blue mt-8 max-600:w-full max-600:justify-center"
        >
          Request Demo
        </Link>
      </div>
    </section>
  );
}
