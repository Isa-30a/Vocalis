export type MemberRole = "director" | "musico" | "corista";

export type AvatarTone =
  | "primary"
  | "secondary"
  | "accent"
  | "neutral"
  | "info"
  | "success"
  | "warning";

export type Member = {
  id: string;
  name: string;
  initials: string;
  role: MemberRole;
  roleLabel: string;
  tone: AvatarTone;
};
