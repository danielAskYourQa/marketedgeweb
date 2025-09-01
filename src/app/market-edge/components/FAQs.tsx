"use client";
import Script from "next/script";
import { toFaqJsonLd } from "@/lib/faq";
import { Accordion } from "./ui/Accordion";

export function FAQsSection({ faqs }: { faqs: { q: string; a: string }[] }) {
  const jsonLd = toFaqJsonLd(faqs);
  return (
    <section id="faqs" className="mx-auto max-w-7xl px-4 py-16">
      <Script
        id="faq-json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="text-3xl md:text-4xl font-bold mb-8">
        Questions & answers
      </h2>
      <div className="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white shadow-sm">
        {faqs.map((f, i) => (
          <Accordion key={i} title={f.q}>
            <p className="text-neutral-700">{f.a}</p>
          </Accordion>
        ))}
      </div>
    </section>
  );
}
