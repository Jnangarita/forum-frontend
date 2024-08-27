const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('src/pages/LoginForm.vue'),
  },
  {
    path: '/forget-password',
    name: 'ForgetPassword',
    component: () => import('src/pages/ForgetPassword.vue')
  },
  {
    path: '/create-account',
    name: 'CreateAccount',
    component: () => import('src/pages/CreateAccount.vue')
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('src/pages/home/pages/Home.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'questions',
        name: 'questions',
        component: () => import('src/pages/questions/pages/Questions.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'categories',
        name: 'categories',
        component: () => import('src/pages/categories/pages/categories.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('src/pages/user/pages/Users.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'questions/:id/:title',
        name: 'QuestionContainer',
        component: () => import('src/pages/questions/pages/QuestionInfo.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'questions/category/:title',
        name: 'CategoryPage',
        component: () => import('src/pages/questions/pages/CategoryType.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'user/view/:id/:userName',
        name: 'UserView',
        component: () => import('src/pages/user/pages/UserView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'account-settings/account',
        name: 'Settings',
        component: () => import('src/pages/user/pages/UserSettings.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes