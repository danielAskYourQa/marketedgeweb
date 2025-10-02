import Link from "next/link";

export default function CaseStudiesContent() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <header className="mb-20 text-center">
        <span className="inline-block rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 px-4 py-1 text-sm font-semibold text-white shadow-sm">
          Proof, not promises
        </span>
        <h1 className="mt-6 text-5xl font-extrabold tracking-tight md:text-6xl bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Case Studies
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
          Discover how brands and retailers transformed pricing strategies and
          protected margins with Market Edge.
        </p>
      </header>

      {/* Case Study 1 */}
      <section className="mb-24 rounded-3xl border bg-white/80 p-8 shadow-lg backdrop-blur-sm transition hover:shadow-xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold text-gray-900">
              Case Study Producer – MIELE KUIBA
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Client: European consumer electronics manufacturer
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Card title="Challenge">
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    Products sold by <strong>&gt;200 resellers</strong> across
                    Europe.
                  </li>
                  <li>
                    <strong>30% of resellers</strong> listed items below MAP.
                  </li>
                </ul>
              </Card>
              <Card title="Solution with Market Edge">
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    MAP monitoring across <strong>2 countries</strong>.
                  </li>
                  <li>Real-time alerts + weekly compliance reports.</li>
                </ul>
              </Card>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Stat
                kpi="−82%"
                label="MAP violations"
                note="30% → &lt;5% in 3 months"
              />
              <Stat kpi="+12%" label="Avg. margin" note="Flagship products" />
              <Stat kpi="2" label="Countries covered" />
              <Stat kpi="&lt;3 weeks" label="ROI payback" />
            </div>
          </div>

          <aside className="md:w-1/3">
            <Quote>
              “We finally gained control over our price positioning across
              Romania && Hungary. Compliance calls dropped and margins
              recovered.”
            </Quote>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge>MAP compliance</Badge>
              <Badge>Multi-country rollout</Badge>
              <Badge>Automated reporting</Badge>
            </div>
          </aside>
        </div>
      </section>

      {/* Case Study 2 */}
      <section className="mb-24 rounded-3xl border bg-white/80 p-8 shadow-lg backdrop-blur-sm transition hover:shadow-xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold text-gray-900">
              Case Study Reseller – SKF Bearings Distributor
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Client: Online Bearings retailer with +70000 SKUs
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Card title="Challenge">
                <ul className="list-disc space-y-2 pl-5">
                  <li>Competitors ran flash sales and undercut prices.</li>
                  <li>
                    <strong>20+ hrs/week</strong> wasted on manual checks.
                  </li>
                </ul>
              </Card>
              <Card title="Solution with Market Edge">
                <ul className="list-disc space-y-2 pl-5">
                  <li>Multi-channel monitoring (websites + marketplaces).</li>
                  <li>Automated alerts on competitor price drops.</li>
                  <li>Weekly dashboard with trends & insights.</li>
                </ul>
              </Card>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Stat kpi="20 hrs/wk" label="Time saved" note="≈ 1 FTE" />
              <Stat kpi="+9%" label="Sales uplift" />
              <Stat kpi="+4%" label="Margin gain" />
              <Stat kpi="2 weeks" label="ROI payback" />
            </div>
          </div>

          <aside className="md:w-1/3">
            <Quote>
              “We stopped blanket discounts. Now we react precisely where it
              matters — in hours, not days.”
            </Quote>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge>Flash sale detection</Badge>
              <Badge>Marketplace coverage</Badge>
              <Badge>Team productivity</Badge>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-3xl bg-gradient-to-br from-purple-600 via-fuchsia-600 to-indigo-600 p-10 text-white shadow-xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h3 className="text-3xl font-bold">Ready to see the impact?</h3>
            <p className="mt-2 text-white/90">
              Connect your feed, select competitors, and unlock insights in
              days.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-gray-900 shadow-md transition hover:scale-105 hover:shadow-lg"
            >
              Book a demo
            </Link>
            <Link
              href="/#pricing"
              className="rounded-xl border border-white/40 px-6 py-3 font-semibold text-white/90 transition hover:bg-white/10 hover:scale-105"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-white/90 p-6 shadow-sm transition hover:shadow-md">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <div className="mt-4 text-sm leading-relaxed text-gray-600">
        {children}
      </div>
    </div>
  );
}

function Stat({
  kpi,
  label,
  note,
}: {
  kpi: string;
  label: string;
  note?: string;
}) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-6 text-center shadow-sm">
      <div className="text-4xl font-extrabold text-gray-900">{kpi}</div>
      <div className="mt-2 text-sm font-medium text-gray-500">{label}</div>
      {note ? <div className="mt-1 text-xs text-gray-400">{note}</div> : null}
    </div>
  );
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-6 italic text-gray-700 shadow-sm">
      {children}
    </blockquote>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 px-3 py-1 text-xs font-medium text-gray-700">
      {children}
    </span>
  );
}
