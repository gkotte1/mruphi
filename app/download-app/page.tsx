import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DownloadPage from "@/components/download/DownloadPage";

export const metadata: Metadata = pageMetadata("/download-app/", {
  title: "Download the Murphi.ai App — iOS & Android",
  description:
    "Download the Murphi.ai app on iOS or Android to access AI-powered clinical documentation, ambient AI, and medical billing tools on the go.",
});

export default function Page() {
  return (
    <>
      <Navbar />
      <DownloadPage />
      <Footer />
    </>
  );
}
