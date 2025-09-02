"use client";
export function BillingToggle({
  value,
  onChange,
}: {
  value: "monthly" | "annual";
  onChange: (v: "monthly" | "annual") => void;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span
        className={value === "monthly" ? "font-semibold" : "text-neutral-400"}
      >
        Billed monthly
      </span>
      <button
        aria-label="Toggle billing"
        onClick={() => onChange(value === "monthly" ? "annual" : "monthly")}
        className="relative inline-flex h-8 w-16 items-center rounded-full border border-white/15 bg-neutral-800 px-1"
      >
        <span
          className={`inline-block h-6 w-6 rounded-full transition-transform bg-gradient-to-tr from-fuchsia-500 to-indigo-500 ${
            value === "annual" ? "translate-x-8" : "translate-x-0"
          }`}
        />
      </button>
      <span
        className={value === "annual" ? "font-semibold" : "text-neutral-400"}
      >
        Billed annually
      </span>
    </div>
  );
}
