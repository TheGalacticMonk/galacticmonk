import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ServicePillars from "@/components/ServicePillars";
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

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="What I Do"
            title="Four worlds, one master"
            description="Every element is deliberate, whether it's a camera, a lens, a microphone, or website — intentional, hands-on, and a whole lot of alchemy."
          />
          <Link
            href="/about/"
            className="text-sm tracking-wide text-gold hover:underline"
          >
            More about me →
          </Link>
        </div>
        <div className="mt-10">
          <ServicePillars />
        </div>
      </section>

      <section className="swirl-bg px-6 py-28 text-center shadow-[0_-24px_60px_-32px_rgba(0,0,0,0.5)]">
        <SectionHeading
          align="center"
          eyebrow="LET'S CO-CREATE"
          title="Have a vision in orbit?"
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
