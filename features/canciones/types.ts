export type MusicalKey = {
  note: string;
  symbol: string;
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
  originalKey: MusicalKey;
  durationSeconds: number;
  hasHomeVersion: boolean;
  directorKeys: DirectorKey[];
};
