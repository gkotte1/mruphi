import fs from 'fs';

const data = JSON.parse(fs.readFileSync('b6/content.json', 'utf8'));
const assets = JSON.parse(fs.readFileSync('b6/assetmap.json', 'utf8'));
const DIR = 'c:/Users/krush/OneDrive/Desktop/m/murphi-clone/src/content/murphi-ai-2e2619f3/';

const q = (s) => JSON.stringify(s);
const local = (u) => assets[u] ?? u;
const miss = [];
const need = (v, where) => { if (v === undefined || v === null || v === '') miss.push(where); return v; };

const HEAD = (what) => `import type {
${what}
} from "./types";

`;

/* ── /faqs/ ───────────────────────────────────────────────────────────── */
{
  const p = data.faqs;
  let s = HEAD('  FaqsPage,') +
`/**
 * /faqs/ — 25 questions in five categories, extracted verbatim from the live
 * markup. Generated: re-run docs/research/murphi-ai-2e2619f3/raw/extract-b6.mjs
 * + gen-b6.mjs rather than editing the prose.
 */
export const FAQS_PAGE: FaqsPage = {
  slug: ${q(p.slug)},
  title: ${q(need(p.title, 'faqs.title'))},
  description: ${q(need(p.description, 'faqs.description'))},
  heroTag: ${q(need(p.heroTag, 'faqs.heroTag'))},
  h1: ${q(need(p.h1, 'faqs.h1'))},
  heroSub: ${q(need(p.heroSub, 'faqs.heroSub'))},
  categories: [
`;
  for (const c of p.categories) {
    s += `    {\n      label: ${q(need(c.label, 'faq.cat'))},\n      items: [\n`;
    for (const i of c.items) {
      s += `        {\n          id: ${q(need(i.id, 'faq.id'))},\n          question: ${q(need(i.question, 'faq.q'))},\n          answer: ${q(need(i.answer, 'faq.a'))},\n        },\n`;
    }
    s += `      ],\n    },\n`;
  }
  s += `  ],\n  still: {\n    heading: ${q(need(p.still.heading, 'faq.still.h'))},\n    body: ${q(need(p.still.body, 'faq.still.b'))},\n    buttons: [\n`;
  for (const b of p.still.buttons) s += `      { href: ${q(b.href)}, label: ${q(need(b.label, 'faq.still.btn'))} },\n`;
  s += `    ],\n  },\n};\n`;
  fs.writeFileSync(DIR + 'faqs-page.ts', s);
  console.log('faqs-page.ts', s.length);
}

/* ── /support-ticket/ ─────────────────────────────────────────────────── */
{
  const p = data['support-ticket'];
  const emitSpans = (arr, ind) => arr.map((x) => x.br
    ? `${ind}{ br: true },`
    : `${ind}{ text: ${q(x.text)}${x.bold ? ', bold: true' : ''}${x.italic ? ', italic: true' : ''}${x.href ? `, href: ${q(x.href)}` : ''} },`).join('\n');
  let s = HEAD('  SupportTicketPage,') +
`/**
 * /support-ticket/ — the intake form is client-side only on the target: it
 * validates the required fields and then hands the composed ticket to the
 * visitor's mail client. There is no backend endpoint to reproduce.
 * Generated — re-run raw/extract-b6.mjs + gen-b6.mjs.
 */
export const SUPPORT_TICKET_PAGE: SupportTicketPage = {
  slug: ${q(p.slug)},
  title: ${q(need(p.title, 'st.title'))},
  description: ${q(need(p.description, 'st.description'))},
  heroTag: ${q(need(p.heroTag, 'st.heroTag'))},
  h1: ${q(need(p.h1, 'st.h1'))},
  heroSub: ${q(need(p.heroSub, 'st.heroSub'))},
  leftHeading: ${q(need(p.leftHeading, 'st.leftHeading'))},
  leftBody: ${q(need(p.leftBody, 'st.leftBody'))},
  infoCards: [
`;
  for (const c of p.infoCards) {
    s += `    {\n      tinted: ${c.tinted},\n      label: ${q(need(c.label, 'st.card.label'))},\n      body: [\n${emitSpans(c.spans, '        ')}\n      ],\n    },\n`;
  }
  s += `  ],\n  formHeading: ${q(need(p.formHeading, 'st.formHeading'))},\n  formBody: ${q(need(p.formBody, 'st.formBody'))},\n  fields: [\n`;
  for (const f of p.fields) {
    const half = f.id === 'support-first-name' || f.id === 'support-last-name';
    s += `    {\n      label: ${q(need(f.label, 'st.field.label'))},\n      element: ${q(f.element)},\n      id: ${q(f.id)},\n      type: ${q(f.type)},\n      placeholder: ${q(f.placeholder)},\n      required: ${f.required},\n`;
    if (f.accept) s += `      accept: ${q(f.accept)},\n`;
    if (half) s += `      half: true,\n`;
    s += `    },\n`;
  }
  s += `  ],\n  errorText: ${q(need(p.errorText, 'st.errorText'))},\n  okText: ${q(need(p.okText, 'st.okText'))},\n  submitLabel: ${q(need(p.submitLabel, 'st.submitLabel'))},\n  mailto: ${q(need(p.mailto, 'st.mailto'))},\n  subject: ${q(need(p.subject, 'st.subject'))},\n};\n`;
  fs.writeFileSync(DIR + 'support-ticket-page.ts', s);
  console.log('support-ticket-page.ts', s.length);
}

