"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Sparkle from "./Sparkle";

const PILLARS = [
  {
    title: "Film & Video",
    accent: "coral" as const,
    description:
      "Concept, production, and post — short films, events, brand spots, and documentary work cut and color graded end to end. Whether you need a cinematic film look, or sharp and modern for social media, I have the gear.",
  },
  {
    title: "Photography",
    accent: "gold" as const,
    description:
      "Editorial, portrait, event, and commercial photography, shot on location or in studio. Discounted monthly subscriptions available if you need professional photos consistently, such as for social media.",
  },
  {
    title: "Audio",
    accent: "sage" as const,
    description:
      "Recording, mixing, and mastering for music, EPs, albums, audiobooks, and film ADR. I carry some of the finest microphones and preamps. Sound like you're signed to a major label while independent. All genres.",
  },
  {
    title: "Web Design & Dev",
    accent: "cream" as const,
    description:
      "This website was coded via Claude using no drag and drop builders (they have many limitations). Your website could look as good as this one, while avoiding the premium web agencies will charge you for no good reason.",
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
          whileHover={{ scale: 1.05 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="pillar-card min-h-72 rounded-2xl p-6 pb-8 shadow-[0_8px_30px_-14px_rgba(0,0,0,0.6)]"
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
            Let&apos;s Chat!
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
