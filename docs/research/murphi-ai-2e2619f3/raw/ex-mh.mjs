import fs from 'fs';
import { decodeEntities } from './html-parse.mjs';
import { decodeDeep } from './decode-deep.mjs';
import { blocks } from './blocks.mjs';

/**
 * /embed-ai-into-ehr-workflows-mental-and-behavioural-health/ — a hand-authored
 * embed. Static markup is read here; the feature explorer's categories, cards
 * and glyphs live in the page's own inline script as one object literal and are
 * sliced out and evaluated rather than re-typed.
 */

const SLUG = 'embed-ai-into-ehr-workflows-mental-and-behavioural-health';
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
  /* A run that is only the whitespace between two tags carries nothing. */
  .filter((s) => s.text.trim());

const icons = {};
let seq = 0;
const keep = (markup, hint) => {
  if (!markup) return null;
  const key = `mh-${hint}-${seq++}`;
  icons[key] = markup;
  return key;
};

/** The `sec` identified by the eyebrow text it carries. */
const secByEye = (eye) => {
  const i = body.indexOf('>' + eye + '<');
  if (i < 0) throw new Error('no section for eyebrow ' + JSON.stringify(eye));
  return body.slice(body.lastIndexOf('<section', i), body.indexOf('</section>', i));
};
const headOf = (src) => ({
  eyebrow: dec(grab(src, /<div class="eyebrow[^"]*"[^>]*>([^]*?)<\/div>/)),
  title: dec(grab(src, /<h2 class="sec-title[^"]*"[^>]*>([^]*?)<\/h2>/)),
  sub: dec(grab(src, /<p class="sec-sub[^"]*"[^>]*>([^]*?)<\/p>/)),
});

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

/* ── stats ────────────────────────────────────────────────────────────── */
const stats = body.slice(body.lastIndexOf('<section', body.indexOf('stats-row')), body.indexOf('</section>', body.indexOf('stats-row')));
page.stats = {
  ...headOf(stats),
  boxes: all(stats, /<div class="stat-box"><span class="sb-val">([^]*?)<\/span><div class="sb-lbl">([^]*?)<\/div><\/div>/g)
    .map((m) => ({ value: dec(m[1]), label: dec(m[2]) })),
};

/* ── value cards ──────────────────────────────────────────────────────── */
const vals = body.slice(body.lastIndexOf('<section', body.indexOf('val-grid')), body.indexOf('</section>', body.indexOf('val-grid')));
page.values = {
  ...headOf(vals),
  cards: blocks(vals, 'val-card').map((c) => ({
    icon: keep(svg(c), 'val'),
    title: dec(grab(c, /<div class="vc-title">([^]*?)<\/div>/)),
    desc: dec(grab(c, /<div class="vc-desc">([^]*?)<\/div>/)),
  })),
};

/* ── ambient demo ─────────────────────────────────────────────────────── */
const amb = body.slice(body.indexOf('<section class="sec sec-blue">'), body.indexOf('</section>', body.indexOf('demo-acts')));
const note = grab(amb, /<div class="demo-note">([^]*?)<\/div>/);
page.ambient = {
  ...headOf(amb),
  chips: all(amb, /<span class="note-chip">([^]*?)<\/span>/g).map((m) => dec(m[1])),
  stats: all(amb, /<span class="as-val">([^]*?)<\/span><div class="as-lbl">([^]*?)<\/div>/g)
    .map((m) => ({ value: dec(m[1]), label: dec(m[2]) })),
  demo: {
    dots: all(amb, /<div class="dm-dot" style="background:(#[0-9A-Fa-f]{6})"><\/div>/g).map((m) => m[1]),
    session: dec(grab(amb, /<span class="dm-session">([^]*?)<\/span>/)),
    recording: dec(grab(amb, /<span class="dm-rec"><span class="rec-dot"><\/span>([^]*?)<\/span>/)),
    noteLabel: dec(grab(amb, /<div class="demo-lbl">([^]*?)<\/div>/)),
    note: spans(note),
    scoresLabel: dec(grab(amb, /<div class="demo-lbl" style="margin-bottom:\.5rem">([^]*?)<\/div>/)),
    scores: all(amb, /<div class="ds"><div class="ds-name">([^]*?)<\/div><div class="ds-val">([^]*?)<\/div><div class="ds-lbl">([^]*?)<\/div><\/div>/g)
      .map((m) => ({ name: dec(m[1]), value: dec(m[2]), label: dec(m[3]) })),
    actions: all(amb, /<button class="da-btn (p|s)">([^]*?)<\/button>/g)
      .map((m) => ({ variant: m[1] === 'p' ? 'primary' : 'secondary', label: dec(m[2]) })),
  },
};

/* ── feature explorer ─────────────────────────────────────────────────── */
const feat = body.slice(body.indexOf('<section class="sec sec-white" id="features">'), body.indexOf('</section>', body.indexOf('featureContent')));
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
const CATS = decodeDeep((0, eval)('(' + sliceLiteral('CATS') + ')'));
const BADGE = (0, eval)('(' + grab(script, /function bc\(t\)\{const m=(\{[^}]*\});/) + ')');

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
    icon: keep(cat.icon, 'cat'),
    tab: cat.tab,
    features: cat.features.map((f) => ({
      name: f.n, desc: f.d, type: f.t, tone: f.c, icon: keep(f.i, 'feat'),
    })),
  })),
};

