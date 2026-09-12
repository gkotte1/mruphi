# Bespoke pages — `/integration/`, `/white-labeling/`, `/security/`, `/about-us/`

The four pages that don't fit the segment or module templates. Three needed
their own component; one turned out to be a module page in disguise.

| Route | Shell | Rendered by |
|---|---|---|
| `/integration/` | `.page-hero` + `.page-section` / `.page-section-alt` | `integration/IntegrationPageContent.tsx` |
| `/white-labeling/` | `.page-hero` + `.sec-grey` / `.sec-white` | **shared `ModulePageTemplate`** |
| `/security/` | `.page-hero` + `.ps` / `.ps-alt`, scoped under `#murphi-sec` | `security/SecurityPageContent.tsx` |
| `/about-us/` | `.about-hero` + `.ps` / `.ps-alt` / `.ps-dark` | `about-us/AboutPageContent.tsx` |

Content lives in `src/content/murphi-ai-2e2619f3/bespoke-pages.ts` (generated),
icons in `shared/BespokeIcons.tsx` (generated), rasters in
`public/images/murphi-ai-2e2619f3/`.

## `/white-labeling/` reuses the module template

Its measured hero and band values are *identical* to the four SaaS module
pages — hero 120·52·72 → 80·28·56 @900 → 72·16·48 @600, a 320px status-card
aside, `.sh` at `clamp(24,3vw,38)` with `mb:16`, `.sl` at 16px/1.7 capped at
640, bands at 72·52. So it is authored as a `ModulePage` with
`density: "standard"`, `heroTypeScale: "responsive"`, `headingMobile: "clamp28"`,
`eyebrowMobile: 10`.

Two additions to the shared layer were needed, both content-driven:

- **`ModuleStatusCard.badgeTone`** — the hero badge is inline-styled per page.
  The module pages use green (`#E8F5E9` / `#2E7D32`); white-labeling uses blue
  (`#EAF4FF` / `#006AD6`). `ModuleHero` hard-coded green.
- **`IconCardGrid`** (`ModuleSection.iconCards`) — a `.three-col` of centred
  28px cards led by the 56px `.int-icon` tile.

## What the stylesheets got wrong

Four values had to be taken from `getComputedStyle`, not the CSS:

1. **`.vm-grid` on `/about-us/`** declares `margin-top:0` but computes to
   **28px**. The band came out 28px short until this was measured.
2. **`h3` in `/integration/`'s tag-cloud columns** is authored with a
   font-size-only inline style, so it keeps the techkit theme's **35px**
   line-height, not the 30px body default. Worth 5px per column.
3. **`/security/`'s type** is restyled by a *second* `#murphi-sec` block later
   in the document: `.sh` ends at 38px/700 in `#111` (not 800/`--text`),
   `.cert-desc` / `.sec-card-desc` at **13.5px/1.65 in `#555`** (not 13px), and
   `.cert-title` at 17px/700. The first declaration is dead.
4. **The theme puts `border: 1px solid #ebebeb` on every `th`/`td`.** The page
   only overrides the `td` bottom rule, so under `border-collapse` that 1px is
   part of every row's height — 2px across the processor table.

## Deliberate oddities preserved

These look like bugs and are reproduced as-is, because the live render does them:

- **`/about-us/` has no `.sec-tag` rule at all.** Its four section labels
  ("Our Differentiators", "What Powers Murphi.ai", "Our Core Values",
  "Our Team") render as plain inherited **16px/30px `#878787` body text**, not
  the blue pill every other page uses. The decorative
  `<span class="stagd">` inside three of them is likewise unstyled — a
  zero-width flex item.
- **`/about-us/`'s `<h1>` is `<h1>About Murphi.ai</span></h1>`** — a stray
  closing tag. The `.about-hero h1 span` rule (a second, smaller line) never
  applies, so the heading is one line.
