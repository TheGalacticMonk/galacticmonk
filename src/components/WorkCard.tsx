import Image from "next/image";
import Link from "next/link";
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
    <Link
      href={`/work/${item.id}/`}
      className="group block overflow-hidden rounded-2xl bg-ink-deep/60 shadow-[0_8px_30px_-14px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-14px_rgba(0,0,0,0.7)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
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
      <div className="p-5">
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
    </Link>
  );
}
