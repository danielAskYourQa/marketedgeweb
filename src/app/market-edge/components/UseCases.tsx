// src/app/market-edge/components/UseCases.tsx
"use client";
import { motion } from "framer-motion";
import { Factory, Building2, Package, ShoppingCart } from "lucide-react";

// ✅ define the icons you’ll rotate through
const ICONS = [Factory, Building2, Package, ShoppingCart];

export function UseCases() {
  const blocks = [
    {
      title: "You're a distributor",
      desc:
        "Track how competitors price the same products you distribute — stay competitive and win more deals.",
    },
    {
      title: "You're a manufacturer",
      desc:
        "Monitor distributor pricing across regions and marketplaces to protect your brand and MAP.",
    },
    {
      title: "You're an importer",
      desc:
        "Find which distributors/resellers offer the best prices for the same SKUs to optimize sourcing.",
    },
    {
      title: "You're an online retailer",
      desc:
        "Know if your prices are higher or lower than competitors so you don’t lose customers or margin.",
    },
  ];

  return (
    <section id="usecases" className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Your partner for price monitoring online
          </h2>
          <p className="text-neutral-700">
            Market Edge helps you monitor your products across competitor
            websites and marketplaces and shows how your pricing compares so you
            can react quickly and protect margin.
          </p>
          <div className="flex gap-3">
            <a
              className="rounded-2xl px-5 py-3 bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white font-medium hover:opacity-90"
              href="#contact"
            >
              Contact us
            </a>
            <a
              className="rounded-2xl px-5 py-3 border border-neutral-300 font-medium hover:bg-neutral-50"
              href="#faqs"
            >
              Learn more
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="grid sm:grid-cols-2 gap-6">
            {blocks.map((b, i) => {
              // ✅ safely pick an icon (wrap around if more blocks than icons)
              const Icon = ICONS[i % ICONS.length];
              return (
                <motion.div
                  key={i}
                  className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm hover:shadow-md transition hover:translate-y-[-2px]"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-5 w-5 text-fuchsia-600" />
                    <h3 className="font-semibold">{b.title}</h3>
                  </div>
                  <p className="text-sm text-neutral-700">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
