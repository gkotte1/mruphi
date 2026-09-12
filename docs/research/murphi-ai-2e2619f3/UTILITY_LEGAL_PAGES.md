# Utility & legal pages

`/faqs/`, `/support-ticket/`, `/download-app/`, `/privacy-policy/`,
`/terms-of-service/`, `/ai-terms/`.

| Route | Rendered by | Notes |
|---|---|---|
| `/faqs/` | `faqs/FaqsPageContent.tsx` (client) | 25 questions in 5 categories |
| `/support-ticket/` | `support-ticket/SupportTicketPageContent.tsx` (client) | intake form + mailto handoff |
| `/download-app/` | `download-app/DownloadPageContent.tsx` | app store cards + 6 capability cards |
| 3 legal pages | `legal/LegalPageContent.tsx` + `LegalArchive.tsx` (client) | prose + collapsed prior version |

Content: `faqs-page.ts`, `support-ticket-page.ts`, `download-page.ts`,
`privacy-policy-page.ts`, `terms-of-service-page.ts`, `ai-terms-page.ts` (all
generated). Download icons: `shared/UtilityIcons.tsx`. Rasters:
`public/images/murphi-ai-2e2619f3/`.

## The FAQ accordion

Hand-authored, **not** the Elementor widget the route inventory guessed. The
target's `toggleFAQ(uid)` flips one item's `.open` class and its answer's
`display` — it never closes siblings, so **several panels can be open at
once**. Reproduced with a set of open ids rather than a single index.

The `.faq-plus` glyph is one 12×12 SVG: closed it is a blue `+` on
`--blue-tint`; open, the item rotates it 45° into a white `×` on `--blue-dark`.

## The legal pages are theme-rendered

These three are the only pages so far whose body is a WordPress *text-editor*
widget rather than hand-authored HTML, and they behave differently:

- The hero is flat **`#077EFF`**, not the blue gradient every other page uses,
  and both heading and lead animate in (`animation: up .65s ease both`, the
  lead delayed 0.1s → `@keyframes murphi-rise`).
- There is **no closing CTA band** — they render with `showCta={false}`.
- Prose type is fixed by the theme: `h6` 16px/26px weight 600, `p` 14px/**30px**,
  both with a 20px bottom margin, in `#000`.

### The prose column

Elementor's box model is not derivable from the stylesheet, so the column was
measured at seventeen viewport widths. It resolves cleanly:

```
available = min(viewport − 20px, 1200px)        // outer 10px padding + boxed cap
column    = available × 100%  at ≥1025px
          = available × 88%   between 768 and 1024
          = available × 90%   at ≤767px
          … then less the wrapper's own 10px padding, with a 50px vertical
            margin (20px at ≤767).
```

Checked against the live render at 1600/1440/1300/1200/1100/1025/1024/1000/900/
800/768/767/700/600/500/400/360 — every width matches.

### The archived version

Each page keeps its superseded policy in a collapsed accordion (`Privacy Policy
Ver 1.0`, `Terms Of Service Ver 1.0`, `AI Terms Ver 1.0`) — 185, 239 and 25
paragraphs of legal copy respectively. It is reproduced in full; nothing is
summarised or dropped.

Its typography is set per widget, so it is stored per page rather than assumed:
privacy 14px/1.7 in `#333`, terms **13px**/1.7 in `#333`, AI terms 14px/1.7 in
**`#000`**. Elementor also nests the widget in extra 10px-padded containers —
none on privacy, one on terms, two on AI terms — captured as `archive.inset`
(0/10/20). Without it the two pages sat 20px and 40px short.

## Things the stylesheets got wrong or hid

1. **39 `<hr>` separators on `/terms-of-service/` were silently dropped.** The
   extractor's void-tag branch was `<hr\s*\/?>`, which does not allow
   attributes — and every one of them carries a class. Worth 39px, and the kind
   of loss that only shows up in a height diff.
2. **A `<p>` holding a lone U+00A0** is a deliberate spacer: the character does
   not collapse, so the paragraph still renders a full 30px line. Normalising it
   to a plain space and trimming loses that line.
3. **The theme gives `h2`/`h3` a flat 35px line-height.** Both the FAQ "Still
   have questions?" heading and the support page's two headings only set
   `font-size`, so they inherit it — 5px each, three times over.
