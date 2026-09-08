"use client";

import { useEffect, useState } from "react";
import { Loader2, ArrowRight, X } from "lucide-react";

export type LeadFormStrings = {
  placeholder: string;
  success: string;
  note: string;
  modalTitle: string;
  modalSub: string;
  firstName: string;
  lastName: string;
  phone: string;
  website: string;
  submit: string;
};

const inputCls =
  "w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm text-neutral-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200";

/* Lead-capture popup for the event page (all fields mandatory, honeypot,
   → /api/event-lead → Resend). The page owns the open state so any button
   can trigger it. */
export default function LeadModal({
  open,
  onClose,
  onSuccess,
  t,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  t: LeadFormStrings;
}) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    website: "",
  });
  const [botfield, setBotfield] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  /* close on Escape */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    setError(null);
    setStatus("submitting");

    try {
      const res = await fetch("/api/event-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, botfield }),
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

      setStatus("idle");
      onSuccess();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t.modalTitle}
    >
      {/* overlay */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
      />

      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl text-left">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-neutral-500 hover:bg-slate-200 transition"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>

        <h3 className="text-xl font-extrabold text-neutral-900 pr-8">
          {t.modalTitle}
        </h3>
        <p className="mt-1 text-sm text-neutral-500">{t.modalSub}</p>

        <form onSubmit={onSubmit} className="mt-5 grid gap-3">
          <input
            type="text"
            value={botfield}
            onChange={(e) => setBotfield(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              required
              autoFocus
              value={form.firstName}
              onChange={set("firstName")}
              placeholder={t.firstName}
              aria-label={t.firstName}
              autoComplete="given-name"
              className={inputCls}
            />
            <input
              type="text"
              required
              value={form.lastName}
              onChange={set("lastName")}
              placeholder={t.lastName}
              aria-label={t.lastName}
              autoComplete="family-name"
              className={inputCls}
            />
          </div>
          <input
            type="email"
            required
            value={form.email}
            onChange={set("email")}
            placeholder={t.placeholder}
            aria-label={t.placeholder}
            autoComplete="email"
            className={inputCls}
          />
          <input
            type="tel"
            required
            minLength={6}
            value={form.phone}
            onChange={set("phone")}
            placeholder={t.phone}
            aria-label={t.phone}
            autoComplete="tel"
            className={inputCls}
          />
          <input
            type="text"
            required
            pattern=".*\..*"
            value={form.website}
            onChange={set("website")}
            placeholder={t.website}
            aria-label={t.website}
            autoComplete="url"
            className={inputCls}
          />

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-indigo-600 px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
          >
            {status === "submitting" ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : null}
            {t.submit}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>

          {status === "error" && error && (
            <p className="text-sm font-semibold text-rose-600">{error}</p>
          )}

          <p className="text-[11px] text-neutral-400">{t.note}</p>
        </form>
      </div>
    </div>
  );
}
