// src/app/components/Hero.tsx
"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "./ui/Reveal";
import {
  TrendingDown,
  TrendingUp,
  ArrowRight,
  Globe2,
  BarChart3,
  Search,
  PackageSearch,
  BellRing,
} from "lucide-react";

/* ---------------------------------------------------------------------------
 * Hero — Similarweb-style: dark navy stage, centered headline, and a big
 * snap-scrolling carousel of dashboard cards (center in focus, sides faded).
 * ------------------------------------------------------------------------- */

/* categorical palette validated for CVD safety & contrast (dataviz checks) */
const C = {
  indigo: "#4338ca",
  pink: "#db2777",
  emerald: "#047857",
  amber: "#b45309",
};

const COMPETITORS = [
  { name: "Your brand", share: "28%", color: C.indigo },
  { name: "Competitor A", share: "24%", color: C.pink },
  { name: "Competitor B", share: "17%", color: C.emerald },
  { name: "Competitor C", share: "12%", color: C.amber },
];

const PRICE_MOVES = [
  { sku: "Wireless Headset X2", store: "amazon.com", delta: -6, price: "$74.99" },
  { sku: "Ergo Chair Pro", store: "wayfair.com", delta: +4, price: "$289.00" },
  { sku: "4K Action Cam", store: "bestbuy.com", delta: -3, price: "$189.50" },
  { sku: "Smart Scale S", store: "walmart.com", delta: -8, price: "$39.99" },
];

const LINES = [
  {
    color: C.indigo,
    points:
      "0,118 50,110 100,116 150,98 200,104 250,88 300,95 350,78 400,84 450,66 500,72 550,58 600,62",
  },
  {
    color: C.pink,
    points:
      "0,96 50,104 100,92 150,108 200,96 250,112 300,102 350,116 400,104 450,118 500,108 550,122 600,114",
  },
  {
    color: C.emerald,
    points:
      "0,150 50,142 100,152 150,138 200,146 250,132 300,142 350,128 400,138 450,124 500,134 550,120 600,128",
  },
];

/* ---------- small building blocks ---------- */

function WindowDots() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full bg-rose-400/80" />
      <span className="h-2 w-2 rounded-full bg-amber-400/80" />
      <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
    </div>
  );
}

function CardChrome({
  icon,
  label,
  children,
}: {
  icon?: React.ReactNode;
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="h-full rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 overflow-hidden text-left flex flex-col">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 bg-gray-50/80 shrink-0">
        <WindowDots />
        <span className="inline-flex items-center gap-1.5 text-[11px] text-neutral-500">
          {icon}
          {label}
        </span>
        <span className="rounded-md bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold text-white">
          Live
        </span>
      </div>
      <div className="p-4 sm:p-5 grow">{children}</div>
    </div>
  );
}

