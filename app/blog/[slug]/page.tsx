import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GetStartedCta from "@/components/GetStartedCta";
import BlogBody from "@/components/blog/BlogBody";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { POSTS, findPost, postFaqs, readPostBody } from "@/lib/blog";
import { blogArticleSchema, blogFaqSchema, breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";

/**
 * One blog post.
 *
 * Category, title, byline and date open the page; the featured image sits
 * directly beneath them, before the article. The body is the Markdown file,
 * rendered - headings, paragraphs, lists, the comparison table, the FAQ and
 * the closing CTA, in the order the author wrote them.
 *
 * `dynamicParams = false` keeps anything that is not a real post a 404.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return {};

  const path = `/blog/${slug}/`;

  return {
    /* The author's own SEO title and meta description, from the front matter. */
    title: post.seo.seoTitle,
    description: post.seo.metaDescription,
    keywords: [post.seo.primaryKeyword, ...post.seo.supportingKeywords],
    alternates: { canonical: path },
    openGraph: {
      siteName: "Murphi.ai",
      url: absoluteUrl(path),
      title: post.seo.seoTitle,
      description: post.seo.metaDescription,
      type: "article",
      publishedTime: post.datetime,
      images: [post.image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.seoTitle,
      description: post.seo.metaDescription,
      images: [post.image],
    },
  };
}

export default async function BlogArticle({ params }: Props) {
  const { slug } = await params;

  const post = findPost(slug);
  if (!post) notFound();

  const body = readPostBody(slug);
  const faqs = postFaqs(body);

  return (
    <>
      <JsonLd data={blogArticleSchema(post)} />
      <JsonLd data={blogFaqSchema(faqs, `/blog/${slug}/`)} />
      <JsonLd data={breadcrumbSchema(`/blog/${slug}/`, post.title)} />

      <Navbar />

      <main className="pt-[80px]">
        <article className="bg-white">
          <div className="mx-auto w-full max-w-[860px] px-10 py-16 max-1200:px-8 max-600:px-4 max-600:py-12">
            {/* ── Category, title, byline ── */}
            <p className="type-micro text-brand-dark">{post.category}</p>

            <h1 className="mt-5 text-[38px] leading-[1.18] font-extrabold tracking-[-0.03em] text-ink max-1024:text-[32px] max-600:text-[27px]">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] font-semibold text-grey-dk/60">
              <span>By {post.author}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.datetime}>{post.date}</time>
            </div>

            {/* ── Featured image ── */}
            <figure className="mt-9 overflow-hidden rounded-panel border border-grey-mid bg-grey-bg max-600:mt-7">
              <Image
                src={post.image}
                alt={post.imageAlt}
                width={1200}
                height={630}
                priority
                sizes="(max-width: 860px) 100vw, 860px"
                className="h-auto w-full"
                unoptimized
              />
            </figure>

            {/* ── The article ── */}
            <BlogBody blocks={body} />

            <nav
              aria-label="More from the blog"
              className="mt-16 flex justify-center border-t border-grey-mid pt-10 max-600:mt-12"
            >
              <Link
                href="/blogs/"
                className="group btn-secondary max-600:w-full max-600:justify-center"
              >
                All Articles
                <Icon
                  name="arrow"
                  width={16}
                  height={16}
                  className="transition-transform duration-200 group-hover:translate-x-[3px]"
                />
              </Link>
            </nav>
          </div>
        </article>

        <GetStartedCta />
      </main>

      <Footer />
    </>
  );
}
