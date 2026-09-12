# Deferred public pages — the eight that were held back

The last of the public site: two Elementor pages and six hand-authored HTML
embeds. None of them use the segment or module shells; each embed ships its own
`<style>` block, its own palette, and — in one case — its own font.

| Route | Kind | Rendered by |
|---|---|---|
| `/download-old-app/` | Elementor widgets | `download-old-app/DownloadOldAppContent.tsx` |
| `/murphi-xpress-video/` | Elementor widgets + `<video>` | `murphi-xpress-video/XpressVideoContent.tsx` |
| `/white-label-partner-program/` | hand-authored block | `white-label-partner-program/WhiteLabelPartnerContent.tsx` |
| `/ehr-ai-integration-platform/` | `.mv-widget` embed | `ehr-ai-integration-platform/EhrPlatformContent.tsx` |
| `/ai-for-managed-care-functions-health-system-and-hospitals/` | `.murphi-mc-embed` | `managed-care/ManagedCareContent.tsx` |
| `/embed-ai-into-ehr-workflows-mental-and-behavioural-health/` | embed | `mental-health/MentalHealthContent.tsx` |
| `/public-health-and-corrections-embed-ai-into-ehr-workflows/` | `.murphi-embed-root` | `public-health/PublicHealthContent.tsx` |
| `/primary-and-speciality-care-embed-into-ehr/` | embed | `primary-care/PrimaryCareContent.tsx` |

Content is generated into `src/content/murphi-ai-2e2619f3/`
(`deferred-pages.ts`, `white-label-partner-page.ts`, `ehr-platform-page.ts`,
`managed-care-page.ts`, `mental-health-page.ts`, `public-health-page.ts`,
`primary-care-page.ts`); glyphs into a `*Icons.tsx` beside each component.
Extractors and generators are archived in `raw/` (`ex-*.mjs` + `gen-*.mjs`).

## External application links are left external

Per the brief, nothing under `murphi.murphiconnect.ai` or `web.murphi.ai` is
recreated. Every Sign In / Sign Up / application link on these pages stays an
outbound link to its original URL, exactly as the shared header and footer
already handle them.

The site-wide `connect-modal` popup that each embed carries in its markup is
**not** reproduced. It is a hidden, timer-driven lead form belonging to the
host site rather than to any page's layout, and no page's visible content or
height depends on it.

## Where the embeds get their type

This is the one thing that cannot be read off the stylesheets, because on three
of the pages the stylesheet loses. Every embed asks for Inter; only one gets it.

| Page | Body text | Headings |
|---|---|---|
| managed-care | **Inter** — asked for via `.murphi-mc-embed`, a class the theme cannot outrank | Plus Jakarta Sans |
| mental-health | Plus Jakarta Sans | Plus Jakarta Sans |
| public-health | Plus Jakarta Sans | Plus Jakarta Sans |
| primary-care | Plus Jakarta Sans | Plus Jakarta Sans |
| ehr-platform | Plus Jakarta Sans (asked for by name) | Plus Jakarta Sans |
| white-label-partner | Plus Jakarta Sans | Plus Jakarta Sans |

Three of the embeds set their font with a bare `body { font-family: 'Inter' }`,
which the theme's own `body` rule outranks, so Inter never renders. And on
*every* page the theme sets a font-family directly on `h1`–`h6`, which beats
anything the embed merely inherits — so headings are Plus Jakarta Sans even
where the body is Inter.

Getting this wrong is invisible until you measure: on
`/primary-and-speciality-care-embed-into-ehr/` the wrong font added a third
line to the hero `h1` (+56px) and a second line to a section sub (+24.5px).

## Theme rules that reach inside the embeds

The embeds reset with `* { margin: 0; padding: 0 }`, which has zero specificity,
so any theme rule written against an element name still wins:

- `p { margin-bottom: 20px }` — reproduced with `mb-5` wherever the paragraph is
  a section's last child (elsewhere it collapses into a larger sibling margin).
- `ul { margin-bottom: 20px; padding-left: 20px }` — the `.rcm-steps` lists.
- `h2 { line-height: 35px }` — every heading without its own leading.
- `table { margin: 15px 0 }` — the white-label comparison table.

## Icons and line boxes

Tailwind's reset sets `svg { display: block }`; the live pages leave them
`inline`. Where a slot sizes itself from the glyph's line box rather than the
glyph — `.int-ico` at 32px, `.sc-ico` at 22px, `.cat-icon` at 15px — that is a
real height difference (32 × 1.6 = 51.2 against a 26px glyph). The affected
components put `display: inline` back on the wrapper.

Three content-loss bugs are worth remembering. `raw/jsx-svg.mjs` now throws if
a conversion drops an attribute, and `raw/svgaudit.mjs` checks that every glyph
in a page's own markup is accounted for by a captured icon:

- Attributes written with **single quotes** (the embeds quote that way, because
  their glyphs live inside JS string literals) were dropped wholesale,
  path data included, leaving 300×150 default-sized boxes.
- HTML entities inside those script literals stay escaped — the live page only
  decodes them by writing through `innerHTML`. `Q&amp;A` rendered literally and
  wrapped a card to an extra line. `raw/decode-deep.mjs` decodes them.
- **Two things heights cannot see.** The primary-care hero CTA ends in an arrow
  `<svg>` that reads like part of its label, and `/ehr-ai-integration-platform/`
  puts a space before the `<em>` in its `h1`. Neither changed a line break, so
  both survived every measurement and only the side-by-side screenshots caught
  them. JSX also swallows the whitespace between two adjacent expressions, so
  the space between an icon and its label has to be written explicitly.

## Verified deltas

Document height, clone − live, at 1440 / 900 / 600:

| Route | 1440 | 900 | 600 |
|---|---|---|---|
| `/download-old-app/` | 0 | 0 | 0 |
| `/murphi-xpress-video/` | 0 | 0 | 0 |
| `/ehr-ai-integration-platform/` | 0 | 0 | 0 |
| `/ai-for-managed-care-.../` | 0 | 0 | 0 |
| `/embed-ai-into-ehr-workflows-mental-.../` | +2 | +2 | +2 |
| `/white-label-partner-program/` | +1 | +1 | +11 |
| `/public-health-and-corrections-.../` | −70 | −70 | −70 |
| `/primary-and-speciality-care-.../` | −70 | −70 | −70 |

Section-by-section, every one of these pages matches its live counterpart
exactly. The three residuals are:

- **−70 on two pages: the live site's own footer.** Those two embeds ship
  `* { margin: 0; padding: 0 }` *unscoped*, so it escapes the embed and inflates
  the shared site footer from 552px to 624px on those two URLs only. The footer
  is a shared component; deliberately breaking it on two routes to copy a
  stylesheet leak was not worth doing, so the clone renders the correct footer
  and carries the difference.
- **+11 at 600 on white-label-partner.** The comparison table's auto-layout
  columns. Content, fonts, cell padding, and per-column max-content text widths
  were measured identical on both sides (146/236/215 px); live nevertheless
  resolves the three columns to near-equal thirds (182/177/177) where the same
  inputs give 143/204/189 here. Not reproducible without inventing fixed column
  widths.
- **+2 on mental-health.** One RCM card row, sub-pixel.

## Elementor container margins

Each of these pages sits in an Elementor container with a top margin the page
body has to carry: 30px (white-label, xpress-video at ≤600), 40px (ehr-platform,
public-health), 45px (mental-health), 60px (managed-care, primary-care). It is
real whitespace above the hero, not a measurement artefact, and each component
reproduces its own value.

## Interactions

All reproduced as React state over the same data the live scripts hold — no
`dangerouslySetInnerHTML`, no ported DOM code:

- **ehr-platform** — care-setting tabs × workflow-type filters over 69 cards;
  a right-hand drawer whose body is the same for every feature. No Escape
  handler, matching the live page.
- **managed-care** — the contract analyzer: PADU+ status tabs filtering six
  findings, an evidence panel that highlights nine legal phrases in the clause
  text, and a per-finding negotiation note with a Save → "Saved" flash. Plus a
  feature drawer built from each card's `data-drawer` payload.
- **mental-health / public-health / primary-care** — category tabs × type
  filters, and a drawer whose workflow copy branches on feature family
  (`Agentic AI` / `Payments` / everything else). Primary-care carries a second
  explorer as well: eight specialty tabs, each swapping a whole intro panel and
  its own card grid.

Body scroll locks while a drawer is open and unlocks on close, everywhere.
