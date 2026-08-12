import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORY_LABEL, WORK } from "@/lib/work";

export function generateStaticParams() {
  return WORK.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[id]">): Promise<Metadata> {
  const { id } = await params;
  const item = WORK.find((work) => work.id === id);
  if (!item) return {};
  return {
    title: `${item.title} — Galactic Monk`,
    description: item.blurb,
  };
}

export default async function WorkDetailPage({
  params,
}: PageProps<"/work/[id]">) {
  const { id } = await params;
  const item = WORK.find((work) => work.id === id);
  if (!item) notFound();

  return (
    <section className="mx-auto max-w-4xl px-6 pb-24 pt-36">
      <Link
        href="/work/"
        className="text-sm tracking-wide text-gold hover:underline"
      >
        ← Back to Work
      </Link>

      <div className="mt-6 text-xs uppercase tracking-[0.2em] text-gold">
        {CATEGORY_LABEL[item.category]} · {item.year}
      </div>
      <h1 className="mt-3 font-serif text-3xl text-cream sm:text-4xl">
        {item.title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-cream-dim">
        {item.blurb}
      </p>

      <div className="relative mt-10 overflow-hidden rounded-2xl border border-cream/10">
        {item.vimeoId ? (
          <div className="relative aspect-[1920/810] w-full bg-ink-deep">
            <iframe
              src={`https://player.vimeo.com/video/${item.vimeoId}`}
              title={item.title}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : item.video ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            src={item.video}
            poster={item.image}
            controls
            playsInline
            preload="metadata"
            className="block w-full bg-ink-deep"
          />
        ) : item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt={item.title} className="block w-full" />
        ) : null}
      </div>

      {item.details && (
        <p className="mt-4 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-cream-dim/70">
          {item.details}
        </p>
      )}

      {item.gallery && item.gallery.length > 0 && (
        <div className="mt-10 columns-2 gap-4 sm:columns-3">
          {item.gallery.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt={item.title}
              className="mb-4 w-full break-inside-avoid rounded-xl border border-cream/10"
            />
          ))}
        </div>
      )}

      <Link
        href="/contact/"
        className="mt-10 inline-block rounded-full bg-gold px-8 py-3 text-sm font-medium tracking-wide text-ink-deep transition-transform hover:scale-105"
      >
        Work With Me
      </Link>
    </section>
  );
}
