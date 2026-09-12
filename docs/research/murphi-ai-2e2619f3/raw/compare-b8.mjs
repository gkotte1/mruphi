import { chromium } from 'playwright-core';
const SLUGS = process.argv.slice(3).length ? process.argv.slice(3) : [
  'autonomous-medical-coding-vs-cac',
  'ehr-interoperability-reduce-administrative-burden',
  'murphi-ai-wins-bronze-stevie-award-at-the-2026-american-business-awards',
  'how-hipaa-compliant-payment-solutions-protect-patient-privacy',
];
const WIDTHS = process.argv[2] ? [Number(process.argv[2])] : [1440, 900, 600];
const b = await chromium.launch({ channel: 'chrome' });
for (const w of WIDTHS) {
  const ctx = await b.newContext({ viewport: { width: w, height: 1000 } });
  console.log('\n══════════ ' + w + 'px');
  for (const slug of SLUGS) {
    const out = [];
    for (const url of ['https://murphi.ai/' + slug + '/', 'http://localhost:3000/' + slug + '/']) {
      const pg = await ctx.newPage();
      await pg.goto(url, { waitUntil: 'load', timeout: 120000 });
      await pg.waitForTimeout(url.includes('localhost') ? 900 : 2800);
      out.push(await pg.evaluate(() => {
        const h = (sel) => { const e = document.querySelector(sel); return e ? Math.round(e.getBoundingClientRect().height * 10) / 10 : null; };
        const live = document.querySelector('.elementor-widget-theme-post-content');
        const clone = document.querySelector('main .mt-10');
        const body = live ?? (clone && clone.querySelector('div > div:last-child'));
        return {
          doc: Math.round(document.body.scrollHeight),
          hero: h('.elementor-widget-image img') ?? h('main img'),
          title: h('.jkit-post-title h2') ?? h('main h1'),
          body: body ? Math.round(body.getBoundingClientRect().height * 10) / 10 : null,
          foot: h('footer'),
        };
      }));
      await pg.close();
    }
    const [L, C] = out;
    console.log(`  ${slug.slice(0, 40).padEnd(42)} doc ${String(L.doc).padStart(6)} → ${String(C.doc).padStart(6)}  Δ${String(C.doc - L.doc).padStart(5)}  | hero ${L.hero}→${C.hero} title ${L.title}→${C.title} body ${L.body}→${C.body}`);
  }
  await ctx.close();
}
await b.close();
