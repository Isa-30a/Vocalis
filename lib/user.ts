export type UserIdentity = {
  name?: string | null;
  email?: string | null;
};

export type UserProfile = UserIdentity & {
  image?: string | null;
};

const FALLBACK_NAME = "Invitado";

function getEmailLocalPart(email?: string | null): string | null {
  const value = email?.trim();

  if (!value) {
    return null;
  }

  const [localPart] = value.split("@");

  return localPart || null;
}

export function getDisplayName(user: UserIdentity): string {
  return user.name?.trim() || getEmailLocalPart(user.email) || FALLBACK_NAME;
}

export function getInitials(user: UserIdentity): string {
  const source = user.name?.trim() || getEmailLocalPart(user.email);

  if (!source) {
    return "?";
  }

  const parts = source.split(/[\s._-]+/).filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}
