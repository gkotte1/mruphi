"use client";

import { useId, useState, type CSSProperties } from "react";
import LegalProse from "@/components/legal/LegalProse";
import type { LegalBlock } from "@/lib/legal";

export default function LegalArchive({
  label,
  blocks,
  inset,
  proseSize,
  proseColor,
}: {
  label: string;
  blocks: LegalBlock[];
  inset: number;
  proseSize: number;
  proseColor: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className={open ? "legal-archive is-open" : "legal-archive"}>
      <button
        type="button"
        className="legal-archive-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="legal-archive-chevron" aria-hidden />
        {label}
      </button>

      <div
        id={panelId}
        className="legal-archive-body"
        hidden={!open}
        style={
          {
            paddingLeft: inset,
            paddingRight: inset,
            "--archive-size": `${proseSize}px`,
            "--archive-color": proseColor,
          } as CSSProperties
        }
      >
        <LegalProse blocks={blocks} />
      </div>
    </div>
  );
}
