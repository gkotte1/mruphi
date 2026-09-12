import fs from 'fs';
import { tsLit } from './ts-lit.mjs';
import { jsxSvg, jsxChildren } from './jsx-svg.mjs';

const page = JSON.parse(fs.readFileSync('b9/ph.json', 'utf8'));
const ic = JSON.parse(fs.readFileSync('b9/ph-icons.json', 'utf8'));
const ROOT = 'c:/Users/krush/OneDrive/Desktop/m/murphi-clone/src';
const featCount = page.features.categories.reduce((s, c) => s + c.features.length, 0);

const content = `import type { PublicHealthPage } from "./types";

/**
 * /public-health-and-corrections-embed-ai-into-ehr-workflows/ — content lifted
 * verbatim from the live hand-authored embed. Generated: re-run
 * docs/research/murphi-ai-2e2619f3/raw/ex-ph.mjs + gen-ph.mjs.
 *
 * The feature explorer's ${page.features.categories.length} categories and ${featCount} cards, and the drawer copy —
 * including the lines that branch on feature family — come from the object
 * literals in the page's own inline script, so none of this prose was re-typed.
 * \`icon\` values index PublicHealthIcons: the markup glyphs directly, the
 * feature glyphs through its shared shell.
 */
export const PUBLIC_HEALTH_PAGE: PublicHealthPage = ${tsLit(page, 0)};
`;
const OUT = ROOT + '/content/murphi-ai-2e2619f3/public-health-page.ts';
fs.writeFileSync(OUT, content);
console.log('wrote', OUT, (content.length / 1024).toFixed(1) + 'KB');

const markup = Object.entries(ic.markup).map(([k, v]) => `  ${JSON.stringify(k)}: ${jsxSvg(v)},`).join('\n');
const library = Object.entries(ic.library).map(([k, v]) => `  ${JSON.stringify(k)}: <>${jsxChildren(v)}</>,`).join('\n');

const iconFile = `import type { ReactElement } from "react";

/**
 * Glyphs for the public-health-and-corrections embed. Two sets, both lifted
 * verbatim:
 *
 *   MARKUP   complete <svg> elements written into the page's own HTML
 *   LIBRARY  the inner paths of the ICON_SVGS map in its inline script, which
 *            the page renders through one shared \`<svg class="icon">\` shell
 */
const MARKUP: Record<string, ReactElement> = {
${markup}
};

const LIBRARY: Record<string, ReactElement> = {
${library}
};

export function PublicHealthIcon({ name }: { name: string }) {
  return MARKUP[name] ?? null;
}

/** \`icon(key)\` from the page script, shell and all. */
export function PublicHealthGlyph({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {LIBRARY[name] ?? null}
    </svg>
  );
}
`;
const ICON_OUT = ROOT + '/components/sites/murphi-ai-2e2619f3/public-health/PublicHealthIcons.tsx';
fs.mkdirSync(ICON_OUT.slice(0, ICON_OUT.lastIndexOf('/')), { recursive: true });
fs.writeFileSync(ICON_OUT, iconFile);
console.log('wrote', Object.keys(ic.markup).length, 'markup +', Object.keys(ic.library).length, 'library glyphs');
