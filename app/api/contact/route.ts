import { NextResponse } from "next/server";

/**
 * The contact form's destination, reproduced from the behaviour recorded in
 * website-research/company/contact-us.md: a flat JSON payload of the five field
 * names, forwarded server-side to Web3Forms. The access key is read from the
 * environment and never reaches the browser.
 */
const FIELDS = ["first_name", "last_name", "email", "organization", "message"] as const;

export async function POST(request: Request) {
  const key = process.env.WEB3FORMS_ACCESS_KEY;

  if (!key) {
    return NextResponse.json(
      { error: "WEB3FORMS_ACCESS_KEY is not configured" },
      { status: 500 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.first_name || !body.email || !body.message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const payload: Record<string, unknown> = { access_key: key };
  for (const field of FIELDS) payload[field] = body[field] ?? "";

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
