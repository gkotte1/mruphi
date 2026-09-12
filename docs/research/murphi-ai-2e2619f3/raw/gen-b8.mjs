import fs from 'fs';
import path from 'path';
import { parseHtml, toBlocks, blocksToText, decodeEntities } from './html-parse.mjs';
import { buildRouteSet, toInternal } from './link-map.mjs';

/**
 * Turns each post's `content.rendered` into a typed block tree and writes one
 * module per post, plus a lazy index so a page only pulls in its own body.
 *
 * Every body is verified character-for-character against the source HTML
 * before it is written — the same guard used on the earlier extraction phases.
 */

const DIR = 'c:/Users/krush/OneDrive/Desktop/m/murphi-clone/src/content/murphi-ai-2e2619f3/';
const POSTS_DIR = path.join(DIR, 'posts');
fs.mkdirSync(POSTS_DIR, { recursive: true });

const bodies = JSON.parse(fs.readFileSync('b8/bodies.json', 'utf8'));
const bodyMap = JSON.parse(fs.readFileSync('b8/bodymap.json', 'utf8'));

const q = (s) => JSON.stringify(s);
const plain = (html) => decodeEntities(String(html).replace(/<(script|style)[^]*?<\/\1>/g, '').replace(/<[^>]+>/g, ' '))
  .replace(/\s+/g, ' ').trim();
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

/** In-body <img> → localised asset, carrying the authored dimensions. */
function resolveImage(attrs) {
  const src = attrs.src;
  if (!src) return null;
  const local = bodyMap[src];
  if (!local) return null;
  const width = Number(attrs.width);
  const height = Number(attrs.height);
  const out = { src: local.src, alt: attrs.alt || local.alt || '' };
  if (Number.isFinite(width) && width > 0) out.width = width;
  if (Number.isFinite(height) && height > 0) out.height = height;
  return out;
}

const emitSpans = (spans, ind) => spans.map((s) => (s.br
  ? `${ind}{ br: true },`
  : `${ind}{ text: ${q(s.text)}${s.bold ? ', bold: true' : ''}${s.italic ? ', italic: true' : ''}${s.underline ? ', underline: true' : ''}${s.href ? `, href: ${q(s.href)}` : ''} },`)).join('\n');

function emitBlocks(blocks, ind) {
  return blocks.map((b) => {
    if (b.t === 'hr') return `${ind}{ t: "hr" },`;
    if (b.t === 'spacer') return `${ind}{ t: "spacer", height: ${b.height} },`;
    if (b.t === 'img') {
      const bits = [`t: "img"`, `src: ${q(b.src)}`, `alt: ${q(b.alt)}`];
      if (b.width) bits.push(`width: ${b.width}`);
      if (b.height) bits.push(`height: ${b.height}`);
      if (b.caption) {
        return `${ind}{\n${ind}  ${bits.join(`,\n${ind}  `)},\n${ind}  caption: [\n${emitSpans(b.caption, ind + '    ')}\n${ind}  ],\n${ind}},`;
      }
      return `${ind}{ ${bits.join(', ')} },`;
    }
    if (b.t === 'callout' || b.t === 'quote') {
      return `${ind}{\n${ind}  t: ${q(b.t)},\n${ind}  blocks: [\n${emitBlocks(b.blocks, ind + '    ')}\n${ind}  ],\n${ind}},`;
    }
    if (b.t === 'ul' || b.t === 'ol') {
      const items = b.items.map((it) => {
        const parts = [];
        if (it.spans) parts.push(`${ind}    spans: [\n${emitSpans(it.spans, ind + '      ')}\n${ind}    ],`);
        if (it.blocks) parts.push(`${ind}    blocks: [\n${emitBlocks(it.blocks, ind + '      ')}\n${ind}    ],`);
        return `${ind}  {\n${parts.join('\n')}\n${ind}  },`;
      }).join('\n');
      const start = b.start ? `\n${ind}  start: ${b.start},` : '';
      return `${ind}{\n${ind}  t: ${q(b.t)},${start}\n${ind}  items: [\n${items}\n${ind}  ],\n${ind}},`;
    }
    if (b.t === 'table') {
      const rows = b.rows.map((r) => {
        const cells = r.cells.map((c) => `${ind}      [\n${emitSpans(c, ind + '        ')}\n${ind}      ],`).join('\n');
        return `${ind}    {\n${ind}      head: ${r.head},\n${ind}      cells: [\n${cells}\n${ind}      ],\n${ind}    },`;
      }).join('\n');
      return `${ind}{\n${ind}  t: "table",\n${ind}  rows: [\n${rows}\n${ind}  ],\n${ind}},`;
    }
    return `${ind}{\n${ind}  t: ${q(b.t)},\n${ind}  spans: [\n${emitSpans(b.spans, ind + '    ')}\n${ind}  ],\n${ind}},`;
  }).join('\n');
}

const EMBED_EXPORT = [
  '',
  '/** Body sits inside an Elementor container: a 1160px column, not 1180. */',
  'export const embedded = true;',
  '',
].join('\n');

