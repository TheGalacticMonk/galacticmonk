import { CATEGORY_LABEL, type WorkItem } from "@/lib/work";
import { optimizedImageSrc, optimizedImageSrcSet } from "@/lib/optimized-image";
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

const OBJECT_POSITION = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
};

export default function WorkCard({
  item,
  priority = false,
}: {
  item: WorkItem;
  /**
   * Set for cards that render above the fold (e.g. the first row of a
   * grid) so the cover image skips native lazy loading and is eligible
   * for the browser's LCP preload optimization. Leave false for cards
   * that are reliably below the fold — lazy-loading those is correct
   * and keeps this from being applied blanket-wide.
   */
  priority?: boolean;
}) {
  return (
    <a
      href={`/work/${item.id}/`}
      data-accent={item.accent}
      className="work-card-glow group relative flex h-full flex-col rounded-3xl shadow-[0_8px_30px_-14px_rgba(0,0,0,0.6)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-16px_rgba(0,0,0,0.75)]"
    >
      <div className="relative aspect-[4/3] shrink-0 overflow-hidden rounded-t-3xl">
        {item.image ? (
          <img
            src={optimizedImageSrc(item.image, 480)}
            srcSet={optimizedImageSrcSet(item.image)}
            alt={item.title}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 ${OBJECT_POSITION[item.imagePosition ?? "center"]}`}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${ACCENT_GRADIENT[item.accent]}`}
          >
            <Sparkle
              className={`h-8 w-8 opacity-70 transition-transform duration-300 group-hover:scale-110 ${ACCENT_TEXT[item.accent]}`}
            />
          </div>
        )}
      </div>
      <div className="flex-1 rounded-b-3xl bg-ink-deep p-5">
        <div
          className={`text-xs uppercase tracking-[0.2em] ${ACCENT_TEXT[item.accent]}`}
        >
          {item.categoryLabel ?? CATEGORY_LABEL[item.category]} · {item.year}
        </div>
        <h3 className="mt-2 font-serif text-lg text-cream">{item.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-cream-dim">
          {item.blurb}
        </p>
      </div>
      <span className="work-card-bottom-glow" aria-hidden="true" />
    </a>
  );
}
