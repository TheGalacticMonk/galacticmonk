"use client";

import Lightbox from "./Lightbox";
import { useLightbox } from "@/hooks/useLightbox";
import { optimizedImageSrc, optimizedImageSrcSet } from "@/lib/optimized-image";

type GalleryItem =
  | { type: "image"; src: string }
  | { type: "youtube"; id: string };

export default function PhotoGallery({
  cover,
  gallery = [],
  youtubeId,
  alt,
}: {
  cover?: string;
  gallery?: string[];
  youtubeId?: string;
  alt: string;
}) {
  const photos = cover ? [cover, ...gallery] : gallery;
  const items: GalleryItem[] = [
    ...(youtubeId ? [{ type: "youtube", id: youtubeId } as const] : []),
    ...photos.map((src) => ({ type: "image", src } as const)),
  ];
  const { index: openIndex, isOpen, open, close, next, prev } = useLightbox(items.length);

  if (items.length === 0) return null;

  const openItem = openIndex !== null ? items[openIndex] : null;

  return (
    <>
      <div className="mt-14 columns-2 gap-4 sm:columns-3">
        {items.map((item, i) =>
          item.type === "youtube" ? (
            <button
              key="youtube"
              type="button"
              onClick={() => open(i)}
              aria-label={`Play ${alt}`}
              className="group relative mb-4 block aspect-[9/16] w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-xl"
            >
              <img
                src={`https://img.youtube.com/vi/${item.id}/maxresdefault.jpg`}
                alt={alt}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://img.youtube.com/vi/${item.id}/hqdefault.jpg`;
                }}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ink-deep/30 transition-colors group-hover:bg-ink-deep/10">
                <div className="fx-rings flex h-20 w-20 items-center justify-center rounded-full bg-gold text-ink-deep shadow-[0_0_0_8px_rgba(255,212,73,0.25),0_8px_30px_-6px_rgba(255,212,73,0.75)] transition-transform duration-300 hover:scale-110">
                  <div className="ml-1.5 h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-current" />
                </div>
              </div>
            </button>
          ) : (
            <button
              key={item.src}
              type="button"
              onClick={() => open(i)}
              aria-label={`Expand ${alt}`}
              className="mb-4 block w-full cursor-zoom-in break-inside-avoid"
            >
              <img
                src={optimizedImageSrc(item.src, 480)}
                srcSet={optimizedImageSrcSet(item.src)}
                sizes="(min-width: 640px) 30vw, 50vw"
                alt={alt}
                loading="lazy"
                decoding="async"
                className="w-full rounded-xl transition-opacity hover:opacity-90"
              />
            </button>
          )
        )}
      </div>

      <Lightbox isOpen={isOpen} onClose={close} onPrev={prev} onNext={next} showNav={items.length > 1}>
        {openItem?.type === "youtube" ? (
          <iframe
            src={`https://www.youtube.com/embed/${openItem.id}`}
            title={alt}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="aspect-[9/16] h-full max-h-[85vh] w-auto rounded-lg"
          />
        ) : openItem ? (
          <img
            src={openItem.src}
            alt={alt}
            className="max-h-full max-w-full rounded-lg object-contain"
          />
        ) : null}
      </Lightbox>
    </>
  );
}
