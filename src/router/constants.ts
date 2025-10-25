/**
 * 路由常量定义
 * 用于消除router文件中的硬编码字符串
 */

// 路径常量
export const ROUTE_PATHS = {
  LOGIN: '/login',
  ADMIN: '/admin',
  COMMON: '/',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_APPROVALS: '/admin/approvals',
  ADMIN_REQUESTS: '/admin/requests',
  ADMIN_ADMINS: '/admin/admins',
  COMMON_INDEX: '/',
  TEST_LOGIN: '/test/login',
  FORBIDDEN: '/403',
  MY: '/my',
  FORM: '/form',
  LEAVE_LIST: '/leave-list',
} as const;

// 路由组常量
export const ROUTE_GROUPS = {
  ADMIN: 'admin',
  COMMON: 'common',
} as const;

// 页面标题常量
export const PAGE_TITLES = {
  DASHBOARD: '仪表盘',
  APPROVALS: '待审批',
  REQUESTS: '申请管理',
  ADMINS: '审核员管理',
} as const;