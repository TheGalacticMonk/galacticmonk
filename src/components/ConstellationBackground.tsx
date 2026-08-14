"use client";

import { useEffect, useRef } from "react";

/* A lightweight, dependency-free canvas constellation: drifting dots linked
   by lines when close together. No particle library — keeps the bundle
   small. Pauses on hidden tabs and skips animation for reduced motion. */

const DOT_COLORS = ["#f5f1e8", "#ffd449", "#c9c3e0"];
const LINE_COLOR = "245, 241, 232";
const LINE_OPACITY = 0.3;
const LINK_DISTANCE = 130;
const FRAME_INTERVAL = 1000 / 30;

/* Same glyph as the bullet-point Sparkle icon, reused here for the handful
   of dots drawn as 4-point stars instead of plain circles. */
const SPARKLE_PATH_D =
  "M20 2c1.1 6.7 2.9 11.4 5.4 13.9 2.5 2.5 7.2 4.3 13.9 5.4-6.7 1.1-11.4 2.9-13.9 5.4-2.5 2.5-4.3 7.2-5.4 13.9-1.1-6.7-2.9-11.4-5.4-13.9C12.1 24.2 7.4 22.4.7 21.3c6.7-1.1 11.4-2.9 13.9-5.4C17.1 13.4 18.9 8.7 20 2Z";

type Dot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  size: number;
  rotation: number;
  spin: number;
  phase: number;
  color: string;
  sparkle: boolean;
};

export default function ConstellationBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const sparklePath = new Path2D(SPARKLE_PATH_D);

    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let frameId = 0;
    let lastTime = 0;

    const makeDots = () => {
      const count = Math.min(70, Math.max(24, Math.floor((width * height) / 16000)));
      const sparkleCount = Math.min(10, Math.max(3, Math.round(count * 0.12)));
      dots = Array.from({ length: count }, (_, i) => {
        const sparkle = i < sparkleCount;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.36,
          vy: (Math.random() - 0.5) * 0.36,
          r: sparkle ? 0 : Math.random() * 1.4 + 0.9,
          size: sparkle ? Math.random() * 5 + 7 : 0,
          rotation: Math.random() * Math.PI * 2,
          spin: sparkle ? (Math.random() - 0.5) * 0.0069 : 0,
          phase: Math.random() * Math.PI * 2,
          color: DOT_COLORS[Math.floor(Math.random() * DOT_COLORS.length)],
          sparkle,
        };
      });
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i];
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(${LINE_COLOR}, ${LINE_OPACITY * (1 - dist / LINK_DISTANCE)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const dot of dots) {
        if (dot.sparkle) {
          const twinkle = 0.65 + 0.35 * Math.sin(time / 900 + dot.phase);
          ctx.save();
          ctx.translate(dot.x, dot.y);
          ctx.rotate(dot.rotation);
          const scale = dot.size / 40;
          ctx.scale(scale, scale);
          ctx.translate(-20, -20);
          ctx.globalAlpha = twinkle;
          ctx.fillStyle = dot.color;
          ctx.shadowColor = dot.color;
          ctx.shadowBlur = 6;
          ctx.fill(sparklePath);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.globalAlpha = 0.85;
          ctx.fillStyle = dot.color;
          ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeDots();
      draw(0);
    };

    const step = (time: number) => {
      frameId = requestAnimationFrame(step);
      if (time - lastTime < FRAME_INTERVAL) return;
      lastTime = time;

      for (const dot of dots) {
        dot.x += dot.vx;
        dot.y += dot.vy;
        dot.rotation += dot.spin;
        if (dot.x < 0 || dot.x > width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > height) dot.vy *= -1;
      }

      draw(time);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frameId);
      } else {
        lastTime = 0;
        frameId = requestAnimationFrame(step);
      }
    };

    if (!reduceMotion) {
      frameId = requestAnimationFrame(step);
      document.addEventListener("visibilitychange", handleVisibility);
    }

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
