"use client";
import { useState } from "react";

export function Accordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <details open={open} onClick={() => setOpen(!open)} className="group">
      <summary className="cursor-pointer list-none select-none px-6 py-4 flex items-center justify-between">
        <span className="font-medium">{title}</span>
        <span className="ml-4 h-6 w-6 grid place-items-center rounded-full border border-neutral-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`h-4 w-4 transition-transform ${
              open ? "rotate-45" : "rotate-0"
            }`}
          >
            <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
          </svg>
        </span>
      </summary>
      <div className="px-6 pb-6 text-sm leading-6">{children}</div>
    </details>
  );
}
