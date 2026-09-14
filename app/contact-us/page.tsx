import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactPage from "@/components/contact/ContactPage";
import { InnerPage } from "@/components/inner-page/Shell";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata("/contact-us/", {
  title: "Contact Murphi.ai | Talk To A Healthcare AI Expert",
  description:
    "Contact Murphi.ai for healthcare AI automation. Talk to our enterprise AI specialists about EHR integrations, custom modules, and pricing.",
});

export default function Page() {
  return (
    <InnerPage>
      <JsonLd data={webPageSchema("/contact-us/")} />
      <JsonLd data={breadcrumbSchema("/contact-us/", "Contact Us")} />
      <Navbar />
      <ContactPage />
      <Footer />
    </InnerPage>
  );
}
