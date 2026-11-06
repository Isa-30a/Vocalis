import type { SongSummary } from "@features/canciones/types";
import type { SetlistItem } from "@features/setlists/types";
import { KeyBadge } from "@ui/KeyBadge";

type SetlistCardProps = {
  items: Array<SetlistItem & { song: SongSummary }>;
  totalMinutes: string;
};

export function SetlistCard({ items, totalMinutes }: SetlistCardProps) {
  return (
    <section
      id="setlist"
      aria-labelledby="setlist-title"
      className="mt-6 scroll-mt-6"
    >
      <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Setlist
            </p>
            <h2
              id="setlist-title"
              className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Este domingo
            </h2>
          </div>
          <p className="shrink-0 text-xs text-base-content/50">
            {items.length} canciones · {totalMinutes}
          </p>
        </div>

        <ol className="mt-3 divide-y divide-base-300/70">
          {items.map((item, index) => (
            <li key={item.song.id} className="flex items-center gap-3 py-3">
              <span className="w-5 shrink-0 font-mono text-[11px] text-base-content/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {item.song.title}
                </p>
                <p className="truncate text-xs text-base-content/50">
                  {item.song.artist}
                </p>
              </div>
              <KeyBadge musicalKey={item.key} active />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
