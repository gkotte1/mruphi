import { chromium } from 'playwright-core';

/** Doc-height diff for the deferred pages: live vs the local build. */
const ALL = [
  'download-old-app', 'murphi-xpress-video',
  'white-label-partner-program', 'ehr-ai-integration-platform',
  'ai-for-managed-care-functions-health-system-and-hospitals',
  'primary-and-speciality-care-embed-into-ehr',
  'embed-ai-into-ehr-workflows-mental-and-behavioural-health',
  'public-health-and-corrections-embed-ai-into-ehr-workflows',
];
const slugs = process.argv.slice(3).length ? process.argv.slice(3) : ALL;
const widths = process.argv[2] ? [Number(process.argv[2])] : [1440, 900, 600];

const b = await chromium.launch({ channel: 'chrome' });
for (const w of widths) {
  const ctx = await b.newContext({ viewport: { width: w, height: 1000 } });
  console.log('══════════ ' + w + 'px');
  for (const s of slugs) {
    const h = [];
    for (const base of ['https://murphi.ai/', 'http://localhost:3000/']) {
      const pg = await ctx.newPage();
      try {
        await pg.goto(base + s + '/', { waitUntil: 'load', timeout: 90000 });
        await pg.waitForTimeout(base.includes('localhost') ? 900 : 2600);
        h.push(await pg.evaluate(() => Math.round(document.body.scrollHeight)));
      } catch {
        h.push(null);
      }
      await pg.close();
    }
    const d = h[0] && h[1] ? h[1] - h[0] : null;
    console.log('  ' + s.slice(0, 54).padEnd(56) + String(h[0]).padStart(6) + ' → ' + String(h[1]).padStart(6) + '  Δ' + d);
  }
  await ctx.close();
}
await b.close();
