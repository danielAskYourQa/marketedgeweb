// src/app/components/Calculator.tsx
"use client";
import { useMemo, useState } from "react";
import { NumberField } from "./ui/NumberField";

const PRODUCT_PRICE_EUR = 0.10;     // € per product / month
const COMPETITOR_PRICE_EUR = 79;    // € per competitor / month
const MARKETPLACE_PRICE_EUR = 100;  // € per marketplace / month
const ANNUAL_DISCOUNT = 0.20;       // 20% off on annual

function estimatePriceEUR(
  products: number,
  competitors: number,
  marketplaces: number,
  billing: "monthly" | "annual"
) {
  const monthly =
    products * PRODUCT_PRICE_EUR +
    competitors * COMPETITOR_PRICE_EUR +
    marketplaces * MARKETPLACE_PRICE_EUR;

  if (billing === "annual") {
    return Math.round(monthly * 12 * (1 - ANNUAL_DISCOUNT));
  }

  return Math.round(monthly);
}

export function CalculatorSection() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [products, setProducts] = useState(100);
  const [competitors, setCompetitors] = useState(1);
  const [marketplaces, setMarketplaces] = useState(0);

  const estimate = useMemo(
    () => estimatePriceEUR(products, competitors, marketplaces, billing),
    [products, competitors, marketplaces, billing]
  );

  return (
    <section id="calculator" className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Or calculate your own subscription
      </h2>
      <p className="text-neutral-700 mb-6">
        Estimate based on products, competitors and marketplaces.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-4 shadow-sm">
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

          <div className="text-sm text-neutral-600 pt-2">
            Billing:{" "}
            <button
              className="underline underline-offset-2"
              onClick={() =>
                setBilling(billing === "monthly" ? "annual" : "monthly")
              }
            >
              {billing.toUpperCase()}
            </button>
          </div>

          <p className="text-xs text-neutral-500">
            Price = (Products × €0.10) + (€79 per competitor) + (€100 per marketplace)
          </p>
        </div>

        {/* Summary */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Summary</h3>
          <ul className="space-y-2 text-neutral-700">
            <li className="flex justify-between">
              <span>Products</span>
              <span>{products}</span>
            </li>
            <li className="flex justify-between">
              <span>Competitors</span>
              <span>{competitors}</span>
            </li>
            <li className="flex justify-between">
              <span>Marketplaces</span>
              <span>{marketplaces}</span>
            </li>
            <li className="flex justify-between">
              <span>Billing</span>
              <span className="uppercase">{billing}</span>
            </li>
          </ul>

          <div className="mt-6 p-4 rounded-xl bg-neutral-100 text-neutral-900">
            <div className="text-sm">Estimated total</div>
            <div className="text-3xl font-extrabold">
              €{estimate.toLocaleString()}{" "}
              {billing === "monthly" ? "/ mo" : "/ yr"}
            </div>
          </div>

          <p className="mt-3 text-xs text-neutral-600">
            Annual billing includes 20% discount.
          </p>
        </div>
      </div>
    </section>
  );
}