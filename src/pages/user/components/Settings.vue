<template>
  <div class="main-container q-pa-md">
    <div class="display-flex items-center q-pa-md">
      <q-avatar rounded size="7rem" font-size="1rem">
        <img
          :alt="$t('userImg')"
          :src="util.imageHandling.validateImageNull(localInfo.photo)"
          @error="util.imageHandling.onImageError($event)"
        />
      </q-avatar>
      <div style="margin-left: 1.5rem">
        <q-btn
          :label="$t('uploadPhoto')"
          :no-caps="true"
          :unelevated="true"
          class="font-weight-bold"
          color="primary"
        />
        <q-btn
          :label="$t('deletePhoto')"
          :loading="loadDeleteBtn"
          :no-caps="true"
          :unelevated="true"
          class="margin-left-10 font-weight-bold"
          color="grey-3"
          text-color="dark"
          @click="deleteUserPhoto(localInfo)"
        />
        <p>{{ $t("allowedFiles") }}</p>
      </div>
    </div>
    <div class="q-pa-md">
      <p class="main-title title">{{ $t("changePassword") }}</p>
      <q-form @submit="onSubmit">
        <q-input
          :label="$t('currentPassword')"
          :rules="[
            util.notification.validateQInput($t('enterCurrentPassword')),
          ]"
          :type="currentPwd ? 'password' : 'text'"
          class="txt-fields"
          dense
          outlined
          v-model="changePwdForm.currentPassword"
        >
          <template v-slot:append>
            <q-icon
              :name="currentPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="currentPwd = !currentPwd"
            />
          </template>
        </q-input>
        <div class="display-flex justify-between">
          <q-input
            :label="$t('newPassword')"
            :rules="[util.notification.validateQInput($t('enterNewPassword'))]"
            :type="newPwd ? 'password' : 'text'"
            class="txt-fields"
            dense
            outlined
            v-model="changePwdForm.newPassword"
          >
            <template v-slot:append>
              <q-icon
                :name="newPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="newPwd = !newPwd"
              />
            </template>
          </q-input>
          <q-input
            :label="$t('confirmNewPassword')"
            :rules="[
              util.notification.validateQInput($t('pleaseEnterRepeatPassword')),
            ]"
            :type="confirmPwd ? 'password' : 'text'"
            class="txt-fields"
            dense
            outlined
            v-model="changePwdForm.confirmPassword"
          >
            <template v-slot:append>
              <q-icon
                :name="confirmPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="confirmPwd = !confirmPwd"
              />
            </template>
          </q-input>
        </div>
        <div style="font-size: 1rem">
          <p>{{ $t("passwordRequirements") }}</p>
          <ul>
            <li>{{ $t("minCharacters") }}</li>
            <li>{{ $t("oneLowercaseCharacter") }}</li>
            <li>{{ $t("oneNumberSymbolOrWhitespaceCharacter") }}</li>
          </ul>
        </div>
        <q-btn
          :label="$t('save')"
          :loading="loadBtn"
          :no-caps="true"
          :unelevated="true"
          class="btn-width-7 font-weight-bold"
          color="primary"
          dense
          type="submit"
        />
        <q-btn
          :label="$t('cancel')"
          :no-caps="true"
          :unelevated="true"
          class="btn-width-7 margin-left-10 font-weight-bold"
          color="red-5"
          flat
          outline
          @click="resetFields"
        />
      </q-form>
    </div>
  </div>
</template>

<script setup>
import { globalApi } from "src/api/global";
import { HttpStatusCode } from "axios";
import { LocalStorage } from "quasar";
import { ref } from "vue";
import { useGloblaStore } from "src/stores/globalStore";
import { useI18n } from "vue-i18n";
import { userApi } from "../api/user";
import { util } from "src/utils/functions";

const { t } = useI18n();
const confirmPwd = ref(true);
const currentPwd = ref(true);
const loadBtn = ref(false);
const loadDeleteBtn = ref(false);
const newPwd = ref(true);
const store = useGloblaStore();
const localInfo = LocalStorage.getItem("userInfo");

const emptyFields = () => {
  return { currentPassword: "", newPassword: "", confirmPassword: "" };
};

const changePwdForm = ref(emptyFields());

const onSubmit = (event) => {
  event.preventDefault();
  if (changePwdForm.value.newPassword !== changePwdForm.value.confirmPassword) {
    util.notification.showNotify({ msg: t("passwordsDoNotMatch") });
  } else {
    changePassword(LocalStorage.getItem("userId"), changePwdForm.value);
  }
};

const changePassword = async (id, form) => {
  try {
    loadBtn.value = true;
    const response = await userApi.updatePassword(id, form);
    if (response.status === HttpStatusCode.Ok) {
      util.notification.showNotify({
        msg: t("passwordUpdatedSuccessfully"),
        bgColor: "green-2",
      });
      resetFields();
    }
  } catch (error) {
    util.notification.showNotify({ msg: store.message, bgColor: "red-2" });
  } finally {
    loadBtn.value = false;
  }
};

const deleteUserPhoto = async (info) => {
  try {
    loadDeleteBtn.value = true;
    const response = await globalApi.deleteDocument(info.code, "3x4.png");
    if (response.status === HttpStatusCode.NoContent) {
      util.notification.showNotify({
        msg: t("photoDeletedSuccessfully"),
        bgColor: "green-2",
      });
    }
  } catch (error) {
    util.notification.showNotify({ msg: store.message, bgColor: "red-2" });
  } finally {
    loadDeleteBtn.value = false;
  }
};

const resetFields = () => {
  changePwdForm.value = emptyFields();
};
</script>

<style scoped>
.title {
  margin-top: 0;
}

p {
  margin: 1rem 0 0 0;
}

.txt-fields {
  margin-top: 1rem;
  width: 48.5%;
}

ul {
  margin-top: 0;
  padding-left: 1.5rem;
}
</style>