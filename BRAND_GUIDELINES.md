# Murphi.ai Brand & UI Guidelines

**The visual source of truth for the Murphi.ai website is the NEW Homepage.**

Use this document when updating remaining pages so they match the Homepage:
clean, minimal, simple, modern, professional, consistent, spacious, and easy to scan.

Do not invent a second visual language. Do not copy older inner-page treatments
(Plus Jakarta Sans heading utilities, 12px card radii, glass-free grey nav, dark
or gradient footers) unless they already match the values below.

| | |
|---|---|
| **Visual source of truth** | The live Homepage |
| **Homepage implementation** | `components/home-landing/HomeLanding.tsx` · `components/home-landing/home-landing.css` |
| **Shared Navbar / Footer** | `components/Navbar.tsx` · `components/Footer.tsx` · `components/site-chrome.css` |
| **Nav / footer data** | `lib/nav-data.ts` |
| **Logo** | `components/Logo.tsx` · `/brand/logos/murphi-logo-blue.png` |
| **Icons** | `components/icons.tsx` |
| **Stack** | Next.js 16 (App Router) · React 19 · TypeScript |
| **Company** | Murphi.ai — AI for Home Health & Hospice, operated by Deskfactors Inc. |
| **Last aligned** | 2026-09-11 — rewritten from the NEW Homepage implementation |

---

## How to use this document

1. Read the Homepage code if a value is missing here. The Homepage wins.
2. Reuse the shared Navbar and Footer. Do not rebuild chrome per page.
3. Match Homepage color, type, spacing, radius, and component recipes.
4. Prefer actual Homepage hex and px values over older Tailwind token names.
5. Do not add visual clutter: heavy decorations, excessive gradients, heavy
   shadows, oversized elements, or motion that does not earn its place.

---

## Table of contents

