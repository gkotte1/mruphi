/**
 * Slice every `<div class="X">…</div>` out of a fragment, counting nested
 * divs so a card's inner markup is never cut short at the first close tag.
 */
export function blocks(src, cls) {
  const text = String(src);
  const open = new RegExp('<div class="' + cls + '"[^>]*>', 'g');
  const out = [];
  for (const m of text.matchAll(open)) {
    let depth = 1;
    const k = m.index + m[0].length;
    const tag = /<([/]?)div[ >]/g;
    tag.lastIndex = k;
    let t;
    while ((t = tag.exec(text))) {
      depth += t[1] ? -1 : 1;
      if (!depth) { out.push(text.slice(k, t.index)); break; }
    }
  }
  return out;
}

/** Same, for `<section class="X">`. */
export function sections(src, cls) {
  const text = String(src);
  const open = new RegExp('<section class="' + cls + '"[^>]*>', 'g');
  const out = [];
  for (const m of text.matchAll(open)) {
    let depth = 1;
    const k = m.index + m[0].length;
    const tag = /<([/]?)section[ >]/g;
    tag.lastIndex = k;
    let t;
    while ((t = tag.exec(text))) {
      depth += t[1] ? -1 : 1;
      if (!depth) { out.push(text.slice(k, t.index)); break; }
    }
  }
  return out;
}
