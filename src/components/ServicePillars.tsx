"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Sparkle from "./Sparkle";

const PILLARS = [
  {
    title: "Film & Video",
    accent: "coral" as const,
    description:
      "Los Angeles video production from concept through cinematography, editing, sound design, and color — for short films, events, brand stories, and documentary work.",
  },
  {
    title: "Photography",
    accent: "gold" as const,
    description:
      "Editorial portraits, event photography, and commercial imagery shot on location or in studio, with monthly content retainers available.",
  },
  {
    title: "Audio",
    accent: "sage" as const,
    description:
      "Vocal recording, music mixing and mastering, audiobook production, film ADR, and final audio delivery — you sound major while independent.",
  },
  {
    title: "Digital",
    accent: "cream" as const,
    description:
      "Custom-coded web design, branding, UGC, and social media marketing. Your online presence is amplified. You become 1 of 1. Don't settle for cookiecutter end products from generic web agencies.",
  },
];

const ACCENT_TEXT = {
  coral: "text-coral",
  gold: "text-gold",
  sage: "text-sage",
  cream: "text-cream",
};

export default function ServicePillars() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {PILLARS.map((pillar, i) => (
        <motion.article
          key={pillar.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4, transition: { duration: 0.18, delay: 0 } }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="pillar-card min-h-72 rounded-2xl shadow-[0_8px_30px_-14px_rgba(0,0,0,0.6)]"
        >
          <div className="pillar-card-face flex flex-col p-6 pb-20">
            <Sparkle className={`h-5 w-5 ${ACCENT_TEXT[pillar.accent]}`} />
            <h3 className="mt-4 font-serif text-xl text-cream">
              {pillar.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-cream-dim">
              {pillar.description}
            </p>
          </div>
          <div className="pillar-card-button">
            <Link
              href="/contact/#project-inquiry"
              className="btn-nova btn-nova-compact text-[11px] font-medium tracking-wide sm:text-xs"
            >
              <span className="btn-nova-inner">
                <strong className="btn-nova-label">Start a project</strong>
                <span className="btn-nova-stars" aria-hidden="true">
                  <span className="btn-nova-stars-field" />
                </span>
                <span className="btn-nova-glow" aria-hidden="true">
                  <span className="btn-nova-circle" />
                  <span className="btn-nova-circle" />
                </span>
              </span>
            </Link>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
