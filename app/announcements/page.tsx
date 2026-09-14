import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementsPage from "@/components/announcements/AnnouncementsPage";
import { InnerPage } from "@/components/inner-page/Shell";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata("/announcements/", {
  title: "Announcements | Latest Healthcare AI News",
  description:
    "Stay updated with the latest Murphi.ai product announcements, AI healthcare milestones, partnerships, and platform updates.",
});

export default function Page() {
  return (
    <InnerPage>
      <JsonLd data={webPageSchema("/announcements/")} />
      <JsonLd data={breadcrumbSchema("/announcements/", "Announcements")} />
      <Navbar />
      <AnnouncementsPage />
      <Footer />
    </InnerPage>
  );
}
