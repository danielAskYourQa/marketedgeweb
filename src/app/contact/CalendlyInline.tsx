"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Calendly?: any;
  }
}

type Props = {
  /** Your Calendly scheduling link */
  url: string;
  /** Widget height in px (defaults to 760) */
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

    // Load script and init
    const init = () => {
      if (!containerRef.current || !window.Calendly) return;
      // Clear any previous widget for hot reloads
      containerRef.current.innerHTML = "";
      window.Calendly.initInlineWidget({
        url,
        parentElement: containerRef.current,
        prefill: {},
        utm: {},
      });
    };

    if (window.Calendly) {
      init();
    } else {
      const scriptId = "calendly-widget-js";
      let script = document.getElementById(scriptId) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        script.onload = init;
        document.body.appendChild(script);
      } else {
        // If script tag exists but Calendly not ready yet, attach onload
        if (!window.Calendly) script.addEventListener("load", init, { once: true });
        else init();
      }
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
