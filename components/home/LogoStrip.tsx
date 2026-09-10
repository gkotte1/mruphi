const PARTNERS = [
  "Curantis Solutions",
  "SouthSide CHC",
  "Carefluence",
  "Percensys CORE",
  "DocuguardAI",
  "AAIC",
  "Synapse Digital",
  "AWS",
  "Google Cloud",
  "Twilio",
  "OpenAI",
  "Vertex AI",
  "Claude",
  "Everyware",
  "Fortis",
  "Sinch",
  "Vonage",
  "Oasis Technologies Group",
  "WhatsApp",
  "Smartsheet",
  "360 Dialogue",
  "Ejabberd",
  "Healthcare Synergy",
  "iTherapyDocs",
  "BCHCCPro",
  "Infinity Home Health",
  "Kassy Health",
  "Nursing Rehab",
  "Self Help for the Elderly",
  "St. Claire Medical Center",
  "Advanced Home Health and Hospice",
  "CNS Service Inc",
  "Distinct Homehealth Services",
  "PD Hospice",
  "PrimeCare",
  "AKESO Healthcare",
  "Visiting Nurses of Illinois, Inc.",
];

const MASK = {
  maskImage:
    "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
  WebkitMaskImage:
    "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
} as const;

/** One slow looping row of partner names. */
export default function LogoStrip() {
  return (
    <section className="bg-grey-bg pb-16 pt-2 max-600:pb-12">
      {/* Duration scales with item count so scroll speed stays near the
          original 12-name / 56s pace. */}
      <TickerRow items={PARTNERS} duration="173s" />
    </section>
  );
}

function TickerRow({
  items,
  duration,
}: {
  items: readonly string[];
  duration: string;
}) {
  const track = [...items, ...items];

  return (
    <div className="group overflow-hidden py-1" style={MASK}>
      <div
        className="flex w-max items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{
          animation: `mp-ticker ${duration} linear infinite`,
        }}
      >
        {track.map((partner, i) => (
          <span
            key={`${partner}-${i}`}
            className="px-[28px] text-[15px] font-semibold whitespace-nowrap text-ink-muted"
          >
            {partner}
            <span className="ml-[28px] font-normal text-grey-mid" aria-hidden>
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
