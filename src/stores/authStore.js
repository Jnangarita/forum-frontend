import { authLogin } from 'src/api/authentication';
import { defineStore } from 'pinia';
import { deleteInfoLocalStorage } from 'src/utils/functions';
import { HttpStatusCode } from "axios";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authToken: null,
    isAuthenticated: false,
    user: null,
  }),
  actions: {
    async login(credentials) {
      const response = await authLogin.authUser(credentials);
      if (response.status === HttpStatusCode.Ok) {
        this.authToken = response.data.jwtToken;
        this.isAuthenticated = true;
        localStorage.setItem('authToken', this.authToken);
        this.user = jwtDecode(this.authToken);
        localStorage.setItem('userId', this.user.id);
      }
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.authToken = null;
      deleteInfoLocalStorage();
    },
  },
  getters: {
    authenticatedUser: (state) => state.authToken !== null,
    userInfo: (state) => state.user,
    authenticatedJwtToken: (state) => state.authToken,
  },
});