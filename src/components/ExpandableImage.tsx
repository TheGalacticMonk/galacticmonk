"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ExpandableImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [expanded]);

  return (
    <>
      <button
        type="button"
        onClick={() => setExpanded(true)}
        aria-label={`Expand ${alt}`}
        className="block cursor-zoom-in"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className={className} />
      </button>

      {/* Portaled to <body>: a fixed z-50 div still gets trapped under whatever
          content follows it in the DOM if any ancestor creates a stacking
          context (isolation, transform, filter, etc.) — e.g. .matrix-frame's
          isolation:isolate on the About page. Rendering outside the tree
          sidesteps that entirely. */}
      {expanded &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-deep/95 p-4 sm:p-10"
            onClick={() => setExpanded(false)}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setExpanded(false)}
              className="absolute right-5 top-5 text-3xl leading-none text-cream/80 hover:text-gold"
            >
              ×
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full rounded-lg object-contain"
            />
          </div>,
          document.body,
        )}
    </>
  );
}
