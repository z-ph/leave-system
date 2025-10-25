import { createWebHistory, createRouter } from "vue-router";

import routes from "./routes";
import { TokenManager } from "../auth/tokenManager";
import { hasRole, Role } from "@/auth/roles";
import { getCurrentUserRole } from "@/auth/userSession";
import { useAutoRedirect } from "@/hooks/useAutoRedirect";

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

  // 未登录跳转到登录页
  if (!isAuthed()) {
    next({ path: "/login", query: { redirect: to.fullPath } });
    return;
  }

  // 获取用户角色
  const role = await getCurrentUserRole();

  // 检查角色权限
  const allowed = to.meta?.roles as Role[] | undefined;
  if (allowed && allowed.length > 0) {
    if (!hasRole(role, allowed)) {
      next("/403");
      return;
    }
  }

  // 处理根路径和登录页的重定向
  if (to.path === '/' || to.path === '/login') {
    const defaultRoute = getDefaultRouteForRole(role);
    next(defaultRoute);
    return;
  }

  // 处理角色不匹配的路径
  if (!isPathAllowedForRole(to.path, role)) {
    const defaultRoute = getDefaultRouteForRole(role);
    next(defaultRoute);
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
      return '/admin';
    case Role.EMPLOYEE:
    default:
      return '/common';
  }
}

// 检查路径是否允许当前角色访问
function isPathAllowedForRole(path: string, role: Role | undefined): boolean {
  const isAdminPath = path.startsWith('/admin');
  const isUserPath = path.startsWith('/common');

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
