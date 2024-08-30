import { boot } from 'quasar/wrappers'
import { i18n } from 'boot/i18n';
import { useGloblaStore } from 'src/stores/globalStore'
import axios from 'axios'

const t = i18n.global.t;

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'http://localhost:9000/public/apiFake' })

const forum = axios.create({ baseURL: 'http://localhost:8080/api/forum' })

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

forum.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

forum.interceptors.response.use(
  (response) => response,
  (error) => {
    const store = useGloblaStore();
    store.message = error.response.data?.description
    console.error(t('errorIntercepted'), error)
  }
)

export { api, forum }