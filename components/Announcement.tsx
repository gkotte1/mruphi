import Link from "next/link";
import Reveal from "@/components/module-page/Reveal";

/**
 * The Announcement band from the old home page, recreated as-is.
 *
 * Traced from Murphi.ai Website Pages/01. HomePAge — `.announcement-band`,
 * `.announcement-pill`, `.tech-ticker-wrap` and `.tech-ticker-track`:
 *
 *   band    flat #CCE5FF, 56px top padding,
 *           1px #E3E3E3 top border, centred
 *   pill    #007EFF, white, 13px/700, uppercase, +0.03em, 100px radius
 *   copy    16px #1A1A1A, max-width 66ch
 *   ticker  #CCE5FF band, 22px vertical padding, edges masked at 8%/92%,
 *           track animated translateX(0 → -50%) over 26s linear, paused on
 *           hover and under prefers-reduced-motion
 *   item    15px/600 #606060, 26px horizontal padding, middot in #E3E3E3
 */

/* The twelve partners, in the source's order. The source repeats the list a
   second time so the -50% translation loops with no visible seam. */
const PARTNERS = [
  "AWS",
  "Google Cloud",
  "Twilio",
  "OpenAI",
  "Vertex AI",
  "Claude",
  "Everyware",
  "Fortis",
  "Sinch",
  "Vonage",
  "Oasis Technologies Group",
  "WhatsApp",
];

export default function Announcement() {
  const track = [...PARTNERS, ...PARTNERS];

  return (
    <Reveal>
      <section className="border-t border-grey-mid bg-brand-ghost pt-14 text-center">
        <div className="mx-auto w-full max-w-[1220px] px-8 max-720:px-5">
          <p className="mb-[22px] inline-flex items-center gap-2 rounded-full bg-brand px-[18px] py-[9px] text-[13px] font-bold uppercase tracking-[0.03em] text-grey-bg">
            <svg viewBox="0 0 24 24" fill="none" className="size-3.5" aria-hidden>
              <path
                d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
            Announcement
          </p>

          <p className="mx-auto mb-3.5 max-w-[66ch] text-[16px] leading-[1.6] text-ink">
            <strong>Murphi.ai</strong> is proud to announce that it has been
            recognized as a <strong>Bronze Stevie® Award Winner</strong> at the
            prestigious 2026 American Business Awards®, one of the most respected
            business award programs in the United States.
          </p>

          <Link
            href="/announcements/murphi-ai-wins-bronze-stevie-award-at-the-2026-american-business-awards/"
            className="text-[14.5px] font-semibold text-brand transition-colors duration-200 hover:text-brand-dark"
          >
            Read more →
          </Link>
        </div>

        <div
          className="group mt-9 overflow-hidden bg-brand-ghost py-[22px]"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          }}
        >
          <div
            className="flex w-max items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none"
            style={{ animation: "mp-ticker 26s linear infinite" }}
          >
            {track.map((partner, i) => (
              <span
                key={`${partner}-${i}`}
                className="px-[26px] text-[15px] font-semibold whitespace-nowrap text-grey-500"
              >
                {partner} <span className="font-normal text-grey-mid">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
