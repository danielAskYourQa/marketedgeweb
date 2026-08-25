// src/app/components/Platform.tsx
"use client";
import Image from "next/image";
import { useState } from "react";
import {
  LayoutDashboard,
  PackageSearch,
  Bookmark,
  BarChart3,
  PackagePlus,
  Fingerprint,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Reveal } from "./ui/Reveal";

/* ---------------------------------------------------------------------------
 * "One platform" explorer — real screens from the live Market Edge product
 * (Assortment Intelligence module, demo account with live market data).
 * ------------------------------------------------------------------------- */

type Feature = {
  key: string;
  tab: string;
  title: string;
  icon: typeof LayoutDashboard;
  tile: string;
  desc: string;
  stats: { v: string; l: string }[];
  img: string;
  w: number;
  h: number;
  alt: string;
};

const FEATURES: Feature[] = [
  {
    key: "overview",
    tab: "Overview",
    title: "Assortment overview",
    icon: LayoutDashboard,
    tile: "bg-indigo-100 text-indigo-700",
    desc: "Every assortment KPI on one screen: how big the market really is, how much of it you cover, and where the biggest gaps sit — with full data-confidence reporting on every crawl.",
    stats: [
      { v: "30,672", l: "products in market" },
      { v: "28,558", l: "gaps identified" },
      { v: "100%", l: "data confidence" },
    ],
    img: "/shot-overview.png",
    w: 2246,
    h: 1324,
    alt: "Market Edge Assortment Intelligence overview: products in market, missing products, assortment score, product gaps and brand gaps on live data",
  },
  {
    key: "product-gaps",
    tab: "Product gaps",
    title: "Product gaps",
    icon: PackageSearch,
    tile: "bg-emerald-100 text-emerald-700",
    desc: "Categories where competitors carry products you don't — drill from the category level down to the exact product, with best market price, live stock and the competitor listing one click away.",
    stats: [
      { v: "178", l: "categories analyzed" },
      { v: "per SKU", l: "price & stock detail" },
      { v: "EAN", l: "matched listings" },
    ],
    img: "/shot-product-gaps.png",
    w: 2277,
    h: 1342,
    alt: "Market Edge Product Gaps: missing products by category with best price, stock status and competitor listings",
  },
  {
    key: "brand-gaps",
    tab: "Brand gaps",
    title: "Brand gaps",
    icon: Bookmark,
    tile: "bg-fuchsia-100 text-fuchsia-700",
    desc: "Brands your competitors stock and you don't, ranked by how far ahead they are — with an opportunity score that tells you which gaps are easiest to win, and the full product list behind each one.",
    stats: [
      { v: "200", l: "brands with gaps" },
      { v: "High / Med", l: "opportunity scoring" },
      { v: "1-click", l: "export per brand" },
    ],
    img: "/shot-brand-gaps.png",
    w: 2261,
    h: 1285,
    alt: "Market Edge Brand Gaps: brands competitors sell that you don't, ranked by gap size with opportunity scores",
  },
  {
    key: "benchmark",
    tab: "Benchmarking",
    title: "Benchmarking",
    icon: BarChart3,
    tile: "bg-sky-100 text-sky-700",
    desc: "Your catalog against every tracked competitor: size, category coverage, overlap, price index and stock health — plus head-to-head views showing exactly who undercuts you, and on which products.",
    stats: [
      { v: "1.6×", l: "vs closest competitor" },
      { v: "Price index", l: "per competitor" },
      { v: "Head-to-head", l: "any two stores" },
    ],
    img: "/shot-benchmark.png",
    w: 2265,
    h: 1325,
    alt: "Market Edge Benchmarking: store scoreboard with products, overlap, price index and in-stock rate, category leaders and head-to-head comparison",
  },
  {
    key: "new-products",
    tab: "New products",
    title: "New product detection",
    icon: PackagePlus,
    tile: "bg-amber-100 text-amber-700",
    desc: "Every product a competitor adds, the day it appears — filtered to the ones you don't carry yet, so their catalog moves become your shopping list.",
    stats: [
      { v: "131", l: "new gaps · 30 days" },
      { v: "Daily", l: "detection cadence" },
      { v: "Per competitor", l: "activity feed" },
    ],
    img: "/shot-new-products.png",
    w: 2262,
    h: 1328,
    alt: "Market Edge New Product Detection: products competitors added recently, by competitor, filtered to gaps",
  },
  {
    key: "exclusivity",
    tab: "Exclusivity",
    title: "Exclusivity analysis",
    icon: Fingerprint,
    tile: "bg-purple-100 text-purple-700",
    desc: "What only you sell vs. what only competitors sell — your moat on one side, your blind spots on the other, split by category and by brand.",
    stats: [
      { v: "21,682", l: "only you sell" },
      { v: "2,114", l: "head-to-head" },
      { v: "28,558", l: "only competitors" },
    ],
    img: "/shot-exclusivity.png",
    w: 2265,
    h: 1331,
    alt: "Market Edge Exclusivity Analysis: products only you sell versus products only competitors sell, by category",
  },
  {
    key: "opportunity",
    tab: "Opportunity engine",
    title: "Opportunity engine",
    icon: Zap,
    tile: "bg-rose-100 text-rose-700",
    desc: "Ranked actions distilled from every gap above: brands to add, categories to enter and market momentum to ride — each one proven by what competitors already sell.",
    stats: [
      { v: "8", l: "brands to add" },
      { v: "7", l: "categories to enter" },
      { v: "3", l: "momentum trends" },
    ],
    img: "/shot-opportunity.png",
    w: 2267,
    h: 1330,
    alt: "Market Edge Opportunity Engine: ranked actions — brands to add, categories to enter and market momentum",
  },
];

