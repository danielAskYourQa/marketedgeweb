"use client";
import React, { useMemo, useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Image from "next/image";

// Market Edge polished landing page (single file)
// Drop into /app/market-edge/page.tsx (App Router) or /pages/market-edge.tsx (Pages Router)
// Enhancements: SEO tags, OG/Twitter cards, subtle animations, lifted calculator state, basic price estimate,
// improved accessibility, JSON-LD FAQ, cleaner copy, and small UI refinements.

export default function MarketEdgePage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  // --- Calculator State & Simple Pricing Estimate ---
  const [products, setProducts] = useState(1000);
  const [competitors, setCompetitors] = useState(6);
  const [marketplaces, setMarketplaces] = useState(2);

  const estimate = useMemo(
    () => estimatePrice({ products, competitors, marketplaces, billing }),
    [products, competitors, marketplaces, billing]
  );

  const pricing = useMemo(
    () => ({
      monthly: [
        {
          tier: "business",
          price: "Free",
          period: "/ month",
          features: ["up to 100 products", "3 competitors", "0 marketplaces"],
          cta: "Get Started Now",
          highlight: false,
        },
        {
          tier: "BASIC",
          price: "$150",
          period: "/ month",
          features: ["up to 1000 products", "6 competitors", "2 marketplaces"],
          cta: "Get Started Now",
          highlight: true,
        },
        {
          tier: "start-up",
          price: "$250",
          period: "/ month",
          features: ["up to 2000 products", "10 competitors", "4 marketplaces"],
          cta: "Get Started Now",
          highlight: false,
        },
        {
          tier: "enterprise",
          price: "CUSTOM",
          period: "",
          features: [
            "Unlimited PRODUCTS",
            "Unlimited competitors",
            "Unlimited marketplaces",
          ],
          cta: "Contact Us",
          highlight: false,
        },
      ],
      annual: [
        {
          tier: "business",
          price: "Free",
          period: "/ year",
          features: ["up to 100 products", "3 competitors", "0 marketplaces"],
          cta: "Get Started Now",
          highlight: false,
        },
        {
          tier: "individual",
          price: "$1600",
          period: "/ year",
          features: ["up to 1000 products", "6 competitors", "2 marketplaces"],
          cta: "Get Started Now",
          highlight: false,
        },
        {
          tier: "start-up",
          price: "$2800",
          period: "/ year",
          features: ["up to 2000 products", "10 competitors", "4 marketplaces"],
          cta: "Get Started Now",
          highlight: true,
        },
        {
          tier: "enterprise",
          price: "CUSTOM",
          period: "",
          features: [
            "Unlimited PRODUCTS",
            "Unlimited competitors",
            "Unlimited marketplaces",
          ],
          cta: "Contact Us",
          highlight: false,
        },
      ],
    }),
    []
  );

  const faqs = [
    {
      q: "What is Market Edge?",
      a: "Market Edge is a B2B platform that helps you monitor your product prices across competitor websites and marketplaces in near real time.",
    },
    {
      q: "Who is Market Edge for?",
      a: "Distributors, manufacturers, retailers, and importers who need a clear view of pricing and stock across the market.",
    },
    {
      q: "How does Market Edge collect data?",
      a: "Advanced web crawlers plus AI-based matching algorithms track the products you select and deliver clean data on price and availability.",
    },
    {
      q: "Can I try it before I commit?",
      a: "Yes — we offer a free trial so you can evaluate value and fit for your workflows.",
    },
    {
      q: "Do you support marketplaces like eMAG or Amazon?",
      a: "Yes, we support major marketplaces (eMAG, Amazon, eBay and more) and add new ones based on demand.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* SEO & Social */}
      <Head>
        <title>Market Edge — Competitor Price Monitoring</title>
        <meta
          name="description"
          content="Monitor competitor prices and stock across websites and marketplaces. Market Edge gives you real-time visibility to protect margin and win deals."
        />
        <link rel="canonical" href="https://askyourqa.com/marketedge" />
        <meta name="robots" content="index,follow" />

        {/* Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0a0a0a" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Market Edge — Competitor Price Monitoring"
        />
        <meta
          property="og:description"
          content="Monitor competitor prices and stock across websites and marketplaces in near real time."
        />
        <meta property="og:url" content="https://askyourqa.com/marketedge" />
        <meta property="og:image" content="/og-market-edge.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Market Edge — Competitor Price Monitoring"
        />
        <meta
          name="twitter:description"
          content="See competitor prices at a glance. React fast. Protect margin."
        />
        <meta name="twitter:image" content="/og-market-edge.png" />

        {/* JSON-LD FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </Head>

      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:text-neutral-900 focus:px-3 focus:py-2 focus:rounded-md"
      >
        Skip to content
      </a>

      {/* NAV */}
      <header
        className="sticky top-0 z-50 backdrop-blur border-b border-white/10 bg-neutral-950/70"
        role="banner"
      >
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-40.png" // or "/market-edge-logo.png"
              alt="Market Edge logo"
              width={36}
              height={36}
              className="rounded-2xl drop-shadow"
              priority
            />
            <span className="text-lg font-semibold tracking-tight">
              Market Edge
            </span>
          </div>

          <nav
            className="hidden md:flex items-center gap-6 text-sm text-neutral-300"
            aria-label="Primary"
          >
            <a href="#usecases" className="hover:text-white">
              Use‑cases
            </a>
            <a href="#pricing" className="hover:text-white">
              Pricing
            </a>
            <a href="#faqs" className="hover:text-white">
              FAQs
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </nav>
          <a
            href="#contact"
            className="rounded-2xl px-4 py-2 text-sm font-medium bg-gradient-to-tr from-fuchsia-500 to-indigo-500 hover:opacity-90"
          >
            Get in touch
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden" id="content">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(168,85,247,0.25),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 py-20 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm uppercase tracking-widest text-fuchsia-400/80 mb-3">
              B2B price tracking
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Track competitor prices across resellers, retailers &
              marketplaces.
            </h1>
            <p className="mt-4 text-neutral-300 max-w-xl">
              Stay competitive with real‑time price and stock monitoring for
              your products across the sites that matter to you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="rounded-2xl px-5 py-3 bg-white text-neutral-900 font-medium hover:bg-neutral-100"
                href="#pricing"
              >
                View pricing
              </a>
              <a
                className="rounded-2xl px-5 py-3 bg-gradient-to-tr from-fuchsia-500 to-indigo-500 font-medium hover:opacity-90"
                href="#contact"
              >
                Start free trial
              </a>
              <a
                className="rounded-2xl px-5 py-3 border border-white/20 font-medium hover:bg-white/5"
                href="#calculator"
              >
                Calculate plan
              </a>
            </div>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="aspect-[16/10] w-full rounded-2xl border border-white/10 bg-neutral-900/40 backdrop-blur flex items-center justify-center">
              <Image
                src="/market-edge-logo.webp" // or "/market-edge-logo.png"
                alt="Market Edge shield logo"
                width={320}
                height={320}
                priority
                className="drop-shadow-[0_0_12px_rgba(168,85,247,0.45)]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT / USE-CASES */}
      <section id="usecases" className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Your partner for price monitoring online
            </h2>
            <p className="text-neutral-300">
              Market Edge helps you monitor your products across competitor
              websites and marketplaces and shows how your pricing compares so
              you can react quickly and protect margin.
            </p>
            <div className="flex gap-3">
              <a
                className="rounded-2xl px-5 py-3 bg-gradient-to-tr from-fuchsia-500 to-indigo-500 font-medium hover:opacity-90"
                href="#contact"
              >
                Contact us
              </a>
              <a
                className="rounded-2xl px-5 py-3 border border-white/20 font-medium hover:bg-white/5"
                href="#faqs"
              >
                Learn more
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: "You're a distributor",
                  desc: "Track how competitors price the same products you distribute — stay competitive and win more deals.",
                },
                {
                  title: "You're a manufacturer",
                  desc: "Monitor distributor pricing across regions and marketplaces to protect your brand and MAP.",
                },
                {
                  title: "You're an importer",
                  desc: "Find which distributors/resellers offer the best prices for the same SKUs to optimize sourcing.",
                },
                {
                  title: "You're an online retailer",
                  desc: "Know if your prices are higher or lower than competitors so you don’t lose customers or margin.",
                },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl border border-white/10 bg-neutral-900/60 p-5"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <h3 className="font-semibold mb-1">{b.title}</h3>
                  <p className="text-sm text-neutral-300">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Kick‑start with an affordable tracking system
          </h2>
          <div className="flex items-center gap-2 text-sm">
            <span
              className={
                billing === "monthly" ? "font-semibold" : "text-neutral-400"
              }
            >
              Billed monthly
            </span>
            <button
              aria-label="Toggle billing"
              onClick={() =>
                setBilling(billing === "monthly" ? "annual" : "monthly")
              }
              className="relative inline-flex h-8 w-16 items-center rounded-full border border-white/15 bg-neutral-800 px-1"
            >
              <span
                className={`inline-block h-6 w-6 rounded-full bg-gradient-to-tr from-fuchsia-500 to-indigo-500 transition-transform ${
                  billing === "annual" ? "translate-x-8" : "translate-x-0"
                }`}
              />
            </button>
            <span
              className={
                billing === "annual" ? "font-semibold" : "text-neutral-400"
              }
            >
              Billed annually
            </span>
          </div>
        </div>
        <p className="text-neutral-300 mb-10">
          Choose monthly or annual. Cancel anytime.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricing[billing].map((p, i) => (
            <motion.div
              key={i}
              className={`rounded-2xl border ${
                p.highlight ? "border-fuchsia-400/50" : "border-white/10"
              } bg-neutral-900/50 p-6 flex flex-col`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className="flex items-start justify-between">
                <h3 className="uppercase tracking-wide text-sm text-neutral-300">
                  {p.tier}
                </h3>
                {p.highlight && (
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10">
                    Most Popular
                  </span>
                )}
              </div>
              <div className="mt-4">
                <div className="text-4xl font-extrabold">{p.price}</div>
                <div className="text-neutral-400">{p.period}</div>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-neutral-300">
                {p.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-6 rounded-xl bg-white text-neutral-900 text-center py-2 font-medium hover:bg-neutral-100"
              >
                {p.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-sm text-neutral-400">
          Important: for subscriptions bigger than 10,000 products we offer
          large discounts.
        </p>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Or calculate your own subscription
        </h2>
        <p className="text-neutral-300 mb-6">
          Simple estimator — adjust inputs to preview your total.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-neutral-900/50 p-6 space-y-4">
            <NumberField
              label="Products"
              value={products}
              step={100}
              onChange={setProducts}
            />
            <NumberField
              label="Competitors"
              value={competitors}
              step={1}
              onChange={setCompetitors}
            />
            <NumberField
              label="Marketplaces"
              value={marketplaces}
              step={1}
              onChange={setMarketplaces}
            />
          </div>
          <div className="rounded-2xl border border-white/10 bg-neutral-900/50 p-6">
            <Summary
              billing={billing}
              estimate={estimate}
              products={products}
              competitors={competitors}
              marketplaces={marketplaces}
            />
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section id="faqs" className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Questions & answers
        </h2>
        <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-neutral-900/50">
          {faqs.map((f, i) => (
            <Accordion key={i} title={f.q}>
              <p className="text-neutral-300">{f.a}</p>
            </Accordion>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-2xl border border-white/10 bg-neutral-900/50 p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Ready to see your competitors' prices?
            </h2>
            <p className="text-neutral-300 mt-2">
              Get a live demo or start a free trial — no credit card required.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              className="rounded-2xl px-5 py-3 bg-white text-neutral-900 font-medium hover:bg-neutral-100"
              href="/contact"
            >
              Book a demo
            </a>
            <a
              className="rounded-2xl px-5 py-3 bg-gradient-to-tr from-fuchsia-500 to-indigo-500 font-medium hover:opacity-90"
              href="/signup"
            >
              Start free trial
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10" role="contentinfo">
        <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-2xl bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-indigo-500" />
              <span className="font-semibold">Market Edge</span>
            </div>
            <p className="text-neutral-400">
              QA automation & price monitoring for modern teams.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Pages</h4>
            <ul className="space-y-1 text-neutral-300">
              <li>
                <a href="#" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#usecases" className="hover:text-white">
                  Use‑cases
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-white">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Services</h4>
            <ul className="space-y-1 text-neutral-300">
              <li>Automation ecosystem</li>
              <li>Web app automation</li>
              <li>Mobile app automation</li>
              <li>Security testing</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            <ul className="space-y-1 text-neutral-300">
              <li>Cluj‑Napoca, Romania</li>
              <li>+40 729 014 617</li>
              <li>office@askyourqa.com</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-10 text-xs text-neutral-500">
          © {new Date().getFullYear()} AskYourQA
        </div>
      </footer>
    </main>
  );
}

// --- Components ---
function Accordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <details open={open} onClick={() => setOpen(!open)} className="group">
      <summary className="cursor-pointer list-none select-none px-6 py-4 flex items-center justify-between">
        <span className="font-medium">{title}</span>
        <span className="ml-4 h-6 w-6 grid place-items-center rounded-full border border-white/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`h-4 w-4 transition-transform ${
              open ? "rotate-45" : "rotate-0"
            }`}
          >
            <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
          </svg>
        </span>
      </summary>
      <div className="px-6 pb-6 text-sm leading-6">{children}</div>
    </details>
  );
}

function NumberField({
  label,
  value,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="block text-sm text-neutral-300 mb-1">{label}</label>
      <div className="flex rounded-xl border border-white/10 overflow-hidden">
        <button
          type="button"
          className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700"
          onClick={() => onChange(Math.max(0, value - step))}
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <input
          type="number"
          className="w-full bg-neutral-900/50 px-3 py-2 text-right"
          value={value}
          onChange={(e) => onChange(Number(e.target.value || 0))}
          aria-label={`${label} input`}
        />
        <button
          type="button"
          className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700"
          onClick={() => onChange(value + step)}
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

function Summary({
  billing,
  estimate,
  products,
  competitors,
  marketplaces,
}: {
  billing: "monthly" | "annual";
  estimate: number;
  products: number;
  competitors: number;
  marketplaces: number;
}) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Summary</h3>
      <ul className="space-y-2 text-neutral-300">
        <li className="flex justify-between">
          <span>Products</span> <span>{products}</span>
        </li>
        <li className="flex justify-between">
          <span>Competitors</span> <span>{competitors}</span>
        </li>
        <li className="flex justify-between">
          <span>Marketplaces</span> <span>{marketplaces}</span>
        </li>
        <li className="flex justify-between">
          <span>Billing</span> <span className="uppercase">{billing}</span>
        </li>
      </ul>
      <div className="mt-6 p-4 rounded-xl bg-neutral-800/60 text-neutral-200">
        <div className="text-sm">Estimated total</div>
        <div className="text-3xl font-extrabold">
          ${estimate.toLocaleString()} {billing === "monthly" ? "/ mo" : "/ yr"}
        </div>
      </div>
      <p className="mt-3 text-xs text-neutral-400">
        This is an indicative estimate. For 10k+ products we offer large
        discounts.
      </p>
    </div>
  );
}

// --- Simple pricing function (placeholder) ---
function estimatePrice({
  products,
  competitors,
  marketplaces,
  billing,
}: {
  products: number;
  competitors: number;
  marketplaces: number;
  billing: "monthly" | "annual";
}): number {
  // Base: $150/mo covers up to 1000 products, 6 competitors, 2 marketplaces
  // Add-ons: +$50 per additional 1000 products, +$20 per competitor above 6, +$30 per marketplace above 2
  const baseMonthly = 150;
  const extraProducts = Math.max(0, Math.ceil((products - 1000) / 1000)) * 50;
  const extraCompetitors = Math.max(0, competitors - 6) * 20;
  const extraMarketplaces = Math.max(0, marketplaces - 2) * 30;
  let monthly =
    baseMonthly + extraProducts + extraCompetitors + extraMarketplaces;

  // Floor for tiny plans
  if (products <= 100 && competitors <= 3 && marketplaces === 0) monthly = 0; // Free tier example

  if (billing === "annual") {
    // 2 months free
    return monthly * 10;
  }
  return monthly;
}
