import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import "./inner-page.css";

/**
 * Inner-page shell. Font faces are loaded once in the root layout
 * (lib/fonts.ts) via --font-hl-* CSS variables.
 */
export function InnerPage({ children }: { children: ReactNode }) {
  return <div className="ip-page">{children}</div>;
}

export function IpWrap({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={cn("ip-wrap", className)} style={style}>
      {children}
    </div>
  );
}

export function IpEyebrow({ children }: { children: ReactNode }) {
  return <p className="ip-eyebrow">{children}</p>;
}

export function IpHead({ children }: { children: ReactNode }) {
  return <div style={{ maxWidth: 640, marginBottom: 64 }}>{children}</div>;
}
