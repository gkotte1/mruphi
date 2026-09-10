import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/cn";

/**
 * /download-app/ - wording and destinations from
 * website-research/download-app/download-app.md. The research runs each option's
 * heading, body and CTA together on one line; they are split at the element
 * boundaries the section list records, and nothing is reworded.
 *
 * The three platform marks are the images the source page itself carries.
 *
 * The former hero outline is intentionally omitted on this page only - the
 * download/platforms block is the first content under the navbar.
 */

const PLATFORMS = [
  {
    title: "iOS - iPhone & iPad",
    body: "Download from the Apple App Store. Compatible with iPhone and iPad running iOS 15 or later.",
    cta: "Download on App Store →",
    href: "https://apps.apple.com/in/app/murphiconnect-ai/id6776607061",
    src: "/images/download-app/app-store.png",
    size: 192,
  },
  {
    title: "Android - Phone & Tablet",
    body: "Download from Google Play. Compatible with Android devices running Android 10 or later.",
    cta: "Get it on Google Play →",
    href: "https://play.google.com/store/apps/details?id=com.Murphi.ai",
    src: "/images/download-app/google-play.png",
    size: 1024,
  },
  {
    title: "Web - Any Browser",
    body: "Access Murphi.ai from any desktop or laptop browser. No installation required. Full feature access.",
    cta: "Sign In on Web →",
    href: "https://murphi.murphiconnect.ai/login",
    src: "/images/download-app/web.png",
    size: 1254,
  },
];

const MODULES: { index: string; title: string; body: string; icon: IconName }[] =
  [
    {
      index: "01",
      title: "Ambient AI - Voice Recording",
      icon: "mic",
      body: "Record clinical visits directly from your phone. Murphi.ai generates OASIS, SOAP, PIE, BIRP, and DAP notes from your recording - synced to your EHR automatically.",
    },
    {
      index: "02",
      title: "Medication Scan",
      icon: "scan",
      body: "Point your camera at a medication bottle or package. Medication names, dosages, and instructions captured and added to the clinical note automatically.",
    },
    {
      index: "03",
      title: "Handwriting Capture",
      icon: "doc",
      body: "Photograph handwritten notes or forms. Murphi.ai digitizes and incorporates them into the clinical record - no manual rekeying required.",
    },
    {
      index: "04",
      title: "Revenue Assurance Reports",
      icon: "chartup",
      body: "View and manage your 28 AI compliance reports from anywhere. Review findings, approve reports, and track compliance status across your organization.",
    },
    {
      index: "05",
      title: "Patient Payment Tracking",
      icon: "card",
      body: "Monitor outstanding balances, track SMS payment link delivery and response, and view real-time collections performance across your patient population.",
    },
    {
      index: "06",
      title: "HIPAA Secure - Always",
      icon: "shield",
      body: "All app data encrypted end-to-end. Biometric authentication supported. Session timeout controls. BAA in place. HIPAA compliant on iOS, Android, and web.",
    },
  ];

const SHELL = "mx-auto w-full max-w-[1280px] px-10 max-1200:px-8 max-600:px-4";
const H2 = "type-h2 text-ink";

export default function DownloadPage() {
  return (
    <main className="bg-white pt-[80px]">
      <Platforms />
      <Modules />
    </main>
  );
}

function Platforms() {
  return (
    <section
      aria-labelledby="devices"
      className="bg-white pb-24 pt-16 max-1024:pb-20 max-1024:pt-12 max-600:pb-16 max-600:pt-10"
    >
      <div className={SHELL}>
        <div className="mx-auto max-w-[700px] text-center">
          <p className="type-label text-brand-dark">Download</p>

          <h2 id="devices" className={cn(H2, "mt-4")}>
            Murphi.ai on Every Device
          </h2>
          <p className="type-lead mt-5 text-grey-dk">
            Access Murphi.ai from your iPhone, Android device, or any web browser.
            One login - all your modules, all your data, wherever you are.
          </p>
        </div>

        {/* One surface split three ways, rather than three floating cards. */}
        <ul className="mx-auto mt-12 grid max-w-[1080px] grid-cols-3 gap-px overflow-hidden rounded-[24px] border border-grey-mid bg-grey-mid shadow-[0_22px_54px_-40px_rgba(15,29,84,0.55)] max-1024:grid-cols-1 max-600:mt-9">
          {PLATFORMS.map((platform) => (
            <li key={platform.title} className="flex bg-white">
              <Link
                href={platform.href}
                className="group flex w-full flex-col p-8 transition-colors duration-200 hover:bg-grey-bg max-600:p-6"
              >
                <span className="flex size-14 items-center justify-center rounded-[16px] border border-grey-mid bg-grey-bg p-2.5 transition-colors duration-200 group-hover:border-brand-border group-hover:bg-white">
                  <Image
                    src={platform.src}
                    alt=""
                    width={platform.size}
                    height={platform.size}
                    className="size-full object-contain"
                  />
                </span>

                <h3 className="mt-6 text-[16px] font-bold leading-snug tracking-[-0.02em] text-ink">
                  {platform.title}
                </h3>

                <p className="mt-3.5 text-[13.5px] leading-relaxed text-grey-dk/85">
                  {platform.body}
                </p>

                <span className="mt-auto flex items-center gap-2 pt-6 text-[13.5px] font-bold text-brand-dark transition-colors duration-200 group-hover:text-brand-deep">
                  {platform.cta}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Modules() {
  return (
    <section
      aria-labelledby="modules"
      className="bg-white py-24 max-1024:py-20 max-600:py-16"
    >
      <div className={SHELL}>
        <p className="type-label text-center text-brand-dark">What You Can Do</p>

        <h2 id="modules" className={cn(H2, "mt-4 text-center")}>
          All Modules. One App.
        </h2>

        {/* A ruled index - six capabilities read down, not six boxes. */}
        <ul className="mx-auto mt-12 grid max-w-[1080px] grid-cols-2 gap-x-14 border-t border-grey-mid max-1024:gap-x-10 max-768:grid-cols-1 max-600:mt-9">
          {MODULES.map((module) => (
            <li
              key={module.index}
              className="group flex items-start gap-5 border-b border-grey-mid py-7 max-600:gap-4 max-600:py-6"
            >
              <span className="flex shrink-0 flex-col items-center gap-2.5">
                <span className="flex size-10 items-center justify-center rounded-card border border-brand-border/80 bg-brand-tint text-brand-dark transition-colors duration-200 group-hover:border-transparent group-hover:bg-brand group-hover:text-grey-bg">
                  <Icon name={module.icon} width={18} height={18} />
                </span>
                <span className="type-micro text-grey-dk/35">{module.index}</span>
              </span>

              <span className="min-w-0">
                <h3 className="text-[16px] font-bold leading-snug tracking-[-0.02em] text-ink">
                  {module.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-grey-dk/85">
                  {module.body}
                </p>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
