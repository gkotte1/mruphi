import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { SimpleHero } from "@/components/inner-page/Hero";
import { IpWrap } from "@/components/inner-page/Shell";
import {
  ANNOUNCEMENTS,
  announcementHref,
  type Announcement,
} from "@/lib/announcements";

/**
 * /announcements/ - the listing. Cards come from lib/announcements.ts, the same
 * source the article pages read, so a title, date, category, image or route can
 * never drift between the two.
 *
 * The source listing shows all fourteen with no pagination and no load-more.
 * The most recent one leads, given an editorial two-column treatment; the rest
 * follow as a grid, so the hierarchy is obvious at a glance.
 */

/** Newest first, by the machine date recorded alongside each printed one. */
const BY_DATE = [...ANNOUNCEMENTS].sort((a, b) =>
  b.datetime.localeCompare(a.datetime),
);

const [LATEST, ...REST] = BY_DATE;

export default function AnnouncementsPage() {
  return (
    <main>
      <SimpleHero
        current="Announcements"
        badge="Company"
        badgeIcon={<Icon name="doc" width={13} height={13} />}
        title="Announcements"
        lede="Latest updates, partnerships, awards, and milestones from Murphi.ai."
      />

      <section style={{ padding: "64px 0 96px" }}>
        <IpWrap>
          <Featured item={LATEST} />

          <ul className="mt-16 grid grid-cols-3 gap-6 max-1024:grid-cols-2 max-768:grid-cols-1 max-600:mt-12 max-600:gap-5">
            {REST.map((item) => (
              <li key={item.slug} className="flex">
                <Card item={item} />
              </li>
            ))}
          </ul>
        </IpWrap>
      </section>
    </main>
  );
}

/** The most recent one: image left, everything else right. */
function Featured({ item }: { item: Announcement }) {
  const href = announcementHref(item);

  return (
    <article className="ip-card group grid grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] items-stretch overflow-hidden max-900:grid-cols-1">
      <Link href={href} className="ip-link-card block" tabIndex={-1} aria-hidden>
        <span className="relative block h-full min-h-[340px] overflow-hidden bg-[#F5F5F5] max-900:aspect-[16/10] max-900:min-h-0">
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
          <span className="ip-mono rounded-full border border-[#E3E3E3] bg-[#F5F5F5] px-2.5 py-[5px] text-[10.5px] leading-none font-semibold tracking-[0.06em] uppercase text-[#878787]">
            Latest
          </span>

          <Link
            href={item.categoryHref}
            className="rounded-full border border-[#E3E3E3] bg-[#F5F5F5] px-2.5 py-[5px] text-[10px] leading-none font-bold tracking-[0.07em] text-[#007EFF] uppercase transition-colors duration-200 hover:border-[#007EFF]"
          >
            {item.category}
          </Link>

          <time
            dateTime={item.datetime}
            className="text-[12px] font-semibold text-[#878787]"
          >
            {item.date}
          </time>
        </div>

        <h2 className="ip-serif mt-6 text-[26px] leading-[1.25] font-medium tracking-[-0.025em] text-ink max-1024:text-[22px] max-600:text-[19px]">
          <Link
            href={href}
            className="transition-colors duration-200 hover:text-[#007EFF]"
          >
            {item.title}
          </Link>
        </h2>

        <Link
          href={href}
          className="mt-8 inline-flex items-center gap-2 self-start text-[14px] font-bold text-[#007EFF] transition-colors duration-200 hover:text-[#006AD6] max-600:mt-6"
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
    <article className="ip-card group flex w-full flex-col overflow-hidden">
      <Link href={href} className="ip-link-card block" tabIndex={-1} aria-hidden>
        <span className="relative block aspect-[16/10] overflow-hidden bg-[#F5F5F5]">
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
            className="rounded-full border border-[#E3E3E3] bg-[#F5F5F5] px-2.5 py-[5px] text-[10px] leading-none font-bold tracking-[0.07em] text-[#007EFF] uppercase transition-colors duration-200 hover:border-[#007EFF]"
          >
            {item.category}
          </Link>

          <time
            dateTime={item.datetime}
            className="text-[12px] font-semibold text-[#878787]"
          >
            {item.date}
          </time>
        </div>

        <h2 className="type-hl-card-title mt-4 text-ink">
          <Link
            href={href}
            className="transition-colors duration-200 hover:text-[#007EFF]"
          >
            {item.title}
          </Link>
        </h2>

        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-2 pt-6 text-[13px] font-bold text-[#007EFF] transition-colors duration-200 hover:text-[#006AD6]"
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
