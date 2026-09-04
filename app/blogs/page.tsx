import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GetStartedCta from "@/components/GetStartedCta";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { POSTS, blogHref, type BlogPost } from "@/lib/blog";
import { pageMetadata } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * /blogs/ — the listing.
 *
 * The listing lives at /blogs/ and each post at /blog/<slug>/, which is the
 * pairing the footer and the post front matter already use. /blog/ redirects
 * here rather than dead-ending.
 *
 * The hero is the one the Announcements page already uses: a thin #007EFF
 * outline around a white panel, a chip, an h1 and a lead. The cards are the
 * announcement cards' structure with the two fields a blog post adds — the
 * content pillar and an excerpt.
 */

export const metadata: Metadata = pageMetadata("/blogs/", {
  title: "Blog — Home Health & Hospice AI",
  description:
    "Practical guides for home health and hospice teams on ambient AI documentation, OASIS and PDGM review, patient engagement, payments and EHR integration.",
});

const SHELL = "mx-auto w-full max-w-[1280px] px-10 max-1200:px-8 max-600:px-4";

export default function BlogPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("/blogs/", "Blog")} />

      <Navbar />

      <main className="pt-[80px]">
        <section className="bg-white">
          <div className={cn(SHELL, "pt-16 pb-14 max-600:pt-10 max-600:pb-10")}>
            <div className="mx-auto max-w-[1000px] rounded-[32px] border border-brand bg-white px-14 py-16 text-center shadow-[0_30px_80px_-50px_rgba(0,126,255,0.45)] max-1024:px-10 max-600:rounded-[24px] max-600:px-6 max-600:py-10">
              <p className="type-label inline-flex items-center gap-2 rounded-full border border-brand-ghost bg-brand-tint px-3.5 py-1.5 text-brand-dark">
                <Icon name="doc" width={13} height={13} />
                Blog
              </p>

              <h1 className="mt-7 type-h1 text-ink">
                Home Health &amp; Hospice AI, explained.
              </h1>

              <p className="type-lead mx-auto mt-6 max-w-[620px] text-grey-dk">
                Practical guides on clinical documentation, revenue assurance,
                patient engagement and EHR integration — written for the teams
                who do the work.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white pb-28 max-1024:pb-20 max-600:pb-16">
          <div className={SHELL}>
            {POSTS.length > 0 ? (
              <ul className="grid grid-cols-3 gap-6 max-1024:grid-cols-2 max-768:grid-cols-1 max-600:gap-5">
                {POSTS.map((post) => (
                  <li key={post.slug} className="flex">
                    <Card post={post} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="type-lead text-center text-grey-dk">
                New posts are on the way.
              </p>
            )}
          </div>
        </section>

        <GetStartedCta />
      </main>

      <Footer />
    </>
  );
}

/** One post. The whole card is the link; the title carries the accessible name. */
function Card({ post }: { post: BlogPost }) {
  const href = blogHref(post);

  return (
    <article className="group flex w-full flex-col overflow-hidden rounded-panel border border-grey-mid bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-border hover:shadow-[0_26px_60px_-42px_rgba(0,86,173,0.5)]">
      <Link href={href} className="block" tabIndex={-1} aria-hidden>
        {/*
          The image box is the featured image's own 1200:630. It used to be
          16/10, and object-cover then scaled a 1.90:1 image to fill a 1.60:1
          box — cropping roughly a sixth off each side, which on a designed
          graphic means cutting into the artwork. At the matching ratio there
          is nothing to crop and nothing to letterbox: the image fills the card
          width exactly.

          object-contain rather than cover so that a future post whose image is
          not 1200:630 is shown whole on the grey ground instead of being cut.
          The hover zoom is gone for the same reason — a 3% scale pushed the
          edges of the artwork out of frame.
        */}
        <span className="relative block aspect-[1200/630] overflow-hidden border-b border-grey-mid bg-grey-bg">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain"
            /* An SVG needs no raster pipeline — and this one declares only a
               viewBox, so leaving it unoptimised keeps its own geometry. */
            unoptimized
          />
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6 max-600:p-5">
        <p className="type-micro text-brand-dark">{post.category}</p>

        <h2 className="mt-3 text-[16px] leading-snug font-bold tracking-[-0.018em] text-ink">
          <Link
            href={href}
            className="transition-colors duration-200 hover:text-brand-dark"
          >
            {post.title}
          </Link>
        </h2>

        <p className="mt-3 line-clamp-3 text-[13.5px] leading-relaxed text-grey-dk/85">
          {post.excerpt}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-semibold text-grey-dk/55">
          <span>By {post.author}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.datetime}>{post.date}</time>
        </div>

        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-2 pt-6 text-[13px] font-bold text-brand-dark transition-colors duration-200 hover:text-brand-deep"
          tabIndex={-1}
          aria-hidden
        >
          Read More
          <Icon
            name="arrow"
            width={15}
            height={15}
            className="transition-transform duration-200 group-hover:translate-x-[3px]"
          />
        </Link>
      </div>
    </article>
  );
}
