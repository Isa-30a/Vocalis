import type { Member } from "../types";

export const members: Member[] = [
  {
    id: "isa",
    name: "Isa",
    initials: "IM",
    role: "musico",
    roleLabel: "Músico",
    tone: "primary",
  },
  {
    id: "ana",
    name: "Ana Torres",
    initials: "AT",
    role: "director",
    roleLabel: "Directora",
    tone: "primary",
  },
  {
    id: "luis",
    name: "Luis Mendoza",
    initials: "LM",
    role: "director",
    roleLabel: "Director",
    tone: "secondary",
  },
  {
    id: "sofia",
    name: "Sofía Ríos",
    initials: "SR",
    role: "director",
    roleLabel: "Directora",
    tone: "accent",
  },
  {
    id: "mateo",
    name: "Mateo Silva",
    initials: "MS",
    role: "musico",
    roleLabel: "Músico",
    tone: "info",
  },
  {
    id: "carla",
    name: "Carla Vega",
    initials: "CV",
    role: "corista",
    roleLabel: "Corista",
    tone: "success",
  },
  {
    id: "david",
    name: "David León",
    initials: "DL",
    role: "musico",
    roleLabel: "Músico",
    tone: "warning",
  },
  {
    id: "elena",
    name: "Elena Paz",
    initials: "EP",
    role: "corista",
    roleLabel: "Corista",
    tone: "neutral",
  },
];

export const currentUser = members[0];
