import fs from 'fs';

const data = JSON.parse(fs.readFileSync('b4/content.json', 'utf8'));
const icons = JSON.parse(fs.readFileSync('b4/icons.json', 'utf8'));
const assets = JSON.parse(fs.readFileSync('b4/assetmap.json', 'utf8'));
const OUT = 'c:/Users/krush/OneDrive/Desktop/m/murphi-clone/src/content/murphi-ai-2e2619f3/bespoke-pages.ts';

const q = (s) => JSON.stringify(s);
const local = (u) => assets[u] ?? u;
const miss = [];
const need = (v, where) => { if (v === undefined || v === null || v === '') miss.push(where); return v; };

/* ── /integration/ ──────────────────────────────────────────────────── */
const integ = data.integration;
let out = `import type {
  AboutPage,
  IntegrationPage,
  ModulePage,
  SecurityPage,
} from "./types";

/**
 * Content for the four bespoke pages — /integration/, /white-labeling/,
 * /security/ and /about-us/ — extracted verbatim from the live murphi.ai
 * markup. Generated: re-run
 * docs/research/murphi-ai-2e2619f3/raw/extract-b4.mjs + gen-b4.mjs rather than
 * hand-editing the prose.
 */
export const INTEGRATION_PAGE: IntegrationPage = {
  slug: ${q(integ.slug)},
  title: ${q(need(integ.title, 'integration.title'))},
  description: ${q(need(integ.description, 'integration.description'))},
  heroTag: ${q(need(integ.hero.tag, 'integration.hero.tag'))},
  h1Lines: [${integ.hero.h1Lines.map(q).join(', ')}],
  heroSub: ${q(need(integ.hero.sub, 'integration.hero.sub'))},
  heroButtons: [
${integ.hero.buttons.map((b) => `    { label: ${q(b.label)}, href: ${q(b.href)}, variant: ${q(b.variant)} },`).join('\n')}
  ],
  sections: [
`;
for (const s of integ.sections) {
  out += `    {\n      tag: ${q(need(s.tag, 'integration.section.tag'))},\n      heading: ${q(need(s.heading, 'integration.section.heading'))},\n      alt: ${s.alt},\n`;
  if (s.lead) out += `      lead: ${q(s.lead)},\n`;
  if (s.methods) {
    out += `      methodColumns: ${q(s.methodColumns)},\n      methods: [\n`;
    for (const m of s.methods) {
      out += `        {\n          title: ${q(need(m.title, 'method.title'))},\n          description: ${q(need(m.description, 'method.desc'))},\n          padding: ${m.padding},\n          descSize: ${m.descSize},\n        },\n`;
    }
    out += `      ],\n`;
  }
  if (s.tagGroups) {
    out += `      tagGroups: [\n`;
    for (const g of s.tagGroups) {
      out += `        {\n          title: ${q(need(g.title, 'group.title'))},\n          subtitle: ${q(need(g.subtitle, 'group.subtitle'))},\n          tags: [${g.tags.map(q).join(', ')}],\n        },\n`;
    }
    out += `      ],\n`;
  }
  if (s.kpis) {
    out += `      kpis: [\n${s.kpis.map((k) => `        { value: ${q(k.value)}, label: ${q(k.label)} },`).join('\n')}\n      ],\n`;
  }
  if (s.cards) {
    out += `      cards: [\n`;
    for (const c of s.cards) {
      out += `        { title: ${q(need(c.title, 'card.title'))}, description: ${q(need(c.description, 'card.desc'))} },\n`;
    }
    out += `      ],\n`;
  }
  out += `    },\n`;
}
out += `  ],\n};\n`;

