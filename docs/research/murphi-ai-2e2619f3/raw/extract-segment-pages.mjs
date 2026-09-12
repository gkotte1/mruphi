import fs from 'fs';

const PAGES = [
  'post-acute-care', 'health-systems-hospitals', 'primary-specialty-care',
  'mental-behavioral-health', 'ehr-emr-companies',
  'rcm-companies', 'coding-billing', 'qapi-compliance',
  'accreditation-audit', 'public-health-and-corrections',
];

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
const grab = (src, re) => { const m = String(src).match(re); return m ? m[1] : ''; };

/**
 * Per-page values, all measured from the live render (the stylesheets disagree
 * with it). See SEGMENT_PAGES.md for the full variant table.
 */
const VARIANT = {
  'post-acute-care': 'bold', 'health-systems-hospitals': 'tight',
  'primary-specialty-care': 'tight', 'mental-behavioral-health': 'roomy',
  'ehr-emr-companies': 'roomy',
  'rcm-companies': 'rcm', 'coding-billing': 'theme', 'qapi-compliance': 'theme',
  'accreditation-audit': 'theme', 'public-health-and-corrections': 'civic',
};
const KPI_VALUE = {
  'health-systems-hospitals': 'small',
  'post-acute-care': 'largeShrink',
  'public-health-and-corrections': 'largeShrink',
};

