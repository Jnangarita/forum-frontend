<template>
  <q-dialog v-model="showPopup" persistent class="q-pa-md">
    <q-card style="width: 830px; max-width: 80vw">
      <q-toolbar>
        <q-toolbar-title class="popup-title">
          <span>{{ $t("editUserInformation") }}</span>
        </q-toolbar-title>
        <q-btn dense flat icon="close" round v-close-popup />
      </q-toolbar>
      <q-card-section class="justify-center" style="padding: 0rem 3.5rem">
        <div class="justify-between input-txt display-flex">
          <q-input
            :label="$t('firstName')"
            class="txt"
            dense
            outlined
            type="text"
            v-model="userData.firstName"
          />
          <q-input
            :label="$t('lastName')"
            class="txt"
            dense
            outlined
            type="text"
            v-model="userData.lastName"
          />
        </div>
        <q-input
          :label="$t('userName')"
          class="input-txt"
          dense
          outlined
          type="text"
          v-model="userData.userName"
        />
        <div class="justify-between display-flex">
          <q-input
            :label="$t('email')"
            class="input-txt txt"
            dense
            outlined
            type="text"
            v-model="userData.email"
          />
          <q-input
            :label="$t('userRole')"
            class="txt"
            dense
            disable
            outlined
            type="text"
            v-model="userData.userRole.roleName"
          />
        </div>
        <div class="justify-between input-txt display-flex">
          <q-select
            :label="$t('country')"
            :options="country"
            class="txt"
            dense
            option-label="value"
            option-value="id"
            outlined
            type="text"
            v-model="userData.country"
          />
          <q-select
            :label="$t('city')"
            :options="country"
            class="txt"
            dense
            option-label="value"
            option-value="id"
            outlined
            type="text"
            v-model="userData.city"
          />
        </div>
        <div class="justify-center display-flex" style="margin: 2rem">
          <q-btn
            :label="$t('save')"
            :no-caps="true"
            :unelevated="true"
            class="margin-right-7 action-btn"
            color="primary"
            dense
            @click="updateUserInfo(userData)"
          />
          <q-btn
            :label="$t('cancel')"
            :no-caps="true"
            :unelevated="true"
            class="action-btn"
            color="secondary"
            dense
            @click="showPopup = false"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { HttpStatusCode } from "axios";
import { ref, watch } from "vue";
import { showNotify } from "src/utils/functions";
import { useQuasar } from "quasar";
import { userApi } from "../api/user";
import { useI18n } from "vue-i18n";

const props = defineProps({
  popupStatus: Boolean,
  userData: {
    type: Object,
    required: true,
    default: () => [],
  },
});

const { t } = useI18n();
const $q = useQuasar();
const emit = defineEmits(["update:popupStatus"]);
const showPopup = ref(props.popupStatus);

const country = ref([
  {
    id: 1,
    value: "Colombia",
  },
  {
    id: 2,
    value: "España",
  },
  {
    id: 3,
    value: "Chile",
  },
]);

const updateUserInfo = async (userInfo) => {
  try {
    const response = await userApi.updateUser(userInfo.id, userInfo);
    if (response.status === HttpStatusCode.Ok) {
      showNotify({
        hook: $q,
        msg: t("infoHasBeenUpdated"),
        backgroundColor: "green-2",
        language: (key) => t(key),
      });
      showPopup.value = false;
    }
  } catch (error) {
    console.error(t("errorUpdatingUserInfo"), error);
  }
};

watch(
  () => props.popupStatus,
  (newValue) => {
    showPopup.value = newValue;
  }
);

watch(showPopup, (newValue) => {
  emit("update:popupStatus", newValue);
});
</script>

<style scoped>
.popup-title {
  padding: 2rem 2rem;
  text-align: center;
}

.popup-container {
  padding: 1rem;
}

.input-txt {
  margin-bottom: 2rem;
}

.txt {
  width: 48%;
}

.action-btn {
  width: 7rem;
}
</style>