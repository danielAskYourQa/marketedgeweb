import { Review } from "./components/ReviewCarousel";

export const trustpilotReviews: Review[] = [
  {
    id: "tp-1",
    name: "Sandor Tarczali",
    rating: 5,
    text: "A very promising tool in our modern competitive market.",
    url: "https://www.trustpilot.com/review/marketedgemonitoring.com", // direct link to review
    date: "2025-09-19",
    countryCode: "RO",
    title: "Very promising tool",
  },
  {
    id: "tp-2",
    name: "Ernest Czol",
    rating: 4,
    text: "Nagyon hasznos eszköz, megkönnyíti az árazást és a konkurencia figyelését. A kezdeti konfiguráció kicsit nehézkesnek tűnhet, de Dániel sokat segített, és minden gördülékenyen ment.",
    url: "https://www.trustpilot.com/review/marketedgemonitoring.com",
    date: "2025-09-18",
    countryCode: "HU",
    title: "Nagyon hasznos eszköz",
  },
  {
    id: "tp-3",
    name: "Demetra Theodorou",
    rating: 5,
    text: "Very good tool. We are monitoring our pricing across competitors, and it has made our life easier by helping us analyze and make better decisions about our current pricing.",
    url: "https://www.trustpilot.com/review/marketedgemonitoring.com",
    date: "2025-09-18",
    countryCode: "CY",
    title: "Very good tool",
  },
  {
    id: "tp-4",
    name: "Radu Cristea",
    rating: 5,
    text: "I integrated the solution for a client of mine, and they were very satisfied. Instead of scraping websites, data, and feeding other AIs scraping info, it’s better to use their solution.",
    url: "https://www.trustpilot.com/review/marketedgemonitoring.com",
    date: "2025-09-17",
    countryCode: "RO",
    title: "Client integration",
  },
];


export const defaultFaqs = [
  {
    q: "What is Market Edge?",
    a: "Market Edge is a B2B platform that helps you monitor your product prices across competitor websites and marketplaces in near real time.",
  },
  {
    q: "Who is Market Edge for?",
    a: "Distributors, manufacturers, retailers, and importers who need a clear view of pricing and stock across the market.",
  },
  {
    q: "How does Market Edge collect data?",
    a: "Advanced web crawlers plus AI-based matching algorithms track the products you select and deliver clean data on price and availability.",
  },
  {
    q: "Can I try it before I commit?",
    a: "Yes — we offer a free trial so you can evaluate value and fit for your workflows.",
  },
  {
    q: "Do you support marketplaces like eMAG or Amazon?",
    a: "Yes, we support major marketplaces (eMAG, Amazon, eBay and more) and add new ones based on demand.",
  },
];
