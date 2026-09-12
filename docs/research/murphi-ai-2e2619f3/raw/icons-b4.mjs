import fs from 'fs';

/**
 * Pulls the inline SVG icons and the raster assets out of the four bespoke
 * pages, in document order, so the generated content can reference them by
 * index. Root <svg> presentation attributes are preserved verbatim — dropping
 * them renders the icons invisible.
 */

const PAGES = ['integration', 'white-labeling', 'security', 'about-us'];
// Every wrapper whose only child is an icon, per page.
const HOSTS = ['val-card-ico', 'sec-card-ico', 'cert-ico', 'int-icon', 'hero-cert-ico', 'related-card-ico'];

const svgs = {};
const assets = new Set();
const shapes = {};

for (const p of PAGES) {
  const h = fs.readFileSync('html/' + p + '.html', 'utf8');
  const start = Math.max(h.indexOf('<section class="page-hero"'), h.indexOf('<section class="about-hero"'));
  const body = h.slice(start, h.indexOf('murphi-cta-root')).replace(/<!--[^]*?-->/g, '');
  svgs[p] = {};
  shapes[p] = {};
  for (const host of HOSTS) {
    const hits = [...body.matchAll(new RegExp('<div class="' + host + '"[^>]*>([^]*?)</div>', 'g'))];
    if (!hits.length) continue;
    shapes[p][host] = hits.length;
    svgs[p][host] = hits.map((m) => {
      const inner = m[1];
      const svg = inner.match(/<svg[^]*<\/svg>/);
      const img = inner.match(/src="([^"]+)"/);
      if (img) assets.add(img[1]);
      return {
        svg: svg ? svg[0] : null,
        img: img ? img[1] : null,
        text: svg || img ? null : inner.replace(/<[^>]+>/g, '').trim() || null,
      };
    });
  }
  // Team photos live on a bare <img class="team-av-photo">.
  const photos = [...body.matchAll(/<img[^>]*class="team-av-photo"[^>]*>/g)].map((m) => ({
    src: (m[0].match(/src="([^"]+)"/) || [])[1],
    alt: (m[0].match(/alt="([^"]*)"/) || [])[1] || '',
  }));
  if (photos.length) {
    svgs[p]['team-av-photo'] = photos;
    photos.forEach((x) => assets.add(x.src));
  }
}

fs.writeFileSync('b4/icons.json', JSON.stringify(svgs, null, 1));
fs.writeFileSync('b4/assets.json', JSON.stringify([...assets], null, 1));
console.log(JSON.stringify(shapes, null, 1));
console.log('assets:', assets.size);
for (const a of assets) console.log('  ' + a);
