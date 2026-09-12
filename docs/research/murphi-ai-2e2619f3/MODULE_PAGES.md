# Module Pages — build notes & QA

The four SaaS module pages, built on a reusable `ModulePageTemplate`.

| Route | Sections |
|---|---|
| `/ambient-ai/` | How It Works (steps) · Note Types · Outcomes (KPIs + quote) · EHR Integration · Related |
| `/revenue-assurance/` | Home Health Reports · Hospice Reports · Accuracy & Review (two-col) · Related |
| `/ai-patient-financials/` | How It Works (steps) · Payment Methods · Outcomes · Who It Serves · Related |
| `/contract-analyzer/` | PADU Plus Methodology · Who It Serves (two-col) · Related |

## Template

`shared/ModulePageTemplate.tsx` renders any `ModulePage`. Every section is a
`.sec-grey` / `.sec-white` band with an eyebrow, heading, and any combination of
lead / footnote / steps / features / KPIs / tag cloud / two-col / quote /
related — all driven by content, nothing hard-coded per page.

New blocks in `shared/ModuleBlocks.tsx`: `ModuleHero` (two-column with the
status card), `ModuleBand`, `ModuleEyebrow`, `ModuleHeading`, `ModuleLead`,
`StepGrid`, `RelatedGrid`, `TwoCol`.

**Reused unchanged** from the segment build: `PageLayout`, `SiteHeader`,
`SiteFooter`, `InnerCta`, `ConnectModal`, and — with new props —
`FeatureCardGrid`, `KpiGrid`, `QuoteBlock`, `WhoTags`.

## Content

`src/content/murphi-ai-2e2619f3/module-pages.ts` is **generated**:

```bash
cd docs/research/murphi-ai-2e2619f3/raw
node extract-module-pages.mjs        # live HTML -> module-content.json
node generate-module-content.mjs ../../../../src/content/murphi-ai-2e2619f3/module-pages.ts
```

A `<p>` footnote ("+ 9 additional Home Health compliance reports…") sits after
the grid on both revenue-assurance report bands. It was missed on the first
pass and only surfaced because the section came up 66px short — a reminder that
the height diff catches dropped content that reads fine on screen. Every
section's direct children were then enumerated on the live pages to confirm
nothing else was missing.

## Per-page layout values

The four pages share a template but not their metrics. All measured from the
render, never read from the CSS:

| | ambient-ai | revenue-assurance | ai-patient-financials | contract-analyzer |
|---|---|---|---|---|
| hero aside | 300px | 320px | 300px | 320px |
| hero sub max-w / gap | 560 / 32 | none / 28 | 560 / 32 | none / 28 |
| `.sh` bottom gap | 16 | 12 | 12 | 12 |
| `.sl` max-w / gap / leading | 640 / 32 / 1.7 | none / 32 / 1.7 | none / 8 / 1.65 | none / 32 / 1.7 |
| `.quote-role` top gap | 4px | 2px | 2px | — |
| density (≤900 / ≤600) | standard | standard | **roomy** | standard |
| hero type scale ≤900 | **responsive** | static | static | static |
| KPI cols ≤600 | 2 | 2 | **1** | — |
| `.sh` ≤600 | 24px flat | clamp(24,6vw,34) | clamp(20,6vw,28) | clamp(24,6vw,34) |
| `.sec-tag` ≤600 | **10px** | 11.5px | 11.5px | 11.5px |
| mobile chrome | **ambient** | standard | standard | standard |

"mobile chrome" is the ≤600 override set: Ambient AI shrinks its tag pills
(11px / 4·10) and quote (padding 20·16, text 14px) but keeps an 8px tag gap;
the others keep full-size pills and 16px quote text but tighten the gap to 6px.

The `.sh` mobile curves were derived by sampling 360–600px — all three are 6vw
with different clamps, and they are **not** monotonic with the desktop clamp,
so they can only be found by measuring.

## Visual QA

**Desktop @1440 — every section and every document height is exact:**

| Route | murphi.ai | Clone | Δ |
|---|---:|---:|---:|
| `/ambient-ai/` | 4208 | 4208 | **0** |
| `/revenue-assurance/` | 4143 | 4143 | **0** |
| `/ai-patient-financials/` | 4146 | 4146 | **0** |
| `/contract-analyzer/` | 3187 | 3187 | **0** |

**@900px — exact on all four** (0, 0, 0, 0).

**@600 / @390** — a fixed per-page offset, not compounding:
ambient −37, revenue +16, patient-financials −49, contract −52 (≤1% of height).

Interactions verified on module pages: hover mega-menus, nav scroll shadow,
footer, demo modal at 8s, and the status card hiding below 900px.

## Two shared-layer bugs found and fixed

Both affected **every page built so far**, not just the module pages:

1. **Breakpoints were off by one pixel.** Tailwind's `max-[900px]:` compiles to
   `(width < 900px)`, which excludes 900; the target uses
   `@media (max-width: 900px)`, which includes it. At exactly 900/600 the clone
   used desktop styles. Fixed by declaring `@custom-variant max-900`,
   `max-600`, etc. in `globals.css` and migrating all 204 usages. Prefer these
   over `max-[Npx]:` for anything ported from murphi.ai.
2. **The footer's stacked "Legal" title needs `margin-top: 48px`.** Missing it
   made the footer 30px short on every page below 900px.

Fixing these took `@900` from −30 on all four pages to exact.

## Regression

All 11 routes re-measured at 1440 after the shared-component changes. No
regressions: the seven previously-exact routes are still exact, and the
`/health-systems-hospitals/`, `/primary-specialty-care/` (−30 phantom
whitespace) and `/contact-us/` (+4) deltas are unchanged. The homepage's only
delta remains the documented −23 testimonial-duplication deviation.
