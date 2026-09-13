import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventDetail from "@/components/events/EventDetail";
import { InnerPage } from "@/components/inner-page/Shell";
import { JsonLd } from "@/components/JsonLd";
import { EVENTS, eventHref, findEvent } from "@/lib/events";
import { breadcrumbSchema, eventPageSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";

/**
 * One event detail page under /events/<slug>/.
 *
 * Only the registered slugs in lib/events.ts are built; anything else 404s.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return EVENTS.map((event) => ({ slug: event.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = findEvent(slug);
  if (!event) return {};

  const path = eventHref(event);

  return {
    title: event.title,
    description: event.excerpt,
    alternates: { canonical: path },
    openGraph: {
      siteName: "Murphi.ai",
      url: absoluteUrl(path),
      title: event.title,
      description: event.excerpt,
      type: "website",
      images: [event.image],
    },
  };
}

export default async function EventArticle({ params }: Props) {
  const { slug } = await params;
  const event = findEvent(slug);
  if (!event) notFound();

  const path = eventHref(event);

  return (
    <InnerPage>
      <JsonLd data={breadcrumbSchema(path, event.title)} />
      <JsonLd data={eventPageSchema(event)} />
      <Navbar />
      <EventDetail event={event} />
      <Footer />
    </InnerPage>
  );
}
