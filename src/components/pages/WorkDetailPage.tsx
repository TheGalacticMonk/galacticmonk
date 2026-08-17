import { CATEGORY_LABEL, type WorkItem } from "@/lib/work";
import { optimizedImageSrc } from "@/lib/optimized-image";
import PhotoGallery from "@/components/PhotoGallery";
import MusicPlayer from "@/components/MusicPlayer";
import JsonLd from "@/components/JsonLd";
import Sparkle from "@/components/Sparkle";
import PageConstellation from "@/components/PageConstellation";
import { getWorkItemSchema, getBreadcrumbSchema } from "@/lib/schema";

const ACCENT_TEXT = {
  gold: "text-gold",
  coral: "text-coral",
  sage: "text-sage",
};

export default function WorkDetailPage({ item }: { item: WorkItem }) {
  return (
    <>
      <PageConstellation />
      <section className="mx-auto max-w-4xl px-6 pb-24 pt-36">
        <JsonLd data={getWorkItemSchema(item)} />
        <JsonLd
          data={getBreadcrumbSchema([
            { name: "Home", url: "https://galacticmonk.com/" },
            { name: "Work", url: "https://galacticmonk.com/work/" },
            { name: item.title, url: `https://galacticmonk.com/work/${item.id}/` },
          ])}
        />
        <a
          href="/work/"
          className="text-sm tracking-wide text-gold hover:underline"
        >
          ← Back to Work
        </a>

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
                loading="lazy"
              />
            </div>
          ) : item.video ? (
            <div className="relative mt-14 overflow-hidden rounded-2xl shadow-[0_16px_50px_-16px_rgba(0,0,0,0.6)]">
              <video
                src={item.video}
                poster={item.image ? optimizedImageSrc(item.image, 960) : undefined}
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
                    <dt className="text-cream-dim/70">{role}</dt>
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
          <a
            href="/work/"
            className="justify-self-start text-sm tracking-wide text-gold hover:underline"
          >
            ← Back to Work
          </a>

          <a href="/contact/" className="btn-nova btn-nova-urgent justify-self-center text-sm font-medium tracking-wide">
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
          </a>

          <div aria-hidden="true" />
        </div>
      </section>
    </>
  );
}
