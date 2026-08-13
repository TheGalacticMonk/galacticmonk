import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORY_LABEL, WORK } from "@/lib/work";
import PhotoGallery from "@/components/PhotoGallery";
import ExpandableImage from "@/components/ExpandableImage";
import JsonLd from "@/components/JsonLd";
import Sparkle from "@/components/Sparkle";
import { getWorkItemSchema } from "@/lib/schema";

export function generateStaticParams() {
  return WORK.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[id]">): Promise<Metadata> {
  const { id } = await params;
  const item = WORK.find((work) => work.id === id);
  if (!item) return {};
  const description = item.description ?? item.blurb;
  return {
    title: `${item.title} — Galactic Monk`,
    description,
    alternates: { canonical: `/work/${item.id}/` },
    openGraph: {
      title: item.title,
      description,
      url: `/work/${item.id}/`,
      images: item.image ? [{ url: item.image, width: 1200, height: 1200 }] : undefined,
    },
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
      <JsonLd data={getWorkItemSchema(item)} />
      <Link
        href="/work/"
        className="text-sm tracking-wide text-gold hover:underline"
      >
        ← Back to Work
      </Link>

      <div className="mt-8 text-xs uppercase tracking-[0.2em] text-gold">
        {item.categoryLabel ?? CATEGORY_LABEL[item.category]} · {item.year}
      </div>
      <h1 className="mt-3 font-serif text-3xl text-cream sm:text-4xl">
        {item.title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-cream-dim">
        {item.description ?? item.blurb}
      </p>

      {item.vimeoId ? (
        <div
          className="relative mt-14 w-full"
          style={{ aspectRatio: item.videoAspect ?? "16 / 9" }}
        >
          <iframe
            src={`https://player.vimeo.com/video/${item.vimeoId}`}
            title={item.title}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : item.video ? (
        <div className="relative mt-14 overflow-hidden rounded-2xl shadow-[0_16px_50px_-16px_rgba(0,0,0,0.6)]">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            src={item.video}
            poster={item.image}
            controls
            playsInline
            preload="metadata"
            className="block w-full bg-ink-deep"
          />
        </div>
      ) : item.audio ? (
        <div className="mt-14">
          {item.image && (
            <ExpandableImage
              src={item.image}
              alt={item.title}
              className="aspect-square w-full max-w-sm rounded-3xl object-cover shadow-[0_16px_50px_-16px_rgba(0,0,0,0.6)]"
            />
          )}
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <audio
            src={item.audio}
            controls
            preload="metadata"
            className="mt-6 w-full max-w-sm"
          />
        </div>
      ) : (
        <PhotoGallery
          cover={item.image}
          gallery={item.gallery}
          youtubeId={item.youtubeId}
          alt={item.title}
        />
      )}

      {item.credits && item.credits.length > 0 && (
        <div className="mt-14 max-w-2xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold">
            <Sparkle className="h-3 w-3" />
            Credits
          </div>
          <dl className="mt-5 grid grid-cols-1 gap-y-3 text-sm sm:grid-cols-[minmax(0,180px)_1fr] sm:gap-x-6 sm:gap-y-2.5">
            {item.credits.map(({ role, name }) => (
              <div key={role} className="contents">
                <dt className="text-cream-dim/60">{role}</dt>
                <dd className="text-cream">{name}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {item.details && (
        <div className={`max-w-2xl ${item.credits?.length ? "mt-10" : "mt-14"}`}>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold">
            <Sparkle className="h-3 w-3" />
            Gear
          </div>
          <p className="mt-5 text-sm leading-relaxed text-cream-dim/70">
            {item.details}
          </p>
        </div>
      )}

      <Link href="/contact/" className="btn-nova mt-14 text-sm font-medium tracking-wide">
        <span className="btn-nova-inner">
          <strong className="btn-nova-label">Work With Me</strong>
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
  );
}
