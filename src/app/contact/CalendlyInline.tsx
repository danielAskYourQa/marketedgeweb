// src/app/contact/CalendlyInline.tsx (CLIENT component)
"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Calendly?: any;
  }
}

type Props = {
  /** Your Calendly scheduling link, e.g. https://calendly.com/your-handle/30min */
  url: string;
  /** Widget height in px (defaults 760) */
  height?: number;
};

export default function CalendlyInline({ url, height = 760 }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Inject CSS once
    if (!document.querySelector<HTMLLinkElement>("#calendly-widget-css")) {
      const link = document.createElement("link");
      link.id = "calendly-widget-css";
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    // Initialize when script ready
    const init = () => {
      if (!containerRef.current || !window.Calendly) return;
      containerRef.current.innerHTML = ""; // hot-reload safety
      window.Calendly.initInlineWidget({
        url,
        parentElement: containerRef.current,
        prefill: {},
        utm: {},
      });
    };

    // Load script if missing
    const scriptId = "calendly-widget-js";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (window.Calendly) {
      init();
    } else if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = init;
      document.body.appendChild(script);
    } else {
      script.addEventListener("load", init, { once: true });
    }
  }, [url]);

  return (
    <div
      ref={containerRef}
      style={{ minWidth: 320, height }}
      aria-label="Book a time"
    />
  );
}
