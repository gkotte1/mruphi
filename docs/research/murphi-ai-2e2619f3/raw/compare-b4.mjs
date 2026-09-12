import { chromium } from 'playwright-core';
import fs from 'fs';

/**
 * Measures the clone's band heights the same way measure-b4.mjs measured the
 * live pages, and prints a per-band diff. Height deltas are the reliable way
 * to catch dropped content — a section that renders but is 60px short is
 * missing a child.
 */

const PAGES = ['integration', 'white-labeling', 'security', 'about-us'];
const live = JSON.parse(fs.readFileSync('b4/measure.json', 'utf8'));
const WIDTHS = process.argv[2] ? [Number(process.argv[2])] : [1440, 900, 600];

const b = await chromium.launch({ channel: 'chrome' });
for (const w of WIDTHS) {
  const ctx = await b.newContext({ viewport: { width: w, height: 1000 } });
  console.log('\n══════════ ' + w + 'px');
  for (const p of PAGES) {
    const pg = await ctx.newPage();
    await pg.goto('http://localhost:3000/' + p + '/', { waitUntil: 'load' });
    await pg.waitForTimeout(600);
    const r = await pg.evaluate(() => {
      const main = document.querySelector('main');
      return {
        bands: [...main.children].map((c) => Math.round(c.getBoundingClientRect().height)),
        doc: Math.round(document.documentElement.getBoundingClientRect().height),
      };
    });
    const lb = live[w][p]._bands.map((x) => x.h);
    const ld = live[w][p]._doc;
    const rows = Math.max(lb.length, r.bands.length);
    const bad = [];
    for (let i = 0; i < rows; i++) {
      const a = lb[i] ?? null;
      const c = r.bands[i] ?? null;
      if (a !== c) bad.push(`    band ${i}: live ${a} clone ${c} Δ${c - a}`);
    }
    console.log(`  ${p.padEnd(16)} doc live ${ld} clone ${r.doc} Δ${r.doc - ld}` +
      (bad.length ? '  — ' + bad.length + '/' + rows + ' bands differ' : '  — all bands exact'));
    bad.forEach((x) => console.log(x));
    await pg.close();
  }
  await ctx.close();
}
await b.close();
