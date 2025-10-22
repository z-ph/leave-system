import { createWebHistory, createRouter } from "vue-router";

import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, _from, next) => {
  if (to.path === "/login") {
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
  return false;
}
export default router;
