# Route Inventory — murphi.ai

Discovered from `sitemap_index.xml` (Rank Math) plus every link in the built
homepage, then HTTP status-checked and structurally analysed.

**Total: ~242 URLs** — 36 static pages, 194 blog posts, 12 category archives.
The page sitemap lists only 27 pages; **9 live pages are missing from it**
(`/health-systems-hospitals/`, `/mental-behavioral-health/`, `/white-labeling/`,
`/blogs/`, `/faqs/`, `/security/`, `/support-ticket/`, `/announcements/`,
`/murphi-xpress-video/`).

## The structural finding that drives everything

Every inner page is **shared chrome + 2–8 unique sections**, and the chrome is
already built:

| Element | Status |
|---|---|
| `mh-nav` header + mega-menus + drawer | ✅ built |
| `murphi-footer` | ✅ built |
| `murphiAiConnectOverlay` demo modal | ✅ built |
| Closing CTA | ⚠️ inner pages use a **different** implementation (`murphi-cta-root` / `mcta-*`) than the homepage's `.cta-section` — needs a second variant |

And the pages collapse into **four templates**:

| Template | Pages | Shared section skeleton |
|---|---:|---|
| **Segment** | 10 | eyebrow h2 → hero → "AI Automation for X Workflows" (`feature-card` ×4–6) → "Measurable Impact" (`kpi-card` ×4) → "Connects to Your EHR" → CTA |
| **Module** | 4 | hero (`hero-status-fact`) → "in Four Steps" (`step-card` ×4) → capability grid (`feature-card`) → "What X Experience" (`kpi-card`) → EHR strip → cross-sell → CTA |
| **Embed/PaaS SEO** | 5 | orphaned variants of Segment, aimed at platform buyers |
| **Article / listing** | 207 | theme post-loop + WP article body |

Building the Segment template once covers 10 pages; the Module template covers 4.
That is 14 of the 22 pages worth building.

---

## Tier 1 — Core conversion paths

Every one is reachable from the homepage nav *and* a homepage CTA button.

| URL | Purpose | Main sections | Recreate? |
|---|---|---|---|
| `/post-acute-care/` | Home health / hospice / palliative segment | Home Health, Hospice & Palliative Care · AI Automation Across Every Post-Acute Workflow · Real Results for Post-Acute Agencies · Works with Your Existing EHR · CTA | **Yes** |
| `/health-systems-hospitals/` | Health system & hospital segment | Health Systems & Hospitals · AI Automation for Health System Revenue & Clinical Workflows · Measurable Impact · Connects to Your Health System EHR · CTA | **Yes** |
| `/primary-specialty-care/` | Primary & specialty practice segment | Primary & Specialty Care · AI Automation for Primary & Specialty Workflows · Measurable Impact · CTA | **Yes** |
| `/mental-behavioral-health/` | Behavioral health segment | Mental & Behavioral Health · AI Automation for Behavioral Health Workflows · Measurable Impact · Connects to Your EHR · CTA | **Yes** |
| `/ehr-emr-companies/` | EHR platform partner pitch (PaaS) | EHR / EMR Companies · What Makes Murphi.ai Different for EHR Platforms · EHR Platforms Already Live · What EHR Companies Get · CTA | **Yes** |
| `/contact-us/` | Demo request — **destination of every "Request Demo"** | Let's build the future of healthcare AI together · Global Headquarters · Send Us a Message (form) · CTA | **Yes** |

## Tier 2 — Product / solution pages

The four SaaS modules plus the two PaaS pages. All linked from the Solutions
mega-menu and homepage module cards.

