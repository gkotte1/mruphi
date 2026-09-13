import type { ReactNode } from "react";
import { MONO } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * The hero visual: the request, the hand-off, and the ledger.
 *
 * 1 the message that reaches the patient, and the reply that settles it
 * 2 the hand-off - payment confirmed, ledger updated
 * 3 the ledger row the result lands in
 *
 * The arrangement is the one the page has always used. What changed is the
 * finish: both cards now share one shell - same radius, same hairline, same
 * single soft shadow, same head height and type - the reply bubble hugs its
 * own text instead of spanning the card as a blue bar, the hand-off is a quiet
 * ruled label rather than an animated marker, and the ledger rows sit on a
 * consistent rhythm.
 *
 * Every string is one the page already carries, and the two states the old
 * build set in green are on the brand blue, which is the only accent here.
 */

const LEDGER: { label: string; value: string; state?: boolean }[] = [
  { label: "Balance Status", value: "Outstanding → Paid", state: true },
  { label: "Method", value: "Debit Card" },
  { label: "Amount", value: "$84.00" },
];

export default function PaymentJourney() {
  return (
    <div className="mx-auto w-full max-w-[420px]">
      {/* ── 1 · The request, and the reply ── */}
      <Panel label="Patient’s Phone · Messages">
        <div className="flex flex-col items-start gap-2.5 px-5 py-5 max-720:px-4">
          <p className="w-fit max-w-[88%] rounded-[14px] rounded-bl-[4px] border border-[#E3E3E3] bg-[#F5F5F5] px-3.5 py-2.5 text-[12.5px] leading-[1.5] text-ink">
            Your balance is $84.00. Tap here to securely pay: murphi.pay/x82f
          </p>

          <p className="type-hl-inbox-title w-fit max-w-[88%] self-end rounded-[14px] rounded-br-[4px] border border-[#E3E3E3] bg-[#F5F5F5] px-3.5 py-2 text-ink">
            Paid
          </p>
        </div>
      </Panel>

      {/* ── 2 · The hand-off ── */}
      <div className="flex flex-col items-center gap-2 py-3" aria-hidden>
        <span className="h-3.5 w-px bg-[#E3E3E3]" />
        <span
          className={cn(
            MONO,
            "text-[10.5px] font-semibold tracking-[0.06em] text-[#878787] uppercase",
          )}
        >
          Payment confirmed &rarr; ledger updated
        </span>
        <span className="h-3.5 w-px bg-[#E3E3E3]" />
      </div>

      {/* ── 3 · The ledger ── */}
      <Panel label="EHR · Patient Ledger" status="Reconciled">
        <dl className="px-5 max-720:px-4">
          {LEDGER.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 border-b border-[#E3E3E3] py-3 last:border-b-0"
            >
              <dt className={cn(MONO, "shrink-0 text-[11px] text-[#878787]")}>
                {row.label}
              </dt>
              <dd
                className={cn(
                  "type-hl-inbox-title min-w-0 truncate text-right",
                  row.state ? "text-[#007EFF]" : "text-ink",
                )}
              >
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </Panel>
    </div>
  );
}

/**
 * One card. The shell matches the surfaces further down the page - same
 * radius, hairline and shadow - so the hero belongs to the same product.
 * The head carries a label, and a state chip only where there is a state to
 * report; nothing is added to fill the space when there isn't.
 */
function Panel({
  label,
  status,
  children,
}: {
  label: string;
  status?: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#E3E3E3] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)]">
      <div className="flex min-h-[44px] items-center justify-between gap-3 border-b border-[#E3E3E3] bg-[#F5F5F5] px-5 py-3 max-720:px-4">
        <span
          className={cn(
            MONO,
            "min-w-0 truncate text-[10.5px] font-semibold tracking-[0.06em] text-ink uppercase",
          )}
        >
          {label}
        </span>

        {status ? (
          <span
            className={cn(
              MONO,
              "flex shrink-0 items-center gap-1.5 rounded-full border border-[#E3E3E3] bg-[#F5F5F5] px-2.5 py-1 text-[10.5px] font-semibold tracking-[0.04em] text-[#007EFF] uppercase",
            )}
          >
            <span className="size-1.5 rounded-full bg-[#007EFF]" aria-hidden />
            {status}
          </span>
        ) : null}
      </div>

      {children}
    </div>
  );
}
