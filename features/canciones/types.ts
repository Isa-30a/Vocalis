export type KeyMode = "major" | "minor";

export type MusicalKey = {
  note: string;
  symbol: string;
  mode?: KeyMode;
};

export type DirectorKey = {
  directorId: string;
  key: MusicalKey;
  context?: "acústico" | "banda";
};

export type Song = {
  id: string;
  title: string;
  artist: string;
  originalKey: MusicalKey | null;
  durationSeconds: number;
  hasHomeVersion: boolean;
  directorKeys: DirectorKey[];
};

export type SongSummary = Pick<
  Song,
  "id" | "title" | "artist" | "durationSeconds"
>;
