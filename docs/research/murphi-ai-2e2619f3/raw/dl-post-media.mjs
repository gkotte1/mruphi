import fs from 'fs';
import path from 'path';

/**
 * Two jobs:
 *  1. Re-fetch each featured image at the smallest registered size that still
 *     covers the 1180px post hero — the listing thumbnails only needed 1024.
 *  2. Download every image referenced from inside a post body.
 *
 * Both land under public/ so a built page never reaches for murphi.ai.
 */

const OUT = 'c:/Users/krush/OneDrive/Desktop/m/murphi-clone/public/images/murphi-ai-2e2619f3/blog';
const BODY_OUT = path.join(OUT, 'body');
fs.mkdirSync(BODY_OUT, { recursive: true });

const HERO_WIDTH = 1180;

async function grab(url, dest) {
  if (fs.existsSync(dest)) return true;
  try {
    const r = await fetch(url);
    if (!r.ok) { console.error('  FAIL', r.status, url); return false; }
    fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
    return true;
  } catch (e) {
    console.error('  ERR', url, e.message);
    return false;
  }
}

const name = (url) => decodeURIComponent(path.basename(new URL(url).pathname));

/* ── 1. hero-sized featured images ────────────────────────────────────── */
const media = JSON.parse(fs.readFileSync('b7/media.json', 'utf8'));
const heroMap = {};
let heroCount = 0;
for (const m of media) {
  const sizes = Object.values(m.media_details?.sizes ?? {});
  const wide = sizes.filter((s) => s.width >= HERO_WIDTH).sort((a, b) => a.width - b.width)[0];
  const pick = wide ?? sizes.sort((a, b) => b.width - a.width)[0];
  const url = pick?.source_url ?? m.source_url;
  if (!url) continue;
  const file = name(url);
  if (!(await grab(url, path.join(OUT, file)))) continue;
  heroMap[m.id] = {
    src: '/images/murphi-ai-2e2619f3/blog/' + file,
    width: pick?.width ?? m.media_details?.width ?? null,
    height: pick?.height ?? m.media_details?.height ?? null,
    alt: (m.alt_text || '').trim(),
  };
  if (++heroCount % 25 === 0) console.log('  heroes', heroCount);
}
fs.writeFileSync('b8/heromap.json', JSON.stringify(heroMap, null, 1));
console.log('hero images mapped:', heroCount, 'of', media.length);

/* ── 2. in-body images ────────────────────────────────────────────────── */
const bodyImgs = JSON.parse(fs.readFileSync('b8/body-images.json', 'utf8'));
const bodyMap = {};
let ok = 0;
let skipped = 0;
for (const [url, alt] of bodyImgs) {
  let file;
  try { file = name(url); } catch { skipped++; continue; }
  if (!(await grab(url, path.join(BODY_OUT, file)))) { skipped++; continue; }
  bodyMap[url] = { src: '/images/murphi-ai-2e2619f3/blog/body/' + file, alt };
  ok++;
}
fs.writeFileSync('b8/bodymap.json', JSON.stringify(bodyMap, null, 1));

const bytes = (dir) => fs.readdirSync(dir).filter((f) => fs.statSync(path.join(dir, f)).isFile())
  .reduce((a, f) => a + fs.statSync(path.join(dir, f)).size, 0);
console.log('body images:', ok, 'ok /', skipped, 'skipped');
console.log('disk: heroes', (bytes(OUT) / 1048576).toFixed(1), 'MB | body', (bytes(BODY_OUT) / 1048576).toFixed(1), 'MB');
