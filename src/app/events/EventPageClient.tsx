"use client";

import { useEffect, useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import EventLeadForm from "../components/EventLeadForm";
import { EVENT } from "./event-config";

type Lang = "ro" | "en";

/* ---------------------------------------------------------------------------
 * Single-screen event landing page. RO is the default (local event).
 * ------------------------------------------------------------------------- */
const STRINGS = {
  ro: {
    badge: `Ne găsești la ${EVENT.name}`,
    h1a: "Vezi piața ta cum",
    h1b: "n-ai mai văzut-o niciodată",
    sub: "Suntem la ecomTEAM toate cele trei zile. Îți arătăm platforma pe piețe demo cu date reale, ne spui site-ul tău și competitorii — iar imediat după eveniment îți construim aceeași imagine pentru afacerea ta.",
    bookSlot: "Programează o întâlnire la eveniment →",
    home: "Descoperă platforma completă →",
    form: {
      placeholder: "Email de serviciu",
      button: "Vreau Demo",
      success:
        "Gata! Te contactăm în curând ca să programăm demo-ul pentru piața ta.",
      note: "Fără card, fără obligații — folosim datele doar ca să te contactăm.",
      modalTitle: "Vreau demo",
      modalSub: "Lasă-ne datele și te contactăm rapid — toate câmpurile sunt obligatorii.",
      firstName: "Prenume",
      lastName: "Nume",
      phone: "Telefon",
      website: "Site-ul tău",
      submit: "Trimite cererea",
    },
    proof: [
      { big: "+27.400 €", small: "marjă recuperată lunar pentru un distribuitor FMCG" },
      { big: "~200.000 €", small: "venit anual dintr-o singură comandă salvată" },
      { big: "25–30h", small: "ore economisite lunar la verificările MAP" },
    ],
  },
  en: {
    badge: `Live at ${EVENT.name}`,
    h1a: "See your market like",
    h1b: "you've never seen it",
    sub: "We're at ecomTEAM all three days. We'll show you the platform on demo markets with real data, you tell us your website and competitors — and right after the event we build the same view for your business.",
    bookSlot: "Book a meeting at the event →",
    home: "Explore the full platform →",
    form: {
      placeholder: "Work email",
      button: "Book a Demo",
      success:
        "You're in — we'll reach out shortly to schedule your demo.",
      note: "No credit card, no commitment — we'll only use this to contact you.",
      modalTitle: "Book a demo",
      modalSub: "Leave your details and we'll get back to you fast — all fields are required.",
      firstName: "First name",
      lastName: "Last name",
      phone: "Phone",
      website: "Your website",
      submit: "Send request",
    },
    proof: [
      { big: "+€27.4k", small: "monthly margin recovered for an FMCG distributor" },
      { big: "~€200k", small: "yearly revenue from one saved order" },
      { big: "25–30h", small: "executive hours saved per month on MAP checks" },
    ],
  },
} as const;

function LangSwitch({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  return (
    <div className="inline-flex rounded-full bg-white/10 ring-1 ring-white/15 p-1 text-xs font-bold">
      {(["ro", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onChange(l)}
          aria-pressed={lang === l}
          className={[
            "rounded-full px-3 py-1 uppercase tracking-wide transition",
            lang === l ? "bg-white text-[#0b0b26]" : "text-slate-300 hover:text-white",
          ].join(" ")}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export default function EventPageClient() {
  const [lang, setLang] = useState<Lang>("ro");

  /* remember the visitor's choice */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("me-event-lang");
      if (saved === "en" || saved === "ro") setLang(saved);
    } catch {}
  }, []);
  const changeLang = (l: Lang) => {
    setLang(l);
    try {
      localStorage.setItem("me-event-lang", l);
    } catch {}
  };

  const t = STRINGS[lang];

  return (
    <div lang={lang}>
      <section className="relative isolate overflow-hidden bg-[#0b0b26] text-white">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(79,70,229,0.28),transparent_70%)]"
        />
        <div className="mx-auto max-w-7xl px-4 pt-8 md:pt-10 pb-20 text-center min-h-[calc(100vh-73px)] flex flex-col">
          {/* language switch */}
          <div className="flex justify-end">
            <LangSwitch lang={lang} onChange={changeLang} />
          </div>

          <div className="my-auto">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/15 px-4 py-1.5 text-xs md:text-sm font-semibold text-indigo-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {t.badge}
            </p>

            <h1 className="mx-auto mt-6 max-w-4xl text-4xl md:text-6xl font-extrabold leading-tight [text-wrap:balance]">
              {t.h1a}{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {t.h1b}
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-slate-300">{t.sub}</p>

            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-300">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-indigo-300" aria-hidden />
                {EVENT.dates[lang]}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-indigo-300" aria-hidden />
                {EVENT.venue}
              </span>
              <a
                href={EVENT.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-indigo-300 hover:text-white transition"
              >
                ic.events/ecomteam ↗
              </a>
            </div>

            <EventLeadForm t={t.form} />

            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <a
                href={EVENT.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-indigo-300 hover:text-white transition"
              >
                {t.bookSlot}
              </a>
              <a href="/" className="font-semibold text-slate-400 hover:text-white transition">
                {t.home}
              </a>
            </div>

            {/* proof band */}
            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 sm:grid-cols-3 gap-6">
              {t.proof.map((s) => (
                <div key={s.big}>
                  <p className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-fuchsia-400 to-indigo-300 bg-clip-text text-transparent">
                    {s.big}
                  </p>
                  <p className="mt-1 text-xs md:text-sm text-slate-400">{s.small}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
