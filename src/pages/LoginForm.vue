<template>
  <div class="justify-center items-center main-content">
    <div class="login-container">
      <div class="login-item display-flex">
        <img
          alt="..."
          class="responsive-image"
          src="https://dummyimage.com/800x800/b3b3b3/fff&text=login"
        />
      </div>
      <div class="login-item form-container">
        <p class="login-title">{{ $t("welcome") }}</p>
        <q-form class="form-content" @submit="onSubmit">
          <q-input
            :hint="$t('email')"
            :rules="[validateQInput($t('pleaseEnterEmail'))]"
            class="input-item"
            dense
            outlined
            type="email"
            v-model="loginForm.email"
          />
          <q-input
            :hint="$t('password')"
            :rules="[validateQInput($t('pleaseEnterPassword'))]"
            :type="showPassword ? 'password' : 'text'"
            class="input-item"
            dense
            outlined
            v-model="loginForm.password"
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                @click="showPassword = !showPassword"
                class="cursor-pointer"
              />
            </template>
          </q-input>
          <q-btn
            :label="$t('logIn')"
            class="input-item"
            color="primary"
            type="submit"
          />
        </q-form>
        <q-separator class="input-item"></q-separator>
        <router-link :to="{ name: 'ForgetPassword' }" class="no-underline">
          <span>{{ $t("forgetPassword") }}</span>
        </router-link>
        <router-link :to="{ name: 'CreateAccount' }" class="no-underline">
          <span>{{ $t("createAccount") }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { validateQInput } from "src/utils/functions";

const { t } = useI18n();
const authStore = useAuthStore();
const router = useRouter();
const showPassword = ref(true);
const loginForm = ref({ email: "", password: "" });

const login = async () => {
  try {
    await authStore.login(loginForm.value);
    router.push("/");
  } catch (error) {
    console.error(t("errorGettingToken"), error);
  }
};

const onSubmit = (event) => {
  event.preventDefault();
  login();
};
</script>