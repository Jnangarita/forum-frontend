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
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('src/pages/home/pages/Home.vue'),
        meta: { requiresAuth: true }
      },
      { path: 'questions', name: 'questions', component: () => import('src/pages/questions/pages/Questions.vue') },
      { path: 'categories', name: 'categories', component: () => import('src/pages/categories/pages/categories.vue') },
      { path: 'users', name: 'users', component: () => import('src/pages/user/pages/Users.vue') },
      { path: 'questions/:id/:title', name: 'QuestionContainer', component: () => import('src/pages/questions/pages/QuestionInfo.vue') },
      { path: 'questions/category/:title', name: 'CategoryPage', component: () => import('src/pages/questions/pages/CategoryType.vue') },
      { path: 'user/view/:id/:userName', name: 'UserView', component: () => import('src/pages/user/pages/UserView.vue') }
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