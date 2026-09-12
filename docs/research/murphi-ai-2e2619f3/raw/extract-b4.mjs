import fs from 'fs';

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
const lines = s => String(s).split(/<br\s*\/?>/i).map(dec).filter(Boolean);
const grab = (src, re) => { const m = String(src).match(re); return m ? m[1] : ''; };
const all = (src, re) => [...String(src).matchAll(re)];

function load(slug) {
  const h = fs.readFileSync('html/' + slug + '.html', 'utf8');
  const start = Math.max(h.indexOf('<section class="page-hero"'), h.indexOf('<section class="about-hero"'));
  const end = h.indexOf('murphi-cta-root');
  return {
    raw: h,
    body: h.slice(start, end)
      .replace(/<script[\s\S]*?<\/script>/g, '')
      .replace(/<style[\s\S]*?<\/style>/g, '')
      .replace(/<!--[\s\S]*?-->/g, ''),
    title: dec(grab(h, /<title>([^<]*)<\/title>/)),
    description: dec(grab(h, /<meta name="description" content="([^"]*)"/)),
  };
}

function heroCommon(body) {
  const hero = body.slice(0, body.indexOf('</section>'));
  return {
    tag: dec(grab(hero, /<div class="page-hero-tag"[^>]*>([\s\S]*?)<\/div>/)),
    h1Lines: lines(grab(hero, /<h1[^>]*>([\s\S]*?)<\/h1>/)),
    sub: dec(grab(hero, /<p class="page-hero-sub"[^>]*>([\s\S]*?)<\/p>/)),
    buttons: all(hero, /<a href="([^"]+)" class="(btn-w|btn-ghost)"[^>]*>([\s\S]*?)<\/a>/g)
      .map(x => ({ href: x[1].replace('https://murphi.ai', ''), variant: x[2] === 'btn-w' ? 'solid' : 'ghost', label: dec(x[3]) })),
    _hero: hero,
  };
}

// .ps-alt / .ps-dark wrap an inner .ps; treat the pair as a single band.
function dedupeBands(list) {
  const kept = [];
  for (const b of list) {
    const prev = kept[kept.length - 1];
    if (prev && prev.t !== 'ps' && b.t === 'ps' && b.i - prev.i < 120) continue;
    kept.push(b);
  }
  return kept;
}

const out = {};

/* ── integration ──────────────────────────────────────────────────────── */
{
  const { body, title, description } = load('integration');
  const hero = heroCommon(body);
  const page = { slug: 'integration', title, description, hero: { tag: hero.tag, h1Lines: hero.h1Lines, sub: hero.sub, buttons: hero.buttons } };
  const idxs = all(body, /<div class="page-section(?:-alt)?">/g).map(x => ({ i: x.index, alt: x[0].includes('-alt') }));
  page.sections = [];
  for (let k = 0; k < idxs.length; k++) {
    const chunk = body.slice(idxs[k].i, k + 1 < idxs.length ? idxs[k + 1].i : body.length);
    const tag = dec(grab(chunk, /<div class="sec-tag">([\s\S]*?)<\/div>/));
    const heading = dec(grab(chunk, /<h2 class="sh">([\s\S]*?)<\/h2>/));
    if (!tag && !heading) continue;
    const s = { tag, heading, alt: body.slice(Math.max(0, idxs[k].i - 80), idxs[k].i).includes('page-section-alt') || idxs[k].alt };
    const lead = grab(chunk, /<p class="sl"[^>]*>([\s\S]*?)<\/p>/);
    if (lead) s.lead = dec(lead);
    // .int-method cards (grid of five methods, and the payment two-col)
    const methods = all(chunk, /<div class="int-method"([^>]*)>([\s\S]*?<\/div>)\s*<\/div>/g).map(x => ({
      padding: Number(grab(x[1], /padding:\s*(\d+)px/) || 24),
      title: dec(grab(x[2], /<div class="int-method-title">([\s\S]*?)<\/div>/)),
      description: dec(grab(x[2], /<div class="int-method-desc"[^>]*>([\s\S]*?)<\/div>/)),
      descSize: Number(grab(grab(x[2], /<div class="int-method-desc"([^>]*)>/), /font-size:\s*([\d.]+)px/) || 13),
    })).filter(m => m.title);
    if (methods.length) {
      s.methods = methods;
      s.methodColumns = chunk.includes('class="two-col"') ? 'two' : 'grid';
    }
    // two-col of tag groups (h3 + p + tag cloud)
    const groups = all(chunk, /<div>\s*<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>\s*<div class="tag-cloud">([\s\S]*?)<\/div>/g).map(x => ({
      title: dec(x[1]), subtitle: dec(x[2]),
      tags: all(x[3], /<span class="who-tag">([\s\S]*?)<\/span>/g).map(t => dec(t[1])),
    }));
    if (groups.length) s.tagGroups = groups;
    // three-col of feature cards
    if (chunk.includes('class="three-col"')) {
      const tc = chunk.slice(chunk.indexOf('class="three-col"'));
      const cards = all(tc, /<div class="feature-card"[^>]*>([\s\S]*?<\/div>)\s*<\/div>/g).map(x => ({
        title: dec(grab(x[1], /<div class="feature-card-title">([\s\S]*?)<\/div>/)),
        description: dec(grab(x[1], /<div class="feature-card-desc"[^>]*>([\s\S]*?)<\/div>/)),
      })).filter(c => c.title);
      if (cards.length) s.cards = cards;
    }
    // The payment section pairs its int-method with a 2×2 KPI grid.
    const kpis = all(chunk, /<div class="kpi-card"><div class="kpi-v">([^]*?)<[/]div><div class="kpi-l">([^]*?)<[/]div><[/]div>/g)
      .map(x => ({ value: dec(x[1]), label: dec(x[2]) }));
    if (kpis.length) s.kpis = kpis;
    page.sections.push(s);
  }
  out.integration = page;
}

