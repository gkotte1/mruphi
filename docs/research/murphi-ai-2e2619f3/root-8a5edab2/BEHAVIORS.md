# Behaviors — murphi.ai `/`

Result of the mandatory interaction sweep (scroll / click / hover / responsive).
**Headline finding: the page is far less animated than it looks.** There are
exactly four `@keyframes`, no scroll-triggered reveals, no parallax, no
scroll-snap, and no smooth-scroll library.

## Ruled out (verified absent)

| Suspected | Verdict |
|---|---|
| Lenis / Locomotive smooth scroll | **Absent.** No `.lenis`, no scroll container. Only `html{scroll-behavior:smooth}`. |
| Scroll-triggered entrance animations | **Absent.** Elementor's animation addon is present but every container carries `wcf-starter-animations-none`. |
| IntersectionObserver-driven tab switching | **Absent.** Tabs are click-only (see below). |
| Scroll-snap | **Absent.** No `scroll-snap-type` anywhere. |
| Parallax | The `parallax-section` plugin is loaded but unused on `/`. |
| Video / Lottie / canvas | **Absent.** Zero `<video>`, zero `<iframe>`, zero Lottie. |

## 1. Nav — scroll-triggered shadow

Source (`raw/homepage.html:1344`):

```js
window.addEventListener('scroll', function() {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});
```

- **Trigger:** `window.scrollY > 10`
- **State A:** `box-shadow: none`
- **State B:** `.mh-nav.scrolled { box-shadow: 0 2px 16px rgba(0,0,0,.08) }`
- **Transition:** `transition: box-shadow .25s`
- **Implementation:** `useEffect` scroll listener + boolean state, passive listener.
- **Superseded styling.** The clone now swaps solid → frosted glass on the same
  `scrollY > 10` trigger: at rest `bg-nav-bg` solid exactly as the live site;
  scrolled, `bg-white/72` + `blur(22px) saturate(1.7)` on a `white/45` hairline
  with a soft shadow, transitioned over 300ms.

  **The filter lives on a sibling layer inside `<nav>`, never on `<nav>`
  itself.** An element with `backdrop-filter` becomes a *backdrop root*, and the
  mega-menus are DOM descendants of `<nav>` — with the filter on `<nav>` they
  have nothing left to sample and their own `backdrop-filter` silently does
  nothing, letting the page show through their translucent background fully
  readable. Confirmed by A/B: stripping the nav filter at runtime restored the
  menus' blur immediately. If the nav glass is ever moved back onto `<nav>`,
  the dropdowns lose their frost without any error to warn you.

  Mega-menus: `bg-white/75` + `blur(26px) saturate(1.8)`. Mobile drawer:
  `bg-white/88` + `blur(26px) saturate(1.6)` — held more opaque because it is
  full-screen and has to stay readable.

## 2. Nav — mega-menu open

- **Trigger:** `mouseenter` on `.mh-nav-item` (pure CSS `:hover` for display).
- `.mh-nav-mega` is `display:none` → `display:grid` on hover.
- The dropdown is `position:fixed`; a JS handler centres it against the
  viewport and clamps 16px from each edge:

```js
var idealLeft = (vpW / 2) - (megaW / 2);
var clamped = Math.max(16, Math.min(idealLeft, vpW - megaW - 16));
```

- **Implementation:** `left:50%; transform:translateX(-50%)` on a fixed element
  is mathematically identical to `idealLeft` and needs no JS. The clamp only
  engages when `megaW + 32 > viewport`, which cannot happen — the menus are
  hidden below 900px and the widest is 580px. CSS centring is used.
- Hover on `.mh-mega-link`: `background → var(--blue-tint)`, `transition: background .15s`.

## 3. Nav — mobile drawer

```js
hamburger.addEventListener('click', function() {
  menu.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
});
```

- **Trigger:** click on `#mhHamburger` (visible ≤900px).
- Toggles `.open` on `#mhMobileMenu` **and locks body scroll**.
- **Implementation:** React state; body-scroll lock in an effect with cleanup.

## 4. Care-settings tabs — CLICK-DRIVEN

This is the section most at risk of being built wrong. It is **not**
scroll-driven. Source (`raw/blockB.body.html`):

```js
function showPanel(id, tab) {
  ['postacute','healthsystem','primary','mental','ehr'].forEach(function(p) {
    var el = document.getElementById('panel-' + p);
    if (el) el.style.display = 'none';
  });
  document.querySelectorAll('.seg-tab').forEach(t => t.classList.remove('on'));
  var panel = document.getElementById('panel-' + id);
  if (panel) { panel.style.display = 'grid'; panel.style.gridTemplateColumns = '1fr 1fr'; ... }
  if (tab) tab.classList.add('on');
}
```

- **Interaction model: click-to-switch, hard swap.**
- **No transition** — `display` is toggled directly, so there is no fade/slide.
  ~~Do not add one.~~ **Superseded — see §14.** The homepage section was
  redesigned on request and now fades between panels. This entry still records
  what the live site does.
- Default active tab on load: **`postacute`**.
- Active tab style `.seg-tab.on`: filled `var(--blue-dark)`, white text.
  Inactive: white bg, `1.5px solid var(--grey-mid)`.
- A `resize` listener rewrites `gridTemplateColumns` to `1fr` at ≤900px —
  in the clone this is a CSS media query, not JS.
- **Implementation:** `useState<SegmentId>('postacute')`, conditional render.

## 5. Marquees — time-driven, CSS only

**Partner logos** (`.mq`):
```css
.mq{overflow:hidden;padding:14px 0;border-bottom:1px solid var(--grey-mid)}
.mq-inner{display:flex;width:max-content;animation:scrollL 50s linear infinite}
@keyframes scrollL{to{transform:translateX(-50%)}}
```
The list is duplicated in the DOM so `-50%` loops seamlessly. 24 names ×2.

**Reviews** (`.social-proof`) — **superseded, see §18.** The clone replaced
this marquee with a featured-testimonial slider. The partner marquee above is
unchanged. This entry still records what the live site does:
```css
@keyframes scrollReviews{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.reviews-scroll-wrap::after{ /* 60px fade to var(--grey-bg) on the right edge */ }
```
7 testimonials ×2.

- **Implementation:** both as CSS keyframes in `globals.css`, list doubled in
  JSX via `[...items, ...items]`. Both respect `prefers-reduced-motion`
  (an accessibility addition — the original does not, noted as a deliberate
  deviation).

## 6. Demo modal — time-driven

```js
if (!hasPopupShown()) { setTimeout(function () { markPopupShown(); openPopup(); }, 8000); }
```

- **Trigger:** 8000ms after load, **once per session** via
  `sessionStorage['murphiAiConnectPopupShown']`; the flag is cleared when
  `performance.getEntriesByType('navigation')[0].type === 'reload'`.
- Open adds `.is-open`; entrance is `@keyframes connectIn`.
- Closes on: backdrop click, `[data-connect-close]` click, `Escape`.
- Autofocuses `#murphiAiFullName` 50ms after open.
- Original posts to **Web3Forms** with a hard-coded `access_key`.
  **Per instruction this key is not reused** — the clone posts to an internal
  handler stub (see `ConnectModal` spec).

## 7. Hover states inventory

| Element | Change | Transition |
|---|---|---|
| `.btn-w` | `translateY(-2px)`, shadow `0 4px 20px rgba(0,0,0,.14)` → `0 8px 32px rgba(0,0,0,.2)` | `all .22s` |
| `.btn-ghost` | bg `rgba(255,255,255,.12)` → `rgba(255,255,255,.2)` | `all .2s` |
| `.nav-cta` / `.mh-signin` | bg `--blue-dark` → `--blue-deep`, `translateY(-1px)`, `0 4px 14px rgba(0,106,214,.3)` | `all .2s` |
| `.model-card` | border → `var(--blue)`, `translateY(-4px)`, `box-shadow: var(--shm)` | `all .25s` |
| `.mega-link` / `.mh-mega-link` | bg → `var(--blue-tint)` | `background .15s` |
| `.seg-tab` (inactive) | border → `var(--blue)` | `all .2s` |
| footer links | color → `#FFFFFF` | `color .15s` |

## 8. Responsive sweep

| Width | Observed |
|---|---|
| 1440 | Full layout. Hero `1fr 440px`. Positioning 3 cols. Segments 2 cols. |
| 900 (primary) | **Mega-menus hidden, hamburger appears.** Segment panels → 1 col. Hero → 1 col. |
| 768 | Positioning cards stack; modules grid 2→1; footer 5 cols → 2. |
| 390 | Everything single column. Hero h1 clamps to 31px. Trust bar wraps. |

Secondary breakpoints at 1024, 767, 700, 600, 560, 480 do minor padding/font
adjustments.

## 9. Homepage hero — deliberate divergence from live

The live hero is a `1fr 440px` two-column block: copy left, a translucent
"Three Ways to Engage" panel right, stats in a rule-separated row under the
CTAs. **The clone no longer reproduces it.** The homepage hero was redesigned
on request into a single centred stack with the product interface emerging from
the lower half. Every other route still matches live.

Consequence for regression runs: `/` no longer has a meaningful live baseline.
The documented `Δ-175` for `/` is retired — compare the homepage against its own
recorded clone heights instead (`raw/selfcheck` pattern), not against live.

### Composition

```
navbar
  headline            h1, clamp(32px, 3.7vw, 52px), centred, max-w 900
  supporting line     18px/600, max-w 600          mt-7
  capability line     14px/400, leading-2, max-w 760   mt-7
  CTAs                primary white, secondary glass   mt-11
  proof points        the four HERO_STATS, ruled top and bottom,
                      max-w 1000, py-8                 mt-[68px]
  product laptop      max-w 1120, crosses the blue field's lower edge
                                                       mt-[84px]
```

The capability line is set wider and quieter than the supporting line
(`white/62` at `leading-2`) so the two never compete; the proof points are
bound into a band by hairlines top and bottom rather than left as a loose row.

Measured at 1440: hero 1414px, laptop top at 59% of hero height, 124px of the
laptop below the blue field's edge, 72px of hero remaining beneath it.
At ≤900 the crossing drops to 64px. No horizontal overflow at 1440/1280/820/390.

### Background

The blue gradient itself is the live one, unchanged
(`140deg, #006AD6, #0072F0, #0079F5`) — but it is no longer full-bleed. It is a
**contained, curved canvas**: `inset-x-6` capped at 1360px and centred, so it
never touches the viewport edge (40px of white each side at 1440, 24px at
1280); `top-24`, which clears the fixed 72px nav by 24px of white; and
`rounded-[72px]` (44 at ≤900, 28 at ≤600). It carries `overflow-hidden` so the
washes, dot lattice and orbs clip to the curve instead of spilling past it.

The section's own ground is now white, resolving to `#F5F5F5` over its last
14% so the trust strip below still joins with no seam (measured gap: 0px).
Section top padding went 140 → 168 to keep the same amount of blue above the
heading now that the field starts lower.

The field still stops short of the section floor (196px, 120 at ≤900) so the
laptop crosses its lower edge — 124px of overlap at desktop, unchanged. An earlier attempt fading
the blue into grey across the full width was abandoned — it read as fog behind
the window. Depth now comes from a downward deepening overlay inside the field,
plus a dot lattice at 6% masked out below 70%.

### Product frame

`HeroProductUI.tsx`, a client component. The interface runs inside a laptop: a
dark bezel on all four sides (`#121A28 → #080D16`) with a camera dot, a taller
chin carrying a hairline mark, and a base edge below it.

Inside, the dashboard is **light**: the rail is a white-to-pale-blue gradient
(`#FBFDFF → #F2F8FF → #E9F3FE`) on a `brand-border` hairline, with `ink`
headings, `ink-muted` captions and Murphi blue for active state; the working
canvas is white with a faint blue app-bar gradient and a `rgba(0,126,255,.10)`
inset edge. The rail was dark navy (`#0D1829`) until it was lightened on
request.

The bezel stays dark deliberately. It is the laptop, not the dashboard, and a
near-black frame around a bright screen is what separates the whole thing from
the blue hero field — lightening it too would collapse that contrast.

