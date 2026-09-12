import fs from 'fs';
import path from 'path';

/**
 * Downloads each post's featured image at the size the live card actually
 * requests (`large`, ~1024px wide) rather than the multi-megabyte original.
 * Falls back through the size ladder when a variant is missing.
 */
const OUT = 'c:/Users/krush/OneDrive/Desktop/m/murphi-clone/public/images/murphi-ai-2e2619f3/blog';
fs.mkdirSync(OUT, { recursive: true });

const media = JSON.parse(fs.readFileSync('b7/media.json', 'utf8'));
const LADDER = ['large', 'techkit-size1', 'medium_large', 'full'];
const map = {};
let done = 0;
let failed = 0;

for (const m of media) {
  const sizes = m.media_details?.sizes ?? {};
  const pick = LADDER.map((k) => sizes[k]).find(Boolean);
  const url = pick?.source_url ?? m.source_url;
  if (!url) { failed++; continue; }
  const name = decodeURIComponent(path.basename(new URL(url).pathname));
  const dest = path.join(OUT, name);
  if (!fs.existsSync(dest)) {
    try {
      const r = await fetch(url);
      if (!r.ok) { console.error('FAIL', r.status, url); failed++; continue; }
      fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
    } catch (e) {
      console.error('ERR', url, e.message);
      failed++;
      continue;
    }
  }
  map[m.id] = {
    src: '/images/murphi-ai-2e2619f3/blog/' + name,
    width: pick?.width ?? m.media_details?.width ?? null,
    height: pick?.height ?? m.media_details?.height ?? null,
    alt: (m.alt_text || '').trim(),
  };
  done++;
  if (done % 25 === 0) console.log('  downloaded', done);
}

fs.writeFileSync('b7/mediamap.json', JSON.stringify(map, null, 1));
const bytes = fs.readdirSync(OUT).reduce((a, f) => a + fs.statSync(path.join(OUT, f)).size, 0);
console.log('mapped', done, 'failed', failed, '| files', fs.readdirSync(OUT).length, '|', (bytes / 1048576).toFixed(1), 'MB');
