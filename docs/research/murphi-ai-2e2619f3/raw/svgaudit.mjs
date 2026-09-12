import fs from 'fs';

/**
 * Guard against dropped glyphs: every distinct `<svg>` in a page's own markup
 * must appear among the icons captured from that markup. Reports the context
 * of any that do not, so a miss points straight at the slot that lost it.
 */
const CASES = [
  ['ehr-ai-integration-platform', 'ehr-icons.json', '<section class="hero">'],
  ['ai-for-managed-care-functions-health-system-and-hospitals', 'mc-icons.json', '<section class="hero">'],
  ['embed-ai-into-ehr-workflows-mental-and-behavioural-health', 'mh-icons.json', '<section class="hero">'],
  ['public-health-and-corrections-embed-ai-into-ehr-workflows', 'ph-icons.json', '<div class="murphi-embed-root">'],
  ['primary-and-speciality-care-embed-into-ehr', 'pc-icons.json', '<section class="hero">'],
  ['white-label-partner-program', 'wlpp-cards', '<section class="hero"'],
];
const norm = (s) => s.replace(/\s+/g, ' ').replace(/'/g, '"').trim();

for (const [slug, iconFile, start] of CASES) {
  const raw = fs.readFileSync('b9/' + slug + '.html', 'utf8');
  const body = raw
    .slice(raw.indexOf(start), raw.indexOf('<section class="connect-modal"'))
    .replace(/<script[^>]*>[^]*?<\/script>/g, '')
    .replace(/<style[^>]*>[^]*?<\/style>/g, '');

  /* The shared site footer lands inside this slice; its social glyphs belong
     to SiteFooter, not to the page. */
  const cut = body.search(/<footer|class="mf-social/);
  const page = cut > 0 ? body.slice(0, cut) : body;
  const found = [...page.matchAll(/<svg[^]*?<\/svg>/g)];
  const captured = new Set();
  if (iconFile) {
    if (iconFile === 'wlpp-cards') {
      /* This page keeps its two glyphs inline on the card records. */
      const p = JSON.parse(fs.readFileSync('b9/wlpp.json', 'utf8'));
      for (const c of p.models.cards) captured.add(norm(c.icon));
    } else {
      const ic = JSON.parse(fs.readFileSync('b9/' + iconFile, 'utf8'));
      for (const v of Object.values(ic.markup ?? ic)) captured.add(norm(v));
    }
  }
  const missing = [];
  for (const m of found) {
    if (captured.has(norm(m[0]))) continue;
    const before = page.slice(Math.max(0, m.index - 90), m.index).replace(/\s+/g, ' ');
    missing.push(before.slice(-70));
  }
  console.log(`${missing.length ? 'MISS ' : 'ok   '} ${slug.slice(0, 44).padEnd(46)} svgs ${String(found.length).padStart(3)}  unmatched ${missing.length}`);
  for (const c of [...new Set(missing)].slice(0, 8)) console.log('        …' + c);
}
