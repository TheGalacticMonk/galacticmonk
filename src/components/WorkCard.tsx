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

const ACCENT_BORDER = {
  gold: "border-[rgba(255,212,73,0.3)] hover:border-[rgba(255,212,73,0.8)]",
  coral: "border-[rgba(248,118,102,0.3)] hover:border-[rgba(248,118,102,0.8)]",
  sage: "border-[rgba(115,158,130,0.3)] hover:border-[rgba(115,158,130,0.8)]",
};

const ACCENT_GLOW = {
  gold: "hover:shadow-[0_16px_40px_-14px_rgba(0,0,0,0.7),0_0_32px_-8px_rgba(255,212,73,0.55)]",
  coral: "hover:shadow-[0_16px_40px_-14px_rgba(0,0,0,0.7),0_0_32px_-8px_rgba(248,118,102,0.55)]",
  sage: "hover:shadow-[0_16px_40px_-14px_rgba(0,0,0,0.7),0_0_32px_-8px_rgba(115,158,130,0.55)]",
};

const OBJECT_POSITION = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
};

export default function WorkCard({ item }: { item: WorkItem }) {
  return (
    <Link
      href={`/work/${item.id}/`}
      className={`group block overflow-hidden rounded-2xl border bg-ink-deep/60 shadow-[0_8px_30px_-14px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 ${ACCENT_BORDER[item.accent]} ${ACCENT_GLOW[item.accent]}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className={`object-cover transition-transform duration-300 group-hover:scale-105 ${OBJECT_POSITION[item.imagePosition ?? "center"]}`}
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
