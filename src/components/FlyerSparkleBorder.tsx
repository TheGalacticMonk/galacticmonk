"use client";

import { useLayoutEffect, useRef, useState } from "react";

/* Same glyph as Sparkle.tsx, reused here so the flyer's border matches the
   rest of the site's sparkle iconography instead of introducing a new
   shape. 40x40 viewBox, centered roughly at (20,20). */
const SPARKLE_D =
  "M20 2c1.1 6.7 2.9 11.4 5.4 13.9 2.5 2.5 7.2 4.3 13.9 5.4-6.7 1.1-11.4 2.9-13.9 5.4-2.5 2.5-4.3 7.2-5.4 13.9-1.1-6.7-2.9-11.4-5.4-13.9C12.1 24.2 7.4 22.4.7 21.3c6.7-1.1 11.4-2.9 13.9-5.4C17.1 13.4 18.9 8.7 20 2Z";

const COLORS = [
  "rgba(255,212,73,0.9)",
  "rgba(248,118,102,0.9)",
  "rgba(115,158,130,0.9)",
];

const SPACING = 42;
const SIZE = 11;

type Point = { x: number; y: number };

/* Sparkles (unlike the plain-circle dots this replaced) have long thin arms,
   so they can't be drawn as a stroke-dasharray on the rounded-rect path —
   round line caps only ever produce circles. Instead this measures the same
   invisible rounded rect's actual on-screen path length (which depends on
   the card's real, responsive size, so it can't be precomputed statically)
   and drops a sparkle every ~26px along it, cycling gold/coral/sage in
   path order — same alternating-color scheme as the polka-dot version. */
export default function FlyerSparkleBorder() {
  const rectRef = useRef<SVGRectElement>(null);
  const [points, setPoints] = useState<Point[]>([]);

  useLayoutEffect(() => {
    const rect = rectRef.current;
    if (!rect) return;

    const measure = () => {
      const length = rect.getTotalLength();
      const count = Math.max(1, Math.round(length / SPACING));
      const step = length / count;
      setPoints(
        Array.from({ length: count }, (_, i) => rect.getPointAtLength(i * step))
      );
    };

    measure();
    const container = rect.ownerSVGElement?.parentElement;
    if (!container) return;
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  return (
    <svg className="flyer-card-dots" aria-hidden="true">
      <rect
        ref={rectRef}
        x="6"
        y="6"
        width="calc(100% - 12px)"
        height="calc(100% - 12px)"
        rx="24"
        ry="24"
        fill="none"
        stroke="none"
      />
      {points.map((pt, i) => (
        <path
          key={i}
          d={SPARKLE_D}
          fill={COLORS[i % COLORS.length]}
          transform={`translate(${pt.x - SIZE / 2} ${pt.y - SIZE / 2}) scale(${SIZE / 40})`}
          style={{
            filter:
              "drop-shadow(0 0 0.85px currentColor) drop-shadow(0 0 4.36px currentColor) drop-shadow(0 0 9.47px currentColor)",
            color: COLORS[i % COLORS.length],
          }}
        />
      ))}
    </svg>
  );
}
