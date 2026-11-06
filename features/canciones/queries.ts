import { asc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { songAudio, songDirectorKeys, songs } from "@/db/schema";
import type { Song } from "./types";

type SongRow = typeof songs.$inferSelect;
type DirectorKeyRow = typeof songDirectorKeys.$inferSelect;

function toSong(row: SongRow, directorKeys: DirectorKeyRow[]): Song {
  return {
    id: row.id,
    title: row.title,
    artist: row.artist,
    originalKey:
      row.originalKeyNote && row.originalKeySymbol
        ? {
            note: row.originalKeyNote,
            symbol: row.originalKeySymbol,
            mode: row.originalKeyMode ?? undefined,
          }
        : null,
    durationSeconds: row.durationSeconds,
    hasHomeVersion: row.hasHomeVersion,
    directorKeys: directorKeys.map((directorKey) => ({
      directorId: directorKey.directorId,
      key: {
        note: directorKey.keyNote,
        symbol: directorKey.keySymbol,
        mode: directorKey.keyMode,
      },
      context: directorKey.context ?? undefined,
    })),
  };
}

export async function getSongs(): Promise<Song[]> {
  const db = getDb();
  const [songRows, keyRows] = await Promise.all([
    db.select().from(songs).orderBy(asc(songs.title)),
    db
      .select()
      .from(songDirectorKeys)
      .orderBy(asc(songDirectorKeys.songId), asc(songDirectorKeys.directorId)),
  ]);

  const keysBySong = new Map<string, DirectorKeyRow[]>();

  for (const keyRow of keyRows) {
    const current = keysBySong.get(keyRow.songId) ?? [];
    current.push(keyRow);
    keysBySong.set(keyRow.songId, current);
  }

  return songRows.map((song) => toSong(song, keysBySong.get(song.id) ?? []));
}

export async function getSongById(id: string): Promise<Song | null> {
  const db = getDb();
  const [song] = await db.select().from(songs).where(eq(songs.id, id)).limit(1);

  if (!song) {
    return null;
  }

  const directorKeys = await db
    .select()
    .from(songDirectorKeys)
    .where(eq(songDirectorKeys.songId, id))
    .orderBy(asc(songDirectorKeys.directorId));

  return toSong(song, directorKeys);
}

export async function getSongAudio(songId: string) {
  const db = getDb();

  return db
    .select()
    .from(songAudio)
    .where(eq(songAudio.songId, songId))
    .orderBy(asc(songAudio.createdAt));
}
