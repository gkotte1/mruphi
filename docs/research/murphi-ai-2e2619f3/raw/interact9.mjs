import { chromium } from 'playwright-core';

/**
 * Exercise the explorer/drawer interactions on the deferred landing pages:
 * click a filter, click a card, confirm the drawer opens with the card's own
 * title, then close it and confirm the page unlocks.
 */
const CASES = [
  { slug: 'ehr-ai-integration-platform', card: '[role="button"].cursor-pointer', tab: 1, filter: 1 },
  { slug: 'ai-for-managed-care-functions-health-system-and-hospitals', card: '.cursor-pointer[role="button"]', tab: 1, filter: null },
  { slug: 'embed-ai-into-ehr-workflows-mental-and-behavioural-health', card: '[role="button"].cursor-pointer', tab: 1, filter: 1 },
  { slug: 'public-health-and-corrections-embed-ai-into-ehr-workflows', card: '[role="button"].cursor-pointer', tab: 1, filter: 1 },
  { slug: 'primary-and-speciality-care-embed-into-ehr', card: '[role="button"].cursor-pointer', tab: 1, filter: 1 },
];

const b = await chromium.launch({ channel: 'chrome' });
const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
for (const c of CASES) {
  const pg = await ctx.newPage();
  const errors = [];
  pg.on('pageerror', (e) => errors.push(String(e).slice(0, 120)));
  await pg.goto('http://localhost:3000/' + c.slug + '/', { waitUntil: 'load', timeout: 90000 });
  await pg.waitForTimeout(1200);

  const buttons = await pg.$$('main button');
  const before = await pg.$$eval('main [role="button"]', (n) => n.length);

  // click the second tab-ish control, then the second filter
  if (buttons[c.tab]) { await buttons[c.tab].click(); await pg.waitForTimeout(350); }
  const afterTab = await pg.$$eval('main [role="button"]', (n) => n.length);

  const card = (await pg.$$(c.card))[0];
  let drawer = 'no card';
  if (card) {
    const title = await card.evaluate((n) => (n.querySelector("div > div > div")?.textContent ?? n.textContent).trim());
    await card.click();
    await pg.waitForTimeout(450);
    const shown = await pg.$eval('[role="dialog"]', (d) => ({
      open: !d.className.includes('translate-x-full'),
      title: d.querySelector('.text-\\[17px\\]')?.textContent?.trim() ?? '',
      locked: document.body.style.overflow === 'hidden',
    }));
    await pg.keyboard.press('Escape');
    await pg.waitForTimeout(400);
    const closed = await pg.$eval('[role="dialog"]', () => document.body.style.overflow !== 'hidden');
    drawer = `open=${shown.open} match=${shown.title === title} lock=${shown.locked} unlock=${closed}`;
    if (shown.title !== title) drawer += ` (${JSON.stringify(title)} vs ${JSON.stringify(shown.title)})`;
  }
  console.log(c.slug.slice(0, 40).padEnd(42), `cards ${before}→${afterTab} | drawer ${drawer}` + (errors.length ? ` | ERRORS ${errors.join('; ')}` : ''));
  await pg.close();
}
await b.close();
