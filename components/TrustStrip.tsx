import Image from "next/image";
import { Icon } from "@/components/icons";

/**
 * The trust strip — its own section, immediately after the hero.
 *
 * Three of the four marks are the real seals shipped in
 * murphi-project-assets/images/certifications/, rendered at 64px because the
 * ISO ring type is unreadable below that. The fourth is not a certification:
 * a BAA is a signed contract and has no official logo, so it carries a plain
 * house icon rather than a borrowed mark. Nothing here is a fabricated seal.
 */

type Badge =
  | { label: string; src: string; width: number; height: number; alt: string }
  | { label: string; icon: true };

const BADGES: Badge[] = [
  {
    label: "HIPAA",
    src: "/images/certifications/hipaa-compliant-seal.png",
    width: 108,
    height: 112,
    alt: "HIPAA Compliant seal",
  },
  {
    label: "SOC 2",
    src: "/images/certifications/aicpa-soc-seal.png",
    width: 120,
    height: 120,
    alt: "AICPA SOC seal",
  },
  {
    label: "ISO 27001",
    src: "/images/certifications/iso-27001-seal.png",
    width: 108,
    height: 108,
    alt: "ISO 27001 seal",
  },
  { label: "BAA Signed", icon: true },
];

export default function TrustStrip() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="relative isolate pt-12 pb-14 max-600:pt-10 max-600:pb-11"
    >
      <TrustGround />

      <div className="mx-auto w-full max-w-[1280px] px-10 text-center max-1200:px-8 max-600:px-4">
        <h2 id="trust-heading" className="type-label text-brand-dark">
          Trusted &amp; secure
        </h2>

        <ul className="mx-auto mt-7 grid max-w-[820px] grid-cols-4 gap-3.5 max-768:max-w-[420px] max-768:grid-cols-2 max-600:gap-3">
          {BADGES.map((badge) => (
            <li
              key={badge.label}
              className="flex flex-col items-center gap-3 rounded-panel border border-brand-border/45 bg-white px-3.5 py-5 shadow-[0_18px_40px_-32px_rgba(0,86,173,0.45)] transition-colors duration-200 hover:border-brand-border max-600:px-3 max-600:py-4"
            >
              {"icon" in badge ? (
                <span className="flex size-14 items-center justify-center rounded-full border border-brand-border bg-brand-tint text-brand-dark">
                  <Icon name="sealcheck" width={24} height={24} />
                </span>
              ) : (
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  width={badge.width}
                  height={badge.height}
                  className="h-14 w-auto"
                />
              )}

              <span className="text-[13px] font-bold leading-none tracking-[-0.01em] text-ink">
                {badge.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * The band: it picks up the tint the hero floor ends on and resolves to white,
 * so the sections read as connected while a fading hairline marks the seam.
 */
function TrustGround() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
      <div className="absolute inset-0 bg-grey-bg" />

      <div className="absolute inset-x-0 top-0 mx-auto h-px w-full max-w-[1180px] bg-brand-pale" />
    </div>
  );
}
