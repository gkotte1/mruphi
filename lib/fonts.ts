import { JetBrains_Mono, Manrope, Plus_Jakarta_Sans, Spectral } from "next/font/google";

/**
 * Site-wide fonts — loaded once from the root layout.
 *
 * Inner pages and the homepage reuse these CSS variables instead of calling
 * next/font again, so each face is downloaded a single time per session.
 */

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-hl-sans",
  display: "swap",
});

export const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-hl-serif",
  display: "swap",
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hl-mono",
  display: "swap",
});

/** Class string applied on <html> so every route inherits the faces. */
export const fontVariables = [
  jakarta.variable,
  manrope.variable,
  spectral.variable,
  jetbrains.variable,
].join(" ");
