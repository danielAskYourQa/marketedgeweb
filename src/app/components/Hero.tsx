// src/app/market-edge/components/Hero.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

const HERO_BG = "/market-edge-hero.webp";

type Tag = {
  price: string;
  left: number; // %
  top: number; // %
  delta?: number; // % vs. market (negative = cheaper). If absent, we'll compute it.
  status?: "cheaper" | "expensive" | "match";
  hideOnMobile?: boolean;
};

const DEFAULT_TAGS: Tag[] = [
  { price: "$799.00", left: 66, top: 26, hideOnMobile: true },
  { price: "$49.50", left: 73, top: 46 },
  { price: "$39.50", left: 82, top: 58, hideOnMobile: true },
  { price: "$29.50", left: 68, top: 66 },
  { price: "$49.50", left: 47, top: 72 },
];

const headline =
  "Track competitor prices across resellers, retailers & marketplaces.";

/* ---------- helpers ---------- */
function highlightSubstr(
  text: string,
  target: string,
  spanClass =
    "box-decoration-clone bg-neutral-900/85 text-white px-3 py-1.5 rounded-lg ring-1 ring-black/10 [-webkit-box-decoration-break:clone]"
) {
  const i = text.toLowerCase().indexOf(target.toLowerCase());
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <span className={spanClass}>{text.slice(i, i + target.length)}</span>
      {text.slice(i + target.length)}
    </>
  );
}

function parsePrice(p: string): number {
  const cleaned = p.replace(/[^\d.,-]/g, "").replace(/,/g, "");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : NaN;
}
function median(nums: number[]): number {
  const arr = nums.slice().sort((a, b) => a - b);
  const mid = Math.floor(arr.length / 2);
  if (arr.length === 0) return NaN;
  return arr.length % 2 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
}
/** Compute delta vs median when not provided */
function withComputedDeltas(input: Tag[]): Tag[] {
  const prices = input.map((t) => parsePrice(t.price)).filter((n) => !isNaN(n));
  const base = median(prices);
  if (!isFinite(base) || base <= 0)
    return input.map((t) => ({ ...t, delta: t.delta ?? 0 }));
  return input.map((t) => {
    if (typeof t.delta === "number") return t;
    const n = parsePrice(t.price);
    if (isNaN(n)) return { ...t, delta: 0 };
    const d = ((n - base) / base) * 100;
    return { ...t, delta: d };
  });
}

function classify(t: Tag): "cheaper" | "expensive" | "match" {
  if (t.status) return t.status;
  const d = t.delta ?? 0;
  if (d <= -2) return "cheaper";
  if (d >= 2) return "expensive";
  return "match";
}
function visuals(kind: "cheaper" | "expensive" | "match") {
  switch (kind) {
    case "cheaper":
      return {
        haloBorder: "border-emerald-500/40",
        haloDashed: "border-emerald-500/70",
        haloGlow: "bg-emerald-500/12",
        badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
        Icon: TrendingDown,
        sign: "",
      };
    case "expensive":
      return {
        haloBorder: "border-rose-500/40",
        haloDashed: "border-rose-500/70",
        haloGlow: "bg-rose-500/12",
        badge: "bg-rose-50 text-rose-700 ring-rose-200",
        Icon: TrendingUp,
        sign: "+",
      };
    default:
      return {
        haloBorder: "border-slate-400/40",
        haloDashed: "border-slate-400/70",
        haloGlow: "bg-slate-400/12",
        badge: "bg-slate-50 text-slate-700 ring-slate-200",
        Icon: Minus,
        sign: "",
      };
  }
}

