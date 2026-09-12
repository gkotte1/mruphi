import fs from 'fs';
import { tsLit } from './ts-lit.mjs';
import { jsxSvg } from './jsx-svg.mjs';

const page = JSON.parse(fs.readFileSync('b9/mh.json', 'utf8'));
const icons = JSON.parse(fs.readFileSync('b9/mh-icons.json', 'utf8'));
const ROOT = 'c:/Users/krush/OneDrive/Desktop/m/murphi-clone/src';
const featCount = page.features.categories.reduce((s, c) => s + c.features.length, 0);

const content = `import type { MentalHealthPage } from "./types";

/**
 * /embed-ai-into-ehr-workflows-mental-and-behavioural-health/ — content lifted
 * verbatim from the live hand-authored embed. Generated: re-run
 * docs/research/murphi-ai-2e2619f3/raw/ex-mh.mjs + gen-mh.mjs.
 *
 * The feature explorer's ${page.features.categories.length} categories and ${featCount} cards, their glyphs, and the
 * drawer copy — including the lines that branch on feature family — come from
 * the object literal in the page's own inline script, so none of this prose was
 * re-typed. \`icon\` values index MentalHealthIcons.
 */
export const MENTAL_HEALTH_PAGE: MentalHealthPage = ${tsLit(page, 0)};
`;
const OUT = ROOT + '/content/murphi-ai-2e2619f3/mental-health-page.ts';
fs.writeFileSync(OUT, content);
console.log('wrote', OUT, (content.length / 1024).toFixed(1) + 'KB');

const entries = Object.entries(icons).map(([k, v]) => `  ${JSON.stringify(k)}: ${jsxSvg(v)},`).join('\n');
const iconFile = `import type { ReactElement } from "react";

/**
 * Inline glyphs from the behavioural-health embed, lifted verbatim — both the
 * ones written into the page's markup and the ones its feature data carries.
 * Each keeps the \`fill: none\` / \`stroke\` hardening the live page applies so
 * host CSS cannot repaint them.
 */
const ICONS: Record<string, ReactElement> = {
${entries}
};

export function MentalHealthIcon({ name }: { name: string }) {
  return ICONS[name] ?? null;
}
`;
const ICON_OUT = ROOT + '/components/sites/murphi-ai-2e2619f3/mental-health/MentalHealthIcons.tsx';
fs.mkdirSync(ICON_OUT.slice(0, ICON_OUT.lastIndexOf('/')), { recursive: true });
fs.writeFileSync(ICON_OUT, iconFile);
console.log('wrote', Object.keys(icons).length, 'icons');
