"use client";

import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { CircleAlert, LoaderCircle } from "lucide-react";
import { GoogleMark } from "./GoogleMark";
import { signInWithGoogle } from "./actions";

const ERROR_MESSAGES: Record<string, string> = {
  AccessDenied:
    "No pudimos darte acceso. Pide a tu líder que revise tu invitación.",
  Configuration:
    "El inicio de sesión no está disponible ahora mismo. Inténtalo más tarde.",
  OAuthAccountNotLinked:
    "Ese correo ya está vinculado a otro método de acceso.",
  OAuthCallback:
    "No pudimos completar el acceso con Google. Inténtalo de nuevo.",
  SessionRequired: "Inicia sesión para continuar.",
  Verification: "El enlace de acceso ha caducado. Inténtalo de nuevo.",
};

function getSafeRedirect(value: string | null): string {
  if (!value?.startsWith("/") || value.startsWith("//")) {
    return "/dashboard";
  }

  return value;
}

function GoogleSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-base-300 bg-base-100 px-5 text-sm font-semibold text-base-content shadow-sm transition hover:border-primary/40 hover:bg-base-200/50 hover:shadow-md active:scale-[0.99] disabled:cursor-wait disabled:opacity-80"
    >
      {pending ? (
        <LoaderCircle
          className="h-5 w-5 animate-spin text-primary"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      ) : (
        <GoogleMark />
      )}
      {pending ? "Conectando con Google…" : "Continuar con Google"}
    </button>
  );
}

export function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = getSafeRedirect(searchParams.get("callbackUrl"));
  const errorCode = searchParams.get("error");
  const errorMessage = errorCode
    ? (ERROR_MESSAGES[errorCode] ??
      "No pudimos iniciar sesión. Inténtalo de nuevo.")
    : null;

  return (
    <div className="mt-7">
      {errorMessage ? (
        <div
          role="alert"
          className="mb-5 flex items-start gap-2.5 rounded-2xl border border-error/20 bg-error/[0.06] p-3.5 text-sm text-error"
        >
          <CircleAlert
            className="mt-0.5 h-4 w-4 shrink-0"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <p>{errorMessage}</p>
        </div>
      ) : null}

      <form action={signInWithGoogle}>
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <GoogleSubmitButton />
      </form>

      <p className="mt-4 text-center text-xs text-base-content/45">
        Un solo clic. Sin contraseñas que recordar.
      </p>
    </div>
  );
}
