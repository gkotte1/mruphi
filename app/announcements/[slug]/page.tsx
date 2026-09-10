import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleBody from "@/components/announcements/ArticleBody";
import { Icon } from "@/components/icons";
import {
  ANNOUNCEMENTS,
  announcementHref,
  findAnnouncement,
  findArticle,
  readArticleBody,
} from "@/lib/announcements";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";

/**
 * One announcement detail page.
 *
 * Identity and body come from the detail-page research in
 * website-research-1/, extracted into content/announcements/. The card fields
 * beside it - listing date, previous/next ordering - come from the listing
 * research, so the card and the page it opens can never disagree.
 *
 * Only the fourteen researched slugs are built; `dynamicParams = false` keeps
 * anything else a normal 404.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return ANNOUNCEMENTS.map((announcement) => ({ slug: announcement.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return {};

  const path = `/announcements/${slug}/`;

  return {
    title: article.pageTitle,
    description: article.description,
    alternates: { canonical: path },
    openGraph: {
      siteName: "Murphi.ai",
      url: absoluteUrl(path),
      title: article.pageTitle,
      description: article.description,
      type: "article",
      publishedTime: article.published,
      images: [article.image],
    },
  };
}

export default async function AnnouncementArticle({ params }: Props) {
  const { slug } = await params;

  const article = findArticle(slug);
  const card = findAnnouncement(slug);
  if (!article || !card) notFound();

  /* Only the forward step is offered at the foot of an article. */
  const { next } = card;
  const body = readArticleBody(slug);

  return (
    <>
      <JsonLd data={articleSchema(article)} />

      <Navbar />

      <main>
        <article className="relative isolate overflow-hidden pt-[80px]">
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background: "#EAF4FF",
            }}
            aria-hidden
          />

          <div className="mx-auto w-full max-w-[860px] px-10 py-16 max-1200:px-8 max-600:px-4 max-600:py-12">
            <Link
              href="/announcements/"
              className="group inline-flex items-center gap-2 text-[13px] font-bold text-grey-dk/70 transition-colors duration-200 hover:text-brand-dark"
            >
              <Icon
                name="arrow"
                width={15}
                height={15}
                className="rotate-180 transition-transform duration-200 group-hover:-translate-x-[3px]"
              />
              Back to Announcements
            </Link>

            <div className="mt-10 max-600:mt-8">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <Link
                  href={article.categoryHref}
                  className="rounded-full border border-brand-border/70 bg-brand-tint px-3 py-[6px] text-[10px] font-bold uppercase leading-none tracking-[0.08em] text-brand-dark transition-colors duration-200 hover:border-brand-border hover:text-brand-deep"
                >
                  {article.category}
                </Link>

                <time
                  dateTime={article.published}
                  className="text-[13px] font-semibold text-grey-dk/60"
                >
                  {article.listingDate}
                </time>
              </div>

              <h1 className="mt-6 type-h2 text-ink">
                {article.title}
              </h1>
            </div>

            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-panel border border-grey-mid bg-grey-bg max-600:mt-8 max-600:rounded-tile">
              <Image
                src={article.image}
                alt={article.alt}
                fill
                sizes="(max-width: 860px) 100vw, 860px"
                className="object-cover"
                priority
              />
            </div>

            <ArticleBody blocks={body} links={article.links} />

            {/* One control, and nothing about the announcement it leads to. */}
            {next ? (
              <nav
                aria-label="More announcements"
                className="mt-16 flex justify-center border-t border-grey-mid pt-10 max-600:mt-12"
              >
                <Link
                  href={announcementHref(next)}
                  className="group btn-secondary max-600:w-full max-600:justify-center"
                >
                  Next Announcement
                  <Icon
                    name="arrow"
                    width={16}
                    height={16}
                    className="transition-transform duration-200 group-hover:translate-x-[3px]"
                  />
                </Link>
              </nav>
            ) : null}
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
