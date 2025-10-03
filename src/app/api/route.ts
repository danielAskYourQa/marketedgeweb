import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type FormState = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  reason?: "demo" | "question" | "support";
  message: string;
  consent: boolean;
  botfield?: string;
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER, // your gmail
    pass: process.env.SMTP_PASS, // app password
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as FormState;

    // Honeypot check
    if (body.botfield && body.botfield.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    // Validation
    const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    if (
      !body.name ||
      !body.email ||
      !body.message ||
      !body.consent ||
      !validEmail(body.email)
    ) {
      return NextResponse.json(
        { error: "Missing or invalid required fields." },
        { status: 400 }
      );
    }

    const subject = `Market Edge — ${body.reason ?? "message"} from ${body.name}${
      body.company ? " @ " + body.company : ""
    }`;

    const text = `New contact form submission:

Name:   ${body.name}
Email:  ${body.email}
Company:${body.company || "-"}
Phone:  ${body.phone || "-"}
Reason: ${body.reason || "-"}
Consent:${body.consent ? "yes" : "no"}

Message:
${body.message}

— meta —
When: ${new Date().toISOString()}
UA:   ${req.headers.get("user-agent") || "n/a"}
`;

    await transporter.sendMail({
      from: process.env.CONTACT_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_TO || process.env.SMTP_USER,
      replyTo: body.email,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