const PROMISES = [
  { big: "Near real-time", small: "price & stock refresh" },
  { big: "AI matching", small: "clean, reliable product data" },
  { big: "Any website", small: "plus major marketplaces" },
];

export function Platform() {
  const [active, setActive] = useState(0);
  const feature = FEATURES[active];

  return (
    <div className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs md:text-sm uppercase tracking-widest text-indigo-600 font-semibold mb-3">
            The platform
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold [text-wrap:balance]">
            One platform. Complete market intelligence.
          </h2>
          <p className="mt-4 text-neutral-600 text-lg">
            Real screens from the live platform — assortment, price and
            competitive intelligence on actual market data: 30,672 products
            tracked across 4 competitors. Pick a capability to see it in
            action.
          </p>
        </div>

        {/* feature selector strip */}
        <div
          role="tablist"
          aria-label="Platform capabilities"
          className="mt-10 flex gap-2 md:gap-3 overflow-x-auto md:justify-center px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            const selected = i === active;
            return (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(i)}
                className={[
                  "flex w-28 shrink-0 flex-col items-center gap-2 rounded-2xl px-2 py-3 transition border",
                  selected
                    ? "bg-white border-indigo-200 shadow-md"
                    : "bg-transparent border-transparent hover:bg-white/70",
                ].join(" ")}
              >
                <span
                  className={[
                    "inline-flex h-10 w-10 items-center justify-center rounded-xl transition",
                    selected
                      ? "bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white shadow"
                      : f.tile,
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span
                  className={[
                    "text-[11px] font-semibold leading-tight text-center",
                    selected ? "text-neutral-900" : "text-neutral-500",
                  ].join(" ")}
                >
                  {f.tab}
                </span>
              </button>
            );
          })}
        </div>

        {/* big feature panel with the real screenshot */}
        <Reveal
          key={feature.key}
          mode="mount"
          y={10}
          className="mt-6 rounded-3xl bg-white shadow-xl ring-1 ring-black/5 overflow-hidden"
        >
          <div className="grid lg:grid-cols-[1fr_1.9fr] gap-8 p-6 md:p-10 items-center">
            <div className="text-left">
              <h3 className="text-2xl font-extrabold">{feature.title}</h3>
              <p className="mt-3 text-neutral-600">{feature.desc}</p>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {feature.stats.map((s) => (
                  <div key={s.l} className="rounded-xl bg-slate-50 px-3 py-2">
                    <p className="text-base font-extrabold text-neutral-900 leading-tight">
                      {s.v}
                    </p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-wide text-neutral-400 font-semibold">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white text-sm font-semibold hover:opacity-90 transition"
              >
                See it on your market
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>

            <div className="min-w-0">
              <Image
                src={feature.img}
                alt={feature.alt}
                width={feature.w}
                height={feature.h}
                sizes="(max-width: 1024px) 92vw, 780px"
                className="w-full h-auto rounded-2xl shadow-xl ring-1 ring-black/10"
              />
            </div>
          </div>
        </Reveal>

        {/* promise band — qualitative, no invented metrics */}
        <div className="mt-12 rounded-3xl bg-[#0b0b26] text-white px-6 py-10 grid sm:grid-cols-3 gap-8 text-center">
          {PROMISES.map((s) => (
            <div key={s.big}>
              <p className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-fuchsia-400 to-indigo-300 bg-clip-text text-transparent">
                {s.big}
              </p>
              <p className="mt-1 text-sm text-slate-300">{s.small}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
