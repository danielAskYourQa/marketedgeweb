"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  ScanSearch,
  PackageSearch,
  Zap,
  Check,
} from "lucide-react";
import EventLeadForm from "../components/EventLeadForm";
import { EVENT } from "./event-config";

type Lang = "ro" | "en";

/* ---------------------------------------------------------------------------
 * All page copy, both languages. RO is the default (local event).
 * ------------------------------------------------------------------------- */
const STRINGS = {
  ro: {
    badge: `Ne găsești la ${EVENT.name}`,
    h1a: "Vezi piața ta cum",
    h1b: "n-ai mai văzut-o niciodată",
    sub: "Vezi platforma în acțiune pe o piață reală, la standul nostru — apoi spune-ne site-ul tău și competitorii, iar noi construim aceeași imagine pentru afacerea ta și ți-o trimitem imediat după eveniment.",
    bookSlot: "Rezervă un slot de demo →",
    whatWeShow: "Ce îți arătăm ↓",
    form: {
      placeholder: "Email de serviciu",
      button: "Vreau scanarea gratuită",
      success:
        "Gata! Te contactăm ca să aflăm site-ul tău și lista de competitori — scanarea ta va fi gata imediat după eveniment.",
      note: "Fără card, fără obligații — folosim emailul doar ca să-ți trimitem scanarea pieței.",
    },
    proof: [
      { big: "+27.400 €", small: "marjă recuperată lunar pentru un distribuitor FMCG" },
      { big: "~200.000 €", small: "venit anual dintr-o singură comandă salvată" },
      { big: "25–30h", small: "ore economisite lunar la verificările MAP" },
    ],
    demosEyebrow: "La standul nostru",
    demosH2: "Trei demo-uri. Cincisprezece minute. Datele tale.",
    demosSub:
      "Fără slide-uri, fără broșuri — platforma live, pe date reale de piață, îndreptată către afacerea ta.",
    demoLabel: "Demo",
    demos: [
      {
        title: "Platforma, live",
        desc: "O piață reală pe ecran: peste 30.000 de produse la 4 competitori — prețuri, stocuri, goluri de sortiment și tendințe, exact cum le văd clienții noștri în fiecare dimineață.",
      },
      {
        title: "Golurile tale, pe ecran",
        desc: "Produsele și brandurile pe care competitorii le vând și tu nu — ordonate după veniturile pe care le valorează și cât de ușor sunt de câștigat.",
      },
      {
        title: "Acțiuni concrete, nu date brute",
        desc: "Opportunity Engine transformă fiecare gol într-un pas următor: branduri de adăugat, categorii în care să intri, tendințe de urmat.",
      },
    ],
    offerEyebrow: "Oferta de eveniment",
    offerH2: "Scanare de piață gratuită pentru fiecare vizitator",
    offerP:
      "Lasă-ne site-ul tău și competitorii principali la stand. Configurăm crawlerele, rulăm prima scanare completă a pieței tale și îți trimitem raportul în zilele imediat următoare evenimentului. Raportul rămâne al tău, indiferent ce decizi.",
    offerBullets: [
      "Configurăm crawlere pentru competitorii tăi — zero efort din partea ta",
      "Raport de poziționare a prețurilor: unde ești mai ieftin, unde nu",
      "Goluri de sortiment: produse și branduri pe care competitorii le vând și tu nu",
      "Fără card, fără obligații — raportul e al tău",
    ],
    offerCta: "Rezervă-ți scanarea",
    closingH2: `Nu ajungi la ${EVENT.booth}?`,
    closingP:
      "Programează un demo remote și îți prezentăm platforma într-un call — apoi configurăm aceeași scanare gratuită pentru afacerea ta.",
    closingCta: "Programează un demo remote",
    pricing: "Vezi prețurile",
  },
  en: {
    badge: `Live at ${EVENT.name}`,
    h1a: "See your market like",
    h1b: "you've never seen it",
    sub: "Watch the platform work on a real market at our stand — then tell us your website and competitors, and we'll build the same view for your business and send it right after the event.",
    bookSlot: "Book a demo slot →",
    whatWeShow: "What we'll show you ↓",
    form: {
      placeholder: "Work email",
      button: "Claim your free scan",
      success:
        "You're in — we'll reach out to grab your website and competitor list, and your scan will be ready right after the event.",
      note: "No credit card, no commitment — we'll only use this to send your market scan.",
    },
    proof: [
      { big: "+€27.4k", small: "monthly margin recovered for an FMCG distributor" },
      { big: "~€200k", small: "yearly revenue from one saved order" },
      { big: "25–30h", small: "executive hours saved per month on MAP checks" },
    ],
    demosEyebrow: "At our stand",
    demosH2: "Three demos. Fifteen minutes. Your data.",
    demosSub:
      "No slides, no brochure-ware — the live platform, on real market data, pointed at your business.",
    demoLabel: "Demo",
    demos: [
      {
        title: "The platform, live",
        desc: "A real market on screen: 30,000+ products across 4 competitors — prices, stock, gaps and trends, exactly as our clients see them every morning.",
      },
      {
        title: "Your gaps, on screen",
        desc: "Products and brands your competitors sell that you don't — ranked by how much revenue they're worth and how easy they are to win.",
      },
      {
        title: "Ranked actions, not raw data",
        desc: "The Opportunity Engine turns every gap into a next step: brands to add, categories to enter, momentum to ride.",
      },
    ],
    offerEyebrow: "Conference offer",
    offerH2: "Free market scan for every visitor",
    offerP:
      "Leave us your website and your top competitors at the stand. We'll configure the crawlers, run your first full market scan, and send you the report in the days right after the event. You keep it either way.",
    offerBullets: [
      "We set up crawlers for your competitors — no work on your side",
      "Price position report: where you're cheaper, where you're not",
      "Assortment gaps: products & brands competitors sell that you don't",
      "No credit card, no commitment — the report is yours",
    ],
    offerCta: "Reserve your scan",
    closingH2: `Can't make it to ${EVENT.booth}?`,
    closingP:
      "Book a remote demo and we'll walk you through the platform over a call — and set up the same free market scan for your business afterwards.",
    closingCta: "Book a remote demo",
    pricing: "See pricing",
  },
} as const;