| URL | Purpose | Main sections | Recreate? |
|---|---|---|---|
| `/ambient-ai/` | Module 01 — voice-to-note | From Voice to EHR in Four Steps · Every Note Type. Every Care Setting. · What Clinicians Experience · Can Connect with Most EHRs · Complete Your Clinical Workflow · CTA | **Yes** |
| `/revenue-assurance/` | Module 02 — coding/OASIS audit | 15 AI Compliance Reports for Home Health · 13 for Hospice · AI Accuracy + Human Review · Complete Your Revenue Workflow · CTA | **Yes** |
| `/ai-patient-financials/` | Module 03 — text-to-pay | Integrate with any EHR, get paid in 4 steps · No more $2/invoice · What Providers Experience · Works Across Every Care Setting · Complete Your Clinical Workflow · CTA | **Yes** |
| `/contract-analyzer/` | Module 04 — payer contracts | A Systematic Approach to Payer Contract Optimization · Built for Managed Care & RCM · Complete Your Revenue Optimization Stack · CTA | **Yes** |
| `/integration/` | EHR integration layer | Five Ways to Connect · Can Connect with most EHRs · Everyware Payment Gateway · Enterprise-Grade Security · CTA | **Yes** (bespoke) |
| `/white-labeling/` | White-label platform | Your Platform. Your Brand. · Three Ways to Embed Murphi.ai · Who Is Already White-Labeling · Explore the Full Platform · CTA | **Yes** (bespoke) |

## Tier 3 — Secondary segments & trust

| URL | Purpose | Main sections | Recreate? |
|---|---|---|---|
| `/rcm-companies/` | RCM company partner | RCM Companies · AI Revenue Cycle Automation · What RCM Companies Deliver · CTA | **Yes** (template) |
| `/coding-billing/` | Coding/billing consultants | Coding & Billing Consultants · Work the Way You Want · AI Tools for Consultants · CTA | **Yes** (template) |
| `/qapi-compliance/` | QAPI & compliance firms | QAPI & Compliance Firms · Work the Way You Want · AI Compliance & QAPI Tools · CTA | **Yes** (template) |
| `/accreditation-audit/` | CHAP/ACHC accreditation bodies | Accreditation & Audit Bodies · Built for Every Accreditation Use Case · AI Tools for Accreditation · CTA | **Yes** (template) |
| `/public-health-and-corrections/` | Correctional healthcare segment | Public Health & Corrections · AI Automation for Correctional Workflows · Measurable Impact · Connects to Your EHR · CTA | **Yes** (template) |
| `/security/` | Security & compliance posture | Three Pillars of Compliance · We Never Assume Trust · Layered Protection · 24/7 Surveillance · Industry-Leading Controls · Responsible AI · Third-Party Sub-Processors · CTA — 18 × `sec-card` | **Yes** (bespoke, high trust value) |
| `/about-us/` | Company story | About Murphi.ai · values (`val-card` ×3) · differentiators (`diff-card` ×6) · team (`team-card` ×3) · CTA | **Yes** (bespoke) |

## Tier 4 — Utility & legal

| URL | Purpose | Main sections | Recreate? |
|---|---|---|---|
| `/faqs/` | FAQ accordion | Frequently Asked Questions (Elementor accordion) · Still have questions? · CTA | **Yes** — note: theme widget, not hand-authored CSS |
| `/support-ticket/` | Support intake form | Support Ticket · Customer Operations · form · CTA | **Yes** |
| `/download-app/` | iOS/Android/Web app links | Murphi.ai on Every Device · All Modules. One App. · CTA | **Yes** |
| `/download-old-app/` | Legacy app download | minimal | **Low priority** |
| `/privacy-policy/` | Legal | long-form prose | **Yes** — trivial, prose only |
| `/terms-of-service/` | Legal | long-form prose | **Yes** — trivial |
| `/ai-terms/` | AI-specific terms | long-form prose | **Yes** — trivial |
| `/murphi-xpress-video/` | Video page (footer social icon) | video embed | **Defer** |

## Tier 5 — Content system (207 URLs)

| URL | Purpose | Main sections | Recreate? |
|---|---|---|---|
| `/blogs/` | Blog index, paginated | post grid (theme loop), category chips, pagination | **Yes, but as a system** |
| `/announcements/` | News/press index, paginated | post grid, categories `news-announcements`, `in-the-news` | **Yes, same system** |
| `/category/<12 slugs>/` | Category archives | filtered post grid | **Yes** — one dynamic route |
| 194 blog posts | Long-form SEO articles | breadcrumb · title · TOC · body · author · related · share | **Defer** — needs a CMS decision first |

