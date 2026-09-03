import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = pageMetadata("/contact-us/", {
  title: "Contact Murphi.ai | Talk To A Healthcare AI Expert",
  description:
    "Contact Murphi.ai for healthcare AI automation. Talk to our enterprise AI specialists about EHR integrations, custom modules, and pricing.",
});

export default function Page() {
  return (
    <>
      <Navbar />
      <ContactPage />
      <Footer />
    </>
  );
}
