import type { Metadata } from "next";
import Link from "next/link";
import Sparkle from "@/components/Sparkle";
import MatrixPhotoFrame from "@/components/MatrixPhotoFrame";
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
        <MatrixPhotoFrame
          src="/jason-lee.jpg"
          alt="Jason Lee"
          className="mx-auto w-56 shadow-[0_16px_50px_-16px_rgba(0,0,0,0.6)] md:w-full"
        />

        <article className="editorial-card relative rounded-[2rem] border border-cream/10 bg-ink-deep p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.75)] sm:p-10 md:p-12">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold">
            <Sparkle className="h-3 w-3 shrink-0" />
            About
            <span className="h-px flex-1 bg-cream/15" />
          </div>

          <h1 className="mt-4 font-serif text-4xl leading-tight text-cream sm:text-5xl">
            Jason Lee <span className="text-cream-dim">|</span> Galactic Monk
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-cream/10 py-3 text-xs font-medium uppercase tracking-[0.2em]">
            <span className="text-sage">Creative Producer &amp; Alchemist</span>
            <span className="hidden h-3 w-px bg-cream/20 sm:block" />
            <span className="inline-flex items-center gap-2 text-[#6fa9da]">
              <span className="relative flex h-4 w-4 items-center justify-center">
                <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-[#6fa9da]/40" />
                <MapPinIcon className="relative h-3.5 w-3.5 text-cream" />
              </span>
              Los Angeles · On-Location &amp; Remote
            </span>
          </div>

          <div className="mt-8 max-w-2xl text-base leading-relaxed text-cream-dim">
            <p className="about-dropcap font-serif text-xl leading-relaxed text-cream">
              Jason Lee is a Los Angeles-based creative producer and
              multidimensional alchemist driven by the pursuit of
              self-mastery.
            </p>
            <p className="mt-6">
              Every creative project begins with raw muse: an idea, an
              image, a sound, a feeling. The craft is in transforming those
              elements into something greater. As an alchemist, Galactic
              Monk perceives the creative process as a practice of
              transmutation, shaping footage, photography, sound, and story
              into work with energy, intention, and impact.
            </p>
            <blockquote className="my-8 border-l-2 border-gold/60 pl-5 font-serif text-xl italic leading-snug text-cream">
              &ldquo;A master alchemist can even transmute the night sky as a
              power source.&rdquo;
              <footer className="mt-2 font-sans text-xs not-italic uppercase tracking-[0.2em] text-cream-dim">
                — Jason Lee
              </footer>
            </blockquote>
            <p>
              Skilled as a solo-creator, Galactic Monk specializes in four
              interdimensionally connected crafts: film &amp; video
              production, photography, audio recording, mixing &amp;
              mastering, and web design &amp; development. From concept and
              production through editing and final delivery, each project is
              approached with curiosity, precision, and an obsessive
              attention to the fine technical detail of the end output.
            </p>
            <p className="mt-6">
              Galactic Monk's alchemy is intuitive; led by a lifelong pursuit of knowledge,
              wisdom, and experience. New techniques are explored. New
              tools are mastered. New perspectives are integrated. His aim is never simply to create content, but to
              continually refine his craft and manifest magic worthy of
              being casted into our mystically evolving &amp; breathing Multiverse.
            </p>
          </div>

          <div className="mt-10 border-t border-cream/10 pt-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">
              <Sparkle className="h-3 w-3" />
              LET&apos;S CO-CREATE
            </div>
            <Link href="/contact/" className="btn-nova btn-nova-urgent mt-4 text-sm font-medium tracking-wide">
              <span className="btn-nova-inner">
                <strong className="btn-nova-label">Reach Out</strong>
                <span className="btn-nova-stars" aria-hidden="true">
                  <span className="btn-nova-stars-field" />
                </span>
                <span className="btn-nova-glow" aria-hidden="true">
                  <span className="btn-nova-circle" />
                  <span className="btn-nova-circle" />
                </span>
              </span>
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
