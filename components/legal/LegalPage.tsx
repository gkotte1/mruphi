import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { readLegalDocument, tableOfContents, type Block } from "@/lib/document";
import { cn } from "@/lib/cn";

/**
 * The shell every legal page uses: a centred hero, the version strip, an
 * on-page contents rail built from the document's own section headings, and
 * the document itself in a comfortable reading column.
 *
 * Nothing here writes copy. Every string on the page comes out of content/,
 * which is lifted verbatim from website-research/.
 */
export default function LegalPage({ file }: { file: string }) {
  const { title, subtitle, meta, body } = readLegalDocument(file);
  const contents = tableOfContents(body);

  return (
    <>
      <Navbar />

      <main>
        <section className="relative isolate overflow-hidden pt-[80px]">
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background: "#EAF4FF",
            }}
            aria-hidden
          />

          <div className="mx-auto w-full max-w-[820px] px-10 py-20 text-center max-1200:px-8 max-600:px-4 max-600:py-14">
            <p className="type-label text-brand-dark">Legal</p>

            <h1 className="mt-4 type-h1 text-ink">
              {title}
            </h1>

            {subtitle ? (
              <p className="type-lead mx-auto mt-5 max-w-[560px] text-grey-dk">
                {subtitle}
              </p>
            ) : null}

            {meta.length ? (
              <div className="mx-auto mt-8 flex max-w-[620px] flex-col items-center gap-2 rounded-[16px] border border-grey-mid bg-white px-6 py-5 max-600:px-4">
                {meta.map((line, i) => (
                  <p
                    key={line}
                    className={cn(
                      "text-[12.5px] leading-relaxed",
                      i === 0
                        ? "font-bold text-ink"
                        : "font-medium text-grey-dk/70",
                    )}
                  >
                    {line}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <section className="bg-white pb-28 max-1024:pb-20 max-600:pb-16">
          <div className="mx-auto grid w-full max-w-[1180px] grid-cols-[minmax(0,250px)_minmax(0,1fr)] items-start gap-x-14 px-10 max-1200:px-8 max-1024:grid-cols-1 max-600:px-4">
            <Contents items={contents} />

            <article className="min-w-0 max-w-[760px] border-t border-grey-mid pt-10 max-1024:mx-auto max-600:pt-8">
              {body.map((block, i) => (
                <DocumentBlock key={i} block={block} />
              ))}
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/** The document's own headings, nothing added. */
function Contents({ items }: { items: { id: string; text: string }[] }) {
  if (!items.length) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky top-[96px] max-h-[calc(100vh-140px)] overflow-y-auto border-t border-grey-mid pt-10 max-1024:hidden"
    >
      <p className="type-micro text-grey-dk/45">On this page</p>

      <ul className="mt-4 grid gap-2 pr-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block text-[12.5px] font-medium leading-snug text-grey-dk/70 transition-colors duration-200 hover:text-brand-dark"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** One parsed block, rendered at the weight its level implies. */
function DocumentBlock({ block }: { block: Block }) {
  if (block.kind === "rule") {
    return <hr className="my-9 border-0 border-t border-grey-mid" />;
  }

  if (block.kind === "heading") {
    /* The source documents use ###### for their numbered sections and have no
       intermediate levels, so those become the page's h2. */
    const Tag = block.level === 6 || block.level === 2 ? "h2" : ("h3" as const);

    return (
      <Tag
        id={block.id}
        className={cn(
          "scroll-mt-[96px] font-bold tracking-[-0.02em] text-ink",
          Tag === "h2"
            ? "mt-11 text-[17.5px] leading-snug first:mt-0 max-600:text-[16.5px]"
            : "mt-8 text-[15.5px] leading-snug first:mt-0",
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
          "mt-4 grid gap-2.5 pl-5 text-[14.5px] leading-[1.75] text-grey-dk",
          block.ordered ? "list-decimal" : "list-disc",
        )}
      >
        {block.items.map((item, i) => (
          <li key={i} className="pl-1 marker:text-brand/70">
            {item}
          </li>
        ))}
      </Tag>
    );
  }

  return (
    <p className="mt-4 text-[14.5px] leading-[1.75] text-grey-dk first:mt-0">
      {block.lines.map((line, i) => (
        <span key={i}>
          {i > 0 && !block.lines[i - 1].br ? " " : null}
          {line.text}
          {line.br && i < block.lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </p>
  );
}
