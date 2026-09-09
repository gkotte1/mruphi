const PARTNERS = [
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
      <TickerRow items={PARTNERS} duration="56s" />
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
