import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import "./ambient-ai.css";

/**
 * Ambient AI page shell. Font faces come from the root layout CSS variables.
 */
export function AmbientPage({ children }: { children: ReactNode }) {
  return <div className="aa-page">{children}</div>;
}

export function AaWrap({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={cn("aa-wrap", className)} style={style}>
      {children}
    </div>
  );
}

export function AaEyebrow({ children }: { children: ReactNode }) {
  return <p className="aa-eyebrow">{children}</p>;
}

export function AaHead({ children }: { children: ReactNode }) {
  return <div style={{ maxWidth: 640, marginBottom: 64 }}>{children}</div>;
}
