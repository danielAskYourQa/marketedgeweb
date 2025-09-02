// src/app/market-edge/page.tsx
import { Suspense } from "react";
import { Hero } from "./components/Hero";
import { UseCases } from "./components/UseCases";
import { PricingSection } from "./components/Pricing";
import { CalculatorSection } from "./components/Calculator";
import { FAQsSection } from "./components/FAQs";
import { ContactCta } from "./components/ContactCta";
import { defaultFaqs } from "./data";

export default function MarketEdgePage() {
  return (
    <>
      <Suspense fallback={<div />}>
        <Hero />
      </Suspense>

      <UseCases />
      <PricingSection />
      <CalculatorSection />
      <FAQsSection faqs={defaultFaqs} />
      <ContactCta />
    </>
  );
}