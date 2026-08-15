"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const FOCUSABLE_SELECTOR =
  'button, a[href], [tabindex]:not([tabindex="-1"])';

export default function Lightbox({
  isOpen,
  onClose,
  onPrev,
  onNext,
  showNav = false,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  showNav?: boolean;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<Element | null>(null);

  // Focus the close button on open, and return focus to whatever triggered
  // the lightbox on close — keeps keyboard/screen-reader users oriented
  // instead of dropping them back at the top of the document.
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
      closeButtonRef.current?.focus();
    } else {
      (triggerRef.current as HTMLElement | null)?.focus?.();
    }
  }, [isOpen]);

  // Minimal focus trap: Tab/Shift+Tab wraps within the dialog instead of
  // escaping to the page behind the overlay.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    // Portaled to <body>: a fixed z-50 div still gets trapped under whatever
    // content follows it in the DOM if any ancestor creates a stacking
    // context (isolation, transform, filter, etc.) — e.g. .matrix-frame's
    // or .editorial-card's isolation:isolate elsewhere on the site.
    // Rendering outside the tree sidesteps that entirely.
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Expanded image"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-deep/95 p-4 sm:p-10"
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-5 top-5 text-3xl leading-none text-cream/80 hover:text-gold"
      >
        ×
      </button>

      {showNav && onPrev && (
        <button
          type="button"
          aria-label="Previous"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-4 text-3xl text-cream/70 hover:text-gold sm:left-5"
        >
          ‹
        </button>
      )}
      {showNav && onNext && (
        <button
          type="button"
          aria-label="Next"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-4 text-3xl text-cream/70 hover:text-gold sm:right-5"
        >
          ›
        </button>
      )}

      {/* display:contents — the img itself must be a direct flex child of
          the dialog for max-h-full/max-w-full to resolve against the
          viewport-sized dialog; a normal (auto-height) wrapper div here
          breaks that percentage-height chain and lets the image render at
          full intrinsic size, overflowing/clipping in the fixed overlay. */}
      <div className="contents" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}
