// src/app/contact/CalendlyInline.tsx
"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, unknown>;
        utm?: Record<string, unknown>;
      }) => void;
    };
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

    const init = () => {
      if (!containerRef.current || !window.Calendly) return;
      containerRef.current.innerHTML = "";
      window.Calendly.initInlineWidget({
        url,
        parentElement: containerRef.current,
        prefill: {},
        utm: {},
      });
    };

    // Load script and init
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
