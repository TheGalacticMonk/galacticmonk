import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import WorkGrid from "@/components/WorkGrid";
import PageConstellation from "@/components/PageConstellation";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore Los Angeles film production, event photography, cinematography, audio recording, mixing, and mastering projects by Galactic Monk.",
  alternates: { canonical: "/work/" },
  openGraph: {
    title: "Work — Galactic Monk",
    description:
      "Explore Los Angeles film production, event photography, cinematography, audio recording, mixing, and mastering projects by Galactic Monk.",
    url: "/work/",
  },
};

export default function WorkPage() {
  return (
    <>
      <PageConstellation />
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-36">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected transmissions"
          description="Film, video, event photography, and music production shaped from first capture through final delivery. Filter by discipline below."
        />
        <div className="mt-10">
          <WorkGrid />
        </div>
      </section>
    </>
  );
}
