export default [
  {
    path: '/login',
    component: () => import('../pages/Login.vue'),
  },
  {
    path: '/',
    component: () => import('../pages/index.vue'),
  },
  {
    path: '/test/login',
    component: () => import('../pages/TestLogin.vue'),
  },
  {
    path: '/my',
    component: () => import('../pages/My.vue'),
  },
  {
    path: '/form',
    component: () => import('../pages/Form.vue'),
  },
  {
    path: '/leave-list',
    component: () => import('../pages/LeaveList.vue'),
  },
]