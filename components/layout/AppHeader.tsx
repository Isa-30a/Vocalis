import Link from "next/link";
import type { Member } from "@features/equipo/types";
import { VocalisMark } from "@/components/brand/VocalisMark";
import { VocalisWordmark } from "@/components/brand/VocalisWordmark";

export function AppHeader({ user }: { user: Member }) {
  return (
    <header className="border-b border-base-300/70 bg-base-100/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          aria-label="Vocalis, inicio"
          className="flex items-center gap-2 rounded-full"
        >
          <VocalisMark className="h-8 w-auto sm:h-9" />
          <VocalisWordmark className="text-xl sm:text-2xl" />
        </Link>

        <div className="flex items-center gap-2 rounded-full bg-base-200 py-1 pl-1 pr-1 sm:pr-3">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-content">
            {user.initials}
          </span>
          <span className="hidden text-xs font-semibold sm:inline">
            {user.name}
          </span>
        </div>
      </div>
    </header>
  );
}
