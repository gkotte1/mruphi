import { decodeEntities } from './html-parse.mjs';

/**
 * Decode HTML entities through every string in a value.
 *
 * The hand-authored embeds keep their card data in object literals inside a
 * `<script>` block, where the HTML parser leaves `&amp;` alone — the page only
 * decodes it later, by writing the string through `innerHTML`. Reading the
 * literal directly therefore yields the escaped form, so it has to be decoded
 * here to match what the live page actually shows.
 */
export function decodeDeep(value) {
  if (typeof value === 'string') return decodeEntities(value);
  if (Array.isArray(value)) return value.map(decodeDeep);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, decodeDeep(v)]));
  }
  return value;
}
