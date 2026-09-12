import fs from 'fs';
import { decodeEntities } from './html-parse.mjs';
import { blocks } from './blocks.mjs';

/**
 * /ai-for-managed-care-functions-health-system-and-hospitals/ — a hand-authored
 * `.murphi-mc-embed` block. Static markup is read here; the contract-analyzer
 * findings live in the page's own inline script as an array literal and are
 * sliced out and evaluated rather than re-typed.
 */

const SLUG = 'ai-for-managed-care-functions-health-system-and-hospitals';
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

/**
 * Split a run of inline HTML into plain/`<strong>` spans, keeping the spaces
 * either side of each tag — collapsing them would glue the words together.
 */
const spans = (src) => String(src)
  .split(/(<strong[^>]*>[^]*?<\/strong>)/)
  .filter((s) => s !== '')
  .map((s) => {
    const strong = /^<strong/.test(s);
    const text = decodeEntities(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ');
    return strong
      ? { text: text.trim(), strong: true, color: (s.match(/color:var\(--(\w+)\)/) || [, null])[1] }
      : { text };
  })
  .filter((s) => s.text);

const icons = {};
let seq = 0;
const keep = (markup, hint) => {
  if (!markup) return null;
  const key = `mc-${hint}-${seq++}`;
  icons[key] = markup;
  return key;
};

/** A `sec` identified by the eyebrow text it carries. */
const secByEye = (eye) => {
  const i = body.indexOf('>' + eye + '<');
  if (i < 0) throw new Error('no section for eyebrow ' + JSON.stringify(eye));
  const start = body.lastIndexOf('<section', i);
  return body.slice(start, body.indexOf('</section>', i));
};
const headOf = (src) => ({
  eye: dec(grab(src, /<div class="eye[^"]*">([^]*?)<\/div>/)),
  h2: dec(grab(src, /<h2 class="sec-h2[^"]*">([^]*?)<\/h2>/)),
  sub: dec(grab(src, /<p class="sec-sub[^"]*"[^>]*>([^]*?)<\/p>/)),
});

/* ── hero ─────────────────────────────────────────────────────────────── */
const hero = body.slice(body.indexOf('<section class="hero">'), body.indexOf('<section class="who">'));
const advisor = blocks(hero, 'hero-advisor')[0] || '';

const page = {
  slug: SLUG,
  title: dec(grab(head, /<title>([^<]*)<\/title>/)),
  description: decodeEntities(grab(head, /<meta name="description" content="([^"]*)"/)),

  hero: {
    breadcrumb: all(hero, /<(a|span)[^>]*class="bc-pill([^"]*)"[^>]*>([^]*?)<\/\1>/g).map((m) => ({
      label: dec(m[3]),
      tone: /white/.test(m[2]) ? 'white' : /on/.test(m[2]) ? 'on' : 'plain',
      href: m[1] === 'a' ? rel(grab(m[0], /href="([^"]+)"/)) : null,
      icon: m[1] === 'a' ? keep(svg(m[0]), 'bc') : null,
    })),
    separator: dec(grab(hero, /<span class="bc-sep">([^]*?)<\/span>/)),
    h1: dec(grab(hero, /<h1>([^]*?)<\/h1>/)),
    sub: dec(grab(hero, /<p class="hero-sub">([^]*?)<\/p>/)),
    buttons: all(hero, /<a[^>]*class="btn-(wh|ol)"[^>]*>([^]*?)<\/a>/g).map((m) => ({
      variant: m[1], label: dec(m[2]), href: rel(grab(m[0], /href="([^"]+)"/)),
    })),
    advisor: {
      initials: dec(grab(advisor, /<div class="ha-av">([^]*?)<\/div>/)),
      name: dec(grab(advisor, /<strong>([^]*?)<\/strong>/)),
      text: dec(grab(advisor, /<\/strong>([^]*?)<div class="ha-tag">/)),
      tag: dec(grab(advisor, /<div class="ha-tag">([^]*?)<\/div>/)),
    },
  },
};

