import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { Layers, MONO, Tick } from "@/components/module-page/ui";
import { IpEyebrow, IpWrap } from "@/components/inner-page/Shell";
import Reveal from "@/components/module-page/Reveal";
import { cn } from "@/lib/cn";

export type OutcomeIconName = "clock" | "tick" | "layers" | "shield" | "info" | "bolt";

function OutcomeIcon({ icon }: { icon: OutcomeIconName }) {
  const shared = { viewBox: "0 0 24 24", fill: "none", className: "size-7" };

  if (icon === "clock") {
    return (
      <svg {...shared} aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M12 7v5l3.5 2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (icon === "layers") return <Layers className="size-7" />;

  if (icon === "shield") {
    return (
      <svg {...shared} aria-hidden>
        <path
          d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="m9 12 2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (icon === "info") {
    return (
      <svg {...shared} aria-hidden>
        <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (icon === "bolt") {
    return (
      <svg {...shared} aria-hidden>
        <path
          d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return <Tick className="size-7" />;
}

export function Outcomes({
  heading,
  intro,
  outcomes,
}: {
  heading: string;
  intro?: string;
  outcomes: { title: string; sub: string; icon: OutcomeIconName }[];
}) {
  return (
    <section className="ip-section ip-band">
      <IpWrap>
        <div style={{ maxWidth: 640, margin: "0 auto 64px", textAlign: "center" }}>
          <h2 className="ip-h2 ip-serif" style={{ marginBottom: intro ? 18 : 0 }}>
            {heading}
          </h2>
          {intro ? <p className="ip-lead">{intro}</p> : null}
        </div>

        <div
          className="ip-ruled ip-stats"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          {outcomes.map((outcome) => (
            <div
              key={outcome.title}
              style={{ padding: "36px 24px", textAlign: "center" }}
            >
              <div
                style={{
                  margin: "0 auto 16px",
                  display: "flex",
                  width: 40,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  border: "1.5px solid #007EFF",
                  color: "#007EFF",
                }}
              >
                <OutcomeIcon icon={outcome.icon} />
              </div>
              <div className="type-hl-card-title mb-2 text-ink">
                {outcome.title}
              </div>
              <div className="type-hl-card-body">
                {outcome.sub}
              </div>
            </div>
          ))}
        </div>
      </IpWrap>
    </section>
  );
}

export function FinalCta({
  heading,
  body,
  primaryLabel = "Request Demo",
}: {
  heading: ReactNode;
  body: string;
  primaryLabel?: string;
}) {
  return (
    <section
      style={{
        background: "#006AD6",
        padding: "120px 32px",
        textAlign: "center",
      }}
    >
      <h2
        className="ip-serif ip-cta-h"
        style={{
          fontWeight: 500,
          fontSize: 44,
          lineHeight: 1.15,
          maxWidth: 720,
          margin: "0 auto 20px",
          color: "#ffffff",
        }}
      >
        {heading}
      </h2>
      <p
        style={{
          fontSize: 17,
          color: "#CCE5FF",
          maxWidth: 520,
          margin: "0 auto 40px",
          lineHeight: 1.6,
        }}
      >
        {body}
      </p>
      <a href="/contact-us/" className="ip-btn-on-blue">
        {primaryLabel}
      </a>
    </section>
  );
}

export function StoryRule({ children }: { children: string }) {
  return (
    <div
      className={cn(
        MONO,
        "ip-mono my-6 flex items-center gap-4 text-[11.5px] uppercase tracking-[0.06em] text-[#878787]",
      )}
    >
      <span className="h-px flex-1 bg-[#E3E3E3]" aria-hidden />
      <span className="flex items-center gap-2.5">
        <span
          className="flex size-5 items-center justify-center rounded-full border border-[#E3E3E3] bg-[#F5F5F5] text-[#007EFF]"
          aria-hidden
        >
          <Icon name="exchange" width={11} height={11} />
        </span>
        {children}
      </span>
      <span className="h-px flex-1 bg-[#E3E3E3]" aria-hidden />
    </div>
  );
}

export function SoonCallout({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex items-start gap-3.5 rounded-[8px] border border-[#E3E3E3] bg-[#F5F5F5] px-[18px] py-4"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="mt-0.5 size-5 shrink-0 text-[#007EFF]"
        aria-hidden
      >
        <path
          d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
      <p className="text-[13.5px] leading-[1.55] text-ink">{children}</p>
    </div>
  );
}

export function FetchNote({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 flex items-start gap-3 rounded-[8px] border border-[#E3E3E3] bg-white px-[18px] py-4">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="mt-px size-[18px] shrink-0 text-[#007EFF]"
        aria-hidden
      >
        <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <p className="text-[13.5px] leading-[1.5] text-[#606060]">{children}</p>
    </div>
  );
}

export function TechTicker({ items }: { items: string[] }) {
  const doubled = [...items, ...items];

  return (
    <section className="ip-band" style={{ padding: "22px 0" }}>
      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div
          className="flex w-max items-center motion-reduce:animate-none"
          style={{ animation: "mp-ticker 26s linear infinite" }}
        >
          {doubled.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="px-[26px] text-[15px] font-semibold whitespace-nowrap text-[#606060]"
            >
              {item} <span className="font-normal text-[#B2B2B2]">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EhrSplit({
  heading,
  lede,
  disclaimer,
  children,
}: {
  heading: string;
  lede: string;
  disclaimer?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id="ehr" className="ip-section">
      <IpWrap>
        <Reveal>
          <div
            className="ip-split"
            style={{
              display: "grid",
              gridTemplateColumns: "0.88fr 1.12fr",
              alignItems: "center",
              gap: 64,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <IpEyebrow>EHR Integration</IpEyebrow>
              <h2 className="ip-h2 ip-serif" style={{ marginTop: 16, marginBottom: 18 }}>
                {heading}
              </h2>
              <p className="ip-lead" style={{ maxWidth: "52ch", fontSize: 18 }}>
                {lede}
              </p>
              {disclaimer ? (
                <p style={{ marginTop: 20, fontSize: 13, lineHeight: 1.6, color: "#878787" }}>
                  {disclaimer}
                </p>
              ) : null}
            </div>
            <div style={{ minWidth: 0 }}>{children}</div>
          </div>
        </Reveal>
      </IpWrap>
    </section>
  );
}
