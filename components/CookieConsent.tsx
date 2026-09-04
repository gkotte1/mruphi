"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

/**
 * The cookie notice.
 *
 * It asks once. Either answer is stored under the same key, so the banner does
 * not return on a later visit whichever button was pressed, and a visitor who
 * has already chosen never sees it again.
 *
 * The choice lives in localStorage, which the server cannot read, so the state
 * is read through useSyncExternalStore rather than an effect: the server (and
 * the hydrating client) see "unknown" and render nothing, and the real value
 * arrives once hydration is done. That avoids both a hydration mismatch and a
 * banner that flashes in for anyone who has already answered.
 *
 * It does not block the page - no overlay, no scroll lock, no focus trap. The
 * site stays fully usable whether or not the notice is answered.
 */

const KEY = "murphi-cookie-consent";

type Choice = "accepted" | "rejected";
/** "unknown" only before hydration; "unset" means the visitor has not chosen. */
type State = "unknown" | "unset" | Choice;

const listeners = new Set<() => void>();
let cached: State | null = null;

/** Private windows and blocked site data throw here rather than returning
    null, so a failure counts as "not asked yet". */
function readStored(): State {
  try {
    const stored = window.localStorage.getItem(KEY);
    return stored === "accepted" || stored === "rejected" ? stored : "unset";
  } catch {
    return "unset";
  }
}

function getSnapshot(): State {
  if (cached === null) cached = readStored();
  return cached;
}

function getServerSnapshot(): State {
  return "unknown";
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);

  /* Answering in one tab settles the others too. */
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

function save(choice: Choice) {
  try {
    window.localStorage.setItem(KEY, choice);
  } catch {
    /* Storage refused. The banner still closes for this session. */
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
      className="fixed inset-x-0 bottom-0 z-[900] px-4 pb-4 max-600:px-3 max-600:pb-3"
    >
      <div className="mx-auto flex w-full max-w-[1000px] items-center gap-6 rounded-panel border border-grey-mid bg-white px-6 py-4 shadow-[0_10px_30px_-24px_rgba(15,29,84,0.35)] max-900:flex-col max-900:items-stretch max-900:gap-4 max-600:px-5">
        <p className="min-w-0 flex-1 text-[13.5px] leading-relaxed text-grey-dk">
          We use cookies to run this site and understand how it is used. You can
          accept or reject non-essential cookies - see our{" "}
          <Link
            href="/privacy-policy/"
            className="font-semibold text-brand-dark underline decoration-brand-border underline-offset-[3px] transition-colors duration-200 hover:text-brand-deep hover:decoration-brand"
          >
            Privacy Policy
          </Link>
          .
        </p>

        <div className="flex shrink-0 items-center gap-3 max-600:flex-col max-600:items-stretch">
          <button
            type="button"
            onClick={() => save("rejected")}
            className="rounded-[10px] border border-grey-mid bg-white px-5 py-3 text-[14px] leading-none font-bold tracking-[-0.01em] text-grey-dk transition-colors duration-200 hover:border-brand-border hover:bg-brand-tint hover:text-brand-dark"
          >
            Reject
          </button>

          <button
            type="button"
            onClick={() => save("accepted")}
            className="rounded-[10px] bg-brand px-5 py-3 text-[14px] leading-none font-bold tracking-[-0.01em] text-white transition-colors duration-200 hover:bg-brand-dark active:bg-brand-deep"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
