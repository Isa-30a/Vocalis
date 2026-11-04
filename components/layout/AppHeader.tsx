import Link from "next/link";
import type { UserProfile } from "@/lib/user";
import { VocalisMark } from "@/components/brand/VocalisMark";
import { VocalisWordmark } from "@/components/brand/VocalisWordmark";
import { UserMenu } from "@/components/layout/UserMenu";

export function AppHeader({ user }: { user: UserProfile }) {
  return (
    <header className="border-b border-base-300/70 bg-base-100/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Link
          href="/dashboard"
          aria-label="Vocalis, inicio"
          className="flex items-center gap-2 rounded-full"
        >
          <VocalisMark className="h-8 w-auto sm:h-9" />
          <VocalisWordmark className="text-xl sm:text-2xl" />
        </Link>

        <UserMenu user={user} />
      </div>
    </header>
  );
}
