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
  const baseMonthly = 150;
  const extraProducts = Math.max(0, Math.ceil((products - 1000) / 1000)) * 50;
  const extraCompetitors = Math.max(0, competitors - 6) * 20;
  const extraMarketplaces = Math.max(0, marketplaces - 2) * 30;
  let monthly =
    baseMonthly + extraProducts + extraCompetitors + extraMarketplaces;

  if (products <= 100 && competitors <= 3 && marketplaces === 0) monthly = 0; // Free tier
  return billing === "annual" ? monthly * 10 : monthly; // 2 months free
}
