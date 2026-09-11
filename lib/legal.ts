import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Legal copy and archive metadata live in content/legal/utility-content.json
 * (extracted from the old WordPress legal pages). Archive type is the per-page
 * measurement recorded when those pages were rebuilt.
 */

export type LegalSlug = "privacy-policy" | "terms-of-service" | "ai-terms";

export type LegalSpan = {
  text?: string;
  bold?: boolean;
  italic?: boolean;
  href?: string;
  br?: boolean;
};

export type LegalBlock = {
  t: string;
  spans?: LegalSpan[];
  items?: LegalSpan[][];
};

export type LegalPageData = {
  slug: LegalSlug;
  title: string;
  description: string;
  h1: string;
  heroSub: string;
  blocks: LegalBlock[];
  archive: {
    label: string;
    blocks: LegalBlock[];
    inset: number;
    proseSize: number;
    proseColor: string;
  };
};

const ARCHIVE_TYPE: Record<
  LegalSlug,
  { size: number; color: string; inset: number }
> = {
  "privacy-policy": { size: 14, color: "#333333", inset: 0 },
  "terms-of-service": { size: 13, color: "#333333", inset: 10 },
  "ai-terms": { size: 14, color: "#000000", inset: 20 },
};

const SOURCE = join(process.cwd(), "content/legal/utility-content.json");

let cache: Record<string, Omit<LegalPageData, "archive"> & {
  archive: { label: string; blocks: LegalBlock[] };
}> | null = null;

function loadSource() {
  if (!cache) {
    cache = JSON.parse(readFileSync(SOURCE, "utf8"));
  }
  return cache!;
}

export function getLegalPage(slug: LegalSlug): LegalPageData {
  const page = loadSource()[slug];
  if (!page) throw new Error(`Missing legal page in utility-content.json: ${slug}`);

  const type = ARCHIVE_TYPE[slug];

  return {
    slug,
    title: page.title,
    description: page.description,
    h1: page.h1,
    heroSub: page.heroSub,
    blocks: page.blocks,
    archive: {
      label: page.archive.label,
      blocks: page.archive.blocks,
      inset: type.inset,
      proseSize: type.size,
      proseColor: type.color,
    },
  };
}

const WP_COMMENT = /<!--[\s\S]*?-->/g;

function isWpCommentOnly(text: string) {
  return text.replace(WP_COMMENT, "").trim() === "" && /<!--/.test(text);
}

function cleanSpans(spans: LegalSpan[] | undefined): LegalSpan[] | undefined {
  if (!spans) return spans;

  const next: LegalSpan[] = [];
  for (const span of spans) {
    if (span.br) {
      next.push(span);
      continue;
    }
    if (span.text == null) {
      next.push(span);
      continue;
    }
    if (isWpCommentOnly(span.text)) continue;

    const text = span.text.replace(WP_COMMENT, "");
    if (text === span.text) {
      next.push(span);
    } else if (text.trim() !== "" || text.includes("\u00a0")) {
      next.push({ ...span, text });
    }
  }
  return next;
}

function spansHaveContent(spans: LegalSpan[] | undefined) {
  if (!spans?.length) return false;
  return spans.some((span) => span.br || (span.text != null && span.text.length > 0));
}

/** Drop Gutenberg comments and `<hr>` separators; leave legal wording intact. */
export function cleanLegalBlocks(blocks: LegalBlock[]): LegalBlock[] {
  const cleaned: LegalBlock[] = [];

  for (const block of blocks) {
    if (block.t === "hr") continue;

    if (block.items) {
      const items = block.items
        .map((item) => cleanSpans(item) ?? [])
        .filter((item) => spansHaveContent(item));
      if (!items.length) continue;
      cleaned.push({ ...block, items });
      continue;
    }

    const spans = cleanSpans(block.spans);
    if (!spansHaveContent(spans)) continue;
    cleaned.push({ ...block, spans });
  }

  return cleaned;
}
