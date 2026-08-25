// src/app/components/Hero.tsx
"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./ui/Reveal";

/* ---------------------------------------------------------------------------
 * Hero — dark navy stage, centered headline, and a semi-arc snap carousel of
 * product screens: 3 real dashboard shots + 2 HTML mocks in the same style.
 * ------------------------------------------------------------------------- */

/* categorical palette validated for CVD safety & contrast (dataviz checks) */
const C = {
  indigo: "#4338ca",
  pink: "#db2777",
  emerald: "#047857",
  amber: "#b45309",
};

const LINES = [
  {
    color: "#6366f1",
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

function TrendChart() {
  return (
    <svg viewBox="0 0 600 180" className="w-full h-auto" aria-hidden>
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

/* stepped price series for the Price Intelligence mock */
function StepChart() {
  return (
    <svg viewBox="0 0 600 170" className="w-full h-auto" aria-hidden>
      {[30, 65, 100, 135].map((y) => (
        <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#e5e7eb" strokeWidth="1" />
      ))}
      <line x1="0" y1="82" x2="600" y2="82" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
      <path
        d="M0 96 H70 V104 H150 V98 H230 V112 H320 V106 H420 V118 H600"
        fill="none"
        stroke={C.pink}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M0 70 H60 V78 H140 V72 H240 V60 H340 V66 H450 V52 H600"
        fill="none"
        stroke="#6366f1"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="600" cy="52" r="4.5" fill="#6366f1" stroke="#fff" strokeWidth="2" />
    </svg>
  );
}

/* ---------- app-frame chrome shared by the two generated screens ---------- */

const NAV = [
  "Dashboard",
  "Price Intelligence",
  "Assortment Intelligence",
  "Competitive Intelligence",
  "Opportunity Intelligence",
];

function AppFrame({
  active,
  title,
  subtitle,
  children,
}: {
  active: number;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="aspect-[3/2] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10 bg-[#f7f8fb] flex text-left">
      {/* sidebar */}
      <div className="w-[23%] shrink-0 bg-[#10121f] text-white p-3 flex flex-col">
        <div className="flex items-center gap-1.5 mb-4">
          <Image
            src="/marketedge-icon.svg"
            alt=""
            width={18}
            height={18}
            className="rounded"
          />
          <span className="text-[9px] font-extrabold tracking-wide leading-tight">
            MARKET
            <br />
            EDGE
          </span>
        </div>
        <ul className="space-y-1">
          {NAV.map((n, i) => (
            <li
              key={n}
              className={[
                "rounded-md px-2 py-1.5 text-[8px] font-semibold truncate",
                i === active ? "bg-indigo-600 text-white" : "text-slate-400",
              ].join(" ")}
            >
              {n}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center gap-1.5">
          <span className="h-4 w-4 rounded-full bg-gradient-to-tr from-fuchsia-500 to-indigo-500" />
          <span className="text-[8px] text-slate-300 font-semibold">John Smith</span>
        </div>
      </div>

      {/* content */}
      <div className="min-w-0 grow p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-extrabold text-neutral-900 leading-tight">
              {title}
            </p>
            <p className="text-[8px] text-neutral-500">{subtitle}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="rounded-md bg-white ring-1 ring-black/10 px-2 py-1 text-[8px] text-neutral-600">
              May 12 – Jun 10, 2026
            </span>
            <span className="rounded-md bg-indigo-600 px-2 py-1 text-[8px] font-semibold text-white">
              Export Report
            </span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

function Kpi({ label, value, note, accent }: { label: string; value: string; note: string; accent?: string }) {
  return (
    <div className="rounded-lg bg-white ring-1 ring-black/5 px-2 py-1.5 min-w-0">
      <p className="text-[7px] uppercase tracking-wide text-neutral-400 font-semibold truncate">{label}</p>
      <p className="text-[12px] font-extrabold text-neutral-900 leading-tight">{value}</p>
      <p className={`text-[7px] truncate ${accent ?? "text-neutral-400"}`}>{note}</p>
    </div>
  );
}

function Panel({ title, right, children }: { title: string; right?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-white ring-1 ring-black/5 p-2 min-w-0 grow flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[9px] font-bold text-neutral-900">{title}</p>
        {right && <p className="text-[7px] text-neutral-400">{right}</p>}
      </div>
      {children}
    </div>
  );
}

/* ---------- generated screen 1: Dashboard ---------- */

function DashboardMock() {
  const competitors = [
    { name: "Your brand", share: "28.4%", color: "#6366f1" },
    { name: "TechData", share: "24.1%", color: C.pink },
    { name: "Ingram Micro", share: "17.6%", color: C.emerald },
  ];
  return (
    <AppFrame
      active={0}
      title="Dashboard"
      subtitle="Your whole market at a glance."
    >
      <div className="grid grid-cols-4 gap-1.5">
        <Kpi label="Products in Market" value="45,892" note="Total unique products" />
        <Kpi label="Your Products" value="12,435" note="In your catalog" />
        <Kpi label="Price Position" value="96.8" note="vs market = 100" accent="text-emerald-600" />
        <Kpi label="High Impact Alerts" value="9" note="Requires attention" accent="text-rose-500" />
      </div>
      <div className="flex gap-1.5 grow min-h-0">
        <Panel title="Market Share Trend" right="Last 90 days">
          <TrendChart />
          <div className="mt-1 flex gap-2.5">
            {competitors.map((c) => (
              <span key={c.name} className="inline-flex items-center gap-1 text-[7px] text-neutral-600">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.color }} />
                {c.name} <b className="text-neutral-900">{c.share}</b>
              </span>
            ))}
          </div>
        </Panel>
        <div className="w-[38%] shrink-0 flex flex-col gap-1.5">
          <Panel title="Competitor Activity" right="Today">
            <ul className="space-y-1">
              {[
                ["TechData added 23 new products", "2h ago"],
                ["Ingram Micro repriced 142 SKUs", "5h ago"],
                ["Westcoast launched campaign", "1d ago"],
              ].map(([t, w]) => (
                <li key={t} className="flex items-start gap-1 text-[7.5px] text-neutral-600">
                  <span className="mt-0.5 h-1 w-1 rounded-full bg-indigo-600 shrink-0" />
                  <span className="truncate">{t}</span>
                  <span className="ml-auto text-neutral-400 whitespace-nowrap">{w}</span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Revenue Opportunity">
            <p className="text-[13px] font-extrabold text-indigo-600 leading-none">€1.24M</p>
            <p className="text-[7px] text-neutral-400">142 opportunities identified</p>
          </Panel>
        </div>
      </div>
    </AppFrame>
  );
}

/* ---------- generated screen 2: Price Intelligence ---------- */

function PriceMock() {
  const rows = [
    { ch: "TechData", idx: "101.2", up: true },
    { ch: "Ingram Micro", idx: "98.4", up: false },
    { ch: "Also Group", idx: "97.1", up: false },
  ];
  return (
    <AppFrame
      active={1}
      title="Price Intelligence"
      subtitle="Know exactly where you stand vs. the market."
    >
      <div className="grid grid-cols-4 gap-1.5">
        <Kpi label="Price Index" value="96.8" note="market = 100" accent="text-emerald-600" />
        <Kpi label="Cheaper On" value="61%" note="of tracked SKUs" />
        <Kpi label="Repricing Events" value="23" note="detected today" accent="text-amber-600" />
        <Kpi label="MAP Violations" value="3" note="needs review" accent="text-rose-500" />
      </div>
      <div className="flex gap-1.5 grow min-h-0">
        <Panel title="Price Index vs Market" right="Last 90 days · dashed = median">
          <StepChart />
          <div className="mt-1 flex gap-2.5 text-[7px] text-neutral-600">
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> You · 96.8
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: C.pink }} /> Market avg
            </span>
          </div>
        </Panel>
        <div className="w-[38%] shrink-0">
          <Panel title="Competitor Price Index" right="vs you">
            <ul className="divide-y divide-gray-100">
              {rows.map((r) => (
                <li key={r.ch} className="flex items-center justify-between py-1 text-[8px]">
                  <span className="text-neutral-600 truncate">{r.ch}</span>
                  <span className={`font-bold ${r.up ? "text-rose-500" : "text-emerald-600"}`}>
                    {r.idx}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-1.5 rounded-md bg-amber-50 px-1.5 py-1 text-[7px] text-amber-800 font-medium">
              Ingram Micro dropped prices on 142 SKUs (avg. −3.2%)
            </div>
          </Panel>
        </div>
      </div>
    </AppFrame>
  );
}

/* ---------- real screenshots ---------- */

function ShotSlide({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="aspect-[3/2] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10 bg-white">
      <Image
        src={src}
        alt={alt}
        width={1536}
        height={1024}
        sizes="(max-width: 768px) 88vw, 660px"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

/* ---------- carousel ---------- */

const SLIDES = [
  {
    key: "price",
    label: "Price intelligence",
    Card: PriceMock,
  },
  {
    key: "assortment",
    label: "Assortment intelligence",
    Card: () => (
      <ShotSlide
        src="/dash-assortment.png"
        alt="Market Edge Assortment Intelligence dashboard: product gaps, brand gaps, category coverage and opportunity engine"
      />
    ),
  },
  {
    key: "competitive",
    label: "Competitive intelligence",
    Card: () => (
      <ShotSlide
        src="/dash-competitive.png"
        alt="Market Edge Competitive Intelligence dashboard: competitor activity feed, product launches, marketing activity and reviews"
      />
    ),
  },
  {
    key: "dashboard",
    label: "Dashboard",
    Card: DashboardMock,
  },
  {
    key: "opportunity",
    label: "Opportunity intelligence",
    Card: () => (
      <ShotSlide
        src="/dash-opportunity.png"
        alt="Market Edge Opportunity Intelligence dashboard: opportunity pipeline, revenue potential and recommended actions"
      />
    ),
  },
];

/* Competitive intelligence sits in the middle and is selected at launch */
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
        aria-label="Market Edge product screens"
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

        {/* --------- product screens carousel --------- */}
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
