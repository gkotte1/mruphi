import fs from 'fs';
import { divSlice } from './slice-legal.mjs';

/**
 * Utility + legal pages. The three legal pages are Elementor *text-editor*
 * widgets — theme-rendered prose, not hand-authored HTML — so their inline
 * markup (<strong>/<b>/<a>/<br>) has to survive extraction verbatim.
 */

const ENT = [
  [/&amp;/g, '&'], [/&#0?39;/g, "'"], [/&#8217;/g, '’'], [/&#8216;/g, '‘'],
  [/&quot;/g, '"'], [/&#8220;/g, '“'], [/&#8221;/g, '”'],
  // U+00A0 is kept as itself: the legal prose uses a lone &nbsp; paragraph as
  // a spacer, and folding it into a plain space collapses a real 30px line.
  [/&#8211;/g, '–'], [/&#8212;/g, '—'], [/&nbsp;/g, ' '],
  [/&lt;/g, '<'], [/&gt;/g, '>'], [/&#215;/g, '×'], [/&#8230;/g, '…'],
  [/&#8482;/g, '™'], [/&#169;/g, '©'], [/&#174;/g, '®'],
];
const ent = (s) => { let t = String(s); for (const [re, to] of ENT) t = t.replace(re, to); return t; };
const dec = (s) => ent(String(s).replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
const grab = (src, re) => { const m = String(src).match(re); return m ? m[1] : ''; };
const all = (src, re) => [...String(src).matchAll(re)];

const load = (slug) => {
  const h = fs.readFileSync('html/' + slug + '.html', 'utf8');
  return {
    raw: h,
    title: dec(grab(h, /<title>([^<]*)<\/title>/)),
    description: ent(grab(h, /<meta name="description" content="([^"]*)"/)),
  };
};

/**
 * Turns one block's inner HTML into a flat span list. A style stack keeps
 * nested `<strong><b>` correct, and `<br>` survives as its own span because
 * the legal pages use it for address and version blocks.
 */
function spans(html) {
  const out = [];
  const stack = [];
  const re = /<(\/?)(strong|b|em|i|a|br)\b([^>]*)>/gi;
  let last = 0;
  let m;
  const push = (text) => {
    if (!text) return;
    const t = ent(text).replace(/\s+/g, ' ');
    if (!t) return;
    const bold = stack.some((s) => s.tag === 'strong' || s.tag === 'b');
    const italic = stack.some((s) => s.tag === 'em' || s.tag === 'i');
    const link = stack.find((s) => s.tag === 'a');
    const span = { text: t };
    if (bold) span.bold = true;
    if (italic) span.italic = true;
    if (link) span.href = link.href;
    const prev = out[out.length - 1];
    if (prev && !prev.br && prev.bold === span.bold && prev.italic === span.italic && prev.href === span.href) {
      prev.text += span.text;
    } else out.push(span);
  };
  while ((m = re.exec(html))) {
    push(html.slice(last, m.index));
    last = re.lastIndex;
    const tag = m[2].toLowerCase();
    if (tag === 'br') { out.push({ br: true }); continue; }
    if (m[1]) {
      for (let i = stack.length - 1; i >= 0; i--) if (stack[i].tag === tag) { stack.splice(i, 1); break; }
    } else {
      stack.push({ tag, href: (m[3].match(/href="([^"]*)"/) || [])[1] });
    }
  }
  push(html.slice(last));
  // Trim the outer edges without disturbing interior spacing.
  if (out.length && out[0].text) out[0].text = out[0].text.replace(/^\s+/, '');
  const lastSpan = out[out.length - 1];
  if (lastSpan && lastSpan.text) lastSpan.text = lastSpan.text.replace(/\s+$/, '');
  // `<p>&nbsp;</p>` is a deliberate spacer: U+00A0 does not collapse, so the
  // paragraph still renders a full 30px line. Trimming it loses that line.
  const NBSP = String.fromCharCode(160);
  const raw = String(html).replace(/<[^>]+>/g, '');
  if (!out.some((s) => s.br || s.text.trim()) && (raw.includes(NBSP) || raw.includes('&nbsp;'))) {
    return [{ text: NBSP }];
  }
  return out.filter((s) => s.br || s.text);
}

/** Ordered block list: headings, paragraphs, lists and rules, in source order. */
function blocks(html) {
  const out = [];
  // The `<hr>` separators on /terms-of-service/ carry classes, so the void-tag
  // branch has to allow attributes — `<hr\s*\/?>` silently dropped all 39.
  const re = /<(h[1-6]|p|ul|ol)\b[^>]*>([^]*?)<\/\1>|<hr\b[^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    if (!m[1]) { out.push({ t: 'hr' }); continue; }
    const tag = m[1].toLowerCase();
    if (tag === 'ul' || tag === 'ol') {
      out.push({
        t: tag,
        items: all(m[2], /<li\b[^>]*>([^]*?)<\/li>/gi).map((li) => spans(li[1])).filter((s) => s.length),
      });
      continue;
    }
    out.push({ t: tag, spans: spans(m[2]) });
  }
  return out;
}

const out = {};

/* ── /faqs/ ───────────────────────────────────────────────────────────── */
{
  const { raw, title, description } = load('faqs');
  const body = raw.slice(raw.indexOf('<section class="page-hero">'), raw.indexOf('</main>'));
  const hero = body.slice(0, body.indexOf('</section>'));
  const still = body.slice(body.indexOf('<div class="faq-still">'));
  out.faqs = {
    slug: 'faqs', title, description,
    heroTag: dec(grab(hero, /<div class="page-hero-tag">([^]*?)<\/div>/)),
    h1: dec(grab(hero, /<h1[^>]*>([^]*?)<\/h1>/)),
    heroSub: dec(grab(hero, /<p class="page-hero-sub">([^]*?)<\/p>/)),
    categories: all(body, /<div class="faq-cat">([^]*?)(?=<div class="faq-cat">|<div class="faq-still">)/g).map((c) => ({
      label: dec(grab(c[1], /<div class="faq-cat-label">([^]*?)<\/div>/)),
      items: all(c[1], /<div class="faq-item" id="item-([^"]+)">([^]*?)<div class="faq-ans-inner">([^]*?)<\/div>/g).map((x) => ({
        id: x[1],
        question: dec(grab(x[2], /<span class="faq-q-text">([^]*?)<\/span>/)),
        answer: dec(x[3]),
      })),
    })),
    still: {
      heading: dec(grab(still, /<h3>([^]*?)<\/h3>/)),
      body: dec(grab(still, /<p>([^]*?)<\/p>/)),
      buttons: all(still, /<a href="([^"]+)"[^>]*>([^]*?)<\/a>/g).map((x) => ({
        href: x[1].replace('https://murphi.ai', ''), label: dec(x[2]),
      })),
    },
  };
}

