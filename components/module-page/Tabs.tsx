"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The source pages' `[data-tabs]` group: pill buttons over a single visible
 * panel, the active pill filled #1A1A1A. Only the active panel is rendered, as in
 * the original, where the others carry `display:none`.
 */
export default function Tabs({
  tabs,
}: {
  tabs: { id: string; label: string; panel: ReactNode }[];
}) {
  const [active, setActive] = useState(tabs[0]?.id);

  return (
    <div>
      <div className="mb-[26px] flex flex-wrap gap-2" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === active}
            onClick={() => setActive(tab.id)}
            className={cn(
              "rounded-full border px-[18px] py-2.5 text-[13.5px] font-semibold transition-colors duration-200",
              tab.id === active
                ? "border-ink bg-ink text-white"
                : "border-grey-mid bg-white text-grey-500 hover:border-brand hover:text-brand",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div key={tab.id} role="tabpanel" hidden={tab.id !== active}>
          {tab.panel}
        </div>
      ))}
    </div>
  );
}
