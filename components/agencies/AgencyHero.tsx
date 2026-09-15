import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "@/components/module-page/Reveal";
import WorkflowLayer from "@/components/agencies/HeroVisual";
import "./agencies-page.css";

/**
 * Agencies hero — layout and copy from the Who We Serve reference,
 * using the site's Inner Page type system and brand colors.
 */
export default function AgencyHero({
  visual,
}: {
  visual: ReactNode;
}) {
  return (
    <section className="agencies-hero">
      <div className="agencies-hero-wrap">
        <Reveal>
          <nav className="agencies-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/#serve">Who We Serve</Link>
            <span aria-hidden>/</span>
            <span className="agencies-breadcrumb-current">
              Home Health &amp; Hospice Agencies
            </span>
          </nav>

          <p className="agencies-eyebrow">Who We Serve · Agencies</p>

          <div className="agencies-hero-grid">
            <div className="agencies-hero-copy">
              <h1 className="agencies-h1 ip-serif">
                4 Less Hours Charting.{" "}
                <em>4 More Hours for Patients—and Life.</em>
              </h1>

              <div className="agencies-story">
                <p className="agencies-story-meta">
                  7:42 PM · visit ended an hour ago
                </p>
                <p className="agencies-story-body ip-serif">
                  Hannah is not charting — she{"'"}s already home. Murphi turned
                  the encounter into a structured OASIS, nursing, or therapy note
                  while she was still with the patient.
                </p>
              </div>

              <p className="agencies-lede">
                Ambient AI listens during the visit so clinicians can stay with
                the patient, not the screen. What{"'"}s captured flows into
                documentation — then into Revenue Assurance, where coding,
                OASIS/HOPE, and POC gaps get caught before they become denials,
                and into Patient Engagement, keeping patients and families
                supported through the episode.
              </p>

              <p className="agencies-tagline ip-serif">
                More patient time. Less pajama time.
              </p>

              <a href="/contact-us/" className="ip-btn agencies-cta">
                Request Demo
              </a>

              <p className="agencies-trust">
                HIPAA <span aria-hidden>·</span> SOC 2{" "}
                <span aria-hidden>·</span> ISO 27001 <span aria-hidden>·</span>{" "}
                BAA
              </p>
            </div>

            <div className="agencies-hero-visual">{visual}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AgenciesHeroVisual() {
  return (
    <WorkflowLayer
      label="Six Workflows, One Agency"
      modules={[
        { name: "Ambient AI & Dictation" },
        { name: "Patient Engagement" },
        { name: "Revenue Assurance" },
        { name: "Patient Payments" },
      ]}
    />
  );
}
