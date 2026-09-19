import type { Metadata, Viewport } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema } from "@/lib/schema";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import {
  CONSENT_MAX_AGE_DAYS,
  CONSENT_POLICY_VERSION,
  CONSENT_STORAGE_KEY,
} from "@/lib/consent";
import "./globals.css";

/**
 * Runs before any other script, including a future GA/GTM tag. Sets Google
 * Consent Mode v2 to fully denied by default, then reads whatever decision is
 * already stored (localStorage first, first-party cookie as a fallback) and
 * upgrades only the categories the visitor actually granted - so a tag added
 * later is consent-aware with no extra wiring, and never fires before a
 * decision exists. Keep the version/max-age here read from lib/consent so
 * this can't drift out of step with the values CookieConsent.tsx enforces.
 */
const consentBootstrap = `
(function () {
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted'
  });

  function readRecord() {
    var raw = null;
    try { raw = window.localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)}); } catch (e) {}
    if (!raw) {
      var match = document.cookie.match(new RegExp('(?:^|; )${CONSENT_STORAGE_KEY}=([^;]*)'));
      raw = match ? decodeURIComponent(match[1]) : null;
    }
    if (!raw) return null;
    try {
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return null;
      if (parsed.version !== ${JSON.stringify(CONSENT_POLICY_VERSION)}) return null;
      var givenAt = Date.parse(parsed.timestamp);
      if (isNaN(givenAt)) return null;
      if (Date.now() - givenAt >= ${CONSENT_MAX_AGE_DAYS} * 24 * 60 * 60 * 1000) return null;
      return parsed.categories || null;
    } catch (e) {
      return null;
    }
  }

  var categories = readRecord();
  if (categories) {
    gtag('consent', 'update', {
      analytics_storage: categories.analytics ? 'granted' : 'denied',
      ad_storage: categories.advertising ? 'granted' : 'denied',
      ad_user_data: categories.advertising ? 'granted' : 'denied',
      ad_personalization: categories.advertising ? 'granted' : 'denied',
      functionality_storage: categories.functional ? 'granted' : 'denied',
      personalization_storage: categories.functional ? 'granted' : 'denied'
    });
  }
})();
`;

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
      <head>
        {/* Must run before any analytics/ad tag - sets Consent Mode to denied
            by default, then upgrades only what a stored decision granted. */}
        <script dangerouslySetInnerHTML={{ __html: consentBootstrap }} />
      </head>
      <body className="font-sans antialiased">
        {/* Organization and WebSite, once for the whole site. Renders no
            markup a reader can see. */}
        <JsonLd data={organizationSchema()} />
        {children}

        {/* Asked once, site-wide. Renders nothing once a choice is stored, and
            never blocks the page. */}
        <CookieConsent />
      </body>
    </html>
  );
}
