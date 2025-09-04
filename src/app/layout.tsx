import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Layout as Shell } from "./components/Layout";
import Analytics from "./components/Analytics";
import { Suspense } from "react";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Market Edge — Competitor Price Monitoring",
  description:
    "Monitor competitor prices and stock across websites and marketplaces in near real time.",
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Rewardful (must be on every page) */}
        <Script id="rewardful-q" strategy="beforeInteractive">
          {`(function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');`}
        </Script>
        <Script
          id="rewardful-src"
          src="https://r.wdfl.co/rw.js"
          strategy="beforeInteractive"
          data-rewardful="346af0" // ← your Rewardful public key
        />
      </head>

      <body>
        <Shell>{children}</Shell>

        {/* GA stays wrapped to satisfy App Router */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
