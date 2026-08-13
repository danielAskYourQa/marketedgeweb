// src/app/page.tsx
import { Hero } from "./components/Hero";
import { Platform } from "./components/Platform";
import { UseCases } from "./components/UseCases";
import { PricingSection } from "./components/Pricing";
import { FAQsSection } from "./components/FAQs";
import { defaultFaqs, trustpilotReviews } from "./data";
import { ContactCta } from "./components/ContactCta";
import ReviewCarousel from "./components/ReviewCarousel";
import { organizationJsonLd, softwareJsonLd } from "./seo";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />

      <section id="hero">
        <Hero />
      </section>

      <section id="platform">
        <Platform />
      </section>

      <section id="usecases">
        <UseCases />
      </section>

      <section id="pricing">
        <PricingSection />
      </section>

      <section id="faqs">
        <FAQsSection faqs={defaultFaqs} />
      </section>

      {/* ⭐ Reviews */}
      <section id="reviews" className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs md:text-sm uppercase tracking-widest text-indigo-600 font-semibold text-center mb-2">
            Reviews
          </p>
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
