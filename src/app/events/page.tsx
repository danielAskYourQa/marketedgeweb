import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EventLeadForm from "../components/EventLeadForm";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  ScanSearch,
  PackageSearch,
  Zap,
  Check,
} from "lucide-react";

/* ---------------------------------------------------------------------------
 * Conference landing page — /event
 * Fill in the real event details here; everything below renders from this.
 * ------------------------------------------------------------------------- */
const EVENT = {
  name: "GPeC E-Commerce Summit", // ← event name
  dates: "November 4–5, 2026", // ← event dates
  venue: "Bucharest, Romania", // ← city / venue
  booth: "Booth 12", // ← stand / booth number
  bookingUrl: "/contact", // ← calendar link for demo slots (Calendly etc.)
};

export const metadata: Metadata = {
  title: `Meet Market Edge at ${EVENT.name}`,
  description: `Market Edge is live at ${EVENT.name}, ${EVENT.dates} — stop by ${EVENT.booth} to see the platform on real market data and claim a free market scan of your own catalog, delivered right after the event.`,
  alternates: { canonical: "/events" },
  /* direct-link only: keep the event page out of search results */
  robots: { index: false, follow: true },
  openGraph: {
    title: `Meet Market Edge at ${EVENT.name}`,
    description: `Live market intelligence demos at ${EVENT.booth}: see your competitors' prices, stock and assortment gaps on real data.`,
    url: "/events",
    images: [{ url: "/og-market-edge.png", width: 1200, height: 630 }],
  },
};

const DEMOS = [
  {
    icon: ScanSearch,
    title: "The platform, live",
    desc: "A real market on screen: 30,000+ products across 4 competitors — prices, stock, gaps and trends, exactly as our clients see them every morning.",
    img: "/shot-overview.png",
    alt: "Market Edge assortment overview on live market data",
  },
  {
    icon: PackageSearch,
    title: "Your gaps, on screen",
    desc: "Products and brands your competitors sell that you don't — ranked by how much revenue they're worth and how easy they are to win.",
    img: "/shot-brand-gaps.png",
    alt: "Market Edge brand gaps ranked by opportunity",
  },
  {
    icon: Zap,
    title: "Ranked actions, not raw data",
    desc: "The Opportunity Engine turns every gap into a next step: brands to add, categories to enter, momentum to ride.",
    img: "/shot-opportunity.png",
    alt: "Market Edge opportunity engine with ranked actions",
  },
];

const PROOF = [
  { big: "+€27.4k", small: "monthly margin recovered for an FMCG distributor" },
  { big: "~€200k", small: "yearly revenue from one saved order" },
  { big: "25–30h", small: "executive hours saved per month on MAP checks" },
];

export default function EventPage() {
  return (
    <>
      {/* ---------- hero ---------- */}
      <section id="scan" className="relative isolate overflow-hidden bg-[#0b0b26] text-white">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(79,70,229,0.28),transparent_70%)]"
        />
        <div className="mx-auto max-w-7xl px-4 pt-20 md:pt-28 pb-16 text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/15 px-4 py-1.5 text-xs md:text-sm font-semibold text-indigo-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Live at {EVENT.name}
          </p>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl md:text-6xl font-extrabold leading-tight [text-wrap:balance]">
            See your market like{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              you&apos;ve never seen it
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-slate-300">
            Watch the platform work on a real market at our stand — then tell
            us your website and competitors, and we&apos;ll build the same view
            for your business and send it right after the event.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-300">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-indigo-300" aria-hidden />
              {EVENT.dates}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-indigo-300" aria-hidden />
              {EVENT.venue} · {EVENT.booth}
            </span>
          </div>

          <EventLeadForm />

          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link
              href={EVENT.bookingUrl}
              className="font-semibold text-indigo-300 hover:text-white transition"
            >
              Book a demo slot →
            </Link>
            <a
              href="#demos"
              className="font-semibold text-slate-400 hover:text-white transition"
            >
              What we&apos;ll show you ↓
            </a>
          </div>

          {/* proof band */}
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 sm:grid-cols-3 gap-6">
            {PROOF.map((s) => (
              <div key={s.big}>
                <p className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-fuchsia-400 to-indigo-300 bg-clip-text text-transparent">
                  {s.big}
                </p>
                <p className="mt-1 text-xs md:text-sm text-slate-400">{s.small}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- what we'll show you ---------- */}
      <section id="demos" className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs md:text-sm uppercase tracking-widest text-indigo-600 font-semibold mb-3">
              At our stand
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold [text-wrap:balance]">
              Three demos. Fifteen minutes. Your data.
            </h2>
            <p className="mt-4 text-neutral-600 text-lg">
              No slides, no brochure-ware — the live platform, on real market
              data, pointed at your business.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {DEMOS.map((d, i) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.title}
                  className="flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                      Demo {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-extrabold">{d.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{d.desc}</p>
                  <div className="mt-5">
                    <Image
                      src={d.img}
                      alt={d.alt}
                      width={2265}
                      height={1330}
                      sizes="(max-width: 1024px) 92vw, 400px"
                      className="w-full h-auto rounded-xl shadow-md ring-1 ring-black/10"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- the offer ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs md:text-sm uppercase tracking-widest text-indigo-600 font-semibold mb-3">
              Conference offer
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold [text-wrap:balance]">
              Free market scan for every visitor
            </h2>
            <p className="mt-4 text-neutral-600">
              Leave us your website and your top competitors at the stand.
              We&apos;ll configure the crawlers, run your first full market
              scan, and send you the report in the days right after the event.
              You keep it either way.
            </p>
            <ul className="mt-6 space-y-2.5">
              {[
                "We set up crawlers for your competitors — no work on your side",
                "Price position report: where you're cheaper, where you're not",
                "Assortment gaps: products & brands competitors sell that you don't",
                "No credit card, no commitment — the report is yours",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-neutral-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                  <span className="text-sm">{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#scan"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl px-6 py-3 bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
            >
              Reserve your scan
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
          <div className="min-w-0">
            <Image
              src="/shot-benchmark.png"
              alt="Market Edge benchmarking: your catalog versus every tracked competitor"
              width={2265}
              height={1325}
              sizes="(max-width: 1024px) 92vw, 620px"
              className="w-full h-auto rounded-2xl shadow-xl ring-1 ring-black/10"
            />
          </div>
        </div>
      </section>

      {/* ---------- closing CTA ---------- */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-[#0b0b26] text-white p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(70%_100%_at_80%_0%,rgba(217,70,239,0.25),transparent_60%),radial-gradient(70%_100%_at_10%_100%,rgba(79,70,229,0.3),transparent_60%)]"
          />
          <div className="relative">
            <h2 className="text-2xl md:text-4xl font-extrabold [text-wrap:balance]">
              Can&apos;t make it to {EVENT.booth}?
            </h2>
            <p className="text-slate-300 mt-2 max-w-xl">
              Book a remote demo and we&apos;ll walk you through the platform
              over a call — and set up the same free market scan for your
              business afterwards.
            </p>
          </div>
          <div className="relative flex gap-3 shrink-0">
            <Link
              href={EVENT.bookingUrl}
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
            >
              Book a remote demo
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/#pricing"
              className="rounded-2xl px-5 py-3 border border-white/30 text-white font-semibold hover:bg-white/10 transition"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
