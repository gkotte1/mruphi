import Image from "next/image";
import { IpWrap } from "@/components/inner-page/Shell";

/* The three seals shipped in murphi-project-assets/images/certifications/ are
   the real marks, rendered at 60px - above the 64px-wide source's legibility
   floor for the ISO ring. Nothing here is a recreated or invented badge. */
type Card = {
  title: string;
  body: string;
  src: string;
  width: number;
  height: number;
  alt: string;
};

const CARDS: Card[] = [
  {
    title: "HIPAA Compliant",
    body: "All data encrypted in transit and at rest using AES-256. BAA in place for every customer. PHI never leaves your environment without explicit authorization.",
    src: "/images/certifications/hipaa-compliant-seal.png",
    width: 108,
    height: 112,
    alt: "HIPAA Compliant seal",
  },
  {
    title: "SOC 2 Type II",
    body: "Independently audited security controls. Annual SOC 2 Type II certification. Available on request with NDA in place.",
    src: "/images/certifications/aicpa-soc-seal.png",
    width: 120,
    height: 120,
    alt: "AICPA SOC seal",
  },
  {
    title: "ISO 27001",
    body: "ISO 27001 certified information security management. Enterprise-grade security framework applied to every integration and data flow.",
    src: "/images/certifications/iso-27001-seal.png",
    width: 108,
    height: 108,
    alt: "ISO 27001 seal",
  },
];

export default function SecuritySection() {
  return (
    <section
      aria-labelledby="security-heading"
      className="ip-section ip-band"
    >
      <IpWrap>
        <div className="max-w-[760px]">
          <p className="ip-eyebrow">Security</p>

          <h2 id="security-heading" className="ip-h2 ip-serif" style={{ marginTop: 16 }}>
            Enterprise-Grade Security Across Every Integration
          </h2>
        </div>

        <ul className="mx-auto mt-14 max-w-[900px] border-t border-[#E3E3E3] max-600:mt-10">
          {CARDS.map((card) => (
            <li
              key={card.title}
              className="grid grid-cols-[auto_minmax(0,0.5fr)_minmax(0,1fr)] items-center gap-8 border-b border-[#E3E3E3] py-7 max-900:grid-cols-[auto_1fr] max-900:gap-x-6 max-900:gap-y-2.5 max-600:gap-x-4 max-600:py-6"
            >
              <span className="flex size-[76px] items-center justify-center rounded-full border border-[#E3E3E3] bg-[#F5F5F5]">
                <Image
                  src={card.src}
                  alt={card.alt}
                  width={card.width}
                  height={card.height}
                  className="h-[52px] w-auto"
                />
              </span>

              <h3 className="type-hl-card-title text-ink">
                {card.title}
              </h3>

              <p className="type-hl-card-body max-900:col-start-2">
                {card.body}
              </p>
            </li>
          ))}
        </ul>
      </IpWrap>
    </section>
  );
}
