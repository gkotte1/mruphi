"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

/**
 * Site-wide cookie notice. Rendered from the root layout so every route
 * shares one banner.
 *
 * Preference is stored under the existing `murphi-cookie-consent` key as
 * `accepted` or `rejected`. The server snapshot is "pending" so the first
 * paint matches hydration; the real value is read on the client.
 */

const KEY = "murphi-cookie-consent";

type Choice = "accepted" | "rejected";
type State = "pending" | "unset" | Choice;

const listeners = new Set<() => void>();
let cached: State | null = null;

function readStored(): Choice | null {
  try {
    const stored = window.localStorage.getItem(KEY);
    return stored === "accepted" || stored === "rejected" ? stored : null;
  } catch {
    return null;
  }
}

function getSnapshot(): State {
  if (cached === null) cached = readStored() ?? "unset";
  return cached;
}

function getServerSnapshot(): State {
  return "pending";
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== KEY) return;
    cached = null;
    onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function persist(choice: Choice) {
  try {
    window.localStorage.setItem(KEY, choice);
  } catch {
    /* Storage refused; still hide for this session. */
  }
  cached = choice;
  for (const notify of listeners) notify();
}

export default function CookieConsent() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (state !== "unset") return null;

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
          display: "flex",
          alignItems: "center",
          gap: 24,
          maxWidth: 1220,
          margin: "0 auto",
          padding: "18px 24px",
          background: "#FFFFFF",
          border: "1px solid #E3E3E3",
          borderRadius: 8,
          boxShadow:
            "0 1px 2px rgba(0,0,0,0.03), 0 14px 30px rgba(0,0,0,0.05)",
          boxSizing: "border-box",
        }}
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
          We use cookies to run this site and understand how it is used. You can
          accept or reject non-essential cookies - see our{" "}
          <Link
            href="/privacy-policy/"
            style={{
              color: "#007EFF",
              fontWeight: 700,
              textDecoration: "underline",
            }}
          >
            Privacy Policy
          </Link>
          .
        </p>

        <div
          className="murphi-cookie-actions"
          style={{
            display: "flex",
            flexShrink: 0,
            alignItems: "center",
            gap: 10,
          }}
        >
          <button
            type="button"
            className="murphi-cookie-reject"
            onClick={() => persist("rejected")}
          >
            Reject
          </button>
          <button
            type="button"
            className="murphi-cookie-accept"
            onClick={() => persist("accepted")}
          >
            Accept
          </button>
        </div>
      </div>

      <style>{`
        .murphi-cookie-reject,
        .murphi-cookie-accept {
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          line-height: 1;
          border-radius: 3px;
          padding: 12px 22px;
          cursor: pointer;
          white-space: nowrap;
        }
        .murphi-cookie-reject {
          background: #FFFFFF;
          color: #1A1A1A;
          border: 1px solid #E3E3E3;
        }
        .murphi-cookie-reject:hover {
          background: #F5F5F5;
        }
        .murphi-cookie-accept {
          background: #007EFF;
          color: #F5F5F5;
          border: none;
        }
        .murphi-cookie-accept:hover {
          background: #007EFF;
          color: #F5F5F5;
        }
        @media (max-width: 860px) {
          .murphi-cookie {
            padding: 0 16px 16px !important;
          }
          .murphi-cookie-card {
            flex-direction: column;
            align-items: stretch !important;
            gap: 16px !important;
            padding: 16px !important;
          }
          .murphi-cookie-actions {
            width: 100%;
          }
          .murphi-cookie-reject,
          .murphi-cookie-accept {
            flex: 1;
            min-height: 44px;
          }
        }
      `}</style>
    </div>
  );
}
