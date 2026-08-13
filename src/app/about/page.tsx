import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import Sparkle from "@/components/Sparkle";
import ExpandableImage from "@/components/ExpandableImage";
import MapPinIcon from "@/components/MapPinIcon";

export const metadata: Metadata = {
  title: "About — Galactic Monk",
  description:
    "Jason Lee — Creative Producer & Alchemist behind Galactic Monk.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24 pt-36">
      <div className="grid gap-12 md:grid-cols-[280px_1fr] md:items-start">
        <ExpandableImage
          src="/jason-lee.jpg"
          alt="Jason Lee"
          className="mx-auto aspect-square w-56 rounded-2xl object-cover shadow-[0_16px_50px_-16px_rgba(0,0,0,0.6)] md:w-full"
        />

        <div>
          <SectionHeading eyebrow="About" title="Jason Lee | Galactic Monk" />
          <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-sage">
            Creative Producer &amp; Alchemist
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-[#6fa9da]">
            <span className="relative flex h-4 w-4 items-center justify-center">
              <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-[#6fa9da]/40" />
              <MapPinIcon className="relative h-3.5 w-3.5 text-[#e0245e]" />
            </span>
            Los Angeles · On-Location &amp; Remote
          </div>

          <div className="mt-8 max-w-2xl space-y-6 text-base leading-relaxed text-cream-dim">
            <p className="text-lg leading-relaxed text-cream">
              Jason Lee is a Los Angeles-based creative producer and
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
              your creativity shine eternally.
            </p>
            <p>
              At the heart of the work is a lifelong pursuit of knowledge,
              wisdom, and experience. New techniques are explored. New
              tools are mastered. New perspectives become part of the
              process. The goal is never simply to create content, but to
              continually refine the craft and manifest work worthy of
              being released into our mystic Universe.
            </p>
          </div>

          <div className="mt-12 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">
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