/* ── white-labeling ───────────────────────────────────────────────────── */
{
  const { body, title, description } = load('white-labeling');
  const hero = heroCommon(body);
  const card = hero._hero.slice(hero._hero.indexOf('hero-status-card'));
  const page = {
    slug: 'white-labeling', title, description,
    hero: {
      tag: hero.tag, h1Lines: hero.h1Lines, sub: hero.sub, buttons: hero.buttons,
      statusCard: {
        title: dec(grab(card, /<div class="hero-status-title">([\s\S]*?)<\/div>/)),
        badge: dec(grab(card, /<div class="hero-status-badge[^"]*"[^>]*>([\s\S]*?)<\/div>/)),
        facts: all(card, /<div class="hero-status-fact">([\s\S]*?)<\/div>/g).map(x => dec(x[1])),
      },
    },
  };
  const bands = all(body, /<div class="(sec-grey|sec-white)">/g).map(x => ({ t: x[1], i: x.index }));
  page.sections = bands.map((band, k) => {
    const chunk = body.slice(band.i, k + 1 < bands.length ? bands[k + 1].i : body.length);
    const s = { grey: band.t === 'sec-grey' };
    s.tag = dec(grab(chunk, /<div class="sec-tag">([\s\S]*?)<\/div>/));
    s.heading = dec(grab(chunk, /<h2 class="sh">([\s\S]*?)<\/h2>/));
    const lead = grab(chunk, /<p class="sl">([\s\S]*?)<\/p>/);
    if (lead) s.lead = dec(lead);
    const cards = all(chunk, /<div class="feature-card"([^>]*)>([\s\S]*?<\/div>)\s*<\/div>/g).map(x => {
      const badge = x[2].match(/<div class="module-badge(?: (status-\w+))?"[^>]*>([\s\S]*?)<\/div>/);
      const descRaw = grab(x[2], /<div class="feature-card-desc"[^>]*>([^]*?)<[/]div>/);
      const em = descRaw.match(/<em>([^]*?)<[/]em>/);
      return {
        attribution: em ? dec(em[1]) : null,
        padding: Number(grab(x[1], /padding:\s*(\d+)px/) || 24),
        centered: /text-align:\s*center/.test(x[1]),
        hasIcon: x[2].includes('int-icon'),
        status: badge && badge[1] ? badge[1].replace('status-', '') : null,
        badgeLabel: badge ? dec(badge[2]) : null,
        title: dec(grab(x[2], /<div class="feature-card-title">([\s\S]*?)<\/div>/)),
        description: dec(descRaw.replace(/<em>[^]*?<[/]em>/, '')),
      };
    }).filter(c => c.title);
    if (cards.length) {
      s.cards = cards;
      s.columns = chunk.includes('class="three-col"') ? 'three' : 'feature';
    }
    const rel = all(chunk, /<a href="([^"]+)" class="related-card">([\s\S]*?<\/div>)\s*<\/a>/g).map(x => ({
      href: x[1].replace('https://murphi.ai', ''),
      title: dec(grab(x[2], /<div class="related-card-title">([\s\S]*?)<\/div>/)),
      description: dec(grab(x[2], /<div class="related-card-desc">([\s\S]*?)<\/div>/)),
    })).filter(r => r.title);
    if (rel.length) s.related = rel;
    return s;
  });
  out['white-labeling'] = page;
}