- **`/security/`'s section eyebrow is an inline-styled `<p>`**, not `.sec-tag`.
  11px rather than 11.5px, `mb:16` rather than 20.
- **`/integration/`'s "Five Ways to Connect" grid holds six cards.**
- **The KPI grid in "Payment Integration" carries `grid-template-columns:1fr 1fr`
  inline**, which outranks the `@media(max-width:600px){.kpi-grid{1fr}}` rule —
  so it stays two-up at every width.

## Assets

Seven rasters downloaded to `public/images/murphi-ai-2e2619f3/`: four
certification badges (shared between `.hero-cert` at 28px and `.cert-ico` at
40px — both `width:1em`), and three team photos (160px, `object-fit:cover`).
24 inline SVGs were lifted verbatim into `BespokeIcons.tsx` — 18 `.sec-card-ico`,
3 `.val-card-ico`, 3 `.int-icon`.

`.val-card-ico` SVGs carry **no `fill` attribute**; the page supplies
`fill:none !important` via CSS. The generator re-adds `fill="none"` on the root,
without which every value icon renders as a filled black blob.

## New breakpoints

`/integration/` and `/about-us/` author tiers the project didn't have:

```css
@custom-variant max-768  (@media (max-width: 768px));
@custom-variant max-360  (@media (max-width: 360px));
@custom-variant range-601-900 (@media (min-width: 601px) and (max-width: 900px));
```

`/integration/`'s `.feature-grid` steps 3 → 2 (≤900) → 1 (**≤768**, not 600),
and it drops button padding at ≤360. `/about-us/` needs the range query because
`.val-grid` goes to a *single* column between 601 and 900 while `.diff-grid` and
`.team-grid` pair up — a max-width rule can't express both.

## Visual QA

**Every band matches exactly on all four pages at 1440, 900 and 600.**

| Route | live @1440 | clone | Δ | bands |
|---|---:|---:|---:|---|
| `/integration/` | 3679 | 3659 | −20 * | 5/5 exact |
| `/white-labeling/` | 3700 | 3700 | **0** | 5/5 exact |
| `/security/` | 5776 | 5776 | **0** | 8/8 exact |
| `/about-us/` | 3644 | 3644 | **0** | 6/6 exact |

\* `/integration/`'s hero, all four sections, the CTA band (457.3 both) and the
footer (552 both) each match to the pixel; the 20px is empty whitespace in the
live WordPress wrapper — the same artefact already documented on
health-systems, primary and accreditation.

At 600 every page carries a further −30…−60 from the same wrapper whitespace;
measuring `/rcm-companies/` and `/ambient-ai/` the same way shows −50 and −37,
so it is pre-existing and live-side, not introduced here.

Interactions re-checked on all four: hover mega-menus, nav scroll state, the
footer, and the 8s demo modal.

## Regression

All 20 routes re-measured at 1440 against the recorded baseline. **No route
moved.** The known deltas are unchanged: `/` −175 (documented testimonial
duplication), `/health-systems-hospitals/` −30, `/primary-specialty-care/` −30,
`/accreditation-audit/` −155, `/contact-us/` +4 — every other route Δ0.

The shared-layer edits (`ModuleHero` badge tone, the new `IconCardGrid`, three
new `@custom-variant`s) left the four existing module pages byte-for-byte
identical in height.

## Regenerating

```
node raw/extract-b4.mjs      # markup → bespoke-content.json
node raw/icons-b4.mjs        # inline SVGs + asset URLs → bespoke-icons.json
node raw/gen-icons-b4.mjs    # → shared/BespokeIcons.tsx
node raw/gen-b4.mjs          # → content/bespoke-pages.ts (fails on any empty field)
node raw/measure-b4.mjs      # live computed styles + band heights
node raw/compare-b4.mjs      # clone vs live, per band, at 1440/900/600
```

`gen-b4.mjs` exits non-zero if any extracted field is empty — the guard that
caught the dropped feature descriptions and quote roles in earlier waves.
