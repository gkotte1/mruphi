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
    let n = document.querySelector(s);
    while (n && n.children.length === 1 && n.firstElementChild.tagName === 'DIV') n = n.firstElementChild;
    const kids = [...n.children].flatMap((el) => (el.tagName === 'DIV' && el.children.length === 1 ? [el.firstElementChild] : [el]));
    return kids.map((el) => ({ tag: el.tagName.toLowerCase(), h: Math.round(el.getBoundingClientRect().height * 10) / 10, w: Math.round(el.getBoundingClientRect().width), txt: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 30) }));
  }, sel));
  await pg.close();
}
const [L, C] = rows;
console.log('live', L.length, 'clone', C.length, '| sums', Math.round(L.reduce((a, x) => a + x.h, 0)), Math.round(C.reduce((a, x) => a + x.h, 0)));
let shown = 0;
for (let i = 0; i < Math.max(L.length, C.length) && shown < 12; i++) {
  const a = L[i], c = C[i];
  if (a && c && a.tag === c.tag && Math.abs(a.h - c.h) < 0.6) continue;
  shown++;
  console.log(String(i).padStart(3) + ' ' + (a ? `${a.tag} h${a.h} w${a.w} "${a.txt}"` : '—').padEnd(60) + ' | ' + (c ? `${c.tag} h${c.h} w${c.w} "${c.txt}"` : '—'));
}
await b.close();