/* ── security ─────────────────────────────────────────────────────────── */
{
  const { body, title, description } = load('security');
  const hero = heroCommon(body);
  const page = {
    slug: 'security', title, description,
    hero: {
      tag: hero.tag, h1Lines: hero.h1Lines, sub: hero.sub,
      certs: all(hero._hero, /<div class="hero-cert">([\s\S]*?)<\/div>\s*<\/div>/g).map(x => ({
        icon: grab(x[1], /src="([^"]+)"/),
        title: dec(grab(x[1], /<div class="hero-cert-title">([\s\S]*?)<\/div>/)),
        subtitle: dec(grab(x[1], /<div class="hero-cert-sub">([\s\S]*?)(?:<\/div>|$)/)),
      })),
    },
  };
  const bands = dedupeBands(all(body, /<div class="(ps-alt|ps)">/g).map(x => ({ t: x[1], i: x.index })));
  page.sections = bands.map((band, k) => {
    const chunk = body.slice(band.i, k + 1 < bands.length ? bands[k + 1].i : body.length);
    const s = { alt: band.t === 'ps-alt' };
    s.tag = dec(grab(chunk, /<p style="display:inline-block;background:#EAF4FF[^"]*">([\s\S]*?)<\/p>/));
    s.heading = dec(grab(chunk, /<h2 class="sh">([\s\S]*?)<\/h2>/));
    const lead = grab(chunk, /<p class="sl"[^>]*>([\s\S]*?)<\/p>/);
    if (lead) s.lead = dec(lead);
    const cards = all(chunk, /<div class="(cert-card|sec-card)">([\s\S]*?<\/div>)\s*<\/div>/g).map(x => ({
      kind: x[1],
      icon: grab(x[2], /src="([^"]+)"/) || null,
      title: dec(grab(x[2], /<div class="(?:cert-title|sec-card-title)">([\s\S]*?)<\/div>/)),
      description: dec(grab(x[2], /<div class="(?:cert-desc|sec-card-desc)">([\s\S]*?)<\/div>/)),
    })).filter(c => c.title);
    if (cards.length) {
      s.cards = cards;
      s.columns = chunk.includes('sec-grid-2') ? 'two' : 'three';
    }
    if (chunk.includes('processor-table')) {
      const tbl = chunk.slice(chunk.indexOf('processor-table'));
      s.table = {
        headers: all(tbl, /<th[^>]*>([\s\S]*?)<\/th>/g).map(x => dec(x[1])),
        rows: all(tbl, /<tr>\s*<td[\s\S]*?<\/tr>/g).map(tr => all(tr[0], /<td[^>]*>([\s\S]*?)<\/td>/g).map(td => dec(td[1]))).filter(r => r.length),
      };
    }
    return s;
  });
  out.security = page;
}

