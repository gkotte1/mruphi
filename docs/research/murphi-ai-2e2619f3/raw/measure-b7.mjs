import { chromium } from 'playwright-core';
import fs from 'fs';

const SEL = {
  blogs: ['.page-hero', '.page-hero-tag', '.page-hero h1', '.page-hero-sub', '.page-hero p',
    '.rtsb-elementor-container', '.rtsb-row', '.rtsb-col-grid', '.rtsb-post-grid-item', 'article',
    '.rtsb-post-img', '.rtsb-post-img img', '.rtsb-post-content', '.rtsb-post-taxonomy-list',
    '.rtsb-tax-item', '.rtsb-tax-item a', '.rtsb-post-title', '.rtsb-title-link',
    '.rtsb-post-meta', '.rtsb-meta-item.author', '.rtsb-meta-item.date', '.rtsb-post-excerpt',
    '.rtsb-button-wrapper', '.rtsb-readmore-btn', '.rtsb-pagination', '.rtsb-pagination a', '.rtsb-pagination .current'],
};
SEL.announcements = ['.page-hero', '.page-hero-tag', '.page-hero h1', '.page-hero-sub', '.page-hero p',
  '.rtsb-elementor-container', '.rtsb-row', '.rtsb-col-grid', '.rtsb-post-list-item', 'article',
  '.rtsb-post-img', '.rtsb-post-img img', '.rtsb-post-content', '.rtsb-tax-item a',
  '.rtsb-post-title', '.rtsb-title-link', '.rtsb-post-meta', '.rtsb-meta-item.date',
  '.rtsb-button-wrapper', '.rtsb-readmore-btn'];

const PROPS = ['display', 'fontSize', 'fontWeight', 'lineHeight', 'color', 'backgroundColor', 'letterSpacing',
  'textTransform', 'padding', 'margin', 'borderRadius', 'borderWidth', 'borderColor', 'borderStyle',
  'gridTemplateColumns', 'gap', 'maxWidth', 'textAlign', 'width', 'height', 'boxShadow', 'objectFit', 'aspectRatio'];

const b = await chromium.launch({ channel: 'chrome' });
const out = {};
for (const w of [1440, 900, 600]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 1000 } });
  for (const p of Object.keys(SEL)) {
    const pg = await ctx.newPage();
    await pg.goto('https://murphi.ai/' + p + '/', { waitUntil: 'load', timeout: 120000 });
    await pg.waitForTimeout(2600);
    const r = await pg.evaluate(([sels, props]) => {
      const res = {};
      for (const s of sels) {
        const el = document.querySelector(s);
        if (!el) { res[s] = null; continue; }
        const cs = getComputedStyle(el), bb = el.getBoundingClientRect();
        const o = { _n: document.querySelectorAll(s).length, _w: Math.round(bb.width * 10) / 10, _h: Math.round(bb.height * 10) / 10 };
        for (const k of props) o[k] = cs[k];
        res[s] = o;
      }
      const hero = document.querySelector('.page-hero');
      res._bands = hero ? [...hero.parentElement.children].map((c) => ({
        cls: c.className.toString().slice(0, 40), h: Math.round(c.getBoundingClientRect().height),
      })) : [];
      res._doc = Math.round(document.body.scrollHeight);
      return res;
    }, [SEL[p], PROPS]);
    out[w] ??= {};
    out[w][p] = r;
    await pg.close();
    console.log(w, p, 'doc', r._doc);
  }
  await ctx.close();
}
await b.close();
fs.mkdirSync('b7', { recursive: true });
fs.writeFileSync('b7/measure.json', JSON.stringify(out, null, 1));
console.log('saved');
