import { JetBrains_Mono, Manrope, Spectral } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import "./ambient-ai.css";

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

export function AmbientPage({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        manrope.variable,
        spectral.variable,
        jetbrains.variable,
        "aa-page",
      )}
    >
      {children}
    </div>
  );
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
  return (
    <div style={{ maxWidth: 640, marginBottom: 64 }}>
      {children}
    </div>
  );
}
