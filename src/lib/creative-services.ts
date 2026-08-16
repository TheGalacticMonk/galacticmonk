export type CreativeService = {
  readonly name: string;
  readonly kicker: string;
  readonly description: string;
  readonly accentA: string;
  readonly accentB: string;
};

export const CREATIVE_SERVICES = [
  {
    name: "Film/Video",
    kicker: "PHOTOGRAPHY IN MOTION",
    description:
      "Los Angeles film and video production from concept through directing, cinematography, editing, sound design, and color grading — for short films, events, brand stories, and documentary work.",
    accentA: "248, 118, 102",
    accentB: "108, 92, 224",
  },
  {
    name: "Photography",
    kicker: "PAUSING TIME",
    description:
      "Editorial portraits, headshots for actors and professionals, event photography, and commercial product imagery shot on location or in studio, with monthly content retainers available.",
    accentA: "255, 212, 73",
    accentB: "248, 118, 102",
  },
  {
    name: "Audio",
    kicker: "FREQUENCY & VIBRATION",
    description:
      "Vocal recording, music mixing & mastering, audiobook production, film ADR, sound design, and streaming optimization for Spotify and Apple Music — you sound major while independent.",
    accentA: "115, 158, 130",
    accentB: "245, 241, 232",
  },
  {
    name: "Digital",
    kicker: "DIVINE WI-FI",
    description:
      "Custom-coded web design, branding, UGC, and social media marketing. Your online presence is amplified. You become 1 of 1. Don't settle for cookiecutter end products from generic web agencies.",
    accentA: "245, 241, 232",
    accentB: "108, 92, 224",
  },
] as const satisfies readonly CreativeService[];

export type CreativeServiceIndex = 0 | 1 | 2 | 3;

export function normalizeCreativeServiceIndex(index: number): CreativeServiceIndex {
  const length = CREATIVE_SERVICES.length;
  return (((index % length) + length) % length) as CreativeServiceIndex;
}
