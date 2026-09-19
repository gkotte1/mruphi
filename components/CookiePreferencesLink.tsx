"use client";

import { openCookiePreferences } from "@/lib/consent";

/**
 * Reopens the cookie banner's Manage choices view. Split out as its own
 * client component so Footer itself can stay a server component.
 */
export function CookiePreferencesLink() {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className="murphi-cookie-footer-link"
      style={{
        font: "inherit",
        color: "#464646",
        background: "none",
        border: 0,
        padding: 0,
        margin: 0,
        textAlign: "left",
        cursor: "pointer",
      }}
    >
      Cookie Preferences
    </button>
  );
}
