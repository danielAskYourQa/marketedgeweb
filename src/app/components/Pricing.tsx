// src/app/components/Pricing.tsx
"use client";
import { useState } from "react";
import { BillingToggle } from "./ui/BillingToggle";
import {
  Check,
  ArrowRight,
  Sparkles,
  Plus,
  X,
  ShieldAlert,
} from "lucide-react";

const ANNUAL_DISCOUNT = 0.2; // 20% off on annual
const AI_ADDON_EUR = 100; // AI Assistant — one flat add-on / month

/* ---------------------------------------------------------------------------
 * Subscription calculator — no tiers. The visitor adds the competitors they
 * want tracked; each one costs slots (catalog size + monitoring complexity) and
 * the price is computed from the total.
 *
 * Pricing curve: anchored at 5 slots = €179, 10 = €499, 20 = €799 (the old
 * tier prices), linear between anchors, floor €119/month. Beyond the last
 * anchor the final per-slot rate (€30) keeps going — one curve for any size.
 * ------------------------------------------------------------------------- */

const PRICE_ANCHORS: Array<[number, number]> = [
  [0, 0],
  [5, 179],
  [10, 499],
  [20, 799],
];
const MIN_MONTHLY_EUR = 119;

/** piecewise-linear price for a slot total, rounded to a …9 price point */
function monthlyForSlots(slots: number): number {
  const [lastS, lastP] = PRICE_ANCHORS[PRICE_ANCHORS.length - 1];
  const [prevS, prevP] = PRICE_ANCHORS[PRICE_ANCHORS.length - 2];
  let price: number;
  if (slots > lastS) {
    /* extend past the last anchor at the final segment's per-slot rate */
    price = lastP + ((lastP - prevP) / (lastS - prevS)) * (slots - lastS);
  } else {
    price = lastP;
    for (let i = 1; i < PRICE_ANCHORS.length; i++) {
      const [s0, p0] = PRICE_ANCHORS[i - 1];
      const [s1, p1] = PRICE_ANCHORS[i];
      if (slots <= s1) {
        price = p0 + ((slots - s0) / (s1 - s0)) * (p1 - p0);
        break;
      }
    }
  }
  const nined = Math.round((price - 9) / 10) * 10 + 9; // €243 → €239
  return Math.max(MIN_MONTHLY_EUR, nined);
}

function formatEUR(amount: number) {
  return `€${Math.round(amount).toLocaleString("en-US")}`;
}

const SIZE_OPTIONS = [
  { slots: 1, label: "≤25k", title: "Standard store — up to 25,000 products" },
  { slots: 2, label: "≤50k", title: "Medium — 25k–50k products" },
  { slots: 3, label: "≤75k", title: "Large — 50k–75k products" },
  { slots: 4, label: "≤100k", title: "Very large — 75k–100k products" },
  { slots: 5, label: "100k+", title: "Huge — over 100,000 products" },
];

type CompetitorRow = { id: number; size: number; isProtected: boolean };

const rowSlots = (r: CompetitorRow) => r.size + (r.isProtected ? 1 : 0);

/* everything is included on every subscription — no feature gating */
const INCLUDED = [
  "Unlimited products in your own catalog",
  "All modules: Price, Assortment, Competitive, Opportunity & Equivalence",
  "Daily monitoring · price & stock refresh",
  "Full report pack + custom CSV builder",
  "Major marketplaces + any website",
  "Email & chat support",
];