/* ── /support-ticket/ ─────────────────────────────────────────────────── */
{
  const { raw, title, description } = load('support-ticket');
  const body = raw.slice(raw.indexOf('<section class="page-hero">'), raw.indexOf('</main>'));
  const hero = body.slice(0, body.indexOf('</section>'));
  const left = body.slice(body.indexOf('<!-- Left details panel -->'), body.indexOf('<!-- Right form panel -->'));
  const right = body.slice(body.indexOf('<!-- Right form panel -->'));
  const cards = all(left, /<div style="background:var\((--white|--blue-tint)\);[^"]*">([^]*?)<\/div>\s*<\/div>/g).map((x) => {
    const tinted = x[1] === '--blue-tint';
    const lines = grab(x[2], /<div style="font-size:13px;color:var\(--grey-dk\)[^"]*">([^]*?)$/);
    return {
      tinted,
      label: dec(grab(x[2], /<div style="font-size:1[23]px;font-weight:[78]00[^"]*">([^]*?)<\/div>/)),
      spans: spans(lines || grab(x[2], /<div style="font-size:13px;color:var\(--grey-dk\)">([^]*?)<\/div>/)),
    };
  });
  out['support-ticket'] = {
    slug: 'support-ticket', title, description,
    heroTag: dec(grab(hero, /<span class="page-hero-tag">([^]*?)<\/span>/)),
    h1: dec(grab(hero, /<h1[^>]*>([^]*?)<\/h1>/)),
    heroSub: dec(grab(hero, /<p class="page-hero-sub">([^]*?)<\/p>/)),
    leftHeading: dec(grab(left, /<h2[^>]*>([^]*?)<\/h2>/)),
    leftBody: dec(grab(left, /<p[^>]*>([^]*?)<\/p>/)),
    infoCards: cards,
    formHeading: dec(grab(right, /<h3[^>]*>([^]*?)<\/h3>/)),
    formBody: dec(grab(right, /<p[^>]*>([^]*?)<\/p>/)),
    fields: all(right, /<label>([^]*?)<\/label>\s*<(input|textarea)([^>]*)>/g).map((x) => ({
      label: dec(x[1]),
      element: x[2],
      id: grab(x[3], /id="([^"]+)"/),
      type: grab(x[3], /type="([^"]+)"/) || 'textarea',
      placeholder: ent(grab(x[3], /placeholder="([^"]*)"/)),
      required: /\brequired\b/.test(x[3]),
      accept: grab(x[3], /accept="([^"]+)"/),
    })),
    errorText: dec(grab(right, /<div id="form-err"[^>]*>([^]*?)<\/div>/)),
    okText: dec(grab(right, /<div id="form-ok"[^>]*>([^]*?)<\/div>/)),
    submitLabel: dec(grab(right, /<button type="submit"[^>]*>([^]*?)<\/button>/)),
    mailto: grab(raw, /window\.location\.href = 'mailto:([^?]+)\?/),
    subject: grab(raw, /encodeURIComponent\('([^']+)'\)/),
  };
}