/* ── who + trust ──────────────────────────────────────────────────────── */
const who = body.slice(body.indexOf('<section class="who">'), body.indexOf('<div class="trust">'));
const trust = body.slice(body.indexOf('<div class="trust">'), body.indexOf('<section class="sec sw">'));
page.who = {
  eye: dec(grab(who, /<div class="who-eye">([^]*?)<\/div>/)),
  h2: dec(grab(who, /<h2 class="who-h2">([^]*?)<\/h2>/)),
  tags: all(who, /<span class="who-tag">([^]*?)<\/span>/g).map((m) => dec(m[1])),
  p: dec(grab(who, /<p class="who-p">([^]*?)<\/p>/)),
};
page.trust = {
  items: blocks(trust, 'ti').map((t) => ({ icon: keep(svg(t), 'trust'), label: dec(t) })),
  link: {
    label: dec(grab(trust, /<a[^>]*class="tl"[^>]*>([^]*?)<\/a>/)),
    href: rel(grab(trust, /<a href="([^"]+)" class="tl"/)),
  },
};

/* ── stats ────────────────────────────────────────────────────────────── */
const stats = secByEye('Why It Matters');
page.stats = {
  ...headOf(stats),
  boxes: blocks(stats, 'sbox').map((b) => ({
    value: dec(grab(b, /<span class="sv">([^]*?)<\/span>/)),
    label: dec(grab(b, /<div class="sl">([^]*?)<\/div>/)),
  })),
};

/* ── PADU+ explainer ──────────────────────────────────────────────────── */
const padu = body.slice(body.indexOf('<section class="padu-section">'), body.indexOf('</section>', body.indexOf('padu-visual')));
const paduProse = grab(padu, /<p style="font-size:13\.5px[^"]*">([^]*?)<\/p>/);
page.padu = {
  ...headOf(padu),
  /* The trailing paragraph mixes plain text with <strong> runs. */
  prose: spans(paduProse),
  rows: blocks(padu, 'padu-row').map((r) => ({
    badge: grab(r, /<div class="padu-badge (\w+)">/),
    letter: dec(grab(r, /<div class="padu-badge \w+">([^]*?)<\/div>/)),
    title: dec(grab(r, /<div class="padu-row-title">([^]*?)<\/div>/)),
    desc: dec(grab(r, /<div class="padu-row-desc">([^]*?)<\/div>/)),
    example: dec(grab(r, /<div class="padu-row-example">([^]*?)<\/div>/)),
  })),
};

/* ── contract analyzer ────────────────────────────────────────────────── */
const demoSec = secByEye('Live Product Demo');
const demo = blocks(demoSec, 'analyzer-demo')[0];
const sidebar = blocks(demo, 'ad-sidebar')[0];
const labels = all(sidebar, /<div class="ads-label">([^]*?)<\/div>/g).map((m) => dec(m[1]));
/* `ads-doc` only — not its `ads-doc-ico` / `-name` / `-sub` children. */
const docs = blocks(sidebar, 'ads-doc(?: on)?').map((d) => ({
  icon: keep(svg(d), 'doc'),
  tone: grab(d, /<div class="ads-doc-ico (\w+)">/) || null,
  name: dec(grab(d, /<div class="ads-doc-name">([^]*?)<\/div>/)),
  sub: dec(grab(d, /<div class="ads-doc-sub">([^]*?)<\/div>/)),
}));
docs.forEach((d, i) => { d.active = /ads-doc on/.test(sidebar) && i === 0; });

page.analyzer = {
  ...headOf(demoSec),
  topbar: {
    dots: all(demo, /<div class="ad-dot" style="background:(#[0-9A-Fa-f]{6})"><\/div>/g).map((m) => m[1]),
    title: dec(grab(demo, /<div class="ad-title">([^]*?)<\/div>/)),
    badge: dec(grab(demo, /<div class="ad-badge">([^]*?)<\/div>/)),
  },
  contractsLabel: labels[0],
  contracts: docs.slice(0, 3),
  referenceLabel: labels[1],
  references: docs.slice(3),
  summaryLabel: labels[2],
  summary: all(sidebar, /background:var\(--padu-(\w)\);display:inline-block"><\/span>([^<]*)<\/span>\s*<strong style="color:var\(--padu-\w\)">([^<]*)<\/strong>/g)
    .map((m) => ({ tone: m[1], label: dec(m[2]), count: dec(m[3]) })),
  tabs: all(demo, /<button class="adm-tab([^"]*)" type="button" data-tab="(\w+)">([^]*?)<\/button>/g).map((m) => ({
    key: m[2],
    label: dec(m[3]),
    dot: /m-dot/.test(m[3]) ? keep(svg(m[3]), 'dot') : null,
    active: /\bon\b/.test(m[1]),
  })),
};

