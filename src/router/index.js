import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { jwtDecode } from "jwt-decode";
import { route } from 'quasar/wrappers'
import { util } from 'src/utils/functions';
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    const jwtToken = localStorage.getItem('authToken');

    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!jwtToken || isTokenExpired(jwtToken)) {
        alert(util.getMessage('sessionExpired'));
        util.deleteInfoLocalStorage();
        next({ name: 'Login' });
      } else {
        next();
      }
    } else {
      next();
    }
  });
  return Router
})

const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp && decodedToken.exp < currentTime;
  } catch (error) {
    console.error(error);
  }
};