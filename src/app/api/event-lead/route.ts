import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type LeadBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  website?: string;
  botfield?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function esc(s: string) {
  return s.replace(/</g, "&lt;");
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

  const firstName = (body.firstName || "").trim();
  const lastName = (body.lastName || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const website = (body.website || "").trim();

  if (!firstName || !lastName || !phone || !website) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid work email." },
      { status: 400 }
    );
  }
  if (phone.replace(/\D/g, "").length < 6) {
    return NextResponse.json(
      { error: "Please enter a valid phone number." },
      { status: 400 }
    );
  }
  if (!/\S+\.\S+/.test(website)) {
    return NextResponse.json(
      { error: "Please enter a valid website." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  // Not configured (e.g. local dev) — log instead of sending.
  if (!apiKey) {
    console.log("[event-lead] RESEND_API_KEY not set; lead received:", {
      firstName,
      lastName,
      email,
      phone,
      website,
    });
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL!,
    to: process.env.CONTACT_TO_EMAIL!,
    replyTo: email,
    subject: `[Market Edge] Event lead — free market scan — ${firstName} ${lastName}`,
    html: `
      <h2>New lead from the event landing page</h2>
      <p><strong>Name:</strong> ${esc(firstName)} ${esc(lastName)}</p>
      <p><strong>Email:</strong> ${esc(email)}</p>
      <p><strong>Phone:</strong> ${esc(phone)}</p>
      <p><strong>Website:</strong> ${esc(website)}</p>
      <p>They claimed the free market scan offer. Follow up to collect their competitor list and schedule the crawl.</p>
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
