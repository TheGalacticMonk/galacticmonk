export type Category = "film" | "photo" | "music";

export type WorkItem = {
  id: string;
  title: string;
  category: Category;
  year: string;
  blurb: string;
  accent: "gold" | "coral" | "sage";
};

export const CATEGORY_LABEL: Record<Category, string> = {
  film: "Film & Video",
  photo: "Photography",
  music: "Music Mixing & Mastering",
};

// TODO(jason): swap these placeholders for real projects, stills, and reels.
export const WORK: WorkItem[] = [
  {
    id: "midnight-transmission",
    title: "Midnight Transmission",
    category: "film",
    year: "2025",
    blurb: "Short film — nonlinear edit, color grade, and sound design.",
    accent: "coral",
  },
  {
    id: "afterglow-campaign",
    title: "Afterglow Campaign",
    category: "film",
    year: "2024",
    blurb: "Brand spot series, 30s and 15s cuts, social-first delivery.",
    accent: "coral",
  },
  {
    id: "field-notes",
    title: "Field Notes",
    category: "film",
    year: "2024",
    blurb: "Documentary segment produced and directed on location.",
    accent: "coral",
  },
  {
    id: "desert-bloom",
    title: "Desert Bloom",
    category: "photo",
    year: "2025",
    blurb: "Editorial photo series shot on location, natural light.",
    accent: "gold",
  },
  {
    id: "studio-portraits-vol-2",
    title: "Studio Portraits Vol. 2",
    category: "photo",
    year: "2024",
    blurb: "Portrait sitting series for an independent artist roster.",
    accent: "gold",
  },
  {
    id: "product-in-motion",
    title: "Product in Motion",
    category: "photo",
    year: "2024",
    blurb: "Commercial product photography with motion-blend retouching.",
    accent: "gold",
  },
  {
    id: "lucid-ep",
    title: "Lucid EP",
    category: "music",
    year: "2025",
    blurb: "Full mix and master for a 5-track independent EP release.",
    accent: "sage",
  },
  {
    id: "night-drive-single",
    title: "Night Drive",
    category: "music",
    year: "2024",
    blurb: "Single mix, stem prep, and mastering for streaming release.",
    accent: "sage",
  },
  {
    id: "live-session-remaster",
    title: "Live Session Remaster",
    category: "music",
    year: "2024",
    blurb: "Multitrack live recording cleaned up, mixed, and mastered.",
    accent: "sage",
  },
];