function TrendChart() {
  return (
    <svg
      viewBox="0 0 600 180"
      className="w-full h-auto"
      role="img"
      aria-label="Market share trend of your brand versus three competitors"
    >
      {[30, 70, 110, 150].map((y) => (
        <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#e5e7eb" strokeWidth="1" />
      ))}
      {LINES.map((l) => (
        <polyline
          key={l.color}
          points={l.points}
          fill="none"
          stroke={l.color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

function AreaChart() {
  return (
    <svg viewBox="0 0 560 150" className="w-full h-auto" aria-hidden>
      <defs>
        <linearGradient id="me-hero-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.indigo} stopOpacity="0.35" />
          <stop offset="100%" stopColor={C.indigo} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[40, 80, 120].map((y) => (
        <line key={y} x1="0" y1={y} x2="560" y2={y} stroke="#e5e7eb" strokeWidth="1" />
      ))}
      <polygon
        points="0,108 70,96 140,102 210,78 280,84 350,62 420,68 490,50 560,44 560,150 0,150"
        fill="url(#me-hero-area)"
      />
      <polyline
        points="0,108 70,96 140,102 210,78 280,84 350,62 420,68 490,50 560,44"
        fill="none"
        stroke={C.indigo}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="560" cy="44" r="4.5" fill={C.indigo} stroke="#fff" strokeWidth="2" />
    </svg>
  );
}

/* ---------- carousel cards ---------- */

function MarketOverviewCard() {
  return (
    <CardChrome
      icon={<Search className="h-3 w-3" aria-hidden />}
      label={
        <>
          <span className="font-medium text-neutral-700">yourbrand.com</span>
          <span className="text-neutral-300">|</span>
          <span>vs. 3 competitors</span>
        </>
      }
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-neutral-900">Market Overview</h3>
        <span className="text-[11px] text-neutral-400">Last 30 days · All channels</span>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
        <div className="rounded-xl bg-indigo-50/70 px-3 py-2">
          <p className="text-[10px] uppercase tracking-wide text-indigo-600 font-semibold">
            Market share
          </p>
          <p className="text-lg font-extrabold text-neutral-900 leading-tight">28.4%</p>
          <p className="text-[10px] font-semibold text-emerald-700">▲ 2.1 pts</p>
        </div>
        <div className="rounded-xl bg-fuchsia-50/70 px-3 py-2">
          <p className="text-[10px] uppercase tracking-wide text-fuchsia-600 font-semibold">
            Price position
          </p>
          <p className="text-lg font-extrabold text-neutral-900 leading-tight">−3.2%</p>
          <p className="text-[10px] text-neutral-500">vs. market median</p>
        </div>
        <div className="rounded-xl bg-emerald-50/70 px-3 py-2">
          <p className="text-[10px] uppercase tracking-wide text-emerald-700 font-semibold">
            Coverage
          </p>
          <p className="text-lg font-extrabold text-neutral-900 leading-tight">1,248</p>
          <p className="text-[10px] text-neutral-500">products tracked</p>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto] gap-3 items-center">
        <TrendChart />
        <ul className="space-y-1.5 pr-1">
          {COMPETITORS.map((c) => (
            <li key={c.name} className="flex items-center gap-2 text-[11px]">
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: c.color }}
              />
              <span className="text-neutral-600 whitespace-nowrap">{c.name}</span>
              <span className="ml-auto font-semibold text-neutral-900">{c.share}</span>
            </li>
          ))}
        </ul>
      </div>
    </CardChrome>
  );
}

function PricePositionCard() {
  const rows = [
    { ch: "amazon.com", idx: "94.1", down: true },
    { ch: "ebay.com", idx: "97.6", down: true },
    { ch: "emag.ro", idx: "101.2", down: false },
  ];
  return (
    <CardChrome
      icon={<BarChart3 className="h-3 w-3" aria-hidden />}
      label="Price Position"
    >
      <div className="flex items-end justify-between mb-3">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-neutral-400 font-semibold">
            Avg. price index
          </p>
          <p className="text-2xl font-extrabold text-neutral-900">
            96.8 <span className="text-xs font-semibold text-neutral-400">(market = 100)</span>
          </p>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700">
          cheaper than market
        </span>
      </div>
      <AreaChart />
      <ul className="mt-3 divide-y divide-gray-100 text-[11px]">
        {rows.map((r) => (
          <li key={r.ch} className="flex items-center justify-between py-1.5">
            <span className="text-neutral-600">{r.ch}</span>
            <span
              className={`font-semibold ${r.down ? "text-emerald-700" : "text-rose-600"}`}
            >
              {r.idx}
            </span>
          </li>
        ))}
      </ul>
    </CardChrome>
  );
}

function CompetitorMovesCard() {
  return (
    <CardChrome
      icon={<Globe2 className="h-3 w-3" aria-hidden />}
      label="Competitor Moves"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-neutral-900">Latest price changes</h3>
        <span className="text-[11px] text-neutral-400">Today</span>
      </div>
      <ul className="divide-y divide-gray-100">
        {PRICE_MOVES.map((m) => {
          const down = m.delta < 0;
          return (
            <li key={m.sku} className="flex items-center gap-2 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-neutral-800">{m.sku}</p>
                <p className="text-[11px] text-neutral-400">{m.store}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xs font-semibold text-neutral-900">{m.price}</p>
                <p
                  className={`inline-flex items-center gap-0.5 text-[11px] font-semibold ${
                    down ? "text-rose-600" : "text-emerald-700"
                  }`}
                >
                  {down ? (
                    <TrendingDown className="h-3 w-3" aria-hidden />
                  ) : (
                    <TrendingUp className="h-3 w-3" aria-hidden />
                  )}
                  {down ? "" : "+"}
                  {m.delta}%
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </CardChrome>
  );
}

function StockAssortmentCard() {
  const rows = [
    { name: "Your brand", pct: 96, w: "96%" },
    { name: "Competitor A", pct: 82, w: "82%" },
    { name: "Competitor B", pct: 74, w: "74%" },
    { name: "Competitor C", pct: 61, w: "61%" },
  ];
  return (
    <CardChrome
      icon={<PackageSearch className="h-3 w-3" aria-hidden />}
      label="Stock & Assortment"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-neutral-900">In-stock rate by seller</h3>
        <span className="text-[11px] text-neutral-400">1,248 SKUs</span>
      </div>
      <ul className="space-y-3">
        {rows.map((r, i) => (
          <li key={r.name}>
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-neutral-600">{r.name}</span>
              <span className="font-semibold text-neutral-900">{r.pct}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: r.w, backgroundColor: i === 0 ? C.indigo : "#94a3b8" }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-[11px] text-amber-800 font-medium">
        Competitor B is out of stock on 37 SKUs you sell — opportunity to win the buy box.
      </div>
    </CardChrome>
  );
}

function TrendsAlertsCard() {
  const alerts = [
    { t: "Competitor A dropped prices on 14 SKUs", when: "2h ago", kind: "price" },
    { t: "New seller entered: techdeals.ro", when: "Yesterday", kind: "market" },
    { t: "Your price position improved to 96.8", when: "This week", kind: "trend" },
  ];
  return (
    <CardChrome
      icon={<BellRing className="h-3 w-3" aria-hidden />}
      label="Trends & Alerts"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-neutral-900">Market movement</h3>
        <span className="text-[11px] text-neutral-400">Last 90 days</span>
      </div>
      <svg viewBox="0 0 560 120" className="w-full h-auto" aria-hidden>
        {[30, 60, 90].map((y) => (
          <line key={y} x1="0" y1={y} x2="560" y2={y} stroke="#e5e7eb" strokeWidth="1" />
        ))}
        <polyline
          points="0,70 56,72 112,66 168,70 224,64 280,68 336,38 392,44 448,40 504,46 560,42"
          fill="none"
          stroke={C.amber}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="336" cy="38" r="5" fill={C.amber} stroke="#fff" strokeWidth="2" />
      </svg>
      <ul className="mt-3 divide-y divide-gray-100 text-[11px]">
        {alerts.map((a) => (
          <li key={a.t} className="flex items-center gap-2 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 shrink-0" />
            <span className="text-neutral-700 truncate">{a.t}</span>
            <span className="ml-auto text-neutral-400 whitespace-nowrap">{a.when}</span>
          </li>
        ))}
      </ul>
    </CardChrome>
  );
}

/* ---------- carousel ---------- */

const SLIDES = [
  { key: "price", label: "Price intelligence", Card: PricePositionCard },
  { key: "moves", label: "Competitor moves", Card: CompetitorMovesCard },
  { key: "overview", label: "Market overview", Card: MarketOverviewCard },
  { key: "stock", label: "Stock & assortment", Card: StockAssortmentCard },
  { key: "trends", label: "Trends & alerts", Card: TrendsAlertsCard },
];

/* Market overview sits in the middle and is the selected card at launch */
const INITIAL_SLIDE = 2;

function DashboardCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(INITIAL_SLIDE);
  const userMovedRef = useRef(false);

  /* center the initial card (no animation) on mount, and keep it centered
     across layout/viewport changes until the user takes over */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const markMoved = () => {
      userMovedRef.current = true;
    };
    el.addEventListener("pointerdown", markMoved, { passive: true });
    el.addEventListener("wheel", markMoved, { passive: true });
    el.addEventListener("touchstart", markMoved, { passive: true });

    const center = () => {
      if (userMovedRef.current) return;
      const child = el.children[INITIAL_SLIDE] as HTMLElement | undefined;
      if (!child || el.clientWidth === 0) return;
      el.scrollLeft = child.offsetLeft + child.offsetWidth / 2 - el.clientWidth / 2;
    };
    center();
    const ro = new ResizeObserver(center);
    ro.observe(el);
    return () => {
      ro.disconnect();
      el.removeEventListener("pointerdown", markMoved);
      el.removeEventListener("wheel", markMoved);
      el.removeEventListener("touchstart", markMoved);
    };
  }, []);

  /* keep the highlighted tab in sync with whichever card is centered */
  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const c = child as HTMLElement;
      const mid = c.offsetLeft + c.offsetWidth / 2;
      const d = Math.abs(mid - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const handler = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(onScroll);
    };
    el.addEventListener("scroll", handler, { passive: true });
    return () => {
      el.removeEventListener("scroll", handler);
      cancelAnimationFrame(raf);
    };
  }, [onScroll]);

  const scrollTo = (i: number) => {
    const el = trackRef.current;
    const child = el?.children[i] as HTMLElement | undefined;
    if (!el || !child) return;
    userMovedRef.current = true;
    el.scrollTo({
      left: child.offsetLeft + child.offsetWidth / 2 - el.clientWidth / 2,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* tab pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 px-4">
        {SLIDES.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => scrollTo(i)}
            aria-pressed={active === i}
            className={[
              "rounded-full px-4 py-1.5 text-xs md:text-sm font-semibold transition",
              active === i
                ? "bg-white text-[#0b0b26] shadow"
                : "bg-white/10 text-slate-300 hover:bg-white/20",
            ].join(" ")}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* glow behind the focused card */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 h-[60%] w-[80%] max-w-4xl rounded-[50%] bg-[radial-gradient(closest-side,rgba(99,102,241,0.45),rgba(217,70,239,0.18),transparent)] blur-2xl"
      />

      {/* track — cards fan into a semi-arc around the centered one */}
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Market Edge dashboards"
        className="relative flex gap-6 overflow-x-auto snap-x snap-mandatory pt-4 pb-20 px-[calc(50vw-min(330px,44vw))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SLIDES.map((s, i) => {
          const Card = s.Card;
          const d = i - active; // signed distance from the centered card
          const abs = Math.min(Math.abs(d), 2);
          const arc = [
            "rotate-0 translate-y-0 scale-100 opacity-100",
            d < 0
              ? "-rotate-3 translate-y-6 scale-[0.93] opacity-60"
              : "rotate-3 translate-y-6 scale-[0.93] opacity-60",
            d < 0
              ? "-rotate-6 translate-y-14 scale-[0.87] opacity-30"
              : "rotate-6 translate-y-14 scale-[0.87] opacity-30",
          ][abs];
          return (
            <div key={s.key} className="snap-center shrink-0 w-[min(660px,88vw)]">
              <div
                className={`h-full transition-all duration-500 ease-out origin-bottom ${arc}`}
              >
                <Card />
              </div>
            </div>
          );
        })}
      </div>

      {/* edge fades into the navy stage */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-[#0b0b26] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-[#0b0b26] to-transparent"
      />
    </div>
  );
}

/* ---------- component ---------- */

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0b0b26] text-white">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(79,70,229,0.25),transparent_70%)]"
      />

      <div className="pt-20 md:pt-28 pb-16 md:pb-20 text-center">
        <Reveal mode="mount" y={18} className="mx-auto max-w-7xl px-4">
          <p className="text-xs md:text-sm uppercase tracking-widest text-indigo-300/80 mb-4">
            Market intelligence platform
          </p>

          <h1 className="mx-auto max-w-4xl text-4xl md:text-6xl font-extrabold leading-tight [text-wrap:balance]">
            Win your market with AI‑powered{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              market intelligence
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-slate-300">
            Every competitor, every price move, every market shift — across
            resellers, retailers &amp; marketplaces. One holistic view.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white font-semibold shadow-lg shadow-indigo-900/40 hover:opacity-90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
              href="/contact"
            >
              Start free trial
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              className="rounded-2xl px-6 py-3 border border-white/25 text-white font-semibold hover:bg-white/10 transition"
              href="#pricing"
            >
              View pricing
            </a>
          </div>
        </Reveal>

        {/* --------- dashboard carousel --------- */}
        <Reveal mode="mount" y={40} delay={150} className="relative mt-14 md:mt-16">
          <DashboardCarousel />

          <div className="mt-6">
            <a
              href="#platform"
              className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 bg-white text-[#0b0b26] font-semibold hover:bg-slate-100 transition"
            >
              Learn more
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
