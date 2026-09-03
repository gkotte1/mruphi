import { Icon } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import { Breadcrumb } from "@/components/module-page/sections";
import {
  ArrowGlyph,
  CONTAINER,
  Eyebrow,
  MONO,
  PrimaryButton,
  SecondaryButton,
} from "@/components/module-page/ui";
import {
  CaptureWave,
  DocTiles,
  FieldRows,
} from "@/components/ambient-ai-dictation/Capture";
import { cn } from "@/lib/cn";

const GENERATED = [
  "Patient ambulates independently with front-wheeled walker.",
  "Wound site clean and dry, no signs of infection.",
  "Medication list reconciled — no changes since last visit.",
  "Homebound status confirmed and documented.",
];

const NOTE_TYPES = ["OASIS", "HOPE", "SN", "PT", "OT", "ST"];

export default function Hero() {
  return (
    <>
      <Breadcrumb current="Ambient AI & Dictation" />

      <section className="bg-grey-bg pt-7 pb-16 max-720:pt-6 max-720:pb-10">
        <div
          className={cn(
            CONTAINER,
            "grid grid-cols-2 items-center gap-16 max-1080:grid-cols-1 max-1080:gap-12",
          )}
        >
          <Reveal>
            <Eyebrow>Ambient AI &amp; Dictation</Eyebrow>

            <h1 className="mt-4 max-w-[16ch] type-h1 text-ink">
              Complete OASIS, HOPE, and All Other Notes Within Minutes.
            </h1>

            <div className="mt-[18px] rounded-r-tile border-l-[3px] border-brand bg-grey-bg px-7 py-6 max-720:px-5">
              <span
                className={cn(
                  MONO,
                  "mb-2.5 block text-[11px] uppercase tracking-[0.07em] text-brand",
                )}
              >
                9:40 PM
              </span>
              <p className="max-w-[62ch] text-[17px] italic leading-[1.62] text-ink">
                {"Maria finished her last visit at 4. It's now almost ten, and she's still finishing the OASIS from patient two. Tomorrow starts at 8."}
              </p>
            </div>

            <p className="mt-2 max-w-[56ch] text-[18px] leading-[1.6] text-grey-500">
              Murphi listens while she works, or takes a short dictation
              afterward, and syncs the finished note to her EHR within minutes —
              OASIS, HOPE, SN, PT, OT, ST, together, the same day.
            </p>

            <div className="mt-[30px] flex flex-wrap items-center gap-3.5 max-720:flex-col max-720:items-stretch">
              <PrimaryButton href="/contact-us/">
                Request Demo
                <ArrowGlyph />
              </PrimaryButton>
              <SecondaryButton href="#how">See How It Works</SecondaryButton>
            </div>

            <div
              className={cn(
                MONO,
                "mt-[30px] flex flex-wrap items-center gap-[9px] text-[12px] tracking-[0.02em] text-ink-muted",
              )}
            >
              HIPAA <span className="text-grey-mid">·</span> SOC 2{" "}
              <span className="text-grey-mid">·</span> Human review before
              write-back
            </div>
          </Reveal>

          <Reveal>
            <MockCard />
          </Reveal>
        </div>
      </section>
    </>
  );
}

/**
 * The hero visualisation: four connected surfaces rather than one panel.
 *
 *   capture         the encounter being recorded
 *   documentation   what the model wrote into the chart
 *   note types      the documents one encounter produced
 *   sync            where they went
 *
 * The surfaces sit at different widths and elevations so the composition
 * reads as layered product UI, and the offsets fall away under 600px so
 * nothing can overflow on a phone.
 */
function MockCard() {
  return (
    <div className="relative mx-auto max-w-[460px]">
      {/* Where the record came from. */}
      <span
        className={cn(
          MONO,
          "mb-3 inline-flex items-center gap-2 rounded-full border border-grey-mid bg-white px-3 py-1.5 text-[10.5px] uppercase tracking-[0.06em] text-grey-500 shadow-[0_8px_20px_-12px_rgba(15,29,84,0.18)]",
        )}
      >
        <Icon name="server" width={11} height={11} className="shrink-0 text-brand" />
        Patient record fetched from EHR
      </span>

      {/* ── Capture ── */}
      <div className="relative z-20 overflow-hidden rounded-tile border border-grey-mid bg-white shadow-[0_18px_44px_-28px_rgba(15,29,84,0.18)]">
        <div
          className={cn(
            MONO,
            "flex items-center justify-between gap-3 bg-brand px-5 py-2.5 text-[11px] uppercase tracking-[0.03em] text-white/85 max-600:px-4",
          )}
        >
          <span className="flex min-w-0 items-center gap-2">
            <Icon name="mic" width={15} height={15} className="shrink-0" />
            <span className="truncate">Ambient AI + Voice Dictation</span>
          </span>
          <span className="flex shrink-0 items-center gap-2 text-white">
            <span className="size-1.5 rounded-full bg-current" aria-hidden />
            Listening
          </span>
        </div>

        <div className="px-5 py-3 max-600:px-4">
          <CaptureWave quiet />
        </div>
      </div>

      <Thread />

      {/* ── Documentation, stepped in beneath the capture card ── */}
      <div className="relative z-10 mx-auto w-[94%] overflow-hidden rounded-tile border border-grey-mid bg-white shadow-[0_18px_44px_-28px_rgba(15,29,84,0.18)] max-600:w-full">
        <div
          className={cn(
            MONO,
            "flex items-center gap-2 border-b border-grey-mid px-5 py-2.5 text-[10.5px] uppercase tracking-[0.06em] text-ink-muted max-600:px-4",
          )}
        >
          <Icon name="doc" width={11} height={11} className="shrink-0 text-brand" />
          <span className="min-w-0 truncate">Visit understood → fields populating</span>
        </div>

        <div className="px-5 py-3 max-600:px-4">
          <FieldRows lines={GENERATED} quiet />
        </div>
      </div>

      <Thread />

      {/* ── What the encounter produced ── */}
      <div className="relative z-10 mx-auto w-[88%] rounded-tile border border-grey-mid bg-grey-bg p-3.5 shadow-[0_18px_44px_-28px_rgba(15,29,84,0.18)] max-600:w-full">
        <DocTiles items={NOTE_TYPES} quiet />

        <p
          className={cn(
            MONO,
            "mt-2.5 text-center text-[10.5px] uppercase tracking-[0.06em] text-ink-muted",
          )}
        >
          6 note types, one encounter
        </p>
      </div>

      <Thread />

      {/* ── Where they went ── */}
      <div
        className={cn(
          MONO,
          "mx-auto flex w-[76%] items-center justify-center gap-2 rounded-full bg-brand px-4 py-2 text-[10.5px] uppercase tracking-[0.06em] text-white shadow-[0_8px_20px_-12px_rgba(15,29,84,0.18)] max-600:w-full",
        )}
      >
        <Icon name="check" width={12} height={12} className="shrink-0" />
        <span className="min-w-0 truncate">Clinician review → synced to EHR</span>
      </div>
    </div>
  );
}

/** The run between two surfaces — a hairline, no travelling marker. */
function Thread() {
  return (
    <div className="mx-auto h-4 w-px bg-brand-pale" aria-hidden />
  );
}