/* ── /white-labeling/ (rendered by the shared module template) ───────── */
const wl = data['white-labeling'];
let wlIcon = 0;
out += `
/**
 * /white-labeling/ reuses the SaaS module page shell: the same hero grid with
 * a 320px status card, the same `+'`.sec-grey`'+` / `+'`.sec-white`'+` bands, and the same
 * related-card footer. Only the blue status badge and the icon-card row are
 * specific to it.
 */
export const WHITE_LABELING_PAGE: ModulePage = {
  slug: ${q(wl.slug)},
  title: ${q(need(wl.title, 'wl.title'))},
  description: ${q(need(wl.description, 'wl.description'))},
  layout: {
    aside: 320,
    subMaxWidth: 560,
    subGap: 32,
    quoteRoleGap: 2,
    headingGap: 16,
    leadMaxWidth: 640,
    leadGap: 32,
    leadLeading: 1.7,
    density: "standard",
    heroTypeScale: "responsive",
    kpiMobileCols: 2,
    headingMobile: "clamp28",
    eyebrowMobile: 10,
    mobileChrome: "standard",
  },
  heroTag: ${q(need(wl.hero.tag, 'wl.hero.tag'))},
  h1Lines: [${wl.hero.h1Lines.map(q).join(', ')}],
  heroSub: ${q(need(wl.hero.sub, 'wl.hero.sub'))},
  heroButtons: [
${wl.hero.buttons.map((b) => `    { label: ${q(b.label)}, href: ${q(b.href)}, variant: ${q(b.variant)} },`).join('\n')}
  ],
  statusCard: {
    title: ${q(need(wl.hero.statusCard.title, 'wl.card.title'))},
    badge: ${q(need(wl.hero.statusCard.badge, 'wl.card.badge'))},
    badgeTone: "blue",
    facts: [
${wl.hero.statusCard.facts.map((f) => `      ${q(f)},`).join('\n')}
    ],
  },
  sections: [
`;
for (const s of wl.sections) {
  out += `    {\n      grey: ${s.grey},\n      tag: ${q(need(s.tag, 'wl.section.tag'))},\n      heading: ${q(need(s.heading, 'wl.section.heading'))},\n`;
  if (s.lead) out += `      lead: ${q(s.lead)},\n`;
  if (s.cards) {
    const iconRow = s.cards.every((c) => c.hasIcon);
    if (iconRow) {
      out += `      iconCards: [\n`;
      for (const c of s.cards) {
        out += `        {\n          icon: ${q('wl-' + wlIcon++)},\n          title: ${q(need(c.title, 'wl.card.title'))},\n          description: ${q(need(c.description, 'wl.card.desc'))},\n        },\n`;
      }
      out += `      ],\n`;
    } else {
      out += `      features: [\n`;
      for (const c of s.cards) {
        out += `        {\n`;
        if (c.status) out += `          status: ${q(c.status)},\n`;
        if (c.badgeLabel) out += `          badgeLabel: ${q(c.badgeLabel)},\n`;
        out += `          title: ${q(need(c.title, 'wl.card.title'))},\n          description: ${q(need(c.description, 'wl.card.desc'))},\n`;
        if (c.attribution) out += `          attribution: ${q(c.attribution)},\n`;
        out += `        },\n`;
      }
      out += `      ],\n`;
    }
  }
  if (s.related) {
    out += `      related: [\n`;
    for (const r of s.related) {
      out += `        { href: ${q(r.href)}, title: ${q(need(r.title, 'wl.rel.title'))}, description: ${q(need(r.description, 'wl.rel.desc'))} },\n`;
    }
    out += `      ],\n`;
  }
  out += `    },\n`;
}
out += `  ],\n};\n`;

/* ── /security/ ─────────────────────────────────────────────────────── */
const sec = data.security;
const heroCertIcons = icons.security['hero-cert-ico'];
let secIcon = 0;
let certIcon = 0;
out += `
export const SECURITY_PAGE: SecurityPage = {
  slug: ${q(sec.slug)},
  title: ${q(need(sec.title, 'sec.title'))},
  description: ${q(need(sec.description, 'sec.description'))},
  heroTag: ${q(need(sec.hero.tag, 'sec.hero.tag'))},
  h1Lines: [${sec.hero.h1Lines.map(q).join(', ')}],
  heroSub: ${q(need(sec.hero.sub, 'sec.hero.sub'))},
  heroCerts: [
`;
sec.hero.certs.forEach((c, i) => {
  out += `    {\n      icon: ${q(local(need(heroCertIcons[i].img, 'sec.heroCert.img')))},\n      alt: ${q('')},\n      title: ${q(need(c.title, 'sec.heroCert.title'))},\n      subtitle: ${q(need(c.subtitle, 'sec.heroCert.sub'))},\n    },\n`;
});
out += `  ],\n  sections: [\n`;
for (const s of sec.sections) {
  out += `    {\n      tag: ${q(need(s.tag, 'sec.section.tag'))},\n      heading: ${q(need(s.heading, 'sec.section.heading'))},\n      alt: ${s.alt},\n`;
  if (s.lead) out += `      lead: ${q(s.lead)},\n`;
  if (s.cards) {
    out += `      columns: ${q(s.columns)},\n      cards: [\n`;
    for (const c of s.cards) {
      const cert = c.kind === 'cert-card';
      const icon = cert
        ? local(need(icons.security['cert-ico'][certIcon++].img, 'sec.cert.img'))
        : 'sec-' + secIcon++;
      out += `        {\n          kind: ${q(cert ? 'cert' : 'sec')},\n          icon: ${q(icon)},\n          title: ${q(need(c.title, 'sec.card.title'))},\n          description: ${q(need(c.description, 'sec.card.desc'))},\n        },\n`;
    }
    out += `      ],\n`;
  }
  if (s.table) {
    out += `      table: {\n        headers: [${s.table.headers.map(q).join(', ')}],\n        rows: [\n`;
    for (const r of s.table.rows) out += `          [${r.map(q).join(', ')}],\n`;
    out += `        ],\n      },\n`;
  }
  out += `    },\n`;
}
out += `  ],\n};\n`;
if (secIcon !== icons.security['sec-card-ico'].length) {
  miss.push(`security icon count ${secIcon} != ${icons.security['sec-card-ico'].length}`);
}