Two selections drive the canvas: workspace (the three `ENGAGE_CARDS`) sets the
app bar's context line, module (the four `HERO_MODULE_CHIPS`) sets the body.
Both respond to click *and* hover. Every canvas shares one skeleton — app bar +
status pill, a 96px primary visual, labelled field rows, then a hairline
readout row, on a `min-h-[326px]` body — so switching never reflows the frame.
Verified: 24/24 atomic samples had rail and canvas in sync.

Canvas figures are illustrative interface state (counts, durations, record
ids). They deliberately carry **no efficacy claims**: the only performance
numbers on the page remain the four in `HERO_STATS`, which are the site's own.

### Rotation

The modules advance every `ROTATE_MS` (2600ms) and wrap. The carousel never
runs over someone's head:

- pointer entering the frame pauses it, leaving resumes;
- focus entering pauses it, and `onBlurCapture` resumes only once focus lands
  outside the frame (`frameRef.contains(relatedTarget)`), so tabbing between
  controls inside it does not restart the timer;
- `prefers-reduced-motion: reduce` stops it outright — the panel then only ever
  changes when someone asks it to. Auto-advancing content that cannot be
  paused is a WCAG 2.2.2 problem; hover, focus and the motion query are the
  three mechanisms that answer it.

`data-paused` is mirrored onto the frame element. It exists for tests — the
pause is otherwise invisible from outside.

**Testing note.** The homepage's own demo modal (§6) opens at 8s and covers the
page. Any interaction test that idles longer than that must dismiss it first
(`[aria-label="Close"]`) or the pointer lands on the overlay and every hover
assertion fails in a way that looks like a rotation bug.

### Motion

Five animations, all disabled under `prefers-reduced-motion`: a staggered
entrance (`murphi-hero-in`, 0–0.34s), a 9s ±10px frame drift, the waveform
bars, a 14s orb drift, and the 0.34s canvas swap (`murphi-canvas-in`, replayed
by remounting the body on `key={module}`).

`.murphi-hero-float` pauses its drift on `:hover` and `:focus-within` — a
control that moves under the pointer is harder to hit. That pause **must** be
declared in `globals.css` next to the animation, not as a Tailwind `hover:`
utility: the animation rule is unlayered and outranks anything Tailwind emits
into `@layer utilities`, so the utility silently loses the cascade.

## 10. Compliance strip

Six marks in one row on a six-column grid, so every mark and label lands on a
shared baseline. No cards, no pills, no per-item background. Hairlines
(`brand-border/60`) sit between items on the single-row layout only — once the
grid wraps at ≤768 they read as table edges, so the stacked layouts space the
items instead.

Breakpoints: 6-up to 769, 3-up at ≤768, 2-up at ≤560. Verified 6-across holds
down to 820 with no label wrapping at any width, and no horizontal overflow at
1440/1280/1024/820/768/390/360.

### The marks are original, not certification logos

`TrustMarks.tsx`. This is a deliberate call, not a shortcut:

| | why there is nothing to source |
|---|---|
| HIPAA | HHS issues no compliance logo. Every "HIPAA certified" badge is a third-party seal. |
| SOC 2 | The AICPA SOC mark is a registered trademark, licensed to the CPA firm that performed the examination. |
| ISO 27001 | ISO does not permit certified organisations to use the ISO logo; registrars license their own marks. |
| BAA | A Business Associate Agreement is a contract. No logo exists. |

Drawing lookalikes of the AICPA or ISO trademarks would be a trademark risk and
a false trust signal. If Murphi holds licensed artwork, swap it into the
matching `TRUST_BADGES` slot — the strip sizes by height (`h-11`) and does not
assume a square, so a wider registrar mark drops in without layout changes.

One system: 40×40 box, 1.5 stroke, `currentColor`, secondary strokes at 0.42
opacity for figure/ground. Ink fills 68–80% of the box on all six — checked
with `getBBox()`, because two marks first came in at 53% and 62% and read as
undersized in the row next to the others.

### Transition out of the hero

The section opens on `#F5F5F5` — the exact ground the hero ends on — then warms
through a blue tint and resolves to white, with a blue radial spilling down
from the top edge. Measured gap between hero bottom and strip top: 0px. The
old `border-b` is gone; nothing rules the two sections apart.

### Note on Tailwind v4 transforms

`group-hover:-translate-y-[2px]` compiles to the **`translate`** property, not
`transform`. `getComputedStyle(el).transform` reads `none` while the lift is
active — assert on `.translate` instead, or a working hover looks broken.

## 11. Support line and announcement

`SupportAndAnnouncement.tsx` (replaces `AnnouncementBanner.tsx`). The support
line used to live at the foot of the compliance strip; it now sits with the
announcement as one designed area, which also drops the strip to 110px — the
six-mark grid itself is unchanged.

Rhythm: strip → support 28px, support → card 36px. Card is max-w 860, a soft
blue gradient on a `brand-border/70` hairline with a 3px shadow. Hierarchy runs
label → copy → emphasis on the award → link.

### Exactly two things here are interactive

The ANNOUNCEMENT eyebrow was already a `<span>` and never navigated, but it was
styled as a **filled blue pill**, which reads as a button. It is now a light
label with a hairline border, plus `pointer-events-none` and `select-none` so
it cannot be clicked, focused or dragged. Verified: SPAN, no href, no role, no
onclick, no tabindex, `cursor: auto`, not inside any anchor or button; clicking
it leaves the URL unchanged, as does clicking the card body.

The area contains two links and nothing else:

| Element | Route | Target |
|---|---|---|
| Submit a Support Ticket → | `/support-ticket/` | `_blank` |
| Read more → | `/announcements/` | same tab |

Both verified to land on the right page. The trailing arrow is split off its
label at render (`splitArrow`) so it can shift 3px on hover without touching
the content string — the visible text is unchanged.

## 12. Partner wall

Wordmarks, not brand logos. **No partner logo assets exist in the repository** —
`public/` holds only `logo-blue.png` and `logo-footer.png`, Murphi's own — and
the live site renders these as text too. The 24 marks belong to third parties
(AWS, Google Cloud, Twilio, OpenAI, WhatsApp, …), so drawing stand-ins would
mean inventing other companies' logos and implying partnerships with artwork
nobody licensed.

They are instead normalised the way a real logo wall normalises artwork: one
weight, one muted tone (`ink-muted`), brand blue and 1.02 scale on hover. To
drop in licensed artwork later, give a `MARQUEE_PARTNERS` entry an image and
render it in place of the `<span>` — the row sizes by height, so aspect ratios
survive untouched.

### The animation is unchanged

Same `marquee-left` keyframe, same leftward direction, same doubled list and
`translateX(-50%)`, same `.murphi-marquee` reduced-motion stop. Only the
duration moved, 50s → 82s, because the track got wider and the old duration
would have sped it up: measured **48.9 px/s**, down from ~86. It is set inline
because `--animate-marquee` is an `animation` shorthand and a duration utility
in the same layer would not reliably beat it.

Seamless loop verified numerically: one copy is 3966px and half the track is
3966px, so `-50%` lands exactly on the repeat. No hover pause — the marquee
never had one, and nothing in the row is a click target.

The duplicate copy is wrapped in `aria-hidden`, so assistive tech reads 24
names rather than 48.

### Ambient light must be gradients, not blurred shapes

The first attempt used a blurred rounded div for the glow. The section is
138px tall with `overflow: hidden` and the shape was 150px, so it was sliced
flat — and a blur cannot soften a clipped edge, leaving a hard-edged rectangle
across the section. Both pools are now radial gradients painted across an
`inset-0` box, which fade within their own bounds and cannot be clipped.

The row also carries a `mask-image` fade at both ends so wordmarks emerge and
vanish instead of being cut off at the viewport edge.

## 13. How Murphi.ai Works — ecosystem layout

Was three 460px cards in a row; now a two-column layout — the three
`MODEL_CARDS` become the selector on the left, and a diagram on the right shows
what they all connect through. `PositioningSection.tsx`, now a client
component. Homepage-only, and `MODEL_CARDS` is used nowhere else.

### Every string is existing content

Card `eyebrow` / `title` / `body` / `bullets` / `cta` verbatim; module names and
icons from `HERO_MODULE_CHIPS`; audience icons are the hero's `Engage*Icon`s,
which already depict these same three audiences.

The integration pills are split out of the PaaS card's own bullet — *"Encrypted
API · SSO · iFrame · FHIR R4 · HL7 v2"* — plus EHR / EMR. **Not HIS or CRM**,
which the brief suggested: nothing on the site claims either, and a connected-
systems diagram is a capability claim.

**The four bullets per card have no room in a compact left rail**, so they
render as the active path's detail band under the diagram, headed by that
card's eyebrow. Verified: 4 bullets per card, 12 distinct across the three
states, nothing dropped.

### Selection

`useState`, driven three ways: click, `onFocus` on the header button, and
`onMouseEnter` on the whole row (the large hover target). The header is a
`<button>` and the CTA is a sibling `<a>` — an anchor cannot be nested inside a
button, so the two are siblings rather than one wrapping the other. All three
CTAs keep their original hrefs: `/white-labeling/`, `/ambient-ai/`,
`/coding-billing/`.

### Diagram

Built from HTML/CSS/SVG, no image assets. Connector strips are SVGs with
`preserveAspectRatio="none"` — deliberate: these are decorative curves, and
letting them stretch with the column is what keeps them attached to the boxes
above and below at every width. `vectorEffect="non-scaling-stroke"` stops the
stretch from thickening the line. `murphi-flow` animates the dash offset;
`murphi-core-pulse` breathes the core glow. Both stop under reduced motion.

Ambient depth is radial gradients on `inset-0`, not blurred shapes — see §12
for why a clipped blur leaves a hard edge.

The grid is `items-center`. It was `items-stretch` with the diagram
`justify-center`, which filled the taller column — but stretching a 644px
diagram to 939px put **147px of dead space above and below it inside the
panel**. Centering lets the panel hug its content: gap above and below the
diagram is now 33px, i.e. its padding and nothing more.

The left column stays taller (939 vs 710 at 1440) because it carries three
audience rows with full body copy; the panel centres against it.

Tracks are `1fr 1fr` with `gap-10`, and the left content is capped at 526px
with `ml-auto` — that shifts the block toward the centre while the copy stays
left-aligned, and at its natural width so nothing rewraps and the section
height is unchanged (1099 at 1440). The panel carries `translate-y-7`, a 28px
optical drop that does not affect layout height; it is reset at ≤1024.

**Do not widen the left track past 1fr.** The integration pills are a
`flex-wrap` row and reflow to two lines once the diagram drops below ~560px:
that happens at 1.02fr on a 1280 viewport and at 1.06fr on 1440. 1fr/1fr is the
largest left-shift that keeps all six pills on one row at both widths.

### Measurements

1440: 1099px tall, 2 columns. 1280: 1069px. Single column at ≤1024. Mobile 390:
2018px, stacks heading → audiences → diagram. No horizontal overflow at
1440/1280/900/390.

## 14. Solutions by Care Setting — segmented showcase

Was five pill buttons over a two-column panel; now five connected tabs in a
single track over one large rounded panel — copy left, product composition
right, fading between panels (`key={id}` + `murphi-canvas-in`). Supersedes §4's
hard `display` swap for the clone only.

### The copy is unchanged, deliberately

The brief's suggested headlines — *"Build stronger care teams beyond the
hospital"*, workforce development, staff learning, skills, employee growth,
career development — describe a **learning management platform**. That is the
reference site's product. Murphi.ai does clinical documentation, revenue
assurance, patient payments and contract analysis.

Writing that copy here would have invented capabilities the company does not
sell and thrown away real customer quotes and real outcome figures. Only the
structure and interaction were rebuilt; every string still comes from
`SEGMENTS`. The five tab labels already matched the requested categories
exactly.

### Layout

Track is a segmented control: `inline-flex` on a 5px inset, active tab a filled
`brand-dark` pill with a shadow, resting tabs `ink-muted`. A hairline sits
between two resting tabs only — `i > 0 && i !== active && i - 1 !== active` —
because a rule beside the active pill fights its edge.

