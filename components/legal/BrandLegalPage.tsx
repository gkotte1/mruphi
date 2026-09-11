import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SimpleHero } from "@/components/inner-page/Hero";
import { InnerPage, IpWrap } from "@/components/inner-page/Shell";
import BrandLegalArchive from "@/components/legal/BrandLegalArchive";
import LegalProse from "@/components/legal/LegalProse";
import { cleanLegalBlocks, getLegalPage, type LegalSlug } from "@/lib/legal";
import "./brand-legal.css";

/**
 * Shared brand-guidelines legal shell. Copy stays the docs JSON wording;
 * presentation matches the current Homepage type system.
 */
export default function BrandLegalPage({ slug }: { slug: LegalSlug }) {
  const page = getLegalPage(slug);
  const blocks = cleanLegalBlocks(page.blocks);
  const archive = cleanLegalBlocks(page.archive.blocks);

  return (
    <InnerPage>
      <Navbar />

      <main className="ip-legal-main">
        <SimpleHero
          current={page.h1}
          title={page.h1}
          lede={page.heroSub}
          align="center"
          ledeAlign="left"
        />

        <section style={{ padding: "64px 0 96px" }}>
          <IpWrap>
            <article className="ip-legal-doc">
              <LegalProse blocks={blocks} semantic />
              <BrandLegalArchive label={page.archive.label} blocks={archive} />
            </article>
          </IpWrap>
        </section>
      </main>

      <Footer />
    </InnerPage>
  );
}
