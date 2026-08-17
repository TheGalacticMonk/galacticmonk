"use client";

import { useEffect, useRef, useState } from "react";
import { FacebookIcon, InstagramIcon, TikTokIcon, XIcon } from "./SocialIcons";
import { WandStarsIcon } from "./UtilityIcons";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/work/", label: "Work" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

const SOCIALS = [
  { href: "https://www.instagram.com/galacticmonk_/", label: "Instagram", Icon: InstagramIcon },
  { href: "https://x.com/GalacticMonk_", label: "X", Icon: XIcon },
  { href: "https://www.tiktok.com/@thegalacticmonk", label: "TikTok", Icon: TikTokIcon },
  { href: "https://www.facebook.com/JasonDeluluLee", label: "Facebook", Icon: FacebookIcon },
];

function isActiveLink(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function normalizePathname(pathname: string) {
  if (pathname === "/") return pathname;
  return `${pathname.replace(/\/+$/, "")}/`;
}

export default function Nav({ pathname = "/" }: { pathname?: string }) {
  const currentPathname = normalizePathname(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/90 backdrop-blur-md shadow-[0_12px_30px_-18px_rgba(0,0,0,0.6)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/logo-icon.svg" alt="" className="h-9 w-auto" />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-xl tracking-[0.15em] text-cream">
              GALACTIC MONK
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.3em] text-cream-dim/70">
              Los Angeles
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => {
            const active = isActiveLink(link.href, currentPathname);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-1.5 text-sm tracking-wide transition-[color,text-shadow] hover:text-gold hover:text-shadow-[0_0_14px_rgba(255,212,73,0.9)] ${
                  active
                    ? "text-gold text-shadow-[0_0_14px_rgba(255,212,73,0.9)]"
                    : "text-cream-dim text-shadow-[0_0_12px_rgba(245,241,232,0.7)]"
                }`}
              >
                {active && (
                  <WandStarsIcon className="h-3.5 w-3.5" />
                )}
                {link.label}
              </a>
            );
          })}
          <div className="flex items-center gap-4 border-l border-cream/20 pl-6">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-cream-dim transition-colors hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="h-px w-6 bg-cream" />
          <span className="h-px w-6 bg-cream" />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="flex flex-col gap-1 bg-ink px-6 pb-6 pt-2 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.7)] md:hidden"
        >
          {LINKS.map((link) => {
            const active = isActiveLink(link.href, currentPathname);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-1.5 py-3 text-sm tracking-wide transition-[color,text-shadow] hover:text-gold hover:text-shadow-[0_0_14px_rgba(255,212,73,0.9)] ${
                  active
                    ? "text-gold text-shadow-[0_0_14px_rgba(255,212,73,0.9)]"
                    : "text-cream-dim text-shadow-[0_0_12px_rgba(245,241,232,0.7)]"
                }`}
              >
                {active && (
                  <WandStarsIcon className="h-3.5 w-3.5" />
                )}
                {link.label}
              </a>
            );
          })}
          <div className="mt-3 flex items-center gap-5 border-t border-cream/20 pt-4">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-cream-dim transition-colors hover:text-gold"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
