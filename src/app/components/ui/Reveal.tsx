"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Lightweight fade/slide-in entrance (replaces framer-motion for simple
 * reveals). mode="mount" animates immediately on mount; mode="view" waits
 * until the element scrolls into view (once).
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 18,
  mode = "view",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  mode?: "mount" | "view";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (mode === "mount" || !("IntersectionObserver" in window)) {
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mode]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateY(${y}px)`,
        transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
