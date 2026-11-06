import type { Member } from "@features/equipo/types";
import { AvatarStack } from "@ui/AvatarStack";

type TeamCardProps = {
  members: Member[];
  invitePath: string;
};

export function TeamCard({ members, invitePath }: TeamCardProps) {
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
