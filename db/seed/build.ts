import {
  mkdirSync,
  readFileSync,
  readdirSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type KeyMode = "major" | "minor";

type SeedKey = {
  note: string;
  symbol: string;
  mode?: KeyMode;
};

type SeedDirectorKey = {
  directorId: string;
  key: SeedKey;
  context?: "acústico" | "banda";
};

type SeedSong = {
  id: string;
  title: string;
  artist: string;
  originalKey: SeedKey | null;
  durationSeconds: number;
  hasHomeVersion: boolean;
  directorKeys: SeedDirectorKey[];
};

type SeedMember = {
  id: string;
  name: string;
  initials: string;
  role: "director" | "musico" | "corista";
  roleLabel: string;
  tone: "primary" | "secondary" | "accent" | "neutral" | "info" | "success" | "warning";
};

type ImportSong = {
  id: string;
  title: string;
  artist?: string;
  originalKey?: SeedKey | null;
  durationSeconds?: number;
  hasHomeVersion?: boolean;
  directorKeys?: Array<{
    directorId: string;
    key?: SeedKey | null;
    context?: "acústico" | "banda";
  }>;
};

type ImportFile = {
  songs: ImportSong[];
  warnings?: string[];
};

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const importFile = JSON.parse(
  readFileSync(join(root, "songs-import.json"), "utf8"),
) as ImportFile;

const fixtureMembers: SeedMember[] = [
  { id: "isa", name: "Isa", initials: "IM", role: "musico", roleLabel: "Músico", tone: "primary" },
  { id: "ana", name: "Ana Torres", initials: "AT", role: "director", roleLabel: "Directora", tone: "primary" },
  { id: "luis", name: "Luis Mendoza", initials: "LM", role: "director", roleLabel: "Director", tone: "secondary" },
  { id: "sofia", name: "Sofía Ríos", initials: "SR", role: "director", roleLabel: "Directora", tone: "accent" },
  { id: "mateo", name: "Mateo Silva", initials: "MS", role: "musico", roleLabel: "Músico", tone: "info" },
  { id: "carla", name: "Carla Vega", initials: "CV", role: "corista", roleLabel: "Corista", tone: "success" },
  { id: "david", name: "David León", initials: "DL", role: "musico", roleLabel: "Músico", tone: "warning" },
  { id: "elena", name: "Elena Paz", initials: "EP", role: "corista", roleLabel: "Corista", tone: "neutral" },
];

const fixtureSongs: SeedSong[] = [
  {
    id: "grande-es-tu-amor",
    title: "Grande es tu amor",
    artist: "Marcos Witt",
    originalKey: { note: "Sol", symbol: "G", mode: "major" },
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
    originalKey: { note: "Do", symbol: "C", mode: "major" },
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
    originalKey: { note: "Re", symbol: "D", mode: "major" },
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
    originalKey: { note: "La", symbol: "A", mode: "major" },
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
    originalKey: { note: "Mi", symbol: "E", mode: "major" },
    durationSeconds: 335,
    hasHomeVersion: true,
    directorKeys: [
      { directorId: "ana", key: { note: "Mi", symbol: "E" }, context: "banda" },
      { directorId: "luis", key: { note: "Re", symbol: "D" }, context: "banda" },
      { directorId: "sofia", key: { note: "Mi", symbol: "E" }, context: "acústico" },
    ],
  },
];

const defaultSetlist = {
  id: "domingo",
  title: "Setlist de este domingo",
  serviceLabel: "Domingo · 10:00",
  directorId: "ana",
  items: [
    { position: 1, songId: "grande-es-tu-amor", directorId: "ana", key: { note: "Sol", symbol: "G", mode: "major" } },
    { position: 2, songId: "tu-fidelidad", directorId: "ana", key: { note: "Do", symbol: "C", mode: "major" } },
    { position: 3, songId: "nadie-como-tu", directorId: "ana", key: { note: "Re", symbol: "D", mode: "major" } },
    { position: 4, songId: "santo-es-el-senor", directorId: "ana", key: { note: "La", symbol: "A", mode: "major" } },
    { position: 5, songId: "tu-amor-no-falla", directorId: "ana", key: { note: "Mi", symbol: "E", mode: "major" } },
  ],
} as const;

const tones = ["primary", "secondary", "accent", "info", "success", "warning", "neutral"] as const;

const stripDiacritics = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function slugify(value: string): string {
  return stripDiacritics(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  if (parts.length === 1) {
    return stripDiacritics(parts[0]).slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

const members = [...fixtureMembers];
const usedMemberIds = new Set(members.map((member) => member.id));
const memberIdByName = new Map(
  members.map((member) => [member.name.toLowerCase(), member.id]),
);

const importDirectorNames = [
  ...new Set(
    importFile.songs.flatMap((song) =>
      (song.directorKeys ?? []).map((directorKey) => directorKey.directorId),
    ),
  ),
].sort((a, b) => a.localeCompare(b, "es"));

for (const name of importDirectorNames) {
  const existingId = memberIdByName.get(name.toLowerCase());

  if (existingId) {
    continue;
  }

  const baseId = slugify(name) || "director";
  let id = baseId;
  let suffix = 2;

  while (usedMemberIds.has(id)) {
    id = `${baseId}-${suffix}`;
    suffix += 1;
  }

  const member: SeedMember = {
    id,
    name,
    initials: getInitials(name),
    role: "director",
    roleLabel: "Director",
    tone: tones[members.length % tones.length],
  };

  members.push(member);
  usedMemberIds.add(id);
  memberIdByName.set(name.toLowerCase(), id);
}

const songsById = new Map<string, SeedSong>();

for (const song of fixtureSongs) {
  songsById.set(song.id, song);
}

for (const song of importFile.songs) {
  const directorKeys = new Map<string, SeedDirectorKey>();

  for (const directorKey of song.directorKeys ?? []) {
    const directorId = memberIdByName.get(directorKey.directorId.toLowerCase());

    if (!directorId) {
      throw new Error(
        `Director "${directorKey.directorId}" is not mapped for song "${song.id}"`,
      );
    }

    if (directorKey.key) {
      directorKeys.set(directorId, {
        directorId,
        key: directorKey.key,
        context: directorKey.context,
      });
    }
  }

  songsById.set(song.id, {
    id: song.id,
    title: song.title,
    artist: song.artist || "Desconocido",
    originalKey: song.originalKey ?? null,
    durationSeconds: song.durationSeconds ?? 0,
    hasHomeVersion: song.hasHomeVersion ?? false,
    directorKeys: [...directorKeys.values()],
  });
}

const songs = [...songsById.values()].sort((a, b) => a.id.localeCompare(b.id));
const sortedMembers = [...members].sort((a, b) => a.id.localeCompare(b.id));

for (const item of defaultSetlist.items) {
  if (!songsById.has(item.songId)) {
    throw new Error(`Setlist song "${item.songId}" is not seeded`);
  }
}

const quote = (value: string | null | undefined): string =>
  value === null || value === undefined
    ? "NULL"
    : `'${String(value).replace(/'/g, "''")}'`;

const number = (value: number): string => String(Math.max(0, Math.trunc(value)));
const boolean = (value: boolean): string => (value ? "1" : "0");
const timestamp = "(unixepoch() * 1000)";

const statements: string[] = [
  "-- Generated by db/seed/build.ts. Do not edit by hand.",
  "-- Apply with: npm run db:seed:local (or npm run db:seed for the remote database)",
];

for (const member of sortedMembers) {
  statements.push(
    `INSERT INTO members (id, name, initials, role, role_label, tone, created_at) VALUES (${quote(member.id)}, ${quote(member.name)}, ${quote(member.initials)}, ${quote(member.role)}, ${quote(member.roleLabel)}, ${quote(member.tone)}, ${timestamp}) ON CONFLICT(id) DO NOTHING;`,
  );
}

for (const song of songs) {
  statements.push(
    `INSERT INTO songs (id, title, artist, original_key_note, original_key_symbol, original_key_mode, duration_seconds, has_home_version, created_at, updated_at) VALUES (${quote(song.id)}, ${quote(song.title)}, ${quote(song.artist)}, ${quote(song.originalKey?.note)}, ${quote(song.originalKey?.symbol)}, ${quote(song.originalKey ? (song.originalKey.mode ?? "major") : null)}, ${number(song.durationSeconds)}, ${boolean(song.hasHomeVersion)}, ${timestamp}, ${timestamp}) ON CONFLICT(id) DO NOTHING;`,
  );
}

for (const song of songs) {
  for (const directorKey of song.directorKeys) {
    statements.push(
      `INSERT INTO song_director_keys (song_id, director_id, key_note, key_symbol, key_mode, context) VALUES (${quote(song.id)}, ${quote(directorKey.directorId)}, ${quote(directorKey.key.note)}, ${quote(directorKey.key.symbol)}, ${quote(directorKey.key.mode ?? "major")}, ${quote(directorKey.context ?? null)}) ON CONFLICT(song_id, director_id) DO NOTHING;`,
    );
  }
}

statements.push(
  `INSERT INTO setlists (id, title, service_label, director_id, created_at) VALUES (${quote(defaultSetlist.id)}, ${quote(defaultSetlist.title)}, ${quote(defaultSetlist.serviceLabel)}, ${quote(defaultSetlist.directorId)}, ${timestamp}) ON CONFLICT(id) DO NOTHING;`,
);

for (const item of defaultSetlist.items) {
  statements.push(
    `INSERT INTO setlist_items (setlist_id, position, song_id, director_id, key_note, key_symbol, key_mode) VALUES (${quote(defaultSetlist.id)}, ${number(item.position)}, ${quote(item.songId)}, ${quote(item.directorId)}, ${quote(item.key.note)}, ${quote(item.key.symbol)}, ${quote(item.key.mode)}) ON CONFLICT(setlist_id, position) DO NOTHING;`,
  );
}

const MAX_PART_BYTES = 60_000;
const parts: string[][] = [];
let part: string[] = [];
let partBytes = 0;

for (const statement of statements) {
  const statementBytes = Buffer.byteLength(statement) + 1;

  if (statementBytes > MAX_PART_BYTES) {
    throw new Error(`Seed statement is too large: ${statement.slice(0, 80)}…`);
  }

  if (part.length > 0 && partBytes + statementBytes > MAX_PART_BYTES) {
    parts.push(part);
    part = [];
    partBytes = 0;
  }

  part.push(statement);
  partBytes += statementBytes;
}

if (part.length > 0) {
  parts.push(part);
}

const seedDir = join(root, "db", "seed-data");
mkdirSync(seedDir, { recursive: true });

for (const file of readdirSync(seedDir)) {
  if (file.endsWith(".sql")) {
    unlinkSync(join(seedDir, file));
  }
}

parts.forEach((partStatements, index) => {
  const fileName = `${String(index + 1).padStart(4, "0")}.sql`;
  const header = `-- Generated by db/seed/build.ts. Do not edit by hand.\n-- Part ${index + 1} of ${parts.length}.\n`;

  writeFileSync(
    join(seedDir, fileName),
    `${header}${partStatements.join("\n")}\n`,
  );
});

const directorKeyCount = songs.reduce(
  (total, song) => total + song.directorKeys.length,
  0,
);

writeFileSync(
  join(root, "db", "seed-report.json"),
  `${JSON.stringify(
    {
      counts: {
        members: sortedMembers.length,
        songs: songs.length,
        directorKeys: directorKeyCount,
        setlists: 1,
        setlistItems: defaultSetlist.items.length,
      },
      importedDirectors: importDirectorNames.map((name) => ({
        name,
        id: memberIdByName.get(name.toLowerCase()),
      })),
      warnings: importFile.warnings ?? [],
    },
    null,
    2,
  )}\n`,
);

console.log(
  `Seeded ${sortedMembers.length} members, ${songs.length} songs, ${directorKeyCount} director keys and ${defaultSetlist.items.length} setlist items in ${parts.length} SQL part(s).`,
);