const out = {};
for (const p of PAGES) {
  const h = fs.readFileSync('html/' + p + '.html', 'utf8');
  const start = h.indexOf('<section class="page-hero"');
  const end = h.indexOf('murphi-cta-root');
  const m = h.slice(start, end)
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '');

  const page = { slug: p };
  page.title = dec(grab(h, /<title>([^<]*)<\/title>/));
  page.description = dec(grab(h, /<meta name="description" content="([^"]*)"/));

  const hero = m.slice(0, m.indexOf('</section>'));
  page.heroTags = [...hero.matchAll(/<(div|span|a)\b([^>]*class="[^"]*page-hero-(?:link-tag|tag)(?![\w-])[^"]*"[^>]*)>([\s\S]*?)<\/\1>/g)].map(x => {
    const href = grab(x[2], /href="([^"]+)"/);
    return {
      label: dec(x[3]),
      href: href ? href.replace('https://murphi.ai', '') : null,
      arrow: href ? (x[3].includes('<svg') ? 'icon' : 'glyph') : null,
    };
  });
  const h1raw = grab(hero, /<h1[^>]*>([\s\S]*?)<\/h1>/);
  const hl = h1raw.match(/<span class="hl">([\s\S]*?)<\/span>/);
  const plainH1 = h1raw.replace(/<span class="hl">[\s\S]*?<\/span>/, '');
  // Authored <br> line breaks must survive — stripping them welds words
  // together ("Revenue Cycle Workflowsfor RCM Companies").
  page.h1Lines = plainH1.split(/<br\s*\/?>/i).map(dec).filter(Boolean);
  if (hl && /\s$/.test(plainH1) && page.h1Lines.length) {
    page.h1Lines[page.h1Lines.length - 1] += ' ';
  }
  page.h1Highlight = hl ? dec(hl[1]) : null;
  page.variant = VARIANT[p];
  page.kpiValue = KPI_VALUE[p] || 'large';
  page.h1MaxWidth = p === 'health-systems-hospitals' ? 1000 : 800;
  // Accreditation & Audit renders inside a 1180px shell; the rest use 1200.
  page.contentMaxWidth = p === 'accreditation-audit' ? 1180 : 1200;
  page.heroSub = dec(grab(hero, /<p class="page-hero-sub"[^>]*>([\s\S]*?)<\/p>/));
  page.heroBtns = [...hero.matchAll(/<a href="([^"]+)" class="(btn-w|btn-ghost)"[^>]*>([\s\S]*?)<\/a>/g)]
    .map(x => ({ href: x[1].replace('https://murphi.ai', ''), variant: x[2], label: dec(x[3]) }));

  const secs = [];
  const idxs = [...m.matchAll(/<div class="page-section(?:-alt)?">/g)].map(x => ({ i: x.index, alt: x[0].includes('-alt') }));
  for (let k = 0; k < idxs.length; k++) {
    const chunk = m.slice(idxs[k].i, k + 1 < idxs.length ? idxs[k + 1].i : m.length);
    const isBanner = chunk.includes('class="paas-section"');
    const tag = dec(grab(chunk, /<div class="sec-tag">([\s\S]*?)<\/div>/));
    const heading = isBanner
      ? dec(grab(chunk, /<h2[^>]*>([\s\S]*?)<\/h2>/))
      : dec(grab(chunk, /<h2 class="sh">([\s\S]*?)<\/h2>/));
    if (!tag && !heading) continue;

    const s = { tag, heading, alt: idxs[k].alt };
    s.alt = m.slice(Math.max(0, idxs[k].i - 80), idxs[k].i).includes('page-section-alt') || idxs[k].alt;

    if (isBanner) {
      // `.paas-section` — a blue gradient panel nested inside a page-section.
      s.banner = { body: dec(grab(chunk, /<p[^>]*>([\s\S]*?)<\/p>/)) };
      secs.push(s);
      continue;
    }

    const lead = grab(chunk, /<p class="sl"[^>]*>([\s\S]*?)<\/p>/);
    if (lead) s.lead = dec(lead);

    const whoTags = [...chunk.matchAll(/<span class="who-tag">([\s\S]*?)<\/span>/g)].map(x => dec(x[1]));
    if (whoTags.length) {
      s.whoTags = whoTags;
      const iw = chunk.indexOf('who-tag');
      const il = chunk.indexOf('class="sl"');
      s.whoTagsAfterLead = il >= 0 && iw > il;
    }

    const rowAt = Math.min(
      ...['class="two-col"', 'class="three-col"'].map(c => { const i = chunk.indexOf(c); return i < 0 ? Infinity : i; }));
    const hasRow = rowAt !== Infinity;
    const gridScope = hasRow ? chunk.slice(0, rowAt) : chunk;

    s.grid = chunk.includes('class="feature-grid"') ? 'feature' : null;

    // Capture the last child's own </div> — a bare `</div>\s*</div>` tail
    // swallows it and truncates the final field.
    const parseCards = (scope) => [...scope.matchAll(/<div class="feature-card"[^>]*>([\s\S]*?<\/div>)\s*<\/div>/g)].map(x => {
      const c = x[1];
      const badge = c.match(/<div class="module-badge(?: (status-\w+))?"[^>]*>([\s\S]*?)<\/div>/);
      const descRaw = grab(c, /<div class="feature-card-desc"[^>]*>([\s\S]*?)<\/div>/);
      const em = descRaw.match(/<em>([\s\S]*?)<\/em>/);
      const strong = descRaw.match(/<strong>([\s\S]*?)<\/strong>([\s\S]*)$/);
      return {
        status: badge && badge[1] ? badge[1].replace('status-', '') : null,
        badgeLabel: badge ? dec(badge[2]) : null,
        title: dec(grab(c, /<div class="feature-card-title">([\s\S]*?)<\/div>/)),
        desc: dec(descRaw.replace(/<br\s*\/?>/g, ' ').replace(/<em>[\s\S]*?<\/em>/, '').replace(/<strong>[\s\S]*$/, '')),
        attribution: em ? dec(em[1]) : null,
        noteLabel: strong ? dec(strong[1]) : null,
        noteText: strong ? dec(strong[2]) : null,
      };
    }).filter(c => c.title);

    const cards = parseCards(gridScope);
    if (cards.length) s.features = cards;

    if (hasRow) {
      const rowScope = chunk.slice(rowAt);
      const rowCards = parseCards(rowScope);
      if (rowCards.length) {
        // Card padding and description type are authored as inline styles and
        // differ per page (EHR/EMR leaves them at the 24px / 13px·1.65
        // default; accreditation uses 28px / 13px·1.7; coding-billing and
        // QAPI use 32px / 14px·1.7). Read them, never assume.
        const firstCard = rowScope.match(/<div class="feature-card"([^>]*)>/);
        const pad = firstCard ? grab(firstCard[1], /padding:\s*(\d+)px/) : '';
        const descStyle = grab(rowScope, /<div class="feature-card-desc"([^>]*)>/);
        s.cardRow = {
          columns: chunk.includes('class="three-col"') ? 'three' : 'two',
          padding: pad ? Number(pad) : 24,
          descSize: Number(grab(descStyle, /font-size:\s*([\d.]+)px/) || 13),
          descLeading: Number(grab(descStyle, /line-height:\s*([\d.]+)/) || 1.65),
          cards: rowCards,
        };
      }
    }

    const kpis = [...chunk.matchAll(/<div class="kpi-card"><div class="kpi-v">([\s\S]*?)<\/div><div class="kpi-l">([\s\S]*?)<\/div><\/div>/g)]
      .map(x => ({ value: dec(x[1]), label: dec(x[2]) }));
    if (kpis.length) s.kpis = kpis;

    const q = chunk.match(/<div class="quote-block"[^>]*>([\s\S]*?<\/div>)\s*<\/div>/);
    if (q) s.quote = {
      text: dec(grab(q[1], /<div class="quote-text">([\s\S]*?)<\/div>/)),
      author: dec(grab(q[1], /<div class="quote-author">([\s\S]*?)<\/div>/)),
      role: dec(grab(q[1], /<div class="quote-role">([\s\S]*?)(?:<\/div>|$)/)),
    };

    // Trailing callout: a bordered white box with a bold label + body text.
    const callout = chunk.match(/<div style="margin-top:24px;padding:20px 24px;[^"]*">\s*<strong[^>]*>([\s\S]*?)<\/strong>\s*<span[^>]*>([\s\S]*?)<\/span>/);
    if (callout) s.callout = { label: dec(callout[1]), text: dec(callout[2]) };

    if (!s.grid) delete s.grid;
    secs.push(s);
  }
  page.sections = secs;
  out[p] = page;
}

fs.writeFileSync('seg/content.json', JSON.stringify(out, null, 1));
for (const p of PAGES) {
  const x = out[p];
  console.log('\n=== ' + p + '  [' + x.variant + ']');
  console.log('  h1: ' + x.h1Lines.join(' | ') + (x.h1Highlight ? ' [hl:' + x.h1Highlight + ']' : ''));
  for (const s of x.sections) {
    const bits = [
      s.lead && 'lead', s.whoTags && 'who:' + s.whoTags.length,
      s.features && (s.grid || '?') + ':' + s.features.length,
      s.cardRow && 'cardRow-' + s.cardRow.columns + ':' + s.cardRow.cards.length,
      s.kpis && 'kpi:' + s.kpis.length, s.quote && 'quote',
      s.callout && 'callout', s.banner && 'banner',
    ].filter(Boolean).join(',');
    console.log('  ' + (s.alt ? 'ALT ' : '    ') + '[' + s.tag + '] ' + s.heading.slice(0, 40) + ' {' + bits + '}');
  }
}
