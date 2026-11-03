import Image from "next/image";
import { LogOut } from "lucide-react";
import { signOut } from "@/auth";
import {
  getDisplayName,
  getInitials,
  type UserProfile,
} from "@/lib/user";

async function signOutAction() {
  "use server";

  await signOut({ redirectTo: "/login" });
}

export function UserMenu({ user }: { user: UserProfile }) {
  const displayName = getDisplayName(user);
  const initials = getInitials(user);

  return (
    <details className="dropdown dropdown-end">
      <summary
        aria-label={`Cuenta de ${displayName}`}
        className="flex cursor-pointer list-none items-center gap-2 rounded-full bg-base-200 py-1 pl-1 pr-1 transition hover:bg-base-300/60 sm:pr-3 [&::-webkit-details-marker]:hidden"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-full object-cover"
          />
        ) : (
          <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-content">
            {initials}
          </span>
        )}
        <span className="hidden max-w-32 truncate text-xs font-semibold sm:inline">
          {displayName}
        </span>
      </summary>

      <div className="dropdown-content z-50 mt-2 w-64 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-xl">
        <div className="px-3 py-2">
          <p className="truncate text-sm font-semibold">{displayName}</p>
          {user.email ? (
            <p className="mt-0.5 truncate text-xs text-base-content/55">
              {user.email}
            </p>
          ) : null}
        </div>

        <form
          action={signOutAction}
          className="border-t border-base-300/70 pt-1"
        >
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-base-content/70 transition hover:bg-base-200 hover:text-base-content"
          >
            <LogOut
              className="h-4 w-4"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            Cerrar sesión
          </button>
        </form>
      </div>
    </details>
  );
}