1. [Design principles](#1-design-principles)
2. [Color](#2-color)
3. [Typography](#3-typography)
4. [Logo](#4-logo)
5. [Layout and spacing](#5-layout-and-spacing)
6. [Borders, radius, and shadows](#6-borders-radius-and-shadows)
7. [Buttons](#7-buttons)
8. [Links, labels, and badges](#8-links-labels-and-badges)
9. [Cards and product visuals](#9-cards-and-product-visuals)
10. [Navbar](#10-navbar)
11. [Footer](#11-footer)
12. [Icons](#12-icons)
13. [Motion](#13-motion)
14. [Responsive behavior](#14-responsive-behavior)
15. [Page recipe for remaining pages](#15-page-recipe-for-remaining-pages)
16. [Do / don't](#16-do--dont)
17. [Quick reference](#17-quick-reference)

---

## 1. Design principles

The Homepage reads as a **clinical, editorial product site** — not a consumer
SaaS landing with glow, glass, or stacked decoration.

**The site should remain:**

- Clean
- Minimal
- Simple
- Modern
- Professional
- Consistent
- Spacious
- Easy to scan

**Working rules taken from the Homepage:**

1. **White first.** Page ground is `#FFFFFF`. Grey (`#F5F5F5`) is used as an
   alternating band with an `#E3E3E3` hairline, not as a default chrome color.
2. **Blue is a signal.** `#007EFF` marks primary actions, emphasis, icons, and
   the one important thing in a visual. It is not a wash across the page.
3. **Hierarchy comes from type and space.** Spectral headings + Manrope body +
   generous vertical rhythm, not colored boxes.
4. **Hairlines over boxes.** Many Homepage “cards” are white cells divided by a
   1px `#E3E3E3` grid, or a quiet border + a very soft shadow.
5. **Small corners.** Buttons are almost square (`3px`–`4px`). Cards and menus
   are `8px`–`10px`. Pills are the exception (`20px` / full).
6. **Flat color.** No color gradients on buttons, nav, footer, or section
   backgrounds. The closing CTA is solid `#006AD6`.
7. **Every element earns its place.** No extra UI chrome, no duplicate navs,
   no placeholder links, no decorative shapes that do not explain the product.

---

## 2. Color

All values below are taken from the Homepage / shared chrome. Use these hexes.

### 2.1 Core palette

| Role | Hex | Where the Homepage uses it |
|---|---|---|
| **Primary blue** | `#007EFF` | Primary buttons, hero italic, award pill border/text, icons, selected product states, link hover, text selection background |
| **Header / dark blue** | `#006AD6` | MurphiConnect utility bar, full-bleed final CTA band, inverse-button label |
| **Ink** | `#1A1A1A` | Default text, headings, nav links, bullet lists, logo-strip names |
| **Secondary text** | `#606060` | Body / lead copy, eyebrows, stats captions, footer descriptor, mobile group labels |
| **Body-on-white (footer links)** | `#464646` | Footer column links |
| **Muted / meta** | `#878787` | Captions, “Launching Soon”, social icons at rest, footer bottom row, micro labels |
| **Disabled / rules / dots** | `#B2B2B2` | Trust-strip separators, visual arrows, inactive kicker labels, EHR chip borders |
| **Border / hairline** | `#E3E3E3` | Nav bottom border, section rules, dropdown border, most cards, logo-strip edges |
| **Soft card border** | `#EFEFEF` | Homepage `CARD` border; nested step tiles |
| **Light surface** | `#F5F5F5` | Grey bands, hero visual well, dropdown row hover, nested note tiles, **text on primary buttons** |
| **White** | `#FFFFFF` | Page ground, cards, dropdown, footer, inverse CTA button |
| **On-blue lead** | `#CCE5FF` | Utility-bar copy, final-CTA supporting sentence |
| **On-blue eyebrow** | `#A3D1FF` | Final-CTA “Get Started” eyebrow |

### 2.2 Usage ladder (text)

| Level | Color | Typical size |
|---|---|---|
| Headings and primary UI | `#1A1A1A` | Spectral 30–50px; Manrope 14–15px bold |
| Body / leads | `#606060` | 16–18px, line-height 1.6–1.65 |
| Footer links | `#464646` | 14.5px |
| Captions, meta, soon labels | `#878787` | 11–13px |
| Do not use for readable body | `#B2B2B2` | Separators and inactive chrome only |

### 2.3 Surfaces

| Surface | Value | Pattern |
|---|---|---|
| Default page | `#FFFFFF` | Hero, stats, modules, testimonials, footer |
| Alternating band | `#F5F5F5` + `1px solid #E3E3E3` top and bottom | Logo strip, Who We Serve, EHR band |
| Utility bar | `#006AD6` | Homepage-only announcement strip |
| Final CTA | `#006AD6` full bleed | Closing band, not a rounded inset card |
| Navbar | `rgba(255,255,255,0.94)` + `blur(10px)` | Sticky, `1px solid #E3E3E3` bottom |

### 2.4 Interactive color

| State | Value |
|---|---|
| Link / control hover | text `#007EFF`, underline |
| Dropdown row hover | text `#007EFF`, background `#F5F5F5`, **no underline** |
| Social icon rest | `#878787` |
| Social icon hover | `#007EFF`, no underline |
| Selection | background `#007EFF`, text `#FFFFFF` |
| Inverse button on `#006AD6` | fill `#FFFFFF`, label `#006AD6` |

### 2.5 What not to add

The Homepage does **not** use teal, amber, coral, red, green, navy `#0F1D54`,
or invented near-white blues (`#EAF4FF`, `#F6F9FF`, etc.). Do not introduce
them when restyling remaining pages to match the Homepage.

Official brand-book ramps still overlap this palette (`#CCE5FF` … `#0056AD`
and `#F5F5F5` … `#1A1A1A`). If a step is not listed above, do not reach for it
unless the Homepage already uses it.

---

## 3. Typography

The Homepage is a **three-family system**. Remaining pages should follow this,
not the older Plus Jakarta Sans-only scale.

### 3.1 Families

| Role | Family | CSS variable | Loaded weights |
|---|---|---|---|
| **UI / body / chrome** | **Manrope** | `--font-hl-sans` | 400, 500, 600, 700, 800 |
| **Display / headings / quotes** | **Spectral** | `--font-hl-serif` | 400, 500, italic |
| **Kickers / step labels** | **JetBrains Mono** | `--font-hl-mono` | 400, 500, 600 |

Implementation:

- Homepage wrapper sets all three `next/font` variables and class `home-landing`.
- Site chrome (Navbar + Footer) uses Manrope via `--font-hl-sans` (also loaded
  on `<html>` in `app/layout.tsx`).
- Class helpers: `.hl-serif` and `.hl-mono` in `home-landing.css`.
- Default Homepage body: Manrope, `#1A1A1A`, `line-height: 1.5`, antialiased.

Plus Jakarta Sans is still loaded globally for older inner pages. **Do not treat
it as the Homepage standard.** When a remaining page is brought onto this
system, switch its page content to Manrope + Spectral + JetBrains Mono.

### 3.2 Type recipes (actual Homepage values)

#### Eyebrow / kicker (Manrope)

Used for “Who We Serve”, “AI Offerings”, “Built for Ease”, “In Their Words”,
and mobile nav group labels.

```
font-size: 12.5px
font-weight: 700
letter-spacing: 1.6px
text-transform: uppercase
color: #606060
```

On the blue final CTA, the same recipe uses `#A3D1FF`.
The hero award pill uses the same size/weight/tracking in `#007EFF`.

#### Mono kicker (JetBrains Mono)

Used for “01 — PaaS”, “Module 01”, “Step 1”.

```
font-size: 12.5px   (10.5px inside compact step tiles)
color: #878787      (#B2B2B2 for uppercase “Step N”)
```

#### Hero h1 (Spectral)

```
font-family: Spectral
font-weight: 500
font-size: 50px          →  38px at max-width 860px
line-height: 1.15
letter-spacing: -0.5px
max-width: 900px
emphasis: italic Spectral in #007EFF
```

#### Section h2 (Spectral)

| Context | Size | Weight | Line-height | Color |
|---|---|---|---|---|
| Who We Serve / Modules / Testimonials | 42px | 500 | 1.15 | `#1A1A1A` |
| EHR / “Built for Ease” | 38px | 500 | 1.18 | `#1A1A1A` |
| Final CTA | 44px | 500 | 1.15 | `#FFFFFF` |

Intro copy under an h2 is capped at `max-width: 640px`.

#### Module / card h3 (Spectral)

```
Module title:   30px / 500 / Manrope body below
Audience card:  15.5–16px / 500
```

#### Stats (Spectral)

```
figure: 46px / 500
caption: Manrope 14px / #606060 / line-height 1.5
```

#### Body (Manrope)

| Use | Size | Weight | Color | Line-height | Max width |
|---|---|---|---|---|---|
| Hero lead | 18px | 400 | `#606060` | 1.6 | 660px |
| Section lead | 17px | 400 | `#606060` | 1.6 | 640px |
| Module body | 16px | 400 | `#606060` | 1.65 | column |
| Card body | 15px | 400 | `#606060` | 1.65 | cell |
| Proof line under hero | 14.5px | 700 | `#606060` | — | — |
| Bullets | 15px | 400 | `#1A1A1A` | — | — |
| Quote | Spectral italic 17px / 1.5 | — | `#1A1A1A` | — | 340px card |
| Attribution | 13px `#606060`, name strong `#1A1A1A` | | | | |

#### Chrome type (Manrope)

| Use | Size | Weight | Color |
|---|---|---|---|
| Nav links / Download App / Menu | 14px | 700 | `#1A1A1A` → hover `#007EFF` |
| Dropdown / mobile items | 14.5px | 600 | `#1A1A1A` |
| Nav CTA | 14px | 700 | `#F5F5F5` on `#007EFF` |
| Footer column heading | 12.5px / 700 / letter-spacing 1px / uppercase / `#606060` |
| Footer links | 14.5px / `#464646` |
| Footer blurb | 14px / `#606060` / line-height 1.6 / max-width 300px |
| Footer bottom | 13px / `#878787` |
| Launching Soon | 11px / 700 / uppercase / letter-spacing 0.8px / `#878787` |
| Utility bar | 12.5px / `#CCE5FF`, link `#FFFFFF` / 700 |

### 3.3 Weight map

| Weight | Use |
|---|---|
| Spectral 500 | All Homepage headings and stat figures |
| Spectral italic | Hero emphasis word, testimonial quotes |
| Manrope 700 | Eyebrows, nav, buttons, proof line, “Ready” micro-label |
| Manrope 600 | Dropdown items, EHR chips, compact note titles |
| Manrope 400 | Body, leads, captions |

Do not set Spectral headings to 700/800. The Homepage look is **medium serif**,
not extra-bold sans.

### 3.4 Responsive type

The only Homepage heading override is:

```
@media (max-width: 860px) {
  h1.hero-h1 { font-size: 38px; }
}
```

Body sizes do not scale. Keep 15–18px body at every width. Do not shrink
readable copy below ~14px.

---

## 4. Logo

Use `components/Logo.tsx`. Never redraw, recolor, stretch, rotate, or shadow
the mark.

| Placement | Height | Variant |
|---|---|---|
| Navbar | **30px** | blue (`murphi-logo-blue.png`) |
| Footer | **26px** | blue |
| Absolute digital minimum | 24px | — |

- Blue lockup on white / light grey.
- White lockup only on dark or `#006AD6` surfaces (not used in current chrome).
- Navbar logo links to `/`. Footer logo links to `/` with
  `aria-label="Murphi.ai home"`.

---

## 5. Layout and spacing

### 5.1 Containers

| Region | Max width | Horizontal padding |
|---|---|---|
| Page sections (hero, stats, modules, bands) | **1220px** | **32px** |
| Navbar inner bar | **1240px** | **16px 32px** (vertical / horizontal) |
| Footer inner | **1220px** | Footer itself `72px 32px 40px` |
| Section intro / h2 column | **640px** | — |
| Hero h1 | **900px** | — |
| Hero lead | **660px** | — |
| Final CTA heading | **720px** | — |
| Final CTA lead | **520px** | — |
| Footer blurb | **300px** | — |

Center with `margin: 0 auto`. Do not invent a third site width.

### 5.2 Vertical rhythm (Homepage sections)

| Section | Padding |
|---|---|
| Utility bar | `9px 32px` |
| Navbar | `16px 32px` |
| Hero | `96px 32px 40px` |
| Logo strip | `44px 0` |
| Stats | `88px 32px` |
| Who We Serve | `100px 32px` |
| Modules | `110px 32px` |
| EHR band | `96px 32px` |
| Testimonials | `110px 0` (heading row still `0 32px`) |
| Final CTA | `120px 32px` |
| Footer | `72px 32px 40px` |

**Target band for remaining inner sections:** about **88–110px** vertical
padding on desktop, with **32px** side gutters. Do not exceed the Homepage
final-CTA `120px` for ordinary content sections.

### 5.3 Internal spacing

Common Homepage gaps:

```
2px   dropdown list gap
6–8px icon-to-label
10px  bullets, footer link stack, payment-step grid
12px  eyebrow → (mobile), dropdown hover slot
14px  button pair / nav-action group / footer logo → blurb
16px  eyebrow → h2
18px  h2 → lead
20px  testimonial card gap; CTA lead → button
24px  logo-strip eyebrow → marquee; audience card padding x
28px  hero award → h1; trust-strip gap
32px  stats grid gap; page gutters
40px  footer column gap; hero visual → trust strip; CTA copy → button
64px  module two-column gap; section intro → grid
84–96px  stacked module blocks
```

Eyebrow → heading → lead is always that order. Typical:

```
eyebrow  margin-bottom 16px
h2       margin-bottom 18px
lead
then     64px before the grid / visual
```

### 5.4 Grids

| Pattern | Desktop | ≤860px |
|---|---|---|
| `.grid-3` audience cards | 3 columns, **1px gap**, `#E3E3E3` as both gap and border | 1 column |
| `.stat-4` | 4 columns, 32px gap | 2×2 |
| `.grid-4` | 4 columns | 2 columns |
| `.module-row` | `1fr 1fr`, 64px gap, vertically centered | 1 column; **visual (`:nth-child(2)`) stacks first** |
| `.flow-3` | 3 columns | 1 column |
| Footer | `1.4fr 1fr 1fr 1fr 1fr`, 40px gap | see Footer |

Ruled 3-up cards: put the grid on `#E3E3E3` with `gap: 1` and white cells.
That is the Homepage “card grid” — not 24px-gapped rounded tiles.

---

## 6. Borders, radius, and shadows

### 6.1 Borders

Default: **`1px solid #E3E3E3`**.

Also used:

- Card recipe `CARD`: `1px solid #EFEFEF`
- Emphasis tile: `1px solid #007EFF`
- EHR chips: `1px solid #B2B2B2`
- Award pill: `1px solid #007EFF`
- Dropdown / nav: `1px solid #E3E3E3`
- Launching Soon rules: 1px `#E3E3E3`

Do not use 2–3px frames except the 1.5px blue rings on product nodes.

### 6.2 Radius (Homepage scale)

| Token-in-practice | Value | Use |
|---|---|---|
| Button (page CTA) | **3px** | Request Demo |
| Button (nav CTA) | **4px** | Sign Up / Sign In |
| Menu item | **6px** | Dropdown rows |
| Menu / visual / quote card | **8px** | Dropdown panel, hero well, testimonials, nested notes |
| Product card | **10px** | Shared `CARD` style |
| Chat bubble | `3px 14px 14px 14px` | Message visual |
| Pill | **20px** | Award badge, EHR chips |
| Avatar / node | **50%** | Initials, flow dots |

Do **not** use the older 12 / 20 / 28 / 40px radius scale when matching the
Homepage. Those belong to the previous inner-page system.

### 6.3 Shadows

Homepage shadow (cards **and** dropdown):

```
0 1px 2px rgba(0, 0, 0, 0.03),
0 14px 30px rgba(0, 0, 0, 0.05)
```

- Soft, wide, low opacity.
- Buttons have **no** drop shadow and **no** hover lift.
- Navbar has **no** drop shadow; separation is the hairline + blur.
- Do not add large blue-tinted marketing shadows.

---

## 7. Buttons

### 7.1 Primary (Homepage hero)

```
background: #007EFF
color:      #F5F5F5
padding:    15px 30px
radius:     3px
font:       Manrope 15px / 700
href:       /contact-us/
label:      Request Demo
```

No border, no shadow, no translate on hover. Link hover still tints to
`#007EFF` via global `a:hover` — keep the fill `#007EFF` and the label
`#F5F5F5` via inline / a dedicated class so the button does not invert.

### 7.2 Inverse (final CTA on `#006AD6`)

```
background: #FFFFFF
color:      #006AD6
padding:    16px 34px
radius:     3px
font:       15.5px / 700
```

### 7.3 Nav CTA (shared Navbar)

```
background: #007EFF
color:      #F5F5F5
padding:    10px 20px
radius:     4px
font:       14px / 700
label:      Sign Up / Sign In
href:       https://murphi.murphiconnect.ai/login
```

This is **one** control, not two buttons. There is no separate Sign In link.

### 7.4 Button rules

- One primary button per view.
- Full-bleed colored bands use the inverse white button, not a second blue
  button on blue.
- Do not gradient-fill buttons.
- Do not use 12px radius or 2px hover lift when matching Homepage.
- Pair spacing when two actions sit together: **14px**.

---

## 8. Links, labels, and badges

### 8.1 Text links

```
rest:  no underline, inherit or #1A1A1A (#464646 in footer)
hover: underline + #007EFF
```

Dropdown rows and social icons are the exception: hover is color + grey fill
(or blue icon), **without** underline.

### 8.2 Award / status pill (hero)

```
inline-flex, gap 8px
12.5px / 700 / 1.6px tracking / uppercase
color + border #007EFF
padding 7px 16px
radius 20px
margin-bottom 28px
```

### 8.3 EHR chips

```
13px / 600
padding 8px 14px
border 1px solid #B2B2B2
radius 20px
gap 10px, wrap
```

### 8.4 Launching Soon

Not a per-item “Soon” chip in the Navbar. A **divider row**:

```
line 1px #E3E3E3  |  “LAUNCHING SOON” 11px / 700 / 0.8px / #878787  |  line
```

Footer still appends a small `Soon` label (`11px / 700 / 0.6px / #878787`)
after Referral → NOA and AI-Driven RCM.

### 8.5 Trust strip

Uppercase 12.5px / 700 / letter-spacing 1px / `#606060`, centered, gap 28px,
separators `·` in `#B2B2B2`.

---

## 9. Cards and product visuals

### 9.1 Standard product card (`CARD`)

```
border: 1px solid #EFEFEF
border-radius: 10px
background: #FFFFFF
box-shadow: 0 1px 2px rgba(0,0,0,0.03), 0 14px 30px rgba(0,0,0,0.05)
padding: ~26–40px
```

Used for module visuals (dictation, revenue steps, thread, payments, EHR
flow). Static — **no hover lift**.

### 9.2 Ruled audience cards

White cells on a 1px `#E3E3E3` grid. Padding `36px 24px`. Mono kicker, Spectral
title, 15px `#606060` body. No per-card shadow.

### 9.3 Testimonial cards

```
width: 340px
min-height: 220px
padding: 32px 28px
border: 1px solid #E3E3E3
radius: 8px
background: #FFFFFF
```

Spectral italic quote, then caption. Marquee row, 20px gap, 46s loop.

### 9.4 Nested UI (notes, steps)

Inner tiles: white or `#F5F5F5`, `1px solid #E3E3E3` (or `#007EFF` when
selected), radius 8px, compact type 11.5–13.5px.

Completed / ready states: check glyph filled `#007EFF` with white tick;
“Ready” label `#007EFF` / 700.

Flow nodes: 34px circle, `1.5px solid #007EFF` at rest, filled `#007EFF` when
complete.

### 9.5 Product visuals

Built in markup (mic + pulse rings, message thread, payment steps, EHR fetch →
process → write-back). Blue only on the Murphi node / active step / check.

Pulse rings: 1.5px `#007EFF`, 2.4s scale 0.75 → 1.7, fade out.

Do not drop stock photography into these slots.

---

## 10. Navbar

**Shared site standard.** Implementation: `components/Navbar.tsx`.
Do not create a second navbar.

### 10.1 Structure (desktop, ≥861px)

```
[ Logo 30px ]     [ AI Modules ▾ ] [ Who We Serve ▾ ]     [ Download App ] [ Sign Up / Sign In ]
```

- Sticky, `top: 0`, `z-index: 50`
- Background `rgba(255,255,255,0.94)` + `backdrop-filter: blur(10px)`
- Bottom border `1px solid #E3E3E3`
- Inner: max 1240px, `16px 32px`, flex, space-between, gap 24px
- Center cluster gap **28px**
- Right cluster gap **18px**

There is no extra top-level link (About, Blog, etc.) in the bar. Those live in
the Footer.

### 10.2 Download App

- Route: `/download-app/`
- Icon `download` 16×16 + label
- Manrope 14px / 700 / `#1A1A1A`
- Sits immediately left of Sign Up / Sign In
- Hidden in the header under 861px; shown inside the mobile menu

### 10.3 Sign Up / Sign In

One blue button to `https://murphi.murphiconnect.ai/login`.
Always visible (desktop and mobile). Not two controls.

### 10.4 Dropdowns

| Menu | Panel width | Items |
|---|---|---|
| AI Modules | **480px** | Ambient AI & Dictation, Revenue Assurance, Patient Engagement, Patient Payments, then Launching Soon: Referral → NOA, AI-Driven RCM |
| Who We Serve | **440px** | Agencies, Coding/Billing/RCM, EHR Companies, Accreditation Bodies |

Behavior:

- Open on hover, focus, or click; close on leave, blur outside, Escape,
  pointerdown outside, or navigate.
- Hover bridge: slot is `top: 100%` with **12px padding-top** so the cursor can
  move into the panel without closing it.
- Panel: white, `1px #E3E3E3`, radius 8px, padding `10px 8px`, soft Homepage
  shadow.
- Row: icon 17px in a 20×20 `#007EFF` well, 12px gap, padding `12px 14px`,
  14.5px / 600, radius 6px.
- Hover row: `#007EFF` text + `#F5F5F5` fill.
- Chevron 13px, rotates 180° in 0.2s when open.
- `soon` items are **not** disabled — they still route to existing pages.

Item destinations are `lib/nav-data.ts` (always trailing slashes):

| Label | href |
|---|---|
| Ambient AI & Dictation | `/ambient-ai-dictation/` |
| Revenue Assurance | `/revenue-assurance/` |
| Patient Engagement | `/patient-engagement/` |
| Patient Payments | `/patient-payments/` |
| Referral → NOA | `/referral-to-noa/` |
| AI-Driven RCM | `/ai-driven-rcm/` |
| Home Health & Hospice Agencies | `/agencies/` |
| Coding, Billing, RCM & Consulting Companies | `/coding-billing-rcm/` |
| Home Health & Hospice EHR Companies | `/ehr-companies/` |
| Accreditation Bodies | `/accreditation-bodies/` |

### 10.5 Mobile (<861px)

- Hide `.hl-nav-links` and header Download App.
- Show text control **Menu** / **Close** (`aria-expanded`, `aria-controls`).
- Panel: white, top border `#E3E3E3`, padding `20px 32px 28px`.
- Group label uses the eyebrow recipe; items match dropdown rows.
- Include Download App at the bottom of the sheet.
- Close the sheet when the viewport crosses **861px**.

### 10.6 Homepage-only utility bar

Not part of the shared Navbar. A 12.5px strip above the nav:

```
background #006AD6
padding 9px 32px
text #CCE5FF
link MurphiConnect.ai → https://murphiconnect.ai  (#FFFFFF / 700)
```

Do not add this bar to inner pages unless product asks for it site-wide.

---

## 11. Footer

**Shared site standard.** Implementation: `components/Footer.tsx`.
White, minimal, five columns + bottom meta row.

### 11.1 Layout

```
padding: 72px 32px 40px
background: #FFFFFF
inner max-width: 1220px

grid: 1.4fr  1fr  1fr  1fr  1fr
gap: 40px
padding-bottom: 48px
border-bottom: 1px solid #E3E3E3
```

**Column 1 — Brand**

- Logo 26px → `/`
- 14px / `#606060` / line-height 1.6 / max-width 300px descriptor

**Column 2 — Modules** (from `AI_MODULES`)

- Ambient AI & Dictation → `/ambient-ai-dictation/`
- Revenue Assurance → `/revenue-assurance/`
- Patient Engagement → `/patient-engagement/`
- Patient Payments → `/patient-payments/`
- Referral → NOA → `/referral-to-noa/` + Soon
- AI-Driven RCM → `/ai-driven-rcm/` + Soon

**Column 3 — Company & Resources**

- Who We Serve → `/agencies/`
- About Us → `/about-us/`
- Blog → `/blogs/`
- Announcements → `/announcements/`
- FAQs → `/faqs/`
- Contact Us → `/contact-us/`

**Column 4 — Platform & Support**

- Integrations → `/integrations/`
- Security → `/security/`
- Download App → `/download-app/`

**Column 5 — Legal**

- Privacy Policy → `/privacy-policy/`
- Terms of Service → `/terms-of-service/`
- AI Terms of Use → `/ai-terms/`

Column headings: 12.5px / 700 / letter-spacing 1px / uppercase / `#606060` /
margin-bottom 16px.

Links: 14.5px / `#464646`, stacked gap **10px**. Hover: underline + `#007EFF`.

Never use `#`, empty hrefs, or placeholder URLs. Internal paths keep the
trailing slash.

### 11.2 Bottom row

Flex, space-between, wrap, gap 16px, padding-top 28px, 13px / `#878787`:

1. `© 2026 Deskfactors Inc. All rights reserved.`
2. Social icons (16px, gap 14px)
3. `HIPAA · SOC 2 · ISO 27001 · BAA`

### 11.3 Social icons

Exact existing URLs (do not invent or replace):

| Platform | URL | Icon |
|---|---|---|
| LinkedIn | `https://www.linkedin.com/company/murphi-ai` | `linkedin` |
| Instagram | `https://www.instagram.com/murphi.ai/` | `instagram` |
| Facebook | `https://www.facebook.com/people/Murphi-AI/61573179414309/` | `facebook` |
| X | `https://x.com/MurphiAI` | `x` |

```
color #878787 → hover #007EFF
target _blank
rel noopener noreferrer
aria-label "Murphi.ai on {Platform}"
```

### 11.4 Footer responsive

| Width | Grid |
|---|---|
| Default | 5 columns (`1.4fr` + 4×`1fr`) |
| ≤1100px | 4 columns; brand cell spans full row |
| ≤860px | 2 columns; brand cell spans full row |

---

## 12. Icons

Primary set: `components/icons.tsx`.

```
viewBox 0 0 24 24
fill none
stroke currentColor
stroke-width 1.7
round caps and joins
```

Brand marks (social) and a few product glyphs are filled `currentColor`.

| Size | Use |
|---|---|
| 13px | Nav chevron |
| 16px | Download App, footer social |
| 17px | Dropdown / mobile item icons |
| 14–16px | In-visual checks |
| 26–30px | Pulse-mic illustration |

Nav item icons sit in a 20×20 well, color `#007EFF`.

Add new glyphs to `components/icons.tsx`. Do not inline one-off SVGs on a page
when the house set already has the metaphor.

Names in use: `mic`, `chartup`, `community`, `card`, `route`, `exchange`,
`home`, `code`, `server`, `sealcheck`, `download`, `instagram`, `linkedin`,
`facebook`, `x`, `chevron`, plus the rest of the house set (`shield`, `pulse`,
`doc`, `heart`, `check`, `arrow`, `brain`, `network`, `layers`, `scan`,
`sync`, `phone`, `close`, `menu`).

---

## 13. Motion

Keep motion **quiet**. The Homepage uses a few named animations only.

| Name | Timing | Use |
|---|---|---|
| `hl-riseIn` | 0.9s `cubic-bezier(0.22, 1, 0.36, 1)` | Hero award / title / CTA (`.rise1` / `.rise2` +0.12s / `.rise3` +0.24s) |
| `hl-pulseRing` | 2.4s infinite | Mic rings |
| `hl-waveBar` | 1.1s infinite | Waveform bars (CSS helper) |
| `hl-marquee` | 34s logos / 46s quotes, linear infinite | Partner names, testimonials |
| Chevron | 0.2s | Dropdown open |

Rules:

- No page-load splash. No parallax. No scroll-jacking.
- No hover lift on buttons or static cards.
- Marquees are continuous but content, not decoration-only.
- Do not add extra entrance animations to every inner-page section.
- Honor `prefers-reduced-motion` for new motion (global CSS already damps
  animations on the rest of the site).

---

## 14. Responsive behavior

The Homepage’s primary layout breakpoint is **860px**. Shared chrome also
uses **1100px** for the footer and **861px** to collapse the nav.

Treat viewports as:

| Name | Width | What happens |
|---|---|---|
| Desktop / web | ≥861px | Full nav, 2-col modules, 3-col audience, 4-col stats, 5-col footer |
| iPad / tablet | ~861–1100px, and down through 860 | Footer brand spans full width at ≤1100px; at ≤860px nav becomes Menu, modules stack, stats 2×2, audience 1 col, footer 2 col |
| Mobile | ≤860px, down to 320px | 32px gutters remain; hero 38px; Download App moves into Menu; cards stack; visual-first module order |

### 14.1 Navigation

- ≥861px: inline AI Modules + Who We Serve + Download App + Sign Up / Sign In.
- ≤860px: logo | Menu + Sign Up / Sign In. Sheet lists both groups + Download App.
- Dropdowns are hover/click on desktop; mobile uses the sheet, not mega-menus.

### 14.2 Content

- Two-column splits become one column; the **visual column comes first**.
- 3-up grids become 1; 4-up stats become 2×2.
- Type mostly stays put except the hero h1.
- Keep 32px side padding (do not drop to 16px just to match older inner pages,
  unless a specific existing page already needs it — Homepage uses 32px).

### 14.3 Overflow

Homepage sets `overflow-x: hidden` on `.home-landing` because of marquees.
Wide rows must still be able to scroll internally. No page should create a
horizontal window scrollbar from 320px up.

Verify at **1440, 1024, 768, and 390** before finishing a restyle.

---

## 15. Page recipe for remaining pages

When bringing an existing page onto this system:

### Required chrome

```tsx
<Navbar />
<main>…page content…</main>
<Footer />
```

Do not add a second header or footer. Do not restore the old resizable navbar.
Do not add `pt-[80px]` — the new navbar is sticky **in flow**, not a fixed overlay.

### Content system

1. Optional eyebrow (12.5px / 700 / 1.6px / uppercase / `#606060`).
2. One Spectral `h1` (hero) or Spectral `h2` (section), weight **500**.
3. Manrope lead in `#606060`.
4. One primary CTA: `#007EFF` / `#F5F5F5` / `15px 30px` / radius 3px.
5. Alternate white and `#F5F5F5` bands with `#E3E3E3` hairlines.
6. Max content width **1220px**, gutters **32px**.
7. End with the existing page CTA if it has one, then the shared Footer.

### Matching checklist

```
□ Navbar and Footer are the shared Homepage components (once each)
□ Manrope body, Spectral headings (500), JetBrains kickers
□ Colors only from §2
□ Primary button matches §7
□ Cards use 8–10px radius and the soft black shadow (or 1px ruled grid)
□ No extra nav links, no “#” hrefs, trailing slashes on internal routes
□ Desktop / tablet / mobile checked
□ Page copy, routes, and imagery unchanged except chrome/visual system
```

### What not to port from older inner pages

- Plus Jakarta Sans as the display face
- `type-display` / `type-h1` 700 tracking-tight utilities as the heading look
- `btn-primary` 12px radius + lift + blue shadow
- Fixed 72px grey navbar
- Light-grey gradient footer or navy footer
- `rounded-hero` 28px / `rounded-cta` 40px marketing panels
- Blue-tint page heroes (`#EAF4FF`) unless already required by that page’s
  content layout — the Homepage hero is white

---

## 16. Do / don't

### Do

| | |
|---|---|
| ✅ | Treat the live Homepage as the visual source of truth |
| ✅ | Reuse `Navbar` and `Footer` as-is |
| ✅ | Use `#007EFF`, `#006AD6`, and the grey ladder in §2 |
| ✅ | Use Manrope / Spectral / JetBrains Mono as on the Homepage |
| ✅ | Keep buttons flat, small-radius, `#F5F5F5` on `#007EFF` |
| ✅ | Keep the footer white with the four columns + socials |
| ✅ | Keep Launching Soon as a divider in nav menus |
| ✅ | Keep spacing generous and layouts easy to scan |
| ✅ | Route every control to a real existing URL |

### Don't

| | |
|---|---|
| ❌ | Redesign the Homepage to match this document — the Homepage already is the spec |
| ❌ | Build a per-page navbar or footer |
| ❌ | Split Sign Up and Sign In into two buttons |
| ❌ | Reintroduce glass-heavy chrome, neon, glow, or large blue shadows |
| ❌ | Use gradients on buttons, nav, footer, or section fills |
| ❌ | Invent colors, fonts, or social URLs |
| ❌ | Use `#` or empty links |
| ❌ | Pack sections tightly or add decorative UI that the Homepage does not have |
| ❌ | Change page copy, images, or routes while applying the visual system |

---

## 17. Quick reference

```text
MURPHI.AI — HOMEPAGE DESIGN SYSTEM

Source of truth: components/home-landing/HomeLanding.tsx
Shared chrome:   components/Navbar.tsx · components/Footer.tsx

── COLOR ────────────────────────────────────────────────────────
Primary blue     #007EFF    buttons, icons, hover, emphasis
Dark blue        #006AD6    utility bar, final CTA band
On-blue text     #F5F5F5    labels on #007EFF
On-blue lead     #CCE5FF    copy on #006AD6
On-blue eyebrow  #A3D1FF    CTA kicker
Ink              #1A1A1A    headings, UI
Secondary        #606060    body, eyebrows
Footer links     #464646
Muted            #878787    meta, socials, soon
Rule / disabled  #B2B2B2
Border           #E3E3E3
Soft border      #EFEFEF
Surface          #F5F5F5    bands, hover rows
White            #FFFFFF    page, cards, footer, inverse button

── TYPE ─────────────────────────────────────────────────────────
UI / body        Manrope            --font-hl-sans
Headings         Spectral 500       --font-hl-serif
Kickers          JetBrains Mono     --font-hl-mono

Hero h1          Spectral 50px / 500 / 1.15 / -0.5px  → 38px ≤860px
Section h2       Spectral 38–42px / 500 / 1.15
Module h3        Spectral 30px / 500
Stats            Spectral 46px / 500
Eyebrow          12.5px / 700 / 1.6px / uppercase / #606060
Lead             17–18px / #606060 / 1.6
Body             15–16px / #606060 / 1.65
Nav              14px / 700 Manrope
Dropdown item    14.5px / 600

── LAYOUT ───────────────────────────────────────────────────────
Content width    1220px
Nav width        1240px
Gutters          32px
Section padding  ~88–110px vertical (CTA 120px)
Intro column     640px
Module split     1fr 1fr / gap 64px
3-up cards       gap 1px on #E3E3E3
Primary BP       860px (nav, grids) · footer also 1100px

── RADIUS / SHADOW ──────────────────────────────────────────────
Buttons          3px (page) · 4px (nav)
Cards / menus    8–10px
Pills            20px
Shadow           0 1px 2px rgba(0,0,0,.03), 0 14px 30px rgba(0,0,0,.05)

── BUTTONS ──────────────────────────────────────────────────────
Primary   #007EFF / #F5F5F5 / 15px 30px / r3 / 15px 700  → /contact-us/
Inverse   #FFFFFF / #006AD6 / 16px 34px / r3 / 15.5px 700
Nav CTA   #007EFF / #F5F5F5 / 10px 20px / r4 / 14px 700
          Sign Up / Sign In → https://murphi.murphiconnect.ai/login
FLAT. No gradient. No lift shadow.

── NAVBAR ───────────────────────────────────────────────────────
Sticky, white 94% + blur 10px, border-bottom #E3E3E3
Logo 30px | AI Modules 480px menu | Who We Serve 440px menu
Download App (icon 16) | Sign Up / Sign In
≤860px: Menu sheet + auth button; Download App inside sheet

── FOOTER ───────────────────────────────────────────────────────
White · 5 col · Modules | Company & Resources | Platform & Support | Legal
Socials 16px #878787 → #007EFF
  LinkedIn  https://www.linkedin.com/company/murphi-ai
  Instagram https://www.instagram.com/murphi.ai/
  Facebook  https://www.facebook.com/people/Murphi-AI/61573179414309/
  X         https://x.com/MurphiAI

── MOTION ───────────────────────────────────────────────────────
Hero rise 0.9s · pulse rings 2.4s · marquee 34s / 46s · chevron 0.2s
No extra decoration, no heavy animation.

STYLE: clean · minimal · simple · modern · professional · spacious
```

---

*Visual source of truth: the NEW Homepage implementation.
If this document and the Homepage disagree, update this file — do not restyle
the Homepage to match the document.*
