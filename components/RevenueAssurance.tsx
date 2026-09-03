import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/cn";

const USE_CASES = ["Coding", "OASIS", "POC", "PDGM", "ADRs"];

const BENEFITS = [
  "Fewer denials",
  "Protected reimbursement",
  "Faster ADR turnaround",
];

/**
 * The mirror of the Ambient AI section: visual left, message right.
 *
 * The columns are ordered rather than reordered in the markup — the heading
 * still comes first in the DOM, so the reading order matches the stacked
 * mobile order and the visual takes the left half only on wide screens.
 */
export default function RevenueAssurance() {
  return (
    <section
      aria-labelledby="revenue-heading"
      className="relative isolate overflow-hidden py-28 max-1024:py-20 max-600:py-16"
    >
      <SectionGround />

      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[minmax(0,54fr)_minmax(0,46fr)] items-start gap-x-16 px-10 max-1200:gap-x-12 max-1200:px-8 max-1024:grid-cols-1 max-1024:gap-y-14 max-600:gap-y-10 max-600:px-4">
        {/* ── Right on desktop, first on mobile: the message ── */}
        <div className="order-2 min-w-0 pt-2 max-1024:order-1 max-1024:mx-auto max-1024:max-w-[620px] max-1024:pt-0">
          <p className="type-label inline-flex items-center gap-2 rounded-full border border-brand-ghost bg-brand-tint px-3.5 py-1.5 text-brand-dark">
            <Icon name="chartup" width={13} height={13} />
            Revenue Assurance
          </p>

          <h2
            id="revenue-heading"
            className="mt-7 max-w-[460px] type-h2 text-ink"
          >
            Review every chart before it becomes a revenue problem.
          </h2>

          <p className="type-lead mt-5 max-w-[520px] text-grey-dk">
            Murphi can fetch the relevant record straight from your EHR — no
            manual upload required — analyze it, and write findings back where
            your team already works.
          </p>

          <ul className="mt-8 flex max-w-[520px] flex-wrap gap-2">
            {USE_CASES.map((useCase) => (
              <li
                key={useCase}
                className="rounded-full border border-brand-border/70 bg-brand-tint px-3 py-[7px] text-[12px] font-bold leading-none tracking-[-0.01em] text-brand-dark"
              >
                {useCase}
              </li>
            ))}
          </ul>

          <ul className="mt-8 grid max-w-[520px] gap-3.5 border-t border-grey-mid pt-7">
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
            href="/revenue-assurance/"
            className="group mt-10 btn-primary max-600:w-full max-600:justify-center"
          >
            Explore Revenue Assurance Use Cases
            <Icon
              name="arrow"
              width={17}
              height={17}
              className="transition-transform duration-200 group-hover:translate-x-[3px]"
            />
          </Link>
        </div>

        {/* ── Left on desktop, last on mobile: the review interface ── */}
        <div className="order-1 min-w-0 max-1024:order-2 max-1024:mx-auto max-1024:w-full max-1024:max-w-[560px]">
          <ChartReviewPanel />
        </div>
      </div>
    </section>
  );
}

/** A quiet band with one wash under the panel — rhythm against the white
    section above it, never a heavy block of colour. */
function SectionGround() {
  return null;
}

/* ═════════════════ the chart review panel ═════════════════ */

type Finding = {
  index: string;
  kind: "finding" | "opportunity";
  title: string;
  meta: string;
  icon: IconName;
};

const FINDINGS: Finding[] = [
  {
    index: "01",
    kind: "finding",
    title: "Homebound status not fully documented",
    meta: "Section G · Visit 3",
    icon: "doc",
  },
  {
    index: "02",
    kind: "finding",
    title: "Face-to-Face encounter date missing",
    meta: "Referral documentation",
    icon: "doc",
  },
  {
    index: "03",
    kind: "opportunity",
    title: "PDGM grouping opportunity identified",
    meta: "Coding review",
    icon: "chartup",
  },
];

/**
 * One application surface: the review header, the findings it returned, and
 * the state of the record either side of the review. Documentation gaps carry
 * a muted grey — attention, not alarm; the coding opportunity carries the
 * brand blue because it is not a problem.
 */
function ChartReviewPanel() {
  return (
    <div className="@container relative">

      <div className="overflow-hidden rounded-hero border border-brand-border/60 bg-white shadow-[0_44px_100px_-56px_rgba(0,86,173,0.55)] max-600:rounded-panel">
        <PanelHeader />
        <FindingList />
        <WorkflowFooter />
      </div>

      <SupportingNote />
    </div>
  );
}

