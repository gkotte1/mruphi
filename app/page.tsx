import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Hero from "@/components/Hero";
import LogoStrip from "@/components/home/LogoStrip";
import Testimonials from "@/components/Testimonials";
import StatsBand from "@/components/home/StatsBand";
import HowItWorksHead from "@/components/home/HowItWorksHead";
import AmbientDictation from "@/components/AmbientDictation";
import RevenueAssurance from "@/components/RevenueAssurance";
import PatientEngagement from "@/components/PatientEngagement";
import PatientPayments from "@/components/PatientPayments";
import EhrConnectivity from "@/components/EhrConnectivity";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import FaqSection from "@/components/module-page/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import { FAQS } from "@/lib/faqs";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS.home, "/")} />

      <AnnouncementBar />
      <Navbar banner />
      <main className="bg-grey-bg">
        <Hero />
        <LogoStrip />
        <StatsBand />
        <Testimonials />
        <HowItWorksHead />
        <AmbientDictation />
        <RevenueAssurance />
        <PatientEngagement />
        <PatientPayments />
        <EhrConnectivity />

        <FaqSection items={FAQS.home} />

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
