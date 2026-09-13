import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventsPage from "@/components/events/EventsPage";
import { InnerPage } from "@/components/inner-page/Shell";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata("/events/", {
  title: "Events",
  description:
    "Upcoming conferences and industry events where you can meet Murphi.ai.",
});

export default function Page() {
  return (
    <InnerPage>
      <JsonLd data={breadcrumbSchema("/events/", "Events")} />
      <Navbar />
      <EventsPage />
      <Footer />
    </InnerPage>
  );
}
