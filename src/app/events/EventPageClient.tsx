"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  BarChart3,
  PackageSearch,
  ScanSearch,
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
    sub: "Suntem la ecomTEAM toate cele trei zile. Îți arătăm platforma pe piețe demo cu date reale, ne spui site-ul tău și competitorii — iar imediat după eveniment îți construim aceeași imagine pentru afacerea ta.",
    bookSlot: "Programează o întâlnire la eveniment →",
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
    componentsEyebrow: "Platforma",
    componentsH2: "Trei componente. Toată piața ta.",
    componentsSub:
      "Fără slide-uri — platforma live, pe piețe demo cu date reale. Versiunea pentru piața ta o construim după eveniment.",
    components: [
      {
        title: "Prețurile tale vs. competitori",
        desc: "Produs cu produs: unde ești mai ieftin, unde ești mai scump și cine te subcotează — cu indice de preț pentru fiecare competitor.",
      },
      {
        title: "Assortment intelligence",
        desc: "Categoriile și brandurile care îți lipsesc: produsele pe care competitorii le vând și tu nu, ordonate după cât de ușor sunt de câștigat.",
      },
      {
        title: "Market intelligence",
        desc: "Poziția ta pe segmente: ești mai ieftin pe anumite branduri sau categorii? Unde ești singurul care vinde — și unde lipsești cu totul?",
      },
    ],
    offerEyebrow: "Oferta ecomTEAM",
    offerH2: "Scanare de piață gratuită pentru fiecare vizitator",
    offerP:
      "Spune-ne site-ul tău și competitorii principali — când ne întâlnim la eveniment sau lăsându-ți emailul mai sus. Configurăm crawlerele, rulăm prima scanare completă a pieței tale și îți trimitem raportul în zilele imediat următoare evenimentului. Raportul rămâne al tău, indiferent ce decizi.",
    offerBullets: [
      "Configurăm crawlere pentru competitorii tăi — zero efort din partea ta",
      "Raport de poziționare a prețurilor: unde ești mai ieftin, unde nu",
      "Goluri de sortiment: produse și branduri pe care competitorii le vând și tu nu",
      "Fără card, fără obligații — raportul e al tău",
    ],
    offerCta: "Rezervă-ți scanarea",
    closingH2: `Nu ajungi la ${EVENT.name}?`,
    closingP:
      "Programează un demo remote și îți prezentăm platforma într-un call — apoi configurăm aceeași scanare gratuită pentru afacerea ta.",
    closingCta: "Programează un demo remote",
    pricing: "Vezi prețurile",
  },
  en: {
    badge: `Live at ${EVENT.name}`,
    h1a: "See your market like",
    h1b: "you've never seen it",
    sub: "We're at ecomTEAM all three days. We'll show you the platform on demo markets with real data, you tell us your website and competitors — and right after the event we build the same view for your business.",
    bookSlot: "Book a meeting at the event →",
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
    componentsEyebrow: "The platform",
    componentsH2: "Three components. Your whole market.",
    componentsSub:
      "No slides — the live platform, on demo markets with real data. The version for your own market comes right after the event.",
    components: [
      {
        title: "Your prices vs. competitors",
        desc: "Product by product: where you're cheaper, where you're not, and who undercuts you — with a price index for every competitor.",
      },
      {
        title: "Assortment intelligence",
        desc: "The categories and brands you're missing: products competitors sell that you don't, ranked by how easy they are to win.",
      },
      {
        title: "Market intelligence",
        desc: "Your position by segment: are you cheaper on certain brands or categories? Where are you the only seller — and where are you missing entirely?",
      },
    ],
    offerEyebrow: "ecomTEAM offer",
    offerH2: "Free market scan for every visitor",
    offerP:
      "Tell us your website and your top competitors — when we meet at the event, or by leaving your email above. We'll configure the crawlers, run your first full market scan, and send you the report in the days right after the event. You keep it either way.",
    offerBullets: [
      "We set up crawlers for your competitors — no work on your side",
      "Price position report: where you're cheaper, where you're not",
      "Assortment gaps: products & brands competitors sell that you don't",
      "No credit card, no commitment — the report is yours",
    ],
    offerCta: "Reserve your scan",
    closingH2: `Can't make it to ${EVENT.name}?`,
    closingP:
      "Book a remote demo and we'll walk you through the platform over a call — and set up the same free market scan for your business afterwards.",
    closingCta: "Book a remote demo",
    pricing: "See pricing",
  },
} as const;

/* the platform's three components; the third renders the new Market
   Intelligence screens as a live mock (from the CI mockups artifact) */
const COMPONENT_MEDIA: {
  icon: typeof BarChart3;
  img?: string;
  alt?: string;
}[] = [
  {
    icon: BarChart3,
    img: "/shot-benchmark.png",
    alt: "Market Edge: price index and head-to-head price comparison against every tracked competitor",
  },
  {
    icon: PackageSearch,
    img: "/shot-overview.png",
    alt: "Market Edge assortment intelligence: product gaps and brand gaps on a live demo market",
  },
  {
    icon: ScanSearch, // no img: renders <MarketIntelMock /> below
  },
];

