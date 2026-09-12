import { chromium } from 'playwright-core';

/** Managed-care specifics: contract analyzer evidence panel, note save, drawer. */
const b = await chromium.launch({ channel: 'chrome' });
const pg = await (await b.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
const errs = [];
pg.on('pageerror', (e) => errs.push(String(e).slice(0, 140)));
await pg.goto('http://localhost:3000/ai-for-managed-care-functions-health-system-and-hospitals/', { waitUntil: 'load', timeout: 90000 });
await pg.waitForTimeout(1200);

const rows = await pg.$$('main [role="button"]');
await rows[0].click();
await pg.waitForTimeout(300);
console.log('evidence:', await pg.evaluate(() => {
  const t = document.querySelector('textarea');
  const hl = [...document.querySelectorAll('span')].filter((s) => getComputedStyle(s).backgroundColor === 'rgb(254, 240, 138)').length;
  return `textarea=${!!t} highlights=${hl} note=${t ? JSON.stringify(t.value.slice(0, 24)) : '-'}`;
}));

const save = await pg.$('main button:has-text("Save Note")');
if (save) {
  await save.click();
  await pg.waitForTimeout(200);
  console.log('after save:', await pg.evaluate(() => [...document.querySelectorAll('main button')].map((x) => x.textContent.trim()).filter((t) => /^Save/.test(t)).join('|')));
}

const cards = await pg.$$('main section:nth-of-type(7) [role="button"]');
if (cards[0]) {
  await cards[0].click();
  await pg.waitForTimeout(450);
  console.log('drawer:', await pg.evaluate(() => {
    const d = document.querySelector('[role="dialog"]');
    return `open=${!d.className.includes('translate-x-full')} title=${JSON.stringify(d.querySelector('.font-extrabold')?.textContent?.trim() || '')} steps=${d.querySelectorAll('.size-\\[22px\\]').length} chips=${d.querySelectorAll('.bg-\\[\\#F1F5F9\\]').length} lock=${document.body.style.overflow === 'hidden'}`;
  }));
}
await pg.keyboard.press('Escape');
await pg.waitForTimeout(350);
console.log('after esc, body overflow:', JSON.stringify(await pg.evaluate(() => document.body.style.overflow)));
console.log(errs.length ? 'ERRORS ' + errs.join(' | ') : 'no page errors');
await b.close();
