"use client";

import { useState } from "react";
import { CATEGORY_LABEL, WORK, type Category } from "@/lib/work";
import WorkCard from "./WorkCard";

const FILTERS: Array<{ key: Category | "all"; label: string }> = [
  { key: "all", label: "All" },
  { key: "film", label: CATEGORY_LABEL.film },
  { key: "photo", label: CATEGORY_LABEL.photo },
  { key: "music", label: CATEGORY_LABEL.music },
];

export default function WorkGrid() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const items = filter === "all" ? WORK : WORK.filter((item) => item.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`rounded-full border px-4 py-2 text-sm tracking-wide transition-colors ${
              filter === f.key
                ? "border-gold bg-gold/10 text-gold"
                : "border-cream/20 text-cream-dim hover:border-cream/40 hover:text-cream"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <WorkCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
