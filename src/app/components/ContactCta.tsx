"use client";

export function ContactCta() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-16">
      <div className="relative overflow-hidden rounded-3xl bg-[#0b0b26] text-white p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(70%_100%_at_80%_0%,rgba(217,70,239,0.25),transparent_60%),radial-gradient(70%_100%_at_10%_100%,rgba(79,70,229,0.3),transparent_60%)]"
        />
        <div className="relative">
          <h2 className="text-2xl md:text-4xl font-extrabold [text-wrap:balance]">
            Ready to see your whole market?
          </h2>
          <p className="text-slate-300 mt-2 max-w-xl">
            Competitor prices, stock and trends in one view. Get a live demo or
            start a free trial — no credit card required.
          </p>
        </div>
        <div className="relative flex gap-3 shrink-0">
          <a
            className="rounded-2xl px-5 py-3 border border-white/30 text-white font-semibold hover:bg-white/10 transition"
            href="/contact"
          >
            Book a demo
          </a>
          <a
            className="rounded-2xl px-5 py-3 bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white font-semibold hover:opacity-90"
            href="/contact"
          >
            Start free trial
          </a>
        </div>
      </div>
    </section>
  );
}
