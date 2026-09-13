import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { POSTS, blogHref, type BlogPost } from "@/lib/blog";
import { pageMetadata } from "@/lib/site";
import { SimpleHero } from "@/components/inner-page/Hero";
import { FinalCta } from "@/components/inner-page/kit";
import { InnerPage, IpWrap } from "@/components/inner-page/Shell";

/**
 * /blogs/ - the listing.
 *
 * The listing lives at /blogs/ and each post at /blog/<slug>/, which is the
 * pairing the footer and the post front matter already use. /blog/ redirects
 * here rather than dead-ending.
 *
 * The hero is the one the Announcements page already uses: a thin #007EFF
 * outline around a white panel, a chip, an h1 and a lead. The cards are the
 * announcement cards' structure with the two fields a blog post adds - the
 * content pillar and an excerpt.
 */

export const metadata: Metadata = pageMetadata("/blogs/", {
  title: "Blog - Home Health & Hospice AI",
  description:
    "Practical guides for home health and hospice teams on ambient AI documentation, OASIS and PDGM review, patient engagement, payments and EHR integration.",
});

export default function BlogPage() {
  return (
    <InnerPage>
      <JsonLd data={breadcrumbSchema("/blogs/", "Blog")} />

      <Navbar />

      <main>
        <SimpleHero
          current="Blog"
          badge="Blog"
          badgeIcon={<Icon name="doc" width={13} height={13} />}
          title="Home Health & Hospice AI, explained."
          lede="Practical guides on clinical documentation, revenue assurance, patient engagement and EHR integration - written for the teams who do the work."
        />

        <section style={{ padding: "64px 0 96px" }}>
          <IpWrap>
            {POSTS.length > 0 ? (
              <ul className="grid grid-cols-3 gap-6 max-1024:grid-cols-2 max-768:grid-cols-1 max-600:gap-5">
                {POSTS.map((post) => (
                  <li key={post.slug} className="flex">
                    <Card post={post} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="ip-lead text-center">New posts are on the way.</p>
            )}
          </IpWrap>
        </section>

        <FinalCta
          heading={
            <>
              Experience AI Automation
              <br />
              at Scale
            </>
          }
          body="Tell us your care setting and we'll show you exactly what Murphi.ai delivers for your organization - a live demo tailored to your workflows and your team."
        />
      </main>

      <Footer />
    </InnerPage>
  );
}

/** One post. The whole card is the link; the title carries the accessible name. */
function Card({ post }: { post: BlogPost }) {
  const href = blogHref(post);

  return (
    <article className="ip-card group flex w-full flex-col overflow-hidden">
      <Link href={href} className="ip-link-card block" tabIndex={-1} aria-hidden>
        <span className="relative block aspect-[1200/630] overflow-hidden border-b border-[#E3E3E3] bg-[#F5F5F5]">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain"
            unoptimized
          />
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6 max-600:p-5">
        <p className="ip-mono text-[11px] font-semibold tracking-[0.06em] uppercase text-[#007EFF]">
          {post.category}
        </p>

        <h2 className="type-hl-card-title mt-3 text-ink">
          <Link href={href} className="transition-colors duration-200 hover:text-[#007EFF]">
            {post.title}
          </Link>
        </h2>

        <p className="type-hl-card-body mt-3 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-semibold text-[#878787]">
          <span>By {post.author}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.datetime}>{post.date}</time>
        </div>

        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-2 pt-6 text-[13px] font-bold text-[#007EFF] transition-colors duration-200 hover:text-[#006AD6]"
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
