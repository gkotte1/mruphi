import fs from 'fs';

const p = JSON.parse(fs.readFileSync('b9/wlpp.json', 'utf8'));
const OUT = 'c:/Users/krush/OneDrive/Desktop/m/murphi-clone/src/content/murphi-ai-2e2619f3/white-label-partner-page.ts';
const q = (s) => JSON.stringify(s);
const ind = (n) => ' '.repeat(n);

let s = `import type { WhiteLabelPartnerPage } from "./types";

/**
 * /white-label-partner-program/ — content lifted verbatim from the live
 * hand-authored page. Generated: re-run
 * docs/research/murphi-ai-2e2619f3/raw/ex-wlpp.mjs + gen-wlpp.mjs.
 *
 * The page ships its own palette and font — blue #1877F2 (not the site's
 * #007EFF), body #F2F2F2, Inter rather than Plus Jakarta Sans — so the icon
 * keys below map into WhiteLabelPartnerIcons.
 */
export const WHITE_LABEL_PARTNER_PAGE: WhiteLabelPartnerPage = {
  slug: ${q(p.slug)},
  title: ${q(p.title)},
  description: ${q(p.description)},
  hero: {
    pills: [
${p.hero.pills.map((x) => `${ind(6)}{ label: ${q(x.label)}${x.href ? `, href: ${q(x.href)}` : ''} },`).join('\n')}
    ],
    h1Before: ${q(p.hero.h1Before)},
    h1Em: ${q(p.hero.h1Em)},
    h1After: ${q(p.hero.h1After)},
    sub: ${q(p.hero.sub)},
    stats: [
${p.hero.stats.map((x) => `${ind(6)}{ value: ${q(x.value)}, label: ${q(x.label)} },`).join('\n')}
    ],
  },
  models: {
    tag: ${q(p.models.tag)},
    title: ${q(p.models.title)},
    sub: ${q(p.models.sub)},
    cards: [
`;
p.models.cards.forEach((c, i) => {
  s += `${ind(6)}{
${ind(8)}tone: ${q(c.tone)},
${ind(8)}icon: ${q('wlpp-' + i)},
${ind(8)}badge: ${q(c.badge)},
${ind(8)}title: ${q(c.title)},
${ind(8)}description: ${q(c.description)},
${ind(8)}flowLabel: ${q(c.flowLabel)},
${ind(8)}flow: [
${c.flow.map((f) => `${ind(10)}{ dot: ${q(f.dot)}${f.pulse ? ', pulse: true' : ''}, text: ${q(f.text)}${f.chip ? `, chip: ${q(f.chip)}, chipTone: ${q(f.chipTone)}` : ''} },`).join('\n')}
${ind(8)}],
${ind(8)}labels: [${c.labels.map(q).join(', ')}],
${ind(8)}benefits: [
${c.benefits.map((b) => `${ind(10)}${q(b)},`).join('\n')}
${ind(8)}],
${ind(8)}tags: [${c.tags.map(q).join(', ')}],
${ind(6)}},
`;
});
s += `    ],
  },
  how: {
    tag: ${q(p.how.tag)},
    title: ${q(p.how.title)},
    sub: ${q(p.how.sub)},
    steps: [
${p.how.steps.map((x) => `${ind(6)}{\n${ind(8)}num: ${q(x.num)},\n${ind(8)}title: ${q(x.title)},\n${ind(8)}body: ${q(x.body)},\n${ind(6)}},`).join('\n')}
    ],
  },
  compare: {
    tag: ${q(p.compare.tag)},
    title: ${q(p.compare.title)},
    sub: ${q(p.compare.sub)},
    headers: [
${p.compare.headers.map((x) => `${ind(6)}{ label: ${q(x.label)}${x.tone ? `, tone: ${q(x.tone)}` : ''} },`).join('\n')}
    ],
    rows: [
${p.compare.rows.map((r) => `${ind(6)}[\n${r.map((c) => `${ind(8)}{ text: ${q(c.text)}${c.feature ? ', feature: true' : ''}${c.pill ? `, pill: ${q(c.pill)}` : ''} },`).join('\n')}\n${ind(6)}],`).join('\n')}
    ],
  },
  callout: {
    heading: ${q(p.callout.heading)},
    sub: ${q(p.callout.sub)},
    bullets: [
${p.callout.bullets.map((b) => `${ind(6)}${q(b)},`).join('\n')}
    ],
    tags: [${p.callout.tags.map(q).join(', ')}],
    buttons: [
${p.callout.buttons.map((b) => `${ind(6)}{ variant: ${q(b.variant)}, label: ${q(b.label)}, href: ${q(b.href)} },`).join('\n')}
    ],
  },
};
`;
fs.writeFileSync(OUT, s);
console.log('wrote', OUT, (s.length / 1024).toFixed(1) + 'KB');

/* ── icons ────────────────────────────────────────────────────────────── */
const KEBAB = /-([a-z])/g;
const jsxAttrs = (raw, drop = []) => [...raw.matchAll(/([\w:-]+)="([^"]*)"/g)]
  .filter((m) => !drop.includes(m[1]))
  .map((m) => {
    const name = m[1] === 'class' ? 'className' : m[1].startsWith('aria-') || m[1].startsWith('data-')
      ? m[1] : m[1].replace(KEBAB, (_, c) => c.toUpperCase());
    if (m[1] === 'style') {
      const obj = m[2].split(';').filter(Boolean).map((d) => {
        const i = d.indexOf(':');
        const k = d.slice(0, i).trim().replace(KEBAB, (_, c) => c.toUpperCase());
        return `${k}: "${d.slice(i + 1).trim().replace(/!important/, '')}"`;
      });
      return `style={{ ${obj.join(', ')} }}`;
    }
    return `${name}="${m[2]}"`;
  }).join(' ');

const entries = p.models.cards.map((c, i) => {
  const svg = c.icon;
  const open = svg.match(/<svg([^>]*)>/)[1];
  const inner = svg.slice(svg.indexOf('>') + 1, svg.lastIndexOf('</svg>'))
    .replace(/<(\w+)([^>]*?)\s*\/?>/g, (_, tag, attrs) => `<${tag} ${jsxAttrs(attrs)} />`)
    .replace(/\s+/g, ' ').trim();
  return `  "wlpp-${i}": (\n    <svg ${jsxAttrs(open, ['xmlns', 'class'])}>\n      ${inner}\n    </svg>\n  ),`;
});

const iconFile = `import type { ReactElement } from "react";

/**
 * The two model-card glyphs from /white-label-partner-program/, lifted
 * verbatim. The page hard-locks \`fill: none\` on every path to stop host CSS
 * filling the outlines, so those inline styles are preserved.
 */
const ICONS: Record<string, ReactElement> = {
${entries.join('\n')}
};

export function WhiteLabelPartnerIcon({ name }: { name: string }) {
  return ICONS[name] ?? null;
}
`;
const ICON_OUT = 'c:/Users/krush/OneDrive/Desktop/m/murphi-clone/src/components/sites/murphi-ai-2e2619f3/white-label-partner-program/WhiteLabelPartnerIcons.tsx';
fs.mkdirSync(ICON_OUT.slice(0, ICON_OUT.lastIndexOf('/')), { recursive: true });
fs.writeFileSync(ICON_OUT, iconFile);
console.log('wrote', entries.length, 'icons');
