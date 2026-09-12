import { chromium } from 'playwright-core';
import fs from 'fs';
const SLUGS = ['autonomous-medical-coding-vs-cac', 'ehr-interoperability-reduce-administrative-burden'];
const b = await chromium.launch({ channel: 'chrome' });
const out = {};
for (const w of [1440, 900, 600]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 1000 } });
  for (const slug of SLUGS) {
    const pg = await ctx.newPage();
    await pg.goto('https://murphi.ai/' + slug + '/', { waitUntil: 'load', timeout: 120000 });
    await pg.waitForTimeout(2600);
    out[w] ??= {};
    out[w][slug] = await pg.evaluate(() => {
      const box = (sel, root = document) => {
        const e = root.querySelector(sel);
        if (!e) return null;
        const c = getComputedStyle(e), r = e.getBoundingClientRect();
        return { w: Math.round(r.width * 10) / 10, h: Math.round(r.height * 10) / 10, x: Math.round(r.x), fs: c.fontSize, fw: c.fontWeight, lh: c.lineHeight, color: c.color, m: c.margin, p: c.padding, ta: c.textAlign, disp: c.display, mw: c.maxWidth, gap: c.gap, bg: c.backgroundColor, bd: c.borderWidth + ' ' + c.borderColor };
      };
      const content = '.elementor-widget-theme-post-content ';
      return {
        outer: box('.elementor-location-single > .e-con'),
        inner: box('.e-con-inner'),
        col: box('.e-con-inner > .e-con'),
        imgWrap: box('.elementor-widget-image'),
        img: box('.elementor-widget-image img'),
        titleWrap: box('.jkit-post-title'),
        title: box('.jkit-post-title h2'),
        contentWrap: box('.elementor-widget-theme-post-content'),
        h2: box(content + 'h2'),
        h3: box(content + 'h3'),
        h4: box(content + 'h4'),
        p: box(content + 'p'),
        ul: box(content + 'ul'),
        ol: box(content + 'ol'),
        li: box(content + 'li'),
        table: box(content + 'table'),
        th: box(content + 'th'),
        td: box(content + 'td'),
        a: box(content + 'a'),
        b: box(content + 'b'),
        doc: Math.round(document.body.scrollHeight),
      };
    });
    await pg.close();
    console.log(w, slug, out[w][slug].doc);
  }
  await ctx.close();
}
await b.close();
fs.writeFileSync('b8/measure.json', JSON.stringify(out, null, 1));
console.log('saved');
