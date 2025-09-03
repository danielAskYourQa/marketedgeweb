// src/app/market-edge/components/Layout.tsx
import Image from "next/image";
import { ReactNode } from "react";
import { StickyCta } from "./StickyCta";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:text-neutral-900 focus:px-3 focus:py-2 focus:rounded-md"
      >
        Skip to content
      </a>

      <header
        className="sticky top-0 z-50 backdrop-blur border-b border-gray-200 bg-white/80"
        role="banner"
      >
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo-40.png"
              alt="Market Edge logo"
              width={36}
              height={36}
              className="rounded-2xl"
              priority
            />
            <span className="text-lg font-semibold tracking-tight">
              Market Edge
            </span>
          </div>

          {/* Primary nav */}
          <nav
            className="hidden md:flex items-center gap-6 text-sm text-neutral-600"
            aria-label="Primary"
          >
            <a
              href="#usecases"
              className="hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 rounded-md px-1"
            >
              Use-cases
            </a>
            <a
              href="#pricing"
              className="hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 rounded-md px-1"
            >
              Pricing
            </a>
            <a
              href="#faqs"
              className="hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 rounded-md px-1"
            >
              FAQs
            </a>
            <a
              href="/contact"
              className="hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 rounded-md px-1"
            >
              Contact
            </a>
          </nav>

          {/* Actions: Sign In + CTA */}
          <div className="flex items-center gap-3">
            <a
              href="https://auth.webshopqa.com/login?client_id=719452pnlcub3boop4mhap7bop&response_type=token&redirect_uri=https://webshopqa.com"
              className="inline-flex items-center justify-center rounded-2xl border border-fuchsia-600 px-4 py-2 text-sm font-semibold text-fuchsia-700 bg-white hover:bg-fuchsia-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
              aria-label="Sign in to Market Edge"
            >
              Sign In
            </a>

            <a
              href="/contact"
              className="relative inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold text-white bg-gradient-to-tr from-fuchsia-600 to-indigo-600 shadow-sm hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 overflow-visible group"
            >
              <span
                aria-hidden
                className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-fuchsia-500 to-indigo-500 blur-md opacity-60 animate-pulse z-0"
              />
              <span
                aria-hidden
                className="absolute inset-0 rounded-2xl ring-2 ring-fuchsia-500/30 animate-[ping_2.4s_ease-in-out_infinite] z-0"
              />
              <span className="relative z-10">Get in touch</span>
            </a>
          </div>
        </div>
      </header>

      <div id="content">{children}</div>

      <footer className="relative text-white" role="contentinfo">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/footer-image.png"
            alt="Market Edge footer background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />{" "}
          {/* optional overlay */}
        </div>

        {/* Footer content */}
        <div className="relative mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/logo-40.png"
                alt="Market Edge logo"
                width={32}
                height={32}
                className="rounded-2xl bg-white p-1"
              />
              <span className="font-semibold">Market Edge</span>
            </div>
            <p className="text-fuchsia-50">
              Price monitoring and competition analysis for eCommerce
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            <ul className="space-y-1 text-fuchsia-100">
              <li>Cluj-Napoca, Romania</li>
              <li>+40 729 014 617</li>
              <li>office@askyourqa.com</li>
            </ul>
          </div>

          <div className="mx-auto max-w-7xl px-4 pb-10 text-xs text-fuchsia-100 flex flex-wrap gap-4">
            <span>© {new Date().getFullYear()} AskYourQA</span>
            <a href="/privacy" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white">
              Terms of Service
            </a>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Services</h4>
            <ul className="space-y-1 text-fuchsia-100">
              <li>Price Monitoring</li>
              <li>Competition Analysis</li>
            </ul>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-10 text-xs text-fuchsia-100">
          © {new Date().getFullYear()} AskYourQA
        </div>
      </footer>

      <StickyCta />
    </main>
  );
}
