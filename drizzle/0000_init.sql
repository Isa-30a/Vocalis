CREATE TABLE `members` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`initials` text NOT NULL,
	`role` text NOT NULL,
	`role_label` text NOT NULL,
	`tone` text DEFAULT 'neutral' NOT NULL,
	`email` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	CONSTRAINT "members_role_check" CHECK("members"."role" in ('director', 'musico', 'corista')),
	CONSTRAINT "members_tone_check" CHECK("members"."tone" in ('primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `members_email_idx` ON `members` (`email`);--> statement-breakpoint
CREATE TABLE `setlist_items` (
	`setlist_id` text NOT NULL,
	`position` integer NOT NULL,
	`song_id` text NOT NULL,
	`director_id` text NOT NULL,
	`key_note` text NOT NULL,
	`key_symbol` text NOT NULL,
	`key_mode` text DEFAULT 'major' NOT NULL,
	PRIMARY KEY(`setlist_id`, `position`),
	FOREIGN KEY (`setlist_id`) REFERENCES `setlists`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`song_id`) REFERENCES `songs`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`director_id`) REFERENCES `members`(`id`) ON UPDATE no action ON DELETE restrict,
	CONSTRAINT "setlist_items_mode_check" CHECK("setlist_items"."key_mode" in ('major', 'minor'))
);
--> statement-breakpoint
CREATE INDEX `setlist_items_song_idx` ON `setlist_items` (`song_id`);--> statement-breakpoint
CREATE INDEX `setlist_items_director_idx` ON `setlist_items` (`director_id`);--> statement-breakpoint
CREATE TABLE `setlists` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`service_label` text NOT NULL,
	`director_id` text NOT NULL,
	`service_at` integer,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`director_id`) REFERENCES `members`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE INDEX `setlists_director_idx` ON `setlists` (`director_id`);--> statement-breakpoint
CREATE INDEX `setlists_service_at_idx` ON `setlists` (`service_at`);--> statement-breakpoint
CREATE TABLE `song_audio` (
	`id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))) NOT NULL,
	`song_id` text NOT NULL,
	`kind` text NOT NULL,
	`label` text NOT NULL,
	`storage_key` text NOT NULL,
	`mime_type` text NOT NULL,
	`size_bytes` integer NOT NULL,
	`duration_seconds` integer DEFAULT 0 NOT NULL,
	`uploaded_by` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`song_id`) REFERENCES `songs`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`uploaded_by`) REFERENCES `members`(`id`) ON UPDATE no action ON DELETE set null,
	CONSTRAINT "song_audio_kind_check" CHECK("song_audio"."kind" in ('home', 'original', 'reference'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `song_audio_storage_key_idx` ON `song_audio` (`storage_key`);--> statement-breakpoint
CREATE INDEX `song_audio_song_idx` ON `song_audio` (`song_id`);--> statement-breakpoint
CREATE INDEX `song_audio_uploaded_by_idx` ON `song_audio` (`uploaded_by`);--> statement-breakpoint
CREATE TABLE `song_director_keys` (
	`song_id` text NOT NULL,
	`director_id` text NOT NULL,
	`key_note` text NOT NULL,
	`key_symbol` text NOT NULL,
	`key_mode` text DEFAULT 'major' NOT NULL,
	`context` text,
	PRIMARY KEY(`song_id`, `director_id`),
	FOREIGN KEY (`song_id`) REFERENCES `songs`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`director_id`) REFERENCES `members`(`id`) ON UPDATE no action ON DELETE restrict,
	CONSTRAINT "song_director_keys_mode_check" CHECK("song_director_keys"."key_mode" in ('major', 'minor')),
	CONSTRAINT "song_director_keys_context_check" CHECK("song_director_keys"."context" is null or "song_director_keys"."context" in ('acústico', 'banda'))
);
--> statement-breakpoint
CREATE INDEX `song_director_keys_director_idx` ON `song_director_keys` (`director_id`);--> statement-breakpoint
CREATE TABLE `songs` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`artist` text DEFAULT 'Desconocido' NOT NULL,
	`original_key_note` text,
	`original_key_symbol` text,
	`original_key_mode` text,
	`duration_seconds` integer DEFAULT 0 NOT NULL,
	`has_home_version` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	CONSTRAINT "songs_key_mode_check" CHECK("songs"."original_key_mode" is null or "songs"."original_key_mode" in ('major', 'minor'))
);
--> statement-breakpoint
CREATE INDEX `songs_title_idx` ON `songs` (`title`);--> statement-breakpoint
CREATE INDEX `songs_artist_idx` ON `songs` (`artist`);