// src/app/components/Pricing.tsx
"use client";
import { useState } from "react";
import { BillingToggle } from "./ui/BillingToggle";
import { Check, ArrowRight, Sparkles } from "lucide-react";

const ANNUAL_DISCOUNT = 0.2; // 20% off on annual
const AI_ADDON_EUR = 100; // AI Assistant add-on / month

type Plan = {
  key: string;
  name: string;
  tagline: string;
  monthlyEUR: number | null; // null = custom
  caps?: { competitors: string };
  features: string[];
  aiIncluded?: boolean; // Scale & Enterprise ship with the AI Assistant
  aiAddon?: boolean; // can bolt it on for AI_ADDON_EUR
  highlight?: boolean;
  dark?: boolean;
};

const PLANS: Plan[] = [
  {
    key: "starter",
    name: "Starter",
    tagline: "Your first full market view",
    monthlyEUR: 179,
    caps: { competitors: "5" },
    aiAddon: true,
    features: [
      "Unlimited products",
      "Up to 5 competitors",
      "Daily price & stock refresh",
      "Alerts & dashboards",
      "Major marketplaces + any website",
      "Email support",
    ],
  },
  {
    key: "growth",
    name: "Growth",
    tagline: "Full market intelligence for growing teams",
    monthlyEUR: 499,
    caps: { competitors: "10" },
    aiAddon: true,
    highlight: true,
    features: [
      "Unlimited products",
      "Up to 10 competitors",
      "Near real-time refresh",
      "Price history & market trends",
      "Competitor stock & assortment tracking",
      "CSV / Excel exports",
      "Priority chat support",
    ],
  },
  {
    key: "scale",
    name: "Scale",
    tagline: "Serious coverage, with the AI Assistant built in",
    monthlyEUR: 799,
    caps: { competitors: "20" },
    aiIncluded: true,
    features: [
      "Unlimited products",
      "Up to 20 competitors",
      "Everything in Growth",
      "API access & integrations",
      "MAP monitoring workflows",
      "Dedicated onboarding & product matching",
    ],
  },
  {
    key: "enterprise",
    name: "Enterprise",
    tagline: "Custom scale, custom workflows",
    monthlyEUR: null,
    aiIncluded: true,
    dark: true,
    features: [
      "Everything in Scale",
      "Unlimited competitors",
      "Custom crawl frequency & custom sites",
      "Custom integrations & SLA",
      "Multiple seats & SSO",
    ],
  },
];

function formatEUR(amount: number) {
  return `€${Math.round(amount).toLocaleString("en-US")}`;
}

export function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [aiOn, setAiOn] = useState<Record<string, boolean>>({});

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
        alerts, trends and AI product matching. Add the AI Assistant to any
        plan for {formatEUR(AI_ADDON_EUR)}/month — included on Scale and
        Enterprise. Prices in EUR, excl. VAT. Cancel anytime.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {PLANS.map((plan) => {
          const withAi = plan.aiIncluded || !!aiOn[plan.key];
          const monthly =
            plan.monthlyEUR === null
              ? null
              : plan.monthlyEUR + (plan.aiAddon && aiOn[plan.key] ? AI_ADDON_EUR : 0);
          const effective =
            monthly === null
              ? null
              : billing === "annual"
              ? monthly * (1 - ANNUAL_DISCOUNT)
              : monthly;

          const cardBase = plan.dark
            ? "rounded-3xl bg-[#0b0b26] text-white p-6 flex flex-col shadow-lg"
            : plan.highlight
            ? "relative rounded-3xl border-2 border-transparent [background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(to_top_right,#c026d3,#4f46e5)_border-box] p-6 flex flex-col shadow-lg"
            : "rounded-3xl border border-neutral-200 bg-white p-6 flex flex-col shadow-sm hover:shadow-md transition";

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
              <p className={`mt-1 text-sm min-h-10 ${plan.dark ? "text-slate-400" : "text-neutral-500"}`}>
                {plan.tagline}
              </p>

              <div className="mt-4">
                {effective === null ? (
                  <>
                    <div className="text-4xl font-extrabold">Custom</div>
                    <p className="mt-1 text-xs h-4 text-slate-400">
                      tailored to your market
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-extrabold">{formatEUR(effective)}</span>
                      <span className={plan.dark ? "text-slate-400" : "text-neutral-500"}>
                        / month
                      </span>
                    </div>
                    <p
                      className={`mt-1 text-xs h-4 ${
                        plan.dark ? "text-slate-400" : "text-neutral-500"
                      }`}
                    >
                      {billing === "annual"
                        ? `billed annually — ${formatEUR(effective * 12)}/year (20% off)`
                        : "billed monthly"}
                    </p>
                  </>
                )}
              </div>

              {/* caps at a glance */}
              {plan.caps && (
                <div
                  className={`mt-4 grid grid-cols-2 gap-3 rounded-2xl p-3.5 ${
                    plan.dark ? "bg-white/5" : "bg-slate-50"
                  }`}
                >
                  <div>
                    <p className={`text-[10px] uppercase tracking-wide font-semibold ${plan.dark ? "text-slate-400" : "text-neutral-400"}`}>
                      Products
                    </p>
                    <p className="text-lg font-extrabold">&infin; Unlimited</p>
                  </div>
                  <div>
                    <p className={`text-[10px] uppercase tracking-wide font-semibold ${plan.dark ? "text-slate-400" : "text-neutral-400"}`}>
                      Competitors
                    </p>
                    <p className="text-lg font-extrabold">{plan.caps.competitors}</p>
                  </div>
                </div>
              )}

              {/* AI Assistant: toggle on Starter/Growth, included on Scale/Enterprise */}
              {plan.aiIncluded ? (
                <div
                  className={`mt-4 flex items-center gap-2 rounded-2xl px-3.5 py-2.5 text-sm font-semibold ${
                    plan.dark
                      ? "bg-white/10 text-indigo-200"
                      : "bg-gradient-to-r from-fuchsia-50 to-indigo-50 text-indigo-700"
                  }`}
                >
                  <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
                  AI Assistant included
                </div>
              ) : plan.aiAddon ? (
                <label
                  className={`mt-4 flex cursor-pointer items-center gap-2.5 rounded-2xl border px-3.5 py-2.5 text-sm transition ${
                    aiOn[plan.key]
                      ? "border-indigo-300 bg-indigo-50/70"
                      : "border-neutral-200 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={!!aiOn[plan.key]}
                    onChange={(e) =>
                      setAiOn((s) => ({ ...s, [plan.key]: e.target.checked }))
                    }
                    className="h-4 w-4 accent-indigo-600"
                  />
                  <span className="flex items-center gap-1.5 font-semibold text-neutral-800">
                    <Sparkles className="h-4 w-4 text-indigo-600" aria-hidden />
                    Add AI Assistant
                  </span>
                  <span className="ml-auto text-neutral-500 whitespace-nowrap">
                    +{formatEUR(AI_ADDON_EUR)}/mo
                  </span>
                </label>
              ) : null}

              <ul className="mt-5 space-y-2.5 text-sm">
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
                {withAi && !plan.aiIncluded && (
                  <li className="flex items-start gap-2.5 text-indigo-700 font-semibold">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                    <span>AI Assistant</span>
                  </li>
                )}
              </ul>

              <a
                href="/contact"
                className={
                  plan.dark
                    ? "mt-7 rounded-2xl bg-white text-[#0b0b26] text-center py-2.5 font-semibold hover:bg-slate-100 transition"
                    : plan.highlight
                    ? "mt-7 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white text-center py-2.5 font-semibold hover:opacity-90 transition"
                    : "mt-7 rounded-2xl border border-neutral-300 text-center py-2.5 font-semibold hover:bg-neutral-50 transition"
                }
              >
                {plan.dark ? (
                  "Talk to sales"
                ) : plan.highlight ? (
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
    </section>
  );
}
