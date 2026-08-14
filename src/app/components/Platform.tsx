// src/app/components/Platform.tsx
"use client";
import { useRef, useState } from "react";
import { Reveal } from "./ui/Reveal";
import {
  Tags,
  PackageSearch,
  Radar,
  BellRing,
  Globe2,
  Sparkles,
  ArrowRight,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

/* categorical palette validated for CVD safety & contrast (dataviz checks) */
const C = {
  indigo: "#4338ca",
  pink: "#db2777",
  emerald: "#047857",
  amber: "#b45309",
  grid: "#eef0f4",
  tick: "#9ca3af",
};

/* ---------------------------------------------------------------------------
 * Deterministic data generation (seeded, so SSR and client render the same)
 * ------------------------------------------------------------------------- */

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** price-index-like series: holds a level, occasionally re-prices in a step */
function makeStepSeries(
  seed: number,
  n: number,
  start: number,
  { jumpProb = 0.09, jumpScale = 2.2, min = 88, max = 110 } = {}
) {
  const rnd = mulberry32(seed);
  const out: number[] = [];
  let level = start;
  for (let i = 0; i < n; i++) {
    if (rnd() < jumpProb) {
      level += (rnd() - 0.5) * 2 * jumpScale;
      level = Math.min(max, Math.max(min, level));
    }
    // tiny observation noise so flat stretches aren't perfectly sterile
    out.push(Math.round((level + (rnd() - 0.5) * 0.18) * 10) / 10);
  }
  return out;
}

const DAYS = 90;
/* fixed range ending today-ish (Aug 2026) — static so SSR/client agree */
const DATE_LABELS = (() => {
  const start = new Date("2026-05-15T00:00:00Z");
  return Array.from({ length: DAYS }, (_, i) => {
    const d = new Date(start.getTime() + i * 86400000);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
  });
})();
const MONTH_TICKS = [
  { i: 0, label: "May 15" },
  { i: 17, label: "Jun 1" },
  { i: 47, label: "Jul 1" },
  { i: 78, label: "Aug 1" },
];

const PRICE_SERIES = [
  { name: "Your brand", color: C.indigo, values: makeStepSeries(7, DAYS, 99.4, { jumpProb: 0.07 }) },
  { name: "Competitor A", color: C.pink, values: makeStepSeries(23, DAYS, 101.8) },
  { name: "Competitor B", color: C.emerald, values: makeStepSeries(41, DAYS, 97.2, { jumpProb: 0.12 }) },
];

/* category median with one dramatic repricing event for the alerts story */
const TREND_SERIES = (() => {
  const base = makeStepSeries(11, DAYS, 100, { jumpProb: 0.05, jumpScale: 1.2 });
  return base.map((v, i) => (i >= 58 ? Math.round((v - 6.4) * 10) / 10 : v));
})();

/* ---------------------------------------------------------------------------
 * LineChart — stepped series, axes, reference line, hover crosshair + tooltip
 * ------------------------------------------------------------------------- */

const PLOT = { w: 720, h: 240, l: 40, r: 14, t: 14, b: 26 };

type Series = { name: string; color: string; values: number[] };

function LineChart({
  series,
  yTicks,
  refY,
  refLabel,
  markers = [],
  ariaLabel,
}: {
  series: Series[];
  yTicks: number[];
  refY?: number;
  refLabel?: string;
  markers?: { i: number; label: string }[];
  ariaLabel: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  const yMin = yTicks[0];
  const yMax = yTicks[yTicks.length - 1];
  const n = series[0].values.length;
  const x = (i: number) => PLOT.l + (i / (n - 1)) * (PLOT.w - PLOT.l - PLOT.r);
  const y = (v: number) =>
    PLOT.t + (1 - (v - yMin) / (yMax - yMin)) * (PLOT.h - PLOT.t - PLOT.b);

  /* step-after path: hold the level, then jump */
  const stepPath = (vals: number[]) =>
    vals
      .map((v, i) => (i === 0 ? `M${x(0)} ${y(v)}` : `H${x(i)} V${y(v)}`))
      .join(" ");

  const onMove = (e: React.MouseEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * PLOT.w;
    const frac = (px - PLOT.l) / (PLOT.w - PLOT.l - PLOT.r);
    const i = Math.round(frac * (n - 1));
    setHover(i >= 0 && i < n ? i : null);
  };

  const tooltipLeft = hover !== null ? (x(hover) / PLOT.w) * 100 : 0;

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseMove={onMove}
      onMouseLeave={() => setHover(null)}
    >
      <svg viewBox={`0 0 ${PLOT.w} ${PLOT.h}`} className="w-full h-auto" role="img" aria-label={ariaLabel}>
        {/* grid + y ticks */}
        {yTicks.map((v) => (
          <g key={v}>
            <line x1={PLOT.l} y1={y(v)} x2={PLOT.w - PLOT.r} y2={y(v)} stroke={C.grid} strokeWidth="1" />
            <text x={PLOT.l - 6} y={y(v) + 3.5} fontSize="10" fill={C.tick} textAnchor="end">
              {v}
            </text>
          </g>
        ))}
        {/* x ticks */}
        {MONTH_TICKS.map((t) => (
          <text key={t.i} x={x(t.i)} y={PLOT.h - 8} fontSize="10" fill={C.tick} textAnchor="middle">
            {t.label}
          </text>
        ))}
        {/* reference line */}
        {refY !== undefined && (
          <g>
            <line x1={PLOT.l} y1={y(refY)} x2={PLOT.w - PLOT.r} y2={y(refY)} stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
            {refLabel && (
              <text x={PLOT.w - PLOT.r} y={y(refY) - 5} fontSize="10" fill="#64748b" textAnchor="end" fontWeight="600">
                {refLabel}
              </text>
            )}
          </g>
        )}
        {/* series */}
        {series.map((s) => (
          <path key={s.name} d={stepPath(s.values)} fill="none" stroke={s.color} strokeWidth="2" strokeLinejoin="round" />
        ))}
        {/* direct label on primary series */}
        <text
          x={PLOT.w - PLOT.r}
          y={y(series[0].values[n - 1]) - 6}
          fontSize="11"
          fontWeight="700"
          fill="#374151"
          textAnchor="end"
        >
          You · {series[0].values[n - 1].toFixed(1)}
        </text>
        {/* event markers */}
        {markers.map((m) => (
          <g key={m.i}>
            <circle cx={x(m.i)} cy={y(series[0].values[m.i])} r="5" fill={C.amber} stroke="#fff" strokeWidth="2" />
            <rect x={x(m.i) - 46} y={y(series[0].values[m.i]) - 30} width="92" height="18" rx="9" fill="#fef3c7" />
            <text x={x(m.i)} y={y(series[0].values[m.i]) - 17} fontSize="10" fill={C.amber} fontWeight="700" textAnchor="middle">
              {m.label}
            </text>
          </g>
        ))}
        {/* crosshair */}
        {hover !== null && (
          <g>
            <line x1={x(hover)} y1={PLOT.t} x2={x(hover)} y2={PLOT.h - PLOT.b} stroke="#94a3b8" strokeWidth="1" />
            {series.map((s) => (
              <circle key={s.name} cx={x(hover)} cy={y(s.values[hover])} r="3.5" fill={s.color} stroke="#fff" strokeWidth="1.5" />
            ))}
          </g>
        )}
      </svg>

      {/* tooltip */}
      {hover !== null && (
        <div
          className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-lg bg-neutral-900/95 px-3 py-2 text-left shadow-lg"
          style={{ left: `${Math.min(86, Math.max(14, tooltipLeft))}%` }}
        >
          <p className="text-[10px] font-semibold text-slate-300 mb-1">{DATE_LABELS[hover]}</p>
          {series.map((s) => (
            <p key={s.name} className="flex items-center gap-1.5 text-[11px] text-white whitespace-nowrap">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.color }} />
              {s.name}
              <span className="ml-auto pl-3 font-bold">{s.values[hover].toFixed(1)}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function Legend({ series }: { series: Series[] }) {
  return (
    <div className="mt-2 flex flex-wrap gap-4 text-[11px]">
      {series.map((s) => (
        <span key={s.name} className="inline-flex items-center gap-1.5 text-neutral-600">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
          {s.name}
        </span>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * LightFrame — light-mode product screen, same design language as the hero
 * mocks (sidebar + KPI content) but on a white/soft palette.
 * ------------------------------------------------------------------------- */

const FRAME_NAV = [
  "Price intelligence",
  "Stock & assortment",
  "Competitor intelligence",
  "Trends & alerts",
  "Marketplace coverage",
  "AI product matching",
];

function LightFrame({
  active,
  title,
  children,
}: {
  active: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/10 bg-[#fafbfe] flex text-left">
      {/* light sidebar */}
      <div className="hidden sm:flex w-[24%] shrink-0 bg-white border-r border-slate-100 p-3 flex-col">
        <div className="flex items-center gap-1.5 mb-4">
          <span className="grid h-5 w-5 place-items-center rounded-md bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white text-[9px] font-black">
            M
          </span>
          <span className="text-[9px] font-extrabold tracking-wide leading-tight text-neutral-900">
            MARKET
            <br />
            EDGE
          </span>
        </div>
        <ul className="space-y-1">
          {FRAME_NAV.map((n, i) => (
            <li
              key={n}
              className={[
                "rounded-md px-2 py-1.5 text-[8px] font-semibold truncate",
                i === active
                  ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100"
                  : "text-slate-400",
              ].join(" ")}
            >
              {n}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center gap-1.5 pt-3">
          <span className="h-4 w-4 rounded-full bg-gradient-to-tr from-fuchsia-500 to-indigo-500" />
          <span className="text-[8px] text-slate-500 font-semibold">John Smith</span>
        </div>
      </div>

      {/* content */}
      <div className="min-w-0 grow p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-extrabold text-neutral-900">{title}</p>
          <div className="flex items-center gap-1.5">
            <span className="rounded-md bg-white ring-1 ring-black/10 px-2 py-1 text-[8px] text-neutral-600 hidden md:block">
              May 12 – Jun 10, 2026
            </span>
            <span className="rounded-md bg-indigo-600 px-2 py-1 text-[8px] font-semibold text-white">
              Export Report
            </span>
          </div>
        </div>
        <div className="rounded-xl bg-white ring-1 ring-black/5 p-3 grow min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ---------- KPI tile ---------- */

function Kpi({ label, value, note, tone }: { label: string; value: string; note?: string; tone: string }) {
  return (
    <div className={`rounded-xl px-3 py-2 ${tone}`}>
      <p className="text-[10px] uppercase tracking-wide font-semibold opacity-70">{label}</p>
      <p className="text-lg font-extrabold text-neutral-900 leading-tight">{value}</p>
      {note && <p className="text-[10px] text-neutral-500">{note}</p>}
    </div>
  );
}

/* ---------- feature visuals ---------- */

function PriceViz() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <Kpi label="Price index" value={PRICE_SERIES[0].values[DAYS - 1].toFixed(1)} note="market = 100" tone="bg-indigo-50/70" />
        <Kpi label="Cheaper on" value="61%" note="of tracked SKUs" tone="bg-emerald-50/70" />
        <Kpi label="Repricing events" value="23" note="detected today" tone="bg-fuchsia-50/70" />
      </div>
      <LineChart
        series={PRICE_SERIES}
        yTicks={[92, 96, 100, 104, 108]}
        refY={100}
        refLabel="market median"
        ariaLabel="Price index of your brand versus two competitors over the last 90 days"
      />
      <Legend series={PRICE_SERIES} />
    </div>
  );
}

function StockViz() {
  const rows = [
    { name: "Your brand", pct: 96.4 },
    { name: "Competitor A", pct: 84.9 },
    { name: "Competitor B", pct: 73.2 },
    { name: "Competitor C", pct: 61.7 },
  ];
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <Kpi label="In-stock rate" value="96.4%" note="your catalog, today" tone="bg-indigo-50/70" />
        <Kpi label="Competitor OOS" value="37 SKUs" note="you can win today" tone="bg-amber-50/70" />
        <Kpi label="Assortment gap" value="112" note="products you don't list" tone="bg-fuchsia-50/70" />
      </div>
      <ul className="space-y-4">
        {rows.map((r, i) => (
          <li key={r.name}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-neutral-600">{r.name}</span>
              <span className="font-semibold text-neutral-900">{r.pct.toFixed(1)}%</span>
            </div>
            <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${r.pct}%`, backgroundColor: i === 0 ? C.indigo : "#94a3b8" }} />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 rounded-xl bg-amber-50 px-3 py-2.5 text-xs text-amber-800 font-medium">
        Competitor B went out of stock on 37 SKUs you sell — opportunity to win the buy box.
      </div>
    </div>
  );
}

function CompetitorViz() {
  const sellers = [
    { name: "shop-a.com", products: 1130, share: 90.5, trend: -0.8 },
    { name: "megastore.ro", products: 968, share: 77.6, trend: 1.2 },
    { name: "pricebeat.de", products: 611, share: 49.0, trend: 0.4 },
    { name: "newseller.io", products: 122, share: 9.8, trend: 9.8, isNew: true },
  ];
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <Kpi label="Sellers tracked" value="14" note="across 6 channels" tone="bg-indigo-50/70" />
        <Kpi label="Matched products" value="93.1%" note="AI product matching" tone="bg-emerald-50/70" />
        <Kpi label="New sellers" value="2" note="entered this month" tone="bg-fuchsia-50/70" />
      </div>
      <ul className="divide-y divide-gray-100">
        {sellers.map((s) => (
          <li key={s.name} className="flex items-center gap-3 py-2.5 text-xs">
            <span className="w-28 truncate font-semibold text-neutral-800">{s.name}</span>
            {s.isNew ? (
              <span className="rounded-md bg-fuchsia-50 px-1.5 py-0.5 text-[10px] font-bold text-fuchsia-700">NEW</span>
            ) : (
              <span
                className={`inline-flex items-center gap-0.5 text-[10px] font-semibold ${
                  s.trend >= 0 ? "text-emerald-700" : "text-rose-600"
                }`}
              >
                {s.trend >= 0 ? <TrendingUp className="h-3 w-3" aria-hidden /> : <TrendingDown className="h-3 w-3" aria-hidden />}
                {s.trend >= 0 ? "+" : ""}
                {s.trend.toFixed(1)} pts
              </span>
            )}
            <span className="ml-auto text-neutral-500">{s.products.toLocaleString("en-US")} products</span>
            <div className="w-28 h-2.5 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${s.share}%`, backgroundColor: C.indigo }} />
            </div>
            <span className="w-12 text-right font-semibold text-neutral-900">{s.share.toFixed(1)}%</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] text-neutral-400">
        Catalog overlap = share of your 1,248 tracked SKUs the seller also lists.
      </p>
    </div>
  );
}

function TrendsViz() {
  const alerts = [
    { t: "Category median dropped 6.4% — repricing wave detected", when: "Jul 12" },
    { t: "Competitor A cut prices on 14 SKUs", when: "2h ago" },
    { t: "New seller entered: techdeals.ro", when: "Yesterday" },
  ];
  const series = [{ name: "Category median price index", color: C.amber, values: TREND_SERIES }];
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <Kpi label="Alerts sent" value="46" note="last 7 days" tone="bg-amber-50/70" />
        <Kpi label="Price moves" value="312" note="detected this week" tone="bg-indigo-50/70" />
        <Kpi label="Reaction time" value="< 1h" note="from change to alert" tone="bg-emerald-50/70" />
      </div>
      <LineChart
        series={series}
        yTicks={[90, 94, 98, 102]}
        markers={[{ i: 58, label: "−6.4% alert" }]}
        ariaLabel="Category median price index over the last 90 days with a repricing alert on July 12"
      />
      <ul className="mt-3 divide-y divide-gray-100 text-xs">
        {alerts.map((a) => (
          <li key={a.t} className="flex items-center gap-2 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 shrink-0" />
            <span className="text-neutral-700">{a.t}</span>
            <span className="ml-auto text-neutral-400 whitespace-nowrap">{a.when}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CoverageViz() {
  const channels = [
    { name: "Amazon", pct: 92.3, skus: 1152 },
    { name: "eMAG", pct: 88.1, skus: 1099 },
    { name: "eBay", pct: 70.8, skus: 883 },
    { name: "idealo", pct: 63.5, skus: 792 },
    { name: "Direct websites", pct: 97.2, skus: 1213 },
  ];
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <Kpi label="Channels" value="12" note="marketplaces + web" tone="bg-indigo-50/70" />
        <Kpi label="Countries" value="8" note="and growing" tone="bg-emerald-50/70" />
        <Kpi label="Refresh" value="Near real-time" note="price & stock" tone="bg-fuchsia-50/70" />
      </div>
      <ul className="space-y-4">
        {channels.map((r) => (
          <li key={r.name}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-neutral-600">{r.name}</span>
              <span className="text-neutral-400">
                {r.skus.toLocaleString("en-US")} SKUs ·{" "}
                <span className="font-semibold text-neutral-900">{r.pct.toFixed(1)}%</span>
              </span>
            </div>
            <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${r.pct}%`, backgroundColor: C.indigo }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MatchingViz() {
  const dots = Array.from({ length: 60 }, (_, i) => i);
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <Kpi label="Auto-matched" value="1,163" note="93.1% of catalog" tone="bg-emerald-50/70" />
        <Kpi label="In review" value="58" note="human-in-the-loop" tone="bg-amber-50/70" />
        <Kpi label="Unmatched" value="27" note="new / EOL products" tone="bg-fuchsia-50/70" />
      </div>
      <svg viewBox="0 0 720 200" className="w-full h-auto" role="img" aria-label="Product matching status: 1163 auto-matched, 58 in review, 27 unmatched">
        {dots.map((i) => {
          const x = 30 + (i % 15) * 47;
          const y = 30 + Math.floor(i / 15) * 46;
          const fill = i < 56 ? C.emerald : i < 59 ? C.amber : "#e5e7eb";
          return <circle key={i} cx={x} cy={y} r="12" fill={fill} />;
        })}
      </svg>
      <div className="mt-2 flex flex-wrap gap-4 text-[11px]">
        <span className="inline-flex items-center gap-1.5 text-neutral-600"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: C.emerald }} />Matched · each dot ≈ 21 products</span>
        <span className="inline-flex items-center gap-1.5 text-neutral-600"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: C.amber }} />In review</span>
        <span className="inline-flex items-center gap-1.5 text-neutral-600"><span className="h-2 w-2 rounded-full bg-gray-200" />Unmatched</span>
      </div>
    </div>
  );
}

/* ---------- features ---------- */

const FEATURES = [
  {
    key: "price",
    title: "Price intelligence",
    icon: Tags,
    tile: "bg-indigo-100 text-indigo-700",
    desc: "Track competitor prices across resellers, retailers and marketplaces in near real time — per SKU, per channel. Know exactly where you stand vs. the market and get repricing signals you can act on.",
    Viz: PriceViz,
  },
  {
    key: "stock",
    title: "Stock & assortment",
    icon: PackageSearch,
    tile: "bg-emerald-100 text-emerald-700",
    desc: "Monitor availability and catalog coverage across the market. Spot competitor out-of-stocks you can win and assortment gaps worth filling.",
    Viz: StockViz,
  },
  {
    key: "competitors",
    title: "Competitor intelligence",
    icon: Radar,
    tile: "bg-fuchsia-100 text-fuchsia-700",
    desc: "Know who sells your products, where, and how they position them. See new sellers the moment they enter your market.",
    Viz: CompetitorViz,
  },
  {
    key: "trends",
    title: "Trends & alerts",
    icon: BellRing,
    tile: "bg-amber-100 text-amber-700",
    desc: "Get alerted the moment prices move or the market shifts. Understand trends over time instead of reacting to snapshots.",
    Viz: TrendsViz,
  },
  {
    key: "coverage",
    title: "Marketplace coverage",
    icon: Globe2,
    tile: "bg-sky-100 text-sky-700",
    desc: "Major marketplaces plus any website — one platform for your whole market, across countries and channels.",
    Viz: CoverageViz,
  },
  {
    key: "matching",
    title: "AI product matching",
    icon: Sparkles,
    tile: "bg-purple-100 text-purple-700",
    desc: "AI-based matching keeps your market picture clean and complete — the same product recognized across every seller and channel.",
    Viz: MatchingViz,
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
  const Viz = feature.Viz;

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
            Market Edge combines competitor price tracking with stock,
            assortment and trend intelligence — pick a capability to see it in
            action.
          </p>
        </div>

        {/* feature selector strip (Similarweb-style icon tiles) */}
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
                  {f.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* big feature panel */}
        <Reveal
          key={feature.key}
          mode="mount"
          y={10}
          className="mt-6 rounded-3xl bg-white shadow-xl ring-1 ring-black/5 overflow-hidden"
        >
          <div className="grid lg:grid-cols-[1fr_1.8fr] gap-8 p-6 md:p-10 items-center">
            <div className="text-left">
              <h3 className="text-2xl font-extrabold">{feature.title}</h3>
              <p className="mt-3 text-neutral-600">{feature.desc}</p>
              <a
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white text-sm font-semibold hover:opacity-90 transition"
              >
                Learn more
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
            <div className="min-w-0">
              <LightFrame active={active} title={feature.title}>
                <Viz />
              </LightFrame>
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
