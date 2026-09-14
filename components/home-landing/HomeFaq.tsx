"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { FAQS } from "@/lib/faqs";

const ITEMS = FAQS.home;

export default function HomeFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      style={{
        padding: "96px 32px",
        background: "#FFFFFF",
      }}
    >
      <div
        className="faq-row"
        style={{
          maxWidth: 1220,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.2fr)",
          gap: 64,
          alignItems: "start",
        }}
      >
        <div>
          <h2
            className="hl-serif"
            style={{
              fontWeight: 500,
              fontSize: 42,
              lineHeight: 1.15,
              marginBottom: 18,
            }}
          >
            Frequently Asked Questions
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "#606060",
              lineHeight: 1.6,
              marginBottom: 24,
            }}
          >
            Quick answers about the platform, how it connects to your EHR, and
            how to get started.
          </p>
          <p style={{ fontSize: 16, color: "#606060", lineHeight: 1.6 }}>
            Can{"\u2019"}t find what you{"\u2019"}re looking for?{" "}
            <Link
              href="/contact-us/"
              style={{ color: "#007EFF", fontWeight: 700 }}
            >
              Contact us
            </Link>
          </p>
        </div>

        <div style={{ minWidth: 0 }}>
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            const panelId = `home-faq-panel-${i}`;
            const buttonId = `home-faq-button-${i}`;
            return (
              <div
                key={item.q}
                style={{
                  borderTop: i === 0 ? "1px solid #E3E3E3" : undefined,
                  borderBottom: "1px solid #E3E3E3",
                }}
              >
                <h3 style={{ margin: 0, fontSize: "inherit", fontWeight: "inherit" }}>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                      padding: "18px 0",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: "inherit",
                      fontSize: 16,
                      fontWeight: 700,
                      lineHeight: 1.4,
                      color: "#1A1A1A",
                    }}
                  >
                    <span style={{ minWidth: 0, overflowWrap: "anywhere" }}>{item.q}</span>
                    <Icon
                      name="chevron"
                      width={13}
                      height={13}
                      style={{
                        flexShrink: 0,
                        color: "#878787",
                        transform: isOpen ? "rotate(180deg)" : "none",
                        transition: "transform 0.2s",
                      }}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  style={{
                    display: isOpen ? "block" : "none",
                    padding: "0 0 18px",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: 16,
                      color: "#606060",
                      lineHeight: 1.65,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
