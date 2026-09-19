// Cookie consent state.
//
// A decision is stored per category as a dated, versioned record - not a bare
// flag - so we can say *when* consent was given, *which* policy it answered
// and *what* it covered, re-ask when any of those go stale, and gate tags per
// category. The record lives in localStorage and is mirrored into a
// first-party cookie so a CDN or future server can read it too.
//
// Categories follow Privacy Policy Section 5 (Cookies, Analytics, and
// Tracking) exactly: Essential, Functional, Analytics and Performance, and
// Advertising. Essential is always on and never offered as a choice.
//
// Tags must check `hasConsentFor(...)` before running. The layout bootstrap
// sets Google Consent Mode defaults to "denied" before any tag can load, and
// `writeConsent` updates them, so adding GA/GTM later is consent-aware with
// no extra wiring.

export const CONSENT_STORAGE_KEY = "murphi-cookie-consent";
export const CONSENT_EVENT = "murphi:consent-changed";
export const OPEN_PREFERENCES_EVENT = "murphi:open-cookie-preferences";

/**
 * Version of the cookie/privacy policy a decision was given against. Bump
 * this when that policy changes materially: every visitor is then asked
 * again. Matches the "Version 2.0" line in content/legal/privacy-policy.md.
 */
export const CONSENT_POLICY_VERSION = "2.0";

/** A decision older than this is treated as unanswered and the banner returns. */
export const CONSENT_MAX_AGE_DAYS = 180;

const CONSENT_MAX_AGE_MS = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;

/** Categories a visitor can decide on. Essential is always on and never listed. */
export type ConsentCategory = "functional" | "analytics" | "advertising";

export type ConsentDecision = Record<ConsentCategory, boolean>;

export const ACCEPT_ALL: ConsentDecision = {
  functional: true,
  analytics: true,
  advertising: true,
};
export const REJECT_ALL: ConsentDecision = {
  functional: false,
  analytics: false,
  advertising: false,
};

/** What we can show if asked to demonstrate a visitor's choice. */
export type ConsentRecord = {
  categories: ConsentDecision;
  /** ISO 8601 timestamp of when the choice was made. */
  timestamp: string;
  /** Policy version the choice was given against. */
  version: string;
};

/**
 * Cookies third-party tags set, mapped to the category that governs them, so
 * refusing one category clears only its own cookies and leaves a still-granted
 * category's cookies alone.
 */
const NON_ESSENTIAL_COOKIE_PREFIXES: Record<string, ConsentCategory> = {
  _ga: "analytics", // Google Analytics
  _gid: "analytics", // Google Analytics
  _hj: "analytics", // Hotjar
  _clck: "analytics", // Microsoft Clarity
  _clsk: "analytics", // Microsoft Clarity
  _gcl: "advertising", // Google Ads click id
  _fbp: "advertising", // Meta Pixel
};

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function parseRecord(raw: string | null): ConsentRecord | null {
  if (!raw) return null;
  try {
    // Anything that is not a well-formed record - including the flat
    // "accepted"/"rejected" string the earlier build stored - counts as
    // unanswered, because we cannot say when, against what policy, or over
    // what scope it was given.
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    const { categories, timestamp, version } = parsed as Record<string, unknown>;
    if (typeof timestamp !== "string" || typeof version !== "string") return null;
    if (typeof categories !== "object" || categories === null) return null;
    const { functional, analytics, advertising } = categories as Record<string, unknown>;
    if (
      typeof functional !== "boolean" ||
      typeof analytics !== "boolean" ||
      typeof advertising !== "boolean"
    ) {
      return null;
    }
    return { categories: { functional, analytics, advertising }, timestamp, version };
  } catch {
    return null;
  }
}

function isCurrent(record: ConsentRecord): boolean {
  if (record.version !== CONSENT_POLICY_VERSION) return false;
  const givenAt = Date.parse(record.timestamp);
  if (Number.isNaN(givenAt)) return false;
  return Date.now() - givenAt < CONSENT_MAX_AGE_MS;
}

/** The stored decision, or null when none applies (absent, stale, or superseded). */
export function readConsentRecord(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    // Storage can be blocked (private mode, strict browser settings).
  }
  let record = parseRecord(raw);
  if (!record) record = parseRecord(readCookie(CONSENT_STORAGE_KEY));
  return record && isCurrent(record) ? record : null;
}