/** What was reviewed, and what came back. */
function PanelHeader() {
  return (
    <div className="flex items-center gap-3 border-b border-grey-mid px-5 py-4 max-600:px-4 max-600:py-3.5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-card bg-brand text-grey-bg shadow-[0_10px_22px_-12px_rgba(0,106,214,0.9)]">
        <Icon name="scan" width={17} height={17} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 text-[13.5px] font-extrabold leading-none tracking-[-0.02em] text-ink">
          Chart Review
          <span className="text-grey-bdr" aria-hidden>
            ·
          </span>
          <span className="text-brand-dark">OASIS-E</span>
        </p>
        <p className="type-micro mt-2 text-grey-dk/55">AI review</p>
      </div>

      <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-brand-border bg-brand-tint px-2.5 py-[5px] text-[10px] font-bold leading-none text-brand-dark">
        <span className="relative flex size-1.5">
          <span
            className="absolute inline-flex size-full rounded-full bg-brand/60"
            style={{ animation: "mp-glow 3s ease-in-out infinite" }}
          />
          <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
        </span>
        3 Findings
      </span>
    </div>
  );
}

/** The findings, arriving one after another. */
function FindingList() {
  return (
    <ul className="grid gap-2.5 px-5 py-4 max-600:px-4">
      {FINDINGS.map((finding, i) => {
        const opportunity = finding.kind === "opportunity";

        return (
          <li
            key={finding.index}
            className={cn(
              "mp-enter rounded-tile border px-3.5 py-3 max-600:px-3",
              opportunity
                ? "border-brand-border/70 bg-grey-bg"
                : "border-grey-mid bg-grey-bg",
            )}
            style={{ animationDelay: `${0.16 * i}s` }}
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex size-[22px] shrink-0 items-center justify-center rounded-[7px]",
                  opportunity
                    ? "bg-brand-tint text-brand-dark"
                    : "bg-grey-bg text-brand-deep",
                )}
              >
                <Icon name={finding.icon} width={12} height={12} />
              </span>

              <span
                className={cn(
                  "type-micro",
                  opportunity ? "text-brand-dark" : "text-brand-deep",
                )}
              >
                {opportunity ? "Opportunity" : "Finding"}
              </span>

              <span className="type-micro ml-auto shrink-0 text-grey-dk/35">
                {finding.index}
              </span>
            </div>

            <p className="mt-2.5 text-[12.5px] font-bold leading-snug tracking-[-0.01em] text-ink">
              {finding.title}
            </p>
            <p className="mt-1.5 text-[11px] font-semibold leading-none text-grey-dk/60">
              {finding.meta}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

/** Where the record came from, and where it is going back to. */
function WorkflowFooter() {
  return (
    <div className="flex items-center gap-3 border-t border-brand-border/70 bg-brand-ghost px-5 py-4 max-600:px-4 @max-[400px]:flex-col @max-[400px]:items-stretch @max-[400px]:gap-2.5">
      <span className="flex min-w-0 items-center gap-2 rounded-full border border-white/70 bg-white/85 px-3 py-2">
        <Icon
          name="server"
          width={13}
          height={13}
          className="shrink-0 text-brand-dark"
        />
        <span className="truncate text-[11.5px] font-bold leading-none text-grey-dk">
          Fetched from EHR
        </span>
        <Icon
          name="check"
          width={11}
          height={11}
          className="shrink-0 text-brand-deep"
        />
      </span>

      <Connector />

      <span className="flex min-w-0 items-center gap-2 rounded-full border border-brand-border bg-white px-3 py-2 shadow-brand">
        <Icon
          name="sync"
          width={13}
          height={13}
          className="shrink-0 animate-[spin_7s_linear_infinite] text-brand-dark"
        />
        <span className="truncate text-[11.5px] font-extrabold leading-none tracking-[-0.01em] text-ink">
          Write-back ready
        </span>
      </span>
    </div>
  );
}

/** A dashed run between the two states, flowing slowly toward the write-back. */
function Connector() {
  return (
    <svg
      viewBox="0 0 60 10"
      preserveAspectRatio="none"
      className="h-2.5 min-w-[28px] flex-1 @max-[400px]:h-4 @max-[400px]:w-full @max-[400px]:flex-none"
      fill="none"
      aria-hidden
    >
      <path
        d="M2 5 H50"
        stroke="#006AD6"
        strokeOpacity="0.4"
        strokeWidth="1.4"
        strokeDasharray="4 6"
        strokeLinecap="round"
        style={{ animation: "mp-flow 4s linear infinite" }}
      />
      <path
        d="m50 1.6 4 3.4-4 3.4"
        stroke="#006AD6"
        strokeOpacity="0.65"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Supporting product information — quieter than anything in the panel. */
function SupportingNote() {
  return (
    <p className="mt-4 flex max-w-[460px] gap-2.5 px-1 text-[11.5px] font-medium leading-relaxed text-grey-dk/65 max-1024:mx-auto">
      <Icon
        name="layers"
        width={14}
        height={14}
        className="mt-[3px] shrink-0 text-brand/70"
      />
      Murphi can pull referral, F2F, OASIS, POC and visit notes directly from
      your EHR. Manual PDF upload is also supported.
    </p>
  );
}