/* ── /about-us/ ─────────────────────────────────────────────────────── */
const ab = data['about-us'];
const photos = icons['about-us']['team-av-photo'];
let valIcon = 0;
let photoIdx = 0;
out += `
export const ABOUT_PAGE: AboutPage = {
  slug: ${q(ab.slug)},
  title: ${q(need(ab.title, 'about.title'))},
  description: ${q(need(ab.description, 'about.description'))},
  h1: ${q(need(ab.hero.h1Lines[0], 'about.h1'))},
  heroBody: ${q(need(ab.hero.body[0], 'about.heroBody'))},
  sections: [
`;
for (const s of ab.sections) {
  out += `    {\n      tone: ${q(s.tone)},\n      tag: ${q(s.tag)},\n      tagDot: ${!!s.tagDot},\n`;
  if (s.intro) {
    out += `      intro: [\n`;
    for (const c of s.intro) {
      out += `        {\n          title: ${q(need(c.title, 'about.intro.title'))},\n          paragraphs: [\n${c.paragraphs.map((p) => `            ${q(need(p, 'about.intro.p'))},`).join('\n')}\n          ],\n        },\n`;
    }
    out += `      ],\n`;
  }
  if (s.diff) {
    out += `      differentiators: [\n${s.diff.map((d) => `        ${q(need(d.title, 'about.diff'))},`).join('\n')}\n      ],\n`;
  }
  if (s.visionMission) {
    out += `      visionMission: [\n`;
    for (const v of s.visionMission) {
      out += `        {\n          label: ${q(need(v.label, 'about.vm.label'))},\n          title: ${q(need(v.title, 'about.vm.title'))},\n          description: ${q(need(v.description, 'about.vm.desc'))},\n        },\n`;
    }
    out += `      ],\n`;
  }
  if (s.values) {
    out += `      values: [\n`;
    for (const v of s.values) {
      out += `        {\n          icon: ${q('val-' + valIcon++)},\n          title: ${q(need(v.title, 'about.val.title'))},\n          description: ${q(need(v.description, 'about.val.desc'))},\n        },\n`;
    }
    out += `      ],\n`;
  }
  if (s.team) {
    out += `      team: [\n`;
    for (const t of s.team) {
      const p = photos[photoIdx++];
      out += `        {\n          photo: ${q(local(need(p.src, 'about.team.photo')))},\n          alt: ${q(p.alt)},\n          name: ${q(need(t.name, 'about.team.name'))},\n          role: ${q(need(t.role, 'about.team.role'))},\n          link: ${q(need(t.link, 'about.team.link'))},\n          linkLabel: ${q('in LinkedIn')},\n        },\n`;
    }
    out += `      ],\n`;
  }
  out += `    },\n`;
}
out += `  ],\n};\n`;

fs.writeFileSync(OUT, out);
console.log('wrote', OUT, out.length, 'bytes');
if (miss.length) {
  console.error('EMPTY FIELDS:\n  ' + miss.join('\n  '));
  process.exitCode = 1;
} else {
  console.log('every field populated');
}
