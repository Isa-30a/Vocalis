import type { Song } from "../types";

export const songs: Song[] = [
  {
    id: "grande-es-tu-amor",
    title: "Grande es tu amor",
    artist: "Marcos Witt",
    originalKey: { note: "Sol", symbol: "G" },
    durationSeconds: 270,
    hasHomeVersion: true,
    directorKeys: [
      { directorId: "ana", key: { note: "Sol", symbol: "G" }, context: "banda" },
      { directorId: "luis", key: { note: "La", symbol: "A" }, context: "acústico" },
      { directorId: "sofia", key: { note: "Fa", symbol: "F" }, context: "banda" },
    ],
  },
  {
    id: "tu-fidelidad",
    title: "Tu fidelidad",
    artist: "Christine D'Clario",
    originalKey: { note: "Do", symbol: "C" },
    durationSeconds: 310,
    hasHomeVersion: false,
    directorKeys: [
      { directorId: "ana", key: { note: "Do", symbol: "C" }, context: "banda" },
      { directorId: "luis", key: { note: "Re", symbol: "D" }, context: "banda" },
      { directorId: "sofia", key: { note: "Do", symbol: "C" }, context: "acústico" },
    ],
  },
  {
    id: "nadie-como-tu",
    title: "Nadie como tú",
    artist: "Un Corazón",
    originalKey: { note: "Re", symbol: "D" },
    durationSeconds: 245,
    hasHomeVersion: true,
    directorKeys: [
      { directorId: "ana", key: { note: "Re", symbol: "D" }, context: "banda" },
      { directorId: "luis", key: { note: "Mi", symbol: "E" }, context: "banda" },
      { directorId: "sofia", key: { note: "Re", symbol: "D" }, context: "acústico" },
    ],
  },
  {
    id: "santo-es-el-senor",
    title: "Santo es el Señor",
    artist: "Marcos Brunet",
    originalKey: { note: "La", symbol: "A" },
    durationSeconds: 380,
    hasHomeVersion: false,
    directorKeys: [
      { directorId: "ana", key: { note: "La", symbol: "A" }, context: "banda" },
      { directorId: "luis", key: { note: "Sol", symbol: "G" }, context: "acústico" },
      { directorId: "sofia", key: { note: "La", symbol: "A" }, context: "banda" },
    ],
  },
  {
    id: "tu-amor-no-falla",
    title: "Tu amor no falla",
    artist: "Bethel Music",
    originalKey: { note: "Mi", symbol: "E" },
    durationSeconds: 335,
    hasHomeVersion: true,
    directorKeys: [
      { directorId: "ana", key: { note: "Mi", symbol: "E" }, context: "banda" },
      { directorId: "luis", key: { note: "Re", symbol: "D" }, context: "banda" },
      { directorId: "sofia", key: { note: "Mi", symbol: "E" }, context: "acústico" },
    ],
  },
];
