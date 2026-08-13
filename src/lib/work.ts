export type Category = "film" | "video" | "photo" | "music";

export type WorkItem = {
  id: string;
  title: string;
  category: Category;
  additionalCategories?: Category[];
  year: string;
  blurb: string;
  description?: string;
  accent: "gold" | "coral" | "sage";
  image?: string;
  video?: string;
  vimeoId?: string;
  youtubeId?: string;
  audio?: string;
  details?: string;
  gallery?: string[];
  categoryLabel?: string;
  imagePosition?: "top" | "center" | "bottom";
  hidden?: boolean;
};

export const CATEGORY_LABEL: Record<Category, string> = {
  film: "Film",
  video: "Video",
  photo: "Photography",
  music: "Record Mix & Master",
};

// TODO(jason): swap these placeholders for real projects, stills, and reels.
export const WORK: WorkItem[] = [
  {
    id: "mainstream-media-mind-control-shirt-ad",
    title: "Mainstream Media Mind Control Shirt Ad",
    category: "film",
    year: "2026",
    blurb: "Short film - acting, production, cinematography, edit, color grade, and sound design.",
    accent: "coral",
    image: "/work/cover-images/msm-mind-control-cover.jpg",
    vimeoId: "1197906457",
    details: `Actor: Jason Lee
Director: Jason Lee
Producer: Jason Lee
Cinematographer: Jason Lee
Editor: Jason Lee
Color grading: Jason Lee
Sound design: Jason Lee

Shot on RED Komodo, Canon RF 24-70 f/2.8 L lens, and NISI Black Pro Mist. Edit, sound design, and color grade all done in DaVinci Resolve.`,
  },
  {
    id: "put-your-phone-down",
    title: "Put Your Phone Down",
    category: "film",
    year: "2026",
    blurb: "Short film PSA - Director of Photography, audio mix, and color grade.",
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
    id: "2026-07-garden-party",
    title: "July 2026 Garden Party",
    category: "photo",
    year: "2026",
    blurb: "I was the photographer for this monthly event.",
    accent: "gold",
    image: "/work/2026-07-garden-party/lauren-nikohl-dj-2.jpg",
    gallery: [
      "/work/2026-07-garden-party/celestial-admission.jpg",
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
    details: "Photographed with Canon R3 with Canon RF 24-70 f/2.8L lens.",
  },
  {
    id: "flow-state",
    title: "Flow State",
    category: "film",
    year: "2026",
    blurb: "I was on-screen talent, the producer, and cinematographer on this project.",
    description:
      "Short mini-documentary about the meaning of flow state. I was on-screen, producer, and cinematographer on this project.",
    accent: "coral",
    image: "/work/cover-images/flow-state-cover.jpg",
    vimeoId: "1211282016",
    details: `Director: Andrea Gallardo
Producer: Jason Lee
A-Cam: Jason Lee
B-Cam: Ruby
Editor: Andrea Gallardo, Tim Blackman, Jason Lee
Colorist: Jason Lee, Tim Blackman
Sound Mixer: Tim Blackman

A-CAM, shot on RED Komodo, DZOFILM Vespid prime lenses. B-Cam, Canon. Edited and color graded in Davinci Resolve.`,
  },
  {
    id: "2026-06-garden-party",
    title: "June 2026 Garden Party",
    category: "video",
    additionalCategories: ["photo"],
    year: "2026",
    blurb: "First time shooting the Garden Party, hosted by Lauren Nikohl.",
    accent: "gold",
    categoryLabel: "VIDEO & PHOTOGRAPHY",
    image: "/work/2026-06-garden-party/1.JPG",
    youtubeId: "VLGgm4xzPF0",
    gallery: [
      "/work/2026-06-garden-party/2.JPG",
      "/work/2026-06-garden-party/3.JPG",
      "/work/2026-06-garden-party/4.JPG",
      "/work/2026-06-garden-party/5.JPG",
      "/work/2026-06-garden-party/6.JPG",
      "/work/2026-06-garden-party/7.JPG",
      "/work/2026-06-garden-party/8.JPG",
      "/work/2026-06-garden-party/9.JPG",
      "/work/2026-06-garden-party/10.JPG",
      "/work/2026-06-garden-party/11.JPG",
      "/work/2026-06-garden-party/12.JPG",
      "/work/2026-06-garden-party/14.JPG",
      "/work/2026-06-garden-party/15.JPG",
      "/work/2026-06-garden-party/16.JPG",
      "/work/2026-06-garden-party/17.JPG",
      "/work/2026-06-garden-party/18.JPG",
      "/work/2026-06-garden-party/19.JPG",
      "/work/2026-06-garden-party/20.JPG",
      "/work/2026-06-garden-party/21.JPG",
      "/work/2026-06-garden-party/22.JPG",
      "/work/2026-06-garden-party/23.JPG",
      "/work/2026-06-garden-party/24.JPG",
      "/work/2026-06-garden-party/25.JPG",
      "/work/2026-06-garden-party/garden-party-guests-2.JPG",
    ],
    details: "Shot on Canon R3 with Canon RF 24-70 f/2.8L lens.",
  },
  {
    id: "byo-way-beyond-the-stars",
    title: "BYO - Way Beyond the Stars (feat. Mickey Factz)",
    category: "music",
    year: "2025",
    blurb: "Recorded, mixed, mastered, and pitched feature request to Mickey Factz.",
    description:
      "Billion Years Old is a side project. I recorded, mixed, and mastered this record, as well as pitched the feature request to Hip-Hop legend Mickey Factz.",
    accent: "sage",
    image: "/work/way-beyond-the-stars/cover.jpg",
    imagePosition: "top",
    audio: "/work/way-beyond-the-stars/way-beyond-the-stars.mp3",
    details:
      "Recorded with Neumann u87 AI, Great River ME-1NV, and API 3122V. Apogee converters.",
  },
  {
    id: "epstein-island",
    title: "Epstein Island (feat. Blu, AnarKy I)",
    category: "music",
    year: "2026",
    blurb:
      "I was the recording, mixing, and mastering engineer on this project. Also pitched feature requests to legendary indie Hip-Hop artist Blu, and vocalist AnarKy I.",
    description:
      "This is one of my own songs. I recorded, mixed, and mastered this record, as well as pitched the feature request to indie Hip-Hop legend Blu and vocalist AnarKy I.",
    accent: "sage",
    image: "/work/epstein-island/epstein-island-cover.jpeg",
    imagePosition: "top",
    audio: "/work/epstein-island/epstein-island.mp3",
    details: "Recorded with Pearlman TM-1 and Great River ME-1NV. Apogee converters.",
  },
  {
    id: "lucid-ep",
    title: "Lucid EP",
    category: "music",
    year: "2025",
    blurb: "Full mix and master for a 5-track independent EP release.",
    accent: "sage",
    hidden: true,
  },
  {
    id: "night-drive-single",
    title: "Night Drive",
    category: "music",
    year: "2024",
    blurb: "Single mix, stem prep, and mastering for streaming release.",
    accent: "sage",
    hidden: true,
  },
  {
    id: "live-session-remaster",
    title: "Live Session Remaster",
    category: "music",
    year: "2024",
    blurb: "Multitrack live recording cleaned up, mixed, and mastered.",
    accent: "sage",
    hidden: true,
  },
];
