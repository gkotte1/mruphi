import fs from 'fs';
const h = fs.readFileSync('raw/homepage.html','utf8');
const svgs = [...h.matchAll(/<svg[\s\S]*?<\/svg>/g)];
const seen = new Map();
for (const m of svgs) {
  const svg = m[0];
  const norm = svg.replace(/\s+/g,' ').trim();
  if (seen.has(norm)) { seen.get(norm).count++; continue; }
  // context: nearest following title-ish text
  const after = h.slice(m.index + svg.length, m.index + svg.length + 260).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim().slice(0,60);
  const before = h.slice(Math.max(0,m.index-160), m.index).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim().slice(-50);
  seen.set(norm, { svg: norm, count: 1, after, before, i: m.index });
}
const list = [...seen.values()].sort((a,b)=>a.i-b.i);
console.log('total svg tags:', svgs.length, '| unique:', list.length);
fs.writeFileSync('raw/svgs.json', JSON.stringify(list, null, 1));
list.forEach((s,i)=>console.log(String(i).padStart(3), 'x'+String(s.count).padEnd(3), '|', (s.after||s.before).slice(0,52).padEnd(53), '|', s.svg.length));