Panel is `items-center`, two equal columns. Left: heading, pills, intro, CTA,
quote. Right: a tinted composition holding the outcome metrics and the feature
cards. The features moved right because the left column is now the pitch; all
of it still renders.

`segment.quote` is optional and only four of the five have one, so the panel
must not assume it. On the EHR tab the left column is therefore short and the
centred alignment leaves visible slack — the one place this layout is less
tight than the other four.

### Verified

All five tabs switch heading, pills, intro, CTA + href, outcomes title,
metrics and features. Every tab renders 4 metrics, 4 pills and 4 features.
CTA hrefs: `/post-acute-care/`, `/health-systems-hospitals/`,
`/primary-specialty-care/`, `/mental-behavioral-health/`,
`/ehr-emr-companies/`. 1440/1280: 1184px, 2 columns. Single column at ≤1024,
where the tab track becomes a horizontal scroller. Mobile 390: 2166px, no
horizontal page overflow at any width.

**Testing note:** the 8s demo modal (§6) blocks pointer clicks on this section.
Reloading does not help — the flag clears on reload by design. Drive the tabs
with `element.click()` inside `page.evaluate` instead, or dismiss the modal.

## 15. For EHR & Tech Companies — PaaS showcase

Was a deep-blue two-column band with a translucent flow card on the right; now
composed like the hero — message centred at the top, product showcase anchoring
the bottom. `PaasSection.tsx` + `PaasDashboard.tsx`.

### Field

`#FFFFFF → #F5F9FF → #E9F3FE → #F5F5F5`. It opens on white to meet the modules
section above and lands on `#F5F5F5` to meet social proof below, so both joins
are seamless. Replaces the old `#0056AD → #006AD6`; the copy went white → `ink`
with it.

### The dashboard

Six panels on a 3-up grid (2-up ≤1024, 1-up ≤700) under a top bar carrying the
platform name, an encrypted badge and a live API-status pill.

| Panel | Source |
|---|---|
| EHR Capability | `ehrTitle` + the 8 `ehrSystems` |
| Encrypted API · SSO · iFrame | `apiTitle`, split on `·` into its own three transports |
| Live PaaS Partners | `livePartnersTitle` + the 4 `livePartners` |
| Integration Methods | `methodsTitle` + the 5 `methods` |
| AI workflows | the 4 `HERO_MODULE_CHIPS` names + a sparkline |
| Security & compliance | the 5 `complianceChips` |

**No invented figures.** The panels show state and inventory — never usage
volumes or throughput numbers, which would read as real company metrics.

`stripIndex()` drops the `①②③` from three of the titles: those numerals ordered
the old flow diagram and mean nothing in a grid. The words are otherwise
verbatim. The old card's `#00E676` green — the only off-palette colour in the
section — is gone; "live" is now a pulsing brand-blue dot.

**No client JS.** Hover, status pulses and the activity line are all CSS, so
the showcase ships as static markup.

### Notes

- The old right-hand card was `max-900:hidden`, so mobile lost the section's
  entire visual. The dashboard now renders at every width; mobile is longer
  (2041px) as a direct result.
- Titles wrap rather than truncate. The first pass clipped
  "Encrypted API · SSO · iFrame" to "SSO · i…", which reads as a bug.
- Verified at 1440/900/390: no panel content spills its own box, no clipped
  text, no horizontal page overflow. Desktop 1200px, dashboard 1120×504.

## 16. SaaS Modules — four cards as one tabbed panel

`ModuleTabs.tsx`, a client component dropped into `ModulesSection.tsx` in place
of the four-card grid. **Only the grid changed**: the section's eyebrow,
heading, lead, background and the coming-soon band below it are untouched, and
`ModulesSection` stays a server component.

Content is `PLATFORM_MODULES` verbatim — `index`, `title`, `body`, `tags` and
the href behind "Learn more" (`/ambient-ai/`, `/revenue-assurance/`,
`/ai-patient-financials/`, `/contract-analyzer/`).

### Tabs

Four equal tabs over one blue panel. The active tab carries the panel's own top
colour (`brand-dark`) against `#004B98` resting tabs, so active and panel read
as one surface — measured seam between tab strip and panel: **0px**. A hairline
sits between two resting tabs only, never beside the active one.

Icons come from `MODULE_ICON`, keyed by the `index` string rather than array
position — `HERO_MODULE_CHIPS` happens to be in the same order today, and an
explicit map cannot drift if either list is reordered.

### Previews

Each panel carries a compact white product card on the right, reusing the hero
canvases' visual language at preview scale (waveform, review bars, balance
segments, clause highlight) so a module reads the same wherever it appears.
The floating chip above it is the module's own first tag. No figures that could
be mistaken for company metrics.

### Verified

All four tabs switch eyebrow, title, body, tags, CTA + href and preview.
Panel height spread across tabs: **0px at 1440 and 900** — no layout shift on
switch. Mobile 390 varies 79px because the body wraps to different line counts
in one column; the tab strip sits above the panel so the tap target itself
never moves. All four tabs fit one row at 390 (86px each). No console errors,
no horizontal overflow.

**Accessibility note:** the first build gave this tablist
`aria-label="Murphi.ai modules"`, colliding with the hero's module rail — two
identically-named tablists on one page. The four on the homepage are now
distinct: "Ways to engage", "Murphi.ai modules", "Care settings",
"SaaS modules".

## 17. Get Started CTA — one panel, both call sites

**The design lives in exactly one place: `shared/CtaPanel`.**

| Component | Role |
|---|---|
| `shared/CtaPanel` | the implementation — markup, gradients, SVG, icons, responsive rules |
| `root-8a5edab2/CtaSection` | thin wrapper, binds `CTA_SECTION`; used by `src/app/page.tsx` only |
| `shared/InnerCta` | thin wrapper, keeps its prop API; rendered by `PageLayout` |

`PageLayout` has 39 consumers, of which **28 render the CTA** — the other 11
pass `showCta={false}`.

The two wrappers were separate *implementations* until the CTA was redesigned
homepage-first, then required to match everywhere. Two implementations kept in
step by hand will drift, so the second step extracted the panel. Editing
`CtaPanel` now changes all 29 call sites at once — which is the point, but
means there is no longer any way to restyle one without the other.

`InnerCta` previously carried small deliberate deltas mirroring the live site's
separate authoring — heading line-height 1.1 vs 1.15, body max-width 640 vs
none, a 700px breakpoint vs 900. **Those are retired**; the panel uses the
homepage's values everywhere.

### Verified identical

Rendered `outerHTML` of the CTA section is **byte-identical** across the
homepage and `/security/`, `/about-us/`, `/ambient-ai/`, `/integration/`,
`/post-acute-care/`, `/faqs/`, `/contact-us/`, `/white-labeling/` — same
SHA-256. `/support-ticket/` differs by exactly one class, its `leading="tight"`
(that page ships `body{line-height:1.5}`); its panel is 3px shorter as a
result.

Do not use screenshot hashing to check this — the panel sits at a different
fractional Y on each page, so rasterisation differs on the bottom edge row and
along the curve antialiasing even when the markup is identical. Compare
`outerHTML` or computed styles instead.

All 28 CTA-bearing pages checked: 1120px panel, 40px radius, 6 icons,
"Request Demo" → `/contact-us/`, no overflow. Navigation confirmed from `/`,
`/security/` and `/ambient-ai/`.

### Regression impact

The six deferred-page baselines that render `InnerCta` grew by the CTA's own
delta — **+190/191 at 1440, +101 at 900, +108 at 600**. `download-old-app` and
`murphi-xpress-video` pass `showCta={false}` and were unchanged at 0, which is
what confirms nothing but the CTA moved. `raw/selfcheck` was rebaselined.

### The homepage panel

The full-bleed blue band became a floating rounded panel on a light page. The
section opens on `#F5F5F5` — the ground the PaaS section above ends on — and
resolves to white, so the panel reads as sitting on the page rather than
starting a new band. Panel is `1120×472`, radius 40 (24 at ≤600), on a
`145deg #0056AD → #0069D6 → #007EFF` gradient.

Content is `CTA_SECTION` verbatim: tag, both heading lines, lead, and
"Request Demo" → `/contact-us/`.

Depth comes from gradients painted across the full box — a top highlight, a
drifting bottom-right pool, and a mesh masked *outward* from the centre so it
never crosses the copy — plus one SVG carrying two orbit ellipses, two flowing
curves and four dots. No blurred shapes: the panel clips at its own 40px radius
and a clipped blur would leave a hard edge along it.

### Floating icons

Six, three per side, mirrored, on `murphi-hero-float` with staggered negative
delays so they do not bob in unison. Decorative and `aria-hidden`.

They live in the panel's outer margin and are hidden below 1100 where that
margin disappears. Verified: **6 visible at 1440 and 1280, 0 at ≤1100, and 0px
horizontal overlap with the content column at every width** — the check that
matters, since an icon crossing the heading would be the obvious failure.

**Testing note:** two natural-looking locators for this section both match the
wrong one. `a` with text "Request Demo" also hits the hero CTA and the demo
modal; an `h2` containing "Experience AI Automation" also hits How-It-Works,
whose heading ends with that exact phrase. Match on the `Get Started` eyebrow.

## 18. Real Outcomes. Real Customers. — featured testimonial

`SocialProofSection.tsx`, now a client component. The auto-scrolling review
marquee became one featured card over an abstract field. Supersedes §5's
reviews entry; the partner marquee is untouched.

### Seven, not four

The brief described four testimonials and a four-dot pager. `TESTIMONIALS` has
**seven**. The four named in the brief are all there, but building for four
would have deleted Dave Crow (Healthcare Synergy), Mara Garcia (SouthSide CHC)
and Kristen Anderson (AAIC) — real customers. A slider is count-agnostic, so
all seven are in the rotation with seven dots. Nothing was edited: segment,
body, initials, name and role render verbatim.

### Page scroll is untouched — the load-bearing constraint

There is **no wheel handler, no `touch-action` override, and no
`preventDefault` anywhere in this component.** The swipe is measured on
`touchend` by comparing the start and end points; a drag that is mostly
vertical is ignored and the page scrolls as it always did. Arrow keys act only
while the slider has focus, so they never steal keyboard paging.

Verified: wheel over the page scrolls 0 → 1200; wheel **directly over the
carousel** scrolls 2694 → 6105 and leaves the slider index unchanged.
Computed `touch-action: auto`, `overscroll-behavior: auto`.

If this section is ever touched again, that is the property to re-test.

### Composition

Abstract field: two large translucent sweeps (one per side, framing the
centre), three thin flowing lines, two wide arcs cradling the card, a fine dot
grain, and a white radial that keeps the centre clean behind the quote.
Everything is a gradient or a stroked path — no blurred shapes, since the
section clips at its edges and a clipped blur leaves a hard line.

Card is 820px, `rounded-[28px]`, white on a `brand-border/70` hairline. Order:
category pill → gold stars (`#F59E0B`, the existing tone) → quote at
`clamp(17px,1.55vw,21px)` capped at 640px for line length → avatar, name, role.

Two tinted ghost layers peek 18px and 36px below the card. They are sized to
the card via `inset-y-0` inside a card-only zone plus a translate — an earlier
`h-full` on the outer wrapper made them 488px tall and run behind the controls.
They were also white-on-near-white at first, i.e. invisible; they carry a faint
blue tint now so they read as a stack. Hidden below 900.

### Verified

All seven cycle; next and previous both wrap; dot jump works; arrow keys act
only when focused. 7 dots, 2 arrows at every width. No horizontal overflow at
1440/1280/900/390. No console errors.

## 19. Inner-page hero — contained canvas

`PageBlocks.PageHero`. **Used only by `SegmentPageTemplate`, i.e. the ten
"Who We Serve" segment pages** — post-acute-care, health-systems-hospitals,
primary-specialty-care, mental-behavioral-health, ehr-emr-companies,
rcm-companies, coding-billing, qapi-compliance, accreditation-audit,
public-health-and-corrections.

The five module pages (ambient-ai, revenue-assurance, contract-analyzer,
ai-patient-financials, white-labeling) use `ModulePageTemplate`'s own hero and
were **not** touched: it is already a two-column `852px 300px` layout with a
status card on the right, so it never had the empty-right-side problem this
redesign was for. Extending the canvas treatment there is a separate call.

### Shape

Was a full-bleed blue rectangle with five per-variant paddings. Now a contained
curved canvas on a white page, matching the homepage hero: `max-w-[1320px]`,
`rounded-[56px]` (36 at ≤1024, 24 at ≤600), 60px of white each side at 1440 and
32px of white between the fixed nav and the canvas top.

`HERO_PADDING` — the five per-variant hero paddings — is retired; the canvas
uses one padding for all ten. `variant` still drives the h1 scale.

### The right-side visual — one per page

**There was no existing hero visual to reuse** — `SegmentPage` has no image or
visual field. `shared/HeroVisuals.tsx` holds ten different ones, dispatched on
`slug`, each a different *kind* of interface chosen from what that page argues:

| Page | Interface |
|---|---|
| post-acute-care | episode-of-care timeline, visit → OASIS → coding → claim → paid |
| health-systems-hospitals | payer contract variance table, contracted vs paid |
| primary-specialty-care | practice overview, response-rate ring + charting/call bars |
| mental-behavioral-health | session log, waveform + audit-ready ticks |
| ehr-emr-companies | integration console, endpoint rows + transport chips |
| rcm-companies | embed map, "Your RCM platform" wired to modules |
| coding-billing | client worklist + managed / white-label model toggle |
| qapi-compliance | 28-tile report library + alignment chips |
| accreditation-audit | standards × coverage matrix with gap analysis |
| public-health-and-corrections | eMAR / MedPass pass log + language chip |

They share primitives (Surface / Head / Bar / Chip / Tick / Float / Frame) so
the ten read as one product, and share nothing else. Verified: **10/10 distinct
structural signatures** — DOM skeleton hashed with text stripped, 23–57 nodes —
and **10/10 distinct blue fields**.

Figures come from each page's own KPI block where one exists. The three pages
without KPIs (coding-billing, qapi-compliance, accreditation-audit) use
interface state only. Nothing invents a performance claim.

**On the brief's examples:** it suggested skills matrices, learning progress,
career paths and talent marketplaces. Those describe a workforce-learning
product; these pages are clinical documentation, revenue assurance, patient
payments and compliance. The brief also said to let the page's real content
decide, and it did.

### Per-page blue field

`HERO_FIELD` keys two radial overlays per slug — same palette everywhere, only
the placement of the light and the deeper blue changes, so the ten feel related
without looking like ten different sites.

### Gotcha: Bar sizes with `w-full`, never `flex-1`

Inside a **column** flex parent, `flex-1` resolves against the cross axis and
collapses the bar to zero height — it disappears with no error and no layout
shift. The contract-variance table hit exactly this and rendered three invisible
bars.

Float and bar animations stop under `prefers-reduced-motion`. **Known gap:**
the shared `.animate-wlpp-pulse` utility has no reduced-motion guard and keeps
running. It predates this work and is used by the homepage hero, the PaaS
dashboard and the module tabs as well, so guarding it is a global change rather
than a hero one.

### Verified

10/10 pages: 200, canvas 508–593px (target was 500–650), 60px white each side,
56px radius, 3–4 rows, CTAs intact, no horizontal overflow, no console errors.
Two columns to 1024, single column below, content-first on mobile with the
visual under it.

### Regression impact

These ten pages previously matched the live site and were part of the
live-vs-clone height regression. **Those baselines are now void** — the hero is
a deliberate divergence, as on the homepage. Compare them against their own
recorded clone heights from here on.

## 20. EHR Integration — the orbit

`shared/EhrOrbit.tsx`. Replaces the eyebrow → heading → lead → pill-row stack
for the "EHR Integration" section on **post-acute-care, health-systems-hospitals
and mental-behavioral-health**, scoped by an explicit slug set in
`SegmentPageTemplate`. **public-health-and-corrections still uses the standard
stack** — its section is a `banner`, not a lead + tag list, and it was left
alone when the orbit was extended.

Left: the EHRs a customer already runs, orbiting Murphi.ai as the integration
layer. Right: the section's own eyebrow, heading and lead through the existing
`SectionEyebrow` / `SectionHeading` / `SectionLead`, so type matches every
other band.

### The node list is read from the page, not hard-coded

The two pages list **different** EHRs, and must:

| Page | Nodes |
|---|---|
| post-acute-care | WellSky, Axxess, Kantime, MatrixCare, HCHB, Netsmart, Careficient |
| health-systems-hospitals | Epic, Cerner, Athena, ECW, Allscripts |

Putting the post-acute vendors on the health-system page would be factually
wrong, so the orbit maps `section.whoTags`. The trailing `+ Any FHIR/HL7 EHR`
tag is split off and sits under the orbit as the "works with what you have"
cue, which also keeps a long label out of a round node.

### The vendor marks are wordmarks, not logos

No EHR logo asset exists in the repository — `public/` holds only Murphi's own
two — and these are third-party trademarks, so drawing stand-ins would be
inventing other companies' logos. Each node is a white circular surface sized
to hold real artwork; licensed SVGs drop straight in.

### Geometry

Nodes alternate between a 40% and a 28% ring so the composition reads with
depth rather than as a single dial. Those two radii are load-bearing: at 66px
on a 560px box a node's radius is 5.9%, so the outer ring reaches 45.9% (inside
the box) and the inner ring stops at 22.1% (clear of the 12% centre). Node size
steps down at 900 and 600 to hold both margins on smaller boxes.

Verified on both pages at 1440/1280/900/390: **0 nodes escaping the box, 0
overlapping the centre, 0 overlapping each other, no horizontal overflow.**

Order flips below 1024 (`order-1`/`order-2`) so small screens read label →
heading → copy → visual rather than leading with the orbit.

## 21. Core Modules — accordion with a live visual

`shared/FeatureAccordion.tsx` + `shared/FeatureVisuals.tsx`. Replaces the
three-up `FeatureCardGrid` for sections tagged **Core Modules**, **Core
Capabilities** or **Our Differentiators** — ten pages, 51 items. Every other
`features` block still renders the card grid.

**There was no accordion before this.** The brief said to keep the existing
accordion structure; the sections were a card grid, so the accordion is new,
built to the reference rather than preserved from the page.

Left: one item per feature, badge + title always visible, description only on
the open one, brand rule on top of the open row, chevron rotates. Order and
copy are `section.features` verbatim, including `attribution` and
`noteLabel`/`noteText`. First item open on load, exactly one open at a time.

Right: a large tinted container spanning the row (`items-stretch` + centred
content, so it reads as the reference's big panel rather than hugging a small
card), holding the visual for the open item. Keyed on the open index so it
remounts and replays `murphi-canvas-in`.

### One visual per concept, not per item

32 distinct feature titles across the ten pages map to visual *formats* chosen
from what each feature says — waveform for voice capture, review queue for
revenue assurance, clause diff for contract analysis, thread for secure
messaging, endpoint console for API, brand swap for white-label, risk bands for
EOLRBA, language pair for translation, and so on.

Repeated modules across pages share a visual deliberately: Ambient AI is
Ambient AI wherever it appears. What must never repeat is two items *within one
page*. Verified by clicking every item on every page and hashing the rendered
DOM skeleton with text stripped: **51/51 items, zero repeats within any page.**

Matching is ordered, most specific first — `Revenue Assurance — Home Health`
must beat the generic Revenue Assurance rule, and `Encrypted API · SSO · iFrame`
must beat the plain API rule. coding-billing is the page that forces this: it
carries two Revenue Assurance items, so Home Health renders a named report
checklist and Hospice a counted coverage grid, both drawn from their own
descriptions.

Figures quoted inside a visual (report counts, language counts) come from that
feature's own description. The rest is interface state.

### Verified

10/10 pages at 1440/1280/900/390: exactly one item open, visual contained
within its panel, no horizontal overflow, no console errors. Two columns to
1024, stacked below with the visual under the accordion.

### Orbit nodes when a page names no vendors

`EhrOrbit` takes an optional `nodes` prop, defaulting to `section.whoTags`, so
the two vendor pages are unaffected.

Mental & Behavioral Health needed it: its EHR section has a lead but **no
whoTags**, and the lead names no specific EHR — *"Murphi.ai integrates with
leading behavioral health EHR platforms via FHIR and HL7 standards. Notes sync
back automatically. AR is read and payments posted without manual entry."*
Reading `whoTags` there would render an orbit with zero nodes, and inventing
behavioural-health vendor names would put unsupported systems on the page.

So `ORBIT_NODES` in `SegmentPageTemplate` supplies the standards and the data
flows that sentence does name: Behavioral health EHR, FHIR, Notes sync back,
HL7, AR read, Payments posted. Same component, same rings, same centre — only
what orbits differs, and it still comes from the page.

The catch-all pill is optional and simply does not render when a page has no
trailing `+ …` tag, as here.

---

## 22. Who It's For · Outcomes · Live Partners · Why Choose · Two/Three Models

Six sections across the ten "Who We Serve" pages, all previously rendered by the
same three generic blocks — `WhoTags` + `SectionLead`, `KpiGrid` + `QuoteBlock`,
and `CardRow`. Content decided each new composition; none of the six shares one
with another, and no page carries two of them in the same shape.

| Section | Pages | Content it holds | Composition |
|---|---|---|---|
| Who It's For | all 10 | one narrative + 4–6 org types | argument left, roster panel right |
| Outcomes | 6 | 4 figures + optional quote | lead metric + ledger + attributed footer, one surface |
| Live Partners | ehr-emr-companies | 3 platforms, each with a passage and a named person | full-width registry rows |
| Why Choose Murphi.ai | ehr-emr-companies | 4 partnership terms | terms sheet, one line per term |
| Two Models | coding-billing, qapi-compliance | 2 operating models | facing comparison, each with a workspace panel |
| Three Models | accreditation-audit | 3 audiences | three lanes on one board |

Files: `shared/AudienceRoster.tsx`, `OutcomeBoard.tsx`, `PartnerVoices.tsx`,
`CommitmentLedger.tsx`, `ModelPaths.tsx`, and the glyph vocabulary in
`SegmentIcons.tsx`. All are server components — every interaction is CSS hover,
so the redesign ships no additional client JavaScript.

### Two KPI sections, two different visuals — deliberately

`Outcomes` and `Why Choose Murphi.ai` both carry a `PageKpi[]`. They do not mean
the same thing, so they do not look the same.

Outcomes are results measured after the fact and mostly proportional — "70%
reduction", "98.7% accuracy". Why Choose is a term sheet: "15 days", "Zero",
"100%", "Zero". Three of its four are absolutes; plotting them would say
nothing, so it renders as a ledger of terms with the commitment at the end of a
leader rule, and no meters anywhere.

The template branches on `section.tag`, not on the presence of `kpis`.

### Meters are drawn only where a proportion exists

`OutcomeBoard.proportion()` returns a number only when the value is a single
percentage that is a share of a whole. Two exclusions matter:

- **A range has no point to plot.** "10-20%" (health systems, RCM) renders as a
  plain figure. Those two pages get no ring.
- **An increase is not a share of 100.** "↑60% Patient response rate increase"
  is growth; a 60% arc would read as "60 out of 100". Excluded on both the ↑
  glyph and an `increase` in the label.

What this produces, measured from the render:

| Page | ring | ledger bars (of 3) |
|---|---|---|
| post-acute-care | 70% | 2 — 98.7%, 75%; "15 days" plain |
| health-systems-hospitals | none (10-20%) | 0 — all three are durations |
| primary-specialty-care | 70% | 1 — 80%; ↑60% and 48 hrs excluded |
| mental-behavioral-health | 90% | 2 — 100%, 75%; "Always" plain |
| rcm-companies | none (10-20%) | 2 — 98%, 75% |
| public-health-and-corrections | 90% | 1 — 100%; "55+", "Always" plain |

No figure is scaled, rounded or inferred. The only number a meter uses is the
one the content prints.

