import type { Metadata } from "next";
import EventPageClient from "./EventPageClient";
import { EVENT } from "./event-config";

export const metadata: Metadata = {
  title: `Market Edge la ${EVENT.name}`,
  description: `Market Edge e prezent la ${EVENT.name}, ${EVENT.dates} — treci pe la ${EVENT.booth} să vezi platforma pe date reale de piață și să-ți revendici scanarea gratuită a pieței tale, livrată imediat după eveniment.`,
  alternates: { canonical: "/events" },
  /* direct-link only: keep the event page out of search results */
  robots: { index: false, follow: true },
  openGraph: {
    title: `Market Edge la ${EVENT.name}`,
    description: `Demo-uri live de market intelligence la ${EVENT.booth}: prețurile, stocurile și golurile de sortiment ale competitorilor tăi, pe date reale.`,
    url: "/events",
    images: [{ url: "/og-market-edge.png", width: 1200, height: 630 }],
  },
};

export default function EventPage() {
  return <EventPageClient />;
}
