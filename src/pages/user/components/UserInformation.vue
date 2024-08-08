<template>
  <div class="main-container user-info-container q-pa-md">
    <q-avatar rounded size="7rem">
      <img
        :alt="$t('userImg')"
        :src="userInfo?.photo"
        @error="onImageError($event)"
      />
    </q-avatar>
    <div>
      <p class="title">{{ userInfo?.userName }}</p>
      <q-badge
        class="badge-response font-weight-bold"
        color="grey-3"
        text-color="dark"
        style="margin: 0.5rem 0"
      >
        {{ userInfo?.userRole.roleName }}
      </q-badge>
      <div class="task-list">
        <div class="task-item">
          <div class="num-container">
            <q-icon name="las la-question-circle" size="2rem" />
          </div>
          <span class="text-align-left">
            <span class="title">{{ userInfo?.numberQuestions || 0 }}</span>
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
            <span class="title">{{ userInfo?.numberResponses || 0 }}</span>
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
          <span>{{ $t("userName") }}: </span>{{ userInfo?.userName }}
        </p>
        <p class="user-info">
          <span>{{ $t("email") }}: </span>{{ userInfo?.email }}
        </p>
        <p class="user-info">
          <span>{{ $t("status") }}: </span>
          <q-badge
            :color="!userInfo?.deleted ? 'positive' : 'red-5'"
            class="badge-response"
          >
            {{
              !userInfo?.deleted
                ? constants.ACTIVE_USER_STATUS
                : constants.DELETED_USER_STATUS
            }}
          </q-badge>
        </p>
        <p class="user-info">
          <span>{{ $t("userRole") }}: </span>{{ userInfo?.userRole.roleName }}
        </p>
        <p class="user-info">
          <span>{{ $t("country") }}: </span>{{ userInfo?.country }}
        </p>
      </div>
    </div>
    <q-btn
      :label="$t('edit')"
      :no-caps="true"
      :unelevated="true"
      class="edit-btn"
      color="primary"
      dense
      @click="openConfirmPopup"
    />
    <PopupUserInfo v-model:popupStatus="showPopup" />
  </div>
</template>

<script setup>
import { constants } from "src/utils/constants";
import { onImageError } from "src/utils/functions";
import { onMounted, ref } from "vue";
import { useGetData } from "src/composables/useGetData";
import { useRoute } from "vue-router";
import PopupUserInfo from "./PopupUserInfo.vue";

const { data, getData } = useGetData();
const showPopup = ref(false);
const route = useRoute();
const PATH_GET_USER_INFO = `/v1/users/${route.params.id}`;
const userInfo = ref(null);

function openConfirmPopup() {
  showPopup.value = true;
}

onMounted(async () => {
  await getData(PATH_GET_USER_INFO, "userById");
  if (data.userById) {
    userInfo.value = data.userById;
  }
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

.task-item q-icon {
  margin-right: 0.5rem;
}

.user-info {
  margin: 0.8rem 0 0 0;
}

.user-info span {
  font-weight: bold;
}

.edit-btn {
  margin-top: 0.5rem;
  padding: 0.4rem 1rem;
}
</style>