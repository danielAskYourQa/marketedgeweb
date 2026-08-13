import Link from "next/link";
import {
  ShieldCheck,
  TrendingUp,
  Cog,
  ClipboardList,
  Check,
  ArrowRight,
} from "lucide-react";

type Category = "MAP" | "Margin" | "Sourcing" | "Procurement";

type Study = {
  title: string;
  subtitle?: string;
  category: Category;
  outcome: string;
  paragraphs: string[];
  bullets?: string[];
  kpis?: { kpi: string; label: string }[];
};

const CAT: Record<
  Category,
  { badge: string; Icon: typeof ShieldCheck; chip: string; iconTile: string }
> = {
  MAP: {
    badge: "MAP monitoring",
    Icon: ShieldCheck,
    chip: "bg-indigo-50 text-indigo-700 ring-indigo-200",
    iconTile: "bg-indigo-100 text-indigo-700",
  },
  Margin: {
    badge: "Margin recovery",
    Icon: TrendingUp,
    chip: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    iconTile: "bg-emerald-100 text-emerald-700",
  },
  Sourcing: {
    badge: "Strategic sourcing",
    Icon: Cog,
    chip: "bg-amber-50 text-amber-700 ring-amber-200",
    iconTile: "bg-amber-100 text-amber-700",
  },
  Procurement: {
    badge: "Procurement",
    Icon: ClipboardList,
    chip: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200",
    iconTile: "bg-fuchsia-100 text-fuchsia-700",
  },
};

const STUDIES: Study[] = [
  {
    category: "MAP",
    title: "MAP Monitoring – Premium Electronics",
    outcome:
      "Same-day MAP violation detection with screenshots — saving 25–30 executive hours/month.",
    paragraphs: [
      "A high-end electronics brand was manually checking distributor pricing to enforce MAP.",
      "The CEO was spending ~6–8 hours per week reviewing listings after receiving complaints from partners.",
      "In one instance: 2 distributors dropped 8% below MAP. Avg product price: €1,100. 40 units sold before detection → ~€3,520 margin erosion.",
      "They switched to Market Edge (€240/month).",
    ],
    bullets: [
      "Daily automated MAP monitoring",
      "Same-day alerts",
      "Timestamped screenshots per SKU",
      "No manual checking required",
      "Saves ~25–30 executive hours/month",
    ],
    kpis: [
      { kpi: "€240/mo", label: "Subscription" },
      { kpi: "6–8h/wk", label: "Manual time saved" },
      { kpi: "€3,520", label: "Erosion example" },
    ],
  },
  {
    category: "Margin",
    title: "Recovering Hidden Margin – FMCG (14,000 SKUs)",
    subtitle:
      "Fast-moving consumer goods: soap, detergent, toothpaste, household essentials",
    outcome:
      "Corrected pricing on 480 underperforming products and recovered +€27,400 in monthly margin.",
    paragraphs: [
      "An FMCG distributor managing 14,000 products across 12 competitors assumed pricing was aligned with the market.",
      "With high-volume, low-margin goods, even small pricing gaps matter — but manual checks only covered top sellers.",
    ],
    bullets: [
      "Market Edge revealed 17% of SKUs priced below market average",
      "Underpricing spread across long-tail, high-volume items",
      "Gaps often between 1–4% — invisible individually, significant at scale",
      "After correcting 480 SKUs → +€27,400/month recovered margin",
      "Small price gaps. Massive portfolio impact.",
    ],
    kpis: [
      { kpi: "14,000", label: "Products" },
      { kpi: "12", label: "Competitors" },
      { kpi: "+€27.4k", label: "Margin / month" },
    ],
  },
  {
    category: "Sourcing",
    title: "Turning Scarcity into Long-Term Revenue",
    outcome:
      "Found rare stock on the market, fulfilled an urgent order, and turned it into a ~€200k/year client.",
    paragraphs: [
      "A bearing distributor received an urgent request: LBA 80 SKF — €200/unit, 8 pieces required, no longer in production.",
      "Instead of declining the order, they used Market Edge (€650/month) to monitor competitors and identify distributors still listing available stock.",
      "They sourced the remaining units, added a 5% margin, and fulfilled the order.",
      "Long-term impact: the client became a recurring customer, generating ~€200,000/year in additional purchases.",
    ],
    bullets: [
      "Identified remaining stock across the market",
      "Fulfilled an 'impossible' order with proof",
      "Kept a positive margin (+5%)",
      "Converted urgency into long-term revenue",
    ],
    kpis: [
      { kpi: "€650/mo", label: "Subscription" },
      { kpi: "6", label: "Competitors" },
      { kpi: "~€200k", label: "Revenue / year" },
    ],
  },
  {
    category: "Procurement",
    title: "Smarter Procurement – Avoiding a Low-Margin Order",
    outcome:
      "Avoided a low-margin €78k order by focusing on products competitors didn't have — resulting in ~€15.6k profit.",
    paragraphs: [
      "A bearing distributor was preparing a large restocking order.",
      "Initial plan: purchase 20 bearing SKUs worth ~€78,000.",
      "Market Edge showed 4 competitors already selling those SKUs at near purchase cost — margin would have been minimal.",
      "They shifted the €78k order toward 15 products competitors lacked — securing ~€15.6k in gross margin.",
    ],
    bullets: [
      "Avoided near-zero-margin inventory",
      "Rebuilt the order around stock gaps",
      "Order value: ~€78,000",
      "Applied margin: ~20% → ~€15,600 gross margin",
    ],
    kpis: [
      { kpi: "€78k", label: "Order value" },
      { kpi: "20%", label: "Margin" },
      { kpi: "€15.6k", label: "Gross margin" },
    ],
  },
];

