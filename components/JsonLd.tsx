/**
 * Renders a schema.org graph as JSON-LD.
 *
 * It draws nothing: a <script type="application/ld+json"> has no layout box and
 * no visible content, so adding one to a page cannot move or restyle anything
 * on it. React needs `dangerouslySetInnerHTML` here because JSON-LD must reach
 * the document unescaped — the value is built in lib/schema.ts from the site's
 * own registers, never from user input.
 */
export function JsonLd({ data }: { data: object | null }) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      /* `<` is escaped so a stray sequence can never close the script early. */
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
