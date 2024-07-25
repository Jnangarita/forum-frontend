<template>
  <div class="justify-center items-center main-content">
    <div class="login-container">
      <div class="login-item display-flex">
        <img
          alt="..."
          class="responsive-image"
          src="https://dummyimage.com/800x800/b3b3b3/fff&text=create-account"
        />
      </div>
      <div class="login-item form-container">
        <p class="login-title">{{ $t("createAccount") }}</p>
        <q-form class="form-content" @submit="onSubmit">
          <div class="display-flex justify-between responsive-box">
            <q-input
              :hint="$t('firstName')"
              :rules="[validateQInput($t('pleaseEnterName'))]"
              class="input"
              dense
              outlined
              type="text"
              v-model="createAccount.firstName"
            />
            <q-input
              :hint="$t('lastName')"
              :rules="[validateQInput($t('pleaseEnterLastName'))]"
              class="input"
              dense
              outlined
              type="text"
              v-model="createAccount.lastName"
            />
          </div>
          <q-input
            :hint="$t('email')"
            :rules="[validateQInput($t('pleaseEnterEmail'))]"
            class="input-item responsive-box"
            dense
            outlined
            type="email"
            v-model="createAccount.email"
          />
          <div class="display-flex justify-between responsive-box">
            <q-input
              :hint="$t('password')"
              :rules="[validateQInput($t('pleaseEnterPassword'))]"
              class="input"
              dense
              outlined
              type="text"
              v-model="createAccount.password"
            />
            <q-input
              :hint="$t('repeatPassword')"
              :rules="[validateQInput($t('pleaseEnterRepeatPassword'))]"
              class="input"
              dense
              outlined
              type="text"
              v-model="createAccount.repeatPassword"
            />
          </div>
          <div v-if="passwordError">
            {{ $t("passwordsDoNotMatch") }}
          </div>
          <q-btn
            :label="$t('createAccount')"
            class="responsive-box"
            color="primary"
            type="submit"
          />
        </q-form>
        <q-separator class="responsive-box"></q-separator>
        <router-link :to="{ name: 'ForgetPassword' }" class="no-underline">
          <span>{{ $t("forgetPassword") }}</span>
        </router-link>
        <router-link :to="{ name: 'Login' }" class="no-underline">
          <span>{{ $t("logIn") }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { validateQInput } from "src/utils/functions";

const passwordError = ref(false);
const createAccount = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  repeatPassword: "",
});

const onSubmit = (event) => {
  event.preventDefault();
  if (createAccount.value.password !== createAccount.value.repeatPassword) {
    passwordError.value = true;
    return;
  }
  console.log(createAccount);
};
</script>

<style scoped>
.input {
  width: 47.5%;
}

.margin-left {
  margin-left: 1rem;
}

.responsive-box {
  margin-bottom: 1rem;
  width: 85%;
}
</style>