import Link from "next/link";
import type { Block } from "@/lib/document";
import { cn } from "@/lib/cn";

export type ArticleLink = { text: string; href: string };

/**
 * The article body — Home typography hierarchy (Spectral headings, Manrope
 * lead body). Wording is never altered.
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
        className="font-semibold text-[#007EFF] underline decoration-[#CCE5FF] underline-offset-[3px] transition-colors duration-200 hover:text-[#006AD6]"
      >
        {part.text}
      </Link>
    ),
  );
}

function ArticleBlock({ block, queue }: { block: Block; queue: ArticleLink[] }) {
  if (block.kind === "rule") {
    return <hr className="my-10 border-0 border-t border-[#E3E3E3]" />;
  }

  if (block.kind === "heading") {
    const Tag = block.level <= 3 ? "h2" : ("h3" as const);

    return (
      <Tag
        id={block.id}
        className={cn(
          "scroll-mt-[96px] text-ink first:mt-0",
          Tag === "h2"
            ? "type-hl-section-title mt-12 max-600:text-[24px]"
            : "type-hl-card-title mt-10",
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
          "type-hl-lead mt-6 grid gap-3 pl-6",
          block.ordered ? "list-decimal" : "list-disc",
        )}
      >
        {block.items.map((item, i) => (
          <li key={i} className="pl-1 marker:text-[#007EFF]">
            {withLinks(item, queue)}
          </li>
        ))}
      </Tag>
    );
  }

  return (
    <p className="type-hl-lead mt-6 first:mt-0">
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
