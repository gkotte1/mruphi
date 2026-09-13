import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleBody from "@/components/announcements/ArticleBody";
import { Icon } from "@/components/icons";
import { InnerPage } from "@/components/inner-page/Shell";
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
    <InnerPage>
      <JsonLd data={articleSchema(article)} />

      <Navbar />

      <main>
        <article className="bg-white">
          <div className="mx-auto w-full max-w-[860px] px-10 py-16 max-1200:px-8 max-600:px-4 max-600:py-12">
            <Link
              href="/announcements/"
              className="group inline-flex items-center gap-2 text-[13px] font-bold text-[#606060] transition-colors duration-200 hover:text-[#007EFF]"
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
                  className="ip-mono rounded-full border border-[#E3E3E3] bg-[#F5F5F5] px-2.5 py-[5px] text-[10px] leading-none font-bold tracking-[0.07em] text-[#007EFF] uppercase transition-colors duration-200 hover:border-[#007EFF]"
                >
                  {article.category}
                </Link>

                <time
                  dateTime={article.published}
                  className="text-[12px] font-semibold text-[#878787]"
                >
                  {article.listingDate}
                </time>
              </div>

              <h1 className="type-hl-display mt-6 text-ink max-1024:text-[32px] max-600:text-[28px]">
                {article.title}
              </h1>
            </div>

            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[10px] border border-[#E3E3E3] bg-[#F5F5F5] max-600:mt-8">
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

            {next ? (
              <nav
                aria-label="More announcements"
                className="mt-16 flex justify-center border-t border-[#E3E3E3] pt-10 max-600:mt-12"
              >
                <Link href={announcementHref(next)} className="ip-btn-ghost group">
                  Next Announcement
                  <Icon
                    name="arrow"
                    width={16}
                    height={16}
                    className="ml-2 transition-transform duration-200 group-hover:translate-x-[3px]"
                  />
                </Link>
              </nav>
            ) : null}
          </div>
        </article>
      </main>

      <Footer />
    </InnerPage>
  );
}
