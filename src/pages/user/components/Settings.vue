<template>
  <div class="main-container q-pa-md">
    <div class="display-flex items-center q-pa-md">
      <q-avatar rounded size="7rem" font-size="1rem">
        <img
          :alt="$t('userImg')"
          src="photo"
          @error="util.imageHandling.onImageError($event)"
        />
      </q-avatar>
      <div style="margin-left: 1.5rem">
        <q-btn
          :label="$t('uploadPhoto')"
          :no-caps="true"
          :unelevated="true"
          color="primary"
        />
        <q-btn
          :label="$t('deletePhoto')"
          :no-caps="true"
          :unelevated="true"
          color="grey-3"
          style="margin-left: 1rem"
          text-color="dark"
        />
        <p>{{ $t("allowedFiles") }}</p>
      </div>
    </div>
    <div class="q-pa-md">
      <p class="main-title">{{ $t("security") }}</p>
      <p>{{ $t("changePassword") }}</p>
      <q-form @submit="onSubmit">
        <q-input
          :type="currentPwd ? 'password' : 'text'"
          class="txt-fields"
          dense
          label="Actual contraseña"
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
            :type="newPwd ? 'password' : 'text'"
            class="txt-fields"
            dense
            label="Nueva contraseña"
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
            :type="confirmPwd ? 'password' : 'text'"
            class="txt-fields"
            dense
            label="Confirmar contraseña"
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
          :no-caps="true"
          :unelevated="true"
          color="primary"
          dense
          type="submit"
        />
      </q-form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { util } from "src/utils/functions";

const currentPwd = ref(false);
const newPwd = ref(false);
const confirmPwd = ref(false);
const changePwdForm = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const onSubmit = (event) => {
  event.preventDefault();
  console.log(changePwdForm.value);
};

onMounted(() => {
  // TODO
});
</script>

<style scoped>
p {
  margin: 1rem 0 0 0;
}

.txt-fields {
  margin-top: 2rem;
  width: 48.5%;
}
</style>