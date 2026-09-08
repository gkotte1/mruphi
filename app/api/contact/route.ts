import { NextResponse } from "next/server";

/**
 * The contact form's destination: the OpsWyse Forms API.
 *
 * The route is unchanged from the caller's point of view - components/contact/
 * ContactPage.tsx still posts the same five flat JSON fields to /api/contact/
 * and still reads the same ok/error shape back - so the page's validation,
 * spinner, success panel and error banner all behave exactly as they did.
 *
 * Forwarding server-side rather than posting to OpsWyse from the browser keeps
 * the form id out of the page source and leaves one place to add a honeypot or
 * rate limit later. No environment variable is needed: neither endpoint below
 * is authenticated, so the form works on a fresh checkout.
 *
 * Where submissions land is configured on the form in OpsWyse, not here. This
 * route can only deliver them to that one form.
 */
const FORM_UID = "ae427af4-72ce-4a11-b4a6-5749c0801b6e";

/** Documented by its own OPTIONS response as taking `{ fields: { <id>: value } }`. */
const SUBMIT_ENDPOINT = `https://api.opswyse.com/api/forms/${FORM_UID}/submit/`;

/** The form's public definition, which is what `fields` has to be keyed by. */
const DEFINITION_ENDPOINT = `https://api.opswyse.com/api/forms/${FORM_UID}/public/`;

/**
 * The five inputs on the page, each with the label it carries on the OpsWyse
 * form and the field id that label resolved to when this was written.
 *
 * The API keys `fields` by field id, and an id changes if that field is deleted
 * and re-added in the OpsWyse builder. Because the submit endpoint accepts any
 * key it is given and answers 201 either way, a stale id would be dropped in
 * silence rather than reported - so the ids are resolved from the live
 * definition by label on each submission (cached below), and these are only the
 * fallback for when that lookup cannot be made.
 *
 * Labels are matched leniently, on `labelKey` below, so renaming "Work Email*"
 * to "Work Email" still resolves. A rename past that needs the `label` here
 * updated to match the OpsWyse form.
 */
const FIELDS = [
  {
    name: "first_name",
    label: "First Name*",
    fallbackId: "fld_mtslr0pc_y411v",
  },
  { name: "last_name", label: "Last Name", fallbackId: "fld_mtslrmop_m3r7u" },
  { name: "email", label: "Work Email*", fallbackId: "fld_mtslsogs_t1p3i" },
  {
    name: "organization",
    label: "Organization",
    fallbackId: "fld_mtslszbj_znmlm",
  },
  {
    name: "message",
    label: "How can we help you?*",
    fallbackId: "fld_mtslteor_6klc1",
  },
] as const;

/** Input name to OpsWyse field id. */
type IdMap = Record<string, string>;

const FALLBACK_IDS: IdMap = Object.fromEntries(
  FIELDS.map((field) => [field.name, field.fallbackId]),
);

/* Labels are compared case-insensitively, on collapsed whitespace, and without
   the trailing asterisk the form uses to mark a field required - so the usual
   cosmetic edits to a label do not cost us the id behind it. */
function labelKey(label: string): string {
  return label
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s*\*+$/, "")
    .trim();
}

/**
 * The resolved map, held for the life of the server instance.
 *
 * A success is held for ten minutes, so a field rebuilt in OpsWyse is picked up
 * without a redeploy. A failure is cached too, for one minute, so an outage at
 * the definition endpoint costs one slow submission a minute rather than adding
 * the timeout to every submission for as long as it lasts; `map: null` is that
 * negative entry, and means "fall back for now".
 */
const SUCCESS_TTL_MS = 10 * 60 * 1000;
const FAILURE_TTL_MS = 60 * 1000;
const DEFINITION_TIMEOUT_MS = 4000;

let cache: { map: IdMap | null; expires: number } | null = null;
let inFlight: Promise<IdMap | null> | null = null;

/**
 * Reads the live definition and maps each input on the page to the id of the
 * field carrying its label.
 *
 * Returns null - meaning "use the fallback" - unless all five resolve. A
 * partial answer means the form no longer matches what this route expects, and
 * a mix of fresh and stale ids is a worse failure than the fallback, which at
 * least fails as a set and so is visible in the OpsWyse dashboard.
 */
async function readIdMap(): Promise<IdMap | null> {
  let elements: unknown;
  try {
    const response = await fetch(DEFINITION_ENDPOINT, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(DEFINITION_TIMEOUT_MS),
    });
    if (!response.ok) return null;

    const body = (await response.json()) as {
      data?: { config?: { elements?: unknown } };
    };
    elements = body?.data?.config?.elements;
  } catch {
    return null;
  }

  if (!Array.isArray(elements)) return null;

  const idByLabel = new Map<string, string>();
  for (const element of elements) {
    if (!element || typeof element !== "object") continue;
    const { id, label, kind } = element as Record<string, unknown>;
    if (kind !== "field") continue;
    if (typeof id !== "string" || typeof label !== "string") continue;
    /* First of a duplicated label wins, matching the order the form renders. */
    const key = labelKey(label);
    if (!idByLabel.has(key)) idByLabel.set(key, id);
  }

  const map: IdMap = {};
  for (const field of FIELDS) {
    const id = idByLabel.get(labelKey(field.label));
    if (!id) return null;
    map[field.name] = id;
  }
  return map;
}

/** The cached map, refreshed when stale; the fallback if it cannot be read. */
async function resolveIdMap(): Promise<IdMap> {
  const now = Date.now();
  if (cache && cache.expires > now) return cache.map ?? FALLBACK_IDS;

  /* One refresh at a time: concurrent submissions share the request rather than
     each opening their own. */
  inFlight ??= readIdMap().finally(() => {
    inFlight = null;
  });

  const map = await inFlight;
  cache = {
    map,
    expires: Date.now() + (map ? SUCCESS_TTL_MS : FAILURE_TTL_MS),
  };
  return map ?? FALLBACK_IDS;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.first_name || !body.email || !body.message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const ids = await resolveIdMap();

  const fields: Record<string, string> = {};
  for (const field of FIELDS) {
    const value = body[field.name];
    fields[ids[field.name] ?? field.fallbackId] =
      typeof value === "string" ? value : "";
  }

  /* The rest of the documented payload is optional analytics. Only the two the
     request already carries are filled in - the page that submitted it and the
     browser that sent it - so nothing new is collected from the visitor. The
     others (utm, screen, language, time_on_form_ms, consent_given) would each
     need the page to start gathering something it does not gather today. */
  const payload: Record<string, unknown> = { fields };

  const pageUrl = request.headers.get("referer");
  if (pageUrl) payload.page_url = pageUrl;

  const userAgent = request.headers.get("user-agent");
  if (userAgent) payload.user_agent = userAgent;

  let response: Response;
  try {
    response = await fetch(SUBMIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }

  /* The API answers 201 with `{"success": true, ...}` on acceptance. It reports
     a rejection in that body as well as in the status, so both are checked. */
  if (!response.ok) {
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }

  const result: unknown = await response.json().catch(() => null);
  if (
    result &&
    typeof result === "object" &&
    "success" in result &&
    !result.success
  ) {
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
