import fs from 'fs';
import { decodeEntities } from './html-parse.mjs';
import { decodeDeep } from './decode-deep.mjs';
import { blocks } from './blocks.mjs';

/**
 * /primary-and-speciality-care-embed-into-ehr/ — a hand-authored embed with two
 * explorers: a specialty picker (SPECS) and an all-features grid (CATS). Both
 * data sets, and every glyph they carry, live in the page's own inline script
 * and are sliced out and evaluated rather than re-typed.
 */

const SLUG = 'primary-and-speciality-care-embed-into-ehr';
const raw = fs.readFileSync('b9/' + SLUG + '.html', 'utf8');
const head = raw.slice(0, raw.indexOf('</head>'));
const full = raw.slice(raw.indexOf('<section class="hero">'), raw.indexOf('<section class="connect-modal"'));
const script = (full.match(/<script[^>]*>([^]*?)<\/script>/) || [, ''])[1];
const body = full.replace(/<script[^>]*>[^]*?<\/script>/g, '').replace(/<style[^>]*>[^]*?<\/style>/g, '');

const dec = (s) => decodeEntities(String(s).replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
const grab = (src, re) => { const m = String(src).match(re); return m ? m[1] : ''; };
const all = (src, re) => [...String(src).matchAll(re)];
const rel = (u) => (u || '').replace(/^https?:\/\/murphi\.ai/, '') || '/';
const svg = (s) => (String(s).match(/<svg[^]*?<\/svg>/) || [''])[0];

const spans = (src) => String(src)
  .split(/(<strong[^>]*>[^]*?<\/strong>)/)
  .filter((s) => s !== '')
  .map((s) => {
    const strong = /^<strong/.test(s);
    const text = decodeEntities(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ');
    return strong ? { text: text.trim(), strong: true } : { text };
  })
  .filter((s) => s.text.trim());

const icons = {};
let seq = 0;
const keep = (markup, hint) => {
  if (!markup) return null;
  const key = `pc-${hint}-${seq++}`;
  icons[key] = markup;
  return key;
};

const headOf = (src) => ({
  eye: dec(grab(src, /<div class="eye[^"]*"[^>]*>([^]*?)<\/div>/)),
  h2: dec(grab(src, /<h2 class="sec-h2[^"]*"[^>]*>([^]*?)<\/h2>/)),
  sub: dec(grab(src, /<p class="sec-sub[^"]*"[^>]*>([^]*?)<\/p>/)),
});
const sectionAround = (needle) =>
  body.slice(body.lastIndexOf('<section', body.indexOf(needle)), body.indexOf('</section>', body.indexOf(needle)));

/* ── hero / who / trust ───────────────────────────────────────────────── */
const hero = body.slice(0, body.indexOf('<section class="who">'));
const who = body.slice(body.indexOf('<section class="who">'), body.indexOf('<div class="trust">'));
const trust = body.slice(body.indexOf('<div class="trust">'), body.indexOf('<section class="sec sw">'));

const page = {
  slug: SLUG,
  title: dec(grab(head, /<title>([^<]*)<\/title>/)),
  description: decodeEntities(grab(head, /<meta name="description" content="([^"]*)"/)),

  hero: {
    breadcrumb: all(hero, /<(a|span) [^>]*class="bc-pill([^"]*)"[^>]*>([^]*?)<\/\1>/g).map((m) => ({
      label: dec(m[3]),
      active: /active/.test(m[2]),
      href: m[1] === 'a' ? rel(grab(m[0], /href="([^"]+)"/)) : null,
    })),
    separator: dec(grab(hero, /<span class="bc-sep">([^]*?)<\/span>/)),
    h1: dec(grab(hero, /<h1>([^]*?)<\/h1>/)),
    sub: dec(grab(hero, /<p class="hero-sub">([^]*?)<\/p>/)),
    buttons: all(hero, /<a [^>]*class="btn-(wh|ol)"[^>]*>([^]*?)<\/a>/g).map((m) => ({
      variant: m[1] === 'wh' ? 'solid' : 'outline',
      label: dec(m[2]),
      /* The outline CTA ends in an arrow glyph, not an arrow character. */
      icon: /<svg/.test(m[2]) ? keep(svg(m[2]), 'btn') : null,
      href: rel(grab(m[0], /href="([^"]+)"/)),
    })),
  },

  who: {
    eye: dec(grab(who, /<div class="who-eye">([^]*?)<\/div>/)),
    h2: dec(grab(who, /<h2 class="who-h2">([^]*?)<\/h2>/)),
    tags: all(who, /<span class="who-tag">([^]*?)<\/span>/g).map((m) => dec(m[1])),
    p: dec(grab(who, /<p class="who-p">([^]*?)<\/p>/)),
  },

  trust: {
    items: blocks(trust, 'ti').map((t) => ({ icon: keep(svg(t), 'trust'), label: dec(t) })),
    link: {
      label: dec(grab(trust, /<a[^>]*class="t-link"[^>]*>([^]*?)<\/a>/)),
      icon: keep(svg(grab(trust, /<a[^>]*class="t-link"[^>]*>([^]*?)<\/a>/)), 'tlink'),
      href: rel(grab(trust, /<a href="([^"]+)"[^>]*class="t-link"/)),
    },
  },
};

/* ── stats ────────────────────────────────────────────────────────────── */
const stats = sectionAround('stats-row');
page.stats = {
  ...headOf(stats),
  boxes: all(stats, /<div class="sbox"><span class="sv">([^]*?)<\/span><div class="sl">([^]*?)<\/div><\/div>/g)
    .map((m) => ({ value: dec(m[1]), label: dec(m[2]) })),
};

/* ── the two explorers, from the page's own script ────────────────────── */
const sliceLiteral = (name) => {
  const i = script.indexOf(`const ${name} = {`) >= 0 ? script.indexOf(`const ${name} = {`) : script.indexOf(`const ${name}={`);
  const start = script.indexOf('{', i);
  let depth = 0;
  for (let k = start; k < script.length; k++) {
    if (script[k] === '{') depth++;
    else if (script[k] === '}') { depth--; if (!depth) return script.slice(start, k + 1); }
  }
  throw new Error('unbalanced ' + name);
};
const SPECS = decodeDeep((0, eval)('(' + sliceLiteral('SPECS') + ')'));
const CATS = decodeDeep((0, eval)('(' + sliceLiteral('CATS') + ')'));
const BADGE = (0, eval)('(' + grab(script, /function bc\(t\)\{const m=(\{[^}]*\});/) + ')');
const feat = (f) => ({
  name: f.n, desc: f.d, type: f.t, tone: f.c, icon: keep(f.i, 'feat'),
});

const specSec = sectionAround('specTabs');
page.specialties = {
  ...headOf(specSec),
  tabs: all(specSec, /<button class="spec-tab([^"]*)" data-spec="([^"]+)"><span class="st-icon">([^]*?)<\/span>([^]*?)<\/button>/g)
    .map((m) => ({
      key: m[2],
      icon: keep(svg(m[3]), 'spectab'),
      label: dec(m[4]),
      active: /\bon\b/.test(m[1]),
    })),
  headingPrefix: dec(grab(script, /<div class="si-h3">([^$]*)\$\{sp\.label\}<\/div>/)),
  badge: {
    icon: keep(svg(grab(script, /<div class="si-badge">([^]*?)Available Now/)), 'sibadge'),
    line1: dec(grab(script, /<\/svg> ([^<]*)<br>/)),
    line2: dec(grab(script, /<br>([^<]*)<\/div>\s*<\/div>/)),
  },
  items: Object.entries(SPECS).map(([key, sp]) => ({
    key,
    label: sp.label,
    icon: keep(sp.icon, 'specico'),
    desc: sp.desc,
    chips: sp.chips,
    features: sp.features.map(feat),
  })),
};

const allSec = sectionAround('featureContent');
page.features = {
  ...headOf(allSec),
  tabs: all(allSec, /<button class="tab-btn([^"]*)" data-tab="([^"]+)">([^]*?)<\/button>/g)
    .map((m) => ({ key: m[2], label: dec(m[3]), active: /\bon\b/.test(m[1]) })),
  filters: all(allSec, /<button class="fil-btn([^"]*)" data-filter="([^"]+)">([^]*?)<\/button>/g)
    .map((m) => ({ key: m[2], label: dec(m[3]), active: /\bon\b/.test(m[1]) })),
  badgeClasses: BADGE,
  empty: dec(grab(script, /padding:3rem;font-size:14px">([^<]*)<\/p>/)),
  countSuffix: { one: 'feature', many: 'features' },
  viewLabel: dec(grab(script, /<button class="fc-vw" type="button">([^<]*)</)),
  viewIcon: keep(svg(grab(script, /<button class="fc-vw" type="button">[^<]*([^]*?)<\/button>/)), 'view'),
  categories: Object.entries(CATS).map(([key, cat]) => ({
    key,
    label: cat.label,
    icon: keep(cat.icon, 'catico'),
    tab: cat.tab,
    features: cat.features.map(feat),
  })),
};

/* ── ambient demo ─────────────────────────────────────────────────────── */
const amb = sectionAround('amb-grid');
page.ambient = {
  ...headOf(amb),
  chips: all(amb, /<span class="nc">([^]*?)<\/span>/g).map((m) => dec(m[1])),
  stats: all(amb, /<span class="as-v">([^]*?)<\/span><div class="as-l">([^]*?)<\/div>/g)
    .map((m) => ({ value: dec(m[1]), label: dec(m[2]) })),
  demo: {
    dots: all(amb, /<div class="db-dot" style="background:(#[0-9A-Fa-f]{6})"><\/div>/g).map((m) => m[1]),
    info: dec(grab(amb, /<span class="db-info">([^]*?)<\/span>/)),
    recording: dec(grab(amb, /<span class="db-rec"><span class="rec-dot"><\/span>([^]*?)<\/span>/)),
    noteLabel: dec(grab(amb, /<div class="d-lbl">([^]*?)<\/div>/)),
    note: spans(grab(amb, /<div class="d-note">([^]*?)<\/div>/)),
    rx: spans(grab(amb, /<div class="d-rx">([^]*?)<\/div>/)),
    actions: all(amb, /<button class="da (p|s)">([^]*?)<\/button>/g).map((m) => ({
      variant: m[1] === 'p' ? 'primary' : 'secondary',
      icon: /<svg/.test(m[2]) ? keep(svg(m[2]), 'act') : null,
      label: dec(m[2]),
    })),
  },
};

/* ── rcm ──────────────────────────────────────────────────────────────── */
const rcm = sectionAround('rcm-grid');
page.rcm = {
  ...headOf(rcm),
  cards: blocks(rcm, 'rcm-card').map((c) => ({
    icon: keep(svg(c), 'rcm'),
    badge: dec(grab(c, /<div class="rcm-badge">([^]*?)<\/div>/)),
    title: dec(grab(c, /<div class="rcm-title">([^]*?)<\/div>/)),
    desc: dec(grab(c, /<div class="rcm-desc">([^]*?)<\/div>/)),
    steps: all(c, /<li>([^]*?)<\/li>/g).map((m) => dec(m[1])),
  })),
};

/* ── patient financials ───────────────────────────────────────────────── */
const pay = sectionAround('pay-grid');
page.pay = {
  ...headOf(pay),
  outcomes: all(pay, /<div class="oc"><div class="oc-v">([^]*?)<\/div><div class="oc-l">([^]*?)<\/div><\/div>/g)
    .map((m) => ({
      value: dec(m[1]),
      icon: /<svg/.test(m[1]) ? keep(svg(m[1]), 'oc') : null,
      label: dec(m[2]),
    })),
  tags: all(pay, /<span class="ptag">([^]*?)<\/span>/g).map((m) => dec(m[1])),
  phone: {
    title: dec(grab(pay, /<div class="pb-title">([^]*?)<\/div>/)),
    sms: spans(grab(pay, /<div class="sms">([^]*?)<\/div>/)),
    amountLabel: dec(grab(pay, /<div class="amt-l">([^]*?)<\/div>/)),
    amount: dec(grab(pay, /<div class="amt-v">([^]*?)<\/div>/)),
    amountSub: dec(grab(pay, /<div class="amt-s">([^]*?)<\/div>/)),
    button: dec(grab(pay, /<button class="pay-btn">([^]*?)<\/button>/)),
    buttonIcon: keep(svg(grab(pay, /<button class="pay-btn">([^]*?)<\/button>/)), 'paybtn'),
    note: dec(grab(pay, /<div class="phone-note">([^]*?)<\/div>/)),
  },
};

/* ── testimonial ──────────────────────────────────────────────────────── */
const testi = sectionAround('testi-card');
const tc = blocks(testi, 'testi-card')[0] || '';
page.testimonial = {
  ...headOf(testi),
  stars: all(tc, /<svg[^]*?<\/svg>/g).length,
  starIcon: keep(svg(tc), 'star'),
  quote: dec(grab(tc, /<div class="tc-q">([^]*?)<\/div>/)),
  initials: dec(grab(tc, /<div class="tc-av">([^]*?)<\/div>/)),
  name: dec(grab(tc, /<div class="tc-name">([^]*?)<\/div>/)),
  role: dec(grab(tc, /<div class="tc-role">([^]*?)<\/div>/)),
  tag: dec(grab(tc, /<div class="tc-tag">([^]*?)<\/div>/)),
};

/* ── platform / integration / roadmap / security ──────────────────────── */
const plat = sectionAround('layer-stack');
page.platform = {
  ...headOf(plat),
  layers: blocks(plat, 'layer l\\d').map((l) => ({
    tone: grab(l, /<div class="l-eye (\w+)">/),
    eye: dec(grab(l, /<div class="l-eye \w+">([^]*?)<\/div>/)),
    name: dec(grab(l, /<div class="l-name">([^]*?)<\/div>/)),
    chips: all(l, /<span class="chip">([^]*?)<\/span>/g).map((m) => dec(m[1])),
  })),
  note: spans(grab(plat, /<div class="plat-note">([^]*?)<\/div>/)),
};

const integ = sectionAround('int-grid');
page.integration = {
  ...headOf(integ),
  cards: blocks(integ, 'int-card').map((c) => ({
    icon: keep(svg(c), 'int'),
    title: dec(grab(c, /<div class="int-title">([^]*?)<\/div>/)),
    desc: dec(grab(c, /<div class="int-desc">([^]*?)<\/div>/)),
  })),
};

const road = sectionAround('class="road"');
page.roadmap = {
  ...headOf(road),
  items: blocks(road, 'rs').map((r) => ({
    n: dec(grab(r, /<div class="rs-n">([^]*?)<\/div>/)),
    title: dec(grab(r, /<div class="rs-title">([^]*?)<\/div>/)),
    desc: dec(grab(r, /<div class="rs-desc">([^]*?)<\/div>/)),
  })),
};

const sec = sectionAround('sec-cards');
page.security = {
  ...headOf(sec),
  cards: blocks(sec, 'sc').map((c) => ({
    icon: keep(svg(c), 'sec'),
    title: dec(grab(c, /<div class="sc-title">([^]*?)<\/div>/)),
    desc: dec(grab(c, /<div class="sc-desc">([^]*?)<\/div>/)),
  })),
};

/* ── drawer ───────────────────────────────────────────────────────────── */
const drawer = body.slice(body.indexOf('<div class="drawer"'));
const dBody = script.slice(script.indexOf('dBody.innerHTML=`'), script.indexOf("if(overlay) overlay.classList.add('on')"));
const branch = (rawText) => {
  const t = String(rawText).trim();
  const m = t.match(/^\$\{isA\?'([^]*?)':isPay\?'([^]*?)':'([^]*?)'\}$/);
  if (m) return { agentic: m[1], payments: m[2], default: m[3] };
  const p = t.match(/^\$\{isPay\?'([^]*?)':'([^]*?)'\}$/);
  if (p) return { payments: p[1], default: p[2] };
  const a = t.match(/^\$\{isA\?'([^]*?)':'([^]*?)'\}$/);
  if (a) return { agentic: a[1], default: a[2] };
  return { default: decodeEntities(t) };
};
page.drawer = {
  closeIcon: keep(svg(grab(drawer, /<button class="dcl"[^>]*>([^]*?)<\/button>/)), 'dclose'),
  cta: {
    label: dec(grab(drawer, /<div class="d-cta">\s*<a[^>]*>([^]*?)<\/a>/)),
    icon: keep(svg(grab(drawer, /<div class="d-cta">\s*<a[^>]*>([^]*?)<\/a>/)), 'dcta'),
    href: rel(grab(drawer, /<div class="d-cta">\s*<a href="([^"]+)"/)),
  },
  stepsLabel: dec(grab(dBody, /<div class="d-sec-l">([^<]*)<\/div>/)),
  steps: all(dBody, /<div class="wf-n( [tg])?">(\d)<\/div><div class="wf-t"><strong>([^]*?)<\/strong>([^]*?)<\/div>/g).map((m) => ({
    tone: (m[1] || '').trim() || null,
    n: m[2],
    strong: branch(m[3]),
    text: branch(m[4]),
  })),
  sections: all(dBody, /<div class="d-sec-l">([^<]*)<\/div>\s*<div class="d-chips">([^]*?)<\/div>\s*<\/div>/g).map((m) => ({
    label: dec(m[1]),
    chips: all(m[2], /<span class="d-chip">([^]*?)<\/span>/g).map((c) => dec(c[1])),
  })),
  costLabel: dec(grab(dBody, /<div class="d-sec-l">(Zero Token Cost[^<]*)<\/div>/)),
  costBody: dec(grab(dBody, /line-height:1\.65">([^]*?)<\/div>/)),
};

fs.writeFileSync('b9/pc.json', JSON.stringify(page, null, 1));
fs.writeFileSync('b9/pc-icons.json', JSON.stringify(icons, null, 1));

/* ── guards ───────────────────────────────────────────────────────────── */
const miss = [];
const OPTIONAL = /[.](href|icon|tone|active|strong|agentic|payments)$/;
const walk = (o, p) => {
  if (o === null || o === undefined) { if (!OPTIONAL.test(p)) miss.push(p); return; }
  if (typeof o === 'string') { if (!o.trim()) miss.push(p); return; }
  if (typeof o !== 'object') return;
  if (Array.isArray(o)) { if (!o.length) miss.push(p); o.forEach((v, i) => walk(v, p + '[' + i + ']')); return; }
  for (const k of Object.keys(o)) walk(o[k], p + '.' + k);
};
walk(page, '');
const specCount = page.specialties.items.reduce((s, x) => s + x.features.length, 0);
const catCount = page.features.categories.reduce((s, x) => s + x.features.length, 0);
console.log('hero bc', page.hero.breadcrumb.length, '| who tags', page.who.tags.length, '| trust', page.trust.items.length, '| stats', page.stats.boxes.length);
console.log('specialties', page.specialties.items.length, 'tabs', page.specialties.tabs.length, 'features', specCount);
console.log('features: tabs', page.features.tabs.length, 'filters', page.features.filters.length, 'cats', page.features.categories.length, 'cards', catCount);
console.log('ambient chips', page.ambient.chips.length, '| rcm', page.rcm.cards.length, '| pay outcomes', page.pay.outcomes.length, '| integration', page.integration.cards.length);
console.log('layers', page.platform.layers.length, '| roadmap', page.roadmap.items.length, '| security', page.security.cards.length, '| stars', page.testimonial.stars);
console.log('drawer steps', page.drawer.steps.length, 'sections', page.drawer.sections.length, '| icons', Object.keys(icons).length);
console.log(miss.length ? 'EMPTY:\n  ' + miss.join('\n  ') : 'every field populated');
