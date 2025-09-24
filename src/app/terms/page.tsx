// src/app/terms/page.tsx
export const metadata = {
  title: "Terms of Service — Market Edge",
  description:
    "Terms and conditions for using Market Edge, a product of Ask Your QA SRL.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-3xl px-4 py-16 prose prose-neutral">
        <h1>Terms of Service</h1>
        <p>
          <strong>Effective date:</strong> September 3, 2025
        </p>

        <p>
          These Terms govern your access to and use of{" "}
          <strong>Market Edge</strong> (the “Service”), provided by{" "}
          <strong>Ask Your QA SRL</strong> (“we”, “us”). By accessing or using
          the Service, you agree to these Terms.
        </p>

        <h2>1. Accounts</h2>
        <ul>
          <li>
            You must provide accurate information and keep your account secure.
          </li>
          <li>You are responsible for activity under your account.</li>
          <li>
            We may suspend or terminate accounts for breach or security
            concerns.
          </li>
        </ul>

        <h2>2. Subscriptions & Billing</h2>
        <ul>
          <li>
            Paid plans are billed in advance per the plan’s billing period.
          </li>
          <li>
            Taxes may apply. You authorize us (or our payment processor) to
            charge your payment method.
          </li>
          <li>
            Unless otherwise stated, subscriptions auto-renew until cancelled.
          </li>
        </ul>

        <h2>3. Trials & Cancellations</h2>
        <ul>
          <li>
            Trial access is provided “as is” and may be changed or ended at any
            time.
          </li>
          <li>
            You can cancel at any time; access continues until the end of the
            current period.
          </li>
          <li>Refunds are not guaranteed unless required by law.</li>
        </ul>

        <h2>4. Acceptable Use</h2>
        <ul>
          <li>No unlawful, harmful, or infringing use of the Service.</li>
          <li>
            No scraping of sites in violation of applicable law or third-party
            terms.
          </li>
          <li>
            No attempts to bypass security, rate limits, or access others’ data.
          </li>
          <li>No reselling or white-labeling without our written consent.</li>
        </ul>

        <h2>5. Your Data & Privacy</h2>
        <p>
          Our processing of personal data is described in the{" "}
          <a href="/privacy">Privacy Policy</a>. You retain ownership of your
          data. You grant us a limited license to process it solely to provide
          the Service.
        </p>

        <h2>6. Intellectual Property</h2>
        <ul>
          <li>
            The Service, software, and trademarks are owned by us or our
            licensors.
          </li>
          <li>
            We grant you a limited, non-exclusive, non-transferable license to
            use the Service.
          </li>
          <li>Feedback you provide may be used by us without restriction.</li>
        </ul>

        <h2>7. Third-Party Services</h2>
        <p>
          The Service may integrate with third-party services (e.g., analytics,
          authentication, payment, scheduling, messaging). We are not
          responsible for third-party services or their policies.
        </p>

        <h2>8. Beta Features</h2>
        <p>
          We may offer experimental features labeled as “Beta”. They are
          provided “as is”, may change, and may not be supported in production.
        </p>

        <h2>9. Availability & Support</h2>
        <p>
          We strive for high availability but do not guarantee uninterrupted
          Service. Support channels may include email, chat, or ticketing;
          response times may vary by plan.
        </p>

        <h2>10. Disclaimers</h2>
        <p>
          The Service is provided “as is” and “as available”. We disclaim all
          warranties to the fullest extent permitted by law, including fitness
          for a particular purpose and non-infringement.
        </p>

        <h2>11. Limitation of Liability</h2>
        <p>
          To the extent permitted by law, our aggregate liability for all claims
          related to the Service will not exceed the amounts paid by you to us
          in the 12 months preceding the event giving rise to the claim. We are
          not liable for indirect, incidental, or consequential damages.
        </p>

        <h2>12. Indemnity</h2>
        <p>
          You agree to indemnify and hold us harmless from claims arising from
          your use of the Service in breach of these Terms or applicable law.
        </p>

        <h2>13. Termination</h2>
        <p>
          You may stop using the Service at any time. We may suspend or
          terminate access for breach, legal requirements, or security reasons.
          Upon termination, your right to use the Service ends.
        </p>

        <h2>14. Governing Law</h2>
        <p>
          These Terms are governed by the laws of Romania, without regard to
          conflict of laws rules. Courts of Cluj-Napoca shall have exclusive
          jurisdiction, unless mandatory law provides otherwise.
        </p>

        <h2>15. Changes to these Terms</h2>
        <p>
          We may update these Terms. We’ll post changes here and update the
          “Effective date”. Continued use after changes constitutes acceptance.
        </p>

        <h2>Contact</h2>
        <p>
          Ask Your QA SRL • Cluj-Napoca, Romania •{" "}
          <a href="mailto:office@marketedgemonitoring.com">office@marketedgemonitoring.com</a> • +40
          729 014 617
        </p>
      </section>
    </main>
  );
}
