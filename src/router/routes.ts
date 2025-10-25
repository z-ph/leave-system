import type { RouteRecordRaw } from "vue-router";
import { Role } from "@/auth/roles";

const routes = [
  {
    path: '/login',
    component: () => import('../pages/common/Login.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/admin',
    component: () => import('../pages/admin/AdminLayout.vue'),
    meta: { requiresAuth: true },
    redirect: '/admin/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('../pages/admin/Dashboard.vue'),
        meta: { requiresAuth: true, pageTitle: '仪表盘' },
      },
      {
        path: 'approvals',
        component: () => import('../pages/admin/Approvals.vue'),
        meta: { requiresAuth: true, roles: [Role.CENTER_DIRECTOR, Role.DEPUTY_DIRECTOR, Role.DEPARTMENT_DIRECTOR, Role.ADMIN], pageTitle: '待审批' },
      },
      {
        path: 'requests',
        component: () => import('../pages/admin/Requests.vue'),
        meta: { requiresAuth: true, roles: [Role.CENTER_DIRECTOR, Role.DEPUTY_DIRECTOR, Role.DEPARTMENT_DIRECTOR, Role.ADMIN], pageTitle: '申请管理' },
      },
      {
        path: 'admins',
        component: () => import('../pages/admin/Admins.vue'),
        meta: { requiresAuth: true, roles: [Role.ADMIN], pageTitle: '审核员管理' },
      },
    ],
  },
  {
    path: '/',
    component: () => import('../pages/common/index.vue'),
  },
  {
    path: '/test/login',
    component: () => import('../pages/TestLogin.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/403',
    component: () => import('../pages/common/Forbidden.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/my',
    component: () => import('../pages/common/My.vue'),
  },
  {
    path: '/form',
    component: () => import('../pages/common/Form.vue'),
  },
  {
    path: '/leave-list',
    component: () => import('../pages/common/LeaveList.vue'),
  },
] satisfies RouteRecordRaw[];

export default routes;