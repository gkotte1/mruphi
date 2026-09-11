import { Icon, type IconName } from "@/components/icons";
import { LogoMark } from "@/components/Logo";
import { MONO, Tick } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * The hero visual: many rosters in, one standard out.
 *
 * The page's argument is that forty clients run through a single layer and come
 * back the same way, so the visual is a hub rather than a stack. Every client
 * feeds a collector on the left, the mark sits at the centre, and the same four
 * results fan back out on the right. Work travels the lines in both directions,
 * slowly, so the direction of flow reads at a glance.
 *
 * The mark is the project's own LogoMark component - no new or generated image.
 * Every string is the one the page already carried.
 */

/** Rows are a fixed height so each bus can align to the row centres. */
const ROW = "h-9";
const BUS = "inset-y-[18px]";

const OUTPUT_ICONS: Record<string, IconName> = {
  Coding: "code",
  OASIS: "doc",
  QA: "sealcheck",
  RCM: "chartup",
};

export default function ClientHub({
  clients,
  outputs,
  foot,
}: {
  clients: string[];
  /** The results the page names, returned to every client. */
  outputs: string[];
  foot: string;
}) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,0.72fr)] items-center max-900:grid-cols-1 max-900:gap-0">
        {/* ── The work coming in ── */}
        <div className="relative grid grid-cols-[minmax(0,1fr)_26px] gap-y-3 max-900:grid-cols-1">
          {clients.map((client, i) => (
            <div key={client} className="contents">
              <div
                className={cn(
                  ROW,
                  "flex items-center gap-2 rounded-[8px] border border-[#E3E3E3] bg-white px-3 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_8px_18px_rgba(0,0,0,0.04)]",
                )}
              >
                <span
                  className="flex size-5 shrink-0 items-center justify-center rounded-[6px] border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]"
                  aria-hidden
                >
                  <Icon name="community" width={11} height={11} />
                </span>
                <span
                  className={cn(MONO, "min-w-0 flex-1 truncate text-[11px] font-semibold text-ink")}
                >
                  {client}
                </span>
              </div>

              <span className={cn(ROW, "flex items-center max-900:hidden")} aria-hidden>
                <Wire delay={`${i * 0.4}s`} />
              </span>
            </div>
          ))}

          <span
            className={cn("absolute right-0 w-px bg-[#E3E3E3] max-900:hidden", BUS)}
            aria-hidden
          />
        </div>

        {/* ── The layer everything runs through ── */}
        <div className="flex items-center max-900:flex-col">
          <Feed />

          <div className="relative shrink-0">
            {/* Two quiet rings, so the hub reads as a system rather than a card. */}
            <span
              className="absolute -inset-3 rounded-[34px] border border-[#E3E3E3]/60"
              aria-hidden
            />
            <span
              className="absolute -inset-6 rounded-[42px] border border-[#E3E3E3]/35 motion-reduce:hidden"
              style={{ animation: "mp-glow 3.6s ease-in-out infinite" }}
              aria-hidden
            />

            <div className="relative flex size-[104px] flex-col items-center justify-center gap-2 rounded-[26px] border border-[#E3E3E3] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.05)]">
              <LogoMark size={34} />
              <span
                className={cn(
                  MONO,
                  "text-[10px] font-semibold uppercase tracking-[0.06em] text-ink",
                )}
              >
                Murphi.ai
              </span>
            </div>
          </div>

          <Feed delay=".5s" />
        </div>

        {/* ── What comes back ── */}
        <div className="relative grid grid-cols-[26px_minmax(0,1fr)] gap-y-3 max-900:grid-cols-1">
          <span
            className={cn("absolute left-0 w-px bg-[#E3E3E3] max-900:hidden", BUS)}
            aria-hidden
          />

          {outputs.map((output, i) => (
            <div key={output} className="contents">
              <span className={cn(ROW, "flex items-center max-900:hidden")} aria-hidden>
                <Wire delay={`${0.6 + i * 0.4}s`} />
              </span>

              <div
                className={cn(
                  ROW,
                  "flex items-center gap-2 rounded-[8px] border border-[#E3E3E3] bg-[#F5F5F5] px-3",
                )}
              >
                <span
                  className="flex size-5 shrink-0 items-center justify-center rounded-[6px] bg-[#007EFF] text-white"
                  aria-hidden
                >
                  <Icon
                    name={OUTPUT_ICONS[output] ?? "sealcheck"}
                    width={11}
                    height={11}
                  />
                </span>
                <span
                  className={cn(MONO, "min-w-0 flex-1 truncate text-[11px] font-semibold text-ink")}
                >
                  {output}
                </span>
                <Tick className="size-3 shrink-0 text-[#007EFF]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Where the results land. */}
      <div className="mt-7 flex justify-center">
        <span
          className={cn(
            MONO,
            "inline-flex max-w-full items-center gap-2 rounded-full border border-[#E3E3E3] bg-white px-3.5 py-1.5 text-[11px] text-[#878787]",
          )}
        >
          <span
            className="flex size-4 shrink-0 items-center justify-center rounded-[5px] bg-[#F5F5F5] text-[#007EFF]"
            aria-hidden
          >
            <Icon name="exchange" width={10} height={10} />
          </span>
          <span className="min-w-0 truncate">{foot}</span>
        </span>
      </div>
    </div>
  );
}

/** A stem between a row and its bus, with work travelling along it. */
function Wire({ delay = "0s" }: { delay?: string }) {
  return (
    <span className="relative h-px w-full bg-[#E3E3E3]">
      <span
        className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-[#007EFF] motion-reduce:hidden"
        style={{ animation: `mp-flow-pulse 3.2s ease-in-out infinite ${delay}` }}
      />
    </span>
  );
}

/** The short run between a bus and the hub. Vertical once the columns stack. */
function Feed({ delay = "0s" }: { delay?: string }) {
  return (
    <span
      className="relative flex h-px w-7 shrink-0 bg-[#E3E3E3] max-900:my-4 max-900:h-7 max-900:w-px"
      aria-hidden
    >
      {/* The travelling dot rides `left`, so it is dropped once the run
          turns vertical rather than animating along the wrong axis. */}
      <span
        className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-[#007EFF] motion-reduce:hidden max-900:hidden"
        style={{ animation: `mp-flow-pulse 3.2s ease-in-out infinite ${delay}` }}
      />
    </span>
  );
}
