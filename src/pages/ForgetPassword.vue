<template>
  <div class="justify-center items-center main-content">
    <div class="login-container">
      <div class="login-item display-flex">
        <img
          alt="..."
          class="responsive-image"
          src="https://dummyimage.com/800x800/b3b3b3/fff&text=forget-password"
        />
      </div>
      <div class="login-item form-container">
        <p class="login-title">{{ $t("forgetPassword") }}</p>
        <p class="description">{{ $t("passwordResetMsg") }}</p>
        <q-form class="form-content" @submit="onSubmit">
          <q-input
            :hint="$t('email')"
            :rules="[validateQInput($t('pleaseEnterEmail'))]"
            class="input-item"
            dense
            outlined
            type="email"
            v-model="passwordResetForm.email"
          />
          <q-btn
            :label="$t('passwordReset')"
            class="input-item"
            color="primary"
            type="submit"
          />
        </q-form>
        <q-separator class="input-item"></q-separator>
        <router-link :to="{ name: 'CreateAccount' }" class="no-underline">
          <span>{{ $t("createAccount") }}</span>
        </router-link>
        <router-link :to="{ name: 'Login' }" class="no-underline">
          <span>{{ $t("alreadyHaveAccount") }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { validateQInput } from "src/utils/functions";

const passwordResetForm = ref({ email: "" });

const onSubmit = (event) => {
  event.preventDefault();
  console.log(passwordResetForm);
};
</script>

<style scoped>
.description {
  font-size: 1rem;
  text-align: center;
  width: 70%;
}
</style>