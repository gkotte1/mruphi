import Link from "next/link";

const HREF =
  "/announcements/murphi-ai-wins-bronze-stevie-award-at-the-2026-american-business-awards/";

/**
 * Sticky announcement strip above the nav - brand blue ground, one line, one
 * link. Height is 42px so the homepage navbar can sit flush beneath it.
 */
export const ANNOUNCEMENT_BAR_H = 42;

export default function AnnouncementBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-[70] flex h-[42px] items-center justify-center bg-brand px-4">
      <p className="max-w-full truncate text-[13px] font-semibold text-white">
        <span aria-hidden>🏆 </span>
        Bronze Stevie Award Winner at the 2026 American Business Awards.{" "}
        <Link
          href={HREF}
          className="font-bold text-white underline decoration-white/60 underline-offset-2 transition-colors duration-200 hover:decoration-white"
        >
          Read more
        </Link>
      </p>
    </div>
  );
}
