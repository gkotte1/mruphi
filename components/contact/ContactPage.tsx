"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { SimpleHero } from "@/components/inner-page/Hero";
import { IpWrap } from "@/components/inner-page/Shell";
import { cn } from "@/lib/cn";

/**
 * /contact-us/ - copy, offices, form fields and every state message come from
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
      "4/02, 15th Cross, Southend, Jayanagar II Block,",
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

export default function ContactPage() {
  return (
    <main>
      <Hero />
      <Body />
    </main>
  );
}

function Hero() {
  return (
    <SimpleHero
      current="Contact Us"
      badge="Get In Touch"
      badgeIcon={<Icon name="community" width={13} height={13} />}
      title="Let us know how we can AI enable your workflows"
      lede="Have questions about modules, workflows, EHR integrations? Our team of enterprise AI specialists is here to help."
    />
  );
}

function Body() {
  return (
    <section style={{ padding: "64px 0 96px" }}>
      <IpWrap
        className="ip-split"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,0.38fr) minmax(0,0.62fr)",
          alignItems: "start",
          gap: 56,
        }}
      >
        <div className="min-w-0">
          <h2 className="ip-serif text-[22px] font-medium tracking-[-0.02em] text-ink">
            Global Headquarters
          </h2>

          <ol className="mt-8 grid gap-5">
            {OFFICES.map((office) => (
              <li
                key={office.place}
                className="ip-card p-6 max-600:p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[22px] leading-none" aria-hidden>
                    {office.flag}
                  </span>
                  <p className="type-hl-card-title text-ink">
                    {office.place}
                  </p>
                </div>

                <p className="ip-mono mt-5 text-[11px] font-semibold tracking-[0.06em] uppercase text-[#878787]">
                  {office.label}
                </p>

                <address className="type-hl-card-body mt-2.5 not-italic">
                  {office.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>

                <a
                  href={`mailto:${office.email}`}
                  className="mt-3 inline-flex items-center gap-2 text-[13.5px] font-bold text-[#007EFF]"
                >
                  <Icon name="exchange" width={14} height={14} />
                  {office.email}
                </a>
              </li>
            ))}
          </ol>
        </div>

        <div className="min-w-0">
          <h2 className="ip-serif text-[22px] font-medium tracking-[-0.02em] text-ink">
            Send Us a Message
          </h2>
          <p className="type-hl-lead mt-4 max-w-[560px]">
            Fill out the form below and an AI architecture specialist will review
            your request and get back to you within 24 hours.
          </p>

          <ContactForm />
        </div>
      </IpWrap>
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
      <div className="ip-card mt-8 p-8 max-600:p-6">
        <span className="flex size-10 items-center justify-center rounded-full bg-[#007EFF] text-white">
          <Icon name="check" width={18} height={18} />
        </span>
        <p className="type-hl-card-title mt-5 text-ink">
          Thank you for your message!
        </p>
        <p className="type-hl-card-body mt-3">
          {"We've received your request and will respond to you shortly  - "}{" "}
          usually within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="ip-card mt-8 p-8 max-600:p-5"
    >
      {state === "error" ? (
        <p
          role="alert"
          className="mb-6 rounded-[8px] border border-[#E3E3E3] bg-[#F5F5F5] px-4 py-3 text-[13px] font-semibold leading-relaxed text-[#606060]"
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
              className="type-hl-inbox-title block text-ink"
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
                className="mt-2.5 w-full resize-y rounded-[8px] border border-[#E3E3E3] bg-[#F5F5F5] px-4 py-3 text-[14px] leading-relaxed text-ink transition-colors duration-200 placeholder:text-[#878787]"
              />
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                required={field.required}
                placeholder={field.placeholder}
                className="mt-2.5 w-full rounded-[8px] border border-[#E3E3E3] bg-[#F5F5F5] px-4 py-3 text-[14px] text-ink transition-colors duration-200 placeholder:text-[#878787]"
              />
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={state === "sending"}
        className="ip-btn mt-7 max-600:w-full"
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
