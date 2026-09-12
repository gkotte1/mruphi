import fs from 'fs';
import { decodeEntities } from './html-parse.mjs';
import { decodeDeep } from './decode-deep.mjs';
import { blocks } from './blocks.mjs';

/**
 * /ehr-ai-integration-platform/ — a hand-authored `.mv-widget` block.
 *
 * The static sections are read straight out of the markup; the feature
 * explorer's card data and icon library live in the page's own inline script
 * as plain object literals, so those are sliced out and evaluated rather than
 * re-typed.
 */

const raw = fs.readFileSync('b9/ehr-ai-integration-platform.html', 'utf8');
const head = raw.slice(0, raw.indexOf('</head>'));
const body = raw.slice(raw.indexOf('<section class="hero">'), raw.indexOf('<section class="connect-modal"'));

const dec = (s) => decodeEntities(String(s).replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
const grab = (src, re) => { const m = String(src).match(re); return m ? m[1] : ''; };
const all = (src, re) => [...String(src).matchAll(re)];
const rel = (u) => (u || '').replace(/^https?:\/\/murphi\.ai/, '') || '/';
const svg = (s) => (String(s).match(/<svg[^]*?<\/svg>/) || [''])[0];

const section = (cls) => {
  const i = body.indexOf(`class="${cls}"`);
  if (i < 0) return '';
  return body.slice(body.lastIndexOf('<section', i), body.indexOf('</section>', i));
};

const header = (src) => ({
  tag: dec(grab(src, /<div class="section-tag">([^]*?)<\/div>/)),
  title: dec(grab(src, /<h2 class="section-title">([^]*?)<\/h2>/)),
  sub: dec(grab(src, /<p class="section-sub">([^]*?)<\/p>/)),
});

/* ── hero ─────────────────────────────────────────────────────────────── */
const hero = section('hero');
const heroDiagram = hero.slice(hero.indexOf('class="hero-diagram"'));
const icons = {};      // key → raw <svg> markup
let iconSeq = 0;
const keep = (markup, hint) => {
  if (!markup) return null;
  const key = `ehr-${hint}-${iconSeq++}`;
  icons[key] = markup;
  return key;
};

const page = {
  slug: 'ehr-ai-integration-platform',
  title: dec(grab(head, /<title>([^<]*)<\/title>/)),
  description: decodeEntities(grab(head, /<meta name="description" content="([^"]*)"/)),

  hero: {
    pills: all(hero, /<(div|a)[^>]*class="hero-eyebrow[^"]*"[^>]*>([^<]*)<\/\1>/g).map((m) => ({
      label: dec(m[2]),
      href: /hero-eyebrow-link/.test(m[0]) ? rel(grab(m[0], /href="([^"]+)"/)) : null,
    })),
    h1Before: dec(grab(hero, /<h1>([^<]*)<em>/)),
    h1Em: dec(grab(hero, /<em>([^<]*)<\/em>/)),
    h1After: dec(grab(hero, /<\/em>([^<]*)<\/h1>/)),
    sub: dec(grab(hero, /<p class="hero-sub">([^]*?)<\/p>/)),
    buttons: all(hero, /<a[^>]*class="btn-hero-(primary|outline)"[^>]*>([^]*?)<\/a>/g).map((m) => ({
      variant: m[1], label: dec(m[2]), href: rel(grab(m[0], /href="([^"]+)"/)),
    })),
    nodes: blocks(heroDiagram, 'hero-node').map((n) => ({
      icon: keep(svg(n), 'node'),
      label: dec(grab(n, /<div class="node-label">([^]*?)<\/div>/)),
      sub: dec(grab(n, /<div class="node-sub">([^]*?)<\/div>/)),
    })),
    arrow: dec(grab(heroDiagram, /<div class="hero-arrow">([^]*?)<\/div>/)),
    ai: {
      logo: dec(grab(heroDiagram, /<div class="ai-logo">([^]*?)<\/div>/)),
      label: dec(grab(heroDiagram, /<div class="ai-label">([^]*?)<\/div>/)),
      chips: all(heroDiagram, /<span class="cap-chip">([^]*?)<\/span>/g).map((m) => dec(m[1])),
    },
  },
};

