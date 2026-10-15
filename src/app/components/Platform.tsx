// src/app/components/Platform.tsx
"use client";
import Image from "next/image";
import { useState } from "react";
import {
  LayoutDashboard,
  Tag,
  Radar,
  Swords,
  GitCompareArrows,
  Zap,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Reveal } from "./ui/Reveal";

/* ---------------------------------------------------------------------------
 * "One platform" explorer — real screens from the live Market Edge product
 * (demo account on a live construction-materials market, 4 competitors).
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
    key: "price-intelligence",
    tab: "Price Intelligence",
    title: "Price Intelligence",
    icon: Tag,
    tile: "bg-indigo-100 text-indigo-700",
    desc: "Your price against each competitor's, for every product we could match — who is cheaper, by how much, and what is at stake per product, with the competitor's live listing one click away.",
    stats: [
      { v: "912", l: "comparable matches" },
      { v: "9%", l: "median gap vs market" },
      { v: "lei at stake", l: "per product" },
    ],
    img: "/shot-price-intelligence.png",
    w: 1568,
    h: 746,
    alt: "Market Edge Price Intelligence: matched products priced against each competitor, with difference, amount at stake and who is cheaper on live market data",
  },
  {
    key: "assortment",
    tab: "Assortment Intelligence",
    title: "Assortment Intelligence",
    icon: LayoutDashboard,
    tile: "bg-emerald-100 text-emerald-700",
    desc: "Your market in one line, then the shelves behind it: product gaps, brand gaps, category coverage, benchmarking, exclusivity and new-product detection — every figure a card you can open.",
    stats: [
      { v: "10,934", l: "products they carry, you don't" },
      { v: "167", l: "brands with gaps" },
      { v: "549", l: "categories tracked" },
    ],
    img: "/shot-assortment.png",
    w: 1568,
    h: 746,
    alt: "Market Edge Assortment Intelligence overview: competitor listings, product gaps, brand gaps, category coverage, benchmarking and exclusivity on live data",
  },
  {
    key: "competitive",
    tab: "Competitive Intelligence",
    title: "Competitive Intelligence",
    icon: Radar,
    tile: "bg-sky-100 text-sky-700",
    desc: "This week in your market: competitors ranked by threat score with 8-week catalogue trends, the week's moves, and the stock-outs you can exploit while their shelves are empty.",
    stats: [
      { v: "0–100", l: "threat score per competitor" },
      { v: "8 wks", l: "catalogue trend" },
      { v: "128", l: "open stock windows" },
    ],
    img: "/shot-competitive.png",
    w: 1568,
    h: 746,
    alt: "Market Edge Competitive Intelligence: competitors ranked by threat score with weekly market digest, moves and head-to-head summary",
  },
  {
    key: "head-to-head",
    tab: "Head-to-Head",
    title: "Head-to-Head",
    icon: Swords,
    tile: "bg-rose-100 text-rose-700",
    desc: "You against one competitor on the products you both sell: who wins on price, your combined territory, and the battlefield categories where the price war actually happens.",
    stats: [
      { v: "478", l: "products you both sell" },
      { v: "48% / 45%", l: "you cheaper / they cheaper" },
      { v: "By category", l: "battlefield view" },
    ],
    img: "/shot-head-to-head.png",
    w: 1568,
    h: 746,
    alt: "Market Edge Head-to-Head: shared products with one competitor, who wins on price, combined territory and contested categories",
  },
  {
    key: "equivalence",
    tab: "Equivalence",
    title: "Equivalent products",
    icon: GitCompareArrows,
    tile: "bg-purple-100 text-purple-700",
    desc: "Technically the same item from a different brand — where a competitor sells a substitute for your product and what they charge. Brands and codes are ignored; the specs must agree.",
    stats: [
      { v: "110", l: "exact equivalents" },
      { v: "61", l: "cheaper substitutes" },
      { v: "Spec-level", l: "matching rules" },
    ],
    img: "/shot-equivalence.png",
    w: 1568,
    h: 746,
    alt: "Market Edge Equivalence: competitor substitutes for your products matched on technical specs, with their price and the difference",
  },
  {
    key: "opportunity",
    tab: "Opportunity Intelligence",
    title: "Opportunity Intelligence",
    icon: Zap,
    tile: "bg-amber-100 text-amber-700",
    desc: "Every signal scored 0–100 and ranked into one work list, plus Moves: the week's repricings, new products, delistings and stock-outs you can respond to today.",
    stats: [
      { v: "12,293", l: "scored opportunities" },
      { v: "0–100", l: "opportunity score" },
      { v: "Daily", l: "moves timeline" },
    ],
    img: "/shot-moves.png",
    w: 1568,
    h: 746,
    alt: "Market Edge Opportunity Intelligence — Moves: repricings, new products, delistings and exploitable stock-outs across tracked competitors",
  },
  {
    key: "ask-marketedge",
    tab: "AI Assistant",
    title: "Ask MarketEdge",
    icon: Sparkles,
    tile: "bg-fuchsia-100 text-fuchsia-700",
    desc: "Ask in plain language — \"where am I more expensive than my competitors?\" — and get an answer built from your own catalog, matches and competitors, with the table exportable to Excel or PDF.",
    stats: [
      { v: "Plain language", l: "questions" },
      { v: "Your data", l: "answers, not generic AI" },
      { v: "Excel / PDF", l: "one-click export" },
    ],
    img: "/shot-ask-marketedge.png",
    w: 1568,
    h: 746,
    alt: "Ask MarketEdge AI assistant answering a pricing question from live market data, with a biggest-price-gaps table",
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
            Real screens from the live platform — price, assortment,
            competitive and opportunity intelligence on actual market data:
            23,700+ listings tracked across 5 stores, crawled daily. Pick a
            capability to see it in action.
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
