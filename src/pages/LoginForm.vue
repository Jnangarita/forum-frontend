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
        <span>{{ $t("forgetPassword") }}</span>
        <span>{{ $t("createAccount") }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { validateQInput } from "src/utils/functions";

const showPassword = ref(true);
const loginForm = ref({
  email: "",
  password: "",
});

const onSubmit = (event) => {
  event.preventDefault();
  console.log(loginForm);
};
</script>

<style scoped>
.main-content {
  background: var(--primary-color);
  display: flex;
  height: 100vh;
}

.login-container {
  background: white;
  border-radius: var(--border-radius);
  display: flex;
  height: 80%;
  width: 70%;
}

.login-item {
  height: 100%;
  width: 50%;
}

.display-flex {
  align-items: center;
  display: flex;
  justify-content: center;
}

.responsive-image {
  border-bottom-left-radius: var(--border-radius);
  border-top-left-radius: var(--border-radius);
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  width: 100%;
}

.form-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.25rem;
}

.form-content {
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.login-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

@media (max-width: 900px) {
  .login-title {
    font-size: 1.9rem;
  }
}

.input-item {
  margin-bottom: 1rem;
  width: 70%;
}
</style>