/* ---------- component ---------- */
export function Hero() {
  const search = useSearchParams();
  const editMode = search.get("editTags") === "1";

  const containerRef = useRef<HTMLDivElement>(null);
  const [tags, setTags] = useState<Tag[]>(DEFAULT_TAGS);
  const [drag, setDrag] =
    useState<{ i: number; offX: number; offY: number } | null>(null);

  const computedTags = useMemo(() => withComputedDeltas(tags), [tags]);

  // drag editor
  useEffect(() => {
    if (!editMode) return;
    const onMove = (e: MouseEvent) => {
      if (!drag || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      let x = e.clientX - rect.left - drag.offX;
      let y = e.clientY - rect.top - drag.offY;
      x = Math.max(0, Math.min(x, rect.width));
      y = Math.max(0, Math.min(y, rect.height));
      const left = (x / rect.width) * 100;
      const top = (y / rect.height) * 100;
      setTags((prev) => {
        const next = [...prev];
        next[drag.i] = { ...next[drag.i], left, top };
        return next;
      });
    };
    const onUp = () => setDrag(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [drag, editMode]);

  const startDrag = (i: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (!editMode || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const tag = tags[i];
    const tagPX = (tag.left / 100) * rect.width;
    const tagPY = (tag.top / 100) * rect.height;
    const offX = e.clientX - rect.left - tagPX;
    const offY = e.clientY - rect.top - tagPY;
    setDrag({ i, offX, offY });
  };

  const copyJson = async () => {
    const json = JSON.stringify(
      computedTags.map((t) => ({
        price: t.price,
        left: Number(t.left.toFixed(2)),
        top: Number(t.top.toFixed(2)),
        delta: Number((t.delta ?? 0).toFixed(2)),
        status: t.status,
        hideOnMobile: t.hideOnMobile || undefined,
      })),
      null,
      2
    );
    try {
      await navigator.clipboard.writeText(json);
      alert("TAGS JSON copied to clipboard ✅");
    } catch {
      console.log(json);
      alert("Copied failed. Check console for JSON.");
    }
  };

  return (
    <section className="relative isolate overflow-hidden min-h-[640px]">
      {/* background image (faded) */}
      <Image
        src={HERO_BG}
        alt="Assorted products with price labels illustrating pricing comparison"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center z-0 opacity-80"
      />
      {/* strong global scrim to fade the photo further */}
      <div className="absolute inset-0 z-[1] bg-white/50 backdrop-blur-[1px]" />

      {/* tags + content */}
      <div ref={containerRef} className="relative z-[2]">
        {/* floating tags */}
        <div className="absolute inset-0 pointer-events-none">
          {computedTags.map((t, i) => {
            const kind = classify(t);
            const v = visuals(kind);
            const pct = Math.round(Math.abs(t.delta ?? 0));
            const Icon = v.Icon;
            return (
              <div
                key={i}
                style={{ left: `${t.left}%`, top: `${t.top}%` }}
                className={`absolute ${editMode ? "pointer-events-auto" : "pointer-events-none"}`}
              >
                {/* purple/colored halo */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 z-[1]"
                >
                  <span
                    className={`absolute inset-0 rounded-full border-2 ${v.haloBorder} animate-ping`}
                    style={{
                      animationDuration: "2.6s",
                      animationDelay: `${(i % 5) * 120}ms`,
                    }}
                  />
                  <span
                    className={`absolute inset-0 rounded-full border-2 border-dashed ${v.haloDashed} animate-spin`}
                    style={{ animationDuration: "12s" }}
                  />
                  <span className={`absolute inset-2 rounded-full ${v.haloGlow} blur-[8px]`} />
                </div>

                {/* chip */}
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className={[
                    "relative z-[2] rounded-xl bg-white/95 text-neutral-900",
                    "px-3 py-1 text-sm font-semibold shadow-md ring-1 ring-black/5",
                    t.hideOnMobile ? "hidden md:flex" : "flex",
                    "items-center gap-2",
                    editMode ? "cursor-grab active:cursor-grabbing" : "",
                  ].join(" ")}
                  onMouseDown={(e) => startDrag(i, e)}
                >
                  <span>{t.price}</span>
                  <span
                    className={[
                      "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold ring-1",
                      v.badge,
                    ].join(" ")}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                    {kind === "match" ? "±0%" : `${v.sign}${pct}%`}
                  </span>
                  <span className="sr-only">
                    {kind === "cheaper"
                      ? "Cheaper than market"
                      : kind === "expensive"
                      ? "More expensive than market"
                      : "Matches market"}
                  </span>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* hero copy */}
        <div className="mx-auto max-w-7xl px-4 py-24 md:py-28 relative">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="max-w-2xl"
          >
            <p className="text-sm uppercase tracking-widest text-fuchsia-700/80 mb-3">
              B2B price tracking
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight [text-wrap:balance]">
              {highlightSubstr(headline, "Track competitor")}
            </h1>

            <p className="mt-4 text-neutral-700 max-w-xl">
              Stay competitive with near-real-time price and stock monitoring
              for your products across the sites that matter to you.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="rounded-2xl px-5 py-3 bg-neutral-900 text-white font-medium hover:translate-y-[-1px] transition"
                href="#pricing"
              >
                View pricing
              </a>
              <a
                className="rounded-2xl px-5 py-3 bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white font-medium hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
                href="#contact"
              >
                Start free trial
              </a>
              <a
                className="rounded-2xl px-5 py-3 border border-neutral-300 font-medium hover:bg-neutral-50"
                href="#calculator"
              >
                Calculate plan
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* editor HUD */}
      {editMode && (
        <div className="fixed right-4 bottom-4 z-[60] rounded-xl bg-white/95 shadow-lg ring-1 ring-black/5 p-3 flex items-center gap-2">
          <span className="text-xs text-neutral-600">Tag editor</span>
          <button
            onClick={copyJson}
            className="rounded-lg px-3 py-1.5 text-xs font-semibold bg-neutral-900 text-white hover:translate-y-[-1px] transition"
          >
            Copy JSON
          </button>
        </div>
      )}
    </section>
  );
}
