import type { Member } from "@features/equipo/types";
import type { Rehearsal } from "@features/setlists/types";
import { AvatarStack } from "@ui/AvatarStack";
import { Calendar } from "lucide-react";

type TeamCardProps = {
  members: Member[];
  rehearsal: Rehearsal;
  invitePath: string;
};

export function TeamCard({
  members,
  rehearsal,
  invitePath,
}: TeamCardProps) {
  return (
    <section
      id="equipo"
      aria-labelledby="team-title"
      className="mt-6 scroll-mt-6"
    >
      <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Equipo
            </p>
            <h2
              id="team-title"
              className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Tu equipo
            </h2>
          </div>
          <span className="badge badge-ghost shrink-0 rounded-full">
            {members.length} integrantes
          </span>
        </div>

        <div className="mt-4">
          <AvatarStack members={members} max={5} />
        </div>

        <div className="mt-4 flex items-start gap-3 rounded-2xl bg-base-200/60 p-3.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-base-100 text-base-content/60">
            <Calendar
              className="h-4 w-4"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-base-content/50">
              Próximo ensayo
            </p>
            <p className="mt-0.5 text-sm font-semibold">
              {rehearsal.label}
            </p>
            <p className="mt-0.5 text-xs text-base-content/55">
              {rehearsal.location} · {rehearsal.confirmed} de{" "}
              {rehearsal.total} confirmados
            </p>
          </div>
        </div>

        <div className="mt-4 border-t border-dashed border-base-300 pt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-base-content/50">
            Invita a tu equipo
          </p>
          <code className="mt-1 block break-all text-xs text-base-content/70">
            vocalis.app{invitePath}
          </code>
        </div>
      </div>
    </section>
  );
}
