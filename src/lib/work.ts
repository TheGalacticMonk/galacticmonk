export type Category = "film" | "photo" | "music";

export type WorkItem = {
  id: string;
  title: string;
  category: Category;
  year: string;
  blurb: string;
  accent: "gold" | "coral" | "sage";
  image?: string;
  video?: string;
  vimeoId?: string;
  details?: string;
  gallery?: string[];
};

export const CATEGORY_LABEL: Record<Category, string> = {
  film: "Film & Video",
  photo: "Photography",
  music: "Music Mixing & Mastering",
};

// TODO(jason): swap these placeholders for real projects, stills, and reels.
export const WORK: WorkItem[] = [
  {
    id: "mainstream-media-mind-control-shirt-ad",
    title: "Mainstream Media Mind Control Shirt Ad",
    category: "film",
    year: "2026",
    blurb: "Short film — nonlinear edit, color grade, and sound design.",
    accent: "coral",
    image: "/work/cover-images/msm-mind-control-cover.jpg",
    vimeoId: "1197906457",
    details:
      "Shot on RED Komodo, Canon RF 24-70 f/2.8 L lens, and NISI Black Pro Mist. Edit, sound design, and color grade all done in DaVinci Resolve.",
  },
  {
    id: "put-your-phone-down",
    title: "Put Your Phone Down",
    category: "film",
    year: "2026",
    blurb: "Short film - Director of Photography, audio mix, and color grade.",
    accent: "coral",
    image: "/work/cover-images/put-your-phone-down-macro-cover.jpg",
    vimeoId: "1207633805",
    details: `Director: Andrea Gallardo Díaz
Writer: Andrea Gallardo Díaz
Producer: Jason Lee
Actors: Andrea Gallardo Díaz, Justice Dillard
Director of Photography: Jason Lee
Editor: Andrea Gallardo Díaz
Sound Designer: Andrea Gallardo Díaz
Colorists: Jason Lee, Andrea Gallardo Díaz
Re-Recording Mixer: Jason Lee
Location: Hermosa Beach, CA

Shot on RED Komodo & DZOFILM Vespid Prime Lenses. Edit and color grade done in DaVinci Resolve. ADR and sound design done in Pro Tools.`,
  },
  {
    id: "garden-party",
    title: "July 2026 Garden Party",
    category: "photo",
    year: "2026",
    blurb: "Event photography shot on Canon.",
    accent: "gold",
    image: "/work/2026-07-garden-party/lauren-nikohl-dj-2.jpg",
    gallery: [
      "/work/2026-07-garden-party/celestial-admission.jpg",
      "/work/2026-07-garden-party/lauren-nikohl-dj-1.jpg",
      "/work/2026-07-garden-party/dj-close-up.jpg",
      "/work/2026-07-garden-party/itzel-portrait.jpg",
      "/work/2026-07-garden-party/coloring-group.jpg",
      "/work/2026-07-garden-party/miguel-rincon.jpg",
      "/work/2026-07-garden-party/event-guest.jpg",
      "/work/2026-07-garden-party/massage-session.jpg",
      "/work/2026-07-garden-party/symmetry.jpg",
      "/work/2026-07-garden-party/violinist.jpg",
      "/work/2026-07-garden-party/dj-duo.jpg",
      "/work/2026-07-garden-party/dj-portrait.jpg",
      "/work/2026-07-garden-party/mixer-hands.jpg",
      "/work/2026-07-garden-party/friend-group.jpg",
      "/work/2026-07-garden-party/coloring-activity.jpg",
      "/work/2026-07-garden-party/poi-spinner.jpg",
      "/work/2026-07-garden-party/aloha-products.jpg",
    ],
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
