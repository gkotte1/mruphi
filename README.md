# Murphi.ai - website

Next.js (App Router) + TypeScript + Tailwind CSS v4.

Currently implemented: **Navbar** and **Hero** only. The remaining homepage
sections are intentionally not built yet.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check` | lint + typecheck + build - the single gate |

## Structure

```
app/
  layout.tsx        fonts, metadata, favicons
  page.tsx          homepage - Navbar + Hero
  globals.css       @theme tokens, breakpoint variants, keyframes
components/
  Navbar.tsx        fixed header, two mega-menus, mobile sheet
  Hero.tsx          left message column + hero backdrop
  HeroWorkflow.tsx  the layered Murphi AI product visualisation
  Logo.tsx          logo bitmap - full lockup and mark-only crop
  icons.tsx         line icons in the house style
lib/
  cn.ts             clsx + tailwind-merge
  nav-data.ts       navigation menu content
content/            legal pages and announcement article bodies
public/brand/       logos and app icons
public/images/      certifications, team photos, announcements
```

## Design system

All tokens live in the `@theme` block in `app/globals.css` - Tailwind v4 is
CSS-first and there is no `tailwind.config.js`. Values are taken from
`BRAND_GUIDELINES.md`:

- **One hue.** `#007EFF` and its eight steps. No second accent colour.
- **Plus Jakarta Sans 700/800**, negative tracking on display type, positive
  tracking on uppercase labels.
- **Large radii** (12 / 20 / 28 / 40 / 56 / full) and **soft blue-tinted
  shadows** - never sharp corners, never hard black elevation.
- **Line icons** at a 24 viewBox, 1.7 stroke, `currentColor`. Never filled.
- Body ink is `#464646` on relative leading, the documented improvement over
  the inherited `#878787` at a fixed 30px.

Breakpoints are inclusive `max-width` variants (`max-1024:`, `max-900:`, …)
declared with `@custom-variant`, because the design is authored desktop-down.

> After adding a new `@custom-variant`, clear `.next` - Tailwind caches the
> class as invalid and silently emits nothing otherwise.

## Notes

- The logo is shipped as a bitmap and never redrawn or recoloured. `LogoMark`
  crops the square mark out of the 852 x 150 lockup using its measured geometry.
- Every animation is disabled under `prefers-reduced-motion: reduce`, and
  floating elements pause on hover and focus.
- No statistic, customer, partner or claim appears that is not in the source
  content. The hero visualisation shows workflow *state*, never figures.

