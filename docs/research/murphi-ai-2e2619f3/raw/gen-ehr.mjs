import fs from 'fs';
import { jsxSvg, jsxChildren } from './jsx-svg.mjs';

const p = JSON.parse(fs.readFileSync('b9/ehr.json', 'utf8'));
const ic = JSON.parse(fs.readFileSync('b9/ehr-icons.json', 'utf8'));

const ROOT = 'c:/Users/krush/OneDrive/Desktop/m/murphi-clone/src';
const q = (s) => JSON.stringify(s);
const ind = (n) => ' '.repeat(n);
const list = (arr, n, f) => arr.map((x) => ind(n) + f(x)).join('\n');

/* ── content ──────────────────────────────────────────────────────────── */
const head = (h, n) => `${ind(n)}tag: ${q(h.tag)},\n${ind(n)}title: ${q(h.title)},\n${ind(n)}sub: ${q(h.sub)},`;

let s = `import type { EhrPlatformPage } from "./types";

/**
 * /ehr-ai-integration-platform/ — content lifted verbatim from the live
 * hand-authored \`.mv-widget\` block. Generated: re-run
 * docs/research/murphi-ai-2e2619f3/raw/ex-ehr.mjs + gen-ehr.mjs.
 *
 * The feature explorer's ${p.features.groups.reduce((a, g) => a + g.categories.reduce((b, c) => b + c.items.length, 0), 0)} cards and the icon names they reference come
 * from the object literals in the page's own inline script, so nothing here
 * was re-typed by hand. \`icon\` values index EhrPlatformIcons.
 */
export const EHR_PLATFORM_PAGE: EhrPlatformPage = {
  slug: ${q(p.slug)},
  title: ${q(p.title)},
  description: ${q(p.description)},
  hero: {
    pills: [
${list(p.hero.pills, 6, (x) => `{ label: ${q(x.label)}${x.href ? `, href: ${q(x.href)}` : ''} },`)}
    ],
    h1Before: ${q(p.hero.h1Before)},
    h1Em: ${q(p.hero.h1Em)},
    h1After: ${q(p.hero.h1After)},
    sub: ${q(p.hero.sub)},
    buttons: [
${list(p.hero.buttons, 6, (x) => `{ variant: ${q(x.variant)}, label: ${q(x.label)}, href: ${q(x.href)} },`)}
    ],
    arrow: ${q(p.hero.arrow)},
    nodes: [
${list(p.hero.nodes, 6, (x) => `{ icon: ${q(x.icon)}, label: ${q(x.label)}, sub: ${q(x.sub)} },`)}
    ],
    ai: {
      logo: ${q(p.hero.ai.logo)},
      label: ${q(p.hero.ai.label)},
      chips: [${p.hero.ai.chips.map(q).join(', ')}],
    },
  },
  valueStrip: {
    message: ${q(p.valueStrip.message)},
    cards: [
${list(p.valueStrip.cards, 6, (x) => `{ icon: ${q(x.icon)}, title: ${q(x.title)}, desc: ${q(x.desc)} },`)}
    ],
  },
  features: {
${head(p.features, 4)}
    empty: ${q(p.features.empty)},
    tabs: [
${list(p.features.tabs, 6, (x) => `{ key: ${q(x.key)}, label: ${q(x.label)} },`)}
    ],
    filters: [
${list(p.features.filters, 6, (x) => `{ key: ${q(x.key)}, label: ${q(x.label)} },`)}
    ],
    settingLabels: {
${Object.entries(p.features.settingLabels).map(([k, v]) => `${ind(6)}${q(k)}: ${q(v)},`).join('\n')}
    },
    groups: [
${p.features.groups.map((g) => `${ind(6)}{
${ind(8)}key: ${q(g.key)},
${ind(8)}label: ${q(g.label)},
${ind(8)}categories: [
${g.categories.map((c) => `${ind(10)}{
${ind(12)}name: ${q(c.name)},
${ind(12)}items: [
${c.items.map((f) => `${ind(14)}{
${ind(16)}name: ${q(f.name)},
${ind(16)}desc: ${q(f.desc)},
${ind(16)}type: ${q(f.type)},
${ind(16)}icon: ${q(f.icon)},
${ind(16)}iconColor: ${q(f.iconColor)},
${ind(16)}category: ${q(f.category)},
${ind(14)}},`).join('\n')}
${ind(12)}],
${ind(10)}},`).join('\n')}
${ind(8)}],
${ind(6)}},`).join('\n')}
    ],
  },
  platform: {
${head(p.platform, 4)}
    layers: [
${p.platform.layers.map((l) => `${ind(6)}{
${ind(8)}tone: ${q(l.tone)},
${ind(8)}label: ${q(l.label)},
${ind(8)}name: ${q(l.name)},
${ind(8)}chips: [
${l.chips.map((c) => `${ind(10)}${q(c)},`).join('\n')}
${ind(8)}],
${ind(6)}},`).join('\n')}
    ],
    calloutStrong: ${q(p.platform.calloutStrong)},
    calloutRest: ${q(p.platform.calloutRest)},
  },
  integration: {
${head(p.integration, 4)}
    cards: [
${list(p.integration.cards, 6, (x) => `{ icon: ${q(x.icon)}, title: ${q(x.title)}, desc: ${q(x.desc)} },`)}
    ],
  },
  roadmap: {
${head(p.roadmap, 4)}
    steps: [
${list(p.roadmap.steps, 6, (x) => `{ num: ${q(x.num)}, title: ${q(x.title)}, desc: ${q(x.desc)} },`)}
    ],
    note: ${q(p.roadmap.note)},
  },
  security: {
${head(p.security, 4)}
    cards: [
${list(p.security.cards, 6, (x) => `{ icon: ${q(x.icon)}, title: ${q(x.title)}, desc: ${q(x.desc)} },`)}
    ],
  },
  drawer: {
    closeIcon: ${q(p.drawer.closeIcon)},
    cta: { label: ${q(p.drawer.cta.label)}, href: ${q(p.drawer.cta.href)} },
    sections: [
${p.drawer.sections.map((d) => `${ind(6)}{
${ind(8)}label: ${q(d.label)},
${ind(8)}steps: [
${d.steps.map((x) => `${ind(10)}{ num: ${q(x.num)}${x.numTone ? `, numTone: ${q(x.numTone)}` : ''}, strong: ${q(x.strong)}, text: ${q(x.text)} },`).join('\n')}
${ind(8)}],
${ind(8)}chips: [
${d.chips.map((c) => `${ind(10)}${q(c)},`).join('\n')}
${ind(8)}],
${ind(6)}},`).join('\n')}
    ],
  },
};
`;
const OUT = ROOT + '/content/murphi-ai-2e2619f3/ehr-platform-page.ts';
fs.writeFileSync(OUT, s);
console.log('wrote', OUT, (s.length / 1024).toFixed(1) + 'KB');

