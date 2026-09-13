import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * The blog: its posts, and a reader for the Markdown they are written in.
 *
 * Posts live in content/blog/<slug>.md, beside content/announcements/ and
 * content/legal/ - the two content sets the site already reads from disk at
 * build time. Each file opens with a `Key: value` front matter block carrying
 * the SEO fields the author wrote, and those drive the page's metadata rather
 * than being printed in the article.
 *
 * This does not extend lib/document.ts. That parser deliberately leaves inline
 * Markdown alone, because one legal paragraph genuinely reads
 * `[murphi.ai](“Platform”)` on the live site and linking it would change the
 * page. Blog posts do want bold, links and tables, so they get their own
 * reader and the existing one is left exactly as it is.
 */

/* ── Front matter ─────────────────────────────────────────── */

export type FrontMatter = {
  seoTitle: string;
  metaDescription: string;
  slug: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  pillar: string;
  calendarReference?: string;
};

/** The pillar as the author writes it - "A - Ambient AI & Clinical
    Documentation" - reduced to the label a card should show. Authors separate
    the letter from its label with a hyphen, an en dash or an em dash, so all
    three are stripped. */
export function pillarLabel(pillar: string) {
  return pillar.replace(/^[A-Z]\s*[—–-]\s*/, "").trim();
}

function parseFrontMatter(source: string) {
  if (!source.startsWith("---"))
    return { data: {} as Record<string, string>, body: source };

  const end = source.indexOf("\n---", 3);
  if (end === -1) return { data: {} as Record<string, string>, body: source };

  const data: Record<string, string> = {};
  for (const line of source.slice(3, end).split("\n")) {
    const at = line.indexOf(":");
    if (at === -1) continue;
    data[line.slice(0, at).trim()] = line.slice(at + 1).trim();
  }

  return { data, body: source.slice(end + 4).replace(/^\n+/, "") };
}

/* ── Inline syntax ────────────────────────────────────────── */

export type Inline = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  href?: string;
};

/**
 * Built fresh on each call rather than shared.
 *
 * A `g` regex carries `lastIndex` on the object itself, and parseInline
 * recurses into bold runs - a shared instance would have the inner call reset
 * the outer one's position and the loop would never terminate.
 */
const inlinePattern = () =>
  /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\)/g;

/** The emphasis a run has inherited from the markers enclosing it. */
type Marks = { bold?: boolean; italic?: boolean };

/**
 * Bold, italic and links, in one pass.
 *
 * A run may carry any combination of the three - a post closes with
 * `**[Explore Revenue Assurance →](/revenue-assurance/)**`, and one cites its
 * source as `*Source: [CMS, ...](https://www.cms.gov/...)*` - so an emphasis
 * match is re-read for what is inside it and the marks carried down.
 *
 * Bold is the first alternative in the pattern, so `**x**` is read as bold
 * rather than as an italic run wrapping `*x*`.
 */
export function parseInline(text: string, marks: Marks = {}): Inline[] {
  const out: Inline[] = [];
  const pattern = inlinePattern();
  let last = 0;

  const plain = (slice: string) => ({
    text: slice,
    bold: marks.bold || undefined,
    italic: marks.italic || undefined,
  });

  for (let m = pattern.exec(text); m; m = pattern.exec(text)) {
    if (m.index > last) out.push(plain(text.slice(last, m.index)));

    if (m[1] !== undefined) {
      out.push(...parseInline(m[1], { ...marks, bold: true }));
    } else if (m[2] !== undefined) {
      out.push(...parseInline(m[2], { ...marks, italic: true }));
    } else {
      out.push({ ...plain(m[3]), href: m[4] });
    }

    last = m.index + m[0].length;
  }

  if (last < text.length) out.push(plain(text.slice(last)));

  return out.filter((run) => run.text.length > 0);
}

/* ── Blocks ───────────────────────────────────────────────── */

export type BlogBlock =
  | { kind: "heading"; level: 1 | 2 | 3 | 4; text: string; id: string }
  | { kind: "paragraph"; runs: Inline[] }
  | { kind: "list"; ordered: boolean; start: number; items: Inline[][] }
  | { kind: "table"; head: Inline[][]; rows: Inline[][][] }
  | { kind: "rule" };

const HEADING = /^(#{1,4})\s+(.*)$/;
const BULLET = /^[-*]\s+(.*)$/;
const NUMBERED = /^(\d+)\.\s+(.*)$/;
const TABLE_ROW = /^\|(.*)\|\s*$/;
const TABLE_RULE = /^\|[\s:|-]+\|\s*$/;

function slug(text: string, used: Set<string>) {
  const base =
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "section";

  let id = base;
  let n = 2;
  while (used.has(id)) id = `${base}-${n++}`;
  used.add(id);

  return id;
}

const cells = (row: string) =>
  row
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((cell) => parseInline(cell.trim()));

export function parsePost(source: string): BlogBlock[] {
  const lines = source.split("\n");
  const blocks: BlogBlock[] = [];
  const used = new Set<string>();

  let paragraph: string[] = [];
  let list: { ordered: boolean; start: number; items: string[] } | null = null;
  let table: { head: Inline[][]; rows: Inline[][][] } | null = null;

  const flush = () => {
    if (paragraph.length) {
      blocks.push({
        kind: "paragraph",
        runs: parseInline(paragraph.join(" ")),
      });
      paragraph = [];
    }
    if (list) {
      blocks.push({
        kind: "list",
        ordered: list.ordered,
        start: list.start,
        items: list.items.map((item) => parseInline(item)),
      });
      list = null;
    }
    if (table) {
      blocks.push({ kind: "table", ...table });
      table = null;
    }
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (!line) {
      flush();
      continue;
    }

    /* A table runs until the first line that is not a row. */
    if (TABLE_ROW.test(line)) {
      if (TABLE_RULE.test(line)) continue;
      if (!table) {
        flush();
        table = { head: cells(line), rows: [] };
      } else {
        table.rows.push(cells(line));
      }
      continue;
    }
    if (table) flush();

    if (/^---+$/.test(line)) {
      flush();
      blocks.push({ kind: "rule" });
      continue;
    }

    const heading = HEADING.exec(line);
    if (heading) {
      flush();
      const text = heading[2].trim();
      blocks.push({
        kind: "heading",
        level: heading[1].length as 1 | 2 | 3 | 4,
        text,
        id: slug(text, used),
      });
      continue;
    }

    const bullet = BULLET.exec(line);
    if (bullet) {
      if (paragraph.length) flush();
      if (!list || list.ordered) {
        flush();
        list = { ordered: false, start: 1, items: [] };
      }
      list.items.push(bullet[1]);
      continue;
    }

    const numbered = NUMBERED.exec(line);
    if (numbered) {
      if (paragraph.length) flush();
      if (!list || !list.ordered) {
        flush();
        list = { ordered: true, start: Number(numbered[1]), items: [] };
      }
      list.items.push(numbered[2]);
      continue;
    }

    if (list) flush();
    paragraph.push(line);
  }

  flush();
  return blocks;
}

/* ── The register ─────────────────────────────────────────── */

export type BlogPost = {
  slug: string;
  /** The article's own H1, from the file. */
  title: string;
  /** The first paragraph, used as the card excerpt. */
  excerpt: string;
  /** The pillar the author assigned, as a card label. */
  category: string;
  /** Printed date, and the machine one beside it. */
  date: string;
  datetime: string;
  author: string;
  image: string;
  imageAlt: string;
  seo: FrontMatter;
};

/**
 * Publication dates and bylines.
 *
 * The front matter carries the SEO fields but no date or author, and neither
 * can be inferred from the article, so they are recorded here - the one place
 * a post's publishing metadata lives. Change the date here and the card, the
 * article page, the sitemap and the Article schema all follow.
 */
const PUBLISHED: Record<
  string,
  { date: string; datetime: string; author: string }
> = {
  "ai-scribe-home-health-guide": {
    date: "September 4, 2026",
    datetime: "2026-09-04",
    author: "Murphi.ai",
  },
  "what-is-pdgm-home-health-reimbursement-2026": {
    date: "September 9, 2026",
    datetime: "2026-09-09",
    author: "Murphi.ai",
  },
  "home-health-text-reminders": {
    date: "September 10, 2026",
    datetime: "2026-09-10",
    author: "Murphi.ai",
  },
  "text-to-pay-home-health": {
    date: "September 11, 2026",
    datetime: "2026-09-11",
    author: "Murphi.ai",
  },
  "what-is-notice-of-admission-noa": {
    date: "September 12, 2026",
    datetime: "2026-09-12",
    author: "Murphi.ai",
  },
  "home-health-denial-trends-2026": {
    date: "September 13, 2026",
    datetime: "2026-09-13",
    author: "Murphi.ai",
  },
  "home-health-staffing-shortage-ai": {
    date: "September 14, 2026",
    datetime: "2026-09-14",
    author: "Murphi.ai",
  },
  "scale-coding-billing-consultancy": {
    date: "September 15, 2026",
    datetime: "2026-09-15",
    author: "Murphi.ai",
  },
};

/** Featured images, by slug. */
const IMAGES: Record<string, { src: string; alt: string }> = {
  "ai-scribe-home-health-guide": {
    src: "/blog/ai-scribe-home-health-guide.svg",
    alt: "How an AI scribe for home health captures a visit and drafts OASIS, HOPE and discipline notes for clinician review",
  },
  "what-is-pdgm-home-health-reimbursement-2026": {
    src: "/blog/pdgm-home-health-featured-image.png",
    alt: "How a home health chart moves from the EHR through coding, OASIS and PDGM review to findings a reviewer resolves before write-back",
  },
  "home-health-text-reminders": {
    src: "/blog/text-reminders-featured-image.png",
    alt: "A visit reminder sent from the Murphi staff app, confirmed by a caregiver's text reply and logged to the communication history - without a phone call",
  },
  "text-to-pay-home-health": {
    src: "/blog/text-to-pay-featured-image.png",
    alt: "A patient balance sent as a secure payment link by text, paid from the patient's phone, and reconciled back to the EHR ledger - without a mailed statement",
  },
  "what-is-notice-of-admission-noa": {
    src: "/blog/noa-featured-image.png",
    alt: "A referral arriving by fax, email, portal or EHR, checked and classified at intake, and filed as an NOA inside the five-day window from start of care - on time, with no penalty",
  },
  "home-health-denial-trends-2026": {
    src: "/blog/denial-trends-featured-image.png",
    alt: "A claim checked for eligibility, authorization and documentation, with a documentation gap intercepted before submission and set against the denial reasons MAC-published data ranks highest",
  },
  "home-health-staffing-shortage-ai": {
    src: "/blog/staffing-shortage-featured-image.png",
    alt: "An existing care team carrying unassigned visits, and the time AI hands back to it - AI-assisted charting, same-day referral to start of care, and automated billing follow-up",
  },
  "scale-coding-billing-consultancy": {
    src: "/blog/scale-consultancy-featured-image.svg",
    alt: "Forty agency client workspaces running one standardized review process - home health and hospice reports, each client's data kept separate, and human sign-off required before anything is delivered",
  },
};

const DIR = join(process.cwd(), "content", "blog");

function readPost(file: string): BlogPost {
  const fileSlug = file.replace(/\.md$/, "");
  const { data, body } = parseFrontMatter(
    readFileSync(join(DIR, file), "utf8"),
  );
  const blocks = parsePost(body);

  const heading = blocks.find(
    (block): block is Extract<BlogBlock, { kind: "heading" }> =>
      block.kind === "heading" && block.level === 1,
  );
  const lead = blocks.find(
    (block): block is Extract<BlogBlock, { kind: "paragraph" }> =>
      block.kind === "paragraph",
  );

  const published = PUBLISHED[fileSlug];
  const image = IMAGES[fileSlug];

  return {
    slug: fileSlug,
    title: heading?.text ?? data["SEO Title"] ?? fileSlug,
    excerpt: lead ? lead.runs.map((run) => run.text).join("") : "",
    category: pillarLabel(data["Content Pillar"] ?? ""),
    date: published?.date ?? "",
    datetime: published?.datetime ?? "",
    author: published?.author ?? "Murphi.ai",
    image: image?.src ?? "",
    imageAlt: image?.alt ?? "",
    seo: {
      seoTitle: data["SEO Title"] ?? heading?.text ?? "",
      metaDescription: data["Meta Description"] ?? "",
      slug: data["URL Slug"] ?? `/blog/${fileSlug}/`,
      primaryKeyword: data["Primary Keyword"] ?? "",
      supportingKeywords: (data["Supporting Keywords"] ?? "")
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean),
      pillar: data["Content Pillar"] ?? "",
      calendarReference: data["Calendar Reference"],
    },
  };
}

/** Every post, newest first. */
export const POSTS: BlogPost[] = readdirSync(DIR)
  .filter((file) => file.endsWith(".md"))
  .map(readPost)
  .sort((a, b) => b.datetime.localeCompare(a.datetime));

export function findPost(slug: string) {
  return POSTS.find((post) => post.slug === slug) ?? null;
}

export const blogHref = (post: { slug: string }) => `/blog/${post.slug}/`;

/**
 * The article, ready to render.
 *
 * The H1 is dropped - the page prints the title in its own header - and so is
 * the closing "Suggested Internal Links" note, which is the author's planning
 * list rather than reader-facing copy: it names a glossary hub and posts that
 * do not exist yet. The links the article itself makes, in its CTA and its
 * prose, are untouched.
 */
export function readPostBody(slug: string): BlogBlock[] {
  const { body } = parseFrontMatter(
    readFileSync(join(DIR, `${slug}.md`), "utf8"),
  );
  const blocks = parsePost(body);

  const notes = blocks.findIndex(
    (block) =>
      block.kind === "heading" &&
      /^Suggested Internal Links$/i.test(block.text),
  );
  const article = notes === -1 ? blocks : blocks.slice(0, notes);

  /* Drop the H1 and any rule left dangling at either end. */
  const trimmed = article.filter(
    (block, i) => !(block.kind === "heading" && block.level === 1 && i === 0),
  );
  while (trimmed.length && trimmed[trimmed.length - 1].kind === "rule")
    trimmed.pop();

  return trimmed;
}

/** The FAQ pairs the article states, for FAQPage schema. */
export function postFaqs(blocks: BlogBlock[]) {
  const faqs: { q: string; a: string }[] = [];
  let inFaq = false;

  for (let i = 0; i < blocks.length; i += 1) {
    const block = blocks[i];

    if (block.kind === "heading" && block.level === 2) {
      inFaq = /frequently asked questions/i.test(block.text);
      continue;
    }
    if (!inFaq) continue;

    if (block.kind === "heading" && block.level === 3) {
      const answer = blocks[i + 1];
      if (answer?.kind === "paragraph") {
        faqs.push({
          q: block.text,
          a: answer.runs.map((run) => run.text).join(""),
        });
      }
    }
  }

  return faqs;
}
