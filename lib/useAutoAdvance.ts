"use client";

import { useCallback, useEffect, useState } from "react";

/** One state every two seconds - the interval the homepage showcase uses. */
export const STEP_MS = 2000;

/**
 * A looping index for a sequence that demonstrates itself.
 *
 * The timer is keyed on the current index rather than started once, so picking
 * an item by hand restarts its full interval instead of cutting it short, and
 * the sequence carries on from wherever the reader left it. Pointer or
 * keyboard focus holds it; leaving releases it.
 *
 * Motion is a preference: with it reduced the sequence never advances on its
 * own and holds the first state, though selecting one by hand still works.
 */
export function useAutoAdvance(length: number, ms: number = STEP_MS) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced || paused || length < 2) return;

    const timer = window.setTimeout(
      () => setIndex((i) => (i + 1) % length),
      ms,
    );
    return () => window.clearTimeout(timer);
  }, [index, paused, reduced, length, ms]);

  const select = useCallback((i: number) => setIndex(i), []);
  const hold = useCallback(() => setPaused(true), []);
  const release = useCallback(() => setPaused(false), []);

  return { index, select, hold, release, paused, reduced };
}
