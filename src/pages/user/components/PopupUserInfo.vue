<template>
  <q-dialog v-model="showPopup" persistent class="q-pa-md">
    <q-card style="width: 830px; max-width: 80vw">
      <q-toolbar>
        <q-toolbar-title class="popup-title">
          <span>{{ $t("editUserInformation") }}</span>
        </q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-card-section class="justify-center" style="padding: 0rem 3.5rem">
        <div class="justify-between input-txt display-flex">
          <q-input
            :label="$t('firstName')"
            class="txt"
            dense
            outlined
            type="text"
          />
          <q-input
            :label="$t('lastName')"
            dense
            outlined
            type="text"
            class="txt"
          />
        </div>
        <q-input
          :label="$t('userName')"
          class="input-txt"
          dense
          outlined
          type="text"
        />
        <div class="justify-between display-flex">
          <q-input
            :label="$t('email')"
            class="input-txt txt"
            dense
            outlined
            type="text"
          />
          <q-input
            :label="$t('userRole')"
            class="txt"
            dense
            outlined
            type="text"
          />
        </div>
        <div class="justify-between input-txt display-flex">
          <q-select
            :label="$t('country')"
            class="txt"
            dense
            outlined
            type="text"
          />
          <q-select
            :label="$t('city')"
            class="txt"
            dense
            outlined
            type="text"
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
          />
          <q-btn
            :label="$t('cancel')"
            :no-caps="true"
            :unelevated="true"
            class="action-btn"
            color="secondary"
            dense
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({ popupStatus: Boolean });
const emit = defineEmits(["update:popupStatus"]);
const showPopup = ref(props.popupStatus);

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