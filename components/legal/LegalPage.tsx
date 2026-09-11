import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalArchive from "@/components/legal/LegalArchive";
import LegalProse from "@/components/legal/LegalProse";
import { getLegalPage, type LegalSlug } from "@/lib/legal";
import "./legal-page.css";

/**
 * Shared Legal-page shell. Copy is Version 2.0 + the archived Version 1.0
 * accordion from utility-content.json. Visuals follow UTILITY_LEGAL_PAGES.md
 * and privacy-policy.css; chrome is the current Homepage Navbar/Footer.
 * There is no closing CTA band (showCta={false}).
 */
export default function LegalPage({ slug }: { slug: LegalSlug }) {
  const page = getLegalPage(slug);

  return (
    <div className="legal-page">
      <Navbar />

      <main>
        <section className="legal-hero" style={{ background: "#077EFF" }}>
          <div className="legal-hero-inner">
            <h1>{page.h1}</h1>
            <p>{page.heroSub}</p>
          </div>
        </section>

        <div className="legal-frame">
          <div className="legal-column">
            <LegalProse blocks={page.blocks} />
            <LegalArchive
              label={page.archive.label}
              blocks={page.archive.blocks}
              inset={page.archive.inset}
              proseSize={page.archive.proseSize}
              proseColor={page.archive.proseColor}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