/* ── RCM ──────────────────────────────────────────────────────────────── */
const rcm = body.slice(body.lastIndexOf('<section', body.indexOf('rcm-grid')), body.indexOf('</section>', body.indexOf('rcm-grid')));
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

/* ── patient payments ─────────────────────────────────────────────────── */
const pay = body.slice(body.lastIndexOf('<section', body.indexOf('pay-grid')), body.indexOf('</section>', body.indexOf('pay-grid')));
page.pay = {
  ...headOf(pay),
  outcomes: all(pay, /<div class="oc"><div class="oc-val">([^]*?)<\/div><div class="oc-lbl">([^]*?)<\/div><\/div>/g)
    .map((m) => ({ value: dec(m[1]), label: dec(m[2]) })),
  tags: all(pay, /<span class="ptag">([^]*?)<\/span>/g).map((m) => dec(m[1])),
  phone: {
    title: dec(grab(pay, /<div class="pb-title">([^]*?)<\/div>/)),
    sms: spans(grab(pay, /<div class="sms-bubble">([^]*?)<\/div>/)),
    amountLabel: dec(grab(pay, /<div class="amt-lbl">([^]*?)<\/div>/)),
    amount: dec(grab(pay, /<div class="amt-val">([^]*?)<\/div>/)),
    amountSub: dec(grab(pay, /<div class="amt-sub">([^]*?)<\/div>/)),
    button: dec(grab(pay, /<button class="pay-btn">([^]*?)<\/button>/)),
    note: dec(grab(pay, /<div class="phone-note">([^]*?)<\/div>/)),
  },
};

/* ── integration options ──────────────────────────────────────────────── */
const integ = secByEye('Integration Options');
page.integration = {
  ...headOf(integ),
  cards: blocks(integ, 'int-card').map((c) => ({
    icon: keep(svg(c), 'int'),
    title: dec(grab(c, /<div class="int-title">([^]*?)<\/div>/)),
    desc: dec(grab(c, /<div class="int-desc">([^]*?)<\/div>/)),
  })),
};

/* ── platform layers ──────────────────────────────────────────────────── */
const plat = body.slice(body.lastIndexOf('<section', body.indexOf('layer-stack')), body.indexOf('</section>', body.indexOf('plat-callout')));
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

