// src/lib/pricing.ts
export type Billing = "monthly" | "annual";

export function estimatePrice({
  products,
  competitors,
  marketplaces,
  billing,
}: {
  products: number;
  competitors: number;
  marketplaces: number;
  billing: Billing;
}): number {
  // Per-unit pricing
  const productCost = products * 0.1; // $0.10 per product
  const competitorCost = competitors * 10; // $10 per competitor
  const marketplaceCost = marketplaces * 10; // $10 per marketplace

  let monthly = productCost + competitorCost + marketplaceCost;

  // Free tier: <=100 products, <=3 competitors, and 0 marketplaces
  if (products <= 100 && competitors <= 3 && marketplaces === 0) {
    monthly = 0;
  }

  // Return monthly, or annual with 2 months free (10× monthly)
  const total = billing === "annual" ? monthly * 10 : monthly;

  // Round to cents
  return Math.round(total * 100) / 100;
}
