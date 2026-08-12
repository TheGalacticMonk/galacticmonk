"use client";

import { useEffect, useState } from "react";

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [openIndex, items.length]);

  if (items.length === 0) return null;

  const openItem = openIndex !== null ? items[openIndex] : null;

  return (
    <>
      <div className="mt-10 columns-2 gap-4 sm:columns-3">
        {items.map((item, i) =>
          item.type === "youtube" ? (
            <div
              key="youtube"
              onClick={() => setOpenIndex(i)}
              className="relative mb-4 w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-xl transition-opacity hover:opacity-90"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${item.id}/hqdefault.jpg`}
                alt={alt}
                className="w-full"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ink-deep/20">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-deep/70 text-cream">
                  <div className="ml-1 h-0 w-0 border-y-8 border-l-[14px] border-y-transparent border-l-current" />
                </div>
              </div>
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={item.src}
              src={item.src}
              alt={alt}
              onClick={() => setOpenIndex(i)}
              className="mb-4 w-full cursor-zoom-in break-inside-avoid rounded-xl transition-opacity hover:opacity-90"
            />
          )
        )}
      </div>

      {openItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-deep/95 p-4 sm:p-10"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpenIndex(null)}
            className="absolute right-5 top-5 text-3xl leading-none text-cream/80 hover:text-gold"
          >
            ×
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous item"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-4 text-3xl text-cream/70 hover:text-gold sm:left-5"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next item"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) => (i === null ? i : (i + 1) % items.length));
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-4 text-3xl text-cream/70 hover:text-gold sm:right-5"
              >
                ›
              </button>
            </>
          )}

          {openItem.type === "youtube" ? (
            <iframe
              src={`https://www.youtube.com/embed/${openItem.id}`}
              title={alt}
              onClick={(e) => e.stopPropagation()}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="aspect-[9/16] h-full max-h-[85vh] w-auto rounded-lg"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={openItem.src}
              alt={alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full rounded-lg object-contain"
            />
          )}
        </div>
      )}
    </>
  );
}
