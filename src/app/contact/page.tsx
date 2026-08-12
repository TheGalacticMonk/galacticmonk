import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import Sparkle from "@/components/Sparkle";

export const metadata: Metadata = {
  title: "Contact — Galactic Monk",
  description:
    "Get in touch with Jason Lee at Galactic Monk to book a film, photography, or music project.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24 pt-36">
      <div className="grid gap-12 md:grid-cols-[1fr_1.3fr]">
        <div>
          <SectionHeading
            eyebrow="Get in Touch"
            title="Book a Session"
            description="Tell me a bit about what you're imagining and I'll get back to you within a couple of moons."
          />

          <div className="mt-10 space-y-4 text-sm">
            <div className="flex items-center gap-2 text-cream-dim">
              <Sparkle className="h-3 w-3 text-gold" />
              <a href="mailto:jason@galacticmonk.com" className="hover:text-cream">
                jason@galacticmonk.com
              </a>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