These are the only pages **not** hand-authored — they're Elementor/theme post-loop
widgets, so the "lift the source CSS" advantage does not apply and they need
genuine computed-style reverse-engineering. They also raise a content-source
question (static MDX vs. WordPress REST API vs. a headless CMS) that should be
answered before any of it is built.

## Tier 6 — Orphaned SEO landing pages

Self-canonical, unique content, but unreachable from nav or footer. Variants of
the Segment template aimed at platform buyers.

| URL | Recreate? |
|---|---|
| `/ehr-ai-integration-platform/` | **Defer** |
| `/primary-and-speciality-care-embed-into-ehr/` | **Defer** |
| `/embed-ai-into-ehr-workflows-mental-and-behavioural-health/` | **Defer** |
| `/public-health-and-corrections-embed-ai-into-ehr-workflows/` | **Defer** |
| `/ai-for-managed-care-functions-health-system-and-hospitals/` | **Defer** |
| `/white-label-partner-program/` | **Defer** |

They carry SEO value on the live site but nothing links to them internally, so
they add no navigational completeness to the clone. Build only if the clone is
meant to replace production for search.

---

## Defects found on the live site

1. **`/primary-speciality-care/` returns 404.** The homepage's "Explore Primary
   Care Solution →" CTA points at this misspelling ("speciality"); the nav and
   footer correctly use `/primary-specialty-care/`. The clone reproduces the
   broken link verbatim in `src/content/murphi-ai-2e2619f3/segments.ts`.
   **Recommend fixing in the clone** — flag for a decision.
2. `/white-labeling/` and 8 other live pages are absent from the sitemap.

## Recommended build order

**0. Prerequisites** — the `mcta-*` CTA variant used by every inner page, plus a
shared `PageLayout`. Decide on the `/primary-speciality-care/` 404. *(~half a day)*

**1. Segment template + Tier 1 segments** (5 pages). Biggest leverage in the
project: build the template once, fill five content objects. Every homepage
segment CTA stops 404-ing.

**2. `/contact-us/`** — every "Request Demo" button on every page lands here, so
it closes the primary conversion loop.

**3. Module template + 4 module pages** — unblocks the homepage module cards and
the Solutions mega-menu.

**4. Remaining 5 segment pages** (rcm, coding-billing, qapi, accreditation,
public-health) — pure content work once the template exists.

**5. `/integration/` + `/white-labeling/`** — bespoke, but both are linked from
homepage CTAs.

**6. `/security/` + `/about-us/`** — bespoke; `/security/` carries real
buyer-trust weight in healthcare.

**7. Utility + legal** (`/faqs/`, `/support-ticket/`, `/download-app/`, 3 legal
pages) — low effort, completes the footer.

**8. Content system** — only after the MDX-vs-CMS decision.

**9. Orphan SEO pages** — optional.

After step 7, every link in the header and footer resolves and the site is
navigationally complete. Steps 1–7 are ~22 pages but only ~8 distinct layouts.

## Deferred public pages — complete

The eight routes held back through phases 7–11 are now built; see
`DEFERRED_PAGES.md` for how each one was recreated and what still differs.

| Route | Δ height (clone − live) @1440/900/600 |
|---|---|
| `/download-old-app/` | 0 / 0 / 0 |
| `/murphi-xpress-video/` | 0 / 0 / 0 |
| `/white-label-partner-program/` | +1 / +1 / +11 |
| `/ehr-ai-integration-platform/` | 0 / 0 / 0 |
| `/ai-for-managed-care-functions-health-system-and-hospitals/` | 0 / 0 / 0 |
| `/primary-and-speciality-care-embed-into-ehr/` | −70 / −70 / −70 |
| `/embed-ai-into-ehr-workflows-mental-and-behavioural-health/` | +2 / +2 / +2 |
| `/public-health-and-corrections-embed-ai-into-ehr-workflows/` | −70 / −70 / −70 |

Section-by-section these all match exactly; the two −70s are the live site's own
footer, which those pages' unscoped `*` reset inflates by 72px.

This completes the public site. External application URLs
(`murphi.murphiconnect.ai`, `web.murphi.ai`) remain outbound links and are not
recreated.
