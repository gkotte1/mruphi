import { chromium } from 'playwright-core';
import fs from 'fs';
const all = fs.readFileSync(process.argv[2], 'utf8').trim().split('\n');
const step = Math.max(1, Math.floor(all.length / Number(process.argv[3] || 24)));
const slugs = all.filter((_, i) => i % step === 0);
const b = await chromium.launch({ channel: 'chrome' });
const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
const bad = [];
for (const slug of slugs) {
  const h = [];
  for (const url of ['https://murphi.ai/' + slug + '/', 'http://localhost:3000/' + slug + '/']) {
    const pg = await ctx.newPage();
    try {
      await pg.goto(url, { waitUntil: 'load', timeout: 90000 });
      await pg.waitForTimeout(url.includes('localhost') ? 700 : 2300);
      h.push(await pg.evaluate(() => Math.round(document.body.scrollHeight)));
    } catch { h.push(null); }
    await pg.close();
  }
  const d = h[0] && h[1] ? h[1] - h[0] : null;
  const flag = d === -20 ? ' ' : '≠';
  console.log(`${flag} ${slug.slice(0, 52).padEnd(54)} ${String(h[0]).padStart(6)} → ${String(h[1]).padStart(6)}  Δ${d}`);
  if (d !== -20) bad.push({ slug, d });
}
console.log('\nchecked', slugs.length, '| off-baseline', bad.length);
await b.close();
