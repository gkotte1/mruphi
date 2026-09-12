import { chromium } from 'playwright-core';
const PAGES = process.argv.slice(3).length ? process.argv.slice(3) : ['blogs/', 'announcements/'];
const WIDTHS = process.argv[2] ? [Number(process.argv[2])] : [1440, 900, 600];
const b = await chromium.launch({ channel: 'chrome' });
for (const w of WIDTHS) {
  const ctx = await b.newContext({ viewport: { width: w, height: 1000 } });
  console.log('\n══════════ ' + w + 'px');
  for (const u of PAGES) {
    const out = [];
    for (const base of ['https://murphi.ai/', 'http://localhost:3000/']) {
      const pg = await ctx.newPage();
      await pg.goto(base + u, { waitUntil: 'load', timeout: 120000 });
      await pg.waitForTimeout(base.includes('localhost') ? 700 : 2700);
      out.push(await pg.evaluate(() => {
        const h = (s) => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().height * 10) / 10 : null; };
        return { doc: Math.round(document.body.scrollHeight), hero: h('.murphi-blog-hero,.murphi-ann-hero,main > section'), art: h('article'), foot: h('footer'), n: document.querySelectorAll('article').length };
      }));
      await pg.close();
    }
    const [L, C] = out;
    console.log(`  ${u.padEnd(16)} doc ${String(L.doc).padStart(6)} → ${String(C.doc).padStart(6)}  Δ${String(C.doc - L.doc).padStart(5)}   hero ${L.hero}→${C.hero}  card ${L.art}→${C.art}  n ${L.n}→${C.n}`);
  }
  await ctx.close();
}
await b.close();
