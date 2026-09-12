import fs from 'fs';
import path from 'path';

/**
 * Builds the set of paths this Next.js app actually serves, so an absolute
 * murphi.ai link in a post body can be rewritten to an internal one only when
 * the destination really exists here.
 */

const APP = 'c:/Users/krush/OneDrive/Desktop/m/murphi-clone/src/app';
const CONTENT = 'c:/Users/krush/OneDrive/Desktop/m/murphi-clone/src/content/murphi-ai-2e2619f3';

export function buildRouteSet() {
  const routes = new Set(['/']);

  // Static top-level segments that have a page.tsx.
  for (const d of fs.readdirSync(APP, { withFileTypes: true })) {
    if (!d.isDirectory() || d.name === 'api' || d.name.startsWith('[')) continue;
    if (fs.existsSync(path.join(APP, d.name, 'page.tsx'))) routes.add('/' + d.name + '/');
  }

  const postIndex = fs.readFileSync(path.join(CONTENT, 'post-bodies.ts'), 'utf8');
  const slugs = [...postIndex.matchAll(/"([^"]+)": \(\) => import/g)].map((m) => m[1]);
  for (const s of slugs) routes.add('/' + s + '/');

  // Category slugs only — read from the BLOG_CATEGORIES block, since posts use
  // the same `slug:` key further down the file.
  const content = fs.readFileSync(path.join(CONTENT, 'blog-content.ts'), 'utf8');
  const catBlock = content.slice(
    content.indexOf('BLOG_CATEGORIES'),
    content.indexOf('BLOG_POSTS'),
  );
  const cats = [...catBlock.matchAll(/slug: "([a-z0-9-]+)"/g)].map((m) => m[1]);
  for (const c of cats) {
    routes.add('/category/' + c + '/');
    for (let n = 2; n <= 60; n++) routes.add('/category/' + c + '/page/' + n + '/');
  }
  for (let n = 2; n <= 60; n++) routes.add('/blogs/page/' + n + '/');

  return { routes, slugs, cats };
}

/**
 * Returns the internal path for an absolute murphi.ai URL, or null to leave it
 * alone. Query strings and fragments are preserved; the path is not altered.
 */
export function toInternal(href, routes) {
  let u;
  try {
    u = new URL(href);
  } catch {
    return null;
  }
  if (u.hostname !== 'murphi.ai' && u.hostname !== 'www.murphi.ai') return null;

  // Normalise to a trailing slash for lookup only — the emitted path keeps
  // whatever the route set says exists.
  const withSlash = u.pathname.endsWith('/') ? u.pathname : u.pathname + '/';
  if (!routes.has(withSlash)) return null;
  return withSlash + u.search + u.hash;
}
