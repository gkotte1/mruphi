import fs from 'fs';
const h = fs.readFileSync('raw/homepage.html','utf8');
const marks = [...h.matchAll(/<!DOCTYPE html>/gi)].map(m=>m.index);
const bounds = [...marks, h.length];
const names = ['outer','blockA','blockB','blockC','blockD'];
for (let i=0;i<marks.length;i++){
  const seg = h.slice(bounds[i], bounds[i+1]);
  const title = (seg.match(/<title>([^<]*)<\/title>/)||[])[1] || names[i];
  const styles = [...seg.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m=>m[1]).join('\n\n');
  let body = seg.replace(/<style[\s\S]*?<\/style>/g,'').replace(/<script[\s\S]*?<\/script>/g,'');
  fs.writeFileSync(`raw/${names[i]}.css`, styles);
  fs.writeFileSync(`raw/${names[i]}.body.html`, body);
  // which known sections live here
  const secs = ['mh-nav','murphi-announcement-banner','hero','trust','mq','positioning','segments','modules-strip','paas-section','social-proof','cta-section','murphi-footer','connect-overlay'].filter(s=>seg.includes('class="'+s) || seg.includes(s+'{') || seg.includes('.'+s+' '));
  console.log(names[i].padEnd(7), String(seg.length).padStart(7), '|', title.slice(0,45).padEnd(46), '|', secs.join(', '));
}
