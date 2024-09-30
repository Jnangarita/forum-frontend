import { authLogin } from 'src/api/authentication';
import { defineStore } from 'pinia';
import { HttpStatusCode } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { ref, computed } from 'vue';
import { util } from 'src/utils/functions';

export const useAuthStore = defineStore('auth', () => {
  const authToken = ref(null);
  const isAuthenticated = ref(false);
  const user = ref(null);

  const login = async (credentials) => {
    const response = await authLogin.authUser(credentials);
    if (response.status === HttpStatusCode.Ok) {
      authToken.value = response.data.jwtToken;
      isAuthenticated.value = true;
      localStorage.setItem('authToken', authToken.value);
      user.value = jwtDecode(authToken.value);
      localStorage.setItem('userId', user.value.id);
    }
  };

  const logout = () => {
    deleteInfo();
    util.storage.deleteInfoLocalStorage();
    util.storage.deleteStore();
  };

  const deleteInfo = () => {
    isAuthenticated.value = false;
    user.value = null;
    authToken.value = null;
  };

  const authenticatedUser = computed(() => authToken.value !== null);
  const userInfo = computed(() => user.value);
  const authenticatedJwtToken = computed(() => authToken.value);

  return {
    login,
    logout,
    authenticatedJwtToken,
    authenticatedUser,
    authToken,
    isAuthenticated,
    user,
    userInfo,
  };
});