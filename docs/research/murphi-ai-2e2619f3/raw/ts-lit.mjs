/**
 * Serialise a plain JSON value as a TypeScript object literal: identifier keys
 * unquoted, `null`/`undefined` members dropped so optional fields simply do not
 * appear, and short leaf objects kept on one line.
 */
const IDENT = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

export function tsLit(value, indent = 0, drop = new Set()) {
  const pad = ' '.repeat(indent);
  const inner = ' '.repeat(indent + 2);

  if (value === null || value === undefined) return 'null';
  if (typeof value !== 'object') return JSON.stringify(value);

  if (Array.isArray(value)) {
    if (!value.length) return '[]';
    const parts = value.map((v) => inner + tsLit(v, indent + 2, drop));
    const flat = '[' + value.map((v) => tsLit(v, 0, drop)).join(', ') + ']';
    if (flat.length <= 88 && !flat.includes('\n')) return flat;
    return '[\n' + parts.join(',\n') + ',\n' + pad + ']';
  }

  const keys = Object.keys(value).filter((k) => value[k] !== null && value[k] !== undefined && !drop.has(k));
  if (!keys.length) return '{}';
  const kv = keys.map((k) => (IDENT.test(k) ? k : JSON.stringify(k)) + ': ' + tsLit(value[k], indent + 2, drop));
  const flat = '{ ' + keys.map((k) => (IDENT.test(k) ? k : JSON.stringify(k)) + ': ' + tsLit(value[k], 0, drop)).join(', ') + ' }';
  if (flat.length <= 88 && !flat.includes('\n')) return flat;
  return '{\n' + kv.map((s) => inner + s).join(',\n') + ',\n' + pad + '}';
}
