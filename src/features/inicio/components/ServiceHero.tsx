import type { Member } from "@features/equipo/types";
import { ArrowRight } from "lucide-react";

type ServiceHeroProps = {
  director: Member;
  itemCount: number;
  totalMinutes: string;
};

export function ServiceHero({
  director,
  itemCount,
  totalMinutes,
}: ServiceHeroProps) {
  return (
    <section
      aria-labelledby="service-title"
      className="relative mt-6 overflow-hidden rounded-3xl bg-neutral px-5 py-7 text-neutral-content shadow-lg sm:px-8 sm:py-9"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-primary/25 blur-3xl"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 720 200"
        className="pointer-events-none absolute -bottom-10 left-0 h-28 w-full text-primary/20"
        preserveAspectRatio="none"
      >
        <path
          d="M0 120 C 80 40, 160 40, 240 120 S 400 200, 480 120 S 640 40, 720 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="20"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-content/60">
          Próximo servicio
        </p>
        <h2
          id="service-title"
          className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Domingo, 10:00
        </h2>
        <p className="mt-2 text-sm text-neutral-content/70">
          Dirige {director.name} · {itemCount} canciones · {totalMinutes}
        </p>
        <a href="#setlist" className="btn btn-primary mt-5 rounded-full px-5">
          Ver setlist
          <ArrowRight
            className="h-4 w-4"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
}
