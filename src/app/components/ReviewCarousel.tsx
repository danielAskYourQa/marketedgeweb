"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star, CheckCircle2 } from "lucide-react";

export type Review = {
  id: string;
  name: string; // Reviewer display name
  rating: number; // 1..5
  text: string; // Short excerpt of the review
  url: string; // Link to the exact Trustpilot review
  title?: string; // Optional short title like "Great service"
  date?: string; // ISO or display date
  countryCode?: string; // "RO", "CY", etc.
};

type Props = {
  reviews: Review[];
  autoPlayMs?: number; // default 5000
  className?: string;
  trustScore?: number; // e.g. 4.2
  totalCount?: number; // e.g. 27
  profileUrl?: string; // link to profile page
};

export default function ReviewCarousel({
  reviews,
  autoPlayMs = 5000,
  className,
  trustScore = 4.5,
  totalCount = 12,
  profileUrl = "#",
}: Props) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  const count = reviews.length;
  const current = useMemo(() => reviews[index], [reviews, index]);

  const next = useCallback(() => {
    setDir(1);
    setIndex((i) => (i + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setDir(-1);
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  // Autoplay with pause on hover/focus and when tab is hidden
  useEffect(() => {
    if (!count) return;

    const stop = () => {
      if (timer.current) clearInterval(timer.current);
      timer.current = null;
    };
    const start = () => {
      stop();
      if (!prefersReduced) timer.current = setInterval(next, autoPlayMs);
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener("visibilitychange", onVisibility);

    const el = containerRef.current;
    if (el) {
      el.addEventListener("mouseenter", stop);
      el.addEventListener("mouseleave", start);
      el.addEventListener("focusin", stop);
      el.addEventListener("focusout", start);
    }
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      if (el) {
        el.removeEventListener("mouseenter", stop);
        el.removeEventListener("mouseleave", start);
        el.removeEventListener("focusin", stop);
        el.removeEventListener("focusout", start);
      }
    };
  }, [autoPlayMs, count, prefersReduced, next]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Basic swipe (touch)
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    if (Math.abs(dx) > 40) dx > 0 ? prev() : next();
    touch.current = null;
  };

  if (!count) return null;

  return (
    <section
      ref={containerRef}
      className={`relative w-full max-w-3xl mx-auto rounded-2xl shadow-lg bg-white p-0 overflow-hidden ${
        className ?? ""
      }`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer reviews (Trustpilot style)"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 md:px-6 py-3 border-b bg-neutral-50">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-3 w-3 rounded-sm bg-emerald-500"
            aria-hidden
          />
          <span className="text-sm font-semibold text-neutral-800">
            Trustpilot
          </span>
          <span className="text-xs text-neutral-500">• Verified reviews</span>
        </div>

        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-xs"
          aria-label="Open Trustpilot profile"
        >
          <TrustScoreBadge trustScore={trustScore} totalCount={totalCount} />
        </a>
      </div>

      {/* Slide */}
      <div
        key={current.id}
        className={[
          "px-6 md:px-10 py-7 md:py-10",
          prefersReduced ? "" : dir === 1 ? "tp-slide-right" : "tp-slide-left",
        ].join(" ")}
      >
        {/* Stars (emerald like Trustpilot) */}
        <div
          className="flex justify-center mb-3"
          aria-label={`${current.rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < current.rating
                  ? "text-emerald-500 fill-emerald-500"
                  : "text-neutral-300"
              }`}
              aria-hidden
            />
          ))}
        </div>

        {/* Title + Verified */}
        <div className="flex items-center justify-center gap-2 mb-1">
          {current.title ? (
            <h3 className="text-base font-semibold text-neutral-900 text-center">
              {current.title}
            </h3>
          ) : null}
          <span
            className="inline-flex items-center gap-1 text-emerald-600 text-xs font-medium"
            aria-label="Verified"
            title="Verified"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified
          </span>
        </div>

        {/* Review text */}
        <blockquote className="text-center text-neutral-800 leading-relaxed italic">
          “{current.text}”
        </blockquote>

        {/* Meta: name • date • country */}
        <div className="mt-4 text-center text-xs text-neutral-500">
          <span className="font-medium text-neutral-700">{current.name}</span>
          {current.date ? (
            <span> · {formatDate(current.date)}</span>
          ) : null}{" "}
          {current.countryCode ? (
            <span>· {flagEmoji(current.countryCode)}</span>
          ) : null}
        </div>

        {/* Link */}
        <a
          href={current.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block text-center text-sm font-semibold text-emerald-600 hover:underline"
          aria-label={`Read full review by ${current.name} on Trustpilot`}
        >
          Read on Trustpilot
        </a>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-4 pb-4 pt-1">
        <button
          onClick={prev}
          className="inline-flex items-center justify-center rounded-full p-2 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label="Previous review"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {/* Dots */}
          <div
            className="flex gap-1.5"
            role="tablist"
            aria-label="Review selector"
          >
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDir(i > index ? 1 : -1);
                  setIndex(i);
                }}
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to review ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === index
                    ? "bg-emerald-600"
                    : "bg-neutral-300 hover:bg-neutral-400"
                }`}
              />
            ))}
          </div>

          {/* Counter */}
          <span className="text-[11px] text-neutral-500 tabular-nums">
            {index + 1} / {count}
          </span>
        </div>

        <button
          onClick={next}
          className="inline-flex items-center justify-center rounded-full p-2 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label="Next review"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Local CSS (no inline CSS var typing, no any) */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0.01;
            transform: translateX(var(--tp-x, 12px));
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .tp-slide-right {
          --tp-x: 16px;
          animation: slideIn 300ms ease-out both;
        }
        .tp-slide-left {
          --tp-x: -16px;
          animation: slideIn 300ms ease-out both;
        }
      `}</style>
    </section>
  );
}

