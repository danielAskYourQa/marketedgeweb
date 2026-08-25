"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";

/* Work-email lead capture for the event page (same pattern as the AskYourQA
   hero form: honeypot + /api/event-lead → email via Resend). */
export default function EventLeadForm() {
  const [email, setEmail] = useState("");
  const [botfield, setBotfield] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    setError(null);
    setStatus("submitting");

    try {
      const res = await fetch("/api/event-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, botfield }),
      });

      let data: { error?: string } = {};
      try {
        data = await res.json();
      } catch {
        // ignore
      }

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div className="mx-auto mt-8 flex w-full max-w-xl items-center gap-3 rounded-3xl border border-emerald-300/40 bg-emerald-400/15 px-6 py-5 backdrop-blur-md sm:rounded-full">
        <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-300" aria-hidden />
        <p className="text-left text-sm font-semibold text-white sm:text-base">
          You&apos;re in — we&apos;ll reach out to grab your website and
          competitor list, and your scan will be ready right after the event.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-xl">
      <form
        onSubmit={onSubmit}
        className="flex w-full flex-col overflow-hidden rounded-3xl border border-white/25 bg-white/95 shadow-2xl shadow-indigo-900/40 backdrop-blur-md sm:flex-row sm:rounded-full"
      >
        <input
          type="text"
          value={botfield}
          onChange={(e) => setBotfield(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
        />

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Work email"
          aria-label="Work email"
          className="min-h-[56px] flex-1 px-6 py-4 text-neutral-800 outline-none"
        />

        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex min-h-[56px] items-center justify-center gap-2 bg-gradient-to-tr from-fuchsia-600 to-indigo-600 px-6 py-4 font-semibold text-white transition hover:opacity-90 disabled:opacity-70 md:px-8"
        >
          {status === "submitting" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : null}
          <span className="whitespace-nowrap">Claim your free scan</span>
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </form>

      <p className="mt-3 text-xs text-slate-400">
        No credit card, no commitment — we&apos;ll only use this to send your
        market scan.
      </p>

      {status === "error" && error && (
        <p className="mt-3 text-sm font-semibold text-rose-300">{error}</p>
      )}
    </div>
  );
}
