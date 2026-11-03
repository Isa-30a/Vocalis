import type { AvatarTone, Member } from "@features/equipo/types";

const toneClasses: Record<AvatarTone, string> = {
  primary: "bg-primary text-primary-content",
  secondary: "bg-secondary text-secondary-content",
  accent: "bg-accent text-accent-content",
  neutral: "bg-neutral text-neutral-content",
  info: "bg-info text-info-content",
  success: "bg-success text-success-content",
  warning: "bg-warning text-warning-content",
};

type AvatarProps = {
  member: Member;
  size?: "sm" | "md";
};

export function Avatar({ member, size = "md" }: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={[
        "grid shrink-0 place-items-center rounded-full font-semibold",
        size === "sm" ? "h-8 w-8 text-[10px]" : "h-10 w-10 text-xs",
        toneClasses[member.tone],
      ].join(" ")}
    >
      {member.initials}
    </span>
  );
}

type AvatarStackProps = {
  members: Member[];
  max?: number;
  size?: "sm" | "md";
};

export function AvatarStack({
  members,
  max = 5,
  size = "md",
}: AvatarStackProps) {
  const visible = members.slice(0, max);
  const remaining = members.length - visible.length;

  return (
    <div className="flex items-center -space-x-2" aria-hidden="true">
      {visible.map((member) => (
        <span key={member.id} className="rounded-full ring-2 ring-base-100">
          <Avatar member={member} size={size} />
        </span>
      ))}
      {remaining > 0 ? (
        <span
          className={[
            "grid shrink-0 place-items-center rounded-full bg-base-200 font-semibold text-base-content/60 ring-2 ring-base-100",
            size === "sm" ? "h-8 w-8 text-[10px]" : "h-10 w-10 text-xs",
          ].join(" ")}
        >
          +{remaining}
        </span>
      ) : null}
    </div>
  );
}
