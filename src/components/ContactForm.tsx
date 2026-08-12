"use client";

import { useState, type FormEvent, type ReactNode } from "react";

// TODO(jason): replace with your real Formspree (or Web3Forms) endpoint once
// you've created an account — see https://formspree.io/forms
const FORM_ENDPOINT = "https://formspree.io/f/REPLACE_ME";

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
      <div className="rounded-2xl border border-sage/30 bg-ink-deep/60 p-8 text-center">
        <p className="font-serif text-2xl text-cream">Message sent.</p>
        <p className="mt-2 text-sm text-cream-dim">
          Thanks for reaching out — Jason will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            <option value="Film & Video">Film &amp; Video</option>
            <option value="Photography">Photography</option>
            <option value="Record Mix & Master">
              Record Mix &amp; Master
            </option>
            <option value="Other">Other</option>
          </select>
        </Field>
        <Field label="Budget / timeline (optional)">
          <input
            type="text"
            name="budget_timeline"
            className="input"
            placeholder="e.g. $2-5k, ready in 6 weeks"
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
        <p className="text-sm text-coral">
          Something went wrong sending your message. Please try again, or
          email jason@galacticmonk.com directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "pending"}
        className="rounded-full bg-gold px-8 py-3 text-sm font-medium tracking-wide text-ink-deep transition-transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
      >
        {status === "pending" ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
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
