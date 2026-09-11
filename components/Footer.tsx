import Link from "next/link";
import { Logo } from "@/components/Logo";
import { AI_MODULES } from "@/lib/nav-data";
import { Icon, type IconName } from "@/components/icons";
import "./site-chrome.css";

type FooterLink = { label: string; href: string; soon?: boolean };

const COLUMNS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Modules",
    links: AI_MODULES.items.map((item) => ({
      label: item.label,
      href: item.href,
      soon: item.soon,
    })),
  },
  {
    heading: "Company & Resources",
    links: [
      { label: "Who We Serve", href: "/agencies/" },
      { label: "About Us", href: "/about-us/" },
      { label: "Blog", href: "/blogs/" },
      { label: "Announcements", href: "/announcements/" },
      { label: "FAQs", href: "/faqs/" },
      { label: "Contact Us", href: "/contact-us/" },
    ],
  },
  {
    heading: "Platform & Support",
    links: [
      { label: "Integrations", href: "/integrations/" },
      { label: "Security", href: "/security/" },
      { label: "Download App", href: "/download-app/" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy/" },
      { label: "Terms of Service", href: "/terms-of-service/" },
      { label: "AI Terms of Use", href: "/ai-terms/" },
    ],
  },
];

const SOCIAL: { label: string; href: string; icon: IconName }[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/murphi-ai",
    icon: "linkedin",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/murphi.ai/",
    icon: "instagram",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Murphi-AI/61573179414309/",
    icon: "facebook",
  },
  { label: "X", href: "https://x.com/MurphiAI", icon: "x" },
];

export default function Footer() {
  return (
    <footer
      className="site-chrome"
      style={{ padding: "72px 32px 40px", background: "#ffffff" }}
    >
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        <div className="hl-footer-grid">
          <div>
            <Link
              href="/"
              style={{ display: "inline-block", marginBottom: 14 }}
              aria-label="Murphi.ai home"
            >
              <Logo height={26} />
            </Link>
            <p
              style={{
                fontSize: 14,
                color: "#606060",
                lineHeight: 1.6,
                maxWidth: 300,
              }}
            >
              AI-native platform for Ambient AI, Revenue Assurance & QAPI,
              Clinician and Patient Engagement and Patient Payments — operated
              by Deskfactors Inc.
            </p>
          </div>
          {COLUMNS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <p
                style={{
                  fontSize: 12.5,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "#606060",
                  marginBottom: 16,
                }}
              >
                {column.heading}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  fontSize: 14.5,
                }}
              >
                {column.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{ color: "#464646" }}
                  >
                    {link.label}
                    {link.soon ? (
                      <span className="hl-nav-soon"> Soon</span>
                    ) : null}
                  </Link>
                ))}
              </div>
            </nav>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            paddingTop: 28,
            fontSize: 13,
            color: "#878787",
          }}
        >
          <span>© 2026 Deskfactors Inc. All rights reserved.</span>
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {SOCIAL.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Murphi.ai on ${item.label}`}
                  className="hl-social"
                >
                  <Icon name={item.icon} width={16} height={16} />
                </a>
              </li>
            ))}
          </ul>
          <span>HIPAA · SOC 2 · ISO 27001 · BAA</span>
        </div>
      </div>
    </footer>
  );
}
