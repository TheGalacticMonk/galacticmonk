"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Sparkle from "./Sparkle";

const COLORS = ["text-gold/90", "text-coral/90", "text-sage/90"];

const SPACING = 42;
const SIZE = 11;

type Point = { x: number; y: number };

/* Sparkles (unlike the plain-circle dots this replaced) have long thin arms,
   so they can't be drawn as a stroke-dasharray on the rounded-rect path —
   round line caps only ever produce circles. Instead this measures the same
   invisible rounded rect's actual on-screen path length (which depends on
   the card's real, responsive size, so it can't be precomputed statically)
   and drops a sparkle every ~42px along it, cycling gold/coral/sage in
   path order.

   Each sparkle is a real <Sparkle> instance, CSS-positioned with left/top/
   transform, rather than an SVG <path> positioned via the transform
   *attribute* inside a shared <svg> — that combination (a child shape with
   an XML transform attribute, filter set via inline style, no viewBox on
   the parent) is a known trouble spot in WebKit and silently failed to
   render the glow on iOS. Reusing <Sparkle> keeps every sparkle on the
   same top-level-SVG-plus-CSS-filter path that already renders correctly
   everywhere else on the site. */
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
    <div className="flyer-card-dots">
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
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
      </svg>
      {points.map((pt, i) => (
        <Sparkle
          key={i}
          className={`absolute ${COLORS[i % COLORS.length]}`}
          style={{
            left: pt.x,
            top: pt.y,
            width: SIZE,
            height: SIZE,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}
