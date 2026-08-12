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
              className="object-cover"
              sizes="280px"
            />
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
              Galactic Monk is a Los Angeles-based creative producer and
              multidimensional artist driven by the pursuit of
              self-mastery.
            </p>
            <p>
              Every creative project begins with raw material: an idea, an
              image, a sound, a feeling. The craft is in transforming those
              elements into something greater. As an alchemist, Galactic
              Monk approaches the creative process as an act of
              transmutation, shaping footage, photography, sound, and story
              into work with energy, intention, and impact.
            </p>
            <p>
              Operating as a one-person creative studio, Galactic Monk
              specializes in three interconnected crafts: film &amp; video
              production, photography, and audio recording, mixing &amp;
              mastering. From concept and production through editing and
              final delivery, each project is approached with curiosity,
              precision, and an obsessive attention to quality that makes
              creative work shine.
            </p>
            <p>
              At the heart of the work is a lifelong pursuit of knowledge,
              wisdom, and experience. New techniques are explored. New
              tools are mastered. New perspectives become part of the
              process. The goal is never simply to create content, but to
              continually refine the craft and manifest work worthy of
              being released into our beautiful Universe.
            </p>
            <p>Based in Los Angeles. Available for on-location and remote projects.</p>
          </div>

          <div className="mt-10 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">
            <Sparkle className="h-3 w-3" />
            LET&apos;S CO-CREATE
          </div>
          <Link
            href="/contact/"
            className="mt-4 inline-block rounded-full bg-gold px-8 py-3 text-sm font-medium tracking-wide text-ink-deep transition-transform hover:scale-105"
          >
            Connect
          </Link>
        </div>
      </div>
    </section>
  );
}
