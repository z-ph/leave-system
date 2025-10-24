export enum Role {
  User = 0,
  Auditor = 1,
  SuperAdmin = 2,
}

export function hasRole(userRole: Role | undefined, allowed: Role[]) {
  return typeof userRole === "number" && allowed.includes(userRole);
}


