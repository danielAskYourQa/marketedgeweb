// src/app/components/Hero.tsx
"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./ui/Reveal";

/* ---------------------------------------------------------------------------
 * Hero — dark navy stage, centered headline, and a semi-arc snap carousel of
 * real product screens captured from the live platform (demo market data).
 * ------------------------------------------------------------------------- */

/* ---------- real screenshots ---------- */

function ShotSlide({ src, alt }: { src: string; alt: string }) {
  /* real 2.1:1 app capture centered in a dark window frame, so the whole
     screen shows uncropped inside the carousel's 3:2 card */
  return (
    <div className="aspect-[3/2] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10 bg-[#0d1030] flex flex-col">
      <div className="flex items-center gap-1.5 px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-rose-400/80" />
        <span className="h-2 w-2 rounded-full bg-amber-400/80" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
      </div>
      <div className="flex-1 flex items-center px-3 pb-3">
        <Image
          src={src}
          alt={alt}
          width={1568}
          height={746}
          sizes="(max-width: 768px) 88vw, 660px"
          className="w-full h-auto rounded-lg ring-1 ring-white/10"
        />
      </div>
    </div>
  );
}

/* ---------- carousel ---------- */

const SLIDES = [
  {
    key: "price",
    label: "Price intelligence",
    Card: () => (
      <ShotSlide
        src="/shot-price-intelligence.png"
        alt="Market Edge Price Intelligence: matched products priced against each competitor, with difference, amount at stake and who is cheaper"
      />
    ),
  },
  {
    key: "product-gaps",
    label: "Product gaps",
    Card: () => (
      <ShotSlide
        src="/shot-product-gaps.png"
        alt="Market Edge Product Gaps: products competitors sell that you don't, by category and brand, with opportunity scores and lowest market price"
      />
    ),
  },
  {
    key: "competitive",
    label: "Competitive intelligence",
    Card: () => (
      <ShotSlide
        src="/shot-competitive.png"
        alt="Market Edge Competitive Intelligence: competitors ranked by threat score, weekly market digest, moves and head-to-head summary"
      />
    ),
  },
  {
    key: "assortment",
    label: "Assortment intelligence",
    Card: () => (
      <ShotSlide
        src="/shot-assortment.png"
        alt="Market Edge Assortment Intelligence: competitor listings, product gaps, brand gaps, category coverage and opportunity engine on live data"
      />
    ),
  },
  {
    key: "brand-gaps",
    label: "Brand gaps",
    Card: () => (
      <ShotSlide
        src="/shot-brand-gaps.png"
        alt="Market Edge Brand Gaps: brands competitors carry that you don't, with missing products, price profile and where each brand lives"
      />
    ),
  },
  {
    key: "equivalence",
    label: "Equivalence",
    Card: () => (
      <ShotSlide
        src="/shot-equivalence.png"
        alt="Market Edge Equivalence: competitor substitutes for your products matched on technical specs, with their price and the difference"
      />
    ),
  },
  {
    key: "head-to-head",
    label: "Head-to-Head",
    Card: () => (
      <ShotSlide
        src="/shot-head-to-head.png"
        alt="Market Edge Head-to-Head: shared products with one competitor, who wins on price, combined territory and contested categories"
      />
    ),
  },
  {
    key: "opportunity",
    label: "Opportunity intelligence",
    Card: () => (
      <ShotSlide
        src="/shot-moves.png"
        alt="Market Edge Opportunity Intelligence — Moves: repricings, new products, delistings and exploitable stock-outs across competitors"
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
