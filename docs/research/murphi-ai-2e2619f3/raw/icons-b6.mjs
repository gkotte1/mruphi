import fs from 'fs';
const h = fs.readFileSync('html/download-app.html', 'utf8');
const body = h.slice(h.indexOf('<section class="page-hero">'), h.indexOf('murphi-cta-root'));
const svgs = [...body.matchAll(/<div class="feature-card-ico">([^]*?)<\/div>/g)]
  .map((m) => (m[1].match(/<svg[^]*<\/svg>/) || [])[0]);
const imgs = [...body.matchAll(/<img[^>]*src="([^"]+)"[^>]*>/g)].map((m) => m[1]);
fs.writeFileSync('b6/icons.json', JSON.stringify({ 'download-app': { 'feature-card-ico': svgs.map((s) => ({ svg: s })) } }, null, 1));
fs.writeFileSync('b6/assets.json', JSON.stringify([...new Set(imgs)], null, 1));
console.log('svgs', svgs.length, 'imgs', imgs.length);
console.log(svgs[0]);
imgs.forEach((i) => console.log('  ' + i));
