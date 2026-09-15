import type { Metadata, Viewport } from "next";
import Script from "next/script";
import CookieConsent from "@/components/CookieConsent";
import { JsonLd } from "@/components/JsonLd";
import { fontVariables } from "@/lib/fonts";
import { organizationSchema } from "@/lib/schema";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import "./globals.css";

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
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    siteName: "Murphi.ai",
    locale: "en_US",
    url: absoluteUrl("/"),
    title: "Murphi.ai - AI for Every Home Health & Hospice Workflow",
    description:
      "Home health and hospice AI software that connects to the EHR you already use - ambient AI documentation, revenue assurance, patient engagement and patient payments.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Murphi.ai - AI for Every Home Health & Hospice Workflow",
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
    <html lang="en" className={fontVariables}>
      <body className="font-sans antialiased">
        {/* Organization and WebSite, once for the whole site. Renders no
            markup a reader can see. */}
        <JsonLd data={organizationSchema()} />
        {children}

        {/* Asked once, site-wide. Renders nothing once a choice is stored, and
            never blocks the page. */}
        <CookieConsent />

        {/* BotWyse chat — deferred until the browser is idle so it does not
            compete with LCP / first paint. */}
        <Script
          src="https://chat.postwyse.com/botwyse-widget.js"
          data-agent-key="pb_344454aa55d69bcbff0f866c2720810aca132ece55c6151c"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
