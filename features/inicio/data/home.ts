import { songs } from "@features/canciones/data/mock-songs";
import type { Song } from "@features/canciones/types";
import { members } from "@features/equipo/data/mock-members";
import { nextRehearsal, setlists } from "@features/setlists/data/mock-setlists";

const songById = new Map(songs.map((song) => [song.id, song]));

function getSong(songId: string): Song {
  const song = songById.get(songId);

  if (!song) {
    throw new Error(`Canción no encontrada: ${songId}`);
  }

  return song;
}

const setlist = setlists[0];

if (!setlist) {
  throw new Error("No hay setlist configurado");
}

const director =
  members.find((member) => member.id === setlist.directorId) ?? members[0];

const setlistItems = setlist.items.map((item) => ({
  ...item,
  song: getSong(item.songId),
}));

const totalDurationSeconds = setlistItems.reduce(
  (total, item) => total + item.song.durationSeconds,
  0,
);

export const homeData = {
  director,
  members,
  setlistItems,
  rehearsal: nextRehearsal,
  invitePath: "/invitar/7f3k9",
  totalDurationSeconds,
};
