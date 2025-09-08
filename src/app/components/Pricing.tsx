// src/app/components/Pricing.tsx
"use client";
import { useMemo, useState } from "react";
import { BillingToggle } from "./ui/BillingToggle";

const UNIT_PRICE_EUR = 0.10;      // € per URL / month
const MARKETPLACE_WEIGHT = 1.5;   // 1 marketplace counts as 1.5 sites
const ANNUAL_DISCOUNT = 0.20;     // 20% off on annual

// 🔗 Put your real Stripe Payment Link URLs here
const STRIPE_PAYMENT_LINKS: Record<"monthly" | "annual", Record<string, string>> = {
  monthly: {
    BASIC: "https://buy.stripe.com/cNifZi0FWgc54w8fdN9fW06",        // ← replace
    "start-up": "https://buy.stripe.com/cNifZi0FWgc54w8fdN9fW06",   // ← replace
  },
  annual: {
    individual: "https://buy.stripe.com/test_individual_annual_XXXX", // ← replace
    "start-up": "https://buy.stripe.com/test_startup_annual_XXXX",    // ← replace
  },
};

type TierKey = "business" | "BASIC" | "start-up" | "individual" | "enterprise";

// Split union into concrete shapes + type guards (to satisfy TS)
type PaidSpec = { productsCap: number; competitors: number; marketplaces: number };
type FreeSpec = { free: true; productsCap: number; competitors: number; marketplaces: number };
type CustomSpec = { custom: true };
type TierSpec = PaidSpec | FreeSpec | CustomSpec;

function isCustom(spec: TierSpec): spec is CustomSpec {
  return (spec as CustomSpec).custom === true;
}
function isFree(spec: TierSpec): spec is FreeSpec {
  return (spec as FreeSpec).free === true;
}
function isPaid(spec: TierSpec): spec is PaidSpec {
  return !isCustom(spec) && !isFree(spec);
}

const TIER_SPECS: Record<TierKey, TierSpec> = {
  business:   { free: true, productsCap: 100,  competitors: 3,  marketplaces: 0 },
  BASIC:      { productsCap: 1000, competitors: 5,  marketplaces: 0 },
  "start-up": { productsCap: 1000, competitors: 5, marketplaces: 3 },
  // On annual we show "individual" instead of "BASIC" (same caps)
  individual: { productsCap: 1000, competitors: 6,  marketplaces: 2 },
  enterprise: { custom: true },
};

function calcUrls(products: number, competitors: number, marketplaces: number) {
  const weightedSites =
    Math.max(0, competitors) + Math.max(0, marketplaces) * MARKETPLACE_WEIGHT;
  return Math.max(0, Math.round(products * weightedSites));
}

function calcPriceEUR(
  products: number,
  competitors: number,
  marketplaces: number,
  billing: "monthly" | "annual"
) {
  const urls = calcUrls(products, competitors, marketplaces);
  const monthly = urls * UNIT_PRICE_EUR;
  if (billing === "annual") return Math.round(monthly * 12 * (1 - ANNUAL_DISCOUNT));
  return Math.round(monthly);
}

export function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const cards = useMemo(() => {
    const order: TierKey[] =
      billing === "monthly"
        ? ["business", "BASIC", "start-up", "enterprise"]
        : ["business", "individual", "start-up", "enterprise"];

    return order.map((tier) => {
      const spec = TIER_SPECS[tier];

      if (isCustom(spec)) {
        return {
          tier,
          price: "CUSTOM",
          period: "",
          features: [
            "Unlimited PRODUCTS",
            "Unlimited competitors",
            "Unlimited marketplaces",
          ],
          cta: "Contact Us",
          highlight: false,
        };
      }

      if (isFree(spec)) {
        return {
          tier,
          price: "Free",
          period: billing === "monthly" ? "/ month" : "/ year",
          features: [
            `up to ${spec.productsCap} products`,
            `${spec.competitors} competitors`,
            `${spec.marketplaces} marketplaces`,
          ],
          cta: "Get Started Now",
          highlight: false,
        };
      }

      // Paid tiers
      const priceNumber = calcPriceEUR(
        spec.productsCap,
        spec.competitors,
        spec.marketplaces,
        billing
      );

      return {
        tier,
        price: `€${priceNumber.toLocaleString()}`,
        period: billing === "monthly" ? "/ month" : "/ year",
        features: [
          `up to ${spec.productsCap} products`,
          `${spec.competitors} competitors`,
          `${spec.marketplaces} marketplaces`,
        ],
        cta: "Get Started Now",
        highlight:
          (billing === "monthly" && (tier === "BASIC" || tier === "start-up")) ||
          (billing === "annual" && (tier === "individual" || tier === "start-up")),
      };
    });
  }, [billing]);

  function getCtaHref(tier: string, mode: "monthly" | "annual") {
    const stripe = STRIPE_PAYMENT_LINKS[mode]?.[tier];
    if (stripe) return stripe; // paid plans → Stripe
    return tier.toLowerCase() === "enterprise" ? "/contact" : "#contact"; // free/enterprise
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
        {cards.map((p, i) => {
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
