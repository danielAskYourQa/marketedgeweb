"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  ArrowRight,
  Tag,
  Package,
  FileText,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import LeadModal, { type LeadFormStrings } from "../components/EventLeadForm";
import { EVENT } from "./event-config";

type Lang = "ro" | "en";

/* ---------------------------------------------------------------------------
 * Event landing (GPeC Summit) — dark blue stage, hero copy + dashboard shot,
 * four feature cards. RO default.
 * ------------------------------------------------------------------------- */
const STRINGS: Record<
  Lang,
  {
    h1a: string;
    h1b: string;
    p1: string;
    p2: string;
    cta: string;
    features: { title: string; desc: string }[];
    form: LeadFormStrings;
  }
> = {
  ro: {
    h1a: "Ai venit la GPeC Summit să vezi ce urmează în eCommerce.",
    h1b: "Noi îți arătăm ce se întâmplă deja în piața ta.",
    p1: "MarketEdge monitorizează prețuri, stocuri, produse și competitori și transformă datele din piață în informații mai ușor de folosit în deciziile comerciale.",
    p2: "Vezi mai clar cum ești poziționat, ce se schimbă la competitori și unde apar oportunități.",
    cta: "Vreau demo",
    features: [
      {
        title: "Prețuri",
        desc: "Monitorizezi prețurile din piață și vezi rapid cum te poziționezi față de competitori.",
      },
      {
        title: "Stocuri",
        desc: "Urmărești disponibilitatea produselor și eviți situațiile de out of stock.",
      },
      {
        title: "Produse",
        desc: "Identifici produse noi, goluri de sortiment și oportunități de creștere.",
      },
      {
        title: "Competitori",
        desc: "Analizezi strategia competitorilor și vezi ce se schimbă în piața ta, în timp real.",
      },
    ],
    form: {
      placeholder: "Email de serviciu",
      success:
        "Gata! Te contactăm în curând ca să programăm demo-ul pentru piața ta.",
      note: "Fără card, fără obligații — folosim datele doar ca să te contactăm.",
      modalTitle: "Vreau demo",
      modalSub:
        "Lasă-ne datele și te contactăm rapid — toate câmpurile sunt obligatorii.",
      firstName: "Prenume",
      lastName: "Nume",
      phone: "Telefon",
      website: "Site-ul tău",
      submit: "Trimite cererea",
    },
  },
  en: {
    h1a: "You came to GPeC Summit to see what's next in eCommerce.",
    h1b: "We show you what's already happening in your market.",
    p1: "MarketEdge monitors prices, stock, products and competitors, turning market data into information that's easier to use in commercial decisions.",
    p2: "See clearly where you stand, what's changing at your competitors and where opportunities appear.",
    cta: "Book a demo",
    features: [
      {
        title: "Prices",
        desc: "Monitor market prices and instantly see how you're positioned against competitors.",
      },
      {
        title: "Stock",
        desc: "Track product availability and avoid out-of-stock situations.",
      },
      {
        title: "Products",
        desc: "Spot new products, assortment gaps and growth opportunities.",
      },
      {
        title: "Competitors",
        desc: "Analyze competitor strategy and see what's changing in your market, in real time.",
      },
    ],
    form: {
      placeholder: "Work email",
      success: "You're in — we'll reach out shortly to schedule your demo.",
      note: "No credit card, no commitment — we'll only use this to contact you.",
      modalTitle: "Book a demo",
      modalSub:
        "Leave your details and we'll get back to you fast — all fields are required.",
      firstName: "First name",
      lastName: "Last name",
      phone: "Phone",
      website: "Your website",
      submit: "Send request",
    },
  },
};

const FEATURE_ICONS = [Tag, Package, FileText, BarChart3];

/* ---------------------------------------------------------------------------
 * Dark dashboard mock — Competitive Intelligence overview, real market data.
 * ------------------------------------------------------------------------- */
