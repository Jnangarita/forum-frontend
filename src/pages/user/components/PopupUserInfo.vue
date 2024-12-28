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
        <q-form @submit="onSubmit">
          <div class="justify-between margin-bottom-10 display-flex">
            <q-input
              :label="$t('firstName')"
              :rules="[util.validateQInput($t('pleaseEnterName'))]"
              class="txt"
              dense
              outlined
              type="text"
              v-model="userData.firstName"
            />
            <q-input
              :label="$t('lastName')"
              :rules="[util.validateQInput($t('pleaseEnterLastName'))]"
              class="txt"
              dense
              outlined
              type="text"
              v-model="userData.lastName"
            />
          </div>
          <q-input
            :label="$t('userName')"
            :rules="[util.validateQInput($t('pleaseEnterUserName'))]"
            class="margin-bottom-10"
            dense
            outlined
            type="text"
            v-model="userData.profileName"
          />
          <div class="justify-between display-flex">
            <q-input
              :label="$t('email')"
              :rules="[util.validateQInput($t('pleaseEnterEmail'))]"
              class="margin-bottom-10 txt"
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
              v-model="userData.role.roleName"
            />
          </div>
          <div class="justify-between margin-bottom-10 display-flex">
            <q-select
              :label="$t('country')"
              :options="countries"
              :rules="[util.validateQselect($t('pleaseEnterCountry'))]"
              class="txt"
              dense
              lazy-rules
              option-label="countryName"
              option-value="id"
              outlined
              type="text"
              v-model="userData.country"
            />
            <q-select
              :disable="!userData.country.value?.length > 0"
              :label="$t('city')"
              :options="data.cities"
              :rules="[util.validateQselect($t('pleaseEnterCity'))]"
              class="txt"
              dense
              lazy-rules
              option-label="cityName"
              option-value="id"
              outlined
              type="text"
              v-model="userData.city"
            />
          </div>
          <div class="justify-center display-flex" style="margin: 2rem">
            <q-btn
              :label="$t('save')"
              :loading="loadBtn"
              :no-caps="true"
              :unelevated="true"
              class="margin-right-7 btn-width-7"
              color="primary"
              dense
              type="submit"
            />
            <q-btn
              :label="$t('cancel')"
              :no-caps="true"
              :unelevated="true"
              class="btn-width-7"
              color="red-5"
              flat
              outline
              @click="showPopup = false"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { HttpStatusCode } from "axios";
import { useGetData } from "src/composables/useGetData";
import { useGlobalStore } from "src/stores/globalStore";
import { useI18n } from "vue-i18n";
import { userApi } from "../api/user";
import { util } from "src/utils/functions";

const props = defineProps({
  popupStatus: Boolean,
  userData: {
    type: Object,
    required: true,
    default: () => [],
  },
});

const { data, getData } = useGetData();
const { t } = useI18n();
const emit = defineEmits(["update:popupStatus"]);
const loadBtn = ref(false);
const showPopup = ref(props.popupStatus);
const store = useGlobalStore();
const countries = computed(() => store.countriesList);

const onSubmit = (event) => {
  event.preventDefault();
  updateUserInfo(props.userData);
};

const updateUserInfo = async (userInfo) => {
  try {
    loadBtn.value = true;
    const response = await userApi.updateUser(userInfo.id, userInfo);
    if (response.status === HttpStatusCode.Ok) {
      util.showNotify({ msg: t("infoHasBeenUpdated"), bgColor: "green-2" });
      showPopup.value = false;
    }
  } catch (error) {
    util.showNotify({ msg: store.message, bgColor: "red-2" });
  } finally {
    loadBtn.value = false;
  }
};

watch(
  () => props.userData.country,
  async (newCountry, lastCountry) => {
    if (newCountry?.id) {
      const PATH_GET_CITIES = `/v1/locations/${newCountry.id}/cities`;
      await getData(PATH_GET_CITIES, "cities");
      if (lastCountry) {
        props.userData.city = "";
      }
    }
  }
);

watch(
  () => props.popupStatus,
  (newValue) => {
    showPopup.value = newValue;
  }
);

watch(showPopup, (newValue) => {
  emit("update:popupStatus", newValue);
});

onMounted(() => {
  store.fetchCountriesList();
});
</script>

<style scoped>
.popup-title {
  padding: 2rem 2rem;
  text-align: center;
}

.txt {
  width: 48%;
}
</style>