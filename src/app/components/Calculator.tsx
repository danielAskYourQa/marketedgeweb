// src/app/components/Calculator.tsx
"use client";
import { useMemo, useState } from "react";
import { NumberField } from "./ui/NumberField";

const UNIT_PRICE_EUR = 0.10;      // € per URL / month
const MARKETPLACE_WEIGHT = 1.5;   // 1 marketplace counts as 1.5 sites
const ANNUAL_DISCOUNT = 0.20;     // 20% off on annual

function computeUrls(products: number, competitors: number, marketplaces: number) {
  const weightedSites =
    Math.max(0, competitors) + Math.max(0, marketplaces) * MARKETPLACE_WEIGHT;
  return Math.max(0, Math.round(products * weightedSites));
}

function estimatePriceEUR(
  products: number,
  competitors: number,
  marketplaces: number,
  billing: "monthly" | "annual"
) {
  const urls = computeUrls(products, competitors, marketplaces);
  const monthly = urls * UNIT_PRICE_EUR;
  if (billing === "annual") return Math.round(monthly * 12 * (1 - ANNUAL_DISCOUNT));
  return Math.round(monthly);
}

export function CalculatorSection() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [products, setProducts] = useState(1000);
  const [competitors, setCompetitors] = useState(5);
  const [marketplaces, setMarketplaces] = useState(0);

  const weightedUrls = useMemo(
    () => computeUrls(products, competitors, marketplaces),
    [products, competitors, marketplaces]
  );

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
        Simple estimator — adjust inputs to preview your total.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-4 shadow-sm">
          <NumberField label="Products" value={products} step={100} onChange={setProducts} />
          <NumberField label="Competitors (websites)" value={competitors} step={1} onChange={setCompetitors} />
          <NumberField label="Marketplaces (×1.5 each)" value={marketplaces} step={1} onChange={setMarketplaces} />

          <div className="text-sm text-neutral-600 pt-2">
            Billing:{" "}
            <button
              className="underline underline-offset-2"
              onClick={() => setBilling(billing === "monthly" ? "annual" : "monthly")}
            >
              {billing.toUpperCase()}
            </button>
          </div>

          <p className="text-xs text-neutral-500">
            URLs = <code>Products × (Competitors + 1.5 × Marketplaces)</code>
          </p>
        </div>

        {/* Summary */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Summary</h3>
          <ul className="space-y-2 text-neutral-700">
            <li className="flex justify-between"><span>Products</span> <span>{products}</span></li>
            <li className="flex justify-between"><span>Competitors (web)</span> <span>{competitors}</span></li>
            <li className="flex justify-between"><span>Marketplaces (×1.5)</span> <span>{marketplaces}</span></li>
            <li className="flex justify-between"><span>Weighted URLs</span> <span>{weightedUrls.toLocaleString()}</span></li>
            <li className="flex justify-between"><span>Billing</span> <span className="uppercase">{billing}</span></li>
          </ul>

          <div className="mt-6 p-4 rounded-xl bg-neutral-100 text-neutral-900">
            <div className="text-sm">Estimated total</div>
            <div className="text-3xl font-extrabold">
              €{estimate.toLocaleString()} {billing === "monthly" ? "/ mo" : "/ yr"}
            </div>
          </div>

          <p className="mt-3 text-xs text-neutral-600">
            Priced at €0.10 per URL/month. Annual billing includes 20% discount.
          </p>
        </div>
      </div>
    </section>
  );
}
