import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const memberRoles = ["director", "musico", "corista"] as const;
export const avatarTones = [
  "primary",
  "secondary",
  "accent",
  "neutral",
  "info",
  "success",
  "warning",
] as const;
export const keyModes = ["major", "minor"] as const;
export const arrangementContexts = ["acústico", "banda"] as const;
export const audioKinds = ["home", "original", "reference"] as const;

const createdAt = integer("created_at", { mode: "timestamp_ms" })
  .notNull()
  .default(sql`(unixepoch() * 1000)`);

const updatedAt = integer("updated_at", { mode: "timestamp_ms" })
  .notNull()
  .default(sql`(unixepoch() * 1000)`);

export const members = sqliteTable(
  "members",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    initials: text("initials").notNull(),
    role: text("role", { enum: memberRoles }).notNull(),
    roleLabel: text("role_label").notNull(),
    tone: text("tone", { enum: avatarTones }).notNull().default("neutral"),
    email: text("email"),
    createdAt,
  },
  (table) => [
    uniqueIndex("members_email_idx").on(table.email),
    check(
      "members_role_check",
      sql`${table.role} in ('director', 'musico', 'corista')`,
    ),
    check(
      "members_tone_check",
      sql`${table.tone} in ('primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning')`,
    ),
  ],
);

export const songs = sqliteTable(
  "songs",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    artist: text("artist").notNull().default("Desconocido"),
    originalKeyNote: text("original_key_note"),
    originalKeySymbol: text("original_key_symbol"),
    originalKeyMode: text("original_key_mode", { enum: keyModes }),
    durationSeconds: integer("duration_seconds").notNull().default(0),
    hasHomeVersion: integer("has_home_version", { mode: "boolean" })
      .notNull()
      .default(false),
    createdAt,
    updatedAt,
  },
  (table) => [
    index("songs_title_idx").on(table.title),
    index("songs_artist_idx").on(table.artist),
    check(
      "songs_key_mode_check",
      sql`${table.originalKeyMode} is null or ${table.originalKeyMode} in ('major', 'minor')`,
    ),
  ],
);

export const songDirectorKeys = sqliteTable(
  "song_director_keys",
  {
    songId: text("song_id")
      .notNull()
      .references(() => songs.id, { onDelete: "cascade" }),
    directorId: text("director_id")
      .notNull()
      .references(() => members.id, { onDelete: "restrict" }),
    keyNote: text("key_note").notNull(),
    keySymbol: text("key_symbol").notNull(),
    keyMode: text("key_mode", { enum: keyModes }).notNull().default("major"),
    context: text("context", { enum: arrangementContexts }),
  },
  (table) => [
    primaryKey({ columns: [table.songId, table.directorId] }),
    index("song_director_keys_director_idx").on(table.directorId),
    check(
      "song_director_keys_mode_check",
      sql`${table.keyMode} in ('major', 'minor')`,
    ),
    check(
      "song_director_keys_context_check",
      sql`${table.context} is null or ${table.context} in ('acústico', 'banda')`,
    ),
  ],
);

export const setlists = sqliteTable(
  "setlists",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    serviceLabel: text("service_label").notNull(),
    directorId: text("director_id")
      .notNull()
      .references(() => members.id, { onDelete: "restrict" }),
    serviceAt: integer("service_at", { mode: "timestamp_ms" }),
    createdAt,
  },
  (table) => [
    index("setlists_director_idx").on(table.directorId),
    index("setlists_service_at_idx").on(table.serviceAt),
  ],
);

export const setlistItems = sqliteTable(
  "setlist_items",
  {
    setlistId: text("setlist_id")
      .notNull()
      .references(() => setlists.id, { onDelete: "cascade" }),
    position: integer("position").notNull(),
    songId: text("song_id")
      .notNull()
      .references(() => songs.id, { onDelete: "restrict" }),
    directorId: text("director_id")
      .notNull()
      .references(() => members.id, { onDelete: "restrict" }),
    keyNote: text("key_note").notNull(),
    keySymbol: text("key_symbol").notNull(),
    keyMode: text("key_mode", { enum: keyModes }).notNull().default("major"),
  },
  (table) => [
    primaryKey({ columns: [table.setlistId, table.position] }),
    index("setlist_items_song_idx").on(table.songId),
    index("setlist_items_director_idx").on(table.directorId),
    check("setlist_items_mode_check", sql`${table.keyMode} in ('major', 'minor')`),
  ],
);

export const songAudio = sqliteTable(
  "song_audio",
  {
    id: text("id")
      .primaryKey()
      .default(sql`(lower(hex(randomblob(16))))`),
    songId: text("song_id")
      .notNull()
      .references(() => songs.id, { onDelete: "cascade" }),
    kind: text("kind", { enum: audioKinds }).notNull(),
    label: text("label").notNull(),
    storageKey: text("storage_key").notNull(),
    mimeType: text("mime_type").notNull(),
    sizeBytes: integer("size_bytes").notNull(),
    durationSeconds: integer("duration_seconds").notNull().default(0),
    uploadedBy: text("uploaded_by").references(() => members.id, {
      onDelete: "set null",
    }),
    createdAt,
  },
  (table) => [
    uniqueIndex("song_audio_storage_key_idx").on(table.storageKey),
    index("song_audio_song_idx").on(table.songId),
    index("song_audio_uploaded_by_idx").on(table.uploadedBy),
    check(
      "song_audio_kind_check",
      sql`${table.kind} in ('home', 'original', 'reference')`,
    ),
  ],
);
