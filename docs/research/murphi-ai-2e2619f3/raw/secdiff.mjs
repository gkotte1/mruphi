import { chromium } from 'playwright-core';

/**
 * Compare two flat lists of sections side by side:
 *   node secdiff.mjs <slug> <width> "<liveSelector>" "<cloneSelector>"
 */
const [slug, width, liveSel, cloneSel] = process.argv.slice(2);

const b = await chromium.launch({ channel: 'chrome' });
const ctx = await b.newContext({ viewport: { width: Number(width), height: 1000 } });
const rows = [];
for (const [tag, url, sel] of [
  ['live', 'https://murphi.ai/' + slug + '/', liveSel],
  ['clone', 'http://localhost:3000/' + slug + '/', cloneSel],
]) {
  const pg = await ctx.newPage();
  await pg.goto(url, { waitUntil: 'load', timeout: 120000 });
  await pg.waitForTimeout(tag === 'clone' ? 1500 : 2800);
  rows.push(await pg.evaluate((s) => [...document.querySelectorAll(s)]
    .filter((e) => e.getBoundingClientRect().height > 0)
    .map((e) => ({
      c: String(e.className).replace(/\s+/g, ' ').slice(0, 26),
      h: Math.round(e.getBoundingClientRect().height * 10) / 10,
    })), sel));
  await pg.close();
}
const [L, C] = rows;
console.log('live', L.length, 'nodes | clone', C.length, 'nodes');
let dl = 0, dc = 0;
for (let i = 0; i < Math.max(L.length, C.length); i++) {
  const a = L[i], c = C[i];
  if (a) dl += a.h;
  if (c) dc += c.h;
  const ok = a && c && Math.abs(a.h - c.h) < 1;
  const f = (x, w) => (x ? x.c.padEnd(w) + String(x.h).padStart(9) : '—');
  console.log((ok ? '  ' : '≠ ') + f(a, 28).padEnd(38) + ' | ' + f(c, 32) + (ok ? '' : `   Δ${c && a ? Math.round((c.h - a.h) * 10) / 10 : '?'}`));
}
console.log('sums  live', Math.round(dl), ' clone', Math.round(dc));
await b.close();