/* ── testimonials ─────────────────────────────────────────────────────── */
const testi = body.slice(body.lastIndexOf('<section', body.indexOf('testi-grid')), body.indexOf('</section>', body.indexOf('testi-grid')));
page.testimonials = {
  ...headOf(testi),
  cards: blocks(testi, 'tc').map((c) => ({
    stars: dec(grab(c, /<div class="tc-stars">([^]*?)<\/div>/)),
    quote: dec(grab(c, /<div class="tc-quote">([^]*?)<\/div>/)),
    initials: dec(grab(c, /<div class="tc-av">([^]*?)<\/div>/)),
    name: dec(grab(c, /<div class="tc-name">([^]*?)<\/div>/)),
    role: dec(grab(c, /<div class="tc-role">([^]*?)<\/div>/)),
    tag: dec(grab(c, /<div class="tc-tag">([^]*?)<\/div>/)),
  })),
};

/* ── roadmap ──────────────────────────────────────────────────────────── */
const road = body.slice(body.lastIndexOf('<section', body.indexOf('road-grid')), body.indexOf('</section>', body.indexOf('road-grid')));
page.roadmap = {
  ...headOf(road),
  items: blocks(road, 'rs').map((r) => ({
    n: dec(grab(r, /<div class="rs-n">([^]*?)<\/div>/)),
    title: dec(grab(r, /<div class="rs-title">([^]*?)<\/div>/)),
    desc: dec(grab(r, /<div class="rs-desc">([^]*?)<\/div>/)),
  })),
};

/* ── security ─────────────────────────────────────────────────────────── */
const sec = body.slice(body.lastIndexOf('<section', body.indexOf('sec-cards')), body.indexOf('</section>', body.indexOf('sec-cards')));
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
const dBody = script.slice(script.indexOf('body.innerHTML=`'), script.indexOf("overlay.classList.add('on')"));
/** Each workflow step's copy branches on the feature type, in the page's own script. */
const branch = (raw) => {
  const t = String(raw).trim();
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
  stepsLabel: dec(grab(dBody, /<div class="d-sec-lbl">([^]*?)<\/div>/)),
  steps: all(dBody, /<div class="wf-n( [tg])?">(\d)<\/div><div class="wf-txt"><strong>([^]*?)<\/strong>([^]*?)<\/div>/g).map((m) => ({
    tone: (m[1] || '').trim() || null,
    n: m[2],
    strong: branch(m[3]),
    text: branch(m[4]),
  })),
  /* Only the two chip sections — `[^<]*` keeps the label from swallowing the
     workflow-step markup that precedes them. */
  sections: all(dBody, /<div class="d-sec-lbl">([^<]*)<\/div>\s*<div class="d-chips">([^]*?)<\/div>\s*<\/div>/g).map((m) => ({
    label: dec(m[1]),
    chips: all(m[2], /<span class="d-chip">([^]*?)<\/span>/g).map((c) => dec(c[1])),
  })),
  costLabel: dec(grab(dBody, /<div class="d-sec-lbl">(Zero Token Cost[^<]*)<\/div>/)),
  costBody: dec(grab(dBody, /line-height:1\.65">([^]*?)<\/div>/)),
};

fs.writeFileSync('b9/mh.json', JSON.stringify(page, null, 1));
fs.writeFileSync('b9/mh-icons.json', JSON.stringify(icons, null, 1));

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
const featCount = page.features.categories.reduce((s, c) => s + c.features.length, 0);
console.log('hero bc', page.hero.breadcrumb.length, 'buttons', page.hero.buttons.length, '| who tags', page.who.tags.length, '| trust', page.trust.items.length);
console.log('stats', page.stats.boxes.length, '| values', page.values.cards.length, '| ambient chips', page.ambient.chips.length, 'scores', page.ambient.demo.scores.length);
console.log('features: tabs', page.features.tabs.length, 'filters', page.features.filters.length, 'cats', page.features.categories.length, 'cards', featCount);
console.log('rcm', page.rcm.cards.length, '| pay outcomes', page.pay.outcomes.length, '| integration', page.integration.cards.length, '| layers', page.platform.layers.length);
console.log('testimonials', page.testimonials.cards.length, '| roadmap', page.roadmap.items.length, '| security', page.security.cards.length);
console.log('drawer steps', page.drawer.steps.length, 'sections', page.drawer.sections.length, '| icons', Object.keys(icons).length);
console.log(miss.length ? 'EMPTY:\n  ' + miss.join('\n  ') : 'every field populated');
