"use client";

import {
  LayerBand,
  ModuleTile,
  Stem,
  Surface,
} from "@/components/agencies/Workflows";
import { useAutoAdvance } from "@/lib/useAutoAdvance";

/**
 * The hero visual: one layer, six workflows hanging off it.
 *
 * It used to be six identical boxes in a grid, which showed the count but not
 * the idea. The layer now sits across the top with a stem down to every
 * workflow, so the six read as attached to one thing rather than six separate
 * things - which is the page's whole argument.
 *
 * The highlight moves slowly across the workflows that are actually running;
 * the two that are not yet live keep their quiet dashed treatment and are never
 * highlighted, because they are not doing anything. With motion reduced nothing
 * moves and the first workflow simply stays marked.
 *
 * Every string is the one the page already carried.
 */
export default function WorkflowLayer({
  label,
  modules,
}: {
  label: string;
  modules: { name: string; soon?: boolean }[];
}) {
  /* Only the live workflows take the highlight. */
  const live = modules.map((m, i) => (m.soon ? -1 : i)).filter((i) => i >= 0);
  const { index, hold, release } = useAutoAdvance(live.length, 2600);
  const activeIndex = live[index];

  return (
    <div onMouseEnter={hold} onMouseLeave={release}>
      <Surface label={label} status="Live">
        <LayerBand label="Murphi.ai" />

        {/* One stem per workflow, lighting for whichever is highlighted. */}
        <div className="grid grid-cols-3 max-720:grid-cols-2 max-600:grid-cols-1">
          {modules.map((module, i) => (
            <Stem key={module.name} lit={i === activeIndex} />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2.5 max-720:grid-cols-2 max-600:grid-cols-1">
          {modules.map((module, i) => (
            <ModuleTile
              key={module.name}
              name={module.name}
              soon={module.soon}
              active={i === activeIndex}
            />
          ))}
        </div>
      </Surface>
    </div>
  );
}
