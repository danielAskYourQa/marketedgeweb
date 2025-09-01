import type { ReactNode } from "react";
import { Layout as Shell } from "./components/Layout";
export { metadata } from "./seo";

export default function MarketEdgeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <Shell>{children}</Shell>;
}
