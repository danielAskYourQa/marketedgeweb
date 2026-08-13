import type { Metadata, Viewport } from "next";

const SITE_URL = "https://marketedgemonitoring.com";
const TITLE = "Market Edge — AI-Powered Market Intelligence Platform";
const DESCRIPTION =
  "Market Edge is an AI-powered market intelligence platform for retailers, distributors and manufacturers. Track competitor prices, stock, assortment and market trends across marketplaces — one holistic view of your market.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Market Edge",
  },
  description: DESCRIPTION,
  keywords: [
    "market intelligence platform",
    "market intelligence software",
    "competitive intelligence",
    "price intelligence",
    "competitor monitoring",
    "competitor price tracking",
    "e-commerce analytics",
    "marketplace intelligence",
    "MAP monitoring",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Market Edge",
    title: TITLE,
    description:
      "Every competitor, every price move, every market shift — across resellers, retailers & marketplaces. One holistic view.",
    url: "/",
    images: [{ url: "/og-market-edge.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "AI-powered market intelligence: competitors, prices, stock and trends in one holistic view.",
    images: ["/og-market-edge.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

/* ---------- structured data (JSON-LD) for the homepage ---------- */

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Market Edge",
  url: SITE_URL,
  logo: `${SITE_URL}/market-edge-logo.png`,
  email: "office@marketedgemonitoring.com",
  sameAs: ["https://www.trustpilot.com/review/marketedgemonitoring.com"],
};

export const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Market Edge",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  description:
    "AI-powered market intelligence platform: competitor price intelligence, stock and assortment tracking, and market trend alerts across websites and marketplaces.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
    description: "Free trial available",
  },
  provider: { "@type": "Organization", name: "Market Edge" },
};
