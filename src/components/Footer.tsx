import Link from "next/link";
import Sparkle from "./Sparkle";

export default function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-ink-deep">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-icon.svg" alt="" className="h-8 w-auto" />
            <span className="font-serif text-lg tracking-[0.15em] text-cream">
              GALACTIC MONK
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-cream-dim">
            Creative production for film, photography, and sound — shaped by
            Jason Lee, Creative Producer &amp; Alchemist.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div>
            <h3 className="mb-3 flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-gold">
              <Sparkle className="h-3 w-3" /> Explore
            </h3>
            <ul className="space-y-2 text-sm text-cream-dim">
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
              <li>
                <a href="tel:+13104564508" className="hover:text-cream">
                  310-456-4508
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-sage">
              <Sparkle className="h-3 w-3" /> Elsewhere
            </h3>
            {/* TODO: swap in real social links */}
            <ul className="space-y-2 text-sm text-cream-dim">
              <li className="opacity-60">Instagram — coming soon</li>
              <li className="opacity-60">Vimeo — coming soon</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 px-6 py-6 text-center text-xs text-cream-dim/70">
        © {new Date().getFullYear()} Galactic Monk. All rights reserved.
      </div>
    </footer>
  );
}
