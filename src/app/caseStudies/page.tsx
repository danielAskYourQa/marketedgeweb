import { Suspense } from "react";
import Script from "next/script";
import CaseStudiesContent from "./caseStudies";

// SEO metadata (Next.js 13+ App Router best practice)
export async function generateMetadata() {
  return {
    title: "Case Studies | Market Edge Monitoring",
    description:
      "Real ROI from Market Edge: MAP compliance for a European electronics brand and faster pricing reactions for a 25k-SKU fashion retailer.",
    openGraph: {
      title: "Case Studies | Market Edge Monitoring",
      description:
        "How Market Edge delivered MAP compliance and pricing agility across Europe.",
      type: "website",
      url: "https://marketedgemonitoring.com/case-studies",
    },
    twitter: {
      card: "summary_large_image",
      title: "Case Studies | Market Edge Monitoring",
      description:
        "Real ROI from Market Edge: MAP compliance for a European electronics brand and faster pricing reactions for a 25k-SKU fashion retailer.",
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "CaseStudy",
      name: "Case Study 1 – Producer (Brand Owner)",
      description:
        "European consumer electronics manufacturer improves MAP compliance and margins across 12 countries with Market Edge.",
      provider: {
        "@type": "Organization",
        name: "Market Edge Monitoring",
      },
      about: {
        "@type": "Organization",
        name: "European consumer electronics manufacturer",
      },
      citation:
        "82% drop in MAP violations (from 30% to under 5%), +12% margin improvement, ROI in < 3 weeks.",
    },
    {
      "@type": "CaseStudy",
      name: "Case Study 2 – Reseller (E-commerce Retailer)",
      description:
        "Online fashion retailer with 25,000 SKUs saves 20 hours/week and lifts sales +9% using Market Edge.",
      provider: {
        "@type": "Organization",
        name: "Market Edge Monitoring",
      },
      about: {
        "@type": "Organization",
        name: "Online fashion retailer",
      },
      citation:
        "20 hours/week saved, +9% sales uplift, +4% margin, ROI in 2 weeks.",
    },
  ],
};

export default function Page() {
  return (
    <section id="case-studies">
      {/* JSON-LD injected correctly */}
      <Script
        id="case-studies-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div />}>
        <CaseStudiesContent />
      </Suspense>
    </section>
  );
}
