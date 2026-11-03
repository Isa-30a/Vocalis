import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowLeft,
  AudioLines,
  ListMusic,
  Users,
} from "lucide-react";
import { GoogleMark } from "@/components/auth/GoogleMark";
import { LoginForm } from "@/components/auth/LoginForm";
import { VocalisMark } from "@/components/brand/VocalisMark";
import { VocalisWordmark } from "@/components/brand/VocalisWordmark";
import { homeData } from "@features/inicio/data/home";
import { formatTotalMinutes } from "@features/setlists/utils";

export const metadata: Metadata = {
  title: "Iniciar sesión — Vocalis",
  description:
    "Entra a Vocalis para ver los tonos, versiones de casa y setlists de tu equipo de alabanza.",
};

const features = [
  {
    icon: AudioLines,
    label: "Tonos por director",
  },
  {
    icon: ListMusic,
    label: "Setlists compartidos",
  },
  {
    icon: Users,
    label: "Equipo alineado",
  },
];

function LoginFormFallback() {
  return (
    <div className="mt-7">
      <div
        aria-hidden="true"
        className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-base-300 bg-base-100 px-5 text-sm font-semibold text-base-content/60 shadow-sm"
      >
        <GoogleMark />
        Continuar con Google
      </div>
      <p className="mt-4 text-center text-xs text-base-content/45">
        Un solo clic. Sin contraseñas que recordar.
      </p>
    </div>
  );
}

export default function LoginPage() {
  const totalMinutes = formatTotalMinutes(homeData.totalDurationSeconds);
  const previewItems = homeData.setlistItems.slice(0, 3);

  return (
    <main
      id="contenido"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:py-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-6 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative grid w-full max-w-md overflow-hidden rounded-4xl border border-base-300 bg-base-100 shadow-2xl shadow-secondary/10 lg:max-w-5xl lg:grid-cols-[1.04fr_1fr]">
        <section
          aria-labelledby="login-brand-title"
          className="relative hidden overflow-hidden bg-neutral p-8 text-neutral-content sm:p-10 lg:flex lg:flex-col"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-primary/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -left-12 h-60 w-60 rounded-full bg-accent/20 blur-3xl"
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 720 220"
            preserveAspectRatio="none"
            className="pointer-events-none absolute -bottom-6 left-0 h-32 w-full text-primary/20"
          >
            <path
              d="M0 130 C 80 50, 160 50, 240 130 S 400 210, 480 130 S 640 50, 720 130"
              fill="none"
              stroke="currentColor"
              strokeWidth="20"
              strokeLinecap="round"
            />
            <path
              d="M0 160 C 80 80, 160 80, 240 160 S 400 240, 480 160 S 640 80, 720 160"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>
          <VocalisMark className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-auto opacity-[0.05] brightness-0 invert" />

          <div className="relative flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white shadow-lg shadow-neutral/50">
              <VocalisMark className="h-7 w-auto" />
            </span>
            <VocalisWordmark tone="inverse" className="text-2xl" />
          </div>

          <div className="relative mt-10 max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              La memoria musical de tu equipo
            </p>
            <h2
              id="login-brand-title"
              className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight"
            >
              Que cada servicio suene como lo ensayaron.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-content/65">
              Tonos por director, versiones de casa y setlists compartidos. Todo
              el equipo, siempre en la misma página.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <li
                    key={feature.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-medium text-neutral-content/75"
                  >
                    <Icon
                      className="h-3.5 w-3.5 text-primary"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    {feature.label}
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            aria-hidden="true"
            className="relative mt-8 rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-content/50">
              <span>Próximo servicio</span>
              <span>Domingo · 10:00</span>
            </div>
            <p className="mt-2 font-display text-lg font-semibold">
              Setlist de este domingo
            </p>
            <ul className="mt-3 space-y-2">
              {previewItems.map((item, index) => (
                <li
                  key={item.song.id}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className="w-4 shrink-0 font-mono text-[10px] text-neutral-content/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-neutral-content/80">
                    {item.song.title}
                  </span>
                  <span className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-neutral-content/75">
                    {item.key.symbol}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 border-t border-white/10 pt-2.5 text-[11px] text-neutral-content/45">
              {homeData.setlistItems.length} canciones · {totalMinutes}
            </p>
          </div>
        </section>

        <section className="flex flex-col justify-center px-5 py-9 sm:px-9 sm:py-12 lg:px-12">
          <div className="mx-auto w-full max-w-md lg:mx-0">
            <div className="mb-8 flex items-center gap-2 lg:hidden">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-base-200">
                <VocalisMark className="h-6 w-auto" />
              </span>
              <VocalisWordmark className="text-xl" />
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Bienvenido de nuevo
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Inicia sesión
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-base-content/60">
              Entra con tu cuenta de Google para ver el setlist y los tonos de
              tu equipo.
            </p>

            <Suspense fallback={<LoginFormFallback />}>
              <LoginForm />
            </Suspense>

            <div className="mt-8 flex flex-col gap-4 border-t border-base-300/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-full text-sm font-semibold text-base-content/65 transition hover:text-primary"
              >
                <ArrowLeft
                  className="h-4 w-4"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                Volver al inicio
              </Link>
              <p className="text-xs text-base-content/50">
                ¿Aún no tienes acceso? Pide una invitación a tu líder.
              </p>
            </div>
          </div>
        </section>
      </div>

      <p className="relative mt-6 text-center text-xs text-base-content/45 lg:hidden">
        Vocalis · La memoria musical de tu equipo
      </p>
    </main>
  );
}
