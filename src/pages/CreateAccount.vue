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
              :rules="[util.notification.validateQInput($t('pleaseEnterName'))]"
              class="input"
              dense
              outlined
              type="text"
              v-model="userInfo.firstName"
            />
            <q-input
              :hint="$t('lastName')"
              :rules="[
                util.notification.validateQInput($t('pleaseEnterLastName')),
              ]"
              class="input"
              dense
              outlined
              type="text"
              v-model="userInfo.lastName"
            />
          </div>
          <q-input
            :hint="$t('email')"
            :rules="[util.notification.validateQInput($t('pleaseEnterEmail'))]"
            class="input-item responsive-box"
            dense
            outlined
            type="email"
            v-model="userInfo.email"
          />
          <div class="display-flex justify-between responsive-box">
            <q-input
              :hint="$t('password')"
              :rules="[
                util.notification.validateQInput($t('pleaseEnterPassword')),
              ]"
              :type="showPassword ? 'password' : 'text'"
              class="input"
              dense
              outlined
              v-model="userInfo.password"
            >
              <template v-slot:append>
                <q-icon
                  :name="showPassword ? 'visibility_off' : 'visibility'"
                  @click="showPassword = !showPassword"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
            <q-input
              :hint="$t('repeatPassword')"
              :rules="[
                util.notification.validateQInput(
                  $t('pleaseEnterRepeatPassword')
                ),
              ]"
              :type="showRepeatPassword ? 'password' : 'text'"
              class="input"
              dense
              outlined
              v-model="userInfo.repeatPassword"
            >
              <template v-slot:append>
                <q-icon
                  :name="showRepeatPassword ? 'visibility_off' : 'visibility'"
                  @click="showRepeatPassword = !showRepeatPassword"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
          </div>
          <q-btn
            :label="$t('createAccount')"
            :loading="loadBtn"
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
import { useGloblaStore } from "src/stores/globalStore";
import { useI18n } from "vue-i18n";
import { userApi } from "./user/api/user";
import { useRouter } from "vue-router";
import { util } from "src/utils/functions";

const { t } = useI18n();
const loadBtn = ref(false);
const router = useRouter();
const showPassword = ref(true);
const showRepeatPassword = ref(true);
const store = useGloblaStore();
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
    loadBtn.value = true;
    const response = await userApi.createUser(userForm);
    if (response.status === HttpStatusCode.Created) {
      util.notification.showNotify({
        msg: t("createdUserMsg"),
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

const onSubmit = (event) => {
  event.preventDefault();
  if (userInfo.value.password !== userInfo.value.repeatPassword) {
    util.notification.showNotify({ msg: t("passwordsDoNotMatch") });
  } else {
    createAccount(userInfo.value);
  }
};
</script>

<style scoped>
.input {
  width: 47.5%;
}

.responsive-box {
  margin-bottom: 1rem;
  width: 85%;
}
</style>