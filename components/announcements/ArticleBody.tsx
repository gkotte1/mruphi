import Link from "next/link";
import type { Block } from "@/lib/document";
import { cn } from "@/lib/cn";

export type ArticleLink = { text: string; href: string };

/**
 * The article body, at editorial scale - headings, paragraphs and lists in
 * source order.
 *
 * The detail-page research records the body as plain prose and the in-body
 * links separately, as an ordered table of link text → destination. So the
 * links are restored here by walking the prose once and anchoring each recorded
 * link on its next occurrence, consuming the list in order. Wording is never
 * altered; a link whose text cannot be found further down is simply skipped.
 */
export default function ArticleBody({
  blocks,
  links = [],
}: {
  blocks: Block[];
  links?: ArticleLink[];
}) {
  const queue = [...links];

  return (
    <div className="mt-12 max-600:mt-9">
      {blocks.map((block, i) => (
        <ArticleBlock key={i} block={block} queue={queue} />
      ))}
    </div>
  );
}

/** Splits one run of prose around the next recorded links it contains. */
function withLinks(text: string, queue: ArticleLink[]) {
  const parts: (string | ArticleLink)[] = [];
  let rest = text;

  while (queue.length) {
    const at = rest.indexOf(queue[0].text);
    if (at === -1) break;

    const link = queue.shift()!;
    if (at > 0) parts.push(rest.slice(0, at));
    parts.push(link);
    rest = rest.slice(at + link.text.length);
  }

  parts.push(rest);

  return parts.map((part, i) =>
    typeof part === "string" ? (
      part
    ) : (
      <Link
        key={i}
        href={part.href}
        className="font-semibold text-brand-dark underline decoration-brand-border underline-offset-[3px] transition-colors duration-200 hover:text-brand-deep hover:decoration-brand"
      >
        {part.text}
      </Link>
    ),
  );
}

function ArticleBlock({ block, queue }: { block: Block; queue: ArticleLink[] }) {
  if (block.kind === "rule") {
    return <hr className="my-10 border-0 border-t border-grey-mid" />;
  }

  if (block.kind === "heading") {
    /* The source uses ### for sections and #### for their sub-sections; the
       page's own h1 is the article title, so those become h2 and h3. */
    const Tag = block.level <= 3 ? "h2" : ("h3" as const);

    return (
      <Tag
        id={block.id}
        className={cn(
          "scroll-mt-[96px] font-bold tracking-[-0.02em] text-ink",
          Tag === "h2"
            ? "mt-12 text-[23px] leading-snug first:mt-0 max-600:text-[20px]"
            : "mt-10 text-[18.5px] leading-snug first:mt-0 max-600:text-[17px]",
        )}
      >
        {block.text}
      </Tag>
    );
  }

  if (block.kind === "list") {
    const Tag = block.ordered ? "ol" : "ul";

    return (
      <Tag
        start={block.ordered ? block.start : undefined}
        className={cn(
          "mt-6 grid gap-3 pl-6 text-[16.5px] leading-[1.75] text-grey-dk max-600:text-[15.5px]",
          block.ordered ? "list-decimal" : "list-disc",
        )}
      >
        {block.items.map((item, i) => (
          <li key={i} className="pl-1 marker:text-brand/70">
            {withLinks(item, queue)}
          </li>
        ))}
      </Tag>
    );
  }

  return (
    <p className="mt-6 text-[16.5px] leading-[1.75] text-grey-dk first:mt-0 max-600:text-[15.5px]">
      {block.lines.map((line, i) => (
        <span key={i}>
          {i > 0 && !block.lines[i - 1].br ? " " : null}
          {withLinks(line.text, queue)}
          {line.br && i < block.lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </p>
  );
}