/**
 * Global Privacy Control - a browser-level opt-out signal that California,
 * Colorado, Connecticut and other US state privacy laws require sites to
 * honour when they apply. Distinct from Do Not Track, which Section 5 of the
 * Privacy Policy explicitly does not respond to - GPC is a legal opt-out
 * signal under state law, DNT is not.
 */
export function isGlobalPrivacyControlEnabled(): boolean {
  if (typeof navigator === "undefined") return false;
  return (
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl === true
  );
}

/**
 * The consent that applies right now - what any tag must check before running.
 *
 * An explicit decision always wins: someone who chooses to enable a category
 * has overridden their browser default deliberately. Absent one, a GPC
 * signal counts as a refusal of everything rather than as "not asked yet".
 */
export function readConsent(): ConsentDecision | null {
  const explicit = readConsentRecord()?.categories;
  if (explicit) return explicit;
  return isGlobalPrivacyControlEnabled() ? REJECT_ALL : null;
}

/** The check a tag makes before it is allowed to run. */
export function hasConsentFor(category: ConsentCategory): boolean {
  return readConsent()?.[category] === true;
}

function clearRefusedCookies(decision: ConsentDecision) {
  if (typeof document === "undefined") return;
  const domains = [undefined, window.location.hostname, `.${window.location.hostname}`];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name) continue;
    const prefix = Object.keys(NON_ESSENTIAL_COOKIE_PREFIXES).find((p) => name.startsWith(p));
    if (!prefix) continue;
    // Only clear cookies whose governing category was refused; a still-granted
    // category's cookies are left alone.
    if (decision[NON_ESSENTIAL_COOKIE_PREFIXES[prefix]]) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${
        domain ? `; domain=${domain}` : ""
      }`;
    }
  }
}

function updateConsentMode(decision: ConsentDecision) {
  const grant = (allowed: boolean) => (allowed ? "granted" : "denied");
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("consent", "update", {
    analytics_storage: grant(decision.analytics),
    functionality_storage: grant(decision.functional),
    personalization_storage: grant(decision.functional),
    ad_storage: grant(decision.advertising),
    ad_user_data: grant(decision.advertising),
    ad_personalization: grant(decision.advertising),
  });
}

// Banner visibility is external, browser-only state: it is derived from what
// is stored, plus an explicit re-open. Exposed as a store so the component
// can read it with useSyncExternalStore instead of setting state from an
// effect.
let reopenedByVisitor = false;
const bannerListeners = new Set<() => void>();

function emitBannerChange() {
  for (const listener of bannerListeners) listener();
}

export function subscribeBanner(listener: () => void) {
  bannerListeners.add(listener);
  return () => void bannerListeners.delete(listener);
}

export function getBannerSnapshot(): boolean {
  // Derived on every read (a primitive, so the store stays stable) - never a
  // cache that can drift out of step with what is actually stored.
  //
  // Keyed on an *explicit* decision: a GPC visitor is already protected
  // (their effective consent is "reject all"), but they have not been asked,
  // so the banner stays available in case they want to opt in.
  return reopenedByVisitor || readConsentRecord() === null;
}

/** The static HTML is shared by every visitor, so it never includes the banner. */
export function getBannerServerSnapshot(): boolean {
  return false;
}

export function writeConsent(decision: ConsentDecision) {
  if (typeof window === "undefined") return;

  const record: ConsentRecord = {
    categories: { ...decision },
    timestamp: new Date().toISOString(),
    version: CONSENT_POLICY_VERSION,
  };
  const serialised = JSON.stringify(record);

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, serialised);
  } catch {
    // Fall through to the cookie below.
  }
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_STORAGE_KEY}=${encodeURIComponent(serialised)}; path=/; max-age=${
    CONSENT_MAX_AGE_MS / 1000
  }; SameSite=Lax${secure}`;

  clearRefusedCookies(record.categories);
  updateConsentMode(record.categories);
  reopenedByVisitor = false;
  emitBannerChange();
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: record }));
}

/** Re-open the banner so a visitor can change a previous choice. */
export function openCookiePreferences() {
  if (typeof window === "undefined") return;
  reopenedByVisitor = true;
  emitBannerChange();
  window.dispatchEvent(new CustomEvent(OPEN_PREFERENCES_EVENT));
}
