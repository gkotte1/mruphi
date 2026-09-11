import { JetBrains_Mono, Manrope, Spectral } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import "./inner-page.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-hl-sans",
  display: "swap",
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-hl-serif",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hl-mono",
  display: "swap",
});

export function InnerPage({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        manrope.variable,
        spectral.variable,
        jetbrains.variable,
        "ip-page",
      )}
    >
      {children}
    </div>
  );
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
