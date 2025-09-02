"use client";
import { useMemo, useState } from "react";
import { NumberField } from "./ui/NumberField";
import { estimatePrice } from "@/lib/pricing";

export function CalculatorSection() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [products, setProducts] = useState(1000);
  const [competitors, setCompetitors] = useState(6);
  const [marketplaces, setMarketplaces] = useState(2);

  const estimate = useMemo(
    () => estimatePrice({ products, competitors, marketplaces, billing }),
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
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Summary</h3>
          <ul className="space-y-2 text-neutral-700">
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
          <div className="mt-6 p-4 rounded-xl bg-neutral-100 text-neutral-900">
            <div className="text-sm">Estimated total</div>
            <div className="text-3xl font-extrabold">
              ${estimate.toLocaleString()}{" "}
              {billing === "monthly" ? "/ mo" : "/ yr"}
            </div>
          </div>
          <p className="mt-3 text-xs text-neutral-600">
            This is an indicative estimate. For 10k+ products we offer large
            discounts.
          </p>
        </div>
      </div>
    </section>
  );
}
