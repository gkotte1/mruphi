import fs from 'fs';

const data = JSON.parse(fs.readFileSync('mod/content.json', 'utf8'));
const ORDER = ['ambient-ai', 'revenue-assurance', 'ai-patient-financials', 'contract-analyzer'];
const q = s => JSON.stringify(s);
const ind = n => ' '.repeat(n);

let out = `import type { ModulePage } from "./types";

/**
 * Content for the four SaaS module pages, extracted verbatim from the live
 * murphi.ai markup. Generated — do not hand-edit prose; re-run
 * docs/research/murphi-ai-2e2619f3/raw/extract-module-pages.mjs instead.
 */
export const MODULE_PAGES: Record<string, ModulePage> = {
`;

for (const slug of ORDER) {
  const p = data[slug];
  const L = p.layout;
  out += `${ind(2)}${q(slug)}: {\n`;
  out += `${ind(4)}slug: ${q(slug)},\n`;
  out += `${ind(4)}title: ${q(p.title)},\n`;
  out += `${ind(4)}description: ${q(p.description)},\n`;
  out += `${ind(4)}layout: {\n`;
  out += `${ind(6)}aside: ${L.aside},\n`;
  out += `${ind(6)}subMaxWidth: ${L.subMaxWidth === null ? 'null' : L.subMaxWidth},\n`;
  out += `${ind(6)}subGap: ${L.subGap},\n`;
  out += `${ind(6)}quoteRoleGap: ${L.quoteRoleGap},\n`;
  out += `${ind(6)}headingGap: ${L.headingGap},\n`;
  out += `${ind(6)}leadMaxWidth: ${L.leadMaxWidth === null ? 'null' : L.leadMaxWidth},\n`;
  out += `${ind(6)}leadGap: ${L.leadGap},\n`;
  out += `${ind(6)}leadLeading: ${L.leadLeading},\n`;
  out += `${ind(6)}density: ${q(L.density)},\n`;
  out += `${ind(6)}heroTypeScale: ${q(L.heroTypeScale)},\n`;
  out += `${ind(6)}kpiMobileCols: ${L.kpiMobileCols},\n`;
  out += `${ind(6)}headingMobile: ${q(L.headingMobile)},\n`;
  out += `${ind(6)}eyebrowMobile: ${L.eyebrowMobile},\n`;
  out += `${ind(6)}mobileChrome: ${q(L.mobileChrome)},\n`;
  out += `${ind(4)}},\n`;
  out += `${ind(4)}heroTag: ${q(p.heroTag)},\n`;
  out += `${ind(4)}h1Lines: [${p.h1Lines.map(q).join(', ')}],\n`;
  out += `${ind(4)}heroSub: ${q(p.heroSub)},\n`;
  out += `${ind(4)}heroButtons: [\n`;
  for (const b of p.heroButtons) out += `${ind(6)}{ label: ${q(b.label)}, href: ${q(b.href)}, variant: ${q(b.variant)} },\n`;
  out += `${ind(4)}],\n`;
  out += `${ind(4)}statusCard: {\n`;
  out += `${ind(6)}title: ${q(p.statusCard.title)},\n`;
  out += `${ind(6)}badge: ${q(p.statusCard.badge)},\n`;
  out += `${ind(6)}facts: [\n`;
  for (const f of p.statusCard.facts) out += `${ind(8)}${q(f)},\n`;
  out += `${ind(6)}],\n${ind(4)}},\n`;
  out += `${ind(4)}sections: [\n`;

  for (const s of p.sections) {
    out += `${ind(6)}{\n`;
    out += `${ind(8)}grey: ${s.grey},\n`;
    out += `${ind(8)}tag: ${q(s.tag)},\n`;
    out += `${ind(8)}heading: ${q(s.heading)},\n`;
    if (s.lead) out += `${ind(8)}lead: ${q(s.lead)},\n`;
    if (s.footnote) out += `${ind(8)}footnote: ${q(s.footnote)},\n`;
    if (s.steps) {
      out += `${ind(8)}steps: [\n`;
      for (const x of s.steps) out += `${ind(10)}{ num: ${q(x.num)}, title: ${q(x.title)}, description: ${q(x.description)} },\n`;
      out += `${ind(8)}],\n`;
    }
    if (s.features) {
      out += `${ind(8)}features: [\n`;
      for (const x of s.features) {
        out += `${ind(10)}{\n`;
        if (x.status) out += `${ind(12)}status: ${q(x.status)},\n${ind(12)}badgeLabel: ${q(x.badgeLabel)},\n`;
        out += `${ind(12)}title: ${q(x.title)},\n${ind(12)}description: ${q(x.description)},\n`;
        out += `${ind(10)}},\n`;
      }
      out += `${ind(8)}],\n`;
    }
    if (s.kpis) {
      out += `${ind(8)}kpis: [\n`;
      for (const x of s.kpis) out += `${ind(10)}{ value: ${q(x.value)}, label: ${q(x.label)} },\n`;
      out += `${ind(8)}],\n`;
    }
    if (s.quote) {
      out += `${ind(8)}quote: {\n${ind(10)}text: ${q(s.quote.text)},\n${ind(10)}author: ${q(s.quote.author)},\n${ind(10)}role: ${q(s.quote.role)},\n${ind(8)}},\n`;
    }
    if (s.tagCloud) {
      out += `${ind(8)}tagCloud: [\n`;
      for (const x of s.tagCloud) out += `${ind(10)}${q(x)},\n`;
      out += `${ind(8)}],\n`;
    }
    if (s.related) {
      out += `${ind(8)}related: [\n`;
      for (const x of s.related) out += `${ind(10)}{ href: ${q(x.href)}, title: ${q(x.title)}, description: ${q(x.description)} },\n`;
      out += `${ind(8)}],\n`;
    }
    if (s.twoCol) {
      out += `${ind(8)}twoCol: {\n`;
      if (s.twoCol.kpis) {
        out += `${ind(10)}kpis: [\n`;
        for (const x of s.twoCol.kpis) out += `${ind(12)}{ value: ${q(x.value)}, label: ${q(x.label)} },\n`;
        out += `${ind(10)}],\n`;
      }
      if (s.twoCol.cards) {
        out += `${ind(10)}cards: [\n`;
        for (const x of s.twoCol.cards) out += `${ind(12)}{ title: ${q(x.title)}, description: ${q(x.description)} },\n`;
        out += `${ind(10)}],\n`;
      }
      out += `${ind(8)}},\n`;
    }
    out += `${ind(6)}},\n`;
  }
  out += `${ind(4)}],\n${ind(2)}},\n`;
}
out += `};\n\nexport const MODULE_SLUGS = ${JSON.stringify(ORDER)} as const;\n`;

fs.writeFileSync(process.argv[2], out);
console.log('written', process.argv[2], out.length, 'bytes');
