import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/cn";

/* Copy is fixed. The discipline lists are arrays only so the separator can be
   set lighter than the words — the strings themselves are unchanged. */
const DISCIPLINES: { label: string; icon: IconName; items: string[] }[] = [
  {
    label: "Home Health",
    icon: "home",
    items: ["OASIS", "SN", "PT", "OT", "ST"],
  },
  {
    label: "Hospice",
    icon: "heart",
    items: ["HOPE", "RN/SN", "Aide", "Chaplain", "Social Worker"],
  },
];

const BENEFITS = [
  "Less documentation time",
  "Faster chart completion",
  "Greater clinician capacity",
];

export default function AmbientDictation() {
  return (
    <section
      aria-labelledby="ambient-heading"
      className="relative isolate overflow-hidden py-28 max-1024:py-20 max-600:py-16"
    >
      <SectionGround />

      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[minmax(0,46fr)_minmax(0,54fr)] items-start gap-x-16 px-10 max-1200:gap-x-12 max-1200:px-8 max-1024:grid-cols-1 max-1024:gap-y-14 max-600:gap-y-10 max-600:px-4">
        {/* ── Left: the capability, explained ── */}
        <div className="min-w-0 max-1024:mx-auto max-1024:max-w-[620px]">
          <p className="type-label inline-flex items-center gap-2 rounded-full border border-brand-ghost bg-brand-tint px-3.5 py-1.5 text-brand-dark">
            <Icon name="mic" width={13} height={13} />
            Ambient AI &amp; Dictation
          </p>

          <h2
            id="ambient-heading"
            className="mt-7 max-w-[440px] type-h2 text-ink"
          >
            Give clinicians their time back.
          </h2>

          <p className="type-lead mt-5 max-w-[520px] text-grey-dk">
            Murphi fetches the patient record from your EHR, listens to the
            encounter, and generates OASIS or HOPE notes within minutes. Or a
            clinician dictates for three minutes and SN, PT, OT and ST notes are
            populated automatically.
          </p>

          {/* Both service lines, side by side — hairlines, not cards. */}
          <div className="mt-9 grid max-w-[540px] gap-5 border-t border-grey-mid pt-7">
            {DISCIPLINES.map((discipline) => (
              <div key={discipline.label} className="flex gap-3.5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] border border-brand-border/80 bg-brand-tint text-brand-dark">
                  <Icon name={discipline.icon} width={16} height={16} />
                </span>

                <div className="min-w-0">
                  <p className="type-label text-brand-dark">
                    {discipline.label}
                  </p>
                  <p className="mt-2 flex flex-wrap items-center gap-x-2 text-[13.5px] font-semibold leading-relaxed text-grey-dk">
                    {discipline.items.map((item, i) => (
                      <span key={item} className="flex items-center gap-2">
                        {i > 0 ? (
                          <span className="text-grey-bdr" aria-hidden>
                            ·
                          </span>
                        ) : null}
                        {item}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <ul className="mt-8 flex max-w-[540px] flex-wrap gap-x-7 gap-y-3">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="flex items-center gap-2 text-[13.5px] font-semibold text-grey-dk"
              >
                <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand-dark">
                  <Icon name="check" width={11} height={11} />
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          <Link
            href="/ambient-ai-dictation/"
            className="group mt-10 btn-primary max-600:w-full max-600:justify-center"
          >
            Explore Ambient AI &amp; Dictation
            <Icon
              name="arrow"
              width={17}
              height={17}
              className="transition-transform duration-200 group-hover:translate-x-[3px]"
            />
          </Link>
        </div>

        {/* ── Right: the workflow, demonstrated. Set slightly lower so the
               heading keeps the top of the composition. ── */}
        <div className="min-w-0 pt-14 max-1024:mx-auto max-1024:w-full max-1024:max-w-[560px] max-1024:pt-0">
          <AmbientPanel />
        </div>
      </div>
    </section>
  );
}

/** A white ground with one soft blue wash under the panel. */
function SectionGround() {
  return null;
}

/* ══════════════════ the product panel ═════════════════════ */

const NOTE_TYPES = ["OASIS", "HOPE", "SN", "PT", "OT", "ST"];

/**
 * One interface, read top to bottom:
 * listening -> patient record -> dictation -> the notes it populates -> EHR.
 *
 * Sections are divided by hairlines inside a single card rather than being
 * separate floating boxes, so the whole reads as one product surface.
 */
function AmbientPanel() {
  return (
    <div className="@container relative">

      <div className="overflow-hidden rounded-hero border border-brand-border/60 bg-white shadow-[0_44px_100px_-56px_rgba(0,86,173,0.55)] max-600:rounded-panel">
        <PanelHeader />
        <ListeningRow />
        <RecordRow />
        <DictationRow />
        <SyncFooter />
      </div>
    </div>
  );
}

/** Title and live state. */
function PanelHeader() {
  return (
    <div className="flex items-center gap-3 border-b border-grey-mid px-5 py-4 max-600:px-4 max-600:py-3.5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-card bg-brand text-grey-bg shadow-[0_10px_22px_-12px_rgba(0,106,214,0.9)]">
        <Icon name="mic" width={17} height={17} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[13.5px] font-extrabold leading-none tracking-[-0.02em] text-ink">
          Ambient AI + Voice Dictation
        </p>
        <p className="type-micro mt-2 text-grey-dk/55">Encounter in progress</p>
      </div>

      <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-brand-border bg-brand-tint px-2.5 py-[5px] text-[10px] font-bold leading-none text-brand-dark">
        <span className="relative flex size-1.5">
          <span
            className="absolute inline-flex size-full rounded-full bg-brand/60"
            style={{ animation: "mp-glow 2.6s ease-in-out infinite" }}
          />
          <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
        </span>
        Listening…
      </span>
    </div>
  );
}

/** The waveform — motion only, contained, never a giant visualiser. */
function ListeningRow() {
  /* A fixed profile: fuller through the middle, quieter at the edges. */
  const bars = [
    28, 40, 34, 56, 46, 68, 58, 80, 66, 92, 74, 100, 84, 96, 70, 88, 62, 78,
    54, 86, 66, 94, 72, 82, 58, 70, 48, 62, 40, 54, 34, 46, 30, 38, 26, 32,
  ];

  return (
    <div className="px-5 py-4 max-600:px-4">
      <div className="rounded-[16px] border border-brand-border/60 bg-brand-ghost px-4 py-3.5 max-600:px-3">
        <div className="flex items-center justify-between gap-3">
          <span className="type-micro text-brand-deep/65">Encounter audio</span>
          <span className="type-micro text-brand-dark">Capturing</span>
        </div>

        <div
          className="mt-3 flex h-[46px] items-center gap-[3px] max-600:h-[38px]"
          aria-hidden
        >
          {bars.map((height, i) => (
            <span
              key={`${height}-${i}`}
              className={cn(
                "min-w-[2px] flex-1 rounded-full",
                height > 70 ? "bg-brand/70" : "bg-brand/35",
              )}
              style={{
                height: `${height}%`,
                transformOrigin: "center",
                animation: `mp-wave 2.8s ease-in-out infinite ${(i % 12) * 0.14}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** The record is already there — state, shown quietly. */
function RecordRow() {
  return (
    <div className="flex items-center gap-3 border-t border-grey-mid px-5 py-4 max-600:px-4">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] border border-brand-border bg-brand-tint text-brand-dark">
        <Icon name="server" width={15} height={15} />
      </span>

      <p className="min-w-0 flex-1 truncate text-[12.5px] font-bold tracking-[-0.01em] text-ink">
        Patient record fetched from EHR
      </p>

      <span className="flex shrink-0 items-center gap-1 rounded-full border border-brand-pale bg-grey-bg px-2.5 py-[5px] text-[9.5px] font-bold uppercase leading-none tracking-[0.06em] text-brand-deep">
        <Icon name="check" width={10} height={10} />
        Synced
      </span>
    </div>
  );
}

/** Three minutes in, six note types out. */
function DictationRow() {
  return (
    <div className="border-t border-grey-mid px-5 py-5 max-600:px-4">
      <div className="flex items-center gap-4 @max-[380px]:flex-col @max-[380px]:items-start @max-[380px]:gap-3">
        <div className="min-w-0">
          <p className="type-micro text-grey-dk/50">Input</p>
          <p className="mt-2 text-[17px] font-extrabold leading-none tracking-[-0.03em] text-ink">
            3-minute dictation
          </p>
        </div>

        <span
          className="flex h-px min-w-[24px] flex-1 items-center @max-[380px]:hidden"
          aria-hidden
        >
          <span className="h-px w-full bg-brand/40" />
          <Icon
            name="arrow"
            width={14}
            height={14}
            className="-ml-1 shrink-0 text-brand"
          />
        </span>

        <div className="min-w-0 shrink-0 @max-[380px]:text-left">
          <p className="type-micro text-grey-dk/50">Output</p>
          <p className="mt-2 text-[12.5px] font-bold leading-none text-brand-dark">
            6 note types populated
          </p>
        </div>
      </div>

      <ul className="mt-4 grid grid-cols-3 gap-2.5 max-600:gap-2">
        {NOTE_TYPES.map((note, i) => (
          <li
            key={note}
            className="mp-enter flex items-center justify-center gap-1.5 rounded-card border border-brand-border/70 bg-grey-bg px-2 py-2.5 max-600:px-1.5"
            style={{ animationDelay: `${0.12 * i}s` }}
          >
            <Icon
              name="check"
              width={11}
              height={11}
              className="shrink-0 text-brand"
            />
            <span className="truncate text-[11.5px] font-bold tracking-[-0.01em] text-ink">
              {note}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The outcome, on the one tinted surface in the card. */
function SyncFooter() {
  return (
    <div className="flex items-center gap-3 border-t border-brand-border/70 bg-brand-ghost px-5 py-4 max-600:px-4">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] border border-white/70 bg-white text-brand-dark shadow-brand">
        <Icon
          name="sync"
          width={15}
          height={15}
          className="animate-[spin_7s_linear_infinite]"
        />
      </span>

      <div className="min-w-0">
        <p className="text-[11px] font-semibold leading-none text-brand-deep/70">
          6 note types across Home Health &amp; Hospice
        </p>
        <p className="mt-2 text-[13.5px] font-extrabold leading-none tracking-[-0.02em] text-ink">
          Synced &rarr; EHR in minutes
        </p>
      </div>

      <span className="ml-auto flex shrink-0 items-center gap-1 text-[9.5px] font-bold uppercase leading-none tracking-[0.06em] text-brand-deep max-600:hidden">
        <Icon name="check" width={11} height={11} />
        Complete
      </span>
    </div>
  );
}
