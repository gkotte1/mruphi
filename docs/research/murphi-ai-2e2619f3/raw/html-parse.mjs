/**
 * A small, tolerant HTML → tree parser, then a transform into the typed
 * article-block shape the clone renders.
 *
 * WordPress' `content.rendered` is mostly well-formed but carries a lot of
 * export cruft: `<span style="font-weight: 400">` around nearly every run,
 * Elementor container `<div>`s wrapping the real prose, and classes from
 * whatever editor the text was pasted out of. The transform keeps structure
 * and real emphasis and drops the rest, so nothing is rendered through
 * `dangerouslySetInnerHTML`.
 */

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr']);

/** Elements that implicitly close an open one of the same/related kind. */
const IMPLICIT = {
  li: new Set(['li']),
  p: new Set(['p', 'div', 'ul', 'ol', 'table', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'figure', 'blockquote', 'hr']),
  td: new Set(['td', 'th', 'tr']),
  th: new Set(['td', 'th', 'tr']),
  tr: new Set(['tr']),
  thead: new Set(['tbody', 'tfoot']),
  tbody: new Set(['tbody', 'tfoot']),
};

const ENT = [
  [/&nbsp;/g, String.fromCharCode(160)], [/&amp;/g, '&'], [/&#0?39;/g, "'"], [/&#8217;/g, '’'],
  [/&#8216;/g, '‘'], [/&quot;/g, '"'], [/&#8220;/g, '“'], [/&#8221;/g, '”'],
  [/&#8211;/g, '–'], [/&#8212;/g, '—'], [/&lt;/g, '<'], [/&gt;/g, '>'],
  [/&#215;/g, '×'], [/&#8230;/g, '…'], [/&hellip;/g, '…'], [/&#038;/g, '&'],
  [/&#8242;/g, '′'], [/&#8243;/g, '″'], [/&rsquo;/g, '’'], [/&lsquo;/g, '‘'],
  [/&ldquo;/g, '“'], [/&rdquo;/g, '”'], [/&mdash;/g, '—'], [/&ndash;/g, '–'],
  [/&#8482;/g, '™'], [/&#169;/g, '©'], [/&#174;/g, '®'], [/&#8226;/g, '•'],
  [/&#160;/g, ' '], [/&#8594;/g, '→'], [/&#x27;/g, "'"], [/&#x2F;/g, '/'],
];
export function decodeEntities(s) {
  let t = String(s);
  for (const [re, to] of ENT) t = t.replace(re, to);
  return t.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

/** Parses an attribute string into a plain object. */
function parseAttrs(raw) {
  const out = {};
  for (const m of raw.matchAll(/([\w:-]+)(?:\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
    if (!m[1]) continue;
    out[m[1].toLowerCase()] = decodeEntities(m[3] ?? m[4] ?? m[5] ?? '');
  }
  return out;
}

/** Builds a tree of `{ tag, attrs, children }` and `{ text }` nodes. */
export function parseHtml(html) {
  const root = { tag: '#root', attrs: {}, children: [] };
  const stack = [root];
  const top = () => stack[stack.length - 1];
  const re = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^>])*?)(\/?)>/g;
  let last = 0;
  let m;

  const addText = (raw) => {
    if (!raw) return;
    const text = decodeEntities(raw);
    if (!text) return;
    top().children.push({ text });
  };

  while ((m = re.exec(html))) {
    addText(html.slice(last, m.index));
    last = re.lastIndex;
    if (m[0].startsWith('<!--')) continue;
    const [, closing, rawTag, attrs, selfClose] = m;
    const tag = rawTag.toLowerCase();

    if (closing) {
      // Close the nearest matching ancestor; ignore strays.
      const i = stack.map((n) => n.tag).lastIndexOf(tag);
      if (i > 0) stack.length = i;
      continue;
    }

    // Auto-close elements this tag is not allowed to nest inside.
    for (let i = stack.length - 1; i > 0; i--) {
      const open = stack[i].tag;
      if (IMPLICIT[open]?.has(tag)) stack.length = i;
      else break;
    }

    const node = { tag, attrs: parseAttrs(attrs), children: [] };
    top().children.push(node);
    if (!VOID.has(tag) && !selfClose) stack.push(node);
  }
  addText(html.slice(last));
  return root;
}

/* ── transform ────────────────────────────────────────────────────────── */

const BLOCK_HEADINGS = { h1: 'h2', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h5' };
const INLINE_BOLD = new Set(['b', 'strong']);
const INLINE_ITALIC = new Set(['i', 'em']);
/** Wrappers whose children are lifted into the parent flow. */
const TRANSPARENT = new Set(['div', 'section', 'article', 'main', 'header', 'footer',
  'tbody', 'thead', 'tfoot', 'colgroup', 'col', 'noscript', 'form', 'span']);

/**
 * Only ASCII whitespace collapses. U+00A0 is content: WordPress ends many
 * paragraphs with one, and it changes where the line breaks.
 */
const WS = /[ \t\n\r\f\v]/;
const isWhitespace = (s) => !String(s).split('').some((c) => !WS.test(c));

/** Collects inline runs under `node` into a flat span list. */
function collectSpans(node, ctx, out) {
  for (const child of node.children ?? []) {
    if (child.text !== undefined) {
      pushText(out, child.text, ctx);
      continue;
    }
    const tag = child.tag;
    if (tag === 'br') { out.push({ br: true }); continue; }
    if (tag === 'img') { continue; }
    const style = (child.attrs?.style || '').toLowerCase();
    const next = {
      bold: ctx.bold || INLINE_BOLD.has(tag) || /font-weight:\s*(bold|[6-9]00)/.test(style),
      italic: ctx.italic || INLINE_ITALIC.has(tag) || /font-style:\s*italic/.test(style),
      underline: ctx.underline || tag === 'u' || /text-decoration:[^;]*underline/.test(style),
      href: tag === 'a' ? (child.attrs?.href || ctx.href) : ctx.href,
    };
    collectSpans(child, next, out);
  }
  return out;
}

function pushText(out, raw, ctx) {
  const text = raw.replace(/[ \t\n\r\f\v]+/g, ' ');
  if (!text) return;
  const prev = out[out.length - 1];
  const span = { text };
  if (ctx.bold) span.bold = true;
  if (ctx.italic) span.italic = true;
  if (ctx.underline) span.underline = true;
  if (ctx.href) span.href = ctx.href;
  if (prev && !prev.br && !!prev.bold === !!span.bold && !!prev.italic === !!span.italic
    && !!prev.underline === !!span.underline && prev.href === span.href) {
    prev.text += span.text;
    return;
  }
  out.push(span);
}

/** Trims the leading/trailing whitespace of a span list without touching the interior. */
function trimSpans(spans) {
  const out = spans.filter((s) => s.br || s.text);
  while (out.length && !out[0].br && isWhitespace(out[0].text)) out.shift();
  while (out.length && !out[out.length - 1].br && isWhitespace(out[out.length - 1].text)) out.pop();
  while (out.length && out[out.length - 1].br) out.pop();
  if (out.length && out[0].text) out[0].text = out[0].text.replace(/^[ \t\n\r\f\v]+/, '');
  const lastSpan = out[out.length - 1];
  if (lastSpan && lastSpan.text) lastSpan.text = lastSpan.text.replace(/[ \t\n\r\f\v]+$/, '');
  return out.filter((s) => s.br || s.text);
}

const hasContent = (spans) => spans.some((s) => s.br || !isWhitespace(s.text));

/**
 * Walks a parsed tree and emits article blocks. `resolveImage` receives the
 * <img> attributes and returns the localised asset (or null to drop it).
 */
export function toBlocks(node, resolveImage) {
  const blocks = [];
  let pending = [];

  const flush = () => {
    const spans = trimSpans(pending);
    pending = [];
    if (hasContent(spans)) blocks.push({ t: 'p', spans });
  };

  const walk = (parent) => {
    for (const child of parent.children ?? []) {
      if (child.text !== undefined) {
        if (!isWhitespace(child.text)) pushText(pending, child.text, {});
        continue;
      }
      const tag = child.tag;

      if (tag === 'img') {
        flush();
        const img = resolveImage(child.attrs ?? {});
        if (img) blocks.push({ t: 'img', ...img });
        continue;
      }
      if (tag === 'br') { pending.push({ br: true }); continue; }
      if (tag === 'hr') { flush(); blocks.push({ t: 'hr' }); continue; }
      if (tag === 'style' || tag === 'script') continue;

      if (BLOCK_HEADINGS[tag]) {
        flush();
        const spans = trimSpans(collectSpans(child, {}, []));
        if (hasContent(spans)) blocks.push({ t: BLOCK_HEADINGS[tag], spans });
        // One post wraps an image inside its <h2>; collectSpans skips images,
        // so lift any out rather than losing them.
        blocks.push(...toBlocks(child, resolveImage).filter((x) => x.t === 'img'));
        continue;
      }

      if (tag === 'p' || tag === 'blockquote') {
        flush();
        const inner = toBlocks(child, resolveImage);
        if (tag === 'blockquote' && inner.length) blocks.push({ t: 'quote', blocks: inner });
        // WordPress sprinkles <p>&nbsp;</p> spacers through these posts; each
        // one is a real 30px line box on the live page, so it is kept. A <p>
        // that only wraps an element (autop around a div) renders at 0 instead,
        // so the spacer applies only to text-only paragraphs.
        else if (!inner.length && !(child.children ?? []).some((n) => n.tag)) {
          blocks.push({ t: 'p', spans: [] });
        }
        else blocks.push(...inner);
        continue;
      }

      if (tag === 'ul' || tag === 'ol') {
        flush();
        const items = [];
        for (const li of child.children ?? []) {
          if (li.tag !== 'li') continue;
          const spans = trimSpans(collectSpans(li, {}, []));
          const nested = (li.children ?? []).filter((n) => n.tag === 'ul' || n.tag === 'ol')
            .flatMap((n) => toBlocks({ children: [n] }, resolveImage));
          const item = {};
          if (hasContent(spans)) item.spans = spans;
          if (nested.length) item.blocks = nested;
          if (item.spans || item.blocks) items.push(item);
        }
        if (items.length) {
          const list = { t: tag, items };
          const start = Number(child.attrs?.start);
          if (tag === 'ol' && Number.isInteger(start) && start !== 1) list.start = start;
          blocks.push(list);
        }
        continue;
      }

      if (tag === 'table') {
        flush();
        const rows = [];
        const collectRows = (n, head) => {
          for (const r of n.children ?? []) {
            if (r.tag === 'thead') { collectRows(r, true); continue; }
            if (r.tag === 'tbody' || r.tag === 'tfoot') { collectRows(r, head); continue; }
            if (r.tag !== 'tr') continue;
            const cells = [];
            let isHead = head;
            for (const c of r.children ?? []) {
              if (c.tag !== 'td' && c.tag !== 'th') continue;
              if (c.tag === 'th') isHead = true;
              cells.push(trimSpans(collectSpans(c, {}, [])));
            }
            if (cells.length) rows.push({ head: isHead, cells });
          }
        };
        collectRows(child, false);
        if (rows.length) blocks.push({ t: 'table', rows });
        continue;
      }

      if (tag === 'figure') {
        flush();
        const inner = toBlocks(child, resolveImage);
        const caption = (child.children ?? []).find((n) => n.tag === 'figcaption');
        const img = inner.find((b) => b.t === 'img');
        if (img) {
          if (caption) {
            const spans = trimSpans(collectSpans(caption, {}, []));
            if (hasContent(spans)) img.caption = spans;
          }
          blocks.push(img);
          blocks.push(...inner.filter((b) => b !== img && b.t !== 'p'));
        } else blocks.push(...inner);
        continue;
      }

      // A `div` carrying a background is an authored callout box; every other
      // wrapper is transparent and its children join the surrounding flow.
      if (tag === 'div') {
        const style = (child.attrs?.style || '').toLowerCase();
        // Gutenberg spacer blocks carry their height inline and hold nothing
        // but a non-breaking space; without this they render as a 30px line.
        if ((child.attrs?.class || '').includes('wp-block-spacer')) {
          flush();
          const px = Number((style.match(/height:s*(-?[d.]+)px/) || [])[1] ?? 0);
          blocks.push({ t: 'spacer', height: Number.isFinite(px) ? px : 0 });
          continue;
        }
        if (/background(-color)?:\s*(#|rgb)/.test(style)) {
          flush();
          const inner = toBlocks(child, resolveImage);
          if (inner.length) blocks.push({ t: 'callout', blocks: inner });
          continue;
        }
      }

      if (TRANSPARENT.has(tag)) {
        // `span` is inline: keep it in the paragraph run rather than breaking.
        if (tag === 'span') {
          const style = (child.attrs?.style || '').toLowerCase();
          collectSpans(child, {
            bold: /font-weight:\s*(bold|[6-9]00)/.test(style),
            italic: /font-style:\s*italic/.test(style),
            underline: /text-decoration:[^;]*underline/.test(style),
          }, pending);
          continue;
        }
        flush();
        blocks.push(...toBlocks(child, resolveImage));
        continue;
      }

      // Anything else inline (a, b, strong, em, code, sub, sup, …).
      collectSpans({ children: [child] }, {}, pending);
    }
  };

  walk(node);
  flush();
  return blocks;
}

/** Flattens a block tree back to plain text — used to verify nothing was lost. */
export function blocksToText(blocks) {
  const parts = [];
  const spans = (list) => list.map((s) => (s.br ? ' ' : s.text)).join('');
  const walk = (list) => {
    for (const b of list) {
      if (b.spans) parts.push(spans(b.spans));
      if (b.items) for (const it of b.items) { if (it.spans) parts.push(spans(it.spans)); if (it.blocks) walk(it.blocks); }
      if (b.rows) for (const r of b.rows) for (const c of r.cells) parts.push(spans(c));
      if (b.caption) parts.push(spans(b.caption));
      if (b.blocks) walk(b.blocks);
    }
  };
  walk(blocks);
  return parts.join(' ').replace(/\s+/g, ' ').trim();
}
