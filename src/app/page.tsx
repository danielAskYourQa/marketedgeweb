// src/app/page.tsx
import { Suspense } from "react";
import { Hero } from "./components/Hero";
import { UseCases } from "./components/UseCases";
import { PricingSection } from "./components/Pricing";
import { CalculatorSection } from "./components/Calculator";
import { FAQsSection } from "./components/FAQs";
import { defaultFaqs } from "./data";
import { ContactCta } from "./components/ContactCta";

export default function HomePage() {
  return (
    <>
      <section id="hero">
        <Suspense fallback={<div />}>
          <Hero />
        </Suspense>
      </section>

      <section id="usecases">
        <UseCases />
      </section>

      <section id="pricing">
        <PricingSection />
      </section>

      {/* Optional: add an anchor for the calculator if you plan to link to it */}
      <section id="calculator">
        <CalculatorSection />
      </section>

      <section id="faqs">
        <FAQsSection faqs={defaultFaqs} />
      </section>

      <section id="contact-cta">
        <ContactCta />
      </section>
    </>
  );
}
