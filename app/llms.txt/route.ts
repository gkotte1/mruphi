import { ANNOUNCEMENTS, announcementHref } from "@/lib/announcements";
import { POSTS, blogHref } from "@/lib/blog";
import { EVENTS, eventHref } from "@/lib/events";
import { SITE_URL, absoluteUrl, routesIn, type SiteRoute } from "@/lib/site";

/**
 * /llms.txt - a plain-text map of the site for AI systems, in the llms.txt
 * convention: a title, a summary, then linked sections.
 *
 * Every statement here is taken from a page this site actually serves, and
 * every link is drawn from the same registers the pages themselves render
 * (lib/site.ts and lib/announcements.ts), so nothing can describe a page that
 * does not exist. No capability, certification or claim is added that the site
 * does not already make.
 *
 * Nothing internal appears: no implementation notes, no environment variables,
 * no credentials, no private or authenticated routes, no development hosts.
 */

/* A plain metadata route: the same content on every request, cached as static. */
export const dynamic = "force-static";

/** One "- [Title](url): description" line, as the convention prints them. */
const line = (route: SiteRoute) =>
  `- [${route.title}](${absoluteUrl(route.path)}): ${route.description}`;

const section = (heading: string, lines: readonly string[]) =>
  `## ${heading}\n\n${lines.join("\n")}`;

function build() {
  const core = routesIn("core")[0];

  return [
    "# Murphi.ai",
    "",
    "> Murphi.ai is an AI-native automation platform purpose-built for U.S. healthcare, with AI modules purpose-built for Home Health and Hospice. Murphi integrates with the EHRs an agency already uses and automates the work around patient care - no EHR replacement required.",
    "",
    `Canonical site: ${SITE_URL}/`,
    "Murphi.ai is owned and operated by Deskfactors Inc., a Delaware C corporation, of 4804 Page Creek Lane, Durham, North Carolina 27703.",
    "",
    "## Overview",
    "",
    "Murphi runs alongside an agency's existing EHR rather than replacing it. Integration happens through five methods: Agentic AI, RPA, FHIR R4, HL7 v2, and Direct API. Work Murphi completes - documentation, review findings, payment status - is written back to the EHR of record.",
    "",
    `- [${core.title}](${absoluteUrl(core.path)}): ${core.description}`,
    "",
    section(
      "AI Modules",
      routesIn("modules").map(line),
    ),
    "",
    section(
      "Who We Serve",
      routesIn("audiences").map(line),
    ),
    "",
    section(
      "Platform and Support",
      routesIn("platform").map(line),
    ),
    "",
    section(
      "Company and Resources",
      routesIn("company").map(line),
    ),
    "",
    section(
      "Blog",
      POSTS.map(
        (post) =>
          `- [${post.title}](${absoluteUrl(blogHref(post))}): ${post.seo.metaDescription}`,
      ),
    ),
    "",
    section(
      "Announcements",
      ANNOUNCEMENTS.map(
        (item) =>
          `- [${item.title}](${absoluteUrl(announcementHref(item))}): ${item.date} · ${item.category}`,
      ),
    ),
    "",
    section(
      "Events",
      EVENTS.map(
        (item) =>
          `- [${item.title}](${absoluteUrl(eventHref(item))}): ${item.date} · ${item.location}`,
      ),
    ),
    "",
    section("Legal", routesIn("legal").map(line)),
    "",
    "## Contact",
    "",
    `- Contact and demo requests: ${absoluteUrl("/contact-us/")}`,
    "- Email: info@murphi.ai",
    "- Mobile apps: iOS and Android, linked from " +
      `${absoluteUrl("/download-app/")}`,
    "",
  ].join("\n");
}

export function GET() {
  return new Response(build(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