/* ── value strip ──────────────────────────────────────────────────────── */
const strip = section('value-strip');
page.valueStrip = {
  message: dec(grab(strip, /<p class="value-strip-msg">([^]*?)<\/p>/)),
  cards: blocks(strip, 'value-card').map((c) => ({
    icon: keep(svg(c), 'value'),
    title: dec(grab(c, /<div class="vc-title">([^]*?)<\/div>/)),
    desc: dec(grab(c, /<div class="vc-desc">([^]*?)<\/div>/)),
  })),
};

/* ── feature explorer ─────────────────────────────────────────────────── */
const feat = section('feature-section');
page.features = {
  ...header(feat),
  tabs: all(feat, /<button class="tab-btn[^"]*" data-tab="([^"]+)">([^]*?)<\/button>/g)
    .map((m) => ({ key: m[1], label: dec(m[2]) })),
  filters: all(feat, /<button class="filter-btn[^"]*" data-filter="([^"]+)">([^]*?)<\/button>/g)
    .map((m) => ({ key: m[1], label: dec(m[2]) })),
  empty: dec(grab(body, /No features match the selected filter\.([^]*?)</) || 'x') && 'No features match the selected filter.',
};

/* the card data and icon library, evaluated from the page's own script */
const sliceLiteral = (name) => {
  const i = body.indexOf(`const ${name} = {`);
  const start = body.indexOf('{', i);
  let depth = 0;
  for (let k = start; k < body.length; k++) {
    if (body[k] === '{') depth++;
    else if (body[k] === '}') { depth--; if (!depth) return body.slice(start, k + 1); }
  }
  throw new Error('unbalanced ' + name);
};
const LIB = (0, eval)('(' + sliceLiteral('ICONS') + ')');
const FEATURES = decodeDeep((0, eval)('(' + sliceLiteral('FEATURES') + ')'));
page.features.groups = Object.entries(FEATURES).map(([key, g]) => ({
  key, label: g.label, color: g.color,
  categories: Object.entries(g.categories).map(([name, list]) => ({
    name,
    items: list.map((f) => ({
      name: f.name, desc: f.desc, type: f.type, icon: f.icon,
      iconColor: f.iconColor, category: f.category,
    })),
  })),
}));
page.features.settingLabels = { shared: 'All Settings', homeheath: 'Home Health', hospice: 'Hospice & Palliative' };

/* ── platform ─────────────────────────────────────────────────────────── */
const plat = section('platform-section');
page.platform = {
  ...header(plat),
  layers: blocks(plat, 'platform-layer').map((l) => ({
    tone: grab(l, /<div class="layer-label (\w+)">/),
    label: dec(grab(l, /<div class="layer-label \w+">([^]*?)<\/div>/)),
    name: dec(grab(l, /<div class="layer-name">([^]*?)<\/div>/)),
    chips: all(l, /<span class="layer-chip">([^]*?)<\/span>/g).map((c) => dec(c[1])),
  })),
  calloutStrong: dec(grab(plat, /<div class="platform-callout">\s*<strong>([^]*?)<\/strong>/)),
  calloutRest: dec(grab(plat, /<\/strong>([^]*?)<\/div>/)),
};

/* ── integration options ──────────────────────────────────────────────── */
const integ = section('integration-section');
page.integration = {
  ...header(integ),
  cards: blocks(integ, 'int-card').map((c) => ({
    icon: keep(svg(c), 'int'),
    title: dec(grab(c, /<div class="int-title">([^]*?)<\/div>/)),
    desc: dec(grab(c, /<div class="int-desc">([^]*?)<\/div>/)),
  })),
};

/* ── roadmap ──────────────────────────────────────────────────────────── */
const road = section('roadmap-section');
page.roadmap = {
  ...header(road),
  steps: blocks(road, 'rs-step').map((s) => ({
    tone: grab(s, /<div class="rs-num (n\d)">/),
    num: dec(grab(s, /<div class="rs-num n\d">([^]*?)<\/div>/)),
    title: dec(grab(s, /<div class="rs-title">([^]*?)<\/div>/)),
    desc: dec(grab(s, /<div class="rs-desc">([^]*?)<\/div>/)),
  })),
  note: dec(grab(road, /<p class="roadmap-note">([^]*?)<\/p>/)),
};

/* ── security ─────────────────────────────────────────────────────────── */
const sec = section('security-section');
page.security = {
  ...header(sec),
  cards: blocks(sec, 'sec-card').map((c) => ({
    icon: keep(svg(c), 'sec'),
    title: dec(grab(c, /<div class="sec-title">([^]*?)<\/div>/)),
    desc: dec(grab(c, /<div class="sec-desc">([^]*?)<\/div>/)),
  })),
};

/* ── drawer ───────────────────────────────────────────────────────────── */
const drawerMarkup = body.slice(body.indexOf('<div class="drawer" id="mv-featureDrawer"'));
const drawerBody = body.slice(body.indexOf("getElementById('mv-drawerBody').innerHTML = `"), body.indexOf("document.getElementById('mv-drawerOverlay').classList.add"));
page.drawer = {
  closeIcon: keep(svg(drawerMarkup), 'drawer'),
  cta: {
    label: dec(grab(drawerMarkup, /<div class="drawer-cta">\s*<a[^>]*>([^]*?)<\/a>/)),
    href: rel(grab(drawerMarkup, /<div class="drawer-cta">\s*<a href="([^"]+)"/)),
  },
  sections: all(drawerBody, /<div class="drawer-section">([^]*?)(?=<div class="drawer-section">|$)/g).map((m) => ({
    label: dec(grab(m[1], /<div class="drawer-section-label">([^]*?)<\/div>/)),
    steps: all(m[1], /<div class="wf-step( review)?"><div class="wf-step-num( \w+)?">(\d+)<\/div><div class="wf-step-text"><strong>([^]*?)<\/strong>([^]*?)<\/div>/g)
      .map((s) => ({ review: !!s[1], numTone: (s[2] || '').trim() || null, num: s[3], strong: dec(s[4]), text: dec(s[5]) })),
    chips: all(m[1], /<span class="drawer-chip">([^]*?)<\/span>/g).map((c) => dec(c[1])),
  })),
};

/* ── icon library from the script (feature-card glyphs) ───────────────── */
page.iconLibrary = Object.keys(LIB);
page.iconFallback = 'file-text';

fs.writeFileSync('b9/ehr.json', JSON.stringify(page, null, 1));
fs.writeFileSync('b9/ehr-icons.json', JSON.stringify({ markup: icons, library: LIB }, null, 1));

/* ── guards ───────────────────────────────────────────────────────────── */
const miss = [];
const walk = (o, p) => {
  if (o === null || o === undefined) { if (!/\.href$|\.numTone$/.test(p)) miss.push(p); return; }
  if (typeof o === 'string') { if (!o.trim()) miss.push(p); return; }
  if (typeof o !== 'object') return;
  if (Array.isArray(o)) { if (!o.length) miss.push(p); o.forEach((v, i) => walk(v, p + '[' + i + ']')); return; }
  for (const k of Object.keys(o)) walk(o[k], p + '.' + k);
};
walk(page, '');
const feats = page.features.groups.flatMap((g) => g.categories.flatMap((c) => c.items));
console.log('hero pills', page.hero.pills.length, '| buttons', page.hero.buttons.length, '| nodes', page.hero.nodes.length, '| chips', page.hero.ai.chips.length);
console.log('value cards', page.valueStrip.cards.length, '| tabs', page.features.tabs.length, '| filters', page.features.filters.length);
console.log('feature groups', page.features.groups.length, '| categories', page.features.groups.reduce((s, g) => s + g.categories.length, 0), '| features', feats.length);
console.log('platform layers', page.platform.layers.length, '| integration', page.integration.cards.length, '| roadmap', page.roadmap.steps.length, '| security', page.security.cards.length);
console.log('drawer sections', page.drawer.sections.length, '| wf steps', page.drawer.sections[0]?.steps.length, '| icons markup', Object.keys(icons).length, '| library', Object.keys(LIB).length);
const unknown = feats.map((f) => f.icon).filter((k) => !(k in LIB));
console.log(unknown.length ? 'ICON MISS: ' + [...new Set(unknown)].join(',') : 'every feature icon resolves');
console.log(miss.length ? 'EMPTY:\n  ' + miss.join('\n  ') : 'every field populated');
