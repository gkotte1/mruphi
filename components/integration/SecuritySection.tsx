import Image from "next/image";

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
      className="relative isolate py-28 max-1024:py-20 max-600:py-16"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "#FFFFFF",
        }}
        aria-hidden
      />

      <div className="mx-auto w-full max-w-[1280px] px-10 max-1200:px-8 max-600:px-4">
        <div className="max-w-[760px]">
          <p className="type-label text-brand-dark">Security</p>

          <h2
            id="security-heading"
            className="mt-4 type-h2 text-ink"
          >
            Enterprise-Grade Security Across Every Integration
          </h2>
        </div>

        {/* Three commitments, one per line, each led by its seal. */}
        <ul className="mx-auto mt-14 max-w-[900px] border-t border-grey-mid max-600:mt-10">
          {CARDS.map((card) => (
            <li
              key={card.title}
              className="grid grid-cols-[auto_minmax(0,0.5fr)_minmax(0,1fr)] items-center gap-8 border-b border-grey-mid py-7 max-900:grid-cols-[auto_1fr] max-900:gap-x-6 max-900:gap-y-2.5 max-600:gap-x-4 max-600:py-6"
            >
              <span className="flex size-[76px] items-center justify-center rounded-full border border-brand-border/50 bg-grey-bg">
                <Image
                  src={card.src}
                  alt={card.alt}
                  width={card.width}
                  height={card.height}
                  className="h-[52px] w-auto"
                />
              </span>

              <h3 className="text-[16px] font-bold leading-snug tracking-[-0.02em] text-ink">
                {card.title}
              </h3>

              <p className="text-[13.5px] font-normal leading-relaxed text-grey-dk/85 max-900:col-start-2">
                {card.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
