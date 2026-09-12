/** Shared HTML-attribute → JSX-prop conversion for lifted inline SVG. */
const KEBAB = /-([a-z])/g;

/**
 * Attributes may be single- or double-quoted: the hand-authored embeds write
 * their glyphs inside JS string literals, so they quote with `'`. Matching only
 * `"` silently dropped every attribute — path data included — so both forms are
 * accepted here and `ATTR_COUNT` lets callers assert nothing was lost.
 */
const ATTR = /([\w:-]+)=(?:"([^"]*)"|'([^']*)')/g;

export function countAttrs(markup) {
  return [...String(markup).matchAll(ATTR)].length;
}

export function jsxAttrs(raw, drop = []) {
  return [...String(raw).matchAll(ATTR)]
    .map((m) => [m[1], m[2] !== undefined ? m[2] : m[3]])
    .filter(([name]) => !drop.includes(name))
    .map(([attr, value]) => {
      const name = attr === 'class' ? 'className'
        : attr.startsWith('aria-') || attr.startsWith('data-') ? attr
          : attr.replace(KEBAB, (_, c) => c.toUpperCase());
      if (attr === 'style') {
        const obj = value.split(';').filter((d) => d.trim()).map((d) => {
          const i = d.indexOf(':');
          const k = d.slice(0, i).trim().replace(KEBAB, (_, c) => c.toUpperCase());
          return `${k}: "${d.slice(i + 1).trim().replace(/\s*!important/, '')}"`;
        });
        return `style={{ ${obj.join(', ')} }}`;
      }
      return `${name}="${value.replace(/"/g, '&quot;')}"`;
    }).join(' ');
}

/** Self-closes every child element of an SVG fragment and JSX-ifies its attrs. */
export function jsxChildren(inner) {
  return String(inner)
    .replace(/<(\w+)([^>]*?)\s*\/?>/g, (_, tag, attrs) => `<${tag} ${jsxAttrs(attrs)} />`)
    .replace(/\s+/g, ' ')
    .trim();
}

/** A whole `<svg …>…</svg>` string → JSX source. */
export function jsxSvg(markup, drop = ['xmlns', 'class']) {
  const open = markup.match(/<svg([^>]*)>/)[1];
  const inner = markup.slice(markup.indexOf('>') + 1, markup.lastIndexOf('</svg>'));
  const out = `<svg ${jsxAttrs(open, drop)}>${jsxChildren(inner)}</svg>`;
  /* `style` becomes an object literal rather than a quoted attribute, so it is
     counted on its own; everything else must survive one-for-one. */
  const kept = (s) => [...String(s).matchAll(ATTR)].filter((m) => m[1] !== 'style' && !drop.includes(m[1])).length;
  const before = kept(markup);
  const after = kept(out);
  if (after < before) {
    throw new Error(`svg lost ${before - after} attribute(s): ${markup.slice(0, 120)}`);
  }
  const styleIn = (String(markup).match(/\bstyle=/g) || []).length;
  const styleOut = (out.match(/style=\{\{/g) || []).length;
  if (styleOut < styleIn) {
    throw new Error(`svg lost ${styleIn - styleOut} style attribute(s): ${markup.slice(0, 120)}`);
  }
  return out;
}
