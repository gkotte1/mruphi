import { chromium } from 'playwright-core';
import fs from 'fs';

/**
 * Walks /blogs/page/N/ until a page comes back empty and records the exact
 * post order the live grid uses — the widget's own page count is unreliable,
 * so the result set is discovered rather than computed.
 */
const b = await chromium.launch({ channel: 'chrome' });
const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
const seen = [];
const pages = [];
for (let n = 1; n <= 40; n++) {
  const pg = await ctx.newPage();
  const url = 'https://murphi.ai/blogs/' + (n > 1 ? 'page/' + n + '/' : '');
  await pg.goto(url, { waitUntil: 'load', timeout: 120000 });
  await pg.waitForTimeout(1400);
  const items = await pg.evaluate(() => [...document.querySelectorAll('.rtsb-post-grid-item')].map((el) => ({
    href: el.querySelector('.rtsb-title-link')?.getAttribute('href'),
    title: el.querySelector('.rtsb-title-link')?.textContent.trim(),
    cat: el.querySelector('.rtsb-tax-item a')?.textContent.trim(),
    catHref: el.querySelector('.rtsb-tax-item a')?.getAttribute('href'),
    date: el.querySelector('time')?.getAttribute('datetime'),
    author: el.querySelector('.byline a')?.textContent.trim(),
    img: el.querySelector('img')?.getAttribute('src'),
  })));
  await pg.close();
  pages.push({ n, count: items.length });
  if (!items.length) { console.log('page', n, 'empty — stopping'); break; }
  seen.push(...items);
  console.log('page', n, items.length, '|', items[0].title.slice(0, 46));
}
await ctx.close();
await b.close();
const uniq = [...new Map(seen.map((x) => [x.href, x])).values()];
fs.writeFileSync('b7/blogs-order.json', JSON.stringify({ pages, items: uniq }, null, 1));
console.log('total scraped', seen.length, 'unique', uniq.length);
const cats = {};
uniq.forEach((x) => { cats[x.cat] = (cats[x.cat] || 0) + 1; });
console.log(JSON.stringify(cats, null, 1));
