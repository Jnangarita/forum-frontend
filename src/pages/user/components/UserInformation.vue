<template>
  <div class="main-container user-info-container q-pa-md">
    <q-avatar rounded size="7rem">
      <img
        :alt="$t('userImg')"
        :src="util.validateImageNull(userById?.photo)"
        @error="util.onImageError($event)"
      />
    </q-avatar>
    <div>
      <p class="title">{{ userById?.userName }}</p>
      <q-badge
        class="badge-response font-weight-bold"
        color="grey-3"
        text-color="dark"
        style="margin: 0.5rem 0"
      >
        {{ userById.userRole?.roleName }}
      </q-badge>
      <div class="task-list">
        <div class="task-item">
          <div class="num-container">
            <q-icon name="las la-question-circle" size="2rem" />
          </div>
          <span class="text-align-left">
            <span class="title">{{ userById?.numberQuestions || 0 }}</span>
            <caption>
              {{
                $t("questions")
              }}
            </caption>
          </span>
        </div>
        <div class="task-item">
          <div class="num-container">
            <q-icon name="las la-check-square" size="2rem" />
          </div>
          <span class="text-align-left">
            <span class="title">{{ userById?.numberResponses || 0 }}</span>
            <caption>
              {{
                $t("answers")
              }}
            </caption>
          </span>
        </div>
      </div>
    </div>
    <div class="text-align-left">
      <p class="title">{{ $t("details") }}</p>
      <q-separator></q-separator>
      <div style="margin: 0.5rem 0 0 0">
        <p class="user-info">
          <span class="font-weight-bold">{{ $t("userName") }}: </span>
          {{ userById?.userName }}
        </p>
        <p class="user-info">
          <span class="font-weight-bold">{{ $t("email") }}: </span>
          {{ userById?.email }}
        </p>
        <p class="user-info">
          <span class="font-weight-bold">{{ $t("status") }}: </span>
          <q-badge
            :color="!userById?.deleted ? 'positive' : 'red-5'"
            class="badge-response"
          >
            {{
              !userById?.deleted
                ? constants.ACTIVE_USER_STATUS
                : constants.DELETED_USER_STATUS
            }}
          </q-badge>
        </p>
        <p class="user-info">
          <span class="font-weight-bold">{{ $t("userRole") }}: </span>
          {{ userById.userRole?.roleName }}
        </p>
        <p class="user-info">
          <span class="font-weight-bold">{{ $t("country") }}: </span>
          {{ userById.country?.value }}
        </p>
      </div>
    </div>
    <q-btn
      :label="$t('edit')"
      :no-caps="true"
      :unelevated="true"
      class="margin-right-7 btn font-weight-bold"
      color="primary"
      dense
      @click="openConfirmPopup"
    />
    <q-btn
      :label="$t('cancel')"
      :no-caps="true"
      :unelevated="true"
      class="btn font-weight-bold"
      color="red-5"
      flat
      outline
      @click="util.goToPreviousScreen(router)"
    />
    <PopupUserInfo :userData="userById" v-model:popupStatus="showPopup" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { constants } from "src/utils/constants";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../store/userStore";
import { util } from "src/utils/functions";
import PopupUserInfo from "./PopupUserInfo.vue";

const showPopup = ref(false);
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const userById = computed(() => userStore.userInfo);

const openConfirmPopup = () => {
  showPopup.value = true;
};

onMounted(async () => {
  await userStore.fetchUserDataById(route.params.id);
});
</script>

<style scoped>
.user-info-container {
  border-radius: var(--border-radius);
  justify-content: center;
  text-align: center;
}

.title {
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.task-list {
  align-items: center;
  display: flex;
  justify-content: center;
}

.task-item {
  align-items: center;
  display: flex;
  margin: 0.5rem 1rem;
}

.num-container {
  background-color: var(--light-grey);
  border-radius: var(--border-radius);
  margin-right: 0.6rem;
  padding: 0.2rem 0.2rem;
}

.user-info {
  margin: 0.8rem 0 0 0;
}

.btn {
  margin-top: 0.5rem;
  padding: 0.4rem 1rem;
}
</style>