import {
  Bubble,
  Correspondent,
  PhoneFrame,
  ReadGlyph,
  Surface,
  Wire,
} from "@/components/patient-engagement/Thread";

/**
 * The hero visual: one message, followed all the way across.
 *
 * It used to be two identical white cards stacked on top of each other, which
 * said nothing about the thing the page is selling. It is now the two ends of
 * the same conversation drawn as the two different things they are — the
 * agency's secure software, and a phone with nothing installed on it — with
 * the ordinary SMS wire running between them.
 *
 * Every string is the one the page already carried.
 */
export default function ConversationStack({
  app,
  connectorLabel,
  sms,
}: {
  app: {
    head: string;
    initials: string;
    name: string;
    sub: string;
    message: string;
  };
  connectorLabel: string;
  sms: { head: string; incoming: string; outgoing: string };
}) {
  return (
    <div className="relative">
      {/* The agency's side: staff working inside Murphi. */}
      <Surface label={app.head} tone="brand" live className="relative z-20">
        <Correspondent
          initials={app.initials}
          name={app.name}
          sub={app.sub}
        />

        <Bubble side="out">{app.message}</Bubble>

        <div className="mt-2 flex justify-end" aria-hidden>
          <ReadGlyph className="h-[11px] w-[18px] text-brand" />
        </div>
      </Surface>

      <Wire label={connectorLabel} />

      {/* The patient's side: an ordinary phone, nothing installed. */}
      <div className="relative z-10">
        <PhoneFrame label={sms.head}>
          <Bubble side="in">{sms.incoming}</Bubble>
          <Bubble side="out">{sms.outgoing}</Bubble>
        </PhoneFrame>
      </div>
    </div>
  );
}
