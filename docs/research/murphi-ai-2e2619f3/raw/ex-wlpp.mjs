import fs from 'fs';
import { decodeEntities } from './html-parse.mjs';

/** /white-label-partner-program/ — a hand-authored page; content read verbatim. */

const h = fs.readFileSync('b9/white-label-partner-program.html', 'utf8');
const head = h.slice(0, h.indexOf('</head>'));
const body = h.slice(h.indexOf('<section class="hero"'), h.indexOf('<section class="connect-modal"'))
  .replace(/<style[^>]*>[^]*?<\/style>/g, '');

const dec = (s) => decodeEntities(String(s).replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
const grab = (src, re) => { const m = String(src).match(re); return m ? m[1] : ''; };
const all = (src, re) => [...String(src).matchAll(re)];
const rel = (u) => (u || '').replace(/^https?:\/\/murphi\.ai/, '') || '/';

const section = (cls) => {
  const i = body.indexOf(`class="${cls}"`);
  if (i < 0) return '';
  const start = body.lastIndexOf('<section', i);
  const end = body.indexOf('</section>', i);
  return body.slice(start, end);
};

const hero = section('hero');
const models = body.slice(body.indexOf('class="models-section"'), body.indexOf('<!-- MID STRIP'));
const compare = section('compare-section');
const callout = section('callout-section');
// The unnamed mid section holds the "how it works" step rail.
const how = body.slice(body.indexOf('class="how-section"'), body.indexOf('class="compare-section"'));

const page = {
  slug: 'white-label-partner-program',
  title: dec(grab(head, /<title>([^<]*)<\/title>/)),
  description: decodeEntities(grab(head, /<meta name="description" content="([^"]*)"/)),

  hero: {
    pills: all(hero, /<(div|a)[^>]*class="hero-eyebrow[^"]*"[^>]*>([^<]*)<\/\1>/g).map((m) => ({
      label: dec(m[2]),
      href: /class="[^"]*hero-eyebrow-link/.test(m[0]) ? rel(grab(m[0], /href="([^"]+)"/)) : null,
    })),
    h1Before: dec(grab(hero, /<h1>([^<]*)<em>/)),
    h1Em: dec(grab(hero, /<em>([^<]*)<\/em>/)),
    h1After: dec(grab(hero, /<\/em>([^<]*)<\/h1>/)),
    sub: dec(grab(hero, /<p class="hero-sub">([^]*?)<\/p>/)),
    stats: all(hero, /<div class="stat-pill"><span class="val">([^]*?)<\/span><span class="lbl">([^]*?)<\/span><\/div>/g)
      .map((m) => ({ value: dec(m[1]), label: dec(m[2]) })),
  },

  models: {
    tag: dec(grab(models, /<span class="section-tag">([^]*?)<\/span>/)),
    title: dec(grab(models, /<h2 class="section-title">([^]*?)<\/h2>/)),
    sub: dec(grab(models, /<p class="section-sub">([^]*?)<\/p>/)),
    cards: all(models, /<div class="model-card fade-in">([^]*?)(?=<div class="model-card fade-in">|<\/div>\s*<\/section>)/g).map((m) => {
      const c = m[1];
      const tone = /card-stripe green/.test(c) ? 'green' : 'blue';
      return {
        tone,
        icon: (c.match(/<svg[^]*?<\/svg>/) || [''])[0],
        badge: dec(grab(c, /<span class="c-badge [^"]*">([^]*?)<\/span>/)),
        title: dec(grab(c, /<div class="card-title">([^]*?)<\/div>/)),
        description: dec(grab(c, /<p class="card-desc">([^]*?)<\/p>/)),
        flowLabel: dec(grab(c, /<div class="flow-lbl">([^]*?)<\/div>/)),
        flow: all(c, /<div class="flow-row">([^]*?)<\/div>\s*(?=<div class="flow-arrow">|<\/div>)/g).map((r) => ({
          dot: grab(r[1], /background:(#[0-9A-Fa-f]{6})/),
          pulse: /dot-pulse/.test(r[1]),
          text: dec(grab(r[1], /<span class="step-text">([^]*?)<\/span>/)),
          chip: dec(grab(r[1], /<span class="acc-chip [^"]*">([^]*?)<\/span>/)) || null,
          chipTone: /acc-final/.test(r[1]) ? 'final' : 'ai',
        })),
        labels: all(c, /<div class="mini-lbl"[^>]*>([^]*?)<\/div>/g).map((x) => dec(x[1])),
        benefits: all(c, /<div class="b-item"><div class="b-dot"[^>]*><\/div>([^]*?)<\/div>/g).map((x) => dec(x[1])),
        tags: all(c, /<span class="tag [^"]*">([^]*?)<\/span>/g).map((x) => dec(x[1])),
      };
    }),
  },

  how: {
    tag: dec(grab(how, /<span class="section-tag">([^]*?)<\/span>/)),
    title: dec(grab(how, /<h2 class="section-title">([^]*?)<\/h2>/)),
    sub: dec(grab(how, /<p class="section-sub">([^]*?)<\/p>/)),
    steps: all(how, /<div class="how-step[^"]*">([^]*?)<\/div>\s*(?=<div class="how-step|<\/div>)/g).map((m) => ({
      num: dec(grab(m[1], /<div class="how-num">([^]*?)<\/div>/)),
      title: dec(grab(m[1], /<h3>([^]*?)<\/h3>/)),
      body: dec(grab(m[1], /<p>([^]*?)<\/p>/)),
    })),
  },

  compare: {
    tag: dec(grab(compare, /<span class="section-tag">([^]*?)<\/span>/)),
    title: dec(grab(compare, /<h2 class="section-title">([^]*?)<\/h2>/)),
    sub: dec(grab(compare, /<p class="section-sub">([^]*?)<\/p>/)),
    headers: all(compare, /<th[^>]*>([^]*?)<\/th>/g).map((m) => ({
      label: dec(m[1]),
      tone: /blue-th/.test(m[0]) ? 'blue' : /green-th/.test(m[0]) ? 'green' : null,
    })),
    rows: all(compare, /<tr>\s*<td[^]*?<\/tr>/g).map((tr) =>
      all(tr[0], /<td([^>]*)>([^]*?)<\/td>/g).map((td) => ({
        text: dec(td[2]),
        feature: /class="feat"/.test(td[1]),
        pill: /class="pill-b"/.test(td[2]) ? 'blue' : /class="pill-g"/.test(td[2]) ? 'green' : null,
      })),
    ).filter((r) => r.length),
  },

  callout: {
    heading: dec(grab(callout, /<h2>([^]*?)<\/h2>/)),
    sub: dec(grab(callout, /<p class="callout-sub">([^]*?)<\/p>/)),
    bullets: all(callout, /<div class="cbullet">([^]*?)<\/div>/g).map((m) => dec(m[1])),
    tags: all(callout, /<span class="ctag">([^]*?)<\/span>/g).map((m) => dec(m[1])),
    buttons: all(callout, /<a[^>]*class="(btn-primary|btn-outline)"[^>]*>([^]*?)<\/a>/g).map((m) => ({
      variant: m[1] === 'btn-primary' ? 'primary' : 'outline',
      label: dec(m[2]),
      href: rel(grab(m[0], /href="([^"]+)"/)),
    })),
  },
};

fs.writeFileSync('b9/wlpp.json', JSON.stringify(page, null, 1));
const miss = [];
const walk = (o, p) => {
  if (o === null || o === undefined) { miss.push(p); return; }
  if (typeof o === 'string') { if (!o.trim()) miss.push(p); return; }
  if (Array.isArray(o)) { if (!o.length) miss.push(p); o.forEach((v, i) => walk(v, p + '[' + i + ']')); return; }
  for (const k of Object.keys(o)) walk(o[k], p + '.' + k);
};
walk(page, '');
console.log('hero pills', page.hero.pills.length, '| stats', page.hero.stats.length);
console.log('model cards', page.models.cards.length, '→ flows', page.models.cards.map((c) => c.flow.length).join('/'),
  '| benefits', page.models.cards.map((c) => c.benefits.length).join('/'), '| tags', page.models.cards.map((c) => c.tags.length).join('/'));
console.log('how steps', page.how.steps.length, '| compare headers', page.compare.headers.length, 'rows', page.compare.rows.length);
console.log('callout bullets', page.callout.bullets.length, '| tags', page.callout.tags.length, '| buttons', page.callout.buttons.length);
console.log(miss.length ? 'EMPTY:\n  ' + miss.join('\n  ') : 'every field populated');
