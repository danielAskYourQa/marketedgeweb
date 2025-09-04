import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Layout as Shell } from "./components/Layout";
import Analytics from "./components/Analytics";

export const metadata: Metadata = {
  title: "Market Edge — Competitor Price Monitoring",
  description:
    "Monitor competitor prices and stock across websites and marketplaces in near real time.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Shell>{children}</Shell>
        <Analytics />
      </body>
    </html>
  );
}