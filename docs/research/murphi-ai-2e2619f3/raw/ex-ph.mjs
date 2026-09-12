import fs from 'fs';
import { decodeEntities } from './html-parse.mjs';
import { decodeDeep } from './decode-deep.mjs';
import { blocks } from './blocks.mjs';

/**
 * /public-health-and-corrections-embed-ai-into-ehr-workflows/ — a hand-authored
 * `.murphi-embed-root` block, structurally the sibling of the behavioural-health
 * page. Static markup is read here; the feature explorer's categories, cards and
 * its keyed glyph library live in the page's own inline script and are sliced
 * out and evaluated rather than re-typed.
 */

const SLUG = 'public-health-and-corrections-embed-ai-into-ehr-workflows';
const raw = fs.readFileSync('b9/' + SLUG + '.html', 'utf8');
const head = raw.slice(0, raw.indexOf('</head>'));
const full = raw.slice(raw.indexOf('<div class="murphi-embed-root">'), raw.indexOf('<section class="connect-modal"'));
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
  const key = `ph-${hint}-${seq++}`;
  icons[key] = markup;
  return key;
};

const headOf = (src) => ({
  eyebrow: dec(grab(src, /<div class="eyebrow[^"]*"[^>]*>([^]*?)<\/div>/)),
  title: dec(grab(src, /<h2 class="sec-title[^"]*"[^>]*>([^]*?)<\/h2>/)),
  sub: dec(grab(src, /<p class="sec-sub[^"]*"[^>]*>([^]*?)<\/p>/)),
});
const sectionAround = (needle) =>
  body.slice(body.lastIndexOf('<section', body.indexOf(needle)), body.indexOf('</section>', body.indexOf(needle)));

/** The shared "browser window" mock used by both the ambient and risk panels. */
const demoCard = (src) => {
  const card = blocks(src, 'demo-card')[0] || '';
  return {
    dots: all(card, /<div class="dm-dot" style="background:(#[0-9A-Fa-f]{6})"><\/div>/g).map((m) => m[1]),
    session: dec(grab(card, /<span class="dm-session">([^]*?)<\/span>/)),
    recording: dec(grab(card, /<span class="dm-rec"><span class="rec-dot"><\/span>([^]*?)<\/span>/)) || null,
    noteLabel: dec(grab(card, /<div class="demo-lbl">([^]*?)<\/div>/)),
    note: spans(grab(card, /<div class="demo-note">([^]*?)<\/div>/)),
    scoresLabel: dec(grab(card, /<div class="demo-lbl" style="margin-bottom:\.5rem">([^]*?)<\/div>/)),
    scores: all(card, /<div class="ds"><div class="ds-name">([^]*?)<\/div><div class="ds-val">([^]*?)<\/div><div class="ds-lbl">([^]*?)<\/div><\/div>/g)
      .map((m) => ({
        name: dec(m[1]),
        value: dec(m[2]),
        icon: /<svg/.test(m[2]) ? keep(svg(m[2]), 'score') : null,
        label: dec(m[3]),
      })),
    actions: all(card, /<button class="da-btn (p|s)">([^]*?)<\/button>/g).map((m) => ({
      variant: m[1] === 'p' ? 'primary' : 'secondary',
      icon: /<svg/.test(m[2]) ? keep(svg(m[2]), 'act') : null,
      label: dec(m[2]),
    })),
  };
};

/* ── hero / who / trust ───────────────────────────────────────────────── */
const hero = body.slice(0, body.indexOf('<section class="who-section">'));
const who = body.slice(body.indexOf('<section class="who-section">'), body.indexOf('<div class="trust-bar">'));
const trust = body.slice(body.indexOf('<div class="trust-bar">'), body.indexOf('<section class="sec sec-white">'));

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
    buttons: all(hero, /<a [^>]*class="btn-(wh|ol-wh)"[^>]*>([^]*?)<\/a>/g).map((m) => ({
      variant: m[1] === 'wh' ? 'solid' : 'outline',
      label: dec(m[2]),
      href: rel(grab(m[0], /href="([^"]+)"/)),
    })),
  },

  who: {
    eyebrow: dec(grab(who, /<div class="who-eyebrow">([^]*?)<\/div>/)),
    title: dec(grab(who, /<h2 class="who-title">([^]*?)<\/h2>/)),
    tags: all(who, /<span class="who-tag">([^]*?)<\/span>/g).map((m) => dec(m[1])),
    desc: dec(grab(who, /<p class="who-desc">([^]*?)<\/p>/)),
  },

  trust: {
    items: blocks(trust, 'trust-item').map((t) => ({ icon: keep(svg(t), 'trust'), label: dec(t) })),
    link: {
      label: dec(grab(trust, /<a[^>]*class="trust-link"[^>]*>([^]*?)<\/a>/)),
      href: rel(grab(trust, /<a href="([^"]+)" class="trust-link"/)),
    },
  },
};

/* ── stats / values ───────────────────────────────────────────────────── */
const stats = sectionAround('stats-row');
page.stats = {
  ...headOf(stats),
  boxes: all(stats, /<div class="stat-box"><span class="sb-val">([^]*?)<\/span><div class="sb-lbl">([^]*?)<\/div><\/div>/g)
    .map((m) => ({ value: dec(m[1]), label: dec(m[2]) })),
};

const vals = sectionAround('val-grid');
page.values = {
  ...headOf(vals),
  cards: blocks(vals, 'val-card').map((c) => ({
    icon: keep(svg(c), 'val'),
    title: dec(grab(c, /<div class="vc-title">([^]*?)<\/div>/)),
    desc: dec(grab(c, /<div class="vc-desc">([^]*?)<\/div>/)),
  })),
};

/* ── ambient ──────────────────────────────────────────────────────────── */
const amb = sectionAround('ambient-grid');
page.ambient = {
  ...headOf(amb),
  chips: all(amb, /<span class="note-chip">([^]*?)<\/span>/g).map((m) => dec(m[1])),
  stats: all(amb, /<span class="as-val">([^]*?)<\/span><div class="as-lbl">([^]*?)<\/div>/g)
    .map((m) => ({ value: dec(m[1]), label: dec(m[2]) })),
  demo: demoCard(amb),
};

/* ── feature explorer ─────────────────────────────────────────────────── */
const feat = sectionAround('murphiFeatureContent');
const sliceLiteral = (name) => {
  const i = script.indexOf(`const ${name}={`) >= 0 ? script.indexOf(`const ${name}={`) : script.indexOf(`const ${name} = {`);
  const start = script.indexOf('{', i);
  let depth = 0;
  for (let k = start; k < script.length; k++) {
    if (script[k] === '{') depth++;
    else if (script[k] === '}') { depth--; if (!depth) return script.slice(start, k + 1); }
  }
  throw new Error('unbalanced ' + name);
};
const LIB = (0, eval)('(' + sliceLiteral('ICON_SVGS') + ')');
const CATS = decodeDeep((0, eval)('(' + sliceLiteral('CATS') + ')'));
const BADGE = (0, eval)('(' + grab(script, /function bc\(t\)\{const m=(\{[^}]*\});/) + ')');
const SHELL = grab(script, /return `(<svg class="icon"[^>]*>)/);

page.features = {
  ...headOf(feat),
  tabs: all(feat, /<button class="tab-btn([^"]*)" data-tab="([^"]+)">([^]*?)<\/button>/g)
    .map((m) => ({ key: m[2], label: dec(m[3]), active: /\bon\b/.test(m[1]) })),
  filters: all(feat, /<button class="fil-btn([^"]*)" data-filter="([^"]+)">([^]*?)<\/button>/g)
    .map((m) => ({ key: m[2], label: dec(m[3]), active: /\bon\b/.test(m[1]) })),
  badgeClasses: BADGE,
  empty: dec(grab(script, /padding:3rem;font-size:14px">([^<]*)<\/p>/)),
  countSuffix: { one: 'feature', many: 'features' },
  categories: Object.entries(CATS).map(([key, cat]) => ({
    key,
    label: cat.label,
    icon: cat.icon,
    tab: cat.tab,
    features: cat.features.map((f) => ({
      name: f.n, desc: f.d, type: f.t, tone: f.c, icon: f.i,
    })),
  })),
};
/* The library glyphs are inner paths only; the page wraps them in one shell. */
page.iconShell = SHELL;
page.iconLibrary = Object.keys(LIB);

/* ── rcm ──────────────────────────────────────────────────────────────── */
const rcm = sectionAround('rcm-grid');
page.rcm = {
  ...headOf(rcm),
  maxWidth: grab(rcm, /class="rcm-grid" style="[^"]*max-width:(\d+)px/) || null,
  cards: blocks(rcm, 'rcm-card').map((c) => ({
    icon: keep(svg(c), 'rcm'),
    badge: dec(grab(c, /<div class="rcm-badge">([^]*?)<\/div>/)),
    title: dec(grab(c, /<div class="rcm-title">([^]*?)<\/div>/)),
    desc: dec(grab(c, /<div class="rcm-desc">([^]*?)<\/div>/)),
    steps: all(c, /<li>([^]*?)<\/li>/g).map((m) => dec(m[1])),
  })),
};

/* ── behaviour & risk (the `pay-grid` slot on this page) ──────────────── */
const risk = sectionAround('pay-grid');
page.risk = {
  ...headOf(risk),
  outcomes: all(risk, /<div class="oc"><div class="oc-val">([^]*?)<\/div><div class="oc-lbl">([^]*?)<\/div><\/div>/g)
    .map((m) => ({ value: dec(m[1]), label: dec(m[2]) })),
  tags: all(risk, /<span class="ptag">([^]*?)<\/span>/g).map((m) => dec(m[1])),
  demo: demoCard(risk),
};

/* ── integration / platform / roadmap / security ──────────────────────── */
const integ = sectionAround('int-grid');
page.integration = {
  ...headOf(integ),
  cards: blocks(integ, 'int-card').map((c) => ({
    icon: keep(svg(c), 'int'),
    title: dec(grab(c, /<div class="int-title">([^]*?)<\/div>/)),
    desc: dec(grab(c, /<div class="int-desc">([^]*?)<\/div>/)),
  })),
};

const plat = sectionAround('layer-stack');
page.platform = {
  ...headOf(plat),
  layers: blocks(plat, 'layer l\\d').map((l) => ({
    tone: grab(l, /<div class="l-eyebrow (\w+)">/),
    eyebrow: dec(grab(l, /<div class="l-eyebrow \w+">([^]*?)<\/div>/)),
    name: dec(grab(l, /<div class="l-name">([^]*?)<\/div>/)),
    chips: all(l, /<span class="chip">([^]*?)<\/span>/g).map((m) => dec(m[1])),
  })),
  callout: spans(grab(plat, /<div class="plat-callout">([^]*?)<\/div>/)),
};

const road = sectionAround('road-grid');
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
  cards: blocks(sec, 'sec-card').map((c) => ({
    icon: keep(svg(c), 'sec'),
    title: dec(grab(c, /<div class="sc-title">([^]*?)<\/div>/)),
    desc: dec(grab(c, /<div class="sc-desc">([^]*?)<\/div>/)),
  })),
};

/* ── drawer ───────────────────────────────────────────────────────────── */
const drawer = body.slice(body.indexOf('<div class="drawer"'));
const dBody = script.slice(script.indexOf('.innerHTML=`'), script.indexOf("getElementById('murphiOverlay').classList.add"));
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
  closeIcon: keep(svg(drawer), 'drawer'),
  cta: {
    label: dec(grab(drawer, /<div class="d-cta">\s*<a[^>]*>([^]*?)<\/a>/)),
    href: rel(grab(drawer, /<div class="d-cta">\s*<a href="([^"]+)"/)),
  },
  stepsLabel: dec(grab(dBody, /<div class="d-sec-lbl">([^<]*)<\/div>/)),
  steps: all(dBody, /<div class="wf-n( [tg])?">(\d)<\/div><div class="wf-txt"><strong>([^]*?)<\/strong>([^]*?)<\/div>/g).map((m) => ({
    tone: (m[1] || '').trim() || null,
    n: m[2],
    strong: branch(m[3]),
    text: branch(m[4]),
  })),
  sections: all(dBody, /<div class="d-sec-lbl">([^<]*)<\/div>\s*<div class="d-chips">([^]*?)<\/div>\s*<\/div>/g).map((m) => ({
    label: dec(m[1]),
    chips: all(m[2], /<span class="d-chip">([^]*?)<\/span>/g).map((c) => dec(c[1])),
  })),
  costLabel: dec(grab(dBody, /<div class="d-sec-lbl">(Zero Token Cost[^<]*)<\/div>/)),
  costBody: dec(grab(dBody, /line-height:1\.65">([^]*?)<\/div>/)),
};

fs.writeFileSync('b9/ph.json', JSON.stringify(page, null, 1));
fs.writeFileSync('b9/ph-icons.json', JSON.stringify({ markup: icons, library: LIB }, null, 1));

/* ── guards ───────────────────────────────────────────────────────────── */
const miss = [];
const OPTIONAL = /[.](href|icon|tone|active|strong|agentic|payments|recording|maxWidth)$/;
const walk = (o, p) => {
  if (o === null || o === undefined) { if (!OPTIONAL.test(p)) miss.push(p); return; }
  if (typeof o === 'string') { if (!o.trim()) miss.push(p); return; }
  if (typeof o !== 'object') return;
  if (Array.isArray(o)) { if (!o.length) miss.push(p); o.forEach((v, i) => walk(v, p + '[' + i + ']')); return; }
  for (const k of Object.keys(o)) walk(o[k], p + '.' + k);
};
walk(page, '');
const featCount = page.features.categories.reduce((s, c) => s + c.features.length, 0);
const unknown = page.features.categories.flatMap((c) => [c.icon, ...c.features.map((f) => f.icon)]).filter((k) => !(k in LIB));
console.log('hero bc', page.hero.breadcrumb.length, '| who tags', page.who.tags.length, '| trust', page.trust.items.length);
console.log('stats', page.stats.boxes.length, '| values', page.values.cards.length, '| ambient chips', page.ambient.chips.length, 'scores', page.ambient.demo.scores.length);
console.log('features: tabs', page.features.tabs.length, 'filters', page.features.filters.length, 'cats', page.features.categories.length, 'cards', featCount);
console.log('rcm', page.rcm.cards.length, '| risk outcomes', page.risk.outcomes.length, 'scores', page.risk.demo.scores.length, '| integration', page.integration.cards.length);
console.log('layers', page.platform.layers.length, '| roadmap', page.roadmap.items.length, '| security', page.security.cards.length);
console.log('drawer steps', page.drawer.steps.length, 'sections', page.drawer.sections.length, '| markup icons', Object.keys(icons).length, '| library', Object.keys(LIB).length);
console.log(unknown.length ? 'ICON MISS: ' + [...new Set(unknown)].join(',') : 'every feature icon resolves');
console.log(miss.length ? 'EMPTY:\n  ' + miss.join('\n  ') : 'every field populated');
