import Link from "next/link";

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
  {
    badge: string;
    icon: string;
    headerGrad: string;
    ring: string; // default ring (already “hover-like”)
    glow: string;
    chipBorder: string;
  }
> = {
  MAP: {
    badge: "MAP",
    icon: "🛡",
    headerGrad: "from-purple-700 via-fuchsia-600 to-indigo-600",
    ring: "ring-purple-500/30",
    glow: "bg-purple-500/25",
    chipBorder: "border-purple-500/20",
  },
  Margin: {
    badge: "Margin",
    icon: "📈",
    headerGrad: "from-emerald-700 via-teal-600 to-cyan-600",
    ring: "ring-emerald-500/30",
    glow: "bg-emerald-500/25",
    chipBorder: "border-emerald-500/20",
  },
  Sourcing: {
    badge: "Sourcing",
    icon: "⚙️",
    headerGrad: "from-amber-700 via-orange-600 to-rose-600",
    ring: "ring-amber-500/30",
    glow: "bg-amber-500/25",
    chipBorder: "border-amber-500/20",
  },
  Procurement: {
    badge: "Procurement",
    icon: "🧾",
    headerGrad: "from-blue-700 via-indigo-600 to-purple-600",
    ring: "ring-blue-500/30",
    glow: "bg-blue-500/25",
    chipBorder: "border-blue-500/20",
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
      { kpi: "6–8h/wk", label: "Manual time" },
      { kpi: "€3,520", label: "Erosion example" },
    ],
  },
  {
    category: "Margin",
    title: "Recovering Hidden Margin – FMCG (14,000 SKUs)",
    subtitle:
      "Fast-moving consumer goods: soap, detergent, toothpaste, household essentials",
    outcome: "Corrected pricing on 480 underperforming products and recovered +€27,400 in monthly margin.",
    paragraphs: [
      "An FMCG distributor managing 14,000 products across 12 competitors assumed pricing was aligned with the market.",
      "With high-volume, low-margin goods, even small pricing gaps matter — but manual checks only covered top sellers.",
    ],
    bullets: [
      "Market Edge revealed 17% of SKUs priced below market average",
      "Underpricing spread across long-tail, high-volume items",
      "Gaps often between 1–4% — invisible individually, significant at scale",
      "After correcting 480 SKUs → +€27,400/month recovered margin",
      "Market Edge Subscription cost: €1,200/month",
      "Small price gaps. Massive portfolio impact.",
    ],
    kpis: [
      { kpi: "14,000", label: "Products" },
      { kpi: "12", label: "Competitors" },
      { kpi: "+€27.4k", label: "/month" },
    ],
  },
  {
    category: "Sourcing",
    title: "Turning Scarcity into Long-Term Revenue",
    outcome:
      "Found rare stock on the market, fulfilled an urgent order, and turned it into a ~€200k/year client.",
    paragraphs: [
      "A bearing distributor received an urgent request: Timken Set 119 — €25/unit, 100 pieces required, no longer in production.",
      "Instead of declining the order, they used Market Edge (€650/month) to monitor competitors and identify distributors still listing available stock.",
      "They sourced the remaining units, added a 5% margin, and fulfilled the order.",
      "Long-term impact: the client became a recurring customer, generating ~€200,000/year in additional purchases.",
    ],
    bullets: [
      "Identified remaining stock across the market",
      "Fulfilled an ‘impossible’ order with proof",
      "Kept a positive margin (+5%)",
      "Converted urgency into long-term revenue",
    ],
    kpis: [
      { kpi: "€650/mo", label: "Subscription" },
      { kpi: "100", label: "Units" },
      { kpi: "~€200k", label: "/year" },
    ],
  },
  {
    category: "Procurement",
    title: "Smarter Procurement – Avoiding a Low-Margin Order",
    outcome:
      "Avoided a low-margin €78k order by focusing on products competitors didn’t have — resulting in ~€15.6k profit.",
    paragraphs: [
      "A bearing distributor was preparing a large restocking order.",
      "Initial plan: purchase 20 bearing SKUs worth ~€78,000.",
      "Market Edge showed 4 competitors already selling those SKUs at near purchase cost — margin would have been minimal.",
      "They shifted toward 15 SKUs competitors lacked in stock.",
    ],
    bullets: [
      "Avoided near-zero-margin inventory",
      "Rebuilt the order around stock gaps",
      "Order value: ~€78,000",
      "Applied margin: ~20% → ~€15,600 gross margin",
    ],
    kpis: [
      { kpi: "€78k", label: "Order" },
      { kpi: "20%", label: "Margin" },
      { kpi: "€15.6k", label: "Gross margin" },
    ],
  },
];

