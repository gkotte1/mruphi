import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import {
  ANNOUNCEMENTS,
  announcementHref,
  type Announcement,
} from "@/lib/announcements";
import { cn } from "@/lib/cn";

/**
 * /announcements/ - the listing. Cards come from lib/announcements.ts, the same
 * source the article pages read, so a title, date, category, image or route can
 * never drift between the two.
 *
 * The source listing shows all fourteen with no pagination and no load-more.
 * The most recent one leads, given an editorial two-column treatment; the rest
 * follow as a grid, so the hierarchy is obvious at a glance.
 */

const SHELL = "mx-auto w-full max-w-[1280px] px-10 max-1200:px-8 max-600:px-4";

/** Newest first, by the machine date recorded alongside each printed one. */
const BY_DATE = [...ANNOUNCEMENTS].sort((a, b) =>
  b.datetime.localeCompare(a.datetime),
);

const [LATEST, ...REST] = BY_DATE;

export default function AnnouncementsPage() {
  return (
    <main>
      <section className="bg-hero-bg pt-[80px]">
        <div
          className={cn(
            SHELL,
            "pt-16 pb-14 text-center max-600:pt-10 max-600:pb-10",
          )}
        >
          <p className="type-label inline-flex items-center gap-2 rounded-full border border-brand-ghost bg-brand-tint px-3.5 py-1.5 text-brand-dark">
            <Icon name="doc" width={13} height={13} />
            Company
          </p>

          <h1 className="mt-7 type-h1 text-ink">Announcements</h1>

          <p className="type-lead mx-auto mt-6 max-w-[600px] text-grey-dk">
            Latest updates, partnerships, awards, and milestones from Murphi.ai.
          </p>
        </div>
      </section>

      <section className="bg-white pt-16 pb-28 max-1024:pb-20 max-600:pt-12 max-600:pb-16">
        <div className={SHELL}>
          <Featured item={LATEST} />

          <ul className="mt-16 grid grid-cols-3 gap-6 max-1024:grid-cols-2 max-768:grid-cols-1 max-600:mt-12 max-600:gap-5">
            {REST.map((item) => (
              <li key={item.slug} className="flex">
                <Card item={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

/** The most recent one: image left, everything else right. */
function Featured({ item }: { item: Announcement }) {
  const href = announcementHref(item);

  return (
    <article className="group grid grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] items-stretch overflow-hidden rounded-[28px] border border-grey-mid bg-white shadow-[0_28px_70px_-50px_rgba(15,29,84,0.55)] transition-all duration-200 hover:border-brand-border hover:shadow-[0_34px_80px_-48px_rgba(0,86,173,0.5)] max-900:grid-cols-1 max-600:rounded-[20px]">
      <Link href={href} className="block" tabIndex={-1} aria-hidden>
        <span className="relative block h-full min-h-[340px] overflow-hidden bg-grey-bg max-900:aspect-[16/10] max-900:min-h-0">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(max-width: 900px) 100vw, 55vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            priority
          />
        </span>
      </Link>

      <div className="flex flex-col justify-center p-12 max-1024:p-9 max-600:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {/* Which one this is - stated once, in the page's own label style. */}
          <span className="type-micro rounded-full border border-grey-mid bg-grey-bg px-2.5 py-[5px] leading-none text-grey-dk/60">
            Latest
          </span>

          <Link
            href={item.categoryHref}
            className="rounded-full border border-brand-border/70 bg-brand-tint px-2.5 py-[5px] text-[10px] leading-none font-bold tracking-[0.07em] text-brand-dark uppercase transition-colors duration-200 hover:border-brand-border hover:text-brand-deep"
          >
            {item.category}
          </Link>

          <time
            dateTime={item.datetime}
            className="text-[12px] font-semibold text-grey-dk/55"
          >
            {item.date}
          </time>
        </div>

        <h2 className="mt-6 text-[26px] leading-[1.25] font-extrabold tracking-[-0.025em] text-ink max-1024:text-[22px] max-600:text-[19px]">
          <Link
            href={href}
            className="transition-colors duration-200 hover:text-brand-dark"
          >
            {item.title}
          </Link>
        </h2>

        <Link
          href={href}
          className="mt-8 inline-flex items-center gap-2 self-start text-[14px] font-bold text-brand-dark transition-colors duration-200 hover:text-brand-deep max-600:mt-6"
          tabIndex={-1}
          aria-hidden
        >
          View announcement
          <Icon
            name="arrow"
            width={16}
            height={16}
            className="transition-transform duration-200 group-hover:translate-x-[3px]"
          />
        </Link>
      </div>
    </article>
  );
}

/** Everything after the latest. */
function Card({ item }: { item: Announcement }) {
  const href = announcementHref(item);

  return (
    <article className="group flex w-full flex-col overflow-hidden rounded-panel border border-grey-mid bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-border hover:shadow-[0_26px_60px_-42px_rgba(0,86,173,0.5)]">
      <Link href={href} className="block" tabIndex={-1} aria-hidden>
        <span className="relative block aspect-[16/10] overflow-hidden bg-grey-bg">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6 max-600:p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Link
            href={item.categoryHref}
            className="rounded-full border border-brand-border/70 bg-brand-tint px-2.5 py-[5px] text-[10px] leading-none font-bold tracking-[0.07em] text-brand-dark uppercase transition-colors duration-200 hover:border-brand-border hover:text-brand-deep"
          >
            {item.category}
          </Link>

          <time
            dateTime={item.datetime}
            className="text-[12px] font-semibold text-grey-dk/55"
          >
            {item.date}
          </time>
        </div>

        <h2 className="mt-4 text-[15.5px] leading-snug font-bold tracking-[-0.018em] text-ink">
          <Link
            href={href}
            className="transition-colors duration-200 hover:text-brand-dark"
          >
            {item.title}
          </Link>
        </h2>

        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-2 pt-6 text-[13px] font-bold text-brand-dark transition-colors duration-200 hover:text-brand-deep"
          tabIndex={-1}
          aria-hidden
        >
          Read More
          <Icon
            name="arrow"
            width={15}
            height={15}
            className="transition-transform duration-200 group-hover:translate-x-[3px]"
          />
        </Link>
      </div>
    </article>
  );
}
