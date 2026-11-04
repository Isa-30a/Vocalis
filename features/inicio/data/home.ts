import type { SongSummary } from "@features/canciones/types";
import { getMembers } from "@features/equipo/queries";
import { nextRehearsal } from "@features/equipo/data/rehearsal";
import type { Member } from "@features/equipo/types";
import { getCurrentSetlist } from "@features/setlists/queries";
import type { Rehearsal, SetlistItem } from "@features/setlists/types";

export type HomeData = {
  director: Member | null;
  members: Member[];
  setlist: {
    id: string;
    title: string;
    serviceLabel: string;
  } | null;
  setlistItems: Array<SetlistItem & { song: SongSummary }>;
  rehearsal: Rehearsal;
  invitePath: string;
  totalDurationSeconds: number;
};

export async function getHomeData(): Promise<HomeData> {
  const [members, setlist] = await Promise.all([
    getMembers(),
    getCurrentSetlist(),
  ]);

  const director = setlist
    ? (members.find((member) => member.id === setlist.directorId) ?? null)
    : null;
  const setlistItems = setlist?.items ?? [];

  return {
    director,
    members,
    setlist: setlist
      ? {
          id: setlist.id,
          title: setlist.title,
          serviceLabel: setlist.serviceLabel,
        }
      : null,
    setlistItems,
    rehearsal: nextRehearsal,
    invitePath: "/invitar/7f3k9",
    totalDurationSeconds: setlistItems.reduce(
      (total, item) => total + item.song.durationSeconds,
      0,
    ),
  };
}
