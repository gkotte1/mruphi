"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ACCEPT_ALL,
  getBannerServerSnapshot,
  getBannerSnapshot,
  OPEN_PREFERENCES_EVENT,
  readConsent,
  REJECT_ALL,
  subscribeBanner,
  writeConsent,
  type ConsentCategory,
  type ConsentDecision,
} from "@/lib/consent";

/**
 * Site-wide cookie notice, rendered once from the root layout.
 *
 * Categories follow Privacy Policy Section 5 (Cookies, Analytics, and
 * Tracking) exactly: Essential, Functional, Analytics and Performance, and
 * Advertising. Essential is explained in the opening line rather than shown
 * as a switch that cannot be moved.
 */
const OPTIONAL_CATEGORIES: { key: ConsentCategory; name: string; description: string }[] = [
  {
    key: "functional",
    name: "Functional",
    description: "Remembers preferences such as your settings, so the site behaves the way you left it.",
  },
  {
    key: "analytics",
    name: "Analytics and Performance",
    description: "Helps us see which pages are useful and how visitors move through the site, so we can improve it.",
  },
  {
    key: "advertising",
    name: "Advertising",
    description: "Measures marketing effectiveness across our own and partner sites.",
  },
];

export default function CookieConsent() {
  // Whether the banner shows depends on what the browser already stored, so
  // it is read as external state (never part of the shared static HTML).
  const open = useSyncExternalStore(subscribeBanner, getBannerSnapshot, getBannerServerSnapshot);

  const [showChoices, setShowChoices] = useState(false);
  const [draft, setDraft] = useState<ConsentDecision>(REJECT_ALL);

  const decide = useCallback((decision: ConsentDecision) => {
    writeConsent(decision);
    setShowChoices(false);
  }, []);

  const openChoices = useCallback(() => {
    // Start from whatever currently applies, so an existing choice is shown.
    setDraft(readConsent() ?? REJECT_ALL);
    setShowChoices(true);
  }, []);

  // A "Cookie Preferences" link elsewhere on the site (e.g. the footer) goes
  // straight to the choices list, since someone arriving that way is there to
  // change a specific setting.
  useEffect(() => {
    window.addEventListener(OPEN_PREFERENCES_EVENT, openChoices);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, openChoices);
  }, [openChoices]);

  if (!open) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="murphi-cookie"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 900,
        boxSizing: "border-box",
        width: "100%",
        maxWidth: "100%",
        padding: "0 32px 24px",
        pointerEvents: "none",
        fontFamily: 'var(--font-hl-sans), "Manrope", sans-serif',
      }}
    >
      <div
        className="murphi-cookie-card"
        style={{
          pointerEvents: "auto",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          maxWidth: showChoices ? 620 : 1220,
          margin: "0 auto",
          padding: "20px 24px",
          background: "#FFFFFF",
          border: "1px solid #E3E3E3",
          borderRadius: 8,
          boxShadow: "0 1px 2px rgba(0,0,0,0.03), 0 14px 30px rgba(0,0,0,0.05)",
          boxSizing: "border-box",
        }}
      >
        <div
          className="murphi-cookie-row"
          style={{ display: "flex", alignItems: "center", gap: 24 }}
        >
          <p
            style={{
              flex: 1,
              minWidth: 0,
              margin: 0,
              fontSize: 14,
              lineHeight: 1.55,
              fontWeight: 400,
              color: "#606060",
              overflowWrap: "anywhere",
            }}
          >
            We use cookies to run this site and understand how it is used. Essential
            cookies are always on; nothing else runs unless you allow it - see our{" "}
            <Link
              href="/privacy-policy/"
              style={{ color: "#007EFF", fontWeight: 700, textDecoration: "underline" }}
            >
              Privacy Policy
            </Link>
            .
          </p>

          <div
            className="murphi-cookie-actions"
            style={{ display: "flex", flexShrink: 0, alignItems: "center", gap: 10 }}
          >
            {showChoices ? (
              <button
                type="button"
                className="murphi-cookie-accept"
                onClick={() => decide(draft)}
              >
                Save choices
              </button>
            ) : (
              <button
                type="button"
                className="murphi-cookie-accept"
                onClick={() => decide(ACCEPT_ALL)}
              >
                Accept all
              </button>
            )}
            <button
              type="button"
              className="murphi-cookie-reject"
              onClick={() => decide(REJECT_ALL)}
            >
              Reject all
            </button>
            {!showChoices && (
              <button
                type="button"
                className="murphi-cookie-manage"
                onClick={openChoices}
              >
                Manage choices
              </button>
            )}
          </div>
        </div>

        {/* Grows in place rather than opening a modal over the page - this is
            a choice about cookies, not a task that should block reading the
            site. */}
        {showChoices && (
          <div className="murphi-cookie-categories">
            {OPTIONAL_CATEGORIES.map((category) => (
              <label key={category.key} className="murphi-cookie-category">
                <input
                  type="checkbox"
                  checked={draft[category.key]}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, [category.key]: event.target.checked }))
                  }
                  style={{ marginTop: 3, width: 16, height: 16, flexShrink: 0, cursor: "pointer" }}
                />
                <span>
                  <span style={{ display: "block", fontSize: 13.5, fontWeight: 700, color: "#1A1A1A" }}>
                    {category.name}
                  </span>
                  <span style={{ display: "block", fontSize: 12.5, color: "#606060", lineHeight: 1.55, marginTop: 2 }}>
                    {category.description}
                  </span>
                </span>
              </label>
            ))}
          </div>
        )}

        <button
          type="button"
          className="murphi-cookie-dismiss"
          // Closing without choosing must not be read as agreement, so it
          // refuses everything optional - the same as "Reject all".
          aria-label="Close and reject optional cookies"
          onClick={() => decide(REJECT_ALL)}
        >
          ×
        </button>
      </div>

      <style>{`
        .murphi-cookie-reject,
        .murphi-cookie-accept,
        .murphi-cookie-manage {
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          line-height: 1;
          border-radius: 3px;
          padding: 12px 22px;
          cursor: pointer;
          white-space: nowrap;
        }
        .murphi-cookie-reject,
        .murphi-cookie-manage {
          background: #FFFFFF;
          color: #1A1A1A;
          border: 1px solid #E3E3E3;
        }
        .murphi-cookie-reject:hover,
        .murphi-cookie-manage:hover {
          background: #F5F5F5;
        }
        .murphi-cookie-accept {
          background: #007EFF;
          color: #F5F5F5;
          border: none;
        }
        .murphi-cookie-accept:hover {
          background: #0068D6;
        }
        .murphi-cookie-dismiss {
          position: absolute;
          top: 10px;
          right: 12px;
          background: none;
          border: 0;
          padding: 2px 6px;
          font-size: 19px;
          line-height: 1;
          color: #878787;
          cursor: pointer;
          font-family: inherit;
        }
        .murphi-cookie-dismiss:hover {
          color: #1A1A1A;
        }
        .murphi-cookie-categories {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 16px 0 2px;
          border-top: 1px solid #E3E3E3;
        }
        .murphi-cookie-category {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          cursor: pointer;
        }
        @media (max-width: 860px) {
          .murphi-cookie {
            padding: 0 16px 16px !important;
          }
          .murphi-cookie-card {
            padding: 16px !important;
          }
          .murphi-cookie-row {
            flex-direction: column;
            align-items: stretch !important;
            gap: 16px !important;
          }
          .murphi-cookie-actions {
            width: 100%;
            flex-wrap: wrap;
          }
          .murphi-cookie-reject,
          .murphi-cookie-accept,
          .murphi-cookie-manage {
            flex: 1;
            min-height: 44px;
          }
        }
      `}</style>
    </div>
  );
}
