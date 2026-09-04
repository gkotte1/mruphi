import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Announcement from "@/components/Announcement";
import AmbientDictation from "@/components/AmbientDictation";
import RevenueAssurance from "@/components/RevenueAssurance";
import PatientEngagement from "@/components/PatientEngagement";
import PatientPayments from "@/components/PatientPayments";
import EhrConnectivity from "@/components/EhrConnectivity";
import Testimonials from "@/components/Testimonials";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import FaqSection from "@/components/module-page/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import { FAQS } from "@/lib/faqs";

/* The FAQ band's kicker is set in the site typeface like every other label. */
export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS.home, "/")} />

      <Navbar />
      <main>
        <Hero />
        <Announcement />
        <AmbientDictation />
        <RevenueAssurance />
        <PatientEngagement />
        <PatientPayments />
        <EhrConnectivity />
        <Testimonials />

        <FaqSection items={FAQS.home} divider="container" />

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
