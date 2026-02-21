// src/app/components/Pricing.tsx
"use client";
import { useMemo, useState } from "react";
import { BillingToggle } from "./ui/BillingToggle";

const ANNUAL_DISCOUNT = 0.2; // 20% off on annual

type TierKey = "STARTER-LITE" | "STARTER" | "GROWTH" | "PRO" | "ENTERPRISE";

type FixedSpec = {
  productsCap: number;
  competitorsIncluded: number;
  monthlyPriceEUR: number;
  highlight?: boolean;
};

type CustomSpec = { custom: true; highlight?: boolean };
type TierSpec = FixedSpec | CustomSpec;

function isCustom(spec: TierSpec): spec is CustomSpec {
  return (spec as CustomSpec).custom === true;
}

const TIER_SPECS: Record<TierKey, TierSpec> = {
  "STARTER-LITE": {
    productsCap: 500,
    competitorsIncluded: 3,
    monthlyPriceEUR: 249,
  },
  STARTER: {
    productsCap: 1000,
    competitorsIncluded: 3,
    monthlyPriceEUR: 349,
    highlight: true,
  },
  GROWTH: {
    productsCap: 3000,
    competitorsIncluded: 3,
    monthlyPriceEUR: 549,
  },
  PRO: {
    productsCap: 10000,
    competitorsIncluded: 3,
    monthlyPriceEUR: 999,
  },
  ENTERPRISE: { custom: true },
};

const ADDON_COMPETITOR_EUR = 79;
const ADDON_1K_PRODUCTS_EUR = 90;

function formatEUR(amount: number) {
  return `€${amount.toLocaleString()}`;
}

function calcDisplayedPrice(
  monthlyPriceEUR: number,
  billing: "monthly" | "annual"
) {
  if (billing === "annual") {
    return Math.round(monthlyPriceEUR * 12 * (1 - ANNUAL_DISCOUNT));
  }
  return monthlyPriceEUR;
}

export function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const cards = useMemo(() => {
    const order: TierKey[] = [
      "STARTER-LITE",
      "STARTER",
      "GROWTH",
      "PRO",
      "ENTERPRISE",
    ];

    return order.map((tier) => {
      const spec = TIER_SPECS[tier];

      if (isCustom(spec)) {
        return {
          tier,
          title: "Enterprise",
          price: "Custom",
          period: "",
          features: [
            "10,000+ products",
            "Custom SLA & onboarding",
            "Custom integrations",
          ],
          highlight: false,
        };
      }

      const priceNumber = calcDisplayedPrice(spec.monthlyPriceEUR, billing);

      const planName =
        tier === "STARTER-LITE"
          ? "Starter Lite"
          : tier === "STARTER"
          ? "Starter"
          : tier === "GROWTH"
          ? "Growth"
          : "Pro";

      return {
        tier,
        title: planName,
        price: formatEUR(priceNumber),
        period: billing === "monthly" ? "/ month" : "/ year",
        features: [
          `Up to ${spec.productsCap.toLocaleString()} products`,
          `${spec.competitorsIncluded} competitors included`,
          `Add competitor: ${formatEUR(ADDON_COMPETITOR_EUR)}/month`,
          `Add 1,000 products: ${formatEUR(ADDON_1K_PRODUCTS_EUR)}/month`,
        ],
        highlight: !!spec.highlight,
      };
    });
  }, [billing]);

  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Pricing built for SKU-level competitor monitoring
        </h2>
        <BillingToggle value={billing} onChange={setBilling} />
      </div>

      <p className="text-neutral-700 mb-10">
        Talk to us to activate your plan. Cancel anytime.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
        {cards.map((p, i) => (
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
                {p.title}
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

            <ul className="mt-6 space-y-2 text-sm">
              {p.features.map((f: string, idx: number) => {
                const isCompetitorAddon = f.includes("Add competitor");

                if (isCompetitorAddon) {
                  return (
                    <li
                      key={idx}
                      className="
                        rounded-xl
                        bg-gradient-to-r
                        from-fuchsia-600
                        via-purple-600
                        to-indigo-600
                        text-white
                        px-4
                        py-2.5
                        font-semibold
                        shadow-md
                        hover:shadow-lg
                        ring-1 ring-fuchsia-400/40
                        transition
                      "
                    >
                      {f}
                    </li>
                  );
                }

                return (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-neutral-700"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-fuchsia-600" />
                    <span>{f}</span>
                  </li>
                );
              })}
            </ul>

            <a
              href="/contact"
              className="mt-6 rounded-xl bg-neutral-900 text-white text-center py-2 font-medium hover:translate-y-[-1px] transition"
            >
              Contact Us
            </a>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-neutral-600">
        For subscriptions bigger than 10,000 products we offer large discounts.
      </p>
    </section>
  );
}