### The roster reads the page, not a per-page config

`audienceGlyph()` in `SegmentIcons.tsx` is an ordered regex list over the org
type's own text, so post-acute gets home/hospice/palliative/SNF/private-duty and
corrections gets jail/DOC/detention/juvenile/community/public-health with no
per-page mapping anywhere.

**The invariant is that no two org types on one page share a glyph**, and the
ordering is what holds it. Two traps found by checking the render:

- `/coding/` would give "Medical Coding Consultants" and "Post-Acute Coding
  Specialists" the same glyph on coding-billing. `/post-acute/` is placed first.
- `/chc/` also matches **ACHC**, which collided with "Accreditation Consultants"
  on accreditation-audit. The rule is word-bounded: `/\bchcs?\b|fqhc/`.

Verified at 1440/1280/900/390: 5/5, 4/4, 6/6, 5/5, 4/4, 4/4, 4/4, 4/4, 5/5, 6/6
distinct glyphs.

### Where the model panels' labels come from

`ModelPaths.OPERATING_MODEL` is keyed on the badge and adds no claims. Both
labels restate the arrangement each card's own description already sets out:

- Managed Services — *"Log into Murphi.ai … and deliver results directly to your
  client."* → Operated by **You**, Reports delivered to **Your client**.
- Self-Service Agency — *"Each client gets their own Murphi.ai workspace. They
  run reports themselves — you provide oversight, training, and guidance."* →
  Operated by **Your client**, Oversight & training by **You**.

This is the one thing that separates the two options, and it was invisible in
the old card row.

### Partner marks are monograms, not logos

No partner logo asset exists in the repository and these are other companies'
trademarks. `PartnerVoices.monogram()` derives HS / CS / CP from the company
names; each tile is sized to hold real artwork if it is ever licensed. Same
position taken by the EHR orbit (§20) and the trust strip.

### Gotcha: a negative-inset glow layer scrolls the document

Both `AudienceRoster` and `CommitmentLedger` first carried an ambient
`absolute -inset-8` radial behind the panel. It reads well at 1440 and pushes
the document past the viewport the moment the band runs flush to the edge — at
390 the roster measured `[-14 … 404]` against a 390 client width, and the
tablet corrections page overflowed at 900.

Bands do not clip, and clipping them is a shared change affecting every inner
page. The fix is that the depth lives **inside** the surface: an
`overflow-hidden` panel with a corner radial at `inset-0` plus the existing
shadow. Same lift, no bleed. Note that children of that panel then need
`relative` or the radial paints over them.

### Verified

All ten pages at 1440 / 1280 / 900 / 390, `reducedMotion: reduce`:

- 200 on every page, **no horizontal overflow anywhere**, no console errors.
- Roster: tile count equals `whoTags.length`, glyphs distinct within every page,
  panel contained inside its band, 2 → 1 columns.
- Outcomes: ring/bar counts exactly as tabled above; the quote renders **inside**
  the board and is not also emitted by `QuoteBlock` below it.
- Live Partners: 3 rows, monograms HS/CS/CP, `— Dave Crow, President` split into
  name and role, header reads "3 platforms live".
- Why Choose: 4 term rows, 4 distinct glyphs, no `KpiGrid` present.
- Two Models: 2 cards, operators You / Your client, both counterpart labels
  correct, "Best for:" retained on both.
- Three Models: 3 lanes, 3 distinct actor glyphs, tiles straddle the board edge
  at −31px on desktop and reset to in-flow at ≤900.

### Regression impact

`KpiGrid`, `CardRow`, `QuoteBlock` and `WhoTags` are untouched and still serve
the module, integration and bespoke pages — the segment template simply routes
around them for these six tags and keeps each as the fallback branch.

Re-checked after the change: deferred-page heights 24/24 at all four widths,
Core Modules accordion 10/10 pages, the EHR orbit clean on all three pages, the
Get Started CTA identical across 8 pages, lint and typecheck clean, production
build 279 static pages.

Note that the ten segment pages' live baselines have been void since §19; these
sections are further deliberate divergences.

---

## 23. Six standalone heroes joined to the two hero systems

The five embed/partner pages and /ehr-ai-integration-platform/ each carried
their own full-bleed `#1877F2` hero with no product visual. They now render the
site's two established hero systems instead — the same code, not a copy of it.

| Page | System | Right/below |
|---|---|---|
| /white-label-partner-program/ | Who We Serve canvas | one platform, two revenue streams |
| /ai-for-managed-care-functions-…/ | Who We Serve canvas | PADU+ score on a payer contract |
| /primary-and-speciality-care-embed-into-ehr/ | Who We Serve canvas | specialty SOAP note |
| /embed-ai-into-ehr-workflows-mental-…/ | Who We Serve canvas | BIRP note + assessments |
| /public-health-and-corrections-embed-…/ | Who We Serve canvas | intake screening + risk |
| /ehr-ai-integration-platform/ | homepage composition | the laptop, running this page |

### The reference has no laptop — the panel is the laptop

The brief asked to match the Who We Serve hero's "laptop/browser placement".
That hero has no laptop: it is a white `Surface` panel with `Float` satellites
(§19). Only the *homepage* hero has the laptop (§9). The rule taken was to
match whichever reference the page was pointed at, so the five carry the panel
and the EHR platform page carries the actual laptop.

### Extracted rather than copied

- `shared/HeroCanvas.tsx` — the canvas shell (1320px cap, 56px radius,
  gradient, three depth layers, the 1fr/0.78fr grid, the 1024 stack). `PageHero`
  now renders through it, so the ten segment pages and the five embed pages
  cannot drift apart.
- `shared/EmbedHero.tsx` — the left column: pill row, h1, lead, buttons. Pill
  and button classes are imported from `PageBlocks` (`HERO_PILL_LINK`,
  `HERO_PILL_STATIC`, `HERO_BUTTON_ROW`, `heroButtonClass`), not restated.
- `shared/EmbedHeroVisuals.tsx` — five panels built on the segment pages' own
  primitives, which `HeroVisuals` now exports (`Surface` / `Head` / `Float` /
  `Frame` / `Bar` / `Chip` / `Tick`).
- `shared/LaptopFrame.tsx` — bezel, camera, screen well, chin, base edge, plus
  `useRotation` (2600ms, pause on pointer/focus, off under reduced motion) and
  `RailLabel`. `HeroProductUI` was rewritten to use it; the homepage laptop's
  geometry and behaviour are unchanged, verified below.

### `topPad`, because these pages already have a top margin

The segment pages start at the top of `<main>`; each embed page's wrapper
carries its own margin (WLPP 30, managed care 60, primary 60, mental 45, public
health 40, EHR 40). Each hero passes the padding that lands the canvas in the
same place: `104 − wrapperMargin`. Measured, all six now sit at the same offset
as the reference.

### Content is the page's own, and only the page's own

Every string in the five panels comes from the page it is on:

- **WLPP** — the shared engine and the point where the two models diverge, with
  each model's accuracy from its own workflow rail (85–95% baseline → 98%+ /
  98–99%). The four hero stats stay in the left column verbatim, in the band the
  homepage gives its proof points, because this hero has no CTA of its own.
- **Managed care** — the PADU+ tallies (8/7/5/3 of 23) and two clause sections
  from the analyzer block. PADU's four colours are this page's own scale, not a
  new palette.
- **Primary & specialty** — the cardiology follow-up demo: encounter line, SOAP
  sections, medication scan, and the page's own capability chips.
- **Mental & behavioural** — the individual-therapy demo: BIRP sections and
  PHQ-9 8 / GAD-7 11 / AUDIT-C 2, exactly as the demo populates them.
- **Public health & corrections** — the intake screening: note sections, COWS /
  Behavior / Immun. readouts, and the 55+ language figure.

The EHR laptop runs the page's `platform` block — four layers, their labels and
chips — with the three `integration` options driving the app bar, and the
`valueStrip` message as the canvas footer. Its hero band is the page's own
pipeline: Clinician Interaction → Murphi.ai Intelligence Layer (its six chips) →
Structured EHR Documentation.

**Two small content losses**, both deliberate: the managed-care breadcrumb's
decorative icon is dropped (the shared pill carries its own `→`), and WLPP's
hero stat *values* now render as a hairline band rather than four boxes.

### Gotcha: `Frame` leaves 40px under the surface

Three of the five first carried a second `Float` at `bottom-0`. `Frame` is
`pt-12 pb-10`, so anything taller than 40px at the bottom lands **on top of the
panel's last rows** — managed care covered its second clause, primary covered
"Auto-populated", public health covered its last score row. None of it shows in
a static class review; it took a float-vs-row rectangle intersection to find.

Each page now carries one satellite, and the second figure sits in the panel
footer behind a `border-t`, which is what the segment visuals already did.

### Verified

All six pages plus the two references at 1440 / 1280 / 900 / 390,
`reducedMotion: reduce`, no console errors, no horizontal overflow:

- **The five match the reference exactly.** Canvas top 104/104/96/96, width
  1320/1176/836/358, radius 56/56/36/24, grid 2→1 columns at 1024, and panel
  width 447/392/764/310 — every figure identical to /post-acute-care/.
- **The EHR hero matches the homepage exactly.** Field top 96/96/88/88, field
  width 1360/1232/876/374, laptop width 1120/1120/836/342, laptop crossing the
  field edge by 124/124/64/64, h1 52/47.36/33.3/32. Both laptops stand
  502×1120, and the EHR canvas holds 502 on all four layers (no jump on
  rotation) — hence its `min-h-[386px]` against the homepage's 326.
- **Zero float-over-content overlaps** on all five panels at 1440 and 1280.
- Rotation advances, holds on hover (`data-paused="true"`), and resumes — on
  both the homepage laptop and the EHR one. Rail clicks switch the integration
  option.
- Every hero link preserved: the breadcrumbs and both CTAs on each page still
  point where they did.

### Regression impact

`selfcheck.mjs` **rebaselined**: all six pages grew (1440: +157 to +768). The
other two deferred pages are byte-for-byte unchanged. Re-checked after the
change: segment heroes and sections clean on all ten pages, Core Modules
accordion 10/10, the Get Started CTA identical across 8 pages, lint and
typecheck clean, production build 279 static pages.

---

## 24. The six standalone pages — everything between hero and CTA

Roughly sixty sections across six pages, almost all of them a heading over a
card grid. The hero (§23) and the shared Get Started panel (§17) are untouched;
everything in between is rebuilt.

### The palette moved to the site's tokens

These pages shipped their own: blue `#1877F2`, body `#F2F2F2`, the slate ramp.
That was right when the whole page was theirs. It stopped being right once the
hero and the CTA both rendered in the site's own blue — a `#1877F2` body between
two `#007EFF` bookends reads as a different site.

Every section between them is now `--color-brand` and its ramp. **Two page-owned
colour systems survive**, because they are content rather than styling:

- **Managed care's PADU+ scale** — Preferred green, Acceptable blue, Discouraged
  amber, Unacceptable red. Four tiers that must stay distinguishable; its blue
  stays `#1877F2` so the badge and the analyzer's status dot agree (the dot's
  fill is inline in a generated icon file).
- **The partner programme's blue/green split** between its two deployment
  models, which its content encodes as `tone` and `chipTone`.

Feature-family colours survive too, demoted from pills to 5px dots.

**Icons were not replaced.** Each page's set is content-mapped and internally
consistent; what was inconsistent was their presentation. `IconTile` gives every
glyph one box, one size and one stroke weight per section. The behavioural-health
page strokes all 81 of its glyphs with an inline `var(--blue)`, so remapping that
one custom property on the wrapper repaints the set.

### One purpose-built treatment per archetype

`shared/embed/` holds the vocabulary. Each archetype is the form its content
actually is, and none of them is a card grid:

| Archetype | Pages | Was | Is |
|---|---|---|---|
| Who it's for | 4 | pills + paragraph | argument left, numbered audience register right |
| Trust bar | 4 | centred icon row | a rail — hairlines, micro-caps, arrow link |
| Outcomes | 5 | 4 bordered boxes | oversized figures on hairlines |
| Capabilities / modules | 3 | 4-up card grid | full-width rows, description at a real measure |
| Integration options | 4 | 3 cards | three paths converging on one platform |
| Platform layers | 4 | stacked strips | a stack: spine, slabs, lightest on top |
| Process ("how it works") | 2 | centred circles | left-aligned blocks hung off a rail |
| Plan (roadmap) | 4 | centred circles | a vertical timeline beside the head |
| Security | 6 | 4 small cards | one controls sheet, four columns on hairlines |
| Agentic RCM | 3 | cards with bullets | lanes whose steps run on a numbered rail |
| Feature explorer | 5 | 3-up card grid | grouped rows, type as a coded dot |
| Testimonials | 2 | quote cards | a pull quote at editorial size |
| Use cases | 1 | 6 cards | one board, three lanes per row |

Process and plan are deliberately different shapes: managed care carries both,
and a process reads across while a plan reads down.

### What each page got that is only its own

- **Partner programme** — the two deployment models as aligned tracks: same five
  workflow rows, so the eye lands on the two places they differ (who reviews,
  what accuracy ships). The comparison stays a table, because it is one.
- **Managed care** — PADU+ renders the *scale* (four tiers, worst to best) beside
  the register of what each tier means. The contract analyzer is left alone: it
  was already the best thing on the page, and only its chrome moved.
- **Primary & specialty** — the specialty picker keeps its tab-per-setting
  behaviour and shows that setting's features through the same row treatment as
  the all-features explorer, so switching settings reads as filtering one list.
- **EHR platform** — the value strip's single line of copy is set as the
  statement it is, over the four things it promises.

### Section rhythm

`Band` takes `plain` / `tint` / `deep`. Pages alternate plain and tint and spend
**one** `deep` band on their strongest moment — the ambient demo on the three
embed pages, the "why it matters" figures on managed care, the closing panel on
the partner programme. Security stays light on every page, because a deep band
directly above the blue Get Started panel would stack two blues.

### Gotcha: an inline `gridTemplateColumns` beats every responsive class

`ProcessTrack` and `RoleColumns` set their column count from `items.length` via
an inline style, with `max-1000:grid-cols-1` alongside. Inline styles outrank
classes unconditionally, so the responsive rule never applied and managed care
rendered six 165px columns at 390px — the only genuine horizontal overflow in
the whole change. Column counts are now a class lookup.

Two related fixes from the same pass: `SectionHead`'s `aside` was `shrink-0`, so
an 8-tab rail could not wrap and pushed four pages past the viewport at ≤900;
and before that, the aside squeezed the h2 to one word per line. It is now a
flex-wrap row where the heading holds a 420px floor.

### Verified

Six pages at 1440 / 1280 / 900 / 390, `reducedMotion: reduce`:

- 200 on all 24, **no horizontal overflow on any**, no console errors.
- **The heroes are untouched** — canvas top 104, width 1320, radius 56px, two
  columns, panel 447px on all five, identical to /post-acute-care/; and the EHR
  laptop still matches the homepage exactly at all four widths (field top, field
  width, laptop width, crossing distance, h1 size).
- **The CTA is untouched** — byte-identical across 8 pages.
- Interaction intact: explorer tabs narrow 50 → 12 → 1 on the behavioural-health
  page and 69 → 22 on the EHR page; the specialty picker swaps its panel; the
  contract analyzer still moves from placeholder to clause evidence; and all
  five drawers open (test on the drawer must read `translate`, not `transform` —
  Tailwind v4 emits the former).
- One `#1877F2` element survives per managed-care page load: the PADU
  "Acceptable" tier, kept on purpose.

### Regression impact

`selfcheck.mjs` **rebaselined** — all six changed; `download-old-app` and
`murphi-xpress-video` are untouched. Segment pages, the Core Modules accordion
(10/10) and the EHR orbit (12/12) all still clean. Lint and typecheck clean,
production build 279 static pages.

### Gotcha: a timeline marker at `left-0` lands on the text, not in the gutter

`ProcessTimeline` puts its step numbers in the `<ol>`'s left padding. The `<li>`
is the positioning context, so `absolute left-0` resolves to the **li's** left
edge — which is where the text starts, not where the padding starts. All four
markers sat directly on top of their titles, on all five pages that use the
component, at every width (`markLeft === textLeft`, measured).

A marker has to be pulled back by exactly the `<ol>`'s padding to sit on the
spine: `pl-14` with `-left-14` (and `pl-11` / `-left-11` below 600). A 31px
circle in a 56px gutter leaves 25px of clear space before the title; 27px in
44px leaves 17px. The circle is also lifted 5px so it centres on the title's
first line rather than hanging below it.

Verified at 1440 / 1280 / 900 / 600 / 390: **0 overlaps**, one marker-left and
one marker size per width across all four steps on every page. Page heights are
unchanged (the markers are absolutely positioned), so `selfcheck` still matches
24/24. `/white-label-partner-program/` was unaffected — its steps section is the
horizontal `ProcessTrack`, whose markers sit above the text.

---

## 25. Solutions heroes — the same hero system as Who We Serve

The Solutions dropdown holds six pages, in two columns of the nav:

| Column | Page | Template |
|---|---|---|
| SaaS Modules | /ambient-ai/ | `ModulePageTemplate` |
| | /revenue-assurance/ | `ModulePageTemplate` |
| | /ai-patient-financials/ | `ModulePageTemplate` |
| | /contract-analyzer/ | `ModulePageTemplate` |
| PaaS / API | /integration/ | `IntegrationPageContent` |
| | /white-labeling/ | `ModulePageTemplate` |

The five `ModulePageTemplate` pages now render `HeroCanvas` — the same shell the
ten segment pages and the five embed pages use (§19, §23). **/integration/ is
untouched**: its hero visual is on hold for the design direction it is getting
separately, and half-converting it would have left a shell with no visual.

`ModuleHero` was the last full-bleed blue hero on the site. Its per-density
padding table and its 300/320px aside track are retired, as the segment
variants were: the contained canvas uses one padding for all five.

### The Module Status card moved into the panel

Every module page carries a `statusCard` — a title, a badge, and six facts —
which the old hero showed as a translucent aside. It is not dropped: the badge
becomes the panel's status chip and the facts its footer, which is what a
status readout is. So the hero still prints all of it, inside the product
surface rather than beside it.

### One visual per page, from that page's own content

`ModuleHeroVisuals.tsx` reuses the segment primitives (`Surface` / `Head` /
`Float` / `Frame` / `Chip` / `Tick`), so the two families are literally the same
code. What differs is what the panel shows:

- **Ambient AI** — the page's four steps (Record → Transcribe → Generate →
  Sync) under a waveform.
- **Revenue Assurance** — the 28 reports as 28 tiles, split 15 Home Health /
  13 Hospice, over the human-review gate.
- **AI Patient Financials** — the text-to-pay sequence: message, balance paid,
  the page's own payment methods, posted back to the EHR.
- **Contract Analyzer** — payer clause against your operating manual, which is
  the page's "contract vs. manual gap analysis"; the float carries PADU+.
- **White Label** — a brand slot the partner's mark would fill, with Murphi.ai
  named only in the footer row, "Invisible".

Contract Analyzer and White Label publish no figures at all, so their floats
carry a concept rather than a fabricated number.

### Gotcha: Revenue Assurance keeps its KPIs in `twoCol`

`page.sections.find(s => s.kpis)` finds nothing on that page — its figures sit
in `section.twoCol.kpis` beside a tall card (the shape is documented on
`ModuleTwoCol`). The hero rendered an **empty float** and a missing value on the
review row. The lookup now falls back to `twoCol.kpis`.

### Gotcha: `Tick` is `text-brand`, so it vanishes on a brand-filled disc

