import fs from 'fs';

/**
 * Turns the inline SVGs pulled off the four bespoke pages into one React
 * lookup component. Root presentation attributes are preserved verbatim —
 * dropping them renders the icons invisible — and `fill="none"` is added
 * where the target supplies it through `.val-card-ico svg { fill:none }`.
 */

const icons = JSON.parse(fs.readFileSync('b4/icons.json', 'utf8'));
const OUT = 'c:/Users/krush/OneDrive/Desktop/m/murphi-clone/src/components/sites/murphi-ai-2e2619f3/shared/BespokeIcons.tsx';

const KEBAB = /-([a-z])/g;
const ATTR = {
  class: 'className',
  'aria-label': 'aria-label',
  'aria-hidden': 'aria-hidden',
};

function jsxAttrs(raw, { drop = [], force = {} } = {}) {
  const out = [];
  const seen = new Set();
  for (const m of raw.matchAll(/([\w:-]+)="([^"]*)"/g)) {
    const [, name, value] = m;
    if (drop.includes(name)) continue;
    if (name === 'style') {
      const obj = value.split(';').filter(Boolean).map((d) => {
        const i = d.indexOf(':');
        const k = d.slice(0, i).trim().replace(KEBAB, (_, c) => c.toUpperCase());
        return `${k}: "${d.slice(i + 1).trim()}"`;
      });
      out.push(`style={{ ${obj.join(', ')} }}`);
      seen.add('style');
      continue;
    }
    const jsxName = ATTR[name] ?? (name.includes(':') ? name : name.replace(KEBAB, (_, c) => c.toUpperCase()));
    seen.add(jsxName);
    out.push(`${jsxName}="${value}"`);
  }
  for (const [k, v] of Object.entries(force)) if (!seen.has(k)) out.push(`${k}="${v}"`);
  return out.join(' ');
}

/** Rewrites one <svg>…</svg> string into JSX. */
function toJsx(svg, size) {
  const open = svg.match(/<svg([^>]*)>/)[1];
  const inner = svg.slice(svg.indexOf('>') + 1, svg.lastIndexOf('</svg>'));
  // Keep the authored width/height: the icon sits inline in the target's
  // markup with no wrapper, so its intrinsic box is part of the layout.
  const rootAttrs = jsxAttrs(open, {
    drop: ['xmlns'],
    force: { fill: 'none', width: size, height: size },
  });
  const body = inner
    .replace(/<(\w+)([^>]*?)\s*\/?>/g, (_, tag, attrs) => `<${tag} ${jsxAttrs(attrs)} />`)
    .replace(/\s+/g, ' ')
    .trim();
  return { rootAttrs, body };
}

const entries = [];
const push = (key, svg, size) => entries.push({ key, ...toJsx(svg, size) });

icons.security['sec-card-ico'].forEach((x, i) => push('sec-' + i, x.svg, 28));
// .val-card-ico svg is sized to 36px by CSS, not by an attribute.
icons['about-us']['val-card-ico'].forEach((x, i) => push('val-' + i, x.svg, 36));
icons['white-labeling']['int-icon'].forEach((x, i) => push('wl-' + i, x.svg, 26));

const body = entries
  .map((e) => `  "${e.key}": (\n    <svg ${e.rootAttrs}>\n      ${e.body}\n    </svg>\n  ),`)
  .join('\n');

const file = `import type { ReactElement } from "react";

/**
 * Inline SVGs lifted verbatim from the /security/, /about-us/ and
 * /white-labeling/ markup. Generated — re-run
 * docs/research/murphi-ai-2e2619f3/raw/gen-icons-b4.mjs rather than editing
 * paths by hand. Root presentation attributes are load-bearing: without
 * \`stroke\` / \`stroke-width\` the glyphs render blank.
 */
const ICONS: Record<string, ReactElement> = {
${body}
};

/** Renders the icon exactly as authored — no wrapper element. */
export function BespokeIcon({ name }: { name: string }) {
  return ICONS[name] ?? null;
}
`;

fs.writeFileSync(OUT, file);
console.log('wrote', entries.length, 'icons ->', OUT, file.length, 'bytes');
