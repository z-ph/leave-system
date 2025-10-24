export default [
  {
    path: '/login',
    component: () => import('../pages/common/Login.vue'),
  },
  {
    path: '/',
    component: () => import('../pages/common/index.vue'),
  },
  {
    path: '/test/login',
    component: () => import('../pages/common/TestLogin.vue'),
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
]