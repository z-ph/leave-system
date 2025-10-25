import { api } from "@/api/axios";
import type { Role } from "./roles";
import type { UserVo } from "@/api/axios/Api";

let cachedRole: Role | undefined;
let inFlight: Promise<Role | undefined> | null = null;

export async function getCurrentUserRole(): Promise<Role | undefined> {
  if (typeof cachedRole !== "undefined") return cachedRole;
  if (inFlight) return inFlight;
  inFlight = api.my.getMy().then((res) => {
    const userVo = res.data.data as UserVo;
    // 将string类型的role转换为Role枚举
    const role = userVo.role !== undefined ? Number(userVo.role) as Role : undefined;
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


