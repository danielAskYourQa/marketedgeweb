import { Suspense } from "react";
import Script from "next/script";
import CaseStudiesContent from "./caseStudies";

export async function generateMetadata() {
  return {
    title: "Case Studies | Market Edge Monitoring",
    description:
      "ROI-driven case studies for Market Edge: MAP monitoring, margin recovery at scale, strategic sourcing, and smarter procurement decisions.",
    openGraph: {
      title: "Case Studies | Market Edge Monitoring",
      description:
        "Real scenarios showing how Market Edge protects margin, saves time, and improves pricing & procurement decisions.",
      type: "website",
      url: "https://marketedgemonitoring.com/case-studies",
    },
    twitter: {
      card: "summary_large_image",
      title: "Case Studies | Market Edge Monitoring",
      description:
        "MAP monitoring, hidden margin recovery, strategic sourcing, and smarter procurement—real Market Edge outcomes.",
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "CaseStudy",
      name: "MAP Monitoring – Premium Electronics",
      description:
        "Same-day MAP violation detection with timestamped screenshots; reduced manual executive hours and prevented margin erosion.",
      provider: { "@type": "Organization", name: "Market Edge Monitoring" },
      citation:
        "Example incident: 8% below MAP on €1,100 products; ~€3,520 erosion before detection. Market Edge subscription: €240/month.",
    },
    {
      "@type": "CaseStudy",
      name: "Recovering Hidden Margin – FMCG (14,000 SKUs)",
      description:
        "Large FMCG portfolio monitoring across 12 competitors; identified underpricing at scale and recovered margin through targeted adjustments.",
      provider: { "@type": "Organization", name: "Market Edge Monitoring" },
      citation:
        "17% of SKUs under market average; 480 SKU corrections → +€27,400/month recovered margin. Subscription: €1,200/month.",
    },
    {
      "@type": "CaseStudy",
      name: "Turning Scarcity into Long-Term Revenue (Bearings)",
      description:
        "Strategic sourcing using competitor monitoring to fulfill an urgent, obsolete product request and convert it into a long-term account.",
      provider: { "@type": "Organization", name: "Market Edge Monitoring" },
      citation:
        "Timken Set 119 (100 units) sourced via market visibility; +5% margin; led to ~€200,000/year recurring purchases. Subscription: €650/month.",
    },
    {
      "@type": "CaseStudy",
      name: "Smarter Procurement – Avoiding a Low-Margin Order (Bearings)",
      description:
        "Pre-purchase competitive visibility prevented low-margin inventory and reshaped the order toward SKUs with market stock gaps.",
      provider: { "@type": "Organization", name: "Market Edge Monitoring" },
      citation:
        "~€78,000 order reshaped from 20 in-stock SKUs to 15 gap SKUs; achieved ~20% margin → ~€15,600 gross margin. Subscription: €650/month.",
    },
  ],
};

export default function Page() {
  return (
    <section id="case-studies">
      <Script
        id="case-studies-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div />}>{/* server streaming */}
        <CaseStudiesContent />
      </Suspense>
    </section>
  );
}
