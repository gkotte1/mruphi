# Murphi.ai — Brand & UI Guidelines

**The single source of truth for Murphi.ai website branding and UI design.**

Read this before building or modifying any page. If you follow it, the page you
build will visually belong to the same website without you needing to open the
original brand book.

| | |
|---|---|
| **Brand source** | `Murphi Brand Book 2026 V1.0.pdf` (repo root) |
| **Implementation** | `app/globals.css` — every token, type utility and button utility |
| **Stack** | Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 |
| **Company** | Murphi.ai — AI for Home Health & Hospice, operated by Deskfactors Inc. |
| **Brand book provenance** | "Murphi Brand Guidelines", year 2026, designed by Ephraim Design Studio. Brand contact: info@murphi.ai |
| **Last aligned** | 2026-09-02 — full site audited and brought onto the 2026 identity |

---

## How to read this document

Every rule carries one of two labels. **Do not blur them.**

| Label | Meaning |
|---|---|
| **`[OFFICIAL]`** | Stated explicitly in `Murphi Brand Book 2026 V1.0`. Non-negotiable. Quote the page number when challenged. |
| **`[IMPLEMENTATION]`** | A decision made by this codebase to apply an official rule consistently, or to cover something the brand book does not address. Changeable with good reason — but change it in `app/globals.css`, once, for the whole site. |

The brand book governs **colour, typography family, logo, backgrounds,
gradients and photography**. It says nothing about spacing scales, radii,
shadows, breakpoints, motion or component anatomy — everything in those
sections is `[IMPLEMENTATION]`.

---

## Table of contents

