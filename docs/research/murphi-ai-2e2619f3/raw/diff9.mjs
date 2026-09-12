import { chromium } from 'playwright-core';

/**
 * Section-level diff for the deferred landing pages: walks the top-level
 * sections of the live page and of the clone's <main>, side by side.
 */
const slug = process.argv[2];
const width = Number(process.argv[3] || 1440);
const depth = Number(process.argv[4] || 1);

const b = await chromium.launch({ channel: 'chrome' });
const ctx = await b.newContext({ viewport: { width, height: 1000 } });
const rows = [];
for (const [tag, url, sel] of [
  ['live', 'https://murphi.ai/' + slug + '/', '.elementor-widget-container > *:not(style):not(script)'],
  ['clone', 'http://localhost:3000/' + slug + '/', 'main > div > *'],
]) {
  const pg = await ctx.newPage();
  await pg.goto(url, { waitUntil: 'load', timeout: 120000 });
  await pg.waitForTimeout(tag === 'clone' ? 900 : 2800);
  rows.push(await pg.evaluate(([s, d]) => {
    let nodes = [...document.querySelectorAll(s)].filter((e) => e.getBoundingClientRect().height > 0);
    // Only the page's own body sections, not the header/footer widgets.
    nodes = nodes.filter((e) => !e.closest('footer') && !e.closest('header'));
    const out = [];
    const rec = (el, lvl) => {
      const r = el.getBoundingClientRect();
      if (r.height < 1) return;
      const cls = String(el.className).replace(/elementor-element-\w+/g, '').replace(/\s+/g, ' ').trim().slice(0, 30);
      out.push({ lvl, tag: el.tagName.toLowerCase(), cls, h: Math.round(r.height * 10) / 10, w: Math.round(r.width) });
      if (lvl < d) for (const k of el.children) rec(k, lvl + 1);
    };
    for (const n of nodes) rec(n, 0);
    return out;
  }, [sel, depth]));
  await pg.close();
}
const [L, C] = rows;
console.log(`live ${L.length} nodes | clone ${C.length} nodes`);
const n = Math.max(L.length, C.length);
for (let i = 0; i < n; i++) {
  const a = L[i], c = C[i];
  const same = a && c && Math.abs(a.h - c.h) < 1;
  const f = (x) => (x ? '  '.repeat(x.lvl) + x.tag + '.' + x.cls + ' ' + x.w + 'x' + x.h : '—');
  console.log((same ? '  ' : '≠ ') + f(a).padEnd(58) + ' | ' + f(c));
}
console.log('sums  live', Math.round(L.filter((x) => x.lvl === 0).reduce((s, x) => s + x.h, 0)),
  ' clone', Math.round(C.filter((x) => x.lvl === 0).reduce((s, x) => s + x.h, 0)));
await b.close();
