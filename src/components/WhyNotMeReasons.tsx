"use client";

import { motion, MotionConfig } from "framer-motion";
import Sparkle from "./Sparkle";

const WHY_NOT_ME_REASONS = [
  {
    title: "SOCIAL INFLUENCE",
    accent: "coral" as const,
    description:
      "One of the greatest challenges for any artist, brand, or company is being seen. As a social media influencer across multiple platforms, I bring firsthand experience starting small and building an audience organically. Together, we’ll craft your idea into an experience designed to connect with people. I also offer social media growth coaching, specifically for awakened multidimensional souls.",
  },
  {
    title: "END-TO-END",
    accent: "gold" as const,
    description:
      "From first ideation to social media marketing strategy, I can guide the entire creative process. Concepting, production, photography, audio mastering, editing, and delivery can all be overseen by one producer. Fewer handoffs mean greater consistency, less miscommunication, and a creative vision that remains focused from beginning to end. I know how to both start a project, and finish it.",
  },
  {
    title: "ALCHEMY",
    accent: "sage" as const,
    description:
      "Alchemy begins with what’s available: materials, thoughts, energy, even limitations. What looks like scraps to one person can become ingredients in the hands of an alchemist. The alchemist sees their hidden potential, then combines and crafts them until the final form feels like magic. Alchemists are magicians of Yin and Yang, capable of transmuting darkness into light, and suffering into power.",
  },
  {
    title: "MULTIDIMENSIONAL",
    accent: "cream" as const,
    description:
      "Experience across interdimensional creative worlds allows me to see projects from an elevated perception. When someone pitches me an idea, I don’t just see the end product, I see the bigger picture, and how every phase is connected. Jack of all trades, master of none? Perhaps the real self-mastery is innerstanding the mystical connections between seemingly disconnected realms.",
  },
];

const ACCENT_TEXT = {
  coral: "text-coral",
  gold: "text-gold",
  sage: "text-sage",
  cream: "text-cream",
};

export default function WhyNotMeReasons() {
  return (
    <MotionConfig reducedMotion="user">
      <WhyNotMeReasonsContent />
    </MotionConfig>
  );
}

function WhyNotMeReasonsContent() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {WHY_NOT_ME_REASONS.map((reason, i) => (
        <motion.article
          key={reason.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4, transition: { duration: 0.18, delay: 0 } }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="why-not-me-card min-h-72 rounded-2xl shadow-[0_8px_30px_-14px_rgba(0,0,0,0.6)]"
        >
          <div className="why-not-me-card-face flex flex-col p-6 pb-20">
            <Sparkle className={`h-5 w-5 ${ACCENT_TEXT[reason.accent]}`} />
            <h3 className="mt-4 font-serif text-xl text-cream">
              {reason.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-cream-dim">
              {reason.description}
            </p>
          </div>
          <div className="why-not-me-card-button">
            <a
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
            </a>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
