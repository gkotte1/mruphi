import fs from 'fs';

const data = JSON.parse(fs.readFileSync('seg/content.json', 'utf8'));
const ORDER = [
  'post-acute-care', 'health-systems-hospitals', 'primary-specialty-care',
  'mental-behavioral-health', 'ehr-emr-companies',
  'rcm-companies', 'coding-billing', 'qapi-compliance',
  'accreditation-audit', 'public-health-and-corrections',
];
const q = s => JSON.stringify(s);
const ind = n => ' '.repeat(n);

let out = `import type { SegmentPage } from "./types";

/**
 * Content for the ten "Who We Serve" segment pages, extracted verbatim from the
 * live murphi.ai markup. Generated — do not hand-edit prose; re-run
 * docs/research/murphi-ai-2e2619f3/raw/extract-segment-pages.mjs instead.
 */
export const SEGMENT_PAGES: Record<string, SegmentPage> = {
`;

function emitCards(cards, depth) {
  let s = '';
  for (const c of cards) {
    s += `${ind(depth)}{\n`;
    if (c.status) s += `${ind(depth + 2)}status: ${q(c.status)},\n`;
    if (c.badgeLabel) s += `${ind(depth + 2)}badgeLabel: ${q(c.badgeLabel)},\n`;
    s += `${ind(depth + 2)}title: ${q(c.title)},\n`;
    s += `${ind(depth + 2)}description: ${q(c.desc)},\n`;
    if (c.attribution) s += `${ind(depth + 2)}attribution: ${q(c.attribution)},\n`;
    if (c.noteLabel) s += `${ind(depth + 2)}noteLabel: ${q(c.noteLabel)},\n`;
    if (c.noteText) s += `${ind(depth + 2)}noteText: ${q(c.noteText)},\n`;
    s += `${ind(depth)}},\n`;
  }
  return s;
}

for (const slug of ORDER) {
  const p = data[slug];
  out += `${ind(2)}${q(slug)}: {\n`;
  out += `${ind(4)}slug: ${q(slug)},\n`;
  out += `${ind(4)}title: ${q(p.title)},\n`;
  out += `${ind(4)}description: ${q(p.description)},\n`;
  out += `${ind(4)}heroTags: [\n`;
  for (const t of p.heroTags) {
    out += `${ind(6)}{ label: ${q(t.label)}`;
    if (t.href) out += `, href: ${q(t.href)}, arrow: ${q(t.arrow)}`;
    out += ` },\n`;
  }
  out += `${ind(4)}],\n`;
  out += `${ind(4)}h1Lines: [${p.h1Lines.map(q).join(', ')}],\n`;
  out += `${ind(4)}variant: ${q(p.variant)},\n`;
  out += `${ind(4)}h1MaxWidth: ${p.h1MaxWidth},\n`;
  out += `${ind(4)}contentMaxWidth: ${p.contentMaxWidth},\n`;
  out += `${ind(4)}kpiValue: ${q(p.kpiValue)},\n`;
  if (p.h1Highlight) out += `${ind(4)}h1Highlight: ${q(p.h1Highlight)},\n`;
  out += `${ind(4)}heroSub: ${q(p.heroSub)},\n`;
  out += `${ind(4)}heroButtons: [\n`;
  for (const b of p.heroBtns) {
    out += `${ind(6)}{ label: ${q(b.label)}, href: ${q(b.href)}, variant: ${q(b.variant === 'btn-w' ? 'solid' : 'ghost')} },\n`;
  }
  out += `${ind(4)}],\n`;
  out += `${ind(4)}sections: [\n`;

  for (const s of p.sections) {
    out += `${ind(6)}{\n`;
    out += `${ind(8)}tag: ${q(s.tag)},\n`;
    out += `${ind(8)}heading: ${q(s.heading)},\n`;
    out += `${ind(8)}alt: ${s.alt ? 'true' : 'false'},\n`;
    if (s.lead) out += `${ind(8)}lead: ${q(s.lead)},\n`;
    if (s.whoTags) {
      out += `${ind(8)}whoTags: [\n`;
      for (const w of s.whoTags) out += `${ind(10)}${q(w)},\n`;
      out += `${ind(8)}],\n`;
      if (s.whoTagsAfterLead) out += `${ind(8)}whoTagsAfterLead: true,\n`;
    }
    if (s.features) {
      out += `${ind(8)}gridColumns: ${q('feature')},\n`;
      out += `${ind(8)}features: [\n` + emitCards(s.features, 10) + `${ind(8)}],\n`;
    }
    if (s.cardRow) {
      out += `${ind(8)}cardRow: {\n`;
      out += `${ind(10)}columns: ${q(s.cardRow.columns)},\n`;
      out += `${ind(10)}padding: ${s.cardRow.padding},\n`;
      out += `${ind(10)}descSize: ${s.cardRow.descSize},\n`;
      out += `${ind(10)}descLeading: ${s.cardRow.descLeading},\n`;
      out += `${ind(10)}cards: [\n` + emitCards(s.cardRow.cards, 12) + `${ind(10)}],\n`;
      out += `${ind(8)}},\n`;
    }
    if (s.kpis) {
      out += `${ind(8)}kpis: [\n`;
      for (const k of s.kpis) out += `${ind(10)}{ value: ${q(k.value)}, label: ${q(k.label)} },\n`;
      out += `${ind(8)}],\n`;
    }
    if (s.quote) {
      out += `${ind(8)}quote: {\n${ind(10)}text: ${q(s.quote.text)},\n${ind(10)}author: ${q(s.quote.author)},\n${ind(10)}role: ${q(s.quote.role)},\n${ind(8)}},\n`;
    }
    if (s.callout) {
      out += `${ind(8)}callout: { label: ${q(s.callout.label)}, text: ${q(s.callout.text)} },\n`;
    }
    if (s.banner) {
      out += `${ind(8)}banner: { body: ${q(s.banner.body)} },\n`;
    }
    out += `${ind(6)}},\n`;
  }
  out += `${ind(4)}],\n${ind(2)}},\n`;
}
out += `};\n\nexport const SEGMENT_SLUGS = ${JSON.stringify(ORDER)} as const;\n`;

fs.writeFileSync(process.argv[2], out);
console.log('written', process.argv[2], out.length, 'bytes');
