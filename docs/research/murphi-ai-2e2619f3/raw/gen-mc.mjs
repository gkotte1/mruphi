import fs from 'fs';
import { tsLit } from './ts-lit.mjs';
import { jsxSvg } from './jsx-svg.mjs';

const page = JSON.parse(fs.readFileSync('b9/mc.json', 'utf8'));
const icons = JSON.parse(fs.readFileSync('b9/mc-icons.json', 'utf8'));
const ROOT = 'c:/Users/krush/OneDrive/Desktop/m/murphi-clone/src';

const content = `import type { ManagedCarePage } from "./types";

/**
 * /ai-for-managed-care-functions-health-system-and-hospitals/ — content lifted
 * verbatim from the live hand-authored \`.murphi-mc-embed\` block. Generated:
 * re-run docs/research/murphi-ai-2e2619f3/raw/ex-mc.mjs + gen-mc.mjs.
 *
 * The ${page.analyzer.findings.length} contract-analyzer findings and the phrases the demo highlights
 * come from the array literals in the page's own inline script, and each
 * feature card's drawer payload from its \`data-drawer\` attribute, so none of
 * this prose was re-typed. \`icon\` values index ManagedCareIcons.
 */
export const MANAGED_CARE_PAGE: ManagedCarePage = ${tsLit(page, 0)};
`;
const OUT = ROOT + '/content/murphi-ai-2e2619f3/managed-care-page.ts';
fs.writeFileSync(OUT, content);
console.log('wrote', OUT, (content.length / 1024).toFixed(1) + 'KB');

const entries = Object.entries(icons).map(([k, v]) => `  ${JSON.stringify(k)}: ${jsxSvg(v)},`).join('\n');
const iconFile = `import type { ReactElement } from "react";

/**
 * Inline glyphs from /ai-for-managed-care-functions-health-system-and-hospitals/,
 * lifted verbatim. The page hardens every icon against host CSS — \`fill: none\`,
 * \`stroke: currentColor\`, fixed sizes per slot — and those rules are applied by
 * the component that renders them rather than repeated on each path here.
 */
const ICONS: Record<string, ReactElement> = {
${entries}
};

export function ManagedCareIcon({ name }: { name: string }) {
  return ICONS[name] ?? null;
}
`;
const ICON_OUT = ROOT + '/components/sites/murphi-ai-2e2619f3/managed-care/ManagedCareIcons.tsx';
fs.mkdirSync(ICON_OUT.slice(0, ICON_OUT.lastIndexOf('/')), { recursive: true });
fs.writeFileSync(ICON_OUT, iconFile);
console.log('wrote', Object.keys(icons).length, 'icons');
