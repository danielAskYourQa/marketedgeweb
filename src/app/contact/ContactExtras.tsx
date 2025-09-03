"use client";

import { useMemo } from "react";

const PHONE_E164 = "40729014617";
const PREFILL = "Hello";

export default function ContactExtras() {
  const waLink = useMemo(() => {
    const text = encodeURIComponent(PREFILL);
    return `https://wa.me/${PHONE_E164}?text=${text}`;
  }, []);

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-4 py-2 font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
      aria-label="Contact us on WhatsApp"
    >
      <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden>
        <path
          fill="currentColor"
          d="M19.1 17.6c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 .9-.3 0-.5 0-.8-.4-.2-.3-.8-1-1.5-1.8-.4-.5-.8-1.1-.3-1.4.3-.3.7-.8.8-1.1.1-.3 0-.6 0-.8 0-.2-.7-1.7-1-2.4-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1-1.1 2.5s1.2 2.9 1.4 3.1c.2.2 2.3 3.5 5.5 4.8.8.3 1.5.5 2 .6.8.2 1.6.2 2.2.1.7-.1 2.1-.8 2.4-1.6.3-.8.3-1.5.2-1.6-.1-.1-.3-.2-.6-.3z"
        />
        <path
          fill="currentColor"
          d="M27 5a13 13 0 0 0-21.4 14.5L4 28l8.7-1.6A13 13 0 1 0 27 5zm-2.2 20.1A10.8 10.8 0 0 1 12.7 26h-.1l-5 .9.9-4.9v-.1a10.8 10.8 0 1 1 15.3 3.1z"
        />
      </svg>
      WhatsApp us
    </a>
  );
}

export function TelegramButton() {
  const telegramLink = "https://t.me/MarketEdgeSupport"; // replace with your @username

  return (
    <a
      href={telegramLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-2xl bg-[#229ED9] px-4 py-2 font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#229ED9]"
      aria-label="Contact us on Telegram"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 240 240"
        className="h-5 w-5"
        aria-hidden
      >
        <path
          d="M120 0C53.7 0 0 53.7 0 120s53.7 120 120 120 120-53.7 120-120S186.3 0 120 0z"
          fill="#229ED9"
        />
        <path
          d="M178.4 73.5L159.8 169.9c-1.4 6.8-5.6 8.4-11.3 5.2l-31.3-23.1-15.1 14.5c-1.7 1.7-3.1 3.1-6.2 3.1l2.2-32.2 58.6-52.9c2.5-2.2-.5-3.5-3.9-1.3l-72.4 45.6-31.2-9.7c-6.8-2.1-6.9-6.8 1.4-10.1l122.1-47.1c5.6-2.1 10.5 1.3 8.7 10z"
          fill="#fff"
        />
      </svg>
      Telegram
    </a>
  );
}