/* ── /download-app/ ───────────────────────────────────────────────────── */
{
  const { raw, title, description } = load('download-app');
  const body = raw.slice(raw.indexOf('<section class="page-hero">'), raw.indexOf('murphi-cta-root'));
  const hero = body.slice(0, body.indexOf('</section>'));
  const page = {
    slug: 'download-app', title, description,
    heroTag: dec(grab(hero, /<div class="page-hero-tag">([^]*?)<\/div>/)),
    h1: dec(grab(hero, /<h1[^>]*>([^]*?)<\/h1>/)),
    heroSub: dec(grab(hero, /<p class="page-hero-sub">([^]*?)<\/p>/)),
    heroButtons: all(hero, /<a href="([^"]+)" class="(btn-w|btn-ghost)"[^>]*>([^]*?)<\/a>/g).map((x) => ({
      href: x[1].replace('https://murphi.ai', ''), variant: x[2] === 'btn-w' ? 'solid' : 'ghost', label: dec(x[3]),
    })),
    sections: [],
  };
  const idxs = all(body, /<div class="page-section(?:-alt)?">/g).map((x) => ({ i: x.index, alt: x[0].includes('-alt') }));
  for (let k = 0; k < idxs.length; k++) {
    const chunk = body.slice(idxs[k].i, k + 1 < idxs.length ? idxs[k + 1].i : body.length);
    const tag = dec(grab(chunk, /<div class="sec-tag"[^>]*>([^]*?)<\/div>/));
    const heading = dec(grab(chunk, /<h2 class="sh">([^]*?)<\/h2>/));
    if (!tag && !heading) continue;
    const s = { tag, heading, alt: body.slice(Math.max(0, idxs[k].i - 80), idxs[k].i).includes('page-section-alt') || idxs[k].alt };
    const lead = grab(chunk, /<p class="sl"[^>]*>([^]*?)<\/p>/);
    if (lead) s.lead = dec(lead);
    const apps = all(chunk, /<div class="app-download-card">([^]*?)<\/a>/g).map((x) => ({
      image: grab(x[1], /src="([^"]+)"/),
      alt: ent(grab(x[1], /alt="([^"]*)"/)),
      title: dec(grab(x[1], /<div class="int-method-title"[^>]*>([^]*?)<\/div>/)),
      description: dec(grab(x[1], /<p[^>]*>([^]*?)<\/p>/)),
      href: grab(x[1], /<a href="([^"]+)"/),
      cta: dec(grab(x[1], /<a href="[^"]+"[^>]*>([^]*?)$/)),
    })).filter((a) => a.title);
    if (apps.length) s.apps = apps;
    const cards = all(chunk, /<div class="feature-card">([^]*?<\/div>)\s*<\/div>/g).map((x) => ({
      title: dec(grab(x[1], /<div class="feature-card-title">([^]*?)<\/div>/)),
      description: dec(grab(x[1], /<div class="feature-card-desc">([^]*?)<\/div>/)),
    })).filter((c) => c.title);
    if (cards.length) s.cards = cards;
    page.sections.push(s);
  }
  out['download-app'] = page;
}

