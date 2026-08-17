type IconProps = { className?: string };

export function WandStarsIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m4 20 10.7-10.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m12.8 7.2 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18.5 2.5c.25 1.55 1.45 2.75 3 3-1.55.25-2.75 1.45-3 3-.25-1.55-1.45-2.75-3-3 1.55-.25 2.75-1.45 3-3Z" fill="currentColor" />
      <path d="M7.5 4c.18 1.08 1.02 1.92 2.1 2.1-1.08.18-1.92 1.02-2.1 2.1-.18-1.08-1.02-1.92-2.1-2.1C6.48 5.92 7.32 5.08 7.5 4Z" fill="currentColor" />
    </svg>
  );
}

export function DoubleChevronIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m5 7 5 5-5 5M12 7l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
