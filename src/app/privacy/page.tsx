// src/app/privacy/page.tsx
export const metadata = {
  title: "Privacy Policy — Market Edge",
  description:
    "How Market Edge collects, uses, and protects your data. GDPR-ready privacy policy.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-3xl px-4 py-16 prose prose-neutral">
        <h1>Privacy Policy</h1>
        <p>
          <strong>Effective date:</strong> September 3, 2025
        </p>

        <p>
          This Privacy Policy explains how <strong>Market Edge</strong>, a
          product of <strong>Ask Your QA SRL</strong> (“we”, “us”, “our”),
          collects and processes personal data when you use our website and
          services.
        </p>

        <h2>Who we are</h2>
        <p>
          Ask Your QA SRL, Cluj-Napoca, Romania. Email:{" "}
          <a href="mailto:office@marketedgemonitoring.com">office@marketedgemonitoring.com</a> •
          Phone: +40 729 014 617
          {/* Optionally add company ID: CUI / Reg. No. */}
        </p>

        <h2>What data we collect</h2>
        <ul>
          <li>
            <strong>Contact data:</strong> name, email, phone, company, message
            (e.g., when using our contact form or messaging via
            WhatsApp/Telegram).
          </li>
          <li>
            <strong>Account & billing data:</strong> name, email, company, plan,
            invoices and payment status (when subscriptions are enabled).
          </li>
          <li>
            <strong>Usage & technical data:</strong> pages viewed, device,
            browser, IP, timestamps, referral/UTM (used for analytics and
            security).
          </li>
          <li>
            <strong>Calendar data:</strong> meeting details you book via
            Calendly (subject to Calendly’s policy).
          </li>
        </ul>

        <h2>How we use your data</h2>
        <ul>
          <li>To provide and improve Market Edge and customer support.</li>
          <li>
            To communicate about demos, onboarding, product updates, and
            billing.
          </li>
          <li>
            To analyze usage and improve reliability, performance, and security.
          </li>
          <li>
            To meet legal obligations (tax, accounting, fraud prevention).
          </li>
        </ul>

        <h2>Legal bases (GDPR)</h2>
        <ul>
          <li>
            <strong>Contract:</strong> providing the service you asked for.
          </li>
          <li>
            <strong>Legitimate interests:</strong> product improvement,
            security, analytics.
          </li>
          <li>
            <strong>Consent:</strong> optional marketing or cookies where
            required.
          </li>
          <li>
            <strong>Legal obligation:</strong> accounting, tax, KYC/AML where
            applicable.
          </li>
        </ul>

        <h2>Sharing & processors</h2>
        <p>
          We use trusted vendors as processors (e.g., hosting, analytics, email,
          calendar scheduling, authentication). They process data solely on our
          instructions and under a DPA. We don’t sell personal data.
        </p>

        <h2>International transfers</h2>
        <p>
          If data leaves the EEA/UK, we rely on appropriate safeguards (e.g.,
          Standard Contractual Clauses).
        </p>

        <h2>Retention</h2>
        <p>
          We keep data only as long as needed for the purposes above, then
          delete or anonymize it. Invoice records may be kept as required by
          law.
        </p>

        <h2>Security</h2>
        <p>
          We apply administrative, technical, and organizational measures to
          protect data (access controls, encryption in transit, least-privilege,
          monitoring). No method is 100% secure.
        </p>

        <h2>Your rights</h2>
        <ul>
          <li>
            Access, rectification, erasure, restriction, portability, and
            objection (GDPR).
          </li>
          <li>
            Withdraw consent at any time (where processing is based on consent).
          </li>
          <li>Lodge a complaint with your local data protection authority.</li>
        </ul>
        <p>
          To exercise rights, contact:{" "}
          <a href="mailto:office@marketedgemonitoring.com">office@marketedgemonitoring.com</a>.
        </p>

        <h2>Cookies & analytics</h2>
        <p>
          We may use necessary cookies for functionality and optional
          cookies/analytics to improve the product and measure performance.
          Where required, we’ll request consent via a banner.
        </p>

        <h2>Third-party services</h2>
        <ul>
          <li>
            <strong>Calendly</strong> for booking meetings.
          </li>
          <li>
            <strong>WhatsApp/Telegram</strong> for direct messaging.
          </li>
          <li>
            <strong>Authentication/Payments</strong> if enabled (e.g., Auth
            provider, Stripe).
          </li>
        </ul>
        <p>
          These services have their own privacy policies. We share only what’s
          necessary to operate the service.
        </p>

        <h2>Children</h2>
        <p>
          Our services are not directed to children. We do not knowingly collect
          data from children.
        </p>

        <h2>Changes</h2>
        <p>
          We may update this policy from time to time. We’ll post updates here
          and revise the “Effective date”.
        </p>

        <h2>Contact</h2>
        <p>
          Email <a href="mailto:office@marketedgemonitoring.com">office@marketedgemonitoring.com</a>{" "}
          for any privacy questions.
        </p>
      </section>
    </main>
  );
}
