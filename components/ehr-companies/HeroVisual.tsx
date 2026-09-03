import { Tick } from "@/components/module-page/ui";
import {
  Connector,
  Environment,
  FlowStrip,
  InsetLayer,
  ModuleTile,
} from "@/components/ehr-companies/Platform";

/**
 * The hero visual: Murphi seated inside the platform, not beside it.
 *
 * The old card listed the same parts one under another, which read as a
 * brochure. This is the environment itself — the clinician's surface at the
 * top, Murphi inset within it with tabs on both edges where it seats, the
 * capabilities it provides inside that inset, and the structured record coming
 * back out the bottom.
 *
 * Every string is the one the page already carried.
 */
export default function EmbeddedLayer({
  title,
  status,
  input,
  layerLabel,
  modules,
  output,
  foot,
}: {
  title: string;
  status: string;
  input: string;
  /** The label the page already uses over its intelligence layer. */
  layerLabel: string;
  modules: string[];
  output: string;
  foot: [string, string];
}) {
  return (
    <Environment
      label={
        <>
          <Tick className="size-4 shrink-0" />
          <span className="truncate">{title}</span>
        </>
      }
      status={status}
      foot={
        <>
          <span>{foot[0]}</span>
          <span>{foot[1]}</span>
        </>
      }
    >
      {/* What the platform sends in. */}
      <FlowStrip>{input}</FlowStrip>

      <Connector />

      {/* Murphi, seated inside it. */}
      <InsetLayer label={layerLabel}>
        <div className="grid grid-cols-3 gap-2 max-600:grid-cols-2">
          {modules.map((module, i) => (
            <ModuleTile key={module} name={module} index={i} />
          ))}
        </div>
      </InsetLayer>

      <Connector delay=".7s" />

      {/* What comes back to the record. */}
      <FlowStrip tone="out">{output}</FlowStrip>
    </Environment>
  );
}
