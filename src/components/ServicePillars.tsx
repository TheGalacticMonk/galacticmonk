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
  coral: "text-coral border-coral/30 hover:border-coral/60",
  gold: "text-gold border-gold/30 hover:border-gold/60",
  sage: "text-sage border-sage/30 hover:border-sage/60",
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
          className={`rounded-2xl border bg-ink-deep/60 p-6 transition-colors ${ACCENT_CLASSES[pillar.accent]}`}
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
