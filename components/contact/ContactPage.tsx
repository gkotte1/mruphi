"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";

/**
 * /contact-us/ — copy, offices, form fields and every state message come from
 * website-research/company/contact-us.md, including the endpoint the research
 * confirmed from the original application source: POST /api/contact/ as flat
 * JSON, with the access key held server-side only.
 */

const OFFICES = [
  {
    flag: "🇺🇸",
    place: "North Carolina, USA",
    label: "USA Office Address",
    lines: ["Deskfactors Inc, 4804 Page Creek Lane", "Durham, North Carolina 27703"],
    email: "info@murphi.ai",
  },
  {
    flag: "🇮🇳",
    place: "Bengaluru, India",
    label: "India Office Address",
    lines: [
      "4/02 15th Cross, Southend, Jayanagar II Block,",
      "Bengaluru, Karnataka 560011, India",
    ],
    email: "info@murphi.ai",
  },
];

type Field = {
  name: string;
  label: string;
  type: "text" | "email" | "textarea";
  placeholder: string;
  required: boolean;
};

const FIELDS: Field[] = [
  { name: "first_name", label: "First Name*", type: "text", placeholder: "John", required: true },
  { name: "last_name", label: "Last Name", type: "text", placeholder: "Doe", required: false },
  {
    name: "email",
    label: "Work Email*",
    type: "email",
    placeholder: "john@hospital.org",
    required: true,
  },
  {
    name: "organization",
    label: "Organization",
    type: "text",
    placeholder: "Healthcare System / Clinic Name",
    required: false,
  },
  {
    name: "message",
    label: "How can we help you?*",
    type: "textarea",
    placeholder: "Describe your technical requirements or goals...",
    required: true,
  },
];

const SHELL = "mx-auto w-full max-w-[1280px] px-10 max-1200:px-8 max-600:px-4";

export default function ContactPage() {
  return (
    <main>
      <Hero />
      <Body />
    </main>
  );
}

function Hero() {
  /* overflow-hidden is dropped so the outline's soft shadow is not clipped at
     the section edge; the background layer is inset-0 and never overflows. */
  return (
    <section className="relative isolate pt-[80px]">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "#FFFFFF",
        }}
        aria-hidden
      />

      {/* The section below carries no top padding, so the separation between
          the hero and the form is set here, and eases down by breakpoint. */}
      <div
        className={cn(
          SHELL,
          "pt-16 pb-28 max-1024:pb-24 max-600:pt-10 max-600:pb-16",
        )}
      >
        {/* A thin #007EFF outline defines the hero without filling it. */}
        <div className="mx-auto max-w-[1000px] rounded-[32px] border border-brand bg-white px-14 py-16 text-center shadow-[0_30px_80px_-50px_rgba(0,126,255,0.45)] max-1024:px-10 max-600:rounded-[24px] max-600:px-6 max-600:py-10">
          <p className="type-label inline-flex items-center gap-2 rounded-full border border-brand-ghost bg-brand-tint px-3.5 py-1.5 text-brand-dark">
            <Icon name="community" width={13} height={13} />
            Get In Touch
          </p>

          <h1 className="mx-auto mt-7 max-w-[800px] type-h1 text-ink">
            {"Let's build the future of "}
            <span className="text-brand-dark">healthcare AI</span> together
          </h1>

          <p className="type-lead mx-auto mt-6 max-w-[640px] text-grey-dk">
            Have questions about EHR integrations, customized modules, or pricing?
            Our team of enterprise AI specialists is here to help.
          </p>
        </div>
      </div>
    </section>
  );
}

