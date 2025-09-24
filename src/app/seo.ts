import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Market Edge — Competitor Price Monitoring",
  description:
    "Monitor competitor prices and stock across websites and marketplaces. Market Edge gives you real-time visibility to protect margin and win deals.",
  alternates: { canonical: "https://marketedgemonitoring.com/" },
  openGraph: {
    type: "website",
    title: "Market Edge — Competitor Price Monitoring",
    description:
      "Monitor competitor prices and stock across websites and marketplaces in near real time.",
    url: "https://marketedgemonitoring.com/",
    images: [{ url: "/og-market-edge.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Market Edge — Competitor Price Monitoring",
    description:
      "See competitor prices at a glance. React fast. Protect margin.",
    images: ["/og-market-edge.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};