/* findings + the phrases the demo highlights, from the page's own script */
const sliceArray = (name) => {
  const i = script.indexOf(`const ${name} = [`);
  const start = script.indexOf('[', i);
  let depth = 0;
  for (let k = start; k < script.length; k++) {
    if (script[k] === '[') depth++;
    else if (script[k] === ']') { depth--; if (!depth) return script.slice(start, k + 1); }
  }
  throw new Error('unbalanced ' + name);
};
page.analyzer.findings = (0, eval)(sliceArray('FINDINGS'));
page.analyzer.highlights = (0, eval)(grab(script, /const highlights=(\[[^\]]*\]);/));
page.analyzer.statusLabels = (0, eval)('(' + grab(script, /const l=(\{[^}]*\});/) + ')');
page.analyzer.emptyText = dec(grab(script, />No findings in this category\.<\/p>'/) || 'x') && 'No findings in this category.';
page.analyzer.placeholder = dec(grab(script, /font-size:11\.5px">([^<]*)<\/div>'/));
page.analyzer.evidenceLabel = dec(grab(script, /<div class="ade-label">([^-]*)— \$\{f\.clause\}/));
page.analyzer.compareLabel = dec(grab(script, /<div class="ade-compare-label">([^]*?)<\/div>/));
page.analyzer.notesLabel = dec(grab(script, /<div class="ade-label" style="margin-top:\.75rem">([^]*?)<\/div>/));
page.analyzer.notePlaceholder = decodeEntities(grab(script, /placeholder="([^"]*)"/));
page.analyzer.saveLabel = dec(grab(script, /<button class="ade-save" type="button">([^]*?)<\/button>/));
page.analyzer.savedLabel = dec(grab(script, /stroke-linejoin:round!important"><path d="M5 13l4 4L19 7"\/><\/svg>([^']*)'/));

/* ── steps ────────────────────────────────────────────────────────────── */
const steps = secByEye('How It Works');
page.steps = {
  ...headOf(steps),
  items: blocks(steps, 'step-item').map((s) => ({
    n: dec(grab(s, /<div class="step-n">([^]*?)<\/div>/)),
    title: dec(grab(s, /<div class="step-title">([^]*?)<\/div>/)),
    desc: dec(grab(s, /<div class="step-desc">([^]*?)<\/div>/)),
  })),
};

/* ── feature cards ────────────────────────────────────────────────────── */
const feats = secByEye('Module Features');
page.features = {
  ...headOf(feats),
  cards: blocks(feats, 'feat-card').map((c, i) => {
    const openTag = all(feats, /<div class="feat-card" data-drawer='([^']*)'>/g)[i];
    return {
      icon: keep(svg(c), 'feat'),
      status: /class="fc-soon"/.test(c) ? 'soon' : 'live',
      statusLabel: dec(grab(c, /<div class="fc-(?:live|soon)">([^]*?)<\/div>/)),
      title: dec(grab(c, /<div class="fc-title">([^]*?)<\/div>/)),
      desc: dec(grab(c, /<div class="fc-desc">([^]*?)<\/div>/)),
      items: all(c, /<li>([^]*?)<\/li>/g).map((m) => dec(m[1])),
      drawer: openTag ? JSON.parse(decodeEntities(openTag[1])) : null,
    };
  }),
};

/* ── use cases ────────────────────────────────────────────────────────── */
const uc = secByEye('Use Cases');
page.useCases = {
  ...headOf(uc),
  items: blocks(uc, 'uc').map((u) => ({
    role: dec(grab(u, /<div class="uc-role">([^]*?)<\/div>/)),
    title: dec(grab(u, /<div class="uc-title">([^]*?)<\/div>/)),
    desc: dec(grab(u, /<div class="uc-desc">([^]*?)<\/div>/)),
    tags: all(u, /<span class="uc-tag">([^]*?)<\/span>/g).map((m) => dec(m[1])),
  })),
};

/* ── roadmap ──────────────────────────────────────────────────────────── */
const road = secByEye("What's Live · What's Next");
page.roadmap = {
  ...headOf(road),
  items: blocks(road, 'rs').map((r) => {
    const bubble = grab(r, /<div class="rs-n"[^>]*>([^]*?)<\/div>/);
    return {
      tone: grab(r, /<div class="rs-n" style="background:var\(--(\w+)\)">/),
      icon: /<svg/.test(bubble) ? keep(svg(bubble), 'road') : null,
      n: dec(bubble),
      title: dec(grab(r, /<div class="rs-title">([^]*?)<\/div>/)),
      desc: spans(grab(r, /<div class="rs-desc">([^]*?)<\/div>/)),
    };
  }),
};

/* ── security ─────────────────────────────────────────────────────────── */
const sec = secByEye('Security &amp; Governance');
page.security = {
  ...headOf(sec),
  cards: blocks(sec, 'sc').map((c) => ({
    icon: keep(svg(c), 'sec'),
    title: dec(grab(c, /<div class="sc-title">([^]*?)<\/div>/)),
    desc: dec(grab(c, /<div class="sc-desc">([^]*?)<\/div>/)),
  })),
};

/* ── drawer shell ─────────────────────────────────────────────────────── */
const drawer = body.slice(body.indexOf('<div class="drawer"'));
const dBody = script.slice(script.indexOf("querySelector('#mcDBody').innerHTML=`"), script.indexOf('overlayEl.classList.add'));
page.drawer = {
  closeIcon: keep(svg(drawer), 'drawer'),
  cta: {
    label: dec(grab(drawer, /<div class="d-cta"><a[^>]*>([^]*?)<\/a>/)),
    href: rel(grab(drawer, /<div class="d-cta"><a href="([^"]+)"/)),
  },
  sections: all(dBody, /<div class="d-sl">([^]*?)<\/div>([^]*?)(?=<div class="d-sec">|$)/g).map((m) => ({
    label: dec(m[1]),
    chips: all(m[2], /<span class="d-chip">([^]*?)<\/span>/g).map((c) => dec(c[1])),
  })),
};

fs.writeFileSync('b9/mc.json', JSON.stringify(page, null, 1));
fs.writeFileSync('b9/mc-icons.json', JSON.stringify(icons, null, 1));

/* ── guards ───────────────────────────────────────────────────────────── */
const miss = [];
const OPTIONAL = /\.(href|icon|tone|dot|active|numTone|drawer)$/;
const walk = (o, p) => {
  if (o === null || o === undefined) { if (!OPTIONAL.test(p)) miss.push(p); return; }
  if (typeof o === 'string') { if (!o.trim()) miss.push(p); return; }
  if (typeof o !== 'object') return;
  if (Array.isArray(o)) { if (!o.length) miss.push(p); o.forEach((v, i) => walk(v, p + '[' + i + ']')); return; }
  for (const k of Object.keys(o)) walk(o[k], p + '.' + k);
};
walk(page, '');
console.log('hero bc', page.hero.breadcrumb.length, '| buttons', page.hero.buttons.length, '| who tags', page.who.tags.length);
console.log('trust', page.trust.items.length, '| stats', page.stats.boxes.length, '| padu rows', page.padu.rows.length, 'prose', page.padu.prose.length);
console.log('analyzer: contracts', page.analyzer.contracts.length, 'refs', page.analyzer.references.length, 'summary', page.analyzer.summary.length,
  'tabs', page.analyzer.tabs.length, 'findings', page.analyzer.findings.length, 'highlights', page.analyzer.highlights.length);
console.log('steps', page.steps.items.length, '| features', page.features.cards.length, '| useCases', page.useCases.items.length,
  '| roadmap', page.roadmap.items.length, '| security', page.security.cards.length);
console.log('drawer sections', page.drawer.sections.length, '| icons', Object.keys(icons).length);
console.log(miss.length ? 'EMPTY:\n  ' + miss.join('\n  ') : 'every field populated');
