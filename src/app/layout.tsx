import "./globals.css";
import { Layout as Shell } from "./components/Layout";
import Analytics from "./components/Analytics";
import { Suspense } from "react";
import Script from "next/script";

export { metadata, viewport } from "./seo";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Rewardful (every page; afterInteractive so it never blocks hydration —
            the _rwq queue stub captures any early calls) */}
        <Script id="rewardful-q" strategy="afterInteractive">
          {`(function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');`}
        </Script>
        <Script
          id="rewardful-src"
          src="https://r.wdfl.co/rw.js"
          strategy="afterInteractive"
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
