import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/cn";

const FEATURES: { label: string; icon: IconName }[] = [
  { label: "Two-way SMS", icon: "exchange" },
  { label: "Reminders", icon: "pulse" },
  { label: "Print · Scan · Fax", icon: "scan" },
  { label: "Document Signature", icon: "sealcheck" },
];

const BENEFITS = [
  "Fewer phone calls",
  "Faster responses",
  "Complete communication history",
];

export default function PatientEngagement() {
  return (
    <section
      aria-labelledby="engagement-heading"
      className="relative isolate overflow-hidden py-28 max-1024:py-20 max-600:py-16"
    >
      <SectionGround />

      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[minmax(0,46fr)_minmax(0,54fr)] items-start gap-x-16 px-10 max-1200:gap-x-12 max-1200:px-8 max-1024:grid-cols-1 max-1024:gap-y-14 max-600:gap-y-10 max-600:px-4">
        {/* ── Left: the message ── */}
        <div className="min-w-0 pt-2 max-1024:mx-auto max-1024:max-w-[620px] max-1024:pt-0">
          <p className="type-label inline-flex items-center gap-2 rounded-full border border-brand-ghost bg-brand-tint px-3.5 py-1.5 text-brand-dark">
            <Icon name="community" width={13} height={13} />
            Patient Engagement
          </p>

          <h2
            id="engagement-heading"
            className="mt-7 max-w-[460px] type-h2 text-ink"
          >
            Connect your office, clinicians, patients and caregivers.
          </h2>

          <p className="type-lead mt-5 max-w-[520px] text-grey-dk">
            HIPAA-compliant messaging and AI-driven patient engagement. Your
            staff use the Murphi app — patients and caregivers keep using
            ordinary text messages.
          </p>

          <ul className="mt-9 grid max-w-[520px] grid-cols-2 gap-x-6 gap-y-4 border-t border-grey-mid pt-7 max-600:grid-cols-1 max-600:gap-y-3.5">
            {FEATURES.map((feature) => (
              <li key={feature.label} className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] border border-brand-border/80 bg-brand-tint text-brand-dark">
                  <Icon name={feature.icon} width={15} height={15} />
                </span>
                <span className="text-[13.5px] font-bold tracking-[-0.012em] text-ink">
                  {feature.label}
                </span>
              </li>
            ))}
          </ul>

          <ul className="mt-8 grid max-w-[520px] gap-3.5">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="flex items-center gap-2.5 text-[13.5px] font-semibold text-grey-dk"
              >
                <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand-dark">
                  <Icon name="check" width={11} height={11} />
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          <Link
            href="/patient-engagement/"
            className="group mt-10 btn-primary max-600:w-full max-600:justify-center"
          >
            Explore Patient Engagement
            <Icon
              name="arrow"
              width={17}
              height={17}
              className="transition-transform duration-200 group-hover:translate-x-[3px]"
            />
          </Link>
        </div>

        {/* ── Right: the conversation, end to end ── */}
        <div className="min-w-0 max-1024:mx-auto max-1024:w-full max-1024:max-w-[560px]">
          <EngagementPanel />
        </div>
      </div>
    </section>
  );
}

/** White ground with one wash behind the panel. */
function SectionGround() {
  return null;
}

/* ══════════════════ the engagement panel ══════════════════ */

type Bubble = {
  text: string;
  from: "murphi" | "patient";
  sender?: string;
};

/* The thread, verbatim. `sender` is set only where the speaker changes. */
const THREAD: Bubble[] = [
  {
    text: "Reminder: SN visit tomorrow 9:00 AM. Reply C to confirm.",
    from: "murphi",
    sender: "Murphi · automated",
  },
  { text: "C", from: "patient" },
  {
    text: "Great — any symptoms to flag before the visit?",
    from: "murphi",
    sender: "Care team",
  },
  { text: "Slight swelling in left leg today.", from: "patient" },
  {
    text: "Thanks — noted for the nurse before she arrives.",
    from: "murphi",
  },
];

/**
 * One card, three zones and a footer: the office the staff work in, the SMS
 * hop, the patient's own phone, and where the exchange lands afterwards.
 *
 * The two zones are deliberately different surfaces — the office is brand
 * white-and-blue, the phone is neutral grey — so it reads at a glance that the
 * patient is on ordinary SMS with no app to install.
 */
function EngagementPanel() {
  return (
    <div className="@container relative">

      <div className="overflow-hidden rounded-hero border border-brand-border/60 bg-white shadow-[0_44px_100px_-56px_rgba(0,86,173,0.55)] max-600:rounded-panel">
        <OfficeZone />
        <SmsHop />
        <PhoneZone />
        <ChartFooter />
      </div>

      <SupportingNote />
    </div>
  );
}

/** The staff side: the app, the contact, the message going out. */
function OfficeZone() {
  return (
    <div className="px-5 py-4 max-600:px-4">
      <div className="flex items-center gap-2.5">
        <LogoMark size={24} className="shrink-0" />
        <p className="flex items-center gap-2 text-[12.5px] font-extrabold leading-none tracking-[-0.02em] text-ink">
          Murphi.ai
          <span className="text-grey-bdr" aria-hidden>
            ·
          </span>
          Office
        </p>
        <span className="type-micro ml-auto shrink-0 rounded-full border border-brand-border bg-brand-tint px-2.5 py-[5px] text-brand-dark">
          Staff app
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-[12px] font-extrabold tracking-[0.02em] text-grey-bg"
          aria-hidden
        >
          EJ
        </span>
        <div className="min-w-0">
          <p className="text-[13px] font-bold leading-none tracking-[-0.015em] text-ink">
            Eleanor James
          </p>
          <p className="mt-1.5 truncate text-[11px] font-semibold leading-none text-grey-dk/60">
            Hospice · Caregiver: Daughter
          </p>
        </div>
      </div>

      <div className="mt-3.5 rounded-tile border border-brand-border/70 bg-grey-bg px-3.5 py-3 max-600:px-3">
        <p className="text-[12px] font-semibold leading-relaxed text-ink">
          Reminder: SN visit tomorrow 9:00 AM. Reply C to confirm.
        </p>
        <div className="mt-2.5 flex items-center gap-2">
          <span className="type-micro text-grey-dk/45">Outgoing</span>
          <span className="ml-auto flex items-center gap-1 text-[9.5px] font-bold uppercase leading-none tracking-[0.06em] text-brand-deep">
            <Icon name="check" width={10} height={10} />
            Delivered
          </span>
        </div>
      </div>
    </div>
  );
}

