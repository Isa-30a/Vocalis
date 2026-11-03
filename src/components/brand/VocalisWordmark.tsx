type VocalisWordmarkProps = {
  className?: string;
};

export function VocalisWordmark({
  className = "",
}: VocalisWordmarkProps) {
  return (
    <span
      className={`font-display font-bold tracking-tight text-neutral ${className}`}
      aria-hidden="true"
    >
      Vocal
      <span className="relative inline-block leading-none">
        ı
        <span className="absolute left-1/2 top-[0.08em] h-[0.16em] w-[0.16em] -translate-x-1/2 rounded-full bg-primary" />
      </span>
      s
    </span>
  );
}
