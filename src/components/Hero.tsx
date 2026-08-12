"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Sparkle from "./Sparkle";

export default function Hero() {
  return (
    <section className="swirl-bg relative flex min-h-screen items-center overflow-hidden pt-24">
      <Sparkle className="pointer-events-none absolute left-[8%] top-[22%] h-6 w-6 text-gold/60" />
      <Sparkle className="pointer-events-none absolute right-[12%] top-[38%] h-4 w-4 text-coral/60" />
      <Sparkle className="pointer-events-none absolute bottom-[18%] left-[18%] h-5 w-5 text-sage/60" />

      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-gold"
        >
          <Sparkle className="h-3 w-3" />
          Creative Producer &amp; Alchemist
          <Sparkle className="h-3 w-3" />
        </motion.div>

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
          one creative hand, shaping every frame and frequency.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/work/"
            className="rounded-full bg-gold px-8 py-3 text-sm font-medium tracking-wide text-ink-deep transition-transform hover:scale-105"
          >
            View the Work
          </Link>
          <Link
            href="/contact/"
            className="rounded-full border border-cream/30 px-8 py-3 text-sm font-medium tracking-wide text-cream transition-colors hover:border-gold hover:text-gold"
          >
            Book a Project
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
