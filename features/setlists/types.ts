import type { MusicalKey } from "@features/canciones/types";

export type SetlistItem = {
  songId: string;
  directorId: string;
  key: MusicalKey;
};

export type Setlist = {
  id: string;
  title: string;
  serviceLabel: string;
  directorId: string;
  items: SetlistItem[];
};

export type Rehearsal = {
  label: string;
  location: string;
  confirmed: number;
  total: number;
};
