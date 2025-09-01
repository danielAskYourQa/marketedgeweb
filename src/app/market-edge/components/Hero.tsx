"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const HERO_IMG = "/market-edge-hero.webp"; // <-- your file in /public

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Full-bleed background image */}
      <Image
        src={HERO_IMG}
        alt="Market Edge — price and stock visibility across retailers and marketplaces"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center -z-10"
      />

      {/* Legibility scrim */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-white/95 via-white/75 to-white/40" />

      {/* Optional soft color glow for brand feel */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 -z-10 h-[36rem] w-[60rem] rounded-full bg-gradient-to-tr from-fuchsia-300/30 via-purple-300/20 to-indigo-300/30 blur-3xl" />

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-24 md:py-28">
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
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Track competitor prices across resellers, retailers & marketplaces.
          </h1>
          <p className="mt-4 text-neutral-700 max-w-xl">
            Stay competitive with near-real-time price and stock monitoring for your products across the sites that matter to you.
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
    </section>
  );
}
