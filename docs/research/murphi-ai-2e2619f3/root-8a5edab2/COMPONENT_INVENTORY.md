# Component Inventory — murphi.ai `/`

All components live under
`src/components/sites/murphi-ai-2e2619f3/`. Content is separated into typed
data modules under `src/content/murphi-ai-2e2619f3/` so the repeated structures
(5 tab panels, 4 modules, 7 testimonials, 24 marquee names, 2 mega-menus,
5 footer columns) are declared once instead of hand-duplicated as in the source.

## Shared (site-scoped)

| Component | File | Client? | Notes |
|---|---|---|---|
| `SiteHeader` | `shared/SiteHeader.tsx` | yes | Fixed 72px nav, 2 hover mega-menus, mobile drawer, scroll shadow |
| `SiteFooter` | `shared/SiteFooter.tsx` | no | Dark `#0D1829`, 5 columns, badges, 7 socials |
| icons | `shared/icons.tsx` | no | 26 nav/social/UI icons |

## Page-scoped (`root-8a5edab2/`)

| Component | Client? | Interaction model | Source block |
|---|---|---|---|
| `HeroSection` | no | static | blockA |
| `TrustBar` | no | static | blockA |
| `AnnouncementBanner` | no | static | blockA |
| `PartnerMarquee` | no | time-driven (CSS, 50s) | blockA |
| `PositioningSection` | no | static (card hover) | blockA + blockC |
| `SegmentsSection` | **yes** | **click-driven tabs** | blockB |
| `ModulesSection` | no | static (card hover) | blockC |
| `PaasSection` | no | static | blockC |
| `SocialProofSection` | no | time-driven (CSS, 38s) | blockC |
| `CtaSection` | no | static | blockD |
| `ConnectModal` | **yes** | **time-driven, 8s** | blockD |
| `SectionTag` | no | — | shared eyebrow pill, used 5× |
| icons | no | — | 30 section icons |

Only three components need client JS: the header (scroll + drawer state), the
segments tabs, and the modal. Everything else is a server component.

## Variants & states

- **`SectionTag`** — default (blue pill); the CTA section overrides it to a
  translucent white pill, so that one is inlined rather than using the shared
  component.
- **`ModelCard`** — 3 surface variants (`paas` gradient, `saas` white,
  `channel` white) each with a distinct badge treatment. Driven by
  `ModelCardVariant`.
- **`Segment`** — 5 instances. `quote` is optional; the EHR panel is the only
  one without a testimonial.
- **Buttons** — `btn-w` (white on blue), `btn-ghost` (translucent),
  `btn-blue` (white on blue, CTA section), `mh-signin` (solid brand),
  `seg-panel-cta` (solid brand), plus ~15 "Explore … →" text links whose only
  hover effect is `gap` widening.

## Assets

- 2 PNG logos → `public/sites/murphi-ai-2e2619f3/root-8a5edab2/images/`
- 56 of the page's 74 unique inline SVGs extracted to typed React components
  by `docs/research/.../raw/gen-icons.mjs`. The remainder belong to the cookie
  banner and other third-party UI that was dropped.
- No videos, no iframes, no CSS background images.

## Fonts

Plus Jakarta Sans (300–800) via `next/font/google`. Instrument Serif and
Roboto/Barlow are requested by the target but never render, so they're omitted.
