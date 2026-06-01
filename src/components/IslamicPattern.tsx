type IslamicPatternProps = {
  className?: string;
};

export function IslamicPattern({ className }: IslamicPatternProps) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="islamic-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M10 0 L20 10 L10 20 L0 10 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeOpacity="0.1"
          />
          <circle cx="10" cy="10" r="2" fill="currentColor" fillOpacity="0.05" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
    </svg>
  );
}

