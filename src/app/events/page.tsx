import type { Metadata } from "next";
import EventPageClient from "./EventPageClient";
import { EVENT } from "./event-config";

export const metadata: Metadata = {
  title: `Market Edge la ${EVENT.name}`,
  description: `Market Edge e prezent la ${EVENT.name}, ${EVENT.dates.ro}, ${EVENT.venue} — hai să ne întâlnim: vezi platforma pe piețe demo cu date reale și revendică-ți scanarea gratuită a pieței tale, livrată imediat după eveniment.`,
  alternates: { canonical: "/events" },
  /* direct-link only: keep the event page out of search results */
  robots: { index: false, follow: true },
  openGraph: {
    title: `Market Edge la ${EVENT.name}`,
    description: `Market intelligence la ${EVENT.name}: prețuri vs. competitori, assortment intelligence și poziția ta pe piață — plus o scanare gratuită a pieței tale după eveniment.`,
    url: "/events",
    images: [{ url: "/og-market-edge.png", width: 1200, height: 630 }],
  },
};

export default function EventPage() {
  return <EventPageClient />;
}