function TrustScoreBadge({
  trustScore,
  totalCount,
}: {
  trustScore: number;
  totalCount: number;
}) {
  const rounded = Math.round(trustScore * 10) / 10;
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white border px-2.5 py-1 shadow-sm hover:shadow transition">
      <span
        className="flex items-center gap-1"
        aria-label={`TrustScore ${rounded} out of 5`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < Math.round(rounded)
                ? "text-emerald-500 fill-emerald-500"
                : "text-neutral-300"
            }`}
            aria-hidden
          />
        ))}
      </span>
      <span className="text-[11px] text-neutral-700">
        <span className="font-semibold">{rounded}</span>{" "}
        <span className="text-neutral-500">| {totalCount} reviews</span>
      </span>
    </span>
  );
}

/** Helpers */
function flagEmoji(countryCode?: string) {
  if (!countryCode) return "";
  const cc = countryCode.trim().toUpperCase();
  if (cc.length !== 2) return cc;
  const codePoints = [...cc].map((c) => 0x1f1e6 - 65 + c.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function formatDate(dateInput: string) {
  // Parse ISO-like dates deterministically (UTC), fallback to JS Date if needed.
  const iso = dateInput.trim();
  let d: Date | null = null;

  // YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    const [y, m, day] = iso.split("-").map(Number);
    d = new Date(Date.UTC(y, m - 1, day));
  } else {
    const tmp = new Date(iso);
    d = isNaN(tmp.getTime()) ? null : tmp;
  }
  if (!d) return dateInput;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dd = d.getUTCDate().toString().padStart(2, "0");
  const mon = months[d.getUTCMonth()];
  const yyyy = d.getUTCFullYear();
  // Always: "Sep 19, 2025"
  return `${mon} ${dd}, ${yyyy}`;
}
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(m.matches);

    onChange(); // set initial value

    if (m.addEventListener) {
      m.addEventListener("change", onChange);
      return () => m.removeEventListener("change", onChange);
    } else {
      // Safari <14 fallback
      m.addListener(onChange);
      return () => m.removeListener(onChange);
    }
  }, []);

  return reduced;
}
