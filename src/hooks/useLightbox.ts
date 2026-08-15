"use client";

import { useCallback, useEffect, useState } from "react";

export function useLightbox(itemCount: number) {
  const [index, setIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % itemCount)),
    [itemCount]
  );
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + itemCount) % itemCount)),
    [itemCount]
  );

  useEffect(() => {
    if (index === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (itemCount > 1 && e.key === "ArrowRight") next();
      if (itemCount > 1 && e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [index, itemCount, close, next, prev]);

  return { index, isOpen: index !== null, open, close, next, prev };
}
