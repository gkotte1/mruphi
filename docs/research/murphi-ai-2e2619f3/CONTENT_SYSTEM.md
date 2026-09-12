# Content system — `/blogs/`, `/announcements/`, category archives

## What the original is

The listings are **not** hand-authored HTML like the rest of murphi.ai. They are
ShopBuilder post-loop widgets (`rtsb-post-grid` / `rtsb-post-list`) sitting under
a hand-authored blue hero, so the "lift the source CSS" method used everywhere
else does not apply — every value here was measured from the render.

| | `/blogs/` | `/announcements/` | `/category/<slug>/` |
|---|---|---|---|
| widget | `rtsb-post-grid-layout1` | `rtsb-post-list-layout1` | theme archive template |
| layout | 3-up cards | full-width rows | sidebar + 2-up cards |
| per page | 6, capped at 100 posts | all 14, no pagination | 10 |
| categories | 7 of 12 | `news-announcements`, `in-the-news` | one each |

### The `/blogs/` query

The grid draws from **seven** of the twelve categories. Revenue Cycle
Management (37 posts), Healthcare Workflow Automation (11), whitepaper (4) and
the two news categories never appear. That was established by walking every
page of the live grid and tallying the category chip on every card — the widget
exposes no query settings in the markup.

Those seven categories hold 134 posts, but the live grid only ever shows **100**:
its widget carries a query limit. Reading the permalink out of each `<article>`
across the live pagination returns exactly the first 100 of this set, in order,
ending at page 17 (16 × 6 + 4). `BLOGS_PAGE.limit` reproduces that cap, so the
clone builds the same 17 pages.

### Two live defects, both deliberately not reproduced

1. **The pagination control's window is inconsistent** — it reports 14 pages on
   page 1, 16 on page 3, 17 on page 15. The clone keeps the control's window
   rule (`mid_size` 13, no end blocks) so the first page still reads
   `1 … 14 › »` exactly as the target does, while the underlying page count is
   the real one: 17, matching the live listing's own last page.
2. **The category archives use the raw WordPress theme template** — a left
   sidebar with search, "Recent Posts" and a category list, 2-up cards with the
   badge overlaid on the image, `READ MORE »` and `• No Comments`. It shares
   nothing with `/blogs/` or the rest of the site. Per the brief's "keep the
   design visually consistent with the existing Murphi.ai site", the twelve
   archives are built on the `/blogs/` card and hero instead.

## What was built

One `PostListing` component renders all fourteen routes — `/blogs/`,
`/announcements/` and the twelve archives — differing only in hero copy, layout
and whether pagination applies.

```
src/components/sites/murphi-ai-2e2619f3/blog/
  PostListing.tsx   hero + shadowed panel + grid/list + pagination
  PostCards.tsx     PostGridCard (3-up) and PostListRow (full-width)
  Pagination.tsx    36px squares, ‹ › « » , mid_size-13 window
```

Routes: `/blogs/`, `/blogs/page/[page]/`, `/announcements/`,
`/category/[slug]/`, `/category/[slug]/page/[page]/` — **26 pages** prerendered
from 12 category slugs, one dynamic implementation rather than twelve copies.

The snapshot holds 197 posts. `/blogs/` draws 134 of them but shows the newest
**100** across **17 pages**, matching the live grid's own query limit and last
page. `/announcements/` shows all 14 news posts on one page.

The archives paginate at **10**, not 6: they are native WordPress archives on
the site's Reading setting, where `/blogs/` is a hand-built grid. Verified
against all twelve live archives — for each, `ceil(posts / 10)` is the last page
that returns 200 and the next one 404s. They run from 6 pages (AI in Healthcare,
51 posts) down to 1 (whitepaper, 4).

### Measured details worth keeping

- The grid card's image is a uniform **1024×600 crop** the plugin generates on
  the fly; it is not one of the sizes WordPress registers. Rendering the stored
  variants at their own aspect ratios made every card a different height, so the
  crop is reproduced with `aspect-[1024/600]` + `object-cover`.
- The **list** row does the opposite: a fixed 435px width with the image's own
  aspect, which is why the live rows are 262, 285, 289, 304, 330 and 346px tall.
- **The author name never renders.** The plugin prints the `By ` prefix and then
  hides `.byline`, so the card shows "By" followed by the date.
- The excerpt element is present but empty, and its 20px top margin collapses
  into the read-more wrapper's 30px.
- The grid has **no two-column tier** — three columns down to 1025px, then one.
  The list keeps its side-by-side layout down to 768px and stacks at 767.
- The plugin's blue is `#0066FF`, not the site's `#007EFF`.

## Content source for the 194 post bodies — recommendation

**Build-time fetch from the WordPress REST API, committed as a generated
snapshot. Do not adopt a headless CMS, and do not hand-convert to MDX.**

### What the API gives us

