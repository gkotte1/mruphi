"use client";

import { useState } from "react";
import { Icon, type IconName } from "@/components/icons";
import Reveal from "@/components/module-page/Reveal";
import { MONO } from "@/components/module-page/ui";
import { cn } from "@/lib/cn";

/**
 * What changes, by role.
 *
 * The selector keeps the pill treatment the section already used; what changes
 * is the panel — the sentence now carries the weight it deserves, and the
 * modules read as the same tiles the hero uses, so a role connects visibly to
 * the workflows that serve it.
 *
 * Every panel stays in the DOM. Every string comes from the page.
 */

export type Role = {
  id: string;
  label: string;
  what: string;
  modules: string[];
  soonModule?: string;
};

const ROLE_MODULE_ICONS: Record<string, IconName> = {
  "Ambient AI": "mic",
  "Ambient AI & Dictation": "mic",
  "Revenue Assurance": "chartup",
  "Patient Payments": "card",
  "Referral → NOA": "route",
  "AI-Driven RCM": "exchange",
};

export default function Roles({ roles }: { roles: Role[] }) {
  const [active, setActive] = useState(roles[0]?.id);

  return (
    <Reveal>
      <div>
        <div className="inline-flex flex-wrap gap-2" role="tablist">
          {roles.map((role) => (
            <button
              key={role.id}
              type="button"
              role="tab"
              aria-selected={role.id === active}
              onClick={() => setActive(role.id)}
              /* The labels stay black; the selected one is distinguished by
                 its ground, never by turning blue. */
              className={cn(
                "rounded-full border px-4 py-[9px] text-[13px] font-semibold transition-colors duration-200",
                role.id === active
                  ? "border-ink bg-ink text-white"
                  : "border-grey-mid bg-white text-ink hover:border-ink",
              )}
            >
              {role.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid">
          {roles.map((role) => (
            <div
              key={role.id}
              role="tabpanel"
              aria-hidden={role.id !== active}
              className={cn(
                "col-start-1 row-start-1 transition-all duration-[420ms] ease-out motion-reduce:transition-none",
                role.id === active
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-1 opacity-0",
              )}
            >
              <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] overflow-hidden rounded-panel border border-grey-mid bg-white shadow-[0_16px_40px_rgba(15,29,84,.06)] max-900:grid-cols-1">
                <div className="border-r border-grey-mid px-8 py-7 max-900:border-r-0 max-900:border-b max-600:px-6">
                  <ColumnLabel>What Changes</ColumnLabel>
                  <p className="mt-3.5 max-w-[46ch] border-l-[3px] border-brand pl-5 text-[16.5px] leading-[1.6] text-ink max-600:pl-4">
                    {role.what}
                  </p>
                </div>

                <div className="bg-grey-soft/60 px-8 py-7 max-600:px-6">
                  <ColumnLabel>Relevant Modules</ColumnLabel>

                  <div className="mt-3.5 flex flex-col gap-2.5">
                    {role.modules.map((module) => (
                      <ModuleRow key={module} name={module} />
                    ))}
                    {role.soonModule ? (
                      <ModuleRow name={role.soonModule} soon />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function ColumnLabel({ children }: { children: string }) {
  return (
    <span
      className={cn(
        MONO,
        "block text-[13px] font-semibold uppercase tracking-[0.05em] text-ink-muted",
      )}
    >
      {children}
    </span>
  );
}

function ModuleRow({ name, soon }: { name: string; soon?: boolean }) {
  return (
    <span
      className={cn(
        "flex items-center gap-3 rounded-tile border px-3.5 py-2.5",
        soon ? "border-dashed border-grey-mid bg-white" : "border-grey-mid bg-white",
      )}
    >
      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-[7px] border",
          soon
            ? "border-grey-mid bg-grey-soft text-grey-bdr"
            : "border-brand-pale bg-brand-tint text-brand",
        )}
        aria-hidden
      >
        <Icon name={ROLE_MODULE_ICONS[name] ?? "layers"} width={12} height={12} />
      </span>

      <span
        className={cn(
          "min-w-0 flex-1 text-[13.5px] font-semibold tracking-[-0.01em]",
          soon ? "text-grey-500" : "text-ink",
        )}
      >
        {name}
      </span>

      {soon ? (
        <span
          className={cn(
            MONO,
            "shrink-0 rounded-full border border-grey-mid bg-grey-soft px-2 py-0.5 text-[9.5px] uppercase tracking-[0.06em] text-grey-500",
          )}
        >
          Soon
        </span>
      ) : null}
    </span>
  );
}
