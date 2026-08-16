import type { Metadata } from "next";
import Link from "next/link";
import CreativeServicesShowcase from "@/components/CreativeServicesShowcase";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import WhyNotMeReasons from "@/components/WhyNotMeReasons";
import WorkCard from "@/components/WorkCard";
import { WORK } from "@/lib/work";

export const metadata: Metadata = {
  title: "Los Angeles Creative Producer for Film, Photo & Sound",
  description:
    "Galactic Monk is Jason Lee, a Los Angeles creative producer crafting cinematic film, event photography, music mixing and mastering, and custom digital experiences.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const featured = WORK.filter((item) => !item.hidden).slice(0, 3);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Featured Vibes" title="Recent alchemy" />
          <Link
            href="/work/"
            className="text-sm tracking-wide text-gold hover:underline"
          >
            View all work →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <WorkCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="pt-14 shadow-[0_-24px_60px_-32px_rgba(0,0,0,0.5)] sm:pt-16">
        <div className="mx-auto max-w-6xl px-6 pb-16 sm:pb-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="What I Do" title="Four worlds, one alchemist" />
            <Link
              href="/about/"
              className="text-sm tracking-wide text-gold hover:underline"
            >
              More about me →
            </Link>
          </div>
          <div className="-mx-6 mt-11 overflow-x-clip px-6 min-[761px]:mt-10 xl:-mx-20 xl:px-20 2xl:-mx-[100px] 2xl:px-[100px]">
            <CreativeServicesShowcase />
          </div>
        </div>
      </section>

      <section className="pb-8 pt-14 shadow-[0_-24px_60px_-32px_rgba(0,0,0,0.5)] sm:pt-16">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="WHY NOT ME?"
            title="Awakened soul, divine consciousness"
            description="My technical skills are only part of what I bring. I dug myself out the rabbit hole through vision, discipline, and sheer will. When we work together, I bring that same resolve and awakening to your project—protecting the vision and carrying it from birth to final form."
          />
          <div className="mt-10">
            <WhyNotMeReasons />
          </div>
        </div>
      </section>

      <section className="swirl-bg px-6 py-28 text-center shadow-[0_-24px_60px_-32px_rgba(0,0,0,0.5)]">
        <SectionHeading
          align="center"
          eyebrow="LET'S CO-CREATE"
          title="Have an idea orbiting your consciousness?"
          description="Whether it’s a film, photoshoot, record, or digital world, let’s co-create a vibe people can feel."
        />
        <Link href="/contact/" className="btn-nova btn-nova-urgent mt-8 text-sm font-medium tracking-wide">
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
      </section>
    </>
  );
}
