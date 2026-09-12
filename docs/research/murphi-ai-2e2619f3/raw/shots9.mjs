import { chromium } from 'playwright-core';
import fs from 'fs';

/** Side-by-side viewport captures of the deferred pages, live vs clone. */
const SLUGS = process.argv.slice(3);
const width = Number(process.argv[2] || 1440);
fs.mkdirSync('b9/shots', { recursive: true });

const b = await chromium.launch({ channel: 'chrome' });
const ctx = await b.newContext({ viewport: { width, height: 1400 } });
for (const slug of SLUGS) {
  for (const [tag, url] of [['live', 'https://murphi.ai/'], ['clone', 'http://localhost:3000/']]) {
    const pg = await ctx.newPage();
    await pg.goto(url + slug + '/', { waitUntil: 'load', timeout: 120000 });
    await pg.waitForTimeout(tag === 'clone' ? 1200 : 2800);
    await pg.evaluate(() => window.scrollTo(0, 0));
    await pg.screenshot({ path: `b9/shots/${slug.slice(0, 24)}-${width}-${tag}.png` });
    await pg.close();
  }
  console.log('shot', slug, width);
}
await b.close();
