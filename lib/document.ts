import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * A deliberately small reader for the extracted page content in content/.
 *
 * Those files carry the exact rendered wording of the existing site, so the
 * parser only recognises what they actually contain — headings, paragraphs
 * with hard line breaks, bullet and numbered lists, and rules. Inline syntax
 * is left alone on purpose: one paragraph genuinely reads
 * `[murphi.ai](“Platform”)` on the live site, and turning that into a link
 * would change the page.
 */

export type Line = { text: string; br: boolean };

export type Block =
  | { kind: "heading"; level: 2 | 3 | 4 | 5 | 6; text: string; id: string }
  | { kind: "paragraph"; lines: Line[] }
  | { kind: "list"; ordered: boolean; start: number; items: string[] }
  | { kind: "rule" };

export type LegalDocument = {
  /** The document's own title, taken from its first heading. */
  title: string;
  /** The line directly under the title, where the document has one. */
  subtitle?: string;
  /** The publisher line and version block, when they open the document. */
  meta: string[];
  /** Everything else, in order. */
  body: Block[];
};

const HEADING = /^(#{2,6})\s+(.*)$/;
const BULLET = /^-\s+(.*)$/;
const NUMBERED = /^(\d+)\.\s+(.*)$/;

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

export function parseDocument(source: string): Block[] {
  const lines = source.split("\n");
  const blocks: Block[] = [];
  const used = new Set<string>();

  let paragraph: Line[] = [];
  let list: { ordered: boolean; start: number; items: string[] } | null = null;

  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ kind: "paragraph", lines: paragraph });
    paragraph = [];
  };

  const flushList = () => {
    if (list) blocks.push({ kind: "list", ...list });
    list = null;
  };

  const flush = () => {
    flushParagraph();
    flushList();
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const hardBreak = /\s{2,}$/.test(raw);

    if (!line) {
      flush();
      continue;
    }

    if (line === "---") {
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
        level: heading[1].length as 2 | 3 | 4 | 5 | 6,
        text,
        id: slug(text, used),
      });
      continue;
    }

    const bullet = BULLET.exec(line);
    if (bullet) {
      flushParagraph();
      if (!list || list.ordered) {
        flushList();
        list = { ordered: false, start: 1, items: [] };
      }
      list.items.push(bullet[1]);
      continue;
    }

    const numbered = NUMBERED.exec(line);
    if (numbered) {
      flushParagraph();
      if (!list || !list.ordered) {
        flushList();
        list = { ordered: true, start: Number(numbered[1]), items: [] };
      }
      list.items.push(numbered[2]);
      continue;
    }

    flushList();
    paragraph.push({ text: line, br: hardBreak });
  }

  flush();
  return blocks;
}

/**
 * Splits a parsed document into the parts the page shell needs: the title and
 * strapline go to the hero, the publisher and version lines to a meta strip,
 * and the rest stays in document order. Nothing is dropped — every block ends
 * up somewhere on the page.
 */
export function readLegalDocument(file: string): LegalDocument {
  const source = readFileSync(join(process.cwd(), "content", "legal", file), "utf8");
  const blocks = parseDocument(source);

  let title = "";
  let subtitle: string | undefined;
  const meta: string[] = [];

  /* Read the front of the queue without the narrowing sticking across shifts. */
  const head = (list: Block[]): Block | undefined => list[0];

  const titleBlock = head(blocks);
  if (titleBlock?.kind === "heading") {
    title = titleBlock.text;
    blocks.shift();
  }

  const subtitleBlock = head(blocks);
  if (subtitleBlock?.kind === "paragraph" && subtitleBlock.lines.length === 1) {
    subtitle = subtitleBlock.lines[0].text;
    blocks.shift();
  }

  /* The publisher line, then the version / effective / updated block. */
  const publisher = head(blocks);
  if (publisher?.kind === "heading" && publisher.text.startsWith("Murphi.ai —")) {
    meta.push(publisher.text);
    blocks.shift();

    const version = head(blocks);
    if (version?.kind === "paragraph") {
      meta.push(...version.lines.map((line) => line.text));
      blocks.shift();
    }
  }

  while (head(blocks)?.kind === "rule") blocks.shift();

  return { title, subtitle, meta, body: blocks };
}

/** The document's own section headings, for the on-page contents rail. */
export function tableOfContents(body: Block[]) {
  return body
    .filter((block): block is Extract<Block, { kind: "heading" }> => block.kind === "heading")
    .map((heading) => ({ id: heading.id, text: heading.text }));
}