const DEMO_MEDIA = [
  { icon: ScanSearch, img: "/shot-overview.png", alt: "Market Edge assortment overview on live market data" },
  { icon: PackageSearch, img: "/shot-brand-gaps.png", alt: "Market Edge brand gaps ranked by opportunity" },
  { icon: Zap, img: "/shot-opportunity.png", alt: "Market Edge opportunity engine with ranked actions" },
];

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
      {/* ---------- hero ---------- */}
      <section id="scan" className="relative isolate overflow-hidden bg-[#0b0b26] text-white">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(79,70,229,0.28),transparent_70%)]"
        />
        <div className="mx-auto max-w-7xl px-4 pt-8 md:pt-10 pb-16 text-center">
          {/* language switch */}
          <div className="flex justify-end">
            <LangSwitch lang={lang} onChange={changeLang} />
          </div>

          <p className="mt-8 md:mt-12 inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/15 px-4 py-1.5 text-xs md:text-sm font-semibold text-indigo-200">
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
              {EVENT.dates}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-indigo-300" aria-hidden />
              {EVENT.venue} · {EVENT.booth}
            </span>
          </div>

          <EventLeadForm t={t.form} />

          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link href={EVENT.bookingUrl} className="font-semibold text-indigo-300 hover:text-white transition">
              {t.bookSlot}
            </Link>
            <a href="#demos" className="font-semibold text-slate-400 hover:text-white transition">
              {t.whatWeShow}
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
      </section>

      {/* ---------- what we'll show you ---------- */}
      <section id="demos" className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs md:text-sm uppercase tracking-widest text-indigo-600 font-semibold mb-3">
              {t.demosEyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold [text-wrap:balance]">{t.demosH2}</h2>
            <p className="mt-4 text-neutral-600 text-lg">{t.demosSub}</p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {t.demos.map((d, i) => {
              const media = DEMO_MEDIA[i];
              const Icon = media.icon;
              return (
                <div
                  key={d.title}
                  className="flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                      {t.demoLabel} {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-extrabold">{d.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{d.desc}</p>
                  <div className="mt-5">
                    <Image
                      src={media.img}
                      alt={media.alt}
                      width={2265}
                      height={1330}
                      sizes="(max-width: 1024px) 92vw, 400px"
                      className="w-full h-auto rounded-xl shadow-md ring-1 ring-black/10"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- the offer ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs md:text-sm uppercase tracking-widest text-indigo-600 font-semibold mb-3">
              {t.offerEyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold [text-wrap:balance]">{t.offerH2}</h2>
            <p className="mt-4 text-neutral-600">{t.offerP}</p>
            <ul className="mt-6 space-y-2.5">
              {t.offerBullets.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-neutral-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                  <span className="text-sm">{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#scan"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl px-6 py-3 bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
            >
              {t.offerCta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
          <div className="min-w-0">
            <Image
              src="/shot-benchmark.png"
              alt="Market Edge benchmarking: your catalog versus every tracked competitor"
              width={2265}
              height={1325}
              sizes="(max-width: 1024px) 92vw, 620px"
              className="w-full h-auto rounded-2xl shadow-xl ring-1 ring-black/10"
            />
          </div>
        </div>
      </section>

      {/* ---------- closing CTA ---------- */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-[#0b0b26] text-white p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(70%_100%_at_80%_0%,rgba(217,70,239,0.25),transparent_60%),radial-gradient(70%_100%_at_10%_100%,rgba(79,70,229,0.3),transparent_60%)]"
          />
          <div className="relative">
            <h2 className="text-2xl md:text-4xl font-extrabold [text-wrap:balance]">{t.closingH2}</h2>
            <p className="text-slate-300 mt-2 max-w-xl">{t.closingP}</p>
          </div>
          <div className="relative flex gap-3 shrink-0">
            <Link
              href={EVENT.bookingUrl}
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
            >
              {t.closingCta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/#pricing"
              className="rounded-2xl px-5 py-3 border border-white/30 text-white font-semibold hover:bg-white/10 transition"
            >
              {t.pricing}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
