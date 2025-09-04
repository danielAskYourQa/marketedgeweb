// /app/affiliate/page.tsx (Next.js App Router)
import Link from "next/link";

export default function AffiliatePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold">Market Edge Affiliate Program</h1>
      <p className="mt-4">Earn <strong>10% lifetime</strong> on every customer you refer.</p>
      <ul className="mt-6 list-disc pl-6 space-y-2">
        <li>Recurring commission for as long as the customer stays.</li>
        <li>60-day attribution window.</li>
        <li>Monthly payouts, €50 minimum.</li>
      </ul>
      <Link
        href="https://YOUR-SUBDOMAIN.rewardful.com/signup"
        className="mt-8 inline-flex rounded-xl px-5 py-3 font-semibold border"
      >
        Apply now
      </Link>
    </main>
  );
}
