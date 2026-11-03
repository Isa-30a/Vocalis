import type { Rehearsal, Setlist } from "../types";

export const setlists: Setlist[] = [
  {
    id: "domingo",
    title: "Setlist de este domingo",
    serviceLabel: "Domingo · 10:00",
    directorId: "ana",
    items: [
      {
        songId: "grande-es-tu-amor",
        directorId: "ana",
        key: { note: "Sol", symbol: "G" },
      },
      {
        songId: "tu-fidelidad",
        directorId: "ana",
        key: { note: "Do", symbol: "C" },
      },
      {
        songId: "nadie-como-tu",
        directorId: "ana",
        key: { note: "Re", symbol: "D" },
      },
      {
        songId: "santo-es-el-senor",
        directorId: "ana",
        key: { note: "La", symbol: "A" },
      },
      {
        songId: "tu-amor-no-falla",
        directorId: "ana",
        key: { note: "Mi", symbol: "E" },
      },
    ],
  },
];

export const nextRehearsal: Rehearsal = {
  label: "Viernes · 19:00",
  location: "Salón 2",
  confirmed: 6,
  total: 8,
};
