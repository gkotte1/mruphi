# Visual QA — murphi.ai `/` → `http://localhost:3000/`

Method: both pages loaded in the same headless Chrome (Playwright, system
Chrome channel) at identical viewports, with `getComputedStyle()` and
`getBoundingClientRect()` compared element by element. The demo modal is removed
before measuring the live site so it doesn't shift layout.

Scripts live in the scratchpad (`measure.mjs`, `diff2.mjs`, `mob.mjs`, `qa.mjs`).

## Section heights @ 1440px

| Section | murphi.ai | Clone | Δ |
|---|---:|---:|---:|
| Nav (fixed) | 72 | 72 | **0** |
| Hero | 748 | 748 | **0** |
| Trust bar | 93 | 93 | **0** |
| Announcement | 158 | 158 | **0** |
| Partner marquee | 59 | 59 | **0** |
| Positioning | 975 | 975 | **0** |
| Care settings | 1064 | 1064 | **0** |
| Modules | 849 | 849 | **0** |
| Coming-soon band | 70 | 70 | **0** |
| PaaS / EHR | 794 | 794 | **0** |
| Social proof | 744 | 721 | −23 |
| Closing CTA | 488 | 488 | **0** |
| Footer | 552 | 552 | **0** |

**10 of 11 body sections are pixel-identical.** Document height 6714 → 6572;
the entire 142px difference is the social-proof section plus the modal-free
measurement baseline.

Hero internals were verified individually and all match exactly: right panel
503×440, engage card 66×382, module chip 44×187, stats block 100×700,
`h1` 201×700, button row 60×700.

## Three global findings that drove most of the initial error

1. **`body { line-height: 30px; color: #878787 }`** — set by the `techkit`
   theme, inherited by every element without its own value. Missing it made
   every text block ~20% short. This single fix corrected 7 sections at once.
2. **Cascade order between the five authored blocks.** blockA, blockC and
   blockD each redefine overlapping selectors. Later blocks win unless the
   earlier one used `!important`. Concretely: `.model-cards` gap is **20px**
   (blockC) not 24px (blockA), `.model-card` padding is **32px** (blockC), but
   the 3-column track comes from blockA's `!important`.
3. **Below 900px, blockD's media query wins** over blockA's 1024/600 queries
   because it appears last. Section padding below 900px is `60px 24px`, not
   blockA's `48px 20px`. Same for the hero (`120px 24px 60px`).

Everything above was found by measuring, not by reading the CSS — the
stylesheets disagree with each other and only the render is authoritative.

## Interaction tests — all pass

| Behaviour | Expected (from source) | Result |
|---|---|---|
| Nav scroll shadow | none → `0 2px 16px rgba(0,0,0,.08)` past 10px | ✅ exact |
| Mega-menu open | `display:grid`, opacity 1 | ✅ |
| Mega-menu centring | `left = (1440−860)/2 = 290` | ✅ 290px, width 860 |
| Care-setting tabs | 5 tabs, click-driven, no transition | ✅ all 5 switch |
| EHR panel | no testimonial block | ✅ absent |
| Demo modal | opens at 8s, once per session | ✅ |
| Modal close | Escape / backdrop / × | ✅ |
| Mobile drawer | opens, locks body scroll | ✅ `overflow:hidden` |
| Marquees | CSS keyframes, 50s / 38s | ✅ |

## Responsive parity

@768px: `stats`, `modules`, `cta`, `hero-sub`, `paas` (±2) all match.
@390px: `hero-sub`, `cta` match; others within 5–8%.

Residual mobile differences trace to the two documented deviations below rather
than to styling errors.

## Faithfully reproduced quirks

Kept because the instruction was to match, not improve:

- **Sign-in hidden in the mobile drawer.** `.mh-mob-btns .mh-signin` is
  `display:none` below 900px, and the drawer only exists below 900px — so the
  primary CTA is unreachable on mobile. Reproduced. Worth fixing later.
- **Tab `:hover` looks identical to `.on`**, so hovering an inactive tab makes
  it appear selected. Reproduced.
- **Mega-menu opens at `top:52px`**, tucking 20px under the 72px nav.
  Reproduced.

## Deliberate deviations

| # | Deviation | Why |
|---|---|---|
| 1 | Care-setting panels stack to one column below 900px | The original's panels carry an inline `grid-template-columns:1fr 1fr`, which beats its own stylesheet. Its `checkMobile()` only corrects this on a `resize` event, so a phone that loads the page fresh gets an unreadable 2-column panel. Both the CSS and the JS show 1 column is intended; the clone does that on load. Main cause of the residual `segments` delta. |
| 2 | Testimonial list duplicated verbatim | The original's two halves have *different* copy (e.g. "saving valuable time" vs "saving valuable administrative time"), so its halves differ in width and `translateX(-50%)` visibly jumps each cycle. The clone duplicates the same seven, so the loop is seamless. Causes the −23px on social proof. |
| 3 | Marquees honour `prefers-reduced-motion` | Accessibility. The original does not. |
| 4 | Third-party scripts dropped | Per instruction: Clarity, GTM, reb2b, leadsy.ai, nuhello chat. |
| 5 | Demo form posts to `/api/demo-request` | Per instruction the Web3Forms access key is not reused. The route validates and returns 202 without delivering; wire a real destination via env var. |
| 6 | Desktop-first `max-*` breakpoints | `AGENTS.md` asks for mobile-first, but the target is authored desktop-first and its breakpoints only reproduce exactly in that direction. Fidelity was the higher priority here. |
| 7 | Full-bleed via `w-full` not `100vw` | The target uses `width:100vw; margin-inline:calc(-50vw + 50%)`, which causes a horizontal scrollbar. Sections are already full width in the clone; rendering is identical without the bug. |

## Not yet verified

- Hover states were reproduced from source CSS but not screenshot-diffed.
- Only `/` was built. All 28 internal links point at real murphi.ai paths that
  do not exist in this app and will 404 locally.