1. [Brand Overview](#1-brand-overview)
2. [Brand Principles](#2-brand-principles)
3. [Color System](#3-color-system)
4. [Typography](#4-typography)
5. [Logo Guidelines](#5-logo-guidelines)
6. [Backgrounds](#6-backgrounds)
7. [Gradients](#7-gradients)
8. [Buttons](#8-buttons)
9. [UI Components](#9-ui-components)
10. [Borders & Dividers](#10-borders--dividers)
11. [Border Radius](#11-border-radius)
12. [Shadows](#12-shadows)
13. [Spacing & Layout](#13-spacing--layout)
14. [Cards](#14-cards)
15. [Forms & Inputs](#15-forms--inputs)
16. [Navigation](#16-navigation)
17. [Footer](#17-footer)
18. [Icons](#18-icons)
19. [Photography & Imagery](#19-photography--imagery)
20. [Illustrations & Product Visuals](#20-illustrations--product-visuals)
21. [Animation & Motion](#21-animation--motion)
22. [Responsive Design](#22-responsive-design)
23. [Accessibility](#23-accessibility)
24. [Do / Don't](#24-do--dont)
25. [Page-Level Design Rules](#25-page-level-design-rules)
26. [Healthcare & Enterprise Design Principles](#26-healthcare--enterprise-design-principles)
27. [Existing Website Implementation Rules](#27-existing-website-implementation-rules)
28. [Creating a New Murphi.ai Page](#28-creating-a-new-murphiai-page)
29. [Quick Reference](#29-quick-reference)

---

## 1. Brand Overview

**`[OFFICIAL]`** — brand book 01, 02

> "Murphi's color palette is designed to reflect **clarity, precision, and
> trust** within the healthcare technology ecosystem. The palette combines
> blues that represent **intelligence and stability** with neutral tones that
> maintain a **clinical and professional environment**."

> "The Murphi logo represents the brand's focus on **intelligent healthcare
> infrastructure and scalable technology**."

**`[OFFICIAL]`** — the brand system applies "consistently across digital
interfaces, product experiences, marketing materials, and communications to
maintain a unified visual identity." The website is not a special case: the
same two hues and the same typeface as the product.

### Brand family

**`[OFFICIAL]`** — brand book 08, 09. Three logo lockups exist and they are not
interchangeable:

| Lockup | Use only for |
|---|---|
| **Murphi** | The company and this marketing site |
| **Murphi.in** | "the product ecosystem within the Murphi platform" — only when referencing that specific product |
| **Murphi Connect.ai** | "a specialized platform within the Murphi ecosystem designed for interoperability and integration" — only in contexts directly related to Murphi Connect products or services |

All three "follow the same spacing, scale, and color rules defined in the
Murphi logo system" and share "the same typography and proportions as the
primary Murphi logo."

---

## 2. Brand Principles

**`[OFFICIAL]`** — the adjectives the brand book itself uses: clarity,
precision, trust, intelligence, stability, clinical, professional, clean,
accessible, unified.

**`[IMPLEMENTATION]`** — translated into working rules:

1. **Two hues, no third.** Blue and grey. Every accent, state, chart and status
   indicator resolves onto those ramps. If a design needs a third colour to
   work, the design is wrong.
2. **Restraint is the brand.** This is clinical software. Surfaces are flat,
   colour is used sparingly, and blue means *something is interactive or
   important* — it is not decoration.
3. **Hierarchy through type and space, not through colour.** A section is
   separated by whitespace and a hairline, not by a coloured band.
4. **Every element earns its place.** No decorative shapes, no floating cards
   without purpose, no motion without meaning.
5. **Readable first.** Healthcare buyers read carefully. Body copy is never
   below 13.5px and never lighter than `#606060` on white.

---

## 3. Color System

### 3.1 The two ramps — `[OFFICIAL]`, brand book 01

The brand book defines exactly two eight-step ramps. **These are the only
colours in the brand.**

#### Bright Blue

| Step | Hex | Token | Tailwind class | Role |
|---|---|---|---|---|
| 1 | `#CCE5FF` | `--color-blue-50` / `--color-brand-ghost` / `--color-brand-tint` | `bg-brand-ghost`, `bg-brand-tint` | Light blue chip and badge fills, highlighted card backgrounds |
| 2 | `#A3D1FF` | `--color-blue-100` / `--color-brand-pale` / `--color-brand-border` | `border-brand-border`, `bg-brand-pale` | Blue hairlines, active/pressed light states |
| 3 | `#7ABCFF` | `--color-blue-200` | `bg-blue-200` | Reserved — mid-ramp illustration step |
| 4 | `#52A7FF` | `--color-blue-300` / `--color-brand-light` | `text-brand-light` | Light accent inside product visuals |
| 5 | `#2993FF` | `--color-blue-400` / `--color-brand-mid` | `bg-brand-mid` | Opening stop of blue panel gradients |
| 6 | **`#007EFF`** | `--color-blue-500` / `--color-brand` | `bg-brand`, `text-brand` | **Primary.** Panels and buttons, primary interactive elements |
| 7 | `#006AD6` | `--color-blue-600` / `--color-brand-dark` | `bg-brand-dark`, `text-brand-dark` | Header bars, button hover, links on white |
| 8 | `#0056AD` | `--color-blue-700` / `--color-brand-deep` | `bg-brand-deep`, `text-brand-deep` | Pressed state, deepest emphasis, closing gradient stop |

#### Grey

| Step | Hex | Token | Tailwind class | Role |
|---|---|---|---|---|
| 1 | `#F5F5F5` | `--color-grey-50` / `--color-grey-bg` | `bg-grey-bg`, `text-grey-bg` | Light neutral grey surfaces; **text on blue panels and buttons** |
| 2 | `#EFEFEF` | `--color-grey-100` / `--color-grey-soft` | `bg-grey-soft` | The second surface step, one shade down from `#F5F5F5` |
| 3 | `#E3E3E3` | `--color-grey-200` / `--color-grey-mid` | `border-grey-mid`, `bg-grey-mid` | **All borders, hairlines and dividers** |
| 4 | `#B2B2B2` | `--color-grey-300` / `--color-grey-bdr` | `text-grey-bdr` | Disabled marks, inactive dots, decorative rules |
| 5 | **`#878787`** | `--color-grey-400` / `--color-ink-muted` | `text-ink-muted` | **Primary grey.** Greyed-out text, captions, placeholders |
| 6 | `#606060` | `--color-grey-500` | `text-grey-500` | Secondary body copy |
| 7 | `#464646` | `--color-grey-600` / `--color-grey-dk` | `text-grey-dk` | Default body copy (the `<body>` colour) |
| 8 | `#1A1A1A` | `--color-grey-700` / `--color-ink` | `text-ink` | **Standard text colour** — all headings and primary copy |

### 3.2 Primary brand colours — `[OFFICIAL]`, brand book 01

> "Grey (`#878787`) and Bright Blue (`#007EFF`)"

These two are the brand. Everything else on the ramps is a supporting step.

### 3.3 The book's UI assignments — `[OFFICIAL]`, brand book 01

The brand book names five specific interface roles. **Follow these literally.**

```
#007EFF  =  Color for panels and for buttons
#F5F5F5  =  Text on panels and buttons
#006AD6  =  Header bar colors
#1A1A1A  =  Standard Text Color
#878787  =  Text Greyed out color
```

Practical reading of each:

- **`#007EFF` panels and buttons** — every primary button fill, and any panel
  that is meant to read as a blue surface. Flat, not gradient (see §7).
- **`#F5F5F5` text on panels and buttons** — the label on a blue button is
  `#F5F5F5`, not pure white. Same for headings and copy sitting on a blue
  panel. See §23.2 for the contrast note.
- **`#006AD6` header bars** — `[IMPLEMENTATION]` this codebase reads "header
  bar" as the *product's* application header bar, not the marketing site's
  navigation. On the website `#006AD6` carries button hover, pressed accents,
  in-copy links, and the header strip of product mock UIs. The site navigation
  stays white/light grey; repainting it would be a redesign, not an alignment.
- **`#1A1A1A` standard text** — every heading and every piece of primary copy.
- **`#878787` greyed-out text** — captions, meta lines, placeholders, disabled
  labels. Never body copy.

### 3.4 Additional colour rules — `[IMPLEMENTATION]`

There is exactly one colour in the codebase that is not on the two ramps:

| Hex | Token | Why it exists |
|---|---|---|
| `#0F1D54` | `--color-deep` | Brand book 10 lists **deep blue** as a preferred background but prints no hex for it. `#0F1D54` is the deep navy the brand book itself uses on every page of the PDF, sampled from the document. Use it only as a dark background surface, never as text or an accent. |

`#FFFFFF` and `#000000` are not brand colours but are permitted: white as a
preferred background (brand book 10) and black only as an SVG default that is
always overridden by `currentColor`.

**Nothing else.** No teal, no amber, no coral, no red, no green, no
"success/warning/error" palette. The site previously carried those; they were
removed. Semantic meaning is now carried on the blue–grey axis (see §9.7).

### 3.5 Colour usage rules — `[IMPLEMENTATION]`

- **Never hardcode a hex.** Use the token class (`text-ink`, `bg-brand`,
  `border-grey-mid`). Raw hex is only acceptable inside a `linear-gradient()`
  string where Tailwind cannot resolve a token, and even then the value must be
  a ramp step.
- **Never invent an intermediate shade.** If `#F5F5F5` feels too heavy and
  white too light, the answer is one of them — not `#FAFAFA`.
- **Blue is a signal.** A page should have a handful of blue elements, not a
  blue wash. Count them: if more than roughly one element in six is blue, cut.
- **Text colour ladder**, top to bottom: `#1A1A1A` headings → `#464646` body →
  `#606060` secondary → `#878787` captions and meta. Never skip downward past
  `#878787` for anything a reader has to read.

---

## 4. Typography

### 4.1 The typeface — `[OFFICIAL]`, brand book 12

> "**Plus Jakarta Sans** is the primary typeface used across Murphi's digital
> platforms and brand communications."

The brand book shows five weights and names **no second family**. There is no
brand mono, no display face, no serif.

**`[IMPLEMENTATION]`** — loaded once in `app/layout.tsx` via `next/font/google`
at weights `300, 400, 500, 600, 700, 800`, exposed as `--font-jakarta` and
wired to `--font-sans` / `--default-font-family` in `@theme`. Every element on
the site inherits it. **Do not add another `next/font` import to any route.**

> The site previously loaded IBM Plex Mono on twelve routes for eyebrows and
> chips. It was removed — it is not in the brand book. Do not reintroduce it or
> any other decorative face.

### 4.2 The hierarchy — `[IMPLEMENTATION]`

The brand book does not specify sizes, weights, line heights or letter
spacing. This scale is taken from the reference site's own stylesheet — which
sets `h1,h2,h3,h4 { font-weight: 700; letter-spacing: -0.02em }` — and is
defined once in `app/globals.css` as Tailwind `@utility` classes.
**Use the utility. Never restate the values inline.**

| Utility | Size | Weight | Tracking | Leading | Use for |
|---|---|---|---|---|---|
| `type-display` | `clamp(34px, 3.6vw, 48px)` | 700 | −0.02em | 1.14 | Home hero `<h1>`; the closing CTA statement |
| `type-h1` | `clamp(32px, 4vw, 46px)` | 700 | −0.02em | 1.12 | Inner page `<h1>` |
| `type-h2` | `clamp(28px, 3.2vw, 42px)` | 700 | −0.02em | 1.15 | Section headings |
| `type-h3` | `clamp(26px, 2.7vw, 36px)` | 700 | −0.02em | 1.15 | Sub-section headings |
| `type-h4` | `clamp(19px, 1.9vw, 25px)` | 700 | −0.02em | 1.25 | Group headings inside a section |
| `type-lead` | `clamp(15.5px, 1.15vw, 17px)` | 400 | — | 1.70 | The standfirst under a heading |
| `type-body` | `15px` | 400 | — | 1.75 | Default body copy (also the `<body>` default) |
| `type-body-sm` | `13.5px` | 400 | — | 1.65 | Dense copy inside cards and panels |
| `type-label` | `11px` | 700 | +0.1em | 1.0 | Eyebrows and chips, uppercase |
| `type-micro` | `10px` | 700 | +0.08em | 1.4 | Micro labels inside product visuals, uppercase |
| `type-nav` | `14px` | 600 | −0.01em | 1.2 | Navigation links |
| `type-btn` | `15px` | 700 | −0.01em | 1.2 | Button labels (already baked into the button utilities) |

**The type utilities set size, weight, tracking and leading only — never
colour.** Pair them with a colour class: `class="type-h2 text-ink"`. This is
deliberate, so a heading on a blue panel can take `text-grey-bg` without
fighting the utility.

Card titles and other component labels below 19px are component-level
decisions, not part of the heading hierarchy — set them inline
(`text-[15px] font-bold`) and keep them consistent within the component.

### 4.3 Weight usage — `[IMPLEMENTATION]`

| Weight | Use |
|---|---|
| 800 (extrabold) | Statistic figures only — the big numbers in a stats row |
| 700 (bold) | **Every heading**, `type-display` through `type-h4`; buttons; card titles; emphasis inside copy |
| 600 (semibold) | Navigation links, the label treatment on module pages |
| 500 (medium) | Meta lines, secondary UI text |
| 400 (regular) | All body copy and leads |
| 300 (light) | Loaded but effectively unused — do not start using it for body copy |

### 4.4 Responsive typography — `[IMPLEMENTATION]`

Headings use `clamp()`, so they scale continuously between the minimum
(mobile) and maximum (large desktop) with no breakpoint jump. **Do not add
breakpoint overrides to a heading size** — if the clamp is wrong, fix the
utility, not the call site.

Body copy does **not** scale. `15px` at every width. A few components step to
`14px` under `max-1200` where the column narrows; that is the exception, not
the pattern.

### 4.5 Paragraph rules — `[IMPLEMENTATION]`

- Measure: cap body columns at roughly 62–70 characters — `max-w-[560px]` for a
  lead, `max-w-[62ch]` inside a text block.
- `text-wrap: balance` is applied to `h1`–`h4` globally in the base layer. Do
  not re-apply it.
- Never justify text. Never centre a paragraph longer than three lines.

---

## 5. Logo Guidelines

### 5.1 The approved lockups — `[OFFICIAL]`, brand book 02

| Lockup | Definition | In this repo |
|---|---|---|
| **Combination logo** | "The Murphi wordmark used in most brand communications." | `<Logo />` from `components/Logo.tsx` |
| **Icon logo** | "The icon version used in compact spaces such as app icons, dashboards, and social media avatars." | `<LogoMark />` from the same file |

**`[OFFICIAL]`** — "The logo should always be used in its approved forms and
should never be altered, stretched, or recolored outside the defined brand
palette."

### 5.2 Colour variants — `[OFFICIAL]`, brand book 05, 06, 07, 10

- Two files ship: `public/brand/logos/murphi-logo-blue.png` and
  `murphi-logo-white.png`.
- **"Dark logos should be used on light backgrounds. White logos should be used
  on dark backgrounds."** (brand book 10)
- A **mono-colour version** exists for accessibility and for reproduction
  "where color is limited, such as in black and white publications" — it
  "remains clear and accessible, including for audiences with color vision
  deficiencies." Both the icon logo and the combination logo have mono
  variants.

### 5.3 Minimum size — `[OFFICIAL]`, brand book 04

> **Digital — minimum height: 24px**
> Print — minimum height: 10mm

**This is a hard floor.** `<Logo height={…} />` and `<LogoMark size={…} />` must
never be called with a value below `24`. Current usages: navbar 28, footer 30,
every icon mark 24.

### 5.4 Mobile app icon — `[OFFICIAL]`, brand book 03

> "The Murphi mobile application icon uses the brand symbol in a simplified
> format designed for clarity at small sizes. The icon must remain visually
> clean and centered within the app container."
>
> - Use the approved blue background only
> - **Do not place the icon on gradients**
> - Maintain equal padding around the symbol
> - Do not modify the icon shape
>
> Recommended size ratios — **Icon padding: 20%. Symbol scale: 60%.**

Shipped at `public/brand/app-icons/` (32, 180, 192, 270 and `favicon.ico`).

### 5.5 Misuse — `[OFFICIAL]`, brand book 04

> "To maintain brand consistency, the Murphi logo must never be modified in
> ways that distort its appearance."

Nine named prohibitions:

1. Stretch or distort the logo
2. Rotate the logo
3. Change the logo colors
4. **Apply shadows or effects**
5. Place the logo on visually complex backgrounds
6. Alter the spacing between letters
7. (Plus the mobile-icon rules above: no gradients behind it, no shape changes)

**`[OFFICIAL]`** brand book 11 adds: **"Gradients should not be used inside the
logo."**

### 5.6 Clear space and placement — `[IMPLEMENTATION]`

The brand book states the principle ("maintain equal padding around the
symbol", "do not place the logo on visually complex backgrounds") but prints no
clear-space diagram for the combination logo. This codebase uses:

- **Clear space:** at least the height of the icon mark on all four sides —
  for a 28px logo that is 28px of clear space. Nothing else enters that box.
- **Placement:** top-left of the navigation, left-aligned in the footer brand
  column. Never centred, never in a corner of a busy visual.
- **Backgrounds:** white, `#F5F5F5`, or a flat brand blue. Never over a
  photograph, a mesh, or a gradient that changes value behind the mark.
- **Never recreate the mark in code.** It is a hand-drawn swirl-and-arrow that
  does not survive reconstruction. Always render the bitmap through
  `components/Logo.tsx`.

---

## 6. Backgrounds

### 6.1 Approved backgrounds — `[OFFICIAL]`, brand book 10

> "Murphi backgrounds should maintain clarity and contrast to ensure
> readability and brand consistency.
>
> **Preferred backgrounds include: White · Light neutral grey · Deep blue**
>
> Guidelines: Dark logos should be used on light backgrounds. White logos
> should be used on dark backgrounds."

### 6.2 The four surfaces — `[IMPLEMENTATION]`

| Surface | Value | Class | Use |
|---|---|---|---|
| White | `#FFFFFF` | `bg-white` | The default page ground and every card |
| Light neutral grey | `#F5F5F5` | `bg-grey-bg` | Alternating section bands, input fields, quiet panels |
| Light neutral grey, second step | `#EFEFEF` | `bg-grey-soft` | A panel nested inside a `#F5F5F5` band, footers of cards |
| Deep blue | `#0F1D54` | `bg-deep` | Dark surfaces where one is genuinely required |
| Brand blue panel | `#007EFF` or the approved gradient | `bg-brand` | CTA panels and product highlights only |

### 6.3 Rules — `[IMPLEMENTATION]`

- **No invented tints.** A "very faint blue" background is not in the brand.
  Use `#F5F5F5`. The site previously carried more than twenty hand-mixed
  near-white blues (`#F6F9FF`, `#FAFCFF`, `#F7FAFE`…); all were removed.
- **Never nest a surface on itself.** A `#F5F5F5` card on a `#F5F5F5` section
  is invisible. Either step the surface (`#EFEFEF`) or give the card a white
  fill and an `#E3E3E3` border.
- **Section rhythm:** alternate white and `#F5F5F5` down the page. Two
  consecutive grey bands read as one section.
- **Section transitions:** either a flat colour change, or a
  `linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 50%, #FFFFFF 100%)` wash that
  returns to white. Never a hard coloured edge.
- **Text on each surface:** headings `#1A1A1A`, body `#464646`, captions
  `#878787` on white and `#F5F5F5`. On `#0F1D54` and on brand blue: `#F5F5F5`
  for text, `#FFFFFF` for marks and glyphs.

---

## 7. Gradients

### 7.1 The three approved gradients — `[OFFICIAL]`, brand book 11

| # | Stops | Token |
|---|---|---|
| 1 | `#007EFF → #0056AD` | `--gradient-brand` |
| 2 | `#FFFFFF → #007EFF` | `--gradient-brand-soft` |
| 3 | `#F7F7F7 → #CCE5FF` | `--gradient-brand-wash` |

### 7.2 Where gradients are allowed — `[OFFICIAL]`, brand book 11

The page is headed **"Gradient Color Usage (Only Social Media and Graphics)"**
and reads:

> "Murphi gradients are used to add depth and visual dimension to digital
> experiences while maintaining a clean and modern aesthetic.
>
> **Gradients are recommended for:** Hero sections · Product highlights ·
> Background visuals · UI illustrations · Social Media
>
> **Gradients should not be used inside the logo.**"

> ### ⚠️ This site renders flat — `[IMPLEMENTATION]`
>
> The brand book **permits** the three gradients above; it does not require
> them. The brand owner has chosen **solid surfaces everywhere**, so the site
> ships with **zero colour gradients** — no hero wash, no CTA panel gradient,
> no gradient icon well, no glow layer. §7.1 stays on record because the
> gradients are official brand assets, but nothing in this codebase uses them,
> and the theme no longer declares them as tokens.
>
> The only `linear-gradient()` left in the codebase is `mask-image` on the
> partner ticker and the two marquee rows. A mask paints no colour; it stops
> those rows cutting off hard at their edges. Do not use `mask-image` to
> reintroduce a colour effect.

### 7.3 Where gradients are *not* allowed — `[IMPLEMENTATION]`

Buttons are not on the book's list, so **buttons are flat `#007EFF`.** The site
previously filled every CTA with `linear-gradient(140deg, #006AD6, #007EFF)`;
all sixteen were flattened.

Also not on the list, and therefore not permitted:

- Body text or headings (no gradient text)
- Cards, tables, forms, inputs, accordions, navigation, footer
- Borders and dividers
- Icons
- The logo, in any lockup, at any size

### 7.4 Practical gradient rules — `[IMPLEMENTATION]`

- **Stay on the ramp.** A multi-stop blue panel runs through adjacent steps —
  `#2993FF → #007EFF → #006AD6` — never through an invented mid-tone.
- **One gradient per view.** A hero gradient *and* a CTA gradient *and* a card
  gradient on the same screen is noise.
- **Low contrast between stops.** The gradient adds depth; it should not read
  as two colours meeting.
- **Never as decoration.** If removing the gradient does not lose meaning or
  depth, remove it.

---

## 8. Buttons

### 8.1 The rule — `[OFFICIAL]`, brand book 01

```
#007EFF  =  Color for panels and for buttons
#F5F5F5  =  Text on panels and buttons
```

Plus brand book 11 by implication: buttons are not on the gradient list, so
they are flat.

### 8.2 The four utilities — `[IMPLEMENTATION]`

All four are defined in `app/globals.css` and each is the **complete control** —
shape, size, colour and every interaction state. A call site adds only its own
margin and responsive behaviour.

```tsx
<Link href="/contact-us/" className="btn-primary">Request Demo</Link>
<Link href="/download-app/" className="btn-secondary">Download App</Link>
<a href="…" className="btn-primary-sm">Request Demo</a>            {/* navigation */}
<Link href="/contact-us/" className="btn-on-blue">Request Demo</Link> {/* on a blue panel */}
```

#### `btn-primary` — the default call to action

| | |
|---|---|
| Background | `#007EFF` |
| Label | `#F5F5F5`, 15px / 700 / −0.01em |
| Padding | `15px 32px` |
| Radius | `--radius-card` (12px) |
| Shadow | `0 12px 28px -12px rgba(0,106,214,.7)` |
| Hover | background `#006AD6`, lift `translateY(-2px)`, shadow deepens |
| Active | background `#0056AD`, lift returns to 0 |
| Disabled | `opacity: .7`, `pointer-events: none` |
| Transition | 200ms ease on background, shadow, transform |

#### `btn-primary-sm` — the same button at navigation scale

Identical colours and states. `14px 20px` padding, `14px` label, `10px` radius,
`-1px` hover lift.

#### `btn-secondary` — the quiet alternative

| | |
|---|---|
| Background | `#FFFFFF` |
| Label | `#464646`, 15px / 700 |
| Border | `1px solid #E3E3E3` |
| Padding | `14px 28px`, radius 12px |
| Hover | border `#A3D1FF`, background `#CCE5FF`, label `#006AD6` |
| Active | background `#A3D1FF` |

#### `btn-on-blue` — the inverse pair, for a button on a blue panel

| | |
|---|---|
| Background | `#FFFFFF` |
| Label | `#006AD6`, 15px / 700 |
| Padding | `15px 32px`, radius 12px |
| Shadow | `0 4px 20px rgba(15,29,84,.14)` |
| Hover | lift `-2px`, shadow deepens |

### 8.3 Button rules — `[IMPLEMENTATION]`

- **One primary button per view.** If two CTAs sit together, the second is
  `btn-secondary`.
- **Never write a one-off button.** If a page needs a size that does not exist,
  add a utility to `globals.css` — do not spell out classes inline.
- Buttons go **full width under 600px** where they sit alone in a column:
  `className="btn-primary max-600:w-full"`.
- Icons inside buttons are 17×17 and inherit `currentColor`. The utility
  already provides `gap: .5rem`.
- **Never put a gradient on a button.**
- Button *text* and *destination* are content, not styling. Do not change them
  while restyling.

---

## 9. UI Components

Every component below uses the same vocabulary: white or `#F5F5F5` surface,
`#E3E3E3` hairline, `#1A1A1A` heading, `#464646`/`#606060` copy, `#878787`
meta, blue only for the interactive or important thing.

**All values in this section are `[IMPLEMENTATION]`** — the brand book does not
define component anatomy. The *colours* they use are `[OFFICIAL]`.

### 9.1 Cards

See §14 for the full anatomy.

### 9.2 Panels

A panel is a card that carries a header strip. The strip is either a hairline
(`border-b border-grey-mid`, label in `#878787` uppercase) or, for a product
mock, a blue bar (`#2993FF → #007EFF → #006AD6`, label in `text-white/85`).
Panel radius: `--radius-hero` (28px) for large product surfaces,
`--radius-panel` (20px) otherwise.

### 9.3 Accordions

`components/module-page/interactive.tsx` → `<Accordion items={…} defaultOpen={0} />`

| | |
|---|---|
| Item | `rounded-tile` (14px), `1px solid #E3E3E3`, `bg-white`, `12px` gap between items |
| Head padding | `18px 22px` |
| Question | `15px / 700 / #1A1A1A` |
| Sub-line | `12.5px / 400 / #878787` |
| Chevron | 11px, `#878787`, rotates 180° over 200ms |
| Body | slides on `max-height` over 280ms; padding `0 22px 22px` |
| Behaviour | one open at a time; `defaultOpen={-1}` opens none |

Use `<FaqSection items={FAQS.<page>} />` for a page's FAQ band — it already
carries the kicker, heading and 820px column.

### 9.4 Tabs

`components/module-page/Tabs.tsx`. Pill buttons over a single visible panel;
the active pill is filled `#1A1A1A` with white text, inactive pills are
`#606060` on white with an `#E3E3E3` border. **All panels are rendered** with
`hidden` on the inactive ones, so their copy still ships to crawlers.

### 9.5 Badges and chips

| Kind | Recipe |
|---|---|
| Eyebrow pill | `type-label` + `rounded-full border border-brand-ghost bg-brand-tint px-3.5 py-1.5 text-brand-dark` |
| Compliance chip | `rounded-[8px] border border-brand-border/50 bg-white px-2 py-[5px]` + `9.5px / 700` uppercase |
| Status — live | `border border-brand-pale bg-brand-ghost text-brand-deep` with a `bg-brand` dot |
| Status — soon | `border border-grey-mid bg-grey-soft text-grey-500` with a `bg-grey-bdr` dot |

### 9.6 Dropdowns (mega-menu)

Solid `bg-white`, `1px solid #E3E3E3`, `rounded-[22px]`, `--shadow-panel`.
Column headings `type-micro` in `#878787`; items `14px / 600 / #1A1A1A`
stepping to `#006AD6` on hover with a `#F5F5F5` row fill. **Not translucent, not
blurred** — see §24.

### 9.7 Status indicators and semantic meaning

**This is the most important consequence of the two-hue palette.** The brand
book defines no success/warning/error colours, so meaning is carried by
**value and shape**, not by hue:

| Meaning | Treatment |
|---|---|
| Live / active / positive | Brand blue `#007EFF`, filled |
| Not yet shipped / inactive | Grey `#EFEFEF` fill, `#606060` label, `#B2B2B2` dot |
| Flagged / needs attention | `#0056AD` — the deepest step, filled |
| Opportunity / informational | `#007EFF` — the bright step |

**Never carry meaning by colour alone.** Every status element must also have a
text label, an icon, or a position that makes it readable in monochrome. This
matters more here than on a site with a semantic palette.

### 9.8 Tooltips

`[IMPLEMENTATION]` — no tooltip component exists yet. When one is needed:
`bg-ink` (`#1A1A1A`), `text-grey-bg`, `12.5px`, `rounded-card`, `8px 12px`
padding, `--shadow-float`, 150ms fade. Must be reachable by keyboard and must
not be the only place information lives.

### 9.9 Tables

Header row `bg-grey-bg` with `type-micro` labels in `#878787`; body rows
separated by `border-b border-grey-mid`; cells `13.5px / #464646`; first
column `font-bold text-ink`. **Wrap every table in
`<div className="overflow-x-auto">`** — see §22.

### 9.10 Alerts and callouts

A callout is a card with a `3px` left rule in `#007EFF`, a `#EFEFEF` fill and
`rounded-r-tile`. No coloured alert variants exist; severity is expressed in
the copy and the icon.

### 9.11 CTA sections

Two shipped components, both ending a page:

- `<FinalCta />` — the full-bleed-inset blue panel: `--radius-cta` (40px, 24px
  under 600), the approved `#0056AD → #006AD6 → #007EFF` gradient,
  `type-display` heading in `#F5F5F5`, `btn-on-blue` button.
- `<GetStartedCta />` — the same panel with `type-h1` and a fixed description.

**Reuse one of these.** Do not build a third CTA panel.

---

## 10. Borders & Dividers

**`[IMPLEMENTATION]`**

| Use | Value | Class |
|---|---|---|
| Every card, panel, input and table border | `1px solid #E3E3E3` | `border border-grey-mid` |
| Section divider | `1px` line, `#E3E3E3` | `border-t border-grey-mid` or `h-px bg-grey-mid` |
| Border that should read blue | `1px solid #A3D1FF` | `border-brand-border` |
| Emphasis rule (left bar on a callout) | `3px solid #007EFF` | `border-l-[3px] border-brand` |
| Softened hairline | `border-grey-mid/80` | opacity, never a lighter hex |

Rules:

- **One border weight: 1px.** The only exception is the 3px emphasis rule.
- **Never use a border colour outside the ramp.** If a hairline is too strong,
  reduce its opacity (`/70`, `/80`) — do not mix a new grey.
- A card either has a border **or** a shadow carrying its separation. Both at
  full strength is heavy.
- Dividers get generous space: at least `40px` above and below on desktop.

---

## 11. Border Radius

**`[IMPLEMENTATION]`** — the brand book sets no radius rule. This scale is the
site's, defined in `@theme`. **Never write `rounded-[Npx]` when a token
matches.**

| Token | Value | Class | Use |
|---|---|---|---|
| `--radius-card` | `12px` | `rounded-card` | Buttons, inputs, small cards, chips with square-ish corners |
| `--radius-tile` | `14px` | `rounded-tile` | Accordion items, feature tiles, mock panels |
| `--radius-panel` | `20px` | `rounded-panel` | Content cards, article images, media panels |
| `--radius-hero` | `28px` | `rounded-hero` | Large product surfaces, hero cards |
| `--radius-cta` | `40px` | `rounded-cta` | The closing CTA panel (24px under 600px) |
| `--radius-canvas` | `56px` | `rounded-canvas` | The home hero stage |
| — | `9999px` | `rounded-full` | Pills, dots, avatars, icon wells |

**`[OFFICIAL]` by inference** — brand book 04 forbids distorting the logo, and
the visual language throughout the book is rounded. **Never use sharp
(0px) corners on a surface.**

---

## 12. Shadows

**`[IMPLEMENTATION]`** — the brand book mentions shadows only to *forbid* them
on the logo (brand book 04). Site shadows are permitted but restrained.

| Token | Value | Use |
|---|---|---|
| `--shadow-brand` | `0 4px 24px rgba(0,126,255,.12)` | A small blue-lit element |
| `--shadow-brand-md` | `0 8px 40px rgba(0,126,255,.18)` | A lifted blue element |
| `--shadow-brand-lg` | `0 20px 60px rgba(15,29,84,.12)` | A large floating surface |
| `--shadow-nav` | `0 2px 16px rgba(15,29,84,.08)` | The navigation bar once scrolled |
| `--shadow-panel` | `0 36px 80px -44px rgba(0,86,173,.55)` | Product panels and mega-menu |
| `--shadow-float` | `0 18px 44px -26px rgba(0,86,173,.42)` | Hover lift on a card |

Rules:

- **Every shadow tint is derived from the brand:** `rgba(0,126,255,…)`,
  `rgba(0,106,214,…)`, `rgba(0,86,173,…)` or `rgba(15,29,84,…)`. Never a neutral
  black shadow, never a coloured one from outside the ramp.
- **Wide, soft, low opacity, large negative spread.** A tight dark shadow reads
  as consumer UI, not clinical software.
- **Never a shadow on the logo.** `[OFFICIAL]`, brand book 04.
- Never more than one elevation level visible in the same group of cards.

---

## 13. Spacing & Layout

**`[IMPLEMENTATION]`** — none of this is in the brand book.

### 13.1 Containers

| Container | Width | Gutters | Used by |
|---|---|---|---|
| Site container | `max-w-[1280px]` | `px-10` → `max-1200:px-8` → `max-600:px-4` | Home, About, Integrations, Security, Contact, Announcements, navigation, footer |
| Module container | `max-w-[1220px]` | `px-8` → `max-720:px-5` | AI Module and Who We Serve pages, via `CONTAINER` from `components/module-page/ui.tsx` |

Both are centred with `mx-auto w-full`. **Pick the one that matches the page
family you are building and do not invent a third.**

Inner measures: `max-w-[820px]` for an FAQ column, `max-w-[760px]` for centred
section intros, `max-w-[620px]`/`max-w-[560px]` for leads, `max-w-[62ch]` for
long-form body copy.

### 13.2 Section rhythm

| Page family | Vertical padding |
|---|---|
| Marketing pages | `py-24` desktop → `max-1024:py-20` → `max-600:py-14` |
| Large sections (hero, testimonials) | `py-28` → `max-1024:py-20` → `max-600:py-16` |
| Module pages | `SECTION` = `py-[clamp(64px,9vw,128px)]` → `max-720:py-14` |

**Do not exceed `py-28` on desktop.** Long pages that scroll forever read as
unfinished, not premium.

### 13.3 The internal spacing ladder

Use these steps and no others:

```
4px  6px  8px  12px  14px  16px  20px  24px  28px  32px  40px  44px  56px  64px
```

Common patterns:

| Relationship | Space |
|---|---|
| Eyebrow → heading | `mt-7` (28px) |
| Heading → lead | `mt-5` (20px) |
| Lead → CTA | `mt-10` / `mt-11` (40 / 44px) |
| Section heading → content grid | `mt-14` (56px), `max-720:mt-9` |
| Between cards in a grid | `gap-6` (24px), `gap-5` under 1024 |
| Inside a card | `p-8` desktop → `max-600:p-6` |
| Between stacked list rows | `py-[11px]` with a hairline |

### 13.4 Grids

3-up card grids: `grid-cols-3` → `max-1024:grid-cols-2` → `max-600:grid-cols-1`.
4-up: `grid-cols-4` → `max-1200:grid-cols-2` → `max-600:grid-cols-1`.
Two-column text/visual splits: `grid-cols-[minmax(0,52fr)_minmax(0,48fr)]` →
`max-1024:grid-cols-1`.

**Always use `minmax(0, …)` in a fractional grid track** — without it a wide
child (a table, a code block, a long word) blows the track out and creates
horizontal overflow.

---

## 14. Cards

**`[IMPLEMENTATION]`**

### Anatomy

```
bg-white
border border-grey-mid            (1px #E3E3E3)
rounded-panel                     (20px; rounded-tile 14px for dense tiles)
p-8  →  max-600:p-6
```

### Contents, in order

1. Optional icon well — `size-11 rounded-tile border border-brand-border bg-brand-tint text-brand-dark`, icon 18–20px
2. Title — `text-[17px] font-bold tracking-[-0.02em] text-ink`
3. Body — `type-body-sm text-grey-500`, `mt-2.5`
4. Optional meta line — `type-micro text-ink-muted`

### Interaction

```
transition-all duration-200
hover:-translate-y-0.5
hover:border-brand-border
hover:shadow-[--shadow-float]
```

Only cards that are **links** get the hover lift. A static content card does
not move.

### Rules

- A card sits on white or `#F5F5F5`, never on another card.
- Cards in a row are the same height (`flex flex-col` + `mt-auto` on the
  footer), never staggered.
- No gradient card fills. No coloured card variants — a "featured" card is
  distinguished by a `#CCE5FF` fill and an `#A3D1FF` border, nothing more.

---

## 15. Forms & Inputs

**`[IMPLEMENTATION]`** — colours are `[OFFICIAL]`.

### Field

| | |
|---|---|
| Background | `#F5F5F5` (`bg-grey-bg`) |
| Border | `1px solid #E3E3E3` |
| Radius | `rounded-card` (12px) |
| Padding | `12px 16px` (`px-4 py-3`) |
| Text | `14px`, `#1A1A1A` |
| Placeholder | `#878787` (`placeholder:text-ink-muted`) — the book's greyed-out text |
| Focus | border → `#A3D1FF`, background → `#FFFFFF`, plus the global focus ring |
| Transition | `colors 200ms` |

### Label

`12.5px / 700 / -0.01em / #1A1A1A`, `mb-2.5` above the field. **Always a real
`<label htmlFor>`.** Never a placeholder used as a label.

### Submit

`btn-primary`, full width under 600px. Disabled while sending via the
utility's `:disabled` rule.

### Rules

- Required fields carry the `required` attribute — do not signal requirement by
  colour or an asterisk alone.
- Error and success messaging is **text**, in `#1A1A1A` on `#EFEFEF`, with an
  icon. There is no red or green in the brand.
- Never collect credentials or payment details in a marketing form.
- Server-side keys stay server-side. The contact form posts to
  `app/api/contact/route.ts`; no credential reaches the browser.

---

## 16. Navigation

**`[IMPLEMENTATION]`** — `components/Navbar.tsx`, driven by `lib/nav-data.ts`.

| | |
|---|---|
| Height | `72px`, fixed, `z-50` |
| At rest | `bg-nav-bg` (`#F5F5F5`), `border-b border-nav-border` (`#E3E3E3`) |
| Scrolled past 8px | `bg-white`, same border, `--shadow-nav` |
| Container | `max-w-[1280px]`, `px-8` → `max-1024:px-6` → `max-600:px-4` |
| Logo | `<Logo height={28} priority />`, top-left |
| Links | `type-nav` — 14px / 600 / `#1A1A1A`, hover `#006AD6` |
| Primary CTA | `btn-primary-sm` |
| Sign in | Plain link, `#1A1A1A` → `#006AD6` |
| Mobile trigger | `size-11 rounded-card border border-nav-border bg-white text-brand-dark`, shown under 900px |
| Mobile sheet | Solid `bg-white`, `border border-nav-border`, `rounded-[22px]`, closes on navigate and on resize above 900px |

**Rules**

- The navigation is **solid**. It is not translucent and it is not blurred —
  the previous glass treatment was removed (see §24).
- Navigation labels, order and destinations are content. Change them in
  `lib/nav-data.ts`, which is the single source for the desktop mega-menu, the
  mobile sheet and the footer's Modules column.
- Every dropdown is keyboard reachable and carries `aria-expanded` /
  `aria-controls`.

---

## 17. Footer

**`[IMPLEMENTATION]`** — `components/Footer.tsx`

| | |
|---|---|
| Surface | `linear-gradient(180deg, #F5F5F5 0%, #EFEFEF 100%)` — **light, not dark** |
| Top border | `1px solid #E3E3E3` |
| Container | `max-w-[1280px]`, `pt-20 pb-8` |
| Grid | `1.5fr + 4 × 1fr` → `max-1024:grid-cols-3` → `max-600:grid-cols-1` |
| Brand column | `<Logo height={30} />`, one-line descriptor, compliance chips |
| Column headings | `10.5px / 700 / +0.1em` uppercase, `text-brand-deep/55` |
| Links | `13.5px / 500`, `text-grey-dk/85` → hover `#006AD6` |
| Divider | `h-px bg-grey-mid`, `mt-16` |
| Bottom row | Copyright left `12.5px`, social icons right |

**The footer is deliberately light.** The brand book lists deep blue as a
permitted background, but this site's footer is a light neutral grey surface.
Do not convert it to a dark footer.

---

## 18. Icons

**`[IMPLEMENTATION]`** — `components/icons.tsx`. The brand book does not
specify an icon style; this is the house spec, traced from
`murphi-project-assets/icons/`.

```
viewBox        0 0 24 24
fill           none
stroke         currentColor
strokeWidth    1.7
linecap/join   round
aria-hidden    true
```

**Never filled. Never duotone. Never two icon families on one page.**

| Size | Use |
|---|---|
| 11–13px | Inside a chip or badge |
| 16–17px | Inline with text, inside a button |
| 18–20px | In a card's icon well |
| 24px+ | Feature or diagram nodes |

Colour: `text-brand-dark` on a light blue well, `text-ink-muted` when
decorative, `currentColor` inheriting a button's label colour. Icons never
carry their own hex.

Available names: `mic · chartup · community · card · route · exchange · home ·
code · server · sealcheck · shield · pulse · doc · heart · check · arrow ·
brain · network · layers · scan · sync · phone · instagram · linkedin ·
facebook · chevron · close · menu`.

**Add to `components/icons.tsx`, never inline a one-off SVG in a page.**

---

## 19. Photography & Imagery

### 19.1 The direction — `[OFFICIAL]`, brand book 13

> **Visual characteristics:** Bright lighting · Clean environments · Clinical
> settings · Neutral white tones
>
> **Preferred imagery:** Doctors and healthcare professionals · Medical
> facilities and laboratories · Healthcare technology interfaces
>
> **Avoid:** Warm or yellow lighting · Lifestyle photography unrelated to
> healthcare · Overly staged stock imagery

### 19.2 Usage by context — `[IMPLEMENTATION]`

| Context | Treatment |
|---|---|
| **Hero** | This site's heroes use **built product visuals**, not photography (see §20). If a photograph is ever used, it sits behind a white or `#F5F5F5` scrim so text stays on a flat ground — never text directly on a photo. |
| **Team** | Real portraits only, from `public/images/team/`. Square, `rounded-panel`, neutral background, consistent crop and lighting across the row. Never an avatar illustration, never a placeholder face. |
| **Healthcare / clinical sections** | Bright, cool-toned, real settings. Never a stock handshake, never a smiling-model-with-tablet. |
| **Product sections** | Prefer a built visual over a screenshot. If a screenshot is used it must show real UI, `rounded-panel` with a `1px #E3E3E3` border. |
| **Announcements** | The article's own image, `aspect-[16/9]`, `rounded-panel`, `#F5F5F5` placeholder ground. |

### 19.3 Hard rules — `[IMPLEMENTATION]`

- **Never fabricate an image of a person, a facility, or a screen.** Portraits
  come from the assets folder or they do not appear.
- **Never create fake certification seals, EHR logos, hospital logos or
  partner logos.** Real assets live in `public/images/certifications/`. If an
  asset does not exist, use a text mark, not an invented one.
- Every `<Image>` carries meaningful `alt`, or `alt=""` when purely decorative.
- All imagery uses `next/image` with explicit dimensions and `max-width: 100%`.

---

## 20. Illustrations & Product Visuals

**`[IMPLEMENTATION]`** — the brand book permits gradients for "UI
illustrations" (brand book 11) but does not define an illustration style.

The house style for every product visual on this site:

- **Built in HTML/CSS/SVG, never a static image.** Every diagram, mock UI,
  device frame and flow on the site is real markup — it stays sharp, themeable
  and accessible.
- Composed of the same primitives as the rest of the UI: white panels,
  `#E3E3E3` hairlines, `rounded-hero`/`rounded-tile` corners, the icon set.
- Blue appears only on the element the visual is about — the Murphi node in a
  flow, the active row in a mock table.
- Connectors are `1.4–2px` strokes in `#A3D1FF`, dashed where they represent
  movement.
- A mock UI's header bar may take the approved blue gradient; its body does
  not.
- Reusable pieces live in `components/module-page/` — `MockCard`, `StepFlow`,
  `FlowStep`, `FlowConnector`, `Waveform`, `Layers`, `DeviceStack`,
  `BeforeAfter`, `ClaimTrack`. **Check these before drawing anything new.**
- Everything decorative carries `aria-hidden`.

---

## 21. Animation & Motion

**`[IMPLEMENTATION]`** — not addressed by the brand book.

### 21.1 Durations

| Duration | Use |
|---|---|
| `150ms` | Micro feedback — a chevron, a dot |
| `200ms` | **The default.** Every hover, colour and border transition |
| `280ms` | Accordion body slide |
| `300ms` | Navigation bar state change |
| `600–700ms` | Carousel slide |

Easing: `ease` for colour, `cubic-bezier(.22,.61,.36,1)` for entrances.

### 21.2 Patterns

| Pattern | Rule |
|---|---|
| **Hover lift** | `-translate-y-0.5` (2px) plus a shadow step. Nothing larger. |
| **Scroll reveal** | `<Reveal>` — 18px rise + fade, fires once at 12% visibility, then releases the observer. Never re-animates on scroll back. |
| **Accordion** | `max-height` transition over 280ms, chevron rotates 180°. |
| **Carousel** | `<Testimonials>` — one card every `4500ms`, `700ms` transition, seamless loop, pauses on hover and focus. Never a continuous marquee. |
| **Ambient motion** | The `mp-*` keyframes (`float`, `glow`, `pulse-ring`, `flow`, `spine`, `wave`, `blink`, `ticker`) exist for product visuals only. Slow (5–14s), low amplitude, never behind text. |

### 21.3 Rules

- **Never animate the page in.** Content is present on first paint.
- **Never animate a control the user is trying to hit.** `mp-float-host`
  pauses drifting children on hover and focus-within.
- **Reduced motion is global and non-negotiable.** `app/globals.css` already
  disables every animation and collapses every transition under
  `prefers-reduced-motion: reduce`. Any new animation is covered
  automatically — do not add an animation that only works with motion enabled.
- No parallax, no scroll-jacking, no auto-playing video with sound, no
  continuous motion that is not conveying state.

---

## 22. Responsive Design

**`[IMPLEMENTATION]`**

### 22.1 Breakpoints

The site is authored **desktop-down** with inclusive max-width variants
declared in `app/globals.css` (Tailwind's `max-[Npx]` is exclusive, which is
why these exist):

```
max-1200   max-1024   max-1080   max-900   max-768   max-720   max-640   max-600
```

`max-1080 / max-720 / max-640` belong to the AI Module and Who We Serve page
family; the rest are site-wide. **A class using an undeclared variant compiles
to nothing, silently.** If you need a new breakpoint, declare it with
`@custom-variant` first.

Container queries (`@min-[520px]:`, `@max-[440px]:` …) are used inside product
visuals so a panel adapts to its own column, not the viewport. Add
`@container` to the wrapper.

### 22.2 What changes at each width

| Element | Desktop | Tablet (≤1024) | Mobile (≤600) |
|---|---|---|---|
| Container gutters | 40px | 32px | 16px |
| Section padding | `py-24`/`py-28` | `py-20` | `py-14`/`py-16` |
| Headings | clamp maximum | continuous scale | clamp minimum |
| Body copy | 15px | 15px | 15px (unchanged) |
| Two-column splits | side by side | stacked, text first | stacked |
| 3-up grids | 3 columns | 2 columns | 1 column |
| Navigation | full mega-menu | full mega-menu (≤900: sheet) | mobile sheet |
| Buttons | inline | inline | full width where alone |
| Card padding | `p-8` | `p-8` | `p-6` |
| CTA panel radius | 40px | 40px | 24px |

### 22.3 Overflow — the rule that breaks pages

`body` carries `overflow-x: hidden`, but that hides a bug rather than fixing
it. **No page may scroll horizontally at any width from 320px up.**

- Wide content — tables, diagrams, code blocks, ticker rows — scrolls inside
  its own `overflow-x-auto` container.
- Use `minmax(0, …)` in fractional grid tracks and `min-w-0` on flex children.
- Background layers use `inset-0`, never a negative inset — a negative inset
  lays out past the viewport and creates overflow on narrow screens.
- Images: `max-width: 100%`, always.

---

## 23. Accessibility

**`[IMPLEMENTATION]`**, except where noted.

### 23.1 Focus

A global `:focus-visible` rule is already in the base layer:

```css
outline: 2px solid var(--color-brand);
outline-offset: 3px;
border-radius: 4px;
```

**Never remove it.** On a blue panel, override with
`focus-visible:outline-white focus-visible:outline-offset-4`.

### 23.2 Contrast — and the one conflict with the brand book

Measured against WCAG 2.1:

| Pair | Ratio | Grade |
|---|---|---|
| `#1A1A1A` on `#FFFFFF` | 17.40:1 | AAA |
| `#1A1A1A` on `#F5F5F5` | 15.96:1 | AAA |
| `#FFFFFF` on `#0F1D54` | 15.86:1 | AAA |
| `#464646` on `#FFFFFF` | 9.44:1 | AAA |
| `#464646` on `#F5F5F5` | 8.66:1 | AAA |
| `#606060` on `#FFFFFF` | 6.29:1 | AA |
| `#606060` on `#F5F5F5` | 5.77:1 | AA |
| `#F5F5F5` on `#0056AD` (pressed) | 6.56:1 | AA |
| `#006AD6` on `#FFFFFF` | 5.21:1 | AA |
| `#F5F5F5` on `#006AD6` (hover) | 4.78:1 | AA |
| `#006AD6` on `#CCE5FF` | 4.02:1 | AA large only |
| `#007EFF` on `#FFFFFF` | 3.87:1 | AA large only |
| `#878787` on `#FFFFFF` | 3.59:1 | AA large only |
| **`#F5F5F5` on `#007EFF`** | **3.55:1** | **AA large only** |
| `#878787` on `#F5F5F5` | 3.30:1 | AA large only |

> ### ⚠️ Documented conflict — brand vs WCAG
>
> **`[OFFICIAL]`** brand book 01 specifies `#F5F5F5` as the text on `#007EFF`
> buttons. That pair measures **3.55:1**, which passes AA for large text
> (≥18.66px bold or ≥24px) but **fails AA for a normal 15px button label**,
> which needs 4.5:1.
>
> This is not a regression introduced by the implementation — pure white on the
> same blue is 3.87:1 and also fails. The floor is the blue, not the label.
>
> **The site follows the brand book.** The official colour is implemented as
> written and has not been silently changed.
>
> **If the brand owner wants AA on the resting state**, the fix is one line in
> `app/globals.css`: change `btn-primary`'s `background` from
> `var(--color-brand)` to `var(--color-brand-dark)` (`#006AD6`, 4.78:1). That
> requires brand-owner approval because it contradicts the book. **Do not make
> this change unilaterally.**
>
> Mitigations already in place, which do not contradict the book: button labels
> are 700 weight, buttons are large targets, hover and pressed states both pass
> AA, and no information is carried by the button colour alone.

Working rules that follow from the table:

- **`#878787` is for de-emphasised text only.** Never body copy, never a form
  label, never anything a reader must read carefully.
- **`#007EFF` as a text colour is for large or bold labels only.** For a link
  in running copy use `#006AD6` (5.21:1).
- Test any new pair before shipping it. Do not assume a ramp step is safe.

### 23.3 The rest

- **Semantic HTML.** One `<h1>` per page; headings descend without skipping.
  `<nav>`, `<main>`, `<section>`, `<footer>`, real `<button>` and `<a>`.
- **Never colour alone.** Every status, finding and state carries a text label
  or an icon (§9.7). This matters more on a two-hue palette.
- **Keyboard.** Every interactive element is reachable and operable. Dropdowns
  carry `aria-expanded`/`aria-controls`; the mobile sheet traps nothing and
  closes on resize.
- **Alt text.** Meaningful for content images, `alt=""` for decoration,
  `aria-hidden` on every decorative SVG and animated layer.
- **Forms.** Real `<label htmlFor>`, `required` attributes, errors in text.
- **Motion.** Covered globally by `prefers-reduced-motion` (§21.3).
- **Targets.** Minimum 44×44px for anything tappable.

---

## 24. Do / Don't

### DO

| | |
|---|---|
| ✅ | Use only the two official ramps — Bright Blue and Grey |
| ✅ | Use Plus Jakarta Sans for everything |
| ✅ | Use the `type-*` utilities for headings and the `btn-*` utilities for buttons |
| ✅ | Use token classes (`text-ink`, `bg-brand`, `border-grey-mid`) |
| ✅ | Keep the logo at 24px or above, in an approved variant, on a plain background |
| ✅ | Use the three approved gradients, only in the five approved places |
| ✅ | Keep backgrounds to white, `#F5F5F5`, `#EFEFEF` or deep blue |
| ✅ | Reuse an existing component before writing a new one |
| ✅ | Give every status a label or icon, not just a colour |
| ✅ | Test at 320px, 768px, 1024px and 1440px before calling it done |
| ✅ | Run `tsc`, `eslint` and `next build` before finishing |

### DON'T

| | |
|---|---|
| ❌ | Invent a brand colour, or "a slightly lighter blue" — the ramps are complete |
| ❌ | Reintroduce teal, amber, coral, red or green — there is no third hue |
| ❌ | Add a second font family (IBM Plex Mono was removed deliberately) |
| ❌ | Recolour, rotate, stretch, distort, or shadow the logo |
| ❌ | Put a gradient inside the logo, or behind the app icon |
| ❌ | Put a gradient on a button, card, table, form, nav or footer |
| ❌ | Hardcode a hex where a token exists |
| ❌ | Write a one-off button, card or heading style for a single page |
| ❌ | Use glassmorphism, blur-behind surfaces, neon, glow, or heavy shadows |
| ❌ | Add decorative shapes, floating cards, or motion without purpose |
| ❌ | Let a page scroll horizontally at any width |
| ❌ | Fabricate photography, certification seals, EHR/partner logos, testimonials, customer names, statistics or ratings |
| ❌ | Change page copy, headings, FAQ text, legal text, routes or links while doing visual work |
| ❌ | Remove the global focus ring |

---

## 25. Page-Level Design Rules

**`[IMPLEMENTATION]`** — the shape every Murphi.ai page shares.

### 25.1 Standard page skeleton

```tsx
<Navbar />                     {/* fixed, 72px — every page starts pt-[72px] */}
<PageHero … />                 {/* eyebrow → h1 → lead → CTA */}
  … content sections …         {/* alternating white / #F5F5F5 */}
<FaqSection items={FAQS.x} />  {/* where the page has FAQs */}
<FinalCta /> | <GetStartedCta />
<Footer />
```

### 25.2 Section pattern

Every content section is one of four shapes. Pick one; do not improvise a
fifth.

1. **Text left / visual right** — the default for a capability section
2. **Visual left / text right** — alternate with (1) down the page
3. **Centred intro + grid** — eyebrow, heading, lead, then a 2/3/4-up grid
4. **Full-width band** — a blue panel or a `#F5F5F5` strip carrying one idea

Each opens with: `type-label` eyebrow → `type-h2` heading → `type-lead`
standfirst. Not every section needs all three, but the order never changes.

### 25.3 Page rules

- **One `<h1>`, at the top.** Everything below is `<h2>` and down.
- **One primary CTA per section**, at most.
- **Alternate surfaces** so no two consecutive sections share a background.
- **The page ends with a CTA panel and the footer.** Always.
- Set `export const metadata` with a title and description on every route.
- `trailingSlash: true` is on — every internal href ends with `/`.

---

## 26. Healthcare & Enterprise Design Principles

**`[IMPLEMENTATION]`**, grounded in the brand book's own language ("clarity,
precision, and trust", "clinical and professional environment").

The audience is home health and hospice agencies, coding and billing teams, EHR
companies and accreditation bodies. They are evaluating whether to trust
software with patient records.

1. **Credibility over delight.** No playful illustration, no mascot, no
   celebratory confetti. The tone is a clinical instrument, not a consumer app.
2. **Density is a feature.** These readers want specifics. A ruled list of six
   capabilities beats three big cards with one word each.
3. **Never overstate.** No invented statistics, customer names, agency names,
   job titles, ratings or results. If a number is not sourced, it does not
   appear. Unshipped modules are labelled "Soon" and read grey.
4. **Compliance is visual furniture, not a badge wall.** HIPAA, SOC 2, ISO
   27001 and BAA marks appear once, small, in real assets, near the footer and
   in the trust strip.
5. **Show the workflow, not the technology.** The product visuals depict a
   chart being reviewed, a message reaching a patient, a claim reconciling —
   not abstract "AI" imagery.
6. **Accessibility is part of credibility.** A healthcare buyer with a
   procurement checklist will test contrast and keyboard access.
7. **No dark patterns.** No fake urgency, no disguised ads, no forms that
   collect more than they need.

---

## 27. Existing Website Implementation Rules

**This section is binding for every future change.**

The site already has a centralised brand implementation. As of the 2026
alignment: every hex and every `rgba()` that reaches the browser is on the two
official ramps, the only font family is Plus Jakarta Sans, every heading uses a
shared type utility, and every button uses a shared button utility.

**That state is the baseline. Do not erode it.**

### 27.1 Where the system lives

| Concern | Location |
|---|---|
| Colour, radius, shadow, gradient and font tokens | `app/globals.css` → `@theme` |
| Type scale (`type-*`) | `app/globals.css` |
| Buttons (`btn-*`) | `app/globals.css` |
| Breakpoint variants, keyframes, reduced motion | `app/globals.css` |
| Font loading | `app/layout.tsx` |
| Logo | `components/Logo.tsx` |
| Icons | `components/icons.tsx` |
| Navigation data | `lib/nav-data.ts` |
| Marketing sections | `components/*.tsx` |
| Module / audience page kit | `components/module-page/{ui,sections,extras,interactive}.tsx` |
| Content | `content/`, `lib/faqs.ts`, `lib/announcements.ts`, `lib/document.ts` |

### 27.2 Rules

1. **Reuse tokens.** Never `text-[#1A1A1A]` — use `text-ink`. Never
   `rounded-[20px]` — use `rounded-panel`.
2. **Reuse the type utilities.** Never restate `text-[clamp(...)] font-extrabold
   leading-[...] tracking-[...]` inline. If a size is missing, add a utility.
3. **Reuse the button utilities.** Never spell out a button's classes.
4. **Reuse components before writing one.** Check `components/` and
   `components/module-page/` first — there are 70+ exported primitives
   (`MockCard`, `StepFlow`, `Accordion`, `RelatedGrid`, `OutcomesStrip`,
   `FaqSection`, `FinalCta`, `GetStartedCta`, `PageHero`, `Breadcrumb`,
   `TrustDot`, `StatusBadge`, `Reveal`, `Tabs` …).
5. **No page-specific design system.** If a page needs a treatment three other
   pages could use, it belongs in `globals.css` or the shared kit.
6. **No second visual language.** The site once carried two — the new Murphi
   system and the old site's navy/teal/amber palette. They were merged. Do not
   start a third.
7. **A palette change happens once**, in `@theme`, and propagates. If you find
   yourself editing colour in more than two files, stop and move it to a token.
8. **Content is not styling.** Copy, headings, FAQ text, legal text, team
   details, routes, hrefs and form behaviour are out of scope for a visual
   change. Do not touch them.
9. **The codemods that produced this state are kept** in `scripts/` —
   `brand-colors.mjs`, `brand-typeface.mjs`, `brand-buttons.mjs`,
   `brand-button-utilities.mjs`, `brand-tokens.mjs`, `brand-headings.mjs`,
   `brand-radii.mjs`. Each documents its mapping and can be re-run to audit
   for drift.

### 27.3 Known deliberate departures

Two things in this codebase are conscious decisions rather than oversights.
Do not "fix" them without asking:

| Departure | Reason |
|---|---|
| The **footer is light**, not the deep blue the book permits | An explicit product decision; the light footer is the intended design |
| The **site navigation is white/`#F5F5F5`**, not `#006AD6` | `#006AD6` "header bar colors" is read as the product's app header, not the marketing nav; repainting it would be a redesign |

---

## 28. Creating a New Murphi.ai Page

Follow these ten steps in order.

### Step 1 — Read this document

Particularly §3 (colour), §4 (typography), §8 (buttons), §13 (spacing),
§22 (responsive), §27 (implementation rules).

### Step 2 — Inspect what exists

```bash
sed -n '1,120p' app/globals.css      # tokens
grep -n "@utility" app/globals.css   # type + button utilities
ls components components/module-page # the component inventory
```

Find the page most like the one you are building and read it. Match its
container, its section rhythm and its component choices.

### Step 3 — Reuse before you write

Type utility before an inline size. Button utility before a class string.
Existing component before a new one. Token before a hex.

### Step 4 — Use only approved brand colours

The two ramps in §3, plus `#FFFFFF` and `#0F1D54`. Nothing else. If a design
seems to need another colour, the design is wrong.

### Step 5 — Use Plus Jakarta Sans

It is already loaded globally. Do not add a `next/font` import to your route.

### Step 6 — Build the page skeleton

Navbar → hero → alternating sections → optional FAQ → CTA panel → Footer
(§25). One `<h1>`. Correct container for the page family.

### Step 7 — Make it responsive

Use the declared breakpoint variants only. Stack two-column splits at
`max-1024`. Full-width buttons at `max-600`. Wrap wide content in
`overflow-x-auto`. Verify no horizontal scroll at 320px.

### Step 8 — Make it accessible

Semantic headings, real labels, meaningful alt text, `aria-hidden` on
decoration, keyboard reachable, focus ring intact, no meaning by colour alone.

### Step 9 — Verify against the checklist

```
□ Every colour is on the two ramps (grep the file for stray hex)
□ Every heading uses a type-* utility
□ Every button uses a btn-* utility
□ No hardcoded hex where a token exists
□ No second font family
□ Logo, if present, is ≥24px on a plain background
□ Gradients only in an approved place, only approved stops
□ No glassmorphism, neon, glow or heavy shadow
□ Sections alternate white / #F5F5F5
□ One <h1>; headings descend without skipping
□ Responsive at 320 / 768 / 1024 / 1440
□ No horizontal overflow
□ Focus ring intact; keyboard reachable
□ Alt text present; decoration aria-hidden
□ Page ends with a CTA panel and the footer
□ metadata exported; internal hrefs end with /
□ No content, route or link was changed
```

### Step 10 — Run the checks

```bash
npx tsc --noEmit
npx eslint .
npx next build
```

All three must pass. Fix errors before finishing.

---

## 29. Quick Reference

```text
MURPHI.AI BRAND QUICK REFERENCE

── COLOUR ───────────────────────────────────────────────────────
Primary Blue      #007EFF   panels, buttons, primary interactive
Blue Hover        #006AD6   button hover, header bars, links on white
Blue Pressed      #0056AD   pressed state, deepest emphasis
Light Blue        #CCE5FF   chip and badge fills
Blue Hairline     #A3D1FF   borders that should read blue

Primary Text      #1A1A1A   headings and primary copy
Body Text         #464646   default body copy
Secondary Text    #606060   supporting copy
Primary Grey      #878787   greyed-out text, captions, placeholders
Border            #E3E3E3   every border, hairline and divider
Light Surface     #F5F5F5   grey bands, inputs; TEXT ON BLUE
Second Surface    #EFEFEF   a panel nested in a grey band
White             #FFFFFF   default page ground
Deep Blue         #0F1D54   dark background surface

Bright Blue ramp  CCE5FF A3D1FF 7ABCFF 52A7FF 2993FF 007EFF 006AD6 0056AD
Grey ramp         F5F5F5 EFEFEF E3E3E3 B2B2B2 878787 606060 464646 1A1A1A

NO third hue. No teal, amber, coral, red or green.

── TYPE ─────────────────────────────────────────────────────────
Font              Plus Jakarta Sans (only family, loaded globally)
Weights           300 400 500 600 700 800   — headings 800, buttons 700

type-display  clamp(32,3.5vw,46) / 800   hero h1, closing CTA
type-h1       clamp(30,3.6vw,46) / 800   page h1
type-h2       clamp(28,3vw,40)   / 800   section headings
type-h3       clamp(26,2.7vw,36) / 800   sub-sections
type-h4       clamp(19,1.9vw,25) / 800   group headings
type-lead     clamp(15.5,1.15vw,17)/400  standfirst
type-body     15 / 400 / 1.75            body copy
type-body-sm  13.5 / 400 / 1.65          dense copy
type-label    11 / 700 / +.1em upper     eyebrows, chips
type-micro    10 / 700 / +.08em upper    micro labels
type-nav      14 / 600                   navigation

── BUTTONS ──────────────────────────────────────────────────────
btn-primary     #007EFF bg · #F5F5F5 label · 15/32 pad · r12
                hover #006AD6 + 2px lift · active #0056AD
btn-primary-sm  same colours, 14/20 pad, 14px label, r10
btn-secondary   white bg · #E3E3E3 border · #464646 label
                hover #CCE5FF bg / #A3D1FF border / #006AD6 label
btn-on-blue     white bg · #006AD6 label — for use on a blue panel

Buttons are FLAT. Never a gradient.

── TOKENS ───────────────────────────────────────────────────────
Radius   card 12 · tile 14 · panel 20 · hero 28 · cta 40 · canvas 56
Shadow   brand · brand-md · brand-lg · nav · panel · float
         (all tinted with brand blue or #0F1D54, never black)
Gutters  px-10 → max-1200:px-8 → max-600:px-4
Container 1280px marketing · 1220px module pages
Section  py-24/28 → max-1024:py-20 → max-600:py-14
Motion   200ms default · hover lift 2px · reveal 18px once

Breakpoints  max-1200 max-1080 max-1024 max-900 max-768 max-720 max-640 max-600

── LOGO ─────────────────────────────────────────────────────────
Minimum digital height   24px   (print 10mm)
App icon                 20% padding · 60% symbol scale · flat blue bg
Blue logo on light · white logo on dark
NEVER: stretch, rotate, recolour, shadow, gradient, busy background,
       altered letter spacing, redrawn in code

── GRADIENTS (the only three) ───────────────────────────────────
#007EFF → #0056AD
#FFFFFF → #007EFF
#F7F7F7 → #CCE5FF

Allowed in: hero sections · product highlights · background visuals ·
            UI illustrations · social media
NEVER in:   the logo · buttons · cards · text · borders · nav · footer

── PHOTOGRAPHY ──────────────────────────────────────────────────
DO     bright lighting · clean environments · clinical settings ·
       neutral white tones · doctors and healthcare professionals ·
       medical facilities and labs · healthcare technology interfaces
AVOID  warm or yellow lighting · unrelated lifestyle photography ·
       overly staged stock imagery

── STYLE ────────────────────────────────────────────────────────
Premium · Minimal · Enterprise · Healthcare · Trustworthy · Clinical

AVOID  random colours · excessive gradients · neon · glow ·
       glassmorphism · heavy shadows · floating cards · decorative
       noise · playful UI · flashy motion

── ACCESSIBILITY ────────────────────────────────────────────────
Focus ring    2px #007EFF, 3px offset — global, never remove
Body copy     never lighter than #606060 on white
#878787       de-emphasised text only, never body copy
Links in copy #006AD6 (5.21:1), not #007EFF (3.87:1)
⚠ #F5F5F5 on #007EFF = 3.55:1 — the book's button pair; passes AA
  large only. Documented conflict, see §23.2. Do not change silently.

── BEFORE YOU FINISH ────────────────────────────────────────────
npx tsc --noEmit  ·  npx eslint .  ·  npx next build
```

---

*Source of truth: `Murphi Brand Book 2026 V1.0.pdf`, repo root.
Implementation: `app/globals.css`.
Everything marked `[OFFICIAL]` comes from the brand book; everything marked
`[IMPLEMENTATION]` is this codebase's decision and can be changed — once, in
`globals.css`, for the whole site.*
