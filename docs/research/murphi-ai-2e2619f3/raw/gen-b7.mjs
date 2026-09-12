import fs from 'fs';

/**
 * Snapshots the live WordPress content into typed data. The REST API is open,
 * so titles, dates, categories and featured media are read from it rather than
 * scraped — the listing pages then render from a build-time snapshot with no
 * runtime dependency on murphi.ai.
 */

const posts = [...JSON.parse(fs.readFileSync('b7/posts-1.json', 'utf8')),
  ...JSON.parse(fs.readFileSync('b7/posts-2.json', 'utf8'))];
const cats = JSON.parse(fs.readFileSync('b7/categories.json', 'utf8'));
const mediaMap = JSON.parse(fs.readFileSync('b7/mediamap.json', 'utf8'));
const users = JSON.parse(fs.readFileSync('b7/users.json', 'utf8'));
const catMeta = JSON.parse(fs.readFileSync('b7/category-meta.json', 'utf8'));
const OUT = 'c:/Users/krush/OneDrive/Desktop/m/murphi-clone/src/content/murphi-ai-2e2619f3/blog-content.ts';

const ENT = [
  [/&amp;/g, '&'], [/&#0?39;/g, "'"], [/&#8217;/g, '’'], [/&#8216;/g, '‘'],
  [/&quot;/g, '"'], [/&#8220;/g, '“'], [/&#8221;/g, '”'],
  [/&#8211;/g, '–'], [/&#8212;/g, '—'], [/&nbsp;/g, ' '],
  [/&lt;/g, '<'], [/&gt;/g, '>'], [/&#215;/g, '×'], [/&#8230;/g, '…'],
  [/&#038;/g, '&'], [/&#8242;/g, '′'], [/&hellip;/g, '…'],
];
const dec = (s) => {
  let t = String(s).replace(/<[^>]+>/g, '');
  for (const [re, to] of ENT) t = t.replace(re, to);
  return t.replace(/\s+/g, ' ').trim();
};
const q = (s) => JSON.stringify(s);
const miss = [];
const need = (v, where) => { if (v === undefined || v === null || v === '') miss.push(where); return v; };

const byId = Object.fromEntries(cats.map((c) => [c.id, c.slug]));
const authorById = Object.fromEntries(users.map((u) => [u.id, u.name]));

/** "2026-07-27T…" → "July 27, 2026", matching the live `.rtsb-meta-item.date`. */
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
const label = (iso) => {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};

const items = posts
  .filter((p) => p.categories.some((c) => byId[c] && byId[c] !== 'uncategorized'))
  .sort((a, b) => b.date.localeCompare(a.date))
  .map((p) => {
    const media = mediaMap[p.featured_media];
    return {
      slug: need(p.slug, 'post.slug'),
      title: need(dec(p.title.rendered), 'post.title'),
      date: p.date.slice(0, 10),
      dateLabel: label(p.date),
      author: need(authorById[p.author] ?? 'Murphi AI', 'post.author'),
      categories: p.categories.map((c) => byId[c]).filter((s) => s && s !== 'uncategorized'),
      image: media?.src ?? null,
      imageAlt: media?.alt ?? '',
      imageWidth: media?.width ?? null,
      imageHeight: media?.height ?? null,
    };
  });

// Counts come from the snapshot, not from WordPress' own tallies — those
// include the `uncategorized` bucket and drift from what actually renders.
const used = {};
items.forEach((p) => p.categories.forEach((s) => { used[s] = (used[s] || 0) + 1; }));
const categories = cats
  .filter((c) => used[c.slug])
  .map((c) => ({
    slug: c.slug,
    name: dec(c.name),
    count: used[c.slug],
    // Nine of the twelve carry a description in WordPress; the other three are
    // left without one rather than given invented copy.
    description: dec(c.description || ''),
    title: dec(catMeta[c.slug]?.title || ''),
    metaDescription: dec(catMeta[c.slug]?.description || ''),
  }))
  .sort((a, b) => b.count - a.count);

let out = `import type { BlogCategory, BlogPost } from "./types";

/**
 * Build-time snapshot of the murphi.ai WordPress content, taken from the site's
 * open REST API (\`/wp-json/wp/v2/\`). Generated — re-run
 * docs/research/murphi-ai-2e2619f3/raw/gen-b7.mjs rather than editing by hand.
 *
 * Post bodies are deliberately absent: the listing, archive and announcement
 * pages render titles, dates, categories and featured images only. The article
 * bodies are a separate decision — see CONTENT_SYSTEM.md.
 */
export const BLOG_CATEGORIES: BlogCategory[] = [
${categories.map((c) => [
  '  {',
  `    slug: ${q(c.slug)},`,
  `    name: ${q(c.name)},`,
  `    count: ${c.count},`,
  `    title: ${q(need(c.title, c.slug + '.title'))},`,
  ...(c.metaDescription ? [`    metaDescription: ${q(c.metaDescription)},`] : []),
  ...(c.description ? [`    description: ${q(c.description)},`] : []),
  '  },',
].join('\n')).join('\n')}
];

export const BLOG_POSTS: BlogPost[] = [
`;
for (const p of items) {
  out += `  {\n    slug: ${q(p.slug)},\n    title: ${q(p.title)},\n    date: ${q(p.date)},\n    dateLabel: ${q(p.dateLabel)},\n    author: ${q(p.author)},\n    categories: [${p.categories.map(q).join(', ')}],\n`;
  if (p.image) {
    out += `    image: ${q(p.image)},\n    imageAlt: ${q(p.imageAlt)},\n    imageWidth: ${p.imageWidth},\n    imageHeight: ${p.imageHeight},\n`;
  }
  out += `  },\n`;
}
out += `];\n`;

fs.writeFileSync(OUT, out);
console.log('wrote', OUT, (out.length / 1024).toFixed(1), 'KB');
console.log('posts', items.length, '| with image', items.filter((p) => p.image).length,
  '| categories', categories.length);
console.log(categories.map((c) => `${c.slug}:${c.count}`).join('  '));
if (miss.length) { console.error('EMPTY FIELDS:\n  ' + miss.slice(0, 20).join('\n  ')); process.exitCode = 1; }
else console.log('every field populated');
