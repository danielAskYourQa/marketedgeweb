"use client";
import Script from "next/script";
import { toFaqJsonLd } from "@/lib/faq";
import { Accordion } from "./ui/Accordion";

export function FAQsSection({ faqs }: { faqs: { q: string; a: string }[] }) {
  const jsonLd = toFaqJsonLd(faqs);
  return (
    <div className="relative bg-[#0b0b26] text-white overflow-hidden">
      {/* glow, consistent with the hero and CTA panels */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgba(79,70,229,0.22),transparent_70%)]"
      />
      <section id="faqs" className="relative mx-auto max-w-7xl px-4 py-20">
        <Script
          id="faq-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="mx-auto max-w-3xl text-center mb-10">
          <p className="text-xs md:text-sm uppercase tracking-widest text-indigo-300/80 font-semibold mb-3">
            FAQs
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold [text-wrap:balance]">
            Questions &amp; answers
          </h2>
          <p className="mt-4 text-slate-300">
            Everything you need to know about the platform, the data and the
            plans.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((f, i) => (
            <Accordion key={i} title={f.q}>
              <p>{f.a}</p>
            </Accordion>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-slate-400">
          Still have questions?{" "}
          <a
            href="/contact"
            className="font-semibold text-indigo-300 hover:text-white transition"
          >
            Talk to us →
          </a>
        </p>
      </section>
    </div>
  );
}
