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
            :rules="[util.notification.validateQInput($t('pleaseEnterEmail'))]"
            class="input-item"
            dense
            outlined
            type="email"
            v-model="passwordResetForm.email"
          />
          <q-btn
            :label="$t('passwordReset')"
            :loading="loadBtn"
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
import { HttpStatusCode } from "axios";
import { ref } from "vue";
import { useGlobalStore } from "src/stores/globalStore";
import { userApi } from "./user/api/user";
import { useRouter } from "vue-router";
import { util } from "src/utils/functions";

const loadBtn = ref(false);
const passwordResetForm = ref({ email: "" });
const router = useRouter();
const store = useGlobalStore();

const onSubmit = (event) => {
  event.preventDefault();
  resetPassword(passwordResetForm.value);
};

const resetPassword = async (form) => {
  try {
    loadBtn.value = true;
    const response = await userApi.resetPassword(form);
    if (response.status == HttpStatusCode.Ok) {
      util.notification.showNotify({
        msg: response.data.message,
        bgColor: "green-2",
      });
      router.push("/login");
    }
  } catch (error) {
    util.notification.showNotify({ msg: store.message, bgColor: "red-2" });
  } finally {
    loadBtn.value = false;
  }
};
</script>

<style scoped>
.description {
  font-size: 1rem;
  text-align: center;
  width: 70%;
}
</style>