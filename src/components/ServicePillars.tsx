"use client";

import { motion } from "framer-motion";
import Sparkle from "./Sparkle";

const PILLARS = [
  {
    title: "Film & Video",
    accent: "coral" as const,
    description:
      "Concept, production, and post — short films, brand spots, and documentary work cut and graded end to end.",
  },
  {
    title: "Photography",
    accent: "gold" as const,
    description:
      "Editorial, portrait, and commercial photography, shot on location or in studio and retouched with a light hand.",
  },
  {
    title: "Recording, Mix & Master",
    accent: "sage" as const,
    description:
      "Recording, mixing, and mastering for music, audiobooks, and film ADR.",
  },
];

const ACCENT_CLASSES = {
  coral: "text-coral hover:shadow-[0_16px_40px_-14px_rgba(248,118,102,0.45)]",
  gold: "text-gold hover:shadow-[0_16px_40px_-14px_rgba(255,212,73,0.45)]",
  sage: "text-sage hover:shadow-[0_16px_40px_-14px_rgba(115,158,130,0.45)]",
};

export default function ServicePillars() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {PILLARS.map((pillar, i) => (
        <motion.div
          key={pillar.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className={`rounded-2xl bg-ink-deep/60 p-6 shadow-[0_8px_30px_-14px_rgba(0,0,0,0.6)] transition-shadow duration-300 ${ACCENT_CLASSES[pillar.accent]}`}
        >
          <Sparkle className="h-5 w-5" />
          <h3 className="mt-4 font-serif text-xl text-cream">
            {pillar.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-cream-dim">
            {pillar.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
