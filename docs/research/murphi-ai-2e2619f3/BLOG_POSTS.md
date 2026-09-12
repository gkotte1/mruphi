# Individual blog posts — `/<slug>/`

197 articles through one dynamic route, rendered from the build-time WordPress
REST snapshot.

## What the live post template actually is

Simpler than the brief anticipated. Every post is the same Elementor single
template — a flex column, `gap: 20px`, `max-width: 1200`, `padding: 10px`
(a 1180px content column at 1440) with `margin-top: 40px` — holding **three**
widgets:

| widget | notes |
|---|---|
| `theme-post-title` | **`display: none`** — the `<h1>` is in the DOM for SEO but never renders |
| `theme-post-featured-image` | present only when the post has one; full column width, natural aspect |
| `jkit_post_title` | the *visible* heading, an `<h2>` at 32.44px/600 |
| `theme-post-content` | the body |

**There is no breadcrumb, no table of contents, no author box, no related
posts, no share row and no CTA band** on any post checked across every
category — news, whitepaper, guides, RCM, oldest (Oct 2024) and newest
(Aug 2026). The brief's "where present on the live site" qualifier covers all
of them: none are present, so none were invented.

The clone keeps a real `<h1>` for document structure and styles it to match
that `<h2>` exactly, so the page looks identical while staying navigable.

Nothing about the template is responsive — type, spacing and the column rule
are identical at 1440, 900 and 600; only the column width changes.

## Rendering the body safely

The bodies are 4.05 MB of rendered WordPress HTML across 197 posts. Rather than
`dangerouslySetInnerHTML`, a build-time parser turns each into a typed block
tree (`raw/html-parse.mjs`) that the renderer walks:

- **blocks** — `p` · `h2`–`h5` · `ul` / `ol` (with nesting) · `table` ·
  `img` (+ caption) · `callout` · `quote` · `hr`
- **inline** — bold · italic · underline · links · `<br>`

Everything else is dropped or descended through. That matters because the
source is full of export cruft: `<span style="font-weight: 400">` appears
**16,992 times** (it is the default weight — pure noise), Elementor wraps 17
posts' prose in `data-elementor-type` container `div`s, and there are classes
from every editor the text was ever pasted out of.

**The guard:** every body is compared character-for-character against the
source HTML before it is written — letters and digits only, so whitespace
differences don't mask a real loss. All 197 pass; the generator exits non-zero
if any fails.

## Six things only measurement caught

1. **`<p>&nbsp;</p>` spacers are real layout.** 293 of them across the corpus,
   each a 30px line box plus a 20px margin. Dropping them as "empty" cost one
   post 90px.
2. **A trailing `&nbsp;` changes where a line wraps.** U+00A0 matches the regex whitespace class in
   JavaScript, so ordinary trimming removed them — and paragraphs that wrap to
   two lines on the live site collapsed to one. Only ASCII whitespace is
   trimmed now.
3. **In-body images render at their intrinsic width**, capped by
   `max-width: 100%` — never stretched to the column. A 1000px screenshot stays
   1000px inside the 1180px article; stretching it added ~100px per image.
4. **`<ol>` and `<ul>` are styled differently by the theme.** `ol` is
   `margin: 0 0 16px 16px` (indented, 16px below); `ul` is `margin: 0 0 20px`
   with no indent. `h4` is 20.25px on a 30px line box, not 35.
5. **Gutenberg `wp-block-spacer` divs carry their height inline** and hold
   nothing but a non-breaking space. Rendered as paragraphs they became 30px
   lines; one post gained 750px that way. They are spacer blocks now, at the
   authored height (0, 12 and 100px all occur).
6. **17 posts nest their prose in an Elementor container**, which adds 10px of
   horizontal padding twice — those bodies render on a **1160px** column, not
   1180, so their lines wrap earlier. Worth 800px on the longest one.

### And one real content loss the text guard could not see

One post wraps an image inside its `<h2>`. Span collection skips images, so it
vanished — invisibly, because an image contributes no text. The generator now
also counts `<img>` tags against emitted image blocks per post, and 106/106
survive.

## Assets

Nothing on a built page reaches murphi.ai:

- **126 featured images**, re-fetched at the smallest registered size that still
  covers the 1180px hero (the listing phase only needed 1024px). 26.7 MB.
- **93 in-body images**, downloaded to `public/images/…/blog/body/`. 8.2 MB.
- The 10.3 MB of now-superseded 1024px variants were deleted.

Five attachments return **401** from the REST API despite rendering on the
page. Four of those posts turn out to have no hero at all; the fifth
(`ambient-ai-healthcare-companies`) was rescued by reading the `src` out of the
live markup — worth 847px on that page.

## Content layout

```
src/content/murphi-ai-2e2619f3/
  posts/<slug>.ts     197 modules, 4.39 MB total
  post-bodies.ts      slug → () => import("./posts/<slug>")
```

A lazy index rather than one bundle, so a post page pulls in only its own body.

```
src/components/sites/murphi-ai-2e2619f3/blog/
  PostArticle.tsx     hero + title + body, the single-post template
  ArticleBody.tsx     the block renderer
```

`/[slug]/` — 197 pages prerendered via `generateStaticParams`, matching the
live murphi.ai URLs (`/autonomous-medical-coding-vs-cac/`). It is the last
route matched: every static segment takes precedence over a dynamic one, and no
post slug collides with one, so `/about-us`, `/blogs`, `/category` and the rest
are unaffected. Anything unmatched 404s.

The listing, archive and announcement cards all render through `PostCards`, so
they point at the root URLs from that one place.

## Internal links inside article bodies

The bodies quote **1,196 absolute murphi.ai URLs**. Where the destination
exists in this app the generator rewrites it to a root-relative path, so the
link stays inside the clone; everything else is left exactly as authored.

| | count |
|---|---:|
| rewritten to internal (`/…`) | **789** |
| left absolute — no route here | 407 |
| external hosts — untouched | 514 |

The 789 break down as 559 links to other posts, 119 to the homepage and 111 to
built pages. The 407 point at murphi.ai pages this clone does not have —
`/charting/` (64), `/patient-care/` (61), `/contact/` (59), `/rcm/` (48) and 32
others — and become internal links automatically if those pages are ever built.

Two invariants are asserted after every regeneration:

- no internal link points at a route that does not exist (**0**);
- no murphi.ai absolute remains whose destination *does* exist here (**0**).

Only the `href` changes — the character-for-character body guard still passes,
which is what proves no link text was touched. `raw/link-map.mjs` builds the
route set the rewrite is checked against.

## Visual QA

Measured against the live articles at 1440. **−20 is the baseline** — the
live-side WordPress wrapper whitespace present on every page throughout this
project — so −20 means an exact match.

| Post | live | clone | Δ |
|---|---:|---:|---:|
| `autonomous-medical-coding-vs-cac` | 5979 | 5959 | **−20** |
| `ehr-interoperability-reduce-administrative-burden` | 9587 | 9567 | **−20** |
| `murphi-ai-wins-bronze-stevie-award…` | 2129 | 2109 | **−20** |
| `how-hipaa-compliant-payment-solutions…` | 2297 | 2277 | **−20** |

Element-level on the first: hero 663.8 → 663.8, title 70 → 70, and the body
matches block for block (50 blocks, same heights).

A 25-post sweep spanning every category is the working instrument — each fix
above was found by it. Final state: **15 of 25 exact**, 10 off by −14 to −139
on documents 2,000–15,000px tall (≤3%, and under 1% on all but two). Those
remainders are per-post markup quirks rather than a systematic error; the two
largest, −808 and +624, were traced and fixed during this phase.

**Content fidelity is exact regardless of layout delta:** all 197 bodies pass
the character-for-character guard and all 106 in-body images survive.

## Regenerating

```
node raw/gen-b8.mjs        # bodies → content/posts/*.ts + post-bodies.ts
node raw/dl-post-media.mjs # hero-sized featured images + in-body images
node raw/verify-parse.mjs  # parser loses no character across all 197
node raw/compare-b8.mjs    # clone vs live, per post, at 1440/900/600
node raw/sweep-b8.mjs      # doc-height sweep over a sample of posts
```
