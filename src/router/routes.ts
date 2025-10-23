export default [
  {
    path: '/login',
    component: () => import('../pages/Login.vue'),
  },
  {
    path: '/',
    component: () => import('../pages/Form.vue'),
  },
  {
    path: '/test/login',
    component: () => import('../pages/TestLogin.vue'),
  },
]