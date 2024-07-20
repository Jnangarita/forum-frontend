
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'home', name: 'home', component: () => import('src/pages/home/pages/Home.vue') },
      { path: 'questions', name: 'questions', component: () => import('src/pages/questions/pages/Questions.vue') },
      { path: 'categories', name: 'categories', component: () => import('src/pages/categories/pages/categories.vue') },
      { path: 'users', name: 'users', component: () => import('src/pages/user/pages/Users.vue') },
      { path: 'questions/:id/:title', name: 'QuestionContainer', component: () => import('src/pages/questions/pages/QuestionInfo.vue') },
      { path: 'questions/category/:title', name: 'CategoryPage', component: () => import('src/pages/categories/components/Category.vue') },
      { path: 'user/view/:id', name: 'UserView', component: () => import('src/pages/user/pages/UserView.vue') }
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
