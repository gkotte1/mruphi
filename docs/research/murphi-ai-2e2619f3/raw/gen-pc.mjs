import fs from 'fs';
import { tsLit } from './ts-lit.mjs';
import { jsxSvg } from './jsx-svg.mjs';

const page = JSON.parse(fs.readFileSync('b9/pc.json', 'utf8'));
const icons = JSON.parse(fs.readFileSync('b9/pc-icons.json', 'utf8'));
const ROOT = 'c:/Users/krush/OneDrive/Desktop/m/murphi-clone/src';
const specCount = page.specialties.items.reduce((s, x) => s + x.features.length, 0);
const catCount = page.features.categories.reduce((s, x) => s + x.features.length, 0);

const content = `import type { PrimaryCarePage } from "./types";

/**
 * /primary-and-speciality-care-embed-into-ehr/ — content lifted verbatim from
 * the live hand-authored embed. Generated: re-run
 * docs/research/murphi-ai-2e2619f3/raw/ex-pc.mjs + gen-pc.mjs.
 *
 * Both explorers come from the object literals in the page's own inline
 * script — ${page.specialties.items.length} specialties holding ${specCount} cards, and ${page.features.categories.length} categories holding ${catCount} —
 * along with the drawer copy, including the lines that branch on feature
 * family. \`icon\` values index PrimaryCareIcons.
 */
export const PRIMARY_CARE_PAGE: PrimaryCarePage = ${tsLit(page, 0)};
`;
const OUT = ROOT + '/content/murphi-ai-2e2619f3/primary-care-page.ts';
fs.writeFileSync(OUT, content);
console.log('wrote', OUT, (content.length / 1024).toFixed(1) + 'KB');

const entries = Object.entries(icons).map(([k, v]) => `  ${JSON.stringify(k)}: ${jsxSvg(v)},`).join('\n');
const iconFile = `import type { ReactElement } from "react";

/**
 * Inline glyphs from /primary-and-speciality-care-embed-into-ehr/, lifted
 * verbatim — both the ones written into the page's markup and the ones its two
 * explorers carry in data. Each keeps the \`fill: none\` / \`stroke\` hardening the
 * live page applies so host CSS cannot repaint them.
 */
const ICONS: Record<string, ReactElement> = {
${entries}
};

export function PrimaryCareIcon({ name }: { name: string }) {
  return ICONS[name] ?? null;
}
`;
const ICON_OUT = ROOT + '/components/sites/murphi-ai-2e2619f3/primary-care/PrimaryCareIcons.tsx';
fs.mkdirSync(ICON_OUT.slice(0, ICON_OUT.lastIndexOf('/')), { recursive: true });
fs.writeFileSync(ICON_OUT, iconFile);
console.log('wrote', Object.keys(icons).length, 'icons');
