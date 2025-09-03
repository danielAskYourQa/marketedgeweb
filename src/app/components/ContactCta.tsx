"use client";

export function ContactCta() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-16">
      <div className="rounded-2xl border border-neutral-200 bg-gradient-to-tr from-purple-50 to-indigo-50 p-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">
            {"Ready to see your competitors' prices?"}
          </h2>
          <p className="text-neutral-700 mt-2">
            Get a live demo or start a free trial — no credit card required.
          </p>
        </div>
        <div className="flex gap-3">
          <a
            className="rounded-2xl px-5 py-3 bg-neutral-900 text-white font-medium hover:translate-y-[-1px] transition"
            href="/contact"
          >
            Book a demo
          </a>
          <a
            className="rounded-2xl px-5 py-3 bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white font-medium hover:opacity-90"
            href="https://auth.webshopqa.com/login?client_id=719452pnlcub3boop4mhap7bop&response_type=token&redirect_uri=https://webshopqa.com"
          >
            Start free trial
          </a>
        </div>
      </div>
    </section>
  );
}
