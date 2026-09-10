import { Icon, type IconName } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import { CONTAINER, Kicker, SECTION, SectionHead } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * Two sections that were two grids of the same rectangle. Each now takes
 * the composition its content actually calls for:
 *
 *   Capabilities   a ruled two-column ledger - a spec sheet of details that
 *                  affect reimbursement, scanned by title, not read as boxes
 *   Built For      one surface divided into three, because the section is
 *                  about one piece of infrastructure with three properties
 *
 * Every string is the one that was already here.
 */

type Card = { title: string; body: string; icon: IconName };

const CAPABILITIES: Card[] = [
  {
    title: "Multi-Language Conversations",
    icon: "community",
    body: "Capture and document visits conducted in the patient's preferred language, so nothing gets lost in translation.",
  },
  {
    title: "EHR Syncing",
    icon: "sync",
    body: "Referral attachments, schedules and record data sync in - the completed note writes back to the same chart.",
  },
  {
    title: "Referral Summaries",
    icon: "doc",
    body: "A packet that used to take an evening to read becomes a short summary, prefilled into the chart before the first visit.",
  },
  {
    title: "Medications",
    icon: "scan",
    body: "Add or update medications by voice or by photographing the label - instead of typing each one into the EHR by hand.",
  },
  {
    title: "Wound Care",
    icon: "heart",
    body: "Photograph a wound and describe it by voice; the description and image attach to the chart together.",
  },
  {
    title: "M1800 & GG Items",
    icon: "chartup",
    body: "Functional status items that affect reimbursement are answered from what's actually said and observed during the visit.",
  },
];

const BUILT_FOR: Card[] = [
  {
    title: "Multi-Speaker Aware",
    icon: "mic",
    body: "Follows a visit with more than one voice in the room - patient, caregiver, clinician - and attributes what was said to the right person.",
  },
  {
    title: "Built for Home Health & Hospice",
    icon: "home",
    body: "Trained on the specific structure of Home Health and Hospice documentation, not adapted from a general medical scribe.",
  },
  {
    title: "Near Real-Time EHR Sync",
    icon: "sync",
    body: "Notes move to your EHR without changing how your team already works inside it.",
  },
];

/* ── Capabilities: a ruled ledger, not a grid of boxes ────── */

export function Capabilities() {
  return (
    <section className={cn("border-t border-grey-mid", SECTION)}>
      <div className={CONTAINER}>
        <Kicker>Built for the Details That Affect Reimbursement</Kicker>
        <SectionHead>A Comprehensive Suite of Capabilities</SectionHead>

        <Reveal>
          <ul className="grid grid-cols-2 gap-x-14 border-t border-grey-mid max-1080:gap-x-10 max-720:grid-cols-1">
            {CAPABILITIES.map((item) => (
              <li
                key={item.title}
                className="group flex items-start gap-4 border-b border-grey-mid py-[22px] max-600:gap-3.5"
              >
                <span className="mt-px flex size-9 shrink-0 items-center justify-center rounded-[10px] border border-brand-pale bg-brand-tint text-brand-dark transition-colors duration-200 group-hover:border-transparent group-hover:bg-brand group-hover:text-grey-bg">
                  <Icon name={item.icon} width={17} height={17} />
                </span>

                <div className="min-w-0">
                  <h4 className="text-[15.5px] font-bold leading-snug tracking-[-0.012em] text-ink">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 text-[13px] leading-[1.55] text-grey-500">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Built for: one surface, three properties ─────────────── */

export function BuiltFor() {
  return (
    <section className={cn("border-t border-grey-mid", SECTION)}>
      <div className={CONTAINER}>
        <Kicker>Proprietary AI Infrastructure</Kicker>
        <SectionHead>Built Specifically for Post-Acute Documentation</SectionHead>

        <Reveal>
          <div className="grid grid-cols-3 divide-x divide-grey-mid overflow-hidden rounded-panel border border-grey-mid bg-white shadow-[0_16px_40px_rgba(15,29,84,.06)] max-900:grid-cols-1 max-900:divide-x-0 max-900:divide-y">
            {BUILT_FOR.map((item) => (
              <div key={item.title} className="flex flex-col p-7 max-600:p-5">
                <span className="flex size-10 items-center justify-center rounded-tile border border-brand-pale bg-brand-tint text-brand-dark">
                  <Icon name={item.icon} width={19} height={19} />
                </span>

                <h4 className="mt-5 text-[16px] font-bold leading-snug tracking-[-0.015em] text-ink">
                  {item.title}
                </h4>
                <p className="mt-2.5 text-[13px] leading-[1.6] text-grey-500">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
