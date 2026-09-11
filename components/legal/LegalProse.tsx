import type { ReactNode } from "react";
import type { LegalBlock, LegalSpan } from "@/lib/legal";

function Spans({ spans }: { spans: LegalSpan[] | undefined }) {
  if (!spans?.length) return null;

  return spans.map((span, i) => {
    if (span.br) return <br key={i} />;

    let node: ReactNode = span.text ?? "";
    if (span.bold) node = <strong>{node}</strong>;
    if (span.italic) node = <em>{node}</em>;
    if (span.href) {
      node = (
        <a href={span.href} rel="noreferrer">
          {node}
        </a>
      );
    }
    return <span key={i}>{node}</span>;
  });
}

export default function LegalProse({
  blocks,
  className,
  semantic,
}: {
  blocks: LegalBlock[];
  className?: string;
  /** Map WordPress h6/h5 into document h2/h3. Default keeps the source tags. */
  semantic?: boolean;
}) {
  return (
    <div className={className ? `legal-prose ${className}` : "legal-prose"}>
      {blocks.map((block, i) => {
        if (block.t === "hr") return semantic ? null : <hr key={i} />;

        if (block.t === "ul" || block.t === "ol") {
          const Tag = block.t;
          return (
            <Tag key={i}>
              {(block.items ?? []).map((item, j) => (
                <li key={j}>
                  <Spans spans={item} />
                </li>
              ))}
            </Tag>
          );
        }

        if (block.t === "h5") {
          const Tag = semantic ? "h3" : "h5";
          return (
            <Tag key={i}>
              <Spans spans={block.spans} />
            </Tag>
          );
        }

        if (block.t === "h6") {
          const Tag = semantic ? "h2" : "h6";
          return (
            <Tag key={i}>
              <Spans spans={block.spans} />
            </Tag>
          );
        }

        return (
          <p key={i}>
            <Spans spans={block.spans} />
          </p>
        );
      })}
    </div>
  );
}
