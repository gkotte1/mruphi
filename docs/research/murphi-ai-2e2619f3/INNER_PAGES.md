# Inner Pages — build notes & QA

Six routes built on the shared foundation: the five "Who We Serve" segment
pages plus `/contact-us/`.

## Shared foundation

| Piece | File | Notes |
|---|---|---|
| `PageLayout` | `shared/PageLayout.tsx` | header + children + CTA + footer + modal. Applies `text-ink`, matching `#murphi-page-content { color:#1A1A1A }` which overrides the theme's inherited `#878787`. |
| `InnerCta` | `shared/InnerCta.tsx` | `.murphi-cta-root` / `.mcta-*`. A separate implementation from the homepage's `.cta-section`: heading `line-height:1.1` (vs 1.15), body `max-width:640px`, eyebrow `line-height:1.4`, breakpoint at 700px (vs 900px). |
| `PageBlocks` | `shared/PageBlocks.tsx` | `PageHero`, `PageSectionBand`, `SectionEyebrow`, `SectionHeading`, `SectionLead`, `WhoTags`, `FeatureCardGrid`, `KpiGrid`, `QuoteBlock`. |
| `SegmentPageTemplate` | `shared/SegmentPageTemplate.tsx` | Renders any `SegmentPage` — section order, band alternation and block composition all come from content. |

Header, mega-menus, footer and the 8s demo modal are reused unchanged from the
homepage build.

## Content

`src/content/murphi-ai-2e2619f3/segment-pages.ts` is **generated**, not
hand-written. Regenerate with:

```bash
cd docs/research/murphi-ai-2e2619f3/raw
node extract-segment-pages.mjs        # live HTML -> segment-content.json
node generate-segment-content.mjs ../../../../src/content/murphi-ai-2e2619f3/segment-pages.ts
```

This guarantees no prose is paraphrased. Two extractor bugs were caught during
QA and are worth remembering: a `([\s\S]*?)</div>\s*</div>` tail silently
swallows the last child's closing tag (it emptied all 33 feature descriptions
and all 4 quote roles), and `class="[^"]*page-hero-tag"` also matches the
`page-hero-tag-row` wrapper.

## Per-page style profiles

The five pages are *not* stylistically identical. Three profiles cover them:

| variant | pages | hero padding (1440 / ≤900 / ≤600) | `.sh` | `.sl` | `.kpi-v` |
|---|---|---|---|---|---|
| `bold` | post-acute | 120·52·72 / 72·24·52 / 56·16·40 | ≤36px, 900, −.03em, mb 20 | inherited 16px/30px | 36px → 28px @600 |
| `tight` | health systems, primary | 80·52·72 / 80·32·56 / 56·18·44 | ≤38px, 800, −.025em, mb 16 | 15px muted, lh 1.7 | 36px |
| `roomy` | mental, EHR | 100·60·80 / 72·32·56 / 64·18·44 | ≤36px, 800, −.025em, mb 20 | 15px muted, lh 1.72 | 36px |

Section band padding also varies by variant (see `BAND_PADDING`), and two values
are page-specific rather than variant-wide: health systems widens `h1` to
1000px (all others 800px) and shrinks `.kpi-v` to 26px.

**All of this was measured from the rendered pages, not read from the CSS** —
the stylesheets disagree with the render in several places (e.g. every page
declares `.page-section{padding:72px 52px}` but mental/EHR render at 80·60).

## Visual QA @1440px

| Route | murphi.ai | Clone | Δ |
|---|---:|---:|---:|
| `/post-acute-care/` | 3770 | 3770 | **0** |
| `/health-systems-hospitals/` | 3877 | 3847 | −30 * |
| `/primary-specialty-care/` | 3435 | 3405 | −30 * |
| `/mental-behavioral-health/` | 3873 | 3873 | **0** |
| `/ehr-emr-companies/` | 3559 | 3559 | **0** |
| `/contact-us/` | 2265 | 2269 | +4 |

\* Every visible section on both pages matches **exactly** (hero, all four
bands, CTA 457, footer 552). The 30px is empty whitespace in the live
WordPress wrapper below the last section, with no visual counterpart.

Verified on inner pages: hover mega-menus open at 860px wide, nav scroll shadow
fires past 10px, footer renders, demo modal opens at 8s.

## Notable per-page findings

- **`<input>` line-height.** Live inputs keep the UA's `line-height: normal`
  (40px tall); Tailwind's preflight makes form controls inherit, so they picked
  up the theme's 30px and rendered 52px. Restored with `leading-normal` on
  inputs only — the live *textarea* really does inherit 30px.
- **`tailwind-merge` drops `leading-*`** when a later `text-[…]` arbitrary value
  lands in the same group, because `text-{size}/{leading}` is a shorthand.
  Passing `cn("leading-[1.1]", "text-[clamp(...)]")` silently lost the
  line-height. Class strings that combine an arbitrary font size with a colour
  or leading are now plain template joins, not `cn()`.
- **Post-acute nests its padding below 900px** — the inner `.page-section`
  regains `48px 24px` inside an already-padded `.page-section-alt`, so alt bands
  are doubly padded on mobile. Reproduced as-is (`BOLD_INNER_PADDING`).
- **Hero tag link arrows differ**: post-acute and mental use a `→` glyph,
  health systems and primary use an inline SVG arrow. Both supported via
  `HeroTag.arrow`.
- **`health-systems` `h1` contains a typo in the source** —
  "Optimization,Patient" with no space. Preserved verbatim.

## Deviations

| # | Deviation | Why |
|---|---|---|
| 1 | Homepage Primary Care CTA now points to `/primary-specialty-care/` | The live link is `/primary-speciality-care/`, which 404s. Fixed on request. |
| 2 | `trailingSlash: true` added to `next.config.ts` | murphi.ai serves every URL with a trailing slash; matching it keeps URLs identical and avoids a 308 on every internal link. |
| 3 | Contact form posts to `/api/contact` | The live form reuses the same Web3Forms access key as the demo modal. Not reused; the route validates and returns 202 pending a real destination. |
| 4 | Quote author/role wrapped in `<footer>` | Semantic grouping inside `<blockquote>`; identical rendered height (62px). |

## Not built yet

The remaining 5 segment-template pages (`/rcm-companies/`, `/coding-billing/`,
`/qapi-compliance/`, `/accreditation-audit/`,
`/public-health-and-corrections/`) are pure content work against the existing
template. Everything else is per `ROUTE_INVENTORY.md`.
