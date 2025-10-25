export enum Role {
  EMPLOYEE = 0,              // 普通员工
  CENTER_DIRECTOR = 1,       // 中心主任
  DEPUTY_DIRECTOR = 2,       // 分管副主任
  DEPARTMENT_DIRECTOR = 3,   // 部门正职（主任）
  ADMIN = 4,                 // 系统管理员
}

// 角色层级映射，用于权限判断
export const ROLE_HIERARCHY = {
  [Role.EMPLOYEE]: 0,
  [Role.CENTER_DIRECTOR]: 1,
  [Role.DEPUTY_DIRECTOR]: 2,
  [Role.DEPARTMENT_DIRECTOR]: 3,
  [Role.ADMIN]: 4,
} as const;

// 角色显示名称映射
export const ROLE_NAMES = {
  [Role.EMPLOYEE]: '普通员工',
  [Role.CENTER_DIRECTOR]: '中心主任',
  [Role.DEPUTY_DIRECTOR]: '分管副主任',
  [Role.DEPARTMENT_DIRECTOR]: '部门正职（主任）',
  [Role.ADMIN]: '系统管理员',
} as const;

export function hasRole(userRole: Role | undefined, allowed: Role[]) {
  return typeof userRole === "number" && allowed.includes(userRole);
}

// 检查是否为审批人角色（具有审批权限的角色）
export function isApproverRole(role: Role | undefined): boolean {
  if (typeof role !== "number") return false;
  return role >= Role.CENTER_DIRECTOR && role <= Role.DEPARTMENT_DIRECTOR;
}

// 检查是否为管理员角色
export function isAdminRole(role: Role | undefined): boolean {
  return role === Role.ADMIN;
}

// 检查是否为员工角色
export function isEmployeeRole(role: Role | undefined): boolean {
  return role === Role.EMPLOYEE;
}

// 获取角色层级，数字越大权限越高
export function getRoleLevel(role: Role | undefined): number {
  return typeof role === "number" ? ROLE_HIERARCHY[role] : 0;
}

// 检查角色A是否高于角色B
export function isRoleHigher(roleA: Role | undefined, roleB: Role | undefined): boolean {
  const levelA = getRoleLevel(roleA);
  const levelB = getRoleLevel(roleB);
  return levelA > levelB;
}

// 根据角色字符串获取角色枚举值
export function getRoleFromString(roleString?: string): Role | undefined {
  switch (roleString) {
    case '普通员工': return Role.EMPLOYEE;
    case '中心主任': return Role.CENTER_DIRECTOR;
    case '分管副主任': return Role.DEPUTY_DIRECTOR;
    case '部门正职': return Role.DEPARTMENT_DIRECTOR;
    case '部门正职（主任）': return Role.DEPARTMENT_DIRECTOR;
    case '系统管理员': return Role.ADMIN;
    default: return undefined;
  }
}


