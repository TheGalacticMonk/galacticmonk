import Link from "next/link";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ServicePillars from "@/components/ServicePillars";
import WorkCard from "@/components/WorkCard";
import { WORK } from "@/lib/work";

export default function Home() {
  const featured = WORK.slice(0, 3);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          eyebrow="What I Do"
          title="Three crafts, one master"
          description="Every element transmuted by me, whether it's a camera, a lens, or a mix bus - intentional, hands-on, and a whole lot of alchemy."
        />
        <div className="mt-10">
          <ServicePillars />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Selected Work" title="Recent projects" />
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

      <section className="swirl-bg px-6 py-28 text-center shadow-[0_-24px_60px_-32px_rgba(0,0,0,0.5)]">
        <SectionHeading
          align="center"
          eyebrow="LET'S CO-CREATE"
          title="Have creative in mind?"
          description="Whether it's a film, a photoshoot, or audiobook - let's manifest the magic you're weaving."
        />
        <Link
          href="/contact/"
          className="mt-8 inline-block rounded-full bg-gold px-8 py-3 text-sm font-medium tracking-wide text-ink-deep transition-transform hover:scale-105"
        >
          Connect
        </Link>
      </section>
    </>
  );
}
