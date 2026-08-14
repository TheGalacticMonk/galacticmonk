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
  videoAspect?: string;
  youtubeId?: string;
  audio?: string;
  spotifyEmbedUrl?: string;
  credits?: { role: string; name: string }[];
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
    description:
      "I made this short film as an advertisement for my clothing business. I wanted it to be simple, cinematic, and short, while also allowing me to showcase the product. I really like the color grade (my favorite part) that I did. I like the teal and orange colors, and I was able to achieve this with some new tools I got for Davinci Resolve. I created this film entirely myself, including acting & camera work. I think it came out imperfectly cinematic for a solo project shooting of myself.",
    accent: "coral",
    image: "/work/cover-images/msm-mind-control-cover.jpg",
    vimeoId: "1197906457",
    videoAspect: "1920 / 810",
    credits: [
      { role: "Actor", name: "Jason Lee" },
      { role: "Director", name: "Jason Lee" },
      { role: "Writer", name: "Jason Lee" },
      { role: "Producer", name: "Jason Lee" },
      { role: "Cinematographer", name: "Jason Lee" },
      { role: "Editor", name: "Jason Lee" },
      { role: "Color Grading", name: "Jason Lee" },
      { role: "Sound Design", name: "Jason Lee" },
    ],
    details:
      "Shot on RED Komodo, Canon RF 24-70 f/2.8 L lens, and NISI Black Pro Mist. Edit, sound design, and color grade all done in DaVinci Resolve.",
  },
  {
    id: "put-your-phone-down",
    title: "Put Your Phone Down",
    category: "film",
    year: "2026",
    blurb: "Short film PSA - Director of Photography, audio mix, and color grade.",
    description:
      "I met Andrea the first time I ever hit the Garden Party, hosted by Lauren Nikohl. A couple weeks later Andrea texts me asking if I could meet up because she felt like shooting something spontaneously. I said okay, and then she came up with this story idea. We met up and I got my gear ready while she drew out the storyboard. Then her friend Justice rolled through to also be in the film. We ended up deciding to shoot at Hermosa Beach. We drove there, and ended up only having 1 hour to shoot before sun set. We got the shots we needed and then got to post. We ended up releasing it as a PSA a day later.",
    accent: "coral",
    image: "/work/cover-images/put-your-phone-down-macro-cover.jpg",
    vimeoId: "1207633805",
    videoAspect: "1920 / 800",
    credits: [
      { role: "Director", name: "Andrea Gallardo Díaz" },
      { role: "Writer", name: "Andrea Gallardo Díaz" },
      { role: "Producer", name: "Jason Lee" },
      { role: "Actors", name: "Andrea Gallardo Díaz, Justice Dillard" },
      { role: "Director of Photography", name: "Jason Lee" },
      { role: "Editor", name: "Andrea Gallardo Díaz" },
      { role: "Sound Designer", name: "Andrea Gallardo Díaz" },
      { role: "Colorists", name: "Jason Lee, Andrea Gallardo Díaz" },
      { role: "Re-Recording Mixer", name: "Jason Lee" },
      { role: "Location", name: "Hermosa Beach, CA" },
    ],
    details:
      "Shot on RED Komodo & DZOFILM Vespid Prime Lenses. Edit and color grade done in DaVinci Resolve. ADR and sound design done in Pro Tools.",
  },
  {
    id: "2026-07-garden-party",
    title: "July 2026 Garden Party",
    category: "photo",
    year: "2026",
    blurb: "I was the photographer for this monthly event.",
    description:
      "This was my 2nd time at a Garden Party, and I'm now looking forward to attending these monthly. It was at the Mystic Edge Garden. Such a great vibe, good people, and music. What's amazing about these parties is that there's no alcohol, they provide weed instead. And everyone I have met at these parties is awakened! I have not found anything like the Garden Party. These Garden Parties are hosted by Lauren Nikohl, a multidimensional artist that I'm a huge fan of. I was the photographer for this project. Check Lauren out on Spotify too.",
    accent: "gold",
    spotifyEmbedUrl:
      "https://open.spotify.com/embed/artist/2T1X6ZxoikMBWJxIiyuJ1f?utm_source=generator&si=85119f59bda844ae",
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
    credits: [{ role: "Photographer", name: "Jason Lee" }],
    details: "Shot on Canon EOS R3 mirrorless camera and Canon RF 24-70 f/2.8L lens.",
  },
  {
    id: "flow-state",
    title: "Flow State",
    category: "film",
    year: "2026",
    blurb: "I was on-screen talent, the producer, and cinematographer on this project.",
    description:
      "Short mini-documentary about the meaning of flow state. I was on-screen talent, producer, cinematographer, and color grader on this project. I had already worked with Andrea and Justice before, but this was my first time meeting Tim Blackman. Let me tell you I'm really liking the spirit of the people I've been meeting as of late. What can I say, as a small crew we made it happen.",
    accent: "coral",
    image: "/work/cover-images/flow-state-cover.jpg",
    vimeoId: "1211282016",
    credits: [
      { role: "Director", name: "Andrea Gallardo" },
      { role: "Producer", name: "Jason Lee" },
      { role: "A-Cam", name: "Jason Lee" },
      { role: "B-Cam", name: "Ruby" },
      { role: "Editor", name: "Andrea Gallardo, Tim Blackman, Jason Lee" },
      { role: "Colorist", name: "Jason Lee, Tim Blackman" },
      { role: "Sound Mixer", name: "Tim Blackman" },
    ],
    details:
      "A-Cam shot on RED Komodo, DZOFILM Vespid prime lenses. B-Cam, Canon. Edited and color graded in DaVinci Resolve.",
  },
  {
    id: "2026-06-garden-party",
    title: "June 2026 Garden Party",
    category: "video",
    additionalCategories: ["photo"],
    year: "2026",
    blurb: "First time shooting the Garden Party, hosted by Lauren Nikohl.",
    description:
      "After being on the train & bus for a while, I finally bought a car. My friend Sarah Starr knew I was now trying to focus on networking, connecting, and meeting people in LA. And so she saw a video on TikTok of Lauren Nikohl talking about her Garden Party and shared it with me. So a few days later I went to this Garden Party, bringing my camera with me. I shot both video and photo. I also met some cool & AWAKENED people. Finally! Check out Lauren Nikohl on Spotify.",
    accent: "gold",
    spotifyEmbedUrl:
      "https://open.spotify.com/embed/artist/2T1X6ZxoikMBWJxIiyuJ1f?utm_source=generator&si=85119f59bda844ae",
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
    credits: [
      { role: "Photographer", name: "Jason Lee" },
      { role: "Videographer", name: "Jason Lee" },
    ],
    details: "Shot on Canon EOS R3 mirrorless camera and Canon RF 24-70 f/2.8L lens.",
  },
  {
    id: "byo-way-beyond-the-stars",
    title: 'BYO - "Way Beyond the Stars" (feat. Mickey Factz)',
    category: "music",
    year: "2025",
    blurb: "Recorded, mixed, mastered, and pitched feature request to Mickey Factz.",
    description:
      'Billion Years Old is one of my side projects I\'m on with my homegirl Becca Berry. We\'re targeted individuals. I was an artist, recording, mixing, and mastering engineer on this project. I also pitched the feature request to Hip-Hop legend Mickey Factz. Never did I ever think I\'d be on a record with Mickey before. I admit I was surprised when he said "yes." I still remember when I was young in the game and I would watch his music videos. This feature started to make me think bigger. Believe me when I say if you don\'t ask, you don\'t know.',
    accent: "sage",
    image: "/work/way-beyond-the-stars/cover.jpg",
    imagePosition: "top",
    audio: "/work/way-beyond-the-stars/way-beyond-the-stars.mp3",
    credits: [
      {
        role: "Artist",
        name: "Billion Years Old, Galactic Monk, Mickey Factz, Becca Berry",
      },
      { role: "Executive Producer", name: "Jason Lee" },
      { role: "Beat Producer", name: "hozay williams" },
      { role: "Writer", name: "Jason Lee, Mickey Factz, Becca Berry" },
      { role: "Recording Engineer", name: "Jason Lee" },
      { role: "Mix Engineer", name: "Jason Lee" },
      { role: "Mastering Engineer", name: "Jason Lee" },
    ],
    details:
      "Recorded with Neumann u87 AI microphone, Great River ME-1NV preamp, and API 3122V preamp. Apogee converters.",
  },
  {
    id: "byo-photographic-memories",
    title: 'BYO - "Photographic Memories"',
    category: "music",
    year: "2025",
    blurb:
      "I was an artist, recording, mixing, and mastering engineer on this project.",
    description:
      "Billion Years Old is a duo I'm a part of. We're targeted individuals. I really like how this vibe turned out. It's like Indie Synth Pop mixed with Hip-Hop. And the hook came out marvelous too. I love how the spaced out verbs and delays fuse with Becca's singing vocals, that also have vintage FX on them. Engineering vocals is my favorite aspect of music.",
    accent: "sage",
    image: "/work/photographic-memories/photographic-memories-cover.jpg",
    imagePosition: "top",
    audio: "/work/photographic-memories/photographic-memories.mp3",
    credits: [
      { role: "Artist", name: "Billion Years Old, Galactic Monk, Becca Berry" },
      { role: "Executive Producer", name: "Jason Lee" },
      { role: "Beat Producer", name: "Surfing" },
      { role: "Hook Writer", name: "Jason Lee" },
      { role: "Rap Writer", name: "Jason Lee" },
      { role: "Recording Engineer", name: "Jason Lee" },
      { role: "Mix Engineer", name: "Jason Lee" },
      { role: "Mastering Engineer", name: "Jason Lee" },
    ],
    details:
      "Recorded with Neumann u87 AI microphone and Great River ME-1NV preamp. Apogee converters.",
  },
  {
    id: "epstein-island",
    title: '"Epstein Island" (feat. Blu, AnarKy I)',
    category: "music",
    year: "2026",
    blurb:
      "I was the recording, mixing, and mastering engineer on this project. Also pitched feature requests to legendary indie Hip-Hop artist Blu, and vocalist AnarKy I.",
    description:
      "This is one of my own songs I decided to make after starting Sovereign Alliance. I recorded, mixed, and mastered this record, as well as pitched the feature request to indie Hip-Hop legend Blu and vocalist AnarKy I. I still remember when Blu first came out. That album is still a classic. And then there's AnarKy I, who I've become friends with from Instagram. I will never stop evolving. It's the entire point of this human experience.",
    accent: "sage",
    image: "/work/epstein-island/epstein-island-cover.jpeg",
    imagePosition: "top",
    audio: "/work/epstein-island/epstein-island.mp3",
    credits: [
      { role: "Artist", name: "Galactic Monk, Blu, AnarKy I" },
      { role: "Executive Producer", name: "Jason Lee" },
      { role: "Beat Producer", name: "E L I" },
      { role: "Writer", name: "Jason Lee, Blu, AnarKy I" },
      { role: "Recording Engineer", name: "Jason Lee" },
      { role: "Mix Engineer", name: "Jason Lee" },
      { role: "Mastering Engineer", name: "Jason Lee" },
    ],
    details:
      "Recorded with Pearlman TM-1 microphone and Great River ME-1NV preamp. Apogee converters.",
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