function SizePicker({
  rowIndex,
  value,
  onChange,
}: {
  rowIndex: number;
  value: number;
  onChange: (slots: number) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={`Competitor ${rowIndex} catalog size (products)`}
      className="inline-flex rounded-full bg-white/[0.06] ring-1 ring-white/10 p-1"
    >
      {SIZE_OPTIONS.map((o) => {
        const active = o.slots === value;
        return (
          <button
            key={o.slots}
            type="button"
            role="radio"
            aria-checked={active}
            title={o.title}
            onClick={() => onChange(o.slots)}
            className={[
              "rounded-full px-2.5 py-1 text-xs font-bold transition",
              active
                ? "bg-white text-[#0b0b26] shadow"
                : "text-slate-400 hover:text-white",
            ].join(" ")}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function SubscriptionCalculator({ billing }: { billing: "monthly" | "annual" }) {
  const [rows, setRows] = useState<CompetitorRow[]>([
    { id: 1, size: 1, isProtected: false },
    { id: 2, size: 1, isProtected: false },
    { id: 3, size: 1, isProtected: false },
  ]);
  const [nextId, setNextId] = useState(4);
  const [aiOn, setAiOn] = useState(false);

  const total = rows.reduce((s, r) => s + rowSlots(r), 0);
  const monthly = monthlyForSlots(total) + (aiOn ? AI_ADDON_EUR : 0);
  const effective =
    billing === "annual" ? monthly * (1 - ANNUAL_DISCOUNT) : monthly;

  const update = (id: number, patch: Partial<CompetitorRow>) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  return (
    <div className="relative isolate overflow-hidden rounded-3xl bg-[#0b0b26] text-white p-6 md:p-8 shadow-2xl shadow-indigo-950/30">
      {/* glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_80%_0%,rgba(99,102,241,0.25),transparent_60%),radial-gradient(50%_40%_at_0%_100%,rgba(217,70,239,0.15),transparent_70%)]"
      />

      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-xl font-extrabold">Build your subscription</h3>
          <p className="mt-1 text-sm text-slate-400">
            Pick each competitor&apos;s catalog size and flag the protected
            ones — your price updates live.
          </p>
        </div>
        <p className="text-[11px] uppercase tracking-wider font-bold text-slate-500">
          catalog size in products
        </p>
      </div>

      {/* competitor rows */}
      <div className="mt-5 space-y-2">
        {rows.map((r, i) => (
          <div
            key={r.id}
            className="flex flex-wrap items-center gap-2.5 rounded-2xl bg-white/[0.04] ring-1 ring-white/10 px-3.5 py-2.5"
          >
            <span className="w-6 text-xs font-bold text-slate-500">
              #{i + 1}
            </span>
            <SizePicker
              rowIndex={i + 1}
              value={r.size}
              onChange={(slots) => update(r.id, { size: slots })}
            />
            <button
              type="button"
              aria-pressed={r.isProtected}
              title="Marketplace, anti-bot wall or login-gated store — uses one extra slot"
              onClick={() => update(r.id, { isProtected: !r.isProtected })}
              className={[
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ring-1 transition",
                r.isProtected
                  ? "bg-gradient-to-r from-fuchsia-600/30 to-indigo-600/30 text-fuchsia-200 ring-fuchsia-400/40"
                  : "bg-white/[0.04] text-slate-400 ring-white/10 hover:text-white",
              ].join(" ")}
            >
              <ShieldAlert className="h-3.5 w-3.5" aria-hidden />
              protected
            </button>
            <span className="ml-auto rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold text-indigo-200">
              {rowSlots(r)} {rowSlots(r) === 1 ? "slot" : "slots"}
            </span>
            {rows.length > 1 && (
              <button
                type="button"
                aria-label={`Remove competitor ${i + 1}`}
                onClick={() => setRows((rs) => rs.filter((x) => x.id !== r.id))}
                className="rounded-full p-1 text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 transition"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          setRows((rs) => [...rs, { id: nextId, size: 1, isProtected: false }]);
          setNextId((n) => n + 1);
        }}
        className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-dashed border-white/20 px-4 py-2 text-sm font-semibold text-slate-300 hover:border-fuchsia-400/60 hover:text-white transition"
      >
        <Plus className="h-4 w-4" aria-hidden />
        Add competitor
      </button>

      {/* AI assistant — one flat add-on for the whole package */}
      <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-2xl bg-white/[0.04] ring-1 ring-white/10 px-4 py-3 text-sm transition hover:ring-fuchsia-400/40">
        <input
          type="checkbox"
          checked={aiOn}
          onChange={(e) => setAiOn(e.target.checked)}
          className="h-4 w-4 accent-fuchsia-500"
        />
        <Sparkles className="h-4 w-4 shrink-0 text-fuchsia-300" aria-hidden />
        <span className="font-semibold">
          Add Ask MarketEdge — the AI Assistant
          <span className="block text-xs font-normal text-slate-400">
            one flat add-on for your whole subscription — never per competitor
            or slot
          </span>
        </span>
        <span className="ml-auto font-bold text-slate-300 whitespace-nowrap">
          +{formatEUR(AI_ADDON_EUR)}/mo
        </span>
      </label>

      {/* price */}
      <div className="mt-6 flex flex-wrap items-end justify-between gap-5 border-t border-white/10 pt-6">
        <div>
          <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
            {rows.length} {rows.length === 1 ? "competitor" : "competitors"} ·{" "}
            {total} {total === 1 ? "slot" : "slots"}
            {aiOn && " · AI Assistant"}
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-5xl font-extrabold bg-gradient-to-r from-fuchsia-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              {formatEUR(effective)}
            </span>
            <span className="text-slate-400">/ month</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            {billing === "annual"
              ? `billed annually — ${formatEUR(effective * 12)}/year (20% off)`
              : "billed monthly · save 20% on annual billing"}
          </p>
        </div>
        <div className="text-right">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-indigo-600 px-6 py-3 text-sm font-semibold hover:opacity-90 transition"
          >
            Start free trial
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <p className="mt-2 text-[11px] text-slate-500">
            on your real market — no credit card required
          </p>
        </div>
      </div>
    </div>
  );
}

function CustomCard() {
  return (
    <div className="rounded-3xl bg-white ring-1 ring-black/5 shadow-xl p-6 md:p-8 flex flex-col">
      <p className="inline-flex self-start rounded-full bg-gradient-to-r from-fuchsia-50 to-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
        Custom
      </p>
      <h3 className="mt-3 text-xl font-extrabold text-neutral-900">
        Not sure how to size it? We&apos;ll set it up with you.
      </h3>
      <p className="mt-2 text-sm text-neutral-500">
        One call: we look at your market together, size every competitor and
        configure your subscription — including the cases the calculator
        can&apos;t cover.
      </p>

      <ul className="mt-5 space-y-2.5">
        {[
          "We verify every competitor's size and protection for you",
          "Custom monitoring setup for heavily protected sites",
          "API access & integrations, custom monitoring frequency",
          "SLA, multiple seats & SSO",
        ].map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-neutral-700">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
              aria-hidden
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <a
          href="/contact"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#0b0b26] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
        >
          Contact us — we&apos;ll set it up
          <ArrowRight className="h-4 w-4" aria-hidden />
        </a>
      </div>
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
            Pay for your market — not for a tier
          </h2>
        </div>
        <BillingToggle value={billing} onChange={setBilling} />
      </div>

      <p className="text-neutral-700 mb-8 max-w-3xl">
        No plans to pick. Build your competitor list below and get your price —
        starts from {formatEUR(MIN_MONTHLY_EUR)}/month. Every subscription
        includes the full platform with unlimited products of your own; the AI
        Assistant is one flat {formatEUR(AI_ADDON_EUR)}/month add-on covering
        your whole package, however many competitors you track. Prices in EUR,
        excl. VAT. Cancel anytime.
      </p>

      {/* how slots work — the rule, before the calculator */}
      <div className="mb-8 flex flex-wrap items-center gap-2 text-xs md:text-sm">
        <span className="font-bold uppercase tracking-wide text-neutral-400 mr-1">
          How slots work
        </span>
        <span className="rounded-full bg-indigo-50 text-indigo-800 ring-1 ring-indigo-100 px-3 py-1.5 font-semibold">
          1 slot = standard store up to 25,000 products
        </span>
        <span className="rounded-full bg-indigo-50 text-indigo-800 ring-1 ring-indigo-100 px-3 py-1.5 font-semibold">
          bigger catalog: +1 slot per 25,000 products
        </span>
        <span className="rounded-full bg-indigo-50 text-indigo-800 ring-1 ring-indigo-100 px-3 py-1.5 font-semibold">
          protected site or marketplace: +1 slot
        </span>
      </div>

      <div className="grid lg:grid-cols-[1.7fr_1fr] gap-6 items-stretch">
        <SubscriptionCalculator billing={billing} />
        <CustomCard />
      </div>

      {/* everything included, on every subscription */}
      <div className="mt-8 rounded-3xl bg-slate-50 ring-1 ring-black/5 px-6 py-6">
        <p className="text-xs uppercase tracking-widest font-bold text-neutral-400">
          Every subscription includes
        </p>
        <ul className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2.5">
          {INCLUDED.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-neutral-700">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* competitor-slot explainer — why big or protected sites cost more */}
      <div className="mt-8 rounded-2xl bg-slate-50 ring-1 ring-black/5 px-5 py-4 text-sm text-neutral-600 space-y-2">
        <p>
          <b className="text-neutral-900">What is a competitor slot?</b>{" "}
          <b>1 slot</b> covers a standard store with up to{" "}
          <b>25,000 products</b>. Bigger catalogs use one extra slot per
          additional 25,000 products, and heavily protected sites —
          marketplaces, anti-bot walls, login-gated stores — use one extra
          slot, because tracking them reliably takes far more monitoring
          infrastructure.
        </p>
        <p className="text-neutral-500">
          Example: a 12,000-product store = 1 slot · a 60,000-product store =
          3 slots · a protected 120,000-product marketplace = 6 slots. We
          verify every competitor&apos;s sizing with you before you commit.
        </p>
      </div>
    </section>
  );
}
