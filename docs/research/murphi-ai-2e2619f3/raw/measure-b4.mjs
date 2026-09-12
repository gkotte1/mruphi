import { chromium } from 'playwright-core';
import fs from 'fs';

const PAGES = ['integration', 'white-labeling', 'security', 'about-us'];
const SEL = {
  'about-us': ['.about-hero', '.about-hero h1', '.about-hero-body', '.ps', '.ps-alt', '.ps-dark',
    '.sec-tag', '.stagd', '.intro-grid', '.intro-h', '.why-body', '.why-body p',
    '.diff-grid', '.diff-card', '.diff-card-title', '.vm-grid', '.vm-card', '.vm-label', '.vm-title', '.vm-body',
    '.val-grid', '.val-card', '.val-card-ico', '.val-card-title', '.val-card-body',
    '.team-grid', '.team-card', '.team-av-photo', '.team-name', '.team-title', '.team-card a'],
  security: ['.page-hero', '.page-hero h1', '.hero-cert-row', '.hero-cert', '.hero-cert img',
    '.hero-cert-title', '.hero-cert-sub', '.ps', '.ps-alt', '.sh', '.sl',
    '.sec-grid-3', '.sec-grid-2', '.cert-card', '.cert-ico', '.cert-title', '.cert-desc',
    '.sec-card', '.sec-card-ico', '.sec-card-title', '.sec-card-desc', '.processor-table', '.processor-table th', '.processor-table td'],
  integration: ['.page-hero', '.page-section', '.page-section-alt', '.sh', '.sl', '.sec-tag',
    '.int-method', '.int-method-title', '.int-method-desc', '.int-icon', '.tag-cloud', '.tag-cloud span',
    '.feature-card', '.feature-card-title', '.feature-card-desc'],
  'white-labeling': ['.page-hero', '.page-hero-left', '.hero-status-card', '.sec-grey', '.sec-white',
    '.sh', '.sl', '.sec-tag', '.feature-card', '.int-method', '.int-icon', '.related-grid', '.related-card'],
};
const PROPS = ['display', 'fontSize', 'fontWeight', 'lineHeight', 'color', 'backgroundColor', 'letterSpacing',
  'textTransform', 'padding', 'margin', 'borderRadius', 'borderWidth', 'borderColor', 'borderStyle',
  'gridTemplateColumns', 'gap', 'maxWidth', 'textAlign', 'width', 'height'];

const b = await chromium.launch({ channel: 'chrome' });
const out = {};
for (const w of [1440, 900, 600]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 1000 } });
  for (const p of PAGES) {
    const pg = await ctx.newPage();
    await pg.goto('https://murphi.ai/' + p + '/', { waitUntil: 'load', timeout: 90000 });
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
      // top-level band heights
      const host = document.querySelector('.about-hero, .page-hero')?.parentElement;
      res._bands = host ? [...host.children].map(c => ({
        cls: c.className.toString().slice(0, 40), h: Math.round(c.getBoundingClientRect().height),
      })) : [];
      res._doc = Math.round(document.documentElement.getBoundingClientRect().height);
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
fs.mkdirSync('b4', { recursive: true });
fs.writeFileSync('b4/measure.json', JSON.stringify(out, null, 1));
console.log('saved b4/measure.json');
