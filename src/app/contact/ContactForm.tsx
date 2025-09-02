"use client";

import { useState } from "react";
import { CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  company: string;
  phone: string;
  reason: "demo" | "question" | "support";
  message: string;
  consent: boolean;
  botfield: string; // honeypot
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    phone: "",
    reason: "demo",
    message: "",
    consent: false,
    botfield: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const onChange =
    (k: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const v =
        e.currentTarget.type === "checkbox"
          ? (e.currentTarget as HTMLInputElement).checked
          : e.currentTarget.value;
      setForm((f) => ({ ...f, [k]: v }));
    };

  const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const isValid =
    form.name.trim().length >= 2 &&
    validEmail(form.email) &&
    form.message.trim().length >= 10 &&
    form.consent;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOk(null);
    setErr(null);
    if (!isValid) {
      setErr("Please complete the required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // Try to parse JSON safely; fall back to empty object
      let data: unknown = {};
      try {
        data = await res.json();
      } catch {
        // ignore JSON parse errors
      }

      if (!res.ok) {
        const msg =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof (data as Record<string, unknown>).error === "string"
            ? (data as { error: string }).error
            : "Something went wrong.";
        throw new Error(msg);
      }

      setOk("Thanks! Your message has been sent.");
      setForm({
        name: "",
        email: "",
        company: "",
        phone: "",
        reason: "demo",
        message: "",
        consent: false,
        botfield: "",
      });
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "Failed to send your message.";
      setErr(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="lg:col-span-2 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      {/* honeypot (hidden) */}
      <input
        type="text"
        name="botfield"
        value={form.botfield}
        onChange={onChange("botfield")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-neutral-700 mb-1">
            Full name <span className="text-rose-600">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={onChange("name")}
            required
            className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-700 mb-1">
            Work email <span className="text-rose-600">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={onChange("email")}
            required
            className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
            placeholder="jane@company.com"
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-700 mb-1">Company</label>
          <input
            type="text"
            value={form.company}
            onChange={onChange("company")}
            className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
            placeholder="Acme Inc."
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-700 mb-1">
            Phone (optional)
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={onChange("phone")}
            className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
            placeholder="+40 700 000 000"
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-700 mb-1">
            I’m interested in
          </label>
          <select
            value={form.reason}
            onChange={onChange("reason")}
            className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
          >
            <option value="demo">Book a live demo</option>
            <option value="question">General question</option>
            <option value="support">Support</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm text-neutral-700 mb-1">
          Message <span className="text-rose-600">*</span>
        </label>
        <textarea
          value={form.message}
          onChange={onChange("message")}
          required
          rows={6}
          className="w-full resize-y rounded-xl border border-neutral-300 bg-white px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
          placeholder="Tell us about your products, competitors, and marketplaces you care about."
        />
      </div>

      <div className="mt-4 flex items-start gap-2">
        <input
          id="consent"
          type="checkbox"
          checked={form.consent}
          onChange={onChange("consent")}
          className="mt-1 h-4 w-4 rounded border-neutral-300 text-fuchsia-600 focus-visible:ring-fuchsia-500"
        />
        <label htmlFor="consent" className="text-sm text-neutral-700">
          I agree to be contacted about my request.
        </label>
      </div>

      {ok && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-800 text-sm">
          <CheckCircle2 className="h-4 w-4" />
          <span>{ok}</span>
        </div>
      )}
      {err && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-rose-800 text-sm">
          <AlertTriangle className="h-4 w-4" />
          <span>{err}</span>
        </div>
      )}

      <div className="mt-6">
        <button
          type="submit"
          disabled={!isValid || submitting}
          className="inline-flex items-center gap-2 rounded-2xl bg-neutral-900 text-white px-5 py-3 font-medium shadow-sm hover:translate-y-[-1px] transition disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Send message
        </button>
      </div>
    </form>
  );
}