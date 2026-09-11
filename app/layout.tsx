import type { Metadata, Viewport } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import CookieConsent from "@/components/CookieConsent";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema } from "@/lib/schema";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import "./globals.css";

/* Plus Jakarta Sans carries every heading, label and body string on the site. */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

/* Manrope is the shared Navbar and Footer face, matching the homepage chrome. */
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-hl-sans",
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
    default: "Murphi.ai - AI for Every Home Health & Hospice Workflow",
    template: "%s | Murphi.ai",
  },
  description:
    "Home health and hospice AI software that connects to the EHR you already use - ambient AI documentation, revenue assurance, patient engagement and patient payments.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Murphi.ai",
    url: absoluteUrl("/"),
    title: "Murphi.ai - AI for Every Home Health & Hospice Workflow",
    description:
      "Home health and hospice AI software that connects to the EHR you already use - ambient AI documentation, revenue assurance, patient engagement and patient payments.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Murphi.ai - AI-powered workforce intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Murphi.ai - AI for Every Home Health & Hospice Workflow",
    description:
      "Home health and hospice AI software that connects to the EHR you already use - ambient AI documentation, revenue assurance, patient engagement and patient payments.",
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
    <html lang="en" className={`${jakarta.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">
        {/* Organization and WebSite, once for the whole site. Renders no
            markup a reader can see. */}
        <JsonLd data={organizationSchema()} />
        {children}

        {/* Asked once, site-wide. Renders nothing once a choice is stored, and
            never blocks the page. */}
        <CookieConsent />

        {/* BotWyse chat widget. Loaded once from the root layout so every
            route shares the same agent, including after client navigations. */}
        <Script
          src="https://chat.postwyse.com/botwyse-widget.js"
          data-agent-key="pb_344454aa55d69bcbff0f866c2720810aca132ece55c6151c"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