function DashboardMock() {
  return (
    <div className="rounded-2xl bg-[#0d1030] ring-1 ring-white/10 shadow-2xl shadow-indigo-950/60 overflow-hidden text-left lg:[transform:perspective(1600px)_rotateY(-5deg)] lg:hover:[transform:none] transition-transform duration-500">
      {/* window bar */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/5">
        <span className="h-2 w-2 rounded-full bg-rose-400/80" />
        <span className="h-2 w-2 rounded-full bg-amber-400/80" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
      </div>
      <Image
        src="/shot-competitive.png"
        alt="MarketEdge Competitive Intelligence: competitors ranked by threat score, this week's market digest, moves, head-to-head and exploitable stock-outs on live data"
        width={1568}
        height={746}
        priority
        sizes="(max-width: 1024px) 92vw, 700px"
        className="w-full h-auto"
      />
    </div>
  );
}

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
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadDone, setLeadDone] = useState(false);

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
  const demoBtn =
    "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-indigo-600 font-semibold text-white shadow-lg shadow-indigo-950/50 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400";

  return (
    <div
      lang={lang}
      className="relative isolate min-h-screen overflow-hidden bg-[#070823] text-white"
    >
      {/* blue-violet glow, as in the design */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_60%_35%,rgba(59,53,196,0.4),transparent_65%),radial-gradient(50%_45%_at_25%_80%,rgba(124,58,237,0.22),transparent_70%)]"
      />

      {/* ---------- header ---------- */}
      <header className="sticky top-0 z-50 backdrop-blur bg-[#070823]/80 border-b border-white/5 overflow-x-clip">
        <div className="mx-auto max-w-7xl px-4 py-3.5 flex items-center justify-between gap-3">
          <Link href="/" aria-label="Go to Market Edge homepage" className="shrink-0">
            <Image
              src="/marketedge-logo-dark.svg"
              alt="MarketEdge logo"
              width={150}
              height={29}
              priority
            />
          </Link>
          <div className="flex items-center gap-3 md:gap-5">
            <LangSwitch lang={lang} onChange={changeLang} />
            <span className="hidden md:flex items-center gap-2 text-sm text-slate-300">
              <CalendarDays className="h-4 w-4 text-indigo-300" aria-hidden />
              <span>
                <b className="text-white">{EVENT.name}</b>
                <br />
                <span className="text-xs text-slate-400">{EVENT.dates[lang]}</span>
              </span>
            </span>
            <button
              type="button"
              onClick={() => setLeadOpen(true)}
              className={`${demoBtn} px-5 py-2.5 text-sm`}
            >
              {t.cta}
            </button>
          </div>
        </div>
      </header>

      {/* ---------- hero ---------- */}
      <section className="mx-auto max-w-7xl px-4 pt-12 md:pt-16 pb-10">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-8 items-center">
          <div className="text-left">
            <p className="inline-flex rounded-full bg-white/10 ring-1 ring-white/15 px-4 py-1.5 text-xs md:text-sm font-semibold text-indigo-200">
              {EVENT.name}
            </p>

            <h1 className="mt-5 text-3xl md:text-5xl font-extrabold leading-[1.15] [text-wrap:balance]">
              {t.h1a}{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {t.h1b}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base md:text-lg text-slate-300">{t.p1}</p>
            <p className="mt-4 max-w-xl text-base md:text-lg text-slate-300">{t.p2}</p>

            {leadDone ? (
              <div className="mt-8 flex max-w-xl items-center gap-3 rounded-2xl border border-emerald-300/40 bg-emerald-400/15 px-5 py-4">
                <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-300" aria-hidden />
                <p className="text-sm font-semibold">{t.form.success}</p>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setLeadOpen(true)}
                className={`${demoBtn} mt-8 px-8 py-3.5 text-base`}
              >
                {t.cta}
                <ArrowRight className="h-5 w-5" aria-hidden />
              </button>
            )}
          </div>

          <DashboardMock />
        </div>
      </section>

      {/* ---------- feature cards ---------- */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.features.map((f, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <div
                key={f.title}
                className="rounded-2xl bg-white/[0.04] ring-1 ring-white/10 p-5 backdrop-blur-sm hover:bg-white/[0.07] transition"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-500/15 ring-1 ring-indigo-400/30 text-indigo-300">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h2 className="text-lg font-extrabold">{f.title}</h2>
                </div>
                <p className="mt-3 text-sm text-slate-300">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- slim footer ---------- */}
      <footer className="border-t border-white/5 text-xs text-slate-500" role="contentinfo">
        <div className="mx-auto max-w-7xl px-4 py-6 flex flex-wrap items-center justify-between gap-3">
          <span>
            © {new Date().getFullYear()} MarketEdge · {EVENT.name} ·{" "}
            {EVENT.venue} ·{" "}
            <a
              href={EVENT.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              gpec.ro
            </a>
          </span>
          <span className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms of Service
            </Link>
          </span>
        </div>
      </footer>

      <LeadModal
        open={leadOpen}
        onClose={() => setLeadOpen(false)}
        onSuccess={() => {
          setLeadOpen(false);
          setLeadDone(true);
        }}
        t={t.form}
      />
    </div>
  );
}