export default function CaseStudiesContent() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16 md:py-20">
      <header className="mb-12 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-4 py-1.5 text-sm font-semibold text-gray-900 shadow-sm backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600" />
          Proof, not promises
        </span>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Case Studies
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
          Distilled stories with real numbers — margin, MAP enforcement,
          sourcing, and procurement decisions.
        </p>
      </header>

      {/* Wrapper */}
      <section className="relative overflow-hidden rounded-[44px] border border-black/5 bg-gradient-to-br from-white via-white to-purple-50/40 p-6 shadow-sm md:p-10">
        <div className="pointer-events-none absolute inset-0 opacity-[0.6]">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-500/15 blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.055)_1px,transparent_1px)] [background-size:18px_18px]" />
        </div>

        {/* Masonry */}
        <div className="relative columns-1 gap-6 md:columns-2">
          {STUDIES.map((s) => (
            <div key={s.title} className="mb-6 break-inside-avoid">
              <CaseCard study={s} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-14 rounded-3xl bg-gradient-to-br from-purple-600 via-fuchsia-600 to-indigo-600 p-10 text-white shadow-xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h3 className="text-3xl font-bold">Want your numbers on a card?</h3>
            <p className="mt-2 text-white/90">
              Share your SKU count + competitors, and we’ll model a realistic
              scenario.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-gray-900 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Book a demo
            </Link>
            <Link
              href="/#pricing"
              className="rounded-xl border border-white/40 px-6 py-3 font-semibold text-white/90 transition hover:bg-white/10"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function CaseCard({ study }: { study: Study }) {
  const style = CAT[study.category];
  const top = study.paragraphs?.[0] ?? "";
  const details = study.paragraphs?.slice(1) ?? [];

  return (
    <article
      className={[
        "relative overflow-hidden rounded-3xl border border-black/10 bg-white/75 shadow-xl backdrop-blur",
        "ring-2",
        style.ring,
      ].join(" ")}
    >
      {/* Header band */}
      <div className={["bg-gradient-to-r px-6 py-4", style.headerGrad].join(" ")}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-lg">{style.icon}</span>
              <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                {style.badge}
              </span>
            </div>

            {/* FIX: no truncate, no ellipsis */}
            <h2 className="mt-2 text-lg font-extrabold leading-snug tracking-tight text-white md:text-xl">
              {study.title}
            </h2>

            {study.subtitle ? (
              <p className="mt-1 line-clamp-2 text-xs text-white/85">
                {study.subtitle}
              </p>
            ) : null}
          </div>

          {/* KPI pills */}
          {study.kpis?.length ? (
            <div className="hidden shrink-0 grid-cols-1 gap-2 md:grid">
              {study.kpis.slice(0, 2).map((k) => (
                <KpiPill key={k.label} kpi={k.kpi} label={k.label} />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* corner glow */}
      <div
        className={[
          "pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-2xl opacity-70",
          style.glow,
        ].join(" ")}
      />

      <div className="relative p-6">
        <p className="rounded-2xl border border-black/5 bg-white px-4 py-3 text-sm font-semibold leading-relaxed text-gray-900 shadow-sm">
          {study.outcome}
        </p>

        {top ? (
          <p className="mt-4 text-sm leading-relaxed text-gray-700">{top}</p>
        ) : null}

        {study.bullets?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {study.bullets.slice(0, 5).map((b) => (
              <span
                key={b}
                className={[
                  "rounded-full border bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm",
                  style.chipBorder,
                ].join(" ")}
              >
                {b}
              </span>
            ))}
          </div>
        ) : null}

        {details.length > 0 ? (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-semibold text-gray-900 hover:text-purple-700">
              Read full story
            </summary>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-700">
              {details.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </details>
        ) : null}

        {/* KPIs (mobile) */}
        {study.kpis?.length ? (
          <div className="mt-5 grid grid-cols-3 gap-2 md:hidden">
            {study.kpis.slice(0, 3).map((k) => (
              <MiniStat key={k.label} kpi={k.kpi} label={k.label} />
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function KpiPill({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div className="rounded-xl bg-white/15 px-3 py-2 text-right">
      <div className="text-sm font-extrabold text-white">{kpi}</div>
      <div className="text-[10px] font-semibold uppercase tracking-wide text-white/85">
        {label}
      </div>
    </div>
  );
}

function MiniStat({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-3 shadow-sm">
      <div className="text-lg font-extrabold text-gray-900">{kpi}</div>
      <div className="mt-1 text-[10px] uppercase tracking-wide text-gray-500">
        {label}
      </div>
    </div>
  );
}