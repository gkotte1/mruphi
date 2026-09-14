import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import "./revenue-assurance.css";

/**
 * Revenue Assurance page shell. Font faces come from the root layout CSS variables.
 */
export function RevenuePage({ children }: { children: ReactNode }) {
  return <div className="ra-page">{children}</div>;
}

export function RaWrap({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={cn("ra-wrap", className)} style={style}>
      {children}
    </div>
  );
}

export function RaEyebrow({ children }: { children: ReactNode }) {
  return <p className="ra-eyebrow">{children}</p>;
}

export function RaHead({ children }: { children: ReactNode }) {
  return <div style={{ maxWidth: 640, marginBottom: 64 }}>{children}</div>;
}
