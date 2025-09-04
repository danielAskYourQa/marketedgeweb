// src/app/market-edge/components/PricingSection.tsx
"use client";
import { useMemo, useState } from "react";
import { BillingToggle } from "./ui/BillingToggle";

// 🔗 Put your real Stripe Payment Link URLs here
const STRIPE_PAYMENT_LINKS: Record<
  "monthly" | "annual",
  Record<string, string>
> = {
  monthly: {
    BASIC: "https://buy.stripe.com/cNifZi0FWgc54w8fdN9fW06", // ← replace
    "start-up": "https://buy.stripe.com/cNifZi0FWgc54w8fdN9fW06", // ← replace
  },
  annual: {
    individual: "https://buy.stripe.com/test_individual_annual_XXXX", // ← replace
    "start-up": "https://buy.stripe.com/test_startup_annual_XXXX", // ← replace
  },
};

export function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

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

  // Decide link per card based on tier + billing
  function getCtaHref(tier: string, mode: "monthly" | "annual") {
    const stripe = STRIPE_PAYMENT_LINKS[mode]?.[tier];
    if (stripe) return stripe; // paid plans → Stripe
    // free/enterprise → contact for now (adjust later if you add a free signup URL)
    return tier.toLowerCase() === "enterprise" ? "/contact" : "#contact";
  }

  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Kick-start with an affordable tracking system
        </h2>
        <BillingToggle value={billing} onChange={setBilling} />
      </div>
      <p className="text-neutral-700 mb-10">
        Choose monthly or annual. Cancel anytime.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricing[billing].map((p, i) => {
          const href = getCtaHref(p.tier, billing);
          const isStripe = href.startsWith("https://buy.stripe.com");
          return (
            <div
              key={i}
              className={`rounded-2xl border ${
                p.highlight
                  ? "border-fuchsia-400 ring-1 ring-fuchsia-200"
                  : "border-neutral-200"
              } bg-white p-6 flex flex-col shadow-sm hover:shadow-md transition hover:translate-y-[-2px]`}
            >
              <div className="flex items-start justify-between">
                <h3 className="uppercase tracking-wide text-sm text-neutral-600">
                  {p.tier}
                </h3>
                {p.highlight && (
                  <span className="text-xs px-2 py-1 rounded-full bg-fuchsia-50 text-fuchsia-700">
                    Most Popular
                  </span>
                )}
              </div>

              <div className="mt-4">
                <div className="text-4xl font-extrabold">{p.price}</div>
                <div className="text-neutral-500">{p.period}</div>
              </div>

              <ul className="mt-6 space-y-2 text-sm text-neutral-700">
                {p.features.map((f: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-fuchsia-600" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA: add data-rewardful only for Stripe links */}
              {isStripe ? (
                <a
                  href={href}
                  data-rewardful
                  className="mt-6 rounded-xl bg-neutral-900 text-white text-center py-2 font-medium hover:translate-y-[-1px] transition"
                >
                  {p.cta}
                </a>
              ) : (
                <a
                  href={href}
                  className="mt-6 rounded-xl bg-neutral-900 text-white text-center py-2 font-medium hover:translate-y-[-1px] transition"
                >
                  {p.cta}
                </a>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-neutral-600">
        Important: for subscriptions bigger than 10,000 products we offer large
        discounts.
      </p>
    </section>
  );
}
