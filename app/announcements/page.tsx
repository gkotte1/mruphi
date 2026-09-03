import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementsPage from "@/components/announcements/AnnouncementsPage";

export const metadata: Metadata = pageMetadata("/announcements/", {
  title: "Announcements | Latest Healthcare AI News",
  description:
    "Stay updated with the latest Murphi.ai product announcements, AI healthcare milestones, partnerships, and platform updates.",
});

export default function Page() {
  return (
    <>
      <Navbar />
      <AnnouncementsPage />
      <Footer />
    </>
  );
}
