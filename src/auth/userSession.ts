import { api } from "@/api/axios";
import type { Role } from "./roles";

let cachedRole: Role | undefined;
let inFlight: Promise<Role | undefined> | null = null;

export async function getCurrentUserRole(): Promise<Role | undefined> {
  if (typeof cachedRole !== "undefined") return cachedRole;
  if (inFlight) return inFlight;
  inFlight = api.my.getMy().then((res) => {
    const role = (res.data.data?.role as unknown) as Role | undefined;
    cachedRole = role;
    inFlight = null;
    return role;
  }).catch(() => {
    inFlight = null;
    return undefined;
  });
  return inFlight;
}

export function clearUserRoleCache() {
  cachedRole = undefined;
}