/**
 * Post bodies quote absolute murphi.ai URLs. Where the destination exists in
 * this app, rewrite it to a root-relative path so the link stays inside the
 * clone; everything else — including murphi.ai pages not built yet — is left
 * exactly as authored. Link text is never touched.
 */
const { routes } = buildRouteSet();
let linksInternal = 0;
let linksLeftAbsolute = 0;

const isMurphiAbsolute = (href) => {
  try {
    const u = new URL(href);
    return u.hostname === 'murphi.ai' || u.hostname === 'www.murphi.ai';
  } catch {
    return false;
  }
};

function fixSpans(spans) {
  for (const s of spans ?? []) {
    if (!s.href) continue;
    const to = toInternal(s.href, routes);
    if (to) {
      s.href = to;
      linksInternal++;
    } else if (isMurphiAbsolute(s.href)) {
      linksLeftAbsolute++;
    }
  }
}

function rewriteLinks(list) {
  for (const b of list) {
    fixSpans(b.spans);
    fixSpans(b.caption);
    if (b.rows) for (const r of b.rows) for (const c of r.cells) fixSpans(c);
    if (b.items) {
      for (const it of b.items) {
        fixSpans(it.spans);
        if (it.blocks) rewriteLinks(it.blocks);
      }
    }
    if (b.blocks) rewriteLinks(b.blocks);
  }
}

const written = [];
const failures = [];
const imageLoss = [];
let droppedImages = 0;

for (const post of bodies) {
  const blocks = toBlocks(parseHtml(post.content.rendered), (attrs) => {
    const r = resolveImage(attrs);
    if (!r && attrs.src) droppedImages++;
    return r;
  });

  rewriteLinks(blocks);

  // Guard: every <img> in the source must survive as an image block. Text
  // comparison cannot see a dropped image, and one post nests one in an <h2>.
  const srcImgs = (post.content.rendered.match(/<img[ >]/gi) || []).length;
  let gotImgs = 0;
  const countImgs = (list) => { for (const x of list) { if (x.t === 'img') gotImgs++; if (x.blocks) countImgs(x.blocks); if (x.items) for (const i of x.items) if (i.blocks) countImgs(i.blocks); } };
  countImgs(blocks);
  if (gotImgs !== srcImgs) imageLoss.push({ slug: post.slug, srcImgs, gotImgs });

  // Guard: the rendered tree must contain every character the source did.
  const got = norm(blocksToText(blocks));
  const want = norm(plain(post.content.rendered));
  if (got !== want) {
    failures.push({ slug: post.slug, lost: want.length - got.length });
    continue;
  }

  // 17 posts have their prose wrapped in an Elementor container, which adds
  // 10px of horizontal padding twice over — those render on a 1160px column
  // instead of 1180, so their lines wrap earlier.
  const embedded = post.content.rendered.includes('data-elementor-type');
  const file = `import type { ArticleBlock } from "../types";

/** Generated from murphi.ai/wp-json/wp/v2/posts — do not hand-edit. */
export const blocks: ArticleBlock[] = [
${emitBlocks(blocks, '  ')}
];
${embedded ? EMBED_EXPORT : ''}`;
  fs.writeFileSync(path.join(POSTS_DIR, post.slug + '.ts'), file);
  written.push(post.slug);
}

written.sort();
const index = `import type { ArticleBlock } from "./types";

/**
 * Lazy index of the ${written.length} post bodies. Each entry is its own module so a
 * post page pulls in only its own content. Generated — re-run
 * docs/research/murphi-ai-2e2619f3/raw/gen-b8.mjs.
 */
export const POST_BODIES: Record<
  string,
  () => Promise<{ blocks: ArticleBlock[]; embedded?: boolean }>
> = {
${written.map((s) => `  ${q(s)}: () => import("./posts/${s}"),`).join('\n')}
};

export const POST_BODY_SLUGS = Object.keys(POST_BODIES);
`;
fs.writeFileSync(path.join(DIR, 'post-bodies.ts'), index);

const size = fs.readdirSync(POSTS_DIR).reduce((a, f) => a + fs.statSync(path.join(POSTS_DIR, f)).size, 0);
console.log('wrote', written.length, 'post modules |', (size / 1048576).toFixed(2), 'MB');
console.log('in-body images dropped (no local copy):', droppedImages);
console.log('links → internal:', linksInternal, '| left absolute (no route here):', linksLeftAbsolute);
if (imageLoss.length) {
  console.error('IMAGES DROPPED on', imageLoss.length, 'posts:');
  imageLoss.forEach((f) => console.error('  ' + f.slug + '  ' + f.gotImgs + '/' + f.srcImgs));
  process.exitCode = 1;
}
if (failures.length) {
  console.error('CONTENT MISMATCH on', failures.length, 'posts:');
  failures.slice(0, 10).forEach((f) => console.error('  ' + f.slug + '  Δ' + f.lost));
  process.exitCode = 1;
} else {
  console.log('every body verified character-for-character against the source');
}
