import type { WorkItem } from "./work";

const BASE_URL = "https://galacticmonk.com";

const CREATOR = {
  "@type": "Person",
  name: "Jason Lee",
  alternateName: "Galactic Monk",
  url: BASE_URL,
} as const;

export function getWorkItemSchema(item: WorkItem) {
  const url = `${BASE_URL}/work/${item.id}/`;
  const image = item.image ? `${BASE_URL}${item.image}` : undefined;
  const description = item.description ?? item.blurb;

  if (item.vimeoId || item.video) {
    return {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: item.title,
      description,
      url,
      thumbnailUrl: image,
      uploadDate: `${item.year}-01-01`,
      embedUrl: item.vimeoId ? `https://player.vimeo.com/video/${item.vimeoId}` : undefined,
      contentUrl: item.video ? `${BASE_URL}${item.video}` : undefined,
      creator: CREATOR,
    };
  }

  if (item.audio) {
    return {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      name: item.title,
      description,
      url,
      image,
      datePublished: `${item.year}-01-01`,
      byArtist: CREATOR,
    };
  }

  if (item.gallery && item.gallery.length > 0) {
    return {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: item.title,
      description,
      url,
      datePublished: `${item.year}-01-01`,
      creator: CREATOR,
      associatedMedia: [
        ...(item.image ? [{ "@type": "ImageObject", contentUrl: `${BASE_URL}${item.image}` }] : []),
        ...item.gallery.map((src) => ({
          "@type": "ImageObject",
          contentUrl: `${BASE_URL}${src}`,
        })),
      ],
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description,
    url,
    image,
    datePublished: `${item.year}-01-01`,
    creator: CREATOR,
  };
}

export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jason Lee",
    alternateName: "Galactic Monk",
    url: BASE_URL,
    jobTitle: "Creative Producer",
    description:
      "Galactic Monk is the Los Angeles-based creative production studio of Jason Lee — creative production for multidimensional souls.",
    image: `${BASE_URL}/monk-beach.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      addressCountry: "US",
    },
    sameAs: [
      "https://www.instagram.com/galacticmonk_/",
      "https://x.com/GalacticMonk_",
      "https://www.tiktok.com/@thegalacticmonk",
      "https://www.facebook.com/JasonDeluluLee",
    ],
  };
}
