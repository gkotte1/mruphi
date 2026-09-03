import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import "./globals.css";

/* Plus Jakarta Sans carries every heading, label and body string on the site. */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

/**
 * Canonical URLs, and where relative Open Graph and Twitter image paths resolve.
 *
 * The origin comes from lib/site.ts, which defaults to the production domain, so
 * a production build can never fall back to Next's local dev origin and ship
 * development URLs in its canonical or social tags. Point a different
 * deployment somewhere else with NEXT_PUBLIC_SITE_URL.
 *
 * Each page sets its own alternates.canonical; this one covers the home page.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Murphi.ai — AI for Every Home Health & Hospice Workflow",
    template: "%s | Murphi.ai",
  },
  description:
    "Murphi integrates with the EHRs your agency uses and automates the work around patient care.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Murphi.ai",
    url: absoluteUrl("/"),
    title: "Murphi.ai — AI for Every Home Health & Hospice Workflow",
    description:
      "Murphi integrates with the EHRs your agency uses and automates the work around patient care.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Murphi.ai — AI-powered workforce intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Murphi.ai — AI for Every Home Health & Hospice Workflow",
    description:
      "Murphi integrates with the EHRs your agency uses and automates the work around patient care.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/brand/app-icons/favicon.ico", sizes: "any" },
      { url: "/brand/app-icons/murphi-icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/brand/app-icons/murphi-icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/brand/app-icons/murphi-icon-180-apple-touch.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#007EFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