/* ── legal pages ──────────────────────────────────────────────────────── */
for (const slug of ['privacy-policy', 'terms-of-service', 'ai-terms']) {
  const { raw, title, description } = load(slug);
  const heroBlock = raw.slice(raw.indexOf('<div class="page-hero">'), raw.indexOf('</body>', raw.indexOf('<div class="page-hero">')));
  const curStart = raw.indexOf('elementor-widget-text-editor');
  const curInner = raw.indexOf('<div class="elementor-widget-container">', curStart);
  const current = divSlice(raw, curInner);
  const accIdx = raw.indexOf('<div id="elementor-tab-content');
  out[slug] = {
    slug, title, description,
    h1: dec(grab(heroBlock, /<h1[^>]*>([^]*?)<\/h1>/)),
    heroSub: dec(grab(heroBlock, /<p[^>]*>([^]*?)<\/p>/)),
    blocks: blocks(current),
    archive: {
      label: dec(grab(raw, /<span class="eael-accordion-tab-title">([^]*?)<\/span>/)),
      blocks: blocks(divSlice(raw, accIdx)),
    },
  };
}

fs.writeFileSync('b6/content.json', JSON.stringify(out, null, 1));
for (const [slug, p] of Object.entries(out)) {
  if (p.categories) {
    console.log('\n=== ' + slug + '  h1: ' + p.h1);
    p.categories.forEach((c) => console.log('  [' + c.label + '] ' + c.items.length + ' items'));
    console.log('  still: ' + p.still.heading + ' / ' + p.still.buttons.length + ' btn');
  } else if (p.fields) {
    console.log('\n=== ' + slug + '  h1: ' + p.h1);
    console.log('  info cards: ' + p.infoCards.length + ' | fields: ' + p.fields.map((f) => f.label).join(', '));
    console.log('  mailto: ' + p.mailto + ' | subject: ' + p.subject);
  } else if (p.sections) {
    console.log('\n=== ' + slug + '  h1: ' + p.h1);
    p.sections.forEach((s) => console.log('  [' + s.tag + '] ' + s.heading.slice(0, 34) +
      ' {' + [s.lead && 'lead', s.apps && 'apps:' + s.apps.length, s.cards && 'cards:' + s.cards.length].filter(Boolean).join(',') + '}'));
  } else {
    const n = (b) => b.reduce((o, x) => ((o[x.t] = (o[x.t] || 0) + 1), o), {});
    console.log('\n=== ' + slug + '  h1: ' + p.h1 + ' | sub: ' + p.heroSub);
    console.log('  current: ' + JSON.stringify(n(p.blocks)));
    console.log('  archive [' + p.archive.label + ']: ' + JSON.stringify(n(p.archive.blocks)));
  }
}
