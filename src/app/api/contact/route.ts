import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const form = await req.json();

    // Honeypot → silently accept
    if (form.botfield) {
      return NextResponse.json({ ok: true });
    }

    const from = process.env.CONTACT_FROM_EMAIL!;
    const to = process.env.CONTACT_TO_EMAIL!;

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: form.email,
      subject: `Contact (${form.reason}) — ${form.name}`,
      text: `
Name: ${form.name}
Email: ${form.email}
Company: ${form.company}
Phone: ${form.phone}
Reason: ${form.reason}

${form.message}
      `.trim(),
    });

    if (error) {
      return NextResponse.json({ error: String(error) }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
