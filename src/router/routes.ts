import type { RouteRecordRaw } from "vue-router";
import { Role } from "@/auth/roles";
import { ROUTE_PATHS, PAGE_TITLES } from "./constants";

const routes = [
  {
    path: ROUTE_PATHS.LOGIN,
    component: () => import('../pages/common/Login.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: ROUTE_PATHS.ADMIN,
    component: () => import('../pages/admin/AdminLayout.vue'),
    meta: { requiresAuth: true },
    redirect: ROUTE_PATHS.ADMIN_DASHBOARD,
    children: [
      {
        path: 'dashboard',
        component: () => import('../pages/admin/Dashboard.vue'),
        meta: { requiresAuth: true, pageTitle: PAGE_TITLES.DASHBOARD },
      },
      {
        path: 'approvals',
        component: () => import('../pages/admin/Approvals.vue'),
        meta: { requiresAuth: true, roles: [Role.CENTER_DIRECTOR, Role.DEPUTY_DIRECTOR, Role.DEPARTMENT_DIRECTOR, Role.ADMIN], pageTitle: PAGE_TITLES.APPROVALS },
      },
      {
        path: 'requests',
        component: () => import('../pages/admin/Requests.vue'),
        meta: { requiresAuth: true, roles: [Role.CENTER_DIRECTOR, Role.DEPUTY_DIRECTOR, Role.DEPARTMENT_DIRECTOR, Role.ADMIN], pageTitle: PAGE_TITLES.REQUESTS },
      },
      {
        path: 'admins',
        component: () => import('../pages/admin/Admins.vue'),
        meta: { requiresAuth: true, roles: [Role.ADMIN], pageTitle: PAGE_TITLES.ADMINS },
      },
    ],
  },
  {
    path: ROUTE_PATHS.COMMON,
    component: () => import('../pages/common/index.vue'),
  },
  {
    path: ROUTE_PATHS.TEST_LOGIN,
    component: () => import('../pages/TestLogin.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: ROUTE_PATHS.FORBIDDEN,
    component: () => import('../pages/common/Forbidden.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: ROUTE_PATHS.MY,
    component: () => import('../pages/common/My.vue'),
  },
  {
    path: ROUTE_PATHS.FORM,
    component: () => import('../pages/common/Form.vue'),
  },
  {
    path: ROUTE_PATHS.LEAVE_LIST,
    component: () => import('../pages/common/LeaveList.vue'),
  },
] satisfies RouteRecordRaw[];

export default routes;