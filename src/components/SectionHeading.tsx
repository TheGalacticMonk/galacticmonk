import Sparkle from "./Sparkle";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <div className={isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div
        className={`flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold ${
          isCenter ? "justify-center" : ""
        }`}
      >
        <Sparkle className="h-3 w-3" />
        {eyebrow}
      </div>
      <h2 className="mt-3 font-serif text-3xl text-cream sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-cream-dim">
          {description}
        </p>
      )}
    </div>
  );
}
