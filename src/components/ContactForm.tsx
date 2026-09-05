"use client";

import { useState, type FormEvent, type ReactNode } from "react";

const FORM_ENDPOINT = "https://formspree.io/f/xgawywwl";

type Status = "idle" | "pending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("pending");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="work-card-glow contact-form-card relative rounded-3xl p-8 text-center shadow-[0_8px_30px_-14px_rgba(0,0,0,0.6)] sm:p-10" role="status" aria-live="polite">
        <h2 className="font-serif text-2xl text-sage">Message sent.</h2>
        <p className="mt-2 text-sm text-cream-dim">
          Thanks for reaching out — Jason will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <div id="project-inquiry" className="work-card-glow contact-form-card relative scroll-mt-28 rounded-3xl p-8 shadow-[0_8px_30px_-14px_rgba(0,0,0,0.6)] sm:p-10">
      <form onSubmit={handleSubmit} className="space-y-6" aria-busy={status === "pending"}>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Name">
            <input
              type="text"
              name="name"
              required
              className="input"
              placeholder="Your name"
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              name="email"
              required
              className="input"
              placeholder="you@example.com"
            />
          </Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Project type">
            <select name="project_type" required defaultValue="" className="input">
              <option value="" disabled>
                Select one
              </option>
              <option value="Branding">Branding</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Film & Video">Film &amp; Video</option>
              <option value="Photography">Photography</option>
              <option value="Record Mix & Master">
                Record Mix &amp; Master
              </option>
              <option value="UGC">UGC</option>
              <option value="Web Design & Dev">Web Design &amp; Dev</option>
              <option value="Other">Other</option>
            </select>
          </Field>
          <Field label="Budget (optional)">
            <input
              type="text"
              name="budget_timeline"
              className="input"
              placeholder="e.g. $375"
            />
          </Field>
        </div>

        <Field label="Message">
          <textarea
            name="message"
            required
            rows={5}
            className="input resize-none"
            placeholder="Tell me about the project..."
          />
        </Field>

        {status === "error" && (
          <p className="text-sm text-coral" role="alert">
            Something went wrong sending your message. Please try again, or
            email jason@galacticmonk.com directly.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "pending"}
          className="btn-nova btn-nova-urgent text-sm font-medium tracking-wide"
        >
          <span className="btn-nova-inner">
            <strong className="btn-nova-label">
              {status === "pending" ? "Sending..." : "Send Energy"}
            </strong>
            <span className="btn-nova-stars" aria-hidden="true">
              <span className="btn-nova-stars-field" />
            </span>
            <span className="btn-nova-glow" aria-hidden="true">
              <span className="btn-nova-circle" />
              <span className="btn-nova-circle" />
            </span>
          </span>
        </button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.2em] text-cream-dim">
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
