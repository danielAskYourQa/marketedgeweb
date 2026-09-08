"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, ArrowRight, X } from "lucide-react";

type FormStrings = {
  placeholder: string;
  button: string;
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

const DEFAULT_STRINGS: FormStrings = {
  placeholder: "Work email",
  button: "Claim your free scan",
  success:
    "You're in — we'll reach out to grab your competitor list, and your scan will be ready right after the event.",
  note: "No credit card, no commitment — we'll only use this to send your market scan.",
  modalTitle: "Claim your free market scan",
  modalSub: "Tell us where to send it — all fields are required.",
  firstName: "First name",
  lastName: "Last name",
  phone: "Phone",
  website: "Your website",
  submit: "Request my scan",
};

const inputCls =
  "w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm text-neutral-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200";

/* Work-email lead capture for the event page. The hero pill opens a popup
   with the full form (all fields mandatory) → /api/event-lead → Resend. */
export default function EventLeadForm({
  t = DEFAULT_STRINGS,
}: {
  t?: FormStrings;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    website: "",
  });
  const [botfield, setBotfield] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  /* close on Escape */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

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

      setStatus("success");
      setOpen(false);
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
          {t.success}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-xl">
      {/* hero pill: email + button that opens the popup */}
      <div className="flex w-full flex-col overflow-hidden rounded-3xl border border-white/25 bg-white/95 shadow-2xl shadow-indigo-900/40 backdrop-blur-md sm:flex-row sm:rounded-full">
        <input
          type="email"
          value={form.email}
          onChange={set("email")}
          placeholder={t.placeholder}
          aria-label={t.placeholder}
          className="min-h-[56px] flex-1 px-6 py-4 text-neutral-800 outline-none"
        />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex min-h-[56px] items-center justify-center gap-2 bg-gradient-to-tr from-fuchsia-600 to-indigo-600 px-6 py-4 font-semibold text-white transition hover:opacity-90 md:px-8"
        >
          <span className="whitespace-nowrap">{t.button}</span>
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <p className="mt-3 text-xs text-slate-400">{t.note}</p>

      {/* ---------- popup ---------- */}
      {open && (
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
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
          />

          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl text-left">
            <button
              type="button"
              onClick={() => setOpen(false)}
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
      )}
    </div>
  );
}
