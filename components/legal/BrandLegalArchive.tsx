"use client";

import { useId, useState } from "react";
import LegalProse from "@/components/legal/LegalProse";
import type { LegalBlock } from "@/lib/legal";

export default function BrandLegalArchive({
  label,
  blocks,
}: {
  label: string;
  blocks: LegalBlock[];
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="ip-legal-archive">
      <button
        type="button"
        className="ip-legal-archive-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={open ? "ip-legal-chevron is-open" : "ip-legal-chevron"} aria-hidden />
        {label}
      </button>

      <div id={panelId} hidden={!open}>
        <LegalProse blocks={blocks} semantic />
      </div>
    </div>
  );
}
