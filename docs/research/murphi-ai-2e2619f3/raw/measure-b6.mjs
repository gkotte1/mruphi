import { chromium } from 'playwright-core';
import fs from 'fs';

const PAGES = ['faqs', 'support-ticket', 'download-app', 'privacy-policy', 'terms-of-service', 'ai-terms'];
const SEL = {
  faqs: ['.page-hero', '.page-hero h1', '.page-hero-sub', '.faq-body', '.faq-cat', '.faq-cat-label',
    '.faq-item', '.faq-btn', '.faq-q-text', '.faq-plus', '.faq-ans', '.faq-ans-inner',
    '.faq-still', '.faq-still h3', '.faq-still p', '.faq-still-btns', '.faq-still-btns a'],
  'support-ticket': ['.page-hero', '.page-hero h1', '.page-hero-sub', '.ps-alt', '.ps', '.grid-container',
    '.grid-container > div', '.form-control', 'textarea.form-control', 'label', '.btn-blue', 'form'],
  'download-app': ['.page-hero', '.page-hero h1', '.page-hero-sub', '.page-section', '.page-section-alt',
    '.sh', '.sl', '.sec-tag', '.three-col', '.app-download-card', '.app-download-card img',
    '.int-method-title', '.app-download-card p', '.app-download-card a',
    '.feature-grid', '.feature-card', '.feature-card-ico', '.feature-card-title', '.feature-card-desc'],
  'privacy-policy': ['.page-hero', '.page-hero h1', '.page-hero p', '.elementor-widget-text-editor',
    '.elementor-widget-text-editor h6', '.elementor-widget-text-editor p',
    '.eael-adv-accordion', '.eael-accordion-header', '.eael-accordion-tab-title', '.eael-accordion-content',
    '.e-con-inner', '.elementor-element-3def06a'],
};
SEL['terms-of-service'] = SEL['privacy-policy'];
SEL['ai-terms'] = SEL['privacy-policy'];
const PROPS = ['display', 'fontSize', 'fontWeight', 'lineHeight', 'color', 'backgroundColor', 'letterSpacing',
  'textTransform', 'padding', 'margin', 'borderRadius', 'borderWidth', 'borderColor', 'borderStyle',
  'gridTemplateColumns', 'gap', 'maxWidth', 'textAlign', 'width', 'height', 'fontFamily'];

const b = await chromium.launch({ channel: 'chrome' });
const out = {};
for (const w of [1440, 900, 600]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 1000 } });
  for (const p of PAGES) {
    const pg = await ctx.newPage();
    await pg.goto('https://murphi.ai/' + p + '/', { waitUntil: 'load', timeout: 120000 });
    await pg.waitForTimeout(2500);
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
      const host = document.querySelector('.page-hero')?.parentElement;
      res._bands = host ? [...host.children].map((c) => ({
        cls: c.className.toString().slice(0, 40), h: Math.round(c.getBoundingClientRect().height),
      })) : [];
      res._doc = Math.round(document.body.scrollHeight);
      return res;
    }, [SEL[p], PROPS]);
    out[w] ??= {};
    out[w][p] = r;
    await pg.close();
    console.log(w, p, 'doc', r._doc, 'bands', r._bands.length);
  }
  await ctx.close();
}
await b.close();
fs.mkdirSync('b6', { recursive: true });
fs.writeFileSync('b6/measure.json', JSON.stringify(out, null, 1));
console.log('saved');
