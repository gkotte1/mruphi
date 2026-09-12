import { chromium } from 'playwright-core';

/**
 * The utility pages nest their sections differently from the earlier waves, so
 * this compares the whole document height plus a handful of landmark boxes.
 */
const PAGES = process.argv.slice(3).length ? process.argv.slice(3)
  : ['faqs', 'support-ticket', 'download-app', 'privacy-policy', 'terms-of-service', 'ai-terms'];
const WIDTHS = process.argv[2] ? [Number(process.argv[2])] : [1440, 900, 600];

const probe = () => {
  const h = (s) => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().height) : null; };
  const main = document.querySelector('main');
  return {
    doc: Math.round(document.body.scrollHeight),
    bands: main ? [...main.children].map((c) => Math.round(c.getBoundingClientRect().height)) : null,
    hero: h('.page-hero') ?? h('section') ?? null,
    footer: h('footer'),
  };
};
const liveProbe = () => {
  const h = (s) => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().height) : null; };
  return { doc: Math.round(document.body.scrollHeight), bands: null, hero: h('.page-hero'), footer: h('footer') };
};

const b = await chromium.launch({ channel: 'chrome' });
for (const w of WIDTHS) {
  const ctx = await b.newContext({ viewport: { width: w, height: 1000 } });
  console.log('\n══════════ ' + w + 'px');
  for (const p of PAGES) {
    const out = [];
    for (const [tag, base, fn] of [['live', 'https://murphi.ai/', liveProbe], ['clone', 'http://localhost:3000/', probe]]) {
      const pg = await ctx.newPage();
      await pg.goto(base + p + '/', { waitUntil: 'load', timeout: 120000 });
      await pg.waitForTimeout(tag === 'clone' ? 600 : 2500);
      out.push(await pg.evaluate(fn));
      await pg.close();
      void tag;
    }
    const [L, C] = out;
    console.log(`  ${p.padEnd(18)} doc ${String(L.doc).padStart(6)} → ${String(C.doc).padStart(6)}  Δ${String(C.doc - L.doc).padStart(5)}` +
      `   hero ${L.hero}→${C.hero}  footer ${L.footer}→${C.footer}`);
  }
  await ctx.close();
}
await b.close();
