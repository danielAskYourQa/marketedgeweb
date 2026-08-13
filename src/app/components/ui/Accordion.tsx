"use client";
export function Accordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group rounded-2xl bg-white/5 ring-1 ring-white/10 open:bg-white/[0.08] hover:bg-white/[0.08] transition">
      <summary className="cursor-pointer list-none select-none px-6 py-4 flex items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
        <span className="font-semibold text-white">{title}</span>
        <span className="ml-auto h-7 w-7 shrink-0 grid place-items-center rounded-full bg-white/10 text-indigo-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4 transition-transform group-open:rotate-45"
            aria-hidden
          >
            <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
          </svg>
        </span>
      </summary>
      <div className="px-6 pb-6 text-sm leading-6 text-slate-300">{children}</div>
    </details>
  );
}
