import type { Metadata } from "next";
import Link from "next/link";
import Sparkle from "@/components/Sparkle";
import MatrixPhotoFrame from "@/components/MatrixPhotoFrame";
import ExpandableImage from "@/components/ExpandableImage";
import ImageSlider from "@/components/ImageSlider";
import MapPinIcon from "@/components/MapPinIcon";
import PageConstellation from "@/components/PageConstellation";

export const metadata: Metadata = {
  title: "About — Galactic Monk",
  description:
    "Jason Lee — Creative Producer & Alchemist behind Galactic Monk.",
};

export default function AboutPage() {
  return (
    <>
      <PageConstellation />
      <section className="mx-auto max-w-4xl px-6 pb-24 pt-36">
        <article className="editorial-card relative rounded-[2rem] bg-[var(--color-indigo-deep)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.75)]">
          <div className="p-8 sm:p-10 md:p-12">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <MatrixPhotoFrame
                src="/jason-lee.jpg"
                alt="Jason Lee"
                mat={false}
                frameClassName="matrix-frame--profile w-28 shrink-0 sm:w-32"
              />

              <div className="min-w-0">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold">
                  <Sparkle className="h-3 w-3 shrink-0" />
                  About
                  <span className="h-px flex-1 bg-cream/15" />
                </div>

                <h1 className="mt-4 font-serif text-4xl leading-tight text-cream sm:text-5xl">
                  Jason Lee <span className="text-cream/50">|</span> Galactic Monk
                </h1>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-cream/10 py-3 text-xs font-medium uppercase tracking-[0.2em]">
              <span className="text-sage">Creative Producer &amp; Alchemist</span>
              <span className="hidden h-3 w-px bg-cream/20 sm:block" />
              <span className="inline-flex items-center gap-2 text-coral">
                <span className="relative flex h-4 w-4 items-center justify-center">
                  <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-coral/30" />
                  <MapPinIcon className="relative h-3.5 w-3.5 text-cream" />
                </span>
                Los Angeles · On-Location &amp; Remote
              </span>
            </div>

            <div className="mt-8 text-base leading-relaxed text-cream-dim">
              <p className="about-dropcap font-serif text-xl leading-relaxed text-cream">
                Jason Lee is a Los Angeles-based creative producer and
                multidimensional alchemist driven by the pursuit of
                self-mastery.
              </p>

              <div className="my-10 grid grid-cols-2 gap-4 sm:gap-6">
                <figure>
                  <ExpandableImage
                    src="/about-images/monk-boxing-2.jpg"
                    alt="Jason Lee shadowboxing, self-portrait"
                    className="aspect-square w-full rounded-2xl object-cover shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]"
                  />
                  <figcaption className="mt-3 text-center">
                    <span className="block font-serif text-sm italic text-cream/70">Shadowboxing</span>
                    <span className="mt-1 block text-[10px] uppercase tracking-[0.25em] text-cream/40">Self-portrait</span>
                  </figcaption>
                </figure>
                <figure>
                  <ExpandableImage
                    src="/about-images/monk-boxing.jpg"
                    alt="Jason Lee lightboxing, self-portrait"
                    className="aspect-square w-full rounded-2xl object-cover shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]"
                  />
                  <figcaption className="mt-3 text-center">
                    <span className="block font-serif text-sm italic text-cream/70">Lightboxing</span>
                    <span className="mt-1 block text-[10px] uppercase tracking-[0.25em] text-cream/40">Self-portrait</span>
                  </figcaption>
                </figure>
              </div>

              <p>
                Every creative project begins with raw muse: an idea, an
                image, a sound, a feeling. The craft is in transforming those
                elements into something greater. As an alchemist, Galactic
                Monk perceives the creative process as a practice of
                transmutation, shaping footage, photography, sound, and story
                into work with energy, intention, and impact.
              </p>

              <figure className="my-10 mx-auto w-full max-w-2xl">
                <figcaption className="mb-4 text-center text-[11px] uppercase tracking-[0.25em] text-cream/40">
                  Ideation &amp; Concepting
                </figcaption>
                <ImageSlider
                  items={[
                    { src: "/about-images/branding/1-skitzophrenic.jpg", alt: "Skitzophrenic single artwork" },
                    { src: "/about-images/branding/2-msm-mind-control.png", alt: "MSM Mind Control single artwork", blackBg: true, inset: true },
                    { src: "/about-images/branding/3-Epstein%20island.jpeg", alt: "Epstein Island single artwork" },
                    { src: "/about-images/branding/4-sovereign-alliance-seal.svg", alt: "Sovereign Alliance seal logo", blackBg: true, inset: true },
                    { src: "/about-images/branding/5-yin-yang.jpg", alt: "Yin Yang single artwork" },
                    {
                      src: "/about-images/branding/6-cat-spirit-animal.png",
                      alt: "Spirit Animal single artwork",
                      blackBg: true,
                      inset: true,
                      insetClassName:
                        "absolute object-contain top-4 left-8 h-[calc(100%-2rem)] w-[calc(100%-4rem)] sm:top-6 sm:left-10 sm:h-[calc(100%-3rem)] sm:w-[calc(100%-5rem)]",
                    },
                    { src: "/about-images/branding/7-confess.jpg", alt: "Confess single artwork" },
                    { src: "/about-images/branding/8-earth-unhacked.jpg", alt: "Earth Unhacked single artwork" },
                    { src: "/about-images/branding/9-mercy-for-your-soul.jpg", alt: "Mercy for Your Soul single artwork" },
                    { src: "/about-images/branding/10-follow-white-rabbit.png", alt: "Follow the White Rabbit single artwork", blackBg: true, inset: true },
                    { src: "/about-images/branding/11-you-mad-as-f.jpg", alt: "You Mad As F single artwork" },
                    {
                      src: "/about-images/branding/12-psywar-frequency.jpg",
                      alt: "Psywar Frequency single artwork",
                      blackBg: true,
                      inset: true,
                      insetClassName:
                        "absolute object-contain top-4 left-8 h-[calc(100%-2rem)] w-[calc(100%-4rem)] sm:top-6 sm:left-10 sm:h-[calc(100%-3rem)] sm:w-[calc(100%-5rem)]",
                    },
                    { src: "/about-images/branding/13-sunshine-cover.jpg", alt: "Sunshine single artwork" },
                    {
                      src: "/about-images/branding/14-door-close-door-opens.png",
                      alt: "Door Closes, Door Opens single artwork",
                      blackBg: true,
                      inset: true,
                      insetClassName:
                        "absolute object-contain top-4 left-8 h-[calc(100%-2rem)] w-[calc(100%-4rem)] sm:top-6 sm:left-10 sm:h-[calc(100%-3rem)] sm:w-[calc(100%-5rem)]",
                    },
                    { src: "/about-images/branding/15-way-beyond-the-stars.jpg", alt: "Way Beyond the Stars single artwork" },
                    {
                      src: "/about-images/branding/16-monk-impweye.PNG",
                      alt: "The Revolution Will Not Be Televised single artwork",
                      blackBg: true,
                      inset: true,
                      insetClassName:
                        "absolute object-contain top-4 left-8 h-[calc(100%-2rem)] w-[calc(100%-4rem)] sm:top-6 sm:left-10 sm:h-[calc(100%-3rem)] sm:w-[calc(100%-5rem)]",
                    },
                    { src: "/about-images/branding/17-photographic-memories.jpg", alt: "Photographic Memories single artwork" },
                  ]}
                />
              </figure>

              <blockquote className="my-8 border-l-2 border-gold/70 pl-5 font-serif text-xl italic leading-snug text-cream">
                &ldquo;A master alchemist can achieve transmuting the night sky
                as a source of power.&rdquo;
                <footer className="mt-2 font-sans text-xs not-italic uppercase tracking-[0.2em] text-cream/60">
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
              <figure className="my-10">
                <ExpandableImage
                  src="/about-images/jason-newsboy-cap.jpg"
                  alt="Jason Lee in a newsboy cap, self-portrait"
                  className="aspect-[3/2] w-full rounded-2xl object-cover shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]"
                />
                <figcaption className="mt-3 text-center">
                  <span className="block font-serif text-sm italic text-cream/70">Old Head</span>
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.25em] text-cream/40">Self-Portrait</span>
                </figcaption>
              </figure>

              <p className="mt-6">
                Galactic Monk&apos;s alchemy is intuitive; led by a lifelong pursuit of knowledge,
                wisdom, and experience. New techniques are explored. New
                tools are mastered. New perspectives are integrated. His aim is never simply to create content, but to
                continually refine his craft and manifest magic worthy of
                being casted into our mystically evolving &amp; breathing Multiverse.
              </p>
            </div>
          </div>
        </article>

        <div className="mt-8 flex flex-col items-center">
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
      </section>
    </>
  );
}