/* compact rendition of the new Competitive/Market Intelligence overview */
function MarketIntelMock() {
  const competitors = [
    { name: "vonmag", badge: "HIGH · 92", tone: "bg-rose-50 text-rose-700 border-l-rose-600", stat: "1,204 contested · +99/30d" },
    { name: "ecoiluminat", badge: "MED · 48", tone: "bg-amber-50 text-amber-700 border-l-amber-600", stat: "486 · 1.06× above you" },
    { name: "smarthouseelectric", badge: "LOW · 31", tone: "bg-emerald-50 text-emerald-700 border-l-emerald-600", stat: "402 · 1.02×" },
  ];
  return (
    <div className="rounded-xl shadow-md ring-1 ring-black/10 bg-[#f4f5f9] p-3 text-left select-none">
      {/* header */}
      <div className="flex items-center justify-between rounded-lg bg-white ring-1 ring-black/5 px-3 py-2">
        <div>
          <p className="text-[11px] font-bold text-neutral-900 leading-tight">Competitive Intelligence</p>
          <p className="text-[8px] text-neutral-400">Who threatens you, what they changed, where you fight</p>
        </div>
        <span className="rounded-md bg-indigo-600 px-1.5 py-0.5 text-[8px] font-semibold text-white">Live</span>
      </div>

      {/* threat-ranked competitors */}
      <div className="mt-2 rounded-lg bg-white ring-1 ring-black/5 overflow-hidden">
        {competitors.map((c) => (
          <div key={c.name} className={`flex items-center gap-2 border-l-4 px-2.5 py-1.5 ${c.tone.split(" ").pop()}`}>
            <span className="text-[9px] font-bold text-neutral-800">{c.name}</span>
            <span className={`rounded px-1 py-0.5 text-[7px] font-bold ${c.tone.split(" ").slice(0, 2).join(" ")}`}>
              {c.badge}
            </span>
            <span className="ml-auto text-[8px] text-neutral-500">{c.stat}</span>
          </div>
        ))}
      </div>

      {/* head-to-head bar */}
      <div className="mt-2 rounded-lg bg-white ring-1 ring-black/5 px-3 py-2">
        <p className="text-[8px] font-semibold text-neutral-500 mb-1">
          Head-to-Head vs vonmag · 1,204 shared products
        </p>
        <div className="flex h-3 overflow-hidden rounded-full text-[7px] font-bold text-white">
          <span className="grid place-items-center bg-emerald-700" style={{ width: "38%" }}>
            you 38%
          </span>
          <span className="bg-slate-300" style={{ width: "18%" }} />
          <span className="grid place-items-center bg-rose-700" style={{ width: "44%" }}>
            they 44%
          </span>
        </div>
      </div>

      {/* moves + promo strip */}
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-white ring-1 ring-black/5 px-2.5 py-1.5">
          <p className="text-[8px] font-semibold text-neutral-500">Moves · 7 days</p>
          <p className="text-[8px] text-neutral-700 mt-0.5">💸 vonmag price wave on <b>118 shared products</b></p>
          <p className="text-[8px] font-semibold text-emerald-700 mt-0.5">⚡ 7 stockouts you can exploit</p>
        </div>
        <div className="rounded-lg bg-white ring-1 ring-black/5 px-2.5 py-1.5">
          <p className="text-[8px] font-semibold text-neutral-500">Promo Watch</p>
          <p className="text-[8px] text-neutral-700 mt-0.5"><b>47</b> active promos · median <b className="text-rose-600">−18%</b></p>
          <p className="text-[8px] text-neutral-700 mt-0.5"><b className="text-rose-600">12</b> hit your products</p>
        </div>
      </div>
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
            <a href="#components" className="font-semibold text-slate-400 hover:text-white transition">
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

      {/* ---------- the three platform components ---------- */}
      <section id="components" className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs md:text-sm uppercase tracking-widest text-indigo-600 font-semibold mb-3">
              {t.componentsEyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold [text-wrap:balance]">{t.componentsH2}</h2>
            <p className="mt-4 text-neutral-600 text-lg">{t.componentsSub}</p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {t.components.map((c, i) => {
              const media = COMPONENT_MEDIA[i];
              const Icon = media.icon;
              return (
                <div
                  key={c.title}
                  className="flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="text-lg font-extrabold leading-snug">{c.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-neutral-600">{c.desc}</p>
                  <div className="mt-auto pt-5">
                    {media.img ? (
                      <Image
                        src={media.img}
                        alt={media.alt ?? ""}
                        width={2265}
                        height={1330}
                        sizes="(max-width: 1024px) 92vw, 400px"
                        className="w-full h-auto rounded-xl shadow-md ring-1 ring-black/10"
                      />
                    ) : (
                      <MarketIntelMock />
                    )}
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
              src="/shot-product-gaps.png"
              alt="Market Edge product gaps: products competitors sell that you don't, with best market price per product"
              width={2277}
              height={1342}
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
            <a
              href={EVENT.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
            >
              {t.closingCta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
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