function Body() {
  return (
    <section className="bg-white pb-28 max-1024:pb-20 max-600:pb-16">
      <div
        className={cn(
          SHELL,
          "grid grid-cols-[minmax(0,38fr)_minmax(0,62fr)] items-start gap-x-14 max-1024:grid-cols-1 max-1024:gap-y-12",
        )}
      >
        <div className="min-w-0">
          <h2 className="type-h4 text-ink">
            Global Headquarters
          </h2>

          <ol className="mt-8 grid gap-5">
            {OFFICES.map((office) => (
              <li
                key={office.place}
                className="rounded-panel border border-grey-mid bg-grey-bg p-6 max-600:p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[22px] leading-none" aria-hidden>
                    {office.flag}
                  </span>
                  <p className="text-[15.5px] font-extrabold tracking-[-0.02em] text-ink">
                    {office.place}
                  </p>
                </div>

                <p className="type-micro mt-5 text-grey-dk/45">{office.label}</p>

                <address className="mt-2.5 not-italic text-[13.5px] leading-relaxed text-grey-dk/85">
                  {office.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>

                <a
                  href={`mailto:${office.email}`}
                  className="mt-3 inline-flex items-center gap-2 text-[13.5px] font-bold text-brand-dark transition-colors duration-200 hover:text-brand-deep"
                >
                  <Icon name="exchange" width={14} height={14} />
                  {office.email}
                </a>
              </li>
            ))}
          </ol>
        </div>

        <div className="min-w-0">
          <h2 className="type-h4 text-ink">
            Send Us a Message
          </h2>
          <p className="mt-4 max-w-[560px] text-[14.5px] leading-relaxed text-grey-dk">
            Fill out the form below and an AI architecture specialist will review
            your request and get back to you within 24 hours.
          </p>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setState("sending");

    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(String(response.status));

      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="mt-8 rounded-panel border border-brand-pale bg-grey-bg p-8 max-600:p-6">
        <span className="flex size-10 items-center justify-center rounded-full bg-brand-deep text-white">
          <Icon name="check" width={18} height={18} />
        </span>
        <p className="mt-5 text-[17px] font-extrabold tracking-[-0.02em] text-ink">
          Thank you for your message!
        </p>
        <p className="mt-3 text-[14px] leading-relaxed text-grey-dk">
          {"We've received your request and will respond to you shortly —"}{" "}
          usually within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="mt-8 rounded-[24px] border border-grey-mid bg-white p-8 shadow-[0_24px_60px_-46px_rgba(15,29,84,0.4)] max-600:p-5"
    >
      {state === "error" ? (
        <p
          role="alert"
          className="mb-6 rounded-card border border-grey-mid bg-grey-bg px-4 py-3 text-[13px] font-semibold leading-relaxed text-grey-500"
        >
          ⚠️ Something went wrong. Please try again or email us at info@murphi.ai
        </p>
      ) : null}

      <div className="grid grid-cols-2 gap-5 max-600:grid-cols-1 max-600:gap-4">
        {FIELDS.map((field) => (
          <div
            key={field.name}
            className={cn("min-w-0", field.type === "textarea" && "col-span-2 max-600:col-span-1")}
          >
            <label
              htmlFor={field.name}
              className="block text-[12.5px] font-bold tracking-[-0.01em] text-ink"
            >
              {field.label}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                rows={5}
                required={field.required}
                placeholder={field.placeholder}
                className="mt-2.5 w-full resize-y rounded-card border border-grey-mid bg-grey-bg px-4 py-3 text-[14px] leading-relaxed text-ink transition-colors duration-200 placeholder:text-ink-muted focus:border-brand-border focus:bg-white"
              />
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                required={field.required}
                placeholder={field.placeholder}
                className="mt-2.5 w-full rounded-card border border-grey-mid bg-grey-bg px-4 py-3 text-[14px] text-ink transition-colors duration-200 placeholder:text-ink-muted focus:border-brand-border focus:bg-white"
              />
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-7 btn-primary max-600:w-full"
      >
        {state === "sending" ? (
          <>
            <span
              className="size-4 animate-[spin_0.8s_linear_infinite] rounded-full border-2 border-white/40 border-t-white"
              aria-hidden
            />
            <span className="sr-only">Sending</span>
          </>
        ) : (
          "Submit Request →"
        )}
      </button>
    </form>
  );
}
