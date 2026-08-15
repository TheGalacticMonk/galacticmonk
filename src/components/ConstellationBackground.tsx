"use client";

import { useEffect, useRef } from "react";

/* A lightweight, dependency-free canvas network: colorful drifting nodes,
   each linked by thin lines to every other node within reach — the same
   dense triangulated "constellation" shape used on billionyearsold.com
   (particles.js's network preset), re-themed to this site's palette. No
   particle library — keeps the bundle small. Pauses on hidden tabs and
   skips animation for reduced motion. */

/* Muted toward cream-dim so the brightest hues (gold, coral) don't pop as
   hard against the dark background. */
const NODE_COLORS = ["#ecce7e", "#f5f1e8", "#e89191", "#739e82", "#8376e0"];
const NODE_OPACITY = 0.35;
const LINE_COLOR = "245, 241, 232";
const LINE_OPACITY = 0.25;
const LINK_DISTANCE = 130;
const FRAME_INTERVAL = 1000 / 30;

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  minR: number;
  maxR: number;
  breatheSpeed: number;
  phase: number;
  color: string;
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

    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    let frameId = 0;
    let lastTime = 0;

    const makeNodes = () => {
      const count = Math.min(30, Math.max(10, Math.floor((width * height) / 42000)));
      nodes = Array.from({ length: count }, () => {
        const minR = Math.random() * 1.6 + 1.2;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          minR,
          maxR: minR + Math.random() * 2.6 + 1.4,
          breatheSpeed: 0.0006 + Math.random() * 0.0008,
          phase: Math.random() * Math.PI * 2,
          color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
        };
      });
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
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

      for (const node of nodes) {
        const t = 0.5 + 0.5 * Math.sin(time * node.breatheSpeed + node.phase);
        const r = node.minR + (node.maxR - node.minR) * t;
        ctx.beginPath();
        ctx.globalAlpha = NODE_OPACITY;
        ctx.fillStyle = node.color;
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      const widthChanged = newWidth !== width;
      width = newWidth;
      height = newHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      /* Mobile browsers resize the viewport (and this container) as the
         address bar collapses/expands mid-scroll, firing ResizeObserver
         many times per gesture. Re-rolling nodes on every one of those
         height-only changes made the whole field jump to new random spots
         repeatedly, reading as a glitchy fast-forward. Only width changes
         (actual resize/orientation change) warrant a fresh layout. */
      if (widthChanged || nodes.length === 0) makeNodes();
      draw(0);
    };

    const step = (time: number) => {
      frameId = requestAnimationFrame(step);
      if (time - lastTime < FRAME_INTERVAL) return;
      lastTime = time;

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
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
