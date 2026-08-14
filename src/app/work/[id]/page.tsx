import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORY_LABEL, WORK } from "@/lib/work";
import PhotoGallery from "@/components/PhotoGallery";
import MusicPlayer from "@/components/MusicPlayer";
import JsonLd from "@/components/JsonLd";
import Sparkle from "@/components/Sparkle";
import PageConstellation from "@/components/PageConstellation";
import { getWorkItemSchema } from "@/lib/schema";

const ACCENT_TEXT = {
  gold: "text-gold",
  coral: "text-coral",
  sage: "text-sage",
};

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
    <>
      <PageConstellation />
      <section className="mx-auto max-w-4xl px-6 pb-24 pt-36">
        <JsonLd data={getWorkItemSchema(item)} />
        <Link
          href="/work/"
          className="text-sm tracking-wide text-gold hover:underline"
        >
          ← Back to Work
        </Link>

        <article className="editorial-card relative mt-8 rounded-[2rem] bg-ink-deep p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.75)] sm:p-10 md:p-12">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold">
            <Sparkle className="h-3 w-3 shrink-0" />
            Work
            <span className="h-px flex-1 bg-cream/15" />
          </div>

          <h1 className="mt-4 font-serif text-3xl leading-tight text-cream sm:text-4xl">
            {item.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-cream/10 py-3 text-xs font-medium uppercase tracking-[0.2em]">
            <span className={ACCENT_TEXT[item.accent]}>
              {item.categoryLabel ?? CATEGORY_LABEL[item.category]}
            </span>
            <span className="hidden h-3 w-px bg-cream/20 sm:block" />
            <span className="text-cream-dim">{item.year}</span>
          </div>

          <p className="about-dropcap mt-8 max-w-2xl font-serif text-lg leading-relaxed text-cream-dim">
            {item.description ?? item.blurb}
          </p>

          {item.spotifyEmbedUrl && (
            <div className="mt-8 max-w-2xl">
              <iframe
                src={item.spotifyEmbedUrl}
                width="100%"
                height="352"
                style={{ borderRadius: "12px" }}
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={`${item.title} on Spotify`}
              />
            </div>
          )}

          {item.vimeoId ? (
            <div
              className="relative mt-14 w-full"
              style={{ aspectRatio: item.videoAspect ?? "16 / 9" }}
            >
              <iframe
                src={`https://player.vimeo.com/video/${item.vimeoId}`}
                title={item.title}
                className="absolute inset-0 h-full w-full rounded-2xl"
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
            <div className="mt-14 max-w-md">
              <MusicPlayer
                src={item.audio}
                image={item.image}
                title={item.trackTitle ?? item.title}
                subtitle={item.artist ?? "Galactic Monk"}
                accent={item.accent}
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
        </article>

        <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <Link
            href="/work/"
            className="justify-self-start text-sm tracking-wide text-gold hover:underline"
          >
            ← Back to Work
          </Link>

          <Link href="/contact/" className="btn-nova btn-nova-urgent justify-self-center text-sm font-medium tracking-wide">
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

          <div aria-hidden="true" />
        </div>
      </section>
    </>
  );
}
