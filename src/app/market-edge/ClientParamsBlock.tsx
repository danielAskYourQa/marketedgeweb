// src/app/market-edge/ClientParamsBlock.tsx
"use client";

import { useSearchParams } from "next/navigation";

export default function ClientParamsBlock() {
  const sp = useSearchParams();
  // Example: read ?plan= from URL (adjust to your real usage)
  const plan = sp.get("plan") ?? "starter";

  // Render whatever depends on search params:
  return (
    <div className="hidden">
      {/* Replace with your real UI that needs search params */}
      Selected plan: {plan}
    </div>
  );
}
