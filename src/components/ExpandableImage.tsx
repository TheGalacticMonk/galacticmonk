"use client";

import { useLightbox } from "@/hooks/useLightbox";
import {
  hasOptimizedImage,
  optimizedImageSrc,
  optimizedImageSrcSet,
} from "@/lib/optimized-image";
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
  const hasResponsivePreview = hasOptimizedImage(src);

  return (
    <>
      <button
        type="button"
        onClick={() => open(0)}
        aria-label={`Expand ${alt}`}
        className="block cursor-zoom-in"
      >
        <img
          src={hasResponsivePreview ? optimizedImageSrc(src, 480) : src}
          srcSet={hasResponsivePreview ? optimizedImageSrcSet(src) : undefined}
          sizes={hasResponsivePreview ? "(min-width: 768px) 53rem, calc(100vw - 3rem)" : undefined}
          alt={alt}
          className={className}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </button>

      <Lightbox isOpen={isOpen} onClose={close}>
        <img
          src={src}
          alt={alt}
          className="max-h-full max-w-full rounded-lg object-contain"
        />
      </Lightbox>
    </>
  );
}