/* ── icons ────────────────────────────────────────────────────────────── */
const markup = Object.entries(ic.markup)
  .map(([k, v]) => `  ${q(k)}: ${jsxSvg(v)},`).join('\n');

/* The library glyphs are inner paths only; the page wraps them in one shared
   24-box shell at a fixed 18px, so that shell lives in the component. */
const library = Object.entries(ic.library)
  .map(([k, v]) => `  ${q(k)}: <>${jsxChildren(v)}</>,`).join('\n');

const iconFile = `import type { ReactElement } from "react";

/**
 * Glyphs for /ehr-ai-integration-platform/. Two sets, both lifted verbatim:
 *
 *   MARKUP   complete <svg> elements written into the page's own HTML
 *   LIBRARY  the inner paths of the ICONS map in the page's inline script,
 *            which it renders through one shared 24-box shell at 18px
 *
 * The page hard-locks \`fill: none; stroke: currentColor\` on every svg so host
 * CSS cannot repaint them; those attributes are carried through here.
 */
const MARKUP: Record<string, ReactElement> = {
${markup}
};

const LIBRARY: Record<string, ReactElement> = {
${library}
};

export function EhrIcon({ name }: { name: string }) {
  return MARKUP[name] ?? null;
}

/** \`icn(key, 18)\` from the page script, including its file-text fallback. */
export function EhrFeatureIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {LIBRARY[name] ?? LIBRARY[${q(p.iconFallback)}]}
    </svg>
  );
}
`;
const ICON_OUT = ROOT + '/components/sites/murphi-ai-2e2619f3/ehr-ai-integration-platform/EhrPlatformIcons.tsx';
fs.mkdirSync(ICON_OUT.slice(0, ICON_OUT.lastIndexOf('/')), { recursive: true });
fs.writeFileSync(ICON_OUT, iconFile);
console.log('wrote', Object.keys(ic.markup).length, 'markup icons +', Object.keys(ic.library).length, 'library glyphs');
