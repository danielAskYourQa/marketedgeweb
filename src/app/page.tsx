// src/app/page.tsx
import { Suspense } from "react";
import { Hero } from "./components/Hero";
import { UseCases } from "./components/UseCases";
import { PricingSection } from "./components/Pricing";
import { CalculatorSection } from "./components/Calculator";
import { FAQsSection } from "./components/FAQs";
import { defaultFaqs, trustpilotReviews } from "./data";
import { ContactCta } from "./components/ContactCta";
import ReviewCarousel from "./components/ReviewCarousel";

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

      {/* ⭐ Reviews */}
      <section id="reviews" className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8">
            What our clients say
          </h2>
          <ReviewCarousel reviews={trustpilotReviews} autoPlayMs={5000} />
        </div>
      </section>

      <section id="contact-cta">
        <ContactCta />
      </section>
    </>
  );
}
