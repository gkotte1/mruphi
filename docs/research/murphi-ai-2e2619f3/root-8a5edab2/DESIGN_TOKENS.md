# Design Tokens — murphi.ai `/`

All values lifted verbatim from the site's authored `:root` block
(`raw/blockA.css` lines 1–26) and the header block's scoped block
(`raw/header.html`). Nothing here is estimated.

## Source of truth

The site is WordPress + Elementor, but every section is hand-authored
HTML/CSS pasted into Elementor Custom HTML widgets. The `:root` block below is
redeclared identically in blockA, blockC and blockD — it is the real palette.

```css
:root {
  --blue:       #007EFF;
  --blue-dark:  #006AD6;
  --blue-deep:  #0056AD;
  --blue-light: #52A7FF;
  --blue-pale:  #A3D1FF;
  --blue-ghost: #CCE5FF;
  --blue-tint:  #EAF4FF;
  --blue-border:#BDD9FF;
  --text:       #1A1A1A;
  --muted:      #878787;
  --on-blue:    #F5F5F5;
  --white:      #FFFFFF;
  --grey-bg:    #F5F5F5;
  --grey-soft:  #EFEFEF;
  --grey-mid:   #E3E3E3;
  --grey-bdr:   #B2B2B2;
  --grey-dk:    #464646;
  --grad-hero:  linear-gradient(140deg,#006AD6 0%,#0072F0 60%,#0079F5 100%);
  --grad-section:linear-gradient(160deg,#0056AD 0%,#006AD6 100%);
  --grad-light: linear-gradient(135deg,#EAF4FF 0%,#CCE5FF 100%);
  --font: 'Plus Jakarta Sans', sans-serif;
  --r:  12px; --rl: 20px; --rxl: 28px;
  --sh:  0 4px 24px rgba(0,126,255,.12);
  --shm: 0 8px 40px rgba(0,126,255,.18);
  --shl: 0 20px 60px rgba(0,0,0,.12);
}
```

## Colors not in `:root`

| Value | Where |
|---|---|
| `#F7F7F7` | `.mh-nav` background (header block only) |
| `#E5E7EB` | `.mh-nav` bottom border, `--mh-border` |
| `#151515` | `--mh-text` (header only; body text elsewhere is `#1A1A1A`) |
| `#7B7B7B` | `--mh-muted` (header only) |
| `#0D1829` | `.murphi-footer` background |
| `#667085` | `--murphi-muted` (connect modal block) |
| `#0f8f5f` | `--murphi-success` (connect modal success state) |

## Tailwind v4 mapping (`src/app/globals.css`)

| Source var | Theme token | Utility |
|---|---|---|
| `--blue` | `--color-brand` | `bg-brand` `text-brand` |
| `--blue-dark` | `--color-brand-dark` | primary CTA fill |
| `--blue-deep` | `--color-brand-deep` | CTA hover |
| `--blue-light` | `--color-brand-light` | |
| `--blue-pale` | `--color-brand-pale` | |
| `--blue-ghost` | `--color-brand-ghost` | hero `<h1>` highlight |
| `--blue-tint` | `--color-brand-tint` | eyebrow pills, icon boxes |
| `--blue-border` | `--color-brand-border` | |
| `--text` | `--color-ink` | |
| `--muted` | `--color-ink-muted` | renamed — `--color-muted` is taken by shadcn |
| `--grey-bg` | `--color-grey-bg` | |
| `--grey-soft` | `--color-grey-soft` | |
| `--grey-mid` | `--color-grey-mid` | |
| `--grey-bdr` | `--color-grey-bdr` | |
| `--grey-dk` | `--color-grey-dk` | |
| `#F7F7F7` | `--color-nav-bg` | |
| `#E5E7EB` | `--color-nav-border` | |
| `#0D1829` | `--color-footer-bg` | |
| `--r` `--rl` `--rxl` | `--radius-card` `--radius-panel` `--radius-hero` | `rounded-card` etc. |
| `--sh` `--shm` `--shl` | `--shadow-brand` `--shadow-brand-md` `--shadow-brand-lg` | |

The Tailwind default tokens are left untouched alongside these. (The shadcn
scaffold that originally motivated that has since been removed — nothing in the
site imported it.)

## Typography

**Plus Jakarta Sans is the only family that renders.** Loaded by the site from
Google Fonts at weights 300–800. Instrument Serif is requested in `<head>` but
never applied; Roboto/Barlow come from the dead `techkit` theme. We load only
Plus Jakarta Sans via `next/font/google`.

Measured with `getComputedStyle()` at 1440px:

| Element | Size | Weight | Line height | Letter spacing | Color |
|---|---|---|---|---|---|
| `.hero h1` | `clamp(31px,4.3vw,57px)` → 57px | 800 | 1.06 (60.42px) | `-.028em` (-1.596px) | `#FFFFFF` |
| `.hero-h1-sub` | `clamp(17px,2.5vw,20px)` → 20px | 700 | 1.2 | `-.02em` | `rgba(255,255,255,.82)` |
| `.hero-sub` | 17px | 400 | 1.72 | — | `rgba(255,255,255,.82)` |
| section `h2` | 46px | 800 | 1.1 (50.6px) | `-.025em` (-1.15px) | `#1A1A1A` |
| `.sec-tag` (eyebrow) | 11.5px | 700 | — | `.07em` (0.805px) | `#006AD6` on `#EAF4FF` |
| body | 16px | 400 | — | — | `#1A1A1A` |
| nav item | 13.5px | 600 | — | — | `#006AD6` |
| `.mega-link-title` | 13px | 600 | — | — | `#1A1A1A` |
| `.mega-link-sub` | 11.5px | 400 | 1.4 | — | `#878787` |

`html { font-size:16px; scroll-behavior:smooth }`,
`body { -webkit-font-smoothing:antialiased }`.

## Spacing / layout

- Content max width: **1200px**, centred (`.hero-inner`, `.positioning`, etc.)
- Hero padding: `110px 52px 64px`; hero grid `1fr 440px`, gap `60px`
- Full-bleed pattern used by every section:
  `width:100vw; max-width:100vw; margin-inline:calc(-50vw + 50%)`
- Nav height **72px** (`.mh-nav`), `position:fixed`, `z-index:2147483647`

## Breakpoints

`900px` is the primary breakpoint (5 of 15 media queries). Others: `1024`,
`767`, `700`, `600`, `560`, `480`, and one `min-width:1200`.

## Radii & shadows

`12px` cards/buttons · `20px` panels · `28px` large panels · `100px` pills.
Shadows only ever from the three `--sh*` tokens plus
`0 20px 60px rgba(0,0,0,.12)` on the mega-menu.
