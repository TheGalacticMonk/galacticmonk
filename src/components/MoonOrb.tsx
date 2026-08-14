type MoonOrbProps = {
  className?: string;
};

export default function MoonOrb({ className }: MoonOrbProps) {
  return (
    <div className={`moon-orb ${className ?? ""}`}>
      <div className="moon-crater left-[19%] top-1/4 h-[19%] w-[19%]" />
      <div className="moon-crater left-1/2 top-[56%] h-1/4 w-1/4" />
      <div className="moon-crater left-1/4 top-[69%] h-[15%] w-[15%]" />
    </div>
  );
}
