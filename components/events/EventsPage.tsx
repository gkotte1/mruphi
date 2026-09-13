import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { SimpleHero } from "@/components/inner-page/Hero";
import { IpWrap } from "@/components/inner-page/Shell";
import { EVENTS, eventHref, type EventItem } from "@/lib/events";

/**
 * /events/ - the listing. Cards come from lib/events.ts, the same source the
 * detail pages read, so a title, date, image or route cannot drift between
 * the two.
 *
 * Layout matches /announcements/: the hero, then a featured card with the
 * image on the left and the details on the right.
 */

export default function EventsPage() {
  return (
    <main>
      <SimpleHero
        current="Events"
        badge="Company"
        badgeIcon={<Icon name="community" width={13} height={13} />}
        title="Events"
        lede="Conferences and industry gatherings where you can meet Murphi.ai."
      />

      <section style={{ padding: "64px 0 96px" }}>
        <IpWrap>
          <div className="grid gap-16">
            {EVENTS.map((item) => (
              <Featured key={item.slug} item={item} />
            ))}
          </div>
        </IpWrap>
      </section>
    </main>
  );
}

/** Image left, everything else right — the announcements featured card. */
function Featured({ item }: { item: EventItem }) {
  const href = eventHref(item);

  return (
    <article className="ip-card group grid grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] items-stretch overflow-hidden max-900:grid-cols-1">
      <Link href={href} className="ip-link-card block" tabIndex={-1} aria-hidden>
        <span className="relative block h-full min-h-[340px] overflow-hidden bg-[#F5F5F5] max-900:aspect-[16/10] max-900:min-h-0">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(max-width: 900px) 100vw, 55vw"
            className="object-contain p-8 transition-transform duration-500 group-hover:scale-[1.02]"
            priority
            unoptimized
          />
        </span>
      </Link>

      <div className="flex flex-col justify-center p-12 max-1024:p-9 max-600:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="ip-mono rounded-full border border-[#E3E3E3] bg-[#F5F5F5] px-2.5 py-[5px] text-[10.5px] leading-none font-semibold tracking-[0.06em] uppercase text-[#878787]">
            Upcoming
          </span>

          <span className="rounded-full border border-[#E3E3E3] bg-[#F5F5F5] px-2.5 py-[5px] text-[10px] leading-none font-bold tracking-[0.07em] text-[#007EFF] uppercase">
            Event
          </span>

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

        <p className="type-hl-inbox-title mt-3 text-ink">
          {item.organizer}
        </p>
        <p className="type-hl-card-body mt-1">
          {item.location}
          <span aria-hidden> · </span>
          {item.venue}
        </p>
        <p className="type-hl-card-body mt-4 max-w-[46ch]">
          {item.excerpt}
        </p>

        <Link
          href={href}
          className="mt-8 inline-flex items-center gap-2 self-start text-[14px] font-bold text-[#007EFF] transition-colors duration-200 hover:text-[#006AD6] max-600:mt-6"
          tabIndex={-1}
          aria-hidden
        >
          View event
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
