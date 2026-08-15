"use client";

import { useRef, useState } from "react";
import ExpandableImage from "./ExpandableImage";

export default function ImageSlider({
  items,
}: {
  items: { src: string; alt: string; blackBg?: boolean; inset?: boolean; insetClassName?: string }[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = (i + items.length) % items.length;
    track.scrollTo({ left: track.clientWidth * next, behavior: "smooth" });
    setIndex(next);
  };

  return (
    <div>
      {/* Perspective tilt follows the cursor — a literal "multidimensional"
          read on the stage, echoing the article's own "multidimensional
          alchemist" line. Resets to flat on mouse-leave via the transition. */}
      <div
        ref={stageRef}
        onMouseMove={(e) => {
          const rect = stageRef.current?.getBoundingClientRect();
          if (!rect) return;
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          setTilt({ x: py * -10, y: px * 12 });
        }}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
        className="relative mx-auto aspect-square w-[min(53.08rem,69.51vh)] max-w-full rounded-3xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6),0_0_60px_-8px_rgba(255,212,73,0.25),0_0_90px_-12px_rgba(108,92,224,0.22)]"
      >
        <div
          ref={trackRef}
          onScroll={(e) => {
            const track = e.currentTarget;
            const i = Math.round(track.scrollLeft / track.clientWidth);
            if (i !== index) setIndex(i);
          }}
          className="flex h-full snap-x snap-mandatory overflow-x-auto rounded-3xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <div
              key={item.src}
              // translateZ(0) promotes each slide to its own compositor
              // layer so it's rasterized/pixel-snapped independently —
              // without it, adjacent same-width scroll-snap slides can
              // share a sub-pixel-imprecise boundary and let a hairline
              // sliver of the neighboring slide bleed through at the edge.
              style={{ transform: "translateZ(0)" }}
              className={`relative h-full w-full shrink-0 snap-center overflow-hidden ${item.blackBg ? "bg-black" : ""}`}
            >
              <ExpandableImage
                src={item.src}
                alt={item.alt}
                className={
                  item.inset
                    ? item.insetClassName ??
                      "absolute object-contain top-8 left-8 h-[calc(100%-4rem)] w-[calc(100%-4rem)] sm:top-10 sm:left-10 sm:h-[calc(100%-5rem)] sm:w-[calc(100%-5rem)]"
                    : "absolute inset-0 h-full w-full object-contain"
                }
              />
            </div>
          ))}
        </div>

        {/* Sits at the top of the stage, not the bottom control row below —
            the point is to signal "more than one image, swipe or use the
            arrows" the instant the artwork scrolls into view, before a
            reader has scrolled far enough to see the controls underneath. */}
        {items.length > 1 && (
          <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-ink-deep/70 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-cream backdrop-blur-sm">
            {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </div>
        )}
      </div>

      {/* Controls live in their own row below the stage, never overlapping
          the artwork — prev / dots / next as one deliberate cluster, the
          same grouping pattern as a standard product-carousel pagination
          bar, instead of floating buttons fighting the image for space. */}
      {items.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-3 sm:gap-8">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => goTo(index - 1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-ink-deep shadow-[0_6px_20px_-6px_rgba(0,0,0,0.5)] transition-transform hover:scale-110 sm:h-12 sm:w-12"
          >
            <span className="material-symbols-outlined text-lg sm:text-xl">
              keyboard_double_arrow_left
            </span>
          </button>

          {/* min-w-0 lets this shrink below its natural content width instead
              of forcing the whole row (and the next-arrow) past the viewport
              edge on mobile, where 17 dots don't fit; overflow-x-auto lets
              the strip itself scroll rather than clip. */}
          <div className="flex min-w-0 items-center gap-2.5 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {items.map((item, i) => (
              <button
                key={item.src}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2 shrink-0 rounded-full transition-all ${
                  i === index ? "w-7 bg-gold" : "w-2 bg-cream/25 hover:bg-cream/40"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next"
            onClick={() => goTo(index + 1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-ink-deep shadow-[0_6px_20px_-6px_rgba(0,0,0,0.5)] transition-transform hover:scale-110 sm:h-12 sm:w-12"
          >
            <span className="material-symbols-outlined text-lg sm:text-xl">
              keyboard_double_arrow_right
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
