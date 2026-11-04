import { asc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { setlistItems, setlists, songs } from "@/db/schema";
import type { SongSummary } from "@features/canciones/types";
import type { SetlistItem } from "./types";

export type SetlistWithSongs = {
  id: string;
  title: string;
  serviceLabel: string;
  directorId: string;
  items: Array<SetlistItem & { song: SongSummary }>;
};

export async function getCurrentSetlist(): Promise<SetlistWithSongs | null> {
  const db = getDb();
  const [setlist] = await db
    .select({
      id: setlists.id,
      title: setlists.title,
      serviceLabel: setlists.serviceLabel,
      directorId: setlists.directorId,
    })
    .from(setlists)
    .orderBy(asc(setlists.createdAt), asc(setlists.id))
    .limit(1);

  if (!setlist) {
    return null;
  }

  const rows = await db
    .select({
      songId: setlistItems.songId,
      directorId: setlistItems.directorId,
      keyNote: setlistItems.keyNote,
      keySymbol: setlistItems.keySymbol,
      keyMode: setlistItems.keyMode,
      title: songs.title,
      artist: songs.artist,
      durationSeconds: songs.durationSeconds,
    })
    .from(setlistItems)
    .innerJoin(songs, eq(songs.id, setlistItems.songId))
    .where(eq(setlistItems.setlistId, setlist.id))
    .orderBy(asc(setlistItems.position));

  return {
    ...setlist,
    items: rows.map((row) => ({
      songId: row.songId,
      directorId: row.directorId,
      key: {
        note: row.keyNote,
        symbol: row.keySymbol,
        mode: row.keyMode,
      },
      song: {
        id: row.songId,
        title: row.title,
        artist: row.artist,
        durationSeconds: row.durationSeconds,
      },
    })),
  };
}