/* ── about-us ─────────────────────────────────────────────────────────── */
{
  const { body, title, description } = load('about-us');
  const heroBlock = body.slice(0, body.indexOf('</section>'));
  const page = {
    slug: 'about-us', title, description,
    hero: {
      h1Lines: lines(grab(heroBlock, /<h1[^>]*>([\s\S]*?)<\/h1>/)),
      body: [dec(grab(heroBlock, /<p class="about-hero-body">([\s\S]*?)<\/p>/))].filter(Boolean),
    },
  };
  const bands = dedupeBands(all(body, /<div class="(ps-alt|ps-dark|ps)">/g).map(x => ({ t: x[1], i: x.index })));
  page.sections = bands.map((band, k) => {
    const chunk = body.slice(band.i, k + 1 < bands.length ? bands[k + 1].i : body.length);
    const s = { tone: band.t === 'ps-alt' ? 'alt' : band.t === 'ps-dark' ? 'dark' : 'plain' };
    const tagRaw = grab(chunk, /<div class="sec-tag"[^>]*>([^]*?)<[/]div>/);
    s.tag = dec(tagRaw);
    // Three of the four eyebrows carry a decorative (unstyled) <span class="stagd">.
    s.tagDot = tagRaw.includes('stagd');
    // intro-grid: two columns of heading + paragraphs
    const intro = all(chunk, /<div class="intro-h">([\s\S]*?)<\/div>\s*<div class="[^"]*">([\s\S]*?)<\/div>\s*<\/div>/g).map(x => ({
      title: dec(x[1]),
      paragraphs: all(x[2], /<p[^>]*>([\s\S]*?)<\/p>/g).map(pp => dec(pp[1])),
    }));
    if (intro.length) s.intro = intro;
    const diff = all(chunk, /<div class="diff-card">([\s\S]*?<\/div>)\s*<\/div>/g).map(x => ({
      title: dec(grab(x[1], /<div class="diff-card-title">([\s\S]*?)<\/div>/)),
    })).filter(c => c.title);
    if (diff.length) s.diff = diff;
    const vm = all(chunk, /<div class="vm-card">([\s\S]*?<\/div>)\s*<\/div>/g).map(x => ({
      label: dec(grab(x[1], /<div class="vm-label">([^]*?)<[/]div>/)),
      title: dec(grab(x[1], /<div class="vm-title">([\s\S]*?)<\/div>/)),
      description: dec(grab(x[1], /<div class="vm-body">([\s\S]*?)(?:<\/div>|$)/)),
    })).filter(c => c.title);
    if (vm.length) s.visionMission = vm;
    const vals = all(chunk, /<div class="val-card">([\s\S]*?<\/div>)\s*<\/div>/g).map(x => ({
      icon: grab(x[1], /src="([^"]+)"/) || null,
      title: dec(grab(x[1], /<div class="val-card-title">([\s\S]*?)<\/div>/)),
      description: dec(grab(x[1], /<div class="val-card-body">([\s\S]*?)(?:<\/div>|$)/)),
    })).filter(c => c.title);
    if (vals.length) s.values = vals;
    const team = all(chunk, /<div class="team-card">([\s\S]*?<\/div>)\s*<\/div>/g).map(x => ({
      photo: grab(x[1], /src="([^"]+)"/) || null,
      name: dec(grab(x[1], /<div class="team-name">([\s\S]*?)<\/div>/)),
      role: dec(grab(x[1], /<div class="team-title">([\s\S]*?)<\/div>/)),
      link: grab(x[1], /<a href="([^"]+)"/) || null,
    })).filter(c => c.name);
    if (team.length) s.team = team;
    return s;
  });
  out['about-us'] = page;
}

fs.writeFileSync('b4/content.json', JSON.stringify(out, null, 1));
for (const [slug, p] of Object.entries(out)) {
  console.log('\n=== ' + slug);
  console.log('  hero: ' + (p.hero.h1Lines || []).join(' | ').slice(0, 60) +
    (p.hero.certs ? ' | certs ' + p.hero.certs.length : '') +
    (p.hero.statusCard ? ' | facts ' + p.hero.statusCard.facts.length : '') +
    (p.hero.body ? ' | body ' + p.hero.body.length : ''));
  for (const s of p.sections) {
    const bits = ['lead', 'methods', 'tagGroups', 'cards', 'related', 'table', 'intro', 'diff', 'visionMission', 'values', 'team']
      .map(k => s[k] ? k + (Array.isArray(s[k]) ? ':' + s[k].length : '') : null).filter(Boolean).join(',');
    console.log('  [' + s.tag + '] ' + String(s.heading || '').slice(0, 34) + ' {' + bits + '}');
  }
}
