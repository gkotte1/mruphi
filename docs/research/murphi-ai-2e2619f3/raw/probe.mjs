import { chromium } from 'playwright-core';
const [slug, liveSel, cloneSel] = process.argv.slice(2);
const b = await chromium.launch({ channel: 'chrome' });
const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
for (const [tag, url, sel] of [
  ['live', 'https://murphi.ai/' + slug + '/', liveSel],
  ['clone', 'http://localhost:3000/' + slug + '/', cloneSel],
]) {
  const pg = await ctx.newPage();
  await pg.goto(url, { waitUntil: 'load', timeout: 120000 });
  await pg.waitForTimeout(tag === 'clone' ? 1500 : 2800);
  console.log(tag, await pg.evaluate((s) => {
    const e = document.querySelector(s);
    if (!e) return 'MISSING ' + s;
    const c = getComputedStyle(e);
    const probe = document.createElement('span');
    probe.style.cssText = 'position:absolute;left:-9999px;white-space:pre';
    probe.style.font = c.font;
    probe.style.letterSpacing = c.letterSpacing;
    probe.textContent = e.textContent.trim();
    document.body.appendChild(probe);
    const w = probe.getBoundingClientRect().width;
    probe.remove();
    return `w${Math.round(w * 10) / 10} box${Math.round(e.getBoundingClientRect().width)} ff[${c.fontFamily.slice(0, 44)}] ${c.fontSize}/${c.lineHeight}`;
  }, sel));
  await pg.close();
}
await b.close();
