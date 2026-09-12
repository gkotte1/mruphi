# Segment Pages, wave 2 — build notes & QA

The five remaining "Who We Serve" pages, built on the existing
`SegmentPageTemplate`. All ten segment pages now share one template and one
generated content file.

| Route | Variant | Sections |
|---|---|---|
| `/rcm-companies/` | `rcm` | Who It's For · Core Capabilities · Outcomes |
| `/coding-billing/` | `theme` | Who It's For · Two Models (card row) · Core Modules + callout |
| `/qapi-compliance/` | `theme` | Who It's For · Two Models (card row) · Core Modules |
| `/accreditation-audit/` | `theme` | Who It's For · Three Models (card row) · Core Modules |
| `/public-health-and-corrections/` | `civic` | Who It's For · Core Modules · Outcomes · EHR Integration (banner) |

## Template additions

These five needed block types the first wave didn't have. All were added to
`PageBlocks.tsx` and are driven from content:

- **`CardRow`** — `.two-col` / `.three-col` rows of badge cards. Card padding
  and description type are authored inline and differ per page (24px/13·1.65
  on EHR-EMR, 28px/13·1.7 on accreditation, 32px/14·1.7 on coding-billing and
  QAPI), so they are **extracted, not assumed**. Supports the trailing
  `<strong>Best for:</strong> …` note and the `<em>— Name, Role</em>`
  attribution.
- **`Callout`** — bordered white box with a bold label and body text
  ("AI Accuracy: 90–95% …" on coding-billing).
- **`SectionBanner`** — `.paas-section`, a blue gradient panel nested inside a
  page-section, with a translucent eyebrow and white type (public health's EHR
  Integration band).

`PageHero` now takes `h1Lines` so authored `<br>` breaks survive — without it
the new headings read "Revenue Cycle Workflowsfor RCM Companies".

## Three new variants

| variant | hero padding (1440 / ≤900 / ≤600) | `.sh` | `.sl` | eyebrow ≤600 |
|---|---|---|---|---|
| `rcm` | 100·60·80 / 72·32·56 / 64·18·44 | ≤36px, 800, −.025em, **28px @600** | 15px muted, 1.72 | 11.5px |
| `theme` | as `bold` | **32.44px theme h2**, 900, tracking normal, line-height 35px | inherited 16px/30px | 10px |
| `civic` | as `bold` | as `bold` | 16px muted, 1.7, max-w 760 | 11.5px |

The `theme` pages (coding-billing, QAPI, accreditation) leave `.sh` and the
hero `h1` unstyled, so both fall back to the **techkit theme's own headings**.
That's why `.sh` is a flat 32.44px/35px at every width while the other pages
clamp, and why only these three need an h1 scale
(`clamp(32,4vw,54)` → `clamp(32,5vw,44)` @900 → `clamp(24,7vw,36)` @600).

Two further page-specific values:

- **`accreditation-audit` renders inside a 1180px shell**, not 1200 — its alt
  bands are 1076px wide instead of 1200. Captured as `contentMaxWidth`.
- **`rcm-companies` keeps 24px card padding at ≤600**; every other segment page
  shrinks to 18px.

## Visual QA

**@1440 and @900 — every section matches on all five pages.**

| Route | live @1440 | clone | Δ |
|---|---:|---:|---:|
| `/rcm-companies/` | 3224 | 3224 | **0** |
| `/coding-billing/` | 3199 | 3199 | **0** |
| `/qapi-compliance/` | 3103 | 3103 | **0** |
| `/accreditation-audit/` | 3239 | 3084 | −155 * |
| `/public-health-and-corrections/` | 3775 | 3775 | **0** |

\* Every visible section matches; the 155px is empty whitespace in the live
WordPress wrapper, the same artefact seen on health-systems and primary.

@900: identical picture (four exact, accreditation −155 whitespace only).
@600: within ±10 per section except accreditation's Core Modules (−35).

Interactions verified on the new pages: hover mega-menus, nav scroll shadow,
footer, and the demo modal at 8s.

## Regression

All 16 routes re-measured at 1440 against a recorded baseline. One regression
appeared and was fixed:

**`/ehr-emr-companies` broke when its "Live Partners" section moved from
`FeatureCardGrid` to the new `CardRow`.** Two causes, both content-affecting:
`CardRow` initially hard-coded accreditation's 28px/1.7 card styling, and it
didn't render the `attribution` line (`— Dave Crow, President`) that
`FeatureCardGrid` does. Extracting the styling and adding the attribution
restored it to exact.

Final state — no route differs from its baseline:

| Δ = 0 (exact) | `/post-acute-care/`, `/mental-behavioral-health/`, `/ehr-emr-companies/`, `/ambient-ai/`, `/revenue-assurance/`, `/ai-patient-financials/`, `/contract-analyzer/`, `/rcm-companies/`, `/coding-billing/`, `/qapi-compliance/`, `/public-health-and-corrections/` |
|---|---|
| known deltas | `/` −175 (documented testimonial duplication + live whitespace), `/health-systems-hospitals/` −30, `/primary-specialty-care/` −30, `/accreditation-audit/` −155 (all live-side whitespace), `/contact-us/` +4 |

**11 of 16 routes are now pixel-exact end to end.**

## One more shared-layer bug

`FeatureCardGrid` gated the badge on `status`, so plain blue `.module-badge`
labels (no Live/Beta/Soon colour) never rendered — RCM's "PaaS" badges were
missing entirely. Badges now render whenever a label is present, taking the
status colour only when there is one.
