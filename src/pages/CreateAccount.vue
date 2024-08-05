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
              v-model="userInfo.firstName"
            />
            <q-input
              :hint="$t('lastName')"
              :rules="[validateQInput($t('pleaseEnterLastName'))]"
              class="input"
              dense
              outlined
              type="text"
              v-model="userInfo.lastName"
            />
          </div>
          <q-input
            :hint="$t('email')"
            :rules="[validateQInput($t('pleaseEnterEmail'))]"
            class="input-item responsive-box"
            dense
            outlined
            type="email"
            v-model="userInfo.email"
          />
          <div class="display-flex justify-between responsive-box">
            <q-input
              :hint="$t('password')"
              :rules="[validateQInput($t('pleaseEnterPassword'))]"
              class="input"
              dense
              outlined
              type="text"
              v-model="userInfo.password"
            />
            <q-input
              :hint="$t('repeatPassword')"
              :rules="[validateQInput($t('pleaseEnterRepeatPassword'))]"
              class="input"
              dense
              outlined
              type="text"
              v-model="userInfo.repeatPassword"
            />
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
import { constants } from "src/utils/constants";
import { HttpStatusCode } from "axios";
import { ref } from "vue";
import { showNotify, validateQInput } from "src/utils/functions";
import { useI18n } from "vue-i18n";
import { useQuasar } from "quasar";
import { userApi } from "./user/api/user";
import { useRouter } from "vue-router";

const { t } = useI18n();
const $q = useQuasar();
const router = useRouter();
const userInfo = ref({
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  photo: constants.BLANK_IMG,
  repeatPassword: "",
  role: constants.ROLE_GENERAL_USER,
});

const createAccount = async (userForm) => {
  try {
    const response = await userApi.createUser(userForm);
    if (response.status === HttpStatusCode.Created) {
      showNotify({
        hook: $q,
        msg: t("createdUserMsg"),
        backgroundColor: "green-2",
        language: (key) => t(key),
      });
      router.push("/login");
    }
  } catch (error) {
    console.error(t("errorCreatingUser"), error);
  }
};

const onSubmit = (event) => {
  event.preventDefault();
  if (userInfo.value.password !== userInfo.value.repeatPassword) {
    showNotify({
      hook: $q,
      msg: t("passwordsDoNotMatch"),
      language: (key) => t(key),
    });
  } else {
    createAccount(userInfo.value);
  }
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