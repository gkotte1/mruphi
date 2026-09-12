import fs from 'fs';

/** Returns the inner HTML of the div that starts at `from` (a `<div` index). */
export function divSlice(h, from) {
  let d = 0;
  const re = /<(\/?)div\b[^>]*>/g;
  re.lastIndex = from;
  let m;
  while ((m = re.exec(h))) {
    d += m[1] ? -1 : 1;
    if (d === 0) return h.slice(h.indexOf('>', from) + 1, m.index);
  }
  return h.slice(from);
}

for (const p of ['privacy-policy', 'terms-of-service', 'ai-terms']) {
  const h = fs.readFileSync('html/' + p + '.html', 'utf8');
  const i = h.indexOf('<div id="elementor-tab-content');
  const acc = divSlice(h, i);
  const c = {};
  for (const m of acc.matchAll(/<(h[1-6]|p|ul|ol|li|hr)\b[^>]*>/g)) c[m[1]] = (c[m[1]] || 0) + 1;
  console.log(p, JSON.stringify(c), 'len', acc.length);
}
