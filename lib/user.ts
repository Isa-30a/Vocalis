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

function getIdentitySource(user: UserIdentity): string | null {
  return user.name?.trim() || getEmailLocalPart(user.email);
}

export function getDisplayName(user: UserIdentity): string {
  return getIdentitySource(user) || FALLBACK_NAME;
}

export function getFirstName(user: UserIdentity): string {
  const source = getIdentitySource(user);

  if (!source) {
    return FALLBACK_NAME;
  }

  return source.split(/\s+/)[0] || FALLBACK_NAME;
}

export function getInitials(user: UserIdentity): string {
  const source = getIdentitySource(user);

  if (!source) {
    return "?";
  }

  // Split on apostrophes too, so "O'Connor" yields "OC".
  const parts = source.split(/[\s._'\u2018\u2019-]+/).filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}
