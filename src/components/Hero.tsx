"use client";

import { motion, MotionConfig } from "framer-motion";
import MoonOrb from "./MoonOrb";
import Sparkle from "./Sparkle";
import ConstellationBackground from "./ConstellationBackground";
import Lightbox from "./Lightbox";
import { useLightbox } from "@/hooks/useLightbox";

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <HeroContent />
    </MotionConfig>
  );
}

function HeroContent() {
  const { isOpen, open, close } = useLightbox(1);

  return (
    <section className="swirl-bg relative flex min-h-screen items-center overflow-hidden pt-20">
      <ConstellationBackground className="pointer-events-none absolute inset-0 opacity-80" />
      <Sparkle className="pointer-events-none absolute left-[10%] top-[28%] h-6 w-6 text-coral/60" />
      <Sparkle className="pointer-events-none absolute right-[10%] top-[28%] h-6 w-6 text-coral/60" />
      <Sparkle className="pointer-events-none absolute bottom-[22%] left-[18%] h-4 w-4 text-sage/60" />
      <Sparkle className="pointer-events-none absolute bottom-[22%] right-[18%] h-4 w-4 text-sage/60" />

      <div className="mx-auto max-w-4xl px-6 py-12 text-center">
        <motion.div
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-gold"
        >
          <Sparkle className="h-3 w-3" />
          Producer &amp; Alchemist
          <Sparkle className="h-3 w-3" />
        </motion.div>

        <motion.div
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7, scale: { duration: 0.2 } }}
          className="relative mx-auto mb-6 h-36 w-36 rounded-full shadow-[0_0_40px_rgba(245,241,232,0.5)] sm:h-44 sm:w-44"
        >
          <button
            type="button"
            onClick={() => open(0)}
            aria-label="Expand photo of Jason Lee"
            className="relative block h-full w-full cursor-zoom-in overflow-hidden rounded-full"
          >
            <picture className="absolute inset-0 block">
              <source
                type="image/avif"
                srcSet="/optimized/monk-beach-320.avif 320w, /optimized/monk-beach-480.avif 480w"
                sizes="(min-width: 640px) 176px, 144px"
              />
              <img
                src="/monk-beach.jpg"
                alt="Jason Lee"
                width={320}
                height={320}
                sizes="(min-width: 640px) 176px, 144px"
                loading="eager"
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </picture>
            <motion.span
              aria-hidden="true"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1.4369, delay: 1.369 }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <MoonOrb className="h-full w-full" />
            </motion.span>
          </button>
        </motion.div>

        <motion.h1
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-balance mt-6 font-serif text-5xl leading-[1.05] text-cream sm:text-6xl md:text-7xl"
        >
          <span className="block">GALACTIC MONK</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-balance mx-auto mt-6 max-w-xl text-lg text-cream-dim"
        >
          Los Angeles film, photography, audio, and digital production for
          artists and mission-led brands ready to make their signal visible.
        </motion.p>

        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a href="/work/" className="btn-nova text-sm font-medium tracking-wide">
            <span className="btn-nova-inner">
              <strong className="btn-nova-label">Explore the Work</strong>
              <span className="btn-nova-stars" aria-hidden="true">
                <span className="btn-nova-stars-field" />
              </span>
              <span className="btn-nova-glow" aria-hidden="true">
                <span className="btn-nova-circle" />
                <span className="btn-nova-circle" />
              </span>
            </span>
          </a>
          <a href="/contact/" className="btn-nova btn-nova-urgent text-sm font-medium tracking-wide">
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
          </a>
        </motion.div>
      </div>

      <Lightbox isOpen={isOpen} onClose={close}>
        <img
          src="/monk-beach.jpg"
          alt="Jason Lee"
          className="max-h-full max-w-full rounded-lg object-contain"
        />
      </Lightbox>
    </section>
  );
}
