import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { type EventItem } from "@/lib/events";

/**
 * Event detail page — Home typography + white page ground (same as Home).
 * Split at the top: large image left, details right.
 */
export default function EventDetail({ event }: { event: EventItem }) {
  return (
    <main>
      <article className="bg-white">
        <div className="mx-auto w-full max-w-[1100px] px-10 py-16 max-1200:px-8 max-600:px-4 max-600:py-12">
          <Link
            href="/events/"
            className="group inline-flex items-center gap-2 text-[13px] font-bold text-[#606060] transition-colors duration-200 hover:text-[#007EFF]"
          >
            <Icon
              name="arrow"
              width={15}
              height={15}
              className="rotate-180 transition-transform duration-200 group-hover:-translate-x-[3px]"
            />
            Back to Events
          </Link>

          <div className="ip-card mt-10 grid grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] items-stretch overflow-hidden max-900:grid-cols-1 max-600:mt-8">
            <div className="relative min-h-[340px] overflow-hidden bg-[#F5F5F5] max-900:aspect-[16/10] max-900:min-h-0">
              <Image
                src={event.image}
                alt={event.alt}
                fill
                sizes="(max-width: 900px) 100vw, 55vw"
                className="object-contain p-8"
                priority
                unoptimized
              />
            </div>

            <div className="flex flex-col justify-center bg-white p-12 max-1024:p-9 max-600:p-6">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="ip-mono rounded-full border border-[#E3E3E3] bg-[#F5F5F5] px-2.5 py-[5px] text-[10.5px] leading-none font-semibold tracking-[0.06em] uppercase text-[#878787]">
                  Event
                </span>
                <time
                  dateTime={event.datetime}
                  className="text-[12px] font-semibold text-[#878787]"
                >
                  {event.date}
                </time>
              </div>

              <h1 className="type-hl-section-title mt-6 text-ink max-1024:text-[26px] max-600:text-[22px]">
                {event.title}
              </h1>

              <p className="type-hl-inbox-title mt-3 text-ink">
                {event.organizer}
              </p>

              <dl className="type-hl-card-body mt-5 grid gap-3">
                <div>
                  <dt className="font-semibold text-ink">Date</dt>
                  <dd>{event.date}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Location</dt>
                  <dd>{event.location}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Venue</dt>
                  <dd>{event.venue}</dd>
                </div>
              </dl>

              <p className="type-hl-card-body mt-5 max-w-[46ch]">
                {event.excerpt}
              </p>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-[720px] max-600:mt-10">
            <section>
              <h2 className="type-hl-section-title text-ink max-600:text-[24px]">
                About the Event
              </h2>
              <p className="type-hl-lead mt-4">{event.description}</p>
            </section>

            <section className="mt-10 max-600:mt-8">
              <h2 className="type-hl-section-title text-ink max-600:text-[24px]">
                Event Details
              </h2>
              <dl className="type-hl-card-body mt-5 grid gap-4">
                <div>
                  <dt className="font-semibold text-ink">Address</dt>
                  <dd>{event.address}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">
                    Pre-Conference Workshops
                  </dt>
                  <dd>October 27–28, 2026</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">
                    Main Conference &amp; Expo
                  </dt>
                  <dd>October 28–30, 2026</dd>
                </div>
              </dl>
            </section>

            <div className="mt-10 max-600:mt-8">
              <a
                href={event.website}
                className="ip-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Official Event Website
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
