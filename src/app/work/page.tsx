import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import WorkGrid from "@/components/WorkGrid";

export const metadata: Metadata = {
  title: "Work — Galactic Monk",
  description:
    "Selected film, photography, and audio recording, mix & master projects from Galactic Monk.",
};

export default function WorkPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-36">
      <SectionHeading
        eyebrow="Portfolio"
        title="Work"
        description="A variety of film, video, photography, and audio work — filter by discipline below."
      />
      <div className="mt-10">
        <WorkGrid />
      </div>
    </section>
  );
}
