/**
 * Events listing and detail pages read from this register, the same way
 * announcements read from lib/announcements.ts, so a title, date, image or
 * route cannot drift between the card and the page it opens.
 */

export const EVENT_SITE =
  "https://s6.goeshow.com/alliance/annual/2026/index.cfm";

export type EventItem = {
  slug: string;
  title: string;
  organizer: string;
  date: string;
  datetime: string;
  endDatetime: string;
  location: string;
  venue: string;
  address: string;
  excerpt: string;
  description: string;
  image: string;
  alt: string;
  website: string;
};

export const EVENTS: EventItem[] = [
  {
    slug: "2026-annual-meeting-expo",
    title: "2026 Annual Meeting & Expo",
    organizer: "National Alliance for Care at Home",
    date: "October 27–30, 2026",
    datetime: "2026-10-27",
    endDatetime: "2026-10-30",
    location: "Washington, DC",
    venue: "Walter E. Washington Convention Center",
    address: "801 Allen Y. Lew Place, NW, Washington, DC",
    excerpt:
      "Join Murphi.ai at the National Alliance for Care at Home gathering for care-at-home leaders, October 27–30 in Washington, DC.",
    description:
      "The Annual Meeting & Expo brings together leaders from across the care-at-home continuum to learn, connect, and explore the trends, innovations, and strategies shaping the future of care delivery. Murphi.ai will be part of the conversation, sharing how AI can help home health and hospice organizations simplify workflows, improve documentation, strengthen revenue operations, and reduce administrative burden.",
    image: "/images/events/2026-annual-meeting-expo.png",
    alt: "2026 Annual Meeting & Expo in Washington, DC",
    website: EVENT_SITE,
  },
];

export function eventHref(event: EventItem) {
  return `/events/${event.slug}/`;
}

export function findEvent(slug: string) {
  return EVENTS.find((event) => event.slug === slug) ?? null;
}
