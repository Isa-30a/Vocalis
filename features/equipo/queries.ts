import { asc } from "drizzle-orm";
import { getDb } from "@/db";
import { members } from "@/db/schema";
import type { Member } from "./types";

export async function getMembers(): Promise<Member[]> {
  const rows = await getDb()
    .select({
      id: members.id,
      name: members.name,
      initials: members.initials,
      role: members.role,
      roleLabel: members.roleLabel,
      tone: members.tone,
    })
    .from(members)
    .orderBy(asc(members.createdAt), asc(members.name));

  return rows;
}