/* asymmetric bento slots: wide/narrow on a diagonal, dark/white mixed */
const BENTO = [
  { span: "lg:col-span-7", dark: false },
  { span: "lg:col-span-5", dark: true },
  { span: "lg:col-span-5", dark: true },
  { span: "lg:col-span-7", dark: false },
];

/* aggregate proof points for the hero, drawn from the studies above */
const PROOF = [
  { big: "+€27.4k", small: "monthly margin recovered (FMCG)" },
  { big: "~€200k", small: "yearly revenue from one saved order" },
  { big: "25–30h", small: "executive hours saved per month" },
];

export default function CaseStudiesContent() {
  return (
    <main>
      {/* ---------- dark hero, consistent with the homepage ---------- */}
      <div className="relative bg-[#0b0b26] text-white overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(79,70,229,0.25),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 md:pt-24 text-center">
          <p className="text-xs md:text-sm uppercase tracking-widest text-indigo-300/80 mb-4">
            Case studies
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl md:text-6xl font-extrabold leading-tight [text-wrap:balance]">
            Proof,{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              not promises
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-slate-300">
            Real scenarios with real numbers — margin recovered, MAP enforced,
            orders saved and better procurement decisions.
          </p>

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {PROOF.map((s) => (
              <div key={s.big}>
                <p className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-fuchsia-400 to-indigo-300 bg-clip-text text-transparent">
                  {s.big}
                </p>
                <p className="mt-1 text-xs md:text-sm text-slate-400">{s.small}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- studies: asymmetric bento, dark/white mix ---------- */}
      <div className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-6 lg:grid-cols-12 items-stretch">
            {STUDIES.map((s, i) => {
              const slot = BENTO[i % BENTO.length];
              return (
                <div key={s.title} className={slot.span}>
                  <CaseCard study={s} dark={slot.dark} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---------- CTA, same treatment as the homepage ---------- */}
      <div className="mx-auto max-w-7xl px-4 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-[#0b0b26] text-white p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(70%_100%_at_80%_0%,rgba(217,70,239,0.25),transparent_60%),radial-gradient(70%_100%_at_10%_100%,rgba(79,70,229,0.3),transparent_60%)]"
          />
          <div className="relative">
            <h2 className="text-2xl md:text-4xl font-extrabold [text-wrap:balance]">
              Want your numbers on a card?
            </h2>
            <p className="text-slate-300 mt-2 max-w-xl">
              Share your SKU count and competitors, and we&apos;ll model a
              realistic scenario for your market.
            </p>
          </div>
          <div className="relative flex gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
            >
              Book a demo
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/#pricing"
              className="rounded-2xl px-5 py-3 border border-white/30 text-white font-semibold hover:bg-white/10 transition"
            >
              See pricing
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function CaseCard({ study, dark = false }: { study: Study; dark?: boolean }) {
  const cat = CAT[study.category];
  const Icon = cat.Icon;
  const lead = study.paragraphs?.[0] ?? "";
  const rest = study.paragraphs?.slice(1) ?? [];

  return (
    <article
      className={
        dark
          ? "relative h-full overflow-hidden rounded-3xl bg-[#0b0b26] text-white p-7 shadow-lg"
          : "h-full rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5 hover:shadow-lg transition"
      }
    >
      {dark && (
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_0%,rgba(79,70,229,0.28),transparent_65%)]"
        />
      )}
      <div className={dark ? "relative" : undefined}>
        {/* header */}
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${
              dark ? "bg-white/10 text-indigo-300" : cat.iconTile
            }`}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1 ${
              dark ? "bg-white/10 text-slate-200 ring-white/15" : cat.chip
            }`}
          >
            {cat.badge}
          </span>
        </div>

        <h2 className="mt-4 text-xl md:text-2xl font-extrabold leading-snug">
          {study.title}
        </h2>
        {study.subtitle && (
          <p className={`mt-1 text-sm ${dark ? "text-slate-400" : "text-neutral-500"}`}>
            {study.subtitle}
          </p>
        )}

        {/* outcome */}
        <p
          className={`mt-4 rounded-2xl px-4 py-3 text-sm font-semibold leading-relaxed ${
            dark
              ? "bg-white/[0.07] ring-1 ring-white/10 text-white"
              : "bg-gradient-to-r from-fuchsia-50 to-indigo-50 text-neutral-900"
          }`}
        >
          {study.outcome}
        </p>

        {/* KPI tiles */}
        {study.kpis?.length ? (
          <div className="mt-5 grid grid-cols-3 gap-2">
            {study.kpis.slice(0, 3).map((k) => (
              <div
                key={k.label}
                className={`rounded-xl px-3 py-2 ${dark ? "bg-white/5" : "bg-slate-50"}`}
              >
                <p
                  className={`text-base md:text-lg font-extrabold leading-tight ${
                    dark
                      ? "bg-gradient-to-r from-fuchsia-400 to-indigo-300 bg-clip-text text-transparent"
                      : "text-neutral-900"
                  }`}
                >
                  {k.kpi}
                </p>
                <p
                  className={`mt-0.5 text-[10px] uppercase tracking-wide font-semibold ${
                    dark ? "text-slate-400" : "text-neutral-400"
                  }`}
                >
                  {k.label}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        {lead && (
          <p className={`mt-5 text-sm leading-relaxed ${dark ? "text-slate-300" : "text-neutral-600"}`}>
            {lead}
          </p>
        )}

        {/* what happened */}
        {study.bullets?.length ? (
          <ul className="mt-4 space-y-2 text-sm">
            {study.bullets.map((b) => (
              <li
                key={b}
                className={`flex items-start gap-2.5 ${dark ? "text-slate-200" : "text-neutral-700"}`}
              >
                <Check
                  className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? "text-emerald-400" : "text-emerald-600"}`}
                  aria-hidden
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {rest.length > 0 && (
          <details className="mt-5 group">
            <summary
              className={`cursor-pointer list-none text-sm font-semibold transition [&::-webkit-details-marker]:hidden ${
                dark
                  ? "text-indigo-300 hover:text-white"
                  : "text-indigo-600 hover:text-indigo-800"
              }`}
            >
              Read full story{" "}
              <span className="inline-block transition-transform group-open:rotate-90">
                ›
              </span>
            </summary>
            <div
              className={`mt-3 space-y-3 text-sm leading-relaxed ${
                dark ? "text-slate-300" : "text-neutral-600"
              }`}
            >
              {rest.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </details>
        )}
      </div>
    </article>
  );
}