The shared `Tick` hard-coded `text-brand` with `stroke="currentColor"`. Inside
a `bg-brand` circle that is blue on blue and the glyph disappears. It now takes
an optional `className`; the module visuals pass `text-white` where the disc is
filled. **The same latent bug is still visible in `PostAcuteVisual`'s episode
timeline on /post-acute-care/** — left alone because that page was out of scope
for this change.

### Verified

Five pages at 1440 / 1280 / 900 / 390, against /post-acute-care/ as the
reference, every figure identical:

| | 1440 | 1280 | 900 | 390 |
|---|---|---|---|---|
| canvas top | 104 | 104 | 96 | 96 |
| canvas width | 1320 | 1176 | 836 | 358 |
| radius | 56px | 56px | 36px | 24px |
| grid columns | 2 | 2 | 1 | 1 |
| panel width | 447 | 392 | 764 | 310 |

Panel contained inside the canvas on all five at all four widths, one float
each, no horizontal overflow, no console errors. `/integration/` still renders
its original hero (full-bleed gradient section, 80px top padding). Segment
pages, deferred-page heights (24/24) and CTA parity all unchanged; lint,
typecheck and a 279-page build clean.

---

## 26. /integration/ hero — the connected ecosystem

The sixth Solutions page (§25 covered the other five). Its hero uses the same
`HeroCanvas` shell as its siblings, so the family is complete, but its right
side is deliberately **not** the product panel the others carry: this page sells
the connections, so the connections are the visual. No dashboard, laptop,
browser frame, table or KPI card.

Built to a supplied reference composition: a group of nodes left, a strong
centre, a group right, joined by thin lines that branch through small
connection points.

### The six nodes are the page's six integration methods

`Agentic AI`, `RPA`, `FHIR R4`, `HL7 v2`, `Direct REST API` and
`Adapter Platforms` — the six `.int-method` cards the page's first section
lists, five of which the hero subtitle names in its own sentence.

Methods rather than companies, which is what makes a **full-colour** treatment
honest: each tile carries an original icon, so nothing imitates anyone's logo.
Tile colours come from the accent set this codebase already uses for feature
families — indigo agentic, teal voice, green clinical, amber compliance — plus
the two brand blues. No new hue.

**The four vendor platforms the page also names — Epic, Cerner, WellSky and
Everyware — are not drawn.** No logo asset for any of them exists anywhere in
the repository (`public/` holds eleven images: two ChatGPT renders, the four
security cert badges, two photographs, a screenshot and blog art), and all four
are third-party trademarks. `Node.logo` takes an image path and renders it in
place of the glyph, so licensed artwork drops in one line per node.

### The centre carries the real mark, cropped, not redrawn

The brand mark occupies exactly x 0–116, y 0–116 of the 852×150 lockup —
measured off `logo-blue.png`'s own alpha channel; its wordmark starts at x 152.
`MurphiMark` shows that square by sizing the real file to 728.2% (852/117)
inside a square `overflow-hidden` window. Nothing is traced or re-drawn, and no
wordmark appears inside the visual.

### Gotcha: a square viewBox letterboxes inside a 4:3 field

The first build positioned tiles with CSS percentages of a 4:3 box and drew the
spine in a `0 0 100 100` viewBox. `preserveAspectRatio` defaults to `meet`, so
the square drawing letterboxed into the centre of the box and every line landed
somewhere other than the tile it was meant to reach — the branches rendered
near-vertical and disconnected. The spine is drawn in `0 0 400 300` now, the
field's own ratio, so one unit is one unit in both axes.

A second miss on the way there: at a square aspect the branch diagonals are
~48°, nothing like the reference's shallow angle, because the reference is a
4:1 strip. A 470px-wide hero column cannot host a 4:1 composition and keep the
tiles legible, so the field is 4:3 and the inner tiles sit at ±26% rather than
±34% — the reference's language at the width actually available.

### Verified

At 1440 / 1280 / 1024 / 900 / 600 / 390: six nodes, **0 escaping the hero
canvas, 0 overlapping each other, 0 covering the centre**, the real logo image
present at every width, no horizontal overflow, no console errors. Tiles step
68/58 → 62/54 → 52/46px and the field 470 → 430 → 340/310, so mobile keeps the
whole composition rather than shrinking it past legibility.

The left column is untouched — same eyebrow, h1, description and both CTAs.
Deferred-page heights 24/24, CTA parity unchanged, the other five Solutions
heroes unchanged, lint and typecheck clean, build 279 static pages.

---

## 27. /integration/ "EHR Capability" — the platform ecosystem

The section's two tag clouds, rebuilt as a connected ecosystem: post-acute
platforms arcing down the left, health-system and specialty platforms down the
right, the Murphi mark anchoring the centre. Eyebrow, heading, both group
titles, both subtitles and all thirteen platform names are unchanged.

Each group's trailing `+ Any FHIR/HL7` is split out to sit under its heading
rather than becoming a node, because it is not a platform.

### The discs hold initials, not logos

WellSky, Axxess, Kantime, MatrixCare, HCHB, Netsmart, Careficient, Epic, Cerner
(Oracle Health), Athena, ECW, Allscripts and NextGen are **thirteen third-party
trademarks and this repository holds an asset for none of them** — `public/`
contains eleven images in total, none vendor-related. Drawing them would be
inventing other companies' marks.

Each node is a 64px white disc with the padding real artwork needs, carrying
the platform's initials in one of seven accent colours so the field is never one
flat blue. `Placed.logo` takes an image path and replaces the initials: one line
per node once licensed files exist. Same position as the EHR orbit (§20), the
partner registry (§24) and the hero (§26).

### One DOM, two layouts

Above 900px the nodes are absolutely positioned on the arcs and the two group
headings sit in the field's top corners. Below it every one of them goes
`static` and flows, so the reading order becomes post-acute group → Murphi →
health-system group — which is why the JSX emits them in that order even though
the desktop arc does not depend on it. The wrappers are `display: contents` on
desktop precisely so their children still position against the field.

### Gotcha: the label cannot live inside the anchored box

The node was first a centred column of disc-then-label. `-translate-y-1/2` then
centres *disc plus label*, putting the disc's centre ~20px above the coordinate
the connectors aim at, so all thirteen endpoints missed. The `<li>` is the disc
alone now and the label is absolutely positioned beneath it, so the anchor and
the disc's centre are the same point.

### Gotcha: `animate-wlpp-pulse` moves an SVG circle instead of pulsing it

`wlpp-pulse` animates `transform: scale(1) → scale(1.25)`. On an HTML span that
scales in place. On an **SVG** shape the default transform box is the SVG's own
coordinate system, so the scale is about the origin and the circle is flung
along the vector from (0,0) — measured 1.24× off its authored position on every
connection dot. Both this section and the hero (§26) now set
`[transform-box:fill-box] [transform-origin:center]` on those circles.

Every other `animate-wlpp-pulse` in the codebase is on an HTML element and is
unaffected.

### Verified

At 1440 / 1280 / 1024 / 900 / 700 / 560 / 390, measuring the disc and the label
as separate boxes: thirteen nodes, **0 box-to-box overlaps, 0 against either
group heading, 0 against the centre, 0 outside the field**, no page overflow,
no console errors. Above 900 all thirteen connection dots land on their disc's
edge. Labels hold 11.5px desktop / 11px below 900.

Deferred-page heights 24/24, CTA parity unchanged, the six Solutions heroes
unchanged, lint and typecheck clean, build 279 static pages.

---

## 28. /integration/ — the three sections either side of EHR Capability

The page has four sections. The hero (§26), "EHR Capability" (§27) and the
shared Get Started panel are untouched; the other three were all the same
bordered-card grid and now each has its own treatment and its own ground.

| Section | Was | Is | Band |
|---|---|---|---|
| Integration Methods | six cards, 3-up | argument one column, six methods as rows | tint |
| Payment Integration | one wide card + four KPI boxes | the page's one deep anchor, figures on hairlines | deep |
| Security | three cards | split: certifications beside a shield composition | white |

That gives the page a rhythm of deep hero → tint → white → deep → white → CTA,
rather than four identical grey/white bands.

Only the three redesigned sections own their band. `IntegrationPageContent`
routes them through `OWN_BAND` and leaves the original `alt`-driven wrapper for
EHR Capability, whose markup and 1200px/72px shell are unchanged.

### One icon system, top to bottom

The methods section renders the **same six glyphs** the hero ecosystem uses,
imported from `IntegrationEcosystem`, matched to each method by its own title.
Nothing is drawn twice and nothing is drawn in a second style.

### Security uses the project's real certification artwork

The three cards — HIPAA Compliant, SOC 2 Type II, ISO 27001 — pair with
`Frame-2147203098-2.png`, `Frame-2147203096-1.png` and `Frame-2147203097-1.png`,
which are the badges `/security/` already renders in its own hero. They are the
project's assets, so no certification mark is invented here.

The only original mark is the shield: 78px inside a 152px disc at the centre of
three rings, with five verification points and a soft brand glow — medium,
balanced against the copy, and calm. No warning colours, nothing red, nothing
that reads as a breach notice.

### Verified

At 1440 / 1280 / 1000 / 900 / 600 / 390: no horizontal overflow, no console
errors, all three certification badges at 46px and the shield at 78px desktop /
64px below 1000 — visible without dominating. Section grounds measured as
tint / white / deep / white in page order, with 88px band padding against the
untouched EHR Capability section's 72px.

**The three protected sections are unchanged**: the hero ecosystem still
measures six nodes with 0 escapes and 0 overlaps, EHR Capability still measures
thirteen nodes with 0 overlaps against each other, the group headings or the
centre, and the Get Started panel is byte-identical to the homepage's. Deferred
page heights 24/24, lint and typecheck clean, build 279 static pages.

---

## 29. Solutions module pages — everything between hero and CTA

The five `ModulePageTemplate` pages: /ambient-ai/, /revenue-assurance/,
/ai-patient-financials/, /contract-analyzer/ and /white-labeling/.
`/integration/` is a different component and is untouched (§26–§28), as are
every hero (§25) and the shared Get Started panel (§17).

Twenty-one sections shared one card grid. Each is now routed to a treatment
chosen for what it says, through a `TREATMENT` table keyed `slug/tag` — so two
sections with the same *shape* can still read differently, and band tones
alternate per page rather than repeating grey/white down the document.

| Treatment | Used by | Instead of |
|---|---|---|
| `StepTrack` | two "How It Works" | centred numbered circles |
| `FeatureRegister` | Note Types, PADU Plus, What White Label Means | 3-up card grid |
| `ReportMatrix` | Home Health / Hospice Reports | 3-up card grid |
| `OptionPlate` | Payment Methods | 3-up card grid |
| `TwoColSplit` | Accuracy & Review, Who It Serves | KPI boxes beside a card |
| `EmbedOptions` | Integration Options | three icon cards |
| `ServesRegister` | Who It Serves (financials) | a pill cloud |
| `OutcomeBand` | two "Outcomes" | four KPI boxes + a detached quote |
| `RelatedRail` | all five "Related" | three more cards |
| `PartnerVoices` (§24) | Live Partners | three cards |

Measured tone sequence, hero first: ambient `white tint white deep white tint`,
revenue `white tint white deep tint`, financials `white tint white deep white
tint`, contract `white tint deep white`, white-label `white tint white deep
white`. One deep anchor per page.

### The two report catalogues share a device on purpose

"15 AI Compliance Reports for Home Health" and "13 AI Compliance Reports for
Hospice" are parallel content and sit next to each other. Making them look
different would misrepresent them, so they share `ReportMatrix` and separate on
ground — tint then plain. The `footnote` ("+ 9 additional…") renders as a ruled
tail rather than centred grey text.

### EHR Integration — the highlight, and why it is not radial

/ambient-ai/'s EHR Integration is the only one of the twenty-one that gets a
bespoke component. Both `/integration/` compositions are radial (§26 hero, §27
capability), so this one reads **left to right**, which is what its content
describes: a note leaves the session, passes through the connection layer, and
lands in the EHR "with no copy-paste, no manual upload".

- **Left** — the module's own name and the first three of the page's own four
  "How It Works" step titles, read straight off `page.sections`. The fourth
  step ("Sync") is what the flow itself depicts, so it is not repeated.
- **Middle** — the four methods the section's lead names in its own sentence:
  Agentic AI, RPA, FHIR R4, HL7 v2. Hard-coded in `AMBIENT_METHODS` with the
  sentence quoted beside it, rather than parsed out of prose that a content
  re-run could reword.
- **Right** — the eleven platforms from the section's `tagCloud`, with its
  trailing catch-all split out beneath them.

**No vendor logo asset exists for any of the eleven and all are third-party
trademarks**, so each is a name chip sized to take real artwork. Fourth time
this has come up: same position as §20, §24, §26 and §27.

### Icons

`moduleGlyph()` was added beside `audienceGlyph()` in `SegmentIcons`, matching a
feature's own title against the same vocabulary, with nine glyphs added for the
payment and contract terms (phone, qr, card, scan, pen, doc, sliders, key, plus
`gov` reused for ACH). One icon system across segment, embed and module pages.

### Verified

Five pages at 1440 / 1280 / 900 / 600 / 390: correct section count on every one,
**no horizontal overflow at any width**, no console errors.

**The heroes are unchanged** — canvas top 104, width 1320, radius 56px, two
columns, panel 447px, one float on all five, still identical to
/post-acute-care/. **The CTA is unchanged** — byte-identical across 8 pages.
`/integration/` unchanged: hero six nodes 0 escapes, EHR Capability thirteen
nodes 0 overlaps, its three redesigned sections unaffected. Deferred-page
heights 24/24, segment pages clean, lint and typecheck clean, build 279 static
pages.

---

## 30. /security/ and /download-app/ — two new visual languages

Both pages were the last full-bleed blue heroes on the site plus a column of
card grids. Each now has a language of its own, deliberately not the Who We
Serve product panel, the Solutions register set, or /integration/'s radial
ecosystems.

### The shell stays; the atmosphere changes

Both heroes use `HeroCanvas`, so the geometry is the family's — measured at
104/1320/56px on desktop, 96/358/24px at 390, identical to every other inner
page. What differs is a new `texture` prop:

- `dots` — the family default, unchanged everywhere else.
- `arcs` — concentric rings for /security/: a protected core.
- `mesh` — a fine grid for /download-app/: reach and coverage.

Neither hero carries a product panel, laptop or browser frame.

### /security/ — concentric protection

The hero is a shield with **the page's four real certification badges** — the
same raster assets its `heroCerts` already ship — floating on soft glows around
it, on rings with fine connecting arcs. No boxes: each badge sits on its own
halo at 62px with its title and status beneath, which is what "arrange the real
icons naturally" needs. The three `cert` cards below reuse the same artwork.

Seven sections, seven devices:

| Section | Device |
|---|---|
| Certifications | trust plate — three real badges on one surface |
| Zero Trust Architecture | principle stack — oversized numerals, no boxes |
| Defence-in-Depth | literal layers — slabs stepping inward, deepening in tone |
| Continuous Monitoring | watch band — a signal line with pulsing posts, on deep blue |
| Technical Safeguards | controls register — six specs, two columns, hairlines |
| AI Governance | commitments split — heading beside ruled statements |
| Sub-Processors | a table, because a vendor register is one |

Measured tones, hero first: `white white tint white deep tint white tint` — one
deep anchor, and nothing red or alarming anywhere.

### /download-app/ — device and reach

The hero is a phone with signal arcs behind it. Its screen shows only what the
page's own subtitle leads with — "Record visits … from your phone" — as a mic
affordance and a live waveform, not a dashboard. Two satellites carry the h1's
platforms (parsed from "Murphi.ai on iOS, Android & Web", so they cannot drift
from the heading) and the page's own store artwork.

Two sections: a **platform rail** (three wide rows, each led by its real store
mark, hrefs and CTA text intact) and a **capability field** (six borderless
cells, ruled at the top, ghosted index — no card chrome at all).

### Gotcha: `dl-*` glyphs live in `UtilityIcon`, not `BespokeIcon`

The capability field first called `BespokeIcon`, which holds `sec-*`, `val-*`
and `wl-*` and returns `null` for anything else — so all six tiles rendered
empty. The download page's icons are `UtilityIcon`'s, and they carry their size
inline (`width: 32px`), which no class can override: the tile is sized around
the glyph (54px) rather than the glyph around the tile.

### Verified

Both pages at 1440 / 1280 / 900 / 600 / 390: **no horizontal overflow, no
console errors**, hero canvas geometry identical to the rest of the site, all
seven certification images present on /security/ and all six store/platform
images on /download-app/, and the three external store links intact.

Deferred-page heights 24/24, CTA parity unchanged, the Solutions pages and
/integration/ unaffected, lint and typecheck clean, build 279 static pages.

## §31 — ConnectModal: the close button must survive every viewport

The 8s demo dialog had four independent faults that all surfaced as the same
symptom — "I can't reach the X".

1. **The panel was the scroll container.** `max-h-… overflow-y-auto` sat on the
   panel, and the blue header holding the X was inside it, so the close button
   scrolled away with the form. The panel is now `flex flex-col
   overflow-hidden`: a `shrink-0` header, and a `min-h-0 flex-1 overflow-y-auto
   overscroll-contain` region beneath it. `min-h-0` is load-bearing — a flex
   child defaults to `min-height: auto`, which lets content push past the
   max-height instead of scrolling inside it.
2. **`vh` is the *large* viewport on mobile.** `calc(100vh - 40px)` could exceed
   the visible area behind a URL bar. `.murphi-modal-overlay` /
   `.murphi-modal-panel` in globals.css declare `100vh`/`92vh` first and
   `100dvh`/`92dvh` second, so old engines keep the fallback. These live in the
   stylesheet rather than as two arbitrary Tailwind classes because two
   arbitrary classes setting the same property have no guaranteed cascade order.
3. **The X was 34px** — under the 40–44px minimum. Now `size-10` with
   `min-w-10`, and the header carries `pr-[68px]` so the heading never runs
   beneath it.
4. **The fixed nav painted over the dialog.** `SiteHeader`'s nav is
   `z-[2147483647]`; the overlay was `z-[9999]`. On a short viewport the panel
   centres high enough to sit under the 72px nav band, which covered the close
   button outright — Playwright reported the header subtree "intercepts pointer
   events" when clicking the X at 1366×640. The overlay now matches that
   z-index; being later in `PageLayout`'s DOM breaks the tie in its favour.

A body scroll lock was added alongside, so a scroll gesture aimed at the form
cannot move the document behind it.

**Verified** — `scratchpad/modal.mjs`, five viewports:

| viewport | panel | X | in scroller | inner scrolls | after scroll-to-bottom | closes |
|---|---|---|---|---|---|---|
| 1440×900 | 460×828 (92%) | 40×40 visible | no | yes | Xtop 53→53, visible | yes |
| 1366×640 | 460×589 (92%) | 40×40 visible | no | yes | Xtop 43→43, visible | yes |
| 820×1024 | 460×835 (82%) | 40×40 visible | no | fits | Xtop 112→112, visible | yes |
| 390×844 | 366×776 (92%) | 40×40 visible | no | yes | Xtop 51→51, visible | yes |
| 360×560 | 336×515 (92%) | 40×40 visible | no | yes | Xtop 39→39, visible | yes |

Side gap is 12px at both mobile widths (`max-600:p-3`), i.e. the requested
`calc(100% - 24px)`. No horizontal page overflow, body locked while open and
restored on close, no console errors.

**Regression impact** — none to the form: fields, copy, colours, type and
layout are untouched. The only visual deltas are the 34→40px close button and
the 20→12px overlay padding below 600px.

## §32 — The six company pages: /support-ticket/, /about-us/, /contact-us/, /faqs/, /announcements/, /blogs/

These six still ran the original centred blue-slab hero and the WordPress
theme's body treatments, so they read as a different site from the redesigned
Solutions pages. All six now take the family's hero shell (`HeroCanvas`:
contained curved canvas, 1320px cap, 56px radius, 1fr/0.78fr grid) and a body
device chosen from what each page actually holds.

**Copy, data, routing and functionality are unchanged.** Every heading,
sentence, address, `mailto:`, field name, `href`, endpoint and post ordering is
the page's own. The three forms still post to `/api/contact/`,
`/api/support-ticket/` and `/api/demo-request/`, with the same payload keys,
validation and success/error states. Pagination arithmetic, category routes and
`generateStaticParams` are untouched.

**The Get Started band was not modified.** It is `PageLayout`'s `InnerCta`;
`InnerCta.tsx`, `CtaPanel.tsx` and `PageLayout.tsx` are byte-identical to
before this work. `/announcements/` and `/blogs/` render `showCta={false}` and
have no Get Started band — none was added.

### The device per page

| Page | Hero visual | Body |
|---|---|---|
| /about-us/ | The two places the prose names, linked by an arc, with the operator plate above | Editorial spread → numbered ledger → large-type deep split → stacked value entries → portrait plates |
| /contact-us/ | Three inbound threads converging on one response node | Offices as a connected route beside the form, the page's one elevated surface |
| /support-ticket/ | A coverage dial, one marker per time zone | Operations rail of hairline-ruled facts, then a single centred intake column |
| /faqs/ | The page's own table of contents, with a count per category | Standing category rail beside the questions; borderless accordion |
| /announcements/ | A release rail carrying the three newest dates | Dated timeline against a spine |
| /blogs/ | Three offset article plates | Editorial lead + three-up grid |

Nothing in a hero visual is asserted by hand. Each is derived from the page's
own content at render time — `/about-us/` parses "Headquartered in …",
"Development center in …" and "Operated by …" out of its intro prose;
`/contact-us/` parses the three subjects from `heroSub` and the turnaround from
`formLead`; `/support-ticket/` parses the zones from its Coverage card;
`/faqs/` counts its own categories; the two listings read their own posts. If
a content file is regenerated the visuals follow it, and a visual that finds
nothing renders the message-only hero instead.

### Shared changes

- `HeroCanvas`'s `right` is now optional. Omitted, the canvas centres a single
  column rather than leaving an empty half — that is what the twelve category
  archives use, so they inherit the shell without inventing a visual.
- `PostListing` gained `visual` and `lead`. `lead` promotes the newest post to
  a full-width editorial lead and is passed only by `/blogs/` page one; page 2+
  and the archives get the grid alone.
- `Pagination` keeps its window rule (`mid_size` 13) and hrefs; only the
  control's appearance changed — 44px round targets on the site ramp.

**Verified** — `scratchpad/qa.mjs`, six pages × seven viewports (1440, 1280,
1024, 900, 768, 390, 360): `scrollWidth − innerWidth = 0` everywhere, no
element laying out past either viewport edge, no console errors and no page
errors. Photos, post images and store marks all resolve (`naturalWidth > 0`
after scroll; they are lazy, so a `fullPage` screenshot taken without scrolling
shows them blank — that is the capture, not the page). Lint, typecheck and a
279-page build are clean.

Three defects were found and fixed during the work rather than shipped:

- **Nested anchors on the grid card.** The category chip is a link to the
  archive and was placed inside the image's link — invalid HTML, and React
  reported a hydration error on `/blogs/`. The chip is now a sibling of the
  image link, positioned over it.
- **A 300px hole on `/announcements/`.** Several announcements ship no image;
  the timeline entry held its image column open regardless. The entry now runs
  full width when `post.image` is absent.
- **Negative-inset hero glows laid out past the viewport** at 768–1024 on the
  FAQs and Announcements visuals, whose containers go full width there. The
  same look now comes from an `inset-0` layer with a wider radial spread — the
  §19 rule, applied again.

**Regression impact** — the twelve category archives and `/blogs/page/N/` share
`PostListing`, `PostCards` and `Pagination`, so they take the new presentation
too. That is intended: they are the same listing, and leaving them on the old
cards would have split the blog into two visual systems. Their routes, slugs,
per-page counts and post ordering are unchanged.

One deliberate content-level deviation: the grid card no longer prints the
orphaned "By" that the WordPress plugin emitted before hiding the byline. The
author name is kept in the DOM as `sr-only`, so nothing is lost — only the
stray preposition is gone.

## §33 — The site footer

The footer was one grid with a bottom strip: four text-pill "badges", nav
links in a five-column row, and 30px social squares. It now reads as three
tiers.

1. **Identity column** — logo (26 → 30px), the blurb at a 360px measure, the
   two app links as 42px pills, then the compliance marks under a rule.
2. **Navigation** — four columns, each under a short brand rule that replaces
   the old faint all-caps label as the group separator. Links get 7px vertical
   padding so each is a real target rather than a line of text.
3. **Legal** — the disclaimer and copyright, with the social marks opposite.

**Background unchanged.** `bg-footer-bg` (`#0D1829`) is asserted in the QA
script: `getComputedStyle(footer).backgroundColor === "rgb(13, 24, 41)"` on
every page and viewport tested. `PageLayout`'s two `FOOTER_FRAME` wrappers —
the `/download-app/` and legal-page padding leaks — are untouched and still
apply over the top.

**Content unchanged.** 36 links, verified against `footer.ts`: every label and
`href` matches, the five column headings are present, both badge captions and
the disclaimer/copyright are intact, the six external social links keep
`target="_blank" rel="noopener noreferrer"` and the internal Murphi Xpress link
correctly has neither.

### Compliance marks

The four text pills are now the real seals `/security/` already uses. Each is a
circular mark drawn on its own opaque light disc with transparent corners
(~20% of the bitmap, i.e. a circle inscribed in a square), so they sit directly
on the dark footer with no plate behind them — no rectangular button. Rendered
at 64px: the ISO seal's ring type is unreadable much below that. Labels are
matched by regex rather than by array position, so a change to
`FOOTER_BADGES` cannot pair a label with the wrong seal.

| Badge | Asset | Mark |
|---|---|---|
| HIPAA | `Frame-2147203098-2.png` | HIPAA Compliant seal |
| SOC 2 | `Frame-2147203096-1.png` | AICPA SOC |
| ISO 27001 | `Frame-2147203097-1.png` | ISO 27001 |
| BAA | — | typographic seal |

**BAA has no logo, and none was invented.** The fourth asset in that set,
`Frame-2147203100-1.png`, is **HITRUST CSF Certified** — a different
certification, which `/security/` happens to caption "BAA". Putting HITRUST's
artwork under the word "BAA" would present one organisation's mark as
another's, so it is not used in the footer. A Business Associate Agreement is a
signed contract rather than a certification, so there is no official mark to
reuse; it gets a ruled seal with a document glyph in the same 64px rhythm.
If the footer is ever meant to claim HITRUST, that is a content decision and
the asset is there for it.

### Social marks

The old set were outline sketches with `rgba(255,255,255,.65)` **hard-coded on
every path**, so no hover state could change their colour, and several were not
recognisable — X was a plain cross, Facebook an outlined blob. All seven are
redrawn on `currentColor`: LinkedIn, Facebook, X and YouTube as their standard
solid silhouettes, Instagram as the standard outline, Google keeping its
four-wedge construction flattened to one colour, and Murphi Xpress — an
internal page, not a platform — as a play mark. They are the platforms' own
marks used to link to Murphi.ai's own profiles, which is what they are for.
Targets went 30px → 40px round, with a brand-tinted hover and a focus ring.

`Social*Icon` is exported only to `footer.ts` and used only here — checked
before rewriting.

**Verified** — `scratchpad/footqa.mjs`, four pages (`/about-us/`,
`/download-app/` and `/privacy-policy/` for their footer frames, `/blogs/` for
a `showCta={false}` page) × nine viewports (1440, 1280, 1024, 900, 768, 600,
420, 390, 360): background exact on all 36, `scrollWidth − innerWidth = 0`, no
element laying out past either viewport edge, all four marks present with no
mark-to-mark overlap, no link under 26px tall, and no console or page errors.
Lint, typecheck and a 279-page build are clean.

**Responsive** — the nav holds four columns down to 768 (once the identity
column stacks above at 1024 the nav has the full width, and dropping to two
there left half the row empty), then two columns from 768 all the way to 360.
A single column was tried and rejected: it made the footer a 2,100px scroll on
a phone, and the longest label, "Coding & Billing Consultants", still wraps
cleanly in a 144px column. The compliance marks run four across to 600 and
pair 2×2 below it.

The marks live in the identity column rather than on a band of their own: a
full-width trust band left a tall void beside it, because the nine-link
Segments column sets the row height.
