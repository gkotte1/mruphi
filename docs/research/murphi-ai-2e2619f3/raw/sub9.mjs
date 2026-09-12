import { chromium } from 'playwright-core';

/**
 * Side-by-side subtree walk: `node sub9.mjs <slug> <width> <liveSel> <cloneSel> [depth]`.
 * Prints geometry plus the box properties that usually explain a delta.
 */
const [slug, width, liveSel, cloneSel, depth = '3'] = process.argv.slice(2);

const b = await chromium.launch({ channel: 'chrome' });
const ctx = await b.newContext({ viewport: { width: Number(width), height: 1000 } });
const rows = [];
for (const [tag, url, sel] of [
  ['live', 'https://murphi.ai/' + slug + '/', liveSel],
  ['clone', 'http://localhost:3000/' + slug + '/', cloneSel],
]) {
  const pg = await ctx.newPage();
  await pg.goto(url, { waitUntil: 'load', timeout: 120000 });
  await pg.waitForTimeout(tag === 'clone' ? 900 : 2800);
  rows.push(await pg.evaluate(([s, d]) => {
    const root = document.querySelector(s);
    if (!root) return [{ lvl: 0, t: 'MISSING ' + s, h: 0, w: 0, x: '' }];
    const out = [];
    const rec = (el, lvl) => {
      const r = el.getBoundingClientRect();
      const c = getComputedStyle(el);
      out.push({
        lvl,
        t: el.tagName.toLowerCase() + '.' + String(el.className).replace(/\s+/g, ' ').slice(0, 18),
        w: Math.round(r.width), h: Math.round(r.height * 10) / 10,
        x: `m[${c.margin}] p[${c.padding}] ${c.fontSize}/${c.lineHeight} ${c.display}`,
      });
      if (lvl < Number(d)) for (const k of el.children) rec(k, lvl + 1);
    };
    rec(root, 0);
    return out;
  }, [sel, depth]));
  await pg.close();
}
const [L, C] = rows;
const n = Math.max(L.length, C.length);
for (let i = 0; i < n; i++) {
  const a = L[i], c = C[i];
  const same = a && c && Math.abs(a.h - c.h) < 1;
  const f = (v) => (v ? '  '.repeat(v.lvl) + v.t + ' ' + v.w + 'x' + v.h : '—');
  console.log((same ? '  ' : '≠ ') + f(a).padEnd(46) + '| ' + f(c).padEnd(46) + (same ? '' : '\n     L ' + (a ? a.x : '—') + '\n     C ' + (c ? c.x : '—')));
}
await b.close();
