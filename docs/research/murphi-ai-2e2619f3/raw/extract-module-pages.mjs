import fs from 'fs';

const PAGES = ['ambient-ai', 'revenue-assurance', 'ai-patient-financials', 'contract-analyzer'];

const ENT = [
  [/&amp;/g, '&'], [/&#0?39;/g, "'"], [/&#8217;/g, "'"], [/&#8216;/g, "'"],
  [/&quot;/g, '"'], [/&#8220;/g, '"'], [/&#8221;/g, '"'],
  [/&#8211;/g, '–'], [/&#8212;/g, '—'], [/&nbsp;/g, ' '],
  [/&lt;/g, '<'], [/&gt;/g, '>'], [/&#215;/g, '×'],
];
function dec(s) {
  let t = String(s).replace(/<[^>]+>/g, '');
  for (const [re, to] of ENT) t = t.replace(re, to);
  return t.replace(/\s+/g, ' ').trim();
}
const decLines = s => String(s).split(/<br\s*\/?>/i).map(dec).filter(Boolean);
const grab = (src, re) => { const m = String(src).match(re); return m ? m[1] : ''; };

// Measured from the live render (the stylesheets disagree with it).
const LAYOUT = {
  // heroTypeScale: only Ambient AI overrides h1/sub sizes below 900/600; the
  // others keep clamp(30px,3.8vw,52px) and a 16px sub all the way down.
  // kpiMobileCols: patient-financials alone drops KPIs to one column at ≤600.
  // headingMobile: `.sh` below 600px. All three curves are 6vw with different
  // clamps, measured by sampling 360–600px:
  //   flat24    → 24px (Ambient AI)
  //   clamp34   → clamp(24px, 6vw, 34px)  (Revenue Assurance, Contract Analyzer)
  //   clamp28   → clamp(20px, 6vw, 28px)  (AI Patient Financials)
  // eyebrowMobile: 10px on Ambient AI only; 11.5px elsewhere.
  'ambient-ai':            { aside: 300, subMaxWidth: 560,  subGap: 32, headingGap: 16, leadMaxWidth: 640,  leadGap: 32, leadLeading: 1.7,  quoteRoleGap: 4, density: 'standard', heroTypeScale: 'responsive', kpiMobileCols: 2, headingMobile: 'flat24',  eyebrowMobile: 10,   mobileChrome: 'ambient' },
  'revenue-assurance':     { aside: 320, subMaxWidth: null, subGap: 28, headingGap: 12, leadMaxWidth: null, leadGap: 32, leadLeading: 1.7,  quoteRoleGap: 2, density: 'standard', heroTypeScale: 'static',     kpiMobileCols: 2, headingMobile: 'clamp34', eyebrowMobile: 11.5, mobileChrome: 'standard' },
  'ai-patient-financials': { aside: 300, subMaxWidth: 560,  subGap: 32, headingGap: 12, leadMaxWidth: null, leadGap: 8,  leadLeading: 1.65, quoteRoleGap: 2, density: 'roomy',    heroTypeScale: 'static',     kpiMobileCols: 1, headingMobile: 'clamp28', eyebrowMobile: 11.5, mobileChrome: 'standard' },
  'contract-analyzer':     { aside: 320, subMaxWidth: null, subGap: 28, headingGap: 12, leadMaxWidth: null, leadGap: 32, leadLeading: 1.7,  quoteRoleGap: 2, density: 'standard', heroTypeScale: 'static',     kpiMobileCols: 2, headingMobile: 'clamp34', eyebrowMobile: 11.5, mobileChrome: 'standard' },
};

const out = {};
for (const slug of PAGES) {
  const h = fs.readFileSync('html/' + slug + '.html', 'utf8');
  const start = h.indexOf('<section class="page-hero"');
  const end = h.indexOf('murphi-cta-root');
  const m = h.slice(start, end)
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '');

  const page = { slug, layout: LAYOUT[slug] };
  page.title = dec(grab(h, /<title>([^<]*)<\/title>/));
  page.description = dec(grab(h, /<meta name="description" content="([^"]*)"/));

  const hero = m.slice(0, m.indexOf('</section>'));
  page.heroTag = dec(grab(hero, /<div class="page-hero-tag">([\s\S]*?)<\/div>/));
  page.h1Lines = decLines(grab(hero, /<h1[^>]*>([\s\S]*?)<\/h1>/));
  page.heroSub = dec(grab(hero, /<p class="page-hero-sub">([\s\S]*?)<\/p>/));
  page.heroButtons = [...hero.matchAll(/<a href="([^"]+)" class="(btn-w|btn-ghost)"[^>]*>([\s\S]*?)<\/a>/g)]
    .map(x => ({ href: x[1].replace('https://murphi.ai', ''), variant: x[2] === 'btn-w' ? 'solid' : 'ghost', label: dec(x[3]) }));

  const card = hero.slice(hero.indexOf('hero-status-card'));
  page.statusCard = {
    title: dec(grab(card, /<div class="hero-status-title">([\s\S]*?)<\/div>/)),
    badge: dec(grab(card, /<div class="hero-status-badge[^"]*"[^>]*>([\s\S]*?)<\/div>/)),
    facts: [...card.matchAll(/<div class="hero-status-fact">([\s\S]*?)<\/div>/g)].map(x => dec(x[1])),
  };

  const bands = [...m.matchAll(/<div class="(sec-grey|sec-white)">/g)].map(x => ({ t: x[1], i: x.index }));
  page.sections = bands.map((band, k) => {
    const chunk = m.slice(band.i, k + 1 < bands.length ? bands[k + 1].i : m.length);
    const sec = { grey: band.t === 'sec-grey' };
    sec.tag = dec(grab(chunk, /<div class="sec-tag">([\s\S]*?)<\/div>/));
    sec.heading = dec(grab(chunk, /<h2 class="sh">([\s\S]*?)<\/h2>/));
    const lead = grab(chunk, /<p class="sl">([\s\S]*?)<\/p>/);
    if (lead) sec.lead = dec(lead);

    // Trailing "+ N additional … reports" note: a bare <p> with inline styles,
    // rendered after the feature grid on both revenue-assurance report bands.
    const note = grab(chunk, /<p style="font-size:13px;[^"]*">([\s\S]*?)<\/p>/);
    if (note) sec.footnote = dec(note);

    // NOTE: capture the last child's own </div> — a bare `</div>\s*</div>` tail
    // swallows it and silently truncates the final field.
    const steps = [...chunk.matchAll(/<div class="step-card">([\s\S]*?<\/div>)\s*<\/div>/g)].map(x => ({
      num: dec(grab(x[1], /<div class="step-num">([\s\S]*?)<\/div>/)),
      title: dec(grab(x[1], /<div class="step-title">([\s\S]*?)<\/div>/)),
      description: dec(grab(x[1], /<div class="step-desc">([\s\S]*?)<\/div>/)),
    })).filter(x => x.title);
    if (steps.length) sec.steps = steps;

    const twoColAt = chunk.indexOf('class="two-col"');
    const beforeTwoCol = twoColAt >= 0 ? chunk.slice(0, twoColAt) : chunk;

    const feats = [...beforeTwoCol.matchAll(/<div class="feature-card"[^>]*>([\s\S]*?<\/div>)\s*<\/div>/g)].map(x => {
      const b = x[1].match(/<div class="module-badge ([\w-]+)"[^>]*>([\s\S]*?)<\/div>/);
      return {
        status: b ? b[1].replace('status-', '') : null,
        badgeLabel: b ? dec(b[2]) : null,
        title: dec(grab(x[1], /<div class="feature-card-title">([\s\S]*?)<\/div>/)),
        description: dec(grab(x[1], /<div class="feature-card-desc"[^>]*>([\s\S]*?)<\/div>/)),
      };
    }).filter(x => x.title);
    if (feats.length) sec.features = feats;

    const kpis = [...beforeTwoCol.matchAll(/<div class="kpi-card"><div class="kpi-v">([\s\S]*?)<\/div><div class="kpi-l">([\s\S]*?)<\/div><\/div>/g)]
      .map(x => ({ value: dec(x[1]), label: dec(x[2]) }));
    if (kpis.length) sec.kpis = kpis;

    const q = chunk.match(/<div class="quote-block"[^>]*>([\s\S]*?<\/div>)\s*<\/div>/);
    if (q) sec.quote = {
      text: dec(grab(q[1], /<div class="quote-text">([\s\S]*?)<\/div>/)),
      author: dec(grab(q[1], /<div class="quote-author">([\s\S]*?)<\/div>/)),
      role: dec(grab(q[1], /<div class="quote-role">([\s\S]*?)(?:<\/div>|$)/)),
    };

    const tags = [...chunk.matchAll(/<span class="who-tag">([\s\S]*?)<\/span>/g)].map(x => dec(x[1]));
    if (tags.length) sec.tagCloud = tags;

    const rel = [...chunk.matchAll(/<a href="([^"]+)" class="related-card">([\s\S]*?<\/div>)\s*<\/a>/g)].map(x => ({
      href: x[1].replace('https://murphi.ai', ''),
      title: dec(grab(x[2], /<div class="related-card-title">([\s\S]*?)<\/div>/)),
      description: dec(grab(x[2], /<div class="related-card-desc">([\s\S]*?)<\/div>/)),
    })).filter(x => x.title);
    if (rel.length) sec.related = rel;

    if (twoColAt >= 0) {
      const tc = chunk.slice(twoColAt);
      const tcKpis = [...tc.matchAll(/<div class="kpi-card"><div class="kpi-v">([\s\S]*?)<\/div><div class="kpi-l">([\s\S]*?)<\/div><\/div>/g)]
        .map(x => ({ value: dec(x[1]), label: dec(x[2]) }));
      const tcCards = [...tc.matchAll(/<div class="feature-card"[^>]*>([\s\S]*?<\/div>)\s*<\/div>/g)].map(x => ({
        title: dec(grab(x[1], /<div class="feature-card-title">([\s\S]*?)<\/div>/)),
        description: dec(grab(x[1], /<div class="feature-card-desc"[^>]*>([\s\S]*?)<\/div>/)),
      })).filter(x => x.title);
      sec.twoCol = {};
      if (tcKpis.length) sec.twoCol.kpis = tcKpis;
      if (tcCards.length) sec.twoCol.cards = tcCards;
    }
    return sec;
  });
  out[slug] = page;
}

fs.writeFileSync('mod/content.json', JSON.stringify(out, null, 1));
for (const slug of PAGES) {
  const p = out[slug];
  console.log('\n=== ' + slug + ' ===');
  console.log('  h1: ' + p.h1Lines.join(' | '));
  console.log('  status: ' + p.statusCard.badge + ' | facts ' + p.statusCard.facts.length);
  console.log('  btns: ' + p.heroButtons.map(b => b.label + '->' + b.href).join(' , '));
  for (const s of p.sections) {
    const bits = [
      s.lead && 'lead',
      s.steps && 'steps:' + s.steps.length,
      s.features && 'feat:' + s.features.length,
      s.kpis && 'kpi:' + s.kpis.length,
      s.quote && 'quote',
      s.tagCloud && 'tags:' + s.tagCloud.length,
      s.related && 'rel:' + s.related.length,
      s.twoCol && 'twoCol(' + [s.twoCol.kpis && 'kpi:' + s.twoCol.kpis.length, s.twoCol.cards && 'cards:' + s.twoCol.cards.length].filter(Boolean).join('+') + ')',
    ].filter(Boolean).join(',');
    console.log('  ' + (s.grey ? 'GREY ' : 'WHITE') + ' [' + s.tag + '] ' + s.heading.slice(0, 44) + ' {' + bits + '}');
  }
}
