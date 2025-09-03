"use client";
import { useEffect, useState } from "react";

export function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <a
      href="https://auth.webshopqa.com/login?client_id=719452pnlcub3boop4mhap7bop&response_type=token&redirect_uri=https://webshopqa.com"
      className="fixed bottom-5 right-5 rounded-full px-5 py-3 text-sm font-semibold text-white bg-gradient-to-tr from-fuchsia-600 to-indigo-600 shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
    >
      Start free trial
    </a>
  );
}
