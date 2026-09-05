import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import FlyerSparkleBorder from "@/components/FlyerSparkleBorder";
import PageConstellation from "@/components/PageConstellation";
import Sun from "@/components/Sun";
import Moon from "@/components/Moon";
import { WandStarsIcon } from "@/components/UtilityIcons";
import {
  MailIcon,
  InstagramIcon,
  XIcon,
  TikTokIcon,
  FacebookIcon,
} from "@/components/SocialIcons";

export default function ContactPage() {
  return (
    <>
      <PageConstellation />
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-36">
        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr]">
          <div className="flyer-card p-8 sm:p-10">
            <FlyerSparkleBorder />
            <SectionHeading
              eyebrow="Get in Touch"
              title="Book a Project"
              icon={
                <WandStarsIcon className="h-6 w-6 text-gold drop-shadow-[0_0_6px_rgba(255,212,73,0.8)]" />
              }
              description={
                <>
                  Share with me what you&apos;re envisioning and
                  I&apos;ll get back to you within a couple of Suns &amp; Moons.{" "}
                  <Sun className="inline-block h-4 w-4 -translate-y-px text-gold" />{" "}
                  <Moon className="inline-block h-4 w-4 -translate-y-px text-gold" />
                </>
              }
            />

            <div className="mt-8 rounded-2xl border border-gold/30 bg-gold/5 p-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">
                <WandStarsIcon className="h-6 w-6 text-gold drop-shadow-[0_0_6px_rgba(255,212,73,0.8)]" />
                Included Perk
              </div>
              <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                Booking me also includes influencer marketing for your project
                across my personal social media channels (where I speak
                alchemy using iPhone videos daily).
              </p>
            </div>

            <div className="mt-8 space-y-4 text-sm">
              <div className="flex items-center gap-2 text-cream-dim">
                <MailIcon className="h-3.5 w-3.5 text-gold" />
                <a href="mailto:jason@galacticmonk.com" className="hover:text-cream">
                  jason@galacticmonk.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-cream-dim">
                <InstagramIcon className="h-3.5 w-3.5 text-gold" />
                <a
                  href="https://www.instagram.com/galacticmonk_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream"
                >
                  Instagram
                </a>
              </div>
              <div className="flex items-center gap-2 text-cream-dim">
                <XIcon className="h-3.5 w-3.5 text-gold" />
                <a
                  href="https://x.com/GalacticMonk_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream"
                >
                  X
                </a>
              </div>
              <div className="flex items-center gap-2 text-cream-dim">
                <TikTokIcon className="h-3.5 w-3.5 text-gold" />
                <a
                  href="https://www.tiktok.com/@thegalacticmonk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream"
                >
                  TikTok
                </a>
              </div>
              <div className="flex items-center gap-2 text-cream-dim">
                <FacebookIcon className="h-3.5 w-3.5 text-gold" />
                <a
                  href="https://www.facebook.com/JasonDeluluLee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
