import { createWebHistory, createRouter } from "vue-router";

import routes from "./routes";
import { ROUTE_PATHS } from "./constants";
import { TokenManager } from "../auth/tokenManager";
import { hasRole, Role } from "@/auth/roles";
import { getCurrentUserRole } from "@/auth/userSession";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  const requiresAuth = to.meta?.requiresAuth ?? true;

  // 不需要认证的路由直接通过
  if (!requiresAuth) {
    next();
    return;
  }

  // 未��录跳转到登录页
  if (!isAuthed()) {
    next({ path: ROUTE_PATHS.LOGIN, query: { redirect: to.fullPath } });
    return;
  }
  next();
});

// 根据角色获取默认路由
function getDefaultRouteForRole(role: Role | undefined): string {
  switch (role) {
    case Role.ADMIN:
    case Role.DEPARTMENT_DIRECTOR:
    case Role.DEPUTY_DIRECTOR:
    case Role.CENTER_DIRECTOR:
      return ROUTE_PATHS.ADMIN;
    case Role.EMPLOYEE:
    default:
      return ROUTE_PATHS.COMMON;
  }
}

// 检查路径是否允许当前角色访问
function isPathAllowedForRole(path: string, role: Role | undefined): boolean {
  const isAdminPath = path.startsWith(ROUTE_PATHS.ADMIN);
  const isUserPath = path.startsWith(ROUTE_PATHS.COMMON);

  // 管理员路径
  if (isAdminPath) {
    return role !== undefined && role >= Role.CENTER_DIRECTOR;
  }

  // 用户路径
  if (isUserPath) {
    return role === Role.EMPLOYEE || role === undefined;
  }

  // 其他路径默认允许
  return true;
}

function isAuthed() {
  return TokenManager.isAuthed();
}

export default router;
