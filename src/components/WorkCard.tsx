import { CATEGORY_LABEL, type WorkItem } from "@/lib/work";
import Sparkle from "./Sparkle";

const ACCENT_GRADIENT = {
  gold: "from-gold/40 via-ink-deep to-ink-deep",
  coral: "from-coral/40 via-ink-deep to-ink-deep",
  sage: "from-sage/40 via-ink-deep to-ink-deep",
};

const ACCENT_TEXT = {
  gold: "text-gold",
  coral: "text-coral",
  sage: "text-sage",
};

export default function WorkCard({ item }: { item: WorkItem }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-cream/10 bg-ink-deep/60 transition-colors hover:border-cream/25">
      <div
        className={`flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${ACCENT_GRADIENT[item.accent]}`}
      >
        <Sparkle
          className={`h-8 w-8 opacity-70 transition-transform duration-300 group-hover:scale-110 ${ACCENT_TEXT[item.accent]}`}
        />
      </div>
      <div className="p-5">
        <div
          className={`text-xs uppercase tracking-[0.2em] ${ACCENT_TEXT[item.accent]}`}
        >
          {CATEGORY_LABEL[item.category]} · {item.year}
        </div>
        <h3 className="mt-2 font-serif text-lg text-cream">{item.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-cream-dim">
          {item.blurb}
        </p>
      </div>
    </article>
  );
}
