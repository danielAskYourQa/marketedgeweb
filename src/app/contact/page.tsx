// src/app/contact/page.tsx (SERVER component)
import ContactForm from "./ContactForm";
import CalendlyInline from "./CalendlyInline";

export const metadata = {
  title: "Contact — Market Edge",
  description:
    "Get a live demo or ask us anything about Market Edge. We usually respond the same business day.",
};

export default function ContactPage() {
  return (
    <main className="min-h-[70vh] bg-white">
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-fuchsia-700/80 mb-2">
            Contact
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Let’s talk about your pricing visibility
          </h1>
          <p className="mt-3 text-neutral-700">
            Get a live demo or ask anything about Market Edge. We usually reply the
            same business day.
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-8">
          {/* Client-side form */}
          <ContactForm />

          {/* Calendly + alt contact */}
          <aside className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-1">
            <h3 className="text-lg font-semibold">Book a live demo</h3>
            <p className="mt-1 text-sm text-neutral-600">
              Pick a time that works for you.
            </p>

            <div className="mt-4">
              <CalendlyInline
                url={
                  // TODO: replace with your Calendly link
                  // Example with brand colors + cleaner UI:
                  "https://calendly.com/ask_your_qa/discovery-meeting-position"
                }
                height={760}
              />
            </div>

            <div className="mt-6 border-t border-neutral-200 pt-6">
              <h4 className="text-sm font-semibold">Other ways to reach us</h4>
              <ul className="mt-2 space-y-2 text-neutral-700 text-sm">
                <li>
                  Email:{" "}
                  <a className="underline" href="mailto:office@askyourqa.com">
                    office@askyourqa.com
                  </a>
                </li>
                <li>Phone: +40 729 014 617</li>
                <li>Location: Cluj-Napoca, Romania</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
