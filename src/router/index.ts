import { createWebHistory, createRouter } from "vue-router";

import routes from "./routes";
import { ROUTE_PATHS } from "./constants";
import { TokenManager } from "../auth/tokenManager";

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

function isAuthed() {
  return TokenManager.isAuthed();
}

export default router;
