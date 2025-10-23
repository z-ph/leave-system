import { createWebHistory, createRouter } from "vue-router";

import routes from "./routes";
import { TokenManager } from "../auth/tokenManager";

const router = createRouter({
  history: createWebHistory(),
  routes,
});
const publicRoutes = ["/login","/test/login"];
router.beforeEach((to, _from, next) => {
  if (publicRoutes.includes(to.path)) {
    next();
    return;
  }
  if (isAuthed()) {
    next();
    return;
  }
  next({
    path: "/login",
    query: { redirect: to.fullPath },
  });
});
function isAuthed() {
  return TokenManager.isAuthed();
}
export default router;
