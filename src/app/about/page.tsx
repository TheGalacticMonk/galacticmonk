import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import Sparkle from "@/components/Sparkle";

export const metadata: Metadata = {
  title: "About — Galactic Monk",
  description:
    "Jason Lee — Creative Producer & Alchemist behind Galactic Monk.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24 pt-36">
      <div className="grid gap-12 md:grid-cols-[280px_1fr] md:items-start">
        <div className="relative mx-auto w-56 overflow-hidden rounded-2xl border border-gold/30 md:w-full">
          <div className="relative aspect-square">
            <Image
              src="/jason-lee.jpg"
              alt="Jason Lee"
              fill
              className="object-cover [filter:grayscale(0.55)_saturate(0.8)_contrast(1.1)]"
              sizes="280px"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-gold/30 via-ink/30 to-ink mix-blend-color" />
            <div className="absolute inset-0 bg-ink/25 mix-blend-multiply" />
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="About"
            title="Jason Lee"
            description="Creative Producer & Alchemist."
          />

          <div className="mt-8 space-y-5 text-base leading-relaxed text-cream-dim">
            <p>
              Galactic Monk is the working name for Jason Lee&apos;s creative
              practice — a one-person studio built around three crafts: film
              &amp; video production, photography, and music mixing &amp;
              mastering.
            </p>
            <p>
              The through-line across all three is the same: take raw
              material — footage, light, or a rough mix — and work it until
              it feels inevitable. That&apos;s the &ldquo;alchemist&rdquo;
              part of the title.
            </p>
            <p>
              Based in Los Angeles, available for projects on location or
              remote.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">
            <Sparkle className="h-3 w-3" />
            Let&apos;s work together
          </div>
          <Link
            href="/contact/"
            className="mt-4 inline-block rounded-full bg-gold px-8 py-3 text-sm font-medium tracking-wide text-ink-deep transition-transform hover:scale-105"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
