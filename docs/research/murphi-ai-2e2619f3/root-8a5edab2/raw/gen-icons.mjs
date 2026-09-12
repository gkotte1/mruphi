import fs from 'fs';
const list = JSON.parse(fs.readFileSync('raw/svgs.json','utf8'));

const SHARED = {
  0:'NavPostAcute',1:'NavHealthSystems',2:'NavPrimaryCare',3:'NavMentalHealth',4:'NavPublicHealth',
  5:'NavEhrCompanies',6:'NavRcmCompanies',7:'NavCodingBilling',8:'NavQapi',9:'NavAccreditation',
  10:'NavAmbientAi',11:'NavRevenueAssurance',12:'NavPatientFinancials',13:'NavContractAnalyzer',
  14:'NavIntegration',15:'NavWhiteLabel',16:'Download',17:'Hamburger',
  64:'SocialVideo',65:'SocialLinkedIn',66:'SocialFacebook',67:'SocialInstagram',68:'SocialX',
  69:'SocialYouTube',70:'SocialGoogle',71:'Close',
};
const PAGE = {
  34:'EngageEhr',35:'EngageProviders',36:'EngageConsultants',
  37:'ChipAmbientAi',38:'ChipRevenueAssurance',39:'ChipPatientFinancials',40:'ChipContractAnalyzer',
  41:'TrustHipaa',42:'TrustSoc2',43:'TrustIso',44:'TrustBaa',45:'TrustEhr',46:'TrustTimeZones',
  47:'Announcement',
  48:'TabPostAcute',49:'TabHealthSystems',50:'TabPrimary',51:'TabMental',52:'TabEhr',
  53:'FeatureMic',54:'FeatureChart',55:'FeatureCard',56:'FeatureClipboard',57:'FeatureContract',
  58:'FeatureRcm',59:'FeatureMessage',60:'FeatureApi',61:'FeatureWhiteLabel',62:'FeatureData',
  63:'FeatureRoadmap',
};

const ATTR = {
  'stroke-width':'strokeWidth','stroke-linecap':'strokeLinecap','stroke-linejoin':'strokeLinejoin',
  'stroke-dasharray':'strokeDasharray','fill-rule':'fillRule','clip-rule':'clipRule',
  'stroke-miterlimit':'strokeMiterlimit','xmlns:xlink':'xmlnsXlink','fill-opacity':'fillOpacity',
  'stroke-opacity':'strokeOpacity','text-anchor':'textAnchor','font-size':'fontSize',
  'font-weight':'fontWeight','font-family':'fontFamily','clip-path':'clipPath',
};

function toJsx(svg) {
  let s = svg;
  // drop the outer <svg ...> wrapper attrs we re-declare, keep inner content + viewBox
  const open = s.match(/^<svg([^>]*)>/)[1];
  const viewBox = (open.match(/viewBox="([^"]*)"/) || [])[1] || '0 0 24 24';
  // Presentation attributes live on the ROOT <svg> and are inherited by the
  // children — dropping them renders the icon invisible.
  const rootAttrs = [];
  for (const a of ['stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'fill']) {
    const m = open.match(new RegExp(a + '="([^"]*)"'));
    if (m) rootAttrs.push(`${ATTR[a] || a}="${m[1]}"`);
  }
  if (!rootAttrs.some(x => x.startsWith('fill='))) rootAttrs.push('fill="none"');
  const rootAttrStr = rootAttrs.join(' ');
  let inner = s.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '').trim();
  // style="a:b;c:d" -> style={{a:'b'}}
  inner = inner.replace(/style="([^"]*)"/g, (_, css) => {
    const obj = css.split(';').filter(Boolean).map(d => {
      const [k, ...v] = d.split(':');
      const key = k.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      return `${key}:'${v.join(':').trim()}'`;
    }).join(',');
    return `style={{${obj}}}`;
  });
  for (const [k, v] of Object.entries(ATTR)) inner = inner.replaceAll(`${k}=`, `${v}=`);
  inner = inner.replace(/\s*xmlns="[^"]*"/g, '');
  inner = inner.replace(/<(path|circle|rect|line|polyline|polygon|ellipse|stop)([^>]*[^/])>/g, '<$1$2 />');
  return { viewBox, inner, rootAttrStr };
}

function build(map, header) {
  const out = [header, ''];
  for (const [idx, name] of Object.entries(map)) {
    const item = list[Number(idx)];
    if (!item) { console.error('MISSING index', idx); continue; }
    const { viewBox, inner, rootAttrStr } = toJsx(item.svg);
    out.push(
`export function ${name}Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="${viewBox}" ${rootAttrStr} xmlns="http://www.w3.org/2000/svg" {...props}>
      ${inner}
    </svg>
  );
}
`);
  }
  return out.join('\n');
}

const hdr = `import type { SVGProps } from "react";

/**
 * Icons extracted verbatim from the murphi.ai homepage inline SVGs.
 * Generated from docs/research/murphi-ai-2e2619f3/root-8a5edab2/raw/svgs.json —
 * do not hand-edit paths; re-run raw/gen-icons.mjs instead.
 */`;

fs.mkdirSync('../../../../src/components/sites/murphi-ai-2e2619f3/shared', { recursive: true });
fs.writeFileSync('../../../../src/components/sites/murphi-ai-2e2619f3/shared/icons.tsx', build(SHARED, hdr));
fs.writeFileSync('../../../../src/components/sites/murphi-ai-2e2619f3/root-8a5edab2/icons.tsx', build(PAGE, hdr));
console.log('shared icons:', Object.keys(SHARED).length, '| page icons:', Object.keys(PAGE).length);
