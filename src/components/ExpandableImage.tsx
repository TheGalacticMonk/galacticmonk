"use client";

import { useLightbox } from "@/hooks/useLightbox";
import Lightbox from "./Lightbox";

export default function ExpandableImage({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const { isOpen, open, close } = useLightbox(1);

  return (
    <>
      <button
        type="button"
        onClick={() => open(0)}
        aria-label={`Expand ${alt}`}
        className="block cursor-zoom-in"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={className}
          loading={priority ? "eager" : "lazy"}
        />
      </button>

      <Lightbox isOpen={isOpen} onClose={close}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="max-h-full max-w-full rounded-lg object-contain"
        />
      </Lightbox>
    </>
  );
}
