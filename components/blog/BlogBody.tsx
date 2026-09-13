import type { ReactNode } from "react";
import Link from "next/link";
import type { BlogBlock, Inline } from "@/lib/blog";
import { cn } from "@/lib/cn";

/**
 * Blog article body — Home typography hierarchy (Spectral headings, Manrope
 * lead body). Content is never rewritten.
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
          body = <strong className="font-semibold text-ink">{body}</strong>;
        }
        if (run.italic) body = <em className="italic">{body}</em>;

        if (!run.href) return <span key={i}>{body}</span>;

        const external = /^https?:\/\//.test(run.href);
        const className =
          "font-semibold text-[#007EFF] underline decoration-[#CCE5FF] underline-offset-[3px] transition-colors duration-200 hover:text-[#006AD6]";

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
    return <hr className="my-10 border-0 border-t border-[#E3E3E3]" />;
  }

  if (block.kind === "heading") {
    const Tag = block.level <= 2 ? "h2" : ("h3" as const);

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
            <Runs runs={item} />
          </li>
        ))}
      </Tag>
    );
  }

  if (block.kind === "table") {
    return (
      <div className="mt-8 -mx-1 overflow-x-auto px-1">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-ink">
              {block.head.map((cell, i) => (
                <th
                  key={i}
                  scope="col"
                  className="type-hl-inbox-title px-3 py-3 align-bottom text-ink first:pl-0 last:pr-0"
                >
                  <Runs runs={cell} />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {block.rows.map((row, i) => (
              <tr key={i} className="border-b border-[#E3E3E3] last:border-b-0">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="type-hl-card-body px-3 py-3.5 align-top first:pl-0 last:pr-0"
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
    <p className="type-hl-lead mt-6 first:mt-0">
      <Runs runs={block.runs} />
    </p>
  );
}
