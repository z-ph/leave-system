import { createWebHistory, createRouter } from "vue-router";

import routes from "./routes";
import { TokenManager } from "../auth/tokenManager";
import { hasRole, Role } from "@/auth/roles";
import { getCurrentUserRole } from "@/auth/userSession";

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(async (to, _from, next) => {
  const requiresAuth = to.meta?.requiresAuth ?? true;
  if (!requiresAuth) {
    next();
    return;
  }
  if (!isAuthed()) {
    next({ path: "/login", query: { redirect: to.fullPath } });
    return;
  }
  const allowed = to.meta?.roles as Role[] | undefined;
  if (!allowed || allowed.length === 0) {
    next();
    return;
  }
  const role = await getCurrentUserRole();
  if (hasRole(role, allowed)) {
    next();
    return;
  }
  next("/403");
});
function isAuthed() {
  return TokenManager.isAuthed();
}
export default router;
