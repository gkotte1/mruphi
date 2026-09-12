import { chromium } from 'playwright-core';
const slug = process.argv[2];
const b = await chromium.launch({ channel: 'chrome' });
const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
const rows = [];
for (const [tag, url, sel] of [
  ['live', 'https://murphi.ai/' + slug + '/', '.elementor-widget-theme-post-content .elementor-widget-container'],
  ['clone', 'http://localhost:3000/' + slug + '/', '[data-article-body]'],
]) {
  const pg = await ctx.newPage();
  await pg.goto(url, { waitUntil: 'load', timeout: 120000 });
  await pg.waitForTimeout(tag === 'clone' ? 900 : 2800);
  rows.push(await pg.evaluate((s) => {
    const root = document.querySelector(s);
    if (!root) return [{ tag: 'MISSING', h: 0, txt: s }];
    const kids = [...root.children].flatMap((el) => (el.tagName === 'DIV' && el.children.length === 1 ? [el.firstElementChild] : [el]));
    return kids.map((el) => ({
      tag: el.tagName.toLowerCase(),
      h: Math.round(el.getBoundingClientRect().height * 10) / 10,
      m: getComputedStyle(el).margin,
      txt: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 34),
    }));
  }, sel));
  await pg.close();
}
const [L, C] = rows;
console.log('live blocks', L.length, '| clone blocks', C.length);
let ld = 0, cd = 0;
const n = Math.max(L.length, C.length);
for (let i = 0; i < n; i++) {
  const a = L[i], c = C[i];
  const same = a && c && a.tag === c.tag && Math.abs(a.h - c.h) < 0.6;
  if (a) ld += a.h; if (c) cd += c.h;
  if (!same) {
    console.log(String(i).padStart(3) + ' ≠ ' +
      (a ? `${a.tag} h${a.h} m[${a.m}] "${a.txt}"` : '—').padEnd(72) + ' | ' +
      (c ? `${c.tag} h${c.h} m[${c.m}] "${c.txt}"` : '—'));
  }
}
console.log('sum live', Math.round(ld), 'clone', Math.round(cd));
await b.close();