`https://murphi.ai/wp-json/wp/v2/` is fully open — no key, no auth:

| endpoint | result |
|---|---|
| `/posts?per_page=100` | 200, `X-WP-Total: 197` |
| `/categories` | 200, 13 categories |
| `/media?include=…` | 200 |
| `/users` | 200 |

Each post carries `title`, `excerpt`, `content.rendered` (~16KB of HTML),
`date`, `slug`, `categories`, `tags`, `featured_media` and `author`; `_embed=1`
adds the media object and author in one round trip. Posts live at root URLs
(`/{slug}/`), and 145 of the 197 have a featured image.

### Why not MDX

Converting 197 posts of rendered WordPress HTML — 3MB, full of Gutenberg block
markup, inline styles and shortcodes — into clean MDX is a lossy, one-way
migration measured in days, and it fossilises the content: every future edit on
the WordPress side has to be re-migrated by hand. The gain (authoring in Git)
is worth nothing here, because **this clone is not where the content is
authored**.

### Why not a headless CMS

A headless CMS solves "where do editors write?", which is not the question in
front of us — editors already write in WordPress and will keep doing so. Adding
Contentful/Sanity/Payload means a migration *plus* a second system to license,
model, host and keep in sync, and it still needs the same REST export to seed
it. It is the right answer only if the brief later becomes "replace the
WordPress install", which it currently is not.

### Why the REST snapshot

It is the same pattern this phase already uses for the listings, and it is
working: `raw/gen-b7.mjs` pulls the API at build time and writes
`blog-content.ts` (197 posts, 87KB) plus 126 downloaded images (10.3MB) into
`public/`. The result is a fully static site with **no runtime dependency on
murphi.ai** — if the origin goes down, the clone still builds and serves.

Extending it to bodies is mechanical:

1. Add `content.rendered` to the fetch and store each body as its own file
   (`src/content/.../posts/<slug>.ts`) so the listing bundle stays small.
2. Sanitise once at generation time: strip WordPress' wrapper classes, rewrite
   `https://murphi.ai/wp-content/uploads/…` to local paths, and download the
   in-body images the same way the featured ones already are.
3. Render through a small allow-list serialiser — the same `LegalSpan` approach
   the legal pages already use — rather than `dangerouslySetInnerHTML`.
4. Re-run the generator to refresh; the diff is reviewable in Git.

**Cost:** roughly a day for the pipeline and the article template, versus
several days for MDX conversion or a CMS migration.

**The one caveat:** a build-time snapshot means new posts appear only on the
next deploy. If near-real-time publishing is required, keep the same generator
and switch the article route to ISR (`revalidate`) against the live API — the
data shape does not change, so that decision can be deferred without rework.

## Visual QA

| Route | @1440 | @900 | @600 |
|---|---:|---:|---:|
| `/blogs/` | **0** | **0** | −30 * |
| `/announcements/` | +2 | +1 | −28 * |

\* The live-side WordPress wrapper whitespace measured on every page at 600
throughout this project.

The `/blogs/` card matches element for element: image 217.6, content 267.3,
chip 28.8, title 64 (2-line clamp), meta 30, read-more 41.5 — and the hero
(321.1) and footer (552.2) are exact.

## Regenerating

```
node raw/gen-b7.mjs      # REST snapshot → content/blog-content.ts
node raw/dl-media.mjs     # featured images → public/images/…/blog/
node raw/compare-b7.mjs   # clone vs live at 1440/900/600
```

## Known deviation: the category archive template

Measured 2026-08-24, `/category/ai-in-healthcare/` at 1440px:

| | live | clone |
|---|---:|---:|
| content column | 2872 | 2563 |
| footer | 552 | 552 |
| **document** | **3525** | **3115** |

The **post list itself is correct** — ten cards on both sides, and every
heading the clone renders is present on the live page. Pagination matches too:
each of the twelve archives ends on the same page number, with a 404 one past
it on both sides.

The 410px sits in the page furniture. The live archive additionally renders

- a WordPress sidebar (`Recent Posts`, `Categories`, `Blogs` widgets), and
- the shared `Connect with Murphi.ai and see healthcare AI in action` CTA band,

neither of which `src/app/category/[slug]/page.tsx` emits — it passes
`showCta={false}` and `PostListing` has no sidebar. `/category/whitepaper/`
shows the same gap at −689 (a shorter page, so the fixed-height furniture is a
larger share of it).

This predates the pagination fix; the archive template was built from `/blogs/`,
which genuinely has neither element. Closing it means adding the sidebar widget
and turning the CTA on for this route only — a visual change, so it is left
open rather than folded into a verification pass.

Note when re-measuring: murphi.ai rate-limits repeated automated loads and
serves a 403 interstitial that renders at 1021px, and occasionally a partial
200. Treat any non-200 as "no measurement" and back off; a single anomalous
reading (one 4745 for this page) should not be built on.
