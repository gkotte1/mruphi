import fs from 'fs';

/**
 * Structural outline of a saved landing page: every element's tag+class down
 * to a given depth, so the block vocabulary of the `sec` family is visible at
 * a glance before any extractor is written.
 */
const slug = process.argv[2];
const maxDepth = Number(process.argv[3] || 3);
const raw = fs.readFileSync('b9/' + slug + '.html', 'utf8');
const body = raw.slice(raw.indexOf('<section class="hero"'), raw.indexOf('<section class="connect-modal"'))
  .replace(/<style[^>]*>[^]*?<\/style>/g, '')
  .replace(/<script[^>]*>[^]*?<\/script>/g, '')
  .replace(/<svg[^>]*>[^]*?<\/svg>/g, '<svg/>')
  .replace(/<!--[^]*?-->/g, '');

const VOID = new Set(['br', 'img', 'input', 'hr', 'meta', 'link', 'svg', 'path', 'source']);
const tokens = [...body.matchAll(/<(\/)?([a-zA-Z][\w-]*)([^>]*)>|([^<]+)/g)];
let depth = 0;
const stack = [];
for (const t of tokens) {
  if (t[4] !== undefined) {
    const txt = t[4].replace(/\s+/g, ' ').trim();
    if (txt && depth <= maxDepth) console.log('  '.repeat(depth) + '· ' + JSON.stringify(txt.slice(0, 62)));
    continue;
  }
  const close = !!t[1];
  const tag = t[2].toLowerCase();
  const selfClose = /\/$/.test(t[3]) || VOID.has(tag);
  if (close) {
    while (stack.length && stack.pop() !== tag) { /* tolerate unclosed */ }
    depth = Math.max(0, depth - 1);
    continue;
  }
  const cls = (t[3].match(/class="([^"]*)"/) || [, ''])[1];
  const id = (t[3].match(/id="([^"]*)"/) || [, ''])[1];
  if (depth <= maxDepth) {
    console.log('  '.repeat(depth) + tag + (cls ? '.' + cls : '') + (id ? '#' + id : ''));
  }
  if (!selfClose) { stack.push(tag); depth++; }
}
