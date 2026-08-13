// src/app/components/UseCases.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import {
  Factory,
  Building2,
  Package,
  ShoppingCart,
  Check,
  ArrowRight,
} from "lucide-react";
import { Reveal } from "./ui/Reveal";

const SEGMENTS = [
  {
    icon: ShoppingCart,
    kicker: "Online retailers",
    title: "Price with confidence. Win the buy box.",
    points: [
      "Track competitor prices & stock in near real time",
      "Reprice where it matters — without giving away margin",
      "Be first to react when a competitor goes out of stock",
    ],
  },
  {
    icon: Factory,
    kicker: "Brands & manufacturers",
    title: "Protect your brand and your channel.",
    points: [
      "Monitor MAP compliance across all resellers",
      "See exactly who sells your products, and where",
      "Benchmark your shelf presence against competitors",
    ],
  },
  {
    icon: Building2,
    kicker: "Distributors",
    title: "Quote sharper. Win more deals.",
    points: [
      "Know the market price for every SKU you quote",
      "Track competing distributors' coverage and stock",
      "Find the gaps where you're the only one in stock",
    ],
  },
  {
    icon: Package,
    kicker: "Importers & sourcing",
    title: "Buy the right products at the right time.",
    points: [
      "Compare reseller prices across markets before you buy",
      "Avoid inventory the market has already commoditized",
      "Build orders around market stock gaps for better margin",
    ],
  },
];

const STEP = 360 / SEGMENTS.length; // 90° per segment
const RADIUS = 150; // px, orbit radius inside the dial

export function UseCases() {
  const [active, setActive] = useState(0);
  /* keep a continuous rotation so the dial always spins the short way forward */
  const [rot, setRot] = useState(0);
  const userTouched = useRef(false);
  const activeRef = useRef(0);
  activeRef.current = active;

  const select = (i: number, fromUser = true) => {
    if (fromUser) userTouched.current = true;
    const prev = activeRef.current;
    if (i === prev) return;
    const forward = (i - prev + SEGMENTS.length) % SEGMENTS.length;
    const delta =
      forward <= SEGMENTS.length / 2 ? forward : forward - SEGMENTS.length;
    setRot((r) => r - delta * STEP);
    setActive(i);
  };

  /* auto-spin until the visitor takes over */
  useEffect(() => {
    const id = setInterval(() => {
      if (userTouched.current) {
        clearInterval(id);
        return;
      }
      select((activeRef.current + 1) % SEGMENTS.length, false);
    }, 4500);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ActiveIcon = SEGMENTS[active].icon;

  return (
    <section id="usecases" className="mx-auto max-w-7xl px-4 py-20 overflow-hidden">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs md:text-sm uppercase tracking-widest text-indigo-600 font-semibold mb-3">
          Who it&apos;s for
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold [text-wrap:balance]">
          Market intelligence for every side of the market
        </h2>
        <p className="mt-4 text-neutral-600 text-lg">
          Whether you set prices, protect a brand, quote deals or source
          inventory — Market Edge turns market data into decisions: where to
          price, what to stock, who&apos;s selling what, and when to act.
        </p>
      </div>

      <div className="mt-14 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
        {/* ---------- spinning dial ---------- */}
        <Reveal y={16} className="hidden lg:block">
          <div className="relative mx-auto h-[400px] w-[400px]">
            {/* glow + orbit rings */}
            <div
              aria-hidden
              className="absolute inset-6 rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.18),rgba(217,70,239,0.08),transparent)] blur-xl"
            />
            <div aria-hidden className="absolute inset-[50px] rounded-full border border-dashed border-indigo-200" />
            <div aria-hidden className="absolute inset-[110px] rounded-full border border-slate-200" />

            {/* rotating orbit */}
            <div
              className="absolute inset-0 transition-transform duration-700 ease-out"
              style={{ transform: `rotate(${rot}deg)` }}
            >
              {SEGMENTS.map((s, i) => {
                const angle = i * STEP;
                const Icon = s.icon;
                const isActive = i === active;
                return (
                  <div
                    key={s.kicker}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translateY(-${RADIUS}px)`,
                    }}
                  >
                    {/* counter-rotate so the tile stays upright */}
                    <div
                      className="-translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-out"
                      style={{ transform: `rotate(${-angle - rot}deg)` }}
                    >
                      <button
                        type="button"
                        onClick={() => select(i)}
                        aria-label={s.kicker}
                        aria-pressed={isActive}
                        className={[
                          "grid h-16 w-16 place-items-center rounded-2xl shadow-md transition-all duration-300",
                          isActive
                            ? "bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white scale-110 shadow-indigo-500/40 shadow-lg"
                            : "bg-white text-neutral-500 ring-1 ring-black/5 hover:text-indigo-600 hover:scale-105",
                        ].join(" ")}
                      >
                        <Icon className="h-6 w-6" aria-hidden />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* center hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-40 w-40 place-items-center rounded-full bg-[#0b0b26] text-white shadow-2xl">
              <Reveal key={active} mode="mount" y={6} className="text-center px-3">
                <ActiveIcon className="mx-auto h-7 w-7 text-indigo-300" aria-hidden />
                <p className="mt-2 text-[11px] font-bold uppercase tracking-wider leading-tight">
                  {SEGMENTS[active].kicker}
                </p>
              </Reveal>
            </div>
          </div>
        </Reveal>

        {/* ---------- accordion ---------- */}
        <Reveal y={16} delay={80}>
          <div className="space-y-3">
            {SEGMENTS.map((s, i) => {
              const Icon = s.icon;
              const open = i === active;
              return (
                <div
                  key={s.kicker}
                  className={[
                    "rounded-2xl transition-all duration-300 overflow-hidden",
                    open
                      ? "bg-[#0b0b26] text-white shadow-lg"
                      : "bg-slate-50 ring-1 ring-black/5 hover:bg-slate-100",
                  ].join(" ")}
                >
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-expanded={open}
                    className="flex w-full items-center gap-3 px-5 py-4 text-left"
                  >
                    <span
                      className={[
                        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition",
                        open
                          ? "bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white"
                          : "bg-white text-neutral-500 ring-1 ring-black/5",
                      ].join(" ")}
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span
                      className={[
                        "text-[11px] font-bold uppercase tracking-widest",
                        open ? "text-indigo-300" : "text-neutral-500",
                      ].join(" ")}
                    >
                      {s.kicker}
                    </span>
                    <span
                      className={[
                        "ml-auto text-lg leading-none transition-transform duration-300",
                        open ? "rotate-45 text-indigo-300" : "text-neutral-400",
                      ].join(" ")}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>

                  {/* smooth expand */}
                  <div
                    className="grid transition-[grid-template-rows] duration-500 ease-out"
                    style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="px-5 pb-5 pl-[68px]">
                        <h3 className="text-lg font-extrabold leading-snug [text-wrap:balance]">
                          {s.title}
                        </h3>
                        <ul className="mt-3 space-y-2">
                          {s.points.map((p) => (
                            <li
                              key={p}
                              className="flex items-start gap-2 text-sm text-slate-300"
                            >
                              <Check
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400"
                                aria-hidden
                              />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                        <a
                          href="/contact"
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-300 hover:text-white transition"
                        >
                          See it on your market
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
