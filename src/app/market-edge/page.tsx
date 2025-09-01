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
      <Hero />
      <UseCases />
      <PricingSection />
      <CalculatorSection />
      <FAQsSection faqs={defaultFaqs} />
      <ContactCta />
    </>
  );
}

// export default function MarketEdgeTest() {
//   return (
//     <main style={{ padding: 24, color: "#fff", background: "#111", minHeight: "60vh" }}>
//       <h1>/market-edge route is working ✅</h1>
//       <p>If you see this, the 404 is gone. Next we can swap in the real components.</p>
//     </main>
//   );
// }
