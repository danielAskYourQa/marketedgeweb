"use client";
export function NumberField({
  label,
  value,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="block text-sm text-neutral-700 mb-1">{label}</label>
      <div className="flex rounded-xl border border-neutral-200 overflow-hidden">
        <button
          type="button"
          className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200"
          onClick={() => onChange(Math.max(0, value - step))}
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <input
          type="number"
          className="w-full bg-white px-3 py-2 text-right"
          value={value}
          onChange={(e) => onChange(Number(e.target.value || 0))}
          aria-label={`${label} input`}
        />
        <button
          type="button"
          className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200"
          onClick={() => onChange(value + step)}
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}
