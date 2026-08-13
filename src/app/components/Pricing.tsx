// src/app/components/Pricing.tsx
"use client";
import { useState } from "react";
import { BillingToggle } from "./ui/BillingToggle";
import { Check, ArrowRight } from "lucide-react";

const ANNUAL_DISCOUNT = 0.2; // 20% off on annual

type Plan = {
  key: string;
  name: string;
  tagline: string;
  monthlyEUR: number;
  caps: { products: string; competitors: string };
  features: string[];
  highlight?: boolean;
  dark?: boolean;
};

/* Flat, market-anchored plans (Prisync ~$199/1k, ~$399/5k self-serve;
   10k+ is usually demo-gated — a flat price there undercuts the market). */
const PLANS: Plan[] = [
  {
    key: "starter",
    name: "Starter",
    tagline: "Your first full market view",
    monthlyEUR: 179,
    caps: { products: "1,000", competitors: "5" },
    features: [
      "Up to 1,000 products",
      "Up to 5 competitors",
      "Daily price & stock refresh",
      "Alerts & dashboards",
      "Major marketplaces + any website",
      "Email support",
    ],
  },
  {
    key: "professional",
    name: "Professional",
    tagline: "Full market intelligence for growing teams",
    monthlyEUR: 499,
    caps: { products: "10,000", competitors: "10" },
    highlight: true,
    features: [
      "Up to 10,000 products",
      "Up to 10 competitors",
      "Near real-time refresh",
      "Price history & market trends",
      "Competitor stock & assortment tracking",
      "CSV / Excel exports",
      "Priority chat support",
    ],
  },
  {
    key: "business",
    name: "Business",
    tagline: "For large catalogs and serious coverage",
    monthlyEUR: 999,
    caps: { products: "20,000", competitors: "20" },
    dark: true,
    features: [
      "Up to 20,000 products",
      "Up to 20 competitors",
      "Everything in Professional",
      "API access & integrations",
      "MAP monitoring workflows",
      "Dedicated onboarding & product matching",
    ],
  },
];

function formatEUR(amount: number) {
  return `€${Math.round(amount).toLocaleString("en-US")}`;
}

function PriceBlock({
  monthly,
  billing,
  dark,
}: {
  monthly: number;
  billing: "monthly" | "annual";
  dark?: boolean;
}) {
  const effective = billing === "annual" ? monthly * (1 - ANNUAL_DISCOUNT) : monthly;
  return (
    <div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-4xl font-extrabold">{formatEUR(effective)}</span>
        <span className={dark ? "text-slate-400" : "text-neutral-500"}>/ month</span>
      </div>
      <p className={`mt-1 text-xs h-4 ${dark ? "text-slate-400" : "text-neutral-500"}`}>
        {billing === "annual"
          ? `billed annually — ${formatEUR(effective * 12)}/year (20% off)`
          : "billed monthly"}
      </p>
    </div>
  );
}

export function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-xs md:text-sm uppercase tracking-widest text-indigo-600 font-semibold mb-2">
            Pricing
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold">
            Pricing that scales with your market coverage
          </h2>
        </div>
        <BillingToggle value={billing} onChange={setBilling} />
      </div>

      <p className="text-neutral-700 mb-10">
        Every plan includes the full platform: price &amp; stock tracking,
        alerts, trends and AI product matching. Prices in EUR, excl. VAT.
        Cancel anytime.
      </p>

      <div className="grid md:grid-cols-3 gap-6 items-start">
        {PLANS.map((plan) => {
          const cardBase = plan.dark
            ? "rounded-3xl bg-[#0b0b26] text-white p-7 flex flex-col shadow-lg"
            : plan.highlight
            ? "relative rounded-3xl border-2 border-transparent [background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(to_top_right,#c026d3,#4f46e5)_border-box] p-7 flex flex-col shadow-lg"
            : "rounded-3xl border border-neutral-200 bg-white p-7 flex flex-col shadow-sm hover:shadow-md transition";
          return (
            <div key={plan.key} className={cardBase}>
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-tr from-fuchsia-600 to-indigo-600 px-3 py-1 text-xs font-bold text-white shadow">
                  Most popular
                </span>
              )}
              <h3
                className={`uppercase tracking-wide text-sm font-semibold ${
                  plan.dark ? "text-slate-300" : "text-neutral-600"
                }`}
              >
                {plan.name}
              </h3>
              <p className={`mt-1 text-sm ${plan.dark ? "text-slate-400" : "text-neutral-500"}`}>
                {plan.tagline}
              </p>
              <div className="mt-5">
                <PriceBlock monthly={plan.monthlyEUR} billing={billing} dark={plan.dark} />
              </div>

              {/* caps at a glance */}
              <div
                className={`mt-5 grid grid-cols-2 gap-3 rounded-2xl p-4 ${
                  plan.dark ? "bg-white/5" : "bg-slate-50"
                }`}
              >
                <div>
                  <p className={`text-[10px] uppercase tracking-wide font-semibold ${plan.dark ? "text-slate-400" : "text-neutral-400"}`}>
                    Products
                  </p>
                  <p className="text-lg font-extrabold">{plan.caps.products}</p>
                </div>
                <div>
                  <p className={`text-[10px] uppercase tracking-wide font-semibold ${plan.dark ? "text-slate-400" : "text-neutral-400"}`}>
                    Competitors
                  </p>
                  <p className="text-lg font-extrabold">{plan.caps.competitors}</p>
                </div>
              </div>

              <ul className="mt-6 space-y-2.5 text-sm">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-start gap-2.5 ${
                      plan.dark ? "text-slate-200" : "text-neutral-700"
                    }`}
                  >
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        plan.dark ? "text-emerald-400" : "text-emerald-600"
                      }`}
                      aria-hidden
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/contact"
                className={
                  plan.dark
                    ? "mt-8 rounded-2xl bg-white text-[#0b0b26] text-center py-2.5 font-semibold hover:bg-slate-100 transition"
                    : plan.highlight
                    ? "mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white text-center py-2.5 font-semibold hover:opacity-90 transition"
                    : "mt-8 rounded-2xl border border-neutral-300 text-center py-2.5 font-semibold hover:bg-neutral-50 transition"
                }
              >
                {plan.highlight ? (
                  <>
                    Start free trial
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </>
                ) : (
                  "Start free trial"
                )}
              </a>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-sm text-neutral-500 text-center">
        Need more than 20,000 products, custom integrations or an SLA?{" "}
        <a href="/contact" className="font-semibold text-indigo-600 hover:underline">
          Talk to sales
        </a>{" "}
        about a custom plan.
      </p>
    </section>
  );
}
