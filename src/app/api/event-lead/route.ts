import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type LeadBody = {
  email?: string;
  botfield?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: LeadBody;

  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field — pretend success, deliver nothing.
  if (body.botfield) {
    return NextResponse.json({ ok: true });
  }

  const email = (body.email || "").trim();

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid work email." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  // Not configured (e.g. local dev) — log instead of sending.
  if (!apiKey) {
    console.log("[event-lead] RESEND_API_KEY not set; lead received:", { email });
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL!,
    to: process.env.CONTACT_TO_EMAIL!,
    replyTo: email,
    subject: `[Market Edge] Event lead — free market scan — ${email}`,
    html: `
      <h2>New lead from the event landing page</h2>
      <p><strong>Email:</strong> ${email.replace(/</g, "&lt;")}</p>
      <p>They claimed the free market scan offer. Follow up to collect their website + competitor list and schedule the crawl.</p>
    `,
  });

  if (error) {
    console.error("[event-lead] Resend error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