/** The hop between the two surfaces: Murphi → SMS → Murphi. */
function SmsHop() {
  return (
    <div className="flex items-center gap-3 border-y border-grey-mid bg-grey-bg px-5 py-2.5 max-600:px-4">
      <FlowLine />

      <span className="flex shrink-0 items-center gap-2 text-[10px] font-bold uppercase leading-none tracking-[0.08em] text-grey-dk/50">
        Murphi
        <span className="text-brand" aria-hidden>
          →
        </span>
        <span className="rounded-full border border-brand-border bg-white px-2.5 py-[5px] text-brand-dark">
          SMS
        </span>
        <span className="text-brand" aria-hidden>
          →
        </span>
        Murphi
      </span>

      <FlowLine reverse />
    </div>
  );
}

/** A dashed run that drifts toward the centre chip. */
function FlowLine({ reverse }: { reverse?: boolean }) {
  return (
    <svg
      viewBox="0 0 60 6"
      preserveAspectRatio="none"
      className={cn("h-1.5 min-w-[16px] flex-1", reverse && "-scale-x-100")}
      fill="none"
      aria-hidden
    >
      <path
        d="M0 3 H60"
        stroke="#006AD6"
        strokeOpacity="0.35"
        strokeWidth="1.4"
        strokeDasharray="4 6"
        strokeLinecap="round"
        style={{ animation: "mp-flow 4.5s linear infinite" }}
      />
    </svg>
  );
}

/** The patient side: an ordinary handset, no app, neutral surface. */
function PhoneZone() {
  return (
    <div className="bg-grey-bg px-5 py-4 max-600:px-4">
      <div className="flex items-center gap-2.5">
        <span className="flex size-[26px] shrink-0 items-center justify-center rounded-[9px] border border-grey-mid bg-white text-grey-dk">
          <Icon name="phone" width={14} height={14} />
        </span>
        <p className="flex items-center gap-2 text-[12px] font-bold leading-none tracking-[-0.015em] text-grey-dk">
          Patient&apos;s Phone
          <span className="text-grey-bdr" aria-hidden>
            ·
          </span>
          Messages
        </p>
        <span className="type-micro ml-auto shrink-0 rounded-full border border-grey-mid bg-white px-2.5 py-[5px] text-grey-dk/55">
          No app
        </span>
      </div>

      <ol className="mt-3.5 grid gap-2.5">
        {THREAD.map((bubble, i) => {
          const fromPatient = bubble.from === "patient";

          return (
            <li
              key={bubble.text}
              className={cn(
                "mp-enter flex flex-col",
                fromPatient ? "items-end" : "items-start",
              )}
              style={{ animationDelay: `${0.14 * i}s` }}
            >
              {bubble.sender ? (
                <span className="type-micro mb-1.5 px-1 text-grey-dk/40">
                  {bubble.sender}
                </span>
              ) : null}

              <p
                className={cn(
                  "max-w-[80%] px-3.5 py-2.5 text-[12px] font-medium leading-relaxed max-600:max-w-[86%] max-600:px-3",
                  fromPatient
                    ? "rounded-tile rounded-br-[5px] bg-grey-mid text-ink"
                    : "rounded-tile rounded-bl-[5px] border border-grey-mid bg-white text-grey-dk",
                )}
              >
                {bubble.text}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Where the exchange lands. */
function ChartFooter() {
  return (
    <div className="flex items-center gap-3 border-t border-brand-border/70 bg-brand-ghost px-5 py-4 max-600:px-4 @max-[420px]:flex-col @max-[420px]:items-start @max-[420px]:gap-2.5">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] border border-white/70 bg-white text-brand-dark shadow-brand">
        <Icon
          name="sync"
          width={15}
          height={15}
          className="animate-[spin_7s_linear_infinite]"
        />
      </span>

      <div className="min-w-0">
        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase leading-none tracking-[0.08em] text-brand-deep">
          <Icon name="check" width={11} height={11} />
          Conversation captured
        </p>
        <p className="mt-2 flex flex-wrap items-center gap-x-1.5 text-[12.5px] font-extrabold leading-none tracking-[-0.02em] text-ink">
          Conversation
          <span className="text-brand" aria-hidden>
            →
          </span>
          patient chart
          <span className="text-brand" aria-hidden>
            →
          </span>
          EHR.
        </p>
      </div>
    </div>
  );
}

/** Supporting product information — quieter than the conversation. */
function SupportingNote() {
  return (
    <p className="mt-4 flex max-w-[460px] gap-2.5 px-1 text-[11.5px] font-medium leading-relaxed text-grey-dk/65 max-1024:mx-auto">
      <Icon
        name="shield"
        width={14}
        height={14}
        className="mt-[3px] shrink-0 text-brand/70"
      />
      Where appropriate, the exchange is stored directly in the patient record.
    </p>
  );
}