4. **`/support-ticket/` ships its own reset** (`body { line-height: 1.5 }`), so
   its inherited leading is 24px, not the 30px the rest of the site uses — and
   because the value is *relative*, the hero pill scales with it (16.5px, not
   24px). Using a fixed `leading-6` made the pill 7.5px too tall.
5. **`input[type=text|email]` picks up the theme's own colours** (`#EBEBEB`
   border, `#666` text) while the file input and textarea keep `.form-control`'s
   (`#E3E3E3`, `#1A1A1A`). Two different field palettes on one form.
6. **Tailwind preflight erases `::file-selector-button`**, so the upload control
   lost the browser chrome the target shows. Restored — with an explicit
   19px leading, since the border alone made the field 4px too tall.

## Two page stylesheets leak onto the site footer

Both `/download-app/` and the legal pages emit a bare `footer { … }` rule from
their own `<style>` block, and the shared site footer really does render taller
on those pages:

- `/download-app/`: `footer{background:#0D1829;padding:60px 52px 32px}` → 644px
  instead of 552px at 1440.
- legal pages: `footer{padding-top:72px}` (60 at ≤1100, 48 at ≤640) → 625px.

Reproduced as a `footerFrame` prop on `PageLayout` that wraps the footer rather
than modifying it, so `SiteFooter` itself is untouched. The same page CSS also
gives `/support-ticket/` a 3px-shorter CTA band (the `line-height:1.5` reset
reaching `.murphi-cta-root`), handled by a `ctaLeading` prop on `InnerCta`.

## The support form

No backend on the target: it validates the required fields, shows one of two
inline banners, and hands the composed ticket to the visitor's mail client via
`mailto:info@murphi.ai`. Reproduced exactly — there is no key or endpoint
involved, so nothing had to be substituted.

Verified: empty submit shows the red "Please fill in all mandatory fields"
banner; a valid submit shows the green banner and opens
`mailto:info@murphi.ai?subject=Murphi.ai%20Support%20Ticket&body=…`.

## Visual QA

| Route | @1440 | @900 | @600 |
|---|---:|---:|---:|
| `/faqs/` | **0** | **0** | −50 * |
| `/support-ticket/` | **0** | **0** | **0** |
| `/download-app/` | **0** | +18 † | −30 * |
| `/privacy-policy/` | −1 | −1 | −51 * |
| `/terms-of-service/` | −1 | −1 | −51 * |
| `/ai-terms/` | −1 | −1 | −51 * |

\* Live-side whitespace in the WordPress wrapper — the same artefact measured on
the already-verified pages at 600 (`/rcm-companies/` −50, `/ambient-ai/` −37,
`/contact-us/` −48). `/support-ticket/`, which ships its own reset, is exact at
600, which is what pinned the cause to the theme wrapper.

† `/download-app/`'s three bands are exact at 900 (448 / 903 / 915) and the
content above the footer matches to the pixel (2696 both). The 18px is the
shared footer wrapping differently at the 748px content width that the page's
leaked `footer{padding:…52px}` produces.

The −1 on the legal pages is sub-pixel rounding on a ~5,800–10,000px document.

Interactions verified on the clone: FAQ panels open independently and several at
once, the plus rotates 45° into a white ×; the legal archive opens (+29,041 /
+31,438 / +4,037 px of superseded copy) with the chevron rotating 90°; the
support form validates and hands off to `mailto:`.

## Regression

All 26 routes re-measured at 1440. **No previously-verified route moved.** The
known deltas are unchanged: `/` −175, `/health-systems-hospitals/` −30,
`/primary-specialty-care/` −30, `/accreditation-audit/` −155, `/contact-us/` +4,
`/integration/` −20 — every other pre-existing route Δ0.

The shared-layer additions (`PageLayout` `footerFrame` / `ctaLeading`,
`InnerCta` `leading`, three new `@custom-variant`s) are opt-in and left the
twenty earlier routes byte-identical in height.

## Regenerating

```
node raw/extract-b6.mjs      # markup → utility-content.json
node raw/icons-b6.mjs        # download-app SVGs + asset URLs
node raw/gen-icons-b6.mjs    # → shared/UtilityIcons.tsx
node raw/gen-b6.mjs          # → six content files (fails on any empty field)
node raw/measure-b6.mjs      # live computed styles
node raw/compare-b6.mjs      # clone vs live at 1440/900/600
```
