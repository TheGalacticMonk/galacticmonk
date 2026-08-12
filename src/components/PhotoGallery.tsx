"use client";

import { useEffect, useState } from "react";

export default function PhotoGallery({
  cover,
  gallery = [],
  alt,
}: {
  cover?: string;
  gallery?: string[];
  alt: string;
}) {
  const photos = cover ? [cover, ...gallery] : gallery;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [openIndex, photos.length]);

  if (photos.length === 0) return null;

  return (
    <>
      <div className="mt-10 columns-2 gap-4 sm:columns-3">
        {photos.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt={alt}
            onClick={() => setOpenIndex(i)}
            className="mb-4 w-full cursor-zoom-in break-inside-avoid rounded-xl transition-opacity hover:opacity-90"
          />
        ))}
      </div>

      {openIndex !== null && (
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

          {photos.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-4 text-3xl text-cream/70 hover:text-gold sm:left-5"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length));
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-4 text-3xl text-cream/70 hover:text-gold sm:right-5"
              >
                ›
              </button>
            </>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[openIndex]}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-lg object-contain"
          />
        </div>
      )}
    </>
  );
}
