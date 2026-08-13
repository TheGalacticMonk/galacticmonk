"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Sparkle from "./Sparkle";

export default function Hero() {
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
    <section className="swirl-bg relative flex min-h-screen items-center overflow-hidden pt-24">
      <Sparkle className="pointer-events-none absolute left-[10%] top-[28%] h-6 w-6 text-gold/60" />
      <Sparkle className="pointer-events-none absolute right-[10%] top-[28%] h-6 w-6 text-gold/60" />
      <Sparkle className="pointer-events-none absolute bottom-[22%] left-[18%] h-4 w-4 text-sage/60" />
      <Sparkle className="pointer-events-none absolute bottom-[22%] right-[18%] h-4 w-4 text-sage/60" />

      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-gold"
        >
          <Sparkle className="h-3 w-3" />
          Creative Producer &amp; Alchemist
          <Sparkle className="h-3 w-3" />
        </motion.div>

        <motion.button
          type="button"
          onClick={() => setExpanded(true)}
          aria-label="Expand photo of Jason Lee"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mx-auto mb-6 block h-36 w-36 cursor-zoom-in overflow-hidden rounded-full shadow-[0_0_40px_-14px_rgba(245,241,232,0.35)] transition-transform hover:scale-105 sm:h-44 sm:w-44"
        >
          <Image
            src="/monk-beach.jpg"
            alt="Jason Lee"
            width={320}
            height={320}
            sizes="176px"
            priority
            className="h-full w-full object-cover"
          />
        </motion.button>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-balance mt-6 font-serif text-5xl leading-[1.05] text-cream sm:text-6xl md:text-7xl"
        >
          GALACTIC MONK
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-balance mx-auto mt-6 max-w-xl text-lg text-cream-dim"
        >
          Film &amp; video, photography, and audio recording, mix &amp; master —
          one master alchemist, transmuting energy, frequency, and vibe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/work/" className="btn-nova text-sm font-medium tracking-wide">
            <span className="btn-nova-inner">
              <strong className="btn-nova-label">Experience My Work</strong>
              <span className="btn-nova-stars" aria-hidden="true">
                <span className="btn-nova-stars-field" />
              </span>
              <span className="btn-nova-glow" aria-hidden="true">
                <span className="btn-nova-circle" />
                <span className="btn-nova-circle" />
              </span>
            </span>
          </Link>
          <Link href="/contact/" className="btn-nova text-sm font-medium tracking-wide">
            <span className="btn-nova-inner">
              <strong className="btn-nova-label">Work With Me</strong>
              <span className="btn-nova-stars" aria-hidden="true">
                <span className="btn-nova-stars-field" />
              </span>
              <span className="btn-nova-glow" aria-hidden="true">
                <span className="btn-nova-circle" />
                <span className="btn-nova-circle" />
              </span>
            </span>
          </Link>
        </motion.div>
      </div>

      {expanded && (
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
            src="/monk-beach.jpg"
            alt="Jason Lee"
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-lg object-contain"
          />
        </div>
      )}
    </section>
  );
}
