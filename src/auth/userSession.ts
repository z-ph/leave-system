import { api } from "@/api/axios";
import { Role } from "./roles";
import type { UserVo } from "@/api/axios/Api";

let cachedRole: Role | undefined;
let inFlight: Promise<Role> | null = null;

export async function getCurrentUserRole(): Promise<Role> {
  if (typeof cachedRole !== "undefined") return cachedRole;
  if (inFlight) return inFlight;
  inFlight = api.my.getMy().then((res) => {
    const userVo = res.data.data as UserVo;
    // 将string类型的role转换为Role枚举
    const role = userVo.role !== undefined ? Number(userVo.role) as Role : Role.EMPLOYEE;
    cachedRole = role;
    inFlight = null;
    return role;
  }).catch(() => {
    inFlight = null;
    return Role.EMPLOYEE; // 返回默认角色而不是undefined
  });
  return inFlight;
}

export function clearUserRoleCache() {
  cachedRole = undefined;
}


