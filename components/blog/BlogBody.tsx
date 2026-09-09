import type { ReactNode } from "react";
import Link from "next/link";
import type { BlogBlock, Inline } from "@/lib/blog";
import { cn } from "@/lib/cn";

/**
 * The article body, at the same editorial scale the announcement pages use  -
 * 16.5px prose on a 1.75 rhythm, 23px section headings, 18.5px sub-headings.
 *
 * It adds the two things a blog post needs that an announcement does not: a
 * table, and inline bold and links parsed from the Markdown rather than
 * restored from a separate list.
 */
export default function BlogBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="mt-12 max-600:mt-9">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

/** One run of prose: plain, bold, italic, a link, or any combination. */
function Runs({ runs }: { runs: Inline[] }) {
  return (
    <>
      {runs.map((run, i) => {
        let body: ReactNode = run.text;
        if (run.bold) {
          body = <strong className="font-bold text-ink">{body}</strong>;
        }
        if (run.italic) body = <em className="italic">{body}</em>;

        if (!run.href) return <span key={i}>{body}</span>;

        const external = /^https?:\/\//.test(run.href);
        const className =
          "font-semibold text-brand-dark underline decoration-brand-border underline-offset-[3px] transition-colors duration-200 hover:text-brand-deep hover:decoration-brand";

        return external ? (
          <a
            key={i}
            href={run.href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
          >
            {body}
          </a>
        ) : (
          <Link key={i} href={run.href} className={className}>
            {body}
          </Link>
        );
      })}
    </>
  );
}

function Block({ block }: { block: BlogBlock }) {
  if (block.kind === "rule") {
    return <hr className="my-10 border-0 border-t border-grey-mid" />;
  }

  if (block.kind === "heading") {
    /* The page prints the article title as its own h1, so the file's ## and
       ### become the h2 and h3 beneath it. */
    const Tag = block.level <= 2 ? "h2" : ("h3" as const);

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
            <Runs runs={item} />
          </li>
        ))}
      </Tag>
    );
  }

  if (block.kind === "table") {
    return (
      /* The table scrolls inside its own rail rather than widening the page. */
      <div className="mt-8 -mx-1 overflow-x-auto px-1">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-ink">
              {block.head.map((cell, i) => (
                <th
                  key={i}
                  scope="col"
                  className="px-3 py-3 align-bottom text-[13px] font-bold tracking-[-0.01em] text-ink first:pl-0 last:pr-0"
                >
                  <Runs runs={cell} />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {block.rows.map((row, i) => (
              <tr key={i} className="border-b border-grey-mid last:border-b-0">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="px-3 py-3.5 align-top text-[14px] leading-[1.6] text-grey-dk first:pl-0 last:pr-0"
                  >
                    <Runs runs={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <p className="mt-6 text-[16.5px] leading-[1.75] text-grey-dk first:mt-0 max-600:text-[15.5px]">
      <Runs runs={block.runs} />
    </p>
  );
}
