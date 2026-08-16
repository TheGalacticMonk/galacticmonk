import Link from "next/link";
import Sparkle from "./Sparkle";

export default function Footer() {
  return (
    <footer className="bg-ink-deep shadow-[0_-16px_40px_-24px_rgba(0,0,0,0.7)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-icon.svg" alt="" className="h-8 w-auto" />
            <span className="flex flex-col leading-none">
              <span className="font-serif text-lg tracking-[0.15em] text-cream">
                GALACTIC MONK
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.3em] text-cream-dim/70">
                Los Angeles
              </span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-cream-dim">
            Creative production for film, photography, sound, and digital —
            shaped by Jason Lee, Creative Producer &amp; Alchemist.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div>
            <h3 className="mb-3 flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-gold">
              <Sparkle className="h-3 w-3" /> Journey
            </h3>
            <ul className="space-y-2 text-sm text-cream-dim">
              <li><Link href="/" className="hover:text-cream">Home</Link></li>
              <li><Link href="/work/" className="hover:text-cream">Work</Link></li>
              <li><Link href="/about/" className="hover:text-cream">About</Link></li>
              <li><Link href="/contact/" className="hover:text-cream">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-coral">
              <Sparkle className="h-3 w-3" /> Contact
            </h3>
            <ul className="space-y-2 text-sm text-cream-dim">
              <li>
                <a href="mailto:jason@galacticmonk.com" className="hover:text-cream">
                  jason@galacticmonk.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-sage">
              <Sparkle className="h-3 w-3" /> Digiverse
            </h3>
            <ul className="space-y-2 text-sm text-cream-dim">
              <li>
                <a
                  href="https://www.instagram.com/galacticmonk_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/GalacticMonk_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream"
                >
                  X
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@thegalacticmonk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/JasonDeluluLee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 text-center text-xs text-cream-dim/70">
        © {new Date().getFullYear()} Galactic Monk. All rights reserved. Vibe coded by Jason Lee.
      </div>
    </footer>
  );
}
