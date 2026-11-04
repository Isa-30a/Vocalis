"use server";

import { signIn, signOut } from "@/auth";

const DEFAULT_REDIRECT = "/dashboard";

function getSafeRedirect(value: FormDataEntryValue | null): string {
  if (typeof value !== "string" || !value.startsWith("/")) {
    return DEFAULT_REDIRECT;
  }

  // Avoid protocol-relative URLs such as //evil.example
  if (value.startsWith("//")) {
    return DEFAULT_REDIRECT;
  }

  return value;
}

export async function signInWithGoogle(formData: FormData) {
  await signIn("google", {
    redirectTo: getSafeRedirect(formData.get("redirectTo")),
  });
}

export async function signOutUser() {
  await signOut({ redirectTo: "/login" });
}
