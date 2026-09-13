import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "@/components/module-page/Reveal";
import { IpWrap } from "@/components/inner-page/Shell";

export default function InnerHero({
  current,
  parent = { label: "AI Modules", href: "/#ambient-ai" },
  eyebrow,
  badge,
  title,
  storyTag,
  story,
  lede,
  trust,
  primaryHref = "/contact-us/",
  primaryLabel = "Request Demo",
  visual,
}: {
  current: string;
  parent?: { label: string; href: string };
  eyebrow: string;
  badge?: string;
  title: ReactNode;
  storyTag?: string;
  story?: ReactNode;
  lede: ReactNode;
  trust: string[];
  primaryHref?: string;
  primaryLabel?: string;
  /** Accepted so existing page calls stay valid; no longer rendered. */
  secondaryHref?: string;
  secondaryLabel?: string;
  hideSecondary?: boolean;
  visual: ReactNode;
}) {
  return (
    <>
      <IpWrap>
        <nav
          className="ip-mono"
          aria-label="Breadcrumb"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 8,
            paddingTop: 28,
            fontSize: 12.5,
            color: "#878787",
          }}
        >
          <Link href="/">Home</Link>
          <span style={{ color: "#B2B2B2" }}>/</span>
          <Link href={parent.href}>{parent.label}</Link>
          <span style={{ color: "#B2B2B2" }}>/</span>
          <span style={{ color: "#1A1A1A", fontWeight: 600 }}>{current}</span>
        </nav>
      </IpWrap>

      <section style={{ padding: "40px 0 72px" }}>
        <IpWrap className="ip-hero-grid">
          <Reveal>
            {badge ? (
              <span
                className="ip-mono"
                style={{
                  marginBottom: 16,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  borderRadius: 20,
                  border: "1px solid #E3E3E3",
                  background: "#F5F5F5",
                  padding: "6px 12px",
                  fontSize: 10.5,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#878787",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#B2B2B2",
                  }}
                  aria-hidden
                />
                {badge}
              </span>
            ) : null}

            <p className="ip-eyebrow" style={{ color: "#007EFF" }}>
              {eyebrow}
            </p>

            <h1 className="ip-h1 ip-serif" style={{ marginTop: 16 }}>
              {title}
            </h1>

            {storyTag && story ? (
              <div
                className="ip-hero-story"
                style={{
                  marginTop: 18,
                  background: "#F5F5F5",
                  border: "1px solid #E3E3E3",
                  borderRadius: 8,
                  padding: "20px 24px",
                  minWidth: 0,
                }}
              >
                <span
                  className="ip-mono"
                  style={{
                    display: "block",
                    marginBottom: 10,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 0.6,
                    textTransform: "uppercase",
                    color: "#878787",
                  }}
                >
                  {storyTag}
                </span>
                <p
                  className="ip-serif ip-hero-story-body"
                  style={{
                    maxWidth: "62ch",
                    fontSize: 17,
                    fontStyle: "italic",
                    lineHeight: 1.5,
                    color: "#1A1A1A",
                  }}
                >
                  {story}
                </p>
              </div>
            ) : null}

            <p className="ip-lead" style={{ marginTop: 18, maxWidth: "56ch", fontSize: 18 }}>
              {lede}
            </p>

            <div
              style={{
                marginTop: 40,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 14,
              }}
            >
              <a href={primaryHref} className="ip-btn">
                {primaryLabel}
              </a>
            </div>

            <div
              style={{
                marginTop: 40,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                gap: 28,
                fontSize: 12.5,
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "#606060",
              }}
            >
              {trust.map((item, i) => (
                <span key={item} style={{ display: "contents" }}>
                  {i > 0 ? <span style={{ color: "#B2B2B2" }}>·</span> : null}
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal>{visual}</Reveal>
        </IpWrap>
      </section>
    </>
  );
}

/** Centered listing/company hero: same type system, no product visual. */
export function SimpleHero({
  current,
  parent,
  eyebrow,
  badge,
  badgeIcon,
  title,
  lede,
  ledeAlign = "center",
  ledeMax,
  ledeClassName,
  align = "center",
  paddingBottom = 0,
  actions,
  children,
}: {
  current: string;
  parent?: { label: string; href: string };
  eyebrow?: string;
  badge?: string;
  badgeIcon?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  ledeAlign?: "left" | "center";
  /**
   * Optional lede max-width. `"none"` uses the full 1220px wrap, left-aligned,
   * instead of a centered narrow measure. Other pages keep the default.
   */
  ledeMax?: string;
  /** Optional extra class names for the hero description. */
  ledeClassName?: string;
  /** Accepted so existing page calls stay valid; heading width is shared CSS. */
  titleMax?: string;
  align?: "left" | "center";
  /** Extra space below the hero block. Default 0 matches existing pages. */
  paddingBottom?: number;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <>
      <IpWrap>
        <nav
          className="ip-mono"
          aria-label="Breadcrumb"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 8,
            paddingTop: 28,
            fontSize: 12.5,
            color: "#878787",
          }}
        >
          <Link href="/">Home</Link>
          {parent ? (
            <>
              <span style={{ color: "#B2B2B2" }}>/</span>
              <Link href={parent.href}>{parent.label}</Link>
            </>
          ) : null}
          <span style={{ color: "#B2B2B2" }}>/</span>
          <span style={{ color: "#1A1A1A", fontWeight: 600 }}>{current}</span>
        </nav>
      </IpWrap>

      <section style={{ padding: `40px 0 ${paddingBottom}px` }}>
        <IpWrap style={{ textAlign: align }}>
          <Reveal>
            {eyebrow ? (
              <p className="ip-eyebrow" style={{ color: "#007EFF" }}>
                {eyebrow}
              </p>
            ) : null}

            {badge ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: align === "center" ? "center" : "flex-start",
                }}
              >
                <span
                  className="ip-mono"
                  style={{
                    marginBottom: 16,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    borderRadius: 20,
                    border: "1px solid #E3E3E3",
                    background: "#F5F5F5",
                    padding: "6px 12px",
                    fontSize: 10.5,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "#878787",
                  }}
                >
                  {badgeIcon ?? (
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#B2B2B2",
                      }}
                      aria-hidden
                    />
                  )}
                  {badge}
                </span>
              </div>
            ) : null}

            <h1
              className="ip-h1 ip-serif"
              style={{
                marginTop: badge || eyebrow ? 16 : 0,
                marginLeft: align === "center" ? "auto" : 0,
                marginRight: align === "center" ? "auto" : 0,
              }}
            >
              {title}
            </h1>

            {lede ? (
              <p
                className={ledeClassName ?? "ip-lead"}
                style={{
                  marginTop: 18,
                  marginLeft:
                    ledeMax === "none" || align !== "center" ? 0 : "auto",
                  marginRight:
                    ledeMax === "none" || align !== "center" ? 0 : "auto",
                  maxWidth:
                    ledeMax ?? (ledeAlign === "left" ? "68ch" : "56ch"),
                  textAlign: ledeAlign,
                  ...(ledeClassName ? undefined : { fontSize: 18 }),
                }}
              >
                {lede}
              </p>
            ) : null}

            {actions ? (
              <div
                style={{
                  marginTop: 40,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: align === "center" ? "center" : "flex-start",
                  gap: 14,
                }}
              >
                {actions}
              </div>
            ) : null}

            {children ? <div style={{ marginTop: 40 }}>{children}</div> : null}
          </Reveal>
        </IpWrap>
      </section>
    </>
  );
}
