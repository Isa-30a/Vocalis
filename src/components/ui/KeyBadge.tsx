import type { MusicalKey } from "@features/canciones/types";

type KeyBadgeProps = {
  musicalKey: MusicalKey;
  active?: boolean;
  size?: "sm" | "md";
  className?: string;
};

export function KeyBadge({
  musicalKey,
  active = false,
  size = "sm",
  className = "",
}: KeyBadgeProps) {
  return (
    <span
      title={`${musicalKey.note} (${musicalKey.symbol})`}
      className={[
        "inline-flex items-center gap-1 rounded-lg border font-mono font-semibold leading-none",
        size === "sm" ? "px-2 py-1 text-xs" : "px-2.5 py-1.5 text-sm",
        active
          ? "border-primary bg-primary text-primary-content"
          : "border-base-300 bg-base-100 text-base-content/80",
        className,
      ].join(" ")}
    >
      <span>{musicalKey.note}</span>
      <span
        className={
          active ? "text-primary-content/70" : "text-base-content/40"
        }
      >
        {musicalKey.symbol}
      </span>
    </span>
  );
}
