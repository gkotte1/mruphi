# Page Topology — murphi.ai `/`

Measured at 1440×900. Total document height ≈ **6,714px**.
Order is top-to-bottom as rendered.

| # | Section | Source class | Authored in | Height | Flow | Interaction model |
|---|---|---|---|---|---|---|
| 0 | Nav | `.mh-nav` | header template (19257) | 72px | **fixed overlay** | hover mega-menus (CSS), click hamburger <900px |
| 1 | Hero | `.hero` | blockA | 748px | flow | static |
| 2 | Trust bar | `.trust` | blockA | 93px | flow | static (links hover) |
| 3 | Announcement | `.murphi-announcement-banner` | blockA | 158px | flow | static |
| 4 | Partner marquee | `.mq` | blockA | 59px | flow | **time-driven** CSS marquee |
| 5 | Positioning | `.positioning` | blockA | 975px | flow | static (card hover) |
| 6 | Care settings | `.segments` | blockB | 1064px | flow | **click-driven tabs** |
| 7 | Modules | `.modules-strip` | blockC | 849px | flow | static (card hover) |
| 8 | PaaS / EHR | `.paas-section` | blockC | 794px | flow | static |
| 9 | Reviews | `.social-proof` | blockC | 744px | flow | **time-driven** CSS marquee |
| 10 | CTA | `.cta-section` | blockD | 488px | flow | static |
| 11 | Footer | `.murphi-footer` | blockD | 552px | flow | static (link hover) |
| 12 | Demo modal | `#murphiAiConnectOverlay` | blockD | overlay | **fixed overlay** | **time-driven** — opens at 8s |

## Layout architecture

- No scroll container, no scroll-snap, no smooth-scroll library.
  `html { scroll-behavior: smooth }` is the only scroll customisation.
- Every section is full-bleed via `width:100vw; margin-inline:calc(-50vw + 50%)`
  with an inner wrapper capped at `1200px`. In Next.js this is unnecessary —
  sections are already full width — so the clone uses
  `w-full` + `mx-auto max-w-[1200px]` inner wrappers instead. Visually identical,
  and it avoids the horizontal-scrollbar bug that `100vw` causes.
- Z-index layers: nav `2147483647` → modal overlay `2147483000` → mega-menu `300`
  → everything else auto.
- Because the nav is `position:fixed` and 72px tall, the hero carries
  `padding-top:110px` to clear it. There is no spacer element in the flow
  (`.mh-nav-spacer` is `height:0`).

## Section dependencies

- The nav overlays every section; it is rendered once in the root layout region
  of the page, not inside any section.
- The demo modal is a sibling of all sections, mounted last.
- Sections 1–11 are otherwise independent and can be built in isolation.

## Content blocks in source

The page embeds five complete `<!DOCTYPE html>` documents (Elementor Custom HTML
widgets). Extracted to `raw/`:

| File | Title | Contains |
|---|---|---|
| `outer.*` | *AI Healthcare Workflow Automation…* | wrapper, header, WP chrome |
| `blockA.*` | *Murphi.ai - First Block* | tokens, nav CSS (unused), hero, trust, marquee, announcement, positioning |
| `blockB.*` | *Solutions by Care Setting* | segments + `showPanel()` |
| `blockC.*` | *Murphi.ai - Second Block* | modules, paas, social-proof |
| `blockD.*` | *ninthBlockBlue* | cta, footer, connect modal |
| `header.html` | *Hardened Header* | `.mh-nav`, mega-menus, mobile drawer |

Note: blockA also ships a full `nav {...}` ruleset that is **dead** — the
rendered nav is `.mh-nav` from the header template. Confirmed at runtime:
`document.querySelector('nav').className === 'mh-nav'`.
