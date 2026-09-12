import fs from 'fs';
import { parseHtml, toBlocks, blocksToText, decodeEntities } from './html-parse.mjs';

const posts = JSON.parse(fs.readFileSync('b8/bodies.json', 'utf8'));
const plain = (html) => decodeEntities(String(html).replace(/<(script|style)[^]*?<\/\1>/g, '').replace(/<[^>]+>/g, ' '))
  .replace(/\s+/g, ' ').trim();

let worst = [];
let totalBlocks = 0;
for (const p of posts) {
  const tree = parseHtml(p.content.rendered);
  const blocks = toBlocks(tree, (a) => (a.src ? { src: a.src, alt: a.alt || "" } : null));
  totalBlocks += blocks.length;
  const got = blocksToText(blocks);
  const want = plain(p.content.rendered);
  // Compare on letters/digits only: whitespace and punctuation spacing differ
  // harmlessly between "render the tags away" and "walk the tree".
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const a = norm(got), b = norm(want);
  if (a !== b) {
    let i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i++;
    worst.push({ slug: p.slug, lost: b.length - a.length, at: i, want: want.slice(Math.max(0, i - 60), i + 90), got: got.slice(Math.max(0, i - 60), i + 90) });
  }
}
console.log('posts', posts.length, '| blocks', totalBlocks, '| mismatches', worst.length);
worst.sort((x, y) => Math.abs(y.lost) - Math.abs(x.lost));
for (const w of worst.slice(0, 6)) {
  console.log('\n── ' + w.slug + '  Δchars ' + w.lost + ' at ' + w.at);
  console.log('  want: …' + w.want);
  console.log('  got : …' + w.got);
}
