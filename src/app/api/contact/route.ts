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
  recaptcha?: string;
};

// ✅ function to verify captcha with Google
async function verifyCaptcha(token: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${secret}&response=${token}`,
  });
  return res.json();
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // must be false for port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as FormState;

    // ✅ Honeypot check
    if (body.botfield && body.botfield.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    // ✅ Captcha check
    if (!body.recaptcha) {
      return NextResponse.json({ error: "Captcha missing" }, { status: 400 });
    }
    const captcha = await verifyCaptcha(body.recaptcha);
    if (!captcha.success) {
      return NextResponse.json({ error: "Captcha failed" }, { status: 400 });
    }

    // ✅ Basic validation
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
