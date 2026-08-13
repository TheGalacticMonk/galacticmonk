"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Sparkle from "./Sparkle";

const PILLARS = [
  {
    title: "Film & Video",
    accent: "coral" as const,
    description:
      "Concept, production, and post — short films, events, brand spots, and documentary work cut and color graded end to end.",
  },
  {
    title: "Photography",
    accent: "gold" as const,
    description:
      "Editorial, portrait, event, and commercial photography, shot on location or in studio and edited with a light hand.",
  },
  {
    title: "Audio",
    accent: "sage" as const,
    description:
      "Recording, mixing, and mastering for music, audiobooks, and film ADR.",
  },
  {
    title: "Web Development",
    accent: "cream" as const,
    description:
      "Custom sites and web apps for clients — built clean, fast, and tailored to the brand, from first concept to launch.",
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
        <motion.div
          key={pillar.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="pillar-card aspect-square rounded-2xl p-6 shadow-[0_8px_30px_-14px_rgba(0,0,0,0.6)]"
        >
          <div className="flex h-full flex-col">
            <Sparkle className={`h-5 w-5 ${ACCENT_TEXT[pillar.accent]}`} />
            <h3 className="mt-4 font-serif text-xl text-cream">
              {pillar.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-cream-dim">
              {pillar.description}
            </p>
          </div>
          <Link
            href="/contact/"
            className="pillar-card-button rounded-full bg-gold px-4 py-2 text-xs font-medium text-ink-deep"
          >
            Let&apos;s Chat
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
