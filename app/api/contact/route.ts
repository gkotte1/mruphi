import { NextResponse } from "next/server";

/**
 * The contact form's destination.
 *
 * The five field names the form posts are forwarded to Formspree. The route
 * itself is unchanged from the caller's point of view - components/contact/
 * ContactPage.tsx still posts JSON to /api/contact/ and still reads the same
 * ok/error shape back - so the page's validation, spinner, success panel and
 * error banner all behave exactly as they did.
 *
 * Forwarding server-side rather than posting to Formspree from the browser
 * keeps the endpoint out of the page source and leaves one place to add a
 * honeypot or rate limit later. The endpoint is not a credential - a Formspree
 * form id is public by design - so nothing secret is involved either way, and
 * no environment variable is needed: the form works on a fresh checkout.
 *
 * Where submissions land is set on the form in the Formspree dashboard, not
 * here. This route can only deliver them to Formspree.
 */
const ENDPOINT = "https://formspree.io/f/xvkoqbzn";

const FIELDS = ["first_name", "last_name", "email", "organization", "message"] as const;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.first_name || !body.email || !body.message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const payload: Record<string, unknown> = {};
  for (const field of FIELDS) payload[field] = body[field] ?? "";

  /* Formspree control keys, not form fields: they set the Reply-To header and
     the subject line on the notification email. `_replyto` is the documented
     way to be explicit about it rather than relying on Formspree inferring the
     reply address from the field named `email`. */
  payload._replyto = body.email;
  payload._subject = `Murphi.ai contact - ${body.first_name}${
    body.organization ? ` (${body.organization})` : ""
  }`;

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