/* ── /download-app/ ───────────────────────────────────────────────────── */
{
  const p = data['download-app'];
  let icon = 0;
  let s = HEAD('  DownloadPage,') +
`/**
 * /download-app/ — same \`.page-section\` shell as /integration/, with the app
 * store cards and a six-card capability grid. Generated: re-run
 * raw/extract-b6.mjs + gen-b6.mjs.
 */
export const DOWNLOAD_PAGE: DownloadPage = {
  slug: ${q(p.slug)},
  title: ${q(need(p.title, 'dl.title'))},
  description: ${q(need(p.description, 'dl.description'))},
  heroTag: ${q(need(p.heroTag, 'dl.heroTag'))},
  h1: ${q(need(p.h1, 'dl.h1'))},
  heroSub: ${q(need(p.heroSub, 'dl.heroSub'))},
  heroButtons: [
${p.heroButtons.map((b) => `    { label: ${q(b.label)}, href: ${q(b.href)}, variant: ${q(b.variant)} },`).join('\n')}
  ],
  sections: [
`;
  for (const sec of p.sections) {
    s += `    {\n      tag: ${q(need(sec.tag, 'dl.tag'))},\n      heading: ${q(need(sec.heading, 'dl.heading'))},\n      alt: ${sec.alt},\n`;
    if (sec.lead) s += `      lead: ${q(sec.lead)},\n`;
    if (sec.apps) {
      s += `      apps: [\n`;
      for (const a of sec.apps) {
        s += `        {\n          image: ${q(local(need(a.image, 'dl.app.image')))},\n          alt: ${q(a.alt)},\n          title: ${q(need(a.title, 'dl.app.title'))},\n          description: ${q(need(a.description, 'dl.app.desc'))},\n          href: ${q(need(a.href, 'dl.app.href'))},\n          cta: ${q(need(a.cta, 'dl.app.cta'))},\n        },\n`;
      }
      s += `      ],\n`;
    }
    if (sec.cards) {
      s += `      cards: [\n`;
      for (const c of sec.cards) {
        s += `        {\n          icon: ${q('dl-' + icon++)},\n          title: ${q(need(c.title, 'dl.card.title'))},\n          description: ${q(need(c.description, 'dl.card.desc'))},\n        },\n`;
      }
      s += `      ],\n`;
    }
    s += `    },\n`;
  }
  s += `  ],\n};\n`;
  fs.writeFileSync(DIR + 'download-page.ts', s);
  console.log('download-page.ts', s.length);
}

/* ── legal pages ──────────────────────────────────────────────────────── */
{
  // Archived prose type, measured per page from the open accordion.
  const ARCHIVE_TYPE = {
    'privacy-policy': { size: 14, color: '#333333', inset: 0 },
    'terms-of-service': { size: 13, color: '#333333', inset: 10 },
    'ai-terms': { size: 14, color: '#000000', inset: 20 },
  };
  const CONST = {
    'privacy-policy': 'PRIVACY_POLICY_PAGE',
    'terms-of-service': 'TERMS_OF_SERVICE_PAGE',
    'ai-terms': 'AI_TERMS_PAGE',
  };
  const span = (x) => x.br
    ? '{ br: true }'
    : `{ text: ${q(x.text)}${x.bold ? ', bold: true' : ''}${x.italic ? ', italic: true' : ''}${x.href ? `, href: ${q(x.href)}` : ''} }`;
  const emitBlocks = (blocks, ind) => blocks.map((b) => {
    if (b.t === 'hr') return `${ind}{ t: "hr" },`;
    if (b.items) {
      return `${ind}{\n${ind}  t: ${q(b.t)},\n${ind}  items: [\n` +
        b.items.map((it) => `${ind}    [${it.map(span).join(', ')}],`).join('\n') +
        `\n${ind}  ],\n${ind}},`;
    }
    if (!b.spans.length) return `${ind}{ t: ${q(b.t)}, spans: [] },`;
    return `${ind}{\n${ind}  t: ${q(b.t)},\n${ind}  spans: [\n` +
      b.spans.map((x) => `${ind}    ${span(x)},`).join('\n') +
      `\n${ind}  ],\n${ind}},`;
  }).join('\n');

  for (const slug of Object.keys(CONST)) {
    const p = data[slug];
    const t = ARCHIVE_TYPE[slug];
    let s = HEAD('  LegalPage,') +
`/**
 * ${slug} — Elementor text-editor prose plus the superseded version in a
 * collapsed accordion. Legal copy is reproduced verbatim; generated by
 * raw/extract-b6.mjs + gen-b6.mjs — never hand-edit the text.
 */
export const ${CONST[slug]}: LegalPage = {
  slug: ${q(p.slug)},
  title: ${q(need(p.title, slug + '.title'))},
  description: ${q(need(p.description, slug + '.description'))},
  h1: ${q(need(p.h1, slug + '.h1'))},
  heroSub: ${q(need(p.heroSub, slug + '.heroSub'))},
  blocks: [
${emitBlocks(p.blocks, '    ')}
  ],
  archive: {
    label: ${q(need(p.archive.label, slug + '.archive.label'))},
    inset: ${t.inset},
    proseSize: ${t.size},
    proseColor: ${q(t.color)},
    blocks: [
${emitBlocks(p.archive.blocks, '      ')}
    ],
  },
};
`;
    fs.writeFileSync(DIR + slug + '-page.ts', s);
    console.log(slug + '-page.ts', s.length);
  }
}

if (miss.length) {
  console.error('EMPTY FIELDS:\n  ' + miss.join('\n  '));
  process.exitCode = 1;
} else {
  console.log('every field populated');
